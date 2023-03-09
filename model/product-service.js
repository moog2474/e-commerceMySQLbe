const pool = require('../config/mysql.config');

exports.getProducts = async (limit) => {
    try {
        if (limit) {
            const [rows] = await pool.query(
                `SELECT * from products limit ${limit}`
            );
            return rows
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.getProduct = async (id) => {
    try {
        const [row] = await pool.query(`SELECT * from products where id=${id}`);
        return row[0];
    }
    catch (err) {
        console.log(err);
    }
}

exports.createProduct = async (product) => {

    const { productName, categoryId, price, discount, createdUser, descriptions, thumbnail, images, quantity } = product;

    const [result] = await pool.query(
        `INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            null,
            productName,
            categoryId,
            price,
            discount,
            createdUser,
            descriptions,
            thumbnail,
            images,
            quantity
        ]
    );
    return result;
};

exports.updateProduct = async (id, updatedData) => {
    let [result] = "";
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
        result = await pool.query(
            `UPDATE products SET ${Object.keys(updatedData)[i]} ='${Object.values(updatedData)[i]
            }'  WHERE id = ${id}`
        );
    }
    return result;
};

exports.deleteProduct = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM products WHERE id='${id}'`
    );
    return result;
}