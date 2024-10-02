import { useEvent } from "@/hooks/useEvent";
import {
    useMediaSessionSong,
    useMediaActionHandler,
    useMediaSessionPosition,
    useMediaSessionPlaying,
} from "@/hooks/useMediaSession";
import { setPlayerVolume, usePlayerVolume } from "@/hooks/usePlayerVolume";
import { createBasicContext } from "@/lib/context";

import { loadSongData, SongMetadata, loadSongs } from "@/lib/songs";
import { clamp, shuffle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
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

    moveSongPosition: (source: number, destination: number) => void;
    stop: () => void;
    previousTrack: () => void;
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
    const currentSong = useMemo(() => queue[0] as SongMetadata | undefined, [queue]);

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

    useEffect(() => {
        (async () => {
            if (!currentSong) return;
            const data = await loadSongData(currentSong.id);
            if (!data) throw new Error("IDFK");

            const audio = getAudio();
            audio.src = URL.createObjectURL(data);
            if (isPlaying) audio.play();
        })();
    }, [isPlaying, currentSong]);

    useEvent(audioRef.current, "pause", () => setIsPlaying(false));
    useEvent(audioRef.current, "play", () => setIsPlaying(true));
    useEvent(audioRef.current, "timeupdate", ({ element }) => {
        setRawCurrentTime(element.currentTime);
        setIsPlaying(!element.paused);
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

    const seekTo = useCallback((time: number) => {
        const audio = getAudio();
        audio.currentTime = time;
    }, []);

    const mute = useCallback(() => {
        const audio = getAudio();
        audio.muted = true;
    }, []);

    const unmute = useCallback(() => {
        const audio = getAudio();
        audio.muted = false;
    }, []);

    const playSong = useCallback(async (song: SongMetadata) => {
        setQueue(queue => [song, ...queue]);
        setIsPlaying(true);
    }, []);

    const stop = useCallback(async () => {
        setQueue([]);
        setRawCurrentTime(undefined);
    }, []);

    const nextTrack = useCallback(async () => {
        setQueue(queue => queue.slice(1));
    }, []);

    const moveSongPosition = useCallback(
        (source: number, destination: number) => {
            const items = [...queue];
            const [reorderedItem] = items.splice(source, 1);
            items.splice(destination, 0, reorderedItem);
            setQueue(items);
        },
        [queue],
    );

    const previousTrack = useCallback(async () => {}, []);

    const playNext = useCallback((song: SongMetadata) => setQueue(queue => [song, ...queue]), []);
    const addToQueue = useCallback((song: SongMetadata) => setQueue(queue => [...queue, song]), []);

    useMediaSessionSong(currentSong);
    useMediaSessionPlaying(isPlaying);
    useMediaSessionPosition(currentSong, currentTime);

    useMediaActionHandler("play", play);
    useMediaActionHandler("pause", pause);
    useMediaActionHandler("nexttrack", nextTrack);
    useMediaActionHandler("previoustrack", previousTrack);
    useMediaActionHandler("stop", stop);
    useMediaActionHandler("seekto", ({ seekTime }) => seekTo(seekTime!));
    useMediaActionHandler("seekforward", ({ seekOffset }) => {
        const audio = getAudio();
        const targetTime = clamp(audio.currentTime + seekOffset!, 0, audio.duration);
        seekTo(targetTime);
    });
    useMediaActionHandler("seekbackward", ({ seekOffset }) => {
        const audio = getAudio();
        const targetTime = clamp(audio.currentTime + seekOffset!, 0, audio.duration);
        seekTo(targetTime);
    });

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
                stop,
                seekTo,
                previousTrack,
                nextTrack,
                moveSongPosition,

                playSong,
                playNext,
                addToQueue,

                mute,
                unmute,
                setVolume: setPlayerVolume,
            },
        } satisfies PlayState,
        children: <audio ref={audioRef} />,
    };
});
