import { createContext, useState } from "react";

export const DarkModeContext = createContext();
export const DarkModeContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const switchMode = () => {
    if (!darkMode === true) {
      console.log("darkmode on");
      setDarkMode(true);
    } else {
      console.log("darkmode off");
    }
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        switchMode,
      }}
    >
      {props.children}
    </DarkModeContext.Provider>
  );
};
