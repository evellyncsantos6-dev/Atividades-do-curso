// Função para alternar entre tema claro e escuro
function toggleTheme() {
    const body = document.body;
    const isLightTheme = body.classList.toggle("light-theme");
    const themeButton = document.getElementById("toggle-theme");
  
  
    if (themeButton) {
      if (isLightTheme) {
        themeButton.textContent = "Tema Escuro";
      } else {
        themeButton.textContent = "Tema Claro";
      }
  
  
      // Salva a preferência do usuário no localStorage
      localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    }
  }
  
  
  // Funcionalidade do Botão 'Diga Olá!' (somente na página principal)
  function setupSaudacaoButton() {
    const saudacaoBtn = document.getElementById("saudacao-btn");
    if (saudacaoBtn) {
      saudacaoBtn.addEventListener("click", function () {
        // Redireciona para o WhatsApp
        window.open(
          "https://wa.me/+55(79) 988561238?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20servi%C3%A7o!",
          "_blank"
        );
      });
    }
  }
  
  
  // Inicializa as funções ao carregar a página
  document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Configuração do Tema
    const savedTheme = localStorage.getItem("theme");
    const themeButton = document.getElementById("toggle-theme");
  
  
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      if (themeButton) {
        themeButton.textContent = "Tema Escuro";
      }
    } else {
      if (themeButton) {
        themeButton.textContent = "Tema Claro";
      }
    }
  
  
    if (themeButton) {
      themeButton.addEventListener("click", toggleTheme);
    }
  
  
    // 2. Configuração do Botão de Saudação
    setupSaudacaoButton();
  });
  
  
  