import "./App.css";
import "./bootstrap.min.css";
import { Header, Login, Register, Welcome } from "./components/public/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Home } from "./components/private/Home";

// https://cdn.dribbble.com/users/5027649/screenshots/15188890/media/a09f3f275d1d5aeb3da19713951d23b6.jpg?compress=1&resize=1600x1200

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div>
      <Container>
        <Router>
          <Header />

          <Switch>
            {isAuth && (
              <Route path="/home">
                <Home />
              </Route>
            )}

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
