// Quando a página carrega, busco as tarefas salvas no navegador e mostro na tabela
window.onload = function () {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach(tarefa => mostrarNaTabela(tarefa));
};

// Essa função é chamada quando clicamos no botão "Adicionar"
window.adicionarTarefa = function () {
  // Pegando o valor digitado no campo de tarefa
  const nome = document.getElementById('novaTarefa').value.trim();
  // Pegando a prioridade selecionada
  const prioridade = document.getElementById('prioridadeTarefa').value;

  // Verifica se o usuário preencheu os dois campos
  if (!nome || !prioridade) {
    alert('Preencha a tarefa e selecione a prioridade!');
    return;
  }

  // Cria um objeto com as informações da nova tarefa
  const novaTarefa = { nome, prioridade };

  // Mostra essa tarefa na tabela
  mostrarNaTabela(novaTarefa);

  // Salva essa tarefa no localStorage para manter ao recarregar
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  // Limpa os campos do formulário
  document.getElementById('novaTarefa').value = '';
  document.getElementById('prioridadeTarefa').selectedIndex = 0;
};

// Função que exibe a tarefa na tabela
function mostrarNaTabela(tarefa) {
  const tabela = document.getElementById('tabelaTarefas');
  const novaLinha = document.createElement('tr');

  // Coluna com o nome da tarefa
  const colunaTarefa = document.createElement('td');
  colunaTarefa.innerText = tarefa.nome;

  // Coluna com a prioridade (e a classe de cor certa)
  const colunaPrioridade = document.createElement('td');
  const prioridadeClass = `priority-${tarefa.prioridade.toLowerCase()}`;
  colunaPrioridade.innerHTML = `<span class="${prioridadeClass}">${tarefa.prioridade}</span>`;

  // Coluna com o botão "Concluir"
  const colunaAcao = document.createElement('td');
  const botao = document.createElement('button');
  botao.className = 'btn btn-success';
  botao.innerText = 'Concluir';

  // Quando clicar em "Concluir", remove da tabela e do localStorage
  botao.onclick = function () {
    novaLinha.remove();
    removerTarefa(tarefa);
  };
  colunaAcao.appendChild(botao);

  // Junta as colunas e adiciona na tabela
  novaLinha.appendChild(colunaTarefa);
  novaLinha.appendChild(colunaPrioridade);
  novaLinha.appendChild(colunaAcao);
  tabela.appendChild(novaLinha);
}

// Função que remove a tarefa do localStorage (além da tabela)
function removerTarefa(tarefaRemover) {
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  // Remove a tarefa que tiver o mesmo nome e prioridade
  tarefas = tarefas.filter(tarefa => !(tarefa.nome === tarefaRemover.nome && tarefa.prioridade === tarefaRemover.prioridade));
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
