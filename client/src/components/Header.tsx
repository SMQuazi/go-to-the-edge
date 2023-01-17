import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import { SET_USER } from "../contexts/actionTypes";
import {
  UserReducer,
  UserInitialState,
} from "../contexts/reducers/UserReducers";

const Header = () => {
  const [UserState, UserDispatch] = useReducer(UserReducer, UserInitialState);
  const [text, setText] = useState("Connecting to API...");
  const [formData, setFormData] = useState<LoginInfo>({
    username: undefined,
    password: undefined,
  });

  interface LoginInfo {
    username: string | undefined;
    password: string | undefined;
  }

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

  const HandleInput = (e: any) => {
    const { name, value }: { name: string; value: any } = e.target;
    const tempData: LoginInfo = formData;
    // @ts-ignore
    tempData[name] = value;
    setFormData(tempData);
    return;
  };

  const HandleSubmit = async () => {
    try {
      const res = await axios.post("/api/login", formData);
      UserDispatch({
        type: SET_USER,
        payload: res.data,
      });
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="header">
      <Grid container spacing={5}>
        <Grid item xs={6}>
          {text}
        </Grid>
        <Grid item xs={6}>
          <Grid container gap={1}>
            {!UserState.id ? (
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
            ) : (
              <div>Welcome {UserState.displayName}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Header;
