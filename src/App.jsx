import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import CreateRoom from "./components/Create-Room";
import AddProduct from "./components/AddProduct"; // Import AddProduct component
import Room from "./components/Room";
import JoinRoom from  "./components/Join-Room";

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
        
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/create-room" element={<CreateRoom />} />

        <Route path="/add-product" element={<AddProduct />} /> {/* Add this route */}
        
        <Route path="/room/:roomId" element={<Room />} /> {/* Room page route */}

        <Route path="/Join-Room" element={<Room />} /> {/* Room page route */}

        

        {/* Dynamic Service Page */}
        <Route path="/services/:serviceName" element={<CreateRoom />} />
{/* 
       <Route path="/tenders-live" element={<TendersLive />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/join-room" element={<JoinRoom />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
