import "./App.css";
import "@mantine/core/styles.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./non-app-pages/Landing/LandingPage";
import TimerPage from "./pages/Timer/TimerPage";
import StorePage from "./pages/Store/StorePage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/PageLoader";
import { AuthenticationGuard } from "./utils/Auth0/AuthenticationGuard";
import { CallbackPage } from "./non-app-pages/Callback/CallbackPage";
import { NotFoundPage } from "./non-app-pages/NotFound/NotFoundPage";
import BasePage from "./pages/BasePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import '@mantine/notifications/styles.css';

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
        element={<AuthenticationGuard 
          component={() => (
            <BasePage pageName="Timer"><TimerPage /></BasePage>
          )}
        />}
      />
      <Route
        path="/store"
        element={<AuthenticationGuard
          component={() => (
            <BasePage pageName="Store"><StorePage /></BasePage>
          )}
        />}
      />
      <Route
        path="/statistics"
        element={<AuthenticationGuard 
          component={() => (
            <BasePage pageName="Stats"><StatisticsPage /></BasePage>
          )}
        />}
      />
      <Route
        path="/projects"
        element={<AuthenticationGuard 
          component={() => (
            <BasePage pageName="Projects"><ProjectsPage /></BasePage>
          )}
        />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
