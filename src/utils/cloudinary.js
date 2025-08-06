import { v2 as cloudinary } from "cloudinary";
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
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // yaha file upload hogaya h...
    // console.log(`File has been uploaded successfully ${result.url}`);
    // ab auto remove karny keliye h ye
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); //ye locally save file jo k upload operation fail hpgaya h remove kardega
    return null;
  }
};

export { uploadOnCloudinary };
