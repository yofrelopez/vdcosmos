export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string; // 'Vidriería' | 'Aluminio' | 'Melamina' | 'Decoración'
  client?: string;
  year?: string;
  location?: string;
  specs?: string[];
}

export const projectsConfig: Project[] = [
  {
    id: 'mampara-templada-principal',
    title: 'Mampara de Baño Corredera en Vidrio Templado',
    description: 'Instalación de mampara de ducha corrediza de alta seguridad con vidrio templado de 8mm. Utiliza un sistema de arrastre y perfiles de acero inoxidable satinado para mayor durabilidad y diseño minimalista.',
    image: '/images/productos/puertas_ducha/puerta-ducha-vidrio-templado.jpg',
    category: 'Vidriería',
    client: 'Residencial Los Álamos',
    year: '2025',
    location: 'Barranca',
    specs: ['Vidrio Templado de 8mm', 'Accesorios de Acero Inoxidable 304', 'Sistema de Carril Silencioso', 'Sello Hermético de Silicona Alemana']
  },
  {
    id: 'ventana-aluminio-serie25',
    title: 'Ventanas Corredizas de Aluminio Serie 25',
    description: 'Instalación de ventanas corredizas de aluminio negro mate, diseñadas con cierres herméticos y felpas de alta densidad que garantizan un óptimo aislamiento acústico y térmico en zona urbana con alto tráfico.',
    image: '/images/productos/ventanas/ventana.jpg',
    category: 'Aluminio',
    client: 'Edificio Mirador',
    year: '2025',
    location: 'Lima',
    specs: ['Aluminio Negro Mate Anodizado', 'Cristales de 6mm con lámina de seguridad', 'Aislamiento Térmico y Acústico', 'Cierre Central y Laterales de Seguridad']
  },
  {
    id: 'mueble-cocina-melamina',
    title: 'Mueble de Kitchenette Modular en Melamina',
    description: 'Diseño, fabricación e instalación de kitchenette modular elaborado en melamina texturizada de 18mm resistente a la humedad. Incluye cajoneras ocultas, puertas con bisagras de cierre suave y tiradores de aluminio embutidos.',
    image: '/images/productos/melamina/melamina.jpg',
    category: 'Melamina',
    client: 'Dep. Familia Rodríguez',
    year: '2024',
    location: 'Barranca',
    specs: ['Melamina Pelíkano de 18mm (Gris Ceniza/Roble)', 'Cantos de PVC aplicados a calor', 'Bisagras y Correderas con Cierre Suave', 'Tiradores de Aluminio Embutidos']
  },
  {
    id: 'baranda-escalera-acero-vidrio',
    title: 'Barandas de Acero Inoxidable y Vidrio para Escalera',
    description: 'Estructuración y montaje de baranda arquitectónica con soportes de acero inoxidable y paneles de vidrio templado transparente, ofreciendo máxima seguridad sin obstaculizar el paso de la luz natural.',
    image: '/images/productos/baranda/baranda-escalera.jpg',
    category: 'Vidriería',
    client: 'Residencia Lomas',
    year: '2025',
    location: 'Huacho',
    specs: ['Vidrio Templado de 10mm', 'Postes de Acero Inoxidable AISI 316', 'Pasamanos Tubular Redondo', 'Anclaje Mecánico de Alta Resistencia']
  },
  {
    id: 'puerta-aluminio-comercial',
    title: 'Puerta Principal de Aluminio y Cristal Fijo',
    description: 'Diseño e instalación de puerta de aluminio comercial reforzado con paneles fijos de cristal templado. Equipado con brazo hidráulico y cerradura de seguridad multipunto para accesos de alto tráfico comercial.',
    image: '/images/productos/puertas/puerta_aluminio.png',
    category: 'Aluminio',
    client: 'Tienda Comercial Barranca',
    year: '2024',
    location: 'Barranca',
    specs: ['Aluminio Serie Comercial Reforzado', 'Cristal Templado de 8mm Claro', 'Brazo Cierra-Puertas Hidráulico', 'Cerradura de Gancho de Seguridad']
  },
  {
    id: 'vitrina-exhibidora-iluminada',
    title: 'Vitrina de Vidrio Exhibidora Comercial con LED',
    description: 'Fabricación a medida de vitrina comercial con estructura de aluminio anodizado y estantes regulables de vidrio pulido de 8mm. Cuenta con iluminación integrada mediante cintas LED para destacar productos.',
    image: '/images/productos/vitrinas/vitrina.jpg',
    category: 'Vidriería',
    client: 'Joyería Fina',
    year: '2025',
    location: 'Huacho',
    specs: ['Estructura de Aluminio Anodizado Natural', 'Estantes de Vidrio Pulido de 8mm', 'Puertas de Vidrio Correderas con Llave', 'Iluminación Cintas LED de Alta Luminosidad']
  },
  {
    id: 'espejo-decorativo-led',
    title: 'Espejo Flotante Biselado con Retroiluminación LED',
    description: 'Instalación de espejo decorativo de alta gama de 4mm con bordes pulidos y biselados, montado sobre una estructura flotante que aloja un sistema de iluminación LED indirecta de tonalidad cálida.',
    image: '/images/productos/espejos/espejo.jpg',
    category: 'Decoración',
    client: 'Spa Bellísima',
    year: '2025',
    location: 'Barranca',
    specs: ['Cristal Belga Float de 4mm (Sin Cobre)', 'Biselado de 1.5 cm en contorno', 'Iluminación LED indirecta 3000K (Cálida)', 'Estructura de Montaje Posterior de Aluminio']
  },
  {
    id: 'puerta-ducha-acrilico',
    title: 'Mampara de Ducha en Acrílico con Estructura de Aluminio',
    description: 'Instalación de puerta de ducha corrediza de 3 hojas con planchas de acrílico texturizado y perfiles de aluminio blanco. Una opción ligera, económica y altamente funcional para optimizar el espacio en baños estándar.',
    image: '/images/productos/puertas_ducha/puerta-de-ducha-acrilico.jpg',
    category: 'Aluminio',
    client: 'Departamentos El Olivar',
    year: '2024',
    location: 'Barranca',
    specs: ['Acrílico Importado Texturizado Semilla', 'Perfiles de Aluminio Lacado Blanco', 'Sistema Corredizo de 3 Hojas', 'Guiadores Inferiores de Nylon']
  },
  {
    id: 'mampara-oficina-templada',
    title: 'Mampara Divisoria de Oficina en Vidrio Templado',
    description: 'Estructura divisoria para oficinas corporativas mediante paneles de vidrio templado de 10mm y perfiles de aluminio anodizado. Proporciona aislamiento acústico y un estilo moderno de concepto abierto.',
    image: '/images/productos/mamparas/mampara.jpg',
    category: 'Vidriería',
    client: 'Notaría Barranca',
    year: '2025',
    location: 'Barranca',
    specs: ['Vidrio Templado incoloro de 10mm', 'Zócalos y perfiles de aluminio anodizado gris', 'Puerta batiente con freno hidráulico de piso', 'Tirador tubular de acero inoxidable de 40cm']
  },
  {
    id: 'cuadros-marcos-decorativos',
    title: 'Enmarcado a Medida de Cuadros y Diplomas',
    description: 'Servicio de enmarcado personalizado para diplomas, lienzos y fotografías artísticas. Contamos con una amplia variedad de molduras de madera fina, vidrio antirreflejo y paspartú libre de ácido para conservación.',
    image: '/images/productos/cuadros/cuadros.jpg',
    category: 'Decoración',
    client: 'Colegio Nacional Barranca',
    year: '2024',
    location: 'Huaral',
    specs: ['Molduras de madera de cedro seleccionada', 'Vidrio antirreflejo de 2mm de alta claridad', 'Paspartú de conservación libre de ácido', 'Respaldo de foam board antihumedad']
  }
];
