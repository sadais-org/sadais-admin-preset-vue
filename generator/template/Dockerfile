FROM nginx:1.17.3-alpine

MAINTAINER qiang@sadais.com

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && mkdir -p /sadais-web

WORKDIR /sadais-web

EXPOSE 80

ADD /dist/  /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx:root /usr/share/nginx/html

CMD /bin/sh -c 'nginx -g "daemon off;"'