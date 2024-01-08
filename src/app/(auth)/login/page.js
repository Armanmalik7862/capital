"use client";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
//import { logIn } from '@/services/login/index';
// import Cookies from "js-cookie";
// import { GlobalContext } from "@/context/index";
import axios from "axios";

const initialFormdata = {
  email: "",
  password: "",
};

function LoginForm() {
  const router = useRouter();
  const [state, setstate] = useState(initialFormdata);
  // const { isAuthUser, setIsAuthUser, userInfo, setUserInfo } =
  //   useContext(GlobalContext);

  const inputEvent = (event) => {
    const { name, value } = event.target;

    setstate((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  function isValidForm() {
    return state &&
      state.email &&
      state.email.trim() !== "" &&
      state.password &&
      state.password.trim() !== ""
      ? true
      : false;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make the API call directly using Axios
      const response = await axios.post("/api/auth/login", state);
      const res = response.data;

      // const res = await logIn(state);
      //console.log(res);

      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        await signIn("credentials",{
          email: state.email,
          password: state.password,
          callbackUrl:"/",
          redirect: true,
          onSuccess: async () => {
            // Delay the redirection to give time for the user to see the toast message
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.push("/");
          },
        })
        } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


 

  return (
    <>
      <div className=" flex items-center justify-center mt-5 overflow-hidden">
        <div className="flex flex-col items-center justify-center w-[25em] h-[30em] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-7">LogIn Here</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mt-2 flex items-center justify-center flex-col ">
              <label htmlFor="email" className="text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={inputEvent}
                value={state.email}
                placeholder="Enter your Email"
                required
                autoComplete="email"
                className="mt-2 p-2  border-[1px] border-zinc-600 rounded-md pl-2"
              />
            </div>
            <div className="mt-2 flex items-center justify-center flex-col ">
              <label htmlFor="password" className="text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={inputEvent}
                value={state.password}
                placeholder="Enter your password"
                required
                autoComplete="password"
                className="mt-2 p-2  border-[1px] border-zinc-600 rounded-md pl-2"
              />
            </div>

            <div className="mt-7 flex items-center justify-center flex-col ">
              <button
                disabled={!isValidForm()}
                type="submit"
                className="disabled:opacity-50 text-white bg-black/70 w-[6em] border-[1px] border-black rounded-md active:bg-black"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center flex-col">
            <div className="mt-7 flex items-center flex-col ">
              <label>Don't have a account?</label>
              <Link
                href="/register"
                className="mt-2 px-3 p-1 text-white bg-black/70 w-[6em] h-[2em] border-[1px] border-black rounded-md active:bg-black"
              >
                SingnUp
              </Link>
            </div>
            <div className="mt-3 flex flex-col">
              <label>Forget Password</label>
              <Link
                href="/forget"
                className="mt-2 px-3 p-1 text-white bg-black/70 w-[10em] h-[2em] border-[1px] border-black rounded-md active:bg-black"
              >
                forget_password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;





