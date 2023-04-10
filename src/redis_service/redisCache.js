import { promisify } from 'util';

function countTokens(messages) {
  return messages.reduce((totalTokens, message) => {
    if (message.content) {
      return totalTokens + message.content.length;
    }
    return totalTokens;
  }, 0);
}


export async function getUserConversation(userId, client) {
  try {
    const getAsync = promisify(client.get).bind(client);
    const conversationStats = await getAsync('conversationStats');
    const conversation = JSON.parse(conversationStats) || {};
    const userMessages = conversation[userId] || [];
    return userMessages;
  } catch (error) {
    throw error;
  }
}

export async function saveMessageToCache({ userId, role, content }, client) {
  try {
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    const conversationStats = await getAsync('conversationStats');
    const conversation = JSON.parse(conversationStats) || {};
    const userMessages = conversation[userId] || [];

    userMessages.push({ role, content });
    console.log(countTokens(userMessages))
    while (countTokens(userMessages) > 4000) {
      console.log(countTokens(userMessages))
      userMessages.shift();
    }

    // Filtrar mensagens com conteúdo vazio
    const filteredUserMessages = userMessages.filter(message => message.content);

    conversation[userId] = filteredUserMessages;
    await setAsync('conversationStats', JSON.stringify(conversation), 'EX', 600);
  } catch (error) {
    throw error;
  }
}


