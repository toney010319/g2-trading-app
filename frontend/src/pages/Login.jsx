import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { login } = `APIHERE`
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };
    
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
        </div>
    );
    }

export default Login;