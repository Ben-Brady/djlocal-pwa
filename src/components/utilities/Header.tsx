import { FC } from "@/types/FC";
import classNames from "classnames";

const Header: FC<{ class?: string }> = ({ children, class: className }) => {
    return (
        <div>
            <div class={classNames("size-full min-h-32 p-4", className)}>{children}</div>
            <div class="h-0.5 w-full bg-accent" />
        </div>
    );
};

export default Header;
