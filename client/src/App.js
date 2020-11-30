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
function App() {
  return (
    <div>
      <div>
        <Router>
          <Header />
        </Router>
      </div>
      <div className="container" style={{ margin: "50px", marginTop:'100px' }}>
        {localStorage.getItem("x-access-token") ? (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/rest/:id" component={Restaurant} />
            </Switch>
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/" component={() => <Redirect to="/signin" />} />
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
