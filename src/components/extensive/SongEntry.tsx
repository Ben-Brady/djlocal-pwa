import { formatSongInfo } from "@/lib/format";
import { SongMetadata } from "@/lib/songs";
import { faAdd, faEllipsis, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FC, useMemo } from "preact/compat";
import IconButton from "@/components/elements/IconButton";
import { useDrawer } from "@/context/DrawerContext";

const SongEntry: FC<{
    song: SongMetadata;
    type: "playlist" | "song" | "add";
    onClick: () => void;
}> = ({ song, onClick, type }) => {
    const { openSongDrawer } = useDrawer();
    const icon = useMemo(() => {
        if (type === "playlist") return faGripLines;
        if (type === "song") return faEllipsis;
        if (type === "add") return faAdd;
        throw new Error("Invalid type");
    }, [type]);

    return (
        <div
            role="button"
            onClick={onClick}
            class="h-16 w-full flex-row items-center justify-between gap-2 p-4"
            key={song.id}
        >
            <div class="flex-col gap-1 text-xs">
                <span>{song.title}</span>
                <span>{formatSongInfo(song)}</span>
            </div>

            <IconButton class="size-8" onClick={() => openSongDrawer(song)} icon={icon} />
        </div>
    );
};

export default SongEntry;
