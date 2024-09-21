import { useEffect, useState } from "preact/hooks";

type DownloadCallback = () => void;

export const useDownloadPrompt = (): DownloadCallback | undefined => {
    const [prompt, setPrompt] = useState<DownloadCallback | undefined>();

    useEffect(() => {
        const callback = (event: Event) => {
            const installEvent = event as BeforeInstallPromptEvent;

            event.preventDefault();
            const prompt = () => installEvent.prompt();
            setPrompt(() => prompt);
        };

        window.addEventListener("beforeinstallprompt", callback);
        return () => {
            window.removeEventListener("beforeinstallprompt", callback);
        };
    });

    return prompt;
};

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}
