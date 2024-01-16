#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// For Appsflyer Uninstall measurement
#import <UserNotifications/UserNotifications.h>
#import <AppsFlyerLib/AppsFlyerLib.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, AppsFlyerLibDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
