const pool = require('../config/mysql.config');

exports.getUsers = async (limit) => {
    try {
        if (limit) {
            const [rows] = await pool.query(
                `SELECT * FROM users limit ${limit}`);

            return rows
        }
    }
    catch (err) {
        console.log(err);
    }
}


exports.getUser = async (userId) => {
    try {
        const [row] = await pool.query(`SELECT * FROM users where userId=${userId}`);
        return row[0];
    }
    catch (err) {
        console.log(err);
    }
}


exports.createUser = async (user) => {

    const { firstName, lastName, userName, email, password } = user;
    //this question marks are similar with C language => printf('%d %d', x,y)
    const [result] = await pool.query(
        `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)`,
        [
            null,
            firstName,
            lastName,
            userName,
            email,
            password
        ]
    );
    return result;
};

exports.updateUser = async (userId, updatedData) => {
    let [result] = "";
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
        result = await pool.query(
            `UPDATE users SET ${Object.keys(updatedData)[i]} ='${Object.values(updatedData)[i]
            }'  WHERE userId = ${userId}`
        );
    }
    return result;
};


exports.deleteUser = async (userId) => {
    const [result] = await pool.query(
        `DELETE FROM users WHERE userId='${userId}'`
    );
    return result;
};