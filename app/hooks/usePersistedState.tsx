import { useState, useEffect } from "react";

function usePersistedState<T>(key: string, initialValue: T) {
    // initialize when it called first time.
    const [state, setState] = useState<T>(initialValue);

    // run it once when the component is mounted
    useEffect(() => {
        const storageValue = sessionStorage.getItem(key);
        if (storageValue) {
            setState(JSON.parse(storageValue));
        }
    }, []);

    // run it whenever the state is changed and after running useEffect above
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState] as const;
}

export default usePersistedState;