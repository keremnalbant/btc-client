import { useEffect, useRef, useState } from 'react';
import { EventName } from '../models';
import { removeEvent, subscribeEvent } from '../utils/subscriber';

export function useSubscriber<T>(
  eventName: EventName,
  defaultValue: T,
  callback: any = null,
  depList: any[] = [],
  subscribe = true,
): [T, Function] {
  const [data, setData] = useState<T>(defaultValue);

  const stateRef = useRef(data);

  const handleSetState = (data: T) => {
    stateRef.current = data;
    setData(data);
  };

  const handleCallback = (param: any) => {
    if (typeof callback === 'function') {
      const tempData = callback(param[0], stateRef.current);
      if (tempData) {
        handleSetState(tempData);
      }
    } else {
      handleSetState(param[0]);
    }
  };

  useEffect(() => {
    if (subscribe) {
      subscribeEvent(eventName, handleCallback);
    }
    return () => {
      removeEvent(eventName, handleCallback);
    };
    //eslint-disable-next-line
  }, [eventName, subscribe, ...depList]);

  return [data, setData];
}

export default useSubscriber;
