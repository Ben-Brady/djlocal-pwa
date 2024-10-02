import { FC } from "@/types/FC";
import SongEntry from "@/components/extensive/SongEntry";
import { useMusicContext } from "@/context/MusicContext";
import { formatSongInfo } from "@/lib/format";
import IconButton from "@/components/elements/IconButton";
import InvalidAlbum from "@/assets/images/InvalidAlbum.svg";
import {
    faBackwardFast,
    faForwardFast,
    faPauseCircle,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/utilities/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import QueueEntry from "@/components/extensive/QueueEntry";
import OrderableSongList from "@/components/extensive/OrderableSongList";

const QueuePage: FC = () => {
    const { controls, queue, playing, isPaused } = useMusicContext();
    const [parent] = useAutoAnimate();

    return (
        <div class="h-full flex-col gap-2">
            <Header class="flex-col items-center gap-4">
                <div class="h-24 w-full flex-row gap-4 sm:w-64">
                    <img src={InvalidAlbum} class="h-full w-auto" />
                    <div class="flex-col gap-1">
                        <h1 class="text-heading-1">{playing?.song.title ?? ""}</h1>
                        <h1 class="text-heading-3-bold">
                            {playing?.song ? formatSongInfo(playing.song) : ""}
                        </h1>
                    </div>
                </div>
                <div class="flex-row items-center justify-center gap-8">
                    <IconButton
                        icon={faBackwardFast}
                        class="size-8"
                        onClick={controls.previousTrack}
                    />
                    {isPaused ?
                        <IconButton icon={faPlayCircle} class="size-8" onClick={controls.play} />
                    :   <IconButton icon={faPauseCircle} class="size-8" onClick={controls.pause} />}
                    <IconButton icon={faForwardFast} class="size-8" onClick={controls.nextTrack} />
                </div>
            </Header>
            <div class="flex-col gap-2 overflow-auto" ref={parent}>
                <OrderableSongList
                    songs={queue.slice(1)}
                    onMoveElement={controls.moveSongPosition}
                />
            </div>
        </div>
    );
};

export default QueuePage;
