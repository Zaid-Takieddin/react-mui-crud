import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Authenticated = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
};

export default Authenticated;
