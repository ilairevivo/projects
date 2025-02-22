document.addEventListener('DOMContentLoaded', () => {
    
    let allCountries = [];
    let filteredCountries = [];

    // אלמנטים בדף
    const searchInput = document.getElementById('searchInput');
    const countriesContainer = document.getElementById('countriesContainer');

    // פונקציה לקבלת מידע על המדינות מה-API
    async function fetchCountries() {
        try {
            // הצגת מצב טעינה
            countriesContainer.innerHTML = '<div class="loading">טוען מדינות...</div>';

            const response = await fetch('https://restcountries.com/v3.1/all');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // עיבוד הנתונים עם בדיקות תקינות
            allCountries = data
                .filter(country =>
                    country.name?.common &&
                    country.flags?.svg &&
                    country.timezones?.length > 0
                )
                .map(country => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                    region: country.region || 'לא ידוע',
                    subregion: country.subregion || country.region || 'לא ידוע',
                    timezone: country.timezones[0].replace('UTC', '').replace('/', '_')
                }));

            filteredCountries = [...allCountries];

            if (allCountries.length === 0) {
                throw new Error('לא נמצאו מדינות בתגובת ה-API');
            }

            renderCountries();
        } catch (error) {
            console.error('שגיאה בטעינת המדינות:', error);
            countriesContainer.innerHTML = `
                <div class="error">
                    <p>שגיאה בטעינת המדינות. אנא נסה לרענן את העמוד.</p>
                    <p>פירוט השגיאה: ${error.message}</p>
                </div>`;
        }
    }

   
    function createCountryCard(country) {
        const card = document.createElement('div');
        card.className = 'country-card';

        const timeId = `time-${country.name.replace(/[^a-zA-Z0-9]/g, '-')}`;

        card.innerHTML = `
            <img class="card-image" src="${country.flag}" alt="${country.name} flag" 
                 onerror="this.src='placeholder.png'; this.onerror=null;">
            <div class="card-content">
                <h2 class="card-title">${country.name}</h2>
                <div class="card-time" id="${timeId}">מעדכן זמן...</div>
                <p class="card-location">
                    ${country.name} נמצאת ב${country.subregion}
                </p>
            </div>
        `;

        return { card, timeId };
    }

    // פונקציה לעדכון הזמן בכרטיס
    function updateTime(country, timeElement) {
        function getLocalTime() {
            try {
                const date = new Date();
                let timeString = date.toLocaleTimeString('he-IL', {
                    timeZone: country.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                return timeString;
            } catch (error) {
                console.error(`שגיאה בעדכון זמן עבור ${country.name}:`, error);
                return "שגיאה בהצגת הזמן";
            }
        }

        timeElement.textContent = getLocalTime();

        return setInterval(() => {
            timeElement.textContent = getLocalTime();
        }, 1000);
    }

    // פונקציה להצגת כל הכרטיסים
    function renderCountries() {
        countriesContainer.innerHTML = '';

        if (filteredCountries.length === 0) {
            countriesContainer.innerHTML = '<div class="no-results">לא נמצאו מדינות</div>';
            return;
        }

        const intervals = [];

        filteredCountries.forEach(country => {
            const { card, timeId } = createCountryCard(country);
            countriesContainer.appendChild(card);

            const timeElement = document.getElementById(timeId);
            if (timeElement) {
                const interval = updateTime(country, timeElement);
                intervals.push(interval);
            }
        });

        window.addEventListener('beforeunload', () => {
            intervals.forEach(interval => clearInterval(interval));
        });
    }

    function handleSearch(searchTerm) {
        filteredCountries = allCountries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderCountries();
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function initApp() {
        const debouncedSearch = debounce(handleSearch, 300);
        searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));

        fetchCountries();
    }

    initApp();
});