import fs from "fs/promises";
import { Material } from "../types";

/**
 * Lee un archivo CSV de materiales y lo parsea de forma asíncrona.
 * @param filePath Ruta absoluta del archivo CSV.
 * @returns Promesa que resuelve a una lista de materiales tipados.
 */
export async function parseMaterialesCSV(filePath: string): Promise<Material[]> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.split("\n");
    if (lines.length === 0) return [];
    
    // Obtener y limpiar cabeceras
    const headers = lines[0].split(",").map((h) => h.trim());
    
    const parsedMaterials: Material[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") continue;
      
      const values = line.split(",").map((v) => v.trim());
      const item: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        item[header] = values[index] || "";
      });
      
      parsedMaterials.push({
        codigo: item.codigo || "",
        nombre: item.nombre || "",
        precio: item.precio || "0",
        unidad: item.unidad || "",
        categoria: item.categoria || "",
        espesor_pulgadas: item.espesor_pulgadas || undefined,
      });
    }
    
    return parsedMaterials;
  } catch (error) {
    console.error(`Error leyendo o parseando el CSV en ${filePath}:`, error);
    throw error;
  }
}
