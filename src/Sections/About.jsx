import React from "react";

function About() {
  return (
    <div
      className="h-[50vh] w-screen flex flex-col items-center justify-center"
      id="about"
    >
      <h1 className="text-white text-9xl font-bold">About</h1>
      <div className="w-7/10 backdrop-blur-3xl h-fit p-20 rounded-4xl">
        <p className="text-white text-3xl text-center">
          Welcome to Ticketizer, your one-stop platform for seamless event
          management and participation! Organizers can set up, manage, and track
          events with ease, while participants can discover, register, and get
          real-time updates. Everything you need for a flawless event
          experience, in one place!
        </p>
      </div>
    </div>
  );
}

export default About;
