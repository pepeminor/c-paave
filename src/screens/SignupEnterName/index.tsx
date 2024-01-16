import { StackScreenProps } from 'screens/RootNavigation';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import CrossIcon from 'assets/icon/CrossIcon.svg';
import globalStyles, { lightColors as Colors, scaleSize } from '../../styles';
import Logo from 'assets/logo-paave.svg';
import React, { memo } from 'react';
import useStyles from './styles';
import TextInputComponent from '../../components/TextInput';
import TickIcon from 'assets/icon/TickIcon.svg';
import { useFormik } from 'formik';
import validationSchema from './schema';
import { submitName } from './actions';
import { ISignupEnterNameSubmitAction } from 'interfaces/sagas/ISignupEnterNameSubmitAction';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { IState } from 'reduxs/global-reducers';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { bannedNames } from 'screens/AccountInformation/bannedNames';

const validateData = [
  `Username can only contain letters (a-z), number (0-9), and periods (.)`,
  `Username can't begin or end with period (.) character, special character`,
  `Username can't contain more than 20 characters`,
];

const SignupEnterName = (props: StackScreenProps<'SignupEnterName'>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();
  const authenticationRegisterUserExistTrigger = useSelector(
    (state: IState) => state.authenticationRegisterUserExistTrigger
  );

  useUpdateEffect(() => {
    formik.setFieldError('registeredUsername', t('USERNAME_EXISTS'));
  }, [authenticationRegisterUserExistTrigger]);

  const formik = useFormik({
    initialValues: {
      registeredUsername: '',
      fullName: '',
    },
    validationSchema,
    onSubmit: values => {
      if (validate() === true) {
        const params: ISignupEnterNameSubmitAction = {
          registeredUsername: values.registeredUsername,
          fullname: values.fullName.trim(),
        };
        dispatch(
          submitName(params, undefined, {
            key: ScreenNames.LoginRealAccount,
          })
        );
      }
    },
  });

  const validate = () => {
    const invalidUsername = bannedNames.some(name => formik.values.registeredUsername.includes(name));
    const invalidFullname = bannedNames.some(name => formik.values.fullName.toLowerCase().includes(name));
    if ((invalidUsername && invalidFullname) || invalidUsername) {
      formik.setFieldError('registeredUsername', t('INVALID_VALUE username'));
      return false;
    } else if (invalidFullname) {
      formik.setFieldError('fullName', t('INVALID_VALUE fullname'));
      return false;
    }
    return true;
  };

  const onFormikChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const onUsernameChange = (text: string) => {
    onFormikChange('registeredUsername', text);
  };

  const onFullNameChange = (text: string) => {
    onFormikChange('fullName', text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HeaderScreen
          leftButtonIcon={props.navigation.canGoBack()}
          goBackAction={props.navigation.canGoBack() ? props.navigation.goBack : undefined}
          headerTitle={''}
          background={true}
        />
        <View style={[globalStyles.alignCenter, styles.logoContainer]}>
          <Logo width={scaleSize(144)} height={scaleSize(62)} />
        </View>
        <TextInputComponent
          value={formik.values.registeredUsername}
          onChangeText={onUsernameChange}
          onBlur={formik.handleBlur('registeredUsername')}
          wholeContainerStyle={styles.wholeContainerStyle}
          labelTextStyle={styles.labelTextStyle}
          labelText={'User name'}
          textInputContainerStyle={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            {
              ...(formik.touched.registeredUsername && Boolean(formik.errors.registeredUsername)
                ? styles.textInputContainerStyleError
                : styles.textInputContainerStyle),
            },
          ]}
          placeholder={'Enter your username'}
          placeholderTextColor={Colors.LIGHTTextDisable}
          textInputStyle={[globalStyles.container, styles.textInputStyle]}
          error={formik.touched.registeredUsername != null && Boolean(formik.errors.registeredUsername)}
          autoCapitalize={'none'}
          errorContent={
            formik.touched.registeredUsername && Boolean(formik.errors.registeredUsername)
              ? formik.errors.registeredUsername
              : ''
          }
          tickRightIcon={<TickIcon width={scaleSize(24)} height={scaleSize(24)} style={[styles.marginRight10]} />}
          crossRightIcon={<CrossIcon width={scaleSize(24)} height={scaleSize(24)} style={[styles.marginRight10]} />}
        />
        <TextInputComponent
          value={formik.values.fullName}
          onChangeText={onFullNameChange}
          onBlur={formik.handleBlur('fullName')}
          wholeContainerStyle={[styles.wholeContainerStyle, styles.secondTextInput]}
          labelTextStyle={styles.labelTextStyle}
          labelText={'Full Name'}
          textInputContainerStyle={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            {
              ...(formik.touched.fullName != null && Boolean(formik.errors.fullName)
                ? styles.textInputContainerStyleError
                : styles.textInputContainerStyle),
            },
          ]}
          placeholder={'Enter your fullname'}
          placeholderTextColor={Colors.LIGHTTextDisable}
          textInputStyle={[globalStyles.container, styles.textInputStyle]}
          error={formik.touched.fullName != null && Boolean(formik.errors.fullName)}
          errorContent={formik.touched.fullName && Boolean(formik.errors.fullName) ? formik.errors.fullName : ''}
          crossRightIcon={<CrossIcon width={scaleSize(24)} height={scaleSize(24)} style={styles.marginRight10} />}
        />
        <TouchableOpacity
          disabled={
            (formik.touched.registeredUsername && Boolean(formik.errors.registeredUsername)) ||
            (formik.touched.fullName && Boolean(formik.errors.fullName)) ||
            formik.values.registeredUsername.trim() === '' ||
            formik.values.fullName.trim() === ''
          }
          style={[
            globalStyles.centered,
            styles.executeFormButton,
            {
              ...(((formik.touched.registeredUsername && Boolean(formik.errors.registeredUsername)) ||
                (formik.touched.fullName && Boolean(formik.errors.fullName)) ||
                formik.values.registeredUsername.trim() === '' ||
                formik.values.fullName.trim() === '') &&
                styles.disabledButton),
            },
          ]}
          onPress={formik.submitForm}
        >
          <Text
            style={[
              styles.executeFormButtonText,
              {
                ...(((formik.touched.registeredUsername && Boolean(formik.errors.registeredUsername)) ||
                  (formik.touched.fullName && Boolean(formik.errors.fullName)) ||
                  formik.values.registeredUsername.trim() === '' ||
                  formik.values.fullName.trim() === '') &&
                  styles.disabledButtonText),
              },
            ]}
          >
            {t('Next')}
          </Text>
        </TouchableOpacity>
        <View style={[styles.validateEx]}>
          <View style={styles.validateExTableContainer}>
            {validateData.map((el, idx) => (
              <View key={idx} style={[globalStyles.flexDirectionRow, styles.validateExItemContainer]}>
                <View style={styles.bullet}>
                  <Text style={styles.normalText}>{'\u2022' + ' '}</Text>
                </View>
                <View style={globalStyles.container}>
                  <Text>
                    <Text style={styles.normalText}>{t(el)}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(SignupEnterName);
