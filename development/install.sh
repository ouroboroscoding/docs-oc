#!/bin/bash

# Turn on bold green
G='\e[1;32m'
# Reset colour
R='\e[0m'

# Get the current path of the install script and make sure /docs points to it if
#	it doesn't already
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR="$( dirname "${DIR}" )"
if [ ! -d "/docs" ];  then
	ln -sf ${DIR} /docs
fi

# Install log
LOGFILE=/docs/development/install.log

# Clear the install log
echo '' > $LOGFILE

# Add the universe packages
echo -e "${G}Adding repositories to Ubuntu...${R}"
# Universe
sed -i 's/ubuntu bionic main/ubuntu bionic main universe/' /etc/apt/sources.list
sed -i 's/ubuntu bionic-security main/ubuntu bionic-security main universe/' /etc/apt/sources.list
sed -i 's/ubuntu bionic-updates main/ubuntu bionic-updates main universe/' /etc/apt/sources.list

# update apt
echo -e "${G}Updating apt...${R}"
apt-get -qq update &>> $LOGFILE

# Install nginx
echo -e "${G}Installing NGINX...${R}"
apt-get -qq install nginx &>> $LOGFILE

# Install NodeJS 11
echo -e "${G}Installing NodeJS 11...${R}"
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - &>> install.log
apt-get -qq install nodejs &>> $LOGFILE

# Install npm project
cd /docs/development
npm install -no-bin-links &>> $LOGFILE

# Make folders and copy etc files
echo -e "${G}Making folders, copying server config files, and creating aliases...${R}"
# log directory
mkdir -p /var/log/docs
# copy etc files
cp -R /docs/development/devops/* /
# Aliases
echo "alias lf='ls -aCF'" >> ~/.bashrc

# Restart services
echo -e "${G}Restarting services...${R}"
service nginx restart
