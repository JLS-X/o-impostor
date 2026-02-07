
let totalJogadores;
let jogadorAtual;
let impostor;
let palavraSecreta;
let estado;

let tempo;
let tempoConfigurado;
let intervalo = null;
let pausado = false;
let tempoFinalizado = false;

const palavras = [
"Pizza","Praia","Cinema","Hospital","Escola","Avião","Shopping","Futebol","Parque","Hotel",
"Ônibus","Navio","Teatro","Museu","Biblioteca","Restaurante","Padaria","Mercado","Farmácia","Posto",
"Banco","Igreja","Praça","Estádio","Piscina","Academia","Clube","Bar","Café","Lanchonete",
"Elevador","Escada","Garagem","Cozinha","Quarto","Banheiro","Sala","Varanda","Jardim","Porta",
"Janela","Telhado","Parede","Chão","Mesa","Cadeira","Sofá","Cama","Travesseiro","Cobertor",
"Telefone","Celular","Computador","Notebook","Tablet","Televisão","Controle","Rádio","Relógio","Câmera",
"Livro","Caderno","Caneta","Lápis","Borracha","Mochila","Estojo","Agenda","Papel","Envelope",
"Carro","Moto","Bicicleta","Patinete","Trem","Metrô","Helicóptero","Caminhão","Trator","Van",
"Cachorro","Gato","Pássaro","Peixe","Cavalo","Vaca","Porco","Galinha","Coelho","Tartaruga",
"Leão","Tigre","Elefante","Girafa","Macaco","Urso","Zebra","Cobra","Jacaré","Golfinho",
"Maçã","Banana","Laranja","Uva","Melancia","Morango","Pera","Abacaxi","Manga","Limão",
"Arroz","Feijão","Macarrão","Carne","Frango","Peixe","Ovo","Queijo","Pão","Bolo",
"Biscoito","Chocolate","Sorvete","Doce","Pipoca","Hambúrguer","Batata","Salgado","Coxinha","Pastel",
"Água","Suco","Refrigerante","Café","Chá","Leite","Vitamina","Iogurte","Cerveja","Vinho",
"Sol","Lua","Estrela","Nuvem","Chuva","Vento","Neve","Raio","Arco-íris","Calor",
"Frio","Verão","Inverno","Outono","Primavera","Manhã","Tarde","Noite","Dia","Semana",
"Mês","Ano","Tempo","Relógio","Calendário","Mapa","Bússola","Estrada","Ponte","Túnel",
"Cidade","Bairro","Rua","Avenida","Rodovia","Praia","Ilha","Montanha","Floresta","Deserto",
"Rio","Lago","Mar","Oceano","Cachoeira","Vulcão","Campo","Fazenda","Sítio","Bosque",
"Polícia","Bombeiro","Médico","Enfermeiro","Professor","Aluno","Motorista","Piloto","Pescador","Cozinheiro",
"Garçom","Ator","Cantor","Jogador","Juiz","Repórter","Fotógrafo","Artista","Pintor","Músico",
"Violão","Guitarra","Piano","Teclado","Bateria","Flauta","Microfone","Fone","Caixa","Som",
"Jogo","Brinquedo","Boneca","Carrinho","Bola","Dado","Cartas","Dominó","Quebra-cabeça","Tabuleiro",
"Festa","Aniversário","Casamento","Show","Evento","Reunião","Viagem","Passeio","Férias","Descanso",
"Amigo","Família","Pai","Mãe","Filho","Filha","Irmão","Irmã","Avô","Avó",
"Tio","Tia","Primo","Prima","Vizinho","Colega","Chefe","Equipe","Grupo","Pessoa",
"Cor","Forma","Tamanho","Peso","Altura","Número","Nome","Som","Imagem","Sinal",
"Fogo","Água","Terra","Ar","Luz","Sombra","Energia","Força","Velocidade","Movimento",
"Alegria","Tristeza","Medo","Raiva","Surpresa","Calma","Sono","Fome","Sede","Cansaço",
"Vitória","Derrota","Empate","Meta","Objetivo","Plano","Ideia","Projeto","Missão","Desafio",
"Segredo","Mistério","Impostor","Tripulante","Suspeito","Alvo","Voto","Reunião","Alarme","Botão"
];

let palavrasDisponiveis = [...palavras];
function sortearPalavra() {
  if (palavrasDisponiveis.length === 0) {
    palavrasDisponiveis = [...palavras];
  }

  const index = Math.floor(Math.random() * palavrasDisponiveis.length);
  return palavrasDisponiveis.splice(index, 1)[0];
}

function iniciar() {
  totalJogadores = Number(numJogadores.value);
  tempoConfigurado = Number(tempoInput.value);

  if (totalJogadores < 3 || tempoConfigurado < 10) {
    alert("Valores inválidos.");
    return;
  }

  jogadorAtual = 1;
  impostor = Math.floor(Math.random() * totalJogadores) + 1;
  palavraSecreta = sortearPalavra();

  menu.classList.add("hidden");
  telaJogador.classList.remove("hidden");
  areaVotacao.classList.add("hidden");

  prepararTela();
}

function prepararTela() {
  estado = "oculto";
  tituloJogador.innerText = `Passe para o Jogador ${jogadorAtual}`;
  mensagem.innerText = "👆 Toque para revelar";
}

function clicarTela() {
  if (estado === "oculto") {
    tituloJogador.innerText = `Jogador ${jogadorAtual}`;
    mensagem.innerText =
      jogadorAtual === impostor
        ? "😈 VOCÊ É O IMPOSTOR!"
        : `✅ Palavra chave:\n"${palavraSecreta}"`;
    estado = "revelado";
    return;
  }

  if (estado === "revelado") {
    if (jogadorAtual === totalJogadores) iniciarVotacao();
    else {
      jogadorAtual++;
      prepararTela();
    }
  }
}

function iniciarVotacao() {
  estado = "votacao";
  tituloJogador.innerText = "🗳️ Hora de votar";
  mensagem.innerText = "";
  areaVotacao.classList.remove("hidden");

  tempo = tempoConfigurado;
  pausado = false;
  tempoFinalizado = false;

  timer.innerText = `⏱️ ${tempo}`;
  botaoVotacao.innerText = "Mais uma rodada";

  iniciarContagem();
}

function iniciarContagem() {
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    if (pausado || tempoFinalizado) return;

    tempo--;
    timer.innerText = `⏱️ ${tempo}`;

    if (tempo <= 0) {
      clearInterval(intervalo);
      tempoFinalizado = true;
      timer.innerText = "⏰ Tempo esgotado";
      botaoVotacao.innerText = "Iniciar jogo";
    }
  }, 1000);
}

function acaoBotao() {
  if (tempoFinalizado) {
    location.reload();
    return;
  }

  pausado = !pausado;

 
  if (pausado) {
    botaoVotacao.innerText = "Continuar a votação";
    botaoVotacao.classList.add("botao-azul");
  } else {
    botaoVotacao.innerText = "Mais uma rodada";
    botaoVotacao.classList.remove("botao-azul");
  }
}
