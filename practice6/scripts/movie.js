const genreSection = document.getElementById("moviesCategory");
let genre = fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=6b5da68eda25b9540dbff8d1f8ff455f&language=en-US')
            .then(response => response.json())
            .then(data => {
                console.log(data.genres)
                data.genres.forEach(element => {
                    genreSection.innerHTML += `<li class="movies-category__item">
                                                    <a href="#" onclick="filterByGender(${element.id})">
                                                        ${element.name}
                                                    </a>
                                                </li>`
                });
            });
const moviesSection = document.getElementById("movies");
let movies = fetch('https://api.themoviedb.org/3/trending/all/day?api_key=6b5da68eda25b9540dbff8d1f8ff455f')
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                data.results.forEach(element => {
                    moviesSection.innerHTML += `<div class="movies__item">
                        <a href="#" onclick="showMovie(${element.id})">
                            <img src="${element.poster_path}" alt="" class="movies__img"><br>
                            <span class="movies__title">${element.title}</span>
                        </a>
                    </div>`
                });
            });
function search() {
    const keyWords = document.getElementById("searchInput").value;
    console.log(keyWords)
    moviesSection.innerHTML = ""
    let searchMovie = fetch(`https://api.themoviedb.org/3/search/company?api_key=6b5da68eda25b9540dbff8d1f8ff455f&query=${keyWords}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                data.results.forEach(element => {
                    moviesSection.innerHTML += `<div class="movies__item">
                        <a href="#" onclick="showMovie(${element.id})">
                            <img src="${element.poster_path}" alt="" class="movies__img"><br>
                            <span class="movies__title">${element.name}</span>
                        </a>
                    </div>`
                });
            });
}
function showMovie(idMovie) {
    let searchMovie = fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=6b5da68eda25b9540dbff8d1f8ff455f&language=en-US`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                moviesSection.innerHTML = `<div class="movie">
                            <img src="${data.backdrop_path}" alt="" class="movies__img"><br>
                            <span class="movies__title">${data.title}</span>
                    </div>`
            });
}
function filterByGender(idMovie) {
    let searchMovie = fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=6b5da68eda25b9540dbff8d1f8ff455f&language=en-US`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                moviesSection.innerHTML = `<div class="movie">
                            <img src="${data.backdrop_path}" alt="" class="movies__img"><br>
                            <span class="movies__title">${data.title}</span>
                    </div>`
            });
}