let filaNormal = [];
let filaPreferencial = [];
let ultimasSenhas = [];
let atendimentos = [];
let contadorNormal = 1;
let contadorPreferencial = 1;
let preferencialAtendido = 0;

// Atualiza o relógio
setInterval(() => {
  const agora = new Date();
  document.getElementById("relogio").textContent = agora.toLocaleTimeString();
}, 1000);

function gerarSenha(tipo) {
  let senha;
  if (tipo === "normal") {
    senha = "N" + contadorNormal++;
    filaNormal.push({ senha, tipo, hora: new Date() });
  } else {
    senha = "P" + contadorPreferencial++;
    filaPreferencial.push({ senha, tipo, hora: new Date() });
  }
  atualizarFila();
}

function atualizarFila() {
  const lista = document.getElementById("lista-fila");
  lista.innerHTML = "";

  const fila = [...filaPreferencial, ...filaNormal];
  fila.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.senha} - ${item.tipo.toUpperCase()}`;
    lista.appendChild(li);
  });
}

function chamarProximo() {
  let proximo;
  // Regra: 3 preferenciais para cada normal
  if (preferencialAtendido < 3 && filaPreferencial.length > 0) {
    proximo = filaPreferencial.shift();
    preferencialAtendido++;
  } else if (filaNormal.length > 0) {
    proximo = filaNormal.shift();
    preferencialAtendido = 0;
  } else if (filaPreferencial.length > 0) {
    proximo = filaPreferencial.shift();
  }

  if (proximo) {
    const tempo = (new Date() - proximo.hora) / 1000;
    atendimentos.push(tempo);
    if (atendimentos.length > 0) {
      const media = (atendimentos.reduce((a,b)=>a+b,0) / atendimentos.length).toFixed(1);
      document.getElementById("tma").textContent = `Tempo médio: ${media} segundos`;
    }

    ultimasSenhas.unshift(proximo.senha);
    if (ultimasSenhas.length > 5) ultimasSenhas.pop();

    const ul = document.getElementById("ultimas-senhas");
    ul.innerHTML = "";
    ultimasSenhas.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });

    atualizarFila();
    alert(`Chamando: ${proximo.senha}`);
  } else {
    alert("Nenhum paciente na fila!");
  }
}

// Modal de agendamento
function abrirAgendamento() {
  document.getElementById("modal-agendamento").style.display = "flex";
}

function fecharAgendamento() {
  document.getElementById("modal-agendamento").style.display = "none";
}

function salvarAgendamento() {
  const nome = document.getElementById("nome").value;
  const dataHora = document.getElementById("data-hora").value;

  if (!nome || !dataHora) {
    alert("Preencha todos os campos!");
    return;
  }

  alert(`Agendamento confirmado para ${nome} em ${new Date(dataHora).toLocaleString()}`);
  fecharAgendamento();
}