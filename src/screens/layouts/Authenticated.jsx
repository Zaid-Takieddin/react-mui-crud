import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";

const Authenticated = () => {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
};

export default Authenticated;
