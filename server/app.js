const express = require("express");
require("dotenv").config();
const MongoStore = require("connect-mongo"); //install connect-mongo@latest
const session = require("express-session");
const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth");
const noteRoutes = require("./src/routes/notes");
const cors = require("cors");
// Databse Connection

connectDB();

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: function (origin, cb) {
      console.log("Origin:", origin);
      console.log("Allowed:", allowedOrigins);

      if (!origin) {
        return cb(null, true);
      }
      const isAllowed = allowedOrigins.some((o) => origin.startsWith(o));

      if (isAllowed) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY || "Session_hidden_token",
    resave: false, //don't write unchanged sessions
    saveUninitialized: false, // Don't save empty sessions
    store: MongoStore.create({
      //Defines where sessions are stored
      mongoUrl: process.env.MONGODBSTRING,
      collectionName: "sessions",
      ttl: 2 * 24 * 60 * 60, // ttl: time to live
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", //Set To False For Testing Only and using HTTP in Development. Must change to true when sent over HTTPS
      httpOnly: true, // Prevents JavaScript from accessing the cookie (reduces XSS risk).
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", //"lax",
    },
  }),
);

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// app.get("/health", (req, res) => {
//   res.send("OK");
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
