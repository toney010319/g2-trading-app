import { useState } from "react";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
       `API HERE`
    };

    //kayo nalang din maglagay ng mga infos :D
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
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