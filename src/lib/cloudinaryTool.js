import multerStorageCloudinary from 'multer-storage-cloudinary'
import pkg from 'cloudinary'
const {v2:cloudinary} = pkg
const {CloudinaryStorage} = multerStorageCloudinary

export const saveToUser = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'easyAccess/user'
    }
})
export const saveToVolunteer = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'easyAccess/volunteer'
    }
})