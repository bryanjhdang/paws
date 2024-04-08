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
import BasePage from "./pages/BasePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import { useEffect, useState } from "react";
import axios from "axios";
// import axios from 'axios';
// import { getTimeEntryTest } from "./classes/HTTPhelpers";

// const AuthContext = React.createContext( { })

export const App: React.FC = () => {

  const { isLoading, getAccessTokenSilently } = useAuth0();
  // const { isLoading } = useAuth0();
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('accessToken') || null;
  });


  // // creating an Axios instance
  // // const axiosInstance = axios.create({
  // //   baseURL: 'https://api.timbucktoo.com',
  // // });

  // // Setting the default headers
  
  // // axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';



  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        localStorage.setItem('accessToken', token);

        // if (accessToken) {
        //   console.log("Attaching token: ", accessToken);
        //   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        //   // axiosInstance.defaults.headers.common['Authorization'] = `Bearer YOUR_ACCESS_TOKEN`;
    
        //   // getTimeEntryTest(accessToken).then(
        //   // (response) => {
        //   //   console.log(response);
        //   // })
        // } else {
        //   console.error("NO ACCESS TOKEN\n"); 
        // }

      } catch (error) {
        console.error('Error while fetching access token:', error);
      }
    };

    fetchAccessToken();
    // console.log("got access token: ", accessToken);

    // if (accessToken) {
    //   console.log("Attaching token: ", accessToken);
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    //   // axiosInstance.defaults.headers.common['Authorization'] = `Bearer YOUR_ACCESS_TOKEN`;

    //   // getTimeEntryTest(accessToken).then(
    //   // (response) => {
    //   //   console.log(response);
    //   // })
    // } else {
    //   console.error("NO ACCESS TOKEN\n"); 
    // }


    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }, [getAccessTokenSilently, accessToken]);

  // set default headers for axios requests
  useEffect(() => {
    if (accessToken) {
      console.log("Attaching token: ", accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.error("NO ACCESS TOKEN\n");
      
    }
  }, [accessToken]);


  if (isLoading) {
    return (
      // TODO: dark mode issue?
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
      <Route
        path="/settings"
        element={<AuthenticationGuard 
          component={() => (
            <BasePage pageName="Settings"><SettingsPage /></BasePage>
          )}
        />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
