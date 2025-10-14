document.getElementById("form-contato").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Mensagem de confirmação
    const confirmacao = document.getElementById("mensagem-confirmacao");
    confirmacao.style.display = "block";
    confirmacao.innerHTML = `
        <strong>Mensagem enviada!</strong><br>
        Nome: ${nome}<br>
        Email: ${email}<br>
        Mensagem: ${mensagem}
    `;

    // Envio via WhatsApp
    const numero = "+55 (79) 98856-1238";
    const texto = `Novo contato do portfólio:%0A%0ANome: ${nome}%0AEmail: ${email}%0AMensagem: ${mensagem}`;
    const url = `https://wa.me/${numero}?text=${texto}`;
    window.open(url, '_blank');

    // Limpar formulário
    document.getElementById("form-contato").reset();
});

