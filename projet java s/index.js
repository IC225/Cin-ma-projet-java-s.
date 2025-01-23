const API_URL = "http://www.omdbapi.com";
const API_KEY = 'd05ca3a7';

const loadMoreButton = document.querySelector("#load-more");
const moviesContainer = document.querySelector(".movies-container");

let currentPage = 1;

/**
 * Fetch movie data from the OMDb API.
 * @param {string} query - Search term for movies.
 * @returns {Promise<Array>} - Array of movies.
 */
async function fetchMovieData(query) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}&page=${currentPage}`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data.Search || [];
        } else {
            console.error(data.Error);
            return [];
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

/**
 * Create a movie card element.
 * @param {Object} movie - Movie details.
 * @returns {HTMLElement} - Movie card element.
 */
function createMovieCard(movie) {
    const article = document.createElement('article');
    article.classList.add("movie-card");
    article.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "./iris.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <a href="movie.html?id=${movie.imdbID}">Learn More</a>
    `;
    return article;
}

/**
 * Load and display trending movies.
 */
async function loadTrendingMovies() {
    const movies = await fetchMovieData('2024');  // Fetch movies from 2024

    if (movies.length) {
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesContainer.appendChild(movieCard);
        });
    } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "No more movies to load";
    }
}

// Load more movies on button click
loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadTrendingMovies();
});

// Load movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTrendingMovies();
});
