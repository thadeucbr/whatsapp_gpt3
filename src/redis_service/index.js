import express from 'express';
import Redis from 'ioredis';
import { getUserConversation, saveMessageToCache } from './redisCache.js';

const app = express();
app.use(express.json());

const client = new Redis();

client.on('connect', () => {
  console.log('Conectado ao Redis');
});

client.on('error', (err) => {
  console.log('Erro ao se conectar ao Redis', err);
});

app.get('/userconversation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await getUserConversation(id, client);
    res.send({ messages });
  } catch (error) {
    console.error('Erro ao consultar o Redis:', error);
    res.status(500).send({ error: 'Erro ao consultar o Redis' });
  }
});

app.post('/userconversation/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, content } = req.body;

    await saveMessageToCache({ userId, role, content }, client);
    res.status(201).send('created');
  } catch (error) {
    console.error('Erro ao consultar o Redis:', error);
    res.status(500).send({ error: 'Erro ao consultar o Redis' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`GPT Service listening on port ${port}`));
