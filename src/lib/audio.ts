export const getAudioDuration = async (data: Blob): Promise<number> => {
    const audio = new Audio(URL.createObjectURL(data));
    return new Promise(resolve => {
        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        };
    });
};
