#!/bin/bash

# installing some easy stuff
echo -e "\n--- Updating all the things ---\n"
sudo apt-get -y update > /dev/null
echo -e "\n--- Install git nginx nodejs npm ---\n"
sudo apt-get -y install git nginx nodejs npm
echo -e "\n--- Install global npm packages"
npm install -g gulp karma karma-cli webpack
cd js
npm install
cd ..

echo "Configuring Nginx"
    cp /vagrant/scripts/nginx_local_config /etc/nginx/sites-available/nginx_local_config > /dev/null
    
    ln -s /etc/nginx/sites-available/nginx_local_config /etc/nginx/sites-enabled/
    
    rm -rf /etc/nginx/sites-available/default
    
# symlink nodejs to node to avoid conflicts
sudo ln -s /usr/bin/nodejs /usr/bin/node

# installing python and django
echo -e "\n--- Installing python and django ---\n"
sudo apt-get -y install python3-pip
sudo pip3 install django


# setup mysql install
echo -e "\n--- Setup and install MYSQL ---\n"
sudo apt-get -y install debconf-utils

debconf-set-selections <<< "mysql-server mysql-server/root_password password password"
    
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password password"

apt-get install mysql-server -y

service nginx restart
