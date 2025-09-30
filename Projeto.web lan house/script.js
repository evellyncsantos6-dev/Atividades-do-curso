// Obtém referências aos elementos do formulário e do resultado
const form = document.querySelector('form');
const valor15minInput = document.getElementById('valor15min');
const tempoUsoInput = document.getElementById('tempoUso');
const valorPagarSpan = document.getElementById('valorPagar');

/**
 * Função principal para calcular o valor a ser pago.
 */
function calcularValor(event) {
    // Previne o recarregamento padrão da página ao submeter o formulário
    event.preventDefault();

    // 1. Obtém os valores de entrada e converte para número
    const valor15min = Number(valor15minInput.value);
    const tempoUso = Number(tempoUsoInput.value);
    
    // 2. Define o intervalo base em minutos
    const INTERVALO_MINUTOS = 15;

    // 3. Verifica se os valores são válidos
    if (isNaN(valor15min) || valor15min <= 0 || isNaN(tempoUso) || tempoUso < 1) {
        alert("Por favor, insira valores válidos para o valor (maior que zero) e o tempo de uso (maior que zero).");
        valorPagarSpan.textContent = '0.00';
        return;
    }

    // 4. Calcula o número de períodos de 15 minutos
    // A divisão 'tempoUso / INTERVALO_MINUTOS' retorna o total, incluindo frações.
    // Ex: 25 / 15 = 1.666...
    
    // Math.ceil() arredonda para o próximo inteiro, garantindo que
    // a fração extra seja cobrada integralmente.
    // Ex: Math.ceil(1.666...) retorna 2
    const numeroPeriodos = Math.ceil(tempoUso / INTERVALO_MINUTOS);

    // 5. Calcula o valor total a pagar
    const valorTotal = numeroPeriodos * valor15min;

    // 6. Exibe o resultado formatado no elemento 'valorPagarSpan'
    // .toFixed(2) garante que o resultado tenha sempre 2 casas decimais.
    valorPagarSpan.textContent = valorTotal.toFixed(2);
}

// Adiciona o ouvinte de evento para executar a função ao submeter o formulário
form.addEventListener('submit', calcularValor);

// Opcional: Executa o cálculo inicial com os valores padrão para exibir o 6.00
window.addEventListener('load', () => {
    // Simula o clique no botão para o estado inicial
    document.getElementById('btnCalcular').click();
});