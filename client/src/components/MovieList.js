import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteMovie from "./DeleteMovie";

const MovieList = ({ onEditClick }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        axios
            .get("http://localhost:8080/movies")
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching movies:", error));
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    style={{
                        width: "350px",
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
                    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                        <DeleteMovie movieId={movie.id} onMovieDeleted={fetchMovies} />
                        <button
                            onClick={() => onEditClick(movie)}
                            style={{
                                padding: "8px 15px",
                                border: "none",
                                backgroundColor: "#f0ad4e",
                                color: "#fff",
                                cursor: "pointer",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                transition: "background-color 0.3s",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#ec971f")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#f0ad4e")}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
