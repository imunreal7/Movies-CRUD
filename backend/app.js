import express from "express";
import { createConnection } from "mysql";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Load environment variables
dotenv.config();
// Enable CORS for all routes and allow requests from any origin
app.use(cors());
app.use(express.json()); // Parse JSON bodies
console.log("MYSQL_PASSWORD", process.env.MYSQL_PASSWORD);

// Database connection
const db = createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "movies",
});
console.log("MYSQL_PASSWORD", process.env.MYSQL_PASSWORD);

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        return;
    }
    console.log("Connected to the MySQL database");
});

// API to get all movies
app.get("/movies", (req, res) => {
    db.query("SELECT * FROM movies", (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// API to get a single movie by id
app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM movies WHERE id = ?", [id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        if (data.length === 0) return res.status(404).json({ message: "Movie not found" });
        res.json(data[0]);
    });
});

// API to create a new movie
app.post("/movies", (req, res) => {
    const { name, genre, description, poster } = req.body;
    const query = "INSERT INTO movies (name, genre, description, poster) VALUES (?, ?, ?, ?)";
    db.query(query, [name, genre, description, poster], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Movie created successfully", movieId: result.insertId });
    });
});

// API to create multiple movies
app.post("/movies/bulk", (req, res) => {
    const movies = req.body.movies; // Expect an array of movie objects
    if (!Array.isArray(movies) || movies.length === 0) {
        return res
            .status(400)
            .json({ message: "Invalid input: movies should be a non-empty array" });
    }

    const query = "INSERT INTO movies (name, genre, description, poster) VALUES ?";
    const values = movies.map((movie) => [
        movie.name,
        movie.genre,
        movie.description || null,
        movie.poster || null,
    ]);

    db.query(query, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: `${result.affectedRows} movies added successfully`,
            insertedIds: Array.from({ length: result.affectedRows }, (_, i) => result.insertId + i),
        });
    });
});

// API to update a movie by id
app.put("/movies/:id", (req, res) => {
    const { id } = req.params;
    const { name, genre, description, poster } = req.body;
    const query = "UPDATE movies SET name = ?, genre = ?, description = ?, poster = ? WHERE id = ?";
    db.query(query, [name, genre, description, poster, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie updated successfully" });
    });
});

// API to delete a movie by id
app.delete("/movies/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM movies WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie deleted successfully" });
    });
});

// Server listening
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
