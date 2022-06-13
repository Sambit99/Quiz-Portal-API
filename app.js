const express = require("express");
const morgan = require("morgan");
const userRouter = require("./src/routes/userRoutes");
const questionRouter = require("./src/routes/questionRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: "Connection Succesful",
//   });

//   next();
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/qs", questionRouter);

module.exports = app;
