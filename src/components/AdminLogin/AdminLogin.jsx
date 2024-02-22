import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser, fetchUserData, logoutUser } from "../../Features/userLoginSlice";
import { userLogin } from "../../Features/Action";

const AdminLogin = () => {
  const { is_authenticated , is_superuser} = useSelector((store) => store.userLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData())
 }, []);

  useEffect(() => {
    if (is_authenticated && is_superuser) {
      navigate("../admin-dashboard/");
    } else if (is_authenticated) {
        navigate("../user-dashboard/");
    }
  }, [is_authenticated, is_superuser]);

  const accessCookie = !!Cookies.get("authTokens");

  useEffect(() => {
    accessCookie ? dispatch(authenticateUser()) : dispatch(logoutUser());
  }, [accessCookie]);

  const logindata = {
    email: username,
    password: password,
  };

  const handleLoginButton = (e) => {
    e.preventDefault();
    validateEmail(username);
    validatePassword(password);

    if (!userPasswordError && !userEmailError) {
      try {
        dispatch(userLogin(logindata));
        dispatch(fetchUserData());
      } catch {
        alert("error something went wrong");
      }
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateEmail(value);
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setUserEmailError(regex.test(value) ? "" : "Enter a valid email ");
  };

  const validatePassword = (value) => {
    const regex = /^.{8,}$/;
    setUserPasswordError(
      regex.test(value) ? "" : "Password must be at least 8 characters"
    );
  };

  return (
    <>
      <div className="h-screen bg-gray-50">
        <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
          <div className="relative">
            <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
              <div className="flex-auto p-6">
                <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                  <a
                    href="#"
                    className="flex cursor-pointer items-center gap-2 text-black-500 no-underline hover:text-gray-500"
                  >
                    <span className="flex-shrink-0 text-3xl font-black  tracking-tight ">
                      Words Magic !!
                      <br />
                      <hr />
                      <span className=" ml-9 text-2xl">Admin Login</span>
                    </span>
                  </a>
                </div>

                <form className="mb-4" onSubmit={(e) => handleLoginButton(e)}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Email or Username
                    </label>
                    <input
                      onChange={(e) => handleEmail(e)}
                      value={username}
                      type="text"
                      name="email-username"
                      placeholder="Enter your email or username"
                      autoFocus=""
                      className={
                        userEmailError
                          ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                          : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      }
                    />
                  </div>
                  <div
                    style={{ color: "red", fontSize: "12px" }}
                    className="error-message"
                  >
                    {userEmailError ? <div>{userEmailError}</div> : ""}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <label
                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <a
                        href="auth-forgot-password-basic.html"
                        className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                      ></a>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch">
                      <input
                        onChange={(e) => handlePassword(e)}
                        value={password}
                        type="password"
                        autoComplete=""
                        name="password"
                        placeholder="Enter Your Password"
                        className={
                          userPasswordError
                            ? "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                            : "block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        }
                      />
                    </div>
                    <div
                      style={{ color: "red", fontSize: "12px" }}
                      className="error-message"
                    >
                      {userPasswordError ? <div>{userPasswordError}</div> : ""}
                    </div>
                  </div>

                  <div className="my-9 ">
                    <button
                      className="grid w-full cursor-pointer select-none rounded-md border border-black bg-black py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-gray-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <p className="h-6 text-center"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
