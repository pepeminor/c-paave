import React, { useState } from 'react';
import { Dimensions } from 'react-native';

/**
 * @description Hook to check if the device is in landscape mode
 * @returns {boolean} isLandScape
 */
export const useIsLandscape = () => {
  const [isLandscape, setIsLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height);

  React.useEffect(() => {
    const listener = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      setIsLandscape(width > height);
    });
    return () => {
      listener.remove();
    };
  }, []);

  return isLandscape;
};
