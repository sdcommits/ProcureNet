import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/forgot-password";
      const { data } = await axios.post(url, { email });
      setMessage(data.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.forgot_password_container}>
      <div className={styles.forgot_password_form_container}>
        <h1 className={styles.header}>Forgot Your Password?</h1>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={styles.input}
          />
          {message && <div className={styles.message}>{message}</div>}
          <button type="submit" className={styles.submit_btn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
