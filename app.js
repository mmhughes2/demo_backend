const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

  let books = [
  {
    "_id": 1,
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "genre": "Contemporary Fantasy",
    "page_count": 304,
    "rating": 4.2,
    "features": [
      "book club favorite",
      "reflective storytelling"
    ],
    "main_image": "midnight-library.jpg",
    "formats": [
      {
        "type": "Hardcover",
        "isbn": "9780525559474"
      },
      {
        "type": "Paperback",
        "isbn": "9780143135135"
      }
    ]
  },
  {
    "_id": 2,
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "genre": "Science Fiction",
    "page_count": 496,
    "rating": 4.7,
    "features": [
      "fast-paced adventure",
      "first contact story"
    ],
    "main_image": "project-hail-mary.jpg",
    "formats": [
      {
        "type": "Hardcover",
        "isbn": "9780593135204"
      },
      {
        "type": "Audiobook",
        "isbn": "9780593455203"
      }
    ]
  },
  {
    "_id": 3,
    "title": "Tomorrow, and Tomorrow, and Tomorrow",
    "author": "Gabrielle Zevin",
    "genre": "Literary Fiction",
    "page_count": 416,
    "rating": 4.3,
    "features": [
      "character-driven",
      "gaming industry backdrop",
      "multi-decade timeline"
    ],
    "main_image": "tomorrow-and-tomorrow.jpg",
    "formats": [
      {
        "type": "Hardcover",
        "isbn": "9780593321201"
      },
      {
        "type": "eBook",
        "isbn": "9780593321218"
      }
    ]
  }
]

app.get("/api/books",(req,res)=>{
  res.send(books);
});

app.get("/api/books/:id", (req,res)=>{
  const requestedBook = books.find((b) => b._id === parseInt(req.params.id, 10));

  if (!requestedBook) {
    return res.status(404).send({ message: "Book not found" });
  }

  res.send(requestedBook);
});

// listen for incoming requests
app.listen(3001, ()=>{
  console.log("Server is up and running");
  
});
