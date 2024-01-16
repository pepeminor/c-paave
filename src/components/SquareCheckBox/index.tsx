import { StyleProp, Text, TextStyle, View, ViewStyle, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from 'styles';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import useStyles from './styles';
import config from '../../config/index';

export interface ISquareCheckBoxProps<T> {
  readonly defaultValue?: boolean;
  readonly value?: boolean;
  readonly dataToFire: T;
  readonly label: string;
  readonly numberOfStock: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly iconViewStyle?: StyleProp<ViewStyle>;
  readonly labelViewStyle?: StyleProp<ViewStyle>;
  readonly labelViewTextStyle?: StyleProp<ViewStyle>;
  readonly labelTextStyle?: StyleProp<TextStyle>;
  readonly labelTextNumberOfStock?: StyleProp<TextStyle>;
  readonly disableSelectIcon?: boolean;
  readonly setDeleteSymbolList: React.Dispatch<React.SetStateAction<number[]>>;
  readonly watchListId: number;
  readonly deleteSymbolList: number[];
  readonly setAddSymbolList: React.Dispatch<React.SetStateAction<number[]>>;
  readonly addSymbolList: number[];
}

const SquareCheckBox = <T extends object>(props: ISquareCheckBoxProps<T>) => {
  const [checked, setChecked] = useState<boolean>(props.defaultValue || false);
  const { styles } = useStyles();

  useEffect(() => {
    if (props.value !== undefined) {
      setChecked(props.value);
    }
  }, [props.value]);

  const onPress = () => {
    // handle deleteSymbolList in addToWatchList
    if (props.value === true) {
      if (checked === true && !props.deleteSymbolList.includes(props.watchListId)) {
        props.setDeleteSymbolList([...props.deleteSymbolList, props.watchListId]);
      } else {
        props.setDeleteSymbolList(props.deleteSymbolList.filter(item => item != props.watchListId));
      }
    } else {
      // handle addSymbolList in addToWatchList
      if (checked === false && !props.addSymbolList.includes(props.watchListId)) {
        props.setAddSymbolList([...props.addSymbolList, props.watchListId]);
      } else {
        props.setAddSymbolList(props.addSymbolList.filter(item => item != props.watchListId));
      }
    }

    if (!props.disableSelectIcon) {
      setChecked(!checked);
    }
  };

  const numberOfStock = props.numberOfStock || 0;

  const leftCon = [globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.leftContainer];

  return (
    <TouchableOpacity onPress={onPress} style={props.style} disabled={props.disableSelectIcon}>
      <View style={leftCon}>
        <View style={props.iconViewStyle || globalStyles.flexDirectionRow}>
          {props.disableSelectIcon ? (
            <View style={styles.disableButton}>
              <UnselectedIcon />
            </View>
          ) : checked ? (
            <SelectedIcon />
          ) : (
            <UnselectedIcon />
          )}
        </View>
        <View style={props.labelViewTextStyle}>
          <Text allowFontScaling={false} style={props.labelTextStyle} numberOfLines={1}>
            {props.label}
          </Text>
        </View>
      </View>
      <View style={props.labelViewStyle}>
        <Text allowFontScaling={false} style={props.labelTextNumberOfStock}>
          {numberOfStock}/{config.maxNumberOfSymbol}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SquareCheckBox;
