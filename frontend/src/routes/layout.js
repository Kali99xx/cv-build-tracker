import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-[100vh]">
      <Outlet />
    </div>
  );
};

export default Layout;
