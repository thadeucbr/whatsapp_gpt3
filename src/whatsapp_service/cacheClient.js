import axios from 'axios';

export async function getUserConversation(userId) {
  try {
    const url = `http://redis_service:3001/userconversation/${userId}`;
    const response = await axios.get(url);
    const completion = response.data.messages;
    return completion;
  } catch (error) {
    console.error('Erro ao consultar o serviço Redis:', error.message);
    return [];
  }
}

export async function saveMessageToCache(userId, role, content) {
  try {
    const url = `http://redis_service:3001/userconversation/${userId}`;
    const response = await axios.post(url, { role, content });
    const completion = response.status;
    return completion;
  } catch (error) {
    console.error('Erro ao consultar o serviço Redis:', error.message);
    return [];
  }
}