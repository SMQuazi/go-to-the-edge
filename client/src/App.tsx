import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import "./App.css";

import UserContext from "./contexts/UserContext";
import {
  UserReducer,
  UserInitialState,
} from "./contexts/reducers/UserReducers";
import { SET_USER } from "./contexts/actionTypes";

interface LoginInfo {
  username: string | undefined,
  password: string | undefined
}

function App() {
  const [text, setText] = useState("Connecting to API...");
  const [formData, setFormData] = useState<LoginInfo>({username: undefined, password: undefined});
  const [UserState, UserDispatch] = useReducer(UserReducer, UserInitialState);

  useEffect(() => {
    const getText = async () => {
      try {
        await axios.get(`/api/`);
        setText("Login to get started");
      } catch (err) {
        setText("Could not connect to API!");
      }
    };
    getText();
  }, []);

  const HandleInput= (e: any)  => {
    const { name, value}: {name: string; value: any} = e.target
    const tempData:LoginInfo = formData
    // @ts-ignore
    tempData[name] = value
    setFormData(tempData)
    return 
  }

  const HandleSubmit = async () => {
    console.log(formData)
    const res = await axios.post("/api/login", formData)
    console.log(res)
    UserDispatch({
      type: SET_USER,
      payload: res.data
    })
    setText("")
  }


  return (
    <UserContext.Provider value={{ UserState, UserDispatch }}>
      <Card className="main">
        <Grid container spacing={5}>
          <Grid item xs={6}>
            {text}
          </Grid>
          <Grid item xs={6}>
            <Grid container gap={1}>
            {!UserState.id ?
              <>
                <TextField 
                  variant="standard" 
                  name="username" 
                  placeholder="username" 
                  onInput={HandleInput}
                />
                <TextField
                  variant="standard"
                  name="password"
                  placeholder="password"
                  type={"password"}
                  onInput={HandleInput}
                />
                <Button onClick={HandleSubmit}>Log in</Button>
              </>
              :
              <div>
                Welcome {UserState.displayName}
              </div>
            }
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </UserContext.Provider>
  );
}

export default App;
