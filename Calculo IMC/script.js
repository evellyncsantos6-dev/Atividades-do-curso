// Função principal do algoritmo "Calculo_IMC"
function calcularIMC() {
    // 1. Coleta e validação dos dados
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const sexo = document.getElementById('sexo').value;
    const resultadoDiv = document.getElementById('resultado');

    // Validação básica
    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || !sexo) {
        resultadoDiv.innerHTML = '<p class="condicao-status">Por favor, preencha todos os campos corretamente (Peso e Altura devem ser números positivos e o Sexo deve ser selecionado).</p>';
        return;
    }

    // 2. Cálculo do IMC
    // Fórmula: IMC = peso (kg) / [altura (m) * altura (m)]
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2); // Duas casas decimais

    // 3. Determinação da Condição (Status da Gordura Corporal)
    let condicao = '';
    
    // Tabela para Mulheres
    if (sexo === 'mulher') {
        if (imc < 19.1) {
            condicao = 'abaixo do peso';
        } else if (imc >= 19.1 && imc <= 25.8) {
            condicao = 'no peso normal';
        } else if (imc > 25.8 && imc <= 27.3) {
            condicao = 'marginalmente acima do peso';
        } else if (imc > 27.3 && imc <= 32.3) {
            condicao = 'acima do peso ideal';
        } else { // > 32.3
            condicao = 'obeso';
        }
    } 
    // Tabela para Homens
    else if (sexo === 'homem') {
        if (imc < 20.7) {
            condicao = 'abaixo do peso';
        } else if (imc >= 20.7 && imc <= 26.4) {
            condicao = 'no peso normal';
        } else if (imc > 26.4 && imc <= 27.8) {
            condicao = 'marginalmente acima do peso';
        } else if (imc > 27.8 && imc <= 31.1) {
            condicao = 'acima do peso ideal';
        } else { // > 31.1
            condicao = 'obeso';
        }
    }

    // Nota: O cálculo de "quanto deve perder ou ganhar em Kg para ficar na condição normal"
    // requer o uso de uma faixa de IMC de referência. Usaremos o **ponto central** da faixa normal
    // de IMC para o sexo em questão para calcular o peso ideal aproximado para referência.

    let imcMinNormal = 0;
    let imcMaxNormal = 0;
    if (sexo === 'mulher') {
        imcMinNormal = 19.1;
        imcMaxNormal = 25.8;
    } else { // homem
        imcMinNormal = 20.7;
        imcMaxNormal = 26.4;
    }

    // Cálculo do peso para o LIMITE INFERIOR e SUPERIOR do IMC normal
    const pesoMinNormal = imcMinNormal * altura * altura;
    const pesoMaxNormal = imcMaxNormal * altura * altura;

    // Diferença de peso
    let sugestaoPeso = '';
    if (condicao === 'no peso normal') {
        sugestaoPeso = 'Seu peso já está na condição normal.';
    } else if (imc < imcMinNormal) {
        // Abaixo do peso: precisa ganhar até o limite inferior do peso normal
        const kgGanhar = (pesoMinNormal - peso).toFixed(2);
        sugestaoPeso = `Para alcançar a condição normal, você precisaria ganhar **${kgGanhar} Kg** (para atingir o limite inferior).`;
    } else { // Acima do peso: precisa perder
        // Acima do peso: precisa perder até o limite superior do peso normal
        const kgPerder = (peso - pesoMaxNormal).toFixed(2);
        sugestaoPeso = `Para alcançar a condição normal, você precisaria perder **${kgPerder} Kg** (para atingir o limite superior).`;
    }


    // 4. Exibição dos Resultados (registro em lista)
    resultadoDiv.innerHTML = `
        <p><strong>Nome:</strong> <span>${nome}</span></p>
        <p><strong>Sexo:</strong> <span>${sexo.charAt(0).toUpperCase() + sexo.slice(1)}</span></p>
        <p><strong>Peso:</strong> <span>${peso} Kg</span></p>
        <p><strong>Altura:</strong> <span>${altura} m</span></p>
        <hr>
        <p><strong>IMC Calculado:</strong> <span class="imc-value">${imcFormatado}</span></p>
        <p><strong>Condição:</strong> <span class="condicao-status">${condicao.toUpperCase()}</span></p>
        <hr>
        <p><strong>Sugestão:</strong> ${sugestaoPeso}</p>
    `;
}