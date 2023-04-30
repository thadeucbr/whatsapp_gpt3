import axios from 'axios';

export async function getGptResponse(messages, user) {
  try {
    const url = 'http://gpt_service:3000/gpt'; // Atualize para o endereço e a porta corretos do serviço ChatGPT
    const response = await axios.post(url, { messages, user });
    const completion = response.data.completion;
    return completion;
  } catch (error) {
    console.error('Erro ao consultar o serviço ChatGPT:', error.message);
    // throw error;
  }
}