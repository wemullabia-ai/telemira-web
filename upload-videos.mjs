import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dlismekzd',
  api_key: '279475646978876',
  api_secret: '8lGdbreQ_bSmT5R-JVL2XgiRaJA',
})

const VIDEOS_DIR = './public/uploads/videos'
const files = fs.readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mp4'))

console.log(`Subiendo ${files.length} videos...\n`)

const results = {}

for (const file of files) {
  const filePath = path.join(VIDEOS_DIR, file)
  const publicId = file.replace('.mp4', '').replace(/[^a-zA-Z0-9-_]/g, '_')
  process.stdout.write(`Subiendo: ${file} ... `)
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: `telemira/${publicId}`,
      overwrite: false,
    })
    results[file] = res.secure_url
    console.log('✓')
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    results[file] = null
  }
}

console.log('\n--- URLs generadas ---')
console.log(JSON.stringify(results, null, 2))
fs.writeFileSync('./cloudinary-urls.json', JSON.stringify(results, null, 2))
console.log('\nGuardado en cloudinary-urls.json')
