const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const categoryPath = "/uploads/categoryimages";

const categorySchema = mongoose.Schema({
    categoryName: String,
    image: String
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', categoryPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }

})

categorySchema.statics.uploadsImage = multer({ storage: storage }).single('image');
categorySchema.statics.imagePath = categoryPath;

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;