import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, logoutUser } from "./Features/userLoginSlice";

const LoginPage = lazy(() => import("./components/Login/login"));
const RegisterPage = lazy(() => import("./components/signup/Register"));
const UserDashBoard = lazy(() =>import("./components/Dashboard/UserDashboard"));
const Profile = lazy(() => import("./components/UserProfile/Profile"));
const AdminLogin = lazy(() => import("./components/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/AdminDash/AdminDash"));

function App() {
    const {is_authenticated} = useSelector((store)=>(store.userLogin))
    const dispatch = useDispatch();
    const accessCookie = !!Cookies.get("authTokens");

    useEffect(() => {
        accessCookie ? dispatch(authenticateUser()) : dispatch(logoutUser());
    }, [accessCookie]);

    


    return (
        <>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center">
                            <div className="loader-container">
                                <div className="loader"></div>
                                <div className="loader-text">Loading...</div>
                            </div>
                        </div>
                    }
                >
                    <Routes>
                        <Route exact path="/" element={<LoginPage />} />
                        <Route path="sign-up/" element={<RegisterPage />} />
                        <Route exact path="admin-login/" element={<AdminLogin />} />

                        {is_authenticated && (
                            <>
                                <Route path="user-dashboard/" element={<UserDashBoard />} />
                                <Route path="user-profile/" element={<Profile />} />
                                <Route path="admin-dashboard/" element={<AdminDashboard />} />
                            </>
                        ) }
                            {/* <Route path="*" element={<Navigate to="/" />} /> */}
                    </Routes>

                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
