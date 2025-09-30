document.addEventListener('DOMContentLoaded', () => {
    const promocaoForm = document.getElementById('promocaoForm');
    const resultadoDiv = document.getElementById('resultado');

    promocaoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // 1. Obter os valores de entrada
        const medicamento = document.getElementById('medicamento').value;
        const precoUnitario = parseFloat(document.getElementById('preco').value);

        if (isNaN(precoUnitario) || precoUnitario <= 0) {
            alert('Por favor, insira um preço válido (maior que R$ 0,00).');
            return;
        }

        // --- Lógica da Promoção ---

        // 2. Calcular o valor total de duas unidades
        const valorTotal = precoUnitario * 2;

        // 3. Calcular o desconto (os centavos)
        // Math.floor(valorTotal) obtém a parte inteira (os Reais)
        // A subtração resulta na parte decimal (os Centavos)
        const centavos = valorTotal - Math.floor(valorTotal);
        
        // Arredonda o centavo para 2 casas decimais para garantir a precisão
        const desconto = Math.round(centavos * 100) / 100;

        // 4. Calcular o valor a pagar na promoção
        const valorPagar = valorTotal - desconto;

        // --- Exibir o Resultado na Tela ---

        // Função auxiliar para formatar o valor como moeda (R$ X.XX)
        const formatarMoeda = (valor) => {
            // Usa toFixed(2) para garantir duas casas decimais, conforme o exemplo da imagem
            return valor.toFixed(2).replace('.', ',');
        };

        // 5. Criar e inserir o HTML de saída, seguindo o layout da imagem

        resultadoDiv.innerHTML = `
            <p id="promocaoLinha1">Promoção de ${medicamento}</p>
            <p id="promocaoLinha2">Leve 2 por apenas RS: ${formatarMoeda(valorPagar)}</p>
        `;
    });
});