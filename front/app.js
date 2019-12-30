var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var compression = require("compression");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    secret: "b38594c8bc1740999da306fee363a7190128a75667e24e869106c4d9383508ca",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
app.use(compression());

require("./src/routes/index")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Ops! Página não encontrada!"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  if (req.app.get("env") !== "development") {
    err = { status: 500, message: "Ouve um erro no site!" };
  } else {
    err = {
      status: err.status || 500,
      message: err.message || "Ouve um erro no site!",
      stack: err.stack || "Sem log de Erro"
    };
  }

  if (typeof err == "string") {
    err = { message: err.toString(), stack: err.toString(), status: 500 };
  }

  if (
    (err.status === 500 || err.status === undefined) &&
    req.app.get("env") !== "development"
  ) {
    err = { status: err.status || 500, message: "Ouve um erro no site!" };
  }

  res.locals.error = err;
  res.locals.message = err.message;

  // render the error page
  res.status(res.locals.error.status);
  res.render("./pages/errors", err);
});

module.exports = app;
