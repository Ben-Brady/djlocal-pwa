import { createBasicContext } from "@/lib/context";

import { SongMetadata } from "@/lib/songs";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export type Playing = {
    song: SongMetadata;
    currentTime: number;
};

export type Controls = {
    play: () => void;
    pause: () => void;
    seekTo: (percent: number) => void;
};

export type PlayState = {
    playing: undefined | Playing;
    isPaused: boolean;
    controls: Controls;
};

export const [PlayContextProvder, usePlayContext] =
    createBasicContext<PlayState>("PlayContext", () => {
        const [isPaused, setIsPaused] = useState<boolean>(false);
        const audioRef = useRef<HTMLAudioElement>(null);

        const [playing, setPlaying] = useState<Playing | undefined>({
            currentTime: 0.2,
            song: {
                id: "a",
                duration: 263,
                mimetype: "audio/mpeg",
                title: "One More Hour",
                artist: "tame Impala",
            },
        });

        useEffect(() => {
            let interval = setInterval(() => {
                setPlaying((playing) => {
                    if (!playing || isPaused) return playing;

                    return {
                        ...playing,
                        currentTime: playing.currentTime + 0.5,
                    };
                });
            }, 50);
            return () => clearInterval(interval);
        }, [isPaused]);

        const play = useCallback(() => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.play();
            setIsPaused(false);
        }, []);

        const pause = useCallback(() => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.pause();
            setIsPaused(true);
        }, []);

        const seekTo = useCallback(
            (time: number) => {
                const audio = audioRef.current;
                if (!audio || !playing) return;

                audio.currentTime = time;
                setPlaying((playing) =>
                    playing ? { ...playing, currentTime: time } : undefined,
                );
            },
            [playing],
        );

        useEffect(() => {
            console.log(audioRef.current);
        }, [audioRef]);

        return {
            hook: {
                playing: playing,
                isPaused: isPaused,
                controls: { play, pause, seekTo },
            },
            children: <audio ref={audioRef} />,
        };
    });
