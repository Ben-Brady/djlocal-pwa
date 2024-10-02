import { FC } from "@/types/FC";
import IconButton from "./IconButton";
import { faVolumeHigh, faVolumeLow, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useRef, useState } from "preact/hooks";
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
    const [rangeVolume, setRangeVolume] = useState<number>(volume);

    const icon = useMemo(() => {
        if (muted || volume === 0) return faVolumeMute;
        if (volume < 0.2) return faVolumeLow;
        return faVolumeHigh;
    }, [muted, volume]);

    const hovering = useHover(containerRef.current);
    const holding = useHolding(rangeRef.current);
    const rangeVisible = useMemo(() => hovering || holding, [hovering, holding]);

    return (
        <div ref={containerRef} class="hidden h-full items-center sm:flex-row">
            <IconButton icon={icon} class="size-8" onClick={muted ? unmute : mute} />
            <input
                class={classNames("h-full accent-accent transition-all", {
                    "ml-4 w-24": rangeVisible,
                    "w-0 opacity-0": !rangeVisible,
                })}
                name="volume"
                aria-label="Volume"
                type="range"
                ref={rangeRef}
                min={0}
                step={0.01}
                max={1}
                value={Math.cbrt(rangeVolume)}
                onChange={ev => {
                    const percent = parseFloat(ev.currentTarget.value);
                    const volume = percent ** 3;
                    setVolume(volume);
                    setRangeVolume(volume);
                }}
            />
        </div>
    );
};
