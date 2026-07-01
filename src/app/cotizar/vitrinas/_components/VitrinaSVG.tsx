"use client";

import React from "react";

interface VitrinaSVGProps {
  w: number; // Ancho escalado (px)
  h: number; // Alto escalado (px)
  d: number; // Fondo escalado (px)
  offsetX: number; // Desplazamiento X para perspectiva
  offsetY: number; // Desplazamiento Y para perspectiva
  perfilId: string; // ID del material (Cuadrado vs Ovalado)
  cantidadRepisas: number;
  ruedas: string; // "ninguna" | "pequena" | "mediana" | "grande"
  ancho: number; // Ancho real (cm)
  alto: number; // Alto real (cm)
  fondo: number; // Fondo real (cm)
}

export default function VitrinaSVG({ 
  w, h, offsetX, offsetY, perfilId, cantidadRepisas, ruedas, ancho, alto, fondo
}: VitrinaSVGProps) {
  
  const isOval = perfilId === "VIT-ALU-002";
  const pw = 10; 

  const style = {
    glassOpacity: 0.15,
    shelfOpacity: 0.4,
    colors: {
      alu: "#cbd5e1",
      aluDark: "#475569",
      aluLight: "#f8fafc",
      glass: "#e0f2fe",
      glassEdge: "#0891b2", 
      glassBorder: "rgba(14, 165, 233, 0.4)",
      paflon: "#f8fafc",
      handle: "#0f172a"
    }
  };

  const hasRuedas = ruedas === "mediana" || ruedas === "grande";
  const hasRegaton = ruedas === "pequena";

  // Función para dibujar un soporte de movilidad (Rueda o Regatón)
  const renderMobilityItem = (x: number, y: number) => (
    <g>
      {hasRuedas ? (
        <g>
          <rect x={x + 1} y={y} width={8} height={12} fill="url(#gradSquareV)" stroke="#94a3b8" strokeWidth="0.3" />
          <circle cx={x + 5} cy={y + 18} r={7} fill="#1e293b" />
          <circle cx={x + 5} cy={y + 18} r={2} fill="#94a3b8" />
        </g>
      ) : hasRegaton ? (
        <rect x={x + 1} y={y} width={8} height={6} fill="#020617" rx={1} />
      ) : null}
    </g>
  );

  return (
    <svg 
      viewBox={`-50 -30 ${w + offsetX + 100} ${h + offsetY + 130}`} 
      className="w-full h-auto drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="gradSquareH" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" /><stop offset="20%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="gradSquareV" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" /><stop offset="20%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="gradOvalH" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748b" /><stop offset="50%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="gradOvalV" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" /><stop offset="50%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="gradDepth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" /><stop offset="40%" stopColor="#cbd5e1" /><stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="gradReflejo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" /><stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" /><stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="gradSombra" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 0. SOMBRA EN EL SUELO */}
      {(hasRuedas || hasRegaton) && (
        <ellipse 
          cx={w/2 + offsetX/2} cy={h + offsetY + 25} 
          rx={w/2 + 20} ry={offsetY/3} 
          fill="url(#gradSombra)" 
        />
      )}

      {/* 1. RUEDAS TRASERAS (Ocultas por la vitrina) */}
      {renderMobilityItem(offsetX, h)}
      {renderMobilityItem(w + offsetX - pw, h)}

      {/* 2. ESTRUCTURA TRASERA */}
      <g>
        <rect x={offsetX} y={0} width={w} height={pw} fill={isOval ? "url(#gradOvalH)" : "url(#gradSquareH)"} rx={isOval ? pw/2 : 1} />
        <rect x={offsetX} y={h - pw} width={w} height={pw} fill={isOval ? "url(#gradOvalH)" : "url(#gradSquareH)"} rx={isOval ? pw/2 : 1} />
        <rect x={offsetX} y={0} width={pw} height={h} fill={isOval ? "url(#gradOvalV)" : "url(#gradSquareV)"} rx={isOval ? pw/2 : 1} />
        <rect x={w + offsetX - pw} y={0} width={pw} height={h} fill={isOval ? "url(#gradOvalV)" : "url(#gradSquareV)"} rx={isOval ? pw/2 : 1} />
      </g>

      {/* 3. TUBOS DE PROFUNDIDAD */}
      <g>
        <path d={`M 0 ${offsetY} L ${offsetX} 0 L ${offsetX + pw} 0 L ${pw} ${offsetY} Z`} fill="url(#gradDepth)" />
        <path d={`M ${w - pw} ${offsetY} L ${w + offsetX - pw} 0 L ${w + offsetX} 0 L ${w} ${offsetY} Z`} fill="url(#gradDepth)" />
        <path d={`M 0 ${h + offsetY - pw} L ${offsetX} ${h - pw} L ${offsetX + pw} ${h - pw} L ${pw} ${h + offsetY - pw} Z`} fill="url(#gradDepth)" />
        <path d={`M ${w - pw} ${h + offsetY - pw} L ${w + offsetX - pw} ${h - pw} L ${w + offsetX} ${h - pw} L ${w} ${h + offsetY - pw} Z`} fill="url(#gradDepth)" />
      </g>

      {/* 4. CONTENIDOS (Paflón tapará las ruedas traseras) */}
      <g>
        <path d={`M ${pw + 2} ${offsetY + pw + 2} L ${offsetX + pw} ${pw + 2} L ${offsetX + pw} ${h - pw - 2} L ${pw + 2} ${h + offsetY - pw - 2} Z`} fill={style.colors.glass} fillOpacity={style.glassOpacity} />
        <path d={`M ${pw} ${h + offsetY - pw} L ${offsetX + pw} ${h - pw} L ${w + offsetX - pw} ${h - pw} L ${w - pw} ${h + offsetY - pw} Z`} fill={style.colors.paflon} />
        
        {Array.from({ length: cantidadRepisas }).map((_, i) => {
          const yPos = (h / (cantidadRepisas + 1)) * (i + 1);
          return (
            <g key={i}>
              <rect x={1} y={yPos + offsetY} width={6} height={2} fill={style.colors.aluDark} />
              <rect x={w - 7} y={yPos + offsetY} width={6} height={2} fill={style.colors.aluDark} />
              <path d={`M ${pw+2} ${yPos + offsetY} L ${w - pw-2} ${yPos + offsetY} L ${w + offsetX - pw-2} ${yPos} L ${offsetX + pw+2} ${yPos} Z`} fill={style.colors.glass} fillOpacity={style.shelfOpacity} />
              <rect x={pw+2} y={yPos + offsetY} width={w - pw*2 - 4} height={2} fill={style.colors.glassEdge} />
              <path d={`M ${pw+2} ${yPos + offsetY} L ${offsetX + pw+2} ${yPos} L ${offsetX + pw+2} ${yPos + 2} L ${pw+2} ${yPos + offsetY + 2} Z`} fill={style.colors.glassEdge} opacity="0.6" />
              <path d={`M ${w-pw-2} ${yPos + offsetY} L ${w+offsetX-pw-2} ${yPos} L ${w+offsetX-pw-2} ${yPos + 2} L ${w-pw-2} ${yPos + offsetY + 2} Z`} fill={style.colors.glassEdge} opacity="0.6" />
            </g>
          );
        })}
      </g>

      {/* 5. ESTRUCTURA FRONTAL */}
      <g>
        <rect x={0} y={offsetY} width={pw} height={h} fill={isOval ? "url(#gradOvalV)" : "url(#gradSquareV)"} rx={isOval ? pw/2 : 1} />
        <rect x={w - pw} y={offsetY} width={pw} height={h} fill={isOval ? "url(#gradOvalV)" : "url(#gradSquareV)"} rx={isOval ? pw/2 : 1} />
        <rect x={0} y={offsetY} width={w} height={pw} fill={isOval ? "url(#gradOvalH)" : "url(#gradSquareH)"} rx={isOval ? pw/2 : 1} />
        <rect x={0} y={h + offsetY - pw} width={w} height={pw} fill={isOval ? "url(#gradOvalH)" : "url(#gradSquareH)"} rx={isOval ? pw/2 : 1} />
      </g>

      {/* 6. TAPA SUPERIOR */}
      <g>
        <path d={`M ${pw + 1} ${offsetY + pw} L ${offsetX + pw + 1} ${pw} L ${w + offsetX - pw - 1} ${pw} L ${w - pw - 1} ${offsetY + pw} Z`} fill={style.colors.glass} fillOpacity="0.2" stroke={style.colors.glassBorder} strokeWidth="0.5" />
        <path d={`M ${pw + 1} ${offsetY + pw} L ${offsetX + pw + 1} ${pw} L ${w + offsetX - pw - 1} ${pw} L ${w - pw - 1} ${offsetY + pw} Z`} fill="url(#gradReflejo)" />
      </g>

      {/* 7. PUERTAS */}
      <g>
        <rect x={pw + 2} y={offsetY + pw + 2} width={w/2 - pw + 5} height={h - pw*2 - 4} fill="none" stroke={style.colors.glassBorder} strokeWidth="0.5" />
        <rect x={w/2 - 4} y={h/2 + offsetY - 20} width={2} height={40} fill={style.colors.handle} rx={1} />
        <rect x={w/2 + 4} y={h/2 + offsetY - 20} width={2} height={40} fill={style.colors.handle} rx={1} />
      </g>

      {/* 8. RUEDAS FRONTALES (Siempre visibles) */}
      {renderMobilityItem(0, h + offsetY)}
      {renderMobilityItem(w - pw, h + offsetY)}

      {/* 9. COTAS / GUÍAS DE MEDIDAS TÉCNICAS */}
      <g stroke="#6366f1" strokeWidth="1" opacity="0.85">
        {/* -- COTA DE ANCHO (FRONTAL INFERIOR) -- */}
        <line x1={0} y1={h + offsetY + 35} x2={w} y2={h + offsetY + 35} />
        <line x1={0} y1={h + offsetY + 8} x2={0} y2={h + offsetY + 40} strokeDasharray="2,2" />
        <line x1={w} y1={h + offsetY + 8} x2={w} y2={h + offsetY + 40} strokeDasharray="2,2" />
        <line x1={-3} y1={h + offsetY + 38} x2={3} y2={h + offsetY + 32} strokeWidth="1.5" />
        <line x1={w - 3} y1={h + offsetY + 38} x2={w + 3} y2={h + offsetY + 32} strokeWidth="1.5" />
        <g stroke="none">
          <rect x={w / 2 - 25} y={h + offsetY + 27} width={50} height={16} rx={4} className="fill-zinc-50 dark:fill-zinc-950" />
          <text x={w / 2} y={h + offsetY + 39} className="fill-indigo-600 dark:fill-indigo-400 text-[10px] font-black text-anchor-middle" textAnchor="middle">
            {ancho} cm
          </text>
        </g>

        {/* -- COTA DE ALTO (LATERAL IZQUIERDA) -- */}
        <line x1={-25} y1={offsetY} x2={-25} y2={h + offsetY} />
        <line x1={-5} y1={offsetY} x2={-30} y2={offsetY} strokeDasharray="2,2" />
        <line x1={-5} y1={h + offsetY} x2={-30} y2={h + offsetY} strokeDasharray="2,2" />
        <line x1={-28} y1={offsetY + 3} x2={-22} y2={offsetY - 3} strokeWidth="1.5" />
        <line x1={-28} y1={h + offsetY + 3} x2={-22} y2={h + offsetY - 3} strokeWidth="1.5" />
        <g stroke="none" transform={`translate(-35, ${h / 2 + offsetY}) rotate(-90)`}>
          <rect x={-25} y={-8} width={50} height={16} rx={4} className="fill-zinc-50 dark:fill-zinc-950" />
          <text x={0} y={4} className="fill-indigo-600 dark:fill-indigo-400 text-[10px] font-black text-anchor-middle" textAnchor="middle">
            {alto} cm
          </text>
        </g>

        {/* -- COTA DE FONDO (LATERAL DERECHA INFERIOR EN PERSPECTIVA) -- */}
        <line x1={w + 35} y1={h + offsetY + 20} x2={w + offsetX + 35} y2={h + 20} />
        <line x1={w + 5} y1={h + offsetY + 2} x2={w + 40} y2={h + offsetY + 23} strokeDasharray="2,2" />
        <line x1={w + offsetX + 5} y1={h + 2} x2={w + offsetX + 40} y2={h + 23} strokeDasharray="2,2" />
        <line x1={w + 32} y1={h + offsetY + 23} x2={w + 38} y2={h + offsetY + 17} strokeWidth="1.5" />
        <line x1={w + offsetX + 32} y1={h + 23} x2={w + offsetX + 38} y2={h + 17} strokeWidth="1.5" />
        <g stroke="none">
          <rect x={w + offsetX / 2 + 10} y={h + offsetY / 2 + 12} width={50} height={16} rx={4} className="fill-zinc-50 dark:fill-zinc-950" />
          <text x={w + offsetX / 2 + 35} y={h + offsetY / 2 + 24} className="fill-indigo-600 dark:fill-indigo-400 text-[10px] font-black text-anchor-middle" textAnchor="middle">
            {fondo} cm
          </text>
        </g>
      </g>
    </svg>
  );
}
