import { randomHex } from "./random";
import { z } from "zod";
import { SongMetadata } from "./songs";

export const Playlist = z.object({
    id: z.string(),
    title: z.string(),
    icon: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    songs: z.string().array(),
});

export type Playlist = z.infer<typeof Playlist>;

const getPlaylists = (): Playlist[] => {
    const json = localStorage.getItem("playlists") ?? "[]";
    const data = JSON.parse(json);
    return Playlist.array().parse(data);
};

const setPlaylists = (playlists: Playlist[]) => {
    Playlist.array().parse(playlists);
    const data = JSON.stringify(playlists);
    localStorage.setItem("playlists", data);
};

export const createPlaylist = ({ title }: { title: string }) => {
    const id = randomHex(8);
    const icon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpVoqDnYQUchQnSyIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi7OCk6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyoGXtGLEQQhIigxU0+kFzPwHF/38PH1LsqzvM/9OfqUvMkAn0g8x3TDIt4gntm0dM77xGFWkhTic+Jxgy5I/Mh12eU3zkWHBZ4ZNjKpeeIwsVjsYLmDWclQiaeJI4qqUb6QdVnhvMVZrdRY6578haG8tpLmOs1hxLGEBJLUkYwayqjAQpRWjRQTKdqPefiHHH+SXDK5ymDkWEAVKiTHD/4Hv7s1C1OTblIoBnS/2PbHKBDYBZp12/4+tu3mCeB/Bq60tr/aAGY/Sa+3tcgR0L8NXFy3NXkPuNwBBp90yZAcyU9TKBSA9zP6phwwcAsE19zeWvs4fQAy1NXyDXBwCIwVKXvd4909nb39e6bV3w91nHKolfw1kQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+gJHQoiCD1elbgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFklEQVQI12P43XhHzISf4f8XTob07wAsHAYMpKIDEgAAAABJRU5ErkJggg==";

    const playlists = getPlaylists();
    playlists.push({
        id,
        created_at: new Date(),
        updated_at: new Date(),
        title: title,
        songs: [],
        icon,
    });
    setPlaylists(playlists);
};

export const addSongToPlaylist = (id: string, song: SongMetadata) => {
    const playlists = getPlaylists();

    const playlist = playlists.find((playlist) => playlist.id === id);
    if (!playlist) throw new Error("Playlist not found");
    playlist.songs.push(song.id);

    setPlaylists(playlists);
};

export const getPlaylist = (id: string): Playlist | undefined => {
    const playlists = getPlaylists();
    return playlists.find((playlist) => playlist.id === id);
};

export const listPlaylists = (): Playlist[] => {
    return getPlaylists();
};
