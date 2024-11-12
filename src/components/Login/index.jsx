import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import herobg from "../../assets/herobg.png"; // Import the background image

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data); // Save token
      window.location.href = "/"; // Redirect to homepage
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message); // Show error message
      }
    }
  };

  return (
    <div
      className={styles.login_container}
      style={{
        backgroundImage: `url(${herobg})`, // Set the background image
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
                placeholder="Email/Phone Number"
                name="email"
                onChange={handleChange}
                value={data.email}
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

            {/* Submit Button */}
            <button type="submit" className={styles.submit_btn}>
              Submit
            </button>

            {/* Forgot Password Link */}
            <Link to="/forgotpassword" className={styles.forgot_password_link}>
              Forgot Password?
            </Link>
          </form>
        </div>
        <div className={styles.right}>
          <div className={styles.new_here_container}> {/* Container for "New Here?" and button */}  
            <div className={styles.vertical_line}></div> {/* Vertical line */}
            <div className={styles.text_container}> {/* Text and button aligned vertically */}
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
