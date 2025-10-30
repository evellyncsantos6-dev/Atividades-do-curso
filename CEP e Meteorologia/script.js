document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    const consultarBtn = document.getElementById('consultar-btn');
    const erroMsg = document.getElementById('erro');
    
    // Elementos de Endereço
    const enderecoCard = document.getElementById('resultado-endereco');
    const cepInfo = document.getElementById('cep-info');
    const logradouroInfo = document.getElementById('logradouro-info');
    const bairroInfo = document.getElementById('bairro-info');
    const localidadeInfo = document.getElementById('localidade-info');

    // Elementos de Clima
    const climaCard = document.getElementById('resultado-clima');
    const cidadeClima = document.getElementById('cidade-clima');
    const tempAtual = document.getElementById('temp-atual');
    const descricaoClima = document.getElementById('descricao-clima');
    const tempMin = document.getElementById('temp-min');
    const tempMax = document.getElementById('temp-max');
    const umidade = document.getElementById('umidade');

    // Chave da API do OpenWeatherMap 
    const OPENWEATHER_API_KEY = '19b00e45dd302c1448f8197c60448d0c';

    // Funções Auxiliares
    const mostrarErro = (mensagem) => {
        erroMsg.textContent = mensagem;
        enderecoCard.classList.add('hidden');
        climaCard.classList.add('hidden');
    };

    const limparMensagem = () => {
        erroMsg.textContent = '';
    };

    // 1. Consome a API Via CEP
    const consultarCEP = async (cep) => {
        limparMensagem();
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            const resposta = await fetch(url);
            const dados = await resposta.json();

            if (dados.erro) {
                mostrarErro('CEP não encontrado ou inválido.');
                return null;
            }

            // Exibe os dados do endereço
            exibirEndereco(dados);
            
            // Retorna o nome da cidade para a próxima chamada
            return dados.localidade; 

        } catch (error) {
            console.error('Erro ao consultar Via CEP:', error);
            mostrarErro('Erro ao se comunicar com o serviço de CEP.');
            return null;
        }
    };

    const exibirEndereco = (dados) => {
        cepInfo.textContent = dados.cep;
        logradouroInfo.textContent = dados.logradouro;
        bairroInfo.textContent = dados.bairro;
        localidadeInfo.textContent = `${dados.localidade} / ${dados.uf}`;
        enderecoCard.classList.remove('hidden');
    };

    // 2. Consome a API OpenWeatherMap
    const consultarClima = async (cidade) => {
        // Enpoint: current weather data - Busca pelo nome da cidade
        // units=metric: para temperatura em Celsius
        // lang=pt_br: para descrição em português
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Aracaju,BR&units=metric&lang=pt_br&appid=${OPENWEATHER_API_KEY}`;
    };

    const exibirClima = (dados) => {
        const temp = dados.main;
        const clima = dados.weather[0];

        cidadeClima.textContent = dados.name;
        tempAtual.textContent = Math.round(temp.temp);
        descricaoClima.textContent = clima.description.charAt(0).toUpperCase() + clima.description.slice(1);
        tempMin.textContent = Math.round(temp.temp_min);
        tempMax.textContent = Math.round(temp.temp_max);
        umidade.textContent = temp.humidity;
        climaCard.classList.remove('hidden');
    };

    // Listener principal do botão de consulta
    consultarBtn.addEventListener('click', async () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length !== 8) {
            mostrarErro('Por favor, digite um CEP válido com 8 dígitos.');
            return;
        }

        const cidade = await consultarCEP(cep);

        if (cidade) {
            // Se a cidade for encontrada, consulta o clima
            consultarClima(cidade);
        } else {
            // Se o CEP não for encontrado, oculta o cartão do clima também.
            climaCard.classList.add('hidden');
        }
    });

    // Opcional: Permite consultar ao pressionar Enter no campo do CEP
    cepInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            consultarBtn.click();
        }
    });
});