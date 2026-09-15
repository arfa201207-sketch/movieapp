const movieList = document.getElementById("movieList");

async function loadMovies() {

    const response = await fetch("/movies");

    const movies = await response.json();

    movieList.innerHTML = "";

    movies.forEach((movie) => {

        const movieCard = document.createElement("div");

        movieCard.className = "movie-card";

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p><b>Year:</b> ${movie.year}</p>

                <p><b>Genre:</b> ${movie.genre}</p>

                <p><b>Rating:</b> ⭐ ${movie.rating}</p>
            </div>
        `;

        movieList.appendChild(movieCard);
    });
}

loadMovies();