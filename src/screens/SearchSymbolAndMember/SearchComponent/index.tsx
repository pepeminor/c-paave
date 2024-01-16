/* eslint-disable @typescript-eslint/no-var-requires */
import React, { LegacyRef, memo, useCallback, useEffect, useState } from 'react';
import { View, Platform, Image, TouchableOpacity, TextInput } from 'react-native';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';

import TextInputComponent from 'components/TextInput';
import WhiteBackIcon from 'assets/icon/BackIcon.svg';
import Search from 'assets/icon/Search.svg';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { ScreenTab } from '../type';

const HEADER_LIGHT_IOS = require('assets/component/HeaderLightIOS.png');
const HEADER_LIGHT_ANDROID = require('assets/component/HeaderLightAndroid.png');
const isIos = Platform.OS === 'ios';
const HeaderButtonHitSlop = { top: 8, bottom: 8, left: 8, right: 8 };

interface IPropsSearchComponent {
  selectedTab?: ScreenTab;
  searchText: string;
  placeholder: string;
  doneBtnText?: string;
  goBack: () => void;
  onChangeSearchValue?(text: string): void;
  blurOnSubmit?: boolean;
  inputRef?: LegacyRef<TextInput>;
}

const SearchComponent = ({
  selectedTab,
  searchText,
  goBack,
  blurOnSubmit,
  placeholder,
  ...props
}: IPropsSearchComponent) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [searchTextInput, setSearchTextInput] = useState(searchText);

  useEffect(() => {
    setSearchTextInput('');
  }, [selectedTab]);

  const onChangeSearchValue = useCallback(
    (text: string) => {
      setSearchTextInput(text);
      props.onChangeSearchValue?.(text);
    },
    [props.onChangeSearchValue]
  );

  return (
    <View
      style={{
        height: scaleSize(isIos ? 80 : 60),
        display: 'flex',
      }}
    >
      {isIos ? (
        <Image source={HEADER_LIGHT_IOS} style={styles.headerLightStyle} />
      ) : (
        <Image source={HEADER_LIGHT_ANDROID} style={styles.headerLightStyle} />
      )}
      {isIos && <View style={{ height: scaleSize(35) }} />}
      <View
        style={[
          globalStyles.container,
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          styles.paddinngHorizontal,
        ]}
      >
        <TouchableOpacity onPress={goBack} style={styles.sizeTouchpad} hitSlop={HeaderButtonHitSlop}>
          <WhiteBackIcon height={scaleSize(24)} width={scaleSize(24)} />
        </TouchableOpacity>
        <View style={[globalStyles.container, styles.headerTitleContainer]}>
          <TextInputComponent
            defaultValue={searchTextInput}
            onChangeText={onChangeSearchValue}
            wholeContainerStyle={styles.wholeContainerStyle}
            placeholder={placeholder}
            textInputContainerStyle={isIos ? styles.textInputContainerIOS : styles.textInputContainer}
            placeholderTextColor={Colors.LIGHTTextDisable}
            returnKeyType={'search'}
            returnKeyLabel={t('Search')}
            icon={<Search height={scaleSize(16)} width={scaleSize(16)} style={styles.iconStyle} />}
            clearTextIcon={true}
            textInputStyle={styles.textInputStyle}
            blurOnSubmit={blurOnSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(SearchComponent);
