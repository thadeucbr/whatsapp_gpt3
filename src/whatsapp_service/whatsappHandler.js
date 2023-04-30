import { getGptResponse } from './gptClient.js';
import { getUserConversation, saveMessageToCache } from './cacheClient.js';

const targetGroupId = '120363130396165444@g.us';

export async function handleMessage(venomClient, message) {

  const author = message.author || message.from;
  const userId = author.split('@')[0];
  if (message.chatId === targetGroupId || message.chatId === '120363044073402230@g.us') {
    try {
      const userMessages = (await getUserConversation(userId)) || [];
      userMessages.length > 0 &&
        userMessages.push({ role: 'user', content: message.body });
        console.log('Aqui', userMessages)
      if (userMessages.length === 0) {
        await saveMessageToCache(
          userId,
          'assistant',
          'Seu nome é Aurora, você é uma inteligencia virtual treinada para responder perguntas.'
        );
        userMessages.push(
          {
            role: 'assistant',
            content:
              'Seu nome é Aurora, você é uma inteligencia virtual treinada para responder perguntas.',
          },
          { role: 'user', content: message.body }
        );
      }

      const messages = [...userMessages];

      const completion = await getGptResponse(messages, userId);

      await saveMessageToCache(userId, 'user', message.body);
      await saveMessageToCache(userId, 'assistant', completion);
      sendMessageToGroup(venomClient, message.chatId, completion);
    } catch (error) {
      await sendMessageToGroup(venomClient, message.chatId, error.message);
      console.error('Erro ao lidar com a mensagem do WhatsApp:', error.message);
    } finally {}
  }
}

export async function sendMessageToGroup(venomClient, chatId, message) {
  try {
    const result = await venomClient.sendText(chatId, message);
    // console.log('Mensagem enviada:', result);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
  }
}
