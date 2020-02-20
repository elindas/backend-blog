var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const expressJWT = require("express-jwt");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(
    expressJWT({ secret: "SECRET" }).unless({
        path: [
            { url: "/", methods: ["GET"] },
            { url: "/blog/detail/:id", methods: ["GET"] },

            {
                url: "/users/login",
                methods: ["POST"]
            },
            
            { url: "/blog", methods: ["GET"] },
            
            { url: "/users", methods: ["POST"] },
            
        ]
    })
);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.status(401).send({ message: "you are not a member" });
    } else {
        return next();
    }
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blog", require("./routes/blog"));
app.use("/students", require("./routes/students"));

app.use("/assets", express.static("assets"));

module.exports = app;
