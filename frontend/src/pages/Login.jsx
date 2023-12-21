import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo";
// eslint-disable-next-line react/prop-types
const Login = ({addAlert}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        loginUser()
        e.preventDefault();
        navigate('/dashboard')
        console.log(email, password, agreed)
        addAlert('success', 'You have successfully logged in')
    
    };

    const loginUser = async () => {
        const formData = {
            email: email,
            password: password,
            
        }
        try {
            const res = await axios.post('http://localhost:3000/api/v1/users/sign_in', formData)
            console.log(res.data)
        } catch (error) {
            console.log(error.response.data)
        }        
    }

    const handleRegister = () => {
        navigate('/register')
    }
    
    
    
    return (
    <>
    <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
        <div className="justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-azure-300 to-azure-700 m-2 p-5 pl-8 pr-8">
           <Logo />
            <div>
                <div className="flex flex-col">
                    <span className="flex justify-start mb-1 font-semibold">Email</span>
                    <input
                    className="rounded-sm"
                    type="email"
                    placeholder=" Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-1">
                    <span className="flex justify-start mb-1 font-semibold">Password</span>
                    <input
                    className="rounded-sm"
                    type="password"
                    placeholder=" Enter password"
                    onChange={(e) => setPassword(e.target.value)}
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
                <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" onClick={handleLogin}>Login</button>
                <button className="text-white px-2 py-1 bg-azure-500 rounded-md hover:bg-azure-700" onClick={handleRegister}>Register</button>
            </div>
            <div>
                <button className="flex justify-end w-full mt-2 text-sm text-blue-200 hover:text-blue-400 hover:underline">Forgot Password</button>
            </div>
        </div>
    </div>
    </>
    );
}

export default Login