
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

const Layout = ({children}) => {
   
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    {/* <h1 className='text-center text-2xl font-bold my-2'>Recruiter Labs</h1> */}
   <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
    {children}
   </GoogleOAuthProvider>
    </div>
  </div>
  )
}

export default Layout