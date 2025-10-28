// Inicializa o mapa centralizado no Brasil
const map = L.map('map').setView([-10.9472, -37.0731], 13); // Aracaju-SE ❤️

// Adiciona o mapa base (OpenStreetMap gratuito)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Função para mostrar localização em tempo real
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Remove marcador anterior, se existir
      if (window.myMarker) map.removeLayer(window.myMarker);

      window.myMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup("📍 Você está aqui!").openPopup();

      map.setView([lat, lon], 15);
    },
    function () {
      alert("Não foi possível obter sua localização 😔");
    }
  );
} else {
  alert("Seu navegador não suporta geolocalização.");
}

// Adiciona 3 marcadores fixos
const lugares = [
  { coords: [-10.9425, -37.0712], nome: "Praia de Atalaia", info: "🏖️ Linda e famosa praia de Aracaju!" },
  { coords: [-10.9399, -37.0737], nome: "Oceanário", info: "🐠 Projeto Tamar com tartarugas e peixes!" },
  { coords: [-10.9530, -37.0742], nome: "Centro Histórico", info: "🏛️ História e cultura sergipana." }
];

lugares.forEach(lugar => {
  L.marker(lugar.coords)
    .addTo(map)
    .bindPopup(`<b>${lugar.nome}</b><br>${lugar.info}`);
});


