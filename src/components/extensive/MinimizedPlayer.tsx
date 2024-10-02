import { faEllipsis, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../elements/IconButton";
import { useMusicContext } from "@/context/MusicContext";
import { useDrawer } from "../../context/DrawerContext";
import { FC } from "@/types/FC";
import { formatDuration } from "@/lib/format";
import { VolumeButton } from "../elements/VolumeButton";
import { setPlayerVolume } from "@/hooks/usePlayerVolume";

const MinimizedPlayer: FC = () => {
    const { playing, controls, isPaused, isMuted, volume } = useMusicContext();
    const { openSongDrawer } = useDrawer();

    if (!playing) return null;
    const { song, currentTime } = playing;

    return (
        <div class="absolute bottom-0 left-0 w-full flex-col bg-tertiary">
            <div
                class="relative min-h-1 w-full cursor-pointer flex-row bg-black transition-all hover:min-h-2"
                onMouseDown={ev => {
                    const width = ev.currentTarget.clientWidth;
                    const x = ev.layerX;
                    const percent = x / width;
                    controls.seekTo(song.duration * percent);
                    ev.preventDefault();
                }}
            >
                <div
                    class="min-h-full bg-accent"
                    style={{
                        width: `${Math.min(1, currentTime / song.duration) * 100}%`,
                    }}
                />
            </div>
            <div class="h-16 flex-row items-center gap-4 p-4">
                <IconButton
                    class="size-8"
                    icon={isPaused ? faPlay : faPause}
                    onClick={isPaused ? controls.play : controls.pause}
                />
                <VolumeButton
                    mute={controls.mute}
                    unmute={controls.unmute}
                    setVolume={volume => setPlayerVolume(volume)}
                    volume={volume}
                    muted={isMuted}
                />
                <div class="w-full flex-col text-wrap break-all">
                    <span class="font-bold">
                        {song.title}
                        {song.artist && ` • ${song.artist}`}
                    </span>
                    <span class="capitalize">
                        {formatDuration(currentTime)} / {formatDuration(song.duration)}
                    </span>
                </div>
                <IconButton class="size-8" icon={faEllipsis} onClick={() => openSongDrawer(song)} />
            </div>
        </div>
    );
};

export default MinimizedPlayer;
