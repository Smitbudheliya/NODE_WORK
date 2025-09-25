const express = require("express");
const routes = express.Router();
const categoryModel = require("../model/categoryModel");

const { addCategoryPage, addNewCategory, viewCategoryPage, deleteCategory, editCategoryPage, updateCategory } = require("../controllers/categoryCtr");

// Existing routes
routes.get("/addCategory", addCategoryPage)
routes.post("/add-Category", categoryModel.uploadsImage, addNewCategory)
routes.get("/viewCategory", viewCategoryPage)
routes.get("/editCategory/:id", editCategoryPage) // matches Edit button link
routes.post("/updateCategory/:id", categoryModel.uploadsImage, updateCategory) // form submission
routes.get("/deleteCategory/:id", deleteCategory); 


module.exports = routes;