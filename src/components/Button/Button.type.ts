import { StyleSheet } from 'react-native';

export const ButtonType = {
  Primary: 'Primary',
  Secondary: 'Secondary',
} as const;
export type ButtonType = keyof typeof ButtonType;

export type ButtonMeta = {
  [key in ButtonType]: StyleSheet.NamedStyles<{
    container: unknown;
    textStyle: unknown;
  }>;
};
