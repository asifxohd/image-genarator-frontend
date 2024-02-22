import { useState, useEffect } from "react";
import "./profile.css";
import Modal from "react-modal";
import UserInfoModalForm from "../Modal/EditUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../../Features/userLoginSlice";
import { FaCamera } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { BASE_URL, PROFILE_IMAGE_URL } from "../../Features/Action";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { userData } = useSelector((store) => store.userLogin ||{});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profileImage, setProfileImage] = useState(PROFILE_IMAGE_URL);
	const [demoImage, setDemoImage] = useState('')
	const [profileImageEditModal, setProfileImageEditModal] = useState(false);
	const navigate = useNavigate()
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserData());
		if (userData&&userData.image){
			setProfileImage(BASE_URL+userData.image)
		}
	}, []);
	
	const handleImageChange = (e) => {
		const file = e.target.files[0];	
		setDemoImage(file)
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setProfileImage(e.target.result);
			};
			const imageurl = reader.readAsDataURL(file);
		}
	};


	const handleUpdateButton = async() => {
		const formData = new FormData
		formData.append('image', demoImage)
		formData.append('email', userData.email)

		try {
			axios.patch(`${BASE_URL}/api/users/edit-profile-image/`, formData).then((response) => {
				const userdataCookie = Cookies.get('authTokens');
				const userData = userdataCookie ? JSON.parse(userdataCookie) : {};
				userData.image=response.data.updated_image
				const updatedUserdata = JSON.stringify(userData);
				Cookies.set('authTokens', updatedUserdata);
				toast.success('image updated successfully')
				dispatch(fetchUserData())
				setProfileImageEditModal(false)
			})
		} catch (err) {
			toast.error("An error occurred While Updating The Profile Image")
			console.log(err)
		}

	}
	return (
		<>
			<div className="h-screen  flex justify-center items-center bg-gray-50">
				<div className="h-[80%]  md:w-[70%] w-[99%] bg-gray-100 relative flex">
					<div className="left-porttion max-sm:hidden md:w-[30%] h-full bg-indigo-100 relative">
						<div className="relative w-52 h-72 ml-56 mt-32">
							<label htmlFor="fileInput" className="relative hover:opacity-60">
								<img
									src={userData && userData.image ? BASE_URL+userData.image : PROFILE_IMAGE_URL}
									alt=""
									className="w-full h-full object-cover transition-opacity duration-300"
								/>
								<div
									onClick={() => setProfileImageEditModal(true)}
									className="absolute hover:bg-transparent top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
								>
									<div className="px-8 text-white flex flex-row items-center">
										<FaCamera size={35} />
										<span className="p-2 text-2xl">Edit</span>
									</div>
								</div>
							</label>
						</div>
					</div>

					<div className="right-portion w-[70%] h-full flex flex-col justify-center items-center ml-20">
						<div>
							<h1 className="font-serif font-bold text-4xl">
								{(userData)?userData.username:''}
							</h1>
						</div>
						<div className="font-serif mt-2 font-bold text-2xl email-info">
							{(userData)?userData.email:''}
						</div>
						<div className="font-serif font-bold text-2xl phone-number-info">
							{(userData)?userData.phone_number:''}
						</div>
					</div>

					<div className="p-10 flex">
						<button
							onClick={() => setIsModalOpen(true)}
							className="edit-button "
						>
							<svg className="edit-svgIcon" viewBox="0 0 512 512">
								<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
							</svg>
						</button>
						<button
							onClick={(e) => {dispatch(logoutUser())
							navigate('/')}}
							className=" ml-2 Btn"
						>
							<div className="sign">
								<svg viewBox="0 0 512 512">
									<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
								</svg>
							</div>
							<div className="text">Logout</div>
						</button>
					</div>

					<Modal
						isOpen={isModalOpen}
						contentLabel="Edit Modal"
						ariaHideApp = {false}
						style={{
							content: {
								width: "40%",
								height: "95%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								margin: "auto",
								background: "rgba(255, 255, 255, 0.8)",
								borderRadius: "8px",
								border: "0px",
							},
							overlay: {
								backgroundColor: "#ffffff",
							},
						}}
					>
						<div className="flex w-full justify-end">
							<button
								onClick={() => setIsModalOpen(false)}
								type="button"
								className="bg-white  rounded-md  inline-flex items-center justify-end text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							>
								{" "}
								<span className="sr-only">Close menu</span>{" "}
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									{" "}
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>{" "}
								</svg>{" "}
							</button>
						</div>
						<UserInfoModalForm setIsModalOpen={setIsModalOpen} />
					</Modal>

					{/* This React Modal is for showing the user profile edit image modal with save button */}
					<Modal
						isOpen={profileImageEditModal}
						style={{
							content: {
								width: "35%",
								height: "70%",
								margin: "auto",
								padding: "5px",
							},
							overlay: {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
								// Other styles for the overlay
							},
						}}
					>
						<div className="p-5">
							<button
								onClick={() => setProfileImageEditModal(false)}
								className="absolute font-bold text-black p-3 top-0 right-0 cursor-pointer"
							>
								<IoCloseCircle size={35} />
							</button>
							<div className="flex justify-center">
								<div className="font-serif pt-5 text-2xl text-gray-800 font-bold mb-4">
									Update Profile Pic
								</div>
							</div>

							<div className="flex justify-center pt-5">
								<label
									htmlFor="fileToUpload"
									className="profile-pic border flex my-auto justify-center align-middle items-center text-xs font-bold"
									style={{ backgroundImage: `url(${profileImage})` }}
								>
									<span className="glyphicon glyphicon-camera"></span>
									<span className="flex items-center ">Change Image</span>
								</label>

								<input
									type="file"
									name="fileToUpload"
									id="fileToUpload"
									onChange={(e) => handleImageChange(e)}
									style={{ display: "none" }}
								/>
							</div>
							<div className="flex justify-center pt-10">
								<button onClick={handleUpdateButton} class="bg-transparent hover:bg-indigo-300 text-indigo-300 font-semibold hover:text-white py-2 px-4 border border-indigo-300 hover:border-transparent rounded">
									Update
								</button>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default Profile;
