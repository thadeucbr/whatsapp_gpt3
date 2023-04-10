# Projeto Chatbot WhatsApp com GPT-3

Este projeto é um chatbot desenvolvido para interagir com usuários do WhatsApp, utilizando a API GPT-3 da OpenAI para gerar respostas inteligentes e coesas. O projeto está disponível tanto em uma estrutura [monolitica](https://github.com/thadeucbr/whatsapp_gpt3) quanto em [microsserviços](https://github.com/thadeucbr/whatsapp_gpt3/tree/microservicos)

## Estrutura do projeto
```
whatsapp_gpt3/
│
├── src/
│ ├── api/
│ │ ├── chatGpt/
│ │ │ └── gptClient.js
│ │ ├── config/
│ │ │ └── cacheManager.js
│ │ └── whatsapp/
│ │ └── whatsappHandler.js
│ └── index.js
├── README.md
├── .env
├── .gitignore
├── package-lock.json
└── package.json
```

## Instalação

1. Clone o repositório para sua máquina local:

```
git clone git@github.com:thadeucbr/whatsapp_gpt3.git
```

2. Navegue até a pasta do projeto:
```
cd seu_projeto
```

3. Instale as dependências necessárias:
```
npm install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
OPENAI_API_KEY=sua_chave_api_openai
GROUP_NAME=nome_do_grupo_whatsapp
```

5. Inicie o projeto:
```
npm run start
```

## Utilização

Após iniciar o projeto, o chatbot estará pronto para responder mensagens no grupo do WhatsApp especificado na variável `GROUP_NAME`. As interações com o chatbot serão gerenciadas pelo GPT-3, fornecendo respostas de acordo com as mensagens enviadas pelos usuários.

## Contribuindo

Caso deseje contribuir com o projeto, sinta-se à vontade para abrir um pull request ou criar uma issue. Todas as contribuições são bem-vindas.

## Licença

Este projeto está licenciado sob a Licença ISC. Consulte o arquivo [LICENSE](https://opensource.org/licenses/ISC) para obter mais informações.
