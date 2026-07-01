import path from "path";
import { parseMaterialesCSV } from "@/lib/utils/csv";
import { Material } from "@/lib/types";
import CuadrosCalculator from "./CuadrosCalculator";

export const metadata = {
  title: "Calculadora de Cuadros y Enmarcado - Vidriería Cosmos",
  description: "Calculadora en línea para cotizar marcos, molduras de madera, vidrios protectores y espejos para cuadros decorativos.",
};

export default async function CuadrosPage() {
  const filePath = path.join(process.cwd(), "data", "materiales_cuadros.csv");
  let materiales: Material[] = [];

  try {
    materiales = await parseMaterialesCSV(filePath);
  } catch (error) {
    console.error("Error reading materiales_cuadros.csv:", error);
    // Fallback data
    materiales = [
      { codigo: "VID-SIMP", nombre: "Vidrio Simple", precio: "5.00", unidad: "pie2", categoria: "Vidrios" },
      { codigo: "VID-MATE", nombre: "Vidrio Mate", precio: "10.00", unidad: "pie2", categoria: "Vidrios" },
      { codigo: "MOL-100-STD", nombre: "Moldura 1\" Standard", precio: "22.00", unidad: "metro", categoria: "Molduras", espesor_pulgadas: "1.0" }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <CuadrosCalculator materiales={materiales} />
      </div>
    </div>
  );
}
