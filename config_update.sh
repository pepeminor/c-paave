#!/bin/bash

if [ "$1" = "" ] || ( [ "$1" != "prod" ] && [ "$1" != "uat" ] ); then
    echo "Please input parameter : prod / uat"
    exit 1
else
    DEVENV="$1"
fi

echo "Update config files for $DEVENV"

cp -f src/config/index.tsx config/$DEVENV/

cp -f android/app/build.gradle config/$DEVENV/android/ 
cp -f android/sentry.properties config/$DEVENV/android/sentry.properties
cp -f android/app/_BUCK config/$DEVENV/android/_BUCK

cp -f android/app/src/main/res/values/strings.xml config/$DEVENV/android/ 
cp -f android/app/src/main/AndroidManifest.xml config/$DEVENV/android/
cp -f android/app/src/main/assets/appcenter-config.json config/$DEVENV/android/appcenter-config.json 

rm -rf config/$DEVENV/android/java/main/*
rm -rf config/$DEVENV/android/java/debug/*

cp -rf android/app/src/main/java/com/difisoft/paave/* config/$DEVENV/android/java/main/
cp -rf android/app/src/debug/java/com/difisoft/paave/* config/$DEVENV/android/java/debug/

cp -f ios/Paave/GoogleService-Info.plist config/$DEVENV/ios/
cp -f ios/Paave/Info.plist config/$DEVENV/ios/
cp -f ios/Paave/Paave.entitlements config/$DEVENV/ios/
cp -f ios/OneSignalNotificationServiceExtension/OneSignalNotificationServiceExtension.entitlements config/$DEVENV/ios/
cp -f ios/Paave/AppCenter-Config.plist config/$DEVENV/ios/
cp -f ios/Paave.xcodeproj/project.pbxproj config/$DEVENV/ios/
cp -f ios/sentry.properties config/$DEVENV/ios/sentry.properties

#cp -f ios/Podfile config/$DEVENV/ios/
#cp -f ios/Podfile.lock config/$DEVENV/ios/
#rm -rf config/$DEVENV/ios/Paave.xcodeproj && cp -rf ios/Paave.xcodeproj config/$DEVENV/ios/