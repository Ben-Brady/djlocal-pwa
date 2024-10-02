import { FC } from "@/types/FC";
import SongEntry from "@/components/extensive/SongEntry";
import { useMusicContext } from "@/context/MusicContext";
import { formatSongInfo } from "@/lib/format";
import IconButton from "@/components/elements/IconButton";
import {
    faBackwardFast,
    faForwardFast,
    faPauseCircle,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "preact-iso";
import Header from "@/components/utilities/Header";

const QueuePage: FC = () => {
    const { controls, queue, playing, isPaused } = useMusicContext();
    const { route } = useLocation();

    if (!playing) {
        route("/");
        return null;
    }
    return (
        <div class="h-full flex-col gap-2">
            {playing && (
                <Header class="flex-col gap-4">
                    <div class="flex-row gap-4">
                        <div class="flex-col gap-1">
                            <h1 class="text-heading-1">{playing.song.title}</h1>
                            <h1 class="text-heading-3-bold">{formatSongInfo(playing.song)}</h1>
                        </div>
                    </div>
                    <div class="flex-row items-center justify-center gap-8">
                        <IconButton
                            icon={faBackwardFast}
                            class="size-8"
                            onClick={controls.previousTrack}
                        />
                        {isPaused ?
                            <IconButton
                                icon={faPlayCircle}
                                class="size-8"
                                onClick={controls.play}
                            />
                        :   <IconButton
                                icon={faPauseCircle}
                                class="size-8"
                                onClick={controls.pause}
                            />
                        }
                        <IconButton
                            icon={faForwardFast}
                            class="size-8"
                            onClick={controls.nextTrack}
                        />
                    </div>
                </Header>
            )}
            <div class="flex-col gap-2 overflow-auto">
                {queue.slice(1).map(song => (
                    <SongEntry
                        type="playlist"
                        song={song}
                        key={song.id}
                        onClick={() => {
                            controls.playSong(song);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default QueuePage;
