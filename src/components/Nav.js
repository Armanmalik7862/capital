"use client";
import { index } from "@/navigation/index";
import Logo from "./Logo";
import { UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { useState } from "react";
import login from '@/components/Login';

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginMenuOpen, setLoginMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Assuming you have a way to determine user login status



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

  const handleLogout = () => {
  // Add your logout logic here
   setIsAuthUser(false);
   setUserInfo(null);
   Cookies.remove('token');
   localStorage.clear();
   router.push('/signup')


    setIsLoggedIn(false);
    
  };

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
          <button className="hover:bg-black cursor-pointer duration-200">
            {isLoggedIn ? (
              // Render LogOut button if user is logged in
              <LogOut 
                onClick={handleLogout}  // Replace with your logout logic
                className="w-8 h-8 fixed top-4 right-10  active:bg-slate-300 active:rounded-md"
              />
            ) : (
              // Render UserRound if user is not logged in
              <UserRound
                onClick={handleLoginMenu}
                className="w-8 h-8 fixed top-4 right-10  active:bg-slate-300 active:rounded-md"
              />
            )}
          </button>
        </div>      
      </div>
     
      {/* always keep the card in main div only */}
      {isLoginMenuOpen && (
        <div className="mt-1 w-[7rem] h-[7rem] float-end mr-1 rounded-md border-[1px] shadow-lg z-50 ">
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
