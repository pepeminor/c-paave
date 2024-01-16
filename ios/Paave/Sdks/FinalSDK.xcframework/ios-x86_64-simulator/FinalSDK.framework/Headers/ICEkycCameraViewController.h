//
//  ICEkycCameraViewController.h
//  FinalSDK
//
//  Created by Minh Nguyễn on 8/20/20.
//  Copyright © 2020 Minh Nguyễn. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreVideo/CoreVideo.h>
#import <AVFoundation/AVFoundation.h>
#import "ICEkycCameraProtocols.h"
#import "ICEkycCameraPresenter.h"
#import "SaveData.h"
#import "ICEkycBaseViewController.h"

NS_ASSUME_NONNULL_BEGIN

#define LANGUAGE_APPLICATION_DEFAULT @"vi"


@protocol ICEkycCameraDelegate <NSObject>

@required
- (void) getResult;
@optional
- (void) closeSDK:(ScreenType)type;
- (void) icEkycCameraCompletedResultOCR:(ScreenType)resultOCR resultFace:(ScreenType)resultFace;

@end


@interface ICEkycCameraViewController : ICEkycBaseViewController<ICEkycCameraViewProtocol>

@property (nonatomic) VersionSdk isVersion;
@property (nonatomic) TypeDocument isType;
@property (nonatomic) FlowType flowType;

@property (nonatomic) NSString *languageApplication; // "vi"
@property (nonatomic) NSString *inputIDVerifyFace;
@property (nonatomic) NSString *idTypeVerifyFace; // "CARD_ID"
@property (nonatomic) NSString *challengeCode; // "11111"
@property (nonatomic) NSString *unitCustomer;
@property (nonatomic) NSString *resourceCustomer;
@property (nonatomic) NSString *hashFrontCompareFace;
@property (nonatomic) NSString *clientSession; // "vi"

@property (nonatomic) NSString *hashFaceCompare;
@property (nonatomic) NSDictionary *objectAddFace;
@property (nonatomic) UIImage *imageFaceToCompare;
@property (nonatomic) NSString *hashFaceVoice;


@property (nonatomic) BOOL isShowHelp;
@property (nonatomic) BOOL isShowResult;
@property (nonatomic) BOOL isShowResultCheckLiveness3DScan;
@property (nonatomic) BOOL isShowRotateCamera;
@property (nonatomic) BOOL isWantRotateCameraBack;
@property (nonatomic) BOOL isValidatePostcode;
@property (nonatomic) BOOL isCompare;
@property (nonatomic) BOOL isAddFace;
@property (nonatomic) BOOL isShowTrademark;
@property (nonatomic) BOOL isCheckLivenessFace;
@property (nonatomic) BOOL isCheckLivenessCard;
@property (nonatomic) BOOL isCheckMaskFace;
@property (nonatomic) BOOL isCustomize;

@property (nonatomic) BOOL isSkipVoiceVideo;
@property (nonatomic) BOOL isValidateDocument;
@property (nonatomic) BOOL isDisableCallAPI;

@property (strong,nonatomic) NSBundle *languageBundle;



//Man
//=================================

@property (nonatomic) BOOL isVersionQRCode;

// @property (nonatomic) BOOL isProVoiceOval;

// ================================= ANIMATION NANE
//
@property (nonatomic) NSString *nameOvalAnimation;
//
@property (nonatomic) NSString *nameFeedbackAnimation;
//
@property (nonatomic) NSString *nameScanQRCodeAnimation;
//
@property (nonatomic) NSString *namePreviewDocumentAnimation;
//
@property (nonatomic) NSString *nameLoadSuccessAnimation;

// ================================= VIDEO NANE
@property (nonatomic) NSString *nameHelpVideo;

@property (nonatomic) BOOL isVersionHelpVideoFullScreen;

// Thanh header
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
@property (nonatomic) UIImage *imageTrademark;

// Kích thước logo
@property (nonatomic) CGSize sizeLogo;

// Màu nền cho pop up
@property (nonatomic) UIColor *colorBackgroundPopup;

// Màu văn bản trên popup
@property (nonatomic) UIColor *colorEkycTextPopup;

/* camera Delegate */
@property (weak, nonatomic) id<ICEkycCameraDelegate> cameraDelegate;

@property (nonatomic) ICEkycCameraPresenter *presenter;

- (void) addFaceObject:(NSDictionary *)object bbox:(NSString *)bbox landmark:(NSString *)landmark;

@end

NS_ASSUME_NONNULL_END
