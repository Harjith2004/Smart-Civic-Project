import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { PriorityBadge, CategoryBadge } from "../components/Badge";
import { useComplaints } from "../context/ComplaintsContext";
import { EXAMPLES, CATEGORIES, classifyComplaint, generateId } from "../data/mockData";

export default function Submit() {
  const { addComplaint } = useComplaints();
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [listening, setListening] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice not supported in this browser. Try Chrome."); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = false; r.lang = "en-IN";
    r.onresult = (e) => { setText(prev => prev + " " + e.results[0][0].transcript); };
    r.onend = () => setListening(false);
    r.start();
    recognitionRef.current = r;
    setListening(true);
  };

  const stopVoice = () => { recognitionRef.current?.stop(); setListening(false); };

  const analyze = () => {
    if (!text.trim()) { alert("Please enter a complaint first."); return; }
    setAnalyzing(true);
    setTimeout(() => {
      setResult(classifyComplaint(text));
      setAnalyzing(false);
    }, 1200);
  };

  const submit = () => {
    if (!result) { alert("Please analyze complaint first."); return; }
    const complaint = {
      id: generateId(),
      text,
      location,
      name: name || "Anonymous",
      phone,
      category: result.category,
      priority: result.priority,
      confidence: result.confidence,
      status: "Open",
      timestamp: new Date().toISOString(),
      notified: false,
    };
    addComplaint(complaint);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setText(""); setLocation(""); setName(""); setPhone(""); setResult(null); }, 3000);
  };

  if (submitted) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",flexDirection:"column",gap:16 }}>
      <div style={{ fontSize:64 }}>✅</div>
      <h2 style={{ color:"#4ade80",fontFamily:"'Space Mono',monospace" }}>Complaint Submitted!</h2>
      <p style={{ color:"#64748b" }}>Your complaint has been classified and logged. Notifications will be sent shortly.</p>
    </div>
  );

  return (
    <div>
      <Header title="🏛️ SmartCivic" subtitle="Automated Urban Complaint Classification & Priority Detection System" />
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:24 }}>

        {/* LEFT FORM */}
        <div>
          <div style={s.sectionTitle}>SUBMIT NEW COMPLAINT</div>

          {/* Examples */}
          <div style={s.card}>
            <div style={s.cardTitle}>⚡ Quick Examples</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
              {EXAMPLES.map(ex => (
                <button key={ex.label} style={s.exBtn} onClick={() => { setText(ex.text); setLocation(ex.location); setResult(null); }}>
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div style={{ marginBottom:16 }}>
            <label style={s.label}>Complaint Description *</label>
            <div style={{ position:"relative" }}>
              <textarea style={s.textarea} value={text} onChange={e => { setText(e.target.value); setResult(null); }}
                placeholder="Describe the civic issue in detail — road damage, water supply, garbage, electricity, or safety concerns…" rows={6}/>
              <button style={{ ...s.voiceBtn, background: listening ? "#ef4444" : "#1e2d4a" }}
                onClick={listening ? stopVoice : startVoice}>
                {listening ? "⏹ Stop" : "🎤 Voice"}
              </button>
            </div>
            {listening && <div style={{ color:"#ef4444", fontSize:12, marginTop:4 }}>🔴 Listening... speak your complaint</div>}
            <div style={{ textAlign:"right",fontSize:12,color:"#475569",marginTop:4 }}>{text.length} chars</div>
          </div>

          {/* Location & Contact */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <label style={s.label}>📍 Location</label>
              <input style={s.input} value={location} onChange={e => setLocation(e.target.value)} placeholder="Street / Area / Landmark"/>
            </div>
            <div>
              <label style={s.label}>👤 Your Name (optional)</label>
              <input style={s.input} value={name} onChange={e => setName(e.target.value)} placeholder="Anonymous if blank"/>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={s.label}>📞 Phone (optional)</label>
            <input style={s.input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" style={{ ...s.input, maxWidth:240 }}/>
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:12 }}>
            <button style={s.btnPrimary} onClick={analyze} disabled={analyzing || !text.trim()}>
              {analyzing ? "⏳ Analyzing..." : "🤖 Analyze with AI"}
            </button>
            {result && <button style={s.btnSuccess} onClick={submit}>📤 Submit Complaint</button>}
            <button style={s.btnSecondary} onClick={() => { setText(""); setLocation(""); setResult(null); }}>🗑️ Clear</button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div>
          {/* Analysis Result */}
          {result && (
            <div style={s.resultCard}>
              <div style={s.sectionTitle}>AI ANALYSIS RESULT</div>
              <div style={s.resultRow}><span style={s.resultKey}>CATEGORY</span><CategoryBadge category={result.category}/></div>
              <div style={s.resultRow}><span style={s.resultKey}>PRIORITY</span><PriorityBadge priority={result.priority}/></div>
              <div style={s.resultRow}><span style={s.resultKey}>CONFIDENCE</span>
                <div>
                  <span style={{ color: result.confidence > 0.85 ? "#4ade80" : "#f59e0b", fontWeight:700 }}>{(result.confidence*100).toFixed(1)}%</span>
                  <div style={{ height:6, background:"#1e2d4a", borderRadius:3, marginTop:4, width:120 }}>
                    <div style={{ height:"100%", width:`${result.confidence*100}%`, background: result.confidence>0.85?"#4ade80":"#f59e0b", borderRadius:3 }}/>
                  </div>
                </div>
              </div>
              <div style={s.resultRow}><span style={s.resultKey}>LOCATION</span><span style={{ color:"#e2e8f0",fontSize:13 }}>{location || "Not specified"}</span></div>
              <div style={{ marginTop:12, padding:12, background:"#d1fae522", border:"1px solid #6ee7b744", borderRadius:8 }}>
                <div style={{ color:"#4ade80", fontSize:12 }}>✅ Notification will be sent via WhatsApp & Email to municipal department</div>
              </div>
            </div>
          )}

          {!result && (
            <div style={s.card}>
              <div style={s.cardTitle}>🤖 How AI Classification Works</div>
              <div style={{ marginTop:12 }}>
                {[["1. Text Input","Your complaint text is preprocessed"],["2. TF-IDF Vectorization","Text converted to feature vectors"],["3. Naïve Bayes Model","Classifies into 5 civic categories"],["4. Priority Detection","Keywords scored for urgency level"],["5. Notification","WhatsApp + Email sent to department"]].map(([step,desc]) => (
                  <div key={step} style={{ display:"flex",gap:10,marginBottom:12 }}>
                    <span style={{ color:"#00d4ff",fontFamily:"'Space Mono',monospace",fontSize:11,minWidth:80 }}>{step}</span>
                    <span style={{ color:"#64748b",fontSize:13 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Info */}
          <div style={{ ...s.card, marginTop:16 }}>
            <div style={s.cardTitle}>📂 Complaint Categories</div>
            <div style={{ marginTop:10 }}>
              {["🛣️ Road & Infrastructure","💧 Water Supply","🗑️ Sanitation & Waste","⚡ Electricity","🚨 Public Safety"].map(cat => (
                <div key={cat} style={{ padding:"6px 0", borderBottom:"1px solid #1e2d4a", color:"#94a3b8", fontSize:13 }}>{cat}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  sectionTitle: { fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#00d4ff",marginBottom:16,paddingBottom:8,borderBottom:"1px solid #1e2d4a" },
  card: { background:"#111827",border:"1px solid #1e2d4a",borderRadius:12,padding:20,marginBottom:16 },
  cardTitle: { color:"#e2e8f0",fontWeight:600,fontSize:14 },
  label: { display:"block",color:"#64748b",fontSize:13,marginBottom:6,fontWeight:500 },
  textarea: { width:"100%",padding:"12px 14px",background:"#111827",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0",fontSize:15,outline:"none",resize:"vertical",paddingRight:80 },
  input: { width:"100%",padding:"10px 14px",background:"#111827",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0",fontSize:14,outline:"none" },
  voiceBtn: { position:"absolute",right:10,top:10,padding:"6px 12px",border:"none",borderRadius:6,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600 },
  btnPrimary: { padding:"12px 20px",background:"#00d4ff",color:"#0a0e1a",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:14 },
  btnSuccess: { padding:"12px 20px",background:"#10b981",color:"#fff",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:14 },
  btnSecondary: { padding:"12px 20px",background:"#1e2d4a",color:"#94a3b8",border:"none",borderRadius:8,fontWeight:600,cursor:"pointer",fontSize:14 },
  resultCard: { background:"#1a2235",border:"1px solid #1e2d4a",borderRadius:12,padding:20 },
  resultRow: { display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #1e2d4a" },
  resultKey: { color:"#64748b",fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:1 },
};
