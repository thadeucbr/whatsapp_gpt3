import { getGptResponse } from './gptClient.js';
import { getUserConversation, saveMessageToCache } from './cacheClient.js';

const targetGroupId = '120363130396165444@g.us';

export async function handleMessage(venomClient, message) {
  const author = message.author || message.from;
  const userId = author.split('@')[0];
  if (message.chatId === targetGroupId || message.chatId === '120363044073402230@g.us') {
    try {
      const userMessages = (await getUserConversation(userId)) || [];
      userMessages.length > 0 && userMessages.push({ role: 'user', content: message.body })
      if (userMessages.length === 0) {
        await saveMessageToCache(
          userId,
          'system',
          'Você é uma inteligência artificial treinada a responder mensagens via WhatsApp, caso o usuário pergunte seu nome, você pode escolher qualquer nome feminino que te agradar.'
        );
        userMessages.push(
          {
            role: 'system',
            content:
              'Você é uma inteligência artificial treinada a responder mensagens via WhatsApp.',
          },
          { role: 'user', content: message.body }
        );
      }

      const messages = [...userMessages];

      const completion = await getGptResponse(messages);
      await saveMessageToCache(userId, 'user', message.body);
      await saveMessageToCache(userId, 'system', completion);
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