const genreSection = document.getElementById("moviesCategory");
const titleSection = document.getElementById("title");
const multimediaSection = document.getElementById("movies");
const imgMultimediaURL = "https://image.tmdb.org/t/p/w342";
const imgMultimediaURL_original = "https://image.tmdb.org/t/p/original";
class Multimedia  {
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
    getGenreMovies = async () => {
        const url = `${this.URLbase}/genre/movie/list?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    }
    getGenreSeries = async () => {
        const url = `${this.URLbase}/genre/tv/list?api_key=${this.apiKey}&${this.language}&${this.adult}`;
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
    async getSeriesByGenre(genre){
        const url = `${this.URLbase}/discover/tv?api_key=${this.apiKey}&${this.language}&sort_by=popularity.desc&include_video=false&page=1&with_genres=${genre}&language=en-US&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }
    async getMovieById(idMovie){
        const url = `${this.URLbase}/movie/${idMovie}?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    async getSerieById(idMovie){
        const url = `${this.URLbase}/tv/${idMovie}?api_key=${this.apiKey}&${this.language}&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    searchAllByName = async (keyWords) => {
        const url = `${this.URLbase}/search/multi?api_key=${this.apiKey}&${this.language}&query=${keyWords}&page=1&${this.adult}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.results;
    }
}
setMoviesHTML = (multimedia) => {
    return `<div class="movies__item" onclick="showMovie(${multimedia.id})">
                <div class="movies__poster" href="#">
                    <img src="${imgMultimediaURL}/${multimedia.poster_path}" alt="" class="movies__img">
                        <div class="movies__icon-play"></div>
                </div>
                <p class="movies__title">${multimedia.title||multimedia.name}</p>
            </div>`
}
setSeriesHTML = (multimedia) => {
    return `<div class="movies__item" onclick="showSerie(${multimedia.id})">
                <div class="movies__poster" href="#">
                    <img src="${imgMultimediaURL}/${multimedia.poster_path}" alt="" class="movies__img">
                        <div class="movies__icon-play"></div>
                </div>
                <p class="movies__title">${multimedia.title||multimedia.name}</p>
            </div>`
}
setGenreMoviesHTML = (genre) => {
    return `<li class="movies-category__item" onclick="filterMoviesByGender(${genre.id}, '${genre.name}')">
                <span class="movies-movies__icon">
                    <div class="movies-category__icon"></div>
                </span> ${genre.name}
            </li>`
}
setGenreSeriesHTML = (genre) => {
    return `<li class="movies-category__item" onclick="filterSeriesByGender(${genre.id}, '${genre.name}')">
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
                        <img src="${imgMultimediaURL}/${movie.poster_path}" alt="" class="movie__img"><br>
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
setSerieHTML = (serie) => {
    return `<table class="movie__item">
                <tr>
                    <td class="movie__poster" rowspan="2">
                        <img src="${imgMultimediaURL}/${serie.poster_path||""}" alt="" class="movie__img"><br>
                    </td>
                    <td class="movie__data">
                        <h1 class="movie__title">${serie.name||""}</h1>
                        <p class="movie__tagline">${serie.tagline||""}</p>
                        <p class="movie__dataText">First air date: ${serie.first_air_date||""}</p>
                        <p class="movie__dataText">Last episode to air: ${serie.last_episode_to_air||""}</p>
                        <p class="movie__dataText">Type: ${serie.type||""}</p>
                        <p class="movie__dataText">Status: ${serie.status||""}</p>
                        <p class="movie__dataText">Number of episodes: ${serie.number_of_episodes||""}</p>
                        <p class="movie__dataText">Number of seasons: ${serie.number_of_seasons||""}</p>
                        <p class="movie__rating">Rating: ${serie.vote_average||""}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" class="movie__buttom" onclick="search()" value="Watch now">
                    </td>
                </tr>
                <tr>
                    <td class="movie__sumary" colspan="2">
                        <p class="movies__sumary-content">${serie.overview}</p>
                    </td>
                </tr>
            </table>`
}
const multimedia = new Multimedia ();
function getTypeMultimedia(key){
    const MultimediaType = new Map([
        ["movie", false],
        ["serie", false]
    ])
    key.forEach(element => MultimediaType.set(element, true));
    return MultimediaType;
}
function changeToGeneral(){
    multimediaSection.innerHTML = null;
    if ( !multimediaSection.classList.contains("movies") ){
        multimediaSection.style.backgroundImage = null;
        multimediaSection.classList.toggle("movie");
        multimediaSection.classList.toggle("movies");
    }
    titleSection.innerHTML = null;
}
async function fillMultimediaHTML(multimediaData, title, type){
    changeToGeneral();
    titleSection.innerHTML = setGenreTitleHTML(title);
    multimediaData.forEach(element => {
        if(type.get("movie") && element.title) 
            multimediaSection.innerHTML += setMoviesHTML(element);
        if(type.get("serie") && element.name)
            multimediaSection.innerHTML += setSeriesHTML(element)
    });
}
async function fillGenreHTML(genreData, type) {
    genreSection.innerHTML = null;
    if(genreData)
        genreData.forEach(element => {
            if(type.get("movie"))
                genreSection.innerHTML += setGenreMoviesHTML(element)
            if(type.get("serie"))
                genreSection.innerHTML += setGenreSeriesHTML(element)
        });
}
async function searchAll() {
    const keyWords = document.getElementById("searchInput").value;
    const moviesData = await multimedia.searchAllByName(keyWords).then(response => response);
    const title = "Search Results"
    const type = getTypeMultimedia(["movie", "serie"]);
    fillMultimediaHTML(moviesData, title, type);
    fillGenreHTML([]);
}
async function filterMoviesByGender(idGender, nameGenre) {
    const moviesData = await multimedia.getMoviesByGenre(idGender).then(response => response);
    const title = `Movies Genre: ${nameGenre}`;
    const type = getTypeMultimedia(["movie"]);
    fillMultimediaHTML(moviesData, title, type);
}
async function filterSeriesByGender(idGender, nameGenre) {
    const seriesData = await multimedia.getSeriesByGenre(idGender).then(response => response);
    const title = `Series Genre: ${nameGenre}`;
    const type = getTypeMultimedia(["serie"]);
    fillMultimediaHTML(seriesData, title, type);
}
function changeToSigle(){
    multimediaSection.innerHTML = null;
    if ( !multimediaSection.classList.contains("movie") ){
        multimediaSection.classList.remove("movies");
        multimediaSection.classList.add("movie");
    }
    titleSection.innerHTML = null;
}
async function showMovie(idMovie) {
    changeToSigle();
    const movieData = await multimedia.getMovieById(idMovie).then(response => response);
    if(movieData){
        multimediaSection.style.backgroundImage=`url(${imgMultimediaURL_original}/${movieData.backdrop_path})`;
        multimediaSection.innerHTML = setMovieHTML(movieData);
        const type = getTypeMultimedia(["movie"]);
        const genreData = await multimedia.getGenreMovies().then(response => response);
        fillGenreHTML(genreData, type)
    }
}
async function showSerie(idSerie) {
    changeToSigle();
    const serieData = await multimedia.getSerieById(idSerie).then(response => response);
    if(serieData){
        multimediaSection.style.backgroundImage=`url(${imgMultimediaURL_original}/${serieData.backdrop_path})`;
        console.log(serieData)
        multimediaSection.innerHTML = setSerieHTML(serieData);
        const type = getTypeMultimedia(["serie"]);
        const genreData = await multimedia.getGenreSeries().then(response => response);
        fillGenreHTML(genreData, type)
    }
}
async function mainTVSeries(){
    const moviesData = await multimedia.getTrendingMovies().then(response => response);
    const genreData = await multimedia.getGenreSeries().then(response => response);
    const title = "Trending Series";
    const type = getTypeMultimedia(["serie"]);
    fillMultimediaHTML(moviesData, title, type);
    fillGenreHTML(genreData, type)

}
async function main() {
    const genreData = await multimedia.getGenreMovies().then(response => response);
    const moviesData = await multimedia.getTrendingMovies().then(response => response);
    const title = "Trending Movies";
    type = getTypeMultimedia(["movie"]);
    fillMultimediaHTML(moviesData, title, type);
    fillGenreHTML(genreData, type)
}

main();

//const movie = allMovies.find(element => element.id == idMovie)
//const movies = allMovies.filter(element => element.genre.some((element) => element === idGender));
/*const movies = moviesFind = allMovies.filter(element => (element.title).toLowerCase().includes(keyWords.toLowerCase()))*/
    