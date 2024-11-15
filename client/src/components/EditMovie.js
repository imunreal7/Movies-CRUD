import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteMovie from "./DeleteMovie";
import EditMovie from "./EditMovie";

const MovieList = ({ onMovieDeleted }) => {
    const [movies, setMovies] = useState([]);
    const [editingMovieId, setEditingMovieId] = useState(null); // Track the movie being edited

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        axios
            .get("http://localhost:8080/movies")
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching movies:", error));
    };

    const handleMovieDeleted = () => {
        fetchMovies();
        if (onMovieDeleted) {
            onMovieDeleted();
        }
    };

    const handleMovieUpdated = () => {
        setEditingMovieId(null); // Close edit form after updating
        fetchMovies();
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    style={{
                        width: "300px",
                        margin: "10px",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#f9f9f9",
                        position: "relative",
                    }}
                >
                    <h3>{movie.name}</h3>
                    <p>{movie.genre}</p>
                    <p>{movie.description}</p>
                    <img
                        src={movie.poster}
                        alt={`${movie.name} poster`}
                        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                    />
                    <DeleteMovie movieId={movie.id} onMovieDeleted={handleMovieDeleted} />
                    <button
                        onClick={() => setEditingMovieId(movie.id)}
                        style={{
                            display: "block",
                            marginTop: "10px",
                            padding: "5px 10px",
                            border: "none",
                            backgroundColor: "#f0ad4e",
                            color: "#fff",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        Edit Movie
                    </button>

                    {/* Show EditMovie form when editingMovieId matches the movie's id */}
                    {editingMovieId === movie.id && (
                        <div style={{ marginTop: "15px" }}>
                            <EditMovie movieId={movie.id} onMovieUpdated={handleMovieUpdated} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MovieList;
