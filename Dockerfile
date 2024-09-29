FROM node:20
WORKDIR /app

COPY package.json package-lock.json prisma ./
RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]