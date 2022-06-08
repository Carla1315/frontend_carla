const genreSection = document.getElementById("moviesCategory");
const titleSection = document.getElementById("title");
const moviesSection = document.getElementById("movies");
const imgMovieURL = "https://image.tmdb.org/t/p/w342";
const imgMovieURL_original = "https://image.tmdb.org/t/p/original";
class Movies {
    apiKey = "6b5da68eda25b9540dbff8d1f8ff455f";
    URLbase = "https://api.themoviedb.org/3";
    language = "language=en-US";
    adult = "adult=false"
    constructor () {}
    getTrendingMovies = async  () => {
        const url = `${this.URLbase}/trending/all/day?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }
    getGenre = async () => {
        const url = `${this.URLbase}/genre/movie/list?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    }
    async getMoviesByGenre(genre){
        const url = `${this.URLbase}/discover/movie?api_key=${this.apiKey}&${this.language}&sort_by=popularity.desc&include_video=false&page=1&with_genres=${genre}&language=en-US&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }
    async getMovieById(idMovie){
        const url = `${this.URLbase}/movie/${idMovie}?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
    searchMovieByName = async (keyWords) => {
        const url = `${this.URLbase}/search/movie?api_key=${this.apiKey}&${this.language}&query=${keyWords}&page=1&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }
}
setMoviesHTML = (movies) => {
    return `<div class="movies__item" onclick="showMovie(${movies.id})">
                <div class="movies__poster" href="#">
                    <img src="${imgMovieURL}/${movies.poster_path}" alt="" class="movies__img">
                        <div class="movies__icon-play"></div>
                </div>
                <p class="movies__title">${movies.title}</p>
            </div>`
}
setGenreHTML = (genre) => {
    return `<li class="movies-category__item" onclick="filterByGender(${genre.id}, '${genre.name}')">
                <span class="movies-movies__icon">
                    <div class="movies-category__icon"></div>
                </span> ${genre.name}
            </li>`
}
setGenreTitleHTML = (title) => {
    return `<h2>${title}</h2>`
}
setMovieHTML = (movie) => {
    const genres = [];
    movie.genres.forEach(element => genres.push(element.name));
    return `<table class="movie__item">
                <tr>
                    <td class="movie__poster" rowspan="2">
                        <img src="${imgMovieURL}/${movie.poster_path}" alt="" class="movie__img"><br>
                    </td>
                    <td class="movie__data">
                        <h1 class="movie__title">${movie.title}</h1>
                        <p class="movie__tagline">${movie.tagline}</p>
                        <p class="movie__genres">
                            Genres: ${genres.join(", ")}
                        </p>
                        <p class="movie__rating">Rating: ${movie.vote_average}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" class="movie__buttom" onclick="search()" value="Watch now">
                    </td>
                </tr>
                <tr>
                    <td class="movie__sumary" colspan="2">
                        <p class="movies__sumary-content">${movie.overview}</p>
                    </td>
                </tr>
            </table>`
}
const movies = new Movies();
async function fillMoviesHTML(moviesData, title){
    titleSection.innerHTML = setGenreTitleHTML(title);
    moviesSection.innerHTML = "";
    if ( !moviesSection.classList.contains("movies") ){
        moviesSection.classList.add("movies");
        moviesSection.classList.remove("movie");
        moviesSection.style.backgroundImage = "";
    }
    moviesData.forEach(element => {
        if(element.title){ 
            moviesSection.innerHTML += setMoviesHTML(element);
        }
    });
}
async function fillGenreHTML() {
    const genreData = await movies.getGenre().then(response => response);
    genreData.forEach(element => {
        genreSection.innerHTML += setGenreHTML(element)
    });
}
async function search() {
    const keyWords = document.getElementById("searchInput").value;
    const moviesData = await movies.searchMovieByName(keyWords).then(response => response);
    const title = "Search Results"
    fillMoviesHTML(moviesData, title);
}
async function filterByGender(idGender, nameGender) {
    const moviesData = await movies.getMoviesByGenre(idGender).then(response => response);
    const title = `Gender: ${nameGender}`;
    fillMoviesHTML(moviesData, title);
}
async function showMovie(idMovie) {
    moviesSection.innerHTML = "";
    if ( !moviesSection.classList.contains("movie") ){
        moviesSection.classList.add("movie");
        moviesSection.classList.remove("movies");
    }
    titleSection.innerHTML = "";
    const movieData = await movies.getMovieById(idMovie).then(response => response);
    moviesSection.style.backgroundImage=`url(${imgMovieURL_original}/${movieData.backdrop_path})`;
    moviesSection.innerHTML = setMovieHTML(movieData);
}
async function main() {
    const moviesData = await movies.getTrendingMovies().then(response => response);
    const title = "Trending Movies";
    fillMoviesHTML(moviesData, title);
    fillGenreHTML()
}
main();

//const movie = allMovies.find(element => element.id == idMovie)
//const movies = allMovies.filter(element => element.genre.some((element) => element === idGender));
/*const movies = moviesFind = allMovies.filter(element => (element.title).toLowerCase().includes(keyWords.toLowerCase()))*/
    