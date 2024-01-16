import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IGetAllSymbolFavoriteResponse } from 'interfaces/favorite';
import withMemo from 'HOC/withMemo';
import useStyles from './DeleteSymbols.style';
import ImagesLogo from 'components/ImagesLogo';
import { LANG } from 'global';
import { scaleSize } from 'styles';
import NoHeart from 'assets/icon/NoHeart.svg';
import Heart from 'assets/icon/Heart.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import useUpdateEffect from 'hooks/useUpdateEffect';

interface IWatchlistItemProps {
  item: IGetAllSymbolFavoriteResponse;
  handleSymbolItem: () => void;
  isHeart: boolean;
}

const SymbolItem = (props: IWatchlistItemProps) => {
  const { styles } = useStyles();
  const [isHeart, setIsHeart] = React.useState<boolean>(props.isHeart);
  const lang = useAppSelector(state => state.lang);
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(props.item.code), {
    symbolCode: true,
    vietnameseName: true,
    englishName: true,
  });

  useUpdateEffect(() => {
    setIsHeart(props.isHeart);
  }, [props.isHeart]);

  const handleHeart = React.useCallback(() => {
    props.handleSymbolItem();
    setIsHeart(prev => !prev);
  }, [props.handleSymbolItem]);

  return symbolData != null ? (
    <TouchableOpacity style={styles.symbolItemContainer} onPress={handleHeart}>
      <ImagesLogo codeLogo={symbolData.symbolCode} logoSize={34} logoStyle={styles.logoContainer} />
      <View style={styles.nameContainer}>
        <Text allowFontScaling={false} style={styles.stockCodeText}>
          {symbolData.symbolCode}
        </Text>
        <Text allowFontScaling={false} style={styles.fullNameText}>
          {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
        </Text>
      </View>

      <View style={styles.heartContainer}>
        {isHeart ? (
          <Heart width={scaleSize(20)} height={scaleSize(19)} />
        ) : (
          <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
        )}
      </View>
    </TouchableOpacity>
  ) : null;
};

export default withMemo(SymbolItem);
