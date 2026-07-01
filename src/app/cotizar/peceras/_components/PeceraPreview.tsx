"use client";

interface PeceraPreviewProps {
  largo: number;
  ancho: number;
  alto: number;
  usarAluminio: boolean;
}

export default function PeceraPreview({ largo, ancho, alto, usarAluminio }: PeceraPreviewProps) {
  // Configuración de la proyección Cavalier (Efecto 3D)
  const k = 0.35; // Factor de profundidad
  
  // Cálculo de escala para que el dibujo quepa en el canvas de 500x350
  const padding = 60;
  const availableWidth = 500 - padding * 2;
  const availableHeight = 350 - padding * 2;
  
  const drawingWidthBase = largo + ancho * k;
  const drawingHeightBase = alto + ancho * k;
  
  const scaleX = drawingWidthBase > 0 ? availableWidth / drawingWidthBase : 1;
  const scaleY = drawingHeightBase > 0 ? availableHeight / drawingHeightBase : 1;
  const scale = Math.min(scaleX, scaleY);
  
  // Punto de origen centrado
  const x0 = (500 - drawingWidthBase * scale) / 2;
  const y0 = (350 + drawingHeightBase * scale) / 2;

  // Cálculo de los 8 puntos del cubo (x, y) en el SVG
  const p1 = { x: x0, y: y0 }; // Frente-Abajo-Izquierda
  const p2 = { x: x0 + largo * scale, y: y0 }; // Frente-Abajo-Derecha
  const p3 = { x: x0 + largo * scale, y: y0 - alto * scale }; // Frente-Arriba-Derecha
  const p4 = { x: x0, y: y0 - alto * scale }; // Frente-Arriba-Izquierda
  
  const p5 = { x: x0 + ancho * scale * k, y: y0 - ancho * scale * k }; // Atrás-Abajo-Izquierda
  const p6 = { x: x0 + largo * scale + ancho * scale * k, y: y0 - ancho * scale * k }; // Atrás-Abajo-Derecha
  const p7 = { x: x0 + largo * scale + ancho * scale * k, y: y0 - alto * scale - ancho * scale * k }; // Atrás-Arriba-Derecha
  const p8 = { x: x0 + ancho * scale * k, y: y0 - alto * scale - ancho * scale * k }; // Atrás-Arriba-Izquierda

  return (
    <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-center min-h-[400px]">
      <svg width="100%" height="350" viewBox="0 0 500 350" className="max-w-md mx-auto">
        {/* Líneas traseras (efecto de transparencia de vidrio) */}
        <line x1={p5.x} y1={p5.y} x2={p6.x} y2={p6.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-zinc-300 dark:stroke-zinc-700"} strokeDasharray="4,4" strokeWidth={usarAluminio ? "3" : "1"} />
        <line x1={p5.x} y1={p5.y} x2={p8.x} y2={p8.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-zinc-300 dark:stroke-zinc-700"} strokeDasharray="4,4" strokeWidth={usarAluminio ? "3" : "1"} />
        <line x1={p5.x} y1={p5.y} x2={p1.x} y2={p1.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-zinc-300 dark:stroke-zinc-700"} strokeDasharray="4,4" strokeWidth={usarAluminio ? "3" : "1"} />

        {/* Rellenos de las caras con opacidad suave */}
        <polygon points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p6.x},${p6.y} ${p5.x},${p5.y}`} className="fill-cosmos-blue/5 stroke-none" />
        <polygon points={`${p5.x},${p5.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p8.x},${p8.y}`} className="fill-cosmos-blue/5 stroke-none" />
        <polygon points={`${p1.x},${p1.y} ${p5.x},${p5.y} ${p8.x},${p8.y} ${p4.x},${p4.y}`} className="fill-cosmos-blue/10 stroke-none" />
        <polygon points={`${p2.x},${p2.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p3.x},${p3.y}`} className="fill-cosmos-blue/10 stroke-none" />
        <polygon points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`} className="fill-cosmos-blue/15 dark:fill-cosmos-blue/20 stroke-none" />

        {/* Aristas Frontales (Visibles) */}
        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-cosmos-blue dark:stroke-cosmos-light"} strokeWidth={usarAluminio ? "4" : "2"} />
        <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-cosmos-blue dark:stroke-cosmos-light"} strokeWidth={usarAluminio ? "4" : "2"} />
        <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} className="stroke-cosmos-blue dark:stroke-cosmos-light" strokeWidth="2" />
        <line x1={p4.x} y1={p4.y} x2={p1.x} y2={p1.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-cosmos-blue dark:stroke-cosmos-light"} strokeWidth={usarAluminio ? "4" : "2"} />
        <line x1={p2.x} y1={p2.y} x2={p6.x} y2={p6.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-cosmos-blue dark:stroke-cosmos-light"} strokeWidth={usarAluminio ? "4" : "2"} />
        <line x1={p3.x} y1={p3.y} x2={p7.x} y2={p7.y} className="stroke-cosmos-blue dark:stroke-cosmos-light" strokeWidth="2" />
        <line x1={p4.x} y1={p4.y} x2={p8.x} y2={p8.y} className="stroke-cosmos-blue dark:stroke-cosmos-light" strokeWidth="2" />
        <line x1={p6.x} y1={p6.y} x2={p7.x} y2={p7.y} className={usarAluminio ? "stroke-slate-500 dark:stroke-slate-400" : "stroke-cosmos-blue dark:stroke-cosmos-light"} strokeWidth={usarAluminio ? "4" : "2"} />
        <line x1={p7.x} y1={p7.y} x2={p8.x} y2={p8.y} className="stroke-cosmos-blue dark:stroke-cosmos-light" strokeWidth="2" />

        {/* Etiquetas de Medidas */}
        <text x={x0 + (largo * scale) / 2} y={y0 + 20} className="fill-zinc-600 dark:fill-zinc-400 text-[10px] font-medium" textAnchor="middle">
          Largo: {largo} cm
        </text>
        <text x={x0 - 10} y={y0 - (alto * scale) / 2} className="fill-zinc-600 dark:fill-zinc-400 text-[10px] font-medium" textAnchor="end" dominantBaseline="middle">
          Alto: {alto} cm
        </text>
        <text x={p2.x + (ancho * scale * k) / 2 + 10} y={p2.y - (ancho * scale * k) / 2} className="fill-zinc-600 dark:fill-zinc-400 text-[10px] font-medium" textAnchor="start" dominantBaseline="middle">
          Ancho: {ancho} cm
        </text>
      </svg>
    </div>
  );
}
