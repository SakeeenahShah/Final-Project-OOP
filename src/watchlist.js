document.addEventListener('DOMContentLoaded', function(event) {
    loadWatchlist();
});

// Function to load watchlist items
function loadWatchlist() {
    var watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
    var watchlistContainer = document.getElementById('watchlist-items');
    watchlistContainer.innerHTML = '';

    if (watchlistItems.length === 0) {
        watchlistContainer.innerHTML = '<p id="no-watchlist">No anime on the watchlist. Please add one!</p>';
    } else {
        // For each anime in the watchlist, create a div element to display its details
        watchlistItems.forEach(anime => {
            var animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML =
                '<img src="' + anime.image + '" alt="' + (anime.title_english || anime.title) + '">' +
                '<div class="anime-title">' + (anime.title_english || anime.title) + '</div>' +
                '<div class="anime-status">Status: ' + (anime.watched ? 'Watched' : 'Not Watched') + '</div>' +
                '<select class="status-select" onchange="updateWatchedStatus(\'' + (anime.title_english || anime.title) + '\', this.value)">' +
                '<option value="Not Watched" ' + (!anime.watched ? 'selected' : '') + '>Not Watched</option>' +
                '<option value="Watched" ' + (anime.watched ? 'selected' : '') + '>Watched</option>' +
                '</select>' +
                '<button class="delete-button" onclick="deleteFromWatchlist(\'' + (anime.title_english || anime.title) + '\')">Delete</button>';

            watchlistContainer.appendChild(animeItem);    // Add the anime item to the watchlist container
        });
    }
}

// Function to update watched status
function updateWatchedStatus(title, status) {
    var watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
    var index = watchlistItems.findIndex(anime => anime.title === title || anime.title_english === title);
    if (index !== -1) {
        watchlistItems[index].watched = (status === 'Watched');
        // Save the updated watchlist back to local storage
        localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
        loadWatchlist(); // Reload watchlist after updating status
    }
}

// Function to delete from watchlist
function deleteFromWatchlist(title) {
    console.log('Deleting anime: ' + title);
    var watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
    var index = watchlistItems.findIndex(anime => anime.title === title || anime.title_english === title);
    
    if (index !== -1) {
        var deletedAnime = watchlistItems[index];
        watchlistItems.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
        console.log(deletedAnime.title + ' deleted from watchlist');
        alert(deletedAnime.title + ' deleted from watchlist'); // Add alert message
        loadWatchlist(); // Reload watchlist after deletion

    } else {
        console.log('Anime not found in watchlist: ' + title);
        alert('Anime not found in watchlist: ' + title); // Show a popup alert message for not found scenario
    }
}

