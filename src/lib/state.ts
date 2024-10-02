import { useEffect, useState } from "preact/hooks";

export const createExternalState = <T>(
    getSnapshot: () => T,
): [useStore: () => T, update: () => void] => {
    const listeners = new Set<(value: T) => void>();

    const update = () => {
        const value = getSnapshot();
        listeners.forEach(callback => callback(value));
    };

    const useStore = () => {
        const [value, setValue] = useState<T>(getSnapshot);

        useEffect(() => {
            listeners.add(setValue);
            return () => listeners.delete(setValue);
        }, [setValue]);

        return value;
    };

    return [useStore, update];
};
