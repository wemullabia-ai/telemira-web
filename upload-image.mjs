import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dlismekzd',
  api_key: '279475646978876',
  api_secret: '8lGdbreQ_bSmT5R-JVL2XgiRaJA',
})

// Subir imagen desde URL del mensaje del chat
const IMAGE_URL = process.argv[2]
if (!IMAGE_URL) {
  console.error('Uso: node upload-image.mjs <url>')
  process.exit(1)
}

console.log('Subiendo imagen...')
const res = await cloudinary.uploader.upload(IMAGE_URL, {
  public_id: 'telemira/bajo-construccion-mono',
  overwrite: true,
  resource_type: 'image',
})
console.log('✅ URL:', res.secure_url)
