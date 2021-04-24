require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

require("./mvc/models/db");

const indexRouter = require("./mvc/routes/index");
const usersRouter = require("./mvc/routes/users");

const app = express();

// Setup del engine
app.set("views", path.join(__dirname, "mvc", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "angular", "build")));

app.use(function (req, res, next) {
  res.statusJson = function (statusCode, data) {
    let obj = {
      ...data,
      statusCode: statusCode,
    };
    res.status(statusCode).json(obj);
  };
  next();
});

app.use(passport.initialize());

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// App.use('/', indexRouter);
app.use("/users", usersRouter);
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "angular", "build", "index.html"));
});

// Atrapar 404 y forward al manejador de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  // Errores en development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render pagina de error
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
