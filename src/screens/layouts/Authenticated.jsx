import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Users from "../users";

const Authenticated = () => {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
};

export default Authenticated;
