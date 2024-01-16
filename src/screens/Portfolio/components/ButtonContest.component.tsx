import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useState } from 'react';
import ButtonMoveScreen from 'components/ButtonMoveScreen';

const ButtonContest = () => {
  const isHaveContest = useAppSelector(state => state.contests?.subMenu?.notifyContestShow);
  const [buttonVisible, setButtonVisible] = useState(true);

  if (!isHaveContest || !buttonVisible) return null;

  return <ButtonMoveScreen setButtonVisible={setButtonVisible} />;
};

export default withMemo(ButtonContest);
