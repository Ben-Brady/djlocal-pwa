import { useEvent } from "@/hooks/useEvent";
import {
    useMediaSessionSong,
    useMediaActionHandler,
    useMediaSessionPosition,
    useMediaSessionPlaying,
} from "@/hooks/useMediaSession";
import { setPlayerVolume, usePlayerVolume } from "@/hooks/usePlayerVolume";
import { createBasicContext } from "@/lib/context";

import { loadSongData, SongMetadata } from "@/lib/songs";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useDebounce } from "use-debounce";

export type Playing = {
    song: SongMetadata;
    currentTime: number;
};

export type Controls = {
    playSong: (song: SongMetadata) => void;
    playNext: (song: SongMetadata) => void;
    addToQueue: (song: SongMetadata) => void;

    setVolume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;

    stop: () => void;
    nextTrack: () => void;
    play: () => void;
    pause: () => void;
    seekTo: (percent: number) => void;
};

export type PlayState = {
    queue: SongMetadata[];
    playing: Playing | undefined;
    isPaused: boolean;
    isMuted: boolean;
    volume: number;
    controls: Controls;
};

export const [MusicProvder, useMusicContext] = createBasicContext<PlayState>("MusicContext", () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [queue, setQueue] = useState<SongMetadata[]>(() => []);
    const [rawCurrentTime, setRawCurrentTime] = useState<number | undefined>();
    const [currentTime] = useDebounce(rawCurrentTime, 50, {
        leading: true,
    });
    const [currentSong, setCurrentSong] = useState<SongMetadata | undefined>();
    const audioRef = useRef<HTMLAudioElement>(null);

    const getAudio = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) throw new Error("Audio not yet defined");
        return audio;
    }, []);

    const volume = usePlayerVolume();
    useEffect(() => {
        const audio = getAudio();
        audio.volume = volume;
    }, [volume]);

    useEvent(audioRef.current, "pause", () => setIsPlaying(false));
    useEvent(audioRef.current, "play", () => setIsPlaying(true));
    useEvent(audioRef.current, "timeupdate", ({ element }) => {
        setRawCurrentTime(element.currentTime);
        setIsPlaying(true);
        setIsMuted(element.muted);
    });

    useEvent(audioRef.current, "ended", () => setIsPlaying(false));
    useEvent(audioRef.current, "ended", () =>
        setQueue(queue => {
            if (queue.length === 0) return [];
            const [nextSong, ...remainingQueue] = queue;

            playSong(nextSong);
            return remainingQueue;
        }),
    );

    const play = useCallback(() => {
        const audio = getAudio();
        audio.play();
    }, []);

    const pause = useCallback(() => {
        const audio = getAudio();
        audio.pause();
    }, []);

    const seekTo = useCallback(
        (time: number) => {
            const audio = getAudio();
            audio.currentTime = time;
        },
        [isPlaying],
    );

    const mute = useCallback(() => {
        const audio = getAudio();
        audio.muted = true;
    }, []);

    const unmute = useCallback(() => {
        const audio = getAudio();
        audio.muted = false;
    }, []);

    const playSong = useCallback(
        async (song: SongMetadata) => {
            setCurrentSong(song);
            const data = await loadSongData(song.id);
            if (!data) throw new Error("IDFK");

            const audio = getAudio();
            audio.src = URL.createObjectURL(data);
            audio.play();
            setIsPlaying(true);
        },
        [isPlaying],
    );

    const stop = useCallback(async () => {
        setQueue([]);
        setCurrentSong(undefined);
        setRawCurrentTime(undefined);
    }, []);

    const nextTrack = useCallback(async () => {
        setQueue(queue => queue.slice(1));
    }, []);

    const playNext = useCallback((song: SongMetadata) => setQueue(queue => [song, ...queue]), []);
    const addToQueue = useCallback((song: SongMetadata) => setQueue(queue => [...queue, song]), []);

    useMediaSessionSong(currentSong);
    useMediaSessionPlaying(isPlaying);
    useMediaSessionPosition(currentSong, currentTime);

    useMediaActionHandler("play", play);
    useMediaActionHandler("pause", pause);
    useMediaActionHandler("nexttrack", nextTrack);
    useMediaActionHandler("stop", stop);
    useMediaActionHandler("seekto", ({ seekTime }) => seekTo(seekTime!));

    return {
        hook: {
            playing:
                currentSong ?
                    {
                        song: currentSong,
                        currentTime: currentTime ?? 0,
                    }
                :   undefined,
            queue,
            isPaused: !isPlaying,
            volume,
            isMuted,
            controls: {
                play,
                pause,
                nextTrack,
                stop,
                seekTo,
                playNext,
                addToQueue,
                playSong,
                mute,
                unmute,
                setVolume: setPlayerVolume,
            },
        } satisfies PlayState,
        children: <audio ref={audioRef} />,
    };
});
