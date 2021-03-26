import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Homepage/Home";
import Stocks from "./Pages/Stocks/Stocks";
import Forex from "./Pages/Forex/Forex";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stocks" component={Stocks} />
        <Route path="/forex" component={Forex} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
