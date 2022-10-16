import {
  Alert,
  Button,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, newBooking } from "../../helpers/api-helpers";

const Booking = () => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({ date: "", seatNumber: "" });
  const [movie, setMovie] = useState();
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getMovieById(id).then((data) => setMovie(data.movie));
  }, [id]);
  console.log(movie);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onResReceived = (res) => {
    console.log(res);
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (Number(inputs.seatNumber) < 0) {
      return console.log("Validation Failed SeatNumber Must be Greater than 0");
    }

    newBooking({ ...inputs, movie: id })
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {movie && (
        <>
          <Typography
            paddingTop={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Ticketts of {movie.title}{" "}
          </Typography>

          <Box width="100%" display="flex" justifyContent={"center"}>
            <Box
              display="flex"
              justifyContent={"center"}
              flexDirection="column"
              paddingTop={5}
              width="50%"
            >
              <img
                width={"80%"}
                height="300px"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box padding={3} marginTop={3} width="80%">
                <Typography marginTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={2}>
                  Starrer: {movie.actors.map((actor) => actor + ", ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={2}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box paddingTop={5} width="50%">
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  boxShadow="10px 10px 20px #ccc"
                  margin="auto"
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    type={"number"}
                  />
                  <FormLabel>Date</FormLabel>
                  <TextField
                    name="date"
                    value={inputs.date}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    type={"date"}
                  />
                  <Button type="submit" sx={{ marginTop: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}

      {open && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Booking Created
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Booking;
