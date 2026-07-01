import path from "path";
import { parseMaterialesCSV } from "@/lib/utils/csv";
import { Material } from "@/lib/types";
import VitrinaCalculator from "./VitrinaCalculator";

export const metadata = {
  title: "Calculadora de Vitrinas a Medida - Vidriería Cosmos",
  description: "Diseña y cotiza en línea vitrinas estructuradas con perfiles de aluminio de 1.5 pulgadas y cristales de seguridad.",
};

export default async function VitrinasPage() {
  const filePath = path.join(process.cwd(), "data", "materiales_vitrinas.csv");
  let materiales: Material[] = [];

  try {
    materiales = await parseMaterialesCSV(filePath);
  } catch (error) {
    console.error("Error reading materiales_vitrinas.csv:", error);
    // Fallback data
    materiales = [
      { codigo: "VIT-ALU-001", nombre: "Tubo Cuadrado 1.5\" x 1.5\"", precio: "14.00", unidad: "metro", categoria: "Aluminio Estructural" },
      { codigo: "VIT-VID-004", nombre: "Vidrio Incoloro 4mm", precio: "6.00", unidad: "pie2", categoria: "Vidrios" }
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <VitrinaCalculator materiales={materiales} />
      </div>
    </div>
  );
}
