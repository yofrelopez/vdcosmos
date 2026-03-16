const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const images = [
  {
    name: 'Puerta Serie 25',
    path: './public/images/productos/puertas/Puerta_deAluminio_1.jpg',
    folder: 'cosmos/puertas'
  },
  {
    name: 'Puerta Serie 35',
    path: './public/images/productos/puertas/Puerta_deAluminio_2.jpg',
    folder: 'cosmos/puertas'
  },
  {
    name: 'Ventana Corrediza Serie 20',
    path: './public/images/productos/ventanas/ventana.jpg',
    folder: 'cosmos/ventanas'
  }
];

async function migrate() {
  console.log('--- Iniciando migración a Cloudinary ---');
  for (const item of images) {
    try {
      const result = await cloudinary.uploader.upload(item.path, {
        folder: item.folder,
        public_id: item.name.toLowerCase().replace(/ /g, '_'),
      });
      console.log(`${item.name}: ${result.secure_url}`);
    } catch (error) {
      console.error(`Error subiendo ${item.name}:`, error.message);
    }
  }
}

migrate();
