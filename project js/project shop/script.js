const cards = [
    {
        id: 1,
        title: 'אוזניות',
        price: 99.90,
        description: 'אוזניות מהטובות ביותר שים אותם פעם אחת ולא תרצה לעזוב אותם לעולם',
        image: '../../img/headset projekt shop.png',
    },
    {
        id: 2,
        title: 'מחשב נייד',
        price: 1499.90,
        description: 'מחשב מהטובים ביותר תיהיה איתו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/laptop projekt shop.jpg',
    },
    {
        id: 3,
        title: 'samsung s21 טלפון',
        price: 4700,
        description: 'טלפון מהטובים ביותר תקנה אותו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/fuon projekt shop.jpeg',
    },
    {
        id: 4,
        title: 'מצלמה',
        price: 570,
        description: 'מצלמה מהטובות ביותר תשתמש איתה פעם אחת ולא תרצה לעזוב אותה לעולם',
        image: '../../img/camera project shop.jpg',
    },
    {
        id: 5,
        title: 'מקרן',
        price: 240,
        description: 'מקרן מהטובים ביותר תשתמש איתו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/projector projekt shop.jpg',
    },
    {
        id: 6,
        title: 'טאבלט',
        price: 2800,
        description: 'טאבלט מהטובים ביותר תקנה אותו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/tablet projekt shop.jpg',
    },
    {
        id: 7,
        title: 'שעון חכם',
        price: 350,
        description: 'שעון מהחכמים בעולם תשתמש איתו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/clock projekt shop.jpg',
    },
    {
        id: 8,
        title: 'מחשב נייח',
        price: 3500,
        description: 'מחשב מהטובים ביותר תיהיה איתו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/Desktop projekt shop.jpeg',
    },
    {
        id: 9,
        title: 'טלוויזיה',
        price: 8000,
        description: 'טלוויזיה מהטובים ביותר תיהיה איתו פעם אחת ולא תרצה לעזוב אותו לעולם',
        image: '../../img/TV projekt shop.jpg',
    },
];

// Initialize cart and favorites
let cartItems = [];
let favoriteItems = localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems')) : [];

// Get the cards container
const cardsContainer = document.getElementById('cards');

// Search functionality
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    searchProducts(searchTerm);
});

function searchProducts(searchTerm) {
    if (!searchTerm) {
        displayProducts();
        return;
    }

    const filteredCards = cards.filter(card => {
        return (
            card.title.toLowerCase().includes(searchTerm) ||
            card.description.toLowerCase().includes(searchTerm) ||
            card.price.toString().includes(searchTerm)
        );
    });

    displayFilteredProducts(filteredCards);
}

function displayFilteredProducts(filteredCards) {
    cardsContainer.innerHTML = '';
    if (filteredCards.length === 0) {
        cardsContainer.innerHTML = `
            <div class="w-100 text-center mt-4">
                <h3>לא נמצאו מוצרים התואמים לחיפוש שלך</h3>
            </div>
        `;
        return;
    }

    filteredCards.forEach(card => {
        const isFavorite = favoriteItems.some(item => item.id === card.id);
        cardsContainer.innerHTML += createCardHTML(card, isFavorite);
    });
}

// Product display function
function displayProducts() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }

    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const isFavorite = favoriteItems.some(item => item.id === card.id);
        cardsContainer.innerHTML += createCardHTML(card, isFavorite);
    });
}

// Favorites display function
function displayFavorites() {
    document.getElementById('search-input').value = '';
    cardsContainer.innerHTML = '';

    if (favoriteItems.length === 0) {
        cardsContainer.innerHTML = `
            <div class="container favorites-view">
                <h2>המוצרים המועדפים שלך</h2>
                <button onclick="displayProducts()" class="btn btn-primary mb-4">חזרה לחנות</button>
                <div class="w-100 text-center mt-4">
                    <h3>אין מוצרים מועדפים עדיין</h3>
                </div>
            </div>
        `;
        return;
    }

    cardsContainer.innerHTML = `
        <div class="container favorites-view">
            <h2>המוצרים המועדפים שלך</h2>
            <button onclick="displayProducts()" class="btn btn-primary mb-4">חזרה לחנות</button>
            <div class="row justify-content-center">
                ${favoriteItems.map(item => createCardHTML(item, true)).join('')}
            </div>
        </div>
    `;
}

// Cart display function
function displayCart() {
    document.getElementById('search-input').value = '';
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    cardsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cardsContainer.innerHTML = `
            <div class="container">
                <h2>העגלה שלך</h2>
                <button onclick="displayProducts()" class="btn btn-primary mb-4">חזרה לחנות</button>
                <div class="w-100 text-center mt-4">
                    <h3>העגלה שלך ריקה</h3>
                </div>
            </div>
        `;
        return;
    }

    cardsContainer.innerHTML = `
        <div class="container">
            <h2>העגלה שלך</h2>
            <h3>סה"כ לתשלום: $${totalPrice.toFixed(2)}</h3>
            <button onclick="displayProducts()" class="btn btn-primary mb-4">חזרה לחנות</button>
            <button onclick="clearCart()" class="btn btn-danger mb-4 mr-2">רוקן עגלה</button>
            <div class="row justify-content-center">
                ${cartItems.map((item, index) => createCartItemHTML(item, index)).join('')}
            </div>
        </div>
    `;
}

// Helper function to create card HTML
function createCardHTML(card, isFavorite) {
    return `
        <div class="card p-3 m-3 d-flex flex-column flex-wrap: wrap align-items-center">
            <div class="d-flex justify-content-end w-100">
                <button onclick="toggleFavorite(${card.id})" class="btn favorite-btn ${isFavorite ? 'active' : ''}">
                    ❤️
                </button>
            </div>
            <img src="${card.image}" class="card-img-top w-100" alt="${card.title}">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
                <p class="card-text" id="price">${card.price} $</p>
                <button onclick="addToCart(${card.id})" class="btn btn-primary shadow-md w-100 mt-auto">הוסף לסל</button>
            </div>
        </div>
    `;
}

// Helper function to create cart item HTML
function createCartItemHTML(item, index) {
    return `
        <div class="card p-3 m-3 d-flex flex-column flex-wrap: wrap align-items-center">
            <img src="${item.image}" class="card-img-top w-100" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text" id="price">${item.price} $</p>
                <button onclick="removeFromCart(${index})" class="btn btn-danger shadow-md w-100 mt-auto">הסר מהעגלה</button>
            </div>
        </div>
    `;
}

// Cart functions
function addToCart(productId) {
    const product = cards.find(card => card.id === productId);
    if (product) {
        cartItems.push(product);

        const popup = document.getElementById('successPopup');
        popup.innerHTML = `
            <div class="d-flex align-items-center justify-content-center flex-column">
                <h2>${product.title} נוסף לעגלה!</h2>
                <p>${product.price} $</p>
            </div>
        `;
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000);
    }
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    displayCart();
}

function clearCart() {
    cartItems = [];
    displayCart();
}

// Favorite functions
function toggleFavorite(productId) {
    const product = cards.find(card => card.id === productId);
    const existingIndex = favoriteItems.findIndex(item => item.id === productId);

    if (existingIndex !== -1) {
        favoriteItems.splice(existingIndex, 1);
    } else {
        favoriteItems.push(product);
    }

    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));

    if (document.querySelector('.favorites-view')) {
        displayFavorites();
    } else {
        displayProducts();
    }
}

// Event Listeners
document.getElementById('inputLike').addEventListener('click', displayFavorites);
document.getElementById('showAll').addEventListener('click', displayCart);

// Initial display
displayProducts();