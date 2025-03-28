import { useState, useEffect, useRef } from "react";
import { deserialize, serialize } from "../utils/utils";

function usePersistedState<T>(key: string, initialValue: T | (() => T)) {
    const [state, setState] = useState<T>(() => {
        return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
    });

    const stateUpdated = useRef(false);

    useEffect(() => {
        if (stateUpdated.current) {
            sessionStorage.setItem(key, serialize(state));
        } else {
            const storageValue = sessionStorage.getItem(key);
            if (storageValue !== null) {
                setState(deserialize(storageValue) as T);
            } else {
                setState(typeof initialValue === "function" ? (initialValue as () => T)() : initialValue);
            }
            stateUpdated.current = true;
        }
    }, [key, initialValue, state]);

    return [state, setState] as const;
}

export default usePersistedState;