#!/bin/bash

if [ "$1" = "" ] || ( [ "$1" != "prod" ] && [ "$1" != "uat" ] ); then
    echo "Please input parameter : prod / uat"
    exit 1
else
    DEVENV="$1"
fi

echo "Update config files for $DEVENV"

cp -f config/$DEVENV/index.tsx src/config/index.tsx 

cp -f config/$DEVENV/android/build.gradle android/app/build.gradle 
cp -f config/$DEVENV/android/_BUCK android/app/_BUCK 
cp -f config/$DEVENV/android/sentry.properties android/sentry.properties 
cp -f config/$DEVENV/android/google-services.json android/app/google-services.json

cp -f config/$DEVENV/android/strings.xml android/app/src/main/res/values/strings.xml 
cp -f config/$DEVENV/android/AndroidManifest.xml android/app/src/main/AndroidManifest.xml 
cp -f config/$DEVENV/android/appcenter-config.json android/app/src/main/assets/appcenter-config.json

rm -rf android/app/src/main/java/com/difisoft/paave/*
rm -rf android/app/src/debug/java/com/difisoft/paave/*

cp -rf config/$DEVENV/android/java/main/* android/app/src/main/java/com/difisoft/paave/
cp -rf config/$DEVENV/android/java/debug/* android/app/src/debug/java/com/difisoft/paave/

cp -f config/$DEVENV/ios/GoogleService-Info.plist ios/Paave/GoogleService-Info.plist 
cp -f config/$DEVENV/ios/Info.plist ios/Paave/Info.plist 
cp -f config/$DEVENV/ios/Paave.entitlements ios/Paave/Paave.entitlements 
cp -f config/$DEVENV/ios/OneSignalNotificationServiceExtension.entitlements ios/OneSignalNotificationServiceExtension/OneSignalNotificationServiceExtension.entitlements 
cp -f config/$DEVENV/ios/AppCenter-Config.plist ios/Paave/AppCenter-Config.plist 
cp -f config/$DEVENV/ios/project.pbxproj  ios/Paave.xcodeproj/project.pbxproj 
cp -f config/$DEVENV/ios/sentry.properties ios/sentry.properties 

#cp -f config/$DEVENV/ios/Podfile ios/Podfile
#cp -f config/$DEVENV/ios/Podfile.lock ios/Podfile.lock
#rm -rf ios/Paave.xcodeproj && cp -rf config/$DEVENV/ios/Paave.xcodeproj ios/