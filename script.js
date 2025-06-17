let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const userForm = document.getElementById("userForm");
const loginInput = document.getElementById("login");
const senhaInput = document.getElementById("senha");
const userList = document.getElementById("userList");
const editIndexInput = document.getElementById("editIndex");

function renderUsuarios() {
  userList.innerHTML = "";
  usuarios.forEach((usuario, index) => {
    userList.innerHTML += `
      <tr>
        <td>${usuario.login}</td>
        <td>
          <button onclick="editarUsuario(${index})">Editar</button>
          <button onclick="removerUsuario(${index})">Remover</button>
        </td>
      </tr>
    `;
  });
}

function salvarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const login = loginInput.value.trim();
  const senha = senhaInput.value.trim();
  const editIndex = editIndexInput.value;

  if (editIndex !== "") {
    usuarios[editIndex] = { login, senha };
    editIndexInput.value = "";
  } else {
    if (usuarios.some(u => u.login === login)) {
      alert("Esse login já existe!");
      return;
    }
    usuarios.push({ login, senha });
  }

  salvarUsuarios();
  renderUsuarios();
  userForm.reset();
});

function editarUsuario(index) {
  const usuario = usuarios[index];
  loginInput.value = usuario.login;
  senhaInput.value = usuario.senha;
  editIndexInput.value = index;
}

function removerUsuario(index) {
  if (confirm("Deseja remover este usuário?")) {
    usuarios.splice(index, 1);
    salvarUsuarios();
    renderUsuarios();
  }
}

// Chamada inicial para mostrar os usuários salvos
renderUsuarios();
