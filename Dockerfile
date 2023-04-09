# Escolha uma imagem base que inclua o Node.js
FROM node:18

# Instale as dependências necessárias para o Venom
RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
      libgtk2.0-0 \
      libgtk-3-0 \
      libgbm-dev \
      libnotify-dev \
      libgconf-2-4 \
      libnss3 \
      libxss1 \
      libasound2 \
      libxtst6 \
      xauth \
      xvfb \
    && rm -rf /var/lib/apt/lists/*

# Crie um diretório para a aplicação e defina-o como diretório de trabalho
WORKDIR /usr/src/app

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm ci

# Copie o código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação utilizará
EXPOSE 3000

# Inicie a aplicação
CMD [ "npm", "start" ]
