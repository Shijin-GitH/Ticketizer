import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import Logo from "../assets/Logo.svg"

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-10" />
            </Link>
            <p className="text-gray-400 mb-4">
              An all-in-one event management platform which provides simple, superior and more affordable event
              management solution.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[#90FF00]">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#90FF00]">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#90FF00]">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#90FF00]">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#90FF00]">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-gray-400 hover:text-[#90FF00]">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/sponsorship" className="text-gray-400 hover:text-[#90FF00]">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-[#90FF00]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-gray-400 hover:text-[#90FF00]">
                  Refunds / Cancellation
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ieee-events" className="text-gray-400 hover:text-[#90FF00]">
                  IEEE events
                </Link>
              </li>
              <li>
                <Link to="/tedx-events" className="text-gray-400 hover:text-[#90FF00]">
                  TEDx events
                </Link>
              </li>
              <li>
                <Link to="/india-events" className="text-gray-400 hover:text-[#90FF00]">
                  India
                </Link>
              </li>
              <li>
                <Link to="/canada-events" className="text-gray-400 hover:text-[#90FF00]">
                  Canada
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#90FF00]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#90FF00]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#90FF00]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#90FF00]">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} EventHub Technologies Inc. All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer

