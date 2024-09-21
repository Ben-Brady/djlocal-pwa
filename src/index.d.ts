declare module "virtual:pwa-register/preact" {
    import type { StateUpdater } from "preact/hooks";
    import type { RegisterSWOptions } from "vite-plugin-pwa/types";

    export type { RegisterSWOptions };

    export function useRegisterSW(options?: RegisterSWOptions): {
        needRefresh: [boolean, Dispatch<StateUpdater<boolean>>];
        offlineReady: [boolean, Dispatch<StateUpdater<boolean>>];
        updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
    };
}
