import { useEvent } from "@/hooks/useEvent";
import { createBasicContext } from "@/lib/context";

import { loadSongData, SongMetadata } from "@/lib/songs";
import { clamp } from "lodash";
import { useCallback, useRef, useState } from "preact/hooks";
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
    const [volume, setVolume] = useState<number>(1);
    const [rawCurrentTime, setRawCurrentTime] = useState<number | undefined>();
    const [currentTime] = useDebounce(rawCurrentTime, 50, {
        leading: true,
    });
    const [currentSong, setCurrentSong] = useState<SongMetadata | undefined>();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEvent(audioRef.current, "pause", () => setIsPlaying(false));
    useEvent(audioRef.current, "play", () => setIsPlaying(true));
    useEvent(audioRef.current, "timeupdate", ({ element }) => {
        setRawCurrentTime(element.currentTime);
        setIsPlaying(true);
        setIsMuted(element.muted);
        setVolume(element.volume);
    });

    useEvent(audioRef.current, "ended", () => setIsPlaying(false));
    useEvent(audioRef.current, "ended", () =>
        setQueue((queue) => {
            if (queue.length === 0) return [];
            const [nextSong, ...remainingQueue] = queue;

            playSong(nextSong);
            return remainingQueue;
        }),
    );

    const play = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.play();
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const seekTo = useCallback(
        (time: number) => {
            if (!audioRef.current) return;
            audioRef.current.currentTime = time;
        },
        [isPlaying],
    );

    const mute = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.muted = true;
    }, []);

    const unmute = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.muted = false;
    }, []);

    const playSong = useCallback(
        async (song: SongMetadata) => {
            const audio = audioRef.current;
            if (!audio) throw new Error("IDFK");

            setCurrentSong(song);
            const data = await loadSongData(song.id);
            if (!data) throw new Error("IDFK");

            const url = URL.createObjectURL(data);
            audio.src = url;
            audio.play();
            setIsPlaying(true);
        },
        [isPlaying],
    );

    const playNext = useCallback((song: SongMetadata) => setQueue((queue) => [song, ...queue]), []);
    const addToQueue = useCallback(
        (song: SongMetadata) => setQueue((queue) => [...queue, song]),
        [],
    );

    const updateVolume = useCallback((volume: number) => {
        if (!audioRef.current) throw new Error("IDFK");
        volume = clamp(volume, 0, 1);
        audioRef.current.volume = volume;
        setVolume(volume);
    }, []);

    return {
        hook: {
            playing:
                currentTime && currentSong ?
                    {
                        currentTime: currentTime,
                        song: currentSong,
                    }
                :   undefined,
            queue,
            isPaused: !isPlaying,
            volume,
            isMuted,
            controls: {
                play,
                pause,
                seekTo,
                playNext,
                addToQueue,
                playSong,
                mute,
                unmute,
                setVolume: updateVolume,
            },
        } satisfies PlayState,
        children: <audio ref={audioRef} />,
    };
});
