import { createExternalState } from "@/lib/state";
import { clamp } from "lodash";

const loadVolume = () => {
    const value = parseFloat(localStorage.getItem("player-volume") ?? "1");

    if (!value || isNaN(value)) return 1;

    return value;
};

const [usePlayerVolume, properegateLibraryUpdate] = createExternalState(loadVolume);

const setPlayerVolume = (volume: number) => {
    volume = clamp(volume, 0, 1);
    localStorage.setItem("player-volume", volume.toFixed(3));
    properegateLibraryUpdate();
};

export { usePlayerVolume, setPlayerVolume };
