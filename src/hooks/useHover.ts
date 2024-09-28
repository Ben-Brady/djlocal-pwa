import { useCallback, useState } from "preact/hooks";
import { useEvent } from "./useEvent";

export const useHover = (element: HTMLElement | undefined | null) => {
    const [hovering, setHovering] = useState<boolean>(false);

    useEvent(
        element,
        "mouseenter",
        useCallback(() => setHovering(true), []),
    );
    useEvent(
        element,
        "mouseleave",
        useCallback(() => setHovering(false), []),
    );

    return hovering;
};
