const  mongoose = require('mongoose');
const extraCategorySchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subCategory'
    },
    extraCategory : {
        type : String
    }
});
const extraCategoryModel = mongoose.model('extraCategory',extraCategorySchema);
module.exports = extraCategoryModel