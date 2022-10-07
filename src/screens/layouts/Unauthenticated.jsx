import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const Unauthenticated = () => {
  return <Outlet />;
};

export default Unauthenticated;
