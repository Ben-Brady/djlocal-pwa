import { FC } from "@/types/FC";
import { createSong } from "@/lib/songs";
import PlaylistEntry from "@/components/extensive/PlaylistEntry";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useFileUpload } from "@/hooks/useFileUpload";
import HeaderButton from "@/components/extensive/HeaderButton";
import { useMusicContext } from "@/context/MusicContext";
import { useLibrary } from "@/hooks/useLibrary";

const LibraryPage: FC = () => {
    const songs = useLibrary();
    const { UploadElement, uploadFiles } = useFileUpload();
    const { controls } = useMusicContext();

    const uploadSongs = async () => {
        const files = await uploadFiles({
            accept: "audio/*",
            multiple: true,
        });
        await Promise.all(files.map(createSong));
    };

    return (
        <div class="h-full flex-col gap-2 p-4 pb-0">
            <UploadElement />
            <div class="min-h-32 w-full flex-col justify-between p-4">
                <div class="flex items-center gap-1">
                    <span class="text-2xl font-bold">Library •</span>
                    <span>{songs.length} Songs</span>
                </div>

                <div class="flex-row gap-4">
                    <HeaderButton icon={faUpload} text="Upload" onClick={uploadSongs} />
                </div>
            </div>
            <div class="h-0.5 w-full bg-accent" />
            <div class="flex-col gap-2 overflow-auto">
                {songs.map((song) => (
                    <PlaylistEntry
                        song={song}
                        key={song.id}
                        onClick={() => {
                            controls.playSong(song);
                        }}
                    />
                ))}
                <div class="pb-24" />
            </div>
        </div>
    );
};

export default LibraryPage;
