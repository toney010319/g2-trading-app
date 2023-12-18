import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {
        console.log('User Logged-in')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate('/dashboard')
    };

    const register = () => {
        navigate('/register')
    }
    
    // sample lang din to ah hahaha kayo na rin lang maglagay infos :D
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <span onClick={register}>Register</span>
        </div>
    );
}

export default Login;