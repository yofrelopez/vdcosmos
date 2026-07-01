"use client";

import { RuedaTipo } from "../VitrinaCalculator";
import VitrinaSVG from "./VitrinaSVG";

interface Props {
  ancho: number;
  alto: number;
  fondo: number;
  cantidadRepisas: number;
  ruedas: RuedaTipo;
  perfilId: string;
}

export default function VitrinaPreview({ ancho, alto, fondo, cantidadRepisas, ruedas, perfilId }: Props) {
  // Escalado para que quepa en el contenedor
  const scale = 320 / Math.max(ancho, alto, fondo);
  const w = ancho * scale;
  const h = alto * scale;
  const d = fondo * scale;

  // Coordenadas para efecto 3D
  const offsetX = d * 0.4;
  const offsetY = d * 0.4;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cosmos-blue rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full z-10 flex items-center justify-center">
        <VitrinaSVG 
          w={w} h={h} d={d}
          offsetX={offsetX} offsetY={offsetY}
          perfilId={perfilId}
          cantidadRepisas={cantidadRepisas}
          ruedas={ruedas}
          ancho={ancho}
          alto={alto}
          fondo={fondo}
        />
      </div>

      {/* Etiquetas de Medidas Flotantes */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 z-20">
        <MeasureBadge label="Ancho" value={ancho} color="bg-cosmos-blue" />
        <MeasureBadge label="Alto" value={alto} color="bg-indigo-500" />
        <MeasureBadge label="Fondo" value={fondo} color="bg-slate-500" />
      </div>
    </div>
  );
}

function MeasureBadge({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-black text-zinc-900 dark:text-white">{value} cm</span>
    </div>
  );
}
