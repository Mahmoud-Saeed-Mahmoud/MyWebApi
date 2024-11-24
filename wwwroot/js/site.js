document.addEventListener('DOMContentLoaded', function() {
    loadWeatherData();
    
    document.getElementById('refreshBtn').addEventListener('click', loadWeatherData);
});

function loadWeatherData() {
    fetch('http://localhost:5181/weatherforecast')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('forecastContainer');
            container.innerHTML = '';
            
            data.forEach(forecast => {
                const card = createWeatherCard(forecast);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to load weather data. Please try again.');
        });
}

function createWeatherCard(forecast) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-3';
    
    const date = new Date(forecast.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    const weatherIcon = getWeatherIcon(forecast.summary);
    
    col.innerHTML = `
        <div class="card weather-card h-100">
            <div class="card-body text-center">
                <div class="weather-icon">${weatherIcon}</div>
                <h5 class="date">${date}</h5>
                <div class="temperature">
                    ${forecast.temperatureC}°C / ${forecast.temperatureF}°F
                </div>
                <p class="summary mt-2 mb-0">${forecast.summary}</p>
            </div>
        </div>
    `;
    
    return col;
}

function getWeatherIcon(summary) {
    const iconMap = {
        'Freezing': '❄️',
        'Bracing': '🌤️',
        'Chilly': '☁️',
        'Cool': '🌥️',
        'Mild': '⛅',
        'Warm': '☀️',
        'Balmy': '🌞',
        'Hot': '🔥',
        'Sweltering': '🌡️',
        'Scorching': '🥵'
    };
    
    return iconMap[summary] || '🔆';
}
