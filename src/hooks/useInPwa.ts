import { useEffect, useState } from "preact/hooks";

export const useInPWA = (): boolean => {
    const [inPwa, setInPwa] = useState(getInPwa);

    useEffect(() => {
        const callback = () => {
            setInPwa(getInPwa());
        };

        window.addEventListener("DOMContentLoaded", callback);
        return () => window.removeEventListener("DOMContentLoaded", callback);
    }, []);

    return inPwa;
};

const getInPwa = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(display-mode: standalone)").matches;
};
