"use client";

import { Resultados } from "../VitrinaCalculator";
import { useEffect, useState } from "react";

interface Props {
  resultados: Resultados;
  medidas: { ancho: number; alto: number; fondo: number };
}

export default function VitrinaPrintView({ resultados, medidas }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      setDateStr(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const formatSol = (val: number) => `S/ ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (!isClient) return null;

  return (
    <div id="vitrina-print-area" className="bg-white p-8 text-black font-sans" style={{ width: '21cm', minHeight: '29.7cm', margin: '0 auto', color: 'black', backgroundColor: 'white' }}>
      <style>{`
        #vitrina-print-area table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
        #vitrina-print-area th { border-bottom: 2px solid black; text-align: left; padding: 8px; font-weight: bold; background-color: #f3f4f6; }
        #vitrina-print-area td { border-bottom: 1px solid #e5e7eb; padding: 8px; }
        #vitrina-print-area h1 { font-size: 24px; font-weight: bold; text-transform: uppercase; margin: 0; }
        #vitrina-print-area h2 { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid black; background-color: #f3f4f6; padding: 4px; margin-top: 20px; }
        #vitrina-print-area .text-right { text-align: right; }
        #vitrina-print-area .text-center { text-align: center; }
        #vitrina-print-area .font-bold { font-weight: bold; }
        #vitrina-print-area .flex-between { display: flex; justify-content: space-between; align-items: center; }
        #vitrina-print-area .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
        #vitrina-print-area .summary-box { border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; }
      `}</style>
      
      <div className="max-w-full mx-auto">
        {/* Encabezado */}
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
          <div>
            <h1 className="text-xl font-bold uppercase">Hoja de Producción - Vitrina</h1>
            <p className="text-xs italic">Dimensiones: {medidas.ancho} x {medidas.alto} x {medidas.fondo} cm</p>
          </div>
          <div className="text-right">
            <p className="font-bold">TOTAL: {formatSol(resultados.total)}</p>
            <p className="text-[8px]">{dateStr}</p>
          </div>
        </div>

        {/* Tablas en Grid para ahorrar espacio */}
        <div className="flex flex-col gap-6">
          
          {/* Aluminio */}
          <section>
            <h2 className="text-xs font-bold border-b border-black mb-1 uppercase bg-gray-100 px-1">1. Despiece de Aluminio</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black text-left">
                  <th className="py-1">Descripción</th>
                  <th className="py-1 text-center">Cant.</th>
                  <th className="py-1 text-right">Medida (cm)</th>
                  <th className="py-1 text-right">Total (m)</th>
                  <th className="py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {resultados.despieceAlu.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-1 font-medium">{item.nombre}</td>
                    <td className="py-1 text-center font-bold">{item.cant}</td>
                    <td className="py-1 text-right">{item.dim.toFixed(1)}</td>
                    <td className="py-1 text-right">{item.total.toFixed(2)}m</td>
                    <td className="py-1 text-right">{formatSol(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Vidrios */}
          <section>
            <h2 className="text-xs font-bold border-b border-black mb-1 uppercase bg-gray-100 px-1">2. Corte de Vidrios y Paneles</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black text-left">
                  <th className="py-1">Ubicación</th>
                  <th className="py-1 text-center">Cant.</th>
                  <th className="py-1 text-right">Ancho x Alto (cm)</th>
                  <th className="py-1 text-right">Área (pie²)</th>
                  <th className="py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {resultados.despieceVidrio.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-1 font-medium">{item.nombre}</td>
                    <td className="py-1 text-center font-bold">{item.cant}</td>
                    <td className="py-1 text-right font-bold">{item.w.toFixed(1)} x {item.h.toFixed(1)} cm</td>
                    <td className="py-1 text-right">{item.pies.toFixed(2)}</td>
                    <td className="py-1 text-right">{formatSol(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Totales Finales */}
          <section className="mt-4 pt-2 border-t-2 border-black flex justify-end gap-10">
            <div className="text-right">
              <p>Suma Materiales: <span className="font-bold">{formatSol(resultados.costoAlu + resultados.costoVidrio + resultados.costoAccesorios)}</span></p>
              <p>Mano de Obra: <span className="font-bold">{formatSol(resultados.costoManoObra)}</span></p>
              <p className="text-sm font-black mt-1">INVERSIÓN TOTAL: {formatSol(resultados.total)}</p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-4 border-t border-dotted border-gray-400 text-center text-[7px] italic">
          Documento generado automáticamente por el Sistema de Cotizaciones - Hoja de Taller
        </div>
      </div>
    </div>
  );
}
