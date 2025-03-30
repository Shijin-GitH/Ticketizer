import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Dropdown = ({ title, description, icon, children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`border-2 rounded-lg text-white transition duration-300 w-full ${
        expanded
          ? "border-gray-500"
          : " border-transparent hover:border-gray-500"
      }`}
    >
      <div
        className="flex items-center justify-between p-4  bg-black rounded-lg shadow-md"
        // onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {/* {expanded ? (
          <BiChevronUp className="text-gray-200" />
        ) : (
          <BiChevronDown className="text-gray-200" />
        )} */}
      </div>

      {expanded && (
        <div className="p-5 bg-black border-t-2 flex flex-col gap-4 border-gray-500 rounded-b-lg shadow-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
