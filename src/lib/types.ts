export interface Material {
  codigo: string;
  nombre: string;
  precio: string;
  unidad: string;
  categoria: string;
  espesor_pulgadas?: string;
}

export interface PiezaDespiece {
  nombre: string;
  cant: number;
  anchoCm: number;
  altoCm?: number; // Opcional, los perfiles de aluminio solo tienen largo
  unidad: string; // "pie2" o "metro"
  cantidadMaterial: number; // área en pie2 o longitud en metros
  precioUnitario: number;
  subtotal: number;
}
