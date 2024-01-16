import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import IconSearch from 'assets/icon/IconSearch.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import DailyBlogs from './DailyBlogs';
import Education from './Education';
import { navigate } from 'utils';
import { useTranslation } from 'react-i18next';

const Blogs = (props: StackScreenProps<'Blogs'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const handleVisibleModal = () => {
    setIsSelected(pre => !pre);
  };

  const SearchBlogs = () => {
    navigate({ key: 'SearchBlogs' });
  };

  const GoBackBlog = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={GoBackBlog}
        headerTitle={'Blogs'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={SearchBlogs}>
            <IconSearch width={scaleSize(24)} height={scaleSize(24)}></IconSearch>
          </TouchableOpacity>,
        ]}
      />
      <View style={[globalStyles.flexDirectionRow, styles.screenOption]}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={[
            globalStyles.centered,
            globalStyles.container,
            styles.optionContainer,
            isSelected && styles.optionContainerSelected,
          ]}
        >
          <Text style={isSelected ? styles.selectedText : styles.unselectedText}>{t('Daily Blogs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={[
            globalStyles.centered,
            globalStyles.container,
            styles.optionContainer,
            !isSelected && styles.optionContainerSelected,
          ]}
        >
          <Text style={isSelected ? styles.unselectedText : styles.selectedText}>Education</Text>
        </TouchableOpacity>
      </View>

      {isSelected ? <DailyBlogs /> : <Education />}
    </View>
  );
};

export default memo(Blogs);
