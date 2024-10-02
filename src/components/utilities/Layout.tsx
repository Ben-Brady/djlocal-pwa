import { FC } from "preact/compat";
import MinimizedPlayer from "../extensive/MinimizedPlayer";
import Navbar from "../extensive/Navbar";
import { useRoute } from "preact-iso";

const Layout: FC = ({ children }) => {
    const { path } = useRoute();
    return (
        <div class="grid h-screen grid-rows-[1fr,64px] overflow-hidden">
            <div className="relative h-[calc(100dvh-64px)]">
                {children}
                {path !== "/queue" && <MinimizedPlayer />}
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;
