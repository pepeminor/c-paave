import React, { memo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import IconChoose from 'assets/icon/IconChooese.svg';
import UnChoose from 'assets/icon/UnChooese.svg';
import { useTranslation } from 'react-i18next';
export * from './RadioButton';

export interface IRadioProps {
  readonly options: string[];
  readonly horizontal?: boolean;
  readonly onChangeSelect: (i: React.SetStateAction<number>) => void;
  readonly selected: number;
  readonly textOptions: (string | TextOptionComponent)[][];
}

type TextOptionComponent = {
  component: JSX.Element;
  showWhenChosen?: boolean;
};

const Radio = ({
  options,
  // horizontal = false,
  onChangeSelect,
  selected,
  textOptions,
}: IRadioProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      {options.map((opt, index) => {
        const isChosen = selected === index;
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              onChangeSelect(index);
            }}
          >
            <View style={[styles.containerBox]}>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.container]}>
                {isChosen ? (
                  <IconChoose height={scaleSize(24)} width={scaleSize(24)} />
                ) : (
                  <UnChoose height={scaleSize(24)} width={scaleSize(24)} />
                )}
                <Text allowFontScaling={false} style={[styles.TxtTitle]}>
                  {t(opt)}
                </Text>
              </View>
              <View style={styles.containerText}>
                {textOptions[index]?.map((textOpt, textOptIndex) =>
                  typeof textOpt === 'string' ? (
                    <View key={textOptIndex} style={[globalStyles.flexDirectionRow]}>
                      <Text allowFontScaling={false} style={styles.textContentT}>
                        ・{' '}
                      </Text>
                      <Text allowFontScaling={false} style={styles.textContent}>
                        {t(textOpt)}
                      </Text>
                    </View>
                  ) : (
                    (textOpt.showWhenChosen != null ? isChosen : true) && textOpt.component
                  )
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default memo(Radio);
