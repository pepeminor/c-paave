import React, { useState } from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity, FlatList } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import CustomTab, { ITabConfig } from 'components/CustomTab';
import IconOutlineRight from 'assets/icon/IconOutlineRight.svg';
import { navigate } from 'utils';

type IFakeEducationDataType = {
  Title: string;
};

const fakeChooseEducation: IFakeEducationDataType[] = [
  {
    Title: 'Relative Strength Index (RSI)',
  },
  {
    Title: 'Exchanges and transactions regulations',
  },
  {
    Title: 'Bollinger Bands',
  },
  {
    Title: 'Moving Average (MA)',
  },
  {
    Title: 'Moving Average Convergence Divergence (MACD)',
  },
  {
    Title: 'General regulations and financial products in the Vietnamese market',
  },
  {
    Title: 'Ichimoku Cloud',
  },
  {
    Title: 'QOQ (Quarter on quarter)',
  },
  {
    Title: 'YoY (Year-over-year)',
  },
  {
    Title: 'Debt Ratio',
  },
  {
    Title: 'ROA (Return on Asset)',
  },
  {
    Title: 'ROE (Return on Equity)',
  },
  {
    Title: 'P/B ratio (Price-to-Book value)',
  },
  {
    Title: 'P/E',
  },
];

const Education = () => {
  const [searchTextEducation] = useState(fakeChooseEducation);
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { styles } = useStyles();

  const ItemSeparatorView = () => {
    return <View style={[styles.SeparatorContainer]} />;
  };

  const renderItemEducation = ({ item, index }: ListRenderItemInfo<IFakeEducationDataType>) => {
    const TabEducation = () => {
      navigate({ key: 'EducationItem' });
    };

    return (
      <TouchableOpacity
        key={index}
        onPress={TabEducation}
        style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.rowData]}
      >
        <Text allowFontScaling={false} style={[styles.rowDataTextEducation]}>
          {item.Title}
        </Text>

        <IconOutlineRight width={scaleSize(24)} height={scaleSize(24)} />
      </TouchableOpacity>
    );
  };

  const TabContent = (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchTextEducation}
        renderItem={renderItemEducation}
        keyExtractor={(_item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );

  const IconNull = <></>;

  const tabConfig: ITabConfig[] = [
    {
      header: {
        title: 'All',
        Icon: IconNull,
      },
      content: TabContent,
    },
    {
      header: {
        title: 'Technical',
        Icon: IconNull,
      },
      content: TabContent,
    },
    {
      header: {
        title: 'Valuation',
        Icon: IconNull,
      },
      content: TabContent,
    },
    {
      header: {
        title: 'Trading Basics',
        Icon: IconNull,
      },
      content: TabContent,
    },
  ];

  const setIndex = (_index: number) => {
    // setSelectedIndex(index);
  };

  const tab = <CustomTab config={tabConfig} headerStyle="Button" setIndex={setIndex} />;

  return (
    <View style={[globalStyles.container, styles.tabBlock]}>
      {tab}
      <Text></Text>
    </View>
  );
};

export default Education;
