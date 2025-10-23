// Dados simulados (Mock Data) para testar a interface sem a API
const MOCK_DATA = {
    // Simulação para a cidade inicial (Aracaju)
    'aracaju': {
        name: 'Aracaju',
        temp: 26.97,
        humidity: 65,
        description: 'Nublado',
        iconCode: '04d' // Ícone de nuvens dispersas
    },
    // Simulação para outra cidade
    'salvador': {
        name: 'Salvador',
        temp: 28.50,
        humidity: 80,
        description: 'Chuva leve',
        iconCode: '10d' // Ícone de chuva
    },
    // Simulação para outra cidade
    'saopaulo': {
        name: 'São Paulo',
        temp: 18.23,
        humidity: 75,
        description: 'Céu limpo',
        iconCode: '01d' // Ícone de sol
    }
};

// 1. Seleção de Elementos DOM
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

const cityNameDisplay = document.getElementById('city-name-display');
const temperatureDisplay = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const descriptionDisplay = document.getElementById('description');
const humidityDisplay = document.getElementById('humidity');
const errorDisplay = document.getElementById('error-message');

// 2. Função para buscar o clima (SIMULADA)
function getWeatherDataSimulated(city) {
    if (!city) {
        displayError('Por favor, digite o nome de uma cidade.');
        return;
    }

    // Normaliza o nome da cidade para buscar no objeto MOCK_DATA
    const normalizedCity = city.toLowerCase().trim().replace(/ /g, ''); // Remove espaços

    // Limpa a mensagem de erro antes de buscar
    displayError('');

    const data = MOCK_DATA[normalizedCity];

    if (data) {
        // Se os dados simulados existirem, exibe-os
        displayWeatherData(data);
    } else {
        // Se a cidade não estiver nos dados simulados, simula o erro 404
        displayError(`Cidade "${city}" não está na base de dados simulada.`);
        clearWeatherData();
    }
}

// 3. Função para exibir os dados na interface
function displayWeatherData(data) {
    const { name, temp, humidity, description, iconCode } = data;

    // Converte a primeira letra da descrição para maiúscula
    const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

    // Atualiza os elementos com os dados simulados
    cityNameDisplay.textContent = `Tempo ${name}`;

    // Formata a temperatura para ter duas casas decimais
    const tempFormatted = temp.toFixed(2);
    temperatureDisplay.textContent = `${tempFormatted} °C`;

    // Usa um placeholder de URL, mantendo o formato do OpenWeatherMap
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = formattedDescription;

    descriptionDisplay.textContent = formattedDescription;
    humidityDisplay.textContent = `Umidade: ${humidity}%`;
}

// 4. Função para limpar os resultados em caso de erro
function clearWeatherData() {
    cityNameDisplay.textContent = '...';
    temperatureDisplay.textContent = '... °C';
    weatherIcon.src = '';
    weatherIcon.alt = '';
    descriptionDisplay.textContent = '...';
    humidityDisplay.textContent = 'Umidade: ...%';
}

// 5. Função para exibir mensagens de erro
function displayError(message) {
    if (message) {
        errorDisplay.textContent = `Erro: ${message}`;
        errorDisplay.style.display = 'block';
    } else {
        errorDisplay.textContent = '';
        errorDisplay.style.display = 'none';
    }
}

// 6. Event Listeners
// Ao clicar no botão Buscar
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    getWeatherDataSimulated(city);
});

// Ao pressionar ENTER no campo de input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        getWeatherDataSimulated(city);
    }
});

// 7. Chamada inicial (Carrega a cidade inicial 'Aracaju' por padrão)
document.addEventListener('DOMContentLoaded', () => {
    // Busca os dados da cidade que está no input ao carregar a página
    getWeatherDataSimulated(cityInput.value.trim());
});