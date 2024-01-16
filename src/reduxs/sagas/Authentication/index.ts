import watchChangePassword from './ChangePassword';
import watchChangePIN from './ChangePIN';
import watchCheckUserExist from './CheckUserExist';
import watchGetOTP from './GetOTP';
import watchLogin from './Login';
import watchNonLogin from './LoginNonUser';
import watchRefreshToken from './RefreshToken';
import watchRegisterUser from './RegisterUser';
import watchResetPassword from './ResetPassword';
import watchVerifyOTP from './VerifyOTP';
import generateNewKisCard from './GenerateNewKisCard';
import kisVerifyAndSaveOTP from './KisVerifyAndSaveOTP';
import LoginSEC from './LoginSEC';
import autoSignupOTP from './AutoSignupOTP';
import watchSelectKisAccount from './SelectKisAccount';
import changePasswordForKis from './ChangePasswordForKis';
import watchLoginBiometricAfterTimeOut from './loginBiometricAfterTimeout';
import watchReLoginBiometricSaga from './reLoginBiometric';

export {
  watchRegisterUser as registerUserSaga,
  watchLogin as loginSaga,
  watchNonLogin as nonLoginSaga,
  watchGetOTP as getOTPSaga,
  watchCheckUserExist as checkUserExistSaga,
  watchVerifyOTP as verifyOTPSaga,
  watchResetPassword as resetPassword,
  watchChangePassword as changePassword,
  watchChangePIN as changePIN,
  watchRefreshToken as refreshToken,
  generateNewKisCard,
  kisVerifyAndSaveOTP,
  LoginSEC,
  autoSignupOTP,
  watchSelectKisAccount,
  changePasswordForKis,
  watchLoginBiometricAfterTimeOut,
  watchReLoginBiometricSaga,
};
