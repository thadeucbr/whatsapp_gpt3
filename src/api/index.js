import 'dotenv/config';
import venom from 'venom-bot';
import { handleMessage } from './whatsapp/whatsappHandler.js';

console.log(process.env.OPENAI_API_KEY)
venom
  .create()
  .then((client) => {
    client.onMessage((message) => handleMessage(client, message));
  })
  .catch((error) => {
    console.error('Erro ao criar sessão do venom:', error);
  });