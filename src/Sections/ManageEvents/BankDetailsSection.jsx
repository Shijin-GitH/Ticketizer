import { useState, useEffect } from "react"
import { FaMoneyBillWave, FaCopy, FaCheckCircle } from "react-icons/fa"
import Dropdown from "../../Components/Dropdown"

function BankDetailsSection() {
  const [bankDetails, setBankDetails] = useState({
    accountName: "Event Organizer Ltd",
    accountNumber: "1234567890",
    ifscCode: "ABCD0001234",
    bankName: "Example Bank",
    branchName: "Main Branch",
    upiId: "eventorganizer@upi",
  })

  const [copied, setCopied] = useState({
    accountNumber: false,
    ifscCode: false,
    upiId: false,
  })

  useEffect(() => {
    // Load bank details from sessionStorage
    const storedBankDetails = sessionStorage.getItem("bankDetails")
    if (storedBankDetails) {
      setBankDetails(JSON.parse(storedBankDetails))
    }
  }, [])

  const handleCopy = (field) => {
    navigator.clipboard.writeText(bankDetails[field])
    setCopied({ ...copied, [field]: true })

    setTimeout(() => {
      setCopied({ ...copied, [field]: false })
    }, 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedDetails = {
      ...bankDetails,
      [name]: value,
    }

    setBankDetails(updatedDetails)
    sessionStorage.setItem("bankDetails", JSON.stringify(updatedDetails))
  }

  return (
    <Dropdown title="Bank Details" description="Payment information for participants" icon={<FaMoneyBillWave />}>
      <div className="bg-black text-white p-6 rounded-lg">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Bank Transfer Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={bankDetails.accountName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Enter account holder name"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">Account Number</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="accountNumber"
                      value={bankDetails.accountNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-l-md text-white"
                      placeholder="Enter account number"
                    />
                    <button
                      className="bg-gray-700 px-3 rounded-r-md hover:bg-gray-600 transition-colors"
                      onClick={() => handleCopy("accountNumber")}
                    >
                      {copied.accountNumber ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">IFSC Code</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="ifscCode"
                      value={bankDetails.ifscCode}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-l-md text-white"
                      placeholder="Enter IFSC code"
                    />
                    <button
                      className="bg-gray-700 px-3 rounded-r-md hover:bg-gray-600 transition-colors"
                      onClick={() => handleCopy("ifscCode")}
                    >
                      {copied.ifscCode ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={bankDetails.branchName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="Enter branch name"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h2 className="text-xl font-semibold mb-4">UPI Payment</h2>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">UPI ID</label>
                <div className="flex">
                  <input
                    type="text"
                    name="upiId"
                    value={bankDetails.upiId}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-l-md text-white"
                    placeholder="Enter UPI ID"
                  />
                  <button
                    className="bg-gray-700 px-3 rounded-r-md hover:bg-gray-600 transition-colors"
                    onClick={() => handleCopy("upiId")}
                  >
                    {copied.upiId ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Dropdown>
  )
}

export default BankDetailsSection

