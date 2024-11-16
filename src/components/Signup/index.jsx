import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import herobg from "../../assets/herobg.png";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        aadharCardNumber: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const requestData = {
            personalDetails: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                dob: "",
                password: data.password,
                cpassword: data.confirmPassword
            },
            authenticationDetails: {
                aadharCardNumber: data.aadharCardNumber,
            }
        };

        try {
            const url = "http://localhost:8080/signup";
            const { data: res } = await axios.post(url, requestData);

            console.log(res.message);
            navigate("/login");  // Redirect to Main page on successful registration
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
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
                        <h1 className={styles.header}>Create an Account</h1>

                        <div className={styles.input_fields_container}>
                            <div className={styles.input_container}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={data.firstName}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={data.lastName}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.input_fields_container}>
                            <div className={styles.input_container}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    type="text"
                                    placeholder="Aadhar Card Number"
                                    name="aadharCardNumber"
                                    onChange={handleChange}
                                    value={data.aadharCardNumber}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.input_fields_container}>
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
                            </div>
                            <div className={styles.input_container}>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={data.confirmPassword}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type="submit" className={styles.submit_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <div className={styles.new_here_container}>
                        <div className={styles.vertical_line}></div>
                        <div className={styles.text_container}>
                            <h1 className={styles.new_here}>Already Registered?</h1>
                            <Link to="/login">
                                <button type="button" className={styles.signup_btn}>
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
