import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMovie = ({ onMovieAdded, editingMovie, onEditComplete }) => {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (editingMovie) {
            setName(editingMovie.name);
            setGenre(editingMovie.genre);
            setDescription(editingMovie.description);
            setPoster(editingMovie.poster);
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [editingMovie]);

    const resetForm = () => {
        setName("");
        setGenre("");
        setDescription("");
        setPoster("");
        setIsEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const movieData = { name, genre, description, poster };

        if (isEditing) {
            // Editing an existing movie
            axios
                .put(`http://localhost:8080/movies/${editingMovie.id}`, movieData)
                .then(() => {
                    onEditComplete();
                    resetForm();
                })
                .catch((error) => console.error("Error editing movie:", error));
        } else {
            // Adding a new movie
            axios
                .post("http://localhost:8080/movies", movieData)
                .then(() => {
                    onMovieAdded();
                    resetForm();
                })
                .catch((error) => console.error("Error adding movie:", error));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                maxWidth: "500px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h2 style={{ textAlign: "center", color: "#333" }}>
                {isEditing ? "Edit Movie" : "Add a New Movie"}
            </h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "80px",
                }}
            />
            <input
                type="text"
                placeholder="Poster URL"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                type="submit"
                style={{
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#0073e6",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {isEditing ? "Update Movie" : "Add Movie"}
            </button>
        </form>
    );
};

export default AddMovie;
