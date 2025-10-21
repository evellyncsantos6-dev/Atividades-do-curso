document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento dos elementos HTML
    const cepInput = document.getElementById('cep');
    const buscarButton = document.getElementById('buscar-cep');
    const logradouroInput = document.getElementById('logradouro');
    const complementoInput = document.getElementById('complemento');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const ufInput = document.getElementById('uf');
    const numeroInput = document.getElementById('numero');

    // Função para limpar os campos de endereço preenchidos pela API
    const limparCampos = () => {
        logradouroInput.value = '';
        complementoInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        ufInput.value = '';
        // Não limpa o 'Número' para o usuário preencher
        // numeroInput.value = ''; 
    };

    // Formata o CEP automaticamente ao digitar (00000-000)
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value.substring(0, 9);
    });

    // Função principal para buscar o CEP na ViaCEP
    const buscarCEP = async () => {
        // Remove a formatação e valida se tem 8 dígitos
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
            limparCampos();
            return;
        }

        limparCampos(); 
        
        try {
            // URL da API ViaCEP
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            
            // Faz a requisição
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erro na comunicação com a API.');
            }

            const data = await response.json();

            // ViaCEP retorna { "erro": true } se não encontrar o CEP
            if (data.erro) {
                alert('CEP não encontrado na base de dados.');
                cepInput.focus();
                return;
            }

            // Preenche os campos do formulário com os dados do JSON
            logradouroInput.value = data.logradouro || '';
            complementoInput.value = data.complemento || '';
            bairroInput.value = data.bairro || '';
            cidadeInput.value = data.localidade || '';
            ufInput.value = data.uf || '';
            
            // Foca no campo "Número" para que o usuário complete
            numeroInput.focus(); 

        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao buscar o CEP. Verifique sua conexão.');
        }
    };

    // Evento de clique no botão "Buscar"
    buscarButton.addEventListener('click', buscarCEP);

    // Evento de "Enter" no campo CEP
    cepInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarCEP();
        }
    });

    // Evento 'blur' (quando o campo perde o foco) para auto-buscar
    cepInput.addEventListener('blur', () => {
        // Se o CEP tiver exatamente 8 dígitos, tenta buscar
        if (cepInput.value.replace(/\D/g, '').length === 8) {
            buscarCEP();
        }
    });
});