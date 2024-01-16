import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from 'styles';
import { SortType } from './TouchCell';
import Icon from 'components/Icon';
import { getStylesHook } from 'hooks/useStyles';

type CellProps = {
  isPLRate?: boolean;
  onPressChangePL?: () => void;
  onFilter?: (typeSort: SortType) => void;
  SortTypeList?: SortType[];
  isActiveFilter?: boolean;
  getSortType?: (type: SortType) => void;
  onPressCell?: () => void;
  sortType?: SortType;
};

const CellPL = ({
  isPLRate,
  onPressChangePL,
  onFilter,
  SortTypeList,
  isActiveFilter,
  getSortType,
  onPressCell,
  sortType,
}: CellProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const [typeSort, setTypeSort] = useState(0);
  const sortTypeList = SortTypeList ?? [SortType.NONE, SortType.ASC, SortType.DESC];

  useEffect(() => {
    if (sortType === SortType.NONE) {
      setTypeSort(0);
    }
    if (isActiveFilter) {
      onCompare(0);
    }
  }, [isActiveFilter]);

  const onPress = () => {
    onCompare(typeSort);
  };

  const onCompare = (typeIndex: number) => {
    const nextIndex = (typeIndex + 1) % sortTypeList.length;
    onFilter?.(sortTypeList[nextIndex]);
    setTypeSort(nextIndex);
    onPressCell?.();
    getSortType?.(sortTypeList[nextIndex]);
  };

  const getColor = (sortType: SortType) => {
    if (!isActiveFilter) {
      return dynamicColors.LIGHTGRAY;
    } else if (sortType === sortTypeList[typeSort]) {
      return dynamicColors.MainBlue;
    } else {
      return dynamicColors.LIGHTGRAY;
    }
  };
  return (
    <View style={styles.touchCellContainer}>
      {onFilter != null || onPressCell != null ? (
        <>
          <TouchableOpacity onPress={onPressChangePL}>
            <View style={styles.groupIconLeft}>
              <Icon
                style={styles.iconLeft}
                name={'line'}
                color={isPLRate ? dynamicColors.MainBlue : dynamicColors.LIGHTGRAY}
                size={8}
              />
              <Icon
                style={styles.iconLeft}
                name={'line'}
                color={!isPLRate ? dynamicColors.MainBlue : dynamicColors.LIGHTGRAY}
                size={8}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchCellRow} onPress={onPress}>
            {!isPLRate && <Text style={styles.headerText2}>{t('P/L')}</Text>}
            {isPLRate && <Text style={styles.headerText2}>{t('P/L (%)')}</Text>}
            <View style={styles.groupIcon}>
              <Icon name={'arrow-up-2'} color={getColor(SortType.ASC)} size={16} />
              <Icon style={styles.iconBottom} name={'arrow-down-2'} color={getColor(SortType.DESC)} size={16} />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.touchCellRow} onPress={onPressChangePL}>
          {!isPLRate && <Text style={styles.headerText2}>{t('P/L')}</Text>}
          {isPLRate && <Text style={styles.headerText2}>{t('P/L (%)')}</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(CellPL);

const useStyles = getStylesHook({
  touchCellContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  groupIcon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconLeft: {
    paddingLeft: 10,
    paddingRight: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBottom: {
    marginTop: -8,
  },
  iconLeft: {
    margin: -2,
  },
  touchCellRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText2: {
    flex: 7,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconPL: {
    flex: 3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
