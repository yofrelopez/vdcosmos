const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkResources() {
  try {
    console.log('--- Revisando recursos en Cloudinary ---');
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 10
    });
    
    if (result.resources.length === 0) {
      console.log('No se encontraron recursos en la cuenta.');
    } else {
      result.resources.forEach(res => {
        console.log(`Encontrado: ${res.public_id} -> ${res.secure_url}`);
      });
    }
  } catch (error) {
    console.error('Error al revisar recursos:', error.message);
  }
}

checkResources();
