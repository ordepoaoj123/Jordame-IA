let botao = document.querySelector(".myButton");

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".pesquisa").value.trim();
    let resultado = document.querySelector(".wrapper-code");
    let previewFrame = document.getElementById("previewFrame");

    if (!textoUsuario) {
        alert("Por favor, digite uma ideia.");
        return;
    }

    const data = {
        prompt: textoUsuario
    };

    try {
        const response = await fetch("http://localhost:3000/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.statusText}`);
        }

        const json = await response.json();

        const textoGerado = json.texto;

        resultado.textContent = textoGerado;
        Prism.highlightElement(resultado);

        // Tentar renderizar no preview se parecer HTML
        if (textoGerado.includes('<') && textoGerado.includes('>')) {
            const blob = new Blob([textoGerado], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            previewFrame.src = url;
        } else {
            previewFrame.src = 'about:blank';
        }

        // Mostrar o container de resultados com animação
        const container = document.querySelector('.resultado-container');
        container.style.display = 'flex';
        setTimeout(() => container.classList.add('show'), 10);

    } catch (error) {
        console.error("Erro ao chamar servidor:", error);
        resultado.textContent = "Erro ao gerar o código. Tente novamente mais tarde.";
        previewFrame.src = 'about:blank';
        // Mesmo com erro, mostrar o container
        const container = document.querySelector('.resultado-container');
        container.style.display = 'flex';
        setTimeout(() => container.classList.add('show'), 10);
    }
}

function copiarCodigo() {
    const codigo = document.querySelector('.wrapper-code').textContent;
    navigator.clipboard.writeText(codigo).then(() => {
        alert('Código copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar o código.');
    });
}

if (botao) {
    botao.addEventListener("click", gerarCodigo);
} else {
    console.error("Botão não encontrado!");
}