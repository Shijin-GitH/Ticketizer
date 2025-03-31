"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function EventLanding() {
  const [eventDetails, setEventDetails] = useState({});
  const [contacts, setContacts] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [bankDetails, setBankDetails] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details from sessionStorage
    const storedEventDetails = sessionStorage.getItem("eventDetails");
    if (storedEventDetails) {
      setEventDetails(JSON.parse(storedEventDetails));
    } else {
      // Default event details if none are found
      setEventDetails({
        name: "Prathidhwani Premier League (PPL) - Cricket Tournament",
        description:
          "Join us for an exhilarating season of cricket with the Prathidhwani Premier League, where IT professionals from across Kochi come together to showcase their cricketing prowess. Dive into the competitive spirit of the game and enjoy a series of matches designed to test your skills and teamwork.",
        startDate: "2025-05-10",
        startTime: "08:14",
        endDate: "2025-05-11",
        endTime: "10:14",
        location: "Golden Eye Cricket Ground, Kochi, Kerala, India",
        coordinates: { lat: 9.9312, lng: 76.2673 },
        method: "In Person",
        privacyType: "Public",
        logo: sessionStorage.getItem("eventLogo") || null,
        organizer: "Prathidhwani Kerala",
        attendees: 116,
        maxAttendees: 200,
        venue: {
          name: "Golden Eye Cricket Ground",
          address: "Kochi, Kerala, India",
          coordinates: { lat: 9.9312, lng: 76.2673 },
        },
      });
    }

    // Fetch contacts from sessionStorage
    const storedContacts = sessionStorage.getItem("eventContacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }

    // Fetch terms and conditions from sessionStorage
    const storedTerms = sessionStorage.getItem("termsAndConditions");
    if (storedTerms) {
      setTermsAndConditions(JSON.parse(storedTerms));
    }

    // Fetch bank details from sessionStorage
    const storedBankDetails = sessionStorage.getItem("bankDetails");
    if (storedBankDetails) {
      setBankDetails(JSON.parse(storedBankDetails));
    }
  }, []);

  const handleRegister = () => {
    navigate("/register");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen z-50 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Banner */}
      <div className="pt-16">
        <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
          {eventDetails.logo ? (
            <img
              src={eventDetails.logo || "/placeholder.svg"}
              alt={eventDetails.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {eventDetails.name}
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Organized by {eventDetails.organizer}
              </p>
              <button
                className="px-8 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] text-lg"
                onClick={handleRegister}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-gray-900 rounded-lg p-6 mb-8 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-6">
              <div className="text-gray-400 text-sm">Date & Time</div>
              <div className="flex items-center mt-1">
                <FaCalendarAlt className="text-[#90FF00] mr-2" />
                <span>
                  {formatDate(eventDetails.startDate)}
                  {eventDetails.startDate !== eventDetails.endDate &&
                    ` - ${formatDate(eventDetails.endDate)}`}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <FaClock className="text-[#90FF00] mr-2" />
                <span>
                  {eventDetails.startTime} - {eventDetails.endTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 mr-4"
              onClick={() =>
                window.open(
                  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    eventDetails.name
                  )}&dates=${encodeURIComponent(
                    eventDetails.startDate
                  )}/${encodeURIComponent(
                    eventDetails.endDate
                  )}&details=${encodeURIComponent(
                    eventDetails.description
                  )}&location=${encodeURIComponent(eventDetails.location)}`,
                  "_blank"
                )
              }
            >
              <FaCalendarAlt className="mr-2" /> Add to Calendar
            </button>
            <button
              className="px-6 py-2 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "overview"
                  ? "text-[#90FF00] border-b-2 border-[#90FF00]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "description"
                  ? "text-[#90FF00] border-b-2 border-[#90FF00]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "contact"
                  ? "text-[#90FF00] border-b-2 border-[#90FF00]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("contact")}
            >
              Contact Us
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "terms"
                  ? "text-[#90FF00] border-b-2 border-[#90FF00]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("terms")}
            >
              Terms And Conditions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaCalendarAlt className="mr-2 text-[#90FF00]" /> Event
                    Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaCalendarAlt className="mt-1 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-400">
                          {formatDate(eventDetails.startDate)}
                          {eventDetails.startDate !== eventDetails.endDate &&
                            ` - ${formatDate(eventDetails.endDate)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaClock className="mt-1 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-400">
                          {eventDetails.startTime} - {eventDetails.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-400">{eventDetails.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaUsers className="mt-1 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-gray-400">
                          {eventDetails.attendees} / {eventDetails.maxAttendees}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaTicketAlt className="mr-2 text-[#90FF00]" /> Tickets
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <p className="font-medium">IAS / WIE Members</p>
                        <p className="text-gray-400">₹ 849</p>
                      </div>
                      <div className="text-sm text-gray-400">29 remaining</div>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <p className="font-medium">IEEE Members</p>
                        <p className="text-gray-400">₹ 969</p>
                      </div>
                      <div className="text-sm text-gray-400">92 remaining</div>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <p className="font-medium">Non-IEEE Members</p>
                        <p className="text-gray-400">₹ 1289</p>
                      </div>
                      <div className="text-sm text-gray-400">73 remaining</div>
                    </div>
                  </div>
                  <button
                    className="w-full mt-6 px-6 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                    onClick={handleRegister}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              {/* Venue Map */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-10">
                <h3 className="text-xl font-semibold mb-4">Venue</h3>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      eventDetails.location
                    )}`}
                    className="w-full h-80 rounded-lg"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
                <p className="text-gray-300">{eventDetails.venue?.name}</p>
                <p className="text-gray-400">{eventDetails.venue?.address}</p>
              </div>

              {/* Organizer */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-10">
                <h3 className="text-xl font-semibold mb-4">Organized by</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <FaUserCircle className="text-gray-300 text-3xl" />
                  </div>
                  <div>
                    <p className="font-medium">{eventDetails.organizer}</p>
                    <p className="text-gray-400 text-sm">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "description" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div
                className="text-gray-300 mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: eventDetails.description }}
              ></div>
            </div>
          )}

          {activeTab === "contact" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                Have questions about the event? Reach out to our team members
                below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-gray-900 p-6 rounded-lg border border-gray-800"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                        <FaUserCircle className="text-gray-300 text-3xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-gray-400 text-sm">{contact.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FaEnvelope className="text-[#90FF00] mr-3" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-300 hover:text-[#90FF00]"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="text-[#90FF00] mr-3" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-gray-300 hover:text-[#90FF00]"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {contacts.length === 0 && (
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center mb-10">
                  <p className="text-gray-400">
                    No contact information available.
                  </p>
                </div>
              )}

              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-10">
                <h3 className="text-xl font-semibold mb-4">
                  Send us a message
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Terms and Conditions
              </h2>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                {termsAndConditions.length > 0 ? (
                  <div className="space-y-6">
                    {termsAndConditions.map((section, index) => (
                      <div key={section.id}>
                        <h3 className="text-xl font-semibold mb-2">
                          {index + 1}. {section.title}
                        </h3>
                        <div
                          className="text-gray-300"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        ></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>
                      No terms and conditions have been specified for this
                      event.
                    </p>
                  </div>
                )}

                {bankDetails && bankDetails.accountName && (
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-xl font-semibold mb-4">
                      Payment Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Account Name:</span>{" "}
                        {bankDetails.accountName}
                      </p>
                      <p>
                        <span className="text-gray-400">Account Number:</span>{" "}
                        {bankDetails.accountNumber}
                      </p>
                      <p>
                        <span className="text-gray-400">IFSC Code:</span>{" "}
                        {bankDetails.ifscCode}
                      </p>
                      <p>
                        <span className="text-gray-400">Bank Name:</span>{" "}
                        {bankDetails.bankName}
                      </p>
                      <p>
                        <span className="text-gray-400">Branch:</span>{" "}
                        {bankDetails.branchName}
                      </p>
                      {bankDetails.upiId && (
                        <p>
                          <span className="text-gray-400">UPI ID:</span>{" "}
                          {bankDetails.upiId}
                        </p>
                      )}
                    </div>

                    {bankDetails.paymentInstructions && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <p className="text-yellow-400 font-medium">
                          Payment Instructions:
                        </p>
                        <p className="text-gray-300 mt-2">
                          {bankDetails.paymentInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default EventLanding;
