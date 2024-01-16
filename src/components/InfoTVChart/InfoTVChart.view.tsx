import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scaleSize } from 'styles';
import Icon from 'components/Icon';
import IndicatorModal from './components/IndicatorModal';
import ModalBottom from 'components/ModalBottom';
import withMemo from 'HOC/withMemo';
import { IInfoTVChartProps, OtherButton } from './InfoTVChart.type';
import useStyle from './InfoTVChart.style';
import useInfoTVChart from './InfoTVChart.logic';
import { getButtonList, isTVChartFilter } from './InfoTVChart.helper';
import { useTranslation } from 'react-i18next';
import TradingViewChart from './components/TradingViewChart';
import HandIcon from 'assets/icon/Hand.svg';

const InfoTVChartView = (props: IInfoTVChartProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyle();
  const { state, handlers, refs, constants } = useInfoTVChart(props);

  return (
    <View ref={refs.componentContainerRef} style={props.containerStyle} onLayout={handlers.onComponentContainerLayout}>
      <View ref={refs.chartContainerRef} style={props.tvContainerStyle} onLayout={handlers.onChartContainerLayout}>
        <TradingViewChart
          s={props.s}
          lang={props.lang}
          resolution={constants.resolution}
          timeframe={constants.timeframe}
          refreshVersion={state.tradingViewRefreshVersion}
          ref={refs.webViewRef}
          onMessage={handlers.onMessage}
          enabledInteract={state.enabledInteract}
        />
      </View>
      <View style={props.btnContainerStyle}>
        {getButtonList(props).map(value => {
          const ButtonIcon = (value as OtherButton).icon;
          return (
            <TouchableOpacity
              key={value.value}
              onPress={() => handlers.onPressFilter(value)}
              style={
                value.style ?? (state.filterSelect.value === value.value ? props.selectedBtnStyle : props.btnStyle)
              }
            >
              {isTVChartFilter(value) && (
                <Text
                  style={state.filterSelect.value === value.value ? props.selectedBtnLabelStyle : props.btnLabelStyle}
                >
                  {t(`${value.name}`)}
                </Text>
              )}
              {ButtonIcon && <ButtonIcon fill={dynamicColors.BlueNewColor} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {!props.enableChartSetting ? null : (
        <View style={styles.chartOptionContainer}>
          {/* DON'T REMOVE */}
          {/* <Dropdown
            style={styles.chartOptionButtonMargin}
            containerStyle={styles.borderRadius15}
            itemContainerStyle={styles.borderRadius15}
            data={ResolutionList}
            labelField="label"
            valueField="value"
            value={state.resolution}
            onChange={handlers.onResolutionChange}
            onFocus={handlers.onOpenResolutionDropdown}
            onBlur={handlers.onCloseResolutionDropdown}
            activeColor={dynamicColors.BORDER}
            itemTextStyle={{ color: dynamicColors.BlueNewColor }}
            selectedTextProps={{ style: styles.buttonText }}
            renderRightIcon={() => (
              <Icon
                name={state.resolutionDropdownVisible ? 'arrow-up-2' : 'arrow-down-2'}
                color={dynamicColors.BlueNewColor}
                size={scaleSize(18)}
                style={styles.iconStyle}
              />
            )}
          /> */}
          <TouchableOpacity
            style={state.enabledInteract ? styles.chartOptionButtonMarginZoomEnabled : styles.chartOptionButtonMargin}
            onPress={handlers.onEnableInteract}
          >
            <HandIcon
              fill={state.enabledInteract ? dynamicColors.WHITE : dynamicColors.BlueNewColor}
              width={scaleSize(18)}
              height={scaleSize(14)}
            />
            <Text style={state.enabledInteract ? styles.buttonTextZoomEnabled : styles.buttonText}>{t('Zoom')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chartOptionButtonMargin} onPress={handlers.onIndicatorModalOpen}>
            <Icon name="series-indicators" color={dynamicColors.BlueNewColor} size={scaleSize(18)} />
            <Text style={styles.buttonText}>{t('Indicators')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chartOptionButton} onPress={handlers.switchChartType}>
            <Icon name={handlers.chartValue().icon} color={dynamicColors.BlueNewColor} size={scaleSize(18)} />
            <Text style={styles.buttonText}>{t(handlers.chartValue().name)}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalBottom
        visible={state.indicatorModalVisible}
        setVisible={handlers.onIndicatorModalVisible}
        underlayStyle={styles.underlayStyle}
        closeButtonStyle={styles.hiddenCloseButton}
      >
        <IndicatorModal
          webViewRef={refs.webViewRef}
          chartOptions={state.chartOptions}
          closeModal={handlers.onIndicatorModalDismiss}
        />
      </ModalBottom>
    </View>
  );
};

export default withMemo(InfoTVChartView);
