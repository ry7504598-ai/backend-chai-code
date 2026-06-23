import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';




cloudinary.config({
    cloud_name: process.env.CLOUDANRY_CLOUD_NAME,
    api_key: process.env.CLOUDANRY_API_KEY,
    api_secret: process.env.CLOUDANRY_API_SECRET,
});

const uploadInCloundinary = async (localFilePath) => {
    try{
        if(!localFilePath) return Error("File path is required");
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });

     //file has been uploaded successfully
     console.log("File has been uploaded on cloudinary successfully",result.url);
     return result;
    }catch(error){
        fs.unlinkSync(localFilePath) //delete the file from local storage if there is an error
         return null;
    }
}

export { uploadInCloundinary };