import {
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { sendMovie } from "../../helpers/api-helpers";

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onResReceived = (res) => {
    console.log(res);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    sendMovie({ ...inputs, actors })
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width="50%"
          boxShadow={"10px 10px 20px #ccc"}
          padding={10}
          margin="auto"
          display="flex"
          flexDirection={"column"}
        >
          <Typography textAlign={"center"} variant="h6" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            name="title"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            name="description"
          />
          <FormLabel>Release Date</FormLabel>
          <TextField
            value={inputs.releaseDate}
            onChange={handleChange}
            type={"date"}
            variant="standard"
            margin="normal"
            name="releaseDate"
          />
          <FormLabel>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            name="posterUrl"
          />
          <FormLabel>Actors</FormLabel>
          <Box display={"flex"} alignItems="center">
            <TextField
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              name="actor"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel>Featured</FormLabel>
          <Checkbox
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prev) => ({ ...prev, featured: e.target.checked }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
