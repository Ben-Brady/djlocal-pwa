import { SongMetadata } from "@/lib/songs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FC } from "preact/compat";
import IconButton from "../elements/IconButton";

const Song: FC<{
    song: SongMetadata;
    onDelete: () => void;
}> = ({ song, onDelete }) => {
    return (
        <div class="h-16 flex-row items-center gap-1">
            <div class="w-64">
                <a class="w-full text-right" href={`/song/${song.id}`}>
                    {song.title}
                </a>
            </div>

            <div class="flex-row gap-2">
                <IconButton class="size-8" onClick={onDelete} icon={faTrash} />
            </div>
        </div>
    );
};
export default Song;
