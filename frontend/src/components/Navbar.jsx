import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <div className='border py-1.5 px-3 flex items-center '>
        <Link to="/" className='text-blue-400 font-bold text-2xl font-mono ml-8'>Home</Link>
        <Link to="/Menu" className='text-blue-400 font-bold text-2xl font-mono ml-8'>Menu</Link>
        <Link to="/Login" className='text-blue-400 font-bold text-2xl font-mono  ml-8'>Wallet</Link>
        <Link to="/Wallet" className='text-blue-400 font-bold text-2xl font-mono  ml-8'>Login/SignUp</Link>

    </div>
  )
}

export default Navbar