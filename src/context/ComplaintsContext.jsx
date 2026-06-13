import React, { createContext, useContext, useState } from "react";
import { INITIAL_COMPLAINTS } from "../data/mockData";

const ComplaintsContext = createContext(null);

export function ComplaintsProvider({ children }) {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);

  const addComplaint = (c) => setComplaints(prev => [c, ...prev]);

  const updateStatus = (id, status) =>
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));

  const markNotified = (id) =>
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, notified: true } : c));

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint, updateStatus, markNotified }}>
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() { return useContext(ComplaintsContext); }
