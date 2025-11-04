const API_URL_WOMENS_CLOTHING = "https://fakestoreapi.com/products/category/women's%20clothing";
const API_URL_JEWELERY = "https://fakestoreapi.com/products/category/jewelery";

const simulatedShoes = [
    {
        id: 1001,
        title: "Tênis Feminino Esportivo",
        price: 149.90,
        description: "Tênis super leve e confortável, ideal para corrida e uso diário. Cabedal respirável e sola com alta absorção de impacto.",
        category: "Calçados",
        image:"https://i.pinimg.com/736x/a1/20/b3/a120b3dab3cbe61d5cd9bee85900b92d.jpg"
    },
    {
        id: 1002,
        title: "Sandália de Salto Bloco",
        price: 695.00,
        description: "Sandália elegante com salto bloco de 7cm, tiras finas e fechamento em fivela. Perfeita para eventos casuais e formais.",
        category: "Calçados",
        image:"https://i.pinimg.com/1200x/2c/c3/ff/2cc3ff8c6d1bf4cf42a4e5c5acccd3bf.jpg"
    },
    {
        id: 1003,
        title: "Bota Cano Alto em Couro",
        price: 389.00,
        description: "Bota de inverno em couro sintético de alta qualidade, bico fino e zíper lateral. Design moderno e sofisticado.",
        category: "Calçados",
        image:"https://i.pinimg.com/1200x/b8/ba/fb/b8bafb83bc9b8271eb25c04d50ceaf9a.jpg"
    },
    ];



const produtosGrid = document.getElementById('produtos-grid');
const carrinhoItensContainer = document.getElementById('carrinho-itens');
const carrinhoTotalElement = document.getElementById('carrinho-total');
const modal = document.getElementById('modal-produto');
const modalBody = document.getElementById('modal-body');

let produtos = []; 
let carrinho = []; 




async function fetchProdutos() {
    try {
        
        const responseRoupas = fetch(API_URL_WOMENS_CLOTHING);
        const responseAcessorios = fetch(API_URL_JEWELERY);
        
        const [resRoupas, resAcessorios] = await Promise.all([responseRoupas, responseAcessorios]);

        if (!resRoupas.ok || !resAcessorios.ok) {
            throw new Error('Erro ao buscar uma ou ambas as categorias da FakeStore API.');
        }

        const produtosRoupas = await resRoupas.json();
        const produtosAcessorios = await resAcessorios.json();
        
        
        produtos = [
            ...produtosRoupas, 
            ...produtosAcessorios, 
            ...simulatedShoes 
        ];

        console.log(`Produtos carregados: ${produtos.length} itens (Roupas + Acessórios + Calçados)`);
        
        exibirProdutos(produtos);
    } catch (error) {
        console.error('Erro ao buscar ou combinar produtos:', error);
        produtosGrid.innerHTML = '<p style="color: red;">Não foi possível carregar o catálogo de moda feminina e acessórios.</p>';
    }
}


function exibirProdutos(produtos) {
    produtosGrid.innerHTML = '';
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        
        card.setAttribute('data-id', produto.id); 

        
        const imageUrl = produto.image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${produto.title}">
            <div class="produto-info">
                <h3 title="${produto.title}">${produto.title}</h3>
                <p class="preco">R$ ${produto.price.toFixed(2).replace('.', ',')}</p>
            </div>
            <button onclick="adicionarAoCarrinho(${produto.id})">
                <i class="fas fa-cart-plus"></i> Adicionar
            </button>
        `;

        card.querySelector('.produto-info').onclick = () => abrirModal(produto.id);
        card.querySelector('img').onclick = () => abrirModal(produto.id);

        produtosGrid.appendChild(card);
    });
}



function adicionarAoCarrinho(produtoId) {
    
    const id = Number(produtoId); 
    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            carrinho.push({
                id: produto.id,
                title: produto.title,
                price: produto.price,
                quantidade: 1
            });
        }
    }
    atualizarCarrinhoUI();
}

function removerDoCarrinho(produtoId) {
    const id = Number(produtoId);
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
    carrinhoItensContainer.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoItensContainer.innerHTML = '<p style="text-align: center; color: #777;">O carrinho está vazio.</p>';
    }

    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        total += item.price * item.quantidade;

        itemElement.innerHTML = `
            <div class="carrinho-item-info">
                <h4 title="${item.title}">${item.title}</h4>
                <span>${item.quantidade} x R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="carrinho-item-actions">
                <button onclick="removerDoCarrinho(${item.id})" title="Remover"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        carrinhoItensContainer.appendChild(itemElement);
    });

    carrinhoTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}



function abrirModal(produtoId) {
    const id = Number(produtoId);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const imageUrl = produto.image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';

    modalBody.innerHTML = `
        <img src="${imageUrl}" alt="${produto.title}">
        <div class="modal-details">
            <h2>${produto.title}</h2>
            <p><strong>Categoria:</strong> ${produto.category}</p>
            <p>${produto.description}</p>
            <p class="price">R$ ${produto.price.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarAoCarrinho(${produto.id}); fecharModal();">
                <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
            </button>
        </div>
    `;
    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
}




async function calcularFrete() {
    const cep = document.getElementById('cep-input').value.replace(/\D/g, '');
    const freteResultado = document.getElementById('frete-resultado');
    freteResultado.innerHTML = 'Calculando...';

    if (cep.length !== 8) {
        freteResultado.innerHTML = '<span style="color: red;">CEP inválido. Digite 8 dígitos.</span>';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            freteResultado.innerHTML = '<span style="color: red;">CEP não encontrado.</span>';
        } else {
            const valorFrete = dados.uf === 'SP' || dados.uf === 'RJ' ? 15.00 : 35.00;
            freteResultado.innerHTML = `
                <strong>Frete para ${dados.localidade}/${dados.uf}:</strong> R$ ${valorFrete.toFixed(2).replace('.', ',')}
                <br>Prazo: 5 a 10 dias úteis.
            `;
            exibirMapaRota(dados);
        }
    } catch (error) {
        console.error('Erro ao consultar ViaCEP:', error);
        freteResultado.innerHTML = '<span style="color: red;">Erro ao consultar o serviço de CEP.</span>';
    }
}

function exibirMapaRota(dadosCEP) {
    const mapaDiv = document.getElementById('mapa-rota');
    mapaDiv.style.backgroundColor = '#d0f0d0';
    mapaDiv.style.color = 'green';
    mapaDiv.innerHTML = `<i class="fas fa-map-marked-alt"></i> Rota Simulada: ${dadosCEP.localidade} (Integração de mapa real deve ser feita aqui.)`;
}




document.addEventListener('DOMContentLoaded', fetchProdutos);

window.onclick = function(event) {
    if (event.target === modal) {
        fecharModal();
    }
}