const express = require("express");
const router = express.Router();

router.get("/", require("./controller").getAll);
router.post("/", require("./controller").postData);
router.post("/login", require("./controller").login);
router.put("/:id", require("./controller").updateById);

router.get("/blog", require("./controller").getBlog);

router.get("/:email", require("./controller").getByEmail);




module.exports = router;
