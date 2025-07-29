// utils/bunnyUploader.js
const axios = require('axios');

const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const BUNNY_REGION = process.env.BUNNY_REGION || 'storage.bunnycdn.com';
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL; // e.g. https://yourzone.b-cdn.net

const uploadFileToBunny = async (fileBuffer, originalname) => {
  const filePath = `uploads/${Date.now()}-${originalname}`;
  const uploadUrl = `https://${BUNNY_REGION}/${BUNNY_STORAGE_ZONE}/${filePath}`;

  await axios.put(uploadUrl, fileBuffer, {
    headers: {
      AccessKey: BUNNY_API_KEY,
      'Content-Type': 'application/octet-stream'
    }
  });

  return {
    url: `${BUNNY_PULL_ZONE_URL}/${filePath}`,
    path: filePath
  };
};

const deleteFileFromBunny = async (filePath) => {
  const deleteUrl = `https://${BUNNY_REGION}/${BUNNY_STORAGE_ZONE}/${filePath}`;
  await axios.delete(deleteUrl, {
    headers: {
      AccessKey: BUNNY_API_KEY
    }
  });
};

module.exports = { uploadFileToBunny, deleteFileFromBunny };
