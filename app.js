const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3001;

const books = [
  {
    _id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Contemporary Fantasy",
    publication_year: 2020,
    page_count: 304,
    rating: 4.2,
    main_image: "/images/books.png",
    description:
      "A reflective novel about second chances, parallel lives, and choosing what matters most.",
    features: ["Book club favorite", "Reflective storytelling", "Accessible prose"],
    formats: [
      { type: "Hardcover", isbn: "9780525559474", price: "$18.99" },
      { type: "Paperback", isbn: "9780143135135", price: "$13.99" }
    ]
  },
  {
    _id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    publication_year: 2021,
    page_count: 496,
    rating: 4.7,
    main_image: "/images/app-preview1.png",
    description:
      "A high-stakes space survival story full of science puzzles, humor, and surprising heart.",
    features: ["Fast-paced adventure", "First contact story", "STEM-driven plot"],
    formats: [
      { type: "Hardcover", isbn: "9780593135204", price: "$22.00" },
      { type: "Audiobook", isbn: "9780593455203", price: "$19.99" }
    ]
  },
  {
    _id: 3,
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    genre: "Literary Fiction",
    publication_year: 2022,
    page_count: 416,
    rating: 4.3,
    main_image: "/images/app-preview2.png",
    description:
      "A character-driven story about friendship, ambition, creativity, and the world of game design.",
    features: ["Character-driven", "Gaming industry backdrop", "Emotional arc"],
    formats: [
      { type: "Hardcover", isbn: "9780593321201", price: "$20.99" },
      { type: "eBook", isbn: "9780593321218", price: "$12.99" }
    ]
  }
];

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.get("/api", (req, res) => {
  res.send({
    name: "ShelfSpace API",
    version: "1.0.0",
    endpoints: {
      allBooks: "/api/books",
      bookById: "/api/books/:id"
    }
  });
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const requestedBook = books.find((book) => book._id === Number(req.params.id));

  if (!requestedBook) {
    return res.status(404).send({ message: "Book not found" });
  }

  res.send(requestedBook);
});

app.listen(PORT, () => {
  console.log(`ShelfSpace server is running on port ${PORT}`);
});
