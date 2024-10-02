import { lazy, LocationProvider, Router, Route } from "preact-iso";
import "@/styles/index.css";
import "@fontsource/inria-sans/300.css";
import "@fontsource/inria-sans/400.css";
import "@fontsource/inria-sans/700.css";
import Layout from "./components/utilities/Layout";
import { MusicProvder } from "./context/MusicContext";
import { DrawerProvider } from "./context/DrawerContext";

const LibraryPage = lazy(() => import("@/routes/index"));
const QueuePage = lazy(() => import("@/routes/queue"));
const SongPage = lazy(() => import("@/routes/song/index"));

const App = () => (
    <LocationProvider>
        <MusicProvder>
            <DrawerProvider>
                <Layout>
                    <Router>
                        <Route path="/" default component={LibraryPage} />
                        <Route path="/queue" default component={QueuePage} />
                        <Route path="/song/:id" default component={SongPage} />
                    </Router>
                </Layout>
            </DrawerProvider>
        </MusicProvder>
    </LocationProvider>
);

export default App;
