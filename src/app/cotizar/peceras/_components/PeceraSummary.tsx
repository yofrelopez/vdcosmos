"use client";

interface PeceraSummaryProps {
  totalPies: number;
  costoVidrio: number;
  usarAluminio: boolean;
  longitudAluminioMetros: number;
  costoAluminio: number;
  porcentajeManoObra: number;
  costoManoObra: number;
  total: number;
}

export default function PeceraSummary({
  totalPies, costoVidrio, usarAluminio, longitudAluminioMetros, costoAluminio, 
  porcentajeManoObra, costoManoObra, total
}: PeceraSummaryProps) {
  return (
    <div className="bg-cosmos-blue text-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Resumen de Cotización</h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-100">Área total de vidrio:</span>
          <span className="font-medium">{totalPies.toFixed(2)} pie²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-100">Costo del vidrio:</span>
          <span className="font-medium">S/ {costoVidrio.toFixed(2)}</span>
        </div>
        
        {usarAluminio && (
          <div className="flex justify-between">
            <span className="text-zinc-100">Costo aluminio ({longitudAluminioMetros.toFixed(2)}m):</span>
            <span className="font-medium">S/ {costoAluminio.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-zinc-100">Mano de Obra y Silicona ({porcentajeManoObra}%):</span>
          <span className="font-medium">S/ {costoManoObra.toFixed(2)}</span>
        </div>
        
        {/* Línea divisoria y total */}
        <div className="border-t border-white/20 my-3 pt-3 flex justify-between items-baseline">
          <span className="text-sm font-medium text-zinc-100">Total Estimado:</span>
          <span className="text-3xl font-extrabold text-white">S/ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
