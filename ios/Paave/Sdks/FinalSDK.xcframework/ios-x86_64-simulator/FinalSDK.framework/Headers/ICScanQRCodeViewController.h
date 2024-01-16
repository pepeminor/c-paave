//
//  ICScanQRCodeViewController.h
//  FinalSDK
//
//  Created by IC iOS Team's Macbook Pro on 3/12/21.
//  Copyright © 2021 Minh Nguyễn. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ICEkycCameraProtocols.h"
#import "ICEkycBaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

@protocol ScanQRCodeDelegate <NSObject>

- (void) pressDismissScanQRCode;
- (void) dismissAfterScanSucceedWithValue:(NSString *)value;

@end

@interface ICScanQRCodeViewController : ICEkycBaseViewController

@property (weak, nonatomic) id<ScanQRCodeDelegate> scanQRCodeDelegate;
@property (nonatomic) NSString *languageApplication;

@property (nonatomic) BOOL isShowHelp;
@property (nonatomic) BOOL isVersionQRCode;

// Kiêu
@property (nonatomic) NSInteger styleHeader;

// màu nội dung Thanh header
@property (nonatomic) UIColor *colorContentHeader;

// màu nen Thanh header
@property (nonatomic) UIColor *colorBackgroundHeader;

// Màu văn bản - Header và subtext
@property (nonatomic) UIColor *colorContentMain;

// Màu nền
@property (nonatomic) UIColor *colorBackgroundMain;

// Đường line trên hướng dẫn chụp GTTT
@property (nonatomic) UIColor *colorLine;

// Button và Thanh hướng dẫn khi đưa mặt vào khung oval
@property (nonatomic) UIColor *colorBackgroundButton;


//Màu text cho button và thanh hướng dẫn khi đưa mặt vào khung oval
@property (nonatomic) UIColor *colorEkycTextButton;

// Màu nền chụp
@property (nonatomic) UIColor *colorEkycCaptureBackground;

// Màu hiệu ứng
@property (nonatomic) UIColor *colorEkycEffect;

// Màu nút chụp ảnh
@property (nonatomic) UIColor *colorEkycButtonCapture;

// Màu đường viền khung chụp mặt Oval
@property (nonatomic) UIColor *colorEkycOval;

// Họa tiết dưới nền
@property (nonatomic) BOOL isUsingUnderBackground;

// màu Họa tiết dưới nền
@property (nonatomic) UIColor *colorEkycUnderBackgound;

// Logo
@property (nonatomic) BOOL isShowTrademark;

// Logo
@property (nonatomic) UIImage *imageTrademark;

// Kích thước logo
@property (nonatomic) CGSize sizeLogo;

// Màu nền cho pop up
@property (nonatomic) UIColor *colorBackgroundPopup;

// Màu văn bản trên popup
@property (nonatomic) UIColor *colorEkycTextPopup;

// Màu văn bản trên popup
@property (nonatomic) NSString *nameScanQRCodeAnimation;


- (void) reStartSessionQRCode;
- (void) deallocSessionQRCode;

@end

NS_ASSUME_NONNULL_END
