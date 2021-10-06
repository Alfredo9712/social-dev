import { FC } from "react";
import { Alert } from "react-bootstrap";

interface AlertProps {
  text: string;
  variant: string;
}

export const AlertComponent: FC<AlertProps> = ({ text, variant }) => {
  return (
    <Alert variant={variant} style={{ width: "550px" }}>
      {text}
    </Alert>
  );
};
