import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { OpenAIApi, Configuration } from 'openai';

config(); // carrega variáveis do .env

const app = express();
app.use(cors());
app.use(express.json()); // para entender JSON no corpo das requisições

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  apiKey: apiKey,
}));

app.post('/gerar', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: "O prompt é obrigatório." });
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const textoGerado = response.data.choices[0].text.trim();

    res.json({ texto: textoGerado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar o texto." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
import { config } from 'dotenv';
config();

const apiKey = process.env.OPENAI_API_KEY;

console.log("Sua chave OpenAI é:", apiKey);  // só para teste, remova depois

// Use apiKey para configurar o cliente OpenAI, ex: