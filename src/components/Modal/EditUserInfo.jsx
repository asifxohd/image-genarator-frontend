import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Features/Action";
import { fetchUserData } from "../../Features/userLoginSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const UserInfoModalForm = ({setIsModalOpen}) => {

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    
    const { userData } = useSelector((store) => store.userLogin);
    useEffect(()=> {
        setUsername(userData.username)
        setPhoneNumber(userData.phone_number)

    }, [])
    
    const data = {
        ...userData,
        username: username,
        password:password,
        phone_number:phoneNumber,
    }

    const handleUpdateButton = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}api/users/update-user-info/`, data);
            Cookies.set("authTokens", JSON.stringify(data));
            toast.success("Data updated successfully");
            dispatch(fetchUserData());
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <>
            <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                <div className="flex-auto p-6">
                    <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                        <a className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                            <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                                Edit User Details
                            </span>
                        </a>
                    </div>
                    <form className="mb-4" onSubmit={(e) => handleUpdateButton(e)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                Username
                            </label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="username" value={username} placeholder={userData ? userData.username:''} autoFocus="" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                Phone Number
                            </label>
                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="phoneNumber" value={phoneNumber}  placeholder={userData ? userData.phone_number:''} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                Password
                            </label>
                            <input autoComplete="" onChange={(e) => setPassword(e.target.value)} type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" value={password}placeholder="Enter your Password..." />
                        </div>
                        
                        <div className="mb-3">
                            <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-400 bg-indigo-400 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UserInfoModalForm;
