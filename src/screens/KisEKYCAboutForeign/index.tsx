import React, { memo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import InvestorDot from 'assets/icon/InvestorDot.svg';
import InvestorArrow from 'assets/icon/InvestorArrow.svg';
import ArrowDown from 'assets/icon/arrowDown.svg';
import ArrowRight from 'assets/icon/ArrowRightIcon.svg';
import { goToEmailSupport } from 'utils';

enum BRANCH_INFOMATION {
  HCM = 'Ho Chi Minh',
  HN = 'Ha Noi',
}

type IBranch = {
  [BRANCH_INFOMATION.HCM]: IBranchInfomation[];
  [BRANCH_INFOMATION.HN]: IBranchInfomation[];
};

type IBranchInfomation = {
  title: string;
  address: string;
};

const branchInfomation: IBranch = {
  [BRANCH_INFOMATION.HCM]: [
    {
      title: 'HEAD OFFICE',
      address: 'Add: Level 03, 180-192 Nguyen Cong Tru St, Nguyen Thai Binh ward, Dist. 1, HCMC',
    },
    {
      title: 'SAI GON TRANSACTION OFFICE',
      address: 'Add: Level 04, 180-192 Nguyen Cong Tru St, Nguyen Thai Binh ward, Dist.1, HCMC',
    },
    {
      title: 'PHAM NGOC THACH TRANSACTION OFFICE',
      address: 'Add: Level 03, 62A Pham Ngoc Thach, Dist. 3, HCMC',
    },
  ],
  [BRANCH_INFOMATION.HN]: [
    {
      title: 'HA NOI BRANCH',
      address: 'Add: Level 2, Tower 1, Capital Place Building, 29 Lieu Giai St., Ngoc Khanh ward, Ba Dinh dist., Hanoi',
    },
    {
      title: 'BA TRIEU TRANSACTION OFFICE',
      address:
        'Add: Level 8, Vietbank Office Building, No. 70-72 Ba Trieu Street, Hang Bai Ward, Hoan Kiem District, Hanoi',
    },
    {
      title: 'LANG HA TRANSACTION OFFICE',
      address: 'Level 8, Vinaconex Tower, 34 Lang Ha St., Lang Ha ward, Dong Da dist., Hanoi',
    },
  ],
};

const KisEKYCAboutForeign = (props: StackScreenProps<'KisEKYCAboutForeign'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [isBranchExpand, setIsBranchExpand] = useState<boolean>(false);
  const [isBranchHCMExpand, setIsBranchHCMExpand] = useState<boolean>(true);
  const [isBranchHNExpand, setIsBranchHNExpand] = useState<boolean>(false);
  const [isRequiExpand, setIsRequiExpand] = useState<boolean>(false);

  const goBack = () => {
    props.navigation.goBack();
  };

  const expandBranch = () => {
    setIsBranchExpand(pre => !pre);
  };

  const expandBranchHCM = () => {
    setIsBranchHCMExpand(pre => !pre);
  };

  const expandBranchHN = () => {
    setIsBranchHNExpand(pre => !pre);
  };

  const expandRequi = () => {
    setIsRequiExpand(pre => !pre);
  };

  return (
    <View style={globalStyles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Foreign Investor'} />
      <ScrollView style={[styles.container, styles.paddingHorizontal16]}>
        <View style={styles.container}>
          <View style={styles.paddingVeticalTitle}>
            <Text style={styles.titleText}>
              {t('Guidelines for Foreign Individual Investors to open Securities Trading Account at KIS')}:
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.container]}>
            <InvestorDot />
            <View style={styles.paddingHorizontal16}>
              <Text style={styles.textContent}>{t('Carry your passport and visit the nearest KIS branch')}</Text>
              <View style={[globalStyles.container, styles.paddingTop8]}>
                <TouchableOpacity
                  style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.paddingVertical4]}
                  onPress={expandBranch}
                >
                  <Text style={styles.titleStyleHighlight}>{t('KIS branch information')}</Text>
                  <View style={[styles.marginLeft16, styles.paddingTop3]}>
                    {isBranchExpand ? <ArrowDown /> : <ArrowRight />}
                  </View>
                </TouchableOpacity>
              </View>
              {isBranchExpand && (
                <View style={globalStyles.container}>
                  <View>
                    <View style={[styles.paddingBottom16, styles.paddingTop21]}>
                      <TouchableOpacity
                        onPress={expandBranchHCM}
                        style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.widthTitle]}
                      >
                        <InvestorArrow />
                        <Text style={[styles.titleStyleHighlight2, styles.marginLeft16]}>
                          {t(BRANCH_INFOMATION.HCM)}:
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {isBranchHCMExpand && (
                      <View style={globalStyles.container}>
                        {branchInfomation[BRANCH_INFOMATION.HCM].map((item, index) => (
                          <View key={index} style={styles.paddingTop8}>
                            <Text style={styles.titleBranch}>{t(item.title)}</Text>
                            <Text style={styles.textContent}>{t(item.address)}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  <View>
                    <View style={styles.paddingVertical16}>
                      <TouchableOpacity
                        onPress={expandBranchHN}
                        style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.widthTitle]}
                      >
                        <InvestorArrow />
                        <Text style={[styles.titleStyleHighlight2, styles.marginLeft16]}>
                          {t(BRANCH_INFOMATION.HN)}:
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {isBranchHNExpand && (
                      <View style={globalStyles.container}>
                        {branchInfomation[BRANCH_INFOMATION.HN].map((item, index) => (
                          <View key={index} style={styles.paddingTop8}>
                            <Text style={styles.titleBranch}>{t(item.title)}</Text>
                            <Text style={styles.textContent}>{t(item.address)}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.line} />
          <View style={[globalStyles.flexDirectionRow, globalStyles.container]}>
            <InvestorDot />
            <View style={styles.paddingHorizontal16}>
              <Text style={styles.textContent}>
                {t('Inform KIS staffs to support you in opening a trading account on behalf of PAAVE')}
              </Text>
              <View style={[globalStyles.container, styles.paddingTop8]}>
                <TouchableOpacity
                  style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.paddingVertical4]}
                  onPress={expandRequi}
                >
                  <Text style={styles.titleStyleHighlight}>{t('Required documents')}</Text>
                  <View style={[styles.marginLeft16, styles.paddingTop3]}>
                    {isRequiExpand ? <ArrowDown /> : <ArrowRight />}
                  </View>
                </TouchableOpacity>
              </View>
              {isRequiExpand && (
                <View style={globalStyles.container}>
                  <Text style={[styles.textContent, styles.paddingVertical8]}>
                    {`${'\u2022'}  ${t('2 Notorized copies of Passport')}`}
                  </Text>
                  <Text style={[styles.textContent, styles.paddingVertical8]}>
                    {`${'\u2022'}  ${t('1 Securities trading code registration form')}`}
                  </Text>
                  <Text style={[styles.textContent, styles.paddingVertical8]}>
                    {`${'\u2022'}  ${t('2 Account opening contracts')}`}
                  </Text>
                  <Text style={[styles.textContent, styles.paddingVertical8]}>
                    {`${'\u2022'}  ${t('1 Power of attorney form')}`}
                  </Text>
                  <Text style={[styles.textContent, styles.paddingVertical8]}>
                    {`${'\u2022'}  ${t('1 OTP confirmation form')}`}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.line} />
          <View>
            <Text style={styles.textContent}>
              {t(
                'While waiting for KIS trading account, you still can easily sign up Paave account to use our services and connect to your KIS account later'
              )}
              .
            </Text>
          </View>
          <View style={styles.paddingVertical16}>
            <Text style={styles.textContent}>
              {t('For further support, please contact us at')}:
              <Text style={styles.titleStyleHighlight} onPress={goToEmailSupport}>
                support@paave.io
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(KisEKYCAboutForeign);
