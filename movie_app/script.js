document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const movieSearch = document.querySelector(".movie-search");
  const movie_image = `https://image.tmdb.org/t/p/w500/`;
  const api_key = "0ac21eb1fec73d97ce76408208631ddf";
  const api_url = `https://api.themoviedb.org/3/movie/popular?&api_key=${api_key}`;

  // Add event listener to search input field
  movieSearch.addEventListener("keyup",(e)=>{
    let search_api=`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1&api_key=${api_key}`;
    if(e.target.value !=""){
      container.innerHTML="";
         fetchMovies(search_api)
    }
    else{
      fetchMovies(api_url)
    }

  });

  // Function to fetch movies from the API
  async function fetchMovies(api) {
    try {
      let response = await fetch(api);
      response = await response.json();
      let results = response.results;
      showMovies(results);
    } catch (err) {
      console.error(err);
      console.log("Error fetching movies: " + err);
    }
  }

  // Function to display movie results
  function showMovies(results) {
    for (let result of results) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = `
        <div class="movie-img">
          <img src=${movie_image + result.backdrop_path} alt="">
          <div class="movie-details">
            <p>${result.overview}</p>
            <button class="readmore-button"><a href="https://www.themoviedb.org/movie/${result.id}" target="_blank" >Read More</a>
</button
          </div>
        </div>
        <h3>${result.original_title} <span class="rating">${
        result.vote_average
      }</span></h3>
      `;
      container.appendChild(box);
    }
  }

  // Initial call to fetch popular movies
  fetchMovies(api_url);
});
