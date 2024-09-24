import { faEllipsis, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FC } from "preact/compat";
import IconButton from "../elements/IconButton";
import { usePlayContext } from "@/context/playContext";

const MinimizedPlayer: FC = () => {
    const { playing, controls, isPaused } = usePlayContext();

    if (!playing) return null;

    return (
        <div class="absolute bottom-0 left-0 w-full flex-col bg-tertiary">
            <div
                class="min-h-0.5 w-full flex-row transition-all hover:min-h-2 bg-black"
                onClick={(ev) => {
                    const width = ev.currentTarget.clientWidth;
                    const x = ev.layerX;
                    const percent = x / width;
                    controls.seekTo(playing.song.duration * percent);
                    ev.preventDefault();
                }}
            >
                <div
                    class="min-h-full bg-accent"
                    style={{
                        width: `${Math.min(1, playing.currentTime / playing.song.duration) * 100}%`,
                    }}
                />
            </div>
            <div class="h-16 flex-row items-center gap-4 p-4">
                <IconButton
                    class="size-8"
                    icon={isPaused ? faPlay : faPause}
                    onClick={isPaused ? controls.play : controls.pause}
                />
                <div class="w-full flex-col">
                    <span class="font-bold">{playing.song.title}</span>
                    <span class="capitalize">{playing.song.artist} • 3:42</span>
                </div>
                <IconButton class="size-8" icon={faEllipsis} />
            </div>
        </div>
    );
};

export default MinimizedPlayer;
