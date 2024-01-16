import { useDispatch, useSelector } from 'react-redux';
import { getMap } from '../../utils';
import { IState } from 'reduxs/global-reducers';
import { StackScreenProps } from 'screens/RootNavigation';
import { registerUser } from 'reduxs/global-actions/Authentication';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from '../../styles';
import Logo from 'assets/logo-paave.svg';
import React, { memo, useState } from 'react';
import useStyles from './styles';
import BackIcon from 'assets/icon/IconBack.svg';

const investmentStategyList = [
  {
    label: 'Bearish',
    value: 'bearish',
    selected: false,
  },
  {
    label: 'Blue Chip',
    value: 'blueChip',
    selected: false,
  },
  {
    label: 'Bulish',
    value: 'bulish',
    selected: false,
  },
  {
    label: 'Buy',
    value: 'buy',
    selected: false,
  },
  {
    label: 'Buy & Hold',
    value: 'buyHold',
    selected: false,
  },
  {
    label: 'Day Trade',
    value: 'dayTrade',
    selected: false,
  },
  {
    label: 'Dividend',
    value: 'dividend',
    selected: false,
  },
  {
    label: 'Earnings',
    value: 'earnings',
    selected: false,
  },
  {
    label: 'Fundamental Analysis',
    value: 'fundamentalAnalysis',
    selected: false,
  },
  {
    label: 'Growth',
    value: 'growth',
    selected: false,
  },
  {
    label: 'Hold',
    value: 'hold',
    selected: false,
  },
  {
    label: 'Index/ETFs',
    value: 'indexETFs',
    selected: false,
  },
  {
    label: 'Large Cap',
    value: 'largeCap',
    selected: false,
  },
  {
    label: 'Long',
    value: 'long',
    selected: false,
  },
  {
    label: 'Mid Cap',
    value: 'midCap',
    selected: false,
  },
  {
    label: 'Momentum',
    value: 'momentum',
    selected: false,
  },
  {
    label: 'Options',
    value: 'options',
    selected: false,
  },
  {
    label: 'Sell',
    value: 'sell',
    selected: false,
  },
  {
    label: 'Short',
    value: 'short',
    selected: false,
  },
  {
    label: 'Small Cap',
    value: 'smallCap',
    selected: false,
  },
  {
    label: 'Swing Trade',
    value: 'swingTrade',
    selected: false,
  },
  {
    label: 'Technical Analysis',
    value: 'technicalAnalysis',
    selected: false,
  },
  {
    label: 'Value',
    value: 'value',
    selected: false,
  },
];

const personalInterestList = [
  {
    label: 'Advanced',
    value: 'advanced',
    selected: false,
  },
  {
    label: 'Agriculture',
    value: 'agriculture',
    selected: false,
  },
  {
    label: 'Beginner',
    value: 'beginner',
    selected: false,
  },
  {
    label: 'Communications',
    value: 'communications',
    selected: false,
  },
  {
    label: 'Consumer Discretionary',
    value: 'consumerDiscretionary',
    selected: false,
  },
  {
    label: 'Consumer Staples',
    value: 'consumerStaples',
    selected: false,
  },
  {
    label: 'Crypto',
    value: 'crypto',
    selected: false,
  },
  {
    label: 'Data',
    value: 'data',
    selected: false,
  },
  {
    label: 'Educational',
    value: 'educational',
    selected: false,
  },
  {
    label: 'Energy',
    value: 'energy',
    selected: false,
  },
  {
    label: 'Entertainment',
    value: 'entertainment',
    selected: false,
  },
  {
    label: 'FANG',
    value: 'fANG',
    selected: false,
  },
  {
    label: 'Financial Services',
    value: 'financialservices',
    selected: false,
  },
  {
    label: 'Government',
    value: 'government',
    selected: false,
  },
  {
    label: 'Hardware',
    value: 'hardware',
    selected: false,
  },
  {
    label: 'Healthcare',
    value: 'healthcare',
    selected: false,
  },
  {
    label: 'Hospitality',
    value: 'hospitality',
    selected: false,
  },
  {
    label: 'IPO',
    value: 'iPO',
    selected: false,
  },
  {
    label: 'Industrials',
    value: 'industrials',
    selected: false,
  },
  {
    label: 'Intermediate',
    value: 'intermediate',
    selected: false,
  },
  {
    label: 'International',
    value: 'international',
    selected: false,
  },
  {
    label: 'Internet',
    value: 'internet',
    selected: false,
  },
  {
    label: 'Pharmaceuticals',
    value: 'pharmaceuticals',
    selected: false,
  },
  {
    label: 'Real Estate',
    value: 'realestate',
    selected: false,
  },
  {
    label: 'Retail Trade',
    value: 'retailtrade',
    selected: false,
  },
  {
    label: 'SPAC',
    value: 'sPAC',
    selected: false,
  },
  {
    label: 'SaaS',
    value: 'saaS',
    selected: false,
  },
  {
    label: 'Security',
    value: 'security',
    selected: false,
  },
  {
    label: 'Socially Responsible (ESG)',
    value: 'sociallyResponsible',
    selected: false,
  },
  {
    label: 'Technology',
    value: 'technology',
    selected: false,
  },
  {
    label: 'Trasportation',
    value: 'trasportation',
    selected: false,
  },
  {
    label: 'Utilities',
    value: 'utilities',
    selected: false,
  },
];

const SignupFavorite = (props: StackScreenProps<'SignupFavorite'>) => {
  const [selectedInvesmentStrategies, setSelectedInvestmentStrategies] = useState(() => {
    return getMap(investmentStategyList, 'value');
  });

  const [selectedPersonalInterest, setSelectedPersonalInterest] = useState(() => {
    return getMap(personalInterestList, 'value');
  });

  const dispatch = useDispatch();
  const { styles } = useStyles();
  const registerParamsState = useSelector((state: IState) => state.registerParams);
  const otpKey = useSelector((state: IState) => state.otpKey);

  const goBack = () => {
    props.navigation.goBack();
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: '',
      headerLeft: () => <BackIcon onPress={goBack} />,
      headerShadowVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={submitForm}>
          <Text allowFontScaling={false} style={styles.headerSkipText}>
            Skip
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const submitForm = () => {
    if (otpKey.data != null) {
      const registerParams = { ...registerParamsState, otpKey: otpKey.data.keyToken };
      dispatch(registerUser({ ...registerParams }, undefined, { key: 'SignupCongratulation' }));
    }
  };

  const onPressInvesmentStrategiesElement = (value: string) => {
    setSelectedInvestmentStrategies({
      ...selectedInvesmentStrategies,
      [value]: {
        ...selectedInvesmentStrategies[value],
        selected: !selectedInvesmentStrategies[value].selected,
      },
    });
  };

  const onPressPersonalInterestElement = (value: string) => {
    setSelectedPersonalInterest({
      ...selectedPersonalInterest,
      [value]: {
        ...selectedPersonalInterest[value],
        selected: !selectedPersonalInterest[value].selected,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[globalStyles.centered, styles.logoContainer]}>
        <Logo width={scaleSize(144)} height={scaleSize(62)} />
      </View>
      <Text allowFontScaling={false} style={styles.question}>
        What's your investment style like?
      </Text>
      <ScrollView>
        <Text allowFontScaling={false} style={styles.titleFavorite}>
          Investment Strategies
        </Text>
        <View style={[globalStyles.flexDirectionRow, styles.itemContainer]}>
          {investmentStategyList.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPressInvesmentStrategiesElement(item.value);
                }}
                key={index}
                style={[
                  globalStyles.centered,
                  styles.eachItem,
                  { ...(selectedInvesmentStrategies[item.value].selected === true && styles.eachItemSelected) },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { ...(selectedInvesmentStrategies[item.value].selected === true && styles.itemTextSelected) },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text allowFontScaling={false} style={[styles.titleFavorite, styles.titleFavorite2]}>
          Investment Strategies
        </Text>
        <View style={[globalStyles.flexDirectionRow, styles.itemContainer]}>
          {personalInterestList.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPressPersonalInterestElement(item.value);
                }}
                key={index}
                style={[
                  globalStyles.centered,
                  styles.eachItem,
                  { ...(selectedPersonalInterest[item.value].selected === true && styles.eachItemSelected) },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    { ...(selectedPersonalInterest[item.value].selected === true && styles.itemTextSelected) },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={[globalStyles.centered, styles.executeFormButton]} onPress={submitForm}>
          <Text allowFontScaling={false} style={[styles.executeFormButtonText]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(SignupFavorite);
