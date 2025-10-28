const chaveAPI = "SUA_API_KEY_AQUI"; // 🔑 Substitua pela sua chave do OpenWeatherMap

document.getElementById("buscar").addEventListener("click", buscarTempo);

function buscarTempo() {
  const cidade = document.getElementById("cidade").value;
  if (!cidade) {
    alert("Digite uma cidade!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${chaveAPI}`;

  fetch(url)
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.cod !== 200) {
        alert("Cidade não encontrada!");
        return;
      }

      document.getElementById("resultado").innerHTML = `
        <h2>Tempo ${dados.name}</h2>
        <p class="temp">${dados.main.temp.toFixed(1)} °C</p>
        <div class="icone">☁️</div>
        <p class="descricao">${dados.weather[0].description}</p>
        <p class="umidade">Umidade: ${dados.main.humidity}%</p>
      `;
    })
    .catch(() => alert("Erro ao buscar dados."));
}
