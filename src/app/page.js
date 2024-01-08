


// // homepage.js
// 'use client'
// import { useContext } from 'react';
// import { GlobalContext } from '@/context';

// export default function Home() {
//   const { isAuthUser } = useContext(GlobalContext);

//   return (
//     <>
//       <h1>Home page</h1>
//       {isAuthUser ? (
//         <p>User is logged in.</p>
//       ) : (
//         <p>User is not logged in.</p>
//       )}
//     </>
//   );
// }


import {getServerSession} from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import {redirect} from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session){
      redirect("/login")
  }

  return (
    <>
      <h1>Home page</h1>
   
        <p>User is logged in.{JSON.stringify(session)}</p>
    
        <p>User is not logged in.</p>
   </>
  );
}