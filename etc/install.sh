sudo apt-get update
sudo apt-get install php5-cli php5-fpm
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer global require "laravel/installer=~1.1"
sudo apt-get install mysql-server php5-mysql
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install npm
sudo npm install -g autobahn
sudo apt-get install nginx
sudo apt-get install git

#edits from 
#https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-12-04