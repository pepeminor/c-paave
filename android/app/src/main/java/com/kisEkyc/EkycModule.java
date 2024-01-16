package com.kisEkyc;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.vnptit.idg.sdk.utils.KeyIntentConstants;
import com.vnptit.idg.sdk.utils.SDKEnum;

import java.util.HashMap;
import java.util.Map;

import static android.app.Activity.RESULT_OK;
import static com.vnptit.idg.sdk.utils.KeyResultConstants.*;

public class EkycModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_FAILED_TO_START_ACTIVITI = "E_FAILED_TO_START_ACTIVITI";
    private static final int EKYC_REQUEST_CODE = 1000;
    private Promise mPromise;

    public EkycModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "Ekyc";
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == EKYC_REQUEST_CODE) {
            if (resultCode == RESULT_OK) {
                WritableMap map = new WritableNativeMap();
                map.putString("INFO_RESULT", getKey(data, INFO_RESULT));
                map.putString("COMPARE_RESULT", getKey(data, COMPARE_RESULT));
                map.putString("LIVENESS_RESULT", getKey(data, LIVENESS_RESULT));
                map.putString("REGISTER_RESULT", getKey(data, REGISTER_RESULT));
                map.putString("LIVENESS_CARD_REAR_RESULT", getKey(data, LIVENESS_CARD_REAR_RESULT));
                map.putString("LIVENESS_CARD_FRONT_RESULT", getKey(data, LIVENESS_CARD_FRONT_RESULT));
                map.putString("MASKED_FACE_RESULT", getKey(data, MASKED_FACE_RESULT));
                map.putString("ORIGIN_LOCATION_RESULT", getKey(data, ORIGIN_LOCATION_RESULT));
                map.putString("BIRTH_PLACE_RESULT", getKey(data, BIRTH_PLACE_RESULT));
                map.putString("ISSUE_PLACE_RESULT", getKey(data, ISSUE_PLACE_RESULT));
                map.putString("RECENT_LOCATION_RESULT", getKey(data, RECENT_LOCATION_RESULT));
                map.putString("REAR_IMAGE", getKey(data, REAR_IMAGE));
                map.putString("FRONT_IMAGE", getKey(data, FRONT_IMAGE));
                map.putString("PORTRAIT_IMAGE", data.getStringExtra(PORTRAIT_IMAGE));
                map.putString("PORTRAIT_FAR_IMAGE", data.getStringExtra(PORTRAIT_FAR_IMAGE));
                map.putString("PORTRAIT_NEAR_IMAGE", data.getStringExtra(PORTRAIT_NEAR_IMAGE));
                map.putString("QR_CODE_RESULT", data.getStringExtra(QR_CODE_RESULT));
                map.putString("NETWORK_PROBLEM", data.getStringExtra(NETWORK_PROBLEM));
                mPromise.resolve(map);
            } else {
                mPromise.reject("ERR", "Cancel activity !");
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(KeyIntentConstants.ACCESS_TOKEN, KeyIntentConstants.ACCESS_TOKEN);
        return constants;
    }

    @ReactMethod
    public void startChecking(@Nullable final ReadableMap data, final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }
        mPromise = promise;
        try {
            onInit(currentActivity, data);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            mPromise.reject(E_FAILED_TO_START_ACTIVITI, e);
            mPromise = null;
        }
    }

    private String getKey(Intent data, String key) {
        return data.getStringExtra(key);
    }

    private void onInit(Activity currentActivity, ReadableMap data) throws ClassNotFoundException {
        Intent intent;
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                intent = new Intent(currentActivity,
                        Class.forName("com.vnptit.idg.sdk.activity.VnptIdentityActivity"));
            } else {
                intent = new Intent(currentActivity,
                        Class.forName("com.vnptit.idg.sdk.activity.VnptIdentityActivity"));
            }
            intent.putExtra(KeyIntentConstants.ENABLE_WATERMARK, true);
            intent.putExtra(KeyIntentConstants.USE_DIFFERENT_SERVER, true);
            intent.putExtra(KeyIntentConstants.URL_UPLOAD_IMAGE, "https://api.idg.vnpt.vn/file-service/v1/addFile");
            intent.putExtra(KeyIntentConstants.URL_LIVENESS_CARD,"https://api.idg.vnpt.vn/ai/v2/card/liveness");
            intent.putExtra(KeyIntentConstants.URL_OCR,"https://api.idg.vnpt.vn/ai/v2/ocr/id");
            intent.putExtra(KeyIntentConstants.URL_COMPARE, "https://api.idg.vnpt.vn/ai/v2/face/compare");
            intent.putExtra(KeyIntentConstants.URL_LIVENESS, "https://api.idg.vnpt.vn/ai/v2/face/liveness-3d");
            intent.putExtra(KeyIntentConstants.URL_CHECK_MASKED_FACE, "https://api.idg.vnpt.vn/ai/v2/face/mask");
            intent.putExtra(KeyIntentConstants.ACCESS_TOKEN, data.getString(KeyIntentConstants.ACCESS_TOKEN));
            intent.putExtra(KeyIntentConstants.TOKEN_ID, data.getString(KeyIntentConstants.TOKEN_ID));
            intent.putExtra(KeyIntentConstants.TOKEN_KEY, data.getString(KeyIntentConstants.TOKEN_KEY));
            intent.putExtra(KeyIntentConstants.TURN_OFF_CALL_SERVICE, false);
            intent.putExtra(KeyIntentConstants.KEY_HEADER_REQUEST, "");
            intent.putExtra(KeyIntentConstants.VALUE_HEADER_REQUEST, "");
            if (data.hasKey("SELECT_DOCUMENT")) {
                switch (data.getInt("SELECT_DOCUMENT")) {
                    case 2:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.PASSPORT.getValue());
                        break;
                    case 3:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.MILITARY_CARD.getValue());
                        break;
                    case 4:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.DRIVER_LICENSE.getValue());
                        break;
                    default:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.IDENTITY_CARD.getValue());
                }
            } else {
                switch (data.getInt("DOCUMENT_TYPE")) {
                    case 1:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.IDENTITY_CARD.getValue());
                        intent.putExtra(KeyIntentConstants.TYPE_IDENTITY, SDKEnum.TypeIdentity.CCGC.getValue());
                        intent.putExtra(KeyIntentConstants.ENABLE_SCAN_QR_CCGC, SDKEnum.ActiveQRCode.YES.getValue());
                        break;
                    case 2:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.IDENTITY_CARD.getValue());
                        break;
                    case 3:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.PASSPORT.getValue());
                        break;
                    default:
                        intent.putExtra("DOCUMENT_TYPE", SDKEnum.DocumentTypeEnum.IDENTITY_CARD.getValue());
                }
            }
            if (data.hasKey("SELECT_DOCUMENT")) {
                intent.putExtra(KeyIntentConstants.SELECT_DOCUMENT,
                        data.getBoolean(KeyIntentConstants.SELECT_DOCUMENT));
            }
            // if (data.hasKey("VERSION_SDK")) {
            // switch (data.getInt("VERSION_SDK")) {
            // case 1:
            intent.putExtra(KeyIntentConstants.VERSION_SDK, SDKEnum.VersionSDKEnum.ADVANCED.getValue());
            // break;
            // case 0:
            // intent.putExtra(KeyIntentConstants.VERSION_SDK,
            // SDKEnum.VersionSDKEnum.STANDARD.getValue());
            // break;
            // }
            // } else {
            // intent.putExtra(KeyIntentConstants.VERSION_SDK,
            // SDKEnum.VersionSDKEnum.STANDARD.getValue());
            // }
            if (data.hasKey("IS_SHOW_RESULT")) {
                intent.putExtra(KeyIntentConstants.SHOW_RESULT, data.getBoolean("IS_SHOW_RESULT"));
            }
            if (data.hasKey("IS_SHOW_HELP")) {
                intent.putExtra(KeyIntentConstants.SHOW_DIALOG_SUPPORT, data.getBoolean("IS_SHOW_HELP"));
            }
            intent.putExtra(KeyIntentConstants.VERIFY_FACE_FLOW, true);
            intent.putExtra(KeyIntentConstants.CHECK_MASKED_FACE, true);
            intent.putExtra(KeyIntentConstants.CHECK_LIVENESS_CARD, true);
            intent.putExtra(KeyIntentConstants.VALIDATE_POSTCODE, true);
            // intent.putExtra(KeyIntentConstants.VALIDATE_FRONT_CARD, true);
            // intent.putExtra(KeyIntentConstants.VALIDATE_BACK_CARD, true);
            // two lines above causing crash
            intent.putExtra(KeyIntentConstants.LIVENESS_FACE, true);
            intent.putExtra(KeyIntentConstants.COMPARE_FLOW, true);
            if (data.hasKey("CAMERA_FOR_PORTRAIT")) {
                if (data.getInt("CAMERA_FOR_PORTRAIT") == 0) {
                    intent.putExtra(KeyIntentConstants.CAMERA_FOR_PORTRAIT, SDKEnum.CameraTypeEnum.FRONT.getValue());
                } else {
                    intent.putExtra(KeyIntentConstants.CAMERA_FOR_PORTRAIT, SDKEnum.CameraTypeEnum.BACK.getValue());
                }
            } else {
                intent.putExtra(KeyIntentConstants.CAMERA_FOR_PORTRAIT, SDKEnum.CameraTypeEnum.FRONT.getValue());
            }
            if (data.hasKey("SHOW_SWITCH")) {
                intent.putExtra(KeyIntentConstants.SHOW_SWITCH, data.getBoolean(KeyIntentConstants.SHOW_SWITCH));
            }
            if (data.hasKey(KeyIntentConstants.CHANGE_THEME)) {
                intent.putExtra(KeyIntentConstants.CHANGE_THEME, data.getBoolean(KeyIntentConstants.CHANGE_THEME));
            }
            if (data.hasKey(KeyIntentConstants.LOGO)) {
                intent.putExtra(KeyIntentConstants.CHANGE_THEME, data.getString(KeyIntentConstants.LOGO));
            }
            if (data.hasKey(KeyIntentConstants.WIDTH_LOGO)) {
                intent.putExtra(KeyIntentConstants.WIDTH_LOGO, data.getString(KeyIntentConstants.WIDTH_LOGO));
            }
            if (data.hasKey(KeyIntentConstants.HEIGHT_LOGO)) {
                intent.putExtra(KeyIntentConstants.HEIGHT_LOGO, data.getString(KeyIntentConstants.HEIGHT_LOGO));
            }
            if (data.hasKey(KeyIntentConstants.CHANGE_COLOR)) {
                intent.putExtra(KeyIntentConstants.CHANGE_COLOR, data.getString(KeyIntentConstants.CHANGE_COLOR));
            }
            if (data.hasKey(KeyIntentConstants.CHANGE_TEXT_COLOR)) {
                intent.putExtra(KeyIntentConstants.CHANGE_TEXT_COLOR,
                        data.getString(KeyIntentConstants.CHANGE_TEXT_COLOR));
            }
            if (data.hasKey("LANGUAGE")) {
                // intent.putExtra(KeyIntentConstants.LANGUAGE,
                //         data.getString(KeyIntentConstants.LANGUAGE));
                if (data.getString("LANGUAGE") == "en") {
                    intent.putExtra(KeyIntentConstants.LANGUAGE, SDKEnum.LanguageEnum.ENGLISH.getValue());
                } else {
                    intent.putExtra(KeyIntentConstants.LANGUAGE, SDKEnum.LanguageEnum.VIETNAMESE.getValue());
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            mPromise.reject(e);
            mPromise = null;
            return;
        }

        currentActivity.startActivityForResult(intent, EKYC_REQUEST_CODE);
    }
}
