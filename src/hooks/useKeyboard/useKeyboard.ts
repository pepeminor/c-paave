import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { useDataToRef } from './useDataToRef.hook';
import { IS_ANDROID } from 'constants/main';
import { height } from 'styles';

export const useKeyboardShowEffect = (didShow: (keyboardHeight: number) => void) => {
  const paramsRef = useDataToRef({ didShow });
  const listenerKey = IS_ANDROID ? 'keyboardDidShow' : 'keyboardWillShow';

  useEffect(() => {
    const sub = Keyboard.addListener(listenerKey, (e: KeyboardEvent) => {
      const keyboardSpace = height - e.endCoordinates?.screenY;

      paramsRef.current?.didShow?.(keyboardSpace);
    });

    return () => {
      sub?.remove?.();
    };
  }, []);
};

export const useKeyboardHideEffect = (didHide: (keyboardHeight: number) => void) => {
  const paramsRef = useDataToRef({ didHide });
  const listenerKey = IS_ANDROID ? 'keyboardDidHide' : 'keyboardWillHide';

  useEffect(() => {
    const sub = Keyboard.addListener(listenerKey, () => {
      paramsRef.current?.didHide?.(0);
    });

    return () => {
      sub?.remove?.();
    };
  }, []);
};

export const useKeyboard = (didShow?: (keyboardHeight?: number) => void, didHide?: (e: any) => void): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useKeyboardHideEffect(() => {
    setKeyboardHeight(0);
    didHide?.(0);
  });

  useKeyboardShowEffect(keyboardSpace => {
    setKeyboardHeight(keyboardSpace);
    didShow?.(keyboardSpace);
  });

  return [keyboardHeight];
};
