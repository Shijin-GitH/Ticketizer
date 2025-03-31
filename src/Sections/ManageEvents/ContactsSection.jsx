import { useState, useEffect } from "react"
import { FaUserFriends, FaPlus, FaTrash, FaEdit } from "react-icons/fa"
import Dropdown from "../../Components/Dropdown"

function ContactsSection() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Event Coordinator",
      email: "john@example.com",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Registration Manager",
      email: "jane@example.com",
      phone: "+91 9876543211",
    },
  ])

  const [isAddingContact, setIsAddingContact] = useState(false)
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [currentContact, setCurrentContact] = useState({
    id: null,
    name: "",
    role: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    // Load contacts from sessionStorage
    const storedContacts = sessionStorage.getItem("eventContacts")
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    } else {
      // Save default contacts to sessionStorage
      sessionStorage.setItem("eventContacts", JSON.stringify(contacts))
    }
  }, [])

  const saveContacts = (updatedContacts) => {
    setContacts(updatedContacts)
    sessionStorage.setItem("eventContacts", JSON.stringify(updatedContacts))
  }

  const handleAddContact = () => {
    setCurrentContact({
      id: null,
      name: "",
      role: "",
      email: "",
      phone: "",
    })
    setIsAddingContact(true)
    setIsEditingContact(false)
  }

  const handleEditContact = (contact) => {
    setCurrentContact(contact)
    setIsEditingContact(true)
    setIsAddingContact(false)
  }

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    saveContacts(updatedContacts)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentContact({
      ...currentContact,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditingContact) {
      // Update existing contact
      const updatedContacts = contacts.map((contact) => (contact.id === currentContact.id ? currentContact : contact))
      saveContacts(updatedContacts)
    } else {
      // Add new contact
      const newContact = {
        ...currentContact,
        id: Date.now(),
      }
      saveContacts([...contacts, newContact])
    }

    // Reset form
    setIsAddingContact(false)
    setIsEditingContact(false)
    setCurrentContact({
      id: null,
      name: "",
      role: "",
      email: "",
      phone: "",
    })
  }

  return (
    <Dropdown title="Contact Information" description="Add contact details for participants" icon={<FaUserFriends />}>
      <div className="bg-black text-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Event Contacts</h2>
          <button
            className="px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] flex items-center"
            onClick={handleAddContact}
          >
            <FaPlus className="mr-2" /> Add Contact
          </button>
        </div>

        {(isAddingContact || isEditingContact) && (
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 mb-6">
            <h3 className="text-lg font-medium mb-4">{isEditingContact ? "Edit Contact" : "Add New Contact"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentContact.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={currentContact.role}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Position or role"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentContact.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={currentContact.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={() => {
                    setIsAddingContact(false)
                    setIsEditingContact(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                >
                  {isEditingContact ? "Update Contact" : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 relative">
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="text-gray-400 hover:text-[#90FF00]" onClick={() => handleEditContact(contact)}>
                  <FaEdit />
                </button>
                <button className="text-gray-400 hover:text-red-500" onClick={() => handleDeleteContact(contact.id)}>
                  <FaTrash />
                </button>
              </div>

              <div className="pt-6">
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-gray-400 text-sm">{contact.role}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-gray-300">{contact.email}</p>
                  <p className="text-gray-300">{contact.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No contacts added yet.</p>
            <p>Click "Add Contact" to add your first contact.</p>
          </div>
        )}
      </div>
    </Dropdown>
  )
}

export default ContactsSection

