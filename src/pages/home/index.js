import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  //   ** local storage
  const storedToken = localStorage.getItem("token");

  // **hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (storedToken) {
      navigate("/profile");
    } else {
      navigate("login");
    }
  }, []);

  return null;
}

export default Home;
