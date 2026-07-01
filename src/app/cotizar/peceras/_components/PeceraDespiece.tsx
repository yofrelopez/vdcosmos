"use client";

import { PiezaDespiece } from "@/lib/types";

interface Props {
  despiece: PiezaDespiece[];
}

export default function PeceraDespiece({ despiece }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-4 print:border-none print:shadow-none print:p-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 gap-3 print:border-b-2 print:border-zinc-300">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Lista de Cortes y Despiece
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Cortes físicos calculados descontando los espesores de vidrio correspondientes (armado de laterales sobre la base).
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="border border-cosmos-blue/20 dark:border-cosmos-light/30 text-cosmos-blue dark:text-cosmos-light hover:bg-cosmos-blue/5 dark:hover:bg-cosmos-light/10 bg-transparent py-3 sm:py-2.5 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto print:hidden whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0 text-cosmos-red">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.65" />
          </svg>
          Imprimir Orden de Trabajo
        </button>
      </div>

      {/* Desktop/Print View (hidden on mobile screen) */}
      <div className="overflow-x-auto hidden sm:block print:block">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs uppercase font-semibold">
              <th className="py-3 px-2">Pieza / Perfil</th>
              <th className="py-3 px-2 text-center">Cant.</th>
              <th className="py-3 px-2">Dimensiones</th>
              <th className="py-3 px-2 text-right">Cant. Material</th>
              <th className="py-3 px-2 text-right print:hidden">P. Unitario</th>
              <th className="py-3 px-2 text-right print:hidden">Subtotal</th>
              <th className="py-3 px-2 text-center hidden print:table-cell w-24">Cortado</th>
              <th className="py-3 px-2 text-center hidden print:table-cell w-24">Pulido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            {despiece.map((pieza, idx) => {
              const esVidrio = pieza.unidad === "pie2";
              return (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors print:hover:bg-transparent">
                  <td className="py-3.5 px-2 font-medium">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${esVidrio ? "bg-cosmos-light" : "bg-slate-400 dark:bg-slate-500"} print:hidden`} />
                      {pieza.nombre}
                    </div>
                  </td>
                  <td className="py-3.5 px-2 text-center font-bold text-zinc-900 dark:text-white print:text-black">
                    {pieza.cant}
                  </td>
                  <td className="py-3.5 px-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 print:text-black print:font-bold">
                    {pieza.altoCm !== undefined 
                      ? `${pieza.anchoCm.toFixed(1)} x ${pieza.altoCm.toFixed(1)} cm` 
                      : `${pieza.anchoCm.toFixed(1)} cm (largo)`
                    }
                  </td>
                  <td className="py-3.5 px-2 text-right font-medium print:text-black">
                    {pieza.cantidadMaterial.toFixed(2)} {pieza.unidad === "pie2" ? "pie²" : "m"}
                  </td>
                  <td className="py-3.5 px-2 text-right text-zinc-500 print:hidden">
                    S/ {pieza.precioUnitario.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-2 text-right font-semibold text-zinc-900 dark:text-white print:hidden">
                    S/ {pieza.subtotal.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-2 text-center hidden print:table-cell font-mono text-base text-zinc-400">
                    [ &nbsp; ]
                  </td>
                  <td className="py-3.5 px-2 text-center hidden print:table-cell font-mono text-base text-zinc-400">
                    {esVidrio ? <span>[ &nbsp; ]</span> : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (hidden on desktop and printing) */}
      <div className="flex flex-col gap-3 sm:hidden print:hidden">
        {despiece.map((pieza, idx) => {
          const esVidrio = pieza.unidad === "pie2";
          return (
            <div 
              key={idx} 
              className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 flex flex-col gap-2.5"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${esVidrio ? "bg-cosmos-light" : "bg-slate-400 dark:bg-slate-500"}`} />
                  <span className="font-semibold text-zinc-900 dark:text-white text-sm">{pieza.nombre}</span>
                </div>
                <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold px-2 py-0.5 rounded-md">
                  Cant: {pieza.cant}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div>
                  <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-medium">Medida:</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                    {pieza.altoCm !== undefined 
                      ? `${pieza.anchoCm.toFixed(1)} x ${pieza.altoCm.toFixed(1)} cm` 
                      : `${pieza.anchoCm.toFixed(1)} cm`
                    }
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-medium">Material:</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {pieza.cantidadMaterial.toFixed(2)} {pieza.unidad === "pie2" ? "pie²" : "m"}
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-2 flex justify-between items-center text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">P. Unit: S/ {pieza.precioUnitario.toFixed(2)}</span>
                <span className="font-bold text-zinc-900 dark:text-white">Subtotal: S/ {pieza.subtotal.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
