import { getGptResponse } from './gptClient.js';
import { getUserConversation, saveMessageToCache } from './cacheClient.js';
import { deleteUserConversation } from '../redis_service/redisCache.js';

const targetGroupId = '120363130396165444@g.us';
export async function sendMessageToGroup(venomClient, chatId, message) {
  try {
    await venomClient.sendText(chatId, message);
    // console.log('Mensagem enviada:', result);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
  }
}

async function createNewContext(message, userId, isReply) {
  if (isReply) {
    await deleteUserConversation(userId);
    await saveMessageToCache(userId, 'system', message.quotedMsg.body);
    return [
      {
        role: 'system',
        content: message.quotedMsg.body,
      },
      { role: 'user', content: message.body },
    ];
  } else {
    await saveMessageToCache(
      userId,
      'system',
      'Você é uma pessoa treinada a responder mensagens via WhatsApp, seu nome é Aurora.'
    );
    return [
      {
        role: 'system',
        content:
          'Você é uma pessoa treinada a responder mensagens via WhatsApp, seu nome é Aurora.',
      },
      { role: 'user', content: message.body },
    ];
  }
}

async function loadContext(venomClient, message, userId) {
  try {
    let userMessages;
    
    if (message.quotedMsg) {
      userMessages = await createNewContext(message, userId, true)
    } else {
      userMessages =
        (await getUserConversation(userId)) || (await createNewContext(message, userId, false));
  
      userMessages.length > 0 && userMessages.push({ role: 'user', content: message.body });
    }

    const completion = await getGptResponse(userMessages);

    await saveMessageToCache(userId, 'user', message.body);
    await saveMessageToCache(userId, 'system', completion);
    sendMessageToGroup(venomClient, message.chatId, completion);
  } catch (error) {
    await sendMessageToGroup(venomClient, message.chatId, error.message);
    console.error('Erro ao lidar com a mensagem do WhatsApp:', error.message);
  }
}

export async function handleMessage(venomClient, message) {
  const author = message.author || message.from;
  const userId = author.split('@')[0];

  if (message.chatId === targetGroupId || message.chatId === '120363044073402230@g.us') {
    await loadContext(venomClient, message, userId)
  }
}
