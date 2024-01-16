#!/bin/bash

if [ "$1" = "" ] || ( [ "$1" != "prod" ] && [ "$1" != "uat" ] ); then
    echo "Please input parameter : prod / uat"
    exit 1
fi

if [ "$1" = "prod" ]; then
    URL="https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com"
else 
    URL="https://paave-mobile-resource-uat.s3.ap-southeast-1.amazonaws.com"
fi

curl -o ./paave_version.txt $URL/paave_version.txt
curl -o ./paave_buildno.txt $URL/paave_buildno.txt