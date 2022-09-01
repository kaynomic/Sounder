import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./Components/LoginFormPage";
import Navigation from "./Components/Navigation";
import SignupFormPage from "./Components/SignUpForm";
import HomePage from "./Components/HomePage";
import * as sessionActions from "./store/session"

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <div class="container">

        <div class="header">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div class="content">
          {isLoaded && (
            <Switch>

              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/login">
                <LoginFormPage />
              </Route>

              <Route path="/signup">
                <SignupFormPage />
              </Route>

            </Switch>
          )}
        </div>

      </div>
    </>
  );
}

export default App;
