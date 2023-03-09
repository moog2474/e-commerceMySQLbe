const fs = require("fs");
const { parse } = require("path");
const uuid = require("uuid");


const productService = require('../model/product-service')
const dataFile = process.cwd() + "/data/products.json"

exports.getAll = async (req, res) => {
    const {limit} = req.query;
    
 try{
    const result = await productService.getProducts(limit);

    if(result && result.length > 0){
        res.json({status: true, result});
    }
 } catch(err){
    res.json({status: false, message: err})
 }
}

exports.get = async (req, res) => {
    const { id } = req.params
   
    if(!id)
        return res.json({ status: false, message: 'product id not found'})
    try {
        const result = await productService.getProduct(id);

        res.json({ status: true, result})
    } catch (err){
        res.json({status: false, message: err})
    }
}


exports.create = async (req, res) => {
    const { productName, price, discount, quantity, categoryId, createdUser, descriptions, images, thumbnail } = req.body;

    const newObj = {
        productName, 
        categoryId, 
        price, 
        discount, 
        createdUser, 
        descriptions, 
        thumbnail, 
        images, 
        quantity
    }

    try{
        const result = await productService.createProduct(newObj);
        if(result && result.affectedRows > 0){
            res.json({status: true, result})
        }
        else{
            res.json({status: false, message: 'Error occured when creating product'})
        }
    }
    catch(err){
        res.json({status: false, message: err})
    }
}

exports.update = async (req, res) => {
    const { id } = req.params
    
    if(!id) {
        return res.json({status: false, message: "product id not found"})
    }
    try{
        const result = await productService.updateProduct(id, req.body);
        if (result.length > 0 && result[0].affectedRows > 0){
            res.json({status: true, message: 'Succes'})
        }
        else{
            res.json({status: false, message: 'Error occured when editing'})
        }
    }
    catch(err){
        res.json({status: false, message: err});
    }

}

exports.delete = async (req, res) => {
    const { id } = req.params;

    if(!id){
        return res.json({status: false, message: 'product id not found'})
    }
    try{
        const result = await productService.deleteProduct(id);
        if(result && result.affectedRows > 0 ){
            res.json({status: true, message: 'Success'});
        }
        else{
            res.json({status: false, message: 'Error occured when deleting product'})
        }
    }
    catch(err){
        res.json({status: false, message: err});
    }
}