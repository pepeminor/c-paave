import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Platform, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import AccountPicker from 'components/AccountPicker';
import withMemo from 'HOC/withMemo';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import LeftButtonHeader from './LeftButtonHeader';

type IHeaderScreenBaseProps = {
  leftButtonIcon?: ReactElement | boolean; //ReactElement is custom, true is backButton, false | undefined is nothing
  rightButtonListIcon?: ReactElement[]; // it's icon size must be 24
  eachIconGap?: number; //if props.rightButtonListIcon has >= 2 element, must fill this props
  subAccountVisible?: boolean;
  disableVirtualAccount?: boolean;
  kisAccountNoSub?: boolean;
  extraLeftWidthView?: number;
  headerTitle: string | ReactElement;
  background?: boolean;
  backgroundStyle?: StyleProp<ViewStyle>;
  customBackground?: ReactElement;
  currentScreen?: ScreenNames | undefined;
  isNotSubD?: boolean;
  goBackAction?(): void; //if back buton is visible, fill this props
};

const HeaderScreen_flexDirectionRowAndAlignCenter = [globalStyles.flexDirectionRow, globalStyles.alignCenter];
const HeaderScreen_headerTitleString = [globalStyles.container, globalStyles.alignCenter];
const HeaderScreen_backgroundImageStyle: StyleProp<ImageStyle> = {
  width: '100%',
  height: '100%',
  position: 'absolute',
};

const HeaderScreen = (props: IHeaderScreenBaseProps) => {
  const { t } = useTranslation();
  const { styles, isDarkMode } = useStyles();

  const containerStyle = useMemo(() => {
    return [
      Platform.OS === 'ios' ? styles.headerHeightIOS : styles.headerHeightAndroid,
      props.background && styles.background,
      props.backgroundStyle,
    ];
  }, [props.backgroundStyle, props.background]);

  const extraSpaceViewStyle = useMemo(() => {
    return {
      width: scaleSize(props.eachIconGap != null ? props.eachIconGap : 0),
      opacity: 0,
    };
  }, [props.eachIconGap]);

  const extraLeftWidthViewStyle = useMemo(() => {
    return { width: scaleSize(props.extraLeftWidthView!) };
  }, [props.extraLeftWidthView]);

  return (
    <View style={containerStyle}>
      {props.customBackground ??
        (!props.background ? (
          Platform.OS === 'ios' ? (
            <Image
              source={
                isDarkMode
                  ? require('assets/component/HeaderDarkIOS.png')
                  : require('assets/component/HeaderLightIOS.png')
              }
              style={HeaderScreen_backgroundImageStyle}
            />
          ) : (
            <Image
              source={
                isDarkMode
                  ? require('assets/component/HeaderDarkAndroid.png')
                  : require('assets/component/HeaderLightAndroid.png')
              }
              style={HeaderScreen_backgroundImageStyle}
            />
          )
        ) : (
          <React.Fragment />
        ))}

      {Platform.OS === 'ios' && <View style={styles.moreViewIOS} />}
      <View style={styles.headerContainer}>
        <View style={styles.leftPart}>
          {props.rightButtonListIcon != null && props.rightButtonListIcon.length > 0 ? (
            props.rightButtonListIcon.map((_item, index) => {
              if (index === 0) {
                return (
                  <View key={`HeaderScreen_list2_${index}`} style={HeaderScreen_flexDirectionRowAndAlignCenter}>
                    <LeftButtonHeader
                      whiteSpaceIfNull={true}
                      leftButtonIcon={props.leftButtonIcon}
                      background={props.background}
                      goBackAction={props.goBackAction}
                    />
                    {index < props.rightButtonListIcon!.length - 1 && <View style={extraSpaceViewStyle}></View>}
                  </View>
                );
              } else {
                return (
                  <View key={`HeaderScreen_list3_${index}`} style={HeaderScreen_flexDirectionRowAndAlignCenter}>
                    {<View style={styles.blankSpace} />}
                    {index < props.rightButtonListIcon!.length - 1 && <View style={extraSpaceViewStyle} />}
                  </View>
                );
              }
            })
          ) : (
            <LeftButtonHeader
              whiteSpaceIfNull={false}
              leftButtonIcon={props.leftButtonIcon}
              background={props.background}
              goBackAction={props.goBackAction}
            />
          )}
          {props.extraLeftWidthView != null && <View style={extraLeftWidthViewStyle} />}
        </View>
        {typeof props.headerTitle === 'string' ? (
          <View style={HeaderScreen_headerTitleString}>
            <Text allowFontScaling={false} style={globalStyles.headerTitleText}>
              {t(props.headerTitle)}
            </Text>
            {props.subAccountVisible === true && (
              <AccountPicker
                currentScreen={props.currentScreen}
                disableVirtualAccount={props.disableVirtualAccount}
                kisAccountNoSub={props.kisAccountNoSub}
                isNotSubD={props.isNotSubD}
              />
            )}
          </View>
        ) : (
          props.headerTitle
        )}
        <View style={styles.rightPart}>
          {props.rightButtonListIcon != null && props.rightButtonListIcon.length > 0
            ? props.rightButtonListIcon.map((item, index) => {
                return (
                  <View key={`HeaderScreen_list1_${index}`} style={HeaderScreen_flexDirectionRowAndAlignCenter}>
                    {item}
                    {index < props.rightButtonListIcon!.length - 1 && <View style={extraSpaceViewStyle} />}
                  </View>
                );
              })
            : props.leftButtonIcon !== false && props.leftButtonIcon != null && <View style={styles.blankSpace} />}
        </View>
      </View>
    </View>
  );
};

export default withMemo(HeaderScreen);
