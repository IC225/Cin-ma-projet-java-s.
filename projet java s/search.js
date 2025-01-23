const API_URL = "http://www.omdbapi.com";
const API_KEY = 'd05ca3a7';

const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');
const loadMoreButton = document.getElementById('load-more');

let currentPage = 1;  // Track the current page number
let currentQuery = '';  // Store the last searched query

/**
 * Fetch movie data based on user input and page number.
 * @param {string} query - Search term entered by the user.
 * @param {number} page - Page number for paginated results.
 */
async function searchMovies(query, page = 1) {
    if (query.trim() === '') {
        searchResultsContainer.innerHTML = '<p>Please enter a movie name to search.</p>';
        loadMoreButton.style.display = 'none';  // Hide button if query is empty
        return;
    }

    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displaySearchResults(data.Search, page);
            loadMoreButton.style.display = 'block';  // Show button if results are found
        } else {
            if (page === 1) {
                searchResultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
            }
            loadMoreButton.style.display = 'none';  // Hide button if no results
        }
    } catch (error) {
        console.error("Error fetching search data:", error);
        searchResultsContainer.innerHTML = `<p>Error loading search results. Please try again later.</p>`;
        loadMoreButton.style.display = 'none';
    }
}

/**
 * Display fetched movie results in the DOM.
 * @param {Array} movies - List of movies returned from the API.
 * @param {number} page - Page number to determine if results should be appended or replaced.
 */
function displaySearchResults(movies, page) {
    if (page === 1) {
        searchResultsContainer.innerHTML = '';  // Clear previous results for a new search
    }

    searchResultsContainer.innerHTML += movies.map(movie => `
        <article class="movie-card">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : './iris.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <a href="movie.html?id=${movie.imdbID}">More Info</a>
        </article>
    `).join('');
}

// Event listener for search input
searchInput.addEventListener('input', () => {
    currentQuery = searchInput.value;
    currentPage = 1;
    if (currentQuery.length > 2) {
        searchMovies(currentQuery, currentPage);
    } else {
        searchResultsContainer.innerHTML = '';
        loadMoreButton.style.display = 'none';
    }
});

// Event listener for Load More button
loadMoreButton.addEventListener('click', () => {
    currentPage++;
    searchMovies(currentQuery, currentPage);
});
