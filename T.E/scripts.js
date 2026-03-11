let botao = document.querySelector(".myButton");

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".pesquisa").value.trim();
    let resultado = document.querySelector(".wrapper");

    if (!textoUsuario) {
        alert("Por favor, digite uma ideia.");
        return;
    }

    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Você é um assistente de codificação que ajuda a gerar código baseado nas ideias do usuário." },
            { role: "user", content: textoUsuario }
        ],
        max_tokens: 100,
        temperature: 0.7
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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" // Substitua pela sua chave de API
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const json = await response.json();

        // No chat completions, o texto está em json.choices[0].message.content
        const textoGerado = json.choices[0].message.content.trim();

        resultado.value = textoGerado;

    } catch (error) {
        console.error("Erro ao chamar API:", error);
        resultado.value = "Erro ao gerar o código. Tente novamente mais tarde.";
    }
}

if (botao) {
    botao.addEventListener("click", gerarCodigo);
} else {
    console.error("Botão não encontrado!");
}