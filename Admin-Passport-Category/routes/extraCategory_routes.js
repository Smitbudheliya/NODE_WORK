const express = require("express");
const routes = express.Router();
const { addExtraCategoryPage, addExtraCategory} = require("../controllers/extraCategoryCtr");

routes.get("/addExtraCategory", addExtraCategoryPage);
routes.post("/addExtraCategory", addExtraCategory);
// routes.get("/viewSubCategory", viewSubCategoryPage)
// routes.get("/deleteSubCategory/:id", deleteSubCategory);
// routes.post("/updateSubCategory/:id", updateSubCategory)
// routes.get("/editSubCategory/:id", editSubCategoryPage) 

module.exports = routes;