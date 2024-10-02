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
                artwork: [
                    { src: "https://dummyimage.com/96x96", sizes: "96x96", type: "image/png" },
                    { src: "https://dummyimage.com/128x128", sizes: "128x128", type: "image/png" },
                    { src: "https://dummyimage.com/192x192", sizes: "192x192", type: "image/png" },
                    { src: "https://dummyimage.com/256x256", sizes: "256x256", type: "image/png" },
                    { src: "https://dummyimage.com/384x384", sizes: "384x384", type: "image/png" },
                    { src: "https://dummyimage.com/512x512", sizes: "512x512", type: "image/png" },
                ],
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
