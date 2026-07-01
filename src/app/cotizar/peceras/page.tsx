import path from "path";
import PeceraCalculator from "./PeceraCalculator";
import { parseMaterialesCSV } from "@/lib/utils/csv";
import { Material } from "@/lib/types";

export const metadata = {
  title: "Calculadora de Peceras a Medida - Vidriería Cosmos",
  description: "Calculadora técnica para cotizar volumen, dimensiones, espesor recomendado de vidrios y costo de materiales para peceras a medida.",
};

export default async function PecerasPage() {
  const filePath = path.join(process.cwd(), "data", "materiales.csv");
  let materiales: Material[] = [];

  try {
    materiales = await parseMaterialesCSV(filePath);
  } catch (error) {
    console.error("Error reading materiales.csv:", error);
    // Fallback data
    materiales = [
      { codigo: "VID-001", nombre: "Vidrio Incoloro 4mm", precio: "6.00", unidad: "pie2", categoria: "Vidrios" },
      { codigo: "VID-002", nombre: "Vidrio Incoloro 6mm", precio: "7.00", unidad: "pie2", categoria: "Vidrios" },
      { codigo: "VID-003", nombre: "Vidrio Incoloro 8mm", precio: "8.50", unidad: "pie2", categoria: "Vidrios" },
      { codigo: "ALU-001", nombre: "Ángulo de Aluminio 1/2\"", precio: "4.00", unidad: "metro", categoria: "Aluminios" },
      { codigo: "ALU-002", nombre: "Ángulo de Aluminio 3/4\"", precio: "6.00", unidad: "metro", categoria: "Aluminios" }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <PeceraCalculator materiales={materiales} />
      </div>
    </div>
  );
}
