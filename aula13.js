const nome = document.querySelector("#nome");
const usuario = document.querySelector("#usuario");
const senha = document.querySelector("#senha");
const email = document.querySelector("#email");
const nascimento = document.querySelector("#nascimento");

const erro_nome = document.querySelector("#erro-nome");
const erro_usuario = document.querySelector("#erro-usuario");
const erro_senha = document.querySelector("#erro-senha");
const erro_email = document.querySelector("#erro-email");
const erro_nascimento = document.querySelector("#erro-nascimento");
const mensagem_final = document.querySelector("#mensagem-final");

function limparMensagens() {
  erro_nome.textContent = "";
  erro_usuario.textContent = "";
  erro_senha.textContent = "";
  erro_email.textContent = "";
  erro_nascimento.textContent = "";
  mensagem_final.textContent = "";
}

function calcularIdade(dataNasc) {
  const hoje = new Date();
  const nascimento = new Date(dataNasc);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

function cadastrarUsuario() {
  limparMensagens();

  try {
    if (nome.value.trim() === "") {
      throw { campo: "nome", mensagem: "Preencha o nome." };
    }

    if (usuario.value.trim() === "") {
      throw { campo: "usuario", mensagem: "Preencha o usuário." };
    }

    if (senha.value.length < 6) {
      throw { campo: "senha", mensagem: "A senha precisa ter pelo menos 6 caracteres." };
    }

    if (!email.value.includes("@")) {
      throw { campo: "email", mensagem: "Email inválido." };
    }

    if (!nascimento.value) {
      throw { campo: "nascimento", mensagem: "Informe a data de nascimento." };
    }

    const idade = calcularIdade(nascimento.value);
    if (idade < 18) {
      throw { campo: "nascimento", mensagem: "É necessário ter pelo menos 18 anos." };
    }

    mensagem_final.style.color = "green";
    mensagem_final.textContent = "Cadastro realizado com sucesso!";
  } catch (erro) {
    const campoErro = document.querySelector(`#erro-${erro.campo}`);
    if (campoErro) {
      campoErro.textContent = erro.mensagem;
    }
  }
}
