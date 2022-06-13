const app = require("./app");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.LOCAL_MONGODB_ADDRESS;
const PORT = process.env.PORT;

const database = mongoose
  .connect(DB)
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
