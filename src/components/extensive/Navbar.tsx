import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFileAudio, faList, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "preact/compat";

const Navbar: FC = () => (
    <footer class="w-full border-t-2 border-t-background bg-tertiary flex-center">
        <nav class="contents">
            <NavbarIcon icon={faFileAudio} text="Library" href="/" />
            <NavbarIcon icon={faPlayCircle} text="Queue" href="/" />
            <NavbarIcon icon={faList} text="Playlists" href="/" />
        </nav>
    </footer>
);

const NavbarIcon: FC<{ href: string; icon: IconProp; text: string }> = ({ href, icon, text }) => (
    <a className="size-full flex-col items-center justify-end gap-1 py-1.5" href={href}>
        <div class="size-5">
            <FontAwesomeIcon icon={icon} className="text-primary" />
        </div>
        <span class="text-sm">{text}</span>
    </a>
);

export default Navbar;
