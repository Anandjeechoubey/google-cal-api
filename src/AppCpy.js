import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState({});
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      console.log("Signed in!");
    } else {
      console.log("Signed out!");
    }
  };
  useEffect(() => {
    const gapi = window.gapi;
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: "AIzaSyBx_jCaip-QG047bInGig_qVB4fRdv-M7c",
          clientId:
            "194739787710-t7jggkcrsjhdu6dslaqtrmc0h0co049e.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/calendar",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        })
        .then(function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          setAuth(gapi.auth2.getAuthInstance());
          console.log(auth);
        })
        .catch(console.error);
    });
  }, []);
  if (!auth.isSignedIn.get()) {
    return (
      <div>
        <button onClick={() => auth?.signIn()}>Login</button>
      </div>
    );
  }
  return <div className="App">yo</div>;
}

export default App;
