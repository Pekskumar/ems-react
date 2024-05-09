import Sidebar from "./Components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import MyCalender from "./Pages/MyCalender";
import Workflows from "./Pages/Workflows";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import EventDetail from "./Pages/EventDetail";
import Events from "./Pages/Events";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CreateEventFlagSlice } from "./Redux-Toolkit/EventSlice";
import Footer from "./Components/Footer";

function App() {
  let dispatch = useDispatch();
  const CreateEventFlag = useSelector(
    (state) => state.EventStore.CreateEventFlag
  );
  useEffect(() => {
    if (window.location.href.includes("eventdetail")) {
      dispatch(CreateEventFlagSlice(false));
    } else {
      dispatch(CreateEventFlagSlice(true));
    }
  }, [CreateEventFlag]);
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="main d-flex">
          <div className="main-sidebar">
            <Sidebar />
          </div>
          <div className="main-content ">
            <Header />
            <div className="pe-3">
              <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calender" element={<MyCalender />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/events" element={<Events />} />
                <Route path="/eventdetail/:id" element={<EventDetail />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
