"use client";
import { index } from "@/navigation/index";
import Logo from "./Logo";
import { UserRound, LogOut, X  } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useContext } from "react";
import {signOut, useSession} from "next-auth/react";
//import { GlobalContext } from "@/context/index";
//import Cookies from "js-cookie";

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginMenuOpen, setLoginMenu] = useState(false);
  const { data: session } = useSession();

  //const { isAuthUser, setIsAuthUser, userInfo, setUserInfo } =
   // useContext(GlobalContext);
    //console.log(userInfo);

  const NavItem = ({ item }) => (
    <Link href={item.href} key={item._id}>
      <li
        className={`hover:text-black cursor-pointer duration-200 relative overflow-hidden group ${
          item.href === pathname && "text-red-600"
        }`}
      >
        {item.title}
      </li>
    </Link>
  );

  const handleLoginMenu = () => {
    setLoginMenu(!isLoginMenuOpen);
  };

  const handleLogout = async() => {
    try {
      await signOut({ callbackUrl: "/login", redirect: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  const handleCloseMenu = () => {
    setLoginMenu(false);
  }
  //console.log(session);

  return (
    <div className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600 sticky top-0 z-50">
      <div className="px-4 flex justify-between items-center overflow-hidden">
        <Logo />
        <ul className="hidden md:flex items-center gap-10 pl-[39rem]">
          {index.map((items) => (
            <NavItem key={items._id} item={items} />
          ))}
        </ul>

        <div className="flex items-center">
          {session ? (  // Check if user is authenticated
            <div className="flex items-center overflow-hidden">
            { session.user && session.user.email? ( 
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-24">
                <span className="text-white">
                {session.user.email.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : null} 
              <div className="flex items-center">
                <button className="hover:bg-black cursor-pointer duration-200">
                  <LogOut
                    onClick={handleLogout}
                    className="w-8 h-8 fixed top-4 right-10  active:bg-slate-300 active:rounded-md"
                  />
                </button>
              </div>
            </div>
           ) : ( 
            <button className="hover:bg-black cursor-pointer duration-200">
              <UserRound
                onClick={handleLoginMenu}
                className="w-8 h-8 fixed top-4 right-10  active:bg-slate-300 active:rounded-md"
              />
            </button>
          )} 
        </div>
      </div>

       {/* always keep the card in main div only */}
       {isLoginMenuOpen && (
        <div className="mt-1 w-[7rem] h-[7rem] float-end mr-1 rounded-md border-[1px] shadow-lg z-50 ">
          <button
            className="absolute top-[5.5rem] right-2 text-gray-500 hover:text-black cursor-pointer rounded-md border-[1px] shadow-lg z-50"
            onClick={handleCloseMenu}
          >
            <X />
          </button>
          <div className="pt-[2rem] flex items-center flex-col gap-2 ">
            <Link href="/register">SignUp</Link>
            <Link href="/login">LogIn</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
