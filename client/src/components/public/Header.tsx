import { FC } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { logoutUser } from "../../features/user.slice";

export const Header: FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  return (
    <Navbar bg="transparent" expand="lg">
      <Container style={{ marginTop: "20px" }}>
        <Link to="/" style={{ fontSize: "20px", textDecoration: "none" }}>
          Social-Type
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "auto" }}>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginRight: "20px" }}
                >
                  Login
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </>
            ) : (
              <Nav.Item
                style={{
                  textDecoration: "none",
                  color: "rgb(72,87,133)",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(logoutUser())}
              >
                Sign out
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
