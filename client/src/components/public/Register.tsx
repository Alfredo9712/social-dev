import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { loginUser } from "../../features/user.slice";
import { Auth } from "../../interfaces";
import { AlertComponent } from "../utils";

export const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [variant, setVairant] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const verifyHandler = () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
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

  const registerUserHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = verifyHandler();
    if (result === false) return;
    const regUser = {
      email,
      password,
      firstName,
      lastName,
    };
    const logUser = {
      email,
      password,
      firstName,
    };
    try {
      const request = await axios.post("/api/users/register", regUser);
      console.log(request);

      const { data }: AxiosResponse<Auth> = await axios.post(
        "/api/users/login",
        logUser
      );
      //thoughts
      const { email, firstName, _id } = data.user;
      dispatch(loginUser({ email, firstName, _id }));
      history.push("/home");

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error: any) {
      setError(true);
      setVairant("warning");
      setText("User already exists");
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
      <Form onSubmit={registerUserHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h1>Sign Up</h1>
          {error && <AlertComponent text={text} variant={variant} />}

          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value.toLowerCase())}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />
          <Form.Label style={{ marginTop: "20px" }}>Last name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value.toLowerCase())}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />

          <Form.Label style={{ marginTop: "20px" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />
          <Form.Label style={{ marginTop: "20px" }}>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />
          <Button
            variant="outline-primary"
            type="submit"
            style={{ marginTop: "20px", width: "120px" }}
          >
            {" "}
            Sign up
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
