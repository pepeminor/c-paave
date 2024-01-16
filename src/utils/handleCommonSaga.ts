import { IAction } from 'interfaces/common';
import { alertMessage } from './common';
import { navigate, navigateClean } from './rootNavigation';
import i18n from 'i18next';

export const handleCommonSagaEffect = (action: IAction<any>) => {
  if (action.showMessage != null) {
    alertMessage(
      'success',
      action.showMessage.message != null ? i18n.t(action.showMessage.message) : '',
      action.showMessage.description != null ? i18n.t(action.showMessage.description) : ''
    );
  }
  if (action.navigation) {
    action.navigation.clean || action.navigation.goBackScreen
      ? navigateClean(action.navigation, action.navigation.goBackScreen)
      : navigate(action.navigation);
  }
};
