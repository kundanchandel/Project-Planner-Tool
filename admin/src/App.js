import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";
import Order from './Components/Order/Order'
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/SignIn";
import Header from "./Components/Utils/header";
import Sidebar from "./Components/Utils/Sidebar";


function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Router>
        <Switch>
          <Route exact path="/" component={Order} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
