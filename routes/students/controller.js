const { Students } = require("../../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const result = await Students.find({}).populate(
                "user",
                "firstName email age"
            );

            res.status(200).send({
                message: "Show datas students",
                data: result
            });
        } catch (error) {
            console.log(error);
        }
    },
    postData: async (req, res) => {
        try {
            const data = req.body;

            const result = await Students.create(data);
            console.log(result)
            res.status(200).send({
                message: "New data user is successfully added",
                data: result
            });
        } catch (error) {
            console.log(error);
        }
    },
    getByName: async (req, res) => {
        try {
            const result = await Students.findOne({
                name: req.params.name
            }).populate("user", "firstName email age");

            res.status(200).send({ message: "Show by name", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    deleteByName: async (req, res) => {
        try {
            const deleted = await Students.deleteOne({ name: req.params.name });

            res.status(200).send({ message: "Delete by name", data: deleted });
        } catch (error) {
            console.log(error);
        }
    },
    updateById: async (req, res) => {
        try {
            let data = req.body;

            let update = await Students.findByIdAndUpdate(req.params.id, {score: req.body.score});
             await update.save();
            // const data= req.body
            res.status(200).send({
                message: "Show data updated",
                data: data
            });
        } catch (error) {
            console.log(error);
        }
    }
};
