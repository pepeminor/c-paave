/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'components/Modal';
import semver from 'semver';
import { Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import { scaleSize, GradientColors } from 'styles';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import config from 'config';
import LinearGradient from 'react-native-linear-gradient';
import { alertMessage } from 'utils';
import { onCloseModalUpdateApp, onOpenModalUpdateApp, showModalDisconnectNetwork } from 'reduxs/global-actions';
import NetInfo from '@react-native-community/netinfo';
import withMemo from 'HOC/withMemo';

const ModalUpdateApp = () => {
  const [latestAppVersion, setLatestAppVersion] = useState<string | null>(null);
  const [latestBuildAppVersion, setLatestBuildAppVersion] = useState<string | null>(null);
  const [currentAppVersion, setCurrentAppVersion] = useState<string | null>(null);
  const [currentBuildAppVersion, setCurrentBuildAppVersion] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();

  const updateVersionApp = useCallback(() => {
    if (Platform.OS === 'ios') {
      // eslint-disable-next-line no-console
      Linking.openURL(config.appStoreLink).catch(err => console.error('An error occurred', err));
    } else {
      // eslint-disable-next-line no-console
      Linking.openURL(config.playStoreLink).catch(err => console.error('An error occurred', err));
    }
  }, []);

  useEffect(() => {
    setLatestAppVersion(null);
    setLatestBuildAppVersion(null);
    setCurrentAppVersion(null);
    setCurrentBuildAppVersion(null);
    checkLatestVersion();
  }, []);

  const checkLatestVersion = useCallback(async () => {
    //Check Connection
    const checkConnection = await NetInfo.fetch();
    if (!checkConnection.isConnected) {
      dispatch(showModalDisconnectNetwork(true));
    } else {
      if (config.versionApp.versionUrl != null && config.versionApp.versionUrl.length != 0) {
        fetch(config.versionApp.versionUrl, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
            Timeout: '5000',
          },
        })
          .then(response => {
            if (!response.ok) {
              // *** Check errors
              throw new Error('HTTP status ' + response.status);
            }
            return response.text(); // *** Read the TEXT of the response
          })
          .then(dataSourceText => {
            // *** More accurate name
            const dataSource = JSON.parse(dataSourceText);

            const domainPlatform = config.versionApp.domain.concat('_', Platform.OS);
            const updateDatePlatform = config.versionApp.updateDate.concat('_', Platform.OS);
            const latestVersion = dataSource[domainPlatform];
            const latestBuildVersion = dataSource[updateDatePlatform];
            const currentVersion = config.appVersion;
            const currentBuildVersion = config.appBuildNo;

            console.log('Domain Platform:', domainPlatform);
            console.log('Current Version:', currentVersion);
            console.log('Current Date Version:', currentBuildVersion);
            console.log('Latest Version:', latestVersion);
            console.log('Latest Date Version:', latestBuildVersion);

            // check current version and new version
            if (currentVersion != null && latestVersion != null && !__DEV__) {
              console.log('Compare version');
              const checkVersion = semver.gt(latestVersion, currentVersion);
              console.log('Check there is new version:', checkVersion);

              const isEqualVersion = semver.compare(latestVersion, currentVersion) === 0;
              const checkBuildVersion = isEqualVersion ? latestBuildVersion > currentBuildVersion : false;
              console.log('Check there is new build:', checkBuildVersion);

              if (checkVersion || checkBuildVersion) {
                console.log('New version found');
                setLatestAppVersion(latestVersion);
                setLatestBuildAppVersion(latestBuildVersion);
                setCurrentAppVersion(currentVersion);
                setCurrentBuildAppVersion(currentBuildVersion);
                dispatch(onOpenModalUpdateApp());
              } else {
                console.log('No new version');
                dispatch(onCloseModalUpdateApp());
              }
            } else {
              console.log('Can not fetch new version info');
            }
          })
          .catch(error => {
            alertMessage('danger', 'Update Version App', error);
          });
      }
    }
  }, []);

  if (latestAppVersion == null) return null;

  return (
    <Modal
      visible={latestAppVersion != null}
      childrenContent={
        <View style={styles.versionUpdateModal}>
          <View style={styles.versionUpdateContainer}>
            <Image
              source={require('../../../../../assets/icon/Rocket-Cloud.png')}
              style={styles.versionUpdateImage}
              width={scaleSize(375)}
              height={scaleSize(250)}
            />
            <View style={styles.versionUpdateWrapper}>
              <View style={styles.versionUpdateBox}>
                <Text style={styles.versionUpdateText}>{`${latestAppVersion} (${latestBuildAppVersion})`}</Text>
              </View>
              <Text style={styles.versionUpdateText2}>{t('New Version')}</Text>
              <View style={styles.wrapContent}>
                <Text style={styles.versionUpdateText3}>
                  {t('Your current version is')}
                  <Text style={styles.versionUpdateText5}>
                    {' '}
                    {currentAppVersion} ({currentBuildAppVersion}).{' '}
                  </Text>
                </Text>
                <Text style={styles.versionUpdateText3}>{t('Update required')}.</Text>
              </View>
              <Text style={styles.versionUpdateText6}>
                {t(
                  'Your version of app is out of date. Please download the latest version to enjoy more upgraded services'
                )}
                .
              </Text>
              <TouchableOpacity onPress={updateVersionApp} style={styles.marginButton}>
                <LinearGradient
                  colors={GradientColors.NewGradientColor}
                  style={styles.versionUpdateButton}
                  angle={135}
                  useAngle={true}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                >
                  <Text style={styles.versionUpdateText4}>{t('Update Now')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default withMemo(ModalUpdateApp);
