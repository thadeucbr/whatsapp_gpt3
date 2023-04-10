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
    const userConversationKey = `user:${userId}:conversation`;
    const userTokenCountKey = `user:${userId}:tokenCount`;
    const message = { role, content };
    const messageTokens = content.split(' ').length;

    // Obter o número atual de tokens
    let tokenCount = parseInt(await getAsync(userTokenCountKey), 10) || 0;

    // Se o limite de tokens for excedido, remover mensagens mais antigas até que o limite seja respeitado
    while (tokenCount + messageTokens > 2000) {
      const removedMessage = JSON.parse(await client.lpop(userConversationKey));
      const removedMessageTokens = removedMessage.content.split(' ').length;
      tokenCount -= removedMessageTokens;
    }

    // Adicionar a nova mensagem e atualizar o número de tokens
    await client.rpush(userConversationKey, JSON.stringify(message));
    await setAsync(userTokenCountKey, tokenCount + messageTokens);

  } catch (error) {
    throw error;
  }
}
