const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DEFAULT_COVER = "/images/books.png";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "images"));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const safeBaseName = path
      .basename(file.originalname || "cover", extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${safeBaseName || "cover"}${extension}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    cb(new Error("Only image files are allowed"));
  }
});

let books = [
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
  },
  {
    _id: 4,
    title: "Children of Blood and Bone",
    author: "Tomi Adeyemi",
    genre: "Fantasy",
    publication_year: 2018,
    page_count: 544,
    rating: 4.6,
    main_image: "/images/books.png",
    description:
      "A West African-inspired fantasy about magic, oppression, and a young girl's fight to restore her people's power.",
    features: ["YA fantasy", "Rich world-building", "Strong female lead"],
    formats: [
      { type: "Hardcover", isbn: "9781250170972", price: "$21.99" },
      { type: "Paperback", isbn: "9781250170989", price: "$14.99" }
    ]
  },
  {
    _id: 5,
    title: "The Vanishing Half",
    author: "Brit Bennett",
    genre: "Historical Fiction",
    publication_year: 2020,
    page_count: 352,
    rating: 4.5,
    main_image: "/images/books.png",
    description:
      "A multi-generational story about twin sisters who choose to live very different lives, exploring race and identity.",
    features: ["Family saga", "Explores identity", "Emotional storytelling"],
    formats: [
      { type: "Hardcover", isbn: "9780525536291", price: "$20.99" },
      { type: "Paperback", isbn: "9780525536963", price: "$16.00" }
    ]
  },
  {
    _id: 6,
    title: "Between the World and Me",
    author: "Ta-Nehisi Coates",
    genre: "Memoir",
    publication_year: 2015,
    page_count: 176,
    rating: 4.7,
    main_image: "/images/books.png",
    description:
      "A powerful letter to the author's son about race, history, and growing up Black in America.",
    features: ["Award-winning", "Reflective", "Cultural critique"],
    formats: [
      { type: "Hardcover", isbn: "9780812993547", price: "$18.00" },
      { type: "Paperback", isbn: "9780812993547", price: "$15.00" }
    ]
  },
  {
    _id: 7,
    title: "Legendborn",
    author: "Tracy Deonn",
    genre: "Fantasy",
    publication_year: 2020,
    page_count: 512,
    rating: 4.6,
    main_image: "/images/books.png",
    description:
      "A modern fantasy rooted in Arthurian legend and Southern Black girl magic.",
    features: ["YA fantasy", "Magic and history blend", "College setting"],
    formats: [
      { type: "Hardcover", isbn: "9781534441606", price: "$19.99" },
      { type: "Paperback", isbn: "9781534441620", price: "$13.99" }
    ]
  },
  {
    _id: 8,
    title: "Kindred",
    author: "Octavia E. Butler",
    genre: "Science Fiction",
    publication_year: 1979,
    page_count: 264,
    rating: 4.8,
    main_image: "/images/books.png",
    description:
      "A time-travel novel that sends a modern Black woman back to the era of slavery.",
    features: ["Classic sci-fi", "Historical themes", "Thought-provoking"],
    formats: [
      { type: "Paperback", isbn: "9780807083697", price: "$16.99" },
      { type: "eBook", isbn: "9780807083703", price: "$9.99" }
    ]
  },
  {
    _id: 9,
    title: "The Hate U Give",
    author: "Angie Thomas",
    genre: "Young Adult Fiction",
    publication_year: 2017,
    page_count: 464,
    rating: 4.7,
    main_image: "/images/books.png",
    description:
      "A teen girl navigates activism and identity after witnessing a police shooting.",
    features: ["Social justice themes", "YA bestseller", "Emotionally impactful"],
    formats: [
      { type: "Hardcover", isbn: "9780062498533", price: "$18.99" },
      { type: "Paperback", isbn: "9780062498533", price: "$12.99" }
    ]
  },
  {
    _id: 10,
    title: "Black Cake",
    author: "Charmaine Wilkerson",
    genre: "Contemporary Fiction",
    publication_year: 2022,
    page_count: 400,
    rating: 4.3,
    main_image: "/images/books.png",
    description:
      "A family drama that unravels secrets through a traditional Caribbean dessert.",
    features: ["Family mystery", "Cultural themes", "Multi-perspective"],
    formats: [
      { type: "Hardcover", isbn: "9780593358337", price: "$21.00" },
      { type: "Paperback", isbn: "9780593358351", price: "$16.00" }
    ]
  },
  {
    _id: 11,
    title: "Homegoing",
    author: "Yaa Gyasi",
    genre: "Historical Fiction",
    publication_year: 2016,
    page_count: 320,
    rating: 4.6,
    main_image: "/images/books.png",
    description:
      "A sweeping novel tracing the lineage of two sisters across continents and generations.",
    features: ["Generational story", "African diaspora", "Critically acclaimed"],
    formats: [
      { type: "Paperback", isbn: "9781101971062", price: "$15.99" },
      { type: "eBook", isbn: "9781101971062", price: "$10.99" }
    ]
  },
  {
    _id: 12,
    title: "Ace of Spades",
    author: "Faridah Abike-Iyimide",
    genre: "Thriller",
    publication_year: 2021,
    page_count: 448,
    rating: 4.4,
    main_image: "/images/books.png",
    description:
      "A dark academic thriller exposing racism and secrets at an elite private school.",
    features: ["Suspenseful", "Dark academia", "Social commentary"],
    formats: [
      { type: "Hardcover", isbn: "9781250800817", price: "$19.99" },
      { type: "Paperback", isbn: "9781250800831", price: "$14.99" }
    ]
  },
  {
    _id: 13,
    title: "All Boys Aren't Blue",
    author: "George M. Johnson",
    genre: "Memoir",
    publication_year: 2020,
    page_count: 320,
    rating: 4.5,
    main_image: "/images/books.png",
    description:
      "A series of essays about growing up Black and queer, exploring identity and resilience.",
    features: ["Coming-of-age", "LGBTQ+ themes", "Personal essays"],
    formats: [
      { type: "Hardcover", isbn: "9780374312718", price: "$18.99" },
      { type: "Paperback", isbn: "9780374312718", price: "$12.99" }
    ]
  }
];

const bookSchema = Joi.object({
  title: Joi.string().trim().min(2).max(120).required(),
  author: Joi.string().trim().min(2).max(80).required(),
  genre: Joi.string().trim().min(2).max(60).required(),
  publication_year: Joi.number().integer().min(1000).max(new Date().getFullYear() + 1).required(),
  page_count: Joi.number().integer().min(1).max(5000).required(),
  rating: Joi.number().min(0).max(5).precision(1).required(),
  main_image: Joi.string().trim().min(3).max(300).optional(),
  description: Joi.string().trim().min(10).max(600).required(),
  features: Joi.array().items(Joi.string().trim().min(2).max(80)).min(1).required(),
  formats: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().trim().min(2).max(40).required(),
        isbn: Joi.string().trim().min(10).max(20).required(),
        price: Joi.string().trim().min(2).max(20).required()
      })
    )
    .min(1)
    .required()
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

function parseMaybeJson(value, fallback = value) {
  if (typeof value !== "string") {
    return value ?? fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function normalizeBookInput(body, file) {
  const normalized = {
    ...body,
    publication_year: Number(body.publication_year),
    page_count: Number(body.page_count),
    rating: Number(body.rating),
    main_image: file ? `/images/${file.filename}` : body.main_image,
    features: parseMaybeJson(body.features, body.features),
    formats: parseMaybeJson(body.formats, body.formats)
  };

  if (typeof normalized.features === "string") {
    normalized.features = normalized.features
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);
  }

  return normalized;
}

app.get("/api", (req, res) => {
  res.send({
    name: "ShelfSpace API",
    version: "1.0.0",
    endpoints: {
      allBooks: "/api/books",
      bookById: "/api/books/:id",
      createBook: "/api/books",
      updateBook: "/api/books/:id",
      deleteBook: "/api/books/:id"
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

app.post("/api/books", upload.single("cover"), (req, res) => {
  const validationResult = bookSchema.validate(normalizeBookInput(req.body, req.file), {
    abortEarly: false,
    stripUnknown: true
  });

  if (validationResult.error) {
    return res.status(400).send({
      message: "Validation failed",
      errors: validationResult.error.details.map((detail) => detail.message)
    });
  }

  const newBook = {
    _id: books.length ? Math.max(...books.map((book) => book._id)) + 1 : 1,
    ...validationResult.value,
    main_image: validationResult.value.main_image || DEFAULT_COVER
  };

  books.push(newBook);

  res.status(201).send({
    message: "Book added successfully",
    book: newBook
  });
});

app.put("/api/books/:id", upload.single("cover"), (req, res) => {
  const requestedId = Number(req.params.id);
  const existingBook = books.find((book) => book._id === requestedId);

  if (!existingBook) {
    return res.status(404).send({ message: "Book not found" });
  }

  const validationResult = bookSchema.validate(
    normalizeBookInput(
      {
        ...existingBook,
        ...req.body,
        main_image: req.body.main_image || existingBook.main_image
      },
      req.file
    ),
    {
      abortEarly: false,
      stripUnknown: true
    }
  );

  if (validationResult.error) {
    return res.status(400).send({
      message: "Validation failed",
      errors: validationResult.error.details.map((detail) => detail.message)
    });
  }

  const updatedBook = {
    _id: existingBook._id,
    ...validationResult.value,
    main_image: validationResult.value.main_image || existingBook.main_image || DEFAULT_COVER
  };

  books = books.map((book) => (book._id === requestedId ? updatedBook : book));

  res.status(200).send({
    message: "Book updated successfully",
    book: updatedBook
  });
});

app.delete("/api/books/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book._id === requestedId);

  if (bookIndex === -1) {
    return res.status(404).send({ message: "Book not found" });
  }

  const [deletedBook] = books.splice(bookIndex, 1);

  res.send({
    message: "Book removed successfully",
    book: deletedBook
  });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).send({ message: error.message });
  }

  if (error && error.message === "Only image files are allowed") {
    return res.status(400).send({ message: error.message });
  }

  return next(error);
});

app.listen(PORT, () => {
  console.log(`ShelfSpace server is running on port ${PORT}`);
});
