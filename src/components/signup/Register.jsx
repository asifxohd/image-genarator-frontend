import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Features/Action";
import { clearValidationErrors } from "../../Features/userSlices";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [prevData, setPrevData] = useState(null);


  const { is_authenticated } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (is_authenticated) {
      navigate("../user-dashboard/");
    }
  }, [is_authenticated]);
  const {validation_errors} = useSelector((state)=> state.user.validation_errors)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearValidationErrors());
  }, [username, phoneNumber, email, password]);

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const data = {
    username: username,
    email: email,
    phone_number: phoneNumber,
    password: password,
  };

  const handleRegisterButton = useCallback(
    async (e) => {
      console.log("Register button clicked");
      e.preventDefault();
      validateUsername(username);
      validatePassword(password);
      validateEmail(email);
      validatePhoneNumber(phoneNumber);
      validateConfirmPassword(confirmPassword);

      if (
        !usernameError &&
        !passwordError &&
        !emailError &&
        !phoneNumberError &&
        !confirmPasswordError &&
        password === confirmPassword &&
        JSON.stringify(data) !== JSON.stringify(prevData)
      ) {
        try {
          const resultAction = await dispatch(registerUser(data));
          const user = unwrapResult(resultAction);
          setPrevData(data);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch {
          toast.error("Something Went Wrong");
        }
      }
    },
    [data]
  );

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    setUsernameError(regex.test(value) ? "" : "Invalid username");
  };

  const validatePassword = (value) => {
    const regex = /^.{8,}$/;
    setPasswordError(
      regex.test(value) ? "" : "Password must be at least 8 characters"
    );
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Invalid email");
  };

  const validatePhoneNumber = (value) => {
    const regex = /^\d{10}$/;
    setPhoneNumberError(regex.test(value) ? "" : "Enter a valid phone number");
  };

  const validateConfirmPassword = (value) => {
    setConfirmPasswordError(value === password ? "" : "Passwords do not match");
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#a)"
              />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    strokeWidth="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#b)"
              />
            </svg>
          </div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                    Words Magic !!
                  </span>
                </a>
              </div>

              <form className="mb-4" onSubmit={(e) => handleRegisterButton(e)}>
                <div className="mb-3">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Username
                  </label>
                  <input
                    onChange={(e) => handleUsername(e)}
                    type="text"
                    value={username}
                    className={
                      usernameError
                        ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    }
                    name="email-username"
                    placeholder="Enter your username..."
                    autoFocus=""
                  />
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {usernameError}
                    {validation_errors ? (
                      <div>{validation_errors.username}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => handleEmail(e)}
                    value={email}
                    className={
                      emailError
                        ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    }
                    name="email-username"
                    placeholder="Enter your email..."
                    autoFocus=""
                  />
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {emailError}
                    {validation_errors ? (
                      <div>{validation_errors.email}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handlePhoneNumber(e)}
                    value={phoneNumber}
                    className={
                      phoneNumberError
                        ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    }
                    name="email-username"
                    placeholder="Enter your Phone Number..."
                    autoFocus=""
                  />
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {phoneNumberError}
                    {validation_errors ? (
                      <div>{validation_errors.phone_number}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => handlePassword(e)}
                    value={password}
                    className={
                      passwordError
                        ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    }
                    name="password"
                    placeholder="Enter your Password..."
                    autoFocus=""
                    autoComplete=""
                  />
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {passwordError}
                    {validation_errors ? (
                      <div>{validation_errors.password}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => handleConfirmPassword(e)}
                    value={confirmPassword}
                    className={
                      confirmPasswordError
                        ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    }
                    name="confirm-password"
                    placeholder="Confirm Password..."
                    autoFocus=""
                    autoComplete=""
                  />
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {confirmPasswordError}
                    {validation_errors ? (
                      <div>{validation_errors.confirm_password}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-400 bg-indigo-400 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="mb-4 text-center">
                Already Have An Account? &nbsp;
                <Link to={"/"} style={{ color: "blue" }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
