FROM alpine
EXPOSE 3000
COPY . /root/Doacoes
RUN  apk add git npm vim bash
WORKDIR /root/Doacoes
RUN npm install --force
ENV DATABASE_URL="postgresql://postgres:concatto@db.aandre.de:5150/doacao"
ENTRYPOINT ["npm"]
CMD ["run","dev"]
