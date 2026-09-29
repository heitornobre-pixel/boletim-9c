/* =========================================================
   BOLETIM DIGITAL — 9º ANO
   Dados fictícios apenas para demonstração.
   ========================================================= */

/* ---------------------------------------------------------
   DADOS BRUTOS
   ---------------------------------------------------------
   - "array"  = lista ( [ ... ] )
   - "objeto" = conjunto de informações ( { chave: valor } )
   Cada item da lista é uma disciplina com 3 notas e 3 faltas.
   --------------------------------------------------------- */
const disciplinas = [
  { disciplina: "Língua Portuguesa",                       tri1: 78,   tri2: "8,2", tri3: 8.6,  faltas: [2, 2, 1] },
  { disciplina: "Matemática",                              tri1: 55,   tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências",                                tri1: 84,   tri2: 7.9,   tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História",                                tri1: "7,1", tri2: 82,   tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia",                               tri1: 69,   tri2: "7,5", tri3: 7.8,  faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa",                          tri1: 88,   tri2: 8.4,   tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte",                                    tri1: "9,2", tri2: 87,   tri3: 9.0,  faltas: [1, 1, 0] },
  { disciplina: "Educação Física",                         tri1: 96,   tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital",                        tri1: 91,   tri2: 8.9,   tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira",                     tri1: 76,   tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática",                 tri1: 58,   tri2: "5,9", tri3: 6.2,  faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa",  tri1: 72,   tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico",                       tri1: 49,   tri2: 5.5,   tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento",             tri1: "8,0", tri2: 84,   tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais",                  tri1: 64,   tri2: "6,6", tri3: 7.0,  faltas: [1, 1, 1] }
];

/* ---------------------------------------------------------
   FUNÇÃO: normalizarNota(valor)
   ---------------------------------------------------------
   Regras:
   - vazio / null / undefined  -> null (ainda não lançada)
   - entre 0 e 10              -> permanece igual
   - maior que 10 até 100      -> divide por 10 (ex: 89 -> 8.9)
   - aceita ponto ou vírgula   (ex: "8,5" -> 8.5)
   - valores inválidos         -> null (não entram na média)
   --------------------------------------------------------- */
function normalizarNota(valor) {
  // 1) Sem valor = ainda não lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // 2) Se for texto, troca vírgula por ponto
  if (typeof valor === "string") {
    valor = valor.trim().replace(",", ".");
  }

  // 3) Converte para número
  const numero = Number(valor);

  // 4) Se não for número válido, ignora
  if (isNaN(numero)) {
    return null;
  }

  // 5) Entre 0 e 10: permanece igual
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // 6) Maior que 10 e até 100: divide por 10
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // 7) Fora das regras: inválido
  return null;
}

/* ---------------------------------------------------------
   FUNÇÃO: formatarNota(nota)
   Mostra com uma casa decimal usando vírgula.
   Se a nota for null, mostra "Ainda não lançada".
   --------------------------------------------------------- */
function formatarNota(nota) {
  if (nota === null) return "Ainda não lançada";
  return nota.toFixed(1).replace(".", ",");
}

/* ---------------------------------------------------------
   FUNÇÃO: calcularMedia(notas)
   Média apenas das notas válidas (ignora null).
   Se não houver nenhuma nota válida, retorna null.
   --------------------------------------------------------- */
function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  if (validas.length === 0) return null;

  let soma = 0;
  validas.forEach(function (n) {
    soma += n;
  });

  return soma / validas.length;
}

/* ---------------------------------------------------------
   FUNÇÃO: somarFaltas(lista)
   Soma todos os números de um array de faltas.
   --------------------------------------------------------- */
function somarFaltas(lista) {
  let total = 0;
  lista.forEach(function (n) {
    total += n;
  });
  return total;
}

/* ---------------------------------------------------------
   FUNÇÃO: definirSituacao(media)
   - média >= 6,0  -> "Bom desempenho"
   - média < 6,0   -> "Atenção"
   - sem média     -> "Nota ainda não disponível"
   --------------------------------------------------------- */
function definirSituacao(media) {
  if (media === null) return "Nota ainda não disponível";
  if (media >= 6) return "Bom desempenho";
  return "Atenção";
}

/* ---------------------------------------------------------
   FUNÇÃO: classeDaSituacao(situacao)
   Devolve a classe CSS correspondente, para colorir a célula.
   --------------------------------------------------------- */
function classeDaSituacao(situacao) {
  if (situacao === "Bom desempenho") return "situacao-bom";
  if (situacao === "Atenção") return "situacao-atencao";
  return "situacao-neutra";
}

/* =========================================================
   MONTAGEM DA TABELA
   O DOM é a forma como o JavaScript acessa o HTML.
   Aqui pegamos o <tbody id="corpo-tabela"> e criamos as linhas.
   ========================================================= */
const corpoTabela = document.getElementById("corpo-tabela");

// Variáveis auxiliares para os cards de resumo
let somaMedias = 0;      // soma das médias (só das disciplinas com nota)
let qtdMedias = 0;       // quantas médias existem
let totalFaltasGeral = 0;
let qtdBom = 0;
let qtdAtencao = 0;

// forEach percorre cada disciplina do array
disciplinas.forEach(function (d) {
  // Normaliza as três notas
  const n1 = normalizarNota(d.tri1);
  const n2 = normalizarNota(d.tri2);
  const n3 = normalizarNota(d.tri3);

  // Média apenas com as notas disponíveis
  const media = calcularMedia([n1, n2, n3]);

  // Situação da disciplina
  const situacao = definirSituacao(media);

  // Faltas somadas
  const faltas = somarFaltas(d.faltas);

  // Acumula valores para os cards
  if (media !== null) {
    somaMedias += media;
    qtdMedias++;
  }
  totalFaltasGeral += faltas;
  if (situacao === "Bom desempenho") qtdBom++;
  if (situacao === "Atenção") qtdAtencao++;

  // Cria uma linha <tr> na tabela
  const linha = document.createElement("tr");
  linha.innerHTML =
    "<td>" + d.disciplina + "</td>" +
    "<td>" + formatarNota(n1) + "</td>" +
    "<td>" + formatarNota(n2) + "</td>" +
    "<td>" + formatarNota(n3) + "</td>" +
    "<td>" + (media !== null ? formatarNota(media) : "—") + "</td>" +
    "<td>" + faltas + "</td>" +
    "<td class='" + classeDaSituacao(situacao) + "'>" + situacao + "</td>";

  corpoTabela.appendChild(linha);
});

/* =========================================================
   PREENCHIMENTO DOS CARDS DE RESUMO
   ========================================================= */

// Média geral = média das médias disponíveis
let mediaGeral = null;
if (qtdMedias > 0) {
  mediaGeral = somaMedias / qtdMedias;
}

document.getElementById("media-geral").textContent =
  mediaGeral !== null ? formatarNota(mediaGeral) : "—";

document.getElementById("total-faltas").textContent = totalFaltasGeral;
document.getElementById("total-bom").textContent = qtdBom;
document.getElementById("total-atencao").textContent = qtdAtencao;

/* ---------------------------------------------------------
   FREQUÊNCIA — APENAS DEMONSTRATIVA
   ---------------------------------------------------------
   Este valor de 92% é FICTÍCIO, só para demonstração.
   Ele NÃO é calculado a partir das faltas.
   No futuro, a frequência será tratada de outra forma.
   --------------------------------------------------------- */
const frequenciaDemo = 92;
document.getElementById("frequencia").textContent =
  frequenciaDemo + "% (Frequência adequada)";