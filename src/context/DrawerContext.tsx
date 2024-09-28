import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useCallback, useState } from "preact/compat";
import { createBasicContext } from "@/lib/context";
import classNames from "classnames";
import { SongMetadata } from "@/lib/songs";
import { useMusicContext } from "./MusicContext";
import {
    faList,
    faPen,
    faPlay,
    faPlayCircle,
    faSliders,
} from "@fortawesome/free-solid-svg-icons";

type DrawerOption = {
    text: string;
    icon: IconProp;
    callback: () => void;
};

type DrawerHook = {
    openSongDrawer: (song: SongMetadata) => void;
};

export const [DrawerProvider, useDrawer] = createBasicContext<DrawerHook>(
    "DrawerContext",
    () => {
        const [options, setOptions] = useState<DrawerOption[]>([]);
        const [open, setOpen] = useState(false);
        const openDrawer = useCallback((options: DrawerOption[]) => {
            setOptions(options);
            setOpen(true);
        }, []);
        const { controls } = useMusicContext();

        const openSongDrawer = useCallback(
            (song: SongMetadata) => {
                openDrawer([
                    {
                        icon: faPlay,
                        text: "Play",
                        callback: () => controls.playSong(song),
                    },
                    {
                        icon: faPlayCircle,
                        text: "Play Next",
                        callback: () => controls.playNext(song),
                    },
                    {
                        icon: faPlayCircle,
                        text: "Add to Queue",
                        callback: () => controls.addToQueue(song),
                    },
                    {
                        icon: faPen,
                        text: "Edit Metadata",
                        callback: () => console.log("On Edit Metadata"),
                    },
                    {
                        icon: faSliders,
                        text: "Add Transistions",
                        callback: () => console.log("On Add Transitions"),
                    },
                    {
                        icon: faList,
                        text: "Add To Playlist",
                        callback: () => console.log("On Add Transitions"),
                    },
                    {
                        icon: faSliders,
                        text: `Delete "${song.title}"`,
                        callback: () => console.log("On Add Transitions"),
                    },
                ]);
            },
            [openDrawer, controls],
        );

        return {
            hook: { openSongDrawer },
            children: (
                <div
                    class={classNames(
                        "absolute inset-0 bg-black/70 transition-all size-screen",
                        { hidden: !open },
                    )}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <Drawer
                        open={open}
                        onClose={() => setOpen(false)}
                        options={options}
                    />
                </div>
            ),
        };
    },
);

const Drawer: FC<{
    options: DrawerOption[];
    open: boolean;
    onClose: () => void;
}> = ({ options, open, onClose }) => {
    if (!open) return null;
    return (
        <div class="absolute bottom-0 left-0 h-fit w-full flex-col bg-tertiary">
            {options.map(({ callback, icon, text }) => (
                <div
                    class="flex cursor-pointer gap-6 p-4"
                    role="button"
                    onClick={(ev) => {
                        ev.preventDefault();
                        callback();
                        onClose();
                    }}
                >
                    <div class="size-6">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <span class="capitalize">{text}</span>
                </div>
            ))}
        </div>
    );
};
