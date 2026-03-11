

const botao = document.querySelector(".myButton");


const gerarCodigo = () => {
  alert("Chamei a função gerarCodigo");
  
  const textoUsuario = document.querySelector(".wrapper").value
  console.log(textoUsuario);
}


const cliqueiNoBotao = () => {
  alert("Aperte um 'ok' para continuar");
};


if (botao) {

  botao.addEventListener("click", gerarCodigo);
  botao.addEventListener("click", cliqueiNoBotao);
} else {
  console.error("Botão com a classe 'myButton' não encontrado!");
}