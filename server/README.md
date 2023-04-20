# Server

## PHP

```
Version: 8.2.4
```

```bash
# compile command
./configure \
--prefix=/usr/local/php80 \
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
--disable-phar
```

## Nginx

```
Version:1.22.1
```

```bash
# compile command
./configure \
    --prefix=/usr/local/nginx \
    --sbin-path=/usr/local/nginx/nginx \
    --conf-path=/usr/local/nginx/nginx.conf \
    --pid-path=/usr/local/nginx/nginx.pid \
    --with-http_ssl_module \
    --with-pcre=../pcre2-10.42 \
    --with-zlib=../zlib-1.2.13 \
    --with-openssl=../openssl-3.1.0
```

## Mysql
