import { FC } from "@/types/FC";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton: FC<{
    class: string;
    icon: IconProp;
    onClick?: () => void;
}> = ({ class: className, icon, onClick }) => {
    return (
        <div role="button" className={className} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

export default IconButton;
