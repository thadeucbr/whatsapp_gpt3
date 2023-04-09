import { getGptResponse } from '../chatGpt/gptClient.js';
import { getUserConversation, saveMessageToCache } from '../config/cacheManager.js';

const targetGroupId = '120363130396165444@g.us';

export async function handleMessage(venomClient, message) {
  const author = message.author || message.from;
  const userId = author.split('@')[0];

  if (message.chatId === targetGroupId) {
    try {
      const userMessages = getUserConversation(userId);
      userMessages.push({ role: `user:${userId}`, content: message.body })
      const messages = [
        {
          role: 'system',
          content:
            'Você é uma inteligência artificial treinada a responder mensagens via WhatsApp.',
        },
        ...userMessages,
      ];
      const completion = await getGptResponse(messages);
      console.log('Resposta do ChatGPT:', completion);

      saveMessageToCache(userId, 'system', completion);
      sendMessageToGroup(venomClient, message.chatId, completion);
    } catch (error) {
      console.error('Erro ao lidar com a mensagem do WhatsApp:', error);
    }
  }
}

export async function sendMessageToGroup(venomClient, chatId, message) {
  try {
    const result = await venomClient.sendText(chatId, message);
    console.log('Mensagem enviada:', result);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}
