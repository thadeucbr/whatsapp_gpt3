import { promisify } from 'util';

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

    if (countTokens(userMessages) > 2000) {
      userMessages.shift();
    }

    conversation[userId] = userMessages;
    await setAsync('conversationStats', JSON.stringify(conversation), 'EX', 3600);
  } catch (error) {
    throw error;
  }
}

