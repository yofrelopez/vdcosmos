import { z } from 'zod';

export const catalogItemSchema = z.object({
  service_id: z.string().min(1, 'El ID de servicio es obligatorio'),
  model_name: z.string().min(3, 'El nombre del modelo debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  image_url: z.string().url('La URL de la imagen no es válida').or(z.string().length(0)).nullable(),
  technical_specs: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, {
    message: 'La ficha técnica debe ser un JSON válido'
  }),
});

export type CatalogItemInput = z.infer<typeof catalogItemSchema>;
