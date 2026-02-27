import { useState, useEffect } from "react";

const C={bg:"#f5f6f8",w:"#fff",bdr:"#e8eaed",bdrL:"#f1f2f4",acc:"#0d9668",accBg:"#edfcf5",accBdr:"#a7f3d0",red:"#d92626",redBg:"#fef2f2",redBdr:"#fecaca",blu:"#4338ca",bluBg:"#eef0ff",bluBdr:"#c7d2fe",gld:"#b45309",gldBg:"#fffbeb",org:"#c2410c",orgBg:"#fff7ed",orgBdr:"#fdba74",txt:"#0f172a",sub:"#475569",mut:"#94a3b8",sh:"0 1px 2px rgba(0,0,0,0.04)",shM:"0 2px 8px rgba(0,0,0,0.06)",shL:"0 8px 24px rgba(0,0,0,0.1)"};

const MKT=[
  {id:1,cat:"Tennis",t:"Australian Open 2026 Winner",y:100,v:820,tr:31e3,tag:"AUS OPEN",h:0,i:"🎾",s:"resolved_yes",pk:"Sinner ✅",ph:"past",ex:"Feb 2026"},
  {id:2,cat:"Cricket",t:"Did CSK win IPL 2025?",y:100,v:890,tr:92e3,tag:"IPL 2025",h:0,i:"🏏",s:"resolved_yes",pk:"CSK ✅",ph:"past",ex:"2025"},
  {id:3,cat:"Football",t:"Did Real Madrid win UCL 2024-25?",y:0,v:1200,tr:54e3,tag:"UCL",h:0,i:"⚽",s:"resolved_no",pk:"No — Barca won",ph:"past",ex:"2025"},
  {id:4,cat:"F1",t:"F1 2025 Champion",y:100,v:680,tr:28e3,tag:"F1",h:0,i:"🏎️",s:"resolved_yes",pk:"Norris ✅",ph:"past",ex:"2025"},
  {id:5,cat:"Cricket",t:"India Women T20 WC 2025?",y:100,v:340,tr:45e3,tag:"CRICKET",h:0,i:"🏏",s:"resolved_yes",pk:"India W ✅",ph:"past",ex:"2025"},
  {id:20,cat:"Olympics",t:"Winter Olympics 2026 — Most Golds",y:28,v:920,tr:52e3,tag:"OLYMPICS",h:1,i:"🥇",s:"active",pk:"Norway 28%",ph:"now",ex:"22 Feb 2026"},
  {id:21,cat:"Cricket",t:"ICC T20 World Cup 2026 Winner",y:32,v:1850,tr:128e3,tag:"T20 WC",h:1,i:"🏏",s:"active",pk:"India 32%",ph:"now",ex:"8 Mar 2026"},
  {id:22,cat:"Cricket",t:"Will India win T20 WC 2026?",y:32,v:2100,tr:185e3,tag:"T20 WC",h:1,i:"🏏",s:"active",pk:"Yes 32%",ph:"now",ex:"8 Mar 2026"},
  {id:23,cat:"Football",t:"EPL Winner 2025-26",y:59,v:1490,tr:48e3,tag:"EPL",h:1,i:"⚽",s:"active",pk:"Arsenal 59%",ph:"now",ex:"May 2026"},
  {id:24,cat:"Basketball",t:"2026 NBA Champion",y:46,v:1160,tr:62e3,tag:"NBA",h:1,i:"🏀",s:"active",pk:"OKC Thunder 46%",ph:"now",ex:"Jun 2026"},
  {id:25,cat:"NFL",t:"Super Bowl LX Champion",y:14,v:6410,tr:89e3,tag:"NFL",h:1,i:"🏈",s:"active",pk:"Seattle 14%",ph:"now",ex:"Mar 2026"},
  {id:26,cat:"Football",t:"UCL Winner 2025-26",y:19,v:1560,tr:42e3,tag:"UCL",h:1,i:"🏆",s:"active",pk:"Arsenal 19%",ph:"now",ex:"May 2026"},
  {id:27,cat:"Cricket",t:"Will Kohli retire from T20Is?",y:35,v:125,tr:28e3,tag:"CRICKET",h:1,i:"🏏",s:"active",pk:"Yes 35%",ph:"now",ex:"Dec 2026"},
  {id:50,cat:"Cricket",t:"IPL 2026 Winner",y:22,v:520,tr:78e3,tag:"IPL 2026",h:1,i:"🏏",s:"active",pk:"CSK 22%",ph:"up",ex:"May 2026"},
  {id:51,cat:"Cricket",t:"IPL 2026 Top Scorer",y:18,v:95,tr:22e3,tag:"IPL 2026",h:0,i:"🏏",s:"active",pk:"Kohli 18%",ph:"up",ex:"May 2026"},
  {id:52,cat:"F1",t:"F1 2026 Championship Winner",y:28,v:85,tr:12e3,tag:"F1 2026",h:0,i:"🏎️",s:"active",pk:"Norris 28%",ph:"up",ex:"Dec 2026"},
  {id:53,cat:"F1",t:"Will Hamilton win a race for Ferrari?",y:42,v:65,tr:15e3,tag:"F1",h:1,i:"🏎️",s:"active",pk:"Yes 42%",ph:"up",ex:"Dec 2026"},
  {id:54,cat:"Football",t:"2026 FIFA World Cup Winner",y:16,v:3900,tr:134e3,tag:"FIFA WC",h:1,i:"🌍",s:"active",pk:"Spain 16%",ph:"up",ex:"Jul 2026"},
  {id:55,cat:"Football",t:"Will Messi play in FIFA WC 2026?",y:52,v:420,tr:65e3,tag:"FIFA WC",h:1,i:"⚽",s:"active",pk:"Yes 52%",ph:"up",ex:"Jul 2026"},
  {id:56,cat:"Tennis",t:"French Open 2026 Winner",y:28,v:52,tr:9200,tag:"TENNIS",h:0,i:"🎾",s:"active",pk:"Alcaraz 28%",ph:"up",ex:"Jun 2026"},
  {id:57,cat:"Tennis",t:"Wimbledon 2026 Winner",y:30,v:48,tr:8100,tag:"TENNIS",h:0,i:"🎾",s:"active",pk:"Sinner 30%",ph:"up",ex:"Jul 2026"},
  {id:58,cat:"Cricket",t:"Women's T20 WC 2026 Winner",y:24,v:180,tr:21e3,tag:"W T20 WC",h:0,i:"🏏",s:"active",pk:"India W 24%",ph:"up",ex:"Jul 2026"},
  {id:59,cat:"Multi-Sport",t:"CWG 2026 — India Top 4?",y:45,v:95,tr:18e3,tag:"CWG",h:0,i:"🏅",s:"active",pk:"Yes 45%",ph:"up",ex:"Aug 2026"},
  {id:60,cat:"Multi-Sport",t:"Asian Games 2026 — India 20+ Golds?",y:40,v:110,tr:15e3,tag:"ASIAN GAMES",h:0,i:"🏅",s:"active",pk:"Yes 40%",ph:"up",ex:"Oct 2026"},
  {id:61,cat:"UFC",t:"UFC Bantamweight Champ end 2026",y:39,v:45,tr:8900,tag:"UFC",h:0,i:"🥊",s:"active",pk:"Yan 39%",ph:"up",ex:"Dec 2026"},
  {id:62,cat:"Kabaddi",t:"PKL Season 11 Winner",y:24,v:45,tr:12e3,tag:"PKL",h:0,i:"💪",s:"active",pk:"Puneri 24%",ph:"up",ex:"Mar 2026"},
  {id:63,cat:"Esports",t:"Valorant Champions 2026",y:20,v:18,tr:4500,tag:"ESPORTS",h:0,i:"🎮",s:"active",pk:"Sentinels 20%",ph:"up",ex:"Aug 2026"},
];

const CATS=["All","Cricket","Football","Basketball","NFL","F1","Tennis","Olympics","Multi-Sport","UFC","Kabaddi","Esports"];
const PH=[{id:"all",l:"All"},{id:"now",l:"🔴 Live"},{id:"up",l:"📅 Upcoming"},{id:"past",l:"✅ Resolved"}];

const VOUCHERS=[
  {id:"v1",b:"Amazon",i:"🛒",c:"#FF9900",d:"Gift Card",t:[{et:500,v:"₹50"},{et:1e3,v:"₹100"},{et:2500,v:"₹250"},{et:5e3,v:"₹500"}]},
  {id:"v2",b:"Flipkart",i:"📦",c:"#2874F0",d:"Gift Voucher",t:[{et:500,v:"₹50"},{et:1e3,v:"₹100"},{et:2500,v:"₹250"},{et:5e3,v:"₹500"}]},
  {id:"v3",b:"Swiggy",i:"🍔",c:"#FC8019",d:"Food Credit",t:[{et:300,v:"₹30"},{et:750,v:"₹75"},{et:1500,v:"₹150"}]},
  {id:"v4",b:"Zomato",i:"🍕",c:"#E23744",d:"Dining Voucher",t:[{et:300,v:"₹30"},{et:750,v:"₹75"},{et:1500,v:"₹150"}]},
  {id:"v5",b:"BookMyShow",i:"🎬",c:"#C4242B",d:"Movie Ticket",t:[{et:400,v:"₹50"},{et:1e3,v:"₹125"},{et:2e3,v:"₹250"}]},
  {id:"v6",b:"Myntra",i:"👗",c:"#FF3E6C",d:"Fashion Credit",t:[{et:500,v:"₹50"},{et:1500,v:"₹150"},{et:3e3,v:"₹300"}]},
  {id:"v7",b:"Spotify",i:"🎵",c:"#1DB954",d:"Premium",t:[{et:600,v:"1 Month"},{et:1500,v:"3 Months"}]},
  {id:"v8",b:"Google Play",i:"▶️",c:"#34A853",d:"Play Credit",t:[{et:500,v:"₹50"},{et:1e3,v:"₹100"},{et:2500,v:"₹250"}]},
  {id:"v9",b:"Steam",i:"🎮",c:"#1b2838",d:"Wallet",t:[{et:1e3,v:"₹100"},{et:2500,v:"₹250"},{et:5e3,v:"₹500"}]},
  {id:"v10",b:"Uber",i:"🚗",c:"#000",d:"Ride Credit",t:[{et:400,v:"₹50"},{et:1e3,v:"₹125"},{et:2e3,v:"₹250"}]},
  {id:"v11",b:"Nykaa",i:"💄",c:"#FC2779",d:"Beauty Credit",t:[{et:400,v:"₹50"},{et:1e3,v:"₹100"},{et:2e3,v:"₹200"}]},
  {id:"v12",b:"Ajio",i:"🧥",c:"#3B2F63",d:"Fashion Voucher",t:[{et:500,v:"₹50"},{et:1500,v:"₹150"},{et:3e3,v:"₹300"}]},
];

const LB=[{r:1,n:"PredictionKing_IN",s:2847,a:78,t:342,b:"🥇"},{r:2,n:"MumbaiTrader99",s:2634,a:74,t:289,b:"🥈"},{r:3,n:"DataDriven_Delhi",s:2510,a:72,t:256,b:"🥉"},{r:4,n:"CricketOracle",s:2389,a:71,t:198,b:"🏅"},{r:5,n:"PolicyNerd42",s:2201,a:69,t:167,b:"🏅"},{r:6,n:"BengaluruBull",s:2098,a:68,t:145,b:""},{r:7,n:"NiftyNinja",s:1987,a:66,t:134,b:""},{r:8,n:"ClimateWatcher",s:1876,a:65,t:112,b:""}];

function cpmm(yp,am,sd){const y=yp/100,n=1-y,k=y*n;let nY,nN,sh;if(sd==="YES"){nN=n+am/1e4;nY=k/nN;sh=(y-nY)*1e4}else{nY=y+am/1e4;nN=k/nY;sh=(n-nN)*1e4}return{sh:Math.max(1,Math.round(sh)),np:Math.max(2,Math.min(98,Math.round((1-nN/(nY+nN))*100)))};}

function Ad({label}){
  return(
    <div style={{background:"linear-gradient(135deg,#f0fdf4,#eef0ff)",border:"1px dashed #a7f3d0",borderRadius:8,padding:"10px 14px",textAlign:"center",opacity:0.85}}>
      <div style={{fontSize:9,color:C.mut,marginBottom:2}}>SPONSORED</div>
      <div style={{fontSize:13,fontWeight:600,color:C.txt}}>{label || "Your Brand Here"}</div>
      <div style={{fontSize:10,color:C.mut}}>Google AdSense Ready · Ad Space</div>
    </div>
  );
}

function Bar({y}){return <div style={{display:"flex",gap:1,height:5,borderRadius:99,overflow:"hidden",width:"100%"}}><div style={{width:`${y}%`,background:"linear-gradient(90deg,#059669,#34d399)"}} /><div style={{width:`${100-y}%`,background:"linear-gradient(90deg,#fca5a5,#dc2626)"}} /></div>;}

function Crd({m,onBuy}){
  const a=m.s==="active",r=m.s.startsWith("res");
  const phL={now:"🔴 Live",up:"📅 Soon",past:"Ended"}[m.ph];
  return(
    <div style={{background:C.w,border:`1px solid ${C.bdrL}`,borderRadius:10,padding:"12px 14px",boxShadow:C.sh,opacity:r?0.6:1,position:"relative"}}>
      <div style={{position:"absolute",top:8,right:8,display:"flex",gap:4}}>
        {m.ph==="now"&&m.h?<span style={{background:C.gldBg,color:C.gld,fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4}}>🔥</span>:null}
        <span style={{background:r?(m.s==="resolved_yes"?C.accBg:C.redBg):(m.ph==="now"?"#dcfce7":C.bluBg),color:r?(m.s==="resolved_yes"?C.acc:C.red):(m.ph==="now"?"#16a34a":C.blu),fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4}}>{r?(m.s==="resolved_yes"?"✅ Yes":"❌ No"):phL}</span>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:8}}>
        <div style={{width:32,height:32,borderRadius:8,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{m.i}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:C.blu,marginBottom:1}}>{m.tag} · {r?"Ended":m.ex}</div>
          <div style={{fontSize:13,fontWeight:600,color:C.txt,lineHeight:1.35,paddingRight:55}}>{m.t}</div>
        </div>
      </div>
      <div style={{background:C.bg,borderRadius:6,padding:"4px 8px",marginBottom:6,display:"flex",justifyContent:"space-between"}}>
        <span style={{fontSize:11,color:C.sub}}>{r?"Result":"Favorite"}</span>
        <span style={{fontSize:11,fontWeight:600,color:r?(m.s==="resolved_yes"?C.acc:C.red):C.acc}}>{m.pk}</span>
      </div>
      <Bar y={m.s==="resolved_yes"?100:m.s==="resolved_no"?0:m.y} />
      <div style={{display:"flex",justifyContent:"space-between",marginTop:5,marginBottom:a?6:0}}>
        <span style={{fontSize:10,color:C.mut}}>{m.v>=1e3?`$${(m.v/1e3).toFixed(1)}M`:`◈${m.v}K`} · {(m.tr/1e3).toFixed(0)}K traders</span>
        {a&&<span style={{fontSize:10}}><span style={{color:C.acc,fontWeight:600}}>Yes {m.y}¢</span> · <span style={{color:C.red,fontWeight:600}}>No {100-m.y}¢</span></span>}
      </div>
      {a&&<div style={{display:"flex",gap:6,marginTop:4}}>
        <button onClick={()=>onBuy(m)} style={{flex:1,padding:"6px 0",borderRadius:6,border:`1px solid ${C.accBdr}`,background:C.accBg,color:C.acc,fontSize:11,fontWeight:600,cursor:"pointer"}}>Buy Yes ↑</button>
        <button onClick={()=>onBuy(m)} style={{flex:1,padding:"6px 0",borderRadius:6,border:`1px solid ${C.redBdr}`,background:C.redBg,color:C.red,fontSize:11,fontWeight:600,cursor:"pointer"}}>Buy No ↓</button>
      </div>}
    </div>
  );
}

function TradeMdl({m,onX,bal,onTrade}){
  const[sd,setSd]=useState("YES");const[am,setAm]=useState(100);const[dn,setDn]=useState(false);
  const p=sd==="YES"?m.y:100-m.y;const{sh,np}=cpmm(m.y,am,sd);const ok=am<=bal&&am>0;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.2)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}} onClick={onX}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.w,borderRadius:14,width:400,boxShadow:C.shL,animation:"slideUp .25s ease"}}>
        <div style={{padding:"14px 18px 10px",borderBottom:`1px solid ${C.bdrL}`,display:"flex",justifyContent:"space-between"}}>
          <div><div style={{fontSize:10,color:C.blu}}>{m.tag}</div><div style={{fontSize:14,fontWeight:600,marginTop:2,maxWidth:320}}>{m.t}</div></div>
          <button onClick={onX} style={{background:C.bg,border:`1px solid ${C.bdr}`,color:C.sub,width:26,height:26,borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>×</button>
        </div>
        {!dn?(
          <div style={{padding:"14px 18px 18px"}}>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              {["YES","NO"].map(s=><button key={s} onClick={()=>setSd(s)} style={{flex:1,padding:"10px 0",borderRadius:8,border:`2px solid ${sd===s?(s==="YES"?C.acc:C.red):C.bdr}`,background:sd===s?(s==="YES"?C.accBg:C.redBg):C.w,color:sd===s?(s==="YES"?C.acc:C.red):C.mut,fontWeight:600,fontSize:13,cursor:"pointer"}}>{s} — ◈{s==="YES"?m.y:100-m.y}</button>)}
            </div>
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:C.sub}}>Amount</span><span style={{fontSize:12,color:C.sub}}>Bal: {bal.toLocaleString()} ET</span></div>
              <input type="number" value={am} onChange={e=>setAm(Math.max(0,parseInt(e.target.value)||0))} style={{width:"100%",padding:"9px 11px",borderRadius:7,border:`1px solid ${C.bdr}`,background:C.bg,color:C.txt,fontSize:16,fontWeight:600,outline:"none",boxSizing:"border-box"}} />
              <div style={{display:"flex",gap:4,marginTop:5}}>{[50,100,250,500,1e3].map(v=><button key={v} onClick={()=>setAm(v)} style={{flex:1,padding:"4px 0",borderRadius:5,border:`1px solid ${am===v?C.blu:C.bdr}`,background:am===v?C.bluBg:C.w,color:am===v?C.blu:C.mut,fontSize:10,cursor:"pointer"}}>◈{v}</button>)}</div>
            </div>
            <div style={{background:C.bg,borderRadius:7,padding:10,marginBottom:8,border:`1px solid ${C.bdrL}`}}>
              {[["Price",`◈${p}`],["Shares",sh],["Win payout",`◈${sh}`],["Lose payout","◈0"]].map(([l,v])=><div key={l} style={{display:"flex",justifyContent:"space-between",padding:"2px 0"}}><span style={{fontSize:11,color:C.mut}}>{l}</span><span style={{fontSize:11,fontWeight:600,color:v==="◈0"?C.red:C.txt}}>{v}</span></div>)}
            </div>
            <div style={{background:C.orgBg,border:`1px solid ${C.orgBdr}`,borderRadius:5,padding:"6px 8px",marginBottom:12}}><p style={{fontSize:10,color:C.org,margin:0}}>1 ET/share if {sd} wins. Payout after event resolves.</p></div>
            <button onClick={()=>{if(ok){onTrade(m,sd,am,sh,np);setDn(true)}}} disabled={!ok} style={{width:"100%",padding:"10px",borderRadius:7,border:"none",background:ok?(sd==="YES"?"linear-gradient(135deg,#059669,#34d399)":"linear-gradient(135deg,#dc2626,#f87171)"):C.bdr,color:ok?"#fff":C.mut,fontWeight:600,fontSize:13,cursor:ok?"pointer":"not-allowed"}}>{ok?`Buy ${sh} ${sd} for ◈${am}`:"Insufficient Balance"}</button>
          </div>
        ):(
          <div style={{padding:"28px 18px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:6}}>✅</div>
            <div style={{fontSize:15,fontWeight:600,color:C.acc}}>Trade Confirmed</div>
            <p style={{color:C.sub,fontSize:12,margin:"4px 0 14px"}}>Bought <b style={{color:sd==="YES"?C.acc:C.red}}>{sh} {sd}</b> for ◈{am}</p>
            <button onClick={onX} style={{background:C.bg,border:`1px solid ${C.bdr}`,color:C.txt,padding:"7px 22px",borderRadius:6,fontSize:12,cursor:"pointer"}}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const[pg,setPg]=useState("markets");
  const[cat,setCat]=useState("All");
  const[ph,setPh]=useState("all");
  const[q,setQ]=useState("");
  const[mkts,setMkts]=useState(MKT);
  const[bal,setBal]=useState(10000);
  const[pos,setPos]=useState([]);
  const[mdl,setMdl]=useState(null);
  const[toast,setToast]=useState(null);
  const[bought,setBought]=useState([]);
  const[buyOk,setBuyOk]=useState(null);

  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(null),3e3);return()=>clearTimeout(t)}},[toast]);

  const fil=mkts.filter(m=>{
    if(cat!=="All"&&m.cat!==cat)return false;
    if(ph!=="all"&&m.ph!==ph)return false;
    if(q&&!m.t.toLowerCase().includes(q.toLowerCase())&&!m.tag.toLowerCase().includes(q.toLowerCase()))return false;
    return true;
  });

  const doTrade=(m,sd,am,sh,np)=>{
    setBal(b=>b-am);
    setMkts(p=>p.map(x=>x.id===m.id?{...x,y:np,tr:x.tr+1,v:x.v+am}:x));
    setPos(p=>{const e=p.find(x=>x.mid===m.id&&x.sd===sd);if(e)return p.map(x=>x.mid===m.id&&x.sd===sd?{...x,sh:x.sh+sh,cost:x.cost+am}:x);return[...p,{mid:m.id,sd,sh,cost:am}]});
    setToast({sd,sh,t:m.t.slice(0,35)});
  };

  const buyV=(v,tier)=>{
    if(bal<tier.et)return;
    setBal(b=>b-tier.et);
    const item={b:v.b,i:v.i,c:v.c,val:tier.v,et:tier.et,code:`EVX-${v.b.slice(0,3).toUpperCase()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`};
    setBought(p=>[item,...p]);
    setBuyOk(item);
  };

  const cPh=p=>p==="all"?mkts.length:mkts.filter(m=>m.ph===p).length;
  const cCat={};CATS.forEach(c=>{cCat[c]=c==="All"?fil.length:mkts.filter(m=>m.cat===c&&(ph==="all"||m.ph===ph)).length});

  const nav=[{id:"markets",l:"📊 Markets"},{id:"shop",l:"🛒 Shop"},{id:"portfolio",l:`💼 Portfolio${pos.length?` (${pos.length})`:""}`},{id:"leaderboard",l:"🏆 Rankings"}];

  return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Inter',-apple-system,sans-serif",color:C.txt,display:"flex",flexDirection:"column"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}*{box-sizing:border-box;margin:0;padding:0}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}`}</style>

      {toast&&<div style={{position:"fixed",top:18,right:22,background:toast.sd==="YES"?C.accBg:C.redBg,border:`1px solid ${toast.sd==="YES"?C.accBdr:C.redBdr}`,borderRadius:8,padding:"8px 14px",zIndex:1e4,animation:"fadeIn .3s",boxShadow:C.shM}}><div style={{fontSize:12,fontWeight:600,color:toast.sd==="YES"?C.acc:C.red}}>✓ Bought {toast.sh} {toast.sd}</div><div style={{fontSize:10,color:C.mut}}>{toast.t}</div></div>}

      {/* HEADER */}
      <header style={{background:C.w,borderBottom:`1px solid ${C.bdr}`,padding:"0 28px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#059669,#4338ca)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff"}}>E</div>
          <span style={{fontSize:17,fontWeight:700,letterSpacing:-0.5}}>Eventix</span>
          <span style={{fontSize:10,color:C.mut,marginLeft:2}}>Sports Prediction Market</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",gap:3}}>{nav.map(n=><button key={n.id} onClick={()=>setPg(n.id)} style={{padding:"5px 12px",borderRadius:5,border:"none",background:pg===n.id?C.bluBg:"transparent",color:pg===n.id?C.blu:C.sub,fontSize:12,fontWeight:pg===n.id?600:500,cursor:"pointer"}}>{n.l}</button>)}</div>
          <div style={{background:C.accBg,border:`1px solid ${C.accBdr}`,borderRadius:6,padding:"4px 10px",display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:18,height:18,borderRadius:4,background:"linear-gradient(135deg,#059669,#0d9668)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff"}}>◈</div>
            <div><div style={{fontSize:7,color:C.sub,letterSpacing:0.3}}>EVENTUALITY TOKENS</div><span style={{fontSize:14,fontWeight:700,color:C.acc}}>{bal.toLocaleString()} ET</span></div>
          </div>
        </div>
      </header>

      {/* BANNER AD */}
      <div style={{padding:"6px 28px",flexShrink:0}}><Ad label="Dream11 — Play Fantasy Cricket" /></div>

      {/* BODY */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* SIDEBAR */}
        {pg==="markets"&&<aside style={{width:190,background:C.w,borderRight:`1px solid ${C.bdr}`,padding:"14px 12px",flexShrink:0,overflowY:"auto"}}>
          <div style={{fontSize:9,fontWeight:600,color:C.mut,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>Status</div>
          {PH.map(p=><button key={p.id} onClick={()=>setPh(p.id)} style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"6px 8px",borderRadius:5,border:"none",background:ph===p.id?C.bluBg:"transparent",color:ph===p.id?C.blu:C.sub,fontSize:11,fontWeight:ph===p.id?600:500,cursor:"pointer",marginBottom:1,textAlign:"left"}}><span>{p.l}</span><span style={{fontSize:10,color:ph===p.id?C.blu:C.mut}}>{cPh(p.id)}</span></button>)}
          <div style={{borderTop:`1px solid ${C.bdrL}`,margin:"10px 0"}} />
          <div style={{fontSize:9,fontWeight:600,color:C.mut,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>Sport</div>
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"5px 8px",borderRadius:5,border:"none",background:cat===c?C.accBg:"transparent",color:cat===c?C.acc:C.sub,fontSize:10,fontWeight:cat===c?600:500,cursor:"pointer",marginBottom:1,textAlign:"left"}}><span>{c}</span><span style={{fontSize:9,color:cat===c?C.acc:C.mut}}>{cCat[c]}</span></button>)}
          <div style={{marginTop:14}}><Ad label="CRED — Pay Bills & Earn" /></div>
        </aside>}

        {/* MAIN */}
        <main style={{flex:1,overflowY:"auto",padding:"16px 24px 50px"}}>

          {/* MARKETS */}
          {pg==="markets"&&<div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>Sports Markets</h1><p style={{fontSize:12,color:C.mut,marginTop:1}}>{fil.length} markets · Global & India</p></div>
              <input type="text" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} style={{width:220,padding:"7px 12px",borderRadius:6,border:`1px solid ${C.bdr}`,background:C.w,color:C.txt,fontSize:12,outline:"none",boxShadow:C.sh}} />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:10}}>
              {fil.map((m,idx)=><div key={m.id}><Crd m={m} onBuy={mk=>{if(mk.s==="active")setMdl({m:mk})}} />{(idx+1)%8===0&&idx<fil.length-1&&<div style={{marginTop:10}}><Ad label="Groww — Start Investing Today" /></div>}</div>)}
            </div>
            {!fil.length&&<div style={{textAlign:"center",padding:50}}><div style={{fontSize:32}}>🔍</div><p style={{color:C.sub,marginTop:6}}>No markets found</p></div>}
          </div>}

          {/* SHOP / MARKETPLACE */}
          {pg==="shop"&&<div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
              <div><h1 style={{fontSize:20,fontWeight:700,margin:0}}>🛒 Token Marketplace</h1><p style={{fontSize:12,color:C.mut,marginTop:1}}>Spend ET on real brand vouchers</p></div>
              <div style={{background:C.accBg,border:`1px solid ${C.accBdr}`,borderRadius:7,padding:"6px 12px",textAlign:"center"}}><div style={{fontSize:8,color:C.sub}}>Balance</div><div style={{fontSize:18,fontWeight:700,color:C.acc}}>◈{bal.toLocaleString()} ET</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
              {VOUCHERS.map(v=>(
                <div key={v.id} style={{background:C.w,borderRadius:10,border:`1px solid ${C.bdrL}`,boxShadow:C.sh,overflow:"hidden"}}>
                  <div style={{background:`linear-gradient(135deg,${v.c}12,${v.c}05)`,borderBottom:`1px solid ${C.bdrL}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:40,height:40,borderRadius:9,background:C.w,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:C.sh}}>{v.i}</div>
                    <div><div style={{fontSize:15,fontWeight:700}}>{v.b}</div><div style={{fontSize:11,color:C.sub}}>{v.d}</div></div>
                  </div>
                  <div style={{padding:"10px 16px 14px"}}>
                    {v.t.map((tier,ti)=>(
                      <div key={ti} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:ti<v.t.length-1?`1px solid ${C.bdrL}`:"none"}}>
                        <div><div style={{fontSize:13,fontWeight:600}}>{tier.v}</div><div style={{fontSize:10,color:C.mut}}>◈{tier.et.toLocaleString()} ET</div></div>
                        <button onClick={()=>buyV(v,tier)} disabled={bal<tier.et} style={{padding:"6px 14px",borderRadius:6,border:"none",background:bal>=tier.et?v.c:C.bdrL,color:bal>=tier.et?"#fff":C.mut,fontSize:11,fontWeight:600,cursor:bal>=tier.et?"pointer":"not-allowed",opacity:bal>=tier.et?1:0.5}}>
                          {bal>=tier.et?"Redeem":"Need ET"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {bought.length>0&&<div style={{marginTop:24}}>
              <h2 style={{fontSize:16,fontWeight:700,marginBottom:10}}>🎟️ Your Vouchers ({bought.length})</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:8}}>
                {bought.map((p,i)=>(
                  <div key={i} style={{background:C.w,borderRadius:8,padding:14,border:`1px solid ${C.bdrL}`,borderLeft:`3px solid ${p.c}`,boxShadow:C.sh}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <span style={{fontSize:18}}>{p.i}</span>
                      <div><div style={{fontSize:13,fontWeight:600}}>{p.b} — {p.val}</div><span style={{fontSize:10,color:C.acc,fontWeight:600}}>-◈{p.et} ET</span></div>
                    </div>
                    <div style={{background:C.bg,borderRadius:5,padding:"6px 10px",fontFamily:"monospace",fontSize:12,fontWeight:600,textAlign:"center",letterSpacing:1}}>{p.code}</div>
                    <div style={{fontSize:9,color:C.mut,marginTop:4,textAlign:"center"}}>Use at {p.b} · Valid 30 days</div>
                  </div>
                ))}
              </div>
            </div>}
            <div style={{marginTop:16}}><Ad label="PhonePe — India's Payment App" /></div>
          </div>}

          {/* PORTFOLIO */}
          {pg==="portfolio"&&<div>
            <h1 style={{fontSize:20,fontWeight:700,marginBottom:14}}>Your Portfolio</h1>
            {!pos.length?<div style={{textAlign:"center",padding:50,background:C.w,borderRadius:10}}><div style={{fontSize:40}}>📭</div><p style={{color:C.sub,marginTop:8}}>No positions yet — go trade!</p></div>:(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:10}}>
                {pos.map((p,i)=>{
                  const m=mkts.find(x=>x.id===p.mid);if(!m)return null;
                  const a=m.s==="active";
                  const v=a?p.sh*(p.sd==="YES"?m.y:100-m.y)/100:0;
                  return(
                    <div key={i} style={{background:C.w,borderRadius:8,padding:14,borderLeft:`3px solid ${a?C.blu:C.mut}`,boxShadow:C.sh}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:10,fontWeight:600,color:p.sd==="YES"?C.acc:C.red}}>{p.sd} · {a?"Active":"Ended"}</span>
                        <span style={{fontSize:13,fontWeight:600,color:(v-p.cost)>=0?C.acc:C.red}}>{(v-p.cost)>=0?"+":""}◈{Math.round(v-p.cost)}</span>
                      </div>
                      <div style={{fontSize:12,fontWeight:600,marginBottom:4}}>{m.t}</div>
                      <div style={{fontSize:10,color:C.mut,marginBottom:8}}>{p.sh} shares · Paid ◈{p.cost} · Worth ◈{Math.round(v)}</div>
                      {a&&<div style={{display:"flex",gap:6}}>
                        <button onClick={()=>{setBal(b=>b+Math.round(v));setPos(pr=>pr.filter(x=>!(x.mid===p.mid&&x.sd===p.sd)))}} style={{flex:1,padding:"6px",borderRadius:5,border:"none",background:"linear-gradient(135deg,#4338ca,#818cf8)",color:"#fff",fontSize:10,fontWeight:600,cursor:"pointer"}}>📤 Sell ◈{Math.round(v)}</button>
                        <button onClick={()=>{setBal(b=>b+p.cost);setPos(pr=>pr.filter(x=>!(x.mid===p.mid&&x.sd===p.sd)))}} style={{padding:"6px 12px",borderRadius:5,border:`1px solid ${C.bdr}`,background:C.w,color:C.sub,fontSize:10,fontWeight:600,cursor:"pointer"}}>↩️ Cancel</button>
                      </div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>}

          {/* LEADERBOARD */}
          {pg==="leaderboard"&&<div>
            <h1 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Leaderboard</h1>
            <p style={{fontSize:12,color:C.mut,marginBottom:16}}>Top predictors win vouchers monthly</p>
            <div style={{background:C.w,borderRadius:8,border:`1px solid ${C.bdrL}`,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"40px 1fr 70px 70px 90px",padding:"8px 16px",borderBottom:`1px solid ${C.bdrL}`,background:C.bg}}>
                {["#","Trader","Acc","Trades","Score"].map(h=><div key={h} style={{fontSize:9,fontWeight:600,color:C.mut,textTransform:"uppercase"}}>{h}</div>)}
              </div>
              {LB.map(p=>(
                <div key={p.r} style={{display:"grid",gridTemplateColumns:"40px 1fr 70px 70px 90px",padding:"10px 16px",borderBottom:`1px solid ${C.bdrL}`,alignItems:"center"}}>
                  <div style={{fontSize:p.r<=3?15:11,fontWeight:700,color:p.r<=3?C.gld:C.mut}}>{p.b||`#${p.r}`}</div>
                  <div style={{fontSize:12,fontWeight:600}}>{p.n}</div>
                  <div style={{fontSize:11,color:C.sub}}>{p.a}%</div>
                  <div style={{fontSize:11,color:C.sub}}>{p.t}</div>
                  <div style={{fontSize:13,fontWeight:700,color:C.acc}}>{p.s.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16}}><Ad label="Zerodha — Start Trading Stocks" /></div>
          </div>}
        </main>
      </div>

      {/* TRADE MODAL */}
      {mdl&&<TradeMdl m={mdl.m} onX={()=>setMdl(null)} bal={bal} onTrade={doTrade} />}

      {/* VOUCHER CONFIRM MODAL */}
      {buyOk&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.2)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}} onClick={()=>setBuyOk(null)}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.w,borderRadius:14,maxWidth:360,width:"100%",boxShadow:C.shL,padding:"28px 24px",textAlign:"center",animation:"slideUp .25s ease"}}>
          <div style={{fontSize:44,marginBottom:6}}>🎉</div>
          <div style={{fontSize:17,fontWeight:700,color:C.acc,marginBottom:4}}>Voucher Redeemed!</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:10}}>
            <span style={{fontSize:22}}>{buyOk.i}</span>
            <span style={{fontSize:15,fontWeight:600}}>{buyOk.b} — {buyOk.val}</span>
          </div>
          <div style={{background:C.bg,borderRadius:7,padding:"10px 14px",fontFamily:"monospace",fontSize:15,fontWeight:700,letterSpacing:2,marginBottom:10}}>{buyOk.code}</div>
          <p style={{fontSize:11,color:C.sub,marginBottom:4}}>◈{buyOk.et} ET deducted</p>
          <p style={{fontSize:10,color:C.mut,marginBottom:14}}>Use at {buyOk.b} · Valid 30 days</p>
          <button onClick={()=>setBuyOk(null)} style={{background:C.acc,color:"#fff",border:"none",padding:"8px 24px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer"}}>Got it!</button>
        </div>
      </div>}

      {/* FOOTER AD + FOOTER */}
      <div style={{padding:"6px 28px",flexShrink:0}}><Ad label="MPL — Play & Win Prizes" /></div>
      <footer style={{background:C.w,borderTop:`1px solid ${C.bdr}`,padding:"8px 28px",display:"flex",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:10,color:C.mut}}>Eventix — Eventuality Tokens (ET) · Free-to-play · India Online Gaming Act 2025</span>
        <span style={{fontSize:10,color:C.mut}}>No real money · Skill-based</span>
      </footer>
    </div>
  );
}
