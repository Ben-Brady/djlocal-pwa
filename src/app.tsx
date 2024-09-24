import { lazy, LocationProvider, Router, Route } from "preact-iso";
import "@/styles/index.css";
import "@/styles/theme.css";
import "@fontsource/inria-sans/300.css";
import "@fontsource/inria-sans/400.css";
import "@fontsource/inria-sans/700.css";
import Layout from "./components/utilities/Layout";
import { PlayContextProvder } from "./context/playContext";

const LibraryPage = lazy(() => import("@/routes/index"));
const SongPage = lazy(() => import("@/routes/song/index"));

const App = () => (
    <LocationProvider>
        <PlayContextProvder>
            <Layout>
                <Router>
                    <Route path="/" default component={LibraryPage} />
                    <Route path="/song/:id" default component={SongPage} />
                </Router>
            </Layout>
        </PlayContextProvder>
    </LocationProvider>
);

export default App;
