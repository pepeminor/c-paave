import { useEffect, useState } from 'react';
import Orientation from 'react-native-orientation-locker';

export function useOrientation() {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Orientation.addDeviceOrientationListener(newOrientation => {
      setOrientation(newOrientation);
    });
  }, []);

  return orientation;
}
