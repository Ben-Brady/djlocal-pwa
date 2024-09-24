import { z } from "zod";
import { compress, decompress } from "./compress";

const SongMetadata = z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string().optional(),
    duration: z.number(),
    mimetype: z.string(),
});

export type SongMetadata = z.infer<typeof SongMetadata>;

export const listSongs = (): SongMetadata[] => {
    const text = localStorage.getItem("songs") ?? "[]";
    const schema = SongMetadata.array();
    const songs = schema.parse(JSON.parse(text));
    return songs;
};

export const getSong = (id: string): SongMetadata | undefined => {
    const songs = listSongs();
    return songs.find((song) => song.id === id);
};

const setSongs = (songs: SongMetadata[]) => {
    localStorage.setItem("songs", JSON.stringify(songs));
};

export const loadSongData = async (id: string): Promise<Blob | null> => {
    const root = await navigator.storage.getDirectory();

    const fileHandle = await (async () => {
        try {
            return await root.getFileHandle(id);
        } catch (err: unknown) {
            return null;
        }
    })();
    if (!fileHandle) return null;

    const file = await fileHandle.getFile();
    const blob = new Blob([file]);
    return await decompress(blob);
};

const randomHex = (length: number) =>
    Math.round(Math.random() * 2 ** (4 * length))
        .toString(16)
        .padStart(length, "0");

export const createSong = async (file: File): Promise<SongMetadata> => {
    const data = new Blob([file]);

    const id = randomHex(8);
    const title = file.name.split(".")[0];
    const mimetype = file.type;
    const duration = await getDuration(data);
    const song = { id, title, mimetype, duration } satisfies SongMetadata;
    console.log(song);

    await saveSong(song, data);
    return song;
};

const getDuration = async (data: Blob): Promise<number> => {
    const audio = new Audio(URL.createObjectURL(data));
    return new Promise((resolve) => {
        audio.onloadedmetadata = () => {
            console.log(audio.duration);
            resolve(audio.duration);
        };
    });
};

export const editSongTitle = async (id: string, newTitle: string) => {
    const songs = listSongs();
    let song = songs.find((song) => song.id === id);
    if (song) song.title = newTitle;

    setSongs(songs);
};

export const saveSong = async (
    song: SongMetadata,
    data: Blob,
): Promise<void> => {
    const compressedData = await compress(data);
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(song.id, { create: true });
    const fileWriter = await fileHandle.createWritable();
    await fileWriter.write(compressedData);
    await fileWriter.close();

    let songs = listSongs();
    songs = [...songs, song];
    setSongs(songs);
};

export const deleteSong = async (id: string): Promise<void> => {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(id);

    let songs = await listSongs();
    songs = songs.filter((song) => song.id !== id);
    setSongs(songs);
};
