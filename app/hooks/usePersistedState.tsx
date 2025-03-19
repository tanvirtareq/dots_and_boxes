import { useState, useEffect } from "react";

function usePersistedState<T>(key: string, initialValue: T) {
    // initialize when it called first time.
    const [state, setState] = useState<T>(initialValue);

    // run it once when the component is mounted
    useEffect(() => {
        console.log("sessionStorage after mounted ", sessionStorage);
        if (sessionStorage.hasOwnProperty(key)) {
            const storageValue = sessionStorage.getItem(key);
            console.log("get ", key, storageValue);
            if (storageValue !== null) {
                setState(JSON.parse(storageValue));
            }
        } else {
            setState(initialValue);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // run it whenever the state is changed and after running useEffect above
    useEffect(() => {
        console.log("set ", key, state);
        sessionStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return [state, setState] as const;
}

export default usePersistedState;