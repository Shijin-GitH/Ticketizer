import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from "../assets/banner.png"

function EventCard() {
  return (
    <img src={Banner} className='w-[75vw] rounded-3xl' alt="" />
  )
}


function ExploreEvents() {
  return (
    <div className='w-screen h-screen flex flex-col items-center z-50'>
      <Navbar />
      <div className='mt-40 flex flex-col items-center'>
        <h1 className='text-white text-9xl font-bold'>Events</h1>
        <div className="flex flex-col gap-10">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  )
}

export default ExploreEvents
