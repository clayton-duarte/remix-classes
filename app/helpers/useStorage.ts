import { Dispatch, useState, useCallback, useMemo, useEffect } from "react";

export default function <S>(storageName: string) {
  return function (
    initialValue: S,
    options?: { sessionOnly: false }
  ): [S | null, Dispatch<S>] {
    const [value, setValue] = useState<S>(initialValue);
    const isServer = typeof window === "undefined";

    const storageMethod = useMemo(() => {
      if (isServer) return;
      if ((options?.sessionOnly, isServer)) return window.sessionStorage;
      return window.localStorage;
    }, [options?.sessionOnly]);

    const getStoredValue = useCallback(() => {
      if (isServer) return initialValue;
      const rawValue = storageMethod?.getItem(storageName);
      if (rawValue == null) return initialValue;
      return JSON.parse(rawValue) as S;
    }, [initialValue, isServer]);

    const storedValue = useMemo(() => {
      if (isServer) return null;
      return getStoredValue();
    }, [value]);

    useEffect(() => {
      setValue(getStoredValue());
    }, []);

    function setStorageValue(newValue: S): void {
      setValue(newValue);
      storageMethod?.setItem(storageName, JSON.stringify(newValue));
    }

    return [storedValue, setStorageValue];
  };
}
