import { FC } from "@/types/FC";
import IconButton from "./IconButton";
import { faVolumeHigh, faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useRef } from "preact/hooks";
import { useHover } from "@/hooks/useHover";
import { percent } from "@/lib/utils";

export const VolumeButton: FC<{
    volume: number;
    muted: boolean;
    setVolume: (value: number) => void;
    mute: () => void;
    unmute: () => void;
}> = ({ volume, muted, setVolume, mute, unmute }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const icon = useMemo(() => {
        if (muted) return faVolumeMute;
        if (volume < 0.2) return faVolumeLow;
        return faVolumeHigh;
    }, [volume]);

    const hovering = useHover(containerRef.current);

    return (
        <div ref={containerRef} class="flex-row items-center gap-4 pr-2">
            <IconButton icon={icon} class="size-8" onClick={muted ? unmute : mute} />
            {hovering && (
                <div
                    class="animate-in-width relative h-1.5 w-20 overflow-hidden rounded-lg bg-black sm:w-24"
                    role="button"
                    onClick={(ev) => {
                        const width = ev.currentTarget.clientWidth;
                        const percent = (ev.layerX / width) ** 3;
                        setVolume(percent);
                    }}
                >
                    <div
                        class="animate-in-width duration-25 h-full bg-white transition-all ease-linear"
                        style={{ width: percent(Math.cbrt(volume)) }}
                    />
                </div>
            )}
        </div>
    );
};
