const fs = require("fs");
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myKey = "123456789!@#$&*";

const userService = require('../model/user-service')
const dataFile = process.cwd() + "/data/users.json"

exports.getAll = async (req, res) => {
    const { limit } = req.query;
    try {

        const result = await userService.getUsers(limit);
        if (result && result.length > 0) {
            res.json({ status: true, result });

        }
    } catch (err) {
        console.log(err);
        res.json({ status: false, message: err })
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.json({ status: false, message: 'user id not found' })
    try {
        const result = await userService.getUser(id);

        res.json({ status: true, result });

    } catch (err) {
        console.log(err);
        res.json({ status: false, message: err })
    }

}
exports.create = async (req, res) => {
    const { firstname, lastname, email } = req.body;

    const newObj = {
        firstname, lastname, email
    }
    try {
        const result = await userService.createUser(newObj);
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
    const { id } = req.params;
    if (!id) {
        return res.json({ status: false, message: "user id not found" })
    }
    try {
        const result = await userService.updateUser(id, req.body);
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
    const { id } = req.params;
    if (!id) {
        return res.json({ status: false, message: "user id not found" })
    }
    try {
        const result = await userService.deleteUser(id);
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

exports.login = (req, res) => {

    const { password, email } = req.body;

    if (!email || !password)
        return res.json({
            status: false,
            message: "medeellee bvren buglunu vv"
        });

    fs.readFile(dataFile, "utf-8", async (readErr, data) => {
        if (readErr) {
            return res.json({ staus: false, message: readErr })
        }

        const parsedData = data ? JSON.parse(data) : [];
        let user;
        for (let i = 0; i < parsedData.length; i++) {
            if (email == parsedData[i].email) {

                const decrypt = await bcrypt.compare(password + myKey, parsedData[i].password);

                if (decrypt) {
                    user = {
                        id: parsedData[i].id,
                        email: parsedData[i].email,
                        lastName: parsedData[i].lastName,
                        firstName: parsedData[i].firstName,
                    };
                    break;
                }
            }
        }

        console.log(user);
        if (user) {
            return res.json({
                status: true,
                result: user,
            })
        } else {
            return res.json({
                status: false,
                message: "Tanii email eswel nuuts ug buruu bna",
            });
        }
    });
}
