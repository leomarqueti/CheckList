const formulario = document.getElementById('formulario-lista-verificacao');
const divRelatorio = document.getElementById('relatorio');
const botaoImprimir = document.getElementById('botao-imprimir');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const relatorio = {};
  const dadosFormulario = new FormData(formulario);

  for (const [chave, valor] of dadosFormulario.entries()) {
    relatorio[chave] = valor;
  }

  let htmlRelatorio = '<h2>Relatório</h2>';
  htmlRelatorio += '<table>';
  htmlRelatorio += '<tr><th>Item</th><th>Status</th></tr>';
  let i = 1;
  for (const chave in relatorio) {
    let status;
    if (relatorio[chave] === 'ok') {
      status = 'ok';
    } else if (relatorio[chave].includes('baixo')) {
      status = 'warning';
    } else {
      status = 'error';
    }
    htmlRelatorio += `<tr><td>${i}</td><td class="status ${status}">${chave}: ${relatorio[chave]}</td></tr>`;
    i++;
  }
  htmlRelatorio += '</table>';

  divRelatorio.innerHTML = htmlRelatorio;
});

botaoImprimir.addEventListener('click', () => {
  const htmlRelatorio = document.getElementById('relatorio').innerHTML;

  const janelaImprimir = window.open('', '_blank');
  janelaImprimir.document.write(`
    <html>
      <head>
        <title>Relatório da Lista de Verificação do Veículo</title>
        <style>
          /* adicione qualquer estilo necessário aqui */
          table {
            border-collapse: collapse;
          }
          td, th {
            border: 1px solid #ccc;
            padding: 0.5em;
          }
          .ok {
            color: green;
          }
          .warning {
            color: orange;
          }
          .error {
            color: red;
          }
        </style>
      </head>
      <body>
        ${htmlRelatorio}
      </body>
    </html>
  `);
  janelaImprimir.document.close();
  janelaImprimir.focus();

janelaImprimir.print();
janelaImprimir.close();
});

document.body.classList.add('dark-mode');

const btnDarkMode = document.getElementById('btn-dark-mode');
btnDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    btnDarkMode.textContent = 'Modo claro';
  } else {
    btnDarkMode.textContent = 'Modo escuro';
  }
});