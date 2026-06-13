export const CATEGORIES = [
  "Road & Infrastructure",
  "Water Supply",
  "Sanitation & Waste",
  "Electricity",
  "Public Safety",
];

export const CAT_COLORS = {
  "Road & Infrastructure": "#00d4ff",
  "Water Supply": "#7c3aed",
  "Sanitation & Waste": "#10b981",
  "Electricity": "#f59e0b",
  "Public Safety": "#ef4444",
};

export const PRIORITY_COLORS = { HIGH: "#ef4444", MEDIUM: "#f59e0b", LOW: "#10b981" };

export const EXAMPLES = [
  { label: "🛣️ Road Pothole", text: "There is a large pothole on MG Road near the bus stop causing accidents to two-wheelers daily. Urgent repair needed.", location: "MG Road" },
  { label: "💧 Water Pipe Burst", text: "A water pipe has burst near our colony gate and the entire street is flooded. Emergency repair needed immediately!", location: "Colony Gate" },
  { label: "🗑️ Garbage Not Collected", text: "Garbage has not been collected for the past two weeks. The stench is unbearable and mosquitoes are breeding.", location: "Anna Nagar" },
  { label: "⚡ Power Outage", text: "Power outage in our area since morning. The electricity department is not responding. Please restore power immediately.", location: "Sector 12" },
  { label: "🚨 Open Manhole", text: "There is a dangerous open manhole right in front of our school. Children might fall in. This is an emergency.", location: "School Zone" },
];

export const STATUS_OPTIONS = ["Open", "Under Review", "In Progress", "Resolved", "Closed"];

let idCounter = 100;
const randomDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const INITIAL_COMPLAINTS = [
  { id: "CMP-001", text: "Large pothole on MG Road causing accidents to two-wheelers. Urgent repair needed.", location: "MG Road", category: "Road & Infrastructure", priority: "HIGH", confidence: 0.94, status: "In Progress", timestamp: randomDate(1), notified: true },
  { id: "CMP-002", text: "Water pipe burst near colony gate. Entire street flooded. Emergency repair needed.", location: "Colony Gate", category: "Water Supply", priority: "HIGH", confidence: 0.91, status: "Under Review", timestamp: randomDate(2), notified: true },
  { id: "CMP-003", text: "Garbage not collected for two weeks. Stench is unbearable and mosquitoes are breeding.", location: "Anna Nagar", category: "Sanitation & Waste", priority: "MEDIUM", confidence: 0.87, status: "Open", timestamp: randomDate(3), notified: false },
  { id: "CMP-004", text: "Power outage since morning. Electricity department not responding.", location: "Sector 12", category: "Electricity", priority: "HIGH", confidence: 0.96, status: "Resolved", timestamp: randomDate(4), notified: true },
  { id: "CMP-005", text: "Open manhole in front of school. Very dangerous for children.", location: "School Zone", category: "Public Safety", priority: "HIGH", confidence: 0.98, status: "Open", timestamp: randomDate(1), notified: true },
  { id: "CMP-006", text: "Street lights not working on main road for a week. Very dark at night.", location: "Main Road", category: "Electricity", priority: "MEDIUM", confidence: 0.83, status: "Under Review", timestamp: randomDate(5), notified: false },
  { id: "CMP-007", text: "Illegal dumping near river bank causing pollution. Health hazard.", location: "River Bank", category: "Sanitation & Waste", priority: "HIGH", confidence: 0.89, status: "Open", timestamp: randomDate(2), notified: true },
  { id: "CMP-008", text: "Road divider broken causing traffic issues and accidents.", location: "Junction 5", category: "Road & Infrastructure", priority: "MEDIUM", confidence: 0.81, status: "Resolved", timestamp: randomDate(7), notified: true },
  { id: "CMP-009", text: "No water supply for three days in the entire colony.", location: "Green Colony", category: "Water Supply", priority: "HIGH", confidence: 0.93, status: "In Progress", timestamp: randomDate(3), notified: true },
  { id: "CMP-010", text: "Stray dogs attacking people near the park. Need immediate action.", location: "Central Park", category: "Public Safety", priority: "MEDIUM", confidence: 0.77, status: "Open", timestamp: randomDate(6), notified: false },
  { id: "CMP-011", text: "Road under construction blocked without warning signs causing accidents.", location: "NH-44", category: "Road & Infrastructure", priority: "HIGH", confidence: 0.92, status: "Open", timestamp: randomDate(0), notified: false },
  { id: "CMP-012", text: "Sewage overflow on footpath making it impossible to walk.", location: "Market Street", category: "Sanitation & Waste", priority: "HIGH", confidence: 0.88, status: "Under Review", timestamp: randomDate(1), notified: true },
];

export function classifyComplaint(text) {
  const t = text.toLowerCase();
  let category = "Road & Infrastructure";
  let priority = "MEDIUM";
  let confidence = 0.75 + Math.random() * 0.2;

  if (t.includes("water") || t.includes("pipe") || t.includes("flood") || t.includes("supply")) category = "Water Supply";
  else if (t.includes("garbage") || t.includes("waste") || t.includes("sewage") || t.includes("dump") || t.includes("stench")) category = "Sanitation & Waste";
  else if (t.includes("power") || t.includes("electric") || t.includes("light") || t.includes("outage")) category = "Electricity";
  else if (t.includes("manhole") || t.includes("dog") || t.includes("attack") || t.includes("danger") || t.includes("safety") || t.includes("crime")) category = "Public Safety";

  const highWords = ["urgent", "emergency", "dangerous", "immediately", "accident", "burst", "open manhole", "flood", "attack"];
  const lowWords = ["minor", "small", "slight", "inconvenience"];
  if (highWords.some(w => t.includes(w))) priority = "HIGH";
  else if (lowWords.some(w => t.includes(w))) priority = "LOW";

  return { category, priority, confidence: parseFloat(confidence.toFixed(2)) };
}

export function generateId() {
  idCounter++;
  return `CMP-${String(idCounter).padStart(3, "0")}`;
}
