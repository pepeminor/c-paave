import React, { useRef } from 'react';
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { IIndicatorModalProps, IIndicatorSelectionItem } from './IndicatorModal.type';
import useStyle from './IndicatorModal.style';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from 'config';

const initializeState = {};

const useIndicatorModalLogic = (props: IIndicatorModalProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyle();
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    handleChart: (item: IIndicatorSelectionItem) => {
      const optionItem = propsRef.current.chartOptions.find(chartOption => chartOption.studyName === item.name);
      if (optionItem != null) {
        propsRef.current.webViewRef.current?.injectJavaScript(
          `
            window['${config.widgetName}'].activeChart().removeEntity('${optionItem.entityId}');
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'REMOVE', studyName: '${optionItem.studyName}'}));
          `
        );
      } else {
        propsRef.current.webViewRef.current?.injectJavaScript(item.activeMessage);
      }
    },

    RenderIndicatorItem: (List: IIndicatorSelectionItem[]) => {
      return List.map((item, index) => {
        let buttonStyle = styles.contentIndicatorBtn;
        let textStyle = styles.contentIndicatorText;
        if (index < List.length - 1) {
          buttonStyle = { ...buttonStyle, ...styles.marginRight5 };
        }

        const isActive = propsRef.current.chartOptions.find(chartOption => chartOption.studyName === item.name) != null;

        if (isActive) {
          textStyle = { ...textStyle, ...styles.contentIndicatorTextActive };
        }

        if (item.symbolicColor != null) {
          if (isActive) {
            buttonStyle = { ...buttonStyle, backgroundColor: item.symbolicColor };
          } else {
            buttonStyle = { ...buttonStyle, backgroundColor: dynamicColors.WHITE, borderColor: item.symbolicColor };
            textStyle = { ...textStyle, color: item.symbolicColor };
          }
        }

        if (item.symbolicColor == null && isActive) {
          buttonStyle = { ...buttonStyle, ...styles.contentIndicatorBtnActive };
        }

        return (
          <TouchableOpacity key={`${item.label}`} style={buttonStyle} onPress={() => handlers.handleChart(item)}>
            <Text allowFontScaling={false} style={textStyle}>
              {t(item.label)}
            </Text>
          </TouchableOpacity>
        );
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export default useIndicatorModalLogic;
