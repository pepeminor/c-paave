import React from 'react';
import HeaderScreen from 'components/HeaderScreen';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import NewCustomTab from 'components/NewCustomTab';
import { ITabConfig } from 'components/NewCustomTab';
import AccProfit from './Tabs/AccProfit';
import DailyPnL from './Tabs/DailyPnL';
import BackTest from './Tabs/BackTest';
import Gallery from './Tabs/Gallery';

/* ICONS */
import IconFollow from 'assets/icon/IconFollow.svg';
import IconFollowed from 'assets/icon/IconFollowed.svg';
import IconUpPnL from 'assets/icon/IconUpPnL.svg';
import IconDownPnL from 'assets/icon/IconDownPnL.svg';
import { navigate } from 'utils';

interface IFakeData {
  name: string;
  ratio: number;
}

const fakeData: IFakeData[] = [
  {
    name: 'Expected Annualized Profit',
    ratio: 23.7,
  },
  {
    name: 'Real Profit',
    ratio: -7.32,
  },
  {
    name: 'Weeks',
    ratio: 23.7,
  },
  {
    name: 'Expected Max Drawdown',
    ratio: -7.32,
  },
];

const InsightsStrategiesDetail = (props: StackScreenProps<'InsightsStrategiesDetail'>) => {
  const [followed, setFollowed] = React.useState(false);

  const { styles } = useStyles();
  const goBack = () => {
    props.navigation.goBack();
  };

  const configNewsTab: ITabConfig[] = [
    {
      header: {
        title: 'Acc. profit',
      },
      content: AccProfit,
    },
    {
      header: {
        title: 'Daily P&L',
      },
      content: DailyPnL,
    },
    {
      header: {
        title: 'Back-text',
      },
      content: BackTest,
    },
    {
      header: {
        title: 'Gallery',
      },
      content: Gallery,
    },
  ];

  const onFollowed = () => {
    setFollowed(!followed);
  };

  const goToDetail = () => {
    navigate({ key: 'InsightsStrategiesDetailItem', params: { screenName: props.route.params.screenName } });
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderScreen headerTitle={props.route.params.screenName} leftButtonIcon={true} goBackAction={goBack} />
      <ScrollView style={[globalStyles.container, styles.container]} showsVerticalScrollIndicator={false}>
        {/* INTRODUCTION */}
        <View style={[styles.introContainer]}>
          <View style={[styles.introDesContainer]}>
            <Text style={[styles.introDesText]}>
              This strategy generates signals for stocks based on price momentum and company valuation, monthly
              rebalancing
            </Text>
            <TouchableOpacity
              onPress={onFollowed}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.centered,
                followed ? styles.btnFollowed : styles.btnFollow,
              ]}
            >
              {followed ? (
                <IconFollowed width={scaleSize(24)} height={scaleSize(24)} />
              ) : (
                <IconFollow width={scaleSize(24)} height={scaleSize(24)} />
              )}

              <Text style={[followed ? styles.buttonTextFollowed : styles.buttonTextFollow]}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View>
            <NewCustomTab tabViewStyles={[styles.TabContainer]} headerHeight={44} config={configNewsTab} />
          </View>
        </View>

        {/* OVERVIEW */}
        <View style={[styles.overviewContainer]}>
          <View style={[styles.overviewTitleContainer]}>
            <Text style={[styles.overviewTitleText]}>Overview</Text>
          </View>

          {fakeData.map((value, key) => (
            <View
              key={key}
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifySpaceBetween,
                styles.overviewContentContainer,
                key === 0 ? styles.borderTop : {},
              ]}
            >
              <Text style={[styles.overviewContentLabelText]}>{value.name}</Text>
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  globalStyles.justifyEnd,
                  styles.overviewRatioContainer,
                ]}
              >
                <View style={[globalStyles.centered, styles.ratioIconContainer]}>
                  {value.ratio > 0 ? (
                    <IconUpPnL width={scaleSize(12)} height={scaleSize(10)} />
                  ) : (
                    <IconDownPnL width={scaleSize(12)} height={scaleSize(10)} />
                  )}
                </View>

                <View style={[globalStyles.justifyCenter, globalStyles.alignEnd, styles.ratioTextContainer]}>
                  <Text style={[styles.overviewContentRatioText, value.ratio > 0 ? styles.grenText : styles.redText]}>
                    {value.ratio > 0 ? value.ratio : -value.ratio}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View
            style={[globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, styles.overviewContentContainer]}
          >
            <Text style={[styles.overviewContentLabelText]}>Views</Text>
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyEnd,
                styles.overviewRatioContainer,
              ]}
            >
              <View style={[globalStyles.justifyCenter, globalStyles.alignEnd, styles.ratioTextContainer]}>
                <Text style={[styles.overviewContentRatioText]}>12.450</Text>
              </View>
            </View>
          </View>
          <View
            style={[globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, styles.overviewContentContainer]}
          >
            <Text style={[styles.overviewContentLabelText]}>Subscribers</Text>
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifyEnd,
                styles.overviewRatioContainer,
              ]}
            >
              <View style={[globalStyles.justifyCenter, globalStyles.alignEnd, styles.ratioTextContainer]}>
                <Text style={[styles.overviewContentRatioText]}>285</Text>
              </View>
            </View>
          </View>
          <View style={[styles.actionContainer]}>
            <TouchableOpacity onPress={goToDetail} style={[globalStyles.centered, styles.buttonViewDetail]}>
              <Text style={[styles.buttonViewDetailText]}>View Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InsightsStrategiesDetail;
