import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
import useAuth from "../context/hooks/useAuth";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const Login = ({ addAlert }) => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth()
  const handleRegister = () => {
    navigate("/register");
  };
  const loginUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const user = {
      user: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };

    const axiosConfig = {
      headers: {
        Authorization: '',
      },
    };

    try {
      const res = await axios.post("https://stellarmarkets-e9ba8be437a0.herokuapp.com/login", user, axiosConfig);
      const role = res?.data?.data?.role;

      setAuth({ role: [role] });
      return res;
    } catch (error) {
      return error;
    }
  };


  return (
    <>
      <div className="flex flex-col justify-center items-center align-center content-center w-screen h-screen">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const res = await loginUser(event)
            if (res.status == "200" && res.data.data.role === "Trader") {
              const token = res.headers.authorization;
              const user_id = res.data.data.id;
              document.cookie = `token=${token};path=/`;
              document.cookie = `user_id=${user_id};path=/`;
              addAlert("success", res.data.message);
              navigate("/dashboard");
            } else if (res.status == "200" && res.data.data.role == "Admin") {
              const token = res.headers.authorization;
              const user_id = res.data.data.id;
              document.cookie = `token=${token};path=/`;
              document.cookie = `user_id=${user_id};path=/`;
              addAlert("success", res.data.message);
              navigate("/admin");
            } else {
              addAlert("error", res.response?.data);
              navigate("/");

            }
          }}
          className="justify-center text-center align-center shadow-md border-md rounded-md  bg-gradient-to-b from-gray-300 to-gray-700 m-2 p-5 pl-8 pr-8"
        >
          <Logo />
          <div>
            <div className="flex flex-col">
              <span className="flex justify-start mb-1 font-semibold">
                Email
              </span>
              <input
                className="rounded-sm border-2 border-gray-200 focus:outline-none focus:border-black focus:ring-black placeholder:italic"
                type="email"
                placeholder=" Enter email"
                name="email"
              />
            </div>
            <div className="flex flex-col mt-1">
              <span className="flex justify-start mb-1 font-semibold ">
                Password
              </span>
              <input
                className="rounded-sm border-2 border-gray-200 focus:outline-none focus:border-black focus:ring-black placeholder:italic"
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
            <button
              className="text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950 duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
            <button
              className="text-white px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-950 duration-300 ease-in-out"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <div>
            <button className="flex justify-end w-full mt-2 text-sm hover:underline underline-offset-4">
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
