import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dlismekzd',
  api_key: '279475646978876',
  api_secret: '8lGdbreQ_bSmT5R-JVL2XgiRaJA',
})

// Todos los public_ids de videos en la carpeta telemira/
const VIDEO_IDS = [
  'telemira/gag_mambo_lywz7c',
  'telemira/poetas_extremos_dfbgsi',
  'telemira/FUTBOLISTA_FRANCO_eqaytk',
  'telemira/Luis_Facha_zasmaq',
  'telemira/K_PAP_V2_es6kmt',
  'telemira/pancho_puelma_junior_sksoey',
  'telemira/Homotherian_klm6fg',
  'telemira/manicomio_de_plantas_li5wi9',
  'telemira/vr_set_for_babies_irtvli',
  'telemira/Shosdelacul_gdacb1',
  'telemira/Statusbucks_euntbj',
  'telemira/Profr_Fabian_corto_rmhlst',
  'telemira/rechilcer_qhiitf',
  'telemira/bullyns_animal_kxsprm',
  'telemira/escorpio_f5szqa',
  'telemira/formertrans_amgbve',
  'telemira/Broncooo_smx4uv',
  'telemira/alargamiento_de_espalda_mdgqzw',
  'telemira/Demasiado_vestidos_promo_j4ejfi',
  'telemira/Doctores_millonarios_xjierh',
  'telemira/cutecuernas_zkswuy',
  'telemira/Corazon_de_alcnci%CC%81a_n7y4pj',
  'telemira/bozal_d70jxl',
  'telemira/zalo_reyes',
  'telemira/perkins_mujeres',
  'telemira/hijo',
  'telemira/chiguaguas',
  'telemira/cerebro_anime',
  'telemira/azotea',
  'telemira/arepa_franklin_1',
  'telemira/adam_cocina',
  'telemira/PATAENLOCICO',
  'telemira/para_sonrei_r',
  // Videos del upload script original
  'telemira/Corazon_de_alcnci_a',
  'telemira/Demasiado_vestidos_promo',
  // Video de presentación y payaso_ad
  'payaso_ad_qz9k79',
  'presentacio%CC%81n_Canal_vo9dsf',
]

console.log(`Eliminando ${VIDEO_IDS.length} videos de Cloudinary...\n`)

let ok = 0, fail = 0

for (const id of VIDEO_IDS) {
  process.stdout.write(`Eliminando: ${id} ... `)
  try {
    const res = await cloudinary.uploader.destroy(id, { resource_type: 'video' })
    if (res.result === 'ok' || res.result === 'not found') {
      console.log(`✓ (${res.result})`)
      ok++
    } else {
      console.log(`⚠ ${res.result}`)
      fail++
    }
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
    fail++
  }
}

console.log(`\n✅ Eliminados: ${ok} | ❌ Errores: ${fail}`)
