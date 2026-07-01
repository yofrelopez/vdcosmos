"use client";

import { RuedaTipo, FondoTipo } from "../VitrinaCalculator";
import { Material } from "@/lib/types";

const abbreviateName = (name: string) => {
  return name
    .replace(/Tubo Cuadrado 1\.5"\s*x\s*1\.5"/i, "Tubo Cuad. 1.5\"")
    .replace(/Tubo 1\.5"\s+Ovalado/i, "Tubo Oval. 1.5\"")
    .replace(/Vidrio Incoloro/i, "Vidrio");
};

interface Props {
  ancho: number;
  setAncho: (v: number) => void;
  alto: number;
  setAlto: (v: number) => void;
  fondo: number;
  setFondo: (v: number) => void;
  perfilId: string;
  setPerfilId: (v: string) => void;
  fondoTipo: FondoTipo;
  setFondoTipo: (v: FondoTipo) => void;
  ruedas: RuedaTipo;
  setRuedas: (v: RuedaTipo) => void;
  cantidadRepisas: number;
  setCantidadRepisas: (v: number) => void;
  manoObraPorcentaje: number;
  setManoObraPorcentaje: (v: number) => void;
  perfiles: Material[];
}

export default function VitrinaForm({
  ancho, setAncho,
  alto, setAlto,
  fondo, setFondo,
  perfilId, setPerfilId,
  fondoTipo, setFondoTipo,
  ruedas, setRuedas,
  cantidadRepisas, setCantidadRepisas,
  manoObraPorcentaje, setManoObraPorcentaje,
  perfiles
}: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
        Parámetros de Diseño
      </h2>
      
      {/* Medidas Principales */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Ancho (cm)</label>
          <input 
            type="number" value={ancho}
            min={40} max={300}
            onChange={(e) => setAncho(Math.max(0, Number(e.target.value)))}
            onBlur={() => {
              if (ancho < 40) setAncho(40);
              else if (ancho > 300) setAncho(300);
            }}
            className="w-full h-10 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-zinc-800 dark:text-white outline-none font-bold text-sm text-center focus:border-indigo-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Alto (cm)</label>
          <input 
            type="number" value={alto}
            min={40} max={300}
            onChange={(e) => setAlto(Math.max(0, Number(e.target.value)))}
            onBlur={() => {
              if (alto < 40) setAlto(40);
              else if (alto > 300) setAlto(300);
            }}
            className="w-full h-10 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-zinc-800 dark:text-white outline-none font-bold text-sm text-center focus:border-indigo-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Fondo (cm)</label>
          <input 
            type="number" value={fondo}
            min={20} max={150}
            onChange={(e) => setFondo(Math.max(0, Number(e.target.value)))}
            onBlur={() => {
              if (fondo < 20) setFondo(20);
              else if (fondo > 150) setFondo(150);
            }}
            className="w-full h-10 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-zinc-800 dark:text-white outline-none font-bold text-sm text-center focus:border-indigo-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selección de Materiales */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Perfil Estructural</label>
            <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 hover:border-indigo-300 dark:hover:border-indigo-900 transition-colors">
              <select 
                value={perfilId} onChange={(e) => setPerfilId(e.target.value)}
                className="w-full bg-transparent pl-3 pr-10 py-2 text-zinc-800 dark:text-white outline-none appearance-none cursor-pointer font-medium text-sm h-10"
              >
                {perfiles.map(m => <option key={m.codigo} value={m.codigo} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">{abbreviateName(m.nombre)}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-indigo-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones de Estructura */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Tipo de Fondo</label>
            <div className="flex bg-zinc-100 dark:bg-zinc-800/80 rounded-xl p-1 h-10 items-center">
              {(["vidrio", "espejo", "nordex"] as FondoTipo[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFondoTipo(t)}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    fondoTipo === t
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {t === "vidrio" ? "Vidrio" : t === "espejo" ? "Espejo" : "Nordex"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Base y Movilidad</label>
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl p-1">
              {(["ninguna", "pequena", "mediana", "grande"] as RuedaTipo[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRuedas(r)}
                  className={`text-center py-2 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    ruedas === r
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {r === "ninguna" ? "Sin Ruedas" : r === "pequena" ? "Ruedas Peq." : r === "mediana" ? "Medianas" : "Grandes"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Repisas y Mano de Obra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Cantidad Repisas</label>
          <div className="flex items-stretch h-10 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/50">
            <button 
              type="button"
              onClick={() => setCantidadRepisas(Math.max(0, cantidadRepisas - 1))}
              className="px-4 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-600 dark:text-zinc-300 transition-all font-bold text-lg select-none active:scale-90"
            >
              -
            </button>
            <input 
              type="number" value={cantidadRepisas} 
              min="0" max="10"
              onChange={(e) => setCantidadRepisas(Math.max(0, Number(e.target.value)))}
              onBlur={() => {
                if (cantidadRepisas < 0) setCantidadRepisas(0);
                else if (cantidadRepisas > 10) setCantidadRepisas(10);
              }}
              className="w-full text-center bg-transparent text-zinc-800 dark:text-white outline-none font-bold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button 
              type="button"
              onClick={() => setCantidadRepisas(Math.min(10, cantidadRepisas + 1))}
              className="px-4 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-600 dark:text-zinc-300 transition-all font-bold text-lg select-none active:scale-90"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Mano de Obra</label>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 rounded-full">{manoObraPorcentaje}%</span>
          </div>
          <div className="flex items-center h-10">
            <input 
              type="range" 
              min="0" 
              max="150" 
              step="5"
              value={manoObraPorcentaje} 
              onChange={(e) => setManoObraPorcentaje(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
