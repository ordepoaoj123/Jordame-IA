const myButton = document.getElementById('myButton');

myButton.addEventListener('click', function () {
  console.log('Botão clicado!', this);
})

myButton.addEventListener('click', () => {
  console.log('Botão clicado!');
});
function alterarTexto(myButton) {
  let elemento = document.getElementById("demo");
  elemento.innerHTML = "#";
}