import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // yaha se file upload hoga
    cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // yaha file upload hogaya h...
    console.log(`File has been uploaded successfully ${response.url}`);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //ye locally save file jo k upload operation fail hpgaya h remove kardega
    return null;
  }
};

export { uploadOnCloudinary };
