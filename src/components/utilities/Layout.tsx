import { FC } from "preact/compat";
import MinimizedPlayer from "@/components/extensive/MinimizedPlayer";
import Navbar from "@/components/extensive/Navbar";
import { useLocation } from "preact-iso";
const Layout: FC = ({ children }) => {
    const { path } = useLocation();

    return (
        <div class="grid h-screen grid-rows-[1fr,64px] overflow-hidden">
            <div className="relative h-[calc(100dvh-64px)] overflow-hidden">
                {children}
                {path !== "/queue" && <MinimizedPlayer />}
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;
