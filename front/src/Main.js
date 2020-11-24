import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink, HashRouter, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";

// import Home from "./Home"
// import TextSearch from "./TextSearch";
// import SpeechSearch from "./SpeechSearch";
// import CourseCloud from "./CourseCloud";
// import SignIn from "./SignIn";
// import Register from "./Register";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
  
    const decoded = jwt_decode(token);
  
    store.dispatch(setCurrentUser(decoded));
  
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
  
      window.location.href = "./login";
    }
  }

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Main;