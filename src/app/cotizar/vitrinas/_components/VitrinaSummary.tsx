"use client";

import { useState } from "react";

const IconDollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

const IconChecks = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
);

const IconRuler = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/></svg>
);

import { Resultados } from "../VitrinaCalculator";
import VitrinaTechnicalModal from "./VitrinaTechnicalModal";

interface Props {
  resultados: Resultados;
  manoObraPorcentaje: number;
  medidas: { ancho: number; alto: number; fondo: number };
}

export default function VitrinaSummary({ resultados, manoObraPorcentaje, medidas }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formatSol = (val: number) => `S/ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 relative overflow-hidden">
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cosmos-blue/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>

      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <div className="text-cosmos-blue">
            <IconDollar />
          </div>
          Presupuesto Estimado
        </h2>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 cursor-pointer"
        >
          <IconChecks />
          Ver Despiece Técnico
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cosmos-blue/10 flex items-center justify-center text-cosmos-blue"><IconRuler /></div>
              <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-tight">Material Aluminio</p><p className="text-sm font-semibold text-zinc-900 dark:text-white">Perfiles y Estructura</p></div>
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoAlu)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500"><div className="w-5 h-5 border-2 border-indigo-500 rounded-sm flex items-center justify-center"><div className="w-3 h-3 bg-indigo-500/50 rounded-[1px]" /></div></div>
              <div><p className="text-xs text-zinc-500 uppercase font-bold tracking-tight">Vidriería y Paneles</p><p className="text-sm font-semibold text-zinc-900 dark:text-white">Cortes y Acabados</p></div>
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoVidrio)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-zinc-100 dark:border-zinc-800 rounded-2xl"><p className="text-[10px] text-zinc-500 uppercase font-black">Accesorios</p><p className="text-md font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoAccesorios)}</p></div>
            <div className="p-3 border border-zinc-100 dark:border-zinc-800 rounded-2xl"><p className="text-[10px] text-zinc-500 uppercase font-black">Mano de Obra ({manoObraPorcentaje}%)</p><p className="text-md font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoManoObra)}</p></div>
          </div>
        </div>
        
        <div className="bg-cosmos-blue dark:bg-cosmos-blue/30 p-6 rounded-3xl flex flex-col items-center gap-1 shadow-lg shadow-cosmos-blue/20">
          <span className="text-white/70 dark:text-cosmos-light/70 text-xs font-black uppercase tracking-[0.2em]">Inversión Estimada</span>
          <span className="text-5xl font-black text-white dark:text-white tracking-tighter">{formatSol(resultados.total)}</span>
        </div>
      </div>

      {/* Modal Técnico */}
      <VitrinaTechnicalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        resultados={resultados}
        medidas={medidas}
      />
    </div>
  );
}
