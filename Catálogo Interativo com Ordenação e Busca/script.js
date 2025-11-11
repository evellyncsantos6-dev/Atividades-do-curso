const produtos = [
    { nome: "Notebook", preco: 1500, imagem: "https://i.pinimg.com/736x/e3/49/6c/e3496cef9156efc45e73f3350f64ab59.jpg" },
    { nome: "Mouse", preco: 480, imagem: "https://i.pinimg.com/736x/aa/21/bc/aa21bcb5330ff7783a1359b0323d1215.jpg" },
    { nome: "Teclado", preco: 850, imagem: "https://i.pinimg.com/1200x/a9/ea/e4/a9eae4b8d205ffbe4554462da1f5c749.jpg" },
    { nome: "Monitor", preco: 3200, imagem: "https://i.pinimg.com/736x/47/b2/44/47b244d535b74a961761d8aa9d378c48.jpg" },
    { nome: "Cadeira Gamer", preco: 900, imagem: "https://i.pinimg.com/1200x/4a/2e/ea/4a2eea8dcde960cd047f9d2078c30dbf.jpg" },
    { nome: "Headset", preco: 200, imagem: "https://i.pinimg.com/736x/db/c2/7d/dbc27d5ab959db96fb977d4312ff7b64.jpg" }
  ];

  let produtosExibidos = [...produtos];

  // Função Bubble Sort
  function bubbleSort(lista, chave, crescente = true) {
    const n = lista.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const condicao = crescente
          ? lista[j][chave] > lista[j + 1][chave]
          : lista[j][chave] < lista[j + 1][chave];
        if (condicao) {
          [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
        }
      }
    }
    return lista;
  }

  // Busca Linear
  function buscaLinear(lista, termo) {
    termo = termo.toLowerCase();
    return lista.filter(item => item.nome.toLowerCase().includes(termo));
  }

  // Ordenar por nome
  function ordenarPorNome(crescente) {
    produtosExibidos = bubbleSort([...produtosExibidos], 'nome', crescente);
    exibirProdutos();
  }

  // Ordenar por preço
  function ordenarPorPreco(crescente) {
    produtosExibidos = bubbleSort([...produtosExibidos], 'preco', crescente);
    exibirProdutos();
  }

  // Buscar produtos
  function buscarProdutos() {
    const termo = document.getElementById("campoBusca").value.trim();
    if (termo === "") {
      produtosExibidos = [...produtos];
    } else {
      produtosExibidos = buscaLinear(produtos, termo);
    }
    exibirProdutos();
  }

  // Exibir produtos
  function exibirProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    if (produtosExibidos.length === 0) {
      lista.innerHTML = `<p class="mensagem">❌ Nenhum produto encontrado.</p>`;
      return;
    }

    produtosExibidos.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("produto");
      div.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <h3>${prod.nome}</h3>
        <p>💰 R$ ${prod.preco.toFixed(2)}</p>
      `;
      lista.appendChild(div);
    });
  }

  // Inicializa
  exibirProdutos();