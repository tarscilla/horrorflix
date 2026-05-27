# Usa uma imagem oficial do Node.js
FROM node:20
 
# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app
 
# Copia os arquivos de dependências
COPY package*.json ./
 
# Instala as dependências
RUN npm install
 
# Copia o restante do código da aplicação
COPY . .
 
# Expõe a porta que o Express usa
EXPOSE 3000
 
# Comando para rodar a aplicação
CMD ["node", "index.js"]