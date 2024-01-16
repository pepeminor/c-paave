package com.difisoft.paave.uat.native_package;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.Vector;

public class RNSplashQueue<E> extends Vector<E> {

    public RNSplashQueue() {}

    @Nullable
    public synchronized E shift() {
        if (size() == 0) {
            return null;
        }

        E item = elementAt(0);
        removeElementAt(0);

        return item;
    }

    public void push(@NonNull E item) {
        addElement(item);
    }
}
