const API_URL = "http://www.omdbapi.com";
const API_KEY = 'd05ca3a7';

const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');

/**
 * Fetch movie data based on user input.
 * @param {string} query - Search term entered by the user.
 */
async function searchMovies(query) {
    if (query.trim() === '') {
        searchResultsContainer.innerHTML = '<p>Please enter a movie name to search.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displaySearchResults(data.Search);
        } else {
            searchResultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching search data:", error);
        searchResultsContainer.innerHTML = `<p>Error loading search results. Please try again later.</p>`;
    }
}

/**
 * Display fetched movie results in the DOM.
 * @param {Array} movies - List of movies returned from the API.
 */
function displaySearchResults(movies) {
    searchResultsContainer.innerHTML = movies.map(movie => `
        <article class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'assets/images/placeholder.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <a href="movie.html?id=${movie.imdbID}">More Info</a>
        </article>
    `).join('');
}

// Event listener for input search
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length > 2) {
        searchMovies(query);
    } else {
        searchResultsContainer.innerHTML = '';
    }
});
