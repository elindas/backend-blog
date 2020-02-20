const express = require("express");
const router = express.Router();

const { getAll, getById } = require("./controller");

router.get("/", getAll);
router.post("/", require("./controller").postBlog);
router.get("/detail/:id", require("./controller").getById);
router.put("/:id", require("./controller").updateById);
router.delete("/:id", require("./controller").deleteById);




module.exports = router;
