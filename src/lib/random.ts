export const randomHex = (length: number) =>
    Math.round(Math.random() * 2 ** (4 * length))
        .toString(16)
        .padStart(length, "0");
