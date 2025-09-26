const categoryModel = require("../model/categoryModel");
const subCategoryModel = require("../model/subCategoryModel");
const fs = require('fs');
const path = require('path');

// Add Sub Category Page
exports.addSubCategoryPage = async (req, res) => {
    try {
        const categories = await categoryModel.find(); // all categories
        res.render("subCategory/addSubCategory", { categories });
    } catch (error) {
        console.log("Error in addSubCategoryPage:", error);
        res.redirect("/admin");
    }
};

// View Sub Categories Page
exports.viewSubCategoryPage = async (req, res) => {
    try {
        const subCategory = await subCategoryModel.find().populate("category");
        res.render("subCategory/viewSubCategory", { subCategory });
    } catch (error) {
        console.log("Error in viewSubCategoryPage:", error);
        res.redirect("/admin");
    }
};

// Add Sub Category (POST)
exports.addSubCategory = async (req, res) => {
    try {
        await subCategoryModel.create(req.body);
        res.redirect("/subCategory/viewSubCategory"); // redirect to view page
    } catch (error) {
        console.log("Error in addSubCategory:", error);
        res.redirect("/subCategory/addSubCategory");
    }
};

// Delete Sub Category
exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await subCategoryModel.findByIdAndDelete(id);
        console.log("Sub Category deleted successfully");
        res.redirect("/subCategory/viewSubCategory");
    } catch (error) {
        console.log("Error in deleteSubCategory:", error);
        res.redirect("/subCategory/viewSubCategory");
    }
};

module.exports.editSubCategoryPage = async (req, res) => {
    try {
        let subCategory = await subCategoryModel.findById(req.params.id);
        if (!subCategory) return res.redirect("/subCategory/viewSubCategory");

        // Fetch all categories for dropdown
        let categories = await categoryModel.find({});

        return res.render('subCategory/editSubCategory', { subCategory, categories });
    } catch (err) {
        console.log(err);
        return res.redirect("/subCategory/viewSubCategory");
    }
};


// Update Category
module.exports.updateSubCategory = async (req, res) => {
    try {
        // Find the sub-category by ID
        let subCategory = await subCategoryModel.findById(req.params.id);
        if (!subCategory) return res.redirect("/subCategory/viewSubCategory");

        let imagePath = subCategory.image; // keep old image by default



        // Update sub-category in DB
        await subCategoryModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: imagePath

        });

        // req.flash('success', 'Sub Category updated successfully');
        return res.redirect("/subCategory/viewSubCategory");

    } catch (err) {
        console.log(err);
        // req.flash('error', 'Something went wrong');
        return res.redirect("/subCategory/viewSubCategory");
    }
};
