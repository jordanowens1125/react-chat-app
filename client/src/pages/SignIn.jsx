import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, isLoading } = useLogin();
  const [viewPassword, setViewPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const DemoLogin = async (e) => {
    e.preventDefault();
    await signIn(
      process.env.REACT_APP_DEMO_EMAIL,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };

  const DemoLogin2 = async (e) => {
    e.preventDefault();
    await signIn(
      process.env.REACT_APP_DEMO_EMAIL_2,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };

  return (
    <form onSubmit={submit}>
      SignIn
      <label htmlFor="">Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <label htmlFor="">Password:</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={""} type="submit">
        sign in
      </button>
      <button onClick={DemoLogin}>Sign In with Demo Account</button>
      <button onClick={DemoLogin2}>Sign In with Demo Account 2</button>
    </form>
  );
};

export default SignIn;
