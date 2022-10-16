import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminAuth from "./components/Auth/AdminAuth";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header/Header";
import HomeLayout from "./components/HomePage/HomeLayout";
import AddMovie from "./components/Movies/AddMovie";
import AllMovies from "./components/Movies/AllMovies";
import Admin from "./components/Profiles/Admin";
import User from "./components/Profiles/User";

function App() {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  console.log(isUserLoggedIn, isAdminLoggedIn);
  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminAuth />} />
        {isUserLoggedIn && (
          <>
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/user" element={<User />} />
          </>
        )}{" "}
        {isAdminLoggedIn && (
          <>
            <Route path="/add" element={<AddMovie />} />
            <Route path="profile" element={<Admin />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
