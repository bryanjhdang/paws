// import { useState } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/Landing";
import TimerPage from "./pages/Timer/Timer";
import PetPage from "./pages/Pet/Pet";
import StatisticsPage from "./pages/Statistics/Statistics";
import FriendsPage from "./pages/Friends/Friends";
import ProfilePage from "./pages/Profile/Profile";
import SettingsPage from "./pages/Settings/Settings";
import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader";
import { AuthenticationGuard } from "./components/AuthenticationGuard";

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return (
  //     // TODO: style
  //     <div>
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <MantineProvider>
      <Router>
        <Auth0ProviderWithNavigate>
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
          </Routes>
        </Auth0ProviderWithNavigate>
      </Router>
    </MantineProvider>
  );
};
