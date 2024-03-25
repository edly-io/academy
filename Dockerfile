FROM docker.io/python:3.12-bookworm as build
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y pandoc

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY . /academy
WORKDIR /academy
RUN make build

FROM docker.io/caddy:2.7.6 as prod
COPY --from=build /academy/_build/academy /var/www/academy
COPY ./Caddyfile /etc/caddy/Caddyfile
