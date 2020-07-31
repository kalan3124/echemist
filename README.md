# Smart Delaer Backend

## Installation

Clone the repo.

```
git clone http://git.ceylonlinux.lk/general/smart-dealer-backend.git
cd smart-dealer-backend
git checkout dev
```

### Backend

Install dependencies

```
composer install
```

Duplicate the `.env.example` file with the name `.env` and edit it.

```
cp .env.example .env
nano .env
```

Migrate the database

```
php artisan migrate
```

Populate the database with some sample data

```
php artisan db:seed
```

Generate application keys

```
php artisan key:generate
php artisan passport:install

```

Clear configuration cache

```
php artisan config:cache
```

Symlink the storage folder

```
php artisan storage:link
```

Serve or deploy the project

```
// To serve locally
php artisan serve

// To deploy
ln -s /var/www/salespad-international-backend/public /var/www/html/

// To deploy on a subdirectory
ln -s /var/www/salespad-international-backend/public /var/www/html/salespad

```

## Contributing


### Backend

Please follow PSR2 coding standards.
Write test cases for all APIs in apiTest folder.
Run `./test` before pushing your commits.
