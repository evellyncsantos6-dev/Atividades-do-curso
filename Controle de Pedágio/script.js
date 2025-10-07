const DISTANCIA = 120; // km
const VALOR_PEDAGIO = 20.0; // reais

const velocidades = [];
const valoresCobrados = [];

let inicioProcesso = null;
let finalProcesso = null;

document.getElementById('formVeiculo').addEventListener('submit', function (e) {
  e.preventDefault();

  const placa = document.getElementById('placa').value.toUpperCase();
  const horaEntrada = document.getElementById('horaEntrada').value;
  const horaSaida = document.getElementById('horaSaida').value;

  const tempoInfo = calcularTempo(horaEntrada, horaSaida);
  const tempoHoras = tempoInfo.horas;
  const tempoStr = tempoInfo.str;

  const velocidade = DISTANCIA / tempoHoras;
  const desconto = calcularDesconto(velocidade);
  const valorPago = VALOR_PEDAGIO * (1 - desconto);

  // Guardar dados
  velocidades.push(velocidade);
  valoresCobrados.push(valorPago);

  // Atualiza início e fim do processamento
  const entradaTime = new Date("1970-01-01T" + horaEntrada + ":00");
  const saidaTime = new Date("1970-01-01T" + horaSaida + ":00");
  if (saidaTime < entradaTime) saidaTime.setDate(saidaTime.getDate() + 1);

  if (!inicioProcesso || entradaTime < inicioProcesso) inicioProcesso = entradaTime;
  if (!finalProcesso || saidaTime > finalProcesso) finalProcesso = saidaTime;

  exibirTicket(placa, horaEntrada, horaSaida, tempoStr, velocidade, valorPago);

  // Limpa o formulário
  document.getElementById('formVeiculo').reset();
});

document.getElementById('fecharCaixa').addEventListener('click', function () {
  if (velocidades.length === 0) {
    alert("Nenhum veículo registrado!");
    return;
  }

  const menor = Math.min(...velocidades);
  const maior = Math.max(...velocidades);
  const media = velocidades.reduce((a, b) => a + b, 0) / velocidades.length;
  const total = valoresCobrados.reduce((a, b) => a + b, 0);

  const relatorio = `
    <h2>Relatório Final do Turno</h2>
    <p><strong>Menor velocidade:</strong> ${menor.toFixed(2)} km/h</p>
    <p><strong>Maior velocidade:</strong> ${maior.toFixed(2)} km/h</p>
    <p><strong>Média das velocidades:</strong> ${media.toFixed(2)} km/h</p>
    <p><strong>Total arrecadado:</strong> R$ ${total.toFixed(2)}</p>
    <p><strong>Início do processamento:</strong> ${formatarHora(inicioProcesso)}</p>
    <p><strong>Fim do processamento:</strong> ${formatarHora(finalProcesso)}</p>
  `;

  document.getElementById('relatorioFinal').innerHTML = relatorio;
});

function calcularTempo(entrada, saida) {
  const e = new Date("1970-01-01T" + entrada + ":00");
  const s = new Date("1970-01-01T" + saida + ":00");
  if (s < e) s.setDate(s.getDate() + 1); // virada de dia
  const diffMs = s - e;
  const horas = diffMs / 1000 / 3600;
  const tempoStr = new Date(diffMs).toISOString().substr(11, 8);
  return { horas, str: tempoStr };
}

function calcularDesconto(velocidade) {
  if (velocidade <= 60) return 0.15;
  if (velocidade <= 100) return 0.10;
  return 0.0;
}

function exibirTicket(placa, entrada, saida, tempo, velocidade, valor) {
  const ticket = document.createElement("div");
  ticket.innerHTML = `
    <hr>
    <h3>Ticket - ${placa}</h3>
    <p><strong>Entrada:</strong> ${entrada}</p>
    <p><strong>Saída:</strong> ${saida}</p>
    <p><strong>Tempo gasto:</strong> ${tempo}</p>
    <p><strong>Velocidade média:</strong> ${velocidade.toFixed(2)} km/h</p>
    <p><strong>Valor a pagar:</strong> R$ ${valor.toFixed(2)}</p>
  `;
  document.getElementById('tickets').appendChild(ticket);
}

function formatarHora(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}
