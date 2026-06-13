import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/submit", icon: "📝", label: "Submit Complaint" },
  { path: "/dashboard", icon: "📊", label: "Analytics Dashboard" },
  { path: "/log", icon: "📋", label: "Complaint Log" },
  { path: "/settings", icon: "⚙️", label: "Settings & Notifications" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={s.root}>
      {/* SIDEBAR */}
      <aside style={{ ...s.sidebar, width: sidebarOpen ? 240 : 60, transition: "width 0.3s" }}>
        <div style={s.brand} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <>
              <div style={s.brandTitle}>● SmartCivic</div>
              <div style={s.brandSub}>NLP COMPLAINT SYSTEM v2.0</div>
            </>
          ) : <div style={{ ...s.brandTitle, fontSize: 18 }}>●</div>}
        </div>

        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path} style={{ ...s.navBtn, background: active ? "#1a2235" : "transparent", color: active ? "#00d4ff" : "#94a3b8", borderLeft: active ? "3px solid #00d4ff" : "3px solid transparent" }}
                onClick={() => navigate(item.path)}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ marginLeft: 10, fontSize: 14, whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div style={s.sidebarFooter}>
            <div>🤖 Model: Naïve Bayes + TF-IDF</div>
            <div>🌐 Voice: Web Speech API</div>
            <div>📱 Notify: WhatsApp / Email</div>
            <div>📦 Storage: CSV (local)</div>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0e1a" },
  sidebar: { background: "#111827", borderRight: "1px solid #1e2d4a", display: "flex", flexDirection: "column", padding: "0", overflow: "hidden", flexShrink: 0 },
  brand: { padding: "20px 16px 16px", borderBottom: "1px solid #1e2d4a", cursor: "pointer", marginBottom: 8 },
  brandTitle: { fontFamily: "'Space Mono',monospace", color: "#00d4ff", fontSize: 15, fontWeight: 700 },
  brandSub: { color: "#475569", fontSize: 10, marginTop: 2, letterSpacing: 1 },
  navBtn: { display: "flex", alignItems: "center", width: "100%", padding: "12px 16px", border: "none", borderRadius: 0, cursor: "pointer", textAlign: "left", marginBottom: 2, transition: "all 0.2s" },
  sidebarFooter: { padding: "16px", borderTop: "1px solid #1e2d4a", fontSize: 11, color: "#475569", lineHeight: 2 },
  main: { flex: 1, overflow: "auto", padding: 24 },
};
