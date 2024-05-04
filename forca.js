// Definição das variáveis globais
var temaSelecionado = "";
var palavraSelecionada = "";
var dicaSelecionada = "";
var letrasTentadas = [];
var numTentativas = 6;
var letrasCorretas = 0;

// Função para cadastrar uma nova palavra
function cadastrar() {
    temaSelecionado = document.getElementById("tema").value;
    palavraSelecionada = document.getElementById("palavra").value.toLowerCase();
    dicaSelecionada = document.getElementById("dica").value;
    // Verifica se os campos foram preenchidos
    if (temaSelecionado && palavraSelecionada) {
        // Mostra a área do jogo e esconde o formulário de cadastro
        document.getElementById("cadastro").style.display = "none";
        document.getElementById("jogo").style.display = "block";
        document.getElementById("temaJogo").innerText = "Tema: " + temaSelecionado;
        // Exibe a dica
        document.getElementById("showDica").innerText = "Dica: " + dicaSelecionada;
        // Inicializa o jogo
        iniciarJogo();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para iniciar o jogo
function iniciarJogo() {
    // Reinicia as variáveis globais
    letrasTentadas = [];
    numTentativas = 6;
    letrasCorretas = 0;
    // Exibe o número de tentativas
    document.getElementById("numTentativas").innerText = numTentativas;
    // Limpa as letras tentadas
    document.getElementById("letrasTentadas").innerText = "Letras Tentadas: ";
    // Limpa o campo de tentativa
    document.getElementById("tentativa").value = "";
    // Limpa o campo de letras
    document.getElementById("letras").innerHTML = "";
    // Cria espaços para cada letra da palavra
    for (var i = 0; i < palavraSelecionada.length; i++) {
        var span = document.createElement("span");
        span.className = "letra";
        span.innerText = "_ ";
        document.getElementById("letras").appendChild(span);
    }
}

// Função para verificar se a letra tentada está na palavra
function adivinhar() {
    var tentativa = document.getElementById("tentativa").value.toLowerCase();
    // Verifica se a letra já foi tentada
    if (letrasTentadas.includes(tentativa)) {
        alert("Você já tentou esta letra.");
        return;
    }
    letrasTentadas.push(tentativa);
    document.getElementById("letrasTentadas").innerText = "Letras Tentadas: " + letrasTentadas.join(", ");
    var acertou = false;
    // Verifica se a letra está na palavra
    for (var i = 0; i < palavraSelecionada.length; i++) {
        if (palavraSelecionada[i] === tentativa) {
            acertou = true;
            document.getElementsByClassName("letra")[i].innerText = tentativa;
            letrasCorretas++;
        }
    }
    // Se errou, decrementa o número de tentativas
    if (!acertou) {
        numTentativas--;
        document.getElementById("numTentativas").innerText = numTentativas;
        if (numTentativas === 0) {
            alert("Suas tentativas acabaram. A palavra era: " + palavraSelecionada);
            iniciarJogo();
        }
    }
    // Verifica se o jogador ganhou
    if (letrasCorretas === palavraSelecionada.length) {
        alert("Parabéns! Você acertou a palavra era (" + palavraSelecionada + ")");
        iniciarJogo();
    }
}