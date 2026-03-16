const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const foldersToCreate = [
  'vd-cosmos',
  'vd-cosmos/servicios',
  'vd-cosmos/servicios/ventanas',
  'vd-cosmos/servicios/puertas',
  'vd-cosmos/servicios/mamparas',
  'vd-cosmos/servicios/puertas_ducha',
  'vd-cosmos/servicios/espejos',
  'vd-cosmos/servicios/vitrinas',
  'vd-cosmos/servicios/balcones',
  'vd-cosmos/servicios/baranda',
  'vd-cosmos/servicios/cortinas',
  'vd-cosmos/servicios/roller',
  'vd-cosmos/servicios/cuadros',
  'vd-cosmos/servicios/melamina',
  'vd-cosmos/hero',
  'vd-cosmos/ui'
];

async function createStructure() {
  console.log('--- Creando estructura de carpetas en Cloudinary ---');
  for (const folder of foldersToCreate) {
    try {
      // Usamos el Admin API para crear carpetas
      await cloudinary.api.create_folder(folder);
      console.log(`Carpeta creada/verificada: ${folder}`);
    } catch (error) {
      // Si la carpeta ya existe, Cloudinary suele dar un error 400 o similar, pero lo manejamos
      if (error.error && error.error.message && error.error.message.includes('already exists')) {
        console.log(`La carpeta ya existe: ${folder}`);
      } else {
        console.error(`Error con la carpeta ${folder}:`, error.message || error);
      }
    }
  }
  console.log('--- Proceso finalizado ---');
}

createStructure();
