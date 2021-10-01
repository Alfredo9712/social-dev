import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
export * as actionCreators from "./action-creators";
export * from "./store";
export const useAppDispatch = () => useDispatch<AppDispatch>();
