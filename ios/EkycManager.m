//
//  EkycManager.m
//  Paave
//
//  Created by DifiSoft on 12/09/2022.
//



#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_REMAP_MODULE(Ekyc, Counter, NSObject)
//@interface RCT_EXTERN_REMAP_MODULE(Ekyc, Counter, RCTViewManager)
RCT_EXTERN_METHOD(startChecking:
                  (NSDictionary)data
                  resolver: (RCTPromiseResolveBlock)resolve
rejecter: (RCTPromiseRejectBlock)reject)


@end
