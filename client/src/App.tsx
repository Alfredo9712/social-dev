import "./App.css";
import "./bootstrap.min.css";
import { Header, Login, Register, Welcome } from "./components/public/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Container>
        <Router>
          <Header />
          {/* <Welcome /> */}

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
