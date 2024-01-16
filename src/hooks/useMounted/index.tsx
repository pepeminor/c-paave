import { useEffect, useRef } from 'react';

/**
 * useMounted hook to check if component is mounted
 */
const useMounted = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
};

export default useMounted;
