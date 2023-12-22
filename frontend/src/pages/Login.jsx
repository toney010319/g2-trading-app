import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
import Logo from "../assets/Logo";
import { loginUser } from "../lib/api";
// eslint-disable-next-line react/prop-types
const Login = ({addAlert}) => {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    

   

    const handleRegister = () => {
        navigate('/register')
    }
    
    
    
    return (
    <>
    <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
        <form onSubmit={async(event) => {
                    event.preventDefault()
                    const data = await loginUser(event)
                    console.log(data)
                    if(data.statusText !== "OK"){
                        addAlert('error', data.error)
                        navigate('/')
                    }
                    else{
                        addAlert('success', 'You have successfully registered')
                       navigate('dashboard')
                    }
                    }} 
        className="justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-azure-300 to-azure-700 m-2 p-5 pl-8 pr-8">
           <Logo />
            <div>
                <div className="flex flex-col">
                    <span className="flex justify-start mb-1 font-semibold">Email</span>
                    <input
                    className="rounded-sm"
                    type="email"
                    placeholder=" Enter email"
                   name="email"
                    />
                </div>
                <div className="flex flex-col mt-1">
                    <span className="flex justify-start mb-1 font-semibold">Password</span>
                    <input
                    className="rounded-sm"
                    type="password"
                    placeholder=" Enter password"
                   name="password"
                    />
                </div>
            </div>

            <div className="flex mt-1">
                <input
                className="rounded-sm"
                type="checkbox"
                onChange={(e) => setAgreed(e.target.value)}
                />
                <span className="flex justify-start ml-1 text-sm">Remember me</span>
            </div>

            <div className="flex flex-row justify-center gap-4 mt-2">
                <button  className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" type="submit">Login</button>
                <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" onClick={handleRegister}>Register</button>
            </div>
            <div>
                <button className="flex justify-end w-full mt-2 text-sm text-blue-200 hover:text-blue-400 hover:underline">Forgot Password</button>
            </div>
        </form>
    </div>
    </>
    );
}

export default Login 