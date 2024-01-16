import { changeLanguage } from 'reduxs/Localization';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { ILanguageOption, languageList } from 'global';
import globalStyles, { scaleSize } from 'styles';
import React, { memo, useCallback, useState } from 'react';
import English from 'assets/flag/English.svg';
import useStyles from './styles';
import Modal from '../Modal';
import { useAppSelector } from 'hooks/useAppSelector';

type LanguagePickerProps = {
  textStyles?: StyleProp<TextStyle>;
};

const LanguagePicker = ({ textStyles }: LanguagePickerProps) => {
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLanguage = useAppSelector(state => state.lang);
  const lang = languageList.find(l => l.value === selectedLanguage);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <TouchableOpacity onPress={openModal} style={[globalStyles.flexDirectionRow, globalStyles.centered]}>
      <LanguageRender lang={lang} textStyles={textStyles} />
      {modalVisible && (
        <Modal visible={modalVisible} onRequestClose={closeModal}>
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <LanguageListRender setModalVisible={setModalVisible} />
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

type LanguageRenderProps = {
  lang?: ILanguageOption;
  textStyles?: StyleProp<TextStyle>;
};

const LanguageRender = memo(({ lang, textStyles }: LanguageRenderProps) => {
  const { styles } = useStyles();
  return lang != null ? (
    <>
      <Text allowFontScaling={false} style={[styles.languagePickerText, textStyles]}>
        {lang.label}
      </Text>
      {lang.image}
    </>
  ) : (
    <>
      <Text allowFontScaling={false} style={[styles.languagePickerText, textStyles]}>
        English
      </Text>
      <English height={scaleSize(24)} width={scaleSize(30)} />
    </>
  );
});

type LanguageListRenderProps = {
  setModalVisible: (visible: boolean) => void;
};

const LanguageListRender = memo(({ setModalVisible }: LanguageListRenderProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSelectLanguage = useCallback(
    (item: ILanguageOption) => () => {
      dispatch(changeLanguage(item.value));
      setModalVisible(false);
    },
    [setModalVisible]
  );

  return (
    <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
      <View style={[globalStyles.centered, styles.modalTitle]}>
        <Text allowFontScaling={false} style={[styles.modalTitleText]}>
          {t('Choose Language')}
        </Text>
      </View>
      {languageList.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={onSelectLanguage(item)}
            key={index}
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              { ...(index < languageList.length - 1 && styles.languageItemBorder) },
              styles.languageItem,
            ]}
          >
            <View style={[globalStyles.container, globalStyles.justifyCenter]}>
              <Text allowFontScaling={false} style={[styles.languageLabel]}>
                {item.label}
              </Text>
            </View>
            <View style={[globalStyles.container, globalStyles.justifyCenter, styles.languageFlag]}>{item.image}</View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default memo(LanguagePicker);
