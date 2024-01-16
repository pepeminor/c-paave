import { GetOTPIdType, GetOTPTxType, ICheckUserExistParams } from 'interfaces/authentication';
import { changeRegisterParams, checkUserExist } from 'reduxs/global-actions/Authentication';

import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DiagonalGradientButton from 'components/DiagonalGradientButton';
import TextInputComponent from 'components/TextInput';
import { CheckUserExistType } from 'constants/enum';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { handleErrors } from 'utils';
import PasswordIcon from 'assets/icon/Lock.svg';
import UserIcon from 'assets/icon/User.svg';
import globalStyles, { GradientColors, scaleSize } from 'styles';
import signUpSchema from './schemas';
import useStyles, { localColors } from './styles';
import { IState } from 'reduxs/global-reducers';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ErrorMessage } from 'constants/message';
import config from 'config';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { sendLogEventAppFlyers } from 'utils/appFlyers';
import { AuthType } from 'constants/AuthType';

const initValue = {
  email: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
};

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const passwordTextInput = useRef<TextInput | null>();
  const confirmPasswordTextInput = useRef<TextInput | null>();
  const referralCodeTextInput = useRef<TextInput | null>();
  const checkEmailExit = useSelector((state: IState) => state.checkExistUserEmail);

  useUpdateEffect(() => {
    if (checkEmailExit.data && !checkEmailExit.data.exist) {
      formik.setFieldError('email', undefined);
    } else {
      formik.setFieldError('email', ErrorMessage.EMAIL_EXISTS);
    }
  }, [checkEmailExit]);

  const formik = useFormik({
    initialValues: initValue,
    validate: values =>
      signUpSchema
        .validate(values, {
          abortEarly: false,
          context: {},
        })
        .then(() => true, handleErrors),
    onSubmit: values => {
      const { email, password } = values;
      const params: ICheckUserExistParams = {
        type: CheckUserExistType.EMAIL,
        value: email,
        getOTPParams: {
          navigation: { key: 'SignupOTP', params: { isSignup: true, sec: AuthType.PAAVE } },
          id: email,
          idType: GetOTPIdType.EMAIL,
          txType: GetOTPTxType.REGISTER,
        },
      };

      //tracking amplitude and appsflyer
      track(AMPLITUDE_EVENT.SIGN_UP, {
        email,
      });
      sendLogEventAppFlyers('af_sign_up');

      //handle api
      dispatch(
        checkUserExist(params, undefined, undefined, true, undefined, {
          handleSuccess: () => {
            sendLogEventAppFlyers('af_sign_up_succeed');

            track(AMPLITUDE_EVENT.SIGN_UP_SUCCESS, {
              email,
            });
            dispatch(changeRegisterParams({ email: email, password, otpKey: '', deviceId: config.uniqueId }));
          },
        })
      );
    },
  });

  //  const resetForm = () => formik.resetForm({ values: initValue });

  const handleNumberFieldChange = (type: string) => (value: string) => {
    formik.setFieldValue(type, value);
  };

  const submitUsernameTextInput = () => {
    passwordTextInput.current?.focus();
  };

  const submitPasswordTextInput = () => {
    confirmPasswordTextInput.current?.focus();
  };

  const submitConfirmPasswordTextInput = () => {
    referralCodeTextInput.current?.focus();
  };

  return (
    <View>
      <TextInputComponent
        onSubmitEditing={submitUsernameTextInput}
        value={formik.values.email}
        onChangeText={handleNumberFieldChange('email')}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Email'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          {
            ...(!(Boolean(formik.errors.email) && formik.values.email)
              ? styles.textInputContainerStyle
              : styles.textInputContainerStyleError),
          },
        ]}
        returnKeyType={'next'}
        icon={<UserIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
        placeholder={'Enter your email'}
        placeholderTextColor={localColors.DARKTextBigTitle}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        error={Boolean(formik.errors.email) && Boolean(formik.values.email)}
        errorContent={formik.errors.email}
        autoCapitalize={'none'}
      />
      <TextInputComponent
        ref1={input => {
          passwordTextInput.current = input;
        }}
        onSubmitEditing={submitPasswordTextInput}
        value={formik.values.password}
        onChangeText={handleNumberFieldChange('password')}
        wholeContainerStyle={[styles.wholeContainerVerticalStyle]}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Password'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          {
            ...(!(Boolean(formik.errors.password) && formik.values.password)
              ? styles.textInputContainerStyle
              : styles.textInputContainerStyleError),
          },
        ]}
        icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
        placeholderTextColor={localColors.DARKTextBigTitle}
        placeholder={'Password'}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        secureTextEntry={true}
        eyeIconHeight={scaleSize(14)}
        eyeIconWidth={scaleSize(19)}
        eyeIconStyle={styles.eyeIconStyle}
        error={Boolean(formik.errors.password) && Boolean(formik.values.password)}
        errorContent={formik.errors.password}
        autoCapitalize={'none'}
      />
      <TextInputComponent
        ref1={input => {
          confirmPasswordTextInput.current = input;
        }}
        onSubmitEditing={submitConfirmPasswordTextInput}
        value={formik.values.confirmPassword}
        onChangeText={handleNumberFieldChange('confirmPassword')}
        wholeContainerStyle={[styles.wholeContainerVerticalStyle]}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Confirm Password'}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          {
            ...(!(Boolean(formik.errors.confirmPassword) && formik.values.confirmPassword)
              ? styles.textInputContainerStyle
              : styles.textInputContainerStyleError),
          },
        ]}
        icon={<PasswordIcon height={scaleSize(18)} width={scaleSize(16)} style={styles.iconStyle} />}
        placeholderTextColor={localColors.DARKTextBigTitle}
        placeholder={'Confirm Password'}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        secureTextEntry={true}
        eyeIconHeight={scaleSize(14)}
        eyeIconWidth={scaleSize(19)}
        eyeIconStyle={styles.eyeIconStyle}
        error={Boolean(formik.errors.confirmPassword) && Boolean(formik.values.confirmPassword)}
        errorContent={formik.errors.confirmPassword}
        autoCapitalize={'none'}
      />
      {/* <TextInputComponent
        ref1={input => {
          referralCodeTextInput.current = input;
        }}
        value={formik.values.referralCode}
        onChangeText={handleNumberFieldChange('referralCode')}
        wholeContainerStyle={[styles.wholeContainerVerticalStyle]}
        labelTextStyle={styles.labelTextStyle}
        labelText={'Referral Code (Optional)'}
        placeholder={'Referral Code'}
        placeholderTextColor={localColors.DARKTextBigTitle}
        textInputContainerStyle={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          styles.textInputContainerStyle,
        ]}
        textInputStyle={[globalStyles.container, styles.textInputStyle]}
        icon={
          <IconCode
            height={scaleSize(24)}
            width={scaleSize(24)}
            style={styles.iconStyle}
          />
        }
      /> */}

      <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.executeFormContainerLogin]}>
        <View style={globalStyles.container}>
          <DiagonalGradientButton
            onPress={formik.submitForm}
            btnText={t('Sign Up')}
            colors={GradientColors.GradientBlue}
            isDisable={!formik.dirty || !formik.isValid}
          />
        </View>
      </View>
    </View>
  );
};
export default SignInForm;
