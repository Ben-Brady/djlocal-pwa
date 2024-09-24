const streamToBuffer = async (
    stream: ReadableStream<Uint8Array>,
): Promise<ArrayBuffer> => {
    return await new Response(stream).arrayBuffer();
};

export const compress = async (data: Blob): Promise<Blob> => {
    const gzip = new CompressionStream("gzip");
    const compressedStream = data.stream().pipeThrough(gzip);
    const compressedData = await streamToBuffer(compressedStream);
    return new Blob([compressedData]);
};

export const decompress = async (blob: Blob): Promise<Blob> => {
    const gzip = new DecompressionStream("gzip");
    const stream = blob.stream().pipeThrough(gzip);
    const compressedData = await streamToBuffer(stream);
    return new Blob([compressedData]);
};
