import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';
import Icon from 'components/Icon';

type IProps = {
  onPress?: (typeSort: SortType) => void;
  title: string;
  SortTypeList?: SortType[];
  isActiveFilter?: boolean;
  onPressCell?: () => void;
  getSortType?: (type: SortType) => void;
  sortType?: SortType;
};

export enum SortType {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}
export const SortTypeList = [SortType.NONE, SortType.ASC, SortType.DESC];

const TouchCell = (props: IProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const { SortTypeList = [SortType.NONE, SortType.ASC, SortType.DESC] } = props;

  const [typeSort, setTypeSort] = useState(0);

  useEffect(() => {
    if (props.sortType === SortType.NONE) {
      setTypeSort(0);
    }
    if (props.isActiveFilter) {
      sortList(0);
    }
  }, [props.isActiveFilter]);

  const onPress = () => {
    sortList(typeSort);
  };

  const sortList = (typeIndex: number) => {
    const nextIndex = (typeIndex + 1) % SortTypeList.length;
    props.onPress?.(SortTypeList[nextIndex]);
    setTypeSort(nextIndex);
    props.getSortType?.(SortTypeList[nextIndex]);
    props.onPressCell?.();
  };

  const getColor = (sortType: SortType) => {
    if (!props.isActiveFilter) {
      return dynamicColors.LIGHTGRAY;
    } else if (sortType === SortTypeList[typeSort]) {
      return dynamicColors.MainBlue;
    } else {
      return dynamicColors.LIGHTGRAY;
    }
  };

  return (
    <TouchableOpacity style={styles.touchCell} onPress={onPress}>
      <Text style={styles.headerText}>{t(props.title)}</Text>
      <View style={styles.groupIcon}>
        <Icon name={'arrow-up-2'} color={getColor(SortType.ASC)} size={16} />
        <Icon style={styles.iconBottom} name={'arrow-down-2'} color={getColor(SortType.DESC)} size={16} />
      </View>
    </TouchableOpacity>
  );
};

export default withMemo(TouchCell);

const useStyles = getStylesHook({
  touchCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },

  iconBottom: {
    marginTop: -8,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
});
