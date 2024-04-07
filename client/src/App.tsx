import "./App.css";
import "@mantine/core/styles.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./non-app-pages/Landing/LandingPage";
import TimerPage from "./pages/Timer/TimerPage";
import StorePage from "./pages/Store/StorePage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader";
import { AuthenticationGuard } from "./utils/Auth0/AuthenticationGuard";
import { CallbackPage } from "./non-app-pages/Callback/CallbackPage";
import { NotFoundPage } from "./non-app-pages/NotFound/NotFoundPage";

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      // TODO: style to fix scaling issue
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/timer"
        element={<AuthenticationGuard component={TimerPage} />}
      />
      <Route
        path="/store"
        element={<AuthenticationGuard component={StorePage} />}
      />
      <Route
        path="/statistics"
        element={<AuthenticationGuard component={StatisticsPage} />}
      />
      <Route
        path="/settings"
        element={<AuthenticationGuard component={SettingsPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
