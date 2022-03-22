import { Dispatch, useState, useCallback, useMemo } from "react";

export default function <StoredValue>(storageName: string) {
  return function (
    initialValue: StoredValue,
    options?: { sessionOnly: false }
  ): [StoredValue | null, Dispatch<StoredValue>] {
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

    // IMPORTANT: when the initial value of useState changes, nothing happens
    const [localValue, setLocalValue] = useState<StoredValue>(getStoredValue());

    const storedValue = useMemo(() => {
      if (typeof window === "undefined" || !localValue) return null;

      return getStoredValue();
    }, [localValue, getStoredValue]);

    const setStorageValue = useCallback(
      (newValue: StoredValue): void => {
        setLocalValue(newValue);

        storageMethod?.setItem(storageName, JSON.stringify(newValue));
      },
      [storageMethod]
    );

    return [storedValue, setStorageValue];
  };
}
