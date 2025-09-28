console.log('Happy developing ✨')
const moviesData = [
    {
        "title": "The Shawshank Redemption",
        "director": "Frank Darabont",
        "genre": "Drama",
        "year": 1994
    },
    {
        "title": "The Godfather",
        "director": "Francis Ford Coppola",
        "genre": "Crime",
        "year": 1972
    },
    {
        "title": "The Dark Knight",
        "director": "Christopher Nolan",
        "genre": "Action",
        "year": 2008
    },
    {
        "title": "Pulp Fiction",
        "director": "Quentin Tarantino",
        "genre": "Crime",
        "year": 1994
    },
    {
        "title": "Schindler's List",
        "director": "Steven Spielberg",
        "genre": "Drama",
        "year": 1993
    },
    {
        "title": "Inception",
        "director": "Christopher Nolan",
        "genre": "Sci-Fi",
        "year": 2010
    }
];

let movies = [...moviesData];
let allGenres = new Set();

const moviesGrid = document.getElementById('movies-grid');
const addBtn = document.getElementById('add-btn');
const formOverlay = document.getElementById('add-form');
const cancelBtn = document.getElementById('cancel-btn');
const genreFilter = document.getElementById('genre-filter');
const form = document.querySelector('.form');

function extractGenres() {
    allGenres.clear();
    movies.forEach(movie => allGenres.add(movie.genre));
    updateGenreFilter();
}

function updateGenreFilter() {
    const currentValue = genreFilter.value;
    genreFilter.innerHTML = '<option value="">All Genres 🎭</option>';

    Array.from(allGenres).sort().forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = `${genre} 🎬`;
        genreFilter.appendChild(option);
    });

    genreFilter.value = currentValue;
}

function displayMovies(moviesToShow = movies) {
    moviesGrid.innerHTML = '';

    moviesToShow.forEach((movie, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.style.animationDelay = `${index * 0.1}s`;

        movieCard.innerHTML = `
            <h3 class="movie-title">🎬 ${movie.title}</h3>
            <div class="movie-info"><strong>🎭 Director:</strong> ${movie.director}</div>
            <div class="movie-info"><strong>📅 Year:</strong> ${movie.year}</div>
            <span class="movie-genre">${movie.genre}</span>
        `;

        moviesGrid.appendChild(movieCard);
    });

    addSparkleEffect();
}

function filterMovies() {
    const selectedGenre = genreFilter.value;
    if (selectedGenre === '') {
        displayMovies(movies);
    } else {
        const filtered = movies.filter(movie => movie.genre === selectedGenre);
        displayMovies(filtered);
    }
}

function addMovie(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const genre = document.getElementById('genre').value;
    const year = parseInt(document.getElementById('year').value);

    if (!title || !director || !genre || !year) {
        alert('🐱 Meow! Please fill all fields!');
        return;
    }

    const newMovie = { title, director, genre, year };
    movies.push(newMovie);

    extractGenres();
    filterMovies();
    closeForm();
    form.reset();

    showSuccessMessage();
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.innerHTML = '🎉 Movie added successfully! 🐱✨';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #32cd32, #228b22);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1001;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

function openForm() {
    formOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeForm() {
    formOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addSparkleEffect() {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createSparkles(card);
        });
    });
}

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            pointer-events: none;
            font-size: 1.2rem;
            animation: sparkle 1s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

        element.style.position = 'relative';
        element.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}

addBtn.addEventListener('click', openForm);
cancelBtn.addEventListener('click', closeForm);

formOverlay.addEventListener('click', (e) => {
    if (e.target === formOverlay) closeForm();
});

form.addEventListener('submit', addMovie);
genreFilter.addEventListener('change', filterMovies);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeForm();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes sparkle {
        0% { transform: translateY(0) scale(0); opacity: 1; }
        50% { transform: translateY(-20px) scale(1); opacity: 1; }
        100% { transform: translateY(-40px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

extractGenres();
displayMovies();