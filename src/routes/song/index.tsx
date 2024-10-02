import { FC } from "@/types/FC";
import { getSong, loadSongData } from "@/lib/songs";
import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import WaveSurfer from "@/components/extensive/WaveSurfer";

const SongPage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
    const song = getSong(id);
    const { route } = useLocation();
    const [data, setData] = useState<Blob | undefined>();

    useEffect(() => {
        (async () => {
            const data = await loadSongData(id);
            if (!data) return;

            setData(data);
        })();
    }, [id]);

    if (!song) {
        route("/");
        return <div />;
    }

    return (
        <main class="flex-col items-center gap-16">
            <h1>{song.title}</h1>

            <div className="h-16 w-full flex-row px-16">{data && <WaveSurfer data={data} />}</div>
        </main>
    );
};

export default SongPage;
