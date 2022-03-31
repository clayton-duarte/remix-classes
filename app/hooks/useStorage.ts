import { Dispatch, useState, useCallback, useMemo } from "react";

export default function (storageName: string) {
  return function <StoreValueType>(
    initialValue: StoreValueType,
    options?: { sessionOnly: false }
  ): [StoreValueType | null, Dispatch<StoreValueType>] {
    const storageMethod = useMemo(() => {
      if (typeof window === "undefined") {
        return;
      }

      if (options?.sessionOnly) {
        return window.sessionStorage;
      }

      return window.localStorage;
    }, [options?.sessionOnly]);

    const getStoredValue = useCallback(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }

      const rawValue = storageMethod?.getItem(storageName);

      if (rawValue == null || rawValue === "undefined") {
        return initialValue;
      }

      return JSON.parse(rawValue) as StoreValueType;
    }, [initialValue, storageMethod]);

    // IMPORTANT: when the initial value of useState changes, nothing happens
    const [localValue, setLocalValue] = useState<StoreValueType>(
      getStoredValue()
    );

    const storedValue = useMemo(() => {
      if (typeof window === "undefined" || !localValue) {
        return null;
      }

      return getStoredValue();
    }, [localValue, getStoredValue]);

    const setStorageValue = useCallback(
      (newValue: StoreValueType): void => {
        setLocalValue(newValue);

        storageMethod?.setItem(storageName, JSON.stringify(newValue));
      },
      [storageMethod]
    );

    return [storedValue, setStorageValue];
  };
}
