import { useState } from "react"
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUsers } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Logo from "../../assets/Logo.svg"
import Navbar from "../../Components/Navbar"

function EventLanding() {
  const [eventDetails, setEventDetails] = useState({
    name: "aanga",
    description:
      "Join us for an exciting workshop on the latest technologies and innovations. Network with industry professionals and gain valuable insights.",
    startDate: "2025-04-15",
    startTime: "09:00",
    endDate: "2025-04-16",
    endTime: "17:00",
    location: "Virtual Event",
    method: "Virtual",
    logo: sessionStorage.getItem("eventLogo") || null,
    organizer: "IEEE Student Branch",
    attendees: 116,
    maxAttendees: 200,
  })

  const [tickets, setTickets] = useState([
    {
      id: 4,
      name: "IAS / WIE Members",
      price: "₹ 849",
      quantity: 100,
      sold: 71,
      available: true,
    },
    {
      id: 5,
      name: "IEEE Members",
      price: "₹ 969",
      quantity: 100,
      sold: 8,
      available: true,
    },
    {
      id: 6,
      name: "Non-IEEE Members",
      price: "₹ 1289",
      quantity: 100,
      sold: 27,
      available: true,
    },
  ])

  const navigate = useNavigate()

  const handleRegister = () => {
    navigate("/register")
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen z-50 text-white">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <div className="h-80 flex items-center justify-center">
          {eventDetails.logo ? (
            <img
              src={eventDetails.logo || "/placeholder.svg"}
              alt={eventDetails.name}
              className="h-full object-contain"
            />
          ) : (
            <div className="text-6xl font-bold text-[#90FF00]">{eventDetails.name}</div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20"></div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{eventDetails.name}</h1>
          <p className="text-gray-300 mb-8">{eventDetails.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-900 z-50 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-[#90FF00]" /> Event Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaCalendarAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-400">
                      {formatDate(eventDetails.startDate)}
                      {eventDetails.startDate !== eventDetails.endDate && ` - ${formatDate(eventDetails.endDate)}`}
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

            <div className="bg-gray-900 z-50 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaTicketAlt className="mr-2 text-[#90FF00]" /> Tickets
              </h2>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-gray-400">{ticket.price}</p>
                    </div>
                    <div className="text-sm text-gray-400">{ticket.quantity - ticket.sold} remaining</div>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-6 px-6 py-3 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                onClick={handleRegister}
              >
                Register Now
              </button>
            </div>
          </div>

          {/* Organizer */}
          <div className="bg-gray-900 z-50 p-6 rounded-lg border border-gray-800 mb-10">
            <h2 className="text-xl font-semibold mb-4">Organized by</h2>
            <p className="text-gray-300">{eventDetails.organizer}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t z-50 border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 {eventDetails.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default EventLanding

