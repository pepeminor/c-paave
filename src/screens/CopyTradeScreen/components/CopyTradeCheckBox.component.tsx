import React, { memo, useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors as Colors, scaleSize, textStyles } from 'styles';
import CheckBox from 'components/CheckBox';
import ModalBottom from 'components/ModalBottom';
import { AgreementSection, ContestContent } from 'interfaces/File';
import RenderHTML from 'react-native-render-html';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { getStylesHook } from 'hooks/useStyles';
import { store } from 'screens/App';

export interface IProps {
  isChecked: boolean;
  error: string;
  onPress?: () => void;
  setError?: (error: string) => void;
  isDisabled?: boolean;
}

const CopyTradeCheckBox = ({ isChecked, error, onPress, setError, isDisabled }: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const isAgreementViewed = useAppSelector(state => state.copyTrade.termAndConditionViewed);

  const handlePress = useCallback(() => {
    if (!isAgreementViewed) {
      setError?.('AGREEMENT_NOT_VIEWED');
      return;
    }
    onPress?.();
  }, [isAgreementViewed]);

  return (
    <CheckBox value={isChecked} onPress={handlePress} style={[styles.mt16, styles.mr8]} disabled={isDisabled}>
      <Text allowFontScaling={false} style={styles.infoText}>
        {t('I have read and agreed to')} <Agreement setError={setError} />
      </Text>
      {error !== '' && (
        <Text allowFontScaling={false} style={styles.errorText}>
          {t(error)}
        </Text>
      )}
    </CheckBox>
  );
};

export const Agreement = memo(({ setError }: { setError?: (error: string) => void }) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = useCallback(() => {
    setError?.('');
    const isDataAvailable = store.getState().autoTradeAgreement != null;
    dispatch(CopyTradeAction.setTermAndConditionViewed());
    if (isDataAvailable) setModalVisible(true);
  }, [setModalVisible]);

  return (
    <View>
      <Text allowFontScaling={false} style={styles.agreementText} onPress={handleModal}>
        {t('Paave Autotrade Agreement')}
      </Text>
      {modalVisible && (
        <ModalBottom setVisible={setModalVisible} visible={modalVisible}>
          <AgreementModal />
        </ModalBottom>
      )}
    </View>
  );
});

const AgreementModal = memo(() => {
  const { styles } = useStyles();
  const lang = useAppSelector(state => state.lang);
  const data = useAppSelector(state => {
    const data = state.autoTradeAgreement;
    if (data == null) return [];
    return data[lang] ?? data.en ?? data.vi ?? data.ko ?? [];
  });

  return (
    <View style={styles.agreementContainer}>
      <ScrollView style={[globalStyles.container, styles.ph16]}>
        {data.map((section, index) => (
          <RenderSection key={index} {...section} />
        ))}
      </ScrollView>
    </View>
  );
});

const RenderSection = memo(({ title, content }: AgreementSection) => {
  const { styles } = useStyles();
  return (
    <>
      <Text allowFontScaling={false} style={[styles.header2, styles.pt8]}>
        {title}
      </Text>
      <View style={[Array.isArray(content) && styles.shiftLeft16]}>
        <RenderSectionContent content={content} />
      </View>
    </>
  );
});

const RenderSectionContent = memo(({ content }: { content: ContestContent }) => {
  const { styles } = useStyles();
  if (typeof content === 'string') {
    const fontSize = `${scaleSize(14)}px`;
    const lineHeight = `${scaleSize(18)}px`;
    return (
      <>
        <View style={[styles.pt8]}>
          <RenderHTML
            source={{
              html: `<span style="font-size: ${fontSize}; line-height: ${lineHeight}; font-family: 'Roboto';color: black;">${content}</span>`,
            }}
            contentWidth={scaleSize(375)}
          />
        </View>
      </>
    );
  }
  return (
    <View style={[styles.pl16]}>
      {content.map((item, index) => (
        <RenderSectionContent content={item} key={index} />
      ))}
    </View>
  );
});

const useStyles = getStylesHook({
  mt16: {
    marginTop: 16,
  },
  mr8: {
    marginRight: 8,
  },
  infoText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextContent,
    paddingRight: 16,
  },
  agreementText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
  },
  errorText: {
    ...textStyles.fontSize13,
    ...textStyles.roboto400,
    color: Colors.LIGHTRed,
  },
  pt8: {
    paddingTop: 8,
  },
  pl16: {
    paddingLeft: 16,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  shiftLeft16: {
    marginLeft: -16,
  },
  header2: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.MainBlue,
  },
  agreementContainer: {
    height: '90%',
    paddingVertical: 48,
  },
});

export default memo(CopyTradeCheckBox);
