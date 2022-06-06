const genreSection = document.getElementById("moviesCategory");
const moviesSection = document.getElementById("movies");
let allMovies = [];
let allGenre = [];
function fillMovies(){
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=6b5da68eda25b9540dbff8d1f8ff455f')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(element => {
                    if(element.title){    
                        allMovies.push(
                            {
                                id: element.id, 
                                title: element.title, 
                                img: element.poster_path, 
                                genre: element.genre_ids
                            });
                        moviesSection.innerHTML += `<div class="movies__item">
                            <a class="movies__link" href="#" onclick="showMovie(${element.id})">
                                <img src="${element.poster_path}" alt="" class="movies__img"><br>
                                <span class="movies__title">${element.title}</span>
                            </a>
                        </div>`
                    }
                });
            });
}
function fillGenre() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=6b5da68eda25b9540dbff8d1f8ff455f&language=en-US')
    .then(response => response.json())
    .then(data => {
        console.log(data.genres)
        data.genres.forEach(element => {
            allGenre.push({id: element.id, name: element.name})
            genreSection.innerHTML += `<li class="movies-category__item">
                                            <a href="#" onclick="filterByGender(${element.id})">
                                                ${element.name}
                                            </a>
                                        </li>`
        });
    });
}
function showMovies(movies){
    moviesSection.innerHTML = "";
    movies.forEach(element => {
        moviesSection.innerHTML += `<div class="movies__item">
            <a class="movies__link" href="#" onclick="showMovie(${element.id})">
                <img src="${element.img}" alt="" class="movies__img"><br>
                <span class="movies__title">${element.title}</span>
            </a>
        </div>`
    });
}
function search() {
    const keyWords = document.getElementById("searchInput").value;
    const movies = moviesFind = allMovies.filter(
            element => element.title.includes(keyWords)
        )
    showMovies(movies);
}
function showMovie(idMovie) {
    const movie = allMovies.find(element => element.id = idMovie)
    moviesSection.innerHTML = "";
    moviesSection.innerHTML = `<div class="movie">
                                    <img src="${movie.img}" alt="" class="movies__img"><br>
                                    <span class="movies__title">${movie.title}</span>
                            </div>`
}
function filterByGender(idGender) {
    const movies = allMovies.filter(element => element.genre.some((element) => element === idGender));
    console.log(movies)
    showMovies(movies);
}
fillMovies() 
fillGenre()