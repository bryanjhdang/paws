import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
// import { NavBar } from "../components/navigation/desktop/nav-bar";
// import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";
// import { PageLayout } from "../components/page-layout";

export const CallbackPage: React.FC = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      // <PageLayout>
        <div>
          <h1>
            Error
          </h1>
          <div>
            <p>
              <span>{error.message}</span>
            </p>
          </div>
        </div>
      // </PageLayout>
    );
  }

  return (
    <div>
      {/* <NavBar />
      <MobileNavBar /> */}
      {/* <div className="page-layout__content" /> */}

      Hello World
      <div />
    </div>
  );
};
