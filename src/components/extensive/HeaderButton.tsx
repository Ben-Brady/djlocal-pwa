import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "preact/compat";

const HeaderButton: FC<{
    text: string;
    icon?: IconProp;
    onClick: () => void;
}> = ({ icon, text, onClick }) => {
    return (
        <div
            class="h-8 w-full max-w-80 flex-row gap-3 bg-secondary font-bold flex-center sm:max-w-64"
            role="button"
            onClick={onClick}
        >
            {text}
            {icon && (
                <div class="size-4 flex-center">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
        </div>
    );
};

export default HeaderButton;
