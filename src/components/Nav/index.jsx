import React from 'react'

const Nav = () => {
  return (
    <header className="bg-primary text-white flex justify-between items-center p-2">
        <a href="/" className="text-none"><strong className="text-white font-bold f-30">
          Wallet<span className="text-secondary">App</span>
        </strong></a>
        <div className="flex gap-2">
          <a href="/Login"><button className="bg-secondary text-white p-1 rounded hover:bg-third">
            Log In
          </button></a>
          <a href="/Register"><button className="bg-secondary text-white p-1 rounded hover:bg-third">
            Sign Up
          </button></a>
        </div>
      </header>

  )
}

export default Nav;