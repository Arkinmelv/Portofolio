//ASYIN WAIT

const buttonSearch = document.querySelector(".button-search");
buttonSearch.addEventListener('click', async function(){
    const inputSearch = document.querySelector(".movie-search");
    const movies = await getMovie(inputSearch.value);
    updateUI(movies)
})

function getMovie(input){
    return fetch('http://www.omdbapi.com/?apikey=2c9c53da&s=' + input)
    .then(response => response.json())
    .then(response => response.Search)
}
console.log(getMovie())

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showCard(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

document.addEventListener('click', async function (e) {
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetails(imdbid);
        updateUIDetail(movieDetail);
    }
})

function getMovieDetails(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=2c9c53da&i=' + imdbid)
    .then(response => response.json())
    .then(m => m);
}

function updateUIDetail(m){
    const newMovie = showDetailsMovie(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = newMovie;
}



function showCard(m){
    return `<div class="col-md-3 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title mb-3">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 mt-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button mt-2" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${m.imdbID}">Go Detail</a>
                    </div>
                    </div>
            </div>`
}

function showDetailsMovie(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Direktor : </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Aktors : </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                            <li class="list-group-item"><strong>Genre : </strong> <br> ${m.Genre}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}