const mongoose = require("mongoose");

const optionsPattern = new mongoose.Schema({
  option_1: {
    type: String,
    required: [true, "Option 1 is required"],
  },
  option_2: {
    type: String,
    required: [true, "Option 2 is required"],
  },
  option_3: {
    type: String,
    required: [true, "Option 3 is required"],
  },
  option_4: {
    type: String,
    required: [true, "Option 4 is required"],
  },
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
    unique: true,
  },
  options: optionsPattern,
  answer: {
    type: Number,
    required: [true, "Answer is required"],
  },
  image: {
    type: String,
  },
});

const Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
