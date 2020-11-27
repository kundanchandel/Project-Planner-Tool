import "./App.css";
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

function App() {
  return (
    <div>
      <Router>
        <Header />
      </Router>

      {localStorage.getItem("x-access-token") ? (
        <Router>
          <Sidebar />
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
  );
}

export default App;
