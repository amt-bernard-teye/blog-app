export function getFileName(file: Express.Multer.File, initial: "PST" | "USR") {
    const extensionIndex = file.originalname.lastIndexOf(".");
    const fileExtension = file.originalname.substring(extensionIndex, file.originalname.length);
    return initial + Date.now() + fileExtension;
}

export function checkFileMimeType(file: Express.Multer.File) {
    const acceptedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
    return acceptedMimeTypes.includes(file.mimetype.toLowerCase());
}