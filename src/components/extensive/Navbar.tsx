import { useDownloadPrompt } from "@/hooks/useDownloadPrompt";
import { useUpdatePrompt } from "@/hooks/useUpdatePrompt";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowsRotate,
    faDownload,
    faFileAudio,
    faList,
    faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "preact/compat";

const Navbar: FC = () => {
    const updatePrompt = useUpdatePrompt();
    const downloadPrompt = useDownloadPrompt();
    return (
        <footer class="w-full border-t-2 border-t-background bg-tertiary flex-center">
            <nav class="contents">
                <NavbarIcon icon={faFileAudio} text="Library" href="/" />
                <NavbarIcon icon={faPlayCircle} text="Queue" href="/" />
                <NavbarIcon icon={faList} text="Playlists" href="/" />
                {downloadPrompt ?
                    <NavbarIcon icon={faDownload} text="Install" callback={downloadPrompt} />
                : updatePrompt ?
                    <NavbarIcon icon={faArrowsRotate} text="Update" callback={updatePrompt} />
                :   null}
            </nav>
        </footer>
    );
};

const NavbarIcon: FC<{ icon: IconProp; text: string; href?: string; callback?: () => void }> = ({
    href,
    icon,
    text,
    callback,
}) => (
    <a
        className="size-full flex-col items-center justify-end gap-1 py-1.5"
        href={href}
        onClick={ev => {
            if (!callback) return;
            ev.preventDefault();
            callback();
        }}
    >
        <div class="size-5">
            <FontAwesomeIcon icon={icon} className="text-primary" />
        </div>
        <span class="text-sm">{text}</span>
    </a>
);

export default Navbar;
