//https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update

import { useRef, useEffect } from 'react';

const useIsMounted = function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(function setIsMounted() {
    isMounted.current = true;

    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default function useUpdateEffect(effect, dependencies) {
  const isMounted = useIsMounted();
  const isInitialMount = useRef(true);

  useEffect(() => {
    let effectCleanupFunc = function noop() {};

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();
      if (!isMounted.current) {
        isInitialMount.current = true;
      }
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};