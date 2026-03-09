# Development notes

local setup

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
```

### to install sanctum

php artisan install:api

got message `API scaffolding installed. Please add the [Laravel\Sanctum\HasApiTokens] trait to your User model.`

### make migration

log in to `php-fpm` container

php artisan make:migration create_marriages_table --create=marriages

php artisan make:migration add_is_admin_to_users_table --table=users

### setting up user

php artisan db:seed --class=UserSeeder


## database // phpmyadmin

http://localhost:52001/

username parishmanager
password secret

