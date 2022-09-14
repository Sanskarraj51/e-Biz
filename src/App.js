import { Fragment, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// ** third party library import
import { ToastContainer } from "react-toastify";

// ** Routes folder
import Routes from "./Routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "./store/user";

function App() {
  // ** redux states
  // const store = useSelector((state) => state.user);

  const storedToken = localStorage.getItem("token");

  const userData=    JSON.parse(localStorage.getItem('userData'))

  // // **hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (storedToken) {
      navigate("/profile");
      dispatch(addUsers(userData));
    }
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <Routes />
    </Fragment>
  );
}

export default App;
