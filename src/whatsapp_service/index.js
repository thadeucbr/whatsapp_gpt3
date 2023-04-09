import venom from 'venom-bot';
import { handleMessage } from './whatsappHandler.js';

venom
  .create()
  .then((client) => {
    client.onMessage((message) => handleMessage(client, message));
  })
  .catch((error) => {
    console.error('Erro ao criar sessão do venom:', error);
  });