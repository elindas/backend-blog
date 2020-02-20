const { Users } = require("../../models");
const { hashPassword, comparedPassword } = require("../../helpers");
const jwt= require("jsonwebtoken")
module.exports = {
   
    postData: async (req, res) => {
        try {
            const data = req.body;
           
            const hash = await hashPassword(req.body.password);

            const result = await Users.create({
                ...data,
                password: hash
            });

            res.status(200).send({
                message: "New data user is successfully added",
                data: result
            });
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            const result = await Users.findOne({ email: req.body.email });

            const compared = await comparedPassword(
                req.body.password,
                result.password
            );

            if (compared === true) {
                const {email, id, userName, firstName}= result

                const token = jwt.sign({email, id, userName, firstName}, "SECRET")

                res.status(200).send({
                    message: "You are successfully logged in",
                    token: token
                });
            } else {
                res.status(403).send({
                    message: "You are not an user, please register first"
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getByEmail: async (req, res) => {
        try {
            const result = await Users.findOne({
                email: req.params.email
            }).populate("blog", "title message")

            res.status(200).send({ message: "Show data by email", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    getBlog: async (req, res) => {
        try {
            const result = await Users.findOne({ email: req.user.email });


            if (req.user.email === result.email) {
                const {blog}= result

                const token = jwt.sign({blog}, "BLOG")

                res.status(200).send({
                    message: "Show blog by email",
                    token: token
                });
            } else {
                res.status(403).send({
                    message: "Email is not matched"
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    
    updateById: async (req, res) => {
        try {
            const data = req.body;

            const hash = await hashPassword(req.body.password);
            
            let update = await Users.findByIdAndUpdate(req.params.id, {...data, password: hash}, {new: true});
            
            res.status(200).send({
                message: "Show data updated",
                data: update
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const result = await Users.find({}).populate("blog", "title message")
            
            console.log('INI RESULT GET ALL', result)
            res.status(200).send({ message: "Show datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },

};
