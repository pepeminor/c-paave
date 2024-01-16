import { LANG } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import { ReducerStatus } from 'interfaces/reducer';
import { ICompanyOverviewParams } from 'interfaces/stockSector';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { getCompanyOverview } from 'reduxs/global-actions';
import globalStyles from 'styles';
import useStyles from './styles';
import { store } from 'screens/App';

const CompanyInfo = () => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const companyOverview = useAppSelector(state => state.companyOverview);
  const lang = useAppSelector(state => state.lang);
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);

  useEffect(() => {
    const params: ICompanyOverviewParams = {
      code: currentSymbolCode,
    };
    store.dispatch(getCompanyOverview(params));
  }, [currentSymbolCode]);

  return (
    <View style={styles.bioContainer}>
      {/* <ExtendParagraph
        height={200}
        content={ */}

      {companyOverview.data != null && companyOverview.status === ReducerStatus.SUCCESS ? (
        <View>
          <Text style={[styles.bioText, styles.paddingVertical8]}>{t('Company Profile')}</Text>
          <Text style={styles.bio}>
            {lang === LANG.VI
              ? companyOverview.data.profileVi.map(bio => `• ${bio}`).join('\n')
              : companyOverview.data.profileEn.map(bio => `• ${bio}`).join('\n')}
          </Text>
          <Text style={[styles.bioText, styles.paddingVertical8]}>{t('Core Business')}</Text>
          <Text style={styles.bio}>
            {lang === LANG.VI
              ? companyOverview.data.coreBusVi.map(bio => `• ${bio}`).join('\n')
              : companyOverview.data.coreBusEn.map(bio => `• ${bio}`).join('\n')}
          </Text>
        </View>
      ) : (
        <View>
          <View style={[globalStyles.flexDirectionCol, globalStyles.alignSpaceAround]}>
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
            <View style={[styles.labelPlaceHolderContainer, styles.marginVertical]} />
          </View>
        </View>
      )}
      {/* }
      /> */}
      {/* <View style={styles.grayLine} />
      <View>
        <View style={[globalStyles.flexDirectionRow, styles.info]}>
          <Text style={styles.infoTitle}>CEO</Text>
          <Text style={styles.infoValue}>ABC</Text>
        </View>
        <View style={[globalStyles.flexDirectionRow, styles.info]}>
          <Text style={styles.infoTitle}>Establishment Date</Text>
          <Text style={styles.infoValue}>01/01/1990</Text>
        </View>
        <View style={[globalStyles.flexDirectionRow, styles.info]}>
          <Text style={styles.infoTitle}>IPO Date</Text>
          <Text style={styles.infoValue}>01/01/1990</Text>
        </View>
        <View style={[globalStyles.flexDirectionRow, styles.info]}>
          <Text style={styles.infoTitle}>Market Cap.</Text>
          <Text style={styles.infoValue}>234 B</Text>
        </View>
        <View style={[globalStyles.flexDirectionRow, styles.info]}>
          <Text style={styles.infoTitle}>Total Number Of Stock Issued</Text>
          <Text style={styles.infoValue}>110.324</Text>
        </View>
      </View>
      <View style={styles.updateInfo}>
        <Text style={styles.updateInfoText}>Data source: google.com</Text>
        <Text style={styles.updateInfoText}>Updated date: 17/06/2021</Text>
      </View> */}
    </View>
  );
};

export default CompanyInfo;
