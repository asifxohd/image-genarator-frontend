

const UserInfoModalForm = () => {
    return(
        <>
            <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                        <div className="flex-auto p-6">
                            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                                    <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                                        Edit User Details
                                    </span>
                                </a>
                            </div>
                           
                            <form  className="mb-4" action="#" method="POST">
                                <div className="mb-3">
                                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Username
                                    </label>
                                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your username..." autoFocus=""/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Email
                                    </label>
                                    <input type="email" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your email..." autoFocus=""/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Phone Number
                                    </label>
                                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your Phone Number..." autoFocus=""/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Password
                                    </label>
                                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your Password..." autoFocus=""/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Confirm Password..." autoFocus=""/>
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