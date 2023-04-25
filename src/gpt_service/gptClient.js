import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export async function getGptResponse(messages) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages
    }
    );
  return response.data.choices[0].message.content.trim()
  } catch (error) {
    error.message
  }
}

// const openAIApiKey = process.env.OPENAI_API_KEY;

// export async function getGptResponse(messages) {
//   try {
//     const url = 'https://api.openai.com/v1/chat/completions';
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${openAIApiKey}`,
//     };
//     const data = {
//       model: 'gpt-3.5-turbo',
//       messages: messages,
//       max_tokens: 2000,
//       n: 1,
//       stop: null,
//       temperature: 0.7,
//     };

//     const response = await axios.post(url, data, { headers: headers });
//     const completion = response.data.choices[0].message.content.trim();
//     return completion;
//   } catch (error) {
//     console.error('Erro ao consultar a API do ChatGPT:', error);
//     throw error;
//   }
// }
