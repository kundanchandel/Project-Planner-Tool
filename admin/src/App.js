// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";
import { useEffect } from "react";
// import Order from './Components/Order/Order'
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/SignIn";
import Header from "./Components/Utils/header";
import Sidebar from "./Components/Utils/Sidebar";
import Menu from "./Components/Menu/menu";
import Order from "./Components/Order/Order";
function App() {
  return (
    <div className="container">
      <Router>
        <Header />
      </Router>
      <div style={{ marginTop: "70px" }}>
        {localStorage.getItem("x-access-token") ? (
          <Router>
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/order" component={Order} />
          </Router>
        ) : (
          <Router>
            <Switch>
              {/* <Route exact path="/" component={Order} /> */}
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route path="/" component={() => <Redirect to="/signin" />} />
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
