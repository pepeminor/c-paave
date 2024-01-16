## Using tracking error by appcenter handleErrors

- If you want generate with your own error data

	```
	logger(type: string, message: string, stackTrace: string);
	```

- If you want create an exception model from error

	```
	trackExceptrionError(error: Error);
	```

## CodePush run follow command

- Login appcenter cli

	```
	appcenter login
	```

- Codepush

	```
	codepush:ios:uat "version - x.x.x"        // For IOS UAT
	codepush:android:uat "version - x.x.x"    // For Android UAT
	codepush:ios:prod "version - x.x.x"       // For IOS Prod
	codepush:android:prod "version - x.x.x"   // For Android Prod
    
	codepush:clear:ios:uat                    // Clear all IOS UAT patches
	codepush:clear:android:uat                // Clear all Android UAT patches
	codepush:clear:ios:prod                   // Clear all IOS Prod patches
	codepush:clear:android:prod               // Clear all Android Prod patches
	codepush:clear:uat                        // Clear all IOS/Android UAT patches
	codepush:clear:prod                       // Clear all IOS/Android Prod patches
  ```

## yarn command

- To change configuration Prod/UAT

	```
	yarn config:uat
	yarn config:prod
	```

- To install node_modules and pod. This is the first step after check out git repository

	```
	yarn install:all
	```

- To install node_modules and pod with deletion of node_modules ios\Pods

	```
	yarn install:all:clean
	```

- To compile source

	```
	yarn compile 
	```

- To run app 

	```
	yarn ios
	```

	```
	yarn android                // debug mode
	yarn android:release        // release mode
	```

- To install android app to device

	```
	yarn android:device:debug
	yarn android:device:release
	```

- To build 

	```
	yarn ios:archive:debug      // To archive with debug mode
	yarn ios:archive:release    // To archive with release mode
	yarn ios:export:adhoc       // To export to adhoc (like testfairy) ./output/ios/Paave.ipa will be created.
	yarn ios:export:appstore    // To export to appstore  ./output/ios/Paave.ipa will be created.
	yarn ios:build:debug        // To archive with debug mode and then export to adhoc. ./output/ios/Paave.ipa will be created.
	yarn ios:build:release      // To archive with release mode and then export to adhoc. ./output/ios/Paave.ipa will be created.
	```

	```
	yarn android:build:debug    // To build apk with debug mode ./output/android/Paave.X.X.X-YYMMDD.MMYY-debug.apk will be created.
	yarn android:build:release  // To build apk with release mode ./output/android/Paave.X.X.X-YYMMDD.MMYY-release.apk will be created.
	yarn android:build:bundle   // To build aab for google play ./output/android/Paave.X.X.X-YYMMDD.MMYY-release.aab will be created.
	```

- To upload testfairy

	```
	yarn testfairy "PATH WITH FILENAME"       // IOS/Android same. For ex. yarn testfairy output/Paave.X.X.X-XXXXX.XXX-release.apk
	yarn testfairy_auto "PATH WITH FILENAME"  // IOS/Android same. It's for auto-update mode.
	yarn testfairy:ios                        // Upload IOS (No input required)
	yarn testfairy:android                    // Upload Android (No input required)
	yarn testfairy:all                        // Upload IOS/Android
	yarn testfairy_auto:ios                   // Upload IOS (No input required)
	yarn testfairy_auto:android               // Upload Android (No input required)
	yarn testfairy_auto:all                   // Upload IOS/Android
	```

- To upload lambadatest

	```
	yarn lambadatest:ios                      // Upload IOS (No input required)
	yarn lambadatest:android                  // Upload Android (No input required)
	yarn lambadatest:all                      // Upload IOS/Android
	```

