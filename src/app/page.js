


// homepage.js
'use client'
import { useContext } from 'react';
import { GlobalContext } from '@/context';

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  return (
    <>
      <h1>Home page</h1>
      {isAuthUser ? (
        <p>User is logged in.</p>
      ) : (
        <p>User is not logged in.</p>
      )}
    </>
  );
}
