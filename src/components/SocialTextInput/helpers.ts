import { IS_IOS } from 'constants/main';
import { TextLayoutLine } from 'react-native';
import { height as SCREEN_HEIGHT, scaleSize } from 'styles';
import { store } from 'screens/App';

const LINE_HEIGHT = scaleSize(18); // Font size 14 go with lineHeight 18

export function findLinesIndexByCharacterIndex(lines: TextLayoutLine[], charIndex: number) {
  if (lines.length === 0) {
    return 0;
  }
  let accLength = 0;
  for (let i = 0; i < lines.length; i++) {
    accLength += lines[i].text.length;
    if (accLength >= charIndex) {
      return i;
    }
  }
  return lines.length - 1;
}

function getUsableHeight(keyboardHeight: number) {
  if (IS_IOS) return SCREEN_HEIGHT - keyboardHeight;
  return store.getState().safeScreenHeight;
}

type GetRecommendBoxPosition = {
  lines: TextLayoutLine[];
  charIndex: number;
  screenOffsetY: number;
  containerLayoutY: number;
  keyboardHeight: number;
};
export function getRecommendBoxPosition({
  lines,
  charIndex,
  screenOffsetY,
  containerLayoutY,
  keyboardHeight,
}: GetRecommendBoxPosition) {
  const lineIndex = findLinesIndexByCharacterIndex(lines, charIndex);
  const cursorYFromTop = lineIndex * LINE_HEIGHT - screenOffsetY;
  const usableHeight = getUsableHeight(keyboardHeight);
  const iosOffset = IS_IOS ? keyboardHeight : 0;
  if (cursorYFromTop + containerLayoutY < usableHeight / 2) {
    const topOffset = IS_IOS ? 0 : LINE_HEIGHT * 3;
    return {
      top: cursorYFromTop + containerLayoutY + topOffset,
      bottom: 0,
    };
  }
  const bottomOffset = IS_IOS ? LINE_HEIGHT : 0;
  return {
    top: 0,
    bottom: usableHeight + iosOffset - cursorYFromTop - containerLayoutY + bottomOffset,
  };
}
