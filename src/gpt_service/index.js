import 'dotenv/config';
import express from 'express';
import { getGptResponse } from './gptClient.js';

const app = express();
app.use(express.json());

app.post('/gpt', async (req, res) => {
  try {
    const messages = req.body.messages;
    console.log(messages)
    const completion = await getGptResponse(messages);
    res.send({ completion });
  } catch (error) {
    console.error('Erro ao consultar a API do ChatGPT:', error);
    res.status(500).send({ error: 'Erro ao consultar a API do ChatGPT' });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`GPT Service listening on port ${port}`));
