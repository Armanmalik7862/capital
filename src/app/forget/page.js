"use client";
import { useState} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import  Link  from 'next/link';







function LoginForm() {
  const router = useRouter();
  const [state, setstate] = useState({
    email:""
  });
  


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
    toast.success("Submitted Successfully");
    // Reset form fields to empty after submission
    setstate({
     email: "",
   });
    
    
    
  };
 


  return (
    <>
    <div className=" flex items-center justify-center mt-5 overflow-hidden">
    <div className="flex flex-col items-center justify-center w-[25em] h-[15em] rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold ">Forget Password Here</h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mt-2 flex flex-col">
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
            className="mt-2 p-2 border-[1px] border-zinc-600 rounded-md pl-2"
          />
        </div>

        <div className="mt-7 flex items-center justify-center flex-col">
          <button
            type="submit"
            className="disabled:opacity-50 text-white bg-black/70 w-[6em] border-[1px] border-black rounded-md active:bg-black"
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

export default LoginForm;
