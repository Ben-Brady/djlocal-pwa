import { useCallback, useEffect, useMemo } from "preact/hooks";
import { useRegisterSW } from "virtual:pwa-register/preact";
import { useInPWA } from "./useInPwa";

type UpdateCallback = () => void;

export const useUpdatePrompt = (): UpdateCallback | undefined => {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
    const inPwa = useInPWA();

    const [canInstall, setCanInstall] = offlineReady;
    const [needsUpdate, setNeedsUpdate] = needRefresh;

    const shouldUpdate = useMemo(() => !canInstall && needsUpdate, [canInstall, needsUpdate]);

    const update = useCallback(() => {
        updateServiceWorker(true);
        setCanInstall(false);
        setNeedsUpdate(false);
        location.reload();
    }, [updateServiceWorker, setCanInstall, setNeedsUpdate]);

    useEffect(() => {
        if (!inPwa && needsUpdate) update();
    }, [inPwa, needsUpdate, update]);

    return shouldUpdate ? update : undefined;
};
