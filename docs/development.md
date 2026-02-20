# Development notes


##  running command inside container

```
docker compose run --rm \
    -w /application \
    php-fpm \
    bash
```
```
docker compose run --rm \
    -w /application \
    php-fpm \
    php artisan migrate
````

## to install sanctum

php artisan install:api

got message `API scaffolding installed. Please add the [Laravel\Sanctum\HasApiTokens] trait to your User model.`

## make migration
php artisan make:migration create_marriages_table --create=marriages

## setting up user

php artisan db:seed --class=UserSeeder
