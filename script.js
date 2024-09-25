const apiKey = 'YOUR_API_KEY';
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherInfo = document.querySelector('.weather-info');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    }
});

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.classList.add('visible');
}

// Optional: Fetch weather data based on user's current location
function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Uncomment this line to automatically fetch weather data on page load based on user's location
// fetchWeatherByLocation();
