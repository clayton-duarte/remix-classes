import { Dispatch, useState, useCallback, useMemo, useEffect } from "react";

export default function <StoredValue>(storageName: string) {
  return function (
    initialValue: StoredValue,
    options?: { sessionOnly: false }
  ): [StoredValue | null, Dispatch<StoredValue>] {
    const [value, setValue] = useState<StoredValue>(initialValue);
    const isServer = typeof window === "undefined";

    const storageMethod = useMemo(() => {
      if (isServer) return;

      if ((options?.sessionOnly, isServer)) return window.sessionStorage;

      return window.localStorage;
    }, [options?.sessionOnly, isServer]);

    const getStoredValue = useCallback(() => {
      if (isServer) return initialValue;

      const rawValue = storageMethod?.getItem(storageName);

      if (rawValue == null) return initialValue;

      return JSON.parse(rawValue) as StoredValue;
    }, [initialValue, isServer, storageMethod]);

    const storedValue = useMemo(() => {
      if (isServer || !value) return null;

      return getStoredValue();
    }, [value, getStoredValue, isServer]);

    useEffect(() => {
      setValue(getStoredValue());
    }, [getStoredValue]);

    function setStorageValue(newValue: StoredValue): void {
      setValue(newValue);

      storageMethod?.setItem(storageName, JSON.stringify(newValue));
    }

    return [storedValue, setStorageValue];
  };
}
