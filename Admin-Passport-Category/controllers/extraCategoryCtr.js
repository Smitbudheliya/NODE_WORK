const extraCategoryModel = require("../model/extraCategoryModel");

exports.addExtraCategoryPage = async (req, res) => {
    try {
        const categories = await extraCategoryModel.find();
        res.render("extraCategory/addExtraCategory", { categories });
    } catch (error) {
        console.log("Error in addSubCategoryPage:", error);
        res.redirect("/admin");
    }
};


exports.addExtraCategory = async (req, res) => {
    try {
        await extraCategoryModel.create(req.body);
        res.redirect("/extraCategory/viewExtraCategory"); 
    } catch (error) {
        console.log("Error in addSubCategory:", error);
        res.redirect("/extraCategory/addExtraCategory");
    }
};