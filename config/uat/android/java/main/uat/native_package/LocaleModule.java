package com.difisoft.paave.uat.native_package;
import android.app.Activity;
import android.content.res.Configuration;
import android.content.res.Resources;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Locale;

public class LocaleModule extends ReactContextBaseJavaModule  {

    LocaleModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "LocaleModule";
    }

    @ReactMethod
    public void setLocale(String language) {
        Locale locale = new Locale(language);
        Locale.setDefault(locale);
        Activity activity = getCurrentActivity();
        assert activity != null;
        Resources resources = activity.getResources();
        Configuration config = resources.getConfiguration();
        config.setLocale(locale);
        resources.updateConfiguration(config, resources.getDisplayMetrics());
    }
}
