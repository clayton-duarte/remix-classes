import { Dispatch, useState, useCallback, useMemo, useEffect } from "react";

export default function <StoredValue>(storageName: string) {
  return function (
    initialValue: StoredValue,
    options?: { sessionOnly: false }
  ): [StoredValue | null, Dispatch<StoredValue>] {
    const [value, setValue] = useState<StoredValue>(initialValue);

    const storageMethod = useMemo(() => {
      if (typeof window === "undefined") return;

      if (options?.sessionOnly) return window.sessionStorage;

      return window.localStorage;
    }, [options?.sessionOnly]);

    const getStoredValue = useCallback(() => {
      if (typeof window === "undefined") return initialValue;

      const rawValue = storageMethod?.getItem(storageName);

      if (rawValue == null) return initialValue;

      return JSON.parse(rawValue) as StoredValue;
    }, [initialValue, storageMethod]);

    const storedValue = useMemo(() => {
      if (typeof window === "undefined" || !value) return null;

      return getStoredValue();
    }, [value, getStoredValue]);

    useEffect(() => {
      setValue(getStoredValue());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setStorageValue = useCallback(
      (newValue: StoredValue): void => {
        setValue(newValue);

        storageMethod?.setItem(storageName, JSON.stringify(newValue));
      },
      [storageMethod]
    );

    return [storedValue, setStorageValue];
  };
}
