
import React from 'react'

const Layout = ({children}) => {
   
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    {/* <h1 className='text-center text-2xl font-bold my-2'>Recruiter Labs</h1> */}
    {children}
    </div>
  </div>
  )
}

export default Layout