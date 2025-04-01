import { useState, useEffect } from "react";
import { FaFileContract } from "react-icons/fa";
import Dropdown from "../../Components/Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "../../Components/LoadingSpinner"; // Import LoadingSpinner

function TermsAndConditionsSection() {
  const [termsAndConditions, setTermsAndConditions] = useState([
    {
      id: 1,
      title: "Registration and Participation",
      content:
        "By registering for this event, participants agree to abide by all rules and regulations set forth by the organizers. Registration is considered complete only upon full payment of the registration fee. The organizers reserve the right to refuse entry to any individual without providing a reason.",
    },
    {
      id: 2,
      title: "Payment and Refunds",
      content:
        "All payments are to be made in advance. Refunds will be processed according to the following policy:\n- Cancellations made 30 days or more before the event: 75% refund\n- Cancellations made 15-29 days before the event: 50% refund\n- Cancellations made 7-14 days before the event: 25% refund\n- Cancellations made less than 7 days before the event: No refund",
    },
    {
      id: 3,
      title: "Code of Conduct",
      content:
        "All participants are expected to conduct themselves in a professional and respectful manner. Any behavior that is deemed inappropriate, disruptive, or offensive may result in immediate expulsion from the event without refund.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [currentSection, setCurrentSection] = useState({
    id: null,
    title: "",
    content: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load terms from sessionStorage
    const storedTerms = sessionStorage.getItem("termsAndConditions");
    if (storedTerms) {
      setTermsAndConditions(JSON.parse(storedTerms));
    }
    setIsLoading(false); // Set loading to false after fetching
  }, []);

  const saveTerms = (updatedTerms) => {
    setTermsAndConditions(updatedTerms);
    sessionStorage.setItem("termsAndConditions", JSON.stringify(updatedTerms));
  };

  const handleAddSection = () => {
    setCurrentSection({
      id: null,
      title: "",
      content: "",
    });
    setIsEditing(true);
  };

  const handleEditSection = (section) => {
    setCurrentSection(section);
    setIsEditing(true);
  };

  const handleDeleteSection = (id) => {
    const updatedTerms = termsAndConditions.filter(
      (section) => section.id !== id
    );
    saveTerms(updatedTerms);
  };

  const handleTitleChange = (e) => {
    setCurrentSection({
      ...currentSection,
      title: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setCurrentSection({
      ...currentSection,
      content,
    });
  };

  const handleSaveSection = () => {
    if (currentSection.id) {
      // Update existing section
      const updatedTerms = termsAndConditions.map((section) =>
        section.id === currentSection.id ? currentSection : section
      );
      saveTerms(updatedTerms);
    } else {
      // Add new section
      const newSection = {
        ...currentSection,
        id: Date.now(),
      };
      saveTerms([...termsAndConditions, newSection]);
    }

    setIsEditing(false);
    setCurrentSection({
      id: null,
      title: "",
      content: "",
    });
  };

  const handleMoveSection = (id, direction) => {
    const index = termsAndConditions.findIndex((section) => section.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === termsAndConditions.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedTerms = [...termsAndConditions];
    [updatedTerms[index], updatedTerms[newIndex]] = [
      updatedTerms[newIndex],
      updatedTerms[index],
    ];

    saveTerms(updatedTerms);
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <Dropdown
      title="Terms and Conditions"
      description="Set event terms and policies"
      icon={<FaFileContract />}
    >
      <div className="bg-black text-white p-6 rounded-lg">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={currentSection.title}
                onChange={handleTitleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="Enter section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Section Content
              </label>
              <ReactQuill
                value={currentSection.content}
                onChange={handleContentChange}
                className="bg-gray-800 rounded-md text-white h-60"
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                onClick={handleSaveSection}
              >
                {currentSection.id ? "Update Section" : "Add Section"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Terms and Conditions Sections
              </h2>
              <button
                className="px-4 py-2 bg-[#90FF00] text-black rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00]"
                onClick={handleAddSection}
              >
                Add Section
              </button>
            </div>

            {termsAndConditions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No terms and conditions sections added yet.</p>
                <p>Click "Add Section" to create your first section.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {termsAndConditions.map((section, index) => (
                  <div
                    key={section.id}
                    className="bg-gray-900 p-4 rounded-lg border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">
                        {index + 1}. {section.title}
                      </h3>
                      <div className="flex space-x-2">
                        {index > 0 && (
                          <button
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleMoveSection(section.id, "up")}
                          >
                            ↑
                          </button>
                        )}
                        {index < termsAndConditions.length - 1 && (
                          <button
                            className="text-gray-400 hover:text-white"
                            onClick={() =>
                              handleMoveSection(section.id, "down")
                            }
                          >
                            ↓
                          </button>
                        )}
                        <button
                          className="text-gray-400 hover:text-[#90FF00]"
                          onClick={() => handleEditSection(section)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div
                      className="text-gray-300 text-sm"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Dropdown>
  );
}

export default TermsAndConditionsSection;
