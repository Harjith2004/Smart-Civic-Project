import React, { useState } from "react";
import Header from "../components/Header";
import { PriorityBadge, StatusBadge, CategoryBadge } from "../components/Badge";
import { useComplaints } from "../context/ComplaintsContext";
import { STATUS_OPTIONS } from "../data/mockData";

export default function Log() {
  const { complaints, updateStatus, markNotified } = useComplaints();
  const [search, setSearch] = useState("");
  const [priorityF, setPriorityF] = useState("All");
  const [catF, setCatF] = useState("All");
  const [statusF, setStatusF] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const [expanded, setExpanded] = useState(null);
  const [notifyMsg, setNotifyMsg] = useState({});

  const categories = ["All", ...new Set(complaints.map(c => c.category))];

  let filtered = [...complaints];
  if (search) filtered = filtered.filter(c => c.text.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));
  if (priorityF !== "All") filtered = filtered.filter(c => c.priority === priorityF);
  if (catF !== "All") filtered = filtered.filter(c => c.category === catF);
  if (statusF !== "All") filtered = filtered.filter(c => c.status === statusF);
  if (sort === "Newest First") filtered.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  else if (sort === "Oldest First") filtered.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
  else if (sort === "Priority") filtered.sort((a,b) => ["HIGH","MEDIUM","LOW"].indexOf(a.priority) - ["HIGH","MEDIUM","LOW"].indexOf(b.priority));

  const sendNotification = (id) => {
    setNotifyMsg(prev => ({...prev, [id]: "sending"}));
    setTimeout(() => {
      markNotified(id);
      setNotifyMsg(prev => ({...prev, [id]: "sent"}));
      setTimeout(() => setNotifyMsg(prev => ({...prev, [id]: ""})), 2000);
    }, 1500);
  };

  const exportCSV = () => {
    const headers = ["ID","Text","Location","Category","Priority","Status","Confidence","Timestamp"];
    const rows = complaints.map(c => [c.id, `"${c.text}"`, c.location, c.category, c.priority, c.status, c.confidence, c.timestamp]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "smartcivic_export.csv"; a.click();
  };

  return (
    <div>
      <Header title="📋 Complaint Log" subtitle="View, filter, manage and re-notify all submitted complaints" />

      {/* Toolbar */}
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input style={s.input} placeholder="🔍 Search complaints or ID..." value={search} onChange={e => setSearch(e.target.value)}/>
        <select style={s.select} value={priorityF} onChange={e => setPriorityF(e.target.value)}>
          {["All","HIGH","MEDIUM","LOW"].map(p => <option key={p}>{p}</option>)}
        </select>
        <select style={s.select} value={catF} onChange={e => setCatF(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select style={s.select} value={statusF} onChange={e => setStatusF(e.target.value)}>
          {["All",...STATUS_OPTIONS].map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={s.select} value={sort} onChange={e => setSort(e.target.value)}>
          {["Newest First","Oldest First","Priority"].map(s => <option key={s}>{s}</option>)}
        </select>
        <button style={s.btnExport} onClick={exportCSV}>⬇️ Export CSV</button>
      </div>

      <div style={{ color:"#64748b", fontSize:13, marginBottom:12 }}>Showing {filtered.length} of {complaints.length} complaints</div>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:60, color:"#475569" }}>No complaints found matching your filters.</div>
      ) : filtered.map(c => (
        <div key={c.id} style={{ ...s.complaintCard, borderLeft: `3px solid ${c.priority==="HIGH"?"#ef4444":c.priority==="MEDIUM"?"#f59e0b":"#10b981"}` }}>
          {/* Header Row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", color:"#00d4ff", fontSize:13, fontWeight:700 }}>{c.id}</span>
              <PriorityBadge priority={c.priority}/>
              <CategoryBadge category={c.category}/>
              <StatusBadge status={c.status}/>
              {c.notified && <span style={{ background:"#1d4ed822", color:"#60a5fa", padding:"2px 8px", borderRadius:100, fontSize:11 }}>📱 Notified</span>}
            </div>
            <span style={{ color:"#475569", fontSize:12 }}>{new Date(c.timestamp).toLocaleString("en-IN")}</span>
          </div>

          {/* Text */}
          <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.6, marginBottom:8 }}>
            {expanded === c.id ? c.text : c.text.substring(0,120) + (c.text.length > 120 ? "..." : "")}
            {c.text.length > 120 && <button style={s.btnLink} onClick={() => setExpanded(expanded===c.id ? null : c.id)}>{expanded===c.id ? " Show less" : " Read more"}</button>}
          </p>

          {/* Footer */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div style={{ display:"flex", gap:16, fontSize:12, color:"#64748b" }}>
              {c.location && <span>📍 {c.location}</span>}
              <span>🤖 {(c.confidence*100).toFixed(0)}% confidence</span>
              {c.name && c.name !== "Anonymous" && <span>👤 {c.name}</span>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {/* Status Update */}
              <select style={{ ...s.select, fontSize:12, padding:"4px 8px" }} value={c.status}
                onChange={e => updateStatus(c.id, e.target.value)}>
                {STATUS_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              {/* Notify Button */}
              <button style={{ ...s.btnNotify, background: c.notified ? "#1e2d4a" : "#7c3aed" }}
                onClick={() => sendNotification(c.id)} disabled={notifyMsg[c.id]==="sending"}>
                {notifyMsg[c.id]==="sending" ? "⏳ Sending..." : notifyMsg[c.id]==="sent" ? "✅ Sent!" : c.notified ? "🔁 Re-notify" : "📤 Notify"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const s = {
  input: { padding:"9px 14px", background:"#111827", border:"1px solid #1e2d4a", borderRadius:8, color:"#e2e8f0", fontSize:14, outline:"none", minWidth:240 },
  select: { padding:"9px 12px", background:"#111827", border:"1px solid #1e2d4a", borderRadius:8, color:"#94a3b8", fontSize:13, outline:"none", cursor:"pointer" },
  btnExport: { padding:"9px 16px", background:"#1e2d4a", color:"#00d4ff", border:"1px solid #00d4ff33", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:13 },
  complaintCard: { background:"#111827", border:"1px solid #1e2d4a", borderRadius:12, padding:20, marginBottom:12 },
  btnLink: { background:"none", border:"none", color:"#00d4ff", cursor:"pointer", fontSize:13 },
  btnNotify: { padding:"6px 14px", color:"#fff", border:"none", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600 },
};
