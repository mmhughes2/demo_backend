const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
}


const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

createMessage();