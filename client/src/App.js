import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Admin from "./views/Admin"
import Location from "./views/Location"
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import 'antd/dist/antd.css';
import "./App.css";


// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading, user } = useAuth0();
  const User = user;

  if (loading) {
    return <Loading />;
  }
  console.log(user)
  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact render={(routeProps) => (<Home {...routeProps} User={user} />)} />
            <PrivateRoute path="/admin" component={Admin} user={user}/>
            <PrivateRoute path="/profile" component={Profile} user={user} />
            <Route path="/location" component={Location} user={user}/>
            
          </Switch>
          
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
