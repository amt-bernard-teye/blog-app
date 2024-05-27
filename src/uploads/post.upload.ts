import multer from "multer";
import path from "path";

import { checkFileMimeType, getFileName } from "../util/file-manipulator.util";

const postBannerStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, "../", "storage", "posts"));
    },
    filename(req, file, callback) {
        const fileName = getFileName(file, "PST");
        callback(null, fileName);
    },
});

export const postBannerUploader = multer({
    storage: postBannerStorage,
    fileFilter(req, file, callback) {
        const mimeTypeFound = checkFileMimeType(file);
        
        if (!mimeTypeFound) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    }
});