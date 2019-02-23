#!/bin/bash

# Turn on bold green
G='\e[1;32m'
# Reset colour
R='\e[0m'

# Install log
LOGFILE=install.log

# Clear the install log
echo '' > $LOGFILE

# Install NodeJS 11
echo -e "${G}Installing NodeJS 11...${R}"
curl -sL https://deb.nodesource.com/setup_11.x | -E bash - &>> install.log
apt-get -qq install nodejs &>> $LOGFILE

# Install npm project
echo -e "${G}Installing packages...${R}"
npm install &>> $LOGFILE
