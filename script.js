// Array de objetos: cada pergunta tem texto, opções e o índice da opção correta
const perguntas = [
    {
        texto: "Qual tag HTML cria o título principal da página?",
        opcoes: ["<p>", "<h1>", "<div>", "<span>"],
        correta: 1
    },
    {
        texto: "Qual linguagem define cores e fontes da página?",
        opcoes: ["HTML", "JavaScript", "CSS", "Python"],
        correta: 2
    },
    {
        texto: "Qual palavra declara uma constante em JavaScript?",
        opcoes: ["int", "def", "var", "const"],
        correta: 3
    },
    {
        texto: "Qual comando gera um número aleatório entre 0 e 1?",
        opcoes: ["Math.random()", "Math.round()", "Math.floor()", "Math.max()"],
        correta: 0
    },
    {
        texto: "Qual método busca um elemento pelo id?",
        opcoes: ["getElementByClass", "getElementById", "findById", "selectId"],
        correta: 1
    }
];

let indiceAtual = 0;
let pontuacao = 0;

const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const barra = document.getElementById("barra");
const contador = document.getElementById("contador");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");
const textoPontuacao = document.getElementById("pontuacao");
const mensagem = document.getElementById("mensagem");

function mostrarPergunta() {
    const atual = perguntas[indiceAtual];

    contador.textContent = "Pergunta " + (indiceAtual + 1) + " de " + perguntas.length;
    barra.style.width = (indiceAtual / perguntas.length) * 100 + "%";
    pergunta.textContent = atual.texto;
    opcoes.innerHTML = "";
    btnProxima.classList.add("oculto");

    atual.opcoes.forEach(function (texto, indice) {
        const botao = document.createElement("button");
        botao.textContent = texto;
        botao.className = "opcao";
        botao.addEventListener("click", function () {
            verificarResposta(indice);
        });
        opcoes.appendChild(botao);
    });
}

function verificarResposta(escolhida) {
    const correta = perguntas[indiceAtual].correta;
    const botoes = opcoes.querySelectorAll(".opcao");

    if (escolhida === correta) {
        pontuacao++;
    }

    // Feedback visual: a certa fica verde e a errada (se houver) fica vermelha
    botoes.forEach(function (botao, indice) {
        botao.disabled = true;
        if (indice === correta) {
            botao.classList.add("certa");
        } else if (indice === escolhida) {
            botao.classList.add("errada");
        }
    });

    btnProxima.textContent = indiceAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
    btnProxima.classList.remove("oculto");
}

function mostrarResultado() {
    quiz.classList.add("oculto");
    resultado.classList.remove("oculto");

    textoPontuacao.textContent = pontuacao + " / " + perguntas.length;

    if (pontuacao === perguntas.length) {
        mensagem.textContent = "Perfeito! Você domina o básico da programação web. 🏆";
    } else if (pontuacao >= 3) {
        mensagem.textContent = "Muito bem! Falta pouco para acertar tudo. 👏";
    } else {
        mensagem.textContent = "Continue praticando, você vai chegar lá! 💪";
    }
}

function proximaPergunta() {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function reiniciar() {
    indiceAtual = 0;
    pontuacao = 0;
    resultado.classList.add("oculto");
    quiz.classList.remove("oculto");
    mostrarPergunta();
}

btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", reiniciar);

mostrarPergunta();
