import { FC } from "@/types/FC";
import { ReactElement } from "preact/compat";

const PageTemplate: FC<{ header: ReactElement; body: ReactElement }> = ({ header, body }) => {
    return (
        <div class="h-full flex-col gap-2 p-4 pb-0">
            <div class="min-h-32 w-full flex-col justify-between p-4">{header}</div>
            <div class="h-0.5 w-full bg-accent" />
            <div>
                {body}
                <div class="pb-24" />
            </div>
        </div>
    );
};

export default PageTemplate;
