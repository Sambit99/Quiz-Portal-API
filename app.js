const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./src/routes/userRoutes");
const questionRouter = require("./src/routes/questionRoutes");
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: "Connection Succesful",
//   });

//   next();
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/qs", questionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
