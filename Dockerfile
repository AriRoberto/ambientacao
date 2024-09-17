FROM dockerhub.camara.leg.br/infra/node:16.17.0-alpine3.16-1

ENV TZ=America/Sao_Paulo
ENV LANG=pt_BR.UTF-8

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# copia os arquivos gerados pelo Jenkins (durante os testes)
COPY node_modules ./node_modules
COPY package*.json ./
COPY index.js ./
COPY src ./src
COPY public ./public
COPY views ./views

#COPY dist/src ./src
#RUN npm install

EXPOSE 3000

RUN chown -R node:node /usr/src/app
USER node

CMD [ "node", "index" ]

