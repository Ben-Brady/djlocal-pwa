import {  formatSongInfo } from "@/lib/format";
import { SongMetadata } from "@/lib/songs";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FC } from "preact/compat";
import IconButton from "../elements/IconButton";
import { useDrawer } from "@/context/DrawerContext";

const PlaylistEntry: FC<{ song: SongMetadata; onClick: () => void }> = ({
    song,
    onClick,
}) => {
    const { openSongDrawer } = useDrawer();

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

            <IconButton
                class="size-8"
                onClick={() => openSongDrawer(song)}
                icon={faEllipsis}
            />
        </div>
    );
};
export default PlaylistEntry;
