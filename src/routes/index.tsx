import { FC } from "@/types/FC";
import { createSong } from "@/lib/songs";
import SongEntry from "@/components/extensive/SongEntry";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useFileUpload } from "@/hooks/useFileUpload";
import HeaderButton from "@/components/elements/HeaderButton";
import { useMusicContext } from "@/context/MusicContext";
import { useLibrary } from "@/hooks/useLibrary";
import Header from "@/components/utilities/Header";

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
        <div>
            <Header class="flex-col justify-between">
                <UploadElement />
                <div class="flex items-center gap-1">
                    <span class="text-heading-2">Library •</span>
                    <span class="text-heading-3">{songs.length} Songs</span>
                </div>

                <div class="flex-row gap-4">
                    <HeaderButton icon={faUpload} text="Upload" onClick={uploadSongs} />
                </div>
            </Header>
            <div class="flex-col gap-2 overflow-auto">
                {songs.map(song => (
                    <SongEntry
                        type="song"
                        song={song}
                        onClick={() => {
                            controls.playSong(song);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LibraryPage;
