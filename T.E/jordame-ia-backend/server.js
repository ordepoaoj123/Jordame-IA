import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config(); // carrega variáveis do .env

const app = express();
app.use(cors());
app.use(express.json()); // para entender JSON no corpo das requisições

app.post('/gerar', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Prompt recebido:', prompt);

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: "O prompt é obrigatório." });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || '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'}`
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "Você é um assistente de codificação que ajuda a gerar código baseado nas ideias do usuário." },
          { role: "user", content: prompt }
        ],
        model: "llama3-8b-8192",
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('API falhou, status:', response.status, 'usando resposta mockada personalizada');
      // Resposta mockada personalizada baseada no prompt
      let mockResponse = '';
      const lowerPrompt = prompt.toLowerCase();
      console.log('Lower prompt:', lowerPrompt);
      if (lowerPrompt.includes('botão') || lowerPrompt.includes('botao') || lowerPrompt.includes('button')) {
        const color = lowerPrompt.includes('vermelho') || lowerPrompt.includes('red') ? 'red' :
                      lowerPrompt.includes('verde') || lowerPrompt.includes('green') ? 'green' :
                      lowerPrompt.includes('azul') || lowerPrompt.includes('blue') ? 'blue' : 'blue';
        console.log('Color:', color);
        let animation = '';
        if (lowerPrompt.includes('animação') || lowerPrompt.includes('animacao') || lowerPrompt.includes('girar') || lowerPrompt.includes('spin')) {
          animation = 'animation: spin 2s linear infinite;';
        } else if (lowerPrompt.includes('pulsar') || lowerPrompt.includes('pulse')) {
          animation = 'animation: pulse 1s ease-in-out infinite alternate;';
        }
        mockResponse = `<button style="background-color: ${color}; color: white; padding: 10px 20px; border: none; border-radius: 5px; ${animation}">
    Botão Gerado
</button>
<style>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
</style>`;
      } else if (lowerPrompt.includes('input') || lowerPrompt.includes('campo')) {
        mockResponse = `<input type="text" placeholder="Digite algo" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px;">`;
      } else if (lowerPrompt.includes('div') || lowerPrompt.includes('container')) {
        mockResponse = `<div style="width: 200px; height: 100px; background-color: lightgray; display: flex; align-items: center; justify-content: center;">
    Container
</div>`;
      } else if (lowerPrompt.includes('círculo') || lowerPrompt.includes('circulo') || lowerPrompt.includes('circle')) {
        let animation = '';
        if (lowerPrompt.includes('animação') || lowerPrompt.includes('animacao') || lowerPrompt.includes('girar') || lowerPrompt.includes('spin')) {
          animation = 'animation: spin 2s linear infinite;';
        } else if (lowerPrompt.includes('pulsar') || lowerPrompt.includes('pulse')) {
          animation = 'animation: pulse 1s ease-in-out infinite alternate;';
        }
        mockResponse = `<div style="width: 100px; height: 100px; background-color: blue; border-radius: 50%; ${animation}"></div>
<style>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
</style>`;
      } else if (lowerPrompt.includes('quadrado') || lowerPrompt.includes('square')) {
        let animation = '';
        if (lowerPrompt.includes('animação') || lowerPrompt.includes('animacao') || lowerPrompt.includes('girar') || lowerPrompt.includes('spin')) {
          animation = 'animation: spin 2s linear infinite;';
        } else if (lowerPrompt.includes('pulsar') || lowerPrompt.includes('pulse')) {
          animation = 'animation: pulse 1s ease-in-out infinite alternate;';
        }
        mockResponse = `<div style="width: 100px; height: 100px; background-color: green; ${animation}"></div>
<style>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
</style>`;
      } else if (lowerPrompt.includes('triângulo') || lowerPrompt.includes('triangulo') || lowerPrompt.includes('triangle')) {
        let animation = '';
        if (lowerPrompt.includes('animação') || lowerPrompt.includes('animacao') || lowerPrompt.includes('girar') || lowerPrompt.includes('spin')) {
          animation = 'animation: spin 2s linear infinite;';
        } else if (lowerPrompt.includes('pulsar') || lowerPrompt.includes('pulse')) {
          animation = 'animation: pulse 1s ease-in-out infinite alternate;';
        }
        mockResponse = `<div style="width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid red; ${animation}"></div>
<style>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
</style>`;
      } else if (lowerPrompt.includes('link') || lowerPrompt.includes('a href')) {
        mockResponse = `<a href="#" style="color: blue; text-decoration: none;">Link Exemplo</a>`;
      } else if (lowerPrompt.includes('imagem') || lowerPrompt.includes('img')) {
        mockResponse = `<img src="https://via.placeholder.com/150" alt="Imagem Exemplo" style="width: 150px; height: 150px;">`;
      } else if (lowerPrompt.includes('lista') || lowerPrompt.includes('ul') || lowerPrompt.includes('ol')) {
        mockResponse = `<ul style="list-style-type: disc; padding-left: 20px;">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>`;
      } else if (lowerPrompt.includes('tabela') || lowerPrompt.includes('table')) {
        mockResponse = `<table style="border-collapse: collapse; width: 100%;">
    <tr>
        <th style="border: 1px solid #ddd; padding: 8px;">Cabeçalho 1</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Cabeçalho 2</th>
    </tr>
    <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">Dado 1</td>
        <td style="border: 1px solid #ddd; padding: 8px;">Dado 2</td>
    </tr>
</table>`;
      } else if (lowerPrompt.includes('formulário') || lowerPrompt.includes('form')) {
        mockResponse = `<form style="display: flex; flex-direction: column; gap: 10px;">
    <input type="text" placeholder="Nome" style="padding: 8px;">
    <input type="email" placeholder="Email" style="padding: 8px;">
    <button type="submit" style="padding: 10px; background: blue; color: white; border: none;">Enviar</button>
</form>`;
      } else if (lowerPrompt.includes('javascript') || lowerPrompt.includes('js') || lowerPrompt.includes('script')) {
        mockResponse = `<button id="jsBtn" style="padding: 10px 20px; background: green; color: white; border: none; border-radius: 5px;">Clique para JS</button>
<script>
document.getElementById('jsBtn').addEventListener('click', function() {
    alert('JavaScript funcionando! O botão foi clicado.');
});
</script>`;
      } else if (lowerPrompt.includes('canvas') || lowerPrompt.includes('desenho')) {
        mockResponse = `<canvas id="myCanvas" width="200" height="100" style="border: 1px solid #000;"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);
</script>`;
      } else {
        // Fallback genérico: cria um div com o prompt como conteúdo
        mockResponse = `<div style="padding: 20px; background-color: lightblue; border-radius: 5px;">
    ${prompt}
</div>`;
      }
      console.log('Mock response:', mockResponse);
      return res.json({ texto: mockResponse });
    }

    const json = await response.json();
    const textoGerado = json.choices[0].message.content.trim();

    res.json({ texto: textoGerado });
  } catch (error) {
    console.error('Erro detalhado:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Resposta:', error.response?.data);
    // Fallback para mock personalizado
    let mockResponse = '';
    const lowerPrompt = req.body.prompt.toLowerCase();
    if (lowerPrompt.includes('botão') || lowerPrompt.includes('botao') || lowerPrompt.includes('button')) {
      const color = lowerPrompt.includes('vermelho') || lowerPrompt.includes('red') ? 'red' :
                    lowerPrompt.includes('verde') || lowerPrompt.includes('green') ? 'green' :
                    lowerPrompt.includes('azul') || lowerPrompt.includes('blue') ? 'blue' : 'blue';
      mockResponse = `<button style="background-color: ${color}; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Botão Gerado</button>`;
    } else if (lowerPrompt.includes('input') || lowerPrompt.includes('campo')) {
      mockResponse = `<input type="text" placeholder="Digite algo" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px;">`;
    } else if (lowerPrompt.includes('div') || lowerPrompt.includes('container')) {
      mockResponse = `<div style="width: 200px; height: 100px; background-color: lightgray; display: flex; align-items: center; justify-content: center;">Container</div>`;
    } else {
      mockResponse = `<button style="background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Elemento Gerado</button>`;
    }
    res.json({ texto: mockResponse });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});