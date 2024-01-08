import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from '@/helper/db';
import User from '@/models/user';



export const authOptions = {
  pages: {
    signIn: '/login'
  },
  // session: {
  //   strategy: 'jwt'
  // },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign in",
     
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter Your UserName" },
        email: {label: "Email", type: "email", placeholder: "Enter Your Email"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        connectDb();
        const user = await User.findOne({email: credentials?.email})
      
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ]

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }