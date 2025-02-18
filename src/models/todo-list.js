 import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const todoListSchema = new Schema({
  name: {
    type: Schema.Types.String,
    require: true,
  },
  status: {
    type: Schema.Types.Boolean,
    require: true,
  },
  id: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    default: uuidv4,
  },
});

const todoList = mongoose.model("todoList", todoListSchema);

export default todoList;
