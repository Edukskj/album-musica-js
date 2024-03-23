// Add LocalStorage

let userData = [];
let albumStorage = "albuns";
let data = localStorage.getItem(albumStorage);

if (JSON.parse(data) != null) {
  userData = JSON.parse(data);
}

// Refresh Data (storage)

window.onstorage = () => {
  window.localStorage.getItem(albumStorage);
  data = localStorage.getItem(albumStorage);
  userData = JSON.parse(data);
  atualizaListaDeAlbuns();
}

// Functions

function organizaEmLinhasEColunas(albuns) {
  const numeroDeColunas = 999
  const numeroDeLinhas = Math.ceil(albuns.length / numeroDeColunas)

  let linhas = new Array(numeroDeLinhas)

  let indiceAlbuns = 0;

  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas[i] = new Array(numeroDeColunas)

    for (let j = 0; j < numeroDeColunas; j++) {
      if (indiceAlbuns < albuns.length) {
        linhas[i][j] = albuns[indiceAlbuns++]
      }
    }
  }

  return linhas
};

function criaCardHtmlParaAlbum(album) {
  return `
  <div class="card col-4">
    <a href="${album.link}" target="_blank">
      <img class="card-img-top"
        src="${album.imagem_da_capa_do_album}"
      alt="">
    </a>
    <div class="card-body">
      <h5 class="card-title">${album.nome_do_album}</h5>
      <p class="card-text">${album.nome_da_banda} - <b>${album.ano_do_album}</b></p>
    </div>
  </div>
  `
};

function criaLinhaDeAlbuns(uma_linha) {
  const div = document.createElement("div")
  div.classList.add("row")
  div.innerHTML = uma_linha.map(coluna => criaCardHtmlParaAlbum(coluna)).join("\n")
  return div
};

function criaListaDeAlbuns(linhas) {
  const div = document.createElement("div")
  div.classList.add("col-lg-12", "px-0", "container")
  div.setAttribute("id", "album-list")

  linhas.forEach(linha => {
    div.appendChild(criaLinhaDeAlbuns(linha))
  });

  return div
};

function atualizaListaDeAlbuns() {
  const listaDeAlbuns = document.getElementById("album-list")
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(userData)))
};

function randomizacao() {
  const listaDeAlbuns = document.getElementById("album-list")
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(userData.sort(() => Math.random() - 0.5))))
};

// Search Input

const searchInput = document.getElementById("searchInput");
const albumNames = document.getElementsByClassName("card-title");

searchInput.addEventListener("keyup", (event) => {
  const { value } = event.target;
  
  // get user search input converted to lowercase
  const searchQuery = value.toLowerCase();
  
  for (const nameElement of albumNames) {
      // store name text and convert to lowercase
      let name = nameElement.textContent.toLowerCase();
      
      // compare current name to search input
      if (name.includes(searchQuery)) {
          // found name matching search, display it
          nameElement.parentElement.parentElement.style.display = "block";
      } else {
          // no match, don't display name
          nameElement.parentElement.parentElement.style.display = "none";
      }
  }
});

// Album form

function show() {
  document.getElementById("albuns").style.display = "none";
  document.getElementById("form").style.display = "";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("back").style.display = "";
}

function voltar() {
  document.getElementById("albuns").style.display = "";
  document.getElementById("form").style.display = "none";
  document.getElementById("buttons").style.display = "";
  document.getElementById("back").style.display = "none";
}

function adicionar() {
  let loginForm = document.getElementById("addForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let nome_do_album = document.getElementById("nome_do_album");
    let nome_da_banda = document.getElementById("nome_da_banda");
    let ano_do_album = document.getElementById("ano_do_album");
    let imagem_da_capa_do_album = document.getElementById("imagem_da_capa_do_album");
    let link = document.getElementById("link");

    if (nome_do_album.value !== "" && nome_da_banda.value !== "" && ano_do_album.value !== "" && imagem_da_capa_do_album !== "" && link.value !== "") {

      userData.push({
        "nome_do_album": `${nome_do_album.value}`,
        "nome_da_banda": `${nome_da_banda.value}`,
        "ano_do_album": `${ano_do_album.value}`,
        "imagem_da_capa_do_album": `${imagem_da_capa_do_album.value}`,
        "link": `${link.value}`
      });
      localStorage.setItem(albumStorage,JSON.stringify(userData));

      document.getElementById("albuns").style.display = "";
      document.getElementById("form").style.display = "none";
      document.getElementById("buttons").style.display = "";
      document.getElementById("back").style.display = "none";

      alert("Álbum inserido com sucesso!");
      atualizaListaDeAlbuns();

      document.getElementById('nome_do_album').value='';
      document.getElementById('nome_da_banda').value='';
      document.getElementById('ano_do_album').value='';
      document.getElementById('imagem_da_capa_do_album').value='';
      document.getElementById('link').value='';
    } else {
      alert("Insira todas as informações!");
    } 
  });
}

adicionar();
atualizaListaDeAlbuns();