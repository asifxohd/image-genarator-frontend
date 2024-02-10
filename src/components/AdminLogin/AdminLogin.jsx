

const AdminLogin = ()=> {

    return(
        <>
            <div className="h-screen bg-gray-50" >
                <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50">
                    <div className="relative">
                        
                        
                        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                            <div className="flex-auto p-6">
                                <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                    <a href="#" className="flex cursor-pointer items-center gap-2 text-black-500 no-underline hover:text-gray-500">
                                        <span className="flex-shrink-0 text-3xl font-black  tracking-tight ">
                                            Words Magic !!
                                            <br />
                                            <hr />
                                            <span className=" ml-9 text-2xl" >Admin Login</span>
                                        </span>
                                    </a>
                                </div>

                                <form  className="mb-4" action="#" method="POST">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                            Email or Username
                                        </label>
                                        <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your email or username" autoFocus="" />
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between">
                                            <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">
                                                Password
                                            </label>
                                            <a href="auth-forgot-password-basic.html" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                                            </a>
                                        </div>
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <input type="password" autoComplete="" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="············" />
                                        </div>
                                    </div>

                                    <div className="my-9 ">
                                        <button className="grid w-full cursor-pointer select-none rounded-md border border-black bg-black py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-gray-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                                <p className="h-6 text-center">
                            
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
