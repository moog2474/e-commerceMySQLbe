const fs = require("fs")
const { parse } = require("path")
const uuid = require("uuid");

const catService = require('../model/category-service')
const dataFile = process.cwd() + "/data/category.json"

exports.getAll = async (req, res) => {
    const { limit } = req.query;
    try {

        const result = await catService.getCategories(limit);
        if (result && result.length > 0) {
            res.json({ status: true, result });

        }
    } catch (err) {
        console.log(err);
        res.json({ status: false, message: err })
    }
}

exports.get = async (req, res) => {
    const { catId } = req.params;

    if (!catId)
        return res.json({ status: false, message: 'category id not found' })
    try {
        const result = await catService.getCategory(catId);

        res.json({ status: true, result });

    } catch (err) {
        console.log(err);
        res.json({ status: false, message: err })
    }

}
exports.create = async (req, res) => {
    const { categoryName, link } = req.body;

    const newObj = {
        categoryName, link
    }
    try {
        const result = await catService.createCategory(newObj);
        if (result && result.affectedRows > 0) {

            res.json({ status: true, result });
        }
        else {
            res.json({ status: false, message: "Nemehed aldaa garlaa" })
        }
    }
    catch (err) {
        res.json({ status: false, message: err });
    }
}

exports.update = async (req, res) => {
    const { catId } = req.params;
    if (!catId) {
        return res.json({ status: false, message: "category id not found" })
    }
    try {
        const result = await catService.updateCategory(catId, req.body);
        if (result.length > 0 && result[0].affectedRows > 0) {

            res.json({ status: true, message: "Success" });
        }
        else {
            res.json({ status: false, message: "Zasahad aldaa garlaa" })
        }
    }
    catch (err) {
        res.json({ status: false, message: err });
    }

}

exports.delete = async (req, res) => {
    const { catId } = req.params;
    if (!catId) {
        return res.json({ status: false, message: "category id not found" })
    }
    try {
        const result = await catService.deleteCategory(catId);
        if (result && result.affectedRows > 0) {

            res.json({ status: true, message: "Success" });
        }
        else {
            res.json({ status: false, message: "Ustgahad aldaa garlaa" })
        }
    }
    catch (err) {
        res.json({ status: false, message: err });
    }
}