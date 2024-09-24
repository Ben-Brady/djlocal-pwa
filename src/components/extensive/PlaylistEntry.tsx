import { formatDuration } from "@/lib/format";
import { SongMetadata } from "@/lib/songs";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "preact/compat";
import IconButton from "../elements/IconButton";

const PlaylistEntry: FC<{ song: SongMetadata; onClick: () => void }> = ({
    song,
    onClick,
}) => {
    return (
        <div
            role="button"
            onClick={onClick}
            class="h-16 w-full flex-row items-center justify-between gap-2 p-4"
            key={song.id}
        >
            <div class="flex-col gap-1 text-xs">
                <span>{song.title}</span>
                {song.artist ?
                    <span>Tame Impala • {formatDuration(song.duration)}</span>
                :   <span>{formatDuration(song.duration)}</span>}
            </div>

            <IconButton
                class="size-8"
                onClick={() => console.log("Open Drawer")}
                icon={faEllipsis}
            />
        </div>
    );
};
export default PlaylistEntry;

// const openLibraryDrawer = useCallback(() => {
//     openDrawer([
//         {
//             icon: faPlay,
//             text: "Play",
//             callback: () => console.log("On Play"),
//         },
//         {
//             icon: faPlayCircle,
//             text: "Play Next",
//             callback: () => console.log("On Play Next"),
//         },
//         {
//             icon: faPen,
//             text: "Edit Metadata",
//             callback: () => console.log("On Edit Metadata"),
//         },
//         {
//             icon: faSliders,
//             text: "Add Transistions",
//             callback: () => console.log("On Add Transitions"),
//         },
//         {
//             icon: faList,
//             text: "Add To Playlist",
//             callback: () => console.log("On Add Transitions"),
//         },
//         {
//             icon: faSliders,
//             text: `Delete "${song.title}"`,
//             callback: () => console.log("On Add Transitions"),
//         },
//     ]);
// }, [openDrawer]);
