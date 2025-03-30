import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";

function Registration() {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Team Details, 3: Ticket Selection, 4: Payment
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: "Standard",
      description: "Access to all events",
      price: 500,
    },
    {
      id: 2,
      name: "VIP",
      description: "Priority access and perks",
      price: 1000,
    },
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const navigate = useNavigate();

  // Load form fields from sessionStorage
  useEffect(() => {
    const savedFields = sessionStorage.getItem("formFields");
    if (savedFields) {
      const fields = JSON.parse(savedFields);
      setFormFields(fields);

      // Initialize form values
      const initialValues = {};
      fields.forEach((field) => {
        initialValues[field.id] = "";
      });
      setFormValues(initialValues);
    } else {
      // Default fields if none are found in sessionStorage
      const defaultFields = [
        {
          id: "registrant-name",
          label: "Registrant Name",
          required: true,
          placeholder: "Enter your full name",
          type: "text",
        },
        {
          id: "registrant-email",
          label: "Registrant Email",
          required: true,
          placeholder: "Enter your email address",
          type: "email",
        },
        {
          id: "registrant-phone",
          label: "Registrant Phone no",
          required: true,
          placeholder: "Enter your phone number",
          type: "tel",
        },
      ];
      setFormFields(defaultFields);

      // Initialize form values
      const initialValues = {};
      defaultFields.forEach((field) => {
        initialValues[field.id] = "";
      });
      setFormValues(initialValues);
    }
    setIsLoading(false);
  }, []);

  const handleInputChange = (fieldId, value) => {
    setFormValues({
      ...formValues,
      [fieldId]: value,
    });
  };

  const handleAddMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: "", email: "", phone: "" }, // Added phone field for new team member
    ]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate form fields
      const requiredFields = formFields.filter((field) => field.required);
      const isValid = requiredFields.every((field) =>
        formValues[field.id]?.trim()
      );

      if (!isValid) {
        alert("Please fill in all required fields.");
        return;
      }

      setStep(2);
    } else if (step === 2) {
      // Validate team details
      if (
        !formValues["team-name"]?.trim() ||
        !formValues["team-leader-name"]?.trim() ||
        !formValues["team-phone"]?.trim() ||
        !formValues["team-email"]?.trim()
      ) {
        alert("Please fill in all required team details.");
        return;
      }

      // Validate team members
      const allMembersValid = teamMembers.every(
        (member) =>
          member.name?.trim() && member.email?.trim() && member.phone?.trim()
      );
      if (!allMembersValid) {
        alert("Please fill in all team member details.");
        return;
      }

      setStep(3);
    } else if (step === 3) {
      // Validate ticket selection
      if (!selectedTicket) {
        alert("Please select a ticket type.");
        return;
      }

      // Save form data to sessionStorage for the payment page
      sessionStorage.setItem(
        "registrationData",
        JSON.stringify({
          formValues,
          teamMembers,
          selectedTicket,
        })
      );

      // Navigate to payment page
      navigate("/payment");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90FF00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen z-50 text-white">
      {/* Header */}
      <header className="bg-black border-b border-[#90FF00] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            className="h-12"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <div className="text-xl font-semibold">Registration</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
          {["Personal Info", "Team Details", "Ticket Selection", "Payment"].map(
            (label, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= index + 1
                        ? "bg-[#90FF00] text-black"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm">{label}</span>
                </div>
                {index < 3 && (
                  <div className="flex-1 h-1 bg-gray-700 mx-2">
                    <div
                      className={`h-full ${
                        step >= index + 2 ? "bg-[#90FF00]" : "bg-gray-700"
                      }`}
                      style={{ width: step >= index + 2 ? "100%" : "0%" }}
                    ></div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-gray-900 z-50 rounded-lg border border-gray-800 p-6">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Personal Information
              </h2>
              <div className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.id} className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                      placeholder={field.placeholder}
                      value={formValues[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      required={field.required}
                    />
                    {field.instructions && (
                      <p className="mt-1 text-xs text-gray-400">
                        {field.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Team Details</h2>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="Enter your team name"
                    value={formValues["team-name"] || ""}
                    onChange={(e) =>
                      handleInputChange("team-name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Team Leader Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="Enter team leader's name"
                    value={formValues["team-leader-name"] || ""}
                    onChange={(e) =>
                      handleInputChange("team-leader-name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="Enter phone number"
                    value={formValues["team-phone"] || ""}
                    onChange={(e) =>
                      handleInputChange("team-phone", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="Enter email address"
                    value={formValues["team-email"] || ""}
                    onChange={(e) =>
                      handleInputChange("team-email", e.target.value)
                    }
                    required
                  />
                </div>

                <h3 className="text-xl font-semibold mt-6">Team Members</h3>
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="space-y-2 mb-4 border-b border-gray-700 pb-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Member Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Enter member's name"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Member Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Enter member's email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Member Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                        placeholder="Enter member's phone number"
                        value={member.phone}
                        onChange={(e) =>
                          handleMemberChange(index, "phone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                      onClick={() => handleRemoveMember(index)}
                    >
                      Remove Member
                    </button>
                  </div>
                ))}
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={handleAddMember}
                >
                  Add Member
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Select Ticket</h2>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedTicket?.id === ticket.id
                        ? "border-[#90FF00] bg-gray-800"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{ticket.name}</h3>
                        <p className="text-sm text-gray-400">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="text-xl font-semibold">
                        ₹ {ticket.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center"
              onClick={handleBack}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              className="px-6 py-2 bg-[#90FF00] text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] flex items-center"
              onClick={handleNext}
            >
              {step === 4 ? "Proceed to Payment" : "Next"}{" "}
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
