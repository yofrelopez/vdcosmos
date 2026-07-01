"use client";

import { useState } from "react";
import { Material } from "@/lib/types";

// Propiedades que recibe el modal
interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialId: string;
  molduraId: string;
  materiales: Material[];
  anchoEfectivo: number;
  altoEfectivo: number;
  isEspejo: boolean;
  tipoCuadro: "directo" | "fondo";
  tipoFondo: "cartulina" | "doble_vidrio";
  areaPie2: number;
  onApply: (data: { molduraId: string; materialId: string; isCustomMoldura: boolean }) => void;
  isCustomMoldura: boolean;
}

export default function MolduraModal({
  isOpen,
  onClose,
  materialId,
  molduraId,
  materiales,
  anchoEfectivo,
  altoEfectivo,
  isEspejo,
  tipoCuadro,
  tipoFondo,
  areaPie2,
  onApply,
  isCustomMoldura,
}: Props) {
  // Filtrar materiales por categoría
  const vidrios = materiales.filter((m) => m.categoria === "Vidrios");
  const espejos = materiales.filter((m) => m.categoria === "Espejos");
  const molduras = materiales.filter((m) => m.categoria === "Molduras");

  // Estado temporal para el vidrio/espejo seleccionado
  const [tempMaterialId, setTempMaterialId] = useState<string>(materialId);
  
  // Estado para la pestaña activa (Calidad)
  const [activeTab, setActiveTab] = useState<string>(() => {
    const currentMoldura = molduras.find((m) => m.codigo === molduraId);
    if (currentMoldura && !isCustomMoldura) {
      if (currentMoldura.codigo.endsWith("ECO")) return "ECO";
      if (currentMoldura.codigo.endsWith("STD")) return "STD";
      if (currentMoldura.codigo.endsWith("FINO")) return "FINO";
    }
    return "STD";
  });

  // Si el modal está cerrado, no renderiza nada
  if (!isOpen) return null;

  const espesores = ["1/2\"", "3/4\"", "1\"", "1 1/2\"", "2\"", "2 1/2\""];
  const calidades = ["ECO", "STD", "FINO"];
  const calidadLabels: { [key: string]: string } = { ECO: "Económico", STD: "Standard", FINO: "Fino" };

  // Buscar moldura por espesor y calidad
  const getMolduraBySpec = (esp: string, cal: string) => {
    const codeMap: { [key: string]: string } = {
      "1/2\"": "050", "3/4\"": "075", "1\"": "100", "1 1/2\"": "150", "2\"": "200", "2 1/2\"": "250"
    };
    const code = `MOL-${codeMap[esp]}-${cal}`;
    return molduras.find((m) => m.codigo === code);
  };

  const getMaterial = (id: string) => {
    return materiales.find((m) => m.codigo === id);
  };

  // Calcular el total estimado dentro del modal
  const calcularTotalModal = (moldura: Material, matId: string) => {
    const pMat = getMaterial(matId) ? parseFloat(getMaterial(matId)!.precio) : 0;
    const pMol = parseFloat(moldura.precio);
    const espPulg = parseFloat(moldura.espesor_pulgadas || "0");
    const espC = espPulg * 2.54;

    const cMat = areaPie2 * pMat;
    const cFon = (tipoCuadro === "fondo" && !isEspejo)
      ? (tipoFondo === "cartulina" ? areaPie2 * 2 : areaPie2 * 5)
      : 0;
    const lMolCm = (2 * (altoEfectivo + anchoEfectivo)) + (8 * espC);
    const lMolM = lMolCm / 100;
    const cMol = lMolM * pMol;

    return cMat + cMol + cFon;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto flex flex-col">
        
        {/* Cabecera del Modal */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Seleccionar Moldura y Cobertura</h3>
            <p className="text-xs text-zinc-500">Para {anchoEfectivo} x {altoEfectivo} cm</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-cosmos-red dark:hover:text-cosmos-red p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">✕</button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-auto">
          
          {/* Columna Izquierda: Lista de Molduras */}
          <div className="flex-1 flex flex-col border-r border-zinc-100 dark:border-zinc-800">
            
            {/* Pestañas de Calidad */}
            <div className="flex border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
              {calidades.map((cal) => (
                <button
                  key={cal}
                  onClick={() => setActiveTab(cal)}
                  className={`flex-1 py-3 text-xs font-medium transition-all border-b-2 ${
                    activeTab === cal
                      ? "border-cosmos-blue text-cosmos-blue bg-white dark:bg-zinc-900"
                      : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  {calidadLabels[cal]}
                </button>
              ))}
            </div>

            {/* Grid de Molduras */}
            <div className="p-6 overflow-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {espesores.map((esp) => {
                  const moldura = getMolduraBySpec(esp, activeTab);
                  if (!moldura) return null;
                  
                  const isSelected = !isCustomMoldura && moldura.codigo === molduraId;
                  const totalCalculado = calcularTotalModal(moldura, tempMaterialId);

                  return (
                    <div
                      key={esp}
                      onClick={() => {
                        onApply({ molduraId: moldura.codigo, materialId: tempMaterialId, isCustomMoldura: false });
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between h-28 ${
                        isSelected
                          ? "border-cosmos-blue bg-blue-50/50 dark:bg-blue-900/10"
                          : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cosmos-blue/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-bold text-zinc-900 dark:text-white">
                            {esp}
                          </div>
                          <div className="text-xs text-zinc-500">
                            S/ {parseFloat(moldura.precio).toFixed(2)} / m
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-xs bg-cosmos-red text-white px-2 py-0.5 rounded-full font-semibold">
                            Actual
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-baseline mt-2">
                        <span className="text-xs font-medium text-zinc-400">Total:</span>
                        <span className="text-lg font-extrabold text-zinc-600 dark:text-zinc-300">
                          S/ {totalCalculado.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Opciones de Cobertura */}
          <div className="w-full md:w-64 bg-cosmos-blue/[0.03] dark:bg-zinc-800/20 p-6 flex flex-col gap-4">
            <div>
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                {isEspejo ? "Tipo de Espejo" : "Tipo de Vidrio"}
              </h4>
              <div className="flex flex-col gap-2">
                {isEspejo ? (
                  espejos.map((m) => (
                    <button
                      key={m.codigo}
                      onClick={() => setTempMaterialId(m.codigo)}
                      className={`w-full py-2.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all text-left flex justify-between items-center ${
                        tempMaterialId === m.codigo
                          ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-cosmos-blue hover:text-cosmos-blue"
                      }`}
                    >
                      <span>{m.nombre.replace("Espejo ", "")}</span>
                      <span className="font-bold">S/ {m.precio}</span>
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      onClick={() => setTempMaterialId("NONE")}
                      className={`w-full py-2.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all text-left flex justify-between items-center ${
                        tempMaterialId === "NONE"
                          ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-cosmos-blue hover:text-cosmos-blue"
                      }`}
                    >
                      <span>Sin Vidrio</span>
                      <span className="font-bold">S/ 0.00</span>
                    </button>
                    {vidrios.map((m) => (
                      <button
                        key={m.codigo}
                        onClick={() => setTempMaterialId(m.codigo)}
                        className={`w-full py-2.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-all text-left flex justify-between items-center ${
                          tempMaterialId === m.codigo
                            ? "border-cosmos-blue bg-blue-50 dark:bg-blue-900/20 text-cosmos-blue shadow-sm"
                            : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-cosmos-blue hover:text-cosmos-blue"
                        }`}
                      >
                        <span>{m.nombre.replace("Vidrio ", "")}</span>
                        <span className="font-bold">S/ {m.precio}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Botón para Moldura Especial */}
            <div className="mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => {
                  onApply({ molduraId, materialId: tempMaterialId, isCustomMoldura: true });
                }}
                className={`w-full py-2.5 px-3 rounded-lg border border-dashed text-xs font-medium cursor-pointer transition-all text-left flex justify-between items-center ${
                  isCustomMoldura
                    ? "border-cosmos-blue bg-blue-50 text-cosmos-blue"
                    : "border-zinc-300 dark:border-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-cosmos-blue hover:text-cosmos-blue"
                }`}
              >
                <span>+ Moldura Especial</span>
                <span className="font-bold">Manual</span>
              </button>
            </div>

            {/* Info de ayuda */}
            <div className="mt-auto p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
              💡 Selecciona el material de cobertura y luego la moldura para aplicar los cambios.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
