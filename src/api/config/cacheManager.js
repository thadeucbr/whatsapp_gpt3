import NodeCache from 'node-cache';

const conversationCache = new NodeCache({ stdTTL: 1200 });

export function getUserConversation(userId) {
  const conversationStats = conversationCache.getStats();
  const userKeys = Object.keys(conversationStats.keys).filter((key) => key.startsWith(userId));
  const userMessages = userKeys.map((key) => conversationCache.get(key));
  return userMessages;
}

export function saveMessageToCache(userId, role, content) {
  const key = `${role}:${userId}`;
  conversationCache.set(key, { role, content }, 1200);
}