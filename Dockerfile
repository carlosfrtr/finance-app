# Etapa 1: Build
FROM node:22 AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o arquivo de variáveis de ambiente
COPY .env.production .env.production

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build do Next.js
RUN npm run build

# Etapa 2: Servindo a aplicação
FROM node:22-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários da etapa de build
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/public public
COPY --from=builder /app/.env.production .env.production

# Instala apenas as dependências necessárias para produção
RUN npm install --production

# Exposição da porta do servidor Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
