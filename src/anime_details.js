// 'BACK' button to go back to home/index
function goBack() {
    window.history.back();
}

// to display anime information
document.addEventListener('DOMContentLoaded', function(event) {
    var anime = JSON.parse(localStorage.getItem('selectedAnime'));
    if (anime) {
        document.getElementById('anime-image').src = anime.images.jpg.image_url;
        document.getElementById('anime-image').alt = anime.title;
        document.getElementById('anime-title').textContent = anime.title_english || anime.title;
        document.getElementById('synopsis').textContent = anime.synopsis;
        document.getElementById('score').textContent = anime.score;
        document.getElementById('rank').textContent = anime.rank;
        document.getElementById('popularity').textContent = anime.popularity;
        document.getElementById('genres').textContent = anime.genres.map(function(g) { return g.name; }).join(', ');
        document.getElementById('producers').textContent = anime.producers.map(function(p) { return p.name; }).join(', ');
        document.getElementById('source').textContent = anime.source;
        document.getElementById('rating').textContent = anime.rating;
        document.getElementById('release-date').textContent = new Date(anime.aired.from).toLocaleDateString();
        document.getElementById('mal-link').innerHTML = '<a href="' + anime.url + '" target="_blank">MyAnimeList</a>';
    }
});

// Function to add anime to watchlist
// Function create
function addToWatchlist() {
    var selectedAnime = JSON.parse(localStorage.getItem('selectedAnime'));
    var watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Check if anime already exists in watchlist
    if (watchlistItems.some(anime => anime.title === selectedAnime.title)) {
        alert(selectedAnime.title + ' is already in your watchlist!');
    } else {
        // Add anime to watchlist
        watchlistItems.push({        // add a new anime object to the watchlistItems array 
            title: selectedAnime.title, 
            image: selectedAnime.images.jpg.image_url, 
            watched: false 
        });
        localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
        alert(selectedAnime.title + ' successfully added to watchlist');
    }
}

document.getElementById('add-to-watchlist').addEventListener('click', function() {
    addToWatchlist();
});
