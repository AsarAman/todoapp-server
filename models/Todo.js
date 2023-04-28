const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Provide Name"],
    },
    description: {
      type: String,
      require: [true, "Please Provide Description"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", TodoSchema);
