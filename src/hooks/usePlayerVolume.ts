import { createExternalState } from "@/lib/state";

const loadVolume = () => {
    const value = parseFloat(localStorage.getItem("player-volume") ?? "1");

    if (!value || isNaN(value)) return 1;

    return value;
};

const [usePlayerVolume, properegateLibraryUpdate] = createExternalState(loadVolume);

const setPlayerVolume = (volume: number) => {
    localStorage.setItem("player-volume", volume.toFixed(3));
    properegateLibraryUpdate();
};

export { usePlayerVolume, setPlayerVolume };
