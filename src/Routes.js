import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/index";
import LoginPage from "./pages/login";
import Profile from "./pages/profile";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/home";

export default () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<LoginPage />} />
    <Route exact path="/" element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
    </Route>
    {/* <Route path="/:type/:id" element={<DetailedPage />} /> */}
    <Route path="*" element={<h1>Not Found</h1>} />
  </Routes>
);
