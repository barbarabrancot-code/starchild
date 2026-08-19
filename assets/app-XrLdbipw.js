import{f as pe,c as qe,r as c,s as Bt,a as Ht,p as ga,v as ua,i as fa,b as ya,d as ba,e as wa,n as Dt,g as va,h as ja,u as qt,j as ka,m as _e,k as _t,l as he,M as Na,o as e,q as p,C,A as q,t as Sa,w as Ca}from"./ConductorModeSection-Cfbgwcj0.js";function Gt(t,a){let s;const n=()=>{const{currentTime:o}=a,r=(o===null?0:o.value)/100;s!==r&&t(r),s=r};return pe.preUpdate(n,!0),()=>qe(n)}function za(t,a,s){c.useInsertionEffect(()=>t.on(a,s),[t,a,s])}function Se(t){return typeof window>"u"?!1:t?Bt():Ht()}const Ta=50,dt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Ma=()=>({time:0,x:dt(),y:dt()}),La={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function pt(t,a,s,n){const o=s[a],{length:i,position:r}=La[a],l=o.current,d=s.time;o.current=Math.abs(t[`scroll${r}`]),o.scrollLength=t[`scroll${i}`]-t[`client${i}`],o.offset.length=0,o.offset[0]=0,o.offset[1]=o.scrollLength,o.progress=ga(0,o.scrollLength,o.current);const h=n-d;o.velocity=h>Ta?0:ua(o.current-l,h)}function Ea(t,a,s){pt(t,"x",a,s),pt(t,"y",a,s),a.time=s}function Ia(t,a){const s={x:0,y:0};let n=t;for(;n&&n!==a;)if(fa(n))s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const o=n.getBoundingClientRect();n=n.parentElement;const i=n.getBoundingClientRect();s.x+=o.left-i.left,s.y+=o.top-i.top}else if(n instanceof SVGGraphicsElement){const{x:o,y:i}=n.getBBox();s.x+=o,s.y+=i;let r=null,l=n.parentNode;for(;!r;)l.tagName==="svg"&&(r=l),l=n.parentNode;n=r}else break;return s}const Ge={start:0,center:.5,end:1};function ht(t,a,s=0){let n=0;if(t in Ge&&(t=Ge[t]),typeof t=="string"){const o=parseFloat(t);t.endsWith("px")?n=o:t.endsWith("%")?t=o/100:t.endsWith("vw")?n=o/100*document.documentElement.clientWidth:t.endsWith("vh")?n=o/100*document.documentElement.clientHeight:t=o}return typeof t=="number"&&(n=a*t),s+n}const Fa=[0,0];function Aa(t,a,s,n){let o=Array.isArray(t)?t:Fa,i=0,r=0;return typeof t=="number"?o=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?o=t.split(" "):o=[t,Ge[t]?t:"0"]),i=ht(o[0],s,n),r=ht(o[1],a),i-r}const xe={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Wa={x:0,y:0};function Pa(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function $a(t,a,s){const{offset:n=xe.All}=s,{target:o=t,axis:i="y"}=s,r=i==="y"?"height":"width",l=o!==t?Ia(o,t):Wa,d=o===t?{width:t.scrollWidth,height:t.scrollHeight}:Pa(o),h={width:t.clientWidth,height:t.clientHeight};a[i].offset.length=0;let m=!a[i].interpolate;const x=n.length;for(let g=0;g<x;g++){const y=Aa(n[g],h[r],d[r],l[i]);!m&&y!==a[i].interpolatorOffsets[g]&&(m=!0),a[i].offset[g]=y}m&&(a[i].interpolate=ya(a[i].offset,ba(n),{clamp:!1}),a[i].interpolatorOffsets=[...a[i].offset]),a[i].progress=wa(0,1,a[i].interpolate(a[i].current))}function Ra(t,a=t,s){if(s.x.targetOffset=0,s.y.targetOffset=0,a!==t){let n=a;for(;n&&n!==t;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=a===t?a.scrollWidth:a.clientWidth,s.y.targetLength=a===t?a.scrollHeight:a.clientHeight,s.x.containerLength=t.clientWidth,s.y.containerLength=t.clientHeight}function Oa(t,a,s,n={}){return{measure:o=>{Ra(t,n.target,s),Ea(t,s,o),(n.offset||n.target)&&$a(t,s,n)},notify:()=>a(s)}}const X=new WeakMap,xt=new WeakMap,Ae=new WeakMap,mt=new WeakMap,ue=new WeakMap,gt=t=>t===document.scrollingElement?window:t;function Yt(t,{container:a=document.scrollingElement,trackContentSize:s=!1,...n}={}){if(!a)return Dt;let o=Ae.get(a);o||(o=new Set,Ae.set(a,o));const i=Ma(),r=Oa(a,t,i,n);if(o.add(r),!X.has(a)){const d=()=>{for(const g of o)g.measure(ja.timestamp);pe.preUpdate(h)},h=()=>{for(const g of o)g.notify()},m=()=>pe.read(d);X.set(a,m);const x=gt(a);window.addEventListener("resize",m),a!==document.documentElement&&xt.set(a,va(a,m)),x.addEventListener("scroll",m),m()}if(s&&!ue.has(a)){const d=X.get(a),h={width:a.scrollWidth,height:a.scrollHeight};mt.set(a,h);const m=()=>{const g=a.scrollWidth,y=a.scrollHeight;(h.width!==g||h.height!==y)&&(d(),h.width=g,h.height=y)},x=pe.read(m,!0);ue.set(a,x)}const l=X.get(a);return pe.read(l,!1,!0),()=>{var x;qe(l);const d=Ae.get(a);if(!d||(d.delete(r),d.size))return;const h=X.get(a);X.delete(a),h&&(gt(a).removeEventListener("scroll",h),(x=xt.get(a))==null||x(),window.removeEventListener("resize",h));const m=ue.get(a);m&&(qe(m),ue.delete(a)),mt.delete(a)}}const Ba=[[xe.Enter,"entry"],[xe.Exit,"exit"],[xe.Any,"cover"],[xe.All,"contain"]],ut={start:0,end:1};function Ha(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const s=ut[a[0]],n=ut[a[1]];if(!(s===void 0||n===void 0))return[s,n]}function Da(t){if(t.length!==2)return;const a=[];for(const s of t)if(Array.isArray(s))a.push(s);else if(typeof s=="string"){const n=Ha(s);if(!n)return;a.push(n)}else return;return a}function qa(t,a){const s=Da(t);if(!s)return!1;for(let n=0;n<2;n++){const o=s[n],i=a[n];if(o[0]!==i[0]||o[1]!==i[1])return!1}return!0}function Ke(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,s]of Ba)if(qa(t,a))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const ft=new Map;function yt(t){const a={value:0},s=Yt(n=>{a.value=n[t.axis].progress*100},t);return{currentTime:a,cancel:s}}function Vt({source:t,container:a,...s}){const{axis:n}=s;t&&(a=t);let o=ft.get(a);o||(o=new Map,ft.set(a,o));const i=s.target??"self";let r=o.get(i);r||(r={},o.set(i,r));const l=n+(s.offset??[]).join(",");return r[l]||(s.target&&Se(s.target)?Ke(s.offset)?r[l]=new ViewTimeline({subject:s.target,axis:n}):r[l]=yt({container:a,...s}):Se()?r[l]=new ScrollTimeline({source:a,axis:n}):r[l]=yt({container:a,...s})),r[l]}function _a(t,a){const s=Vt(a),n=a.target?Ke(a.offset):void 0,o=a.target?Se(a.target)&&!!n:Se();return t.attachTimeline({timeline:o?s:void 0,...n&&o&&{rangeStart:n.rangeStart,rangeEnd:n.rangeEnd},observe:i=>(i.pause(),Gt(r=>{i.time=i.iterationDuration*r},s))})}function Ga(t){return t&&(t.target||t.offset)}function Ya(t){return t.length===2}function Va(t,a){return Ya(t)||Ga(a)?Yt(s=>{t(s[a.axis].progress,s)},a):Gt(t,Vt(a))}function Ut(t,{axis:a="y",container:s=document.scrollingElement,...n}={}){if(!s)return Dt;const o={axis:a,container:s,...n};return typeof t=="function"?Va(t,o):_a(t,o)}const Ua=()=>({scrollX:he(0),scrollY:he(0),scrollXProgress:he(0),scrollYProgress:he(0)}),te=t=>t?!t.current:!1;function bt(t,a,s,n){return{factory:o=>{let i;const r=()=>{if(te(s)||te(n)){_e.read(r);return}i=Ut(o,{...a,axis:t,container:(s==null?void 0:s.current)||void 0,target:(n==null?void 0:n.current)||void 0})};return _e.read(r),()=>{_t(r),i==null||i()}},times:[0,1],keyframes:[0,1],ease:o=>o,duration:1}}function Ka(t,a){return typeof window>"u"?!1:t?Bt()&&!!Ke(a):Ht()}function Xa({container:t,target:a,...s}={}){const n=qt(Ua);Ka(a,s.offset)&&(n.scrollXProgress.accelerate=bt("x",s,t,a),n.scrollYProgress.accelerate=bt("y",s,t,a));const o=c.useRef(null),i=c.useRef(!1),r=c.useCallback(()=>(o.current=Ut((l,{x:d,y:h})=>{n.scrollX.set(d.current),n.scrollXProgress.set(d.progress),n.scrollY.set(h.current),n.scrollYProgress.set(h.progress)},{...s,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var l;(l=o.current)==null||l.call(o)}),[t,a,JSON.stringify(s.offset)]);return ka(()=>{if(i.current=!1,te(t)||te(a)){i.current=!0;return}else return r()},[r]),c.useEffect(()=>{if(!i.current)return;let l;const d=()=>{const h=te(t),m=te(a);!h&&!m&&(l=r())};return _e.read(d),()=>{_t(d),l==null||l()}},[r]),n}function D(t){const a=qt(()=>he(t)),{isStatic:s}=c.useContext(Na);if(s){const[,n]=c.useState(t);c.useEffect(()=>a.on("change",n),[])}return a}function me({className:t}){return e.jsxs("div",{className:`relative overflow-hidden rounded-[7px] ${t??"size-6"}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[#1c1c1c]"}),e.jsx("div",{className:"absolute inset-0 bg-[#f84600]",style:{clipPath:"polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)"}})]})}function Ce({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function wt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function R({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ye({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Qa({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Me({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Kt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Xe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Xt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Le({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Qt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function Zt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function Qe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function Jt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function ea({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Za({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("rect",{x:"3",y:"7.5",width:"18",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Ja({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function ta({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function es({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M12 11v5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"8",r:"1",fill:"currentColor"})]})}const ts={idle:{scale:[1,1.06,1],opacity:[.75,1,.75],duration:3.4},listening:{scale:[1,1.12,1],opacity:[.85,1,.85],duration:2.2},acknowledging:{scale:[1,.86,1.04,1],opacity:[1,1,1,1],duration:.5},thinking:{scale:[1,1.18,.94,1],opacity:[1,.7,1,1],duration:1.1},settled:{scale:[1,1.03,1],opacity:[.9,1,.9],duration:4.6}};function ge({state:t="idle",depth:a=0,size:s=18}){const n=ts[t],o=10+a*26,i=.1+a*.22;return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:s*3,height:s*3},children:[e.jsx(p.span,{"aria-hidden":"true",className:"absolute rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)"},animate:{width:s*(2+a*.9),height:s*(2+a*.9),opacity:i},transition:{duration:.8,ease:[.16,1,.3,1]}}),e.jsx(p.span,{"aria-hidden":"true",className:"relative rounded-full bg-[#f84600]",style:{width:s,height:s,boxShadow:`0 0 ${o}px rgba(248,70,0,.7)`},animate:{scale:n.scale,opacity:n.opacity},transition:{duration:n.duration,repeat:t==="acknowledging"?0:1/0,ease:"easeInOut"}})]})}const vt=.34,jt=.15,Q=860,fe=560,ye=14;function as({targetRef:t,image:a}){const s=c.useRef(null),n=c.useRef(null),o=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{const r=t.current,l=s.current;if(!r||!l||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const h=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let m=0,x=0,g=0,y=0,k=0,v=0,j=!1,I=0;const E=()=>{var $,S,N,f;($=i.current)==null||$.style.setProperty("transform",`translate3d(${g-ye/2}px, ${y-ye/2}px, 0)`),(S=o.current)==null||S.style.setProperty("transform",`translate3d(${k-fe/2}px, ${v-fe/2}px, 0)`),(N=n.current)==null||N.style.setProperty("--mx",`${k-Q/2}px`),(f=n.current)==null||f.style.setProperty("--my",`${v-Q/2}px`)},W=()=>{g+=(m-g)*vt,y+=(x-y)*vt,k+=(g-k)*jt,v+=(y-v)*jt,E(),I=requestAnimationFrame(W)},z=$=>{const S=r.getBoundingClientRect();if(m=$.clientX-S.left,x=$.clientY-S.top,!j){if(j=!0,g=k=m,y=v=x,E(),h)return;I=requestAnimationFrame(W)}h&&(g=k=m,y=v=x,E())},P=()=>l.classList.add("hs-on"),L=()=>{l.classList.remove("hs-on"),cancelAnimationFrame(I),I=0,j=!1};return r.addEventListener("pointermove",z),r.addEventListener("pointerenter",P),r.addEventListener("pointerleave",L),r.classList.add("hs-host"),()=>{r.removeEventListener("pointermove",z),r.removeEventListener("pointerenter",P),r.removeEventListener("pointerleave",L),r.classList.remove("hs-host"),cancelAnimationFrame(I)}},[t]),e.jsxs("div",{ref:s,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:n,className:"hs-lit"}),e.jsx("div",{ref:o,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:i,className:"hs-dot"})}),e.jsx("style",{children:`
        .hs-root { position: absolute; inset: 0; pointer-events: none; }
        .hs-light-layer { position: absolute; inset: 0; z-index: 1; }
        .hs-cursor-layer { position: absolute; inset: 0; z-index: 20; }

        /* the same photograph, re-exposed: brighter, warmer, and only where the mask is */
        .hs-lit {
          position: absolute; inset: 0;
          background-image: url("${a}");
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: brightness(2.9) contrast(1.06) sepia(.62) saturate(2.9) hue-rotate(-16deg);
          opacity: 0;
          transition: opacity .45s ease;
          --mx: -9999px; --my: -9999px;
          -webkit-mask-image: radial-gradient(circle closest-side,
            rgba(0,0,0,.95) 0%, rgba(0,0,0,.62) 30%, rgba(0,0,0,.22) 55%, transparent 76%);
          mask-image: radial-gradient(circle closest-side,
            rgba(0,0,0,.95) 0%, rgba(0,0,0,.62) 30%, rgba(0,0,0,.22) 55%, transparent 76%);
          -webkit-mask-size: ${Q}px ${Q}px;
          mask-size: ${Q}px ${Q}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${fe}px; height: ${fe}px;
          border-radius: 999px;
          background: radial-gradient(circle,
            rgba(248,70,0,.20) 0%, rgba(248,70,0,.09) 34%, rgba(248,70,0,.03) 58%, transparent 72%);
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity .45s ease;
          will-change: transform;
        }

        .hs-dot {
          position: absolute; top: 0; left: 0;
          width: ${ye}px; height: ${ye}px;
          border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0;
          transition: opacity .3s ease;
          will-change: transform;
        }

        .hs-on .hs-lit { opacity: 1; }
        .hs-on .hs-glow { opacity: 1; }
        .hs-on .hs-dot { opacity: 1; animation: hs-breathe 3.6s ease-in-out infinite; }

        @keyframes hs-breathe {
          0%, 100% { scale: 1; }
          50% { scale: 1.16; }
        }

        /* the dot stands in for the cursor, but never over things you need to aim at */
        .hs-host { cursor: none; }
        .hs-host input, .hs-host textarea { cursor: text; }
        .hs-host button, .hs-host a, .hs-host [role="button"] { cursor: pointer; }

        @media (prefers-reduced-motion: reduce) {
          .hs-on .hs-dot { animation: none; }
          .hs-lit, .hs-glow, .hs-dot { transition: none; }
        }
      `})]})}function aa({onNavigateHome:t,onLogIn:a,onSignUp:s}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(C,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const ss=[{id:"build",label:"Build",icon:Kt,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:Xt,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:Qe,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:Jt,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:ea,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],kt={available:["Conversation","Conductor Mode","Research & tasks","Browse Marketplace"],locked:["Save memory & context","Conversation history","Continue on Desktop","Run tasks 24/7","Automations","Publish & monetize","Integrations","Buy from Marketplace"]},be=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],ns=[{id:"ideas",label:"Ideas",icon:Xe,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:Ja,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:ta,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:Qe,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:Jt,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:ea,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],os=["Your priorities","How you like to receive help","Recurring projects","What you're trying to work through"],sa={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A poster is a visual, creative job — so it's routed to a model actually built to compose images, not just describe them."},{title:"Assembling the right tools",sub:"Plus a quick, cheap research pass first, so the details are real — Odysseus doesn't end up looking generic."},{title:"Getting the advisor opinion",sub:"A fast visual check before it reaches you: is the composition solid, is the text legible?"},{title:"Delivering",sub:"Here's your poster — and what it actually cost, below."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},na={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A brand is really two jobs — naming and voice go to a model sharp with language, the logo direction goes to a visual one."},{title:"Assembling the right tools",sub:"The color palette is genuinely easy, so it's handed to something fast and cheap instead of a heavyweight."},{title:"Getting the advisor opinion",sub:"One more pass checks that the name, palette, and logo direction actually agree with each other."},{title:"Delivering",sub:"Here's your starter brand kit — and what it actually cost, below."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},oa={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Numbers matter more than eloquence here, so it's routed to a model actually wired to live market data, not one guessing from memory."},{title:"Assembling the right tools",sub:"A live data feed pulls today's real figures — not a plausible-sounding hallucination."},{title:"Getting the advisor opinion",sub:"This is the kind of task where being wrong actually costs you, so the numbers get double-checked before delivery."},{title:"Delivering",sub:"Here's today's snapshot — and what it actually cost, below."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},ia={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Debugging needs a model actually tuned for code — not a generalist that's merely fluent in it."},{title:"Assembling the right tools",sub:"It also gets a sandbox: a place to actually run the fix and see if it works, instead of just predicting it."},{title:"Getting the advisor opinion",sub:"The result gets checked before it reaches you, catching the kind of bug that looks fine at a glance."},{title:"Delivering",sub:"Here's your fix — and what it actually cost, below."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},is={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Conductor Mode is choosing the best model",sub:'It reads your whole request, then matches it to a model actually built for that kind of work — not just the "smartest" one available.'},{title:"Assembling the right tools",sub:"It grabs only what that specific job needs — nothing you're not using, nothing you're paying for and not touching."},{title:"Getting the advisor opinion",sub:"On anything that actually matters, a second pass quietly checks the work before you ever see it."},{title:"Delivering",sub:"That's the whole trick — and here's what it saves, below."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},rs=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:sa},{test:/coffee|brand|logo/i,scenario:na},{test:/market|trading|trade|stock|crypto/i,scenario:oa},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:ia}],ls=[{prompt:"Make a poster for the Odyssey movie",scenario:sa},{prompt:"Make me a coffee shop brand",scenario:na},{prompt:"How's the market today?",scenario:oa},{prompt:"Debug this Python traceback",scenario:ia}];function Nt(t){const a=rs.find(({test:s})=>s.test(t));return(a==null?void 0:a.scenario)??is}const We=["All","Writing","Design","Code","Marketing"],cs=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function Ze({onStartTask:t,align:a="start",intents:s=ss}){const[n,o]=c.useState(null),i=s.find(l=>l.id===n),r=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${r}`,children:s.map(({id:l,label:d,icon:h,badge:m})=>{const x=n===l;return e.jsxs("button",{type:"button",onClick:()=>o(x?null:l),"aria-expanded":x,className:`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${x?"bg-white text-neutral-900":"bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(h,{className:`size-4 ${x?"text-neutral-500":"text-white/55"}`}),d,m&&e.jsx("span",{className:"absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white",children:m})]},l)})}),e.jsx(q,{mode:"wait",children:i&&e.jsx(p.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${r} ${a==="center"?"mx-auto":""}`,children:i.tasks.map((l,d)=>e.jsxs(p.button,{type:"button",onClick:()=>t(l),initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+d*.05,ease:[.16,1,.3,1]},className:"group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]",style:{fontFamily:"var(--font-google-sans)"},children:[l.label,e.jsx(R,{className:"size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]"})]},l.id))})},i.id)})]})}const ds="./images/monolito.png";function ra({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null);return e.jsxs("section",{ref:r,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(as,{targetRef:r,image:ds}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(aa,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(C,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(ps,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
      /* The monolith sits on the right of the frame and the left is near-black,
         which is exactly where the hero copy lives — so it's anchored right and
         a scrim keeps the text side solid when cover-cropping shifts it inward. */
      .hero-section {
        background-color: #07090a;
        background-image: url("./images/monolito.png");
        background-size: cover;
        background-position: center right;
        background-repeat: no-repeat;
      }
      .hero-vignette {
        position: absolute; inset: 0; pointer-events: none;
        background:
          linear-gradient(90deg, rgba(7,9,10,.94) 0%, rgba(7,9,10,.6) 40%, rgba(7,9,10,0) 68%),
          linear-gradient(180deg, rgba(0,0,0,.3), transparent 32%, rgba(0,0,0,.35));
      }
      @media (max-width: 1023px) {
        /* on narrow screens the crop pushes the monolith over the copy — push it back out */
        .hero-section { background-position: 78% center; }
        .hero-vignette {
          background:
            linear-gradient(90deg, rgba(7,9,10,.96) 0%, rgba(7,9,10,.82) 55%, rgba(7,9,10,.5) 100%),
            linear-gradient(180deg, rgba(0,0,0,.3), transparent 32%, rgba(0,0,0,.35));
        }
      }
    `})]})}function ps({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),o=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(ge,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&o()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:o,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(R,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ze,{onStartTask:a})})]})}const hs="./images/empresas.svg",xs=6;function la(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(C,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:xs},(t,a)=>e.jsx("img",{src:hs,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
        .uw-viewport {
          position: relative; overflow: hidden;
          /* fade both edges so marks enter and leave instead of popping */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .uw-track {
          display: flex; width: max-content;
          animation: uw-scroll 42s linear infinite;
        }
        .uw-strip {
          display: block; height: 32px; width: auto; flex: none; opacity: .72;
        }
        /* -100%/6 === exactly one copy, so the loop restarts on an identical frame */
        @keyframes uw-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-16.6666%); }
        }
        .uw-viewport:hover .uw-track { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .uw-track { animation: none; }
        }
        @media (max-width: 640px) {
          .uw-strip { height: 24px; }
        }
      `})]})}const St="(min-width: 1024px) and (min-height: 560px)",Ct="(prefers-reduced-motion: reduce)";function ca(){const t=()=>typeof window<"u"&&window.matchMedia(St).matches&&!window.matchMedia(Ct).matches,[a,s]=c.useState(t);return c.useEffect(()=>{const n=window.matchMedia(St),o=window.matchMedia(Ct),i=()=>s(n.matches&&!o.matches);return i(),n.addEventListener("change",i),o.addEventListener("change",i),()=>{n.removeEventListener("change",i),o.removeEventListener("change",i)}},[]),a}function da(t,a,s){const n=c.useRef(s);n.current=s,c.useEffect(()=>{if(!a)return;const o=()=>{const i=t.current;if(!i)return;const r=i.offsetHeight-window.innerHeight;if(r<=0)return;const l=-i.getBoundingClientRect().top/r;n.current(l<0?0:l>1?1:l)};return o(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o),window.removeEventListener("resize",o)}},[a,t])}function Je(t){const a=c.useRef(null),s=ca(),[n,o]=c.useState(0);return da(a,s,r=>{o(Math.max(0,Math.min(t-1,Math.floor(r*t))))}),{trackRef:a,pinned:s,index:n,selectStep:r=>{const l=a.current;if(!s||!l){o(r);return}const d=l.getBoundingClientRect().top+window.scrollY,h=l.offsetHeight-window.innerHeight;window.scrollTo({top:d+h*((r+.5)/t),behavior:"smooth"})}}}function Ee({trackRef:t,pinned:a,screens:s,children:n}){const o=c.useRef(null),[i,r]=c.useState(1);return c.useLayoutEffect(()=>{if(!a){r(1);return}const l=o.current;if(!l)return;const d=()=>{const m=l.offsetHeight,x=window.innerHeight-32;r(m>x?Math.max(.62,x/m):1)};d();const h=new ResizeObserver(d);return h.observe(l),window.addEventListener("resize",d),()=>{h.disconnect(),window.removeEventListener("resize",d)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(s)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:o,className:"sp-fit",style:i===1?void 0:{transform:`scale(${i})`},children:n})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function ms({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(me,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,s)=>e.jsxs(p.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},className:`pw-step${s===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(gs,{result:t.result})},t.id)]}),e.jsx("style",{children:`
        .pw-frame {
          border-radius: 14px; overflow: hidden; background: #fff;
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 70px rgba(0,0,0,.55);
        }
        .pw-chrome {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px; border-bottom: 1px solid rgba(0,0,0,.07); background: #fbfaf8;
        }
        .pw-chrome-title {
          font-family: var(--font-google-sans); font-size: 12px; color: #737373;
        }

        .pw-body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 16px; }

        .pw-prompt-row { display: flex; justify-content: flex-end; }
        .pw-prompt {
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.5; color: #262626;
          background: #f5f5f5; border-radius: 14px 14px 4px 14px; padding: 10px 13px; margin: 0; max-width: 82%;
        }

        .pw-steps { list-style: none; margin: 0; padding: 0 0 0 2px; display: flex; flex-direction: column; gap: 11px; }
        .pw-step {
          position: relative; padding-left: 20px;
          font-family: var(--font-google-sans); font-size: 12.5px; line-height: 1.5; color: #737373;
        }
        .pw-step--done { color: #262626; font-weight: 500; }
        .pw-dot {
          position: absolute; left: 0; top: 5px; width: 9px; height: 9px; border-radius: 999px;
          border: 1.6px solid #d4d4d4; background: #fff;
        }
        .pw-step--done .pw-dot { border-color: var(--color-primary); }
        .pw-step--done .pw-dot::after {
          content: ""; position: absolute; inset: 1.6px; border-radius: 999px; background: var(--color-primary);
        }
        /* rail connecting the steps */
        .pw-step:not(:last-child)::before {
          content: ""; position: absolute; left: 4.2px; top: 14px; bottom: -11px; width: 1.4px; background: #ededed;
        }

        .pw-result {
          border: 1px solid #ededed; border-radius: 11px; padding: 14px; background: #fbfaf8;
        }
        .pw-result-heading {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: #a3a3a3; margin: 0 0 11px;
        }

        .pw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .pw-list li { display: flex; align-items: baseline; gap: 9px; }
        .pw-list-idx {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          color: var(--color-primary); width: 12px; flex: none;
        }
        .pw-list-text { font-family: var(--font-google-sans); font-size: 13px; color: #262626; }
        .pw-list-note { font-family: var(--font-google-sans); font-size: 11.5px; color: #a3a3a3; }

        .pw-table { width: 100%; border-collapse: collapse; font-family: var(--font-google-sans); }
        .pw-table th, .pw-table td { text-align: right; padding: 7px 0; font-size: 12.5px; }
        .pw-table th:first-child, .pw-table td:first-child { text-align: left; color: #737373; }
        .pw-table thead th { font-size: 10.5px; font-weight: 600; color: #a3a3a3; letter-spacing: .06em; text-transform: uppercase; }
        .pw-table tbody tr + tr td { border-top: 1px solid #f0f0f0; }
        .pw-table td { color: #262626; }
        .pw-table td:nth-child(2) { color: var(--color-primary); font-weight: 500; }

        .pw-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .pw-tile { border: 1px solid #f0f0f0; border-radius: 8px; padding: 10px 11px; background: #fff; }
        .pw-tile-label {
          font-family: var(--font-google-sans); font-size: 10.5px; color: #a3a3a3; margin: 0 0 4px;
        }
        .pw-tile-value {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: #171717; margin: 0;
        }
        .pw-tile-delta { font-family: var(--font-google-sans); font-size: 10.5px; color: var(--color-primary); }
        /* narrow bars with a baseline, so this reads as a trend and not as skeleton blocks */
        .pw-bars {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 5px;
          height: 62px; margin-top: 14px; padding-bottom: 5px;
          border-bottom: 1px solid #ededed;
        }
        .pw-bar { flex: 1; max-width: 15px; border-radius: 2px 2px 0 0; background: #e4e4e4; }
        .pw-bar:last-child { background: var(--color-primary); }

        @media (max-width: 640px) {
          .pw-body { padding: 16px 14px 18px; }
          .pw-tiles { grid-template-columns: repeat(3, 1fr); gap: 6px; }
          .pw-tile { padding: 8px; }
          .pw-tile-value { font-size: 14px; }
        }
      `})]})}function gs({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,s)=>e.jsx(p.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+s*.05,ease:[.16,1,.3,1]}},s))})]})}function us({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Je(be.length),i=be[n];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:be.length,children:e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[be.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`uc-tab${d?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:r.blurb}),e.jsx("span",{className:"uc-tab-example",children:r.example})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"uc-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(ms,{useCase:i})})]})]})}),e.jsx("style",{children:`
        .uc-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 16px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .uc-tab:hover { background: rgba(255,255,255,.03); }
        .uc-tab--active { border-left-color: var(--color-primary); background: rgba(255,255,255,.04); }

        .uc-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .uc-tab--active .uc-tab-title { color: #fff; }

        .uc-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }
        .uc-tab-example {
          display: block; margin-top: 10px; font-family: var(--font-google-sans);
          font-size: 13px; color: rgba(255,255,255,.4);
        }

        .uc-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .uc-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .uc-try { margin-left: 0; }
        }
      `})]})}function fs({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:ns.map(({id:a,label:s,icon:n,task:o},i)=>e.jsxs(p.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:i%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(n,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:s}),e.jsx(R,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:o.label})]},a))})]}),e.jsx("style",{children:`
        .mw-card {
          display: flex; flex-direction: column; gap: 10px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 20px 22px;
          background: rgba(255,255,255,.02);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .mw-card:hover { border-color: rgba(248,70,0,.45); background: rgba(255,255,255,.05); }

        .mw-head { display: flex; align-items: center; gap: 10px; }
        .mw-icon { color: rgba(255,255,255,.4); transition: color .2s ease; flex: none; }
        .mw-card:hover .mw-icon { color: var(--color-primary); }
        .mw-label {
          font-family: var(--font-google-sans); font-size: 16px; font-weight: 600; color: #fff;
        }
        /* arrow parks on the right edge so the wider card still reads as one action */
        .mw-arrow {
          margin-left: auto; color: rgba(255,255,255,.25); transition: color .2s ease; flex: none;
        }
        .mw-card:hover .mw-arrow { color: var(--color-primary); }

        .mw-task {
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.5;
          color: rgba(255,255,255,.45);
        }
      `})]})}const ys=[{file:"OpenAI.svg",w:148,h:40},{file:"Claude.svg",w:160,h:34},{file:"Frame374.svg",w:151,h:34},{file:"Frame375.svg",w:137,h:40},{file:"Deepseek.svg",w:206,h:33},{file:"Kimi.svg",w:118,h:40}],zt=16,bs=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],Tt=.06,ws=.46,Mt=.56,vs=.92,Lt=t=>t<0?0:t>1?1:t,Z=(t,a,s)=>t+(a-t)*s,Et=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function we(t,a,s){const n=t.getBoundingClientRect();return{left:(n.left-a.left)/s,top:(n.top-a.top)/s,width:n.width/s,height:n.height/s}}function It(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function Ft({label:t,innerRef:a,children:s}){return e.jsxs("div",{className:"ky-panel",ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function et(){const t=c.useRef(null),a=c.useRef(null),s=c.useRef(null),n=c.useRef(null),o=c.useRef(null),i=c.useRef(null),r=c.useRef(null),l=D(0),d=D(0),h=D(0),m=D(0),x=D(0),g=D(0),y=D(0),k=D(0),v=D(0),[j,I]=c.useState(!1),[E,W]=c.useState(!1),[z,P]=c.useState(!1),L=ca(),{scrollYProgress:$}=Xa({target:a,offset:["start 0.85","end 0.55"]});c.useEffect(()=>{const f=window.matchMedia("(prefers-reduced-motion: reduce)"),T=()=>P(f.matches);T(),f.addEventListener("change",T);const u=()=>{const F=a.current,b=s.current,O=n.current,Y=o.current,ie=i.current;if(!F||!b||!O||!Y||!ie)return;const _=F.getBoundingClientRect(),V=F.offsetWidth?_.width/F.offsetWidth:1,U=we(Y,_,V),M={x:U.left+U.width/2,y:U.top+U.height/2},A=we(ie,_,V);r.current={conductor:M,you:It(we(b,_,V),M),models:It(we(O,_,V),M),result:{x:A.left+A.width/2,y:A.top}}};return u(),window.addEventListener("resize",u),()=>{window.removeEventListener("resize",u),f.removeEventListener("change",T)}},[]),c.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[L]);const S=f=>{const T=r.current;if(!T)return;const u=Et(Lt((f-Tt)/(ws-Tt))),F=Et(Lt((f-Mt)/(vs-Mt)));l.set(Z(T.you.x,T.conductor.x,u)),d.set(Z(T.you.y,T.conductor.y,u)),m.set(Z(T.models.x,T.conductor.x,u)),x.set(Z(T.models.y,T.conductor.y,u));const b=u<=0?0:u>.94?(1-u)/.06:Math.min(1,u/.08);h.set(b),g.set(b),y.set(Z(T.conductor.x,T.result.x,F)),k.set(Z(T.conductor.y,T.result.y,F)),v.set(F<=0?0:F>.93?(1-F)/.07:Math.min(1,F/.08)),I(u>.9),W(F>.88)};da(t,L,S),za($,"change",f=>{L||S(f)});const N=z||E;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ee,{trackRef:t,pinned:L,screens:2,children:e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:a,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(Ft,{label:"You",innerRef:s,children:e.jsx("ul",{className:"ky-list",children:os.map(f=>e.jsx("li",{children:f},f))})}),e.jsxs("div",{className:`ky-conductor${j?" ky-conductor--hit":""}`,ref:o,children:[e.jsx(ge,{state:j?"thinking":"idle",depth:j?1:.35,size:16}),e.jsx("p",{className:"ky-conductor-label",children:"Conductor"})]}),e.jsx(Ft,{label:"Available models",innerRef:n,children:e.jsx("div",{className:"ky-logos",children:ys.map(f=>e.jsx("img",{src:`./images/carousel/${f.file}`,alt:"",style:{height:zt,width:zt*(f.w/f.h)}},f.file))})})]}),e.jsxs("div",{className:`ky-result${N?" ky-result--lit":""}`,ref:i,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),!z&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx(p.span,{className:"ky-dot",style:{x:l,y:d,opacity:h}}),e.jsx(p.span,{className:"ky-dot",style:{x:m,y:x,opacity:g}}),e.jsx(p.span,{className:"ky-dot ky-dot--result",style:{x:y,y:k,opacity:v}})]})]})})})]})}),e.jsx(C,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:bs.map((f,T)=>e.jsx(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:T*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:f.title}),e.jsx("p",{className:"ky-benefit-desc",children:f.desc})]})},f.title))})}),e.jsx("style",{children:`
        .ky-section { --ky-border: rgba(255,255,255,.1); --ky-accent: var(--color-primary); }

        .ky-stage { position: relative; }

        /* gap replaces the old connector elements — the paths are invisible now */
        .ky-flow { display: flex; align-items: stretch; justify-content: center; gap: 72px; }

        .ky-panel {
          flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 16px;
          border: 1px solid var(--ky-border); border-radius: 16px; padding: 26px 24px;
          background: rgba(255,255,255,.02);
        }
        .ky-panel-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.4); margin: 0;
        }

        .ky-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ky-list li {
          font-family: var(--font-google-sans); font-size: 14.5px; color: rgba(255,255,255,.85);
          display: flex; align-items: center; gap: 9px;
        }
        .ky-list li::before {
          content: ""; width: 4px; height: 4px; border-radius: 999px;
          background: var(--ky-accent); flex: none;
        }

        .ky-logos {
          display: flex; flex-wrap: wrap; align-items: center; align-content: center;
          gap: 18px 22px; flex: 1;
        }
        .ky-logos img { display: block; object-fit: contain; opacity: .75; }

        .ky-conductor {
          flex: 0 0 150px; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 6px; border-radius: 999px;
          transition: box-shadow .5s ease;
        }
        /* the moment both inputs land */
        .ky-conductor--hit { box-shadow: 0 0 46px 6px rgba(248,70,0,.18); }
        .ky-conductor-label {
          font-family: var(--font-google-sans); font-size: 11.5px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #fff; margin: 0;
        }

        .ky-dots { position: absolute; inset: 0; pointer-events: none; }
        .ky-dot {
          position: absolute; top: 0; left: 0; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
          border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 10px rgba(248,70,0,.85), 0 0 26px rgba(248,70,0,.35);
          will-change: transform;
        }
        .ky-dot--result { width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; }

        /* before the dot lands this is a quiet placeholder, not an empty orange box */
        .ky-result {
          max-width: 520px; margin: 56px auto 0; text-align: center;
          border: 1px solid rgba(255,255,255,.07); border-radius: 16px; padding: 22px 26px;
          background: transparent;
          transition: border-color .5s ease, background-color .5s ease, box-shadow .5s ease;
        }
        .ky-result--lit {
          border-color: rgba(248,70,0,.5);
          background: rgba(248,70,0,.06);
          box-shadow: 0 0 40px rgba(248,70,0,.1);
        }
        .ky-result-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.25); margin: 0 0 10px;
          transition: color .5s ease;
        }
        .ky-result--lit .ky-result-label { color: var(--ky-accent); }
        /* content settles in when the dot lands, rather than being there all along */
        .ky-result-text {
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; margin: 0;
          opacity: 0; transform: translateY(6px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .ky-result--lit .ky-result-text { opacity: 1; transform: none; }

        .ky-benefit {
          display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid var(--ky-border); padding-top: 20px; height: 100%;
        }
        .ky-benefit-title {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: #fff; margin: 0;
        }
        .ky-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.6;
          color: rgba(255,255,255,.55); margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .ky-result-text { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .ky-flow { flex-direction: column; align-items: stretch; gap: 40px; }
          .ky-conductor { flex-basis: auto; padding: 4px 0; }
          .ky-result { margin-top: 40px; }
        }
      `})]})}function Ie({onStartFree:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-28 text-center md:py-36",children:e.jsx(C,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"The best AI for the job changes constantly. Starchild keeps up."}),e.jsx(p.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(p.button,{type:"button",onClick:()=>{},initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx(R,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})]})})})})}function js({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ra,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx(la,{}),e.jsx(us,{onStartTask:a}),e.jsx(fs,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(et,{})}),e.jsx(Ie,{onStartFree:l})]})}const ne="0 0 160 96",K="rgba(255,255,255,.26)",ze="rgba(255,255,255,.12)";function ks({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:ze,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":K,strokeWidth:n===0?1.6:1},s.y))]})}function Ns({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:K,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function Ss({className:t=""}){return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:ze,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:K,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:ze,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Cs({className:t=""}){return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:ze,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:K,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function zs({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:K,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function Ts({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:ne,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:K,strokeWidth:"1"}),a.map((s,n)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":n},d:`M70 48 C 96 48, 100 ${s}, 126 ${s}`,stroke:K,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":n},cx:"132",cy:s,r:"2.6",fill:n===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},s)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const Ms=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:ks,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:Ns,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:Ss,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:Cs,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:zs,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:Ts,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function Ls({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Ms.map(({id:a,tag:s,title:n,copy:o,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(R,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:o})]},a))})]}),e.jsx("style",{children:`
        .cg-card {
          display: flex; flex-direction: column; text-align: left; cursor: pointer;
          min-width: 0;
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,.02);
          transition: border-color .25s ease, background-color .25s ease;
        }
        .cg-card:hover { border-color: rgba(248,70,0,.42); background: rgba(255,255,255,.04); }
        .cg-card:focus-visible { outline: 2px solid rgba(248,70,0,.6); outline-offset: 2px; }

        .cg-art {
          display: block; padding: 26px 22px 10px;
          background:
            radial-gradient(120% 90% at 50% 0%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 62%),
            #060606;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .cg-svg { display: block; width: 100%; height: auto; overflow: visible; }

        .cg-tag {
          display: block; margin: 20px 22px 0;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.32);
        }
        .cg-title-row { display: flex; align-items: center; gap: 10px; margin: 8px 22px 0; }
        .cg-title {
          font-family: var(--font-google-sans); font-size: 20px; font-weight: 600; color: #fff;
        }
        .cg-arrow {
          margin-left: auto; color: rgba(255,255,255,.22); flex: none;
          transition: color .2s ease, transform .2s ease;
        }
        .cg-card:hover .cg-arrow { color: var(--color-primary); transform: rotate(45deg) translateY(-2px); }

        .cg-copy {
          display: block; margin: 8px 22px 22px; max-width: 34ch;
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.55;
          color: rgba(255,255,255,.5);
        }

        /* --- art behaviour: quiet at rest, resolving on hover --------------- */

        /* Work: ragged input edges snap into an ordered column */
        .cg-row {
          transform: translateX(var(--dx));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 40ms);
        }
        .cg-card:hover .cg-row { transform: translateX(0); }

        /* Research: the feeds brighten one after another as they meet */
        .cg-feed { opacity: .55; transition: opacity .35s ease; transition-delay: calc(var(--i) * 50ms); }
        .cg-card:hover .cg-feed { opacity: 1; }
        .cg-node { transform-origin: 96px 48px; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-node { transform: scale(1.35); }

        /* Build: the top face lifts clear of the baseline */
        .cg-rise { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-rise { transform: translateY(-4px); }

        /* Trade: the ring keeps turning, faster when you look at it */
        .cg-orbit { transform-origin: 80px 48px; animation: cg-spin 16s linear infinite; }
        .cg-orbit--slow { animation-duration: 24s; animation-direction: reverse; }
        .cg-card:hover .cg-orbit { animation-duration: 7s; }
        .cg-card:hover .cg-orbit--slow { animation-duration: 11s; }
        @keyframes cg-spin { to { transform: rotate(360deg); } }

        /* Automate: a short bright segment runs the path without stopping */
        .cg-travel {
          stroke-dasharray: 20 240; stroke-dashoffset: 260;
          animation: cg-run 5s linear infinite;
        }
        .cg-card:hover .cg-travel { animation-duration: 2.6s; }
        @keyframes cg-run { to { stroke-dashoffset: 0; } }

        /* Monetize: the thing you made reaches further out */
        .cg-branch { opacity: .5; transition: opacity .35s ease; transition-delay: calc(var(--i) * 45ms); }
        .cg-card:hover .cg-branch { opacity: 1; }
        .cg-dest { transition: transform .4s cubic-bezier(.16,1,.3,1); transition-delay: calc(var(--i) * 45ms); }
        .cg-card:hover .cg-dest { transform: translateX(4px); }

        @media (prefers-reduced-motion: reduce) {
          .cg-orbit, .cg-travel { animation: none; }
          .cg-row { transform: none; }
          .cg-rise, .cg-dest, .cg-node, .cg-arrow { transition: none; }
        }
      `})]})}const ve=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function Es({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(me,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Is,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
        .aw-frame {
          border-radius: 14px; overflow: hidden; background: #fff;
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 70px rgba(0,0,0,.55);
        }
        .aw-chrome {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px; border-bottom: 1px solid rgba(0,0,0,.07); background: #fbfaf8;
        }
        .aw-chrome-title { font-family: var(--font-google-sans); font-size: 12px; color: #737373; }
        .aw-chrome-name {
          font-family: var(--font-google-sans); font-size: 12px; color: #a3a3a3;
        }
        .aw-chrome-name::before { content: "/"; margin-right: 9px; color: #d4d4d4; }

        .aw-body { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 16px; }
        .aw-prompt-row { display: flex; justify-content: flex-end; }
        .aw-prompt {
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.5; color: #262626;
          background: #f5f5f5; border-radius: 14px 14px 4px 14px; padding: 10px 13px; margin: 0; max-width: 82%;
        }

        /* the agent card — one object with a name, a state, and what it did */
        .aw-card { border: 1px solid #ededed; border-radius: 11px; background: #fbfaf8; overflow: hidden; }
        .aw-card-head {
          display: flex; align-items: center; gap: 10px; padding: 13px 14px;
          border-bottom: 1px solid #f0f0f0; background: #fff;
        }
        .aw-card-title {
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 600; color: #171717; margin: 0;
        }
        .aw-status {
          display: inline-flex; align-items: center; gap: 6px; margin-left: auto;
          font-family: var(--font-google-sans); font-size: 11px; color: #737373;
        }
        .aw-live {
          width: 6px; height: 6px; border-radius: 999px; background: var(--color-primary);
          box-shadow: 0 0 0 0 rgba(248,70,0,.45); animation: aw-pulse 2.4s ease-out infinite;
        }
        @keyframes aw-pulse {
          0% { box-shadow: 0 0 0 0 rgba(248,70,0,.45); }
          70% { box-shadow: 0 0 0 7px rgba(248,70,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(248,70,0,0); }
        }

        .aw-section { padding: 13px 14px; }
        .aw-section + .aw-section { border-top: 1px solid #f0f0f0; }
        .aw-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: #a3a3a3; margin: 0 0 9px;
        }

        .aw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .aw-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-google-sans); font-size: 11.5px; color: #525252;
          border: 1px solid #e8e8e8; background: #fff; border-radius: 999px; padding: 4px 10px 4px 5px;
        }
        /* stand-in for a vendor mark: same size, same weight, no borrowed branding */
        .aw-chip-mark {
          display: flex; align-items: center; justify-content: center; flex: none;
          width: 15px; height: 15px; border-radius: 4px; background: #f0efed; color: #8a8a8a;
          font-family: var(--font-google-sans); font-size: 9px; font-weight: 600; line-height: 1;
        }

        /* uses · runs · output — the recurring agent in three lines */
        .aw-rows { display: flex; flex-direction: column; }
        .aw-row {
          display: flex; align-items: center; gap: 14px; padding: 11px 14px;
          border-bottom: 1px solid #f0f0f0;
        }
        .aw-row-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: #a3a3a3;
          width: 54px; flex: none;
        }
        .aw-row-value { font-family: var(--font-google-sans); font-size: 12.5px; color: #262626; }

        .aw-log { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .aw-log li {
          display: flex; align-items: center; gap: 9px;
          font-family: var(--font-google-sans); font-size: 12.5px; color: #737373;
        }
        .aw-log-time { font-size: 11px; color: #a3a3a3; width: 38px; flex: none; }
        .aw-tick { color: #d4d4d4; flex: none; }
        .aw-log li.aw-hit { color: #171717; font-weight: 500; }
        .aw-hit .aw-tick { color: var(--color-primary); }

        .aw-alert {
          border-top: 1px solid #f0f0f0; padding: 13px 14px;
          background: linear-gradient(180deg, rgba(248,70,0,.05), rgba(248,70,0,0));
        }
        .aw-alert-title {
          font-family: var(--font-google-sans); font-size: 13px; font-weight: 600; color: #171717; margin: 0;
        }
        .aw-alert-detail {
          font-family: var(--font-google-sans); font-size: 12px; line-height: 1.55; color: #737373; margin: 5px 0 0;
        }

        .aw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .aw-list li { display: flex; align-items: baseline; gap: 9px; }
        .aw-idx {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          color: var(--color-primary); width: 12px; flex: none;
        }
        .aw-item-text { font-family: var(--font-google-sans); font-size: 13px; color: #262626; }
        .aw-item-note { font-family: var(--font-google-sans); font-size: 11.5px; color: #a3a3a3; }

        .aw-fields { display: flex; flex-direction: column; gap: 0; }
        .aw-field { display: flex; gap: 14px; padding: 11px 14px; }
        .aw-field + .aw-field { border-top: 1px solid #f0f0f0; }
        .aw-field-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: #a3a3a3;
          width: 98px; flex: none; padding-top: 2px;
        }
        .aw-field-value {
          font-family: var(--font-google-sans); font-size: 12.5px; line-height: 1.5; color: #262626;
        }

        .aw-footer {
          display: flex; align-items: center; gap: 8px; padding: 11px 14px;
          border-top: 1px solid #f0f0f0; background: #fff;
          font-family: var(--font-google-sans); font-size: 12px; color: #525252;
        }

        @media (prefers-reduced-motion: reduce) { .aw-live { animation: none; } }
        @media (max-width: 640px) {
          .aw-body { padding: 16px 14px 18px; }
          .aw-field { flex-direction: column; gap: 4px; }
          .aw-field-label { width: auto; }
        }
      `})]})}function Pe({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Is({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Pe,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(Le,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Pe,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Pe,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Fs({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Je(ve.length),i=ve[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:ve.length,children:e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ve.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:r.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",r.prompt,"”"]})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Es,{example:i})})]})]})}),e.jsx("style",{children:`
        .ag-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 16px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-tab:hover { background: rgba(255,255,255,.03); }
        .ag-tab--active { border-left-color: var(--color-primary); background: rgba(255,255,255,.04); }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: #fff; }

        .ag-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }
        .ag-tab-example {
          display: block; margin-top: 10px; font-family: var(--font-google-sans);
          font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.4);
        }

        .ag-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .ag-try { margin-left: 0; }
        }
      `})]})}function As({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ra,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx(la,{}),e.jsx(Ls,{onStartTask:a}),e.jsx(Fs,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(et,{})}),e.jsx(Ie,{onStartFree:l})]})}const Ws=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function pa({onNavigateHome:t,onNavigateTraders:a,onLogIn:s,onSignUp:n}){const[o,i]=c.useState(!1),r=c.useRef(null);return c.useEffect(()=>{if(!o)return;const l=h=>{var m;(m=r.current)!=null&&m.contains(h.target)||i(!1)},d=h=>{h.key==="Escape"&&i(!1)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",d)}},[o]),e.jsxs("header",{className:"relative z-20 py-6",children:[e.jsx(C,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("nav",{className:"sh-nav","aria-label":"Main",children:[e.jsxs("div",{className:"sh-menu",ref:r,children:[e.jsxs("button",{type:"button",onClick:()=>i(l=>!l),"aria-expanded":o,"aria-haspopup":"true",className:`sh-trigger${o?" sh-trigger--open":""}`,children:["Starchild for",e.jsx(Ye,{className:"sh-chevron size-3.5"})]}),o&&e.jsx("div",{className:"sh-panel",role:"menu",children:Ws.map(({id:l,label:d,route:h})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{i(!1),h==="traders"&&a()},className:"sh-item",children:d},l))})]}),e.jsx("button",{type:"button",onClick:()=>{},className:"sh-trigger",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"sh-trigger sh-trigger--badged",children:["Marketplace",e.jsx("span",{className:"sh-badge",children:"New"})]})]}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:n,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})}),e.jsx("style",{children:`
        .sh-nav { display: flex; align-items: center; gap: 26px; }
        .sh-menu { position: relative; }

        .sh-trigger {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 6px 2px; border: 0; background: none;
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,.7); transition: color .2s ease;
        }
        .sh-trigger:hover, .sh-trigger--open { color: #fff; }
        .sh-trigger:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 4px; border-radius: 6px; }
        .sh-chevron { transition: transform .2s ease; }
        .sh-trigger--open .sh-chevron { transform: rotate(180deg); }

        /* the badge rides above the label rather than pushing the row wider, so
           the three nav items stay evenly spaced around the centre */
        .sh-trigger--badged { position: relative; }
        .sh-badge {
          position: absolute; top: -3px; right: -22px;
          padding: 2px 5px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-size: 8.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
          line-height: 1.2;
        }

        .sh-panel {
          position: absolute; top: calc(100% + 10px); left: -10px; z-index: 30;
          display: flex; flex-direction: column; min-width: 190px; padding: 6px;
          border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
          background: rgba(12,12,12,.92); backdrop-filter: blur(14px);
          box-shadow: 0 18px 40px rgba(0,0,0,.55);
          animation: sh-in .18s cubic-bezier(.16,1,.3,1);
        }

        .sh-item {
          text-align: left; cursor: pointer; padding: 9px 12px; border: 0; border-radius: 9px;
          background: none; color: rgba(255,255,255,.78);
          font-family: var(--font-google-sans); font-size: 13.5px;
          transition: background-color .18s ease, color .18s ease;
        }
        .sh-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .sh-item:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        @keyframes sh-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .sh-panel { animation: none; }
          .sh-chevron { transition: none; }
        }

        /* below this the three tracks stop fitting and the nav starts colliding
           with the wordmark, so it drops out until there's a mobile menu for it */
        @media (max-width: 899px) { .sh-nav { display: none; } }
      `})]})}const G=11,At=.55,Ps=1.15,$e=30,Re=300,$s=26,Te=26,J=[150,168,196],ee=[255,255,255],Oe=[255,146,62],Wt=.34,Pt=.15,Rs=.08,je=14;function Os(){return Array.from({length:Te},(t,a)=>{const s=a/(Te-1),n=Math.max(0,s-.72)/.28,o=Math.round(J[0]+(ee[0]-J[0])*s+(Oe[0]-ee[0])*n*.55),i=Math.round(J[1]+(ee[1]-J[1])*s+(Oe[1]-ee[1])*n*.55),r=Math.round(J[2]+(ee[2]-J[2])*s+(Oe[2]-ee[2])*n*.55),l=.05+.85*Math.pow(s,1.6);return{color:`rgba(${o},${i},${r},${l.toFixed(3)})`,size:Ps+1.5*Math.pow(s,2),points:[]}})}function Bs({targetRef:t}){const a=c.useRef(null),s=c.useRef(null);return c.useEffect(()=>{const n=t.current,o=a.current,i=o==null?void 0:o.getContext("2d");if(!n||!o||!i)return;const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=window.matchMedia("(hover: hover) and (pointer: fine)").matches,d=Os();l&&n.classList.add("hero-c--fine");let h=0,m=0,x=[],g=-9999,y=-9999,k=-9999,v=-9999,j=-9999,I=-9999,E=0,W=0,z=!1,P=0,L=!1;const $=performance.now(),S=(M,A,w)=>Math.sin(M*.0062+A*.0038+w*.19)+Math.sin(M*.0029-A*.0071-w*.14)*.85+Math.sin((M+A)*.0042+w*.09)*.6,N=M=>{const A=(M-$)/1e3;if(i.clearRect(0,0,h,m),E>.01){const w=i.createRadialGradient(j,I,0,j,I,Re*1.6);w.addColorStop(0,`rgba(248,70,0,${(.11*E).toFixed(3)})`),w.addColorStop(.45,`rgba(248,70,0,${(.04*E).toFixed(3)})`),w.addColorStop(1,"rgba(248,70,0,0)"),i.fillStyle=w,i.fillRect(0,0,h,m)}for(const w of d)w.points.length=0;for(const w of x){const H=S(w.x,w.y,A);let B=w.x+H*5*w.depth,re=w.y+H*$e*w.depth,le=.06+.62*Math.pow(Math.max(0,Math.cos(H*1.9+w.seed*.35)),7)*w.depth+.05*w.seed;if(E>.01){const ot=B-j,it=re-I,ce=Math.hypot(ot,it);if(ce<Re){const rt=1-ce/Re,lt=rt*rt*E;if(le+=lt*1.1,ce>.001){const ct=lt*$s;B+=ot/ce*ct,re+=it/ce*ct}}}const Fe=Math.min(Te-1,Math.max(0,Math.round(le*(Te-1))));d[Fe].points.push(B,re)}for(const w of d){if(w.points.length===0)continue;i.fillStyle=w.color;const H=w.size/2;for(let B=0;B<w.points.length;B+=2)i.fillRect(w.points[B]-H,w.points[B+1]-H,w.size,w.size)}},f=()=>{const M=s.current;!M||!l||(M.style.transform=`translate3d(${k-je/2}px, ${v-je/2}px, 0)`,M.style.opacity=`${E}`)},T=()=>{const M=Math.ceil(h/G)+2,A=Math.ceil((m+$e*2)/G)+2,w=[];for(let H=0;H<A;H++)for(let B=0;B<M;B++){const re=Math.random(),nt=B*G-G+(Math.random()-.5)*G*2*At,le=H*G-G-$e+(Math.random()-.5)*G*2*At,Fe=.35+.65*Math.min(1,Math.max(0,le/Math.max(1,m)));w.push({x:nt,y:le,depth:Fe,seed:re})}x=w},u=()=>{const M=n.getBoundingClientRect(),A=Math.min(window.devicePixelRatio||1,1.75);h=Math.max(1,Math.round(M.width)),m=Math.max(1,Math.round(M.height)),o.width=Math.round(h*A),o.height=Math.round(m*A),o.style.width=`${h}px`,o.style.height=`${m}px`,i.setTransform(A,0,0,A,0,0),T(),N(performance.now())},F=M=>{k+=(g-k)*Wt,v+=(y-v)*Wt,j+=(k-j)*Pt,I+=(v-I)*Pt,E+=(W-E)*Rs,N(M),f(),P=requestAnimationFrame(F)},b=()=>{L||r||(L=!0,P=requestAnimationFrame(F))},O=()=>{L=!1,cancelAnimationFrame(P)},Y=M=>{const A=n.getBoundingClientRect();g=M.clientX-A.left,y=M.clientY-A.top,z||(z=!0,k=j=g,v=I=y),W=1,r&&(k=j=g,v=I=y,E=1,N(performance.now()),f())},ie=()=>{W=0,z=!1,r&&(E=0,N(performance.now()),f())},_=new IntersectionObserver(([M])=>M.isIntersecting?b():O(),{threshold:0});_.observe(n);const V=()=>document.hidden?O():b(),U=new ResizeObserver(u);return U.observe(n),n.addEventListener("pointermove",Y),n.addEventListener("pointerleave",ie),document.addEventListener("visibilitychange",V),u(),()=>{_.disconnect(),U.disconnect(),n.removeEventListener("pointermove",Y),n.removeEventListener("pointerleave",ie),document.removeEventListener("visibilitychange",V),n.classList.remove("hero-c--fine"),O()}},[t]),e.jsxs(e.Fragment,{children:[e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"}),e.jsx("div",{className:"pm-cursor-layer","aria-hidden":"true",children:e.jsx("span",{ref:s,className:"pm-dot"})}),e.jsx("style",{children:`
        .pm-cursor-layer { position: absolute; inset: 0; z-index: 40; pointer-events: none; }
        .pm-dot {
          position: absolute; top: 0; left: 0;
          width: ${je}px; height: ${je}px; border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0; will-change: transform;
          animation: pm-breathe 3.6s ease-in-out infinite;
        }
        /* transform carries the position, so the breath rides on scale instead */
        @keyframes pm-breathe {
          0%, 100% { scale: 1; }
          50% { scale: 1.16; }
        }
        @media (prefers-reduced-motion: reduce) { .pm-dot { animation: none; } }
      `})]})}const ha=[{id:"talk",label:"Talk",icon:Xe,tasks:[{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"},{id:"talk-decision",label:"Help me decide",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}]},{id:"research",label:"Research",icon:Xt,tasks:[{id:"research-topic",label:"Look into something",basePrompt:"Look into this properly and come back with a real answer, not a pile of links.",question:"What should I dig into?"},{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I put side by side?"}]},{id:"build",label:"Build",icon:Kt,tasks:[{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."},{id:"build-dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}]},{id:"work",label:"Work",icon:Za,tasks:[{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"},{id:"work-draft",label:"Draft something I owe someone",basePrompt:"Help me write the thing I've been putting off sending.",question:"Who's it for, and what does it need to say?"}]},{id:"organize",label:"Organize",icon:ta,tasks:[{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"},{id:"organize-project",label:"Bring order to a project",basePrompt:"Take this project and give it a structure I can actually follow.",question:"What's the project?"}]}];function Hs({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onLogIn:n,onSignUp:o}){const i=c.useRef(null);return e.jsxs("section",{ref:i,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Bs,{targetRef:i}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx(pa,{onNavigateHome:()=>{},onNavigateTraders:s,onLogIn:n,onSignUp:o}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(C,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(Ds,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
      .hero-c { background-color: #07090a; }

      /* the mesh paints its own dot in place of the cursor, but never over
         things you need to aim at. Only set once a fine pointer is confirmed. */
      .hero-c--fine { cursor: none; }
      .hero-c--fine input, .hero-c--fine textarea { cursor: text; }
      .hero-c--fine button, .hero-c--fine a, .hero-c--fine [role="button"] { cursor: pointer; }

      /* enough scrim to keep the copy readable over the particle field, and a
         darker top so the field reads as receding rather than papered on */
      .hero-c-vignette {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background:
          radial-gradient(110% 85% at 20% 48%, rgba(7,9,10,.82) 0%, rgba(7,9,10,.38) 44%, rgba(7,9,10,0) 74%),
          linear-gradient(180deg, rgba(7,9,10,.85), rgba(7,9,10,.15) 34%, rgba(7,9,10,.7));
      }
    `})]})}function Ds({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),o=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-10 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&o()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:o,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(R,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ze,{onStartTask:a,intents:ha})})]})}const oe="0 0 160 96",ae="rgba(255,255,255,.26)",se="rgba(255,255,255,.12)";function qs({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],s=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,o)=>e.jsx("line",{className:"cg-say",style:{"--i":o,transformOrigin:"left center"},x1:"14",y1:n.y,x2:14+n.w,y2:n.y,stroke:ae,strokeWidth:"1"},n.y)),s.map((n,o)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":o+2,transformOrigin:"right center"},x1:146-n.w,y1:n.y,x2:"146",y2:n.y,stroke:o===0?"var(--color-primary)":ae,strokeWidth:o===0?1.6:1},n.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function _s({className:t=""}){const a=[{x:26,ys:[26,48,70]},{x:80,ys:[20,48,76]},{x:134,ys:[32,62]}];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--think ${t}`,fill:"none","aria-hidden":"true",children:[a[0].ys.map(n=>a[1].ys.map(o=>e.jsx("line",{x1:"26",y1:n,x2:"80",y2:o,stroke:se,strokeWidth:"1"},`${n}-${o}`))),a[1].ys.map(n=>a[2].ys.map(o=>e.jsx("line",{x1:"80",y1:n,x2:"134",y2:o,stroke:se,strokeWidth:"1"},`b${n}-${o}`))),e.jsx("path",{className:"cg-route",d:"M26 48 L80 20 L134 32",stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),a.map(({x:n,ys:o})=>o.map(i=>e.jsx("circle",{cx:n,cy:i,r:"2.2",fill:"rgba(255,255,255,.34)"},`${n}-${i}`))),e.jsx("circle",{cx:"134",cy:"32",r:"3",fill:"var(--color-primary)"})]})}function Gs({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:se,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":ae,strokeWidth:n===0?1.6:1},s.y))]})}function Ys({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:ae,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function Vs({className:t=""}){return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:se,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:ae,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:se,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Us({className:t=""}){const a=[{x:18,y:20,w:34,h:12,dx:9,dy:-6},{x:18,y:38,w:34,h:12,dx:-7,dy:5},{x:18,y:56,w:34,h:12,dx:6,dy:8},{x:63,y:20,w:34,h:12,dx:-8,dy:7},{x:63,y:38,w:34,h:12,dx:7,dy:-8},{x:108,y:20,w:34,h:12,dx:8,dy:9}];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--organize ${t}`,fill:"none","aria-hidden":"true",children:[[35,80,125].map(s=>e.jsx("line",{x1:s,y1:"14",x2:s,y2:"82",stroke:se,strokeWidth:"1"},s)),a.map((s,n)=>e.jsx("rect",{className:"cg-block",style:{"--dx":`${s.dx}px`,"--dy":`${s.dy}px`,"--i":n},x:s.x,y:s.y,width:s.w,height:s.h,rx:"3",stroke:n===0?"var(--color-primary)":ae,strokeWidth:n===0?1.4:1},`${s.x}-${s.y}`))]})}const Ks=[{id:"talk",tag:"Conversation",title:"Talk",copy:"Talk things through with an AI that gets to know you.",art:qs,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"think",tag:"Decisions",title:"Think",copy:"Work through ideas, questions, and decisions together.",art:_s,task:{id:"think-decision",label:"Think through a decision",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}},{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's on your plate.",art:Gs,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"explore",tag:"Curiosity",title:"Explore",copy:"Learn, compare, and make sense of things.",art:Ys,task:{id:"explore-topic",label:"Make sense of something",basePrompt:"Help me understand this properly — what matters, what doesn't, and why.",question:"What do you want to get to the bottom of?"}},{id:"create",tag:"Make",title:"Create",copy:"Turn an idea into something real.",art:Vs,task:{id:"create-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"organize",tag:"Structure",title:"Organize",copy:"Bring structure to tasks, projects, and recurring work.",art:Us,task:{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"}}];function Xs({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Ks.map(({id:a,tag:s,title:n,copy:o,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(R,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:o})]},a))})]}),e.jsx("style",{children:`
        .cg-card {
          display: flex; flex-direction: column; text-align: left; cursor: pointer;
          min-width: 0;
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,.02);
          transition: border-color .25s ease, background-color .25s ease;
        }
        .cg-card:hover { border-color: rgba(248,70,0,.42); background: rgba(255,255,255,.04); }
        .cg-card:focus-visible { outline: 2px solid rgba(248,70,0,.6); outline-offset: 2px; }

        .cg-art {
          display: block; padding: 26px 22px 10px;
          background:
            radial-gradient(120% 90% at 50% 0%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 62%),
            #060606;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .cg-svg { display: block; width: 100%; height: auto; overflow: visible; }

        .cg-tag {
          display: block; margin: 20px 22px 0;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.32);
        }
        .cg-title-row { display: flex; align-items: center; gap: 10px; margin: 8px 22px 0; }
        .cg-title {
          font-family: var(--font-google-sans); font-size: 20px; font-weight: 600; color: #fff;
        }
        .cg-arrow {
          margin-left: auto; color: rgba(255,255,255,.22); flex: none;
          transition: color .2s ease, transform .2s ease;
        }
        .cg-card:hover .cg-arrow { color: var(--color-primary); transform: rotate(45deg) translateY(-2px); }

        .cg-copy {
          display: block; margin: 8px 22px 22px; max-width: 34ch;
          font-family: var(--font-google-sans); font-size: 13.5px; line-height: 1.55;
          color: rgba(255,255,255,.5);
        }

        /* --- art behaviour: quiet at rest, resolving on hover --------------- */

        /* Talk: each line writes itself in, question first, then the reply */
        .cg-say {
          transform-box: fill-box; transform: scaleX(.35); opacity: .5;
          transition: transform .45s cubic-bezier(.16,1,.3,1), opacity .35s ease;
          transition-delay: calc(var(--i) * 60ms);
        }
        .cg-card:hover .cg-say { transform: scaleX(1); opacity: 1; }

        /* Think: the route through the options draws itself */
        .cg-route {
          stroke-dasharray: 200; stroke-dashoffset: 200;
          transition: stroke-dashoffset .8s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-route { stroke-dashoffset: 0; }

        /* Work: ragged input edges snap into an ordered column */
        .cg-row {
          transform: translateX(var(--dx));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 40ms);
        }
        .cg-card:hover .cg-row { transform: translateX(0); }

        /* Explore: the sources brighten one after another as they meet */
        .cg-feed { opacity: .55; transition: opacity .35s ease; transition-delay: calc(var(--i) * 50ms); }
        .cg-card:hover .cg-feed { opacity: 1; }
        .cg-node { transform-origin: 96px 48px; transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-node { transform: scale(1.35); }

        /* Create: the top face lifts clear of the baseline */
        .cg-rise { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-rise { transform: translateY(-4px); }

        /* Organize: the loose blocks land on the grid */
        .cg-block {
          transform: translate(var(--dx), var(--dy));
          transition: transform .5s cubic-bezier(.16,1,.3,1);
          transition-delay: calc(var(--i) * 45ms);
        }
        .cg-card:hover .cg-block { transform: translate(0, 0); }

        @media (prefers-reduced-motion: reduce) {
          .cg-row, .cg-block { transform: none; }
          .cg-say { transform: none; opacity: 1; }
          .cg-route { stroke-dasharray: none; stroke-dashoffset: 0; }
          .cg-rise, .cg-node, .cg-arrow, .cg-say, .cg-block { transition: none; }
        }
      `})]})}const ke=[{id:"monitor",label:"Keep an eye on something",blurb:"Starchild can follow what changes and bring you what matters.",prompt:"Let me know when flights to Tokyo drop below $700.",panel:{kind:"monitor",agentName:"Tokyo flights",cadence:"Checking every hour",sources:["Google Flights","Skyscanner","Airlines","Fare alerts"],checks:[{time:"09:00",text:"Checked 6 airlines — cheapest $842"},{time:"13:00",text:"Checked 6 airlines — cheapest $828"},{time:"17:40",text:"Dropped below your $700",hit:!0}],alert:{heading:"Worth your attention",title:"Tokyo in October — $684 return",detail:"Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Take care of a routine",blurb:"Let Starchild handle something you do again and again.",prompt:"Every Sunday, help me plan the week ahead.",panel:{kind:"recurring",agentName:"Week ahead",uses:["Calendar","Gmail","Notes","Reminders"],runs:"Every Sunday at 6:00 PM",outputName:"Plan for the week",output:{heading:"This week",items:[{text:"Thursday is your only clear day",note:"the one to protect"},{text:"Two deadlines both land on Friday",note:"start the smaller one Tuesday"},{text:"Dentist still isn't booked",note:"third week it's slipped"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Give it a job",blurb:"Tell Starchild what you want done, what matters, and when to step in.",prompt:"Plan our trip in October. You know the budget and the dates — check with me before booking anything.",panel:{kind:"config",agentName:"October trip",fields:[{label:"The job",value:"Plan the trip end to end"},{label:"What matters",value:"Budget, the dates, who's coming"},{label:"When to step in",value:"Ask me before booking anything"}],tools:["Web","Gmail","Calendar","Maps"],status:"Active · first plan ready tomorrow"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}];function Qs({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"",width:16,height:16,className:"size-4 shrink-0"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Zs,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
        .aw-frame {
          border-radius: 16px; overflow: hidden; background: #0e0e10;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 24px 70px rgba(0,0,0,.55);
        }
        .aw-chrome {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,.07); background: #141416;
        }
        .aw-chrome-title { font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.6); }
        .aw-chrome-name {
          font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.38);
        }
        .aw-chrome-name::before { content: "/"; margin-right: 10px; color: rgba(255,255,255,.18); }

        .aw-body { padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 22px; }
        .aw-prompt-row { display: flex; justify-content: flex-end; }
        /* the visitor's own words are the one thing on this surface that isn't
           Starchild talking, so they carry the accent */
        .aw-prompt {
          font-family: var(--font-google-sans); font-size: 15px; line-height: 1.5; color: #fff;
          background: rgba(248,70,0,.16); border: 1px solid rgba(248,70,0,.34);
          border-radius: 16px 16px 5px 16px; padding: 13px 17px; margin: 0; max-width: 84%;
        }

        /* the panel keeps one height across the three examples, so picking a
           different one doesn't shift everything below the section */
        .aw-panel-wrap { min-height: 348px; }

        /* the agent card — one object with a name, a state, and what it did */
        .aw-card { border: 1px solid rgba(255,255,255,.09); border-radius: 13px; background: #141416; overflow: hidden; }
        .aw-card-head {
          display: flex; align-items: center; gap: 10px; padding: 16px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07); background: #17171a;
        }
        .aw-card-title {
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 600; color: #fff; margin: 0;
        }
        .aw-status {
          display: inline-flex; align-items: center; gap: 7px; margin-left: auto;
          font-family: var(--font-google-sans); font-size: 11.5px; color: rgba(255,255,255,.5);
        }
        .aw-live {
          width: 6px; height: 6px; border-radius: 999px; background: var(--color-primary);
          box-shadow: 0 0 0 0 rgba(248,70,0,.45); animation: aw-pulse 2.4s ease-out infinite;
        }
        @keyframes aw-pulse {
          0% { box-shadow: 0 0 0 0 rgba(248,70,0,.45); }
          70% { box-shadow: 0 0 0 7px rgba(248,70,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(248,70,0,0); }
        }

        .aw-section { padding: 16px 18px; }
        .aw-section + .aw-section { border-top: 1px solid rgba(255,255,255,.07); }
        .aw-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; color: rgba(255,255,255,.35); margin: 0 0 12px;
        }

        .aw-chips { display: flex; flex-wrap: wrap; gap: 7px; }
        .aw-chip {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-google-sans); font-size: 12px; color: rgba(255,255,255,.72);
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          border-radius: 999px; padding: 5px 12px 5px 6px;
        }
        /* stand-in for a vendor mark: same size, same weight, no borrowed branding */
        .aw-chip-mark {
          display: flex; align-items: center; justify-content: center; flex: none;
          width: 16px; height: 16px; border-radius: 5px;
          background: rgba(255,255,255,.09); color: rgba(255,255,255,.55);
          font-family: var(--font-google-sans); font-size: 9px; font-weight: 600; line-height: 1;
        }

        /* uses · runs · output — the recurring agent in three lines */
        .aw-rows { display: flex; flex-direction: column; }
        .aw-row {
          display: flex; align-items: center; gap: 16px; padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .aw-row-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35);
          width: 54px; flex: none;
        }
        .aw-row-value { font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.82); }

        .aw-log { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .aw-log li {
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.5);
        }
        .aw-log-time { font-size: 11.5px; color: rgba(255,255,255,.3); width: 40px; flex: none; }
        .aw-tick { color: rgba(255,255,255,.2); flex: none; }
        .aw-log li.aw-hit { color: #fff; font-weight: 500; }
        .aw-hit .aw-tick { color: var(--color-primary); }

        .aw-alert {
          border-top: 1px solid rgba(255,255,255,.07); padding: 16px 18px;
          background: linear-gradient(180deg, rgba(248,70,0,.12), rgba(248,70,0,0));
        }
        .aw-alert-title {
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 600; color: #fff; margin: 0;
        }
        .aw-alert-detail {
          font-family: var(--font-google-sans); font-size: 12.5px; line-height: 1.55;
          color: rgba(255,255,255,.55); margin: 6px 0 0;
        }

        .aw-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .aw-list li { display: flex; align-items: baseline; gap: 11px; }
        .aw-idx {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          color: var(--color-primary); width: 12px; flex: none;
        }
        .aw-item-text { font-family: var(--font-google-sans); font-size: 13.5px; color: rgba(255,255,255,.85); }
        .aw-item-note { font-family: var(--font-google-sans); font-size: 12px; color: rgba(255,255,255,.4); }

        .aw-fields { display: flex; flex-direction: column; gap: 0; }
        .aw-field { display: flex; gap: 16px; padding: 14px 18px; }
        .aw-field + .aw-field { border-top: 1px solid rgba(255,255,255,.07); }
        .aw-field-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35);
          width: 104px; flex: none; padding-top: 2px;
        }
        .aw-field-value {
          font-family: var(--font-google-sans); font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.82);
        }

        .aw-footer {
          display: flex; align-items: center; gap: 9px; padding: 14px 18px;
          border-top: 1px solid rgba(255,255,255,.07); background: #17171a;
          font-family: var(--font-google-sans); font-size: 12.5px; color: rgba(255,255,255,.6);
        }

        @media (prefers-reduced-motion: reduce) { .aw-live { animation: none; } }
        @media (max-width: 1023px) {
          /* stacked, the panels are taller and the shared height stops helping */
          .aw-panel-wrap { min-height: 0; }
        }
        @media (max-width: 640px) {
          .aw-body { padding: 18px 16px 20px; gap: 18px; }
          .aw-prompt { font-size: 14px; max-width: 92%; }
          .aw-field { flex-direction: column; gap: 5px; }
          .aw-field-label { width: auto; }
        }
      `})]})}function Be({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Zs({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Be,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(Le,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Be,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Be,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Js({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Je(ke.length),i=ke[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:ke.length,children:e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Give it something to keep track of, repeat, or take care of over time."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ke.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsx(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:e.jsx("span",{className:"ag-tab-blurb",children:r.blurb})})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Qs,{example:i})})]})]})}),e.jsx("style",{children:`
        .ag-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 16px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-tab:hover { background: rgba(255,255,255,.03); }
        .ag-tab--active { border-left-color: var(--color-primary); background: rgba(255,255,255,.04); }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: #fff; }

        .ag-tab-blurb {
          display: block; margin-top: 8px; font-family: var(--font-google-sans);
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }

        .ag-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .ag-try { margin-left: 0; }
        }
      `})]})}function en({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:o,onLogIn:i,onSignUp:r}){const l=c.useRef(null),d=()=>t();return e.jsxs("div",{children:[e.jsx(Hs,{onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:o,onLogIn:i,onSignUp:r}),e.jsx(Xs,{onStartTask:a}),e.jsx(Js,{onStartTask:a}),e.jsx("div",{ref:l,children:e.jsx(et,{})}),e.jsx(Ie,{onStartFree:d})]})}const tn=[{title:"Market research",copy:"Funding, liquidations, volatility and context."},{title:"Structured strategy",copy:"Entry, exit, sizing and invalidation rules."},{title:"Controlled execution",copy:"Orders on Hyperliquid, inside the permissions you approved."},{title:"24/7 monitoring",copy:"Jobs, alerts and automatic reports."},{title:"Visibility",copy:"Dashboards for PnL, margin, risk and positions."}],an=[{n:"01",title:"Connect Starchild to Hyperliquid",copy:"Choose how Starchild is allowed to operate on Hyperliquid."},{n:"02",title:"Design the strategy with the agent",copy:"Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules."},{n:"03",title:"Fund the strategy",copy:"Deposit USDC and make available the balance the strategy will use."},{n:"04",title:"Monitor performance and risk",copy:"Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you."}],sn=[{method:"Native Agent Wallet",custody:"Non-custodial (Privy); exportable key.",edge:"The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”."},{method:"Hyperliquid API wallet",custody:"Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",edge:"More separation between custody and execution; the credential goes through a secure flow, never through the chat."},{method:"Third-party builders",custody:"A trading account you authorize separately.",edge:"Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard)."}],nn=["Trend","Volatility","Book liquidity","Funding","Open interest","Liquidations","Market context"],on="./images/empresas.svg",rn=6,ln=["Coinglass","DeFiLlama","CoinGecko","TAAPI","Onchain data","Market APIs"],cn=[{title:"Independent strategies",copy:"Each asset or strategy carries its own rules, capital, positions, orders, performance and logs."},{title:"Shared execution layer",copy:"Checks balances and permissions before any order is submitted."},{title:"Independent risk layer",copy:"Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",hard:!0}];function dn(){const t={r:4,fill:"var(--color-primary)"},a={duration:1.1,ease:[.16,1,.3,1],delay:.25},s={duration:1,ease:[.16,1,.3,1],delay:1.5};return e.jsx("div",{className:"tr-flowbox",children:e.jsxs("svg",{viewBox:"0 0 560 200",className:"tr-flowsvg",role:"img","aria-label":"Your strategy and market data both feed Conductor, which picks the models and tools for each part of the task and returns one analysis.",children:[e.jsx("path",{d:"M150 52 H210 Q230 52 230 72 V88",className:"tr-fl"}),e.jsx("path",{d:"M150 148 H210 Q230 148 230 128 V112",className:"tr-fl"}),e.jsx("path",{d:"M330 100 H392",className:"tr-fl"}),e.jsx("path",{d:"M470 128 V148 Q470 168 450 168 H150",className:"tr-fl"}),e.jsx("rect",{x:"20",y:"32",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"57",className:"tr-ftext",children:"Your strategy"}),e.jsx("rect",{x:"20",y:"128",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"153",className:"tr-ftext",children:"Market data"}),e.jsx("rect",{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fnode tr-fnode--hi"}),e.jsx("text",{x:"280",y:"105",className:"tr-ftext tr-ftext--hi",children:"Conductor"}),e.jsx("rect",{x:"392",y:"76",width:"156",height:"48",rx:"12",className:"tr-fnode"}),e.jsx("text",{x:"470",y:"99",className:"tr-ftext",children:"AI models"}),e.jsx("text",{x:"470",y:"115",className:"tr-ftext tr-ftext--sub",children:"+ the tools for the job"}),e.jsx("text",{x:"150",y:"172",className:"tr-ftext tr-ftext--end",textAnchor:"start",children:"Analysis"}),e.jsx(p.circle,{...t,initial:{cx:150,cy:52,opacity:0},whileInView:{cx:[150,230,230],cy:[52,52,90],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(p.circle,{...t,initial:{cx:150,cy:148,opacity:0},whileInView:{cx:[150,230,230],cy:[148,148,110],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(p.rect,{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fpulse",initial:{opacity:0},whileInView:{opacity:[0,.9,0]},viewport:{once:!0,amount:.6},transition:{duration:.9,delay:1.2}}),e.jsx(p.circle,{...t,initial:{cx:330,cy:100,opacity:0},whileInView:{cx:[330,470,470,190],cy:[100,100,168,168],opacity:[0,1,1,0]},viewport:{once:!0,amount:.6},transition:s})]})})}function pn({onNavigateHome:t,onEnterGuest:a,onLogIn:s,onSignUp:n}){const o=()=>a("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");return e.jsxs("div",{className:"tr-page",children:[e.jsx(pa,{onNavigateHome:t,onNavigateTraders:()=>window.scrollTo({top:0,behavior:"smooth"}),onLogIn:s,onSignUp:n}),e.jsx("section",{className:"pt-8 pb-24 md:pt-10 md:pb-32",children:e.jsxs(C,{children:[e.jsxs("nav",{className:"tr-crumbs","aria-label":"Breadcrumb",children:[e.jsxs("button",{type:"button",onClick:t,className:"tr-crumb-link",children:[e.jsx(Me,{className:"size-3.5"}),"Home"]}),e.jsx("span",{className:"tr-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"tr-crumb-here","aria-current":"page",children:"For Traders"})]}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6 md:mt-20",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"tr-eyebrow",children:"Starchild for traders · Hyperliquid"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you know about the market into a strategy that runs."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Turn your trading logic into rules, research the market, execute on Hyperliquid and keep the strategy monitored around the clock."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:o,className:"tr-cta",children:["Build a strategy",e.jsx(R,{className:"size-3.5 rotate-45"})]}),e.jsx("span",{className:"tr-cta-note",children:"No account needed to start"})]})]})})]})}),e.jsxs("section",{className:"tr-band py-16 md:py-20",children:[e.jsx(C,{children:e.jsx("p",{className:"tr-strip-label",children:"Built around the ecosystem traders already use."})}),e.jsx("div",{className:"tr-strip-viewport mt-9","aria-hidden":"true",children:e.jsx("div",{className:"tr-strip-track",children:Array.from({length:rn},(i,r)=>e.jsx("img",{src:on,alt:"",className:"tr-strip-img"},r))})})]}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(C,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("h2",{className:"tr-h2",children:"From knowledge to execution."}),e.jsx("p",{className:"tr-lead",children:"Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the decision layer: you explain your logic, set the conditions and the limits, and the agent turns that into an executable flow — research, execution, risk control and continuous monitoring."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-label",children:"What Starchild turns into a system"}),e.jsx("ul",{className:"tr-system",children:tn.map(({title:i,copy:r})=>e.jsxs("li",{children:[e.jsx("span",{className:"tr-system-title",children:i}),e.jsx("span",{className:"tr-system-copy",children:r})]},i))})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(C,{children:[e.jsx("h2",{className:"tr-h2 max-w-[24ch]",children:"Trade perps with an agent, in four steps."}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:an.map(({n:i,title:r,copy:l},d)=>e.jsxs(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:d%4*.06,ease:[.16,1,.3,1]},className:"tr-step col-span-12 sm:col-span-6 lg:col-span-3",children:[e.jsx("span",{className:"tr-step-n",children:i}),e.jsx("span",{className:"tr-step-title",children:r}),e.jsx("span",{className:"tr-step-copy",children:l})]},i))})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsxs(C,{children:[e.jsx("p",{className:"tr-step-tag",children:"Step 1"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[26ch]",children:"Connect Starchild to Hyperliquid."}),e.jsx("p",{className:"tr-lead mt-5 max-w-[70ch]",children:"The first decision is how Starchild is allowed to operate. There are three routes: the native Agent Wallet, a Hyperliquid API wallet, or a third-party builder."}),e.jsxs("div",{className:"tr-table mt-12",children:[e.jsxs("div",{className:"tr-tr tr-tr--head",children:[e.jsx("span",{children:"Method"}),e.jsx("span",{children:"Custody"}),e.jsx("span",{children:"What it gives you"})]}),sn.map(({method:i,custody:r,edge:l})=>e.jsxs("div",{className:"tr-tr",children:[e.jsx("span",{className:"tr-td-method",children:i}),e.jsx("span",{children:r}),e.jsx("span",{children:l})]},i))]})]})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(C,{children:[e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-6",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 2"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Design the strategy with the agent."}),e.jsx("p",{className:"tr-lead mt-5",children:"Instead of trading order by order, tell Starchild how you read the market, what you're trying to reach and which risks you accept. The agent researches, then helps turn that into a structured strategy — entry, position size, exit, invalidation and risk limits, all before anything executes."}),e.jsx("p",{className:"tr-label mt-10",children:"What the agent can weigh"}),e.jsx("div",{className:"tr-chips",children:nn.map(i=>e.jsx("span",{className:"tr-chip",children:i},i))}),e.jsxs("p",{className:"tr-flow",children:["your logic ",e.jsx("span",{"aria-hidden":"true",children:"→"})," analysis ",e.jsx("span",{"aria-hidden":"true",children:"→"})," rules"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})," strategy"]})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-5 lg:col-start-8",children:[e.jsxs("div",{className:"tr-prompt",children:[e.jsx("p",{className:"tr-label",children:"Example prompt"}),e.jsx("p",{className:"tr-prompt-body",children:"“I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity and funding, and help me define entry, position size, invalidation, max loss and two exit scenarios. Don't execute anything yet.”"}),e.jsxs("button",{type:"button",onClick:o,className:"tr-prompt-cta",children:["Try this",e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("p",{className:"tr-label mt-12",children:"Risk architecture, in layers"}),e.jsx("div",{className:"tr-layers",children:cn.map(({title:i,copy:r,hard:l})=>e.jsxs("div",{className:`tr-layer${l?" tr-layer--hard":""}`,children:[e.jsx("span",{className:"tr-layer-title",children:i}),e.jsx("span",{className:"tr-layer-copy",children:r})]},i))})]})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Market intelligence"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Data from the tools traders already rely on."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild can bring market data, technical signals and external sources into the same analysis — so the strategy isn't built from a model's memory alone."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsxs("div",{className:"tr-sources",children:[e.jsx("p",{className:"tr-label",children:"Sources"}),e.jsx("div",{className:"tr-chips",children:ln.map(i=>e.jsx("span",{className:"tr-chip",children:i},i))}),e.jsxs("div",{className:"tr-converge","aria-hidden":"true",children:[e.jsx("span",{className:"tr-converge-line"}),e.jsx("span",{className:"tr-converge-dot"}),e.jsx("span",{className:"tr-converge-line"})]}),e.jsxs("div",{className:"tr-analysis",children:[e.jsx("span",{className:"tr-analysis-title",children:"One analysis"}),e.jsx("span",{className:"tr-analysis-copy",children:"Funding, positioning and price read together, against your rules."})]})]})})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Conductor Mode"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Different market questions need different intelligence."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild combines your strategy context with the right models and tools for each part of the task."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsx(dn,{})})]})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(C,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 3"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[18ch]",children:"Fund the strategy."}),e.jsx("p",{className:"tr-lead mt-5",children:"Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid. No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets you already hold."}),e.jsxs("div",{className:"tr-approvals",children:[e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 1"}),e.jsx("span",{className:"tr-approval-copy",children:"Enables trading through the Agent Wallet."})]}),e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 2"}),e.jsx("span",{className:"tr-approval-copy",children:"Authorizes Starchild's builder code, within the fee limit you approved."})]})]}),e.jsx("p",{className:"tr-note",children:"After those two, the strategy can execute — inside the permissions and limits you set."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 4"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Monitor performance and risk."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and the health of the strategy. Those checks are what feed the alerts and the reports."}),e.jsxs("div",{className:"tr-cards",children:[e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Daily report"}),e.jsx("span",{className:"tr-card-copy",children:"Positions, realized and unrealized PnL, funding, fees, margin, exceptions and recommended actions."})]}),e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Alerts by exception"}),e.jsx("span",{className:"tr-card-copy",children:"Silent while everything is healthy. When something needs attention, the alert arrives with the context and a recommended action."})]})]}),e.jsx("p",{className:"tr-note",children:"It can also build custom dashboards — positions, margin, leverage, distance to liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's HyperTracker, HypurrScan and the Hyperliquid Explorer."})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsx(C,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Trading is part of the foundation."}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[16ch]",children:"Built with trading in its DNA."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-lead",children:"Starchild comes from an ecosystem with deep roots in trading, market infrastructure and crypto. That experience shapes how the product approaches data, execution and risk."}),e.jsx("div",{className:"tr-heritage",children:["WOO","WOOFi Pro","Orderly"].map(i=>e.jsx("span",{className:"tr-heritage-mark",children:i},i))})]})]})})}),e.jsx("section",{className:"py-28 text-center md:py-36",children:e.jsx(C,{children:e.jsxs("div",{className:"mx-auto flex max-w-[46ch] flex-col items-center gap-8",children:[e.jsx("h2",{className:"text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"You define the logic and the limits. Starchild keeps it running."}),e.jsx("p",{className:"tr-lead text-center",children:"Research, rules, execution inside approved permissions, risk control and continuous monitoring — one cycle instead of five tools."}),e.jsxs("button",{type:"button",onClick:o,className:"tr-cta",children:["Build a strategy",e.jsx(R,{className:"size-3.5 rotate-45"})]}),e.jsxs("div",{className:"tr-tags",children:[e.jsx("span",{children:"Repeatable"}),e.jsx("span",{children:"Monitorable"}),e.jsx("span",{children:"Verifiable"})]})]})})}),e.jsx("style",{children:`
        .tr-page { background: #0a0a0a; min-height: 100vh; font-family: var(--font-google-sans); }
        .tr-band { background: #0d0d0d; border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06); }

        .tr-crumbs {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,.4);
        }
        .tr-crumb-link {
          display: inline-flex; align-items: center; gap: 7px; cursor: pointer;
          padding: 0; border: 0; background: none;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.55);
          transition: color .2s ease;
        }
        .tr-crumb-link:hover { color: #fff; }
        .tr-crumb-link:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 4px; border-radius: 6px; }
        .tr-crumb-sep { color: rgba(255,255,255,.22); }
        .tr-crumb-here { color: rgba(255,255,255,.72); }

        .tr-eyebrow {
          font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: #ffa940;
        }
        .tr-label {
          font-size: 10.5px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(255,255,255,.34); margin-bottom: 14px;
        }
        .tr-h2 {
          font-size: 30px; line-height: 1.12; font-weight: 600; color: #fff; text-wrap: balance;
        }
        @media (min-width: 640px) { .tr-h2 { font-size: 38px; } }
        .tr-h3 {
          font-size: 24px; line-height: 1.18; font-weight: 600; color: #fff; text-wrap: balance;
          max-width: 20ch;
        }
        @media (min-width: 640px) { .tr-h3 { font-size: 28px; } }
        .tr-lead { font-size: 16px; line-height: 1.65; color: rgba(255,255,255,.58); max-width: 60ch; }

        /* --- ecosystem strip --- */
        .tr-strip-label {
          text-align: center; font-size: 12.5px; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.38);
        }
        .tr-strip-viewport {
          position: relative; overflow: hidden;
          /* fade both edges so marks enter and leave instead of popping */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .tr-strip-track { display: flex; width: max-content; animation: tr-scroll 42s linear infinite; }
        .tr-strip-img { display: block; height: 30px; width: auto; flex: none; opacity: .6; }
        /* -100%/6 === exactly one copy, so the loop restarts on an identical frame */
        @keyframes tr-scroll { from { transform: translateX(0); } to { transform: translateX(-16.6666%); } }
        .tr-strip-viewport:hover .tr-strip-track { animation-play-state: paused; }

        /* --- market intelligence --- */
        .tr-sources {
          padding: 22px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-converge {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 20px 0;
        }
        .tr-converge-line { flex: 1; height: 1px; background: rgba(255,255,255,.12); }
        .tr-converge-dot {
          width: 7px; height: 7px; border-radius: 999px; background: var(--color-primary); flex: none;
        }
        .tr-analysis {
          display: grid; gap: 6px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(248,70,0,.3); background: rgba(248,70,0,.07);
        }
        .tr-analysis-title { font-size: 14.5px; font-weight: 600; color: #fff; }
        .tr-analysis-copy { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,.6); }

        /* --- conductor flow --- */
        .tr-flowbox {
          padding: 18px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-flowsvg { display: block; width: 100%; height: auto; }
        .tr-fl { fill: none; stroke: rgba(255,255,255,.14); stroke-width: 1.2; }
        .tr-fnode { fill: rgba(255,255,255,.04); stroke: rgba(255,255,255,.14); stroke-width: 1; }
        .tr-fnode--hi { fill: rgba(248,70,0,.1); stroke: rgba(248,70,0,.45); }
        .tr-fpulse { fill: none; stroke: var(--color-primary); stroke-width: 1.6; }
        .tr-ftext {
          fill: rgba(255,255,255,.8); font-family: var(--font-google-sans); font-size: 13px;
          text-anchor: middle; dominant-baseline: middle;
        }
        .tr-ftext--hi { fill: #fff; font-weight: 600; }
        .tr-ftext--sub { fill: rgba(255,255,255,.45); font-size: 11px; }
        .tr-ftext--end { fill: #fff; font-weight: 600; }

        /* --- heritage --- */
        .tr-heritage { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .tr-heritage-mark {
          padding: 8px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          font-size: 13.5px; font-weight: 600; letter-spacing: .04em; color: rgba(255,255,255,.72);
        }
        .tr-note { margin-top: 22px; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.42); }

        .tr-cta {
          display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
          padding: 14px 26px; border: 0; border-radius: 999px;
          background: #f84600; color: #fff; font-size: 15px; font-weight: 500;
          box-shadow: 0 8px 24px rgba(248,70,0,.32);
          transition: transform .18s ease;
        }
        .tr-cta:hover { transform: scale(1.03); }
        .tr-cta-note { font-size: 13.5px; color: rgba(255,255,255,.4); }

        /* what it turns into a system */
        .tr-system { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
        .tr-system li {
          display: grid; gap: 4px; padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .tr-system li:last-child { border-bottom: 1px solid rgba(255,255,255,.08); }
        .tr-system-title { font-size: 15.5px; font-weight: 600; color: #fff; }
        .tr-system-copy { font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.5); }

        /* four steps */
        .tr-step {
          display: flex; flex-direction: column; gap: 10px;
          padding-top: 18px; border-top: 2px solid rgba(248,70,0,.75);
        }
        .tr-step-n { font-size: 26px; font-weight: 600; color: #f84600; line-height: 1; }
        .tr-step-title { font-size: 16px; font-weight: 600; color: #fff; line-height: 1.35; }
        .tr-step-copy { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.5); }

        .tr-step-tag {
          display: inline-block; padding: 5px 12px; border-radius: 999px;
          background: rgba(248,70,0,.14); color: #ff8a4c;
          font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
        }

        /* connection table — a real table on desktop, stacked cards on narrow screens */
        .tr-table { border: 1px solid rgba(255,255,255,.1); border-radius: 14px; overflow: hidden; }
        .tr-tr {
          display: grid; gap: 18px; padding: 20px 22px;
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.55);
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .tr-tr:first-child { border-top: 0; }
        .tr-tr--head {
          background: rgba(255,255,255,.03);
          font-size: 10.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.34);
        }
        .tr-td-method { color: #fff; font-weight: 600; font-size: 15px; }
        @media (min-width: 900px) {
          .tr-tr { grid-template-columns: 1fr 1.3fr 1.6fr; align-items: start; }
        }
        @media (max-width: 899px) {
          .tr-tr--head { display: none; }
        }

        /* step 2 */
        .tr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .tr-chip {
          padding: 7px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          font-size: 13px; color: rgba(255,255,255,.72);
        }
        .tr-flow {
          margin-top: 26px; font-size: 14px; color: rgba(255,255,255,.45);
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
        }
        .tr-flow span { color: #f84600; }

        .tr-prompt {
          padding: 24px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
        }
        .tr-prompt-body { font-size: 15.5px; line-height: 1.6; color: rgba(255,255,255,.8); font-style: italic; }
        .tr-prompt-cta {
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          margin-top: 20px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.85);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .tr-prompt-cta:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        .tr-layers { display: flex; flex-direction: column; gap: 10px; }
        .tr-layer {
          display: grid; gap: 5px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        /* the layer that says no gets the accent — it is the one a trader is checking for */
        .tr-layer--hard { border-color: rgba(248,70,0,.42); background: rgba(248,70,0,.07); }
        .tr-layer-title { font-size: 15px; font-weight: 600; color: #fff; }
        .tr-layer-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.52); }

        /* step 3 + 4 */
        .tr-approvals { display: grid; gap: 12px; margin-top: 28px; }
        @media (min-width: 640px) { .tr-approvals { grid-template-columns: 1fr 1fr; } }
        .tr-approval {
          display: grid; gap: 6px; padding: 16px 18px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-approval-n { font-size: 13px; font-weight: 600; color: #ff8a4c; }
        .tr-approval-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.55); }

        .tr-cards { display: grid; gap: 12px; margin-top: 28px; }
        @media (min-width: 640px) { .tr-cards { grid-template-columns: 1fr 1fr; } }
        .tr-card {
          display: grid; gap: 8px; padding: 20px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.02);
        }
        .tr-card-title { font-size: 15.5px; font-weight: 600; color: #fff; }
        .tr-card-copy { font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.52); }

        .tr-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
        .tr-tags span {
          padding: 7px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.03);
          font-size: 12.5px; color: rgba(255,255,255,.6);
        }

        @media (prefers-reduced-motion: reduce) { .tr-strip-track { animation: none; } }
        @media (max-width: 640px) { .tr-strip-img { height: 24px; } }
      `})]})}const $t=["a","b","c"];function hn({variant:t,onChange:a}){const s=Math.max(0,$t.indexOf(t));return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${t.toUpperCase()}`,children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${s*32}px)`},children:t.toUpperCase()}),$t.map(n=>e.jsx("button",{type:"button",role:"radio","aria-checked":n===t,"aria-label":`Landing version ${n.toUpperCase()}`,onClick:()=>a(n),className:`vt-side${n===t?" vt-side--on":""}`,children:n.toUpperCase()},n))]}),e.jsx("style",{children:`
        .vt-wrap {
          position: fixed; right: 20px; bottom: 20px; z-index: 60;
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px 8px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(10,10,10,.82);
          backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,.5);
        }
        .vt-caption {
          font-family: var(--font-google-sans); font-size: 11px; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }

        .vt-track {
          position: relative; display: grid; grid-template-columns: repeat(3, 1fr);
          align-items: center;
          width: 98px; height: 30px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.05);
        }
        .vt-side {
          position: relative; z-index: 1;
          padding: 0; border: 0; background: none; cursor: pointer;
          height: 28px; border-radius: 999px;
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; line-height: 1;
          text-align: center; color: rgba(255,255,255,.35);
        }
        .vt-side--on { color: transparent; }
        .vt-side:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 3px; }

        .vt-knob {
          position: absolute; top: 2px; left: 2px; width: 30px; height: 24px;
          display: flex; align-items: center; justify-content: center; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 600; line-height: 1;
          box-shadow: 0 2px 10px rgba(248,70,0,.45);
          transition: transform .28s cubic-bezier(.16,1,.3,1);
        }

        @media (prefers-reduced-motion: reduce) { .vt-knob { transition: none; } }
        @media (max-width: 640px) {
          .vt-wrap { right: 12px; bottom: 12px; padding: 6px 8px 6px 12px; }
          .vt-caption { display: none; }
        }
      `})]})}function xn({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function mn({name:t,tagline:a,colors:s}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:s.map(n=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:n},title:n},n))})]})}function gn({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function un({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function fn({deliverable:t}){switch(t.kind){case"poster":return e.jsx(xn,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(mn,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(gn,{rows:t.rows});case"code":return e.jsx(un,{language:t.language,snippet:t.snippet});case"none":return null}}const de="./icons/",yn={gemini:`${de}gemini.svg`,openai:`${de}openai.svg`,xai:`${de}xai.svg`,deepseek:`${de}deepseek.svg`,"ai-generic":`${de}ai-generic.svg`};function bn({stat:t}){const{withoutTokens:a,withTokens:s}=t,[n,o]=c.useState(!1),[i,r]=c.useState(!1),l=c.useRef(void 0),d=a-s;c.useEffect(()=>(r(window.matchMedia("(hover: hover) and (pointer: fine)").matches),()=>window.clearTimeout(l.current)),[]),c.useEffect(()=>{if(!n)return;const x=g=>{g.key==="Escape"&&o(!1)};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[n]);const h=()=>{window.clearTimeout(l.current),o(!0)},m=()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>o(!1),140)};return e.jsxs("div",{className:"relative self-start",children:[e.jsxs("div",{className:"flex items-center gap-2.5 rounded-full border border-[#f84600]/30 bg-[#f84600]/[0.08] py-2.5 pr-3.5 pl-4",children:[e.jsx("span",{className:"size-2 shrink-0 rounded-full bg-[#f84600]","aria-hidden":"true"}),e.jsxs("p",{className:"text-[14px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode just saved you"," ",e.jsx("span",{className:"tabular-nums",children:d.toLocaleString("en-US")})," ","tokens"]}),e.jsx("button",{type:"button",onClick:()=>o(x=>!x),onPointerEnter:i?h:void 0,onPointerLeave:i?m:void 0,onFocus:i?h:void 0,onBlur:i?m:void 0,"aria-expanded":n,"aria-label":"How this saving was estimated",className:"rounded-full p-0.5 text-[#f84600]/60 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70",children:e.jsx(es,{className:"size-4"})})]}),n&&(i?e.jsx(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.22,ease:[.16,1,.3,1]},onPointerEnter:h,onPointerLeave:m,role:"tooltip",className:"absolute bottom-[calc(100%+10px)] left-0 z-40 w-[min(440px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:e.jsx(xa,{stat:t})}):e.jsx(wn,{stat:t,onClose:()=>o(!1)}))]})}function xa({stat:t}){const{withoutLabel:a,withoutTokens:s,withLabel:n,withTokens:o}=t,i=Math.round((1-o/s)*100);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Estimated savings on this task"}),e.jsxs("span",{className:"flex shrink-0 items-center gap-1.5 rounded-full bg-[#f84600]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]","aria-hidden":"true"}),"Conductor Mode"]})]}),e.jsx("div",{className:"mt-4 flex flex-col gap-3",children:[{label:a,tokens:s,accent:!1},{label:n,tokens:o,accent:!0}].map(r=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"w-[132px] shrink-0 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:r.label}),e.jsx("div",{className:"h-2 flex-1 overflow-hidden rounded-full bg-white/10",children:e.jsx(p.div,{className:`h-full rounded-full ${r.accent?"bg-[#f84600]":"bg-white/25"}`,initial:{width:0},animate:{width:`${r.tokens/s*100}%`},transition:{duration:.7,ease:[.16,1,.3,1],delay:.15}})}),e.jsx("span",{className:"w-[74px] shrink-0 text-right text-[12.5px] tabular-nums text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:r.tokens.toLocaleString("en-US")})]},r.label))}),e.jsxs("p",{className:"mt-4 text-[13.5px] font-medium text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:["~",i,"% fewer tokens burned on this exact task."]}),e.jsx("p",{className:"mt-1 text-[11.5px] text-white/35 italic",style:{fontFamily:"var(--font-google-sans)"},children:"Illustrative estimate for this demo — not a live token count."})]})}function wn({stat:t,onClose:a}){return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm",role:"dialog","aria-modal":"true","aria-label":"Estimated savings on this task",onClick:a,children:e.jsxs(p.div,{initial:{opacity:0,y:10,scale:.98},animate:{opacity:1,y:0,scale:1},transition:{duration:.28,ease:[.16,1,.3,1]},onClick:s=>s.stopPropagation(),className:"w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:[e.jsx(xa,{stat:t}),e.jsx("button",{type:"button",onClick:a,className:"mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]",style:{fontFamily:"var(--font-google-sans)"},children:"Close"})]})})}function vn({scenario:t,onStep:a,onDone:s}){const{steps:n,models:o,deliverable:i,stat:r}=t,[l,d]=c.useState(0),[h,m]=c.useState(!1);c.useEffect(()=>{d(0),m(!1)},[t]),c.useEffect(()=>{if(a==null||a(),l>=n.length){const y=setTimeout(()=>{m(!0),s==null||s()},500);return()=>clearTimeout(y)}const g=setTimeout(()=>d(y=>y+1),700);return()=>clearTimeout(g)},[l,n]);const x=h?100:Math.min(l,n.length)/n.length*100;return e.jsxs("div",{className:"relative flex flex-col gap-6 py-1 pl-1",children:[e.jsx("div",{className:"absolute top-1 bottom-1 left-[7px] w-px bg-white/12","aria-hidden":"true",children:e.jsx(p.div,{className:"w-px bg-[#f84600]",initial:{height:0},animate:{height:`${x}%`},transition:{duration:.4,ease:"easeOut"}})}),n.slice(0,l).map((g,y)=>{const k=y===l-1&&!h,v=y===n.length-1;return e.jsxs(p.div,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsxs("span",{className:`relative z-10 mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${k||v&&h?"border-[#f84600] bg-[#0a0a0a]":"border-white/25 bg-[#0a0a0a]"}`,children:[k&&e.jsx(p.span,{className:"size-1.5 rounded-full bg-[#f84600]",animate:l===n.length?{scale:[1,1.4,1]}:{},transition:{duration:.9,repeat:1/0}}),v&&h&&e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-[14.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:g.title}),e.jsx("p",{className:"mt-1 text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:g.sub}),y===0&&e.jsx("div",{className:"mt-2.5 flex flex-wrap gap-1.5",children:o.map(j=>e.jsxs("span",{className:"flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5",children:[e.jsx("img",{src:yn[j.icon],alt:"",className:"size-3.5 object-contain"}),e.jsx("span",{className:"text-[11.5px] font-medium text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:j.name})]},j.name))}),v&&h&&e.jsxs(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"mt-4 flex flex-col gap-4",children:[i.kind!=="none"&&e.jsx(fn,{deliverable:i}),e.jsx(bn,{stat:r})]})]})]},g.title)})]})}function jn({tasksRemaining:t,onLockedFeature:a}){return e.jsxs("div",{className:"hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex",children:[e.jsx(me,{className:"size-6"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[12px] leading-relaxed text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:"You're trying Starchild with limited access. Create an account to save what Starchild learns about you and continue anywhere."})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Available"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:kt.available.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-[12.5px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Le,{className:"size-3 text-emerald-400"}),s]},s))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Requires account"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:kt.locked.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:a,className:"flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Qt,{className:"size-3 shrink-0"}),s]})},s))})]}),e.jsx("div",{className:"mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center",children:e.jsxs("p",{className:"text-[12px] font-medium text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:[Math.max(t,0)," guest interaction",t===1?"":"s"," remaining"]})})]})}function tt({heading:t,sub:a,ctaLabel:s="Create account & continue",backLabel:n="Sign up",footerNote:o="Already have an account?",showForm:i=!0,onBack:r,onContinue:l}){const[d,h]=c.useState(""),[m,x]=c.useState(""),g=!i||d.trim()!==""&&m.trim()!=="";return e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[r&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:r,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Me,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:n})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(Qt,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[i&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:d,onChange:y=>h(y.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:m,onChange:y=>x(y.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:l,disabled:!g,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[o," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}function kn({onBack:t,intents:a,onRequestSignup:s,onLogIn:n,initialMessage:o,openingMessage:i,task:r,isGuest:l=!1}){const[d,h]=c.useState(o??null),[m,x]=c.useState(o?Nt(o):null),[g,y]=c.useState(!1),[k,v]=c.useState(""),j=l,[I,E]=c.useState(o?1:2),[W,z]=c.useState(null),P=c.useRef(null),[L,$]=c.useState(r),[S,N]=c.useState(i);function f(b,O){z({heading:b,sub:O})}function T(b){$(b),N(b.question)}function u(b){const O=b.trim();if(O){if(j&&I<=0){f("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}h(O),x(Nt(L?`${L.basePrompt} ${O}`:O)),j&&E(Y=>Y-1)}}function F(){var b;(b=P.current)==null||b.scrollIntoView({behavior:"smooth",block:"end"})}return c.useEffect(()=>{const b=setTimeout(F,50);return()=>clearTimeout(b)},[d,g]),e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[j?e.jsx(jn,{tasksRemaining:I,onLockedFeature:()=>f("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience.")}):e.jsx("div",{className:"hidden w-14 shrink-0 flex-col items-center border-r border-white/[0.08] pt-6 md:flex",children:e.jsx(me,{className:"size-6"})}),W&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:b=>{b.target===b.currentTarget&&z(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(tt,{heading:W.heading,sub:W.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{z(null),s==null||s()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(Me,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode"}),j&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var b;return(b=n??s)==null?void 0:b()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:d===null?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[S?e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[L&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:L.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(ge,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:S})]})]}):e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(Ze,{onStartTask:T,align:"center",intents:a})}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:k,onChange:b=>v(b.target.value),onKeyDown:b=>{b.key==="Enter"&&u(k)},placeholder:S?"Answer however you like…":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!S}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(Ce,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{type:"button",className:"flex items-center gap-1 text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Ye,{className:"size-3 text-white/35"})]}),e.jsx("button",{type:"button",onClick:()=>u(k||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:k.trim()?e.jsx(R,{className:"size-4"}):e.jsx(wt,{className:"size-4"})})]})]})]})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("div",{className:"max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:d})}),e.jsx(vn,{scenario:m,onStep:F,onDone:()=>y(!0)}),g&&j&&e.jsxs(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.35},className:"flex items-center justify-between gap-4 rounded-2xl border border-[#f84600]/30 bg-[#f84600]/[0.08] px-5 py-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[13.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Keep what you just created."}),e.jsx("p",{className:"mt-0.5 text-[12.5px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Create your free account to save this project and unlock the full Starchild experience."})]}),e.jsx("button",{type:"button",onClick:()=>f("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience."),className:"shrink-0 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Create free account"})]}),e.jsx("div",{ref:P})]})}),d!==null&&e.jsx("div",{className:"shrink-0 border-t border-white/[0.08] px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5",children:[e.jsx("button",{type:"button",className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(Ce,{className:"size-4"})}),e.jsx("input",{disabled:!0,placeholder:g?"Monetize, meet the marketplace":"Ask Conductor anything…",className:"flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("span",{className:"flex items-center gap-1 text-[12.5px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Ye,{className:"size-3 text-white/35"})]}),e.jsx("span",{className:"flex size-8 items-center justify-center rounded-full bg-[#f84600] text-white",children:e.jsx(wt,{className:"size-3.5"})})]})})]})]})}const Nn={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function Sn({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(C,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:ls.map(({prompt:a,scenario:s},n)=>e.jsxs(p.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:n*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:Nn[s.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx(R,{className:"size-4 rotate-45"})})]},s.id))})]})})}function Cn({onNavigateHome:t,onOpenMarketplace:a,onTry:s,onLogIn:n,onSignUp:o}){const i=c.useRef(null);function r(){var l;(l=i.current)==null||l.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(aa,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:n,onSignUp:o}),e.jsxs(C,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>s(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:r,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(Sa,{onTryConductorMode:()=>s()}),e.jsx("div",{ref:i,children:e.jsx(Sn,{onTryExample:l=>s(l)})}),e.jsx(Ie,{onStartFree:()=>s()})]})}const He=[{Icon:Xe,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:Qe,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:Zt,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function zn({onDone:t}){const[a,s]=c.useState(0),n=He[a],o=a===He.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(q,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(n.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:n.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:n.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:He.map((i,r)=>e.jsx("button",{type:"button",onClick:()=>s(r),"aria-label":`Go to slide ${r+1}`,className:`h-1.5 rounded-full transition-all ${r===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},r))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>o?t():s(i=>i+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:o?"Ok, let's go":"Next"})]})]})}function Tn({intent:t,skillTitle:a,onBack:s,onContinue:n}){const o=t==="create"?"Create a free account to list your skill":"Create a free account to get this skill",i=t==="create"?"So buyers know who built it, and payouts land somewhere real.":`So "${a}" lands in your library and the seller actually gets paid.`;return e.jsx(tt,{heading:o,sub:i,onBack:s,onContinue:n})}const Mn={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function Ln(t){return Mn[t]??{bg:"#e5e5e5",text:"#404040"}}function En({skill:t,onSelect:a}){const s=Ln(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:n=>{a&&(n.key==="Enter"||n.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:s.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:s.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function In({open:t,onClose:a,skills:s,onAddSkill:n}){const[o,i]=c.useState("onboarding"),[r,l]=c.useState("All"),[d,h]=c.useState(""),[m,x]=c.useState(""),[g,y]=c.useState(""),[k,v]=c.useState(""),[j,I]=c.useState(We[2]),[E,W]=c.useState(null),[z,P]=c.useState(null);c.useEffect(()=>{t&&(i("onboarding"),W(null),P(null))},[t]);function L(){W("create"),i("auth")}function $(u){W("buy"),P(u),i("auth")}function S(){i(E==="create"?"create":"purchased")}function N(){m.trim()&&(n({id:`${m.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:m.trim(),price:k.trim()||"$5",category:j,blurb:g.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),x(""),y(""),v(""),i("grid"))}const f=d.trim().toLowerCase(),T=s.filter(u=>{const F=r==="All"||u.category===r,b=!f||u.title.toLowerCase().includes(f)||u.blurb.toLowerCase().includes(f)||u.category.toLowerCase().includes(f);return F&&b});return e.jsx(q,{children:t&&e.jsx(p.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:u=>{u.target===u.currentTarget&&a()},children:e.jsxs(p.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(Qa,{className:"size-4"})})]}),e.jsx(q,{mode:"wait",children:o==="onboarding"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(zn,{onDone:()=>i("grid")})},"onboarding"):o==="grid"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:L,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl bg-white/10",children:e.jsx(me,{className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(u=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${u===0?"w-4 bg-[#f84600]":"w-1.5 bg-white/20"}`},u))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(Zt,{className:"size-4 text-white/40"}),e.jsx("input",{value:d,onChange:u=>h(u.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:We.map(u=>e.jsx("button",{type:"button",onClick:()=>l(u),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${r===u?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:u},u))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[T.map(u=>e.jsx(En,{skill:u,onSelect:u.mine?void 0:()=>$(u)},u.id)),e.jsxs("button",{type:"button",onClick:L,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(Ce,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]})]})]},"grid"):o==="create"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Me,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:m,onChange:u=>x(u.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:g,onChange:u=>y(u.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:k,onChange:u=>v(u.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:j,onChange:u=>I(u.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:We.filter(u=>u!=="All").map(u=>e.jsx("option",{value:u,children:u},u))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:N,disabled:!m.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Ce,{className:"size-3.5"}),"add"]})})]},"create"):o==="auth"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(Tn,{intent:E==="create"?"create":"buy",skillTitle:z==null?void 0:z.title,onBack:()=>i("grid"),onContinue:S})},"auth"):e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(Le,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',z==null?void 0:z.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const ma={tone:50,initiative:50},Fn=[{id:"building",label:"Building something of my own",context:"Founder or solo builder",behavior:"Bias toward momentum and shipping over analysis"},{id:"team",label:"Working with a team or company",context:"Works inside an organization",behavior:"Account for stakeholders and existing process"},{id:"studying",label:"Studying and exploring",context:"Learning phase, low commitment",behavior:"Explain the reasoning, not just the answer"},{id:"changing",label:"Changing direction",context:"In transition",behavior:"Hold options open before narrowing"},{id:"caring",label:"Taking care of other people",context:"Limited discretionary time",behavior:"Keep suggestions short and low-effort"},{id:"energy",label:"Trying to regain energy",context:"Low capacity right now",behavior:"One step at a time, never a backlog"}],An=[{id:"work",label:"Work and direction",context:"Career focus",behavior:"Lead with work-shaped examples"},{id:"own",label:"Building something of my own",context:"Personal project focus",behavior:"Prioritize build and launch help"},{id:"money",label:"Money and security",context:"Financial focus",behavior:"Be concrete about tradeoffs and numbers"},{id:"people",label:"Relationships and family",context:"Personal life focus",behavior:"Stay conversational, avoid task framing"},{id:"health",label:"Health and energy",context:"Wellbeing focus",behavior:"Respect capacity, avoid pressure"},{id:"life",label:"The kind of life I want",context:"Direction-level focus",behavior:"Ask before advising"},{id:"unsure",label:"I'm not sure yet",context:"Focus not yet named",behavior:"Help name it before solving it"}],Wn=[{id:"alone",label:"Think it through on my own",context:"Internal processor",behavior:"Give enough context to decide alone; don't flood with options"},{id:"talk",label:"Talk until I understand what I think",context:"External processor",behavior:"Ask more than assert; reflect back what you hear"},{id:"act",label:"Start doing something and figure it out",context:"Learns by moving",behavior:"Offer a first step, not a full plan"},{id:"research",label:"Research until I feel prepared",context:"Needs groundwork first",behavior:"Bring sources and context up front"},{id:"pause",label:"Put it aside until I have more energy",context:"Avoids under load",behavior:"Keep it small; never present a pile of work"}],Pn={building:"in a stretch where you're trying to build something of your own",team:"working inside a team, with other people's plans in the mix",studying:"in an exploring phase, still gathering more than deciding",changing:"somewhere in the middle of changing direction",caring:"carrying a fair amount for other people right now",energy:"trying to get your energy back before taking on more"},$n={work:"work and where it's heading",own:"the thing you're trying to build",money:"money and feeling secure",people:"the people close to you",health:"your health and energy",life:"what kind of life you actually want",unsure:"something you haven't quite put words to yet"},Rt={alone:{observation:"You tend to work things out on your own before saying them out loud",consequence:"so I'll try to give you enough to decide with, without burying you in options"},talk:{observation:"You seem to find what you think by talking it through",consequence:"so I'll ask more than I assert, and play back what I'm hearing"},act:{observation:"You'd rather start moving and adjust than plan it all first",consequence:"so I'll aim at a first step instead of a finished plan"},research:{observation:"You like to feel prepared before you commit to something",consequence:"so I'll bring the groundwork up front rather than after"},pause:{observation:"You tend to set things down when they get heavy",consequence:"so I'll keep things small and won't hand you a pile"}},Rn={work:"helping you get clearer on the direction before you commit to it",own:"helping you turn the idea into something that actually moves",money:"helping you lay the tradeoffs out plainly",people:"being somewhere you can think out loud without it becoming a task",health:"helping you protect your capacity while things still move",life:"helping you name what matters before we touch what to do",unsure:"helping you name the thing first — the rest gets easier after that"};function On(t){const a=t.stage?Pn[t.stage]:"in the middle of something you're still shaping",s=t.focus?$n[t.focus]:"a few things at once",n=t.style?Rt[t.style]:Rt.alone,o=t.focus?Rn[t.focus]:"helping you find the first thread to pull",i=t.tone>65?"I'll keep it direct":t.tone<35?"I'll keep it gentle":"I'll keep the tone even",r=t.initiative>65?"and give you clear steps":t.initiative<35?"and leave you room to steer":"and follow your lead on how much structure you want";return[`You seem to be ${a}, and lately ${s} has been taking up most of the space.`,`${n.observation}, ${n.consequence}.`,`${i}, ${r}.`,`Right now I might be most useful by ${o}.`].join(" ")}function Bn(t){if(t.startingPoint&&t.startingPoint.trim())return`You mentioned "${t.startingPoint.trim()}". What's made that feel more present lately?`;const a=t.focus??"unsure",s={work:"You said work and direction has been taking up space. What's the part of it you keep circling back to?",own:"You said you're trying to build something of your own. Where is it stuck right now?",money:"You said money and security has been on your mind. What decision is it attached to?",people:"You said the people close to you have been taking up space. Want to just talk it through?",health:"You said your energy has been the thing. What's been draining most of it?",life:"You said you've been thinking about what kind of life you want. What made that feel louder recently?",unsure:"You weren't sure what's taking up the space yet. Want to start by just describing your week?"};return s[a]??s.unsure}const Ne=5;function Hn({onComplete:t}){const[a,s]=c.useState(0),[n,o]=c.useState(ma),[i,r]=c.useState("idle"),l=a/Ne;function d(){if(a>=Ne-1){r("thinking"),setTimeout(()=>t(n),700);return}s(x=>x+1),r("idle")}function h(x,g){o(y=>({...y,[x]:g})),r("acknowledging"),setTimeout(d,460)}function m(x){const g={...n,startingPoint:x};o(g),r("thinking"),setTimeout(()=>t(g),700)}return e.jsxs("div",{className:"ob-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(C,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between py-8",children:[e.jsx(ge,{state:i,depth:l,size:14}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-[12px] tracking-[0.14em] text-white/35",style:{fontFamily:"var(--font-google-sans)"},children:[a+1," / ",Ne]}),e.jsx("button",{type:"button",onClick:a>=Ne-1?()=>m(void 0):d,className:"text-[12.5px] text-white/40 transition-colors hover:text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"})]})]}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-9",children:e.jsxs(q,{mode:"wait",children:[a===0&&e.jsx(De,{question:"What stage are you in right now?",choices:Fn,selected:n.stage,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("stage",x)},"stage"),a===1&&e.jsx(De,{question:"What's been taking up the most space in your mind lately?",choices:An,selected:n.focus,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("focus",x)},"focus"),a===2&&e.jsx(De,{question:"When something is difficult, what do you usually do first?",choices:Wn,selected:n.style,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("style",x)},"style"),a===3&&e.jsx(Dn,{answers:n,onChange:x=>{o(g=>({...g,...x})),r("listening")},onContinue:d},"sliders"),a===4&&e.jsx(qn,{onFinish:m,onFocusChange:x=>r(x?"listening":"idle")},"open")]})})})})]}),e.jsx("style",{children:".ob-screen { background: radial-gradient(circle at 22% 12%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const at={initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0,y:-12},transition:{duration:.45,ease:[.16,1,.3,1]}};function st({children:t}){return e.jsx("h2",{className:"max-w-[20ch] text-[32px] leading-[1.14] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:t})}function De({question:t,choices:a,selected:s,onPick:n,onHoverChange:o}){return e.jsxs(p.div,{...at,children:[e.jsx(st,{children:t}),e.jsx("div",{className:"mt-10 flex flex-wrap gap-3",children:a.map((i,r)=>{const l=s===i.id;return e.jsx(p.button,{type:"button",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.35,delay:r*.05,ease:[.16,1,.3,1]},onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),onFocus:()=>o(!0),onBlur:()=>o(!1),onClick:()=>n(i.id),className:`rounded-full border px-5 py-3 text-[14.5px] transition-colors ${l?"border-[#f84600] bg-[#f84600] text-white":"border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40 hover:bg-white/[0.07]"}`,style:{fontFamily:"var(--font-google-sans)"},children:i.label},i.id)})})]})}function Ot({leftLabel:t,rightLabel:a,value:s,onChange:n}){return e.jsxs("div",{children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:s<40?"text-white":"",children:t}),e.jsx("span",{className:s>60?"text-white":"",children:a})]}),e.jsx("input",{type:"range",min:0,max:100,value:s,onChange:o=>n(Number(o.target.value)),className:"ob-slider w-full","aria-label":`${t} to ${a}`})]})}function Dn({answers:t,onChange:a,onContinue:s}){const n=(t.tone>65?"I'll say the thing plainly":t.tone<35?"I'll go easy on the delivery":"I'll keep the tone even")+(t.initiative>65?", and hand you clear steps.":t.initiative<35?", and leave you room to steer.":", and follow your lead on structure.");return e.jsxs(p.div,{...at,children:[e.jsx(st,{children:"How should Starchild work with you?"}),e.jsxs("div",{className:"mt-10 flex max-w-[560px] flex-col gap-9",children:[e.jsx(Ot,{leftLabel:"Gentle",rightLabel:"Direct",value:t.tone,onChange:o=>a({tone:o})}),e.jsx(Ot,{leftLabel:"Give me space",rightLabel:"Give me clear steps",value:t.initiative,onChange:o=>a({initiative:o})})]}),e.jsxs(p.p,{initial:{opacity:0},animate:{opacity:1},className:"mt-9 max-w-[46ch] text-[15px] text-white/55 italic",style:{fontFamily:"var(--font-google-sans)"},children:["“",n,"”"]},n),e.jsx("button",{type:"button",onClick:s,className:"mt-10 rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"That's right"}),e.jsx("style",{children:`
        .ob-slider { -webkit-appearance: none; appearance: none; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(248,70,0,.85), rgba(255,255,255,.18)); outline: none; }
        .ob-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px;
          border-radius: 999px; background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
        .ob-slider::-moz-range-thumb { width: 22px; height: 22px; border: none; border-radius: 999px;
          background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
      `})]})}function qn({onFinish:t,onFocusChange:a}){const[s,n]=c.useState("");return e.jsxs(p.div,{...at,children:[e.jsx(st,{children:"What's something you'd like help thinking through right now?"}),e.jsx("p",{className:"mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"It can be something small, practical, personal, or something you're still trying to understand."}),e.jsx("div",{className:"mt-8 max-w-[620px] rounded-[20px] border border-white/12 bg-white/[0.04] p-4 focus-within:border-white/30",children:e.jsx("textarea",{value:s,onChange:o=>n(o.target.value),onFocus:()=>a(!0),onBlur:()=>a(!1),onKeyDown:o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),t(s))},rows:2,placeholder:"One sentence is enough…",className:"w-full resize-none bg-transparent text-[15.5px] text-white placeholder:text-white/30 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0})}),e.jsxs("div",{className:"mt-7 flex flex-wrap items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>t(s),disabled:!s.trim(),className:"rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03] disabled:opacity-35 disabled:hover:scale-100",style:{fontFamily:"var(--font-google-sans)"},children:"Continue"}),e.jsx("button",{type:"button",onClick:()=>t(void 0),className:"rounded-full border border-white/20 px-6 py-3.5 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"I'm not sure yet"})]})]})}const _n={yes:"Good. I'll start from there.",partly:"Noted — I'll hold it loosely and adjust as we talk.",no:"Then I had it wrong. I'll let you lead and build it back up from what you say."};function Gn({answers:t,onContinue:a}){const[s,n]=c.useState(()=>On(t)),[o,i]=c.useState(!1),[r,l]=c.useState(s),[d,h]=c.useState(null);function m(g){h(g),setTimeout(()=>a(s,g),1400)}function x(){const g=r.trim()||s;n(g),i(!1),h("edited"),setTimeout(()=>a(g,"edited"),1400)}return e.jsxs("div",{className:"fr-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(C,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsx("div",{className:"py-8",children:e.jsx(ge,{state:d?"settled":"thinking",depth:1,size:14})}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Here's what I think I understand so far"}),o?e.jsxs("div",{className:"mt-7",children:[e.jsx("textarea",{value:r,onChange:g=>l(g.target.value),rows:5,className:"w-full resize-none rounded-[20px] border border-white/20 bg-white/[0.04] p-5 text-[20px] leading-[1.55] text-white focus:border-white/40 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0}),e.jsxs("div",{className:"mt-5 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:x,className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Save what I changed"}),e.jsx("button",{type:"button",onClick:()=>{l(s),i(!1)},className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Cancel"})]})]}):e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,delay:.15,ease:[.16,1,.3,1]},className:"mt-7 max-w-[62ch] text-[21px] leading-[1.55] text-white sm:text-[24px]",style:{fontFamily:"var(--font-google-sans)"},children:s},s),e.jsxs(q,{mode:"wait",children:[!o&&!d&&e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.45,delay:.5},className:"mt-10 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:()=>m("yes"),className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"This feels like me"}),["partly","no"].map(g=>e.jsx("button",{type:"button",onClick:()=>m(g),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:g==="partly"?"Partly":"Not really"},g)),e.jsx("button",{type:"button",onClick:()=>i(!0),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Edit what Starchild understood"})]},"actions"),d&&e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"mt-10 text-[16px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:d==="edited"?"Thanks — that's more accurate than what I had.":_n[d]},"ack")]})]})})})]}),e.jsx("style",{children:".fr-screen { background: radial-gradient(circle at 30% 20%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const Ve="v",Ue="c";function Yn(){if(typeof window>"u")return Ue;const t=new URLSearchParams(window.location.search).get(Ve);return t==="a"||t==="b"||t==="c"?t:Ue}function Vn(){const[t,a]=c.useState(Yn),[s,n]=c.useState("landing"),[o,i]=c.useState(),[r,l]=c.useState(),[d,h]=c.useState(),[m,x]=c.useState(!1),[g,y]=c.useState(ma),[k,v]=c.useState(!1),[j,I]=c.useState(cs);function E(N){a(N);const f=new URL(window.location.href);N===Ue?f.searchParams.delete(Ve):f.searchParams.set(Ve,N),window.history.replaceState(null,"",f),window.scrollTo({top:0})}function W(N){I(f=>[N,...f])}function z(N){i(N),l(void 0),h(void 0),x(!0),n("chat")}function P(N){i(void 0),l(N.question),h(N),x(!0),n("chat")}function L(){n("landing")}function $(){n("for-traders"),window.scrollTo({top:0})}function S(){n("signup")}return e.jsxs(e.Fragment,{children:[s==="landing"&&e.jsxs(e.Fragment,{children:[t==="c"?e.jsx(en,{onEnterGuest:z,onStartTask:P,onNavigateTraders:$,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>v(!0),onLogIn:S,onSignUp:S},"c"):(()=>{const N=t==="b"?As:js;return e.jsx(N,{onEnterGuest:z,onStartTask:P,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>v(!0),onLogIn:S,onSignUp:S},t)})(),e.jsx(hn,{variant:t,onChange:E})]}),s==="for-traders"&&e.jsx(pn,{onNavigateHome:L,onEnterGuest:z,onLogIn:S,onSignUp:S}),s==="conductor-mode"&&e.jsx(Cn,{onNavigateHome:L,onOpenMarketplace:()=>v(!0),onTry:z,onLogIn:S,onSignUp:S}),s==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(tt,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>m?n("chat"):L(),onContinue:()=>{x(!1),n("onboarding")}})})}),s==="onboarding"&&e.jsx(Hn,{onComplete:N=>{y(N),n("first-read")}}),s==="first-read"&&e.jsx(Gn,{answers:g,onContinue:(N,f)=>{l(f==="no"?"I didn't get that quite right. Tell me where I was off — what's actually going on for you right now?":Bn(g)),i(void 0),h(void 0),n("chat")}}),s==="chat"&&e.jsx(kn,{onBack:L,intents:t==="c"?ha:void 0,onOpenMarketplace:()=>v(!0),onRequestSignup:()=>n("signup"),onLogIn:S,initialMessage:o,openingMessage:r,task:d,isGuest:m}),e.jsx(In,{open:k,onClose:()=>v(!1),skills:j,onAddSkill:W})]})}Ca.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(Vn,{})}));
