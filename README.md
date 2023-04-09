# WhatsApp GPT-3

Este projeto utiliza a API do GPT-3 e integra ao WhatsApp para fornecer respostas automáticas e inteligentes às mensagens recebidas. O projeto foi atualizado para usar uma arquitetura de microserviços, consistindo em três serviços:

- `whatsapp_service`: Responsável pela comunicação com o WhatsApp via Venom-Bot.
- `gpt_service`: Responsável por se comunicar com a API GPT-3 e gerar respostas.
- `redis_service`: Gerencia o armazenamento em cache das mensagens e conversas de usuários usando Redis.

## Requisitos

- Docker e Docker Compose instalados.
- Conta no [OpenAI](https://beta.openai.com/signup/) para obter a chave de API do GPT-3.
- Crie um arquivo `.env` em `src\gpt_service` contendo as variáveis de ambiente necessárias. Use o arquivo `.env.example` como modelo.

## Instalação

1. Clone o repositório:

```
git clone https://github.com/thadeucbr/whatsapp_gpt3.git
```

2. Construa e inicie os serviços usando o Docker Compose:
```
docker-compose up -d --build
```

## Uso

1. Após iniciar os serviços, verifique os logs do contêiner whatsapp_service para obter o QR code:

```
docker logs <whatsapp_service_container_id_or_name>
```

2. Escaneie o QR code usando o aplicativo WhatsApp no seu celular.
3. Aguarde a conexão bem-sucedida com o WhatsApp e comece a receber mensagens.

As respostas automáticas serão geradas pelo GPT-3 e enviadas de volta aos usuários que enviarem mensagens para o número conectado.

## Contribuindo

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir uma issue ou criar um pull request. Todas as contribuições são bem-vindas!