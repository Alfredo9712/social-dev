import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <h1>Hi {user.firstName?.toLocaleUpperCase()} </h1>
    </>
  );
};
