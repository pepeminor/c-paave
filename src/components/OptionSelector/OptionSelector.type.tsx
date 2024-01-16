import { TextStyle, ViewProps } from 'react-native';

export type SelectorData = {
  [key: string]: string;
};

export interface IProps<T extends SelectorData> extends ViewProps {
  value: keyof T;
  setValue: (v: keyof T) => void;
  listValue: T;
  modalTitle: string;
  textStyles?: TextStyle;
  disabled?: boolean;
}
