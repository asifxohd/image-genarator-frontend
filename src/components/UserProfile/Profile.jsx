
import { useState, useEffect } from 'react';
import './profile.css'
import Modal from 'react-modal';
import UserInfoModalForm from '../Modal/EditUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Features/userLoginSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { is_authenticated } = useSelector((state) => state.userLogin);

    useEffect(()=>{
        if(!is_authenticated){
            navigate('/')
            toast.error("Logout is Success!")
        }
    },[is_authenticated])

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    return (
        <>
            <div className="h-screen  flex justify-center items-center bg-gray-50">
                <div className="h-[80%] md:w-[70%] w-[99%] bg-gray-100 relative flex" >
                    <div className=" left-porttion md:w-[40%] h-full bg-indigo-100" >
                        <img className="absolute w-52 h-72 ml-56 mt-32 hover:opacity-75 transition-opacity duration-300 " src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="" />
                    </div>
                    <div className="right-portion w-[70%] h-full flex flex-col justify-center items-center ml-20" >
                        <div>
                            <h1 className="font-serif font-bold text-4xl">USER NAME</h1>
                        </div>
                        <div className="font-serif mt-2 font-bold text-2xl email-info">
                            email
                        </div>
                        <div className="font-serif font-bold text-2xl phone-number-info">
                            9207850084
                        </div>
                    </div>

                    <div className='p-10 flex'>
                        <button onClick={() => setIsModalOpen(true)} className="edit-button ">
                            <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                        </button>
                        <button onClick={(e)=> dispatch(logoutUser())} className=" ml-2 Btn">
                            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                            <div className="text">Logout</div>
                        </button>
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        contentLabel="Edit Modal"
                        style={{
                            content: {
                                width: "40%",
                                height: "95%",
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 'auto',
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                border: '0px'
                            },
                            overlay: {
                                backgroundColor: '#ffffff',
                            },
                        }}
                    >
                        <div className='flex w-full justify-end' >
                            <button onClick={() => setIsModalOpen(false)} type="button" className="bg-white  rounded-md  inline-flex items-center justify-end text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"> <span className="sr-only">Close menu</span> <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> </svg> </button>
                        </div>
                        <UserInfoModalForm />

                    </Modal>

                </div>
            </div>
        </>
    );
}

export default Profile;