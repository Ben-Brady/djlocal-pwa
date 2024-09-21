import {
    lazy,
    LocationProvider,
    ErrorBoundary,
    Router,
    Route,
} from "preact-iso";
import "@/styles/index.css";
import "@/styles/theme.css";
import "@fontsource/noto-sans";

const Home = lazy(() => import("@/routes/index"));

const App = () => (
    <LocationProvider>
        <ErrorBoundary
            onError={(error) => {
                console.error(error);
                location.href = "/";
            }}
        >
            <Router>
                <Route path="/" default component={Home} />
            </Router>
        </ErrorBoundary>
    </LocationProvider>
);

export default App;
