const ObjectId = require("mongoose").Types.ObjectId;
const { Blog, Users } = require("../../models");

// Database Mongo
module.exports = {
    getAll: (req, res) => {
        try {
            Blog.find({})
                .populate("user", "firstName lastName")
                .then(result => {
                    res.status(200).send({
                        message: "Show data",
                        data: result
                    });
                });
        } catch (error) {
            console.log(error);
        }
    },
    postBlog: (req, res) => {
        try {
            Blog.create(req.body).then(async result => {
                console.log(result.user);
                const userData = await Users.update(
                    { _id: result.user },
                    {
                        $push: { blog: result._id }
                    }
                );

                console.log(userData);

                res.status(200).send({ message: "Add new data", data: result });
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateById: async (req, res) => {
        try {
            let update = await Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            console.log("THIS IS UPDATED", update)
            res.status(200).send({
                message: "Show data updated",
                data: update
            });
        } catch (error) {
            console.log(error);
        }
    },
    getById: async (req, res) => {
        try {
            console.log("PARAMS", req.params)
            const result = await Blog.findOne({_id:req.params.id}).populate(
                "user",
                "firstName lastName"
            );

            res.status(200).send({ message: "Show datas user", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    deleteById: async (req, res) => {
        try {
            let deleted = await Blog.findByIdAndRemove(req.params.id);

            res.status(200).send({
                message: "successfully deleted",
                data: deleted
            });
        } catch (error) {
            console.log(error);
        }
    }
};
