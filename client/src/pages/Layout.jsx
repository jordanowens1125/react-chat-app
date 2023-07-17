import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Layout = ({ theme, setTheme }) => {
  const changeTheme = () => {
    const element = document.getElementById("App");
    if (theme === "dark-mode") {
      element?.classList.remove("dark-mode");
      setTheme("light-mode");
      element?.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
    } else {
      element?.classList.remove("light-mode");
      setTheme("dark-mode");
      element?.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    }
  };

  return (
    <div className="flex-col full-w vh aic overflow-hidden border">
      {/* <nav >Layout</nav> */}
      <Outlet />
    </div>
  );
};

export default Layout;
