import axios from 'axios';

const openAIApiKey = process.env.OPENAI_API_KEY;

export async function getGptResponse(messages) {
  try {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIApiKey}`,
    };
    const data = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 200,
      n: 1,
      stop: null,
      temperature: 0.7,
    };

    console.log("JSON data:", JSON.stringify(data));

    const response = await axios.post(url, data, { headers: headers });
    const completion = response.data.choices[0].message.content.trim();
    return completion;
  } catch (error) {
    console.error('Erro ao consultar a API do ChatGPT:', error);
    throw error;
  }
}
