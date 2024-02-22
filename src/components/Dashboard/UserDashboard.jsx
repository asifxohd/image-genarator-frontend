import { Link, useNavigate } from "react-router-dom";
import "./dash.css";
import { useEffect, useState } from "react";
import { BASE_URL, fetchImageUrl } from "../../Features/Action";
import { useDispatch, useSelector } from "react-redux";

const UserDashBoard = () => {
    const [propmt, setprompt] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
	const { userData, is_superuser } = useSelector((store) => store.userLogin ||{});
    useEffect(()=>{
        if (is_superuser){
            navigate('../admin-dashboard/')
        }
    },[])

    const { loading, imageUrl } = useSelector((state) => state.fetchImage);
    return (
        <>
            <div className="bg-gray-50 h-screen">
                <div className="dash-navbar h-20 flex justify-between items-center border-b shadow-sm">
                    <div className="text-2xl  p-6 font-bold font-serif  text-gray-400 m-4">
                        {" "}
                        Words Magic !!
                    </div>
                    <div className="p-6 me-9">
                        <Link to={"../user-profile/"}>
                            <button
                                type="button"
                                className="relative flex rounded-full bg-gray-800 text-sm  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={  userData && userData.image ? (BASE_URL+userData.image) : ("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80")}
                                    alt=""
                                />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="image-openAi flex justify-center mt-8">
                    <div className="h-96 flex justify-center items-center">
                        {loading ? (
                            <div className="loaderr-container mt-10">
                                <div className="loaderr"></div>
                                <div className="loaderr-text font-mono font-thin ml-6 ">
                                    Loading...
                                </div>
                            </div>
                        ) : imageUrl ? (
                            <img className="h-[130%] mt-20" src={imageUrl} alt="" />
                        ) : (
                            <div className="text-center text-lg font-thin font-mono text-gray-700 ">
                                Welcome to our image generation tool! Enter a prompt below and
                                we'll create a unique image <br />
                                based on your input. Whether it's a description, a phrase, or a
                                concept, our AI will bring it to <br />
                                life visually. Let your imagination run wild and see what
                                amazing images you can create!
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        className="mx-auto mt-28 focus:border-indigo-500 border relative bg-white min-w-sm max-w-4xl flex flex-col md:flex-row items-center justify-center  py-1 px-2 rounded-2xl gap-2 shadow-2xl"
                        htmlFor="search-bar"
                    >
                        <input
                            onChange={(e) => setprompt(e.target.value)}
                            id="search-bar"
                            placeholder="your keyword here"
                            className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                        />
                        <button onClick={() => dispatch(fetchImageUrl(propmt))} className="w-full md:w-auto px-4 py-1 bg-indigo-500 border-indigo-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                            <div className="relative">
                                <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg
                                        className="opacity-0 animate-spin w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    
                                    className="flex items-center transition-all opacity-1 valid:"
                                >
                                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                        {" "}
                                        Genarate{" "}
                                    </span>
                                </div>
                            </div>
                        </button>
                    </label>
                </div>
            </div>
        </>
    );
};

export default UserDashBoard;
