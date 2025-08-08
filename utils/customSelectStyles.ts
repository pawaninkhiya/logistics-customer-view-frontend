export const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#000" : "#d1d5db", // focus:black/50, default:gray-300
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0,0,0,0.5)" : "none",
    borderRadius: "0.375rem", // rounded-md
    padding: "0.25rem 0.75rem", // px-4 py-3 roughly
    minHeight: "48px",
    fontSize: "0.75rem", // text-xs
    transition: "all 0.2s ease-in-out",
    fontWeight: "500", // font-medium
    width: "100%",
    ":hover": {
      borderColor: "#9ca3af", // hover:border-gray-400
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af", // text-gray-400
    fontSize: "0.875rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem", // rounded-xl
    zIndex: 9999,
    overflow: "hidden",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e7ff" : "white", // focus:bg-indigo-100
    color: "black",
    cursor: "pointer",
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};
