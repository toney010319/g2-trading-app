import { useState } from "react";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    //kayo nalang din maglagay ng mga infos :D
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    Email
                    <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
    }

export default Registration;