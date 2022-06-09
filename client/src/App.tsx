import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import "./App.css"
import { Box } from "@mui/system";

function App() {
  const [text, setText] = useState(null)
  const [File, setFile] = useState(null)
  const inputRef = useRef()

  const getText = async () => {
    if (!text) {
      const { data } = await axios.get(`/api`)
      setText(data)
    }
  }

  useEffect(() => {
    getText()
    if (!text) {
      setText("Error: Unable to connect to API!")
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("File", File)
    const resp = await axios.post(`/api/upload`, formData)
    setFile(null)
    inputRef.current.value = ""
  }

  const handleFile = (event) => {
    setFile(event.target.files[0])
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6} md={8}>
          {text}
        </Grid>
        <Grid item xs={6} md={4}>
          <form onSubmit={handleSubmit} id="form1" encType="multipart/form-data">
            <input type="text" />
            <input type="file" onChange={handleFile} ref={inputRef} accept=".jpg,.png,.tif,.tiff" />
            <button form="form1" value="Submit">Submit</button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
