FROM denoland/deno:1.16.3

ARG WORKDIR=/usr/src/app

RUN apt-get update && apt-get install -y \
  && rm -rf /var/lib/apt/lists/*

ENV LANG=C.UTF-8 TZ=Asia/Tokyo

RUN mkdir -p $WORKDIR

WORKDIR $WORKDIR

COPY ./server.ts $WORKDIR

VOLUME ["$WORKDIR"]

EXPOSE 8000

CMD ["run", "--allow-net", "server.ts"]
