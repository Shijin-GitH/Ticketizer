import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SplashCursor from "./ui/SplashCursor";
import axios from "axios";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import ExploreEvents from "./Pages/ExploreEvents";
import EventForm from "./Pages/EventForm";
import MyEvents from "./Pages/MyEvents";
import ManageEvent from "./Pages/ManageEvent";
import BasicDetails from "./Sections/ManageEvents/BasicDetails";
import Ticketing from "./Sections/ManageEvents/Ticketing";
import FormsSection from "./Sections/ManageEvents/FormSection";
import Attendees from "./Sections/ManageEvents/Attendees";
import AddAdmin from "./Sections/ManageEvents/AddAdmin";
import EventLanding from "./Pages/Event/EventLanding";
import Registration from "./Pages/Event/Registration";
import Payment from "./Pages/Event/Payment";
import PaymentSuccess from "./Pages/Event/PaymentSuccess";
import BankDetailsSection from "./Sections/ManageEvents/BankDetailsSection";
import ContactsSection from "./Sections/ManageEvents/ContactsSection";
import TermsAndConditionsSection from "./Sections/ManageEvents/TermsAndConditionsSection";
import PaymentCallback from "./Pages/Event/PaymentCallback";
import PaymentFailed from "./Pages/Event/PaymentFailed";
import PaymentCancelled from "./Pages/Event/PaymentCancelled";

function App() {
  // axios.defaults.baseURL = "http://127.0.0.1:5000";
  axios.defaults.baseURL = "https://7b42h9f8-5000.inc1.devtunnels.ms/";

  return (
    <>
      <SplashCursor
        BACK_COLOR={{ r: 0.1, g: 0.1, b: 0.1 }} // Dark background
        SPLAT_INTERVAL={1500} // Splats every 1.5 seconds
        SPLAT_FORCE={3000} // Gentle splats
      />
      <Router>
        <div className="absolute overflow-x-hidden scrollbar-none font-primary select-none flex flex-col inset-0 h-screen w-screen bg-black bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:70px_70px]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<ExploreEvents />} />
            <Route path="/create-event" element={<EventForm />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/manage-event/:eventToken/*" element={<ManageEvent />}>
              <Route path="basic-details" element={<BasicDetails />} />
              <Route path="ticketing" element={<Ticketing />} />
              <Route path="forms" element={<FormsSection />} />
              <Route path="attendees" element={<Attendees />} />
              <Route path="add-admin" element={<AddAdmin />} />
              <Route path="bank-details" element={<BankDetailsSection />} />
              <Route path="contacts" element={<ContactsSection />} />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditionsSection />}
              />
            </Route>
            <Route path="/event" element={<EventLanding />} />
            <Route path="/:eventToken/register" element={<Registration />} />
            {/* <Route path="/:eventToken/payment" element={<Payment />} /> */}
            <Route
              path="/:transactionID/payment-success"
              element={<PaymentSuccess />}
            />
            <Route
              path="/:transactionID/payment-failed"
              element={<PaymentFailed />}
            />
            <Route
              path="/:transactionID/payment-cancel"
              element={<PaymentCancelled />}
            />
            {/* <Route path="/payment-callback" element={<PaymentCallback />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
