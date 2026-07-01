"use client";

import { useState } from "react";
import Link from "next/link";
import PeceraForm from "./_components/PeceraForm";
import PeceraPreview from "./_components/PeceraPreview";
import PeceraSummary from "./_components/PeceraSummary";
import PeceraDespiece from "./_components/PeceraDespiece";

import { Material } from "@/lib/types";
import {
  calcularVolumenLitros,
  calcularPiesVidrio,
  calcularCostoVidrio,
  calcularLongitudAluminioCm,
  calcularCostoAluminio,
  calcularCostoManoObra,
  calcularTotal,
  obtenerEspesorVidrioMm,
  obtenerDespiecePecera,
} from "./_lib/calculations";

interface Props {
  materiales: Material[];
}

export default function PeceraCalculator({ materiales }: Props) {
  // --- LÓGICA DE FILTRADO ---
  const vidrios = materiales.filter((m) => m.categoria === "Vidrios");
  const aluminios = materiales.filter((m) => m.categoria === "Aluminios");

  // --- ESTADO CENTRAL ---
  const [largo, setLargo] = useState<number>(60);
  const [alto, setAlto] = useState<number>(40);
  const [ancho, setAncho] = useState<number>(30);
  const [materialId, setMaterialId] = useState<string>(vidrios[0]?.codigo || "");
  const [porcentajeManoObra, setPorcentajeManoObra] = useState<number>(50);
  const [usarAluminio, setUsarAluminio] = useState<boolean>(false);
  const [aluminioId, setAluminioId] = useState<string>(aluminios[0]?.codigo || "");

  const materialSeleccionado = vidrios.find((m) => m.codigo === materialId);
  const precioVidrio = materialSeleccionado ? parseFloat(materialSeleccionado.precio) : 0;

  const aluminioSeleccionado = aluminios.find((m) => m.codigo === aluminioId);
  const precioAluminio = aluminioSeleccionado ? parseFloat(aluminioSeleccionado.precio) : 0;

  // --- CÁLCULOS DE COSTOS ---
  const totalPies = calcularPiesVidrio(largo, alto, ancho);
  const costoVidrio = calcularCostoVidrio(totalPies, precioVidrio);
  const costoManoObra = calcularCostoManoObra(costoVidrio, porcentajeManoObra);
  
  const longitudAluminioCm = calcularLongitudAluminioCm(largo, alto, ancho, usarAluminio);
  const longitudAluminioMetros = longitudAluminioCm / 100;
  const costoAluminio = calcularCostoAluminio(longitudAluminioMetros, precioAluminio);

  const total = calcularTotal(costoVidrio, costoAluminio, costoManoObra);
  const volumenLitros = calcularVolumenLitros(largo, alto, ancho);

  const espesorMm = obtenerEspesorVidrioMm(materialSeleccionado?.nombre || "");
  const despiece = obtenerDespiecePecera(
    largo,
    alto,
    ancho,
    espesorMm,
    precioVidrio,
    usarAluminio,
    precioAluminio
  );

  return (
    <div className="flex flex-col gap-8 print:gap-0 print:text-black">
      
      {/* Cabecera Técnica de Impresión (Taller) */}
      <div className="hidden print:block border-b-2 border-zinc-900 pb-4 mb-6">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            ORDEN DE PRODUCCIÓN (PECERA)
          </h1>
          <span className="text-xs text-zinc-500 font-mono">
            Fecha: {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-xs font-mono text-black">
          <div><strong>Largo:</strong> {largo} cm</div>
          <div><strong>Ancho:</strong> {ancho} cm</div>
          <div><strong>Alto:</strong> {alto} cm</div>
          <div><strong>Vidrio:</strong> {espesorMm} mm ({materialSeleccionado?.nombre})</div>
          <div><strong>Volumen aprox:</strong> {volumenLitros.toFixed(1)} L</div>
          {usarAluminio && <div><strong>Filos de Aluminio:</strong> Sí ({aluminios.find(a => a.codigo === aluminioId)?.nombre})</div>}
        </div>
      </div>

      {/* Encabezado en pantalla */}
      <div className="flex flex-col gap-1 print:hidden">
        <Link href="/cotizar" className="text-cosmos-blue hover:text-cosmos-red text-xs font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider transition-colors">
          ← Volver al portal
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Calculadora de Peceras
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Columna Izquierda: Formulario y Resumen */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:hidden">
          <PeceraForm 
            largo={largo} setLargo={setLargo}
            ancho={ancho} setAncho={setAncho}
            alto={alto} setAlto={setAlto}
            materialId={materialId} setMaterialId={setMaterialId}
            usarAluminio={usarAluminio} setUsarAluminio={setUsarAluminio}
            aluminioId={aluminioId} setAluminioId={setAluminioId}
            porcentajeManoObra={porcentajeManoObra} setPorcentajeManoObra={setPorcentajeManoObra}
            vidrios={vidrios}
            aluminios={aluminios}
            volumenLitros={volumenLitros}
          />
          
          <PeceraSummary 
            totalPies={totalPies}
            costoVidrio={costoVidrio}
            usarAluminio={usarAluminio}
            longitudAluminioMetros={longitudAluminioMetros}
            costoAluminio={costoAluminio}
            porcentajeManoObra={porcentajeManoObra}
            costoManoObra={costoManoObra}
            total={total}
          />
        </div>

        {/* Columna Derecha: Gráfico SVG */}
        <div className="lg:col-span-7 print:hidden">
          <PeceraPreview 
            largo={largo}
            ancho={ancho}
            alto={alto}
            usarAluminio={usarAluminio}
          />
        </div>
      </div>

      {/* Listado de Despiece y Cortes */}
      <PeceraDespiece despiece={despiece} />
    </div>
  );
}
