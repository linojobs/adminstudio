FROM alpine

EXPOSE 9000

ADD php-8.2.4.tar.gz /

RUN apk add --no-cache gcc g++ automake autoconf libtool make linux-headers libxml2-dev

RUN cd /php-8.2.4 && ./configure \
    --prefix=/usr/local/php \
    --enable-mysqlnd \
    --with-mysqli \
    --with-pear \
    --with-pdo-mysql \
    --without-pdo-sqlite \
    --disable-mbregex \
    --without-sqlite3 \
    --disable-short-tags \
    --enable-fpm \
    --without-iconv \
    --disable-phar \
    && make \
    && make install

RUN mv /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf

COPY www.conf /usr/local/php/etc/php-fpm.d

RUN rm -fr php-8.2.4

CMD [ "/usr/local/php/sbin/php-fpm", "-F"]
