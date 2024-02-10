import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'

const LoginPage = lazy(() => import("./components/Login/login"));
const RegisterPage = lazy(() => import("./components/signup/Register"));
const UserDashBoard = lazy(() => import("./components/Dashboard/UserDashboard"));
const Profile = lazy(() => import("./components/UserProfile/Profile"));
const AdminLogin = lazy(() => import("./components/AdminLogin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/AdminDash/AdminDash"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={
		<div className="flex justify-center items-center">
			<div class="loader-container">
			<div class="loader"></div>
			<div class="loader-text">Loading...</div>
			</div>
		</div>
		}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="sign-up/" element={<RegisterPage />} />
            <Route path="user-dashboard/" element={<UserDashBoard />} />
            <Route path="user-profile/" element={<Profile />} />
            <Route path="admin-login/" element={<AdminLogin />} />
            <Route path="admin-dashboard/" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
