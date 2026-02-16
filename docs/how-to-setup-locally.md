
# Setting up backend & frontend for development


# Backend

```
docker compose run --rm \
    -w /application \
    php-fpm \
    composer install

docker compose run --rm \
    -w /application \
    php-fpm \
    php artisan key:generate
```
to start `docker compose up -d`

to stop `docker compose down`

`docker compose down -v` // also delete volumes

### running artisan command

```
docker compose run --rm \
    -w /application \
    php-fpm \
    php artisan queue:work
```

### to run command inside container

```
docker compose run --rm \
    -w /application \
    php-fpm \
    bash
```

### if any isssue with file permission

```
cd src

sudo chown -R $USER: .

chmod -R 775 storage bootstrap/cache

sudo  chown -R $USER:www-data storage bootstrap/cache database

chmod -R 775 database
chmod 664 database/database.sqlite
sudo chown -R $USER:www-data database
```

# Frontend

## frontend - asset building

https://laravel.com/docs/12.x/vite

for developement `npm run dev`

for production `npm run build`