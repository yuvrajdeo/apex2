// Form Validation JavaScript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        group.querySelector('.error-message').style.display = 'none';
    });

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone.value.trim() && !phoneRegex.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Subject validation
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        showMessageBox('✅ Form submitted successfully! All validation passed.');
        this.reset();
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorMsg = formGroup.querySelector('.error-message');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const formGroup = this.closest('.form-group');
        if (this.value.trim()) {
            formGroup.classList.remove('error');
            formGroup.querySelector('.error-message').style.display = 'none';
        }
    });
});

function showMessageBox(message) {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #28a745;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 1.1rem;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    `;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

// To-Do List JavaScript
function addTodo() {
    const input = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    if (input.value.trim() === '') {
        showMessageBox('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <input type="checkbox" onchange="toggleTodo(this)">
        <span class="todo-text">${input.value.trim()}</span>
        <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
    `;

    todoList.appendChild(li);
    input.value = '';

    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
    }, 10);
}

function toggleTodo(checkbox) {
    const todoItem = checkbox.closest('.todo-item');
    if (checkbox.checked) {
        todoItem.classList.add('completed');
    } else {
        todoItem.classList.remove('completed');
    }
}

function deleteTodo(button) {
    const todoItem = button.closest('.todo-item');
    todoItem.style.transition = 'all 0.3s ease';
    todoItem.style.opacity = '0';
    todoItem.style.transform = 'translateX(20px)';
    setTimeout(() => {
        todoItem.remove();
    }, 300);
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Image Gallery JavaScript
function addImage() {
    const input = document.getElementById('imageUrl');
    const gallery = document.getElementById('imageGallery');

    if (input.value.trim() === '') {
        showMessageBox('Please enter an image URL!');
        return;
    }

    try {
        new URL(input.value);
    } catch {
        showMessageBox('Please enter a valid URL!');
        return;
        }

    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${input.value.trim()}" alt="Gallery Image" onerror="this.src='https://placehold.co/200x150/cccccc/333333?text=Image+Not+Found'">
        <button class="remove-image" onclick="removeImage(this)">×</button>
    `;

    gallery.appendChild(div);
    input.value = '';

    div.style.opacity = '0';
    div.style.transform = 'scale(0.8)';
    setTimeout(() => {
        div.style.transition = 'all 0.3s ease';
        div.style.opacity = '1';
        div.style.transform = 'scale(1)';
    }, 10);
}

function removeImage(button) {
    const galleryItem = button.closest('.gallery-item');
    galleryItem.style.transition = 'all 0.3s ease';
    galleryItem.style.opacity = '0';
    galleryItem.style.transform = 'scale(0.8)';
    setTimeout(() => {
        galleryItem.remove();
    }, 300);
}

document.getElementById('imageUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addImage();
    }
});

// NEW: Weather Widget JavaScript with Enhanced Animations
let weatherData = null;

// Mock weather data for Daltonganj, Jharkhand (since we can't use real API keys in artifacts)
const mockWeatherData = {
    location: "Daltonganj, Jharkhand",
    temperature: 28,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    uvIndex: 6,
    visibility: 10,
    feelsLike: 32
};

function createWeatherParticles() {
    const background = document.getElementById('weatherBackground');
    background.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'weather-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        background.appendChild(particle);
    }
}

function displayWeatherData(data) {
    const content = document.getElementById('weatherContent');
    
    content.innerHTML = `
        <div class="weather-main">
            <div>
                <div class="weather-temp">${data.temperature}°C</div>
                <div style="font-size: 1.1rem; opacity: 0.9;">${data.condition}</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">Feels like ${data.feelsLike}°C</div>
            </div>
            <div class="weather-icon">${data.icon}</div>
        </div>
        <div class="weather-details">
            <div class="weather-detail">
                <div class="weather-detail-label">Humidity</div>
                <div class="weather-detail-value">${data.humidity}%</div>
            </div>
            <div class="weather-detail">
                <div class="weather-detail-label">Wind Speed</div>
                <div class="weather-detail-value">${data.windSpeed} km/h</div>
            </div>
            <div class="weather-detail">
                <div class="weather-detail-label">Pressure</div>
                <div class="weather-detail-value">${data.pressure} mb</div>
            </div>
            <div class="weather-detail">
                <div class="weather-detail-label">UV Index</div>
                <div class="weather-detail-value">${data.uvIndex}</div>
            </div>
            <div class="weather-detail">
                <div class="weather-detail-label">Visibility</div>
                <div class="weather-detail-value">${data.visibility} km</div>
            </div>
        </div>
    `;

    // Animate weather details appearing
    const details = content.querySelectorAll('.weather-detail');
    details.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(20px)';
        setTimeout(() => {
            detail.style.transition = 'all 0.5s ease';
            detail.style.opacity = '1';
            detail.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });

    // Create animated background particles
    createWeatherParticles();
}

function showWeatherError(message) {
    const content = document.getElementById('weatherContent');
    content.innerHTML = `
        <div class="weather-error">
            <h3>⚠️ Weather Service Unavailable</h3>
            <p>${message}</p>
            <button onclick="refreshWeather()" style="margin-top: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

function loadWeatherData() {
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            // Add some randomness to make it feel more realistic
            const temp = mockWeatherData.temperature + Math.floor(Math.random() * 6 - 3);
            const humidity = mockWeatherData.humidity + Math.floor(Math.random() * 20 - 10);
            const windSpeed = mockWeatherData.windSpeed + Math.floor(Math.random() * 8 - 4);
            
            resolve({
                ...mockWeatherData,
                temperature: Math.max(15, Math.min(45, temp)),
                humidity: Math.max(30, Math.min(90, humidity)),
                windSpeed: Math.max(0, windSpeed),
                lastUpdated: new Date().toLocaleTimeString()
            });
        }, 1500);
    });
}

async function refreshWeather() {
    const refreshBtn = document.getElementById('refreshBtn');
    const content = document.getElementById('weatherContent');
    
    // Add spinning animation to refresh button
    refreshBtn.classList.add('spinning');
    
    // Show loading state
    content.innerHTML = `
        <div class="weather-loading">
            <div class="loading-spinner"></div>
            <p>Updating weather data for Daltonganj...</p>
        </div>
    `;

    try {
        const data = await loadWeatherData();
        weatherData = data;
        displayWeatherData(data);
        
        // Show success message
        showMessageBox(`🌤️ Weather updated! Temperature: ${data.temperature}°C`);
    } catch (error) {
        showWeatherError('Unable to fetch current weather data. Please try again later.');
    } finally {
        // Remove spinning animation
        setTimeout(() => {
            refreshBtn.classList.remove('spinning');
        }, 500);
    }
}

// Advanced weather animations
function updateWeatherBackground(condition) {
    const widget = document.getElementById('weatherWidget');
    const backgrounds = {
        'Clear': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'Cloudy': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'Partly Cloudy': 'linear-gradient(135deg, #74b9ff, #0984e3)',
        'Rainy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'Stormy': 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)'
    };
    
    widget.style.background = backgrounds[condition] || backgrounds['Partly Cloudy'];
}

// Auto-refresh weather every 5 minutes
function startWeatherAutoRefresh() {
    setInterval(() => {
        if (document.getElementById('weatherWidget')) {
            refreshWeather();
        }
    }, 300000); // 5 minutes
}

// Initialize weather widget when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial weather load with delay for better UX
    setTimeout(() => {
        refreshWeather();
    }, 1000);
    
    // Start auto-refresh
    startWeatherAutoRefresh();
    
    // Add click animation to weather details
    document.addEventListener('click', function(e) {
        if (e.target.closest('.weather-detail')) {
            const detail = e.target.closest('.weather-detail');
            detail.style.transform = 'scale(0.95)';
            setTimeout(() => {
                detail.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Additional utility functions for enhanced user experience
function getWeatherEmoji(temperature) {
    if (temperature < 0) return '🥶';
    if (temperature < 10) return '❄️';
    if (temperature < 20) return '🌤️';
    if (temperature < 30) return '☀️';
    return '🔥';
}

function getTimeOfDayGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
}

// Easter egg: Konami code for special weather animation
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        triggerSpecialWeatherAnimation();
        konamiCode = [];
    }
});

function triggerSpecialWeatherAnimation() {
    const widget = document.getElementById('weatherWidget');
    widget.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)';
    widget.style.backgroundSize = '400% 400%';
    widget.style.animation = 'rainbow 2s ease infinite';
    
    showMessageBox('🌈 Special weather mode activated! Konami code detected!');
    
    setTimeout(() => {
        widget.style.animation = '';
        refreshWeather();
    }, 5000);
}
