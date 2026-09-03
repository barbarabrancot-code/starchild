import{r as m,j as e,A as G,m as j,C as V,c as X}from"./ConductorModeSection-CFJHbla7.js";const k=4,q=[{id:"ai-generic",icon:"ai-generic",color:"#111111"},{id:"gemini",icon:"gemini",color:"#4C8DF6"},{id:"elevenlabs",icon:"elevenlabs",color:"#27272A"},{id:"deepseek",icon:"deepseek",color:"#4D6BFE"},{id:"zai",icon:"zai",color:"#3E63DD"},{id:"manus",icon:"manus",color:"#7C3AED"},{id:"kimi",icon:"kimi",color:"#0F766E"},{id:"xai",icon:"xai",color:"#000000"},{id:"openai",icon:"openai",color:"#10A37F"}];function K(t){const a=t.length,n=Math.max(2,Math.round(a/3));let r=Math.ceil((a+n)/k);r%2===0&&(r+=1);const i=r*k-a,o=Math.floor(r/2),l=new Array(r).fill(0),f=new Array(r).fill(0);let c=i;for(let p=0;c>0&&p<=o;p++){const g=o-p,h=o+p,x=g===h?[g]:[g,h];for(const u of x){if(c<=0)break;l[u]+=1,f[u]=p,c-=1}}const d=[1,2,0,3],b=[];let z=0;for(let p=0;p<r;p++){const g=l[p],h=new Set;if(g===1)h.add(d[f[p]%d.length]);else for(let x=0;x<g;x++){const u=Math.floor(x/2),C=x%2===0?u:k-1-u;h.add(C)}for(let x=0;x<k;x++)b.push(h.has(x)?null:t[z++]??null)}return b}const W=K(q);function U(t){const a=[...t];for(let n=a.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[a[n],a[r]]=[a[r],a[n]]}return a}const J=W.map((t,a)=>t?a:-1).filter(t=>t!==-1),Q=U(J),Z=new Map(Q.map((t,a)=>[t,a*.07])),T=[{prompt:"how's the market today?",model:"Z.ai",tileId:"zai"},{prompt:"write a poem about the ocean",model:"ChatGPT",tileId:"openai"},{prompt:"debug this python traceback",model:"Grok",tileId:"xai"},{prompt:"summarize this contract for me",model:"Gemini",tileId:"gemini"},{prompt:"turn this script into a voiceover",model:"ElevenLabs",tileId:"elevenlabs"},{prompt:"analyze this dataset for outliers",model:"DeepSeek",tileId:"deepseek"},{prompt:"plan a multi-step research task",model:"Manus",tileId:"manus"},{prompt:"catch me up on today's news",model:"Kimi",tileId:"kimi"}];function v(t,a){return new Promise((n,r)=>{const s=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(s),r(new Error("cancelled")))})}function ee(t,a){const n=t.replace("#",""),r=n.length===3?n.split("").map(f=>f+f).join(""):n,s=parseInt(r,16),i=s>>16&255,o=s>>8&255,l=s&255;return`rgba(${i}, ${o}, ${l}, ${a})`}const B="0 0 0 0.5px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.05)";function te({tile:t,index:a,bouncing:n,selected:r}){return t?e.jsx(j.div,{className:"flex aspect-square w-full items-center justify-center rounded-2xl",initial:{opacity:0,scale:.9,y:0},animate:r?{opacity:1,y:0,scale:1.06,backgroundColor:t.color,boxShadow:`0 14px 28px ${ee(t.color,.28)}`}:n?{opacity:1,y:[0,-10,0],scale:[1,1.07,1],backgroundColor:"#ffffff",boxShadow:B}:{opacity:1,y:0,scale:1,backgroundColor:"#ffffff",boxShadow:B},transition:r?{type:"spring",stiffness:320,damping:14}:n?{duration:.5,repeat:1/0,ease:"easeInOut",delay:Z.get(a)??0}:{duration:.25},children:e.jsx("img",{src:`./icons/${t.icon}.svg`,alt:t.id,className:"size-6 object-contain",style:{filter:r?"brightness(0) invert(1)":"none",transition:"filter 0.3s"}})}):e.jsx("div",{className:"aspect-square w-full rounded-2xl border border-black/[0.04] bg-black/[0.025]"})}function ae(){const[t,a]=m.useState(""),[n,r]=m.useState(!1),[s,i]=m.useState(null);return m.useEffect(()=>{const o={current:!1};async function l(){let f=0;try{for(;;){const c=T[f%T.length];f++,i(null);for(let d=1;d<=c.prompt.length;d++)a(c.prompt.slice(0,d)),await v(32,o);await v(450,o),r(!0),await v(1500,o),r(!1),i({tileId:c.tileId,model:c.model}),await v(2400,o);for(let d=c.prompt.length;d>=0;d--)a(c.prompt.slice(0,d)),await v(14,o);i(null),await v(350,o)}}catch{}}return l(),()=>{o.current=!0}},[]),e.jsx("section",{className:"bg-[#f4f3f1] px-6 py-24",children:e.jsxs("div",{className:"mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[420px]",children:[e.jsx("p",{className:"text-2xl italic text-neutral-900",style:{fontFamily:"var(--font-google-sans)"},children:"Discover the"}),e.jsx("h2",{className:"text-[40px] leading-tight font-bold",style:{fontFamily:"var(--font-google-sans)",color:"#f84600"},children:"Conductor mode"}),e.jsx("div",{className:"mt-8 flex h-14 items-center rounded-full bg-white px-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]",children:e.jsxs("span",{className:"text-[15px] text-neutral-800",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"text-neutral-400",children:"/ "}),t,e.jsx("span",{className:"ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-neutral-300 align-middle"})]})}),e.jsxs("div",{className:"mt-6 flex items-center gap-2 text-sm text-neutral-500",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Best model for this prompt:"}),e.jsx(G,{mode:"wait",children:s&&e.jsx(j.span,{initial:{opacity:0,y:4},animate:{opacity:1,y:0},exit:{opacity:0,y:-4},transition:{duration:.25},className:"font-semibold text-neutral-900",children:s.model},s.model)})]})]}),e.jsx("div",{className:"grid w-full max-w-[420px] grid-cols-4 gap-3.5",children:W.map((o,l)=>e.jsx(te,{tile:o,index:l,bouncing:n,selected:o?(s==null?void 0:s.tileId)===o.id:!1},l))})]})})}const N=4,ne=[{id:"ai-generic",icon:"ai-generic",color:"#111111"},{id:"gemini",icon:"gemini",color:"#4C8DF6"},{id:"elevenlabs",icon:"elevenlabs",color:"#27272A"},{id:"deepseek",icon:"deepseek",color:"#4D6BFE"},{id:"zai",icon:"zai",color:"#3E63DD"},{id:"manus",icon:"manus",color:"#7C3AED"},{id:"kimi",icon:"kimi",color:"#0F766E"},{id:"xai",icon:"xai",color:"#000000"},{id:"openai",icon:"openai",color:"#10A37F"}];function re(t){const a=t.length,n=Math.max(2,Math.round(a/3));let r=Math.ceil((a+n)/N);r%2===0&&(r+=1);const i=r*N-a,o=Math.floor(r/2),l=new Array(r).fill(0),f=new Array(r).fill(0);let c=i;for(let p=0;c>0&&p<=o;p++){const g=o-p,h=o+p,x=g===h?[g]:[g,h];for(const u of x){if(c<=0)break;l[u]+=1,f[u]=p,c-=1}}const d=[1,2,0,3],b=[];let z=0;for(let p=0;p<r;p++){const g=l[p],h=new Set;if(g===1)h.add(d[f[p]%d.length]);else for(let x=0;x<g;x++){const u=Math.floor(x/2),C=x%2===0?u:N-1-u;h.add(C)}for(let x=0;x<N;x++)b.push(h.has(x)?null:t[z++]??null)}return b}const Y=re(ne);function ie(t){const a=[...t];for(let n=a.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[a[n],a[r]]=[a[r],a[n]]}return a}const se=Y.map((t,a)=>t?a:-1).filter(t=>t!==-1),oe=ie(se),le=new Map(oe.map((t,a)=>[t,a*.06])),R=[{prompt:"how's the market today?",model:"Z.ai",variant:"GLM-4.6",tileId:"zai"},{prompt:"write a poem about the ocean",model:"ChatGPT",variant:"GPT-5.1",tileId:"openai"},{prompt:"debug this python traceback",model:"Grok",variant:"Grok 4",tileId:"xai"},{prompt:"summarize this contract for me",model:"Gemini",variant:"2.5 Pro",tileId:"gemini"},{prompt:"turn this script into a voiceover",model:"ElevenLabs",variant:"v3",tileId:"elevenlabs"},{prompt:"analyze this dataset for outliers",model:"DeepSeek",variant:"V3.2",tileId:"deepseek"},{prompt:"plan a multi-step research task",model:"Manus",variant:"1.5",tileId:"manus"},{prompt:"catch me up on today's news",model:"Kimi",variant:"K2",tileId:"kimi"}];function w(t,a){return new Promise((n,r)=>{const s=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(s),r(new Error("cancelled")))})}function A(t,a){const n=t.replace("#",""),r=n.length===3?n.split("").map(f=>f+f).join(""):n,s=parseInt(r,16),i=s>>16&255,o=s>>8&255,l=s&255;return`rgba(${i}, ${o}, ${l}, ${a})`}const y="#f84600",F="0 0 0 1px rgba(255,255,255,0.06)";function H({inset:t=-2}){const a="pointer-events-none absolute size-3 border-[#f84600]/70",n=`${t}px`;return e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`${a} border-l-2 border-t-2`,style:{left:n,top:n}}),e.jsx("span",{className:`${a} border-r-2 border-t-2`,style:{right:n,top:n}}),e.jsx("span",{className:`${a} border-b-2 border-l-2`,style:{left:n,bottom:n}}),e.jsx("span",{className:`${a} border-b-2 border-r-2`,style:{right:n,bottom:n}})]})}function ce({tile:t,index:a,bouncing:n,selected:r}){return t?e.jsxs(j.div,{className:"relative flex aspect-square w-full items-center justify-center rounded-md",initial:{opacity:0,scale:.9,y:0,rotate:0},animate:r?{opacity:1,y:0,rotate:0,scale:1.08,backgroundColor:t.color,boxShadow:`0 0 0 1px ${A(y,.7)}, 0 16px 32px ${A(t.color,.35)}`}:n?{opacity:1,y:[0,-9,0],rotate:[0,a%2===0?5:-5,0],scale:[1,1.08,1],backgroundColor:"#141414",boxShadow:F}:{opacity:1,y:0,rotate:0,scale:1,backgroundColor:"#141414",boxShadow:F},transition:r?{type:"spring",stiffness:320,damping:14}:n?{duration:.45,repeat:1/0,ease:"easeInOut",delay:le.get(a)??0}:{duration:.25},children:[r&&e.jsx(H,{inset:-4}),e.jsx("img",{src:`./icons/${t.icon}.svg`,alt:t.id,className:"size-6 object-contain",style:{filter:r?"brightness(0) invert(1)":"invert(1) brightness(1.7)",transition:"filter 0.3s"}})]}):e.jsx("div",{className:"aspect-square w-full rounded-md border border-white/[0.06] bg-white/[0.02]"})}function de(){const[t,a]=m.useState(""),[n,r]=m.useState(!1),[s,i]=m.useState(null);return m.useEffect(()=>{const o={current:!1};async function l(){let f=0;try{for(;;){const c=R[f%R.length];f++,i(null);for(let d=1;d<=c.prompt.length;d++)a(c.prompt.slice(0,d)),await w(32,o);await w(450,o),r(!0),await w(1500,o),r(!1),i({tileId:c.tileId,model:c.model,variant:c.variant}),await w(2400,o);for(let d=c.prompt.length;d>=0;d--)a(c.prompt.slice(0,d)),await w(14,o);i(null),await w(350,o)}}catch{}}return l(),()=>{o.current=!0}},[]),e.jsxs("section",{className:"relative overflow-hidden bg-[#0a0a0a] px-6 py-24",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 opacity-[0.06]",style:{backgroundImage:"linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),e.jsxs("div",{className:"relative mx-auto flex max-w-5xl flex-col-reverse items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"relative w-full max-w-[420px]",children:[e.jsx(H,{inset:-10}),e.jsx("div",{className:"grid grid-cols-4 gap-2.5 p-2",style:{transform:"rotate(-2.5deg) scale(1.02)"},children:Y.map((o,l)=>e.jsx(ce,{tile:o,index:l,bouncing:n,selected:o?(s==null?void 0:s.tileId)===o.id:!1},l))})]}),e.jsxs("div",{className:"max-w-[420px]",children:[e.jsx("p",{className:"text-xs uppercase tracking-[0.3em]",style:{fontFamily:"var(--font-google-sans)",color:y},children:"// select mode"}),e.jsxs("h2",{className:"mt-2 text-[42px] leading-[0.95] font-bold uppercase text-white",style:{fontFamily:"var(--font-google-sans)",letterSpacing:"-0.01em"},children:["Conductor",e.jsx("br",{}),e.jsx("span",{style:{WebkitTextStroke:`1.5px ${y}`,color:"transparent"},children:"mode"})]}),e.jsxs("div",{className:"mt-8 flex h-14 items-center gap-2 border border-white/15 bg-black px-5",children:[e.jsx("span",{style:{color:y,fontFamily:"var(--font-google-sans)"},children:">"}),e.jsxs("span",{className:"text-[15px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:[t,e.jsx("span",{className:"ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-pulse align-middle",style:{backgroundColor:y}})]})]}),e.jsxs("div",{className:"mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"best model"}),e.jsx("span",{className:"text-white/20",children:"/"}),e.jsx(G,{mode:"wait",children:s&&e.jsxs(j.span,{initial:{opacity:0,x:6},animate:{opacity:1,x:0},exit:{opacity:0,x:-6},transition:{duration:.2},className:"flex items-center gap-2",children:[e.jsx("span",{className:"bg-white px-2 py-0.5 text-[11px] font-bold text-black",children:s.model}),e.jsx("span",{className:"border px-2 py-0.5 text-[11px]",style:{borderColor:A(y,.6),color:y},children:s.variant})]},s.model)})]})]})]})]})}const O=[{id:"openai",name:"OpenAI",color:"var(--rc-1)"},{id:"gemini",name:"Gemini",color:"var(--rc-2)"},{id:"xai",name:"Grok",color:"var(--rc-3)"},{id:"deepseek",name:"DeepSeek",color:"var(--rc-4)"}],$=["Jan","Mar","May","Jul"],E=[{label:"Writing",ranks:{openai:[1,2,3,3],gemini:[2,1,1,2],deepseek:[4,3,2,1],xai:[3,4,4,4]}},{label:"Image",ranks:{xai:[1,2,1,2],deepseek:[2,1,3,4],gemini:[3,4,4,3],openai:[4,3,2,1]}},{label:"Programming",ranks:{deepseek:[1,2,3,4],openai:[2,3,1,2],xai:[4,1,2,3],gemini:[3,4,4,1]}}],D=460,pe=220,P=26,S={1:18,2:73,3:128,4:183};function xe(t){const a=D-P*2;return P+a*t/($.length-1)}function fe(t){let a=`M${t[0].x},${t[0].y}`;for(let n=1;n<t.length;n++){const r=t[n-1],s=t[n],i=(r.x+s.x)/2;a+=` C${i},${r.y} ${i},${s.y} ${s.x},${s.y}`}return a}function me(t,a){const[n,r]=m.useState(0);return m.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=setInterval(()=>r(o=>(o+1)%t),a);return()=>clearInterval(i)},[t,a]),[n,r]}function ge(){const[t,a]=me(E.length,4200),[n,r]=m.useState(null),s=E[t];return e.jsxs("section",{className:"rc-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[400px]",children:[e.jsx("p",{className:"rc-eyebrow",children:"Model rankings"}),e.jsx("h2",{className:"rc-headline",children:"Yesterday’s best model is rarely today’s. We track that so you don’t have to."}),e.jsx("p",{className:"rc-subhead",children:"It’s ours, not yours. Every time a new model comes out, the Conductor evaluates it and updates how it routes tasks. You never have to research, compare, or switch platforms to benefit from what’s new — you’re already on it."})]}),e.jsxs("div",{className:"rc-card w-full md:max-w-[600px]",children:[e.jsxs("button",{type:"button",className:"rc-category",onClick:()=>a((t+1)%E.length),"aria-label":`Showing ${s.label} rankings — click to advance`,children:[e.jsx("span",{className:"rc-category-dot"}),s.label]}),e.jsxs("svg",{className:"rc-svg",viewBox:`0 0 ${D} ${pe}`,role:"img","aria-label":`${s.label} model ranking, January to July`,focusable:"false",children:[[1,2,3,4].map(i=>e.jsx("line",{className:"rc-grid",x1:0,x2:D,y1:S[i],y2:S[i]},i)),O.map(i=>{const o=s.ranks[i.id],l=o.map((d,b)=>({x:xe(b),y:S[d]})),f=l[l.length-1],c=n!==null&&n!==i.id;return e.jsxs("g",{className:c?"rc-series rc-series--dim":"rc-series",onMouseEnter:()=>r(i.id),onMouseLeave:()=>r(null),children:[e.jsx("path",{className:"rc-line",style:{d:`path("${fe(l)}")`,stroke:i.color}}),e.jsx("circle",{className:"rc-dot",cx:f.x,cy:f.y,r:5,style:{fill:i.color},children:e.jsx("title",{children:`${i.name} — ${s.label} — ${$[$.length-1]}: rank ${o[o.length-1]}`})})]},i.id)})]}),e.jsx("div",{className:"rc-axis",children:$.map(i=>e.jsx("span",{children:i},i))}),e.jsx("div",{className:"rc-legend",role:"group","aria-label":"Models",children:O.map(i=>e.jsxs("button",{type:"button",className:`rc-legend-item${n===i.id?" rc-legend-item--active":""}`,onMouseEnter:()=>r(i.id),onMouseLeave:()=>r(null),onFocus:()=>r(i.id),onBlur:()=>r(null),children:[e.jsx("span",{className:"rc-legend-swatch",style:{background:i.color},"aria-hidden":"true"}),e.jsx("img",{src:`./icons/${i.id}.svg`,alt:"",className:"rc-legend-icon","aria-hidden":"true"}),i.name]},i.id))})]})]}),e.jsx("style",{children:`
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
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
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
          font-family: var(--font-google-sans); font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
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
          font-family: var(--font-google-sans); font-size: 10px; letter-spacing: 0.05em;
          text-transform: uppercase; color: var(--rc-text-2);
        }

        .rc-legend {
          display: flex; flex-wrap: wrap; gap: 18px 22px; margin-top: 22px;
          padding-top: 20px; border-top: 1px solid var(--rc-border);
        }
        .rc-legend-item {
          display: flex; align-items: center; gap: 7px; background: transparent; border: 0;
          padding: 2px; cursor: pointer; font-family: var(--font-google-sans); font-size: 11px;
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
      `})]})}const _=[{id:"gemini",name:"Gemini"},{id:"elevenlabs",name:"ElevenLabs"},{id:"deepseek",name:"DeepSeek"},{id:"zai",name:"Z.ai"},{id:"manus",name:"Manus"},{id:"kimi",name:"Kimi"},{id:"xai",name:"Grok"},{id:"openai",name:"ChatGPT"}],M=[{label:"Q1",values:{gemini:70,elevenlabs:45,deepseek:60,zai:55,manus:40,kimi:50,xai:65,openai:80}},{label:"Q2",values:{gemini:85,elevenlabs:50,deepseek:58,zai:62,manus:45,kimi:48,xai:70,openai:75}},{label:"Q3",values:{gemini:60,elevenlabs:42,deepseek:90,zai:58,manus:50,kimi:55,xai:68,openai:72}},{label:"Q4",values:{gemini:65,elevenlabs:47,deepseek:70,zai:88,manus:52,kimi:58,xai:73,openai:69}}],he=95;function ue(t,a){const[n,r]=m.useState(0);return m.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=setInterval(()=>r(o=>(o+1)%t),a);return()=>clearInterval(i)},[t,a]),[n,r]}function be(){const[t,a]=ue(M.length,3200),n=M[t],r=_.reduce((s,i)=>n.values[i.id]>n.values[s.id]?i:s);return e.jsxs("section",{className:"br-section relative overflow-hidden bg-[#0a0a0a] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"mx-auto flex max-w-6xl flex-col items-start gap-14 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[400px]",children:[e.jsx("p",{className:"br-eyebrow",children:"Model rankings"}),e.jsx("h2",{className:"br-headline",children:"Yesterday’s best model is rarely today’s. We track that so you don’t have to."}),e.jsx("p",{className:"br-subhead",children:"It’s ours, not yours. Every time a new model comes out, the Conductor evaluates it and updates how it routes tasks. You never have to research, compare, or switch platforms to benefit from what’s new — you’re already on it."})]}),e.jsxs("div",{className:"br-card w-full md:max-w-[600px]",children:[e.jsxs("div",{className:"br-header-row",children:[e.jsx("span",{className:"br-title",children:"Best AI"}),e.jsxs("button",{type:"button",className:"br-period",onClick:()=>a((t+1)%M.length),"aria-label":`Showing ${n.label} — click to advance`,children:[n.label,e.jsx("span",{className:"br-period-year",children:"2025"})]})]}),e.jsx("div",{className:"br-plot",role:"img","aria-label":`${n.label} 2025: ${r.name} leads`,children:_.map(s=>{const i=n.values[s.id],o=s.id===r.id;return e.jsxs("div",{className:"br-col",children:[o&&e.jsx("span",{className:"br-tag",children:"Leading"}),e.jsx("div",{className:"br-track",children:e.jsx("div",{className:`br-bar${o?" br-bar--leader":""}`,style:{height:`${i/he*100}%`}})}),e.jsx("img",{src:`./icons/${s.id}.svg`,alt:s.name,className:"br-icon"})]},s.id)})})]})]}),e.jsx("style",{children:`
        .br-section {
          --br-border: #262626;
          --br-text: #d0d0d0;
          --br-text-2: #6b6b6b;
          --br-green: #3ecf8e;
        }

        .br-eyebrow {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
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
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--br-text);
        }
        .br-period {
          display: flex; align-items: baseline; gap: 6px; background: transparent; border: 0;
          cursor: pointer; font-family: var(--font-google-sans); font-size: 13px; font-weight: 600;
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
          font-family: var(--font-google-sans); font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em;
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
      `})]})}const ye=[{icon:"search",label:"gpt vs gemini vs claude",x:40,y:-34,r:4,z:3},{icon:"search",label:"best ai model 2026 (updated)",x:-18,y:-52,r:-5,z:5},{icon:"search",label:"which llm is best for code?",x:46,y:-2,r:6,z:2},{icon:"search",label:"best ai for writing 2026",x:6,y:22,r:-4,z:4},{icon:"x",label:"“this changes everything” — thread",x:-76,y:-14,r:-8,z:1},{icon:"linkedin",label:"the AI landscape just shifted again — Post",x:-58,y:26,r:5,z:6}];function ve(){return e.jsxs("svg",{className:"fg-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"5",cy:"5",r:"3.4",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("line",{x1:"8.4",y1:"8.4",x2:"11",y2:"11",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function we(){return e.jsx("svg",{className:"fg-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}function je(){return e.jsx("span",{className:"fg-chip-linkedin","aria-hidden":"true",children:"in"})}function ke({icon:t}){return t==="search"?e.jsx(ve,{}):t==="x"?e.jsx(we,{}):e.jsx(je,{})}function Ne(){return e.jsxs("section",{className:"fg-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"relative mx-auto max-w-5xl",children:[e.jsxs("div",{className:"fg-header",children:[e.jsx("h2",{className:"fg-headline",children:"Yesterday’s best model is rarely today’s."}),e.jsx("p",{className:"fg-subhead",children:"We track it, so you don’t have to — you’re always on what’s new, automatically."})]}),e.jsxs("div",{className:"fg-cards",children:[e.jsxs("div",{className:"fg-card",children:[e.jsx("p",{className:"fg-label",children:"Doing it yourself"}),e.jsx("div",{className:"fg-stack",children:ye.map(t=>e.jsxs("div",{className:"fg-chip",style:{transform:`translate(${t.x}px, ${t.y}px) rotate(${t.r}deg)`,zIndex:t.z},children:[e.jsx(ke,{icon:t.icon}),e.jsx("span",{children:t.label})]},t.label))}),e.jsx("p",{className:"fg-caption",children:"You keep asking. The answer keeps changing."})]}),e.jsxs("div",{className:"fg-card fg-card--calm",children:[e.jsx("p",{className:"fg-label",children:"With Starchild"}),e.jsxs("div",{className:"fg-handled-wrap",children:[e.jsx("p",{className:"fg-handled",children:"Handled."}),e.jsx("p",{className:"fg-caption",children:"The Conductor already checked. You don’t have to."})]})]})]})]}),e.jsx("style",{children:`
        .fg-section {
          --fg-border: #e5e4e0;
          --fg-text: #171717;
          --fg-text-2: #6b6b68;
          --fg-orange: var(--color-primary);
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
      `})]})}const L=[{icon:"search",label:"gpt vs gemini vs claude",x:44,y:-36,r:4,z:3},{icon:"search",label:"best ai model 2026 (updated)",x:-20,y:-56,r:-5,z:5},{icon:"search",label:"which llm is best for code?",x:50,y:-2,r:6,z:2},{icon:"search",label:"best ai for writing 2026",x:6,y:24,r:-4,z:4},{icon:"x",label:"“this changes everything” — thread",x:-82,y:-14,r:-8,z:1},{icon:"linkedin",label:"the AI landscape just shifted again — Post",x:-62,y:30,r:5,z:6}];function Ie(){return e.jsxs("svg",{className:"fp-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"5",cy:"5",r:"3.4",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("line",{x1:"8.4",y1:"8.4",x2:"11",y2:"11",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"})]})}function $e(){return e.jsx("svg",{className:"fp-chip-icon",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 2L10 10M10 2L2 10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})})}function ze(){return e.jsx("span",{className:"fp-chip-linkedin","aria-hidden":"true",children:"in"})}function Ce({icon:t}){return t==="search"?e.jsx(Ie,{}):t==="x"?e.jsx($e,{}):e.jsx(ze,{})}function Ee(){return e.jsx("svg",{className:"fp-badge-icon",viewBox:"0 0 14 14",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M3 7.2L5.8 10 11 4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function I(t,a){return new Promise((n,r)=>{const s=setTimeout(()=>{a.current?r(new Error("cancelled")):n()},t);a.current&&(clearTimeout(s),r(new Error("cancelled")))})}function Se(){const[t,a]=m.useState(0),[n,r]=m.useState(!1),s=m.useRef(!1);return m.useEffect(()=>{if(s.current=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s.current){a(L.length),r(!0);return}const i={current:!1};async function o(){try{for(;;){r(!1),a(0),await I(500,i);for(let l=1;l<=L.length;l++)a(l),await I(420,i);await I(700,i),r(!0),await I(2200,i)}}catch{}}return o(),()=>{i.current=!0}},[]),e.jsxs("section",{className:"fp-section relative overflow-hidden bg-[#fcfcfb] px-6 py-20 md:py-32",children:[e.jsxs("div",{className:"relative mx-auto max-w-3xl text-center",children:[e.jsxs("div",{className:"fp-header",children:[e.jsx("h2",{className:"fp-headline",children:"Yesterday’s best model is rarely today’s."}),e.jsx("p",{className:"fp-subhead",children:"We track it, so you don’t have to — you’re always on what’s new, automatically."})]}),e.jsxs("div",{className:"fp-stage",children:[e.jsx("div",{className:`fp-pile${n?" fp-pile--settled":""}`,children:L.slice(0,t).map(i=>e.jsxs("div",{className:"fp-chip",style:{transform:`translate(${i.x}px, ${i.y}px) rotate(${i.r}deg)`,zIndex:i.z},children:[e.jsx(Ce,{icon:i.icon}),e.jsx("span",{children:i.label})]},i.label))}),e.jsxs("div",{className:`fp-badge${n?" fp-badge--shown":""}`,children:[e.jsx("span",{className:"fp-badge-check",children:e.jsx(Ee,{})}),"Handled"]})]}),e.jsx("p",{className:`fp-caption${n?" fp-caption--shown":""}`,children:"The Conductor already checked. You don’t have to."})]}),e.jsx("style",{children:`
        .fp-section {
          --fp-border: #e5e4e0;
          --fp-text: #171717;
          --fp-text-2: #6b6b68;
          --fp-orange: var(--color-primary);
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
          box-shadow: 0 10px 24px rgba(248,70,0,0.32);
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
      `})]})}const Me=[null,"notion",null,"sentry",null,"github",null,"gitlab",null,"vercel",null,"codex",null,"cursor",null,"railway",null,"chatgpt",null,null],Le={hidden:{opacity:0,scale:.9},visible:t=>({opacity:1,scale:1,transition:{delay:t*.03,duration:.4,ease:[.16,1,.3,1]}})};function Ae({logo:t,index:a}){const[n,r]=m.useState(!1);return e.jsxs(j.div,{custom:a,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},variants:Le,className:`aspect-square w-full rounded-[20px] ${t?"bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] ring-[0.5px] ring-black/10 flex items-center justify-center":"bg-white/[0.02] border border-white/[0.05]"}`,children:[t&&!n&&e.jsx("img",{src:`./logos/${t}.svg`,alt:t,className:"size-8 object-contain",onError:()=>r(!0)}),t&&n&&e.jsx("span",{className:"text-xs font-medium uppercase text-black/40",children:t.slice(0,2)})]})}function De(){return e.jsx("section",{className:"bg-[#0a0a0a] px-6 py-24",children:e.jsxs("div",{className:"mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{className:"max-w-[365px]",children:[e.jsx("h2",{className:"text-white",style:{fontFamily:"var(--font-google-sans)",fontSize:64,fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.05},children:"Connects with your tools"}),e.jsx("p",{className:"mt-4 max-w-[365px] text-sm text-white/50",children:"Integrates with what you already use every day — no friction, no complicated setup."})]}),e.jsx("div",{className:"grid w-full max-w-[436px] grid-cols-5 gap-3.5",children:Me.map((t,a)=>e.jsx(Ae,{logo:t,index:a},a))})]})})}function Te(){return e.jsxs("main",{children:[e.jsx(ae,{}),e.jsx(de,{}),e.jsx(V,{}),e.jsx(ge,{}),e.jsx(be,{}),e.jsx(Ne,{}),e.jsx(Se,{}),e.jsx(De,{})]})}X.createRoot(document.getElementById("root")).render(e.jsx(m.StrictMode,{children:e.jsx(Te,{})}));
