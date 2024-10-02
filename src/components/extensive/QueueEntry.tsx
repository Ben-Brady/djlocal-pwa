import { formatSongInfo } from "@/lib/format";
import { SongMetadata } from "@/lib/songs";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FC, HTMLAttributes } from "preact/compat";
import IconButton from "@/components/elements/IconButton";
import { useDrawer } from "@/context/DrawerContext";

const QueueEntry: FC<
    {
        song: SongMetadata;
        onClick?: () => void;
        onDrag?: (offset: number) => void;
    } & HTMLAttributes<HTMLDivElement>
> = ({ song, onClick, ...props }) => {
    const { openSongDrawer } = useDrawer();

    return (
        <div
            {...props}
            role="button"
            onClick={onClick}
            class="h-16 w-full flex-row items-center justify-between gap-2 p-4"
        >
            <div class="flex-col gap-1 text-xs">
                <span class="text-heading-4">{song.title}</span>
                <span class="text-small">{formatSongInfo(song)}</span>
            </div>

            <IconButton class="size-8" onClick={() => openSongDrawer(song)} icon={faGripLines} />
        </div>
    );
};

export default QueueEntry;
