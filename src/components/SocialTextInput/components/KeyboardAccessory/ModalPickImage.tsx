import React, { memo } from 'react';
import ModalBottom from 'components/ModalBottom';
import { useAppSelector } from 'hooks';
import { ImagePickerResponse } from 'react-native-image-picker';
import { SOCIAL_MAX_UPLOAD_IMAGES, SocialNewPostActions } from 'reduxs';
import { useDispatch } from 'react-redux';
import { ModalPickImage as ModalPickImageBase } from 'components/ModalPickImage';

type Props = Parameters<typeof ModalBottom>[0];

export const ModalPickImage = memo((props: Props) => {
  const dispatch = useDispatch();

  const numberOfImages = useAppSelector(state => state.SocialNewPost.images?.length ?? 0);

  const setImages = (images: ImagePickerResponse) => {
    if (images.didCancel || images.assets == null) {
      return;
    }
    dispatch(SocialNewPostActions.setImages(images.assets));
    props.setVisible(false);
  };

  return (
    <ModalPickImageBase
      onSuccess={setImages}
      maxImages={SOCIAL_MAX_UPLOAD_IMAGES - numberOfImages}
      limit={SOCIAL_MAX_UPLOAD_IMAGES}
      {...props}
    />
  );
});
