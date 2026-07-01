"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Material } from "@/lib/types";
import VitrinaForm from "./_components/VitrinaForm";
import VitrinaPreview from "./_components/VitrinaPreview";
import VitrinaSummary from "./_components/VitrinaSummary";
import VitrinaPrintView from "./_components/VitrinaPrintView";

// --- TIPOS ---

export interface ItemAlu {
  nombre: string;
  cant: number;
  dim: number;
  total: number;
  unidad: string;
  pUnit: number;
  subtotal: number;
}

export interface ItemVidrio {
  nombre: string;
  cant: number;
  pies: number;
  pUnit: number;
  subtotal: number;
  w: number;
  h: number;
}

export interface Resultados {
  despieceAlu: ItemAlu[];
  despieceVidrio: ItemVidrio[];
  costoAlu: number;
  costoVidrio: number;
  costoAccesorios: number;
  costoManoObra: number;
  total: number;
}

export type RuedaTipo = "ninguna" | "pequena" | "mediana" | "grande";
export type FondoTipo = "vidrio" | "espejo" | "nordex";

export default function VitrinaCalculator({ materiales }: { materiales: Material[] }) {
  // --- ESTADO ---
  const [ancho, setAncho] = useState<number>(100);
  const [alto, setAlto] = useState<number>(180);
  const [fondo, setFondo] = useState<number>(40);
  
  const [perfilId, setPerfilId] = useState<string>("VIT-ALU-001"); // Tubo Cuadrado 1.5"
  const [fondoTipo, setFondoTipo] = useState<FondoTipo>("vidrio");
  const [ruedas, setRuedas] = useState<RuedaTipo>("pequena");
  const [cantidadRepisas, setCantidadRepisas] = useState<number>(3);
  const [manoObraPorcentaje, setManoObraPorcentaje] = useState<number>(40);

  // --- FILTRADO DE MATERIALES ---
  const perfiles = useMemo(() => materiales.filter(m => m.categoria === "Aluminio Estructural"), [materiales]);

  // --- LÓGICA DE CÁLCULO DETALLADA ---
  const resultados = useMemo(() => {
    const pw = 3.81; // 1.5 pulgadas en cm aprox
    
    // 1. Precios Unitarios
    const getPrecio = (codigo: string) => parseFloat(materiales.find(m => m.codigo === codigo)?.precio || "0");
    const pPerfil = parseFloat(perfiles.find(m => m.codigo === perfilId)?.precio || "0");
    const pVidrio4mm = getPrecio("VIT-VID-004");
    const pVidrio6mm = getPrecio("VIT-VID-006");
    
    const pRielAlto = getPrecio("VIT-ALU-008");
    const pRielBajo = getPrecio("VIT-ALU-009");
    const pPerfilH = getPrecio("VIT-ALU-005");
    const pAnguloRepisa = getPrecio("VIT-ALU-010");
    const pAngulo34 = getPrecio("VIT-ALU-003"); // Sujeción de vidrios
    const pPaflon = getPrecio("VIT-ALU-011");
    const pPortafelpa = getPrecio("VIT-ALU-006");
    const pFelpa = getPrecio("VIT-ALU-007");
    const pCerradura = getPrecio("VIT-ACC-004");
    const pEspejo = getPrecio("VIT-MAT-002");
    const pNordex = getPrecio("VIT-MAT-001");

    let pRueda = 0;
    if (ruedas === "pequena") pRueda = getPrecio("VIT-ACC-001");
    if (ruedas === "mediana") pRueda = getPrecio("VIT-ACC-002");
    if (ruedas === "grande") pRueda = getPrecio("VIT-ACC-003");

    // 2. Despiece de Aluminio (Metros lineales)
    const cantPostes = 4;
    const mtsPostes = (cantPostes * alto) / 100;
    
    const cantAncho = 4;
    const mtsAncho = (cantAncho * (ancho - 2*pw)) / 100; // Descuento por postes
    
    const cantFondo = 4;
    const mtsFondo = (cantFondo * (fondo - 2*pw)) / 100; // Descuento por postes
    
    const mtsEstructural = mtsPostes + mtsAncho + mtsFondo;
    
    const mtsRiel = (2 * (ancho - 2*pw)) / 100;
    const mtsPerfilH = (4 * (ancho / 2)) / 100; // 2 pzas superiores + 2 inferiores
    const mtsAnguloRepisa = (2 * (fondo - 2*pw) * cantidadRepisas) / 100;
    const mtsPaflon = (ruedas === "mediana" || ruedas === "grande") ? ((2 * (ancho - 2*pw)) + (2 * (fondo - 2*pw))) / 100 : 0;
    const mtsPortafelpa = (2 * (alto - 8)) / 100; // Verticales con felpa

    // Sujeción de vidrios (Ángulo 3/4")
    const perimFrontal = 2 * ((ancho - 2*pw) + (alto - 2*pw));
    const perimTecho = 2 * ((ancho - 2*pw) + (fondo - 2*pw));
    const perimLaterales = 2 * 2 * ((fondo - 2*pw) + (alto - 2*pw));
    const mtsAngulo34 = (perimFrontal + perimTecho + perimLaterales) / 100;

    const costoAlu = (mtsEstructural * pPerfil) + 
                     (mtsRiel/2 * pRielAlto) + (mtsRiel/2 * pRielBajo) + 
                     (mtsPerfilH * pPerfilH) + 
                     (mtsAnguloRepisa * pAnguloRepisa) + 
                     (mtsAngulo34 * pAngulo34) + 
                     (mtsPaflon * pPaflon) +
                     (mtsPortafelpa * pPortafelpa) +
                     (mtsPortafelpa * pFelpa);

    // 3. Despiece de Vidrios (Pies cuadrados)
    const factorPie = 929.03;
    
    const areaLaterales = 2 * (fondo - 2*pw) * (alto - 2*pw);
    const areaTecho = (ancho - 2*pw) * (fondo - 2*pw);
    const areaFrontal = (ancho - 2*pw) * (alto - 2*pw); // Vidrio Fijo Frontal
    const areaPuertas = 2 * ((ancho / 2) * (alto - 8)); // Puertas Corredizas Traseras
    const areaRepisas = cantidadRepisas * (ancho - 2*pw) * (fondo - 2*pw);
    const areaPiso = (ancho - 2*pw) * (fondo - 2*pw); // Base / Piso

    const piesLaterales = areaLaterales / factorPie;
    const piesTecho = areaTecho / factorPie;
    const piesFrontal = areaFrontal / factorPie;
    const piesPuertas = areaPuertas / factorPie;
    const piesRepisas = areaRepisas / factorPie;
    const piesPiso = areaPiso / factorPie;

    // Costo base: Frontal y Laterales usan vidrio de 4mm. Techo y Repisas usan vidrio de 6mm.
    const costoFrontal = piesFrontal * pVidrio4mm;
    const costoLaterales = piesLaterales * pVidrio4mm;
    const costoTecho = piesTecho * pVidrio6mm;
    const costoRepisas = piesRepisas * pVidrio6mm;
    
    let costoVidrio = costoFrontal + costoLaterales + costoTecho + costoRepisas;
    
    // El costo de las puertas depende de fondoTipo. Si es de vidrio, usa vidrio de 6mm.
    let costoPuertas = 0;
    if (fondoTipo === "espejo") {
      costoPuertas = piesPuertas * (pEspejo + pNordex);
    } else if (fondoTipo === "nordex") {
      costoPuertas = piesPuertas * pNordex;
    } else {
      costoPuertas = piesPuertas * pVidrio6mm;
    }
    costoVidrio += costoPuertas;

    // El piso siempre es de Nordex (estándar para ocultar base)
    costoVidrio += piesPiso * pNordex;

    // 4. Accesorios
    const costoAccesorios = (4 * pRueda) + pCerradura;

    // 5. Totales y Mapeo de Despiece con Precios
    const subtotal = costoAlu + costoVidrio + costoAccesorios;
    const costoManoObra = subtotal * (manoObraPorcentaje / 100);
    const total = subtotal + costoManoObra;

    return {
      despieceAlu: [
        { nombre: "Postes Verticales (1.5\")", cant: 4, dim: alto, total: mtsPostes, unidad: "m", pUnit: pPerfil, subtotal: mtsPostes * pPerfil },
        { nombre: "Largueros (Ancho)", cant: 4, dim: ancho - 2*pw, total: mtsAncho, unidad: "m", pUnit: pPerfil, subtotal: mtsAncho * pPerfil },
        { nombre: "Travesaños (Fondo)", cant: 4, dim: fondo - 2*pw, total: mtsFondo, unidad: "m", pUnit: pPerfil, subtotal: mtsFondo * pPerfil },
        { nombre: "Riel Alto/Bajo", cant: 2, dim: ancho - 2*pw, total: mtsRiel, unidad: "m", pUnit: (pRielAlto + pRielBajo)/2, subtotal: (mtsRiel/2 * pRielAlto) + (mtsRiel/2 * pRielBajo) },
        { nombre: "Perfiles H (Hojas)", cant: 4, dim: ancho / 2, total: mtsPerfilH, unidad: "m", pUnit: pPerfilH, subtotal: mtsPerfilH * pPerfilH },
        { nombre: "Portafelpa (Vertical)", cant: 2, dim: alto - 8, total: mtsPortafelpa, unidad: "m", pUnit: pPortafelpa, subtotal: mtsPortafelpa * (pPortafelpa + pFelpa) },
        { nombre: "Ángulo 3/4\" (Sujeción Vidrios)", cant: 1, dim: perimFrontal + perimTecho + perimLaterales, total: mtsAngulo34, unidad: "m", pUnit: pAngulo34, subtotal: mtsAngulo34 * pAngulo34 },
        { nombre: "Ángulos Repisa (1/2\")", cant: cantidadRepisas * 2, dim: fondo - 2*pw, total: mtsAnguloRepisa, unidad: "m", pUnit: pAnguloRepisa, subtotal: mtsAnguloRepisa * pAnguloRepisa },
        ...(mtsPaflon > 0 ? [{ nombre: "Base Paflón", cant: 2, dim: ancho + fondo, total: mtsPaflon, unidad: "m", pUnit: pPaflon, subtotal: mtsPaflon * pPaflon }] : [])
      ],
      despieceVidrio: [
        { nombre: "Vidrio Frontal (Fijo 4mm)", cant: 1, pies: piesFrontal, pUnit: pVidrio4mm, subtotal: costoFrontal, w: ancho - 2*pw, h: alto - 2*pw },
        { nombre: "Vidrios Laterales (Fijos 4mm)", cant: 2, pies: piesLaterales, pUnit: pVidrio4mm, subtotal: costoLaterales, w: fondo - 2*pw, h: alto - 2*pw },
        { fontName: "Techo", nombre: "Vidrio Techo (Encimera 6mm)", cant: 1, pies: piesTecho, pUnit: pVidrio6mm, subtotal: costoTecho, w: ancho - 2*pw, h: fondo - 2*pw },
        { nombre: "Puertas Posteriores (Corredizas)", cant: 2, pies: piesPuertas, pUnit: (fondoTipo === "espejo" ? pEspejo + pNordex : fondoTipo === "nordex" ? pNordex : pVidrio6mm), subtotal: costoPuertas, w: (ancho / 2) + 2, h: alto - 8 },
        { nombre: "Vidrio Repisas (Encimeras 6mm)", cant: cantidadRepisas, pies: piesRepisas, pUnit: pVidrio6mm, subtotal: costoRepisas, w: ancho - 2.5*pw, h: fondo - 2.5*pw },
        { nombre: "Piso (Nordex)", cant: 1, pies: piesPiso, pUnit: pNordex, subtotal: piesPiso * pNordex, w: ancho - 2*pw, h: fondo - 2*pw }
      ],
      costoAlu,
      costoVidrio,
      costoAccesorios,
      costoManoObra,
      total
    };
  }, [ancho, alto, fondo, perfilId, fondoTipo, ruedas, cantidadRepisas, manoObraPorcentaje, materiales, perfiles]);

  return (
    <div className="flex flex-col gap-8">
      {/* Encabezado */}
      <div className="flex flex-col gap-1 print:hidden">
        <Link href="/cotizar" className="text-cosmos-blue hover:text-cosmos-red text-xs font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider transition-colors">
          ← Volver al portal
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Calculadora de Vitrinas
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Estructura de Aluminio 1.5&#34; y Sistema Corredizo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Columna Izquierda: Formulario y Resumen */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:hidden">
           <VitrinaForm 
            ancho={ancho} setAncho={setAncho}
            alto={alto} setAlto={setAlto}
            fondo={fondo} setFondo={setFondo}
            perfilId={perfilId} setPerfilId={setPerfilId}
            fondoTipo={fondoTipo} setFondoTipo={setFondoTipo}
            ruedas={ruedas} setRuedas={setRuedas}
            cantidadRepisas={cantidadRepisas} setCantidadRepisas={setCantidadRepisas}
            manoObraPorcentaje={manoObraPorcentaje} setManoObraPorcentaje={setManoObraPorcentaje}
            perfiles={perfiles}
          />
          
          <VitrinaSummary 
            resultados={resultados}
            manoObraPorcentaje={manoObraPorcentaje}
            medidas={{ ancho, alto, fondo }}
          />
        </div>
        
        {/* Columna Derecha: Gráfico SVG */}
        <div className="lg:col-span-7 print:hidden">
          <VitrinaPreview 
            ancho={ancho}
            alto={alto}
            fondo={fondo}
            cantidadRepisas={cantidadRepisas}
            ruedas={ruedas}
            perfilId={perfilId}
          />
        </div>
      </div>

      {/* Vista de Impresión (Oculta en la UI, se usa para el Portal de Impresión) */}
      <div style={{ display: 'none' }}>
        <VitrinaPrintView 
          resultados={resultados} 
          medidas={{ ancho, alto, fondo }} 
        />
      </div>
    </div>
  );
}
