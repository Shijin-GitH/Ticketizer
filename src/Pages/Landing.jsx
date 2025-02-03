import React from 'react'
import Navbar from '../Components/Navbar'
import Home from '../Sections/Home'
import About from '../Sections/About'

function Landing() {
  return (
    <div className='w-screen z-50 h-screen scrollbar-none'>
      <Navbar />
      <Home />
      <About />
    </div>
  )
}

export default Landing
