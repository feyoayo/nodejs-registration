const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const todosRouter = require("./todosRouter");
const PORT = process.env.PORT || 8000;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/", todosRouter);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://qwerty:qwerty123@cluster0.jpnlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
