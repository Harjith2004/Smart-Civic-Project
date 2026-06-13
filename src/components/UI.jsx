import React from 'react';

export const Header = ({ icon, title, subtitle }) => (
  <div style={{ background: 'linear-gradient(135deg,#0a0e1a 0%,#1a2235 100%)', border: '1px solid #1e2d4a', borderRadius: '16px', padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.03) 1px,transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
    <h1 style={{ fontFamily: "'Space Mono',monospace", color: '#00d4ff', fontSize: '24px', margin: '0 0 6px', letterSpacing: '-1px' }}>{icon} {title}</h1>
    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>{subtitle}</p>
  </div>
);

export const SectionTitle = ({ children, style = {} }) => (
  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #1e2d4a', ...style }}>{children}</div>
);

export const KpiCard = ({ value, label, color, icon }) => (
  <div style={{ background: '#111827', border: '1px solid #1e2d4a', borderRadius: '12px', padding: '20px', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
    <div style={{ height: '3px', background: color, margin: '-20px -20px 16px', borderRadius: 0 }} />
    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '32px', fontWeight: '700', color, lineHeight: 1, marginBottom: '6px' }}>{value}</div>
    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>{icon} {label}</div>
  </div>
);

export const Badge = ({ priority }) => {
  const styles = {
    HIGH: { background: '#fee2e2', color: '#991b1b' },
    MEDIUM: { background: '#fef3c7', color: '#92400e' },
    LOW: { background: '#d1fae5', color: '#065f46' },
  };
  const emojis = { HIGH: '🔴', MEDIUM: '🟡', LOW: '🟢' };
  const s = styles[priority] || styles.LOW;
  return <span style={{ ...s, padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: '700' }}>{emojis[priority]} {priority}</span>;
};

export const CatBadge = ({ cat }) => (
  <span style={{ background: '#ede9fe', color: '#4c1d95', padding: '3px 10px', borderRadius: '100px', fontSize: '11px' }}>{cat}</span>
);

export const StatusBadge = ({ status }) => {
  const colors = { Open: '#ef4444', 'Under Review': '#f59e0b', 'In Progress': '#00d4ff', Resolved: '#10b981', Closed: '#64748b' };
  const color = colors[status] || '#64748b';
  return <span style={{ background: color + '22', color, padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: '600' }}>{status}</span>;
};

export const Card = ({ children, style = {} }) => (
  <div style={{ background: '#111827', border: '1px solid #1e2d4a', borderRadius: '12px', padding: '20px', ...style }}>{children}</div>
);
