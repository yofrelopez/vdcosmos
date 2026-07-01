/**
 * Calcula el volumen aproximado de la pecera en litros.
 */
export function calcularVolumenLitros(largo: number, alto: number, ancho: number): number {
  return (largo * alto * ancho) / 1000;
}

/**
 * Calcula el área total de vidrio en pies cuadrados (pie²).
 * Se utiliza la aproximación comercial de la vidriería local: 1 pie² = 900 cm².
 */
export function calcularPiesVidrio(largo: number, alto: number, ancho: number): number {
  const piesFondo = (largo * ancho) / 900;
  const piesFrontalPosterior = ((largo * alto) / 900) * 2;
  const piesLaterales = ((ancho * alto) / 900) * 2;
  return piesFondo + piesFrontalPosterior + piesLaterales;
}

/**
 * Calcula el costo del vidrio en base a los pies cuadrados totales y el precio por pie².
 */
export function calcularCostoVidrio(totalPies: number, precioVidrio: number): number {
  return totalPies * precioVidrio;
}

/**
 * Calcula la longitud necesaria de ángulo de aluminio en centímetros (cm).
 * Cubre la base (2 * largo + 2 * ancho) más 4 esquinas verticales (4 * alto).
 */
export function calcularLongitudAluminioCm(
  largo: number,
  alto: number,
  ancho: number,
  usarAluminio: boolean
): number {
  return usarAluminio ? (2 * largo + 2 * ancho) + (4 * alto) : 0;
}

/**
 * Calcula el costo de la mano de obra y silicona según el porcentaje del costo del vidrio.
 */
export function calcularCostoManoObra(costoVidrio: number, porcentajeManoObra: number): number {
  return costoVidrio * (porcentajeManoObra / 100);
}

/**
 * Calcula el costo del aluminio según la longitud en metros y el precio por metro.
 */
export function calcularCostoAluminio(longitudMetros: number, precioAluminio: number): number {
  return longitudMetros * precioAluminio;
}

/**
 * Calculates total cost summing all budget components.
 */
export function calcularTotal(
  costoVidrio: number,
  costoAluminio: number,
  costoManoObra: number
): number {
  return costoVidrio + costoAluminio + costoManoObra;
}

import { PiezaDespiece } from "@/lib/types";

/**
 * Extrae el espesor del vidrio en milímetros a partir del nombre del material.
 * Ej: "Vidrio Incoloro 6mm" -> 6
 */
export function obtenerEspesorVidrioMm(nombre: string): number {
  const match = nombre.match(/(\d+)\s*mm/i);
  if (match) {
    return parseInt(match[1]);
  }
  return 6; // Valor por defecto
}

/**
 * Calcula el despiece completo de vidrios y aluminio (si aplica) para la pecera.
 * Asume el armado de laterales SOBRE la base.
 */
export function obtenerDespiecePecera(
  largo: number,
  alto: number,
  ancho: number,
  espesorMm: number,
  precioVidrio: number,
  usarAluminio: boolean,
  precioAluminio: number
): PiezaDespiece[] {
  const espesorCm = espesorMm / 10;
  const listado: PiezaDespiece[] = [];

  // --- 1. VIDRIOS (Cortes Físicos Reales) ---
  
  // Base / Fondo (1 pieza)
  const piesBase = (largo * ancho) / 900;
  const precioBase = piesBase * precioVidrio;
  listado.push({
    nombre: "Vidrio de Fondo (Base)",
    cant: 1,
    anchoCm: largo,
    altoCm: ancho,
    unidad: "pie2",
    cantidadMaterial: piesBase,
    precioUnitario: precioVidrio,
    subtotal: precioBase,
  });

  // Frontal / Posterior (2 piezas) - Descuentan espesor del fondo en la altura
  const altoPared = alto - espesorCm;
  const piesFrontal = (largo * altoPared) / 900;
  const precioFrontal = piesFrontal * precioVidrio;
  listado.push({
    nombre: "Vidrio Frontal / Posterior",
    cant: 2,
    anchoCm: largo,
    altoCm: altoPared,
    unidad: "pie2",
    cantidadMaterial: piesFrontal,
    precioUnitario: precioVidrio,
    subtotal: precioFrontal * 2,
  });

  // Laterales (2 piezas) - Descuentan espesor del fondo en altura, y 2 espesores en ancho
  const anchoLateral = ancho - (2 * espesorCm);
  const piesLateral = (anchoLateral * altoPared) / 900;
  const precioLateral = piesLateral * precioVidrio;
  listado.push({
    nombre: "Vidrio Lateral (Costados)",
    cant: 2,
    anchoCm: anchoLateral,
    altoCm: altoPared,
    unidad: "pie2",
    cantidadMaterial: piesLateral,
    precioUnitario: precioVidrio,
    subtotal: precioLateral * 2,
  });

  // --- 2. PERFILES DE ALUMINIO (Si se requieren) ---
  if (usarAluminio) {
    // Riel/Ángulo de base (Frontal / Posterior)
    const mBaseFrontal = largo / 100;
    const precioAluFrontal = mBaseFrontal * precioAluminio;
    listado.push({
      nombre: "Ángulo de Aluminio (Base Frontal/Post.)",
      cant: 2,
      anchoCm: largo,
      unidad: "metro",
      cantidadMaterial: mBaseFrontal,
      precioUnitario: precioAluminio,
      subtotal: precioAluFrontal * 2,
    });

    // Riel/Ángulo de base (Lateral)
    const mBaseLateral = ancho / 100;
    const precioAluLateral = mBaseLateral * precioAluminio;
    listado.push({
      nombre: "Ángulo de Aluminio (Base Lateral)",
      cant: 2,
      anchoCm: ancho,
      unidad: "metro",
      cantidadMaterial: mBaseLateral,
      precioUnitario: precioAluminio,
      subtotal: precioAluLateral * 2,
    });

    // Ángulos verticales (Esquineros)
    const mVertical = alto / 100;
    const precioAluVertical = mVertical * precioAluminio;
    listado.push({
      nombre: "Ángulo de Aluminio (Esquinero Vertical)",
      cant: 4,
      anchoCm: alto,
      unidad: "metro",
      cantidadMaterial: mVertical,
      precioUnitario: precioAluminio,
      subtotal: precioAluVertical * 4,
    });
  }

  return listado;
}
