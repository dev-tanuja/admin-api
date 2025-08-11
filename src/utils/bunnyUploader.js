const axios = require('axios')

const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE
const BUNNY_API_KEY = process.env.BUNNY_API_KEY
const BUNNY_REGION = process.env.BUNNY_REGION || 'storage.bunnycdn.com'
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL

const uploadFileToBunny = async (fileBuffer, fullPath) => {
  const uploadUrl = `https://${BUNNY_REGION}/${BUNNY_STORAGE_ZONE}/${fullPath}`

  await axios.put(uploadUrl, fileBuffer, {
    headers: {
      AccessKey: BUNNY_API_KEY,
      'Content-Type': 'application/octet-stream'
    }
  })

  return {
    url: `${BUNNY_PULL_ZONE_URL}/${fullPath}`,
    path: fullPath
  }
}

const deleteFileFromBunny = async (filePath) => {
  const deleteUrl = `https://${BUNNY_REGION}/${BUNNY_STORAGE_ZONE}/${filePath}`

  await axios.delete(deleteUrl, {
    headers: {
      AccessKey: BUNNY_API_KEY
    }
  })
}

module.exports = { uploadFileToBunny, deleteFileFromBunny }
