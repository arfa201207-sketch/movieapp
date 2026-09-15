let allMovies = [];

// Get movies from the Node.js API
fetch("/api/movies")
    .then(response => response.json())
    .then(movies => {
        allMovies = movies;
        displayMovies(movies);
    })
    .catch(error => {
        console.error("Error fetching movies:", error);
    });


// Function to display movie cards
function displayMovies(movies) {

    const container = document.getElementById("movie-container");

    // Clear previous movie cards
    container.innerHTML = "";

    // If no movies match the search
    if (movies.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    // Create a card for each movie
    movies.forEach(movie => {

        const movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} poster">

            <h3>${movie.title}</h3>

            <p>Genre: ${movie.genre}</p>

            <p>Year: ${movie.year}</p>
        `;

        container.appendChild(movieCard);
    });
}


// Search button
document.getElementById("search-button").addEventListener("click", () => {

    const searchText = document
        .getElementById("search-input")
        .value
        .toLowerCase()
        .trim();

    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchText)
    );

    displayMovies(filteredMovies);
});