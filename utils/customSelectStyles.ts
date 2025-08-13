export const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0,0,0,0.5)" : "none",
    borderRadius: "0.375rem",
    padding: "0.25rem 0.75rem",
    minHeight: "48px",
    fontSize: "0.75rem",
    transition: "all 0.2s ease-in-out",
    fontWeight: "500",
    width: "100%",
    ":hover": {
      borderColor: "#9ca3af",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "0.875rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.23rem",
    zIndex: 9999,
    overflow: "hidden",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#ff9800" // selected stays orange
      : state.isFocused
      ? "#ffb74d" // hover/focus lighter orange
      : "white",
    color: state.isSelected || state.isFocused ? "white" : "black",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};
