import { Link } from 'react-router-dom';
import './dash.css'

const UserDashBoard = () => {

    return (
        <>
            <div className='bg-gray-50 h-screen' >
                <div className="dash-navbar h-20 flex justify-between items-center border-b shadow-sm" >
                <div className="text-2xl  p-6 font-bold font-serif  text-gray-400 m-4">  Words Magic !!</div>
                    <div className='p-6 me-9' >
                        <Link to={"../user-profile/"} >
                            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="image-openAi flex justify-center mt-8">
                    <img className="h-96" src="https://1.bp.blogspot.com/-naAQ8gqK6XA/X2VaIOVjegI/AAAAAAAA71c/7gS6WW7STvwhMjoepkJZwLxY_sKb2r8xQCLcBGAsYHQ/s2048/anonymous_human_hood_185754_2560x1440.jpg" alt="" />
                </div>
                <div>
                    <label className="mx-auto mt-24  focus:border-indigo-500 border relative bg-white min-w-sm max-w-4xl flex flex-col md:flex-row items-center justify-center  py-1 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-indigo-300" htmlFor="search-bar">
                        <input id="search-bar" placeholder="your keyword here" className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
                        <button className="w-full md:w-auto px-4 py-1 bg-indigo-500 border-indigo-500 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                            <div className="relative">
                                <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <div className="flex items-center transition-all opacity-1 valid:">
                                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto"> Genarate </span>
                                </div>
                            </div>
                        </button>
                    </label>
                </div>
            </div>
        </>
    );
}


export default UserDashBoard