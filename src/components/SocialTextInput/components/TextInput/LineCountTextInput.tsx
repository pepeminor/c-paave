import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputProps, TextLayoutEventData } from 'react-native';
import { MentionInput, MentionSuggestionsProps, replaceMentionValues } from 'react-native-controlled-mentions';
import globalStyles from 'styles';
import { SocialTextInputEventHandler } from '../../event';
import { useColors } from 'hooks';

type LineCountTextInputProps = Omit<TextInputProps, 'onChange'> & {
  onTextLayout?: (e: NativeSyntheticEvent<TextLayoutEventData>) => void;
};
export type LineCountTextInput = {
  onChangeText: (text: string) => void;
  addStringAtIndex: (index: number, value: string) => void;
  focus: () => void;
};

export const LineCountTextInput = memo(
  forwardRef<LineCountTextInput, LineCountTextInputProps>(({ onTextLayout, defaultValue, ...props }, ref) => {
    const colors = useColors();

    const [text, setText] = useState(defaultValue ?? props.value ?? '');
    const mentionRef = useRef<TextInput>(null);

    const onChangeText = useCallback(
      (text: string) => {
        setText(text);
        props.onChangeText?.(text);
      },
      [props.onChangeText]
    );

    const addStringAtIndex = useCallback(
      (index: number, value: string) => {
        setText(text => {
          let nonParsedIndex = index;
          replaceMentionValues(text, mention => {
            nonParsedIndex += 4 + mention.name.length;
            return mention.trigger + mention.name;
          });
          const newText = text.slice(0, nonParsedIndex) + value + text.slice(nonParsedIndex);
          props.onChangeText?.(newText);
          return newText;
        });
      },
      [text]
    );

    const renderSuggestionsMention: React.FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
      SocialTextInputEventHandler.updateKeywordConfig({
        MENTION: {
          keyword,
          onSuggestionPress(suggestion) {
            onSuggestionPress(suggestion);
            mentionRef.current?.focus();
          },
        },
      });
      return null;
    };

    const renderSuggestionsTag: React.FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
      SocialTextInputEventHandler.updateKeywordConfig({
        TAG: {
          keyword,
          onSuggestionPress(suggestion) {
            onSuggestionPress(suggestion);
            mentionRef.current?.focus();
          },
        },
      });
      return null;
    };

    useImperativeHandle(ref, () => ({
      onChangeText,
      addStringAtIndex,
      focus: () => mentionRef.current?.focus(),
    }));

    return (
      <>
        {/* To get number of lines */}
        <Text {...props} style={[props.style, styles.hideTextView]} onTextLayout={onTextLayout}>
          {replaceMentionValues(text, mention => mention.trigger + mention.name)}
        </Text>
        <MentionInput
          inputRef={mentionRef}
          value={text}
          onChange={onChangeText}
          containerStyle={globalStyles.container}
          partTypes={[
            {
              trigger: '@', // Should be a single character like '@' or '#'
              renderSuggestions: renderSuggestionsMention,
              textStyle: { fontWeight: 'normal', color: colors.MainBlue }, // The mention style in the input
              isInsertSpaceAfterMention: true,
            },
            {
              trigger: '#', // Should be a single character like '@' or '#'
              renderSuggestions: renderSuggestionsTag,
              textStyle: { fontWeight: 'normal', color: colors.MainBlue }, // The mention style in the input
              allowedSpacesCount: 0,
              isInsertSpaceAfterMention: true,
            },
          ]}
          {...props}
        />
      </>
    );
  })
);

const styles = StyleSheet.create({
  hideTextView: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
});
