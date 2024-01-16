package com.difisoft.paave.uat.native_package;

import android.app.Activity;

import androidx.annotation.NonNull;

public class RNSplash {
    public static void init(@NonNull final Activity activity) {
        RNSplashModule.init(activity);
    }
}
