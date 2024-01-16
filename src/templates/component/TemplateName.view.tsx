import React from 'react';
import { View, Text } from 'react-native';
import { useTemplateNameLogic } from './TemplateName.logic';
import useStyles from './TemplateName.style';
import { IProps } from './TemplateName.type';
import withMemo from 'HOC/withMemo';

const TemplateName = (props: IProps) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useTemplateNameLogic(props);
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <Text>TemplateName Screen</Text>
    </View>
  );
};

export default withMemo(TemplateName);
