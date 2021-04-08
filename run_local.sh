#!/bin/bash
#This bash script for development purpose
#To run this bash from terminal ./run_server.sh dev,qa,staging,prod if no env it will fallback to prod
if [ $1 ]
then
    #for windows user nothing workout you can set the env here
    export NODE_ENV=$1
else
    export NODE_ENV=prod
    
fi
node setEnv.js
quasar dev