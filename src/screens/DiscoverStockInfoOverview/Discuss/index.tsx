import React, { memo } from 'react';
import { SocialPostList } from 'components/SocialPostList';
import { useLogic } from './logic';

export type Props = {
  code: string;
};

const Discuss = (props: Props) => {
  const { state, handlers } = useLogic(props);
  return <SocialPostList data={state.data} loading={state.loading} onEndReached={handlers.onLoadMore} />;
};

export default memo(Discuss);
