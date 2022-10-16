import axios from "axios";
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Error occurred");
  }

  const data = await res.data.movies;
  return data;
};

export const sendAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: data.name ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 201 && res.status !== 200) {
    return console.log("Unable to Authenticate");
  }
  const resData = await res.data;
  return resData;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unable to Fetch Movie");
  }

  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Failed To Create new Bookingd");
  }
  const resData = await res.data;
  return resData;
};

export const adminLogin = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unable to Login");
  }

  const resData = await res.data;
  return resData;
};
export const sendMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unable to Create Movie");
  }

  const resData = await res.data;
  return resData;
};

export const getUserBookings = async () => {
  const res = await axios
    .get(`/user/bookings/${localStorage.getItem("userId")}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Error Finding Bookings");
  }
  const resData = await res.data;
  return resData;
};

export const getAdmidData = async () => {
  const id = localStorage.getItem("adminId");
  const res = await axios.get(`/admin/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No admin found from given ID");
  }

  const resData = await res.data;

  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Cannot delete Booking");
  }
  const resData = await res.data;
  return resData;
};
