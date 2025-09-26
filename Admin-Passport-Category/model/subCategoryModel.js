const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    subcategory: {
        type: String,
       
    }
});

module.exports = mongoose.model("subCategory", subCategorySchema);
