"use client";

import { useState } from "react";
import { Material } from "@/lib/types";

interface PeceraFormProps {
  largo: number;
  ancho: number;
  alto: number;
  materialId: string;
  usarAluminio: boolean;
  aluminioId: string;
  porcentajeManoObra: number;
  vidrios: Material[];
  aluminios: Material[];
  volumenLitros: number;
  // Funciones para actualizar el estado en el componente padre
  setLargo: (val: number) => void;
  setAncho: (val: number) => void;
  setAlto: (val: number) => void;
  setMaterialId: (val: string) => void;
  setUsarAluminio: (val: boolean) => void;
  setAluminioId: (val: string) => void;
  setPorcentajeManoObra: (val: number) => void;
}

export default function PeceraForm({
  largo, ancho, alto, materialId, usarAluminio, aluminioId, porcentajeManoObra,
  vidrios, aluminios, volumenLitros,
  setLargo, setAncho, setAlto, setMaterialId, setUsarAluminio, setAluminioId, setPorcentajeManoObra
}: PeceraFormProps) {
  const [alerta, setAlerta] = useState<string>("");

  // Función para mostrar alertas temporales
  const mostrarAlerta = (mensaje: string) => {
    setAlerta(mensaje);
    setTimeout(() => setAlerta(""), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sección: Dimensiones */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Dimensiones (cm)
          </h2>
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md font-bold print:hidden">
            {volumenLitros.toFixed(1)} L
          </span>
        </div>
        
        {alerta && (
          <div className="mb-4 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs rounded-lg font-medium border border-amber-200 dark:border-amber-800/50">
            ⚠️ {alerta}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Largo</label>
            <input
              type="number"
              min={20}
              max={100}
              value={largo}
              onChange={(e) => setLargo(parseFloat(e.target.value) || 0)}
              onBlur={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (val < 20) { setLargo(20); mostrarAlerta("El largo mínimo es 20 cm."); }
                else if (val > 100) { setLargo(100); mostrarAlerta("El largo máximo es 100 cm."); }
              }}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Ancho</label>
            <input
              type="number"
              min={20}
              max={100}
              value={ancho}
              onChange={(e) => setAncho(parseFloat(e.target.value) || 0)}
              onBlur={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (val < 20) { setAncho(20); mostrarAlerta("El ancho mínimo es 20 cm."); }
                else if (val > 100) { setAncho(100); mostrarAlerta("El ancho máximo es 100 cm."); }
              }}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Alto</label>
            <input
              type="number"
              min={20}
              max={100}
              value={alto}
              onChange={(e) => setAlto(parseFloat(e.target.value) || 0)}
              onBlur={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (val < 20) { setAlto(20); mostrarAlerta("El alto mínimo es 20 cm."); }
                else if (val > 100) { setAlto(100); mostrarAlerta("El alto máximo es 100 cm."); }
              }}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Sección: Materiales */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Materiales y Costos
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">Tipo de Vidrio</label>
            <select
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white"
            >
              {vidrios.map((m) => (
                <option key={m.codigo} value={m.codigo}>
                  {m.nombre} - S/ {m.precio} / pie²
                </option>
              ))}
            </select>
          </div>

          {/* Opciones de Aluminio */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="usarAluminio"
                checked={usarAluminio}
                onChange={(e) => setUsarAluminio(e.target.checked)}
                className="w-4 h-4 text-cosmos-red border-zinc-300 rounded focus:ring-cosmos-red"
              />
              <label htmlFor="usarAluminio" className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                Agregar filo de aluminio
              </label>
            </div>

            {usarAluminio && (
              <div className="mt-3">
                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Medida de Aluminio</label>
                <div className="flex gap-2">
                  {aluminios.map((m) => {
                    const isActive = aluminioId === m.codigo;
                    const label = m.nombre.includes("1/2") ? '1/2"' : '3/4"';
                    return (
                      <button
                        key={m.codigo}
                        type="button"
                        onClick={() => setAluminioId(m.codigo)}
                        className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-sm transition-all ${
                          isActive
                            ? "border-cosmos-blue bg-cosmos-blue text-white shadow-sm"
                            : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-cosmos-blue dark:hover:text-cosmos-light"
                        }`}
                      >
                        {label}
                        <div className={`text-xs mt-0.5 ${isActive ? "text-white/80" : "text-zinc-600 dark:text-zinc-400"}`}>
                          S/ {m.precio} / m
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Mano de Obra y Silicona (%)
            </label>
            <input
              type="number"
              value={porcentajeManoObra}
              onChange={(e) => setPorcentajeManoObra(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmos-red focus:border-cosmos-red dark:focus:ring-cosmos-red/60 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
