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

mkdir -p ./assets/locales
curl -o ./assets/locales/en.json $URL/en.json
curl -o ./assets/locales/vi.json $URL/vi.json
curl -o ./assets/locales/ko.json $URL/ko.json