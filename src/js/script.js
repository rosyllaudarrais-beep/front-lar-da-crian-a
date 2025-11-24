// Botões e telas
const botaoProsseguir = document.getElementById('botaoProsseguir');
const botaoRetornar = document.getElementById('botaoRetornar');

const telaAgendamento = document.getElementById('tela-agendamento');
const telaConcluido = document.getElementById('tela-concluido');

// Animação: ao clicar em "Prosseguir"
botaoProsseguir.addEventListener('click', () => {
    // Tenta salvar os dados. A animação e troca de tela só ocorrem
    // se a validação (salvarDadosAgendamento) for TRUE.
    if (salvarDadosAgendamento()) {
        
        // 🚨 CORREÇÃO ESSENCIAL: CHAME A FUNÇÃO AQUI!
        exibirDadosNaTela2(); 
        
        // Inicia a animação de saída da tela de agendamento
        telaAgendamento.classList.add('sair-esquerda');
        // Prepara a tela de conclusão para entrar
        telaConcluido.classList.add('entrar-direita', 'ativa');

        // Remove classes depois da animação (para resetar)
        setTimeout(() => {
            telaAgendamento.classList.remove('ativa', 'sair-esquerda');
            telaConcluido.classList.remove('entrar-direita');
        }, 500);

    }
});
/*botaoProsseguir.addEventListener('click', () => {
    telaAgendamento.classList.add('sair-esquerda');
    telaConcluido.classList.add('entrar-direita', 'ativa');

    // Remove classes depois da animação (para resetar)
    setTimeout(() => {
        telaAgendamento.classList.remove('ativa', 'sair-esquerda');
        telaConcluido.classList.remove('entrar-direita');
    }, 500);
});*/

// Animação: ao clicar em "Retornar ao início"
botaoRetornar.addEventListener('click', () => {
    telaConcluido.classList.add('sair-direita');
    telaAgendamento.classList.add('entrar-esquerda', 'ativa');

    setTimeout(() => {
        telaConcluido.classList.remove('ativa', 'sair-direita');
        telaAgendamento.classList.remove('entrar-esquerda');
        document.querySelector('.formulario').reset(); // limpa o form
    }, 500);
});

// -------------------------
//   MÁSCARA DO CPF
// -------------------------
document.addEventListener("DOMContentLoaded", () => {

  const inputCpf = document.getElementById("cpf");
  const inputTelefone = document.getElementById("telefone");

  // -------- CPF ----------
  if (inputCpf) {
    inputCpf.addEventListener("keyup", () => {
      let v = inputCpf.value.replace(/\D/g, "");

      if (v.length > 11) v = v.slice(0, 11);

      if (v.length > 9) {
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      } else if (v.length > 6) {
        v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
      } else if (v.length > 3) {
        v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      }

      inputCpf.value = v;
    });
  }

  // -------- TELEFONE ----------
  if (inputTelefone) {
    inputTelefone.addEventListener("keyup", () => {
      let v = inputTelefone.value.replace(/\D/g, "");

      if (v.length > 11) v = v.slice(0, 11);

      if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
      } else if (v.length > 3) {
        v = v.replace(/(\d{2})(\d{1})(\d{0,4})/, "($1) $2 $3");
      } else if (v.length > 1) {
        v = v.replace(/(\d{2})(\d{0,1})/, "($1) $2");
      }

      inputTelefone.value = v;
    });
  }

});



/**
 * Coleta os dados do formulário, salva no localStorage e valida o preenchimento básico.
 * @returns {boolean} True se os dados foram salvos com sucesso, False caso contrário.
 */
function salvarDadosAgendamento() {
    // 1. Coletar os valores dos campos
    const dadosAgendamento = {
        nome: document.getElementById('nome').value,
        instituicao: document.getElementById('instituicao').value,
        cpf: document.getElementById('cpf').value,
        funcao: document.getElementById('funcao').value,
        data: document.getElementById('data').value,
        contato: document.getElementById('telefone').value, // ID do seu input
        motivo: document.getElementById('motivo').value,
        timestamp: new Date().toISOString()
    };

    // Validação Básica: Impede o salvamento se campos essenciais estiverem vazios
    if (!dadosAgendamento.nome || !dadosAgendamento.data || !dadosAgendamento.motivo) {
        alert('Por favor, preencha o Nome, a Data e o Motivo da Doação para prosseguir.');
        return false;
    }

    // 2. Converte o objeto JavaScript para uma string JSON
    const dadosJSON = JSON.stringify(dadosAgendamento);

    // 3. Armazena a string no localStorage
    localStorage.setItem('ultimoAgendamentoDoacao', dadosJSON);

    console.log('Dados do agendamento salvos localmente:', dadosAgendamento);
    return true;
}


// Função no seu script.js

function exibirDadosNaTela2() {
    const dadosJSON = localStorage.getItem('ultimoAgendamentoDoacao');
    
    if (dadosJSON) {
        const dados = JSON.parse(dadosJSON);
        
        document.getElementById('resumo-nome').textContent = dados.nome || 'Não informado';
        document.getElementById('resumo-instituicao').textContent = dados.instituicao || 'Não informado';
        document.getElementById('resumo-cpf').textContent = dados.cpf || 'Não informado';
        // 🚨 Certifique-se de que este campo exista no seu HTML e na função de salvamento
        document.getElementById('resumo-funcao').textContent = dados.funcao || 'Não informado'; 
        document.getElementById('resumo-data').textContent = dados.data || 'Não informado';
        document.getElementById('resumo-contato').textContent = dados.contato || 'Não informado';
        document.getElementById('resumo-motivo').textContent = dados.motivo || 'Não informado';
    } 
}

//---------------------------------------------------------