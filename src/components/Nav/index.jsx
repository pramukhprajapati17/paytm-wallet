import React from 'react'

const Nav = () => {
  return (
    <div className="flex items-center bg h-5 p-2">
        <a href="/" className='w-50 justify-center flex'><img src="" alt="Logo" /></a>
        <div className='flex items-center justify-end w-50 p-2'>  
          <a href="/Login" className='m-5 text-none text-black p-2'>Login</a>
          <a href="/Register" className='bg-secondary text-none rounded text-white p-1'>Signup</a>
        </div>
    </div>

  )
}

export default Nav;