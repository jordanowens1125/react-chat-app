import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLogOut } from "../hooks/useLogOut";
import useAuthContext from "../hooks/useAuthContext";

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

  const { signOut } = useLogOut();
  const { user } = useAuthContext();

  return (
    <div className="flex-col full-w vh overflow-hidden p-top-nav relative">
      <nav>
        Layout
        {user && <img src={user?.photoURL} alt={user?.name} />}
        <button onClick={() => signOut()}>Sign Out</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
