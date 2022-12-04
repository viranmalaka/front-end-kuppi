var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/login", function (request, response) {
  var html =
    `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>Welcome to Ebay - ` +
    request.query.name +
    `</h1>
      <form action="/login-request" method="GET">
        <label for="username">Username: </label>
        <input type="text" id="username" name="username">
        <label for="password">Password: </label>
        <input type="text" id="password" name="password">
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `;
  response.send(html);
});

app.use("/login-request", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  // search username in the DB - SELECT PASSWORD FROM USERS WEHERE USERNAME=username
  // check DB password is equal to password which is coming from the request.

  if (username === "viranmalaka" && password === "test1234") {
    // correct
    res.send(`
      <html>
      <h1 style="color: green">Hi Viran. You are logged in</h1>
      </html>
    `);
  } else {
    // incorrect
    res.send(`
      <html>
      <h1 style="color: red">You are a wrong user.</h1>
      </html>
    `);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
