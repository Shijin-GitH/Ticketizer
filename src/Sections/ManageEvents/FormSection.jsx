"use client";

import { useState, useEffect } from "react";
import { FaWpforms, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Dropdown from "../../Components/Dropdown";
import { Switch } from "../../Components/Switch";
import axios from "axios"; // Import axios for API calls
import { useParams } from "react-router-dom"; // Import useParams
import LoadingSpinner from "../../Components/LoadingSpinner";

function FormBuilder({ closeSidebar, fieldToEdit, onSave }) {
  const [fieldName, setFieldName] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [fieldType, setFieldType] = useState("Text");
  const [instructions, setInstructions] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [options, setOptions] = useState(""); // New state for options
  const [isEditing, setIsEditing] = useState(false);
  const [fieldId, setFieldId] = useState("");

  const fieldTypes = [
    "Text",
    "Email",
    "Number",
    "Tel",
    "Select",
    "Checkbox",
    "Radio",
    "Date",
  ];

  useEffect(() => {
    if (fieldToEdit) {
      setFieldName(fieldToEdit.label);
      setIsMandatory(fieldToEdit.required);
      setFieldType(
        fieldToEdit.type.charAt(0).toUpperCase() + fieldToEdit.type.slice(1)
      );
      setInstructions(fieldToEdit.instructions || "");
      setPlaceholder(fieldToEdit.placeholder || "");
      setOptions(fieldToEdit.options?.join(", ") || ""); // Load options if available
      setIsEditing(true);
      setFieldId(fieldToEdit.id);
    }
  }, [fieldToEdit]);

  const handleSave = () => {
    const newField = {
      id: isEditing ? fieldId : `field-${Date.now()}`,
      label: fieldName,
      required: isMandatory,
      placeholder: placeholder,
      type: fieldType.toLowerCase(),
      editable: true,
      removable: true,
      instructions: instructions,
      options:
        fieldType.toLowerCase() === "radio" ||
        fieldType.toLowerCase() === "select" ||
        fieldType.toLowerCase() === "checkbox"
          ? options.split(",").map((opt) => opt.trim())
          : undefined, // Save options only for specific types
    };

    onSave(newField, isEditing);
    closeSidebar();
  };

  return (
    <div className="fixed top-24 right-0 w-1/3 h-full bg-black shadow-lg border-l border-[#90FF00] flex flex-col p-6 z-50 text-black">
      <div className="flex justify-between items-center mb-6 text-white">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Field" : "Form Builder"}
        </h2>
        <button
          className="text-white cursor-pointer hover:text-gray-800"
          onClick={closeSidebar}
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-6 text-white">
        <div>
          <label className="block text-sm font-medium mb-1">
            Field Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter the field name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="mandatory"
            className="mr-2"
            checked={isMandatory}
            onChange={(e) => setIsMandatory(e.target.checked)}
          />
          <label htmlFor="mandatory" className="text-sm">
            Make this as a mandatory field.
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Field Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full p-2 border bg-black border-gray-300 rounded appearance-none"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              {fieldTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {(fieldType === "Radio" ||
          fieldType === "Select" ||
          fieldType === "Checkbox") && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Options (comma-separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter options separated by commas"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter placeholder text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instructions</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter instruction for field"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <div className="mt-auto flex justify-end gap-3">
          <button
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#90FF00] cursor-pointer text-black rounded hover:bg-black hover:text-white hover:border-[#90FF00] border border-transparent transition duration-300"
            onClick={handleSave}
          >
            {isEditing ? "Update Field" : "Create Field"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ field, onEdit, onRemove }) {
  return (
    <div
      className={`mb-4 ${
        field.removable ? "border border-gray-200 rounded-lg p-4" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium">
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex gap-2">
          {field.editable && (
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onEdit(field)}
            >
              <FaEdit size={14} />
              <span className="ml-1 text-xs">Edit</span>
            </button>
          )}
          {field.removable && (
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onRemove(field.id)}
            >
              <FaTrash size={14} />
              <span className="ml-1 text-xs">Remove</span>
            </button>
          )}
        </div>
      </div>

      {/* Render different field types */}
      {field.type === "select" ? (
        <select className="w-full p-2 border border-gray-300 rounded">
          <option value="" disabled selected>
            {field.placeholder || "Select an option"}
          </option>
          {field.options &&
            Array.isArray(field.options) &&
            field.options.map((option, index) => (
              <option
                key={index}
                value={typeof option === "object" ? option.value : option}
              >
                {typeof option === "object" ? option.label : option}
              </option>
            ))}
        </select>
      ) : field.type === "radio" ? (
        <div className="space-y-2">
          {field.options &&
            Array.isArray(field.options) &&
            field.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${field.id}-${index}`}
                  name={field.id}
                  value={typeof option === "object" ? option.value : option}
                />
                <label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {typeof option === "object" ? option.label : option}
                </label>
              </div>
            ))}
        </div>
      ) : field.type === "checkbox" && field.options ? (
        <div className="space-y-2">
          {field.options &&
            Array.isArray(field.options) &&
            field.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${field.id}-${index}`}
                  name={`${field.id}[]`}
                  value={typeof option === "object" ? option.value : option}
                />
                <label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {typeof option === "object" ? option.label : option}
                </label>
              </div>
            ))}
        </div>
      ) : field.type === "checkbox" ? (
        <div className="flex items-center gap-2">
          <input type="checkbox" id={field.id} name={field.id} />
          <label htmlFor={field.id} className="text-sm">
            {field.label}
          </label>
        </div>
      ) : (
        <input
          type={field.type}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={field.placeholder}
        />
      )}

      {field.instructions && (
        <p className="mt-1 text-xs text-gray-500">{field.instructions}</p>
      )}
    </div>
  );
}

function FormsSection() {
  const [isCustomFormEnabled, setIsCustomFormEnabled] = useState(true);
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [fieldToEdit, setFieldToEdit] = useState(null);

  const { eventToken } = useParams(); // Get eventToken from URL params

  // Fetch the token from localStorage
  const authToken = localStorage.getItem("token");

  // Axios configuration for authorization
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  // Fetch form questions from the backend
  useEffect(() => {
    const fetchFormQuestions = async () => {
      try {
        const response = await axios.get(
          `/${eventToken}/form_questions`,
          axiosConfig
        );
        const questions = response.data.map((q) => ({
          id: q.question_id,
          label: q.question,
          required: true, // Assuming all questions are mandatory
          placeholder: "",
          type: q.question_type.toLowerCase(),
          editable: true,
          removable: true,
          instructions: "",
          options: q.options || undefined,
        }));
        setFormFields(questions);
      } catch (error) {
        console.error("Error fetching form questions:", error);
      }
    };

    if (eventToken) {
      fetchFormQuestions();
    }
  }, [eventToken]);

  if (!formFields.length) {
    return <LoadingSpinner />;
  }

  const handleEditField = (field) => {
    setFieldToEdit(field);
    setIsFormBuilderOpen(true);
  };

  const handleRemoveField = async (fieldId) => {
    try {
      await axios.delete(`/form_questions/${fieldId}`, axiosConfig);
      const updatedFields = formFields.filter((field) => field.id !== fieldId);
      setFormFields(updatedFields);
    } catch (error) {
      console.error("Error deleting form question:", error);
    }
  };

  const handleSaveField = async (field, isEditing) => {
    try {
      if (isEditing) {
        await axios.put(
          `/form_questions/${field.id}`,
          {
            question_type: field.type,
            question: field.label,
            options: field.options,
          },
          axiosConfig
        );
        const updatedFields = formFields.map((f) =>
          f.id === field.id ? field : f
        );
        setFormFields(updatedFields);
      } else {
        const response = await axios.post(
          `/${eventToken}/form_questions`,
          {
            question_type: field.type,
            question: field.label,
            options: field.options,
          },
          axiosConfig
        );
        setFormFields([
          ...formFields,
          { ...field, id: response.data.question_id },
        ]);
      }
      setFieldToEdit(null);
    } catch (error) {
      console.error("Error saving form question:", error);
    }
  };

  return (
    <>
      <Dropdown
        title="Forms"
        description="Add, edit dynamic forms for your event"
        icon={<FaWpforms />}
      >
        <div className="flex justify-between items-center mb-6 mt-4">
          <span className="text-gray-300">Add custom form for your event</span>
          <Switch
            checked={isCustomFormEnabled}
            onChange={() => setIsCustomFormEnabled(!isCustomFormEnabled)}
            className="bg-orange-500"
          />
        </div>

        {isCustomFormEnabled && (
          <div className="border border-dashed border-gray-300 rounded-lg p-6 relative flex flex-col gap-5">
            <div className="flex w-full justify-end">
              <button
                className="bg-[#90FF00] hover:bg-black hover:text-white transition duration-300 ease-in-out border border-transparent hover:border-[#90FF00] cursor-pointer text-black px-4 py-2 rounded flex items-center gap-2"
                onClick={() => {
                  setFieldToEdit(null);
                  setIsFormBuilderOpen(true);
                }}
              >
                <FaPlus /> Create new field
              </button>
            </div>

            {formFields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                onEdit={handleEditField}
                onRemove={handleRemoveField}
              />
            ))}
          </div>
        )}
      </Dropdown>

      {isFormBuilderOpen && (
        <FormBuilder
          closeSidebar={() => {
            setIsFormBuilderOpen(false);
            setFieldToEdit(null);
          }}
          fieldToEdit={fieldToEdit}
          onSave={handleSaveField}
        />
      )}
    </>
  );
}

export default FormsSection;
