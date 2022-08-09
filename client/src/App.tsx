import axios from "axios";
import { useEffect, useState, } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import "./App.css"

function App() {
  const [text, setText] = useState("Connecting to API...")

  useEffect(() => {
    const getText = async () => {
      try {
        await axios.get(`/api/`)
        setText("Login to get started")
      } catch (err) {
        setText("Could not connect to API!")
      }
    }
    getText()
  }, [])

  return (
    <Card className="main">
      <Grid container spacing={5}>
        <Grid item xs={6}>
          {text}
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
