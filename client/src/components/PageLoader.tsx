import { Loader } from "@mantine/core";
import React from "react";
import classes from "./PageLoader.module.css";

export const PageLoader: React.FC = () => {
  // const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    // <div className="loader">
    //   <img src={loadingImg} alt="Loading..." />
    // </div>
    <Loader className={classes.loader} color="gray" size="lg" />
  );
};
