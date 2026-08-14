import{r as f,j as e,A as H,m as v,c as J}from"./react-B1XqgekP.js";const N=4,Q=[{id:"ai-generic",icon:"ai-generic",color:"#111111"},{id:"gemini",icon:"gemini",color:"#4C8DF6"},{id:"elevenlabs",icon:"elevenlabs",color:"#27272A"},{id:"deepseek",icon:"deepseek",color:"#4D6BFE"},{id:"zai",icon:"zai",color:"#3E63DD"},{id:"manus",icon:"manus",color:"#7C3AED"},{id:"kimi",icon:"kimi",color:"#0F766E"},{id:"xai",icon:"xai",color:"#000000"},{id:"openai",icon:"openai",color:"#10A37F"}];function Z(t){const a=t.length,n=Math.max(2,Math.round(a/3));let r=Math.ceil((a+n)/N);r%2===0&&(r+=1);const o=r*N-a,s=Math.floor(r/2),c=new Array(r).fill(0),x=new Array(r).fill(0);let l=o;for(let p=0;l>0&&p<=s;p++){const h=s-p,g=s+p,m=h===g?[h]:[h,g];for(const u of m){if(l<=0)break;c[u]+=1,x[u]=p,l-=1}}const d=[1,2,0,3],b=[];let S=0;for(let p=0;p<r;p++){const h=c[p],g=new Set;if(h===1)g.add(d[x[p]%d.length]);else for(let m=0;m<h;m++){const u=Math.floor(m/2),E=m%2===0?u:N-1-u;g.add(E)}for(let m=0;m<N;m++)b.push(g.has(m)?null:t[S++]??null)}return b}const q=Z(Q);function ee(t){const a=[...t];for(let n=a.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[a[n],a[r]]=[a[r],a[n]]}return a}const te=q.map((t,a)=>t?a:-1).filter(t=>t!==-1),ae=ee(te),ne=new Map(ae.map((t,a)=>[t,a*.07])),F=[{prompt:"how's the market today?",model:"Z.ai",tileId:"zai"},{prompt:"write a poem about the ocean",model:"ChatGPT",tileId:"openai"},{prompt:"debug this python traceback",model:"Grok",tileId:"xai"},{prompt:"summarize this contract for me",model:"Gemini",tileId:"gemini"},{prompt:"turn this script into a voiceover",model:"ElevenLabs",tileId:"elevenlabs"},{prompt:"analyze this dataset for outliers",model:"DeepSeek",tileId:"deepseek"},{prompt:"plan a multi-step research task",model:"Manus",tileId:"manus"},{prompt:"catch me up on today's news",model:"Kimi",tileId:"kimi"}];function w(t,a){return new Promise((n,r)=>{const i=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(i),r(new Error("cancelled")))})}function re(t,a){const n=t.replace("#",""),r=n.length===3?n.split("").map(x=>x+x).join(""):n,i=parseInt(r,16),o=i>>16&255,s=i>>8&255,c=i&255;return`rgba(${o}, ${s}, ${c}, ${a})`}const O="0 0 0 0.5px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.05)";function oe({tile:t,index:a,bouncing:n,selected:r}){return t?e.jsx(v.div,{className:"flex aspect-square w-full items-center justify-center rounded-2xl",initial:{opacity:0,scale:.9,y:0},animate:r?{opacity:1,y:0,scale:1.06,backgroundColor:t.color,boxShadow:`0 14px 28px ${re(t.color,.28)}`}:n?{opacity:1,y:[0,-10,0],scale:[1,1.07,1],backgroundColor:"#ffffff",boxShadow:O}:{opacity:1,y:0,scale:1,backgroundColor:"#ffffff",boxShadow:O},transition:r?{type:"spring",stiffness:320,damping:14}:n?{duration:.5,repeat:1/0,ease:"easeInOut",delay:ne.get(a)??0}:{duration:.25},children:e.jsx("img",{src:`./icons/${t.icon}.svg`,alt:t.id,className:"size-6 object-contain",style:{filter:r?"brightness(0) invert(1)":"none",transition:"filter 0.3s"}})}):e.jsx("div",{className:"aspect-square w-full rounded-2xl border border-black/[0.04] bg-black/[0.025]"})}function ie(){const[t,a]=f.useState(""),[n,r]=f.useState(!1),[i,o]=f.useState(null);return f.useEffect(()=>{const s={current:!1};async function c(){let x=0;try{for(;;){const l=F[x%F.length];x++,o(null);for(let d=1;d<=l.prompt.length;d++)a(l.prompt.slice(0,d)),await w(32,s);await w(450,s),r(!0),await w(1500,s),r(!1),o({tileId:l.tileId,model:l.model}),await w(2400,s);for(let d=l.prompt.length;d>=0;d--)a(l.prompt.slice(0,d)),await w(14,s);o(null),await w(350,s)}}catch{}}return c(),()=>{s.current=!0}},[]),e.jsx("section",{className:"bg-[#f4f3f1] px-6 py-24",children:e.jsxs("div",{className:"mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[420px]",children:[e.jsx("p",{className:"text-2xl italic text-neutral-900",style:{fontFamily:"var(--font-google-sans)"},children:"Discover the"}),e.jsx("h2",{className:"text-[40px] leading-tight font-bold",style:{fontFamily:"var(--font-google-sans)",color:"#f4511e"},children:"Conductor mode"}),e.jsx("div",{className:"mt-8 flex h-14 items-center rounded-full bg-white px-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]",children:e.jsxs("span",{className:"text-[15px] text-neutral-800",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"text-neutral-400",children:"/ "}),t,e.jsx("span",{className:"ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-neutral-300 align-middle"})]})}),e.jsxs("div",{className:"mt-6 flex items-center gap-2 text-sm text-neutral-500",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Best model for this prompt:"}),e.jsx(H,{mode:"wait",children:i&&e.jsx(v.span,{initial:{opacity:0,y:4},animate:{opacity:1,y:0},exit:{opacity:0,y:-4},transition:{duration:.25},className:"font-semibold text-neutral-900",children:i.model},i.model)})]})]}),e.jsx("div",{className:"grid w-full max-w-[420px] grid-cols-4 gap-3.5",children:q.map((s,c)=>e.jsx(oe,{tile:s,index:c,bouncing:n,selected:s?(i==null?void 0:i.tileId)===s.id:!1},c))})]})})}const C=4,se=[{id:"ai-generic",icon:"ai-generic",color:"#111111"},{id:"gemini",icon:"gemini",color:"#4C8DF6"},{id:"elevenlabs",icon:"elevenlabs",color:"#27272A"},{id:"deepseek",icon:"deepseek",color:"#4D6BFE"},{id:"zai",icon:"zai",color:"#3E63DD"},{id:"manus",icon:"manus",color:"#7C3AED"},{id:"kimi",icon:"kimi",color:"#0F766E"},{id:"xai",icon:"xai",color:"#000000"},{id:"openai",icon:"openai",color:"#10A37F"}];function ce(t){const a=t.length,n=Math.max(2,Math.round(a/3));let r=Math.ceil((a+n)/C);r%2===0&&(r+=1);const o=r*C-a,s=Math.floor(r/2),c=new Array(r).fill(0),x=new Array(r).fill(0);let l=o;for(let p=0;l>0&&p<=s;p++){const h=s-p,g=s+p,m=h===g?[h]:[h,g];for(const u of m){if(l<=0)break;c[u]+=1,x[u]=p,l-=1}}const d=[1,2,0,3],b=[];let S=0;for(let p=0;p<r;p++){const h=c[p],g=new Set;if(h===1)g.add(d[x[p]%d.length]);else for(let m=0;m<h;m++){const u=Math.floor(m/2),E=m%2===0?u:C-1-u;g.add(E)}for(let m=0;m<C;m++)b.push(g.has(m)?null:t[S++]??null)}return b}const U=ce(se);function le(t){const a=[...t];for(let n=a.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[a[n],a[r]]=[a[r],a[n]]}return a}const de=U.map((t,a)=>t?a:-1).filter(t=>t!==-1),pe=le(de),me=new Map(pe.map((t,a)=>[t,a*.06])),B=[{prompt:"how's the market today?",model:"Z.ai",variant:"GLM-4.6",tileId:"zai"},{prompt:"write a poem about the ocean",model:"ChatGPT",variant:"GPT-5.1",tileId:"openai"},{prompt:"debug this python traceback",model:"Grok",variant:"Grok 4",tileId:"xai"},{prompt:"summarize this contract for me",model:"Gemini",variant:"2.5 Pro",tileId:"gemini"},{prompt:"turn this script into a voiceover",model:"ElevenLabs",variant:"v3",tileId:"elevenlabs"},{prompt:"analyze this dataset for outliers",model:"DeepSeek",variant:"V3.2",tileId:"deepseek"},{prompt:"plan a multi-step research task",model:"Manus",variant:"1.5",tileId:"manus"},{prompt:"catch me up on today's news",model:"Kimi",variant:"K2",tileId:"kimi"}];function j(t,a){return new Promise((n,r)=>{const i=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(i),r(new Error("cancelled")))})}function D(t,a){const n=t.replace("#",""),r=n.length===3?n.split("").map(x=>x+x).join(""):n,i=parseInt(r,16),o=i>>16&255,s=i>>8&255,c=i&255;return`rgba(${o}, ${s}, ${c}, ${a})`}const y="#f4511e",P="0 0 0 1px rgba(255,255,255,0.06)";function X({inset:t=-2}){const a="pointer-events-none absolute size-3 border-[#f4511e]/70",n=`${t}px`;return e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`${a} border-l-2 border-t-2`,style:{left:n,top:n}}),e.jsx("span",{className:`${a} border-r-2 border-t-2`,style:{right:n,top:n}}),e.jsx("span",{className:`${a} border-b-2 border-l-2`,style:{left:n,bottom:n}}),e.jsx("span",{className:`${a} border-b-2 border-r-2`,style:{right:n,bottom:n}})]})}function xe({tile:t,index:a,bouncing:n,selected:r}){return t?e.jsxs(v.div,{className:"relative flex aspect-square w-full items-center justify-center rounded-md",initial:{opacity:0,scale:.9,y:0,rotate:0},animate:r?{opacity:1,y:0,rotate:0,scale:1.08,backgroundColor:t.color,boxShadow:`0 0 0 1px ${D(y,.7)}, 0 16px 32px ${D(t.color,.35)}`}:n?{opacity:1,y:[0,-9,0],rotate:[0,a%2===0?5:-5,0],scale:[1,1.08,1],backgroundColor:"#141414",boxShadow:P}:{opacity:1,y:0,rotate:0,scale:1,backgroundColor:"#141414",boxShadow:P},transition:r?{type:"spring",stiffness:320,damping:14}:n?{duration:.45,repeat:1/0,ease:"easeInOut",delay:me.get(a)??0}:{duration:.25},children:[r&&e.jsx(X,{inset:-4}),e.jsx("img",{src:`./icons/${t.icon}.svg`,alt:t.id,className:"size-6 object-contain",style:{filter:r?"brightness(0) invert(1)":"invert(1) brightness(1.7)",transition:"filter 0.3s"}})]}):e.jsx("div",{className:"aspect-square w-full rounded-md border border-white/[0.06] bg-white/[0.02]"})}function fe(){const[t,a]=f.useState(""),[n,r]=f.useState(!1),[i,o]=f.useState(null);return f.useEffect(()=>{const s={current:!1};async function c(){let x=0;try{for(;;){const l=B[x%B.length];x++,o(null);for(let d=1;d<=l.prompt.length;d++)a(l.prompt.slice(0,d)),await j(32,s);await j(450,s),r(!0),await j(1500,s),r(!1),o({tileId:l.tileId,model:l.model,variant:l.variant}),await j(2400,s);for(let d=l.prompt.length;d>=0;d--)a(l.prompt.slice(0,d)),await j(14,s);o(null),await j(350,s)}}catch{}}return c(),()=>{s.current=!0}},[]),e.jsxs("section",{className:"relative overflow-hidden bg-[#0a0a0a] px-6 py-24",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 opacity-[0.06]",style:{backgroundImage:"linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),e.jsxs("div",{className:"relative mx-auto flex max-w-5xl flex-col-reverse items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"relative w-full max-w-[420px]",children:[e.jsx(X,{inset:-10}),e.jsx("div",{className:"grid grid-cols-4 gap-2.5 p-2",style:{transform:"rotate(-2.5deg) scale(1.02)"},children:U.map((s,c)=>e.jsx(xe,{tile:s,index:c,bouncing:n,selected:s?(i==null?void 0:i.tileId)===s.id:!1},c))})]}),e.jsxs("div",{className:"max-w-[420px]",children:[e.jsx("p",{className:"text-xs uppercase tracking-[0.3em]",style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",color:y},children:"// select mode"}),e.jsxs("h2",{className:"mt-2 text-[42px] leading-[0.95] font-bold uppercase text-white",style:{fontFamily:"var(--font-google-sans)",letterSpacing:"-0.01em"},children:["Conductor",e.jsx("br",{}),e.jsx("span",{style:{WebkitTextStroke:`1.5px ${y}`,color:"transparent"},children:"mode"})]}),e.jsxs("div",{className:"mt-8 flex h-14 items-center gap-2 border border-white/15 bg-black px-5",children:[e.jsx("span",{style:{color:y,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:">"}),e.jsxs("span",{className:"text-[15px] text-white/90",style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:[t,e.jsx("span",{className:"ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse align-middle",style:{backgroundColor:y}})]})]}),e.jsxs("div",{className:"mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40",style:{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"},children:[e.jsx("span",{children:"best model"}),e.jsx("span",{className:"text-white/20",children:"/"}),e.jsx(H,{mode:"wait",children:i&&e.jsxs(v.span,{initial:{opacity:0,x:6},animate:{opacity:1,x:0},exit:{opacity:0,x:-6},transition:{duration:.2},className:"flex items-center gap-2",children:[e.jsx("span",{className:"bg-white px-2 py-0.5 text-[11px] font-bold text-black",children:i.model}),e.jsx("span",{className:"border px-2 py-0.5 text-[11px]",style:{borderColor:D(y,.6),color:y},children:i.variant})]},i.model)})]})]})]})]})}const W=[{label:"Your request",sub:"Text · Files · Context"},{label:"Conductor",sub:"Understands the whole task",emphasis:!0},{label:"Model + Tools",sub:"Chosen for this task"},{label:"Verification",sub:"Second opinion when needed"},{label:"Response",sub:"<One single response, ready>"}],K={hidden:{opacity:0,y:10},visible:t=>({opacity:1,y:0,transition:{delay:t*.07,duration:.5,ease:[.16,1,.3,1]}})};function he({index:t,label:a,sub:n,emphasis:r}){return e.jsxs(v.li,{custom:t,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},variants:K,className:`cm-node${r?" cm-node--emphasis":""}`,children:[e.jsx("span",{className:"cm-node-label",children:a}),e.jsx("span",{className:"cm-node-sub",children:n})]})}function ge({index:t}){const a=`${(t-1)*.5}s`,n=`H${t}`,r=`V${t}`;return e.jsxs(v.li,{custom:t,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},variants:K,className:`cm-connector cm-connector--${t}`,"aria-hidden":"true",children:[e.jsxs("svg",{className:"cm-conn-svg cm-conn-h",width:"44",height:"24",viewBox:"0 0 44 24",focusable:"false",children:[e.jsx("path",{id:`trail${n}`,className:"cm-trail",d:"M3,12 H41"}),e.jsxs("rect",{className:"cm-packet",width:"5",height:"5",x:"-2.5",y:"-2.5",children:[e.jsx("animateMotion",{dur:"2s",begin:a,repeatCount:"indefinite",children:e.jsx("mpath",{href:`#trail${n}`})}),e.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.15;0.85;1",dur:"2s",begin:a,repeatCount:"indefinite"})]})]}),e.jsxs("svg",{className:"cm-conn-svg cm-conn-v",width:"24",height:"40",viewBox:"0 0 24 40",focusable:"false",children:[e.jsx("path",{id:`trail${r}`,className:"cm-trail",d:"M12,3 V37"}),e.jsxs("rect",{className:"cm-packet",width:"5",height:"5",x:"-2.5",y:"-2.5",children:[e.jsx("animateMotion",{dur:"2s",begin:a,repeatCount:"indefinite",children:e.jsx("mpath",{href:`#trail${r}`})}),e.jsx("animate",{attributeName:"opacity",values:"0;1;1;0",keyTimes:"0;0.15;0.85;1",dur:"2s",begin:a,repeatCount:"indefinite"})]})]})]})}const ue={type:"mark",symbol:"✓",tone:"neutral",sr:"Yes"},k={type:"mark",symbol:"✓",tone:"active",sr:"Yes"},$={type:"mark",symbol:"✕",tone:"absent",sr:"No"},be=[{label:"Picks the right model for each question",other:ue,conductor:k},{label:"Understands the whole task, not just the prompt",other:$,conductor:k},{label:"Keeps context when switching models",other:$,conductor:k},{label:"Splits the work and delegates parts automatically",other:$,conductor:k},{label:"Verifies the result before handing it to you",other:$,conductor:k},{label:"You choose cost, speed, or quality",other:{type:"word",text:"Rarely",tone:"neutral"},conductor:k},{label:"You need to understand models and providers",other:{type:"word",text:"Yes",tone:"neutral"},conductor:{type:"word",text:"No",tone:"active"}}];function Y({cell:t,label:a}){return t.type==="mark"?e.jsxs("td",{"data-label":a,children:[e.jsx("span",{className:`cm-mark cm-mark--${t.tone}`,"aria-hidden":"true",children:t.symbol}),e.jsx("span",{className:"cm-sr-only",children:t.sr})]}):e.jsx("td",{"data-label":a,children:e.jsx("span",{className:`cm-word cm-word--${t.tone}`,children:t.text})})}const ye=[{tag:"Rework",title:"No more repeating yourself",desc:"Your files, preferences, and conversation history stay with you even when the Conductor switches intelligence under the hood."},{tag:"Simplicity",title:"Zero technical decisions",desc:'You never need to know what a "model" is, choose between options with strange names, or understand technical limits. That’s the Conductor’s job.'},{tag:"Trust",title:"More care on the tasks that matter",desc:"On more sensitive requests, the Conductor checks in with a second opinion before handing you the answer — like a silent reviewer."},{tag:"Control",title:"You set the priority",desc:"Want a fast answer, a cheaper one, or the best possible result? You choose what matters in the moment — the Conductor adapts."},{tag:"Evolution",title:"Always the most current intelligence",desc:"When a better intelligence shows up on the market, the Conductor already tests it and starts using it on the right tasks — no platform switch, nothing new to learn."}];function ve(){return e.jsxs("section",{className:"cm-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-36",children:[e.jsx("div",{className:"cm-grain","aria-hidden":"true"}),e.jsxs("div",{className:"relative mx-auto max-w-[1180px]",children:[e.jsxs("div",{children:[e.jsx("p",{className:"cm-eyebrow",children:"How it works"}),e.jsx("ol",{className:"cm-diagram","aria-label":"Conductor Mode flow, from request to response",children:W.map((t,a)=>e.jsxs(f.Fragment,{children:[e.jsx(he,{index:a,label:t.label,sub:t.sub,emphasis:t.emphasis}),a<W.length-1&&e.jsx(ge,{index:a+1})]},t.label))}),e.jsx("p",{className:"cm-caption",children:"one request, one conducted path, one response"})]}),e.jsxs("div",{className:"cm-block",children:[e.jsxs("div",{className:"cm-block-header",children:[e.jsx("h2",{className:"cm-block-title",children:"What actually changes"}),e.jsx("p",{className:"cm-block-subtitle",children:"Picking the right model is table stakes by now. The difference is everything else."})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"cm-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:"Other platforms"}),e.jsx("th",{scope:"col",children:"Starchild Conductor"})]})}),e.jsx("tbody",{children:be.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.label}),e.jsx(Y,{cell:t.other,label:"Other platforms"}),e.jsx(Y,{cell:t.conductor,label:"Starchild Conductor"})]},t.label))})]})})]}),e.jsxs("div",{className:"cm-block",children:[e.jsx("div",{className:"cm-block-header",children:e.jsx("h2",{className:"cm-block-title",children:"What this changes for the people using it"})}),e.jsx("div",{className:"cm-benefits",children:ye.map(t=>e.jsxs("div",{className:"cm-benefit",children:[e.jsx("span",{className:"cm-benefit-tag",children:t.tag}),e.jsx("h3",{className:"cm-benefit-title",children:t.title}),e.jsx("p",{className:"cm-benefit-desc",children:t.desc})]},t.tag))}),e.jsxs("div",{className:"cm-cta",children:[e.jsx("p",{className:"cm-cta-line",children:"Stop choosing tools. Start asking for results."}),e.jsx("button",{className:"cm-cta-button",type:"button",children:"Try Conductor Mode"})]})]})]}),e.jsx("style",{children:`
        .cm-section {
          --cm-border: #262626;
          --cm-border-strong: #3d3d3d;
          --cm-text: #d0d0d0;
          --cm-text-2: #6b6b6b;
          --cm-text-3: #454545;
          --cm-green: #3ecf8e;
          --cm-green-wash: rgba(62, 207, 142, 0.08);
        }

        .cm-section ul, .cm-section ol { margin: 0; padding: 0; list-style: none; }
        .cm-section table { border-collapse: collapse; }
        .cm-section button { font: inherit; }

        .cm-sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
        }

        .cm-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .cm-block { margin-top: 132px; }

        .cm-eyebrow {
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.32em; color: var(--cm-text-2); text-align: center; margin: 0 0 56px;
        }

        .cm-block-header { max-width: 46ch; margin: 0 auto 56px; text-align: center; }

        .cm-block-title {
          font-family: var(--font-mono); font-size: 15px; font-weight: 600;
          letter-spacing: 0.16em; color: var(--cm-text); margin: 0 0 14px;
          text-transform: uppercase; text-wrap: balance;
        }

        .cm-block-subtitle {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.65;
          color: var(--cm-text-2); margin: 0; text-wrap: balance;
        }

        /* diagram */
        .cm-diagram { display: flex; align-items: stretch; gap: 0; }

        .cm-node {
          flex: 1 1 0; min-width: 0; border: 1px solid var(--cm-border); border-radius: 3px;
          padding: 26px 16px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 9px; text-align: center; background: #0a0a0a;
        }

        .cm-node--emphasis { border-color: var(--cm-border-strong); position: relative; }
        .cm-node--emphasis::before {
          content: ""; position: absolute; top: -1px; left: -1px; width: 6px; height: 6px;
          background: var(--cm-green);
        }

        .cm-node-label {
          font-family: var(--font-mono); font-size: 12.5px; font-weight: 600;
          letter-spacing: 0.05em; color: var(--cm-text); text-transform: uppercase;
        }
        .cm-node-sub {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.03em;
          color: var(--cm-text-2); line-height: 1.5; text-transform: uppercase;
        }

        .cm-connector {
          flex: 0 0 44px; align-self: center; display: flex; align-items: center; justify-content: center;
        }
        .cm-conn-svg { display: block; overflow: visible; }
        .cm-conn-svg.cm-conn-v { display: none; }

        .cm-trail {
          fill: none; stroke: var(--cm-border-strong); stroke-width: 1; stroke-dasharray: 3 3;
          animation: cm-trail-pulse 3s ease-in-out infinite;
        }
        .cm-packet { fill: var(--cm-green); }

        .cm-connector--1 .cm-trail { animation-delay: 0s; }
        .cm-connector--2 .cm-trail { animation-delay: 0.5s; }
        .cm-connector--3 .cm-trail { animation-delay: 1s; }
        .cm-connector--4 .cm-trail { animation-delay: 1.5s; }

        @keyframes cm-trail-pulse {
          0%, 100% { stroke-opacity: 0.25; }
          50% { stroke-opacity: 0.6; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cm-packet { display: none; }
        }

        .cm-caption {
          font-family: var(--font-denton); font-style: italic; font-size: 20px;
          color: var(--cm-text-2); text-align: center; max-width: 32ch; margin: 44px auto 0; line-height: 1.5;
        }

        /* table */
        .cm-table { width: 100%; font-family: var(--font-mono); font-size: 13.5px; }

        .cm-table thead th {
          font-weight: 500; letter-spacing: 0.09em; color: var(--cm-text-2); text-transform: uppercase;
          text-align: center; padding: 0 12px 18px; border-bottom: 1px solid var(--cm-border);
        }
        .cm-table thead th:first-child { text-align: left; }

        .cm-table tbody td {
          padding: 18px 12px; border-bottom: 1px solid var(--cm-border); vertical-align: middle;
        }
        .cm-table tbody tr:last-child td { border-bottom: none; }
        .cm-table tbody td:first-child {
          text-align: left; color: var(--cm-text); letter-spacing: 0.01em; padding-left: 4px;
        }
        .cm-table tbody td:not(:first-child) { text-align: center; width: 220px; }

        .cm-mark { font-size: 16px; }
        .cm-mark--neutral { color: var(--cm-text-2); }
        .cm-mark--absent { color: var(--cm-text-3); }
        .cm-mark--active { color: var(--cm-green); }

        .cm-word { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--cm-text-2); }
        .cm-word--active { color: var(--cm-green); }

        /* benefits */
        .cm-benefits {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          column-gap: 44px; row-gap: 52px;
        }
        .cm-benefit {
          display: flex; flex-direction: column; gap: 12px; padding-top: 22px;
          border-top: 1px solid var(--cm-border);
        }
        .cm-benefit-tag {
          display: flex; align-items: center; gap: 9px; font-family: var(--font-mono);
          font-size: 11px; font-weight: 600; letter-spacing: 0.18em; color: var(--cm-green);
          text-transform: uppercase;
        }
        .cm-benefit-tag::before { content: ""; width: 6px; height: 6px; background: var(--cm-green); flex: none; }
        .cm-benefit-title {
          font-family: var(--font-google-sans); font-size: 18.5px; font-weight: 600;
          color: var(--cm-text); margin: 0; text-wrap: balance;
        }
        .cm-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.65;
          color: var(--cm-text-2); margin: 0; max-width: 36ch;
        }

        .cm-cta {
          margin-top: 96px; padding-top: 64px; border-top: 1px solid var(--cm-border);
          display: flex; flex-direction: column; align-items: center; gap: 30px; text-align: center;
        }
        .cm-cta-line {
          font-family: var(--font-mono); font-size: 15px; font-weight: 500; letter-spacing: 0.09em;
          color: var(--cm-text); max-width: 30ch; margin: 0; text-transform: uppercase;
        }
        .cm-cta-button {
          font-family: var(--font-mono); font-size: 12.5px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--cm-green); background: transparent;
          border: 1px solid var(--cm-green); border-radius: 2px; padding: 17px 34px; cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .cm-cta-button:hover { background-color: var(--cm-green-wash); }
        .cm-cta-button:focus-visible { outline: 2px solid var(--cm-green); outline-offset: 3px; }

        @media (max-width: 760px) {
          .cm-section { padding-top: 84px; padding-bottom: 84px; }
          .cm-block { margin-top: 76px; }
          .cm-eyebrow, .cm-block-header { margin-bottom: 40px; }

          .cm-diagram { flex-direction: column; align-items: stretch; }
          .cm-node { padding: 22px 18px; }
          .cm-connector { flex-basis: 40px; }
          .cm-conn-svg.cm-conn-h { display: none; }
          .cm-conn-svg.cm-conn-v { display: block; }

          .cm-table, .cm-table thead, .cm-table tbody, .cm-table tr, .cm-table td {
            display: block; width: 100%;
          }
          .cm-table thead {
            position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);
          }
          .cm-table tbody tr {
            border: 1px solid var(--cm-border); border-radius: 3px; padding: 18px 18px 6px; margin-bottom: 14px;
          }
          .cm-table tbody tr:last-child { margin-bottom: 0; }
          .cm-table tbody td { border-bottom: none; padding: 0 0 14px; width: auto; }
          .cm-table tbody td:first-child {
            padding-bottom: 14px; margin-bottom: 12px; border-bottom: 1px dashed var(--cm-border);
          }
          .cm-table tbody td:not(:first-child) {
            display: flex; align-items: center; justify-content: space-between; text-align: left;
          }
          .cm-table tbody td:not(:first-child)::before {
            content: attr(data-label); font-size: 10.5px; letter-spacing: 0.08em; color: var(--cm-text-2);
          }

          .cm-benefits { grid-template-columns: 1fr; row-gap: 40px; }
          .cm-cta { margin-top: 64px; padding-top: 48px; }
          .cm-cta-button { width: 100%; }
        }
      `})]})}const _=[{id:"openai",name:"OpenAI",color:"var(--rc-1)"},{id:"gemini",name:"Gemini",color:"var(--rc-2)"},{id:"xai",name:"Grok",color:"var(--rc-3)"},{id:"deepseek",name:"DeepSeek",color:"var(--rc-4)"}],I=["Jan","Mar","May","Jul"],M=[{label:"Writing",ranks:{openai:[1,2,3,3],gemini:[2,1,1,2],deepseek:[4,3,2,1],xai:[3,4,4,4]}},{label:"Image",ranks:{xai:[1,2,1,2],deepseek:[2,1,3,4],gemini:[3,4,4,3],openai:[4,3,2,1]}},{label:"Programming",ranks:{deepseek:[1,2,3,4],openai:[2,3,1,2],xai:[4,1,2,3],gemini:[3,4,4,1]}}],R=460,we=220,G=26,T={1:18,2:73,3:128,4:183};function je(t){const a=R-G*2;return G+a*t/(I.length-1)}function ke(t){let a=`M${t[0].x},${t[0].y}`;for(let n=1;n<t.length;n++){const r=t[n-1],i=t[n],o=(r.x+i.x)/2;a+=` C${o},${r.y} ${o},${i.y} ${i.x},${i.y}`}return a}function Ne(t,a){const[n,r]=f.useState(0);return f.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const o=setInterval(()=>r(s=>(s+1)%t),a);return()=>clearInterval(o)},[t,a]),[n,r]}function Ce(){const[t,a]=Ne(M.length,4200),[n,r]=f.useState(null),i=M[t];return e.jsxs("section",{className:"rc-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[400px]",children:[e.jsx("p",{className:"rc-eyebrow",children:"Model rankings"}),e.jsx("h2",{className:"rc-headline",children:"Yesterday’s best model is rarely today’s. We track that so you don’t have to."}),e.jsx("p",{className:"rc-subhead",children:"It’s ours, not yours. Every time a new model comes out, the Conductor evaluates it and updates how it routes tasks. You never have to research, compare, or switch platforms to benefit from what’s new — you’re already on it."})]}),e.jsxs("div",{className:"rc-card w-full md:max-w-[600px]",children:[e.jsxs("button",{type:"button",className:"rc-category",onClick:()=>a((t+1)%M.length),"aria-label":`Showing ${i.label} rankings — click to advance`,children:[e.jsx("span",{className:"rc-category-dot"}),i.label]}),e.jsxs("svg",{className:"rc-svg",viewBox:`0 0 ${R} ${we}`,role:"img","aria-label":`${i.label} model ranking, January to July`,focusable:"false",children:[[1,2,3,4].map(o=>e.jsx("line",{className:"rc-grid",x1:0,x2:R,y1:T[o],y2:T[o]},o)),_.map(o=>{const s=i.ranks[o.id],c=s.map((d,b)=>({x:je(b),y:T[d]})),x=c[c.length-1],l=n!==null&&n!==o.id;return e.jsxs("g",{className:l?"rc-series rc-series--dim":"rc-series",onMouseEnter:()=>r(o.id),onMouseLeave:()=>r(null),children:[e.jsx("path",{className:"rc-line",style:{d:`path("${ke(c)}")`,stroke:o.color}}),e.jsx("circle",{className:"rc-dot",cx:x.x,cy:x.y,r:5,style:{fill:o.color},children:e.jsx("title",{children:`${o.name} — ${i.label} — ${I[I.length-1]}: rank ${s[s.length-1]}`})})]},o.id)})]}),e.jsx("div",{className:"rc-axis",children:I.map(o=>e.jsx("span",{children:o},o))}),e.jsx("div",{className:"rc-legend",role:"group","aria-label":"Models",children:_.map(o=>e.jsxs("button",{type:"button",className:`rc-legend-item${n===o.id?" rc-legend-item--active":""}`,onMouseEnter:()=>r(o.id),onMouseLeave:()=>r(null),onFocus:()=>r(o.id),onBlur:()=>r(null),children:[e.jsx("span",{className:"rc-legend-swatch",style:{background:o.color},"aria-hidden":"true"}),e.jsx("img",{src:`./icons/${o.id}.svg`,alt:"",className:"rc-legend-icon","aria-hidden":"true"}),o.name]},o.id))})]})]}),e.jsx("style",{children:`
        .rc-section {
          --rc-border: #262626;
          --rc-text: #d0d0d0;
          --rc-text-2: #6b6b6b;
          --rc-green: #3ecf8e;
          --rc-1: #3987e5;
          --rc-2: #d95926;
          --rc-3: #199e70;
          --rc-4: #c98500;
        }

        .rc-eyebrow {
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--rc-text-2);
          margin: 0 0 20px;
        }
        .rc-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: #ffffff;
          font-size: 30px; line-height: 1.2; letter-spacing: -0.01em; margin: 0 0 18px;
          text-wrap: balance;
        }
        .rc-subhead {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.65;
          color: var(--rc-text-2); margin: 0; text-wrap: balance;
        }

        .rc-card {
          border: 1px solid var(--rc-border); border-radius: 6px; padding: 28px 28px 24px;
          background: #0a0a0a;
        }

        .rc-category {
          display: inline-flex; align-items: center; gap: 8px; background: transparent;
          border: 1px solid var(--rc-border); border-radius: 999px; padding: 6px 14px 6px 10px;
          font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--rc-green); cursor: pointer; margin-bottom: 18px;
          transition: border-color 0.2s ease;
        }
        .rc-category:hover, .rc-category:focus-visible { border-color: var(--rc-green); }
        .rc-category:focus-visible { outline: 2px solid var(--rc-green); outline-offset: 2px; }
        .rc-category-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rc-green); }

        .rc-svg { display: block; width: 100%; height: auto; overflow: visible; }
        .rc-grid { stroke: var(--rc-border); stroke-width: 1; }

        .rc-series { cursor: pointer; transition: opacity 0.2s ease; }
        .rc-series--dim { opacity: 0.2; }

        .rc-line {
          fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
          transition: d 0.7s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .rc-dot { stroke: #0a0a0a; stroke-width: 2; paint-order: stroke; }

        .rc-axis {
          display: flex; justify-content: space-between; margin-top: 8px; padding: 0 26px;
        }
        .rc-axis span {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.05em;
          text-transform: uppercase; color: var(--rc-text-2);
        }

        .rc-legend {
          display: flex; flex-wrap: wrap; gap: 18px 22px; margin-top: 22px;
          padding-top: 20px; border-top: 1px solid var(--rc-border);
        }
        .rc-legend-item {
          display: flex; align-items: center; gap: 7px; background: transparent; border: 0;
          padding: 2px; cursor: pointer; font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.04em; color: var(--rc-text-2); transition: color 0.2s ease;
        }
        .rc-legend-item:hover, .rc-legend-item--active { color: var(--rc-text); }
        .rc-legend-item:focus-visible { outline: 2px solid var(--rc-text-2); outline-offset: 3px; }
        .rc-legend-swatch { width: 12px; height: 2px; border-radius: 1px; flex: none; }
        .rc-legend-icon {
          width: 14px; height: 14px; object-fit: contain; flex: none;
          filter: invert(1) brightness(1.7);
        }

        @media (prefers-reduced-motion: reduce) {
          .rc-line { transition: none; }
        }

        @media (max-width: 760px) {
          .rc-section { padding-top: 84px; padding-bottom: 84px; }
          .rc-headline { font-size: 26px; }
          .rc-card { padding: 22px 18px 20px; }
          .rc-axis { padding: 0 4px; }
        }
      `})]})}const V=[{id:"gemini",name:"Gemini"},{id:"elevenlabs",name:"ElevenLabs"},{id:"deepseek",name:"DeepSeek"},{id:"zai",name:"Z.ai"},{id:"manus",name:"Manus"},{id:"kimi",name:"Kimi"},{id:"xai",name:"Grok"},{id:"openai",name:"ChatGPT"}],L=[{label:"Q1",values:{gemini:70,elevenlabs:45,deepseek:60,zai:55,manus:40,kimi:50,xai:65,openai:80}},{label:"Q2",values:{gemini:85,elevenlabs:50,deepseek:58,zai:62,manus:45,kimi:48,xai:70,openai:75}},{label:"Q3",values:{gemini:60,elevenlabs:42,deepseek:90,zai:58,manus:50,kimi:55,xai:68,openai:72}},{label:"Q4",values:{gemini:65,elevenlabs:47,deepseek:70,zai:88,manus:52,kimi:58,xai:73,openai:69}}],$e=95;function ze(t,a){const[n,r]=f.useState(0);return f.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const o=setInterval(()=>r(s=>(s+1)%t),a);return()=>clearInterval(o)},[t,a]),[n,r]}function Ie(){const[t,a]=ze(L.length,3200),n=L[t],r=V.reduce((i,o)=>n.values[o.id]>n.values[i.id]?o:i);return e.jsxs("section",{className:"br-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[400px]",children:[e.jsx("p",{className:"br-eyebrow",children:"Model rankings"}),e.jsx("h2",{className:"br-headline",children:"Yesterday’s best model is rarely today’s. We track that so you don’t have to."}),e.jsx("p",{className:"br-subhead",children:"It’s ours, not yours. Every time a new model comes out, the Conductor evaluates it and updates how it routes tasks. You never have to research, compare, or switch platforms to benefit from what’s new — you’re already on it."})]}),e.jsxs("div",{className:"br-card w-full md:max-w-[600px]",children:[e.jsxs("div",{className:"br-header-row",children:[e.jsx("span",{className:"br-title",children:"Best AI"}),e.jsxs("button",{type:"button",className:"br-period",onClick:()=>a((t+1)%L.length),"aria-label":`Showing ${n.label} — click to advance`,children:[n.label,e.jsx("span",{className:"br-period-year",children:"2025"})]})]}),e.jsx("div",{className:"br-plot",role:"img","aria-label":`${n.label} 2025: ${r.name} leads`,children:V.map(i=>{const o=n.values[i.id],s=i.id===r.id;return e.jsxs("div",{className:"br-col",children:[s&&e.jsx("span",{className:"br-tag",children:"Leading"}),e.jsx("div",{className:"br-track",children:e.jsx("div",{className:`br-bar${s?" br-bar--leader":""}`,style:{height:`${o/$e*100}%`}})}),e.jsx("img",{src:`./icons/${i.id}.svg`,alt:i.name,className:"br-icon"})]},i.id)})})]})]}),e.jsx("style",{children:`
        .br-section {
          --br-border: #262626;
          --br-text: #d0d0d0;
          --br-text-2: #6b6b6b;
          --br-green: #3ecf8e;
        }

        .br-eyebrow {
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--br-text-2);
          margin: 0 0 20px;
        }
        .br-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: #ffffff;
          font-size: 30px; line-height: 1.2; letter-spacing: -0.01em; margin: 0 0 18px;
          text-wrap: balance;
        }
        .br-subhead {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.65;
          color: var(--br-text-2); margin: 0; text-wrap: balance;
        }

        .br-card {
          border: 1px solid var(--br-border); border-radius: 6px; padding: 28px 28px 22px;
          background: #0a0a0a;
        }

        .br-header-row {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px;
        }
        .br-title {
          font-family: var(--font-mono); font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--br-text);
        }
        .br-period {
          display: flex; align-items: baseline; gap: 6px; background: transparent; border: 0;
          cursor: pointer; font-family: var(--font-mono); font-size: 13px; font-weight: 600;
          letter-spacing: 0.06em; color: var(--br-text);
        }
        .br-period:focus-visible { outline: 2px solid var(--br-text-2); outline-offset: 3px; }
        .br-period-year { font-size: 10px; font-weight: 400; color: var(--br-text-2); }

        .br-plot {
          display: flex; align-items: flex-end; gap: 12px; height: 220px;
        }
        .br-col {
          flex: 1 1 0; min-width: 0; display: flex; flex-direction: column;
          align-items: center; height: 100%;
        }
        .br-tag {
          font-family: var(--font-mono); font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--br-green); margin-bottom: 6px; white-space: nowrap;
        }
        .br-track {
          flex: 1; width: 100%; max-width: 30px; display: flex; align-items: flex-end;
        }
        .br-bar {
          width: 100%; border-radius: 3px 3px 0 0; background: var(--br-green); opacity: 0.28;
          transition: height 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease;
        }
        .br-bar--leader { opacity: 1; }
        .br-icon {
          width: 18px; height: 18px; object-fit: contain; margin-top: 12px; flex: none;
          filter: invert(1) brightness(1.7);
        }

        @media (prefers-reduced-motion: reduce) {
          .br-bar { transition: opacity 0.4s ease; }
        }

        @media (max-width: 760px) {
          .br-section { padding-top: 84px; padding-bottom: 84px; }
          .br-headline { font-size: 26px; }
          .br-card { padding: 22px 16px 20px; }
          .br-plot { height: 180px; gap: 6px; }
        }
      `})]})}const Se=[{icon:"search",label:"gpt vs gemini vs claude",x:40,y:-34,r:4,z:3},{icon:"search",label:"best ai model 2026 (updated)",x:-18,y:-52,r:-5,z:5},{icon:"search",label:"which llm is best for code?",x:46,y:-2,r:6,z:2},{icon:"search",label:"best ai for writing 2026",x:6,y:22,r:-4,z:4},{icon:"x",label:"“this changes everything” — thread",x:-76,y:-14,r:-8,z:1},{icon:"linkedin",label:"the AI landscape just shifted again — Post",x:-58,y:26,r:5,z:6}];function Ee(){return e.jsxs("svg",{className:"fg-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"5",cy:"5",r:"3.4",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("line",{x1:"8.4",y1:"8.4",x2:"11",y2:"11",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function Me(){return e.jsx("svg",{className:"fg-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}function Te(){return e.jsx("span",{className:"fg-chip-linkedin","aria-hidden":"true",children:"in"})}function Le({icon:t}){return t==="search"?e.jsx(Ee,{}):t==="x"?e.jsx(Me,{}):e.jsx(Te,{})}function Ae(){return e.jsxs("section",{className:"fg-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"relative mx-auto max-w-5xl",children:[e.jsxs("div",{className:"fg-header",children:[e.jsx("h2",{className:"fg-headline",children:"Yesterday’s best model is rarely today’s."}),e.jsx("p",{className:"fg-subhead",children:"We track it, so you don’t have to — you’re always on what’s new, automatically."})]}),e.jsxs("div",{className:"fg-cards",children:[e.jsxs("div",{className:"fg-card",children:[e.jsx("p",{className:"fg-label",children:"Doing it yourself"}),e.jsx("div",{className:"fg-stack",children:Se.map(t=>e.jsxs("div",{className:"fg-chip",style:{transform:`translate(${t.x}px, ${t.y}px) rotate(${t.r}deg)`,zIndex:t.z},children:[e.jsx(Le,{icon:t.icon}),e.jsx("span",{children:t.label})]},t.label))}),e.jsx("p",{className:"fg-caption",children:"You keep asking. The answer keeps changing."})]}),e.jsxs("div",{className:"fg-card fg-card--calm",children:[e.jsx("p",{className:"fg-label",children:"With Starchild"}),e.jsxs("div",{className:"fg-handled-wrap",children:[e.jsx("p",{className:"fg-handled",children:"Handled."}),e.jsx("p",{className:"fg-caption",children:"The Conductor already checked. You don’t have to."})]})]})]})]}),e.jsx("style",{children:`
        .fg-section {
          --fg-border: #e5e4e0;
          --fg-text: #171717;
          --fg-text-2: #6b6b68;
          --fg-orange: #f4511e;
          --fg-card: #ffffff;
        }

        .fg-header { max-width: 46ch; margin: 0 auto 48px; }
        .fg-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: var(--fg-text);
          font-size: 36px; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 14px;
          text-wrap: balance;
        }
        .fg-subhead {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          color: var(--fg-text-2); margin: 0; text-wrap: balance;
        }

        .fg-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .fg-card {
          border: 1px solid var(--fg-border); border-radius: 16px; background: var(--fg-card);
          box-shadow: 0 1px 2px rgba(20,20,15,0.03), 0 10px 24px rgba(20,20,15,0.035);
          padding: 28px 28px 32px; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .fg-label {
          font-family: var(--font-google-sans); font-size: 14.5px; font-weight: 600;
          color: var(--fg-orange); margin: 0 0 28px;
        }

        .fg-handled-wrap {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
        }

        .fg-stack { position: relative; height: 190px; margin-bottom: 20px; }
        .fg-chip {
          position: absolute; top: 50%; left: 50%; width: 176px; margin: -20px 0 0 -88px;
          display: flex; align-items: flex-start; gap: 6px;
          border: 1px solid var(--fg-border); border-radius: 9px; background: var(--fg-card);
          box-shadow: 0 2px 5px rgba(20,20,15,0.06), 0 6px 16px rgba(20,20,15,0.05);
          padding: 8px 10px; font-family: var(--font-google-sans); font-size: 11px; line-height: 1.35;
          color: var(--fg-text);
        }
        .fg-chip-icon { width: 12px; height: 12px; flex: none; margin-top: 1px; color: var(--fg-text-2); }
        .fg-chip-linkedin {
          flex: none; width: 13px; height: 13px; border-radius: 3px; background: #0a66c2; color: #fff;
          font-size: 8px; font-weight: 700; line-height: 13px; text-align: center; margin-top: 1px;
        }

        .fg-caption {
          font-family: var(--font-google-sans); font-size: 13.5px; color: var(--fg-text-2);
          margin: 0; text-align: center;
        }

        .fg-handled {
          font-family: var(--font-google-sans); font-size: 27px; font-weight: 700; color: var(--fg-text);
          margin: 0 0 14px;
        }

        @media (max-width: 760px) {
          .fg-section { padding-top: 84px; padding-bottom: 84px; }
          .fg-headline { font-size: 27px; }
          .fg-cards { grid-template-columns: 1fr; gap: 20px; }
          .fg-card { padding: 24px 20px 28px; }
          .fg-stack { transform: scale(0.82); }
          .fg-chip { width: 150px; margin-left: -75px; font-size: 10px; }
        }
      `})]})}const A=[{icon:"search",label:"gpt vs gemini vs claude",x:44,y:-36,r:4,z:3},{icon:"search",label:"best ai model 2026 (updated)",x:-20,y:-56,r:-5,z:5},{icon:"search",label:"which llm is best for code?",x:50,y:-2,r:6,z:2},{icon:"search",label:"best ai for writing 2026",x:6,y:24,r:-4,z:4},{icon:"x",label:"“this changes everything” — thread",x:-82,y:-14,r:-8,z:1},{icon:"linkedin",label:"the AI landscape just shifted again — Post",x:-62,y:30,r:5,z:6}];function De(){return e.jsxs("svg",{className:"fp-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"5",cy:"5",r:"3.4",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("line",{x1:"8.4",y1:"8.4",x2:"11",y2:"11",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function Re(){return e.jsx("svg",{className:"fp-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}function Fe(){return e.jsx("span",{className:"fp-chip-linkedin","aria-hidden":"true",children:"in"})}function Oe({icon:t}){return t==="search"?e.jsx(De,{}):t==="x"?e.jsx(Re,{}):e.jsx(Fe,{})}function Be(){return e.jsx("svg",{className:"fp-badge-icon",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M3 7.2L5.8 10 11 4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function z(t,a){return new Promise((n,r)=>{const i=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(i),r(new Error("cancelled")))})}function Pe(){const[t,a]=f.useState(0),[n,r]=f.useState(!1),i=f.useRef(!1);return f.useEffect(()=>{if(i.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i.current){a(A.length),r(!0);return}const o={current:!1};async function s(){try{for(;;){r(!1),a(0),await z(500,o);for(let c=1;c<=A.length;c++)a(c),await z(420,o);await z(700,o),r(!0),await z(2200,o)}}catch{}}return s(),()=>{o.current=!0}},[]),e.jsxs("section",{className:"fp-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"relative mx-auto max-w-3xl text-center",children:[e.jsxs("div",{className:"fp-header",children:[e.jsx("h2",{className:"fp-headline",children:"Yesterday’s best model is rarely today’s."}),e.jsx("p",{className:"fp-subhead",children:"We track it, so you don’t have to — you’re always on what’s new, automatically."})]}),e.jsxs("div",{className:"fp-stage",children:[e.jsx("div",{className:`fp-pile${n?" fp-pile--settled":""}`,children:A.slice(0,t).map(o=>e.jsxs("div",{className:"fp-chip",style:{transform:`translate(${o.x}px, ${o.y}px) rotate(${o.r}deg)`,zIndex:o.z},children:[e.jsx(Oe,{icon:o.icon}),e.jsx("span",{children:o.label})]},o.label))}),e.jsxs("div",{className:`fp-badge${n?" fp-badge--shown":""}`,children:[e.jsx("span",{className:"fp-badge-check",children:e.jsx(Be,{})}),"Handled"]})]}),e.jsx("p",{className:`fp-caption${n?" fp-caption--shown":""}`,children:"The Conductor already checked. You don’t have to."})]}),e.jsx("style",{children:`
        .fp-section {
          --fp-border: #e5e4e0;
          --fp-text: #171717;
          --fp-text-2: #6b6b68;
          --fp-orange: #f4511e;
          --fp-card: #ffffff;
        }

        .fp-header { max-width: 46ch; margin: 0 auto 56px; }
        .fp-headline {
          font-family: var(--font-google-sans); font-weight: 700; color: var(--fp-text);
          font-size: 36px; line-height: 1.15; letter-spacing: -0.01em; margin: 0 0 14px;
          text-wrap: balance;
        }
        .fp-subhead {
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          color: var(--fp-text-2); margin: 0; text-wrap: balance;
        }

        .fp-stage {
          position: relative; height: 260px; max-width: 460px; margin: 0 auto;
          overflow: hidden; border-radius: 16px;
        }

        .fp-chip {
          position: absolute; top: 50%; left: 50%; width: 180px; margin: -20px 0 0 -90px;
          display: flex; align-items: flex-start; gap: 6px;
          border: 1px solid var(--fp-border); border-radius: 9px; background: var(--fp-card);
          box-shadow: 0 2px 5px rgba(20,20,15,0.06), 0 6px 16px rgba(20,20,15,0.05);
          padding: 8px 10px; font-family: var(--font-google-sans); font-size: 11px; line-height: 1.35;
          color: var(--fp-text); text-align: left;
          animation: fp-pop 0.42s cubic-bezier(0.2, 0.9, 0.3, 1.3) both;
        }
        .fp-chip-icon { width: 12px; height: 12px; flex: none; margin-top: 1px; color: var(--fp-text-2); }
        .fp-chip-linkedin {
          flex: none; width: 13px; height: 13px; border-radius: 3px; background: #0a66c2; color: #fff;
          font-size: 8px; font-weight: 700; line-height: 13px; text-align: center; margin-top: 1px;
        }

        @keyframes fp-pop {
          from { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0.6); }
        }

        .fp-pile { transition: opacity 0.4s ease; }
        .fp-pile--settled { opacity: 0.32; }

        .fp-badge {
          position: absolute; top: 50%; left: 50%; z-index: 10;
          display: flex; align-items: center; gap: 7px;
          background: var(--fp-orange); color: #fff; border-radius: 999px; padding: 10px 20px 10px 14px;
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 700; letter-spacing: 0.01em;
          box-shadow: 0 10px 24px rgba(244,81,30,0.32);
          transform: translate(-50%, -50%) scale(0) rotate(-4deg); opacity: 0; pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.15), opacity 0.25s ease;
        }
        .fp-badge--shown {
          transform: translate(-50%, -50%) scale(1) rotate(-4deg); opacity: 1; pointer-events: auto;
        }
        .fp-badge-check {
          display: flex; align-items: center; justify-content: center; width: 18px; height: 18px;
          border-radius: 50%; background: rgba(255,255,255,0.22); flex: none;
        }
        .fp-badge-icon { width: 11px; height: 11px; color: #fff; }

        .fp-caption {
          font-family: var(--font-google-sans); font-size: 13.5px; color: var(--fp-text-2);
          text-align: center; margin: 18px 0 0; opacity: 0; transition: opacity 0.3s ease;
        }
        .fp-caption--shown { opacity: 1; transition-delay: 0.15s; }

        @media (prefers-reduced-motion: reduce) {
          .fp-chip { animation: none; }
          .fp-pile { transition: none; }
          .fp-badge { transition: none; }
          .fp-caption { transition: none; }
        }

        @media (max-width: 760px) {
          .fp-section { padding-top: 84px; padding-bottom: 84px; }
          .fp-headline { font-size: 27px; }
          .fp-stage { height: 230px; max-width: 340px; }
          .fp-chip { width: 156px; margin-left: -78px; font-size: 10px; }
        }
      `})]})}const We=[null,"notion",null,"sentry",null,"github",null,"gitlab",null,"vercel",null,"codex",null,"cursor",null,"railway",null,"chatgpt",null,null],Ye={hidden:{opacity:0,scale:.9},visible:t=>({opacity:1,scale:1,transition:{delay:t*.03,duration:.4,ease:[.16,1,.3,1]}})};function _e({logo:t,index:a}){const[n,r]=f.useState(!1);return e.jsxs(v.div,{custom:a,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},variants:Ye,className:`aspect-square w-full rounded-[20px] ${t?"bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] ring-[0.5px] ring-black/10 flex items-center justify-center":"bg-white/[0.02] border border-white/[0.05]"}`,children:[t&&!n&&e.jsx("img",{src:`./logos/${t}.svg`,alt:t,className:"size-8 object-contain",onError:()=>r(!0)}),t&&n&&e.jsx("span",{className:"text-xs font-medium uppercase text-black/40",children:t.slice(0,2)})]})}function Ge(){return e.jsx("section",{className:"bg-[#0a0a0a] px-6 py-24",children:e.jsxs("div",{className:"mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[365px]",children:[e.jsx("h2",{className:"text-white",style:{fontFamily:"var(--font-denton)",fontSize:64,fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.05},children:"Connects with your tools"}),e.jsx("p",{className:"mt-4 max-w-[365px] text-sm text-white/50",children:"Integrates with what you already use every day — no friction, no complicated setup."})]}),e.jsx("div",{className:"grid w-full max-w-[436px] grid-cols-5 gap-3.5",children:We.map((t,a)=>e.jsx(_e,{logo:t,index:a},a))})]})})}function Ve(){return e.jsxs("main",{children:[e.jsx(ie,{}),e.jsx(fe,{}),e.jsx(ve,{}),e.jsx(Ce,{}),e.jsx(Ie,{}),e.jsx(Ae,{}),e.jsx(Pe,{}),e.jsx(Ge,{})]})}J.createRoot(document.getElementById("root")).render(e.jsx(f.StrictMode,{children:e.jsx(Ve,{})}));
