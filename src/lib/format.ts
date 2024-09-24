export const formatDuration = (duration: number) => {
    const hours = Math.round(duration / 60 / 60) % 60;
    const minutes = Math.round(duration / 60) % 60;
    const seconds = Math.round(duration) % 60;

    const padNum = (number: number) => number.toFixed().padStart(2, "0");

    if (hours > 0) return `${hours}:${padNum(minutes)}:${padNum(seconds)}`;
    return `${minutes}:${padNum(seconds)}`;
};
