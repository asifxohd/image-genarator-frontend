import { useState, useEffect } from "react";
import "./admindash.css";
import "./modal.css";
import Modal from "react-modal";
import axios from "axios";
import { BASE_URL, registerUser } from "../../Features/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { logoutUser } from "../../Features/userLoginSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { userData } = useSelector((store) => store.userLogin);
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate('/')

    //   state for managing add userser
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { validation_errors } = useSelector(
        (state) => state.user.validation_errors
    );


    // state for the onchnage input for the update user credentials
    const [editUserInfo, setEditUserInfo] = useState('')
    const [eUserName, setEUserName] = useState('');
    const [ePhoneNumber, setEPhoneNumber] = useState('');
    const [eEmail, setEEmail] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        Modal.setAppElement("#root");
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios
                    .post(`${BASE_URL}/api/users/list-users/`, userData)
                    .then((res) => {
                        setUserDetails(res.data);
                        console.log(userDetails)
                    });
            } catch (error) {
                toast.error("Error while fetching data");
            }
        };

        fetchData();
    }, []);

    useEffect(()=> {
        const data = {
            search:search
        }
        axios.post(`${BASE_URL}/api/users/search/`, data).then(
            (res) => {
                setUserDetails(res.data)
            }
        )
    },[search])

    const data = {
        username: username,
        email: email,
        password: password,
        phone_number: phoneNumber,
    };
    const handleAddUserButton = async (e) => {
        console.log("Register button clicked");
        e.preventDefault();
        try {
            const resultAction = await dispatch(registerUser(data));
            const user = unwrapResult(resultAction);
            setAddUserModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            setUsername("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
        } catch {
            toast.error("Something Went Wrong");
        }
    };

    // for handling delete button click
    const handleDeleteUserButton = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${BASE_URL}/api/users/delete-user/${userId}/`)
                    .then((response) => {
                        console.log("User deleted successfully");
                        axios
                            .get("/api/other-request")
                            .then((response) => { })
                            .catch((error) => { });
                    });
                window.location.reload().catch((error) => {
                    console.error("Error deleting user:", error);
                });
            } else {
                console.log("User deletion canceled");
            }
        });
    };

    const handleEditUserButton = (e ,user) => {
        e.preventDefault();
        setEditUserInfo(user) 
        setEEmail(user.email)
        setEPhoneNumber(user.phone_number)
        setEUserName(user.username)
        
    }
    const updateSubmitButton = (e) => {
        e.preventDefault();

        const data = {
            email: eEmail,
            phone_number: ePhoneNumber,
            username: eUserName,
            password: editUserInfo.password
            
        }
        console.log(editUserInfo)
        axios.put(`${BASE_URL}/api/users/update-user-admin/${editUserInfo.id}/`, data)
        .then(response => {
            // Handle response as needed
            console.log("User details updated successfully");
            window.location.reload();
        })
        .catch(error => {
            setError(error.response.data)
            console.error("Error updating user details:", error.response.data);
        });

    }

    return (
        <>
            <div className="h-screen bg-gray-50 ">
                <div>
                    <div className="h-20 flex justify-between px-12 items-center border-b shadow-sm mr-5">
                        <div className="site-name">
                            <div className="text-2xl  p-6 font-bold font-serif text-gray-500 ">
                                {" "}
                                Words Magic !!
                            </div>
                        </div>
                        <div className="site-name flex items-center">
                            <button onClick={()=> {dispatch(logoutUser())
                            navigate('/') }}
                            
                                className="Btn">
                                <div className="sign">
                                    <svg viewBox="0 0 512 512">
                                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                    </svg>
                                </div>  
                                <div className="text">Logout</div>
                            </button>
                            <div className="text-2xl  p-6 font-bold font-serif  text-black m">
                                Admin
                            </div>
                        </div>
                    </div>

                    <div className=" mx-auto mt-20 md:w-[85%] ">
                        <div className=" mt-2 ">
                            <div className="flex justify-between mr-10 mt-6">
                                <div
                                    onClick={() => setAddUserModalOpen(true)}
                                    className="ml-12"
                                >
                                    <a className="relative inline-block px-4 py-2 font-medium group">
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                        <span className="relative text-black group-hover:text-white">
                                            Add User
                                        </span>
                                    </a>
                                </div>
                                <div className="search-bar">
                                    <div className="input-container w-[20rem] lg:w-[50rem] relative">
                                        <input
                                            type="text"
                                            name="text"
                                            className="input"
                                            placeholder="search..."
                                            value={search}
                                            onChange={(e)=> setSearch(e.target.value)}
                                        />
                                        <span className="icon">
                                            <svg
                                                width="19px"
                                                height="19px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g
                                                    id="SVGRepo_tracerCarrier"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    {" "}
                                                    <path
                                                        opacity="1"
                                                        d="M14 5H20"
                                                        stroke="#000"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>{" "}
                                                    <path
                                                        opacity="1"
                                                        d="M14 8H17"
                                                        stroke="#000"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>{" "}
                                                    <path
                                                        d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                                                        stroke="#000"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>{" "}
                                                    <path
                                                        opacity="1"
                                                        d="M22 22L20 20"
                                                        stroke="#000"
                                                        strokeWidth="3.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>{" "}
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative m-10 overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mobile Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-3">{user.username}</td>
                                            <td className="px-6 py-3">{user.email}</td>
                                            <td className="px-6 py-3">{user.phone_number}</td>
                                            <td className="px-6 py-3">
                                                <button
                                                    onClick={(e) => {
                                                        setEditUserModalOpen(true);
                                                        handleEditUserButton(e, user);
                                                    }}
                                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
                                                >
                                                    Edit
                                                </button>
                                            </td>

                                            <td className="px-6 py-3">
                                                <button
                                                    onClick={(e) => handleDeleteUserButton(user.id)}
                                                    className="bg-red-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Modal
                            isOpen={editUserModalOpen}
                            className="custom-modall w-full sm:w-[30rem]"
                            overlayClassName="custom-overlay"
                        >
                            <div className="modal-content">
                                <div className="flex justify-end pt-5 px-8">
                                    <button
                                        className="close-button "
                                        onClick={() => setEditUserModalOpen(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="relative flex flex-col  rounded-lg border-gray-400 bg-white shadow-lg px-4">
                                        <div className="flex-auto p-6 mb-6">
                                            <div className=" flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                                <a
                                                    href=""
                                                    className="flex cursor-pointer items-center gap-2 text-black no-underline hover:text-gray-800"
                                                >
                                                    <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                                                        Update User
                                                    </span>
                                                </a>
                                            </div>

                                            <form className="" onSubmit={(e) => updateSubmitButton(e)} >
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your username..."
                                                        autoFocus=""
                                                        value={eUserName}
                                                        onChange={(e) => setEUserName(e.target.value)}
                                                    />
                                                    {error ? (
                                                        <div className="text-xs text-red-500">
                                                            {error.username}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your email..."
                                                        autoFocus=""
                                                        value={eEmail}
                                                        onChange={(e)=> setEEmail(e.target.value)}
                                                    />
                                                    {error ? (
                                                        <div className="text-xs text-red-500">
                                                            {error.email}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your Phone Number..."
                                                        autoFocus=""
                                                        value={ePhoneNumber}
                                                        onChange={(e)=> setEPhoneNumber(e.target.value)}
                                                    />
                                                    {error ? (
                                                        <div className="text-xs text-red-500">
                                                            {error.phone_number}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mt-6">
                                                    <button
                                                        className="grid w-full cursor-pointer select-none rounded-md border border-gray-400 bg-gray-800 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-gray-600 hover:bg-black hover:text-white focus:border-black focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        {/* modal for adding a new user  */}
                        <Modal
                            isOpen={addUserModalOpen}
                            className="custom-modall w-full sm:w-[30rem]"
                            overlayClassName="custom-overlay"
                        >
                            <div className="modal-content">
                                <div className="flex justify-end pt-5 px-8">
                                    <button
                                        className="close-button "
                                        onClick={() => setAddUserModalOpen(false)}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="relative flex flex-col  rounded-lg border-gray-400 bg-white shadow-lg px-4">
                                        <div className="flex-auto p-6 mb-6">
                                            <div className=" flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                                <a className="flex cursor-pointer items-center gap-2 text-black no-underline hover:text-gray-800">
                                                    <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                                                        Add New User
                                                    </span>
                                                </a>
                                            </div>

                                            <form
                                                className=""
                                                onSubmit={(e) => handleAddUserButton(e)}
                                            >
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your username..."
                                                        autoFocus=""
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                    {validation_errors ? (
                                                        <div className="text-xs text-red-500">
                                                            {validation_errors.username}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your email..."
                                                        autoFocus=""
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    {validation_errors ? (
                                                        <div className="text-xs text-red-500">
                                                            {validation_errors.email}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your Phone Number..."
                                                        autoFocus=""
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                    {validation_errors ? (
                                                        <div className="text-xs text-red-500">
                                                            {validation_errors.phone_number}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="text"
                                                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                                                    >
                                                        Password
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                                                        name="email-username"
                                                        placeholder="Enter your Password..."
                                                        autoFocus=""
                                                        autoComplete=""
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    {validation_errors ? (
                                                        <div className="text-xs text-red-500">
                                                            {validation_errors.password}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                        

                                                <div className="mt-6">
                                                    <button
                                                        className="grid w-full cursor-pointer select-none rounded-md border border-gray-400 bg-gray-800 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-gray-600 hover:bg-black hover:text-white focus:border-black focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                                        type="submit"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
