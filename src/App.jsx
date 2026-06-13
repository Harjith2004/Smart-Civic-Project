import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ComplaintsProvider } from "./context/ComplaintsContext";
import Layout from "./components/Layout";
import Submit from "./pages/Submit";
import Dashboard from "./pages/Dashboard";
import Log from "./pages/Log";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <ComplaintsProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/submit" />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/log" element={<Log />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ComplaintsProvider>
  );
}
