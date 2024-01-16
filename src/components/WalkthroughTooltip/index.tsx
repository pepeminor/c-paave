import React, { PropsWithChildren, forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';
import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export interface IProps extends TouchableOpacityProps {
  title?: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  absoluteTooltip?: boolean;
  topAdjustment?: number;
  tooltipFontSize?: 'small' | 'normal';
}

export type WalkthroughTooltip = {
  setVisible: (visible: boolean) => void;
};

export const WalkthroughTooltip = memo(
  forwardRef<WalkthroughTooltip, PropsWithChildren<IProps>>(
    (
      {
        title = '',
        content,
        placement = 'left',
        children,
        style,
        absoluteTooltip = false,
        topAdjustment = 0,
        tooltipFontSize = 'normal',

        ...viewProps
      },
      ref
    ) => {
      const { styles } = useStyles();
      const [visible, setVisible] = useState(false);

      useImperativeHandle(
        ref,
        () => ({
          setVisible,
        }),
        []
      );

      const handleTooltip = useCallback(() => {
        setVisible(visible => !visible);
      }, []);

      return (
        <TouchableOpacity onPress={handleTooltip} style={[styles.tooltipContainer, style]} {...viewProps}>
          <Tooltip
            isVisible={visible}
            content={<TooltipContent title={title} content={content} tooltipFontSize={tooltipFontSize} />}
            placement={placement}
            onClose={handleTooltip}
            backgroundColor={Colors.Transparent}
            contentStyle={styles.tooltip}
            disableShadow={true}
            topAdjustment={topAdjustment}
          >
            {!absoluteTooltip && children}
          </Tooltip>
          {absoluteTooltip && children}
        </TouchableOpacity>
      );
    }
  )
);

type TooltipContentProps = {
  title: string;
  content: string;
  tooltipFontSize: 'small' | 'normal';
};

const TooltipContent = memo(({ title, content, tooltipFontSize }: TooltipContentProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={globalStyles.container}>
      {title !== '' && (
        <Text
          allowFontScaling={false}
          style={tooltipFontSize === 'small' ? styles.tooltipTitleSmall : styles.tooltipTitleNormal}
        >
          {t(title)}
        </Text>
      )}
      {content !== '' && (
        <Text
          allowFontScaling={false}
          style={tooltipFontSize === 'small' ? styles.tooltipContentSmall : styles.tooltipContentNormal}
        >
          {t(content)}
        </Text>
      )}
    </View>
  );
});

const useStyles = getStylesHook({
  tooltip: {
    height: 'auto',
    backgroundColor: Colors.BlueNewColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 13,
  },
  tooltipContainer: {
    padding: 2,
  },
  tooltipContentSmall: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: Colors.WHITE,
  },
  tooltipTitleSmall: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    paddingBottom: 5,
  },
  tooltipContentNormal: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.WHITE,
  },
  tooltipTitleNormal: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    paddingBottom: 5,
  },
});
