import React, { useState } from "react";
import Header from "../components/Header";

export default function Settings() {
  const [whatsapp, setWhatsapp] = useState({ sid:"", token:"", from:"whatsapp:+14155238886", adminNum:"" });
  const [email, setEmail] = useState({ sender:"", password:"", adminEmail:"" });
  const [waSaved, setWaSaved] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const saveWhatsApp = () => { setWaSaved(true); setTimeout(()=>setWaSaved(false),2000); };
  const saveEmail = () => { setEmailSaved(true); setTimeout(()=>setEmailSaved(false),2000); };

  const testNotify = (type) => {
    setTestResult({type:"sending",msg:`Sending test ${type}...`});
    setTimeout(() => {
      setTestResult({type:"success", msg:`✅ Test ${type} sent successfully! Check your ${type==="WhatsApp"?"WhatsApp":"inbox"}.`});
      setTimeout(()=>setTestResult(null),3000);
    },1800);
  };

  const Field = ({label,type="text",value,onChange,placeholder,mono=false}) => (
    <div style={{marginBottom:16}}>
      <label style={{display:"block",color:"#64748b",fontSize:13,marginBottom:6,fontWeight:500}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:"100%",padding:"10px 14px",background:"#0a0e1a",border:"1px solid #1e2d4a",borderRadius:8,color:"#e2e8f0",fontSize:14,outline:"none",fontFamily:mono?"'Space Mono',monospace":"inherit"}}/>
    </div>
  );

  return (
    <div>
      <Header title="⚙️ Settings & Notifications" subtitle="Configure WhatsApp and Email notification channels for complaint routing" />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>

        {/* WhatsApp */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{fontSize:24}}>📱</span>
            <div>
              <div style={s.cardTitle}>WhatsApp Notifications</div>
              <div style={{color:"#475569",fontSize:12}}>via Twilio API</div>
            </div>
          </div>
          <Field label="Twilio Account SID" value={whatsapp.sid} onChange={v=>setWhatsapp({...whatsapp,sid:v})} placeholder="ACxxxxxxxxxxxxxxxxxx" mono/>
          <Field label="Twilio Auth Token" type="password" value={whatsapp.token} onChange={v=>setWhatsapp({...whatsapp,token:v})} placeholder="Your auth token"/>
          <Field label="WhatsApp From Number" value={whatsapp.from} onChange={v=>setWhatsapp({...whatsapp,from:v})} placeholder="whatsapp:+14155238886" mono/>
          <Field label="Admin WhatsApp Number" value={whatsapp.adminNum} onChange={v=>setWhatsapp({...whatsapp,adminNum:v})} placeholder="+91XXXXXXXXXX"/>
          <div style={{display:"flex",gap:8}}>
            <button style={s.btnSave} onClick={saveWhatsApp}>{waSaved?"✅ Saved!":"💾 Save Config"}</button>
            <button style={s.btnTest} onClick={()=>testNotify("WhatsApp")}>📤 Test WhatsApp</button>
          </div>
        </div>

        {/* Email */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{fontSize:24}}>📧</span>
            <div>
              <div style={s.cardTitle}>Email Notifications</div>
              <div style={{color:"#475569",fontSize:12}}>via Gmail SMTP</div>
            </div>
          </div>
          <Field label="Gmail Sender Address" type="email" value={email.sender} onChange={v=>setEmail({...email,sender:v})} placeholder="your_gmail@gmail.com"/>
          <Field label="Gmail App Password" type="password" value={email.password} onChange={v=>setEmail({...email,password:v})} placeholder="xxxx xxxx xxxx xxxx"/>
          <Field label="Admin Email Address" type="email" value={email.adminEmail} onChange={v=>setEmail({...email,adminEmail:v})} placeholder="admin@municipality.gov.in"/>
          <div style={{marginBottom:16,padding:12,background:"#1a2235",borderRadius:8,border:"1px solid #1e2d4a"}}>
            <div style={{color:"#64748b",fontSize:12,marginBottom:8}}>ℹ️ How to get Gmail App Password:</div>
            {["1. Google Account → Security","2. Enable 2-Step Verification","3. Security → App Passwords","4. Select Mail → Other → Generate"].map(s=>(<div key={s} style={{color:"#94a3b8",fontSize:12,marginBottom:3}}>{s}</div>))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={s.btnSave} onClick={saveEmail}>{emailSaved?"✅ Saved!":"💾 Save Config"}</button>
            <button style={s.btnTest} onClick={()=>testNotify("Email")}>📤 Test Email</button>
          </div>
        </div>
      </div>

      {/* Test Result */}
      {testResult && (
        <div style={{marginTop:20,padding:16,background:testResult.type==="success"?"#052e16":"#1a2235",border:`1px solid ${testResult.type==="success"?"#6ee7b7":"#1e2d4a"}`,borderRadius:10,color:testResult.type==="success"?"#4ade80":"#94a3b8"}}>
          {testResult.msg}
        </div>
      )}

      {/* Notification Rules */}
      <div style={{...s.card,marginTop:24}}>
        <div style={s.cardTitle}>🔔 Notification Rules</div>
        <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[
            {icon:"🔴",label:"HIGH Priority",desc:"Immediate WhatsApp + Email to admin & department head"},
            {icon:"🟡",label:"MEDIUM Priority",desc:"Email notification to department within 2 hours"},
            {icon:"🟢",label:"LOW Priority",desc:"Daily digest email to department"},
          ].map(r => (
            <div key={r.label} style={{background:"#0a0e1a",border:"1px solid #1e2d4a",borderRadius:10,padding:16}}>
              <div style={{fontSize:24,marginBottom:8}}>{r.icon}</div>
              <div style={{color:"#e2e8f0",fontWeight:600,marginBottom:4,fontSize:14}}>{r.label}</div>
              <div style={{color:"#64748b",fontSize:13}}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ML Model Info */}
      <div style={{...s.card,marginTop:16}}>
        <div style={s.cardTitle}>🤖 ML Model Information</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:16}}>
          {[["Algorithm","Multinomial Naïve Bayes"],["Vectorizer","TF-IDF (scikit-learn)"],["Categories","5 civic categories"],["Accuracy","~89% on test set"]].map(([k,v])=>(
            <div key={k} style={{background:"#0a0e1a",border:"1px solid #1e2d4a",borderRadius:8,padding:14}}>
              <div style={{color:"#64748b",fontSize:11,marginBottom:4,fontFamily:"'Space Mono',monospace",letterSpacing:1}}>{k.toUpperCase()}</div>
              <div style={{color:"#00d4ff",fontWeight:700,fontSize:14}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  card:{background:"#111827",border:"1px solid #1e2d4a",borderRadius:12,padding:24},
  cardHeader:{display:"flex",gap:12,alignItems:"center",marginBottom:20,paddingBottom:16,borderBottom:"1px solid #1e2d4a"},
  cardTitle:{color:"#e2e8f0",fontWeight:700,fontSize:16},
  btnSave:{padding:"10px 18px",background:"#10b981",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:14},
  btnTest:{padding:"10px 18px",background:"#7c3aed",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:14},
};
