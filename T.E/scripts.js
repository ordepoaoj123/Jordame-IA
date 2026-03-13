async function gerarCodigo() {
    let textoUsuario = document.querySelector(".pesquisa").value.trim();
    let resultado = document.querySelector(".wrapper-code");
    let previewFrame = document.getElementById("previewFrame");

    if (!textoUsuario) {
        alert("Por favor, digite uma ideia.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: textoUsuario })
        });

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.statusText}`);
        }

        const json = await response.json();
        const textoGerado = json.texto;

        resultado.textContent = textoGerado;
        Prism.highlightElement(resultado);

        if (textoGerado.trim().startsWith("<")) {

            const blob = new Blob([textoGerado], { type: "text/html" });
            const url = URL.createObjectURL(blob);

            previewFrame.src = url;

            previewFrame.onload = () => {
                URL.revokeObjectURL(url);
            };

        } else {
            previewFrame.src = "about:blank";
        }

        const container = document.querySelector(".resultado-container");
        container.style.display = "flex";

        setTimeout(() => {
            container.classList.add("show");
        }, 10);

    } catch (error) {

        console.error("Erro:", error);

        resultado.textContent = "Erro ao gerar o código.";
        previewFrame.src = "about:blank";

        const container = document.querySelector(".resultado-container");
        container.style.display = "flex";

        setTimeout(() => {
            container.classList.add("show");
        }, 10);
    }
}

function copiarCodigo() {
    const codigo = document.querySelector(".wrapper-code").textContent;

    navigator.clipboard.writeText(codigo)
        .then(() => alert("Código copiado!"))
        .catch(() => alert("Erro ao copiar."));
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector(".myButton");

    if (botao) {
        botao.addEventListener("click", gerarCodigo);
    }

    const copyBtn = document.querySelector(".copy-btn");

    if (copyBtn) {
        copyBtn.addEventListener("click", copiarCodigo);
    }
});