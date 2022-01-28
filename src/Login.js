import React from "react";

const Login = ({ handleSignIn }) => {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleSignIn}>SignIn with Google to continue</button>
      </header>
    </div>
  );
};

export default Login;
