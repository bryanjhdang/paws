import "./App.css";
import "@mantine/core/styles.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import TimerPage from "./pages/Timer/TimerPage";
import PetPage from "./pages/Pet/PetPage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import FriendsPage from "./pages/Friends/FriendsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import SettingsPage from "./pages/Settings/SettingsPage";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader/PageLoader";
import { AuthenticationGuard } from "./utils/Auth0/AuthenticationGuard";
import { CallbackPage } from "./pages/Callback/CallbackPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

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
        path="/pet"
        element={<AuthenticationGuard component={PetPage} />}
      />
      <Route
        path="/statistics"
        element={<AuthenticationGuard component={StatisticsPage} />}
      />
      <Route
        path="/friends"
        element={<AuthenticationGuard component={FriendsPage} />}
      />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
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
