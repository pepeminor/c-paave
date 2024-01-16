import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useHeaderPostLogic } from './HeaderPost.logic';
import useStyles from './HeaderPost.style';
import { IProps } from './HeaderPost.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import Icon from 'components/Icon';
import { scaleSize } from 'styles';
import ModalBottom from 'components/ModalBottom';
import { useTranslation } from 'react-i18next';
import { HitSlop } from 'constants/enum';
import { ConfirmActionModal } from './ConfirmActionModal';
import { ReportReasonModal } from './ReportReasonModal';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ko, vi } from 'date-fns/locale';

const HeaderPost = (props: IProps) => {
  const { handlers, state } = useHeaderPostLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const locale = props.lang === 'vi' ? vi : props.lang === 'ko' ? ko : enUS;

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={props.containerImage}>
        <Image source={{ uri: props.avatar }} style={styles.imageAvatar} />
      </View>
      <View style={styles.containerInfo}>
        <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.LIGHTText}>
          {props.displayName || props.userName}
        </PaaveText>

        <View style={styles.containerDescriptionInfo}>
          <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.TextDescription}>
            {`@${props.userName}`}
          </PaaveText>
          <View style={styles.dot} />
          <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.TextDescription}>
            {formatDistanceToNow(new Date(props.createdAt), {
              locale: locale,
              addSuffix: true,
            })}
          </PaaveText>
          <View style={styles.dot} />
          <Icon name={'earth-outline'} color={dynamicColors.TextDescription} size={scaleSize(14)} />
        </View>
      </View>

      <TouchableOpacity onPress={handlers.onOpenMenu} hitSlop={HitSlop}>
        <Icon name={'menu-2'} color={dynamicColors.TextDescription} size={scaleSize(20)} />
      </TouchableOpacity>

      {state.isVisible && (
        <ModalBottom visible={state.isVisible} setVisible={handlers.onCloseMenu} showCloseButton={false}>
          <View style={styles.containerModal}>
            <View style={styles.stickHeader} />
            {/* <TouchableOpacity style={styles.containerButton} onPress={handlers.translateToEnglish}>
              <Icon
                name={'g-translate'}
                size={scaleSize(20)}
                color={dynamicColors.LIGHTTextContent}
                style={styles.buttonIconContainer}
              />
              <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                {t('translate.to.english')}
              </PaaveText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerButton} onPress={handlers.translateToVietnamese}>
              <Icon
                name={'g-translate'}
                size={scaleSize(20)}
                color={dynamicColors.LIGHTTextContent}
                style={styles.buttonIconContainer}
              />
              <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                {t('translate.to.vietnamese')}
              </PaaveText>
            </TouchableOpacity> */}

            {props.isOwner && (
              <TouchableOpacity style={styles.containerButton} onPress={handlers.goToEditPost}>
                <Icon
                  name={'edit'}
                  size={scaleSize(20)}
                  color={dynamicColors.LIGHTTextContent}
                  style={styles.buttonIconContainer}
                />
                <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                  {t('Edit')}
                </PaaveText>
              </TouchableOpacity>
            )}
            {props.isOwner && (
              <TouchableOpacity style={styles.containerButton} onPress={handlers.onPressDeletePost}>
                <Icon
                  name={'trash'}
                  size={scaleSize(20)}
                  color={dynamicColors.LIGHTTextContent}
                  style={styles.buttonIconContainer}
                />
                <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                  {t('Delete')}
                </PaaveText>
              </TouchableOpacity>
            )}
            {/* {!props.isOwner && <View style={styles.optionSeparator} />} */}
            {!props.isOwner && (
              <TouchableOpacity style={styles.containerButton} onPress={handlers.onPressBlockUser}>
                <Icon
                  name={'block'}
                  size={scaleSize(20)}
                  color={dynamicColors.LIGHTTextContent}
                  style={styles.buttonIconContainer}
                />
                <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                  {t('Block') + ' @' + props.userName}
                </PaaveText>
              </TouchableOpacity>
            )}
            {!props.isOwner && (
              <TouchableOpacity style={styles.containerButton} onPress={handlers.onPressReportUser}>
                <Icon
                  name={'flag'}
                  size={scaleSize(20)}
                  color={dynamicColors.LIGHTTextContent}
                  style={styles.buttonIconContainer}
                />
                <PaaveText type={TEXT_TYPE.REGULAR_16} color={dynamicColors.TextDescription}>
                  {t('Report') + ' @' + props.userName}
                </PaaveText>
              </TouchableOpacity>
            )}
          </View>
        </ModalBottom>
      )}
      {state.confirmActionModal && (
        <ConfirmActionModal
          visible={state.confirmActionModal}
          setVisible={handlers.setConfirmActionModal}
          content={state.confirmActionTitle}
          onConfirm={state.confirmAction}
        />
      )}
      {state.reportModalVisible && (
        <ReportReasonModal
          visible={state.reportModalVisible}
          setVisible={handlers.setReportModalVisible}
          onReport={handlers.confirmReportUser}
        />
      )}
    </View>
  );
};

export default withMemo(HeaderPost);
