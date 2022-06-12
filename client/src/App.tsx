import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Autocomplete, Button, Card, Grid, TextField, Typography } from "@mui/material";
import "./App.css"

function App() {
  const [text, setText] = useState("Connecting to API...")
  const [File, setFile] = useState(null)


  useEffect(() => {
    const getText = async () => {
      const { data } = await axios.get(`/api`)
      if (!data) {
        setText("Cannot connect to API!")
      }
      setText(data)
    }
    getText()
  }, [])


  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault()
    const formData = new FormData()
    formData.append("File", File)
    await axios.post(`/api/upload`, formData)
    setFile(File)
  }

  const handleFile = (event) => {
    setFile(event.target.files[0])
  }

  return (
    <Card className="main">
      <Grid
        container
        spacing={1}
      >
        <Grid item xs={6} md={6}>
          {text}
        </Grid>
        <Grid item xs={6} md={6}>
          <form onSubmit={handleSubmit} id="form1" encType="multipart/form-data">
            <div>
              <TextField variant="outlined" />
            </div>
            <div>
              <input hidden type="file" id="file-picker" onChange={handleFile} accept=".jpg,.png,.tif,.tiff" disabled={Boolean(File)} />
              <label htmlFor="file-picker">
                <Grid container>
                  <Grid item>
                    <Button component="span" disabled={Boolean(File)}>
                      Upload
                    </Button>
                  </Grid>
                  <Grid item>
                    {File &&
                      <span className="file-name">
                        {File?.name}
                      </span>}
                  </Grid>
                </Grid>
              </label>
            </div>
            <div>
              <Button form="form1" value="Submit">Submit</Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Card>
  );
}

export default App;
