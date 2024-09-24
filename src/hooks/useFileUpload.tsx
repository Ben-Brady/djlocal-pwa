import { FC } from "preact/compat";
import { useCallback, useRef } from "preact/hooks";

type PromptFileUpload = (options: {
    accept?: string;
    multiple?: boolean;
}) => Promise<File[]>;

export const useFileUpload = (): {
    UploadElement: FC;
    uploadFiles: PromptFileUpload;
} => {
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFiles = useCallback<PromptFileUpload>(
        ({ accept = "", multiple }): Promise<File[]> => {
            const input = inputRef.current;
            if (!input)
                throw new Error("useFileUpload input Element not bound");

            input.accept = accept;
            input.multiple = !!multiple;

            input.click();
            return new Promise((resolve) => {
                input.onchange = () => resolve([...(input.files ?? [])]);
            });
        },
        [],
    );

    const UploadElement = useCallback(
        () => <input type="file" ref={inputRef} hidden />,
        [inputRef],
    );

    return {
        uploadFiles,
        UploadElement,
    };
};
