import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AlertComponent } from "../utils";
import axios, { AxiosResponse } from "axios";
import { Auth } from "../../interfaces/index";
import { loginUser } from "../../features/user.slice";
export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVairant] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const verifyHandler = () => {
    if (email === "" || password === "") {
      setError(true);
      setVairant("warning");
      setText("Invalid input");

      setTimeout(() => {
        setError(false);
        setVairant("");
        setText("");
      }, 2000);
      return false;
    }
    return true;
  };

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = verifyHandler();
    if (result === false) return;
    const user = {
      email,
      password,
    };
    try {
      const { data }: AxiosResponse<Auth> = await axios.post(
        "/api/users/login",
        user
      );
      //thoughts
      const { email, firstName, _id } = data.user;

      dispatch(loginUser({ email, firstName, _id }));
      setEmail("");
      setPassword("");
      history.push("/home");
    } catch (error: any) {
      setError(true);
      setVairant("warning");
      setText("Invalid Credentials");
      setTimeout(() => {
        setError(false);
        setVairant("");
        setText("");
      }, 1500);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h1>Login</h1>
          {error && <AlertComponent text={text} variant={variant} />}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />
          <Form.Label style={{ marginTop: "20px" }}>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />

          <Button
            variant="outline-primary"
            type="submit"
            style={{ marginTop: "20px", width: "100px" }}
          >
            {" "}
            Login
          </Button>

          <h6 style={{ marginTop: "20px" }}>
            Don't have an account? <Link to="/register">Sign up!</Link>
          </h6>
        </Form.Group>
      </Form>
    </div>
  );
};

//strap converse music
