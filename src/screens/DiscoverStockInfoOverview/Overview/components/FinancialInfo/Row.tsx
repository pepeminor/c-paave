import { isEqual } from 'lodash';
import React, { memo } from 'react';
import { View } from 'react-native';
import globalStyles from 'styles';
import RowItem, { IRowItemBaseProps } from './RowItem';

export type IRowBaseProps = {
  firstItem: IRowItemBaseProps;
  secondItem: IRowItemBaseProps;
  thirdItem?: IRowItemBaseProps;
  fourthItem?: IRowItemBaseProps;
  hide?: boolean;
};

function Row({ firstItem, secondItem, thirdItem, fourthItem, hide = false }: IRowBaseProps) {
  if (hide) return null;

  return (
    <View style={[globalStyles.flexDirectionRow]}>
      <RowItem {...firstItem} />
      <RowItem {...secondItem} />
      {thirdItem && <RowItem {...thirdItem} />}
      {fourthItem && <RowItem {...fourthItem} />}
    </View>
  );
}

export default memo(Row, isEqual);
