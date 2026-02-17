# Development notes


##  running command inside container

```
docker compose run --rm \
    -w /application \
    php-fpm \
    bash
```


## to install sanctum

php artisan install:api

got message `API scaffolding installed. Please add the [Laravel\Sanctum\HasApiTokens] trait to your User model.`

## make migration
php artisan make:migration create_marriages_table --create=marriages
