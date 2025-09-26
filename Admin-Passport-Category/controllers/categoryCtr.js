const categoryModel = require('../model/categoryModel')
const fs = require('fs');
const path = require('path');


module.exports.addCategoryPage = (req, res) => {
    try {
        return res.render('category/addCategory');

    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.addNewCategory = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            // imagePath = categoryModel.imagePath + '/' + req.file.filename;
            imagePath = `${categoryModel.imagePath}/${req.file.filename}`;
        }
        let category = await categoryModel.create({
            ...req.body,
            image: imagePath
        });
        if (category) {
            req.flash('success', 'category added success');
            return res.redirect('/category/addCategory');
        } else {
            req.flash('error', 'category added failed');
        }


    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.viewCategoryPage = async (req, res) => {
    try {
        let categories = await categoryModel.find({});
        return res.render('category/viewCategory', { categories });
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        console.log("Deleting category id:", req.params.id);
        let category = await categoryModel.findById(req.params.id);

        // Delete image if exists
        if (category && category.image) {
            let imagePath = path.join(__dirname, "..", category.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log("Image deleted from server");
            }
        }

        // Delete category
        let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
        if (deletedCategory) console.log("✅ Category Deleted Successfully");

        return res.redirect("/category/viewCategory");
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
};

// Edit Category Page
module.exports.editCategoryPage = async (req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id);
        if (!category) return res.redirect("/category/viewCategory");

        return res.render('category/editCategory', { category });
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
};

// Update Category
module.exports.updateCategory = async (req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id);
        if (!category) return res.redirect("/category/viewCategory");

        let imagePath = category.image; // keep old image by default

        if (req.file) {
            // Delete old image if exists
            if (category.image && fs.existsSync(path.join(__dirname, "..", category.image))) {
                fs.unlinkSync(path.join(__dirname, "..", category.image));
            }
            imagePath = `${categoryModel.imagePath}/${req.file.filename}`;
        }

        await categoryModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: imagePath
        });

        req.flash('success', 'Category updated successfully');
        return res.redirect("/category/viewCategory");
    } catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
};
