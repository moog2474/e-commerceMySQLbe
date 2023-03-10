const pool = require ('../config/mysql.config');

exports.getMenus = async (limit) => {
    try {
        if(limit){
            const [rows] = await pool.query(
                `SELECT * FROM menu limit ${limit}`);

            return rows
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getMenu = async (menuId) =>{
    try {
        const [row] = await pool.query(`SELECT * FROM meu where menuId=${menuId}`);
        return row[0];
    }
    catch (err){
        console.log(err);
    }
}

exports.createMenu = async (menu) =>{
    const {menuName, link, position, type } = menu;
    const [result] = await pool.query(
        `INSERT INTO menu values (?, ?, ?, ?, ?)`,
        [
            null,
            menuName,
            link, 
            position,
            type
        ]
    );
    return result;
};

exports.updateMenu = async (menuId, updatedData) =>{
    let [result] = '';
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
        result = await pool.query(
            `UPDATE menu SET ${Object.keys(updatedData)[i]} = '${Object.values(updatedData)[i]}' WHERE menuId = ${menuId}` 
        );
    }
    return result;
};

exports.deleteMenu = async (menuId)=>{
    const [result] = await pool.query(
        `DELETE FROM menu WHERE menuId='${menuId}'`
    );
    return result;
};