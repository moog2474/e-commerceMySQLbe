const pool = require('../config/mysql.config');

exports.getCategories = async (limit) => {
    try {
        if (limit) {
            const [rows] = await pool.query(
                `SELECT * FROM category limit ${limit}`);

            return rows
        }
    }
    catch (err) {
        console.log(err);
    }
}


exports.getCategory = async (id) => {
    try {
        const [row] = await pool.query(`SELECT * FROM category where catId=${id}`);
        return row[0];
    }
    catch (err) {
        console.log(err);
    }
}


exports.createCategory = async (category) => {

    const { categoryName, link } = category;
    //this question marks are similar with C language => printf('%d %d', x,y)
    const [result] = await pool.query(
        `INSERT INTO category VALUES (?, ?, ?)`,
        [
            null,
            categoryName,
            link
        ]
    );
    return result;
};

exports.updateCategory = async (catId, updatedData) => {
    let [result] = "";
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
        result = await pool.query(
            `UPDATE category SET ${Object.keys(updatedData)[i]} ='${Object.values(updatedData)[i]
            }'  WHERE catId = ${catId}`
        );
    }
    return result;
};


exports.deleteCategory = async (catId) => {
    const [result] = await pool.query(
        `DELETE FROM category WHERE catId='${catId}'`
    );
    return result;
};