import React from "react";
const PRIORITY = { HIGH: { bg:"#fee2e2",color:"#991b1b" }, MEDIUM: { bg:"#fef3c7",color:"#92400e" }, LOW: { bg:"#d1fae5",color:"#065f46" } };
const STATUS_COLORS = { Open:"#60a5fa", "Under Review":"#f59e0b", "In Progress":"#a78bfa", Resolved:"#4ade80", Closed:"#94a3b8" };

export function PriorityBadge({ priority }) {
  const c = PRIORITY[priority] || PRIORITY.MEDIUM;
  return <span style={{ background: c.bg, color: c.color, padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{priority}</span>;
}

export function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "#94a3b8";
  return <span style={{ background: color + "22", color, padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, border: `1px solid ${color}44` }}>{status}</span>;
}

export function CategoryBadge({ category }) {
  return <span style={{ background: "#ede9fe", color: "#4c1d95", padding: "3px 10px", borderRadius: 100, fontSize: 11 }}>{category}</span>;
}
