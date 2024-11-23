import { createContext, useContext, useState, useEffect } from "react";

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subject, setSubject] = useState(() => {
    const savedSubject = localStorage.getItem("Subject");
    return savedSubject ?? null;
  });

  // Automatically save to localStorage whenever `subject` changes
  useEffect(() => {
    if (subject !== null) {
      localStorage.setItem("Subject", subject);
    } else {
      localStorage.removeItem("Subject"); // Clean up if `subject` is null
    }
  }, [subject]);

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubject must be used within a SubjectProvider");
  }
  return context;
};
