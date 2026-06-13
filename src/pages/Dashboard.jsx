import React, { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Header from "../components/Header";
import { useComplaints } from "../context/ComplaintsContext";
import { CAT_COLORS, PRIORITY_COLORS } from "../data/mockData";

export default function Dashboard() {
  const { complaints } = useComplaints();
  const [priorityFilter, setPriorityFilter] = useState(["HIGH","MEDIUM","LOW"]);
  const [dateRange, setDateRange] = useState("All Time");

  let filtered = [...complaints];
  if (priorityFilter.length < 3) filtered = filtered.filter(c => priorityFilter.includes(c.priority));

  const total = filtered.length;
  const high = filtered.filter(c => c.priority === "HIGH").length;
  const medium = filtered.filter(c => c.priority === "MEDIUM").length;
  const low = filtered.filter(c => c.priority === "LOW").length;
  const resolved = filtered.filter(c => c.status === "Resolved").length;
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(0) : 0;
  const notified = filtered.filter(c => c.notified).length;

  // Category data
  const catCounts = {};
  filtered.forEach(c => { catCounts[c.category] = (catCounts[c.category] || 0) + 1; });
  const catData = Object.entries(catCounts).map(([name, count]) => ({ name: name.split(" & ")[0], count, color: CAT_COLORS[name] }));

  // Priority pie
  const priorityData = [
    { name: "HIGH", value: high, color: "#ef4444" },
    { name: "MEDIUM", value: medium, color: "#f59e0b" },
    { name: "LOW", value: low, color: "#10b981" },
  ].filter(d => d.value > 0);

  // Status data
  const statusCounts = {};
  filtered.forEach(c => { statusCounts[c.status] = (statusCounts[c.status] || 0) + 1; });
  const statusData = Object.entries(statusCounts).map(([name, count]) => ({ name, count }));

  // Timeline (last 7 days)
  const timelineData = Array.from({length:7}).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString("en-IN", { day:"numeric", month:"short" });
    const dayComplaints = filtered.filter(c => new Date(c.timestamp).toDateString() === d.toDateString());
    return { label, HIGH: dayComplaints.filter(c=>c.priority==="HIGH").length, MEDIUM: dayComplaints.filter(c=>c.priority==="MEDIUM").length, LOW: dayComplaints.filter(c=>c.priority==="LOW").length };
  });

  const KPI = ({ icon, value, label, color, sub }) => (
    <div style={s.kpiCard}>
      <div style={{ height:3, background: color, margin:"-20px -20px 16px", borderRadius:"12px 12px 0 0" }}/>
      <div style={{ fontSize:20, marginBottom:4 }}>{icon}</div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:32, fontWeight:700, color, lineHeight:1, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:1, color:"#64748b" }}>{label}</div>
      {sub && <div style={{ fontSize:12, color:"#475569", marginTop:4 }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      <Header title="📊 Analytics Dashboard" subtitle="Real-time insights into civic complaint patterns and resolution performance" />

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        {["ALL","HIGH","MEDIUM","LOW"].map(p => (
          <button key={p} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid #1e2d4a", background: p==="ALL" ? "#1e2d4a" : priorityFilter.includes(p) ? PRIORITY_COLORS[p]+"33" : "transparent", color: p==="ALL" ? "#e2e8f0" : PRIORITY_COLORS[p] || "#e2e8f0", cursor:"pointer", fontWeight:600, fontSize:13 }}
            onClick={() => {
              if (p === "ALL") setPriorityFilter(["HIGH","MEDIUM","LOW"]);
              else setPriorityFilter(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p]);
            }}>
            {p}
          </button>
        ))}
        {["All Time","Last 7 Days","Last 30 Days"].map(r => (
          <button key={r} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid #1e2d4a", background: dateRange===r?"#1e2d4a":"transparent", color:"#94a3b8", cursor:"pointer", fontSize:13 }}
            onClick={() => setDateRange(r)}>{r}</button>
        ))}
      </div>

      {/* KPI Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:16, marginBottom:28 }}>
        <KPI icon="📋" value={total} label="Total" color="#00d4ff"/>
        <KPI icon="🔴" value={high} label="High Priority" color="#ef4444"/>
        <KPI icon="🟡" value={medium} label="Medium" color="#f59e0b"/>
        <KPI icon="🟢" value={low} label="Low Priority" color="#10b981"/>
        <KPI icon="✅" value={`${resolutionRate}%`} label="Resolution Rate" color="#4ade80"/>
        <KPI icon="📱" value={notified} label="Notified" color="#a78bfa"/>
      </div>

      {/* Charts Row 1 */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        {/* Category Bar */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>📂 Complaints by Category</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={catData} margin={{top:5,right:20,left:-10,bottom:5}}>
              <XAxis dataKey="name" tick={{fill:"#64748b",fontSize:12}}/>
              <YAxis tick={{fill:"#64748b",fontSize:12}}/>
              <Tooltip contentStyle={{background:"#1a2235",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0"}}/>
              <Bar dataKey="count" radius={[4,4,0,0]}>
                {catData.map((entry,i) => <Cell key={i} fill={entry.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Pie */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>⚡ Priority Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={priorityData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" label={({name,value})=>`${name}: ${value}`} labelLine={false}>
                {priorityData.map((entry,i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={{background:"#1a2235",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0"}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:20 }}>
        {/* Timeline */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>📈 7-Day Complaint Timeline</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData} margin={{top:5,right:20,left:-10,bottom:5}}>
              <XAxis dataKey="label" tick={{fill:"#64748b",fontSize:11}}/>
              <YAxis tick={{fill:"#64748b",fontSize:11}}/>
              <Tooltip contentStyle={{background:"#1a2235",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0"}}/>
              <Legend/>
              <Line type="monotone" dataKey="HIGH" stroke="#ef4444" strokeWidth={2} dot={{fill:"#ef4444"}}/>
              <Line type="monotone" dataKey="MEDIUM" stroke="#f59e0b" strokeWidth={2} dot={{fill:"#f59e0b"}}/>
              <Line type="monotone" dataKey="LOW" stroke="#10b981" strokeWidth={2} dot={{fill:"#10b981"}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>🔄 Complaint Status</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData} layout="vertical" margin={{top:5,right:20,left:20,bottom:5}}>
              <XAxis type="number" tick={{fill:"#64748b",fontSize:11}}/>
              <YAxis type="category" dataKey="name" tick={{fill:"#64748b",fontSize:11}} width={80}/>
              <Tooltip contentStyle={{background:"#1a2235",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0"}}/>
              <Bar dataKey="count" fill="#00d4ff" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const s = {
  kpiCard: { background:"#111827",border:"1px solid #1e2d4a",borderRadius:12,padding:20,position:"relative",overflow:"hidden" },
  chartCard: { background:"#111827",border:"1px solid #1e2d4a",borderRadius:12,padding:20 },
  chartTitle: { fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#00d4ff",marginBottom:16,paddingBottom:8,borderBottom:"1px solid #1e2d4a" },
};
