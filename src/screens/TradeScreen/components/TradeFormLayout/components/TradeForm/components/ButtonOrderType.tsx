import withMemo from 'HOC/withMemo';
import Icon from 'components/Icon';
import React, { FunctionComponent, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import TradeOrderQuestion from './TradeOrderQuestion';
import { t } from 'i18next';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors } from 'styles';
import { ORDER_TYPE } from 'global';
import { IOrderTypeModalBaseProps } from './OrderTypeModal';

interface IProps {
  filterSelecting: ORDER_TYPE;
  onSelectFilter: (filterSelecting: ORDER_TYPE) => void;
}

const ButtonOrderType = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const ModalOrderType = useRef<FunctionComponent<IOrderTypeModalBaseProps>>();
  const [visibleModalOrderType, setVisibleModalOrderType] = useState(false);

  const handlers = {
    onShowOrderTypeModal: () => {
      if (ModalOrderType) {
        ModalOrderType.current = require('./OrderTypeModal/index.tsx').default;
      }

      setVisibleModalOrderType(true);
    },
    closeOrderTypeModal: () => {
      ModalOrderType.current = undefined;
      setVisibleModalOrderType(false);
    },
  };

  return (
    <View style={styles.typeFormContainer}>
      <TouchableOpacity onPress={handlers.onShowOrderTypeModal} style={styles.typePickerContainer}>
        <Text allowFontScaling={false} style={styles.colorLightTextContent}>
          {props.filterSelecting === ORDER_TYPE.NORMAL_ORDER ? t('Normal Order') : t('Stop Order')}
        </Text>
        <Icon size={24} name={'arrow-down-3'} color={dynamicColors.LIGHTGRAY} />
      </TouchableOpacity>
      <TradeOrderQuestion filterSelecting={props.filterSelecting} />

      {ModalOrderType.current && (
        <ModalOrderType.current
          visible={visibleModalOrderType}
          filterSelecting={props.filterSelecting}
          closeOrderTypeModal={handlers.closeOrderTypeModal}
          onSelectFilter={props.onSelectFilter}
        />
      )}
    </View>
  );
};

const useStyles = getStylesHook({
  typeFormContainer: {
    ...globalStyles.flexDirectionRow,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingRight: 16,
    marginVertical: 8,
  },
  typePickerContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    ...(Platform.OS === 'ios' ? {} : globalStyles.justifySpaceBetween),
    paddingHorizontal: 10,
    borderColor: lightColors.BORDER,
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: '84%',
  },
  colorLightTextContent: {
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    marginRight: 8,
    ...(Platform.OS === 'ios' ? globalStyles.container : {}),
  },
});

export default withMemo(ButtonOrderType);
