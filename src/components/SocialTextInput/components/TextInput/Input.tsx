import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputProps,
  TextInputScrollEventData,
  TextInputSelectionChangeEventData,
  TextLayoutLine,
  View,
} from 'react-native';
import { useStyles } from './styles';
import { LineCountTextInput } from './LineCountTextInput';
import { findLinesIndexByCharacterIndex, getRecommendBoxPosition } from '../../helpers';
import { SocialTextInputEventHandler } from '../../event';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scaleSize } from 'styles';
import { useKeyboardShowEffect, useTypedSelector } from 'hooks';

interface InputProps extends TextInputProps {
  containerOffsetY?: number;
  scrollViewRef: React.RefObject<KeyboardAwareScrollView>;
  bottomShowModal?: number;
}

export type Input = {
  onScroll: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void;
  clearText: () => void;
  focus: () => void;
  changeText: (text: string) => void;
};

export const Input = memo(
  forwardRef<Input, InputProps>(
    ({ onChangeText: onChangeTextOuter, containerOffsetY = 0, scrollViewRef, bottomShowModal, ...props }, ref) => {
      const { styles } = useStyles();

      const addStringTrigger = useTypedSelector(state => state.SocialNewPost.addStringTrigger);

      const textInputRef = useRef<LineCountTextInput>(null);

      const containerLayoutY = useRef(0);
      const contentOffsetY = useRef(0);
      const selectedIndex = useRef(-1);
      const keyboardHeight = useRef(0);

      const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<TextInputScrollEventData>) => {
        contentOffsetY.current = nativeEvent.contentOffset.y;
      }, []);

      const onViewLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
        containerLayoutY.current = nativeEvent.layout.y;
      }, []);

      // Execution orders: onChangeText -> onSelectionChange
      const onChangeText = useCallback(
        (text: string) => {
          onChangeTextOuter?.(text);
        },
        [onChangeTextOuter]
      );

      // Execution orders: onSelectionChange -> onTextLayout
      const onSelectionChange = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
          selectedIndex.current = nativeEvent.selection.start;
        },
        []
      );

      // Execution orders: onTextLayout -> X
      const onTextLayout = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<{ lines: TextLayoutLine[] }>) => {
          if (selectedIndex.current === -1 || nativeEvent.lines.length === 0) return;
          scrollViewRef?.current?.scrollToPosition?.(
            0,
            findLinesIndexByCharacterIndex(nativeEvent.lines, selectedIndex.current) * scaleSize(18),
            true
          );
          const boxPos = getRecommendBoxPosition({
            charIndex: selectedIndex.current,
            lines: nativeEvent.lines,
            containerLayoutY: containerLayoutY.current + containerOffsetY,
            screenOffsetY: contentOffsetY.current,
            keyboardHeight: keyboardHeight.current,
          });
          SocialTextInputEventHandler.openModal(bottomShowModal ? { bottom: bottomShowModal } : boxPos);
        },
        [containerOffsetY, bottomShowModal]
      );

      const clearText = useCallback(() => {
        textInputRef.current?.onChangeText('');
      }, []);

      useImperativeHandle(ref, () => ({
        onScroll,
        clearText,
        focus: () => textInputRef.current?.focus(),
        changeText: (text: string) => textInputRef.current?.onChangeText(text),
      }));

      useKeyboardShowEffect(height => {
        keyboardHeight.current = height;
      });

      useEffect(() => {
        if (addStringTrigger?.value != null) {
          textInputRef.current?.addStringAtIndex(selectedIndex.current, addStringTrigger.value);
        }
      }, [addStringTrigger]);

      return (
        <View style={styles.container} onLayout={onViewLayout}>
          <LineCountTextInput
            multiline
            ref={textInputRef}
            allowFontScaling={false}
            autoCapitalize="sentences"
            textAlignVertical="top"
            autoCompleteType="off"
            style={styles.textContainer}
            onChangeText={onChangeText}
            onSelectionChange={onSelectionChange}
            onTextLayout={onTextLayout}
            {...props}
          />
        </View>
      );
    }
  )
);
