document.getElementById('salarioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const valorHora = parseFloat(document.getElementById('valorHora').value);
    const horas = parseFloat(document.getElementById('horas').value);
    const horasExtras = parseFloat(document.getElementById('horasExtras').value || 0);
    const dependentes = parseInt(document.getElementById('dependentes').value || 0);
    const outrasDeducoes = parseFloat(document.getElementById('outrasDeducoes').value || 0);

    const salarioBase = valorHora * horas;
    const valorExtras = valorHora * 1.5 * horasExtras;
    const salarioBruto = salarioBase + valorExtras;

    const inss = calcularINSS(salarioBruto);
    const irpf = calcularIRPF(salarioBruto, dependentes);
    const valeTransporte = salarioBase * 0.06;

    const salarioLiquido = salarioBruto - inss - irpf - valeTransporte - outrasDeducoes;

    document.getElementById('resNome').innerText = nome;
    document.getElementById('salarioBase').innerText = salarioBase.toFixed(2);
    document.getElementById('valorExtras').innerText = valorExtras.toFixed(2);
    document.getElementById('descontoINSS').innerText = inss.toFixed(2);
    document.getElementById('descontoIRPF').innerText = irpf.toFixed(2);
    document.getElementById('valeTransporte').innerText = valeTransporte.toFixed(2);
    document.getElementById('outras').innerText = outrasDeducoes.toFixed(2);
    document.getElementById('salarioLiquido').innerText = salarioLiquido.toFixed(2);
});

// Exemplo simplificado de INSS para 2025 (valores fictícios)
function calcularINSS(salario) {
    if (salario <= 1412) return salario * 0.075;
    else if (salario <= 2666.68) return salario * 0.09;
    else if (salario <= 4000.03) return salario * 0.12;
    else return salario * 0.14;
}

// Exemplo simplificado de IRPF 2025 (valores fictícios)
function calcularIRPF(salario, dependentes) {
    const deducaoPorDependente = 189.59;
    const baseCalculo = salario - (dependentes * deducaoPorDependente);

    if (baseCalculo <= 2259.20) return 0;
    else if (baseCalculo <= 2826.65) return baseCalculo * 0.075 - 169.44;
    else if (baseCalculo <= 3751.05) return baseCalculo * 0.15 - 381.44;
    else if (baseCalculo <= 4664.68) return baseCalculo * 0.225 - 662.77;
    else return baseCalculo * 0.275 - 896.00;
}

function limpar() {
    document.getElementById('salarioForm').reset();
    document.getElementById('resultado').querySelectorAll('span').forEach(span => span.textContent = "0.00");
    document.getElementById('resNome').textContent = "";
}
