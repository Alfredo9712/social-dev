import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { loginUser } from "../../features/user.slice";
import { Auth } from "../../interfaces";
import { AlertComponent } from "../utils";

export const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [variant, setVairant] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const verifyHandler = () => {
    if (email === "" || password === "" || name === "") {
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
    const user = {
      email,
      password,
    };
    try {
      const { data }: AxiosResponse<Auth> = await axios.post(
        "/api/users/register",
        user
      );
      const { email, name, _id } = data.user;
      dispatch(loginUser({ email, name, _id }));
      setEmail("");
      setPassword("");
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

          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value.toLowerCase())}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />

          <Form.Label style={{ marginTop: "20px" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            style={{ backgroundColor: "white", maxWidth: "550px" }}
          />
          <Form.Label style={{ marginTop: "20px" }}>Password</Form.Label>

          <Form.Control
            type="password"
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
