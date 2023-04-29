const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Name"],
    },
    description: {
      type: String,
      required: [true, "Please Provide Description"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", TodoSchema);
