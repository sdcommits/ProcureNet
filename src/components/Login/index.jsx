import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./styles.module.css";
import herobg from "../../assets/herobg.png"; // Import the background image

const Login = () => {
  const [data, setData] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is already logged in
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/login";
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.token); // Save token
      navigate("/"); // Redirect to homepage using useNavigate
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Display backend error
      } else {
        setError("An unexpected error occurred."); // Handle unexpected errors
      }
    }
  };

  return isLoggedIn ? (
    <div className={styles.already_logged_in}>
      {/* Pop-up message */}
      <div className={styles.popup}>
        <p>User already logged in!</p>
        <button
          className={styles.redirect_btn}
          onClick={() => navigate("/")} // Redirect to homepage or dashboard
        >
          Go to Homepage
        </button>
      </div>
    </div>
  ) : (
    <div
      className={styles.login_container}
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Login to Your Account</h1>

            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="Registration ID"
                name="userId"
                onChange={handleChange}
                value={data.userId}
                required
                className={styles.input}
              />
              <span className={styles.input_highlight}></span>
              <span className={styles.input_bar}></span>
            </div>

            <div className={styles.input_container}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <span className={styles.input_highlight}></span>
              <span className={styles.input_bar}></span>
            </div>

            {error && <div className={styles.error_msg}>{error}</div>}

            <button type="submit" className={styles.submit_btn}>
              Submit
            </button>

            <Link to="/forgotpassword" className={styles.forgot_password_link}>
              Forgot Password?
            </Link>
          </form>
        </div>
        <div className={styles.right}>
          <div className={styles.new_here_container}>
            <div className={styles.vertical_line}></div>
            <div className={styles.text_container}>
              <h1 className={styles.new_here}>New Here?</h1>
              <Link to="/signup">
                <button type="button" className={styles.signup_btn}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
