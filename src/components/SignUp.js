"use client";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
//import { registerNewUser } from '@/services/register/index';
import { GlobalContext } from "@/context/index";
import axios from 'axios';

function SignupForm() {
  const router = useRouter();
  const [state, setstate] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const { isAuthUser } =
  useContext(GlobalContext);



  const inputEvent = (event) => {
    const { name, value } = event.target;

    setstate((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const res = await axios.post("/api/users/register", state);
      const response = res.data;
      
      if (response.success) {
        toast.success(response.message, { position: 'top-center' });

        // Reset form fields to empty after successful submission
        setstate({
          username: '',
          email: '',
          password: '',
          phone: '',
        });
        // Redirect to login page after successful submission
        router.push('/login');
      } else {
        toast.error(response.message, { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed', { position: 'top-center' });
    }
  };
  
  //if user is  Authenticated or loggedin then can't redirect to signup page
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);



  return (
    <>
      <div className=" flex items-center justify-center mt-5 overflow-hidden">
        <div className="flex flex-col items-center justify-center w-[25em] h-[30em] rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-7">Register Here</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mt-2 flex items-center justify-center flex-col ">
              <label htmlFor="username" className="text-black">
                UserName
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={inputEvent}
                value={state.username}
                placeholder="Enter your Username"
                required
                autoComplete="username"
                className="mt-2 p-2 border-[1px] border-zinc-600 rounded-md pl-2  "
              />
            </div>
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
                type="text"
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
            <div className="mt-2 flex items-center justify-center flex-col ">
              <label htmlFor="phone" className="text-black">
                Phone no.
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={inputEvent}
                value={state.phone}
                placeholder="Enter your Phone number"
                required
                autoComplete="off"
                className="mt-2 p-2  border-[1px] border-zinc-600 rounded-md pl-2"
              />
            </div>
            <div className="mt-7 flex items-center justify-center flex-col ">
            <button
            type="submit"
            className=" text-white bg-black/70 w-[6em] border-[1px] border-black rounded-md active:bg-black"
          >
            Submit
          </button>
          </div>
          </form>
          
        </div>
      </div>
    </>
  );
}

export default SignupForm;
