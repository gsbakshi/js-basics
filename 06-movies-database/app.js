const addModal = document.getElementById('add-modal');
const toggleMovieModalButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const deleteMovieModal = document.getElementById('delete-modal');

const cancelAddMovieButton = addModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const inputs = addModal.querySelectorAll('input');

const entriesSection = document.getElementById('entry-text');

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entriesSection.style.display = 'block';
    } else {
        entriesSection.style.display = 'none';
    }
};

const closeDeleteMovieModal = () =>
    deleteMovieModal.classList.remove('visible');

const showDeleteMovieModal = () => {
    deleteMovieModal.classList.add('visible');
    backdropToggleHandler();
};

const cancelMovieDeletionHandler = () => {
    closeDeleteMovieModal();
    backdropToggleHandler();
};

const confirmMovieDeletionHandler = (movieId) => {
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    // listRoot.children[movieIndex].remove();
    listRoot.removeChild(listRoot.children[movieIndex]);
    closeDeleteMovieModal();
    backdropToggleHandler();
    updateUI();
};

const deleteMovieModalHandler = (movieId) => {
    showDeleteMovieModal();

    const cancelDeleteButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeleteButton = cancelDeleteButton.nextElementSibling;

    confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
    confirmDeleteButton = cancelDeleteButton.nextElementSibling;

    cancelDeleteButton.removeEventListener('click', cancelMovieDeletionHandler);

    cancelDeleteButton.addEventListener('click', cancelMovieDeletionHandler);
    confirmDeleteButton.addEventListener(
        'click',
        confirmMovieDeletionHandler.bind(null, movieId)
    );
};

const renderMovieCard = ({ id, title, imageUrl, rating }) => {
    const newMovie = document.createElement('li');
    newMovie.className = 'movie-element';
    newMovie.innerHTML = `
        <div class='movie-element__image'>
            <img src='${imageUrl}' alt='${title}'>
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating} / 5 stars</p>
        </div>
    `;
    newMovie.addEventListener('click', deleteMovieModalHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovie);
};

const closeMovieModal = () => addModal.classList.remove('visible');

const showMovieModal = () => {
    addModal.classList.add('visible');
    clearMovieInputs();
    backdropToggleHandler();
};

const backdropToggleHandler = () => backdrop.classList.toggle('visible');

const clearMovieInputs = () => {
    for (const input of inputs) {
        input.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    backdropToggleHandler();
};

const confirmAddMovieHandler = () => {
    const titleValue = inputs[0].value.trim();
    const imageUrlValue = inputs[1].value.trim();
    const ratingValue = inputs[2].value.trim();

    if (
        titleValue === '' ||
        imageUrlValue === '' ||
        ratingValue === '' ||
        isNaN(ratingValue) ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid inputs (rating between 1 and 5)');
        return;
    }

    const newMovie = {
        id: Date.now().toString(),
        title: titleValue,
        imageUrl: imageUrlValue,
        rating: ratingValue,
    };

    movies.push(newMovie);

    closeMovieModal();
    backdropToggleHandler();
    renderMovieCard(newMovie);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    closeDeleteMovieModal();
    backdropToggleHandler();
};

toggleMovieModalButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);
addModal.addEventListener(
    'keydown',
    (event) => event.key === 'Enter' && confirmAddMovieHandler()
);
