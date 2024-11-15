import React from "react";
import axios from "axios";

const DeleteMovie = ({ movieId, onMovieDeleted }) => {
    const handleDelete = () => {
        axios
            .delete(`http://localhost:8080/movies/${movieId}`)
            .then(onMovieDeleted)
            .catch((error) => console.error("Error deleting movie:", error));
    };

    return <button onClick={handleDelete}>Delete Movie</button>;
};

export default DeleteMovie;
