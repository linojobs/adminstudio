FROM alpine

EXPOSE 80

ADD nginx-1.22.1.tar.gz /
ADD openssl-3.1.0.tar.gz /
ADD pcre2-10.42.tar.gz /
ADD zlib-1.2.13.tar.gz /

RUN apk add --no-cache gcc g++ automake autoconf libtool make linux-headers

RUN cd /nginx-1.22.1 && ./configure \
    --prefix=/usr/local/nginx \
    --sbin-path=/usr/local/nginx/nginx \
    --conf-path=/usr/local/nginx/nginx.conf \
    --pid-path=/usr/local/nginx/nginx.pid \
    --with-http_ssl_module \
    --with-pcre=/pcre2-10.42 \
    --with-zlib=/zlib-1.2.13 \
    --with-openssl=/openssl-3.1.0 \
    && make \
    && make install

COPY nginx.conf /usr/local/nginx

RUN rm -fr nginx-1.22.1 \
    && rm -fr openssl-3.1.0 \
    && rm -fr pcre2-10.42 \
    && rm -fr zlib-1.2.13

CMD [ "/usr/local/nginx/nginx", "-g", "daemon off;" ]
