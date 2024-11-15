import React, { useState } from "react";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

function App() {
    const [refresh, setRefresh] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null); // Track the movie being edited

    const refreshMovies = () => setRefresh(!refresh);

    const handleEditClick = (movie) => {
        setEditingMovie(movie); // Set the movie to be edited
    };

    const handleEditComplete = () => {
        setEditingMovie(null); // Clear editing state after edit is complete
        refreshMovies(); // Refresh the movie list
    };

    return (
        <div className="App">
            <h1
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#0073e6",
                    textAlign: "center",
                }}
            >
                Movies CRUD Application 🎬
            </h1>
            <AddMovie
                onMovieAdded={refreshMovies}
                editingMovie={editingMovie}
                onEditComplete={handleEditComplete}
            />
            <MovieList key={refresh} onEditClick={handleEditClick} />
        </div>
    );
}

export default App;

