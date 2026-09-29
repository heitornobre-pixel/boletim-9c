/* =========================================================
   BOLETIM DIGITAL — 9º ANO
   Dados fictícios apenas para demonstração.
   ========================================================= */

/* -------- DADOS BRUTOS (fictícios) -------- */
// "array" = lista. Cada item é um "objeto" com informações da disciplina.
const disciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

/* -------- FUNÇÃO: normalizarNota --------
   Recebe qualquer valor e devolve a nota na escala 0–10.
   Retorna null quando a nota ainda não foi lançada. */
function normalizarNota(valor) {
  // vazio, null ou undefined = ainda não lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Se for texto, troca vírgula por ponto (ex: "8,5" -> "8.5")
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  // Converte para número
  const numero = Number(valor);

  // Se não for um número válido, ignora
  if (isNaN(numero)) {
    return null;
  }

  // Entre 0 e 10 -> permanece igual
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // Maior que 10 e até 100 -> divide por 10 (ex: 89 -> 8.9 / 100 -> 10)
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Fora das regras -> inválido
  return null;
}

/* -------- FUNÇÃO: formatarNota --------
   Mostra a nota com uma casa decimal ou o aviso de "não lançada". */
function formatarNota(nota) {
  if (nota === null) return "Ainda não lançada";
  return nota.toFixed(1).replace(".", ",");
}

/* -------- FUNÇÃO: calcularMedia --------
   Média das notas que existem (ignora as ausentes). */
function calcularMedia(notas) {
  // Filtra só as notas válidas (não nulas)
  const validas = notas.filter((n) => n !== null);

  // Se não há nenhuma nota válida, retorna null
  if (validas.length === 0) return null;

  // Soma tudo e divide pela quantidade
  const soma = validas.reduce((acc, n) => acc + n, 0);
  return soma / validas.length;
}

/* -------- FUNÇÃO: somarFaltas --------
   Soma um array de faltas. */
function somarFaltas(lista) {
  return lista.reduce((acc, n) => acc + n, 0);
}

/* -------- FUNÇÃO: definirSituacao --------
   Regra:
   - Média >= 6 -> "Bom desempenho"
   - Média < 6  -> "Atenção"
   - Sem média  -> "Nota ainda não disponível" */
function definirSituacao(media) {
  if (media === null) return "Nota ainda não disponível";
  if (media >= 6) return "Bom desempenho";
  return "Atenção";
}

/* -------- FUNÇÃO: corDaSituacao --------
   Devolve a classe CSS certa para pintar a coluna "Situação". */
function corDaSituacao(situacao) {
  if (situacao === "Bom desempenho") return "situacao-bom";
  if (situacao === "Atenção") return "situacao-atencao";
  return "situacao-neutra";
}

/* =========================================================
   MONTAGEM DA TABELA
   O "DOM" é a representação da página HTML no JavaScript.
   Aqui pegamos o <tbody id="corpo-tabela"> e criamos as linhas.
   ========================================================= */
const corpoTabela = document.getElementById("corpo-tabela");

// Variáveis auxiliares para os cards de resumo
let somaMedias = 0;
let qtdMedias = 0;
let totalFaltasGeral = 0;
let qtdBom = 0;
let qtdAtencao = 0;

// "forEach" = percorre cada item do array
disciplinas.forEach((d) => {
  // Normaliza as três notas
  const n1 = normalizarNota(d.tri1);
  const n2 = normalizarNota(d.tri2);
  const n3 = normalizarNota(d.tri3);

  // Média só com as notas que existem
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

  // Cria uma linha <tr> da tabela
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${d.disciplina}</td>
    <td>${formatarNota(n1)}</td>
    <td>${formatarNota(n2)}</td>
    <td>${formatarNota(n3)}</td>
    <td>${media !== null ? formatarNota(media) : "—"}</td>
    <td>${faltas}</td>
    <td class="${corDaSituacao(situacao)}">${situacao}</td>
  `;
  corpoTabela.appendChild(linha);
});

/* =========================================================
   PREENCHIMENTO DOS CARDS DE RESUMO
   ========================================================= */

// Média geral = média das médias já disponíveis
const mediaGeral = qtdMedias > 0 ? somaMedias / qtdMedias : null;
document.getElementById("media-geral").textContent =
  mediaGeral !== null ? formatarNota(mediaGeral) : "—";

// Total de faltas
document.getElementById("total-faltas").textContent = totalFaltasGeral;

// Disciplinas com bom desempenho
document.getElementById("total-bom").textContent = qtdBom;

// Disciplinas que precisam de atenção
document.getElementById("total-atencao").textContent = qtdAtencao;

/* -------- FREQUÊNCIA (APENAS DEMONSTRATIVA) --------
   ATENÇÃO: este valor de 92% é FICTÍCIO e serve só para
   demonstração nesta primeira versão. Ele NÃO é calculado
   a partir das faltas. No futuro, será tratado de outra forma. */
const frequenciaDemo = 92;
document.getElementById("frequencia").textContent = `${frequenciaDemo}% (Frequência adequada)`;
