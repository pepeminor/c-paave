import { useCallback } from 'react';

interface IInput {
  [s: string]: (param?: any) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const useHandlers = <T extends IInput>(input: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object = Object.keys(input);

  return (
    object.length > 0 &&
    object.reduce((handlers: any, keyHandler: string) => {
      return {
        ...handlers,
        [keyHandler]: useCallback(input[keyHandler], []),
      };
    }, {})
  );
};

export default useHandlers;
