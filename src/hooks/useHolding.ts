import { useCallback, useState } from "preact/hooks";
import { useEvent } from "./useEvent";

export const useHolding = (element: HTMLElement | undefined | null) => {
    const [holding, setHolding] = useState<boolean>(false);

    useEvent(
        element,
        "mousedown",
        useCallback(() => setHolding(true), []),
    );
    useEvent(
        element,
        "mouseup",
        useCallback(() => setHolding(false), []),
    );
    useEvent(
        element,
        "touchstart",
        useCallback(() => setHolding(true), []),
    );
    useEvent(
        element,
        "touchcancel",
        useCallback(() => setHolding(false), []),
    );

    return holding;
};
