import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword"; // Import the ForgotPassword component
import CreateRoom from "./components/Create-Room";
// import ServicesList from "./components/ServicesList"; // Adjust the path as needed

// import JoinRoom from "./components/Join-Room";
// import TendersLive from "./components/TendersLive";
// import HomePage from "./components/HomePage";

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Main page with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="relative z-0 bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <Works />
                <Feedbacks />
                <div className="relative z-0">
                  <Contact />
                </div>
              </div>
            </>
          }
        />
        <Route path="/" element={<About />} />
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Forgot Password page */}
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Added this route */}

        {/* <Route path="/create-room" element={<CreateRoom />} /> */}
        {/* <Route path="/join-room" element={<JoinRoom />} /> */}
        <Route path="/services/:serviceName" element={<CreateRoom />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
