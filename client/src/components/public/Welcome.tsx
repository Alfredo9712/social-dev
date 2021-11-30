import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <>
      <Row>
        <Col xs={5}>
          <h1 className="welcome-text">
            Welcome To <br /> A Community <br /> Made For <br /> Devs{" "}
          </h1>
          <Link to="/register">
            <Button variant="outline-primary" className="welcome-btn">
              Create Account
            </Button>
          </Link>
        </Col>
        <Col xs={7}>
          <img
            src="https://cdn.dribbble.com/users/3809802/screenshots/16059635/media/743d43ef45b444f3b805a5aae571aa15.png?compress=1&resize=1200x900"
            className="welcome-img"
          />
        </Col>
      </Row>
    </>
  );
};
