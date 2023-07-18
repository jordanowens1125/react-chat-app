import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import RequireAuth from "./components/ProtectedRoutes/RequireAuth";
import Chats from "./pages/Chats";
import NoPage from "./pages/NoPage";
import SignedOut from "./components/ProtectedRoutes/SignedOut";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-mode"
  );
  return (
    <main className={theme} id="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout theme={theme} setTheme={setTheme} />}
          >
            {/*We want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route index element={<Chats />} />

              <Route path="profile" element={<Profile />} />

              {/* <Route path="settings" element={<Settings />} /> */}

              <Route path="*" element={<NoPage />} />
            </Route>

            {/*public routes */}
          </Route>
          <Route element={<SignedOut />}>
            <Route path="signin" element={<SignIn />} />
            {/* <Route path="signup" element={<SignUp />} /> */}
          </Route>
          {/*catch all */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
