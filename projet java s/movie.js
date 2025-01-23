const API_URL = "http://www.omdbapi.com";
const API_KEY = 'd05ca3a7';
const movieDetailsContainer = document.getElementById('movie-details');

/**
 * Extract movie ID from URL.
 * @returns {string} - IMDb movie ID.
 */
function getMovieIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Fetch detailed movie data from the OMDb API.
 * @param {string} movieId - IMDb ID of the movie.
 */
async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            displayMovieDetails(movie);
        } else {
            movieDetailsContainer.innerHTML = `<p>Movie details not found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        movieDetailsContainer.innerHTML = `<p>Error loading movie details. Please try again later.</p>`;
    }
}

/**
 * Display movie details on the page.
 * @param {Object} movie - Movie data from the API.
 */
function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <article class="movie-details">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'assets/images/placeholder.jpg'}" alt="${movie.Title}">
            <div class="details-content">
                <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                <p><strong>Rating:</strong> ${movie.imdbRating}/10</p>
                <a href="index.html" class="btn">Back to Home</a>
            </div>
        </article>
    `;
}

// Load movie details when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const movieId = getMovieIdFromURL();
    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        movieDetailsContainer.innerHTML = `<p>No movie selected.</p>`;
    }
});

