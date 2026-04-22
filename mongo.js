const mongoose = require("mongoose");
require("dotenv").config();

const formatSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    publication_year: { type: Number, required: true },
    page_count: { type: Number, required: true },
    rating: { type: Number, required: true },
    main_image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    features: [{ type: String, required: true, trim: true }],
    formats: {
      type: [formatSchema],
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Book = mongoose.model("Book", bookSchema);

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
}

module.exports = {
  Book,
  connectToDatabase
};
