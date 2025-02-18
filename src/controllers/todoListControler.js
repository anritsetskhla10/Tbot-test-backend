import todoList from "../models/todo-list.js";

export const getAllTodo = async (req, res) => {
  const data = await todoList.find();
  const newData = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: item.status,
    };
  });
  return res.json(newData);
};

export const addTodo = async (req, res) => {
  try {
    const test = req.body;
    const item = new todoList(test);
    const result = await item.save();
    res.status(200).json({ result });
    console.log(test);
  } catch (error) {
    res.status(500).json({ message: "Todo " });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTodo = await todoList.findOne({ id });
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    existingTodo.status = !existingTodo.status;
    const updatedTodo = await existingTodo.save();
    res
      .status(201)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTodo = await todoList.findOne({ id });
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todoList.deleteOne({ id });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMany = async (req, res) => {
  try {
    await todoList.deleteMany({ status: false });
    res.status(201).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
