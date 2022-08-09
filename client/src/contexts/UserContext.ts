
import { Dispatch, createContext } from "react";
import { UserInitialState } from "./reducers/UserReducers";
import { iUserState, iStateAction } from "../types";

const UserContext = createContext<{
    UserState: iUserState;
    UserDispatch: Dispatch<iStateAction>;
}>({
    UserState: UserInitialState,
    UserDispatch: () => null,
});

export default UserContext;