import { FC } from "preact/compat";
import MinimizedPlayer from "../extensive/MinimizedPlayer";
import Navbar from "../extensive/Navbar";

const Layout: FC = ({ children }) => {
    return (
        <div class="grid h-screen grid-rows-[1fr,64px] overflow-hidden">
            <div className="relative h-[calc(100dvh-64px)]">
                {children}
                <MinimizedPlayer />
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;
