import React, { Dispatch } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./state/reducers/index";
import { useAppDispatch, actionCreators } from "./state";
import { depositMoney } from "./state/action-creators";
import { bindActionCreators } from "redux";
import { Action } from "./state/actions";
import { ActionType } from "./state/actions-types";
function App() {
  const count = useSelector((state: State) => state.count);
  const dispatch = useAppDispatch();
  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(
    actionCreators,
    dispatch
  );
  //alternative of using bindActionCreatoers id doing
  const increment = useDispatch<Dispatch<Action>>();

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => depositMoney(300)}> deposit</button>
      {/* Alternative */}
      <button
        onClick={() => increment({ type: ActionType.DEPOSIT, payload: 200 })}
      >
        {/* ..... */}
        deposit alternative
      </button>
      <button onClick={() => withdrawMoney(100)}> withdraw</button>
      <button onClick={() => bankrupt()}>bankrupt </button>
    </>
  );
}

export default App;
