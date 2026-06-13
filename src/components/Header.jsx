import React from "react";
export default function Header({ title, subtitle }) {
  return (
    <div style={s.header}>
      <div style={s.grid}/>
      <h1 style={s.title}>{title}</h1>
      <p style={s.sub}>{subtitle}</p>
    </div>
  );
}
const s = {
  header: { background: "linear-gradient(135deg,#0a0e1a 0%,#1a2235 100%)", border: "1px solid #1e2d4a", borderRadius: 16, padding: "28px 36px", marginBottom: 28, position: "relative", overflow: "hidden" },
  grid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.03) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" },
  title: { fontFamily: "'Space Mono',monospace", color: "#00d4ff", fontSize: 24, marginBottom: 6, position: "relative" },
  sub: { color: "#64748b", fontSize: 14, position: "relative" },
};
