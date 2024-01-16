import { ImageStyle, PixelRatio, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Dimensions, Platform } from 'react-native';

export const isPlatformIOs = Platform.OS === 'ios';

export const { width, height } = Dimensions.get('window');
export const SCREEN_RATIO = width / height;

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
}

export const calWidthDP = (percent: number) => {
  if (!Number(percent)) return 0;
  return width * (percent / 100);
};

export const calHeightDP = (percent: number) => {
  if (!Number(percent)) return 0;
  return height * (percent / 100);
};

export const widthDP = (() => {
  const caching: { [s: string]: number } = {};
  return (percent: number) => {
    if (!(percent in caching)) {
      caching[percent] = calWidthDP(percent);
    }
    return caching[percent];
  };
})();

export const heightDP = (() => {
  const caching: { [s: string]: number } = {};
  return (percent: number) => {
    if (!(percent in caching)) {
      caching[percent] = calHeightDP(percent);
    }
    return caching[percent];
  };
})();

export const scaleDPHeight = (size: number) => {
  const isNotHalf = size?.toString().slice(-2) !== '.5';
  const newSize = (size * height) / 812;
  return isNotHalf ? PixelRatio.roundToNearestPixel(Math.round(newSize)) : PixelRatio.roundToNearestPixel(newSize);
};

export const scaleDP = (size: number) => {
  const isNotHalf = size?.toString().slice(-2) !== '.5';
  const newSize = (size * width) / 375;
  return isNotHalf ? PixelRatio.roundToNearestPixel(Math.round(newSize)) : PixelRatio.roundToNearestPixel(newSize);
};

export const scaleSizeHeight = (() => {
  const caching: { [s: string]: number } = {};
  return (size: number) => {
    if (!(size in caching)) {
      caching[size] = scaleDPHeight(size);
    }
    return caching[size];
  };
})();

export const scaleSize = (() => {
  const caching: { [s: string]: number } = {};
  return (size: number) => {
    if (!(size in caching)) {
      caching[size] = scaleDP(size);
    }
    return caching[size];
  };
})();

export const Colors = {
  BLACK: 'rgb(0, 0, 0)',
  BLACK_1: '#000000',
  BLACK_65: 'rgba(0, 0, 0, 0.65)',
  Transparent: 'rgba(0,0,0,0)',
  WHITE: '#FFFFFF',
  WHITE08: 'rgba(255,255,255, 0.8)',
  WHITE015: 'rgba(255,255,255, 0.15)',
  RedColorLogo: '#DB4626',
  LIGHTTextTitle: '#53677F',
  LIGHTTextBigTitle: 'rgba(48, 62, 103, 1)',
  LIGHTTextContent: '#333333',
  LIGHTBackground: '#EDF0F4',
  UpIconBackGround: 'rgba(190, 202, 229, 0.5)',
  BlueNewColor: '#3B56A4',
  DeepBlueColor: '#04164D',
  BACKGROUND_MODAL: 'rgba(194, 194, 194, 0.5)',
  BACKGROUND_MODAL2: 'rgba(6, 13, 45, 0.8)',
  BACKGROUND_MODAL3: 'rgba(0, 0, 0, 0.3)',
  BORDER: '#EDF0F4',
  BORDER2: '#E5E5E5',
  LIGHTTextDisable: '#8691B3',
  LIGHTTitleTable: '#F8FAFD',
  LIGHTRed: 'rgba(224, 64, 54, 1)',
  LIGHTYellow: '#FCAF17',
  LIGHTBGTab: '#EDF1F7',
  LIGHTGreen: '#09C591',
  DARK_GREEN: '#32864e',
  LIGHTRed2: '#E04036',
  LIGHTRed3: '#E0403620',
  MainBlue: '#506CE1',
  LIGHTButtonRed: '#EB554C',
  LIGHTButtonGreen: '#0BCB96',
  DARKButtonGreen: '#37a95e',
  LIGHTPurple: '#B413EC',
  LIGHTTeal: '#00B4D8',
  LIGHTGRAY: '#BECAE5',
  DARKiconDisable: '#606672',
  DARKTextDisable: '#8E97A1',
  Ask: 'rgba(235, 85, 76, 0.3)',
  Bid: 'rgba(11, 203, 150, 0.3)',
  LIGHTIconDisable: '#BECAE5',
  LIGHTText: '#303E67',
  ModalBackgroundColor: '#060D2D80',
  Green1: '#219653',
  Blue1: '#2F80ED',
  Blue2: '#659AD2',
  Blue3: '#163DB1',
  Blue4: '#045FC1',
  Blue5: '#0C4A94',
  Blue6: '#3F91E9',
  Blue7: '#8CBDF2',
  Blue8: '#0C4A94',
  Blue9: '#4198F6',
  yellow: '#F8CD41',
  Yellow1: 'rgba(253, 182, 20, 0.4)',
  Yellow2: '#FDB614',
  Yellow3: '#FFF9EC',
  Yellow4: '#F0D466',
  Yellow5: '#FFCF26',
  Green2: 'rgba(48, 115, 70, 0.4)',
  Pink: 'rgba(235, 85, 76, 0.2);',
  SecondColorsLogo: '#6EC2D2',
  Gray2: '#4F4F4F',
  Gray3: '#F2F2F6',
  white10: 'rgba(255,255,255,0.1)',
  white15: 'rgba(255,255,255,0.15)',
  DARKTextTitle: '#979db5',
  DARKTextBigTitle: '#c9d4e5',
  Varden: ['#FFF6E0', '#1B212C'],
  Mischka: ['#E4E4E8', '#1B212C'],
  CreamBrulee: '#FFDEA3',
  Atlantis: '#8FC93A',
  caribBean: 'rgba(11, 203, 150, 0.2)',
  BaliHai: '#8691B3',
  red01: 'rgba(224, 64, 54, 0.1)',
  Ask1: 'rgba(235, 85, 76, 1)',
  AirCraftWhite: 'rgb(237, 241, 247)',
  WHITEBlur: '#FFFFFF1A',
  pink: '#FF4C5C',
  green: '#00C593',
  DarkBrow: '#461811',
  FuchsiaPurple: '#C400FF',
  OrangePeel: '#FFB400',
  NavyBlue: '#0046FF',
  CaribbeanGreen: '#01D89B',
  TextDescription: '#686682',
  Smalt: '#002799',
  CrystalBlue: '#55B8FF',
};

export const GradientColors = {
  NewGradientColor: ['#71CBD5', '#323E98'],
  GradientYellow: ['#FFE985', '#FFA927'],
  GradientBlue: ['#3DDBDD', '#1036D3'],
  GradientYellow2: ['#F0D466', '#E5870D'],
};

export type IColorKey = keyof typeof Colors;

export type IColors = {
  [P in IColorKey]: string;
};

const lightColors = {} as IColors;
const darkColors = {} as IColors;
const mapDarkColorObj = {} as { [lightColorKey: string]: string };

const getLightColorKey = (lightColor: string) => {
  return lightColor?.replace?.(/\s/g, '');
};

Object.entries(Colors).forEach(([key, value]) => {
  lightColors[key as IColorKey] = value as string;
});

for (const [key, value] of Object.entries(Colors)) {
  const k = key as IColorKey;
  lightColors[k] = typeof value === 'string' ? value : value?.[0];
  darkColors[k] = typeof value === 'string' ? value : value?.[1] ?? value?.[0];
  mapDarkColorObj[getLightColorKey(lightColors[k])] = darkColors[k];
}

const getDarkColorBy = (lightColor: string) => {
  return mapDarkColorObj?.[getLightColorKey(lightColor)] ?? lightColor;
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAbsolute: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  containerGrow0: {
    flexGrow: 0,
  },
  containerGrow1: {
    flexGrow: 1,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  hide: {
    display: 'none',
  },
  borderRadiusSkeletonLoadText: {
    borderRadius: 5,
  },
  container2: {
    width: '100%',
    height: '100%',
  },
  fillWidth: {
    width: '100%',
  },
  width90Percent: {
    width: '90%',
  },
  width80Percent: {
    width: '80%',
  },
  width70Percent: {
    width: '70%',
  },
  width60Percent: {
    width: '60%',
  },
  width50Percent: {
    width: '50%',
  },
  width40Percent: {
    width: '40%',
  },
  width30Percent: {
    width: '30%',
  },
  width20Percent: {
    width: '20%',
  },
  width10Percent: {
    width: '10%',
  },
  height10Percent: {
    height: '10%',
  },
  height20Percent: {
    height: '20%',
  },
  height30Percent: {
    height: '30%',
  },
  height40Percent: {
    height: '40%',
  },
  height50Percent: {
    height: '50%',
  },
  height60Percent: {
    height: '60%',
  },
  height70Percent: {
    height: '70%',
  },
  height80Percent: {
    height: '80%',
  },
  height90Percent: {
    height: '90%',
  },
  fillHeight: {
    height: '100%',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  backgroundColorAsk: {
    backgroundColor: Colors.Ask,
  },
  backgroundColorBid: {
    backgroundColor: Colors.Bid,
  },
  backgroundColorLightDisable: {
    backgroundColor: Colors.LIGHTIconDisable,
  },
  backgroundDeepBlue: {
    backgroundColor: Colors.DeepBlueColor,
  },
  containerBackground: {
    backgroundColor: Colors.WHITE,
  },
  positionAbsolute: {
    position: 'absolute',
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL,
  },
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionCol: {
    flexDirection: 'column',
  },
  alignSpaceAround: {
    alignContent: 'space-around',
  },
  alignSpaceBetween: {
    alignContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceEvenly: {
    justifyContent: 'space-evenly',
  },
  invisibleBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  colorUp: {
    color: lightColors.DARK_GREEN,
  },
  noData: {
    color: lightColors.BLACK,
  },
  colorCeiling: {
    color: lightColors.LIGHTPurple,
  },
  colorFloor: {
    color: lightColors.LIGHTTeal,
  },
  colorReference: {
    color: lightColors.LIGHTYellow,
  },
  backgroundColorUp: {
    backgroundColor: lightColors.DARK_GREEN,
  },
  colorDown: {
    color: lightColors.LIGHTRed2,
  },
  backgroundColorDown: {
    backgroundColor: lightColors.LIGHTRed2,
  },
  colorSteady: {
    color: lightColors.BLACK,
  },
  backgroundColorSteadyn: {
    backgroundColor: lightColors.BLACK,
  },
  disableBackground: {
    opacity: 0.5,
  },
  disableBackground2: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  enableBackground: {
    opacity: 1,
  },
  headerTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: lightColors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  borderTop1: {
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 1,
  },
  borderLeft1: {
    borderLeftColor: lightColors.BORDER,
    borderLeftWidth: 1,
  },
  borderRight1: {
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },
  borderBottom1: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  containerSupport: {
    marginLeft: 277,
    marginRight: 32,
    marginBottom: 23,
    marginTop: -100,
    alignItems: 'flex-end',
  },
  padding16: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textMainBlue: {
    color: lightColors.MainBlue,
  },
  modalBackgroundUpdate: {
    paddingVertical: 4,
  },
  modalBackgroundUpdate2: {
    paddingVertical: 16,
  },
  borderModalUpdate: {
    borderRadius: 20,
  },
  textColorModalUpdate: {
    color: lightColors.LIGHTTextContent,
  },
  textColorModalUpdate2: {
    color: lightColors.WHITE,
  },
  textFontWeightNormal: {
    fontWeight: '400',
  },
  textFontWeightBold: {
    fontWeight: 'bold',
  },
  textModalUpdate: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  textTitleModalUpdate: {
    fontSize: 18,
    color: lightColors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 22,
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    borderBottomColor: lightColors.BORDER2,
  },
  executeFormButton: {
    height: 44,
    borderRadius: 10,
    marginTop: 14,
    marginBottom: 8,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
});

export const textStyles = StyleSheet.create({
  fontSize10: {
    fontSize: 10,
    lineHeight: 14,
  },
  fontSize12: {
    fontSize: 12,
    lineHeight: 16,
  },
  fontSize13: {
    fontSize: 13,
    lineHeight: 16,
  },
  fontSize14: {
    fontSize: 14,
    lineHeight: 18,
  },
  fontSize16: {
    fontSize: 16,
    lineHeight: 22,
  },
  fontSize18: {
    fontSize: 18,
    lineHeight: 24,
  },
  fontSize20: {
    fontSize: 20,
    lineHeight: 26,
  },
  fontSize22: {
    fontSize: 22,
    lineHeight: 28,
  },
  fontSize24: {
    fontSize: 24,
    lineHeight: 30,
  },
  roboto400: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: lightColors.BLACK,
  },
  roboto500: {
    fontWeight: '500',
    fontFamily: 'Roboto',
    color: lightColors.BLACK,
  },
  roboto600: {
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: lightColors.BLACK,
  },
  roboto700: {
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: lightColors.BLACK,
  },
  dinOt400: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '400',
    color: lightColors.BLACK,
  },
  dinOt500: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontWeight: '500',
    color: lightColors.BLACK,
  },
});

export { lightColors, darkColors, getDarkColorBy, mapDarkColorObj };

interface IConditionStyle {
  [s: string]: boolean;
}

export function classes(...params: Array<ViewStyle | TextStyle | ImageStyle | IConditionStyle>) {
  let result = {};
  params.forEach(param => {
    if (!param) return;

    const keys = Object.keys(param);
    const values = Object.values(param);

    if (values.includes(true)) {
      keys.forEach(key => {
        if ((param as IConditionStyle)[key] === true && key.match(/^\s*(\{.*\})\s*$/)) {
          result = { ...result, ...JSON.parse(key) };
        }
      });
    } else {
      result = { ...result, ...param };
    }
  });

  return result;
}

export default globalStyles;
