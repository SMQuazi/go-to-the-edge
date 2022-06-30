import { useState } from "react";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";



export const Upload = () => {
  const [mFile, setFile] = useState<File>(new File([], ""))

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (event) => {
    console.log("submit")
    event.preventDefault()
    const formData = new FormData()
    formData.append("File", mFile)
    await axios.post(`/api/upload`, formData)
  }

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0]
    setFile(file)
  }

  return (<form onSubmit={handleSubmit} id="form1" encType="multipart/form-data">
    <div>
      <TextField variant="outlined" />
    </div>
    <div>
      <input hidden type="file" id="file-picker" onChange={handleFile} accept=".jpg,.png,.tif,.tiff" disabled={Boolean(File)} />
      <label htmlFor="file-picker">
        <Grid container>
          <Grid item>
            <Button component="span" disabled={Boolean(mFile)}>
              Upload
            </Button>
          </Grid>
          <Grid item>
            {File &&
              <span className="file-name">
                {mFile.name}
              </span>}
          </Grid>
        </Grid>
      </label>
    </div>
    <div>
      <Button form="form1" type="submit">Submit</Button>
    </div>
  </form>)
}