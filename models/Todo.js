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
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref:'Users',
      required:[true, 'please provide user']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", TodoSchema);
