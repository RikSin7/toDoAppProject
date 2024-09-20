import React, { useState, useEffect } from "react";
import InputTask from "./components/InputTask";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode"); // Parse the string to a boolean
    return savedTheme ? savedTheme === "true" : false; // Initialize state based on local storage
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode); // Save the theme to localStorage
  }, [isDarkMode]);

  return (
    <div
      className={` ${
        isDarkMode ? "dark" : ""
      } min-h-screen w-full flex flex-col min-w-[350px] dark:transition-all dark:duration-300 transition-all duration-300`}
      style={{
        backgroundColor: "var(--body-color",
        color: "var(--text-color)",
        boxShadow: "var(--b-shadow)",
      }}
    >
      <div
        className={`flex flex-col items-center w-[40vw] min-w-[350px] min-h-[180px] rounded-lg m-auto pb-8 xs:pb-0 relative px-8  text-white dark:transition-all dark:duration-300 transition-all duration-300`}
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          boxShadow: "var(--b-shadow)"
        }}
      >
        <h1 className="md:text-5xl text-3xl font-bold text-center mt-4 dark:transition-all dark:duration-100 transition-all duration-100">
          To-Do
        </h1>
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <img
          src="/to-do-list.png"
          alt="To-Do"
          className="w-12 h-12 flex absolute right-2 z-10 top-16 xs:top-12"
        />
        <InputTask />
      </div>
    </div>
  );
}

export default App;
