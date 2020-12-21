import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";

import Home from "./Components/Home/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Header from "./Components/Utils/header";
import Restaurant from "./Components/Restaurant/Restaurant";
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <div className="appImage">
      <div className="overlay">
        {localStorage.getItem("x-access-token") ? (
          <div>
            <Router>
              <Header />

              <div style={{ margin: "0px 10vw", paddingTop: "80px", paddingBottom:"80px" }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/rest/:id/:tableNo" component={Restaurant} />
                </Switch>
              </div>
            </Router>
          </div>
        ) : (
          <div>
            <Router>
              <Switch>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route path="/" component={() => <Redirect to="/signin" />} />
              </Switch>
            </Router>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
