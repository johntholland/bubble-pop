#!/bin/bash
# My first script

if [ "$(uname)" == "Darwin" ]; then
    # Do something under Mac OS X platform 
    echo "Mac OS X detected!"    
    # install homebrew
    # homebrew nodejs install
    npm -g install bower
    npm install
    bower install
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    # Do something under Linux platform
    # install ?
    echo "Linux detected!"   
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    # Do something under Windows NT platform
    echo "Windows detected!"
    #install chocolatey?
    #choco install nodejs.install  
    npm -g install bower
    npm install
    bower install
fi



