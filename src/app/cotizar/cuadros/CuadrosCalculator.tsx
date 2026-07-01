"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import MolduraModal from "./_components/MolduraModal";
import { Material } from "@/lib/types";

interface Props {
  materiales: Material[];
}

export default function CuadrosCalculator({ materiales }: Props) {
  const [ancho, setAncho] = useState<string>("50");
  const [alto, setAlto] = useState<string>("40");
  const [isEspejo, setIsEspejo] = useState<boolean>(false);
  const [tipoCuadro, setTipoCuadro] = useState<"directo" | "fondo">("directo");
  const [tipoFondo, setTipoFondo] = useState<"cartulina" | "doble_vidrio">("cartulina");
  const [materialId, setMaterialId] = useState<string>("VID-SIMP"); // Vidrio o Espejo
  const [molduraId, setMolduraId] = useState<string>("MOL-100-STD"); // Default to 1" Standard
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Estado para moldura personalizada
  const [isCustomMoldura, setIsCustomMoldura] = useState<boolean>(false);
  const [customEspesor, setCustomEspesor] = useState<string>("1"); // en pulgadas
  const [customPrecio, setCustomPrecio] = useState<string>("20"); // por metro

  // Filtrar materiales
  const molduras = useMemo(() => materiales.filter((m) => m.categoria === "Molduras"), [materiales]);

  const getMaterial = (id: string) => {
    return materiales.find((m) => m.codigo === id);
  };

  const currentMaterial = getMaterial(materialId);
  const currentMoldura = molduras.find((m) => m.codigo === molduraId);

  // Usar valores personalizados o de la base de datos
  const precioMaterial = currentMaterial ? parseFloat(currentMaterial.precio) : 0;
  const precioMoldura = isCustomMoldura ? parseFloat(customPrecio) || 0 : (currentMoldura ? parseFloat(currentMoldura.precio) : 0);
  const espesorPulgadas = isCustomMoldura ? parseFloat(customEspesor) || 0 : (currentMoldura ? parseFloat(currentMoldura.espesor_pulgadas || "0") : 0);
  const espesorCm = espesorPulgadas * 2.54;

  // Cálculos base
  const delta = tipoCuadro === "fondo" ? 8 : 0;
  const anchoNum = parseFloat(ancho) || 0;
  const altoNum = parseFloat(alto) || 0;

  const anchoEfectivo = anchoNum + delta;
  const altoEfectivo = altoNum + delta;

  const areaPie2 = (altoEfectivo * anchoEfectivo) / 900;
  const costoMaterial = areaPie2 * precioMaterial;
  
  // Costo de fondo (Cartulina S/ 2 o Vidrio Simple S/ 5)
  const costoFondo = (tipoCuadro === "fondo" && !isEspejo)
    ? (tipoFondo === "cartulina" ? areaPie2 * 2 : areaPie2 * 5)
    : 0;

  const longitudMolduraCm = (2 * (altoEfectivo + anchoEfectivo)) + (8 * espesorCm);
  const longitudMolduraMetros = longitudMolduraCm / 100;
  const costoMoldura = longitudMolduraMetros * precioMoldura;

  const total = costoMaterial + costoMoldura + costoFondo;

  // Escala para el SVG
  const padding = 30;
  const availableWidth = 500 - padding * 2;
  const availableHeight = 250 - padding * 2;

  const totalAnchoCm = anchoEfectivo + 2 * espesorCm;
  const totalAltoCm = altoEfectivo + 2 * espesorCm;

  const scaleX = availableWidth / totalAnchoCm;
  const scaleY = availableHeight / totalAltoCm;
  const scale = Math.min(scaleX, scaleY);

  const svgWidth = totalAnchoCm * scale;
  const svgHeight = totalAltoCm * scale;

  const x0 = (500 - svgWidth) / 2;
  const y0 = (250 - svgHeight) / 2;

  const innerX = x0 + espesorCm * scale;
  const innerY = y0 + espesorCm * scale;
  const innerWidth = anchoEfectivo * scale;
  const innerHeight = altoEfectivo * scale;

  const imgX = innerX + (delta / 2) * scale;
  const imgY = innerY + (delta / 2) * scale;
  const imgWidth = anchoNum * scale;
  const imgHeight = altoNum * scale;

  const x1 = x0 + svgWidth;
  const y1 = y0 + svgHeight;
  const ix0 = innerX;
  const iy0 = innerY;
  const ix1 = innerX + innerWidth;
  const iy1 = innerY + innerHeight;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <Link href="/cotizar" className="text-cosmos-blue hover:text-cosmos-red text-xs font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider transition-colors">
            ← Volver al portal
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            Calculadora de Cuadros
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulario (Izquierda) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
            {/* Medidas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Ancho Imagen (cm)</label>
                <input
                  type="number"
                  min={10}
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                  onBlur={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if (val < 10) setAncho("10");
                  }}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Alto Imagen (cm)</label>
                <input
                  type="number"
                  min={10}
                  value={alto}
                  onChange={(e) => setAlto(e.target.value)}
                  onBlur={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if (val < 10) setAlto("10");
                  }}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Switch Espejo */}
            <div className="flex items-center justify-between py-1">
              <div>
                <label className="block text-xs font-medium text-zinc-500">¿Es Espejo?</label>
                <span className="text-xs text-zinc-400">Desactiva el fondo</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextVal = !isEspejo;
                  setIsEspejo(nextVal);
                  if (nextVal) {
                    setTipoCuadro("directo");
                    setMaterialId("ESP-2CH");
                  } else {
                    setMaterialId("VID-SIMP");
                  }
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:ring-offset-2 ${
                  isEspejo ? "bg-cosmos-blue" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEspejo ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Tipo de Enmarcado (Oculto si es espejo) */}
            {!isEspejo && (
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Tipo de Enmarcado</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoCuadro("directo")}
                    className={`flex-1 py-2 px-3 rounded-lg border font-medium text-sm transition-all ${
                      tipoCuadro === "directo"
                        ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    Directo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoCuadro("fondo")}
                    className={`flex-1 py-2 px-3 rounded-lg border font-medium text-sm transition-all ${
                      tipoCuadro === "fondo"
                        ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    Con Fondo
                  </button>
                </div>
              </div>
            )}

            {/* Selector de Tipo de Fondo (Solo si es con fondo) */}
            {tipoCuadro === "fondo" && !isEspejo && (
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Material de Fondo</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoFondo("cartulina")}
                    className={`flex-1 py-1.5 px-3 rounded-lg border font-medium text-sm transition-all ${
                      tipoFondo === "cartulina"
                        ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    Cartulina
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoFondo("doble_vidrio")}
                    className={`flex-1 py-1.5 px-3 rounded-lg border font-medium text-sm transition-all ${
                      tipoFondo === "doble_vidrio"
                        ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    Doble Vidrio
                  </button>
                </div>
              </div>
            )}

            {/* Botón para abrir modal */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full mt-2 py-3 px-4 bg-cosmos-blue hover:bg-cosmos-blue/90 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md text-sm cursor-pointer"
            >
              {isCustomMoldura ? "Moldura Especial Activa" : "Elegir Moldura y Cobertura"}
            </button>

            {/* Campos para Moldura Personalizada */}
            {isCustomMoldura && (
              <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-cosmos-blue/20">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Espesor (pulgadas)</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.25"
                    value={customEspesor}
                    onChange={(e) => setCustomEspesor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Precio x Metro (S/)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={customPrecio}
                    onChange={(e) => setCustomPrecio(e.target.value)}
                    className="w-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white text-sm"
                  />
                </div>
                <div className="col-span-2 text-center">
                  <button
                    onClick={() => {
                      setIsCustomMoldura(false);
                      setMolduraId("MOL-100-STD"); // Volver a default
                    }}
                    className="text-xs text-cosmos-blue hover:underline font-medium"
                  >
                    Volver a molduras estándar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gráfico Interactivo (Derecha) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-center min-h-[250px]">
          <svg width="100%" height="250" viewBox="0 0 500 250" className="max-w-md mx-auto">
            <rect width="500" height="250" fill="none" />

            {/* Cuadro Exterior (Moldura con Cortes a Inglete 3D) */}
            <g stroke="#5C3A21" strokeWidth="1" strokeLinejoin="round">
              {/* Listón Superior (Top Rail) - Más claro */}
              <polygon
                points={`${x0},${y0} ${x1},${y0} ${ix1},${iy0} ${ix0},${iy0}`}
                fill="#a06d48"
              />
              {/* Listón Izquierdo (Left Rail) - Tono base */}
              <polygon
                points={`${x0},${y0} ${ix0},${iy0} ${ix0},${iy1} ${x0},${y1}`}
                fill="#8B5E3C"
              />
              {/* Listón Derecho (Right Rail) - Tono medio-oscuro */}
              <polygon
                points={`${x1},${y0} ${ix1},${iy0} ${ix1},${iy1} ${x1},${y1}`}
                fill="#754f32"
              />
              {/* Listón Inferior (Bottom Rail) - Tono oscuro de sombra */}
              <polygon
                points={`${x0},${y1} ${x1},${y1} ${ix1},${iy1} ${ix0},${iy1}`}
                fill="#5c3e27"
              />
            </g>

            {/* Cuadro Interior (Vidrio/Fondo/Espejo) */}
            <rect
              x={innerX}
              y={innerY}
              width={innerWidth}
              height={innerHeight}
              fill={isEspejo ? "#94A3B8" : (tipoCuadro === "fondo" ? "#F5F5DC" : (materialId === "VID-MATE" ? "#E2E8F0" : "#BAE6FD"))}
              fillOpacity={isEspejo ? "0.8" : (tipoCuadro === "fondo" ? "1" : "0.5")}
              stroke="#5C3A21"
              strokeWidth="1"
            />

            {/* Imagen Central */}
            {tipoCuadro === "fondo" && !isEspejo && (
              <rect
                x={imgX}
                y={imgY}
                width={imgWidth}
                height={imgHeight}
                fill="#BAE6FD"
                fillOpacity="0.5"
                stroke="#94A3B8"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            )}

            {/* Etiquetas */}
            <text x={x0 + svgWidth / 2} y={y0 - 8} className="fill-zinc-600 dark:fill-zinc-400 text-xs font-medium text-center" textAnchor="middle">
              {totalAnchoCm.toFixed(1)} cm
            </text>
            
            <text x={x0 - 8} y={y0 + svgHeight / 2} className="fill-zinc-600 dark:fill-zinc-400 text-xs font-medium" textAnchor="end" dominantBaseline="middle">
              {totalAltoCm.toFixed(1)} cm
            </text>

            <text x={imgX + imgWidth / 2} y={imgY + imgHeight / 2} className="fill-zinc-800 dark:fill-zinc-200 text-xs font-bold text-center" textAnchor="middle" dominantBaseline="middle">
              {ancho} x {alto} cm
            </text>
          </svg>
        </div>
      </div>

      {/* Resumen y Precio Horizontal (Abajo) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="text-xs font-medium text-zinc-500 mb-1">Medida Cobertura</div>
          <div className="text-lg font-bold text-zinc-900 dark:text-white">{anchoEfectivo} x {altoEfectivo} cm</div>
          <div className="text-xs text-zinc-400">{areaPie2.toFixed(2)} pie²</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="text-xs font-medium text-zinc-500 mb-1">Moldura</div>
          <div className="text-lg font-bold text-zinc-900 dark:text-white">{longitudMolduraMetros.toFixed(2)} m</div>
          <div className="text-xs text-zinc-400">
            {isCustomMoldura ? `Especial ${customEspesor}"` : currentMoldura?.nombre.replace("Moldura ", "")}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="text-xs font-medium text-zinc-500 mb-1">Materiales</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">Cub: {currentMaterial?.nombre || "Ninguno"}</div>
          {tipoCuadro === "fondo" && !isEspejo && (
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Fondo ({tipoFondo === "cartulina" ? "Cartulina" : "Vidrio"}): S/ {costoFondo.toFixed(2)}
            </div>
          )}
          <div className="text-xs text-zinc-600 dark:text-zinc-400">Marco: S/ {costoMoldura.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-cosmos-blue to-indigo-950 text-white p-4 rounded-xl shadow-sm flex flex-col justify-center items-center">
          <div className="text-xs font-medium text-white/80 mb-1">Total Estimado</div>
          <div className="text-2xl font-extrabold font-mono">S/ {total.toFixed(2)}</div>
        </div>
      </div>

      {/* Modal Inteligente con Sidebar */}
      <MolduraModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        materialId={materialId}
        molduraId={molduraId}
        materiales={materiales}
        anchoEfectivo={anchoEfectivo}
        altoEfectivo={altoEfectivo}
        isEspejo={isEspejo}
        tipoCuadro={tipoCuadro}
        tipoFondo={tipoFondo}
        areaPie2={areaPie2}
        onApply={(data) => {
          setMolduraId(data.molduraId);
          const nextMaterialId = data.materialId;
          setMaterialId(nextMaterialId);
          const nextIsEspejo = nextMaterialId.startsWith("ESP");
          setIsEspejo(nextIsEspejo);
          if (nextIsEspejo) {
            setTipoCuadro("directo");
          }
          setIsCustomMoldura(data.isCustomMoldura);
          setModalOpen(false);
        }}
        isCustomMoldura={isCustomMoldura}
      />
    </div>
  );
}
