FROM node:16-alpine

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install --production

# Copia o código-fonte inteiro (força invalidação)
ADD . .

# Força a limpeza de qualquer cache antigo de build
RUN rm -rf /app/dist /app/build /app/.next /app/.cache

ENV PORT=3000
EXPOSE 3000

CMD ["node", "app.js"]