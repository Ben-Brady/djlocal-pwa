import { SongMetadata } from "@/lib/songs";
import { useEffect } from "preact/hooks";

export const useMediaSessionSong = (song: undefined | SongMetadata) => {
    useEffect(() => {
        if (!song) {
            navigator.mediaSession.metadata = null;
        } else {
            const { title, artist } = song;
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title,
                album: "",
                artist: artist ?? "Unknown Artist",
            });
        }
    }, [song]);
};

export const useMediaSessionPlaying = (isPlaying: boolean | undefined) => {
    useEffect(() => {
        if (isPlaying === undefined) navigator.mediaSession.playbackState = "none";
        if (isPlaying === false) navigator.mediaSession.playbackState = "paused";
        if (isPlaying === true) navigator.mediaSession.playbackState = "playing";
    }, [isPlaying]);
};

export const useMediaSessionPosition = (
    song: undefined | SongMetadata,
    currentTime: number | undefined,
) => {
    useEffect(() => {
        if (!song || currentTime === undefined) return;
        navigator.mediaSession.setPositionState({
            position: currentTime,
            duration: song.duration,
            playbackRate: 1,
        });
    }, [currentTime, song]);
};

export const useMediaActionHandler = (
    action: MediaSessionAction,
    handler: undefined | ((_: MediaSessionActionDetails) => void),
) => {
    useEffect(() => {
        if (!handler) return;
        navigator.mediaSession.setActionHandler(action, handler);
        return () => navigator.mediaSession.setActionHandler(action, null);
    }, [action, handler]);
};
