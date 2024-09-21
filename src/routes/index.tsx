import { FC } from "@/types/FC";
import Logo from "@/assets/images/logo.svg";
import Metadata from "@/components/utilities/Metadata";

const Home: FC = () => {
    return (
        <>
            <Metadata />
            <section class="flex-col items-center gap-16">
                <img
                    class="h-40"
                    src={Logo}
                    alt="Logo"
                    width="160"
                    height="160"
                />
                Welcome to your Vite PWA
            </section>
        </>
    );
};

export default Home;
