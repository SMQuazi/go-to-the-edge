import axios from "axios";
import { useEffect, useState, } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import "./App.css"

function App() {
  useEffect(() => {
    const getText = async () => {
      const { data } = await axios.get(`/api`)
      if (!data) {
        console.log("Can't connect to API.")
      }
      console.log("Connected to API...")
    }
    getText()
  }, [])

  return (
    <Card className="main">
      <Grid container spacing={5}>
        <Grid item xs={6}>
          Log in to get started.
        </Grid>
        <Grid item xs={6}>
          <Grid container gap={1}>
            <TextField variant="standard" placeholder="username" />
            <TextField variant="standard" placeholder="password" type={"password"} />
            <Button>Log in</Button>
          </Grid>
        </Grid>
      </Grid >
    </Card >
  );
}

export default App;
