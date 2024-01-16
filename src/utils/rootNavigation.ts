import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';
import { IStackRouteProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export const navigationRef = createNavigationContainerRef<IStackRouteProps>();

export interface INavigationProps {
  readonly key: keyof IStackRouteProps;
  readonly params?: any;
}

export interface INavigationGoBackProps extends INavigationProps {
  readonly backScreenPosition: number;
}

export function navigate(params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(params.key, params.params);
  }
}

export function navigateBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function navigateReplace(screenName: ScreenNames, params: { [s: string]: any }) {
  if (navigationRef.isReady()) {
    StackActions.replace(screenName, params);
  }
}

export function navigateClean(
  goToParams: INavigationProps,
  goBackParams?: INavigationProps | INavigationGoBackProps[] // Truyền backScreenPosition theo thứ tự back về
) {
  if (navigationRef.isReady()) {
    const routes = [
      {
        name: goToParams.key,
        params: goToParams.params,
      },
    ];
    if (goBackParams != null) {
      const isArr = Array.isArray(goBackParams);
      let routesTemp;

      if (isArr) {
        goBackParams.sort((a, b) => {
          return b.backScreenPosition - a.backScreenPosition;
        });
        routesTemp = goBackParams.map(el => ({
          name: el.key,
          params: el.params,
        }));
      } else {
        routesTemp = [
          {
            name: goBackParams.key,
            params: goBackParams.params,
          },
        ];
      }
      routes.unshift(...routesTemp);
    }
    navigationRef.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      })
    );
  }
}

export function clearHistoryAndNavigate(params: INavigationProps) {
  if (navigationRef.isReady()) {
    const routeLength = navigationRef.current?.getState()?.routes?.length ?? 0;
    navigationRef.canGoBack() && routeLength > 1 && navigationRef.dispatch(StackActions.popToTop());
    navigateClean(params);
  }
}
