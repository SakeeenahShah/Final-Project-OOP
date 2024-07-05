document.addEventListener('DOMContentLoaded', (event) => {
  loadHomePage();
})

//Function to read anime based on top 20 ranking
function loadHomePage() {
  // Load top 20 anime for the homepage
  fetch('https://api.jikan.moe/v4/top/anime')
    .then(response => response.json())
    .then(data => {
      var animeGrid = document.querySelector('.anime-grid');
      animeGrid.innerHTML = ''; // Clear existing content
      data.data.slice(0, 20).forEach(anime => {
        var image= anime.images.jpg.image_url;
        var title = anime.title_english || anime.title;
        var score = anime.score;
        var rank = anime.rank;
        var rating = anime.rating;

        var animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = 
          '<img src="'+image+'" alt="'+title+'">' +
          '<div class="anime-title">'+title+'</div>' +
          '<div class="anime-rank">Rank: '+rank+'</div>' +
          '<div class="anime-score">Score: '+score+'</div>' +
          '<div class="anime-rating">Rating: '+rating+'</div>';

        animeItem.addEventListener('click', () => showAnimeDetail(anime));
        animeGrid.appendChild(animeItem);
      });
    });
}

//Function to read/display anime based on searched anime
function buttonClicked() {
  var searchedAnime = document.getElementById('anime_input').value;
  fetch('https://api.jikan.moe/v4/anime?q=' + searchedAnime)
    .then(response => response.json())
    .then(data => {
      var animeGrid = document.querySelector('.anime-grid');
      animeGrid.innerHTML = ''; // Clear existing content
      data.data.forEach(anime => {
        var image = anime.images.jpg.image_url;
        var title = anime.title_english || anime.title;
        var score = anime.score;
        var rank = anime.rank;
        var rating = anime.rating;

        var animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = 
          '<img src="'+image+'" alt="'+title+'">' +
          '<div class="anime-title">'+title+'</div>' +
          '<div class="anime-rank">Rank: '+rank+'</div>' +
          '<div class="anime-score">Score: '+score+'</div>' +
          '<div class="anime-rating">Rating: '+rating+'</div>';

        animeItem.addEventListener('click', function() {
          showAnimeDetail(anime);
        });
        animeGrid.appendChild(animeItem);
      });
    });
}

//Function for search results and go to anime_details.html
function showAnimeDetail(anime) {
  localStorage.setItem('selectedAnime', JSON.stringify(anime));
  window.location.href = 'anime_details.html'; 
}
