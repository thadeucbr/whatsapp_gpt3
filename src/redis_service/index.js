import express from 'express';
import Redis from 'ioredis';
import { getUserConversation, saveMessageToCache } from './redisCache.js';
console.log('REFLETIU!')
const app = express();
app.use(express.json());

const client = new Redis({ host: 'redis' });

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

app.delete('/clearRedis', async (req, res) => {
  try {
    await client.flushall();
    res.status(200).send('Redis data cleared');
  } catch (error) {
    console.error('Error clearing Redis data:', error);
    res.status(500).send({ error: 'Error clearing Redis data' });
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`GPT Service listening on port ${port}`));
