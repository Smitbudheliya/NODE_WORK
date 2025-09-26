const express = require("express");
const routes = express.Router();
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage, deleteSubCategory, updateSubCategory, editSubCategoryPage } = require("../controllers/subCategoryCtr");

routes.get("/addSubCategory", addSubCategoryPage);
routes.post("/addSubCategory", addSubCategory);
routes.get("/viewSubCategory", viewSubCategoryPage)
routes.get("/deleteSubCategory/:id", deleteSubCategory);
routes.post("/updateSubCategory/:id", updateSubCategory) // form submission
routes.get("/editSubCategory/:id", editSubCategoryPage) // matches Edit button link

module.exports = routes;
