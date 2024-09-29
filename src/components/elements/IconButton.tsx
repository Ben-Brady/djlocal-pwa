import { FC } from "@/types/FC";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const IconButton: FC<{
    class: string;
    icon: IconProp;
    onClick?: () => void;
}> = ({ class: className, icon, onClick }) => (
    <div
        role="button"
        className={classNames("aspect-square", className)}
        onClick={(ev) => {
            ev.stopPropagation();
            onClick?.();
        }}
    >
        <FontAwesomeIcon icon={icon} />
    </div>
);

export default IconButton;
