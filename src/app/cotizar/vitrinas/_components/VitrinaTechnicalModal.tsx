"use client";

import { Resultados } from "../VitrinaCalculator";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resultados: Resultados;
  medidas: { ancho: number; alto: number; fondo: number };
}

const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

const IconPrint = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
);

export default function VitrinaTechnicalModal({ isOpen, onClose, resultados, medidas }: Props) {
  if (!isOpen) return null;

  const formatSol = (val: number) => `S/ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handlePrint = () => {
    const printContent = document.getElementById("vitrina-print-area");
    if (!printContent) {
      alert("Error: No se encontró el área de impresión.");
      return;
    }

    // Crear un iframe temporal
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Escribir el contenido en el iframe
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Hoja de Producción</title>
          <style>
            body { margin: 0; padding: 0; background: white; }
            @page { margin: 1cm; size: auto; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    // Esperar a que el contenido cargue y disparar la impresión
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      // Eliminar el iframe después de imprimir
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300 print:relative print:bg-white print:p-0 print:backdrop-blur-none print:inset-auto print:block">
      
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-content, .print-content * { visibility: visible; }
          .print-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
          @page { margin: 1cm; size: auto; }
          .custom-scrollbar { overflow: visible !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }
        }
      `}</style>

      <div className="print-content bg-white dark:bg-zinc-900 rounded-[32px] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/20 print:rounded-none">
        
        {/* Cabecera Premium */}
        <div className="px-8 py-6 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cosmos-blue/10 flex items-center justify-center text-cosmos-blue">
              <IconInfo />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">Hoja Técnica de Producción</h3>
              <p className="text-sm font-medium text-zinc-500">Despiece exacto para armado de vitrina</p>
            </div>
          </div>
          <div className="flex items-center gap-3 no-print">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-bold transition-all cursor-pointer"
            >
              <IconPrint /> Imprimir
            </button>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-bold cursor-pointer">✕</button>
          </div>
        </div>

        {/* Contenido Scrolleable */}
        <div className="p-8 print:p-4 overflow-y-auto custom-scrollbar flex flex-col gap-10 print:gap-4">
          
          {/* Resumen de Medidas */}
          <div className="grid grid-cols-3 gap-6 print:gap-3">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 print:p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Ancho Total</p>
              <p className="text-2xl font-black text-cosmos-blue print:text-lg">{medidas.ancho} cm</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 print:p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Alto Total</p>
              <p className="text-2xl font-black text-indigo-500 print:text-lg">{medidas.alto} cm</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 print:p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Fondo Total</p>
              <p className="text-2xl font-black text-slate-500 print:text-lg">{medidas.fondo} cm</p>
            </div>
          </div>

          {/* Tabla 1: Aluminio */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-cosmos-blue rounded-full"></div>
              <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Cortes de Aluminio (Estructura)</h4>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-800 text-[10px] font-black uppercase text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 print:px-2 print:py-1">Descripción de Perfil</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-center">Cantidad</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">Medida (cm)</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">P. Unit</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {resultados.despieceAlu.map((item, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 print:px-2 print:py-1 font-bold text-zinc-700 dark:text-zinc-300">{item.nombre}</td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-center">
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full font-black text-xs">{item.cant}</span>
                      </td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right font-mono font-bold text-cosmos-blue">{item.dim.toFixed(1)}</td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right text-zinc-500 text-xs">{formatSol(item.pUnit)}</td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right font-black text-zinc-900 dark:text-white">{formatSol(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tabla 2: Vidrios con Medidas en CM */}
          <section className="flex flex-col gap-4 print:gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
              <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Cortes de Vidrio y Paneles</h4>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-800 text-[10px] font-black uppercase text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 print:px-2 print:py-1">Panel / Ubicación</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-center">Cant.</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">Medida (Ancho x Alto)</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">Área (pie²)</th>
                    <th className="px-6 py-4 print:px-2 print:py-1 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {resultados.despieceVidrio.map((item, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 print:px-2 print:py-1 font-bold text-zinc-700 dark:text-zinc-300">{item.nombre}</td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-center">
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full font-black text-xs">{item.cant}</span>
                      </td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">
                          {item.w.toFixed(1)} x {item.h.toFixed(1)} cm
                        </span>
                      </td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right text-zinc-500 text-xs">{item.pies.toFixed(2)} pie²</td>
                      <td className="px-6 py-4 print:px-2 print:py-1 text-right font-black text-zinc-900 dark:text-white">{formatSol(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-3 items-start">
              <div className="text-amber-500 mt-0.5"><IconInfo /></div>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Nota:</strong> Las medidas de los vidrios incluyen los descuentos de perfiles aplicados. Para las puertas corredizas se incluye un traslape estándar de 2cm.
              </p>
            </div>
          </section>

        </div>

        {/* Pie de Modal con Totales */}
        <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Costo Materiales</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoAlu + resultados.costoVidrio + resultados.costoAccesorios)}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Mano de Obra</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{formatSol(resultados.costoManoObra)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-cosmos-blue uppercase mb-1 tracking-widest">Inversión Final</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white">{formatSol(resultados.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
