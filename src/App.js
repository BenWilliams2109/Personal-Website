import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Homepage/Home";
import Stocks from "./Pages/Stocks/Stocks";
import Forex from "./Pages/Forex/Forex";
import Footer from "./Footer";

const NoMatch = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Link to="/">Click here to go home</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stocks" component={Stocks} />
        <Route path="/forex" component={Forex} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
