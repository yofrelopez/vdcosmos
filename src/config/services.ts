export interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  icon: string;
}

export const servicesConfig: ServiceConfig[] = [
  {
    id: 'ventanas',
    name: 'Ventanas de Aluminio',
    description: 'Ventanas modernas con excelente aislamiento térmico y acústico.',
    image: '/images/productos/ventanas/ventana.jpg',
    category: 'Carpintería',
    icon: 'Grid'
  },
  {
    id: 'mamparas_bano',
    name: 'Puertas de ducha',
    description: 'Puertas de ducha de acrílico o templado.',
    image: '/images/productos/puertas_ducha/puertas-de-ducha_5.jpg',
    category: 'Vidriería',
    icon: 'ShowerHead'
  },
  {
    id: 'puertas',
    name: 'Puertas de aluminio',
    description: 'Puertas resistentes y elegantes para interiores y exteriores.',
    image: '/images/productos/puertas/puerta_aluminio.png',
    category: 'Carpintería',
    icon: 'DoorClosed'
  },
  {
    id: 'mamparas',
    name: 'Mamparas',
    description: 'Mamparas de vidrio crudo o templado, con aluminio sistema nova o estructura.',
    image: '/images/productos/mamparas/mampara.jpg',
    category: 'Vidriería',
    icon: 'DoorClosed'
  },
  {
    id: 'puertas_templado',
    name: 'Puertas Templado',
    description: 'Puertas de vidrio templado de alta seguridad y elegancia.',
    image: '/images/productos/puerta_templado/02.jpeg',
    category: 'Vidriería',
    icon: 'DoorClosed'
  },
  {
    id: 'vitrinas',
    name: 'Vitrinas, Exhibidores y Mostradores',
    description: 'Vitrinas de vidrio para exhibición comercial y decorativa.',
    image: '/images/productos/vitrinas/vitrina.jpg',
    category: 'Comercial',
    icon: 'Gem'
  },
  {
    id: 'espejos',
    name: 'Espejos',
    description: 'Espejos con marcos elegantes y diseños personalizados.',
    image: '/images/productos/espejos/espejo.jpg',
    category: 'Decoraciones',
    icon: 'Sparkles'
  },
  {
    id: 'cuadros',
    name: 'Cuadros y Marcos',
    description: 'Servicio de enmarcado y cuadros decorativos.',
    image: '/images/productos/cuadros/cuadros.jpg',
    category: 'Decoraciones',
    icon: 'Sparkles'
  },
  {
    id: 'barandas',
    name: 'Barandas',
    description: 'Barandas modernas para escaleras y balcones.',
    image: '/images/productos/baranda/baranda-escalera.jpg',
    category: 'Estructural',
    icon: 'GripHorizontal'
  },
  {
    id: 'cortinas_cristal',
    name: 'Cortinas, Rollers, Estores y Persianas',
    description: 'Cortinas, Rollers, Estores y Persianas de alta calidad.',
    image: '/images/productos/cortinas/cortina.jpg',
    category: 'Decoraciones',
    icon: 'Layers'
  },

  {
    id: 'melamina',
    name: 'Melamina',
    description: 'Muebles funcionales con acabados en melamina de alta calidad.',
    image: '/images/productos/melamina/melamina.jpg',
    category: 'Mobiliario',
    icon: 'Table'
  },
  {
    id: 'rejas_aluminio',
    name: 'Rejas de Aluminio',
    description: 'Rejas de seguridad con perfiles de aluminio de alta resistencia.',
    image: '/images/productos/rejas/reja.png',
    category: 'Estructural',
    icon: 'Shield'
  },
  {
    id: 'balcones',
    name: 'Balcones',
    description: 'Cerramientos y estructuras para balcones.',
    image: '/images/productos/balcones/barandas-de-acero-para-balcones.jpg',
    category: 'Estructural',
    icon: 'Sunrise'
  },
  {
    id: 'pergolas',
    name: 'Pérgolas',
    description: 'Pérgolas de aluminio para terrazas y jardines.',
    image: '/images/productos/pergola/pergola.jpg',
    category: 'Estructural',
    icon: 'Leaf'
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Accesorios y repuestos para todo tipo de sistemas.',
    image: '/images/productos/accesorios/bridas-fotos.png',
    category: 'Accesorios',
    icon: 'Wrench'
  },
  {
    id: 'servicios_tecnicos',
    name: 'Servicio Técnico',
    description: 'Mantenimiento y reparación especializada.',
    image: '/images/productos/servicio-tecnico/st.png',
    category: 'Servicios',
    icon: 'Settings'
  }
];
