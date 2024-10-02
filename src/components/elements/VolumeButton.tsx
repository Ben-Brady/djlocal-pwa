import { FC } from "@/types/FC";
import IconButton from "./IconButton";
import { faVolumeHigh, faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useRef } from "preact/hooks";
import { useHover } from "@/hooks/useHover";
import { useHolding } from "@/hooks/useHolding";
import classNames from "classnames";

export const VolumeButton: FC<{
    volume: number;
    muted: boolean;
    setVolume: (value: number) => void;
    mute: () => void;
    unmute: () => void;
}> = ({ volume, muted, setVolume, mute, unmute }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rangeRef = useRef<HTMLInputElement>(null);

    const icon = useMemo(() => {
        if (muted || volume === 0) return faVolumeMute;
        if (volume < 0.2) return faVolumeLow;
        return faVolumeHigh;
    }, [muted, volume]);

    const hovering = useHover(containerRef.current);
    const holding = useHolding(rangeRef.current);

    const rangeVisible = useMemo(() => hovering || holding, [hovering, holding]);
    return (
        <div ref={containerRef} class="flex-row items-center gap-4 pr-2">
            <IconButton icon={icon} class="size-8" onClick={muted ? unmute : mute} />
            <input
                class={classNames("h-full accent-accent transition-all", {
                    "w-24": rangeVisible,
                    "w-0 opacity-0": !rangeVisible,
                })}
                name="volume"
                aria-label="Volume"
                type="range"
                ref={rangeRef}
                min={0}
                step={0.01}
                max={1}
                value={Math.cbrt(volume)}
                onChange={ev => {
                    const percent = parseFloat(ev.currentTarget.value);
                    setVolume(percent ** 3);
                }}
            />
        </div>
    );
};
