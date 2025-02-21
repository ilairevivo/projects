import { countries, reset, search } from "./countriesService.js";
const cardsContainer = document.getElementById('cards');

// הוספת סטיילים לאנימציות
const style = document.createElement('style');
style.textContent = `
    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .card.show {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-out {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .container-fade {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .container-fade.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// פונקציה להוספת אנימציית כניסה לכרטיסים
const animateCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, index * 100);
    });
};

document.getElementById('search-input').addEventListener('input', (event) => {
    console.log(event.target.value);
    reset();
    cardsContainer.innerHTML = '';

    if (!event.target.value || event.target.value === '') {
        createCards();
        setTimeout(animateCards, 50);
    } else {
        search(event.target.value);
        createCards();
        setTimeout(animateCards, 50);
    }
});

// פונקציה להצגת כל המדינות עם אנימציה
const showAllCountries = () => {
    // אנימציית יציאה
    cardsContainer.classList.add('container-fade');

    setTimeout(() => {
        cardsContainer.innerHTML = '';
        createCards();

        // אנימציית כניסה
        cardsContainer.classList.add('show');
        animateCards();

        setTimeout(() => {
            cardsContainer.classList.remove('container-fade', 'show');
        }, 300);
    }, 300);
};

// פונקציה להצגת מדינות מועדפות עם אנימציה
const showFavoriteCountries = () => {
    // אנימציית יציאה
    cardsContainer.classList.add('container-fade');

    setTimeout(() => {
        cardsContainer.innerHTML = '';
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        const favoriteCountries = countries.filter(country => favorites[country.name.common]);
        favoriteCountries.forEach(country => generateCard(country));

        // אנימציית כניסה
        cardsContainer.classList.add('show');
        animateCards();

        setTimeout(() => {
            cardsContainer.classList.remove('container-fade', 'show');
        }, 300);
    }, 300);
};

document.getElementById('inputLike').addEventListener('click', showFavoriteCountries);
document.getElementById('showAll').addEventListener('click', showAllCountries);

const generateCard = (country) => {
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3";

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    let heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart text-dark";

    const toggleFavorite = (countryName, heartIcon) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');

        if (heartIcon.classList.contains('text-dark')) {
            favorites[countryName] = true;
            heartIcon.classList.remove('text-dark');
            heartIcon.classList.add('text-danger');
        } else {
            delete favorites[countryName];
            heartIcon.classList.remove('text-danger');
            heartIcon.classList.add('text-dark');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    heartIcon.addEventListener('click', () => {
        toggleFavorite(country.name.common, heartIcon);
    });

    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    if (favorites[country.name.common]) {
        heartIcon.classList.remove('text-dark');
        heartIcon.classList.add('text-danger');
    }

    cardFooter.appendChild(heartIcon);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardsContainer.appendChild(card);
}

const createCards = () => {
    for (const country of countries) {
        generateCard(country);
    }
}

// טעינה מיידית של המדינות
createCards();
setTimeout(animateCards, 50);

export { createCards };