import { useReducer } from "react";
import Header from "./components/Header";
import "./App.css";

import UserContext from "./contexts/UserContext";
import {
  UserReducer,
  UserInitialState,
} from "./contexts/reducers/UserReducers";
import Articles from "./pages/Articles";

function App() {
  const [UserState, UserDispatch] = useReducer(UserReducer, UserInitialState);

  return (
    <UserContext.Provider value={{ UserState, UserDispatch }}>
      <Header />
      <Articles />
    </UserContext.Provider>
  );
}

export default App;
