import { SongMetadata } from "./songs";

export const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60 / 60) % 60;
    const minutes = Math.floor(duration / 60) % 60;
    const seconds = Math.floor(duration) % 60;

    const padNum = (number: number) => number.toFixed().padStart(2, "0");

    if (hours > 0) return `${hours}:${padNum(minutes)}:${padNum(seconds)}`;
    return `${minutes}:${padNum(seconds)}`;
};

export const formatSongInfo = (song: SongMetadata) =>
    song.artist ?
        `${song.artist} • ${formatDuration(song.duration)}`
    :   formatDuration(song.duration);
