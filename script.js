/* =========================================================
   BOLETIM DIGITAL — 9º ANO
   ========================================================= */

const CONFIG_ALUNO = {
  turma: "9C",
  numeroChamada: 14,
  apiUrl: "https://boletim-api.profbt.com.br"
};

let pinSessao = "";

/* ---------------------------------------------------------
   DADOS BRUTOS LOCAIS (PADRÃO)
   --------------------------------------------------------- */
const disciplinasLocais = [
  { disciplina: "Língua Portuguesa",                      tri1: 78,   tri2: "8,2", tri3: 8.6,  faltas: [2, 2, 1] },
  { disciplina: "Matemática",                             tri1: 55,   tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências",                               tri1: 84,   tri2: 7.9,   tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História",                               tri1: "7,1", tri2: 82,   tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia",                              tri1: 69,   tri2: "7,5", tri3: 7.8,  faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa",                         tri1: 88,   tri2: 8.4,   tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte",                                   tri1: "9,2", tri2: 87,   tri3: 9.0,  faltas: [1, 1, 0] },
  { disciplina: "Educação Física",                        tri1: 96,   tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital",                       tri1: 91,   tri2: 8.9,   tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira",                    tri1: 76,   tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática",                tri1: 58,   tri2: "5,9", tri3: 6.2,  faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72,   tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico",                      tri1: 49,   tri2: 5.5,   tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento",            tri1: "8,0", tri2: 84,   tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais",                 tri1: 64,   tri2: "6,6", tri3: 7.0,  faltas: [1, 1, 1] }
];

let dadosAtuais = [];

/* ---------------------------------------------------------
   FUNÇÕES DE NORMALIZAÇÃO E CÁLCULO
   --------------------------------------------------------- */
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }
/* =========================================================
   BOLETIM DIGITAL — 9º ANO
   ========================================================= */

const CONFIG_ALUNO = {
  turma: "9C",
  numeroChamada: 14,
  apiUrl: "https://boletim-api.profbt.com.br"
};

let pinSessao = "";

/* ---------------------------------------------------------
   DADOS BRUTOS LOCAIS (PADRÃO)
   --------------------------------------------------------- */
const disciplinasLocais = [
  { disciplina: "Língua Portuguesa",                      tri1: 78,   tri2: "8,2", tri3: 8.6,  faltas: [2, 2, 1] },
  { disciplina: "Matemática",                             tri1: 55,   tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências",                               tri1: 84,   tri2: 7.9,   tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História",                               tri1: "7,1", tri2: 82,   tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia",                              tri1: 69,   tri2: "7,5", tri3: 7.8,  faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa",                         tri1: 88,   tri2: 8.4,   tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte",                                   tri1: "9,2", tri2: 87,   tri3: 9.0,  faltas: [1, 1, 0] },
  { disciplina: "Educação Física",                        tri1: 96,   tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital",                       tri1: 91,   tri2: 8.9,   tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira",                    tri1: 76,   tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática",                tri1: 58,   tri2: "5,9", tri3: 6.2,  faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72,   tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico",                      tri1: 49,   tri2: 5.5,   tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento",            tri1: "8,0", tri2: 84,   tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais",                 tri1: 64,   tri2: "6,6", tri3: 7.0,  faltas: [1, 1, 1] }
];

let dadosAtuais = [];

/* ---------------------------------------------------------
   FUNÇÕES DE NORMALIZAÇÃO E CÁLCULO
   --------------------------------------------------------- */
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  const numero = Number(valor);
  if (isNaN(numero)) {
    return null;
  }

  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  return null;
}

function formatarNota(nota) {
  if (nota === null) return "Ainda não lançada";
  return nota.toFixed(1).replace(".", ",");
}

function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  if (validas.length === 0) return null;

  let soma = 0;
  for (let i = 0; i < validas.length; i++) {
    soma += validas[i];
  }
  return soma / validas.length;
}

function somarFaltas(lista) {
  if (!Array.isArray(lista)) return 0;
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    const f = Number(lista[i]);
    if (!isNaN(f)) total += f;
  }
  return total;
}

function definirSituacao(media) {
  if (media === null) return "Nota ainda não disponível";
  if (media >= 6) return "Bom desempenho";
  return "Atenção";
}

function classeDaSituacao(situacao) {
  if (situacao === "Bom desempenho") return "situacao-bom";
  if (situacao === "Atenção") return "situacao-atencao";
  return "situacao-neutra";
}

/* ---------------------------------------------------------
   RENDERIZAÇÃO DA TELA
   --------------------------------------------------------- */
function renderizarBoletim(listaDisciplinas) {
  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = "";

  let somaMedias = 0;
  let qtdMedias = 0;
  let totalFaltasGeral = 0;
  let qtdBom = 0;
  let qtdAtencao = 0;

  listaDisciplinas.forEach(function (d) {
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const media = calcularMedia([n1, n2, n3]);
    const situacao = definirSituacao(media);
    const faltasArray = Array.isArray(d.faltas) ? d.faltas : [d.falta_tri1 || 0, d.falta_tri2 || 0, d.falta_tri3 || 0];
    const faltas = somarFaltas(faltasArray);

    if (media !== null) {
      somaMedias += media;
      qtdMedias++;
    }
    totalFaltasGeral += faltas;
    if (situacao === "Bom desempenho") qtdBom++;
    if (situacao === "Atenção") qtdAtencao++;

    const linha = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = d.disciplina;

    const tdTri1 = document.createElement("td");
    tdTri1.textContent = formatarNota(n1);

    const tdTri2 = document.createElement("td");
    tdTri2.textContent = formatarNota(n2);

    const tdTri3 = document.createElement("td");
    tdTri3.textContent = formatarNota(n3);

    const tdMedia = document.createElement("td");
    tdMedia.textContent = media !== null ? formatarNota(media) : "—";

    const tdFaltas = document.createElement("td");
    tdFaltas.textContent = faltas;

    const tdSit = document.createElement("td");
    tdSit.textContent = situacao;
    tdSit.className = classeDaSituacao(situacao);

    linha.appendChild(tdNome);
    linha.appendChild(tdTri1);
    linha.appendChild(tdTri2);
    linha.appendChild(tdTri3);
    linha.appendChild(tdMedia);
    linha.appendChild(tdFaltas);
    linha.appendChild(tdSit);

    corpoTabela.appendChild(linha);
  });

  let mediaGeral = null;
  if (qtdMedias > 0) {
    mediaGeral = somaMedias / qtdMedias;
  }

  document.getElementById("media-geral").textContent =
    mediaGeral !== null ? formatarNota(mediaGeral) : "—";

  document.getElementById("total-faltas").textContent = totalFaltasGeral;
  document.getElementById("total-bom").textContent = qtdBom;
  document.getElementById("total-atencao").textContent = qtdAtencao;

  const frequenciaDemo = 92;
  document.getElementById("frequencia").textContent =
    frequenciaDemo + "% (Frequência adequada)";
}

/* ---------------------------------------------------------
   CONEXÃO COM A API — ABRIR BOLETIM
   --------------------------------------------------------- */
async function abrirBoletim() {
  const inputPin = document.getElementById("input-pin");
  const msgPin = document.getElementById("msg-pin");
  const pinDigitado = inputPin.value.trim();

  if (!pinDigitado) {
    msgPin.textContent = "Por favor, digite o PIN.";
    msgPin.className = "msg-status msg-erro";
    return;
  }

  msgPin.textContent = "Conectando...";
  msgPin.className = "msg-status";

  try {
    const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/abrir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinDigitado
      })
    });

    if (resposta.status === 401) {
      msgPin.textContent = "Turma, chamada ou PIN inválidos.";
      msgPin.className = "msg-status msg-erro";
      return;
    }

    if (resposta.status === 429) {
      msgPin.textContent = "Muitas tentativas. Aguarde um minuto e tente novamente.";
      msgPin.className = "msg-status msg-erro";
      return;
    }

    if (!resposta.ok) {
      msgPin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
      msgPin.className = "msg-status msg-erro";
      return;
    }

    const resultado = await resposta.json();
    pinSessao = pinDigitado;
    inputPin.value = "";

    if (resultado.dados && Array.isArray(resultado.dados.disciplinas) && resultado.dados.disciplinas.length > 0) {
      dadosAtuais = resultado.dados.disciplinas;
    } else {
      dadosAtuais = JSON.parse(JSON.stringify(disciplinasLocais));
    }

    renderizarBoletim(dadosAtuais);
    document.getElementById("area-pin").style.display = "none";
    document.getElementById("conteudo-boletim").style.display = "block";

  } catch (erro) {
    msgPin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
    msgPin.className = "msg-status msg-erro";
  }
}

/* ---------------------------------------------------------
   SISTEMA DE EDIÇÃO E SALVAMENTO
   --------------------------------------------------------- */
function validarNotaDigitada(valor) {
  if (valor === "" || valor === null || valor === undefined) return true;
  const valStr = String(valor).replace(",", ".");
  const num = Number(valStr);
  if (isNaN(num)) return false;
  return num >= 0 && num <= 10;
}

function validarFaltaDigitada(valor) {
  if (valor === "" || valor === null || valor === undefined) return false;
  const num = Number(valor);
  return Number.isInteger(num) && num >= 0;
}

function parseNotaInput(valor) {
  if (valor === "" || valor === null || valor === undefined) return null;
  return Number(String(valor).replace(",", "."));
}

function abrirFormularioEdicao() {
  const container = document.getElementById("container-campos-edicao");
  container.innerHTML = "";

  dadosAtuais.forEach((d, idx) => {
    const item = document.createElement("div");
    item.className = "grid-edicao-item";

    const h3 = document.createElement("h3");
    h3.textContent = d.disciplina;
    item.appendChild(h3);

    const linha = document.createElement("div");
    linha.className = "campos-linha";
 }
      })
    });

    if
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const faltasArr = Array.isArray(d.faltas) ? d.faltas : [d.falta_tri1 || 0, d.falta_tri2 || 0, d.falta_tri3 || 0];

    linha.innerHTML = `
      <div class="campo-grupo">
        <label>Nota 1º Tri</label>
        <input type="text" id="edit-n1-${idx}" value="${n1 !== null ? n1 : ''}" />
      </div>
      <div class="campo-grupo">
        <label>Nota 2º Tri</label>
        <input type="text" id="edit-n2-${idx}" value="${n2 !== null ? n2 : ''}" />
      </div>
      <div class="campo-grupo">
        <label>Nota 3º Tri</label>
        <input type="text" id="edit-n3-${idx}" value="${n3 !== null ? n3 : ''}" />
      </div>
      <div class="campo-grupo">
        < }
      })
    });

    iflabel>Faltas 1º Tri</label>
        <input type="number" id="edit-f1-${idx}" value="${faltasArr[0] !== undefined ? faltasArr[0] : 0}" />
      </div>
      <div class="campo-grupo">
        <label>Faltas 2º Tri</label>
        <input type="number" id="edit-f2-${idx}" value="${faltasArr[1] !== undefined ? faltasArr[1] : 0}" />
      </div>
      <div class="campo-grupo">
        <label>Faltas 3º Tri</label>
        <input type="number" id="edit-f3-${idx}" value="${faltasArr[2] !== undefined ? faltasArr[2] : 0}" />
      </div>
    `;

    item.appendChild(linha);
    container.appendChild(item);
  });

  document.getElementById("area-edicao").style.display = "block";
  document.getElementById("area-edicao").scrollIntoView({ behavior: 'smooth' });
}

async fun }
      })
    });

    ifction salvarAlteracoes() {
  const msgSalvar = document.getElementById("msg-salvar");
  msgSalvar.textContent = "";

  let temErro = false;
  const novasDisciplinas = [];

  for (let i = 0; i < dadosAtuais.length; i++) {
    const inpN1 = document.getElementById(`edit-n1-${i}`);
    const inpN2 = document.getElementById(`edit-n2-${i}`);
    const inpN3 = document.getElementById(`edit-n3-${i}`);
    const inpF1 = document.getElementById(`edit-f1-${i}`);
    const inpF2 = document.getElementById(`edit-f2-${i}`);
    const inpF3 = document.getElementById(`edit-f3-${i}`);

    [inpN1, inpN2, inpN3, inpF1, inpF2, inpF3].forEach(el => el.classList.remove("campo-invalido"));

    const valN1 = inpN1.value.trim();
    const valN2 = inpN2.value.trim();
    const valN3 = inpN3.value.trim();
    const valF1 = inpF1.value.trim();
    const }
      })
    });

    if valF2 = inpF2.value.trim();
    const valF3 = inpF3.value.trim();

    if (!validarNotaDigitada(valN1)) { inpN1.classList.add("campo-invalido"); temErro = true; }
    if (!validarNotaDigitada(valN2)) { inpN2.classList.add("campo-invalido"); temErro = true; }
    if (!validarNotaDigitada(valN3)) { inpN3.classList.add("campo-invalido"); temErro = true; }

    if (!validarFaltaDigitada(valF1)) { inpF1.classList.add("campo-invalido"); temErro = true; }
    if (!validarFaltaDigitada(valF2)) { inpF2.classList.add("campo-invalido"); temErro = true; }
    if (!validarFaltaDigitada(valF3)) { inpF3.classList.add("campo-invalido"); temErro = true; }

    if (!temErro) {
      novasDisciplinas.push({
        d }
      })
    });

    ifisciplina: dadosAtuais[i].disciplina,
        tri1: parseNotaInput(valN1),
        tri2: parseNotaInput(valN2),
        tri3: parseNotaInput(valN3),
        faltas: [Number(valF1), Number(valF2), Number(valF3)]
      });
    } }
      })
    });

    if
  }

  if (temErro) {
    msgSalvar.textContent = "Corrija os campos destacados em vermelho.";
    msgSalvar.className = "msg-status msg-erro";
    return;
  }

  msgSalvar.textContent = "Salvando...";
  msgSalvar.className = "msg-status";

  try {
    const resposta = await fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/salvar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          }
      })
    });

    if disciplinas: novasDisciplinas
        }
      })
    });

    if (!resposta.ok) {
      msgSalvar.textContent = "Erro ao salvar alterações no servidor.";
      msgSalvar.className = "msg-status msg-erro";
      return;
    }

    dadosAtuais = novasDisciplinas;
    renderizarBoletim(dadosAtuais);

    msgSalvar.textContent = "Dados salvos com sucesso.";
    msgSalvar.className = "msg-status msg-sucesso";
    document.getElementById("area-edicao").style.display = "none";

  } catch (erro) {
    msgSa }
      })
    });

    iflvar.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
    msgSalvar.className = "msg-status msg-erro";
  }
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO E EVENTOS
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-entrar").addEventListener("click", abrirBoletim);
  document.getElementById("btn-alterar-dados").addEventListener("click", abrirFormularioEdicao);
  document.getElementById("btn-salvar-dados").addEventListener("click", salvarAlteracoes);
  document.getElementById("btn-cancelar-edicao").addEventListener("click", () => {
    document.getElementById("area-edicao").style.display = "none";
    document.getElementById("msg-salvar").textContent = "";
  });

  document.getElementById("input-pin").addEventListener("keypress", (e) => {
    if (e.key === "Enter") abrirBoletim();
  });
});
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  const numero = Number(valor);
  if (isNaN(numero)) {
    return null;
  }

  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  return null;
}

function formatarNota(nota) {
  if (nota === null) return "Ainda não lançada";
  return nota.toFixed(1).replace(".", ",");
}

function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  if (validas.length === 0) return null;

  let soma = 0;
  for (let i = 0; i < validas.