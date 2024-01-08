'use client'

import { SessionProvider } from 'next-auth/react'


export const NextSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
