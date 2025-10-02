function calcularPromocao() {
    // 1. Captura os valores dos campos de input
    const descricao = document.getElementById('produto').value.trim();
    const precoUnitario = parseFloat(document.getElementById('preco').value);
    const saida = document.getElementById('saidaPromocao');

    // 2. Validação básica dos inputs
    if (!descricao || isNaN(precoUnitario) || precoUnitario <= 0) {
        saida.innerHTML = '<p style="color: red;">Por favor, preencha a descrição e um preço unitário válido.</p>';
        return;
    }

    // 3. Lógica da Promoção: Compre 3, o 3º sai pela metade do preço.
    // O valor total de 3 itens será (2 * Preço Normal) + (1 * 50% do Preço Normal)
    const precoPromocao = precoUnitario / 2;
    const total3Unidades = (precoUnitario * 2) + precoPromocao;

    // 4. Cria as mensagens de saída formatadas
    const htmlSaida = `
        <div class="mensagem-produto">Produto: **${descricao}**</div>
        <div class="mensagem-produto">Preço Unitário: R$ ${precoUnitario.toFixed(2).replace('.', ',')}</div>
        <br>
        <div class="mensagem-promocao">
            Compre 3 unidades de **${descricao}** e pague apenas:
            <br>
            **R$ ${total3Unidades.toFixed(2).replace('.', ',')}**
        </div>
        <div style="margin-top: 10px; font-size: 1em;">
            *(O 3º item sai com 50% de desconto!)*
        </div>
    `;

    // 5. Exibe as mensagens na tela
    saida.innerHTML = htmlSaida;
}
  