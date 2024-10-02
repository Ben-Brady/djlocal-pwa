import { useEffect } from "preact/hooks";

type HTMLElementEventMap = ElementEventMap & GlobalEventHandlersEventMap;

export const useEvent = <
    TElement extends HTMLElement,
    TEvent extends keyof HTMLElementEventMap,
>(
    element: TElement | undefined | null,
    event: TEvent,
    callback: (options: {
        event: HTMLElementEventMap[TEvent];
        element: TElement;
    }) => unknown,
) => {
    useEffect(() => {
        if (!element) return;

        const eventCallback = (ev: HTMLElementEventMap[TEvent]) =>
            callback({ event: ev, element });

        element.addEventListener(event, eventCallback);
        return () => element.removeEventListener(event, eventCallback);
    }, [element, callback]);
};
