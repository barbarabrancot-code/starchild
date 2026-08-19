import{f as ne,c as $e,r as c,s as At,a as Wt,p as da,v as pa,i as ha,b as xa,d as ua,e as ga,n as Pt,g as ma,h as fa,u as $t,j as ya,m as Re,k as Rt,l as ie,M as ba,o as e,q as p,C as L,A as q,t as wa,w as va}from"./ConductorModeSection-eKa5cY6b.js";function Ot(t,a){let s;const o=()=>{const{currentTime:n}=a,r=(n===null?0:n.value)/100;s!==r&&t(r),s=r};return ne.preUpdate(o,!0),()=>$e(o)}function ka(t,a,s){c.useInsertionEffect(()=>t.on(a,s),[t,a,s])}function be(t){return typeof window>"u"?!1:t?At():Wt()}const ja=50,ot=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Na=()=>({time:0,x:ot(),y:ot()}),Sa={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function nt(t,a,s,o){const n=s[a],{length:i,position:r}=Sa[a],l=n.current,d=s.time;n.current=Math.abs(t[`scroll${r}`]),n.scrollLength=t[`scroll${i}`]-t[`client${i}`],n.offset.length=0,n.offset[0]=0,n.offset[1]=n.scrollLength,n.progress=da(0,n.scrollLength,n.current);const h=o-d;n.velocity=h>ja?0:pa(n.current-l,h)}function Ca(t,a,s){nt(t,"x",a,s),nt(t,"y",a,s),a.time=s}function za(t,a){const s={x:0,y:0};let o=t;for(;o&&o!==a;)if(ha(o))s.x+=o.offsetLeft,s.y+=o.offsetTop,o=o.offsetParent;else if(o.tagName==="svg"){const n=o.getBoundingClientRect();o=o.parentElement;const i=o.getBoundingClientRect();s.x+=n.left-i.left,s.y+=n.top-i.top}else if(o instanceof SVGGraphicsElement){const{x:n,y:i}=o.getBBox();s.x+=n,s.y+=i;let r=null,l=o.parentNode;for(;!r;)l.tagName==="svg"&&(r=l),l=o.parentNode;o=r}else break;return s}const Oe={start:0,center:.5,end:1};function it(t,a,s=0){let o=0;if(t in Oe&&(t=Oe[t]),typeof t=="string"){const n=parseFloat(t);t.endsWith("px")?o=n:t.endsWith("%")?t=n/100:t.endsWith("vw")?o=n/100*document.documentElement.clientWidth:t.endsWith("vh")?o=n/100*document.documentElement.clientHeight:t=n}return typeof t=="number"&&(o=a*t),s+o}const La=[0,0];function Ta(t,a,s,o){let n=Array.isArray(t)?t:La,i=0,r=0;return typeof t=="number"?n=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?n=t.split(" "):n=[t,Oe[t]?t:"0"]),i=it(n[0],s,o),r=it(n[1],a),i-r}const re={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Ma={x:0,y:0};function Ea(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function Ia(t,a,s){const{offset:o=re.All}=s,{target:n=t,axis:i="y"}=s,r=i==="y"?"height":"width",l=n!==t?za(n,t):Ma,d=n===t?{width:t.scrollWidth,height:t.scrollHeight}:Ea(n),h={width:t.clientWidth,height:t.clientHeight};a[i].offset.length=0;let g=!a[i].interpolate;const x=o.length;for(let u=0;u<x;u++){const y=Ta(o[u],h[r],d[r],l[i]);!g&&y!==a[i].interpolatorOffsets[u]&&(g=!0),a[i].offset[u]=y}g&&(a[i].interpolate=xa(a[i].offset,ua(o),{clamp:!1}),a[i].interpolatorOffsets=[...a[i].offset]),a[i].progress=ga(0,1,a[i].interpolate(a[i].current))}function Fa(t,a=t,s){if(s.x.targetOffset=0,s.y.targetOffset=0,a!==t){let o=a;for(;o&&o!==t;)s.x.targetOffset+=o.offsetLeft,s.y.targetOffset+=o.offsetTop,o=o.offsetParent}s.x.targetLength=a===t?a.scrollWidth:a.clientWidth,s.y.targetLength=a===t?a.scrollHeight:a.clientHeight,s.x.containerLength=t.clientWidth,s.y.containerLength=t.clientHeight}function Aa(t,a,s,o={}){return{measure:n=>{Fa(t,o.target,s),Ca(t,s,n),(o.offset||o.target)&&Ia(t,s,o)},notify:()=>a(s)}}const Y=new WeakMap,rt=new WeakMap,Te=new WeakMap,lt=new WeakMap,pe=new WeakMap,ct=t=>t===document.scrollingElement?window:t;function Bt(t,{container:a=document.scrollingElement,trackContentSize:s=!1,...o}={}){if(!a)return Pt;let n=Te.get(a);n||(n=new Set,Te.set(a,n));const i=Na(),r=Aa(a,t,i,o);if(n.add(r),!Y.has(a)){const d=()=>{for(const u of n)u.measure(fa.timestamp);ne.preUpdate(h)},h=()=>{for(const u of n)u.notify()},g=()=>ne.read(d);Y.set(a,g);const x=ct(a);window.addEventListener("resize",g),a!==document.documentElement&&rt.set(a,ma(a,g)),x.addEventListener("scroll",g),g()}if(s&&!pe.has(a)){const d=Y.get(a),h={width:a.scrollWidth,height:a.scrollHeight};lt.set(a,h);const g=()=>{const u=a.scrollWidth,y=a.scrollHeight;(h.width!==u||h.height!==y)&&(d(),h.width=u,h.height=y)},x=ne.read(g,!0);pe.set(a,x)}const l=Y.get(a);return ne.read(l,!1,!0),()=>{var x;$e(l);const d=Te.get(a);if(!d||(d.delete(r),d.size))return;const h=Y.get(a);Y.delete(a),h&&(ct(a).removeEventListener("scroll",h),(x=rt.get(a))==null||x(),window.removeEventListener("resize",h));const g=pe.get(a);g&&($e(g),pe.delete(a)),lt.delete(a)}}const Wa=[[re.Enter,"entry"],[re.Exit,"exit"],[re.Any,"cover"],[re.All,"contain"]],dt={start:0,end:1};function Pa(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const s=dt[a[0]],o=dt[a[1]];if(!(s===void 0||o===void 0))return[s,o]}function $a(t){if(t.length!==2)return;const a=[];for(const s of t)if(Array.isArray(s))a.push(s);else if(typeof s=="string"){const o=Pa(s);if(!o)return;a.push(o)}else return;return a}function Ra(t,a){const s=$a(t);if(!s)return!1;for(let o=0;o<2;o++){const n=s[o],i=a[o];if(n[0]!==i[0]||n[1]!==i[1])return!1}return!0}function qe(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,s]of Wa)if(Ra(t,a))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const pt=new Map;function ht(t){const a={value:0},s=Bt(o=>{a.value=o[t.axis].progress*100},t);return{currentTime:a,cancel:s}}function Ht({source:t,container:a,...s}){const{axis:o}=s;t&&(a=t);let n=pt.get(a);n||(n=new Map,pt.set(a,n));const i=s.target??"self";let r=n.get(i);r||(r={},n.set(i,r));const l=o+(s.offset??[]).join(",");return r[l]||(s.target&&be(s.target)?qe(s.offset)?r[l]=new ViewTimeline({subject:s.target,axis:o}):r[l]=ht({container:a,...s}):be()?r[l]=new ScrollTimeline({source:a,axis:o}):r[l]=ht({container:a,...s})),r[l]}function Oa(t,a){const s=Ht(a),o=a.target?qe(a.offset):void 0,n=a.target?be(a.target)&&!!o:be();return t.attachTimeline({timeline:n?s:void 0,...o&&n&&{rangeStart:o.rangeStart,rangeEnd:o.rangeEnd},observe:i=>(i.pause(),Ot(r=>{i.time=i.iterationDuration*r},s))})}function Ba(t){return t&&(t.target||t.offset)}function Ha(t){return t.length===2}function Da(t,a){return Ha(t)||Ba(a)?Bt(s=>{t(s[a.axis].progress,s)},a):Ot(t,Ht(a))}function Dt(t,{axis:a="y",container:s=document.scrollingElement,...o}={}){if(!s)return Pt;const n={axis:a,container:s,...o};return typeof t=="function"?Da(t,n):Oa(t,n)}const qa=()=>({scrollX:ie(0),scrollY:ie(0),scrollXProgress:ie(0),scrollYProgress:ie(0)}),Z=t=>t?!t.current:!1;function xt(t,a,s,o){return{factory:n=>{let i;const r=()=>{if(Z(s)||Z(o)){Re.read(r);return}i=Dt(n,{...a,axis:t,container:(s==null?void 0:s.current)||void 0,target:(o==null?void 0:o.current)||void 0})};return Re.read(r),()=>{Rt(r),i==null||i()}},times:[0,1],keyframes:[0,1],ease:n=>n,duration:1}}function _a(t,a){return typeof window>"u"?!1:t?At()&&!!qe(a):Wt()}function Ga({container:t,target:a,...s}={}){const o=$t(qa);_a(a,s.offset)&&(o.scrollXProgress.accelerate=xt("x",s,t,a),o.scrollYProgress.accelerate=xt("y",s,t,a));const n=c.useRef(null),i=c.useRef(!1),r=c.useCallback(()=>(n.current=Dt((l,{x:d,y:h})=>{o.scrollX.set(d.current),o.scrollXProgress.set(d.progress),o.scrollY.set(h.current),o.scrollYProgress.set(h.progress)},{...s,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var l;(l=n.current)==null||l.call(n)}),[t,a,JSON.stringify(s.offset)]);return ya(()=>{if(i.current=!1,Z(t)||Z(a)){i.current=!0;return}else return r()},[r]),c.useEffect(()=>{if(!i.current)return;let l;const d=()=>{const h=Z(t),g=Z(a);!h&&!g&&(l=r())};return Re.read(d),()=>{Rt(d),l==null||l()}},[r]),o}function D(t){const a=$t(()=>ie(t)),{isStatic:s}=c.useContext(ba);if(s){const[,o]=c.useState(t);c.useEffect(()=>a.on("change",o),[])}return a}function le({className:t}){return e.jsxs("div",{className:`relative overflow-hidden rounded-[7px] ${t??"size-6"}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[#1c1c1c]"}),e.jsx("div",{className:"absolute inset-0 bg-[#f84600]",style:{clipPath:"polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)"}})]})}function we({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function ut({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function R({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Be({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ya({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function je({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function qt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function _e({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function _t({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Ne({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Gt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function Yt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function Ge({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function Vt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Ut({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Va({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("rect",{x:"3",y:"7.5",width:"18",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Ua({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function Kt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function Ka({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M12 11v5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"8",r:"1",fill:"currentColor"})]})}const Xa={idle:{scale:[1,1.06,1],opacity:[.75,1,.75],duration:3.4},listening:{scale:[1,1.12,1],opacity:[.85,1,.85],duration:2.2},acknowledging:{scale:[1,.86,1.04,1],opacity:[1,1,1,1],duration:.5},thinking:{scale:[1,1.18,.94,1],opacity:[1,.7,1,1],duration:1.1},settled:{scale:[1,1.03,1],opacity:[.9,1,.9],duration:4.6}};function ce({state:t="idle",depth:a=0,size:s=18}){const o=Xa[t],n=10+a*26,i=.1+a*.22;return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:s*3,height:s*3},children:[e.jsx(p.span,{"aria-hidden":"true",className:"absolute rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)"},animate:{width:s*(2+a*.9),height:s*(2+a*.9),opacity:i},transition:{duration:.8,ease:[.16,1,.3,1]}}),e.jsx(p.span,{"aria-hidden":"true",className:"relative rounded-full bg-[#f84600]",style:{width:s,height:s,boxShadow:`0 0 ${n}px rgba(248,70,0,.7)`},animate:{scale:o.scale,opacity:o.opacity},transition:{duration:o.duration,repeat:t==="acknowledging"?0:1/0,ease:"easeInOut"}})]})}const gt=.34,mt=.15,V=860,he=560,xe=14;function Za({targetRef:t,image:a}){const s=c.useRef(null),o=c.useRef(null),n=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{const r=t.current,l=s.current;if(!r||!l||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const h=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let g=0,x=0,u=0,y=0,j=0,w=0,v=!1,E=0;const T=()=>{var $,k,N,f;($=i.current)==null||$.style.setProperty("transform",`translate3d(${u-xe/2}px, ${y-xe/2}px, 0)`),(k=n.current)==null||k.style.setProperty("transform",`translate3d(${j-he/2}px, ${w-he/2}px, 0)`),(N=o.current)==null||N.style.setProperty("--mx",`${j-V/2}px`),(f=o.current)==null||f.style.setProperty("--my",`${w-V/2}px`)},F=()=>{u+=(g-u)*gt,y+=(x-y)*gt,j+=(u-j)*mt,w+=(y-w)*mt,T(),E=requestAnimationFrame(F)},z=$=>{const k=r.getBoundingClientRect();if(g=$.clientX-k.left,x=$.clientY-k.top,!v){if(v=!0,u=j=g,y=w=x,T(),h)return;E=requestAnimationFrame(F)}h&&(u=j=g,y=w=x,T())},A=()=>l.classList.add("hs-on"),M=()=>{l.classList.remove("hs-on"),cancelAnimationFrame(E),E=0,v=!1};return r.addEventListener("pointermove",z),r.addEventListener("pointerenter",A),r.addEventListener("pointerleave",M),r.classList.add("hs-host"),()=>{r.removeEventListener("pointermove",z),r.removeEventListener("pointerenter",A),r.removeEventListener("pointerleave",M),r.classList.remove("hs-host"),cancelAnimationFrame(E)}},[t]),e.jsxs("div",{ref:s,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:o,className:"hs-lit"}),e.jsx("div",{ref:n,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:i,className:"hs-dot"})}),e.jsx("style",{children:`
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
          -webkit-mask-size: ${V}px ${V}px;
          mask-size: ${V}px ${V}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${he}px; height: ${he}px;
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
          width: ${xe}px; height: ${xe}px;
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
      `})]})}function Xt({onNavigateHome:t,onLogIn:a,onSignUp:s}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(L,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const Qa=[{id:"build",label:"Build",icon:qt,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:_t,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:Ge,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:Vt,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:Ut,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],ft={available:["Conversation","Conductor Mode","Research & tasks","Browse Marketplace"],locked:["Save memory & context","Conversation history","Continue on Desktop","Run tasks 24/7","Automations","Publish & monetize","Integrations","Buy from Marketplace"]},ue=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],Ja=[{id:"ideas",label:"Ideas",icon:_e,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:Ua,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:Kt,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:Ge,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:Vt,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:Ut,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],es=["Your priorities","How you like to receive help","Recurring projects","What you're trying to work through"],Zt={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A poster is a visual, creative job — so it's routed to a model actually built to compose images, not just describe them."},{title:"Assembling the right tools",sub:"Plus a quick, cheap research pass first, so the details are real — Odysseus doesn't end up looking generic."},{title:"Getting the advisor opinion",sub:"A fast visual check before it reaches you: is the composition solid, is the text legible?"},{title:"Delivering",sub:"Here's your poster — and what it actually cost, below."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},Qt={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A brand is really two jobs — naming and voice go to a model sharp with language, the logo direction goes to a visual one."},{title:"Assembling the right tools",sub:"The color palette is genuinely easy, so it's handed to something fast and cheap instead of a heavyweight."},{title:"Getting the advisor opinion",sub:"One more pass checks that the name, palette, and logo direction actually agree with each other."},{title:"Delivering",sub:"Here's your starter brand kit — and what it actually cost, below."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},Jt={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Numbers matter more than eloquence here, so it's routed to a model actually wired to live market data, not one guessing from memory."},{title:"Assembling the right tools",sub:"A live data feed pulls today's real figures — not a plausible-sounding hallucination."},{title:"Getting the advisor opinion",sub:"This is the kind of task where being wrong actually costs you, so the numbers get double-checked before delivery."},{title:"Delivering",sub:"Here's today's snapshot — and what it actually cost, below."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},ea={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Debugging needs a model actually tuned for code — not a generalist that's merely fluent in it."},{title:"Assembling the right tools",sub:"It also gets a sandbox: a place to actually run the fix and see if it works, instead of just predicting it."},{title:"Getting the advisor opinion",sub:"The result gets checked before it reaches you, catching the kind of bug that looks fine at a glance."},{title:"Delivering",sub:"Here's your fix — and what it actually cost, below."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},ts={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Conductor Mode is choosing the best model",sub:'It reads your whole request, then matches it to a model actually built for that kind of work — not just the "smartest" one available.'},{title:"Assembling the right tools",sub:"It grabs only what that specific job needs — nothing you're not using, nothing you're paying for and not touching."},{title:"Getting the advisor opinion",sub:"On anything that actually matters, a second pass quietly checks the work before you ever see it."},{title:"Delivering",sub:"That's the whole trick — and here's what it saves, below."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},as=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:Zt},{test:/coffee|brand|logo/i,scenario:Qt},{test:/market|trading|trade|stock|crypto/i,scenario:Jt},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:ea}],ss=[{prompt:"Make a poster for the Odyssey movie",scenario:Zt},{prompt:"Make me a coffee shop brand",scenario:Qt},{prompt:"How's the market today?",scenario:Jt},{prompt:"Debug this Python traceback",scenario:ea}];function yt(t){const a=as.find(({test:s})=>s.test(t));return(a==null?void 0:a.scenario)??ts}const Me=["All","Writing","Design","Code","Marketing"],os=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function Ye({onStartTask:t,align:a="start",intents:s=Qa}){const[o,n]=c.useState(null),i=s.find(l=>l.id===o),r=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${r}`,children:s.map(({id:l,label:d,icon:h,badge:g})=>{const x=o===l;return e.jsxs("button",{type:"button",onClick:()=>n(x?null:l),"aria-expanded":x,className:`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${x?"bg-white text-neutral-900":"bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(h,{className:`size-4 ${x?"text-neutral-500":"text-white/55"}`}),d,g&&e.jsx("span",{className:"absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white",children:g})]},l)})}),e.jsx(q,{mode:"wait",children:i&&e.jsx(p.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${r} ${a==="center"?"mx-auto":""}`,children:i.tasks.map((l,d)=>e.jsxs(p.button,{type:"button",onClick:()=>t(l),initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+d*.05,ease:[.16,1,.3,1]},className:"group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]",style:{fontFamily:"var(--font-google-sans)"},children:[l.label,e.jsx(R,{className:"size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]"})]},l.id))})},i.id)})]})}const ns="./images/monolito.png";function ta({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}){const r=c.useRef(null);return e.jsxs("section",{ref:r,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Za,{targetRef:r,image:ns}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(Xt,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(L,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(is,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function is({onEnterGuest:t,onStartTask:a}){const[s,o]=c.useState(""),n=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(ce,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>o(i.target.value),onKeyDown:i=>{i.key==="Enter"&&n()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:n,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(R,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ye,{onStartTask:a})})]})}const rs="./images/empresas.svg",ls=6;function aa(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(L,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:ls},(t,a)=>e.jsx("img",{src:rs,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
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
      `})]})}const bt="(min-width: 1024px) and (min-height: 560px)",wt="(prefers-reduced-motion: reduce)";function sa(){const t=()=>typeof window<"u"&&window.matchMedia(bt).matches&&!window.matchMedia(wt).matches,[a,s]=c.useState(t);return c.useEffect(()=>{const o=window.matchMedia(bt),n=window.matchMedia(wt),i=()=>s(o.matches&&!n.matches);return i(),o.addEventListener("change",i),n.addEventListener("change",i),()=>{o.removeEventListener("change",i),n.removeEventListener("change",i)}},[]),a}function oa(t,a,s){const o=c.useRef(s);o.current=s,c.useEffect(()=>{if(!a)return;const n=()=>{const i=t.current;if(!i)return;const r=i.offsetHeight-window.innerHeight;if(r<=0)return;const l=-i.getBoundingClientRect().top/r;o.current(l<0?0:l>1?1:l)};return n(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[a,t])}function Ve(t){const a=c.useRef(null),s=sa(),[o,n]=c.useState(0);return oa(a,s,r=>{n(Math.max(0,Math.min(t-1,Math.floor(r*t))))}),{trackRef:a,pinned:s,index:o,selectStep:r=>{const l=a.current;if(!s||!l){n(r);return}const d=l.getBoundingClientRect().top+window.scrollY,h=l.offsetHeight-window.innerHeight;window.scrollTo({top:d+h*((r+.5)/t),behavior:"smooth"})}}}function Se({trackRef:t,pinned:a,screens:s,children:o}){const n=c.useRef(null),[i,r]=c.useState(1);return c.useLayoutEffect(()=>{if(!a){r(1);return}const l=n.current;if(!l)return;const d=()=>{const g=l.offsetHeight,x=window.innerHeight-32;r(g>x?Math.max(.62,x/g):1)};d();const h=new ResizeObserver(d);return h.observe(l),window.addEventListener("resize",d),()=>{h.disconnect(),window.removeEventListener("resize",d)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(s)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:n,className:"sp-fit",style:i===1?void 0:{transform:`scale(${i})`},children:o})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function cs({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(le,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,s)=>e.jsxs(p.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},className:`pw-step${s===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(ds,{result:t.result})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function ds({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,s)=>e.jsx(p.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+s*.05,ease:[.16,1,.3,1]}},s))})]})}function ps({onStartTask:t}){const{trackRef:a,pinned:s,index:o,selectStep:n}=Ve(ue.length),i=ue[o];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Se,{trackRef:a,pinned:s,screens:ue.length,children:e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ue.map((r,l)=>{const d=l===o;return e.jsxs("button",{type:"button",onClick:()=>n(l),"aria-pressed":d,className:`uc-tab${d?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:r.blurb}),e.jsx("span",{className:"uc-tab-example",children:r.example})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"uc-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(cs,{useCase:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function hs({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:Ja.map(({id:a,label:s,icon:o,task:n},i)=>e.jsxs(p.button,{type:"button",onClick:()=>t(n),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:i%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(o,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:s}),e.jsx(R,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:n.label})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const xs=[{file:"OpenAI.svg",w:148,h:40},{file:"Claude.svg",w:160,h:34},{file:"Frame374.svg",w:151,h:34},{file:"Frame375.svg",w:137,h:40},{file:"Deepseek.svg",w:206,h:33},{file:"Kimi.svg",w:118,h:40}],vt=16,us=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],kt=.06,gs=.46,jt=.56,ms=.92,Nt=t=>t<0?0:t>1?1:t,U=(t,a,s)=>t+(a-t)*s,St=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function ge(t,a,s){const o=t.getBoundingClientRect();return{left:(o.left-a.left)/s,top:(o.top-a.top)/s,width:o.width/s,height:o.height/s}}function Ct(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function zt({label:t,innerRef:a,children:s}){return e.jsxs("div",{className:"ky-panel",ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function Ue(){const t=c.useRef(null),a=c.useRef(null),s=c.useRef(null),o=c.useRef(null),n=c.useRef(null),i=c.useRef(null),r=c.useRef(null),l=D(0),d=D(0),h=D(0),g=D(0),x=D(0),u=D(0),y=D(0),j=D(0),w=D(0),[v,E]=c.useState(!1),[T,F]=c.useState(!1),[z,A]=c.useState(!1),M=sa(),{scrollYProgress:$}=Ga({target:a,offset:["start 0.85","end 0.55"]});c.useEffect(()=>{const f=window.matchMedia("(prefers-reduced-motion: reduce)"),S=()=>A(f.matches);S(),f.addEventListener("change",S);const m=()=>{const I=a.current,b=s.current,B=o.current,_=n.current,ae=i.current;if(!I||!b||!B||!_||!ae)return;const W=I.getBoundingClientRect(),P=I.offsetWidth?W.width/I.offsetWidth:1,C=ge(_,W,P),H={x:C.left+C.width/2,y:C.top+C.height/2},O=ge(ae,W,P);r.current={conductor:H,you:Ct(ge(b,W,P),H),models:Ct(ge(B,W,P),H),result:{x:O.left+O.width/2,y:O.top}}};return m(),window.addEventListener("resize",m),()=>{window.removeEventListener("resize",m),f.removeEventListener("change",S)}},[]),c.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[M]);const k=f=>{const S=r.current;if(!S)return;const m=St(Nt((f-kt)/(gs-kt))),I=St(Nt((f-jt)/(ms-jt)));l.set(U(S.you.x,S.conductor.x,m)),d.set(U(S.you.y,S.conductor.y,m)),g.set(U(S.models.x,S.conductor.x,m)),x.set(U(S.models.y,S.conductor.y,m));const b=m<=0?0:m>.94?(1-m)/.06:Math.min(1,m/.08);h.set(b),u.set(b),y.set(U(S.conductor.x,S.result.x,I)),j.set(U(S.conductor.y,S.result.y,I)),w.set(I<=0?0:I>.93?(1-I)/.07:Math.min(1,I/.08)),E(m>.9),F(I>.88)};oa(t,M,k),ka($,"change",f=>{M||k(f)});const N=z||T;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Se,{trackRef:t,pinned:M,screens:2,children:e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:a,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(zt,{label:"You",innerRef:s,children:e.jsx("ul",{className:"ky-list",children:es.map(f=>e.jsx("li",{children:f},f))})}),e.jsxs("div",{className:`ky-conductor${v?" ky-conductor--hit":""}`,ref:n,children:[e.jsx(ce,{state:v?"thinking":"idle",depth:v?1:.35,size:16}),e.jsx("p",{className:"ky-conductor-label",children:"Conductor"})]}),e.jsx(zt,{label:"Available models",innerRef:o,children:e.jsx("div",{className:"ky-logos",children:xs.map(f=>e.jsx("img",{src:`./images/carousel/${f.file}`,alt:"",style:{height:vt,width:vt*(f.w/f.h)}},f.file))})})]}),e.jsxs("div",{className:`ky-result${N?" ky-result--lit":""}`,ref:i,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),!z&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx(p.span,{className:"ky-dot",style:{x:l,y:d,opacity:h}}),e.jsx(p.span,{className:"ky-dot",style:{x:g,y:x,opacity:u}}),e.jsx(p.span,{className:"ky-dot ky-dot--result",style:{x:y,y:j,opacity:w}})]})]})})})]})}),e.jsx(L,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:us.map((f,S)=>e.jsx(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:S*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:f.title}),e.jsx("p",{className:"ky-benefit-desc",children:f.desc})]})},f.title))})}),e.jsx("style",{children:`
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
      `})]})}function Ce({onStartFree:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-28 text-center md:py-36",children:e.jsx(L,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"The best AI for the job changes constantly. Starchild keeps up."}),e.jsx(p.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(p.button,{type:"button",onClick:()=>{},initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx(R,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})]})})})})}function fs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ta,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}),e.jsx(aa,{}),e.jsx(ps,{onStartTask:a}),e.jsx(hs,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(Ue,{})}),e.jsx(Ce,{onStartFree:l})]})}const ee="0 0 160 96",G="rgba(255,255,255,.26)",ve="rgba(255,255,255,.12)";function ys({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:ve,strokeWidth:"1"}),a.map((s,o)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":o},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:o===0?"var(--color-primary)":G,strokeWidth:o===0?1.6:1},s.y))]})}function bs({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,o)=>e.jsx("path",{className:"cg-feed",style:{"--i":o},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:G,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function ws({className:t=""}){return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:ve,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:G,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:ve,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function vs({className:t=""}){return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:ve,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:G,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function ks({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:G,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function js({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:ee,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:G,strokeWidth:"1"}),a.map((s,o)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":o},d:`M70 48 C 96 48, 100 ${s}, 126 ${s}`,stroke:G,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":o},cx:"132",cy:s,r:"2.6",fill:o===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},s)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const Ns=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:ys,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:bs,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:ws,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:vs,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:ks,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:js,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function Ss({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Ns.map(({id:a,tag:s,title:o,copy:n,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:o}),e.jsx(R,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:n})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const me=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function Cs({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(le,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(zs,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Ee({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function zs({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Ee,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(Ne,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Ee,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Ee,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Ls({onStartTask:t}){const{trackRef:a,pinned:s,index:o,selectStep:n}=Ve(me.length),i=me[o];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Se,{trackRef:a,pinned:s,screens:me.length,children:e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[me.map((r,l)=>{const d=l===o;return e.jsxs("button",{type:"button",onClick:()=>n(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:r.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",r.prompt,"”"]})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Cs,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Ts({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ta,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:o,onLogIn:n,onSignUp:i}),e.jsx(aa,{}),e.jsx(Ss,{onStartTask:a}),e.jsx(Ls,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(Ue,{})}),e.jsx(Ce,{onStartFree:l})]})}const Ms=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function na({onNavigateHome:t,onNavigateTraders:a,onLogIn:s,onSignUp:o}){const[n,i]=c.useState(!1),r=c.useRef(null);return c.useEffect(()=>{if(!n)return;const l=h=>{var g;(g=r.current)!=null&&g.contains(h.target)||i(!1)},d=h=>{h.key==="Escape"&&i(!1)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",d)}},[n]),e.jsxs("header",{className:"relative z-20 py-6",children:[e.jsx(L,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("nav",{className:"sh-nav","aria-label":"Main",children:[e.jsxs("div",{className:"sh-menu",ref:r,children:[e.jsxs("button",{type:"button",onClick:()=>i(l=>!l),"aria-expanded":n,"aria-haspopup":"true",className:`sh-trigger${n?" sh-trigger--open":""}`,children:["Starchild for",e.jsx(Be,{className:"sh-chevron size-3.5"})]}),n&&e.jsx("div",{className:"sh-panel",role:"menu",children:Ms.map(({id:l,label:d,route:h})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{i(!1),h==="traders"&&a()},className:"sh-item",children:d},l))})]}),e.jsx("button",{type:"button",onClick:()=>{},className:"sh-trigger",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"sh-trigger sh-trigger--badged",children:["Marketplace",e.jsx("span",{className:"sh-badge",children:"New"})]})]}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:o,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})}),e.jsx("style",{children:`
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
      `})]})}const K=22,Es=3.1,Ie=280,Is=14,Lt=3.4,ke=22,X=[122,138,154],Fe=[255,140,44],Tt=.34,Mt=.15,Fs=.08,As=14;function Ws(){return Array.from({length:ke},(t,a)=>{const s=a/(ke-1),o=Math.round(X[0]+(Fe[0]-X[0])*s),n=Math.round(X[1]+(Fe[1]-X[1])*s),i=Math.round(X[2]+(Fe[2]-X[2])*s),r=.09+.78*Math.pow(s,1.25);return{color:`rgba(${o},${n},${i},${r.toFixed(3)})`,size:Es+2.6*s,points:[]}})}function Ps({targetRef:t}){const a=c.useRef(null);return c.useEffect(()=>{const s=t.current,o=a.current,n=o==null?void 0:o.getContext("2d");if(!s||!o||!n)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=window.matchMedia("(hover: hover) and (pointer: fine)").matches,l=Ws();r&&s.classList.add("hero-c--fine");let d=0,h=0,g=0,x=0,u=-9999,y=-9999,j=-9999,w=-9999,v=-9999,E=-9999,T=0,F=0,z=!1,A=0,M=!1;const $=performance.now(),k=W=>{const P=(W-$)/1e3;if(n.clearRect(0,0,d,h),T>.01){const C=n.createRadialGradient(v,E,0,v,E,Ie*1.5);C.addColorStop(0,`rgba(248,70,0,${(.13*T).toFixed(3)})`),C.addColorStop(.45,`rgba(248,70,0,${(.05*T).toFixed(3)})`),C.addColorStop(1,"rgba(248,70,0,0)"),n.fillStyle=C,n.fillRect(0,0,d,h)}for(const C of l)C.points.length=0;for(let C=0;C<x;C++)for(let H=0;H<g;H++){const O=H*K-K,de=C*K-K;let ze=O+Math.sin(O*.021+de*.013+P*.55)*Lt,Le=de+Math.cos(O*.017-de*.019+P*.42)*Lt,Qe=.16+.14*(.5+.5*Math.sin(O*.011+de*.009-P*.7));if(T>.01){const Je=ze-v,et=Le-E,se=Math.hypot(Je,et);if(se<Ie){const tt=1-se/Ie,at=tt*tt*T;if(Qe+=at*1.15,se>.001){const st=at*Is;ze+=Je/se*st,Le+=et/se*st}}}const ca=Math.min(ke-1,Math.max(0,Math.round(Qe*(ke-1))));l[ca].points.push(ze,Le)}for(const C of l){if(C.points.length===0)continue;n.fillStyle=C.color;const H=C.size/2;for(let O=0;O<C.points.length;O+=2)n.fillRect(C.points[O]-H,C.points[O+1]-H,C.size,C.size)}if(r&&T>.01){const C=i?1:1+.16*(.5-.5*Math.cos(P/3.6*Math.PI*2)),H=As/2*C;n.save(),n.globalAlpha=T,n.shadowColor="rgba(248,70,0,.9)",n.shadowBlur=18,n.fillStyle="#f84600",n.beginPath(),n.arc(j,w,H,0,Math.PI*2),n.fill(),n.restore()}},N=()=>{const W=s.getBoundingClientRect(),P=Math.min(window.devicePixelRatio||1,2);d=Math.max(1,Math.round(W.width)),h=Math.max(1,Math.round(W.height)),o.width=Math.round(d*P),o.height=Math.round(h*P),o.style.width=`${d}px`,o.style.height=`${h}px`,n.setTransform(P,0,0,P,0,0),g=Math.ceil(d/K)+2,x=Math.ceil(h/K)+2,k(performance.now())},f=W=>{j+=(u-j)*Tt,w+=(y-w)*Tt,v+=(j-v)*Mt,E+=(w-E)*Mt,T+=(F-T)*Fs,k(W),A=requestAnimationFrame(f)},S=()=>{M||i||(M=!0,A=requestAnimationFrame(f))},m=()=>{M=!1,cancelAnimationFrame(A)},I=W=>{const P=s.getBoundingClientRect();u=W.clientX-P.left,y=W.clientY-P.top,z||(z=!0,j=v=u,w=E=y),F=1,i&&(j=v=u,w=E=y,T=1,k(performance.now()))},b=()=>{F=0,z=!1,i&&(T=0,k(performance.now()))},B=new IntersectionObserver(([W])=>W.isIntersecting?S():m(),{threshold:0});B.observe(s);const _=()=>document.hidden?m():S(),ae=new ResizeObserver(N);return ae.observe(s),s.addEventListener("pointermove",I),s.addEventListener("pointerleave",b),document.addEventListener("visibilitychange",_),N(),()=>{B.disconnect(),ae.disconnect(),s.removeEventListener("pointermove",I),s.removeEventListener("pointerleave",b),document.removeEventListener("visibilitychange",_),s.classList.remove("hero-c--fine"),m()}},[t]),e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"})}const ia=[{id:"talk",label:"Talk",icon:_e,tasks:[{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"},{id:"talk-decision",label:"Help me decide",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}]},{id:"research",label:"Research",icon:_t,tasks:[{id:"research-topic",label:"Look into something",basePrompt:"Look into this properly and come back with a real answer, not a pile of links.",question:"What should I dig into?"},{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I put side by side?"}]},{id:"build",label:"Build",icon:qt,tasks:[{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."},{id:"build-dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}]},{id:"work",label:"Work",icon:Va,tasks:[{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"},{id:"work-draft",label:"Draft something I owe someone",basePrompt:"Help me write the thing I've been putting off sending.",question:"Who's it for, and what does it need to say?"}]},{id:"organize",label:"Organize",icon:Kt,tasks:[{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"},{id:"organize-project",label:"Bring order to a project",basePrompt:"Take this project and give it a structure I can actually follow.",question:"What's the project?"}]}];function $s({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onLogIn:o,onSignUp:n}){const i=c.useRef(null);return e.jsxs("section",{ref:i,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Ps,{targetRef:i}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx(na,{onNavigateHome:()=>{},onNavigateTraders:s,onLogIn:o,onSignUp:n}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(L,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(Rs,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
      .hero-c { background-color: #07090a; }

      /* the mesh paints its own dot in place of the cursor, but never over
         things you need to aim at. Only set once a fine pointer is confirmed. */
      .hero-c--fine { cursor: none; }
      .hero-c--fine input, .hero-c--fine textarea { cursor: text; }
      .hero-c--fine button, .hero-c--fine a, .hero-c--fine [role="button"] { cursor: pointer; }

      .hero-c-vignette {
        position: absolute; inset: 0; z-index: 1; pointer-events: none;
        background:
          radial-gradient(120% 90% at 22% 45%, rgba(7,9,10,.86) 0%, rgba(7,9,10,.45) 42%, rgba(7,9,10,0) 72%),
          linear-gradient(180deg, rgba(7,9,10,.6), transparent 26%, rgba(7,9,10,.75));
      }
    `})]})}function Rs({onEnterGuest:t,onStartTask:a}){const[s,o]=c.useState(""),n=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-10 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>o(i.target.value),onKeyDown:i=>{i.key==="Enter"&&n()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:n,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(R,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ye,{onStartTask:a,intents:ia})})]})}const te="0 0 160 96",Q="rgba(255,255,255,.26)",J="rgba(255,255,255,.12)";function Os({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],s=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((o,n)=>e.jsx("line",{className:"cg-say",style:{"--i":n,transformOrigin:"left center"},x1:"14",y1:o.y,x2:14+o.w,y2:o.y,stroke:Q,strokeWidth:"1"},o.y)),s.map((o,n)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":n+2,transformOrigin:"right center"},x1:146-o.w,y1:o.y,x2:"146",y2:o.y,stroke:n===0?"var(--color-primary)":Q,strokeWidth:n===0?1.6:1},o.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function Bs({className:t=""}){const a=[{x:26,ys:[26,48,70]},{x:80,ys:[20,48,76]},{x:134,ys:[32,62]}];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--think ${t}`,fill:"none","aria-hidden":"true",children:[a[0].ys.map(o=>a[1].ys.map(n=>e.jsx("line",{x1:"26",y1:o,x2:"80",y2:n,stroke:J,strokeWidth:"1"},`${o}-${n}`))),a[1].ys.map(o=>a[2].ys.map(n=>e.jsx("line",{x1:"80",y1:o,x2:"134",y2:n,stroke:J,strokeWidth:"1"},`b${o}-${n}`))),e.jsx("path",{className:"cg-route",d:"M26 48 L80 20 L134 32",stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),a.map(({x:o,ys:n})=>n.map(i=>e.jsx("circle",{cx:o,cy:i,r:"2.2",fill:"rgba(255,255,255,.34)"},`${o}-${i}`))),e.jsx("circle",{cx:"134",cy:"32",r:"3",fill:"var(--color-primary)"})]})}function Hs({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:J,strokeWidth:"1"}),a.map((s,o)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":o},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:o===0?"var(--color-primary)":Q,strokeWidth:o===0?1.6:1},s.y))]})}function Ds({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,o)=>e.jsx("path",{className:"cg-feed",style:{"--i":o},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:Q,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function qs({className:t=""}){return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:J,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:Q,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:J,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function _s({className:t=""}){const a=[{x:18,y:20,w:34,h:12,dx:9,dy:-6},{x:18,y:38,w:34,h:12,dx:-7,dy:5},{x:18,y:56,w:34,h:12,dx:6,dy:8},{x:63,y:20,w:34,h:12,dx:-8,dy:7},{x:63,y:38,w:34,h:12,dx:7,dy:-8},{x:108,y:20,w:34,h:12,dx:8,dy:9}];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--organize ${t}`,fill:"none","aria-hidden":"true",children:[[35,80,125].map(s=>e.jsx("line",{x1:s,y1:"14",x2:s,y2:"82",stroke:J,strokeWidth:"1"},s)),a.map((s,o)=>e.jsx("rect",{className:"cg-block",style:{"--dx":`${s.dx}px`,"--dy":`${s.dy}px`,"--i":o},x:s.x,y:s.y,width:s.w,height:s.h,rx:"3",stroke:o===0?"var(--color-primary)":Q,strokeWidth:o===0?1.4:1},`${s.x}-${s.y}`))]})}const Gs=[{id:"talk",tag:"Conversation",title:"Talk",copy:"Talk things through with an AI that gets to know you.",art:Os,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"think",tag:"Decisions",title:"Think",copy:"Work through ideas, questions, and decisions together.",art:Bs,task:{id:"think-decision",label:"Think through a decision",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}},{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's on your plate.",art:Hs,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"explore",tag:"Curiosity",title:"Explore",copy:"Learn, compare, and make sense of things.",art:Ds,task:{id:"explore-topic",label:"Make sense of something",basePrompt:"Help me understand this properly — what matters, what doesn't, and why.",question:"What do you want to get to the bottom of?"}},{id:"create",tag:"Make",title:"Create",copy:"Turn an idea into something real.",art:qs,task:{id:"create-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"organize",tag:"Structure",title:"Organize",copy:"Bring structure to tasks, projects, and recurring work.",art:_s,task:{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"}}];function Ys({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Gs.map(({id:a,tag:s,title:o,copy:n,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:o}),e.jsx(R,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:n})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const fe=[{id:"monitor",label:"Keep an eye on something",blurb:"Starchild can follow what changes and bring you what matters.",prompt:"Let me know when flights to Tokyo drop below $700.",panel:{kind:"monitor",agentName:"Tokyo flights",cadence:"Checking every hour",sources:["Google Flights","Skyscanner","Airlines","Fare alerts"],checks:[{time:"09:00",text:"Checked 6 airlines — cheapest $842"},{time:"13:00",text:"Checked 6 airlines — cheapest $828"},{time:"17:40",text:"Dropped below your $700",hit:!0}],alert:{heading:"Worth your attention",title:"Tokyo in October — $684 return",detail:"Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Take care of a routine",blurb:"Let Starchild handle something you do again and again.",prompt:"Every Sunday, help me plan the week ahead.",panel:{kind:"recurring",agentName:"Week ahead",uses:["Calendar","Gmail","Notes","Reminders"],runs:"Every Sunday at 6:00 PM",outputName:"Plan for the week",output:{heading:"This week",items:[{text:"Thursday is your only clear day",note:"the one to protect"},{text:"Two deadlines both land on Friday",note:"start the smaller one Tuesday"},{text:"Dentist still isn't booked",note:"third week it's slipped"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Give it a job",blurb:"Tell Starchild what you want done, what matters, and when to step in.",prompt:"Plan our trip in October. You know the budget and the dates — check with me before booking anything.",panel:{kind:"config",agentName:"October trip",fields:[{label:"The job",value:"Plan the trip end to end"},{label:"What matters",value:"Budget, the dates, who's coming"},{label:"When to step in",value:"Ask me before booking anything"}],tools:["Web","Gmail","Calendar","Maps"],status:"Active · first plan ready tomorrow"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}];function Vs({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"",width:16,height:16,className:"size-4 shrink-0"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Us,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Ae({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Us({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Ae,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(Ne,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Ae,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Ae,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Ks({onStartTask:t}){const{trackRef:a,pinned:s,index:o,selectStep:n}=Ve(fe.length),i=fe[o];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Se,{trackRef:a,pinned:s,screens:fe.length,children:e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Give it something to keep track of, repeat, or take care of over time."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[fe.map((r,l)=>{const d=l===o;return e.jsxs("button",{type:"button",onClick:()=>n(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(q,{initial:!1,children:d&&e.jsx(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:e.jsx("span",{className:"ag-tab-blurb",children:r.blurb})})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Vs,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Xs({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:o,onOpenMarketplace:n,onLogIn:i,onSignUp:r}){const l=c.useRef(null),d=()=>t();return e.jsxs("div",{children:[e.jsx($s,{onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:o,onOpenMarketplace:n,onLogIn:i,onSignUp:r}),e.jsx(Ys,{onStartTask:a}),e.jsx(Ks,{onStartTask:a}),e.jsx("div",{ref:l,children:e.jsx(Ue,{})}),e.jsx(Ce,{onStartFree:d})]})}const Zs=[{title:"Market research",copy:"Funding, liquidations, volatility and context."},{title:"Structured strategy",copy:"Entry, exit, sizing and invalidation rules."},{title:"Controlled execution",copy:"Orders on Hyperliquid, inside the permissions you approved."},{title:"24/7 monitoring",copy:"Jobs, alerts and automatic reports."},{title:"Visibility",copy:"Dashboards for PnL, margin, risk and positions."}],Qs=[{n:"01",title:"Connect Starchild to Hyperliquid",copy:"Choose how Starchild is allowed to operate on Hyperliquid."},{n:"02",title:"Design the strategy with the agent",copy:"Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules."},{n:"03",title:"Fund the strategy",copy:"Deposit USDC and make available the balance the strategy will use."},{n:"04",title:"Monitor performance and risk",copy:"Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you."}],Js=[{method:"Native Agent Wallet",custody:"Non-custodial (Privy); exportable key.",edge:"The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”."},{method:"Hyperliquid API wallet",custody:"Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",edge:"More separation between custody and execution; the credential goes through a secure flow, never through the chat."},{method:"Third-party builders",custody:"A trading account you authorize separately.",edge:"Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard)."}],eo=["Trend","Volatility","Book liquidity","Funding","Open interest","Liquidations","Market context"],to=[{title:"Independent strategies",copy:"Each asset or strategy carries its own rules, capital, positions, orders, performance and logs."},{title:"Shared execution layer",copy:"Checks balances and permissions before any order is submitted."},{title:"Independent risk layer",copy:"Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",hard:!0}];function ao({onNavigateHome:t,onEnterGuest:a,onLogIn:s,onSignUp:o}){const n=()=>a("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");return e.jsxs("div",{className:"tr-page",children:[e.jsx(na,{onNavigateHome:t,onNavigateTraders:()=>window.scrollTo({top:0,behavior:"smooth"}),onLogIn:s,onSignUp:o}),e.jsx("section",{className:"pt-8 pb-24 md:pt-10 md:pb-32",children:e.jsxs(L,{children:[e.jsxs("nav",{className:"tr-crumbs","aria-label":"Breadcrumb",children:[e.jsxs("button",{type:"button",onClick:t,className:"tr-crumb-link",children:[e.jsx(je,{className:"size-3.5"}),"Home"]}),e.jsx("span",{className:"tr-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"tr-crumb-here","aria-current":"page",children:"For Traders"})]}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6 md:mt-20",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"tr-eyebrow",children:"Starchild for traders · Hyperliquid"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you know about the market into a strategy that runs."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Turn your trading logic into rules, research the market, execute on Hyperliquid and keep the strategy monitored around the clock."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:n,className:"tr-cta",children:["Build a strategy",e.jsx(R,{className:"size-3.5 rotate-45"})]}),e.jsx("span",{className:"tr-cta-note",children:"No account needed to start"})]})]})})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(L,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("h2",{className:"tr-h2",children:"From knowledge to execution."}),e.jsx("p",{className:"tr-lead",children:"Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the decision layer: you explain your logic, set the conditions and the limits, and the agent turns that into an executable flow — research, execution, risk control and continuous monitoring."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-label",children:"What Starchild turns into a system"}),e.jsx("ul",{className:"tr-system",children:Zs.map(({title:i,copy:r})=>e.jsxs("li",{children:[e.jsx("span",{className:"tr-system-title",children:i}),e.jsx("span",{className:"tr-system-copy",children:r})]},i))})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(L,{children:[e.jsx("h2",{className:"tr-h2 max-w-[24ch]",children:"Trade perps with an agent, in four steps."}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Qs.map(({n:i,title:r,copy:l},d)=>e.jsxs(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:d%4*.06,ease:[.16,1,.3,1]},className:"tr-step col-span-12 sm:col-span-6 lg:col-span-3",children:[e.jsx("span",{className:"tr-step-n",children:i}),e.jsx("span",{className:"tr-step-title",children:r}),e.jsx("span",{className:"tr-step-copy",children:l})]},i))})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsxs(L,{children:[e.jsx("p",{className:"tr-step-tag",children:"Step 1"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[26ch]",children:"Connect Starchild to Hyperliquid."}),e.jsx("p",{className:"tr-lead mt-5 max-w-[70ch]",children:"The first decision is how Starchild is allowed to operate. There are three routes: the native Agent Wallet, a Hyperliquid API wallet, or a third-party builder."}),e.jsxs("div",{className:"tr-table mt-12",children:[e.jsxs("div",{className:"tr-tr tr-tr--head",children:[e.jsx("span",{children:"Method"}),e.jsx("span",{children:"Custody"}),e.jsx("span",{children:"What it gives you"})]}),Js.map(({method:i,custody:r,edge:l})=>e.jsxs("div",{className:"tr-tr",children:[e.jsx("span",{className:"tr-td-method",children:i}),e.jsx("span",{children:r}),e.jsx("span",{children:l})]},i))]})]})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsx(L,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-6",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 2"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Design the strategy with the agent."}),e.jsx("p",{className:"tr-lead mt-5",children:"Instead of trading order by order, tell Starchild how you read the market, what you're trying to reach and which risks you accept. The agent researches, then helps turn that into a structured strategy — entry, position size, exit, invalidation and risk limits, all before anything executes."}),e.jsx("p",{className:"tr-label mt-10",children:"What the agent can weigh"}),e.jsx("div",{className:"tr-chips",children:eo.map(i=>e.jsx("span",{className:"tr-chip",children:i},i))}),e.jsxs("p",{className:"tr-flow",children:["your logic ",e.jsx("span",{"aria-hidden":"true",children:"→"})," analysis ",e.jsx("span",{"aria-hidden":"true",children:"→"})," rules"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})," strategy"]})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-5 lg:col-start-8",children:[e.jsxs("div",{className:"tr-prompt",children:[e.jsx("p",{className:"tr-label",children:"Example prompt"}),e.jsx("p",{className:"tr-prompt-body",children:"“I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity and funding, and help me define entry, position size, invalidation, max loss and two exit scenarios. Don't execute anything yet.”"}),e.jsxs("button",{type:"button",onClick:n,className:"tr-prompt-cta",children:["Try this",e.jsx(R,{className:"size-3.5 rotate-45"})]})]}),e.jsx("p",{className:"tr-label mt-12",children:"Risk architecture, in layers"}),e.jsx("div",{className:"tr-layers",children:to.map(({title:i,copy:r,hard:l})=>e.jsxs("div",{className:`tr-layer${l?" tr-layer--hard":""}`,children:[e.jsx("span",{className:"tr-layer-title",children:i}),e.jsx("span",{className:"tr-layer-copy",children:r})]},i))})]})]})})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(L,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 3"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[18ch]",children:"Fund the strategy."}),e.jsx("p",{className:"tr-lead mt-5",children:"Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid. No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets you already hold."}),e.jsxs("div",{className:"tr-approvals",children:[e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 1"}),e.jsx("span",{className:"tr-approval-copy",children:"Enables trading through the Agent Wallet."})]}),e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 2"}),e.jsx("span",{className:"tr-approval-copy",children:"Authorizes Starchild's builder code, within the fee limit you approved."})]})]}),e.jsx("p",{className:"tr-note",children:"After those two, the strategy can execute — inside the permissions and limits you set."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 4"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Monitor performance and risk."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and the health of the strategy. Those checks are what feed the alerts and the reports."}),e.jsxs("div",{className:"tr-cards",children:[e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Daily report"}),e.jsx("span",{className:"tr-card-copy",children:"Positions, realized and unrealized PnL, funding, fees, margin, exceptions and recommended actions."})]}),e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Alerts by exception"}),e.jsx("span",{className:"tr-card-copy",children:"Silent while everything is healthy. When something needs attention, the alert arrives with the context and a recommended action."})]})]}),e.jsx("p",{className:"tr-note",children:"It can also build custom dashboards — positions, margin, leverage, distance to liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's HyperTracker, HypurrScan and the Hyperliquid Explorer."})]})]})})}),e.jsx("section",{className:"py-28 text-center md:py-36",children:e.jsx(L,{children:e.jsxs("div",{className:"mx-auto flex max-w-[46ch] flex-col items-center gap-8",children:[e.jsx("h2",{className:"text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"You define the logic and the limits. Starchild keeps it running."}),e.jsx("p",{className:"tr-lead text-center",children:"Research, rules, execution inside approved permissions, risk control and continuous monitoring — one cycle instead of five tools."}),e.jsxs("button",{type:"button",onClick:n,className:"tr-cta",children:["Build a strategy",e.jsx(R,{className:"size-3.5 rotate-45"})]}),e.jsxs("div",{className:"tr-tags",children:[e.jsx("span",{children:"Repeatable"}),e.jsx("span",{children:"Monitorable"}),e.jsx("span",{children:"Verifiable"})]})]})})}),e.jsx("style",{children:`
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
        .tr-lead { font-size: 16px; line-height: 1.65; color: rgba(255,255,255,.58); max-width: 60ch; }
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
      `})]})}const Et=["a","b","c"];function so({variant:t,onChange:a}){const s=Math.max(0,Et.indexOf(t));return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${t.toUpperCase()}`,children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${s*32}px)`},children:t.toUpperCase()}),Et.map(o=>e.jsx("button",{type:"button",role:"radio","aria-checked":o===t,"aria-label":`Landing version ${o.toUpperCase()}`,onClick:()=>a(o),className:`vt-side${o===t?" vt-side--on":""}`,children:o.toUpperCase()},o))]}),e.jsx("style",{children:`
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
      `})]})}function oo({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function no({name:t,tagline:a,colors:s}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:s.map(o=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:o},title:o},o))})]})}function io({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function ro({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function lo({deliverable:t}){switch(t.kind){case"poster":return e.jsx(oo,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(no,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(io,{rows:t.rows});case"code":return e.jsx(ro,{language:t.language,snippet:t.snippet});case"none":return null}}const oe="./icons/",co={gemini:`${oe}gemini.svg`,openai:`${oe}openai.svg`,xai:`${oe}xai.svg`,deepseek:`${oe}deepseek.svg`,"ai-generic":`${oe}ai-generic.svg`};function po({stat:t}){const{withoutTokens:a,withTokens:s}=t,[o,n]=c.useState(!1),[i,r]=c.useState(!1),l=c.useRef(void 0),d=a-s;c.useEffect(()=>(r(window.matchMedia("(hover: hover) and (pointer: fine)").matches),()=>window.clearTimeout(l.current)),[]),c.useEffect(()=>{if(!o)return;const x=u=>{u.key==="Escape"&&n(!1)};return document.addEventListener("keydown",x),()=>document.removeEventListener("keydown",x)},[o]);const h=()=>{window.clearTimeout(l.current),n(!0)},g=()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>n(!1),140)};return e.jsxs("div",{className:"relative self-start",children:[e.jsxs("div",{className:"flex items-center gap-2.5 rounded-full border border-[#f84600]/30 bg-[#f84600]/[0.08] py-2.5 pr-3.5 pl-4",children:[e.jsx("span",{className:"size-2 shrink-0 rounded-full bg-[#f84600]","aria-hidden":"true"}),e.jsxs("p",{className:"text-[14px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode just saved you"," ",e.jsx("span",{className:"tabular-nums",children:d.toLocaleString("en-US")})," ","tokens"]}),e.jsx("button",{type:"button",onClick:()=>n(x=>!x),onPointerEnter:i?h:void 0,onPointerLeave:i?g:void 0,onFocus:i?h:void 0,onBlur:i?g:void 0,"aria-expanded":o,"aria-label":"How this saving was estimated",className:"rounded-full p-0.5 text-[#f84600]/60 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70",children:e.jsx(Ka,{className:"size-4"})})]}),o&&(i?e.jsx(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.22,ease:[.16,1,.3,1]},onPointerEnter:h,onPointerLeave:g,role:"tooltip",className:"absolute bottom-[calc(100%+10px)] left-0 z-40 w-[min(440px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:e.jsx(ra,{stat:t})}):e.jsx(ho,{stat:t,onClose:()=>n(!1)}))]})}function ra({stat:t}){const{withoutLabel:a,withoutTokens:s,withLabel:o,withTokens:n}=t,i=Math.round((1-n/s)*100);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Estimated savings on this task"}),e.jsxs("span",{className:"flex shrink-0 items-center gap-1.5 rounded-full bg-[#f84600]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]","aria-hidden":"true"}),"Conductor Mode"]})]}),e.jsx("div",{className:"mt-4 flex flex-col gap-3",children:[{label:a,tokens:s,accent:!1},{label:o,tokens:n,accent:!0}].map(r=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"w-[132px] shrink-0 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:r.label}),e.jsx("div",{className:"h-2 flex-1 overflow-hidden rounded-full bg-white/10",children:e.jsx(p.div,{className:`h-full rounded-full ${r.accent?"bg-[#f84600]":"bg-white/25"}`,initial:{width:0},animate:{width:`${r.tokens/s*100}%`},transition:{duration:.7,ease:[.16,1,.3,1],delay:.15}})}),e.jsx("span",{className:"w-[74px] shrink-0 text-right text-[12.5px] tabular-nums text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:r.tokens.toLocaleString("en-US")})]},r.label))}),e.jsxs("p",{className:"mt-4 text-[13.5px] font-medium text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:["~",i,"% fewer tokens burned on this exact task."]}),e.jsx("p",{className:"mt-1 text-[11.5px] text-white/35 italic",style:{fontFamily:"var(--font-google-sans)"},children:"Illustrative estimate for this demo — not a live token count."})]})}function ho({stat:t,onClose:a}){return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm",role:"dialog","aria-modal":"true","aria-label":"Estimated savings on this task",onClick:a,children:e.jsxs(p.div,{initial:{opacity:0,y:10,scale:.98},animate:{opacity:1,y:0,scale:1},transition:{duration:.28,ease:[.16,1,.3,1]},onClick:s=>s.stopPropagation(),className:"w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:[e.jsx(ra,{stat:t}),e.jsx("button",{type:"button",onClick:a,className:"mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]",style:{fontFamily:"var(--font-google-sans)"},children:"Close"})]})})}function xo({scenario:t,onStep:a,onDone:s}){const{steps:o,models:n,deliverable:i,stat:r}=t,[l,d]=c.useState(0),[h,g]=c.useState(!1);c.useEffect(()=>{d(0),g(!1)},[t]),c.useEffect(()=>{if(a==null||a(),l>=o.length){const y=setTimeout(()=>{g(!0),s==null||s()},500);return()=>clearTimeout(y)}const u=setTimeout(()=>d(y=>y+1),700);return()=>clearTimeout(u)},[l,o]);const x=h?100:Math.min(l,o.length)/o.length*100;return e.jsxs("div",{className:"relative flex flex-col gap-6 py-1 pl-1",children:[e.jsx("div",{className:"absolute top-1 bottom-1 left-[7px] w-px bg-white/12","aria-hidden":"true",children:e.jsx(p.div,{className:"w-px bg-[#f84600]",initial:{height:0},animate:{height:`${x}%`},transition:{duration:.4,ease:"easeOut"}})}),o.slice(0,l).map((u,y)=>{const j=y===l-1&&!h,w=y===o.length-1;return e.jsxs(p.div,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsxs("span",{className:`relative z-10 mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${j||w&&h?"border-[#f84600] bg-[#0a0a0a]":"border-white/25 bg-[#0a0a0a]"}`,children:[j&&e.jsx(p.span,{className:"size-1.5 rounded-full bg-[#f84600]",animate:l===o.length?{scale:[1,1.4,1]}:{},transition:{duration:.9,repeat:1/0}}),w&&h&&e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-[14.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:u.title}),e.jsx("p",{className:"mt-1 text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:u.sub}),y===0&&e.jsx("div",{className:"mt-2.5 flex flex-wrap gap-1.5",children:n.map(v=>e.jsxs("span",{className:"flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5",children:[e.jsx("img",{src:co[v.icon],alt:"",className:"size-3.5 object-contain"}),e.jsx("span",{className:"text-[11.5px] font-medium text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:v.name})]},v.name))}),w&&h&&e.jsxs(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"mt-4 flex flex-col gap-4",children:[i.kind!=="none"&&e.jsx(lo,{deliverable:i}),e.jsx(po,{stat:r})]})]})]},u.title)})]})}function uo({tasksRemaining:t,onLockedFeature:a}){return e.jsxs("div",{className:"hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex",children:[e.jsx(le,{className:"size-6"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[12px] leading-relaxed text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:"You're trying Starchild with limited access. Create an account to save what Starchild learns about you and continue anywhere."})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Available"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:ft.available.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-[12.5px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Ne,{className:"size-3 text-emerald-400"}),s]},s))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Requires account"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:ft.locked.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:a,className:"flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Gt,{className:"size-3 shrink-0"}),s]})},s))})]}),e.jsx("div",{className:"mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center",children:e.jsxs("p",{className:"text-[12px] font-medium text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:[Math.max(t,0)," guest interaction",t===1?"":"s"," remaining"]})})]})}function Ke({heading:t,sub:a,ctaLabel:s="Create account & continue",backLabel:o="Sign up",footerNote:n="Already have an account?",showForm:i=!0,onBack:r,onContinue:l}){const[d,h]=c.useState(""),[g,x]=c.useState(""),u=!i||d.trim()!==""&&g.trim()!=="";return e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[r&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:r,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(je,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:o})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(Gt,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[i&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:d,onChange:y=>h(y.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:g,onChange:y=>x(y.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:l,disabled:!u,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[n," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}function go({onBack:t,intents:a,onRequestSignup:s,onLogIn:o,initialMessage:n,openingMessage:i,task:r,isGuest:l=!1}){const[d,h]=c.useState(n??null),[g,x]=c.useState(n?yt(n):null),[u,y]=c.useState(!1),[j,w]=c.useState(""),v=l,[E,T]=c.useState(n?1:2),[F,z]=c.useState(null),A=c.useRef(null),[M,$]=c.useState(r),[k,N]=c.useState(i);function f(b,B){z({heading:b,sub:B})}function S(b){$(b),N(b.question)}function m(b){const B=b.trim();if(B){if(v&&E<=0){f("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}h(B),x(yt(M?`${M.basePrompt} ${B}`:B)),v&&T(_=>_-1)}}function I(){var b;(b=A.current)==null||b.scrollIntoView({behavior:"smooth",block:"end"})}return c.useEffect(()=>{const b=setTimeout(I,50);return()=>clearTimeout(b)},[d,u]),e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[v?e.jsx(uo,{tasksRemaining:E,onLockedFeature:()=>f("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience.")}):e.jsx("div",{className:"hidden w-14 shrink-0 flex-col items-center border-r border-white/[0.08] pt-6 md:flex",children:e.jsx(le,{className:"size-6"})}),F&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:b=>{b.target===b.currentTarget&&z(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(Ke,{heading:F.heading,sub:F.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{z(null),s==null||s()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(je,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode"}),v&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var b;return(b=o??s)==null?void 0:b()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:d===null?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[k?e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[M&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:M.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(ce,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:k})]})]}):e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(Ye,{onStartTask:S,align:"center",intents:a})}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:j,onChange:b=>w(b.target.value),onKeyDown:b=>{b.key==="Enter"&&m(j)},placeholder:k?"Answer however you like…":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!k}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(we,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{type:"button",className:"flex items-center gap-1 text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Be,{className:"size-3 text-white/35"})]}),e.jsx("button",{type:"button",onClick:()=>m(j||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:j.trim()?e.jsx(R,{className:"size-4"}):e.jsx(ut,{className:"size-4"})})]})]})]})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("div",{className:"max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:d})}),e.jsx(xo,{scenario:g,onStep:I,onDone:()=>y(!0)}),u&&v&&e.jsxs(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.35},className:"flex items-center justify-between gap-4 rounded-2xl border border-[#f84600]/30 bg-[#f84600]/[0.08] px-5 py-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[13.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Keep what you just created."}),e.jsx("p",{className:"mt-0.5 text-[12.5px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Create your free account to save this project and unlock the full Starchild experience."})]}),e.jsx("button",{type:"button",onClick:()=>f("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience."),className:"shrink-0 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Create free account"})]}),e.jsx("div",{ref:A})]})}),d!==null&&e.jsx("div",{className:"shrink-0 border-t border-white/[0.08] px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5",children:[e.jsx("button",{type:"button",className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(we,{className:"size-4"})}),e.jsx("input",{disabled:!0,placeholder:u?"Monetize, meet the marketplace":"Ask Conductor anything…",className:"flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("span",{className:"flex items-center gap-1 text-[12.5px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Be,{className:"size-3 text-white/35"})]}),e.jsx("span",{className:"flex size-8 items-center justify-center rounded-full bg-[#f84600] text-white",children:e.jsx(ut,{className:"size-3.5"})})]})})]})]})}const mo={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function fo({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(L,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:ss.map(({prompt:a,scenario:s},o)=>e.jsxs(p.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:o*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:mo[s.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx(R,{className:"size-4 rotate-45"})})]},s.id))})]})})}function yo({onNavigateHome:t,onOpenMarketplace:a,onTry:s,onLogIn:o,onSignUp:n}){const i=c.useRef(null);function r(){var l;(l=i.current)==null||l.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(Xt,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:o,onSignUp:n}),e.jsxs(L,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>s(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:r,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(wa,{onTryConductorMode:()=>s()}),e.jsx("div",{ref:i,children:e.jsx(fo,{onTryExample:l=>s(l)})}),e.jsx(Ce,{onStartFree:()=>s()})]})}const We=[{Icon:_e,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:Ge,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:Yt,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function bo({onDone:t}){const[a,s]=c.useState(0),o=We[a],n=a===We.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(q,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(o.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:o.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:o.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:We.map((i,r)=>e.jsx("button",{type:"button",onClick:()=>s(r),"aria-label":`Go to slide ${r+1}`,className:`h-1.5 rounded-full transition-all ${r===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},r))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>n?t():s(i=>i+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:n?"Ok, let's go":"Next"})]})]})}function wo({intent:t,skillTitle:a,onBack:s,onContinue:o}){const n=t==="create"?"Create a free account to list your skill":"Create a free account to get this skill",i=t==="create"?"So buyers know who built it, and payouts land somewhere real.":`So "${a}" lands in your library and the seller actually gets paid.`;return e.jsx(Ke,{heading:n,sub:i,onBack:s,onContinue:o})}const vo={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function ko(t){return vo[t]??{bg:"#e5e5e5",text:"#404040"}}function jo({skill:t,onSelect:a}){const s=ko(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:o=>{a&&(o.key==="Enter"||o.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:s.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:s.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function No({open:t,onClose:a,skills:s,onAddSkill:o}){const[n,i]=c.useState("onboarding"),[r,l]=c.useState("All"),[d,h]=c.useState(""),[g,x]=c.useState(""),[u,y]=c.useState(""),[j,w]=c.useState(""),[v,E]=c.useState(Me[2]),[T,F]=c.useState(null),[z,A]=c.useState(null);c.useEffect(()=>{t&&(i("onboarding"),F(null),A(null))},[t]);function M(){F("create"),i("auth")}function $(m){F("buy"),A(m),i("auth")}function k(){i(T==="create"?"create":"purchased")}function N(){g.trim()&&(o({id:`${g.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:g.trim(),price:j.trim()||"$5",category:v,blurb:u.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),x(""),y(""),w(""),i("grid"))}const f=d.trim().toLowerCase(),S=s.filter(m=>{const I=r==="All"||m.category===r,b=!f||m.title.toLowerCase().includes(f)||m.blurb.toLowerCase().includes(f)||m.category.toLowerCase().includes(f);return I&&b});return e.jsx(q,{children:t&&e.jsx(p.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:m=>{m.target===m.currentTarget&&a()},children:e.jsxs(p.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(Ya,{className:"size-4"})})]}),e.jsx(q,{mode:"wait",children:n==="onboarding"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(bo,{onDone:()=>i("grid")})},"onboarding"):n==="grid"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:M,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl bg-white/10",children:e.jsx(le,{className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(m=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${m===0?"w-4 bg-[#f84600]":"w-1.5 bg-white/20"}`},m))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(Yt,{className:"size-4 text-white/40"}),e.jsx("input",{value:d,onChange:m=>h(m.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:Me.map(m=>e.jsx("button",{type:"button",onClick:()=>l(m),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${r===m?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:m},m))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[S.map(m=>e.jsx(jo,{skill:m,onSelect:m.mine?void 0:()=>$(m)},m.id)),e.jsxs("button",{type:"button",onClick:M,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(we,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]})]})]},"grid"):n==="create"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(je,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:g,onChange:m=>x(m.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:u,onChange:m=>y(m.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:j,onChange:m=>w(m.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:v,onChange:m=>E(m.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:Me.filter(m=>m!=="All").map(m=>e.jsx("option",{value:m,children:m},m))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:N,disabled:!g.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(we,{className:"size-3.5"}),"add"]})})]},"create"):n==="auth"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(wo,{intent:T==="create"?"create":"buy",skillTitle:z==null?void 0:z.title,onBack:()=>i("grid"),onContinue:k})},"auth"):e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(Ne,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',z==null?void 0:z.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const la={tone:50,initiative:50},So=[{id:"building",label:"Building something of my own",context:"Founder or solo builder",behavior:"Bias toward momentum and shipping over analysis"},{id:"team",label:"Working with a team or company",context:"Works inside an organization",behavior:"Account for stakeholders and existing process"},{id:"studying",label:"Studying and exploring",context:"Learning phase, low commitment",behavior:"Explain the reasoning, not just the answer"},{id:"changing",label:"Changing direction",context:"In transition",behavior:"Hold options open before narrowing"},{id:"caring",label:"Taking care of other people",context:"Limited discretionary time",behavior:"Keep suggestions short and low-effort"},{id:"energy",label:"Trying to regain energy",context:"Low capacity right now",behavior:"One step at a time, never a backlog"}],Co=[{id:"work",label:"Work and direction",context:"Career focus",behavior:"Lead with work-shaped examples"},{id:"own",label:"Building something of my own",context:"Personal project focus",behavior:"Prioritize build and launch help"},{id:"money",label:"Money and security",context:"Financial focus",behavior:"Be concrete about tradeoffs and numbers"},{id:"people",label:"Relationships and family",context:"Personal life focus",behavior:"Stay conversational, avoid task framing"},{id:"health",label:"Health and energy",context:"Wellbeing focus",behavior:"Respect capacity, avoid pressure"},{id:"life",label:"The kind of life I want",context:"Direction-level focus",behavior:"Ask before advising"},{id:"unsure",label:"I'm not sure yet",context:"Focus not yet named",behavior:"Help name it before solving it"}],zo=[{id:"alone",label:"Think it through on my own",context:"Internal processor",behavior:"Give enough context to decide alone; don't flood with options"},{id:"talk",label:"Talk until I understand what I think",context:"External processor",behavior:"Ask more than assert; reflect back what you hear"},{id:"act",label:"Start doing something and figure it out",context:"Learns by moving",behavior:"Offer a first step, not a full plan"},{id:"research",label:"Research until I feel prepared",context:"Needs groundwork first",behavior:"Bring sources and context up front"},{id:"pause",label:"Put it aside until I have more energy",context:"Avoids under load",behavior:"Keep it small; never present a pile of work"}],Lo={building:"in a stretch where you're trying to build something of your own",team:"working inside a team, with other people's plans in the mix",studying:"in an exploring phase, still gathering more than deciding",changing:"somewhere in the middle of changing direction",caring:"carrying a fair amount for other people right now",energy:"trying to get your energy back before taking on more"},To={work:"work and where it's heading",own:"the thing you're trying to build",money:"money and feeling secure",people:"the people close to you",health:"your health and energy",life:"what kind of life you actually want",unsure:"something you haven't quite put words to yet"},It={alone:{observation:"You tend to work things out on your own before saying them out loud",consequence:"so I'll try to give you enough to decide with, without burying you in options"},talk:{observation:"You seem to find what you think by talking it through",consequence:"so I'll ask more than I assert, and play back what I'm hearing"},act:{observation:"You'd rather start moving and adjust than plan it all first",consequence:"so I'll aim at a first step instead of a finished plan"},research:{observation:"You like to feel prepared before you commit to something",consequence:"so I'll bring the groundwork up front rather than after"},pause:{observation:"You tend to set things down when they get heavy",consequence:"so I'll keep things small and won't hand you a pile"}},Mo={work:"helping you get clearer on the direction before you commit to it",own:"helping you turn the idea into something that actually moves",money:"helping you lay the tradeoffs out plainly",people:"being somewhere you can think out loud without it becoming a task",health:"helping you protect your capacity while things still move",life:"helping you name what matters before we touch what to do",unsure:"helping you name the thing first — the rest gets easier after that"};function Eo(t){const a=t.stage?Lo[t.stage]:"in the middle of something you're still shaping",s=t.focus?To[t.focus]:"a few things at once",o=t.style?It[t.style]:It.alone,n=t.focus?Mo[t.focus]:"helping you find the first thread to pull",i=t.tone>65?"I'll keep it direct":t.tone<35?"I'll keep it gentle":"I'll keep the tone even",r=t.initiative>65?"and give you clear steps":t.initiative<35?"and leave you room to steer":"and follow your lead on how much structure you want";return[`You seem to be ${a}, and lately ${s} has been taking up most of the space.`,`${o.observation}, ${o.consequence}.`,`${i}, ${r}.`,`Right now I might be most useful by ${n}.`].join(" ")}function Io(t){if(t.startingPoint&&t.startingPoint.trim())return`You mentioned "${t.startingPoint.trim()}". What's made that feel more present lately?`;const a=t.focus??"unsure",s={work:"You said work and direction has been taking up space. What's the part of it you keep circling back to?",own:"You said you're trying to build something of your own. Where is it stuck right now?",money:"You said money and security has been on your mind. What decision is it attached to?",people:"You said the people close to you have been taking up space. Want to just talk it through?",health:"You said your energy has been the thing. What's been draining most of it?",life:"You said you've been thinking about what kind of life you want. What made that feel louder recently?",unsure:"You weren't sure what's taking up the space yet. Want to start by just describing your week?"};return s[a]??s.unsure}const ye=5;function Fo({onComplete:t}){const[a,s]=c.useState(0),[o,n]=c.useState(la),[i,r]=c.useState("idle"),l=a/ye;function d(){if(a>=ye-1){r("thinking"),setTimeout(()=>t(o),700);return}s(x=>x+1),r("idle")}function h(x,u){n(y=>({...y,[x]:u})),r("acknowledging"),setTimeout(d,460)}function g(x){const u={...o,startingPoint:x};n(u),r("thinking"),setTimeout(()=>t(u),700)}return e.jsxs("div",{className:"ob-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(L,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between py-8",children:[e.jsx(ce,{state:i,depth:l,size:14}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-[12px] tracking-[0.14em] text-white/35",style:{fontFamily:"var(--font-google-sans)"},children:[a+1," / ",ye]}),e.jsx("button",{type:"button",onClick:a>=ye-1?()=>g(void 0):d,className:"text-[12.5px] text-white/40 transition-colors hover:text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"})]})]}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-9",children:e.jsxs(q,{mode:"wait",children:[a===0&&e.jsx(Pe,{question:"What stage are you in right now?",choices:So,selected:o.stage,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("stage",x)},"stage"),a===1&&e.jsx(Pe,{question:"What's been taking up the most space in your mind lately?",choices:Co,selected:o.focus,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("focus",x)},"focus"),a===2&&e.jsx(Pe,{question:"When something is difficult, what do you usually do first?",choices:zo,selected:o.style,onHoverChange:x=>r(x?"listening":"idle"),onPick:x=>h("style",x)},"style"),a===3&&e.jsx(Ao,{answers:o,onChange:x=>{n(u=>({...u,...x})),r("listening")},onContinue:d},"sliders"),a===4&&e.jsx(Wo,{onFinish:g,onFocusChange:x=>r(x?"listening":"idle")},"open")]})})})})]}),e.jsx("style",{children:".ob-screen { background: radial-gradient(circle at 22% 12%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const Xe={initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0,y:-12},transition:{duration:.45,ease:[.16,1,.3,1]}};function Ze({children:t}){return e.jsx("h2",{className:"max-w-[20ch] text-[32px] leading-[1.14] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:t})}function Pe({question:t,choices:a,selected:s,onPick:o,onHoverChange:n}){return e.jsxs(p.div,{...Xe,children:[e.jsx(Ze,{children:t}),e.jsx("div",{className:"mt-10 flex flex-wrap gap-3",children:a.map((i,r)=>{const l=s===i.id;return e.jsx(p.button,{type:"button",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.35,delay:r*.05,ease:[.16,1,.3,1]},onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onFocus:()=>n(!0),onBlur:()=>n(!1),onClick:()=>o(i.id),className:`rounded-full border px-5 py-3 text-[14.5px] transition-colors ${l?"border-[#f84600] bg-[#f84600] text-white":"border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40 hover:bg-white/[0.07]"}`,style:{fontFamily:"var(--font-google-sans)"},children:i.label},i.id)})})]})}function Ft({leftLabel:t,rightLabel:a,value:s,onChange:o}){return e.jsxs("div",{children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:s<40?"text-white":"",children:t}),e.jsx("span",{className:s>60?"text-white":"",children:a})]}),e.jsx("input",{type:"range",min:0,max:100,value:s,onChange:n=>o(Number(n.target.value)),className:"ob-slider w-full","aria-label":`${t} to ${a}`})]})}function Ao({answers:t,onChange:a,onContinue:s}){const o=(t.tone>65?"I'll say the thing plainly":t.tone<35?"I'll go easy on the delivery":"I'll keep the tone even")+(t.initiative>65?", and hand you clear steps.":t.initiative<35?", and leave you room to steer.":", and follow your lead on structure.");return e.jsxs(p.div,{...Xe,children:[e.jsx(Ze,{children:"How should Starchild work with you?"}),e.jsxs("div",{className:"mt-10 flex max-w-[560px] flex-col gap-9",children:[e.jsx(Ft,{leftLabel:"Gentle",rightLabel:"Direct",value:t.tone,onChange:n=>a({tone:n})}),e.jsx(Ft,{leftLabel:"Give me space",rightLabel:"Give me clear steps",value:t.initiative,onChange:n=>a({initiative:n})})]}),e.jsxs(p.p,{initial:{opacity:0},animate:{opacity:1},className:"mt-9 max-w-[46ch] text-[15px] text-white/55 italic",style:{fontFamily:"var(--font-google-sans)"},children:["“",o,"”"]},o),e.jsx("button",{type:"button",onClick:s,className:"mt-10 rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"That's right"}),e.jsx("style",{children:`
        .ob-slider { -webkit-appearance: none; appearance: none; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(248,70,0,.85), rgba(255,255,255,.18)); outline: none; }
        .ob-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px;
          border-radius: 999px; background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
        .ob-slider::-moz-range-thumb { width: 22px; height: 22px; border: none; border-radius: 999px;
          background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
      `})]})}function Wo({onFinish:t,onFocusChange:a}){const[s,o]=c.useState("");return e.jsxs(p.div,{...Xe,children:[e.jsx(Ze,{children:"What's something you'd like help thinking through right now?"}),e.jsx("p",{className:"mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"It can be something small, practical, personal, or something you're still trying to understand."}),e.jsx("div",{className:"mt-8 max-w-[620px] rounded-[20px] border border-white/12 bg-white/[0.04] p-4 focus-within:border-white/30",children:e.jsx("textarea",{value:s,onChange:n=>o(n.target.value),onFocus:()=>a(!0),onBlur:()=>a(!1),onKeyDown:n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),t(s))},rows:2,placeholder:"One sentence is enough…",className:"w-full resize-none bg-transparent text-[15.5px] text-white placeholder:text-white/30 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0})}),e.jsxs("div",{className:"mt-7 flex flex-wrap items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>t(s),disabled:!s.trim(),className:"rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03] disabled:opacity-35 disabled:hover:scale-100",style:{fontFamily:"var(--font-google-sans)"},children:"Continue"}),e.jsx("button",{type:"button",onClick:()=>t(void 0),className:"rounded-full border border-white/20 px-6 py-3.5 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"I'm not sure yet"})]})]})}const Po={yes:"Good. I'll start from there.",partly:"Noted — I'll hold it loosely and adjust as we talk.",no:"Then I had it wrong. I'll let you lead and build it back up from what you say."};function $o({answers:t,onContinue:a}){const[s,o]=c.useState(()=>Eo(t)),[n,i]=c.useState(!1),[r,l]=c.useState(s),[d,h]=c.useState(null);function g(u){h(u),setTimeout(()=>a(s,u),1400)}function x(){const u=r.trim()||s;o(u),i(!1),h("edited"),setTimeout(()=>a(u,"edited"),1400)}return e.jsxs("div",{className:"fr-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(L,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsx("div",{className:"py-8",children:e.jsx(ce,{state:d?"settled":"thinking",depth:1,size:14})}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Here's what I think I understand so far"}),n?e.jsxs("div",{className:"mt-7",children:[e.jsx("textarea",{value:r,onChange:u=>l(u.target.value),rows:5,className:"w-full resize-none rounded-[20px] border border-white/20 bg-white/[0.04] p-5 text-[20px] leading-[1.55] text-white focus:border-white/40 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0}),e.jsxs("div",{className:"mt-5 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:x,className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Save what I changed"}),e.jsx("button",{type:"button",onClick:()=>{l(s),i(!1)},className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Cancel"})]})]}):e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,delay:.15,ease:[.16,1,.3,1]},className:"mt-7 max-w-[62ch] text-[21px] leading-[1.55] text-white sm:text-[24px]",style:{fontFamily:"var(--font-google-sans)"},children:s},s),e.jsxs(q,{mode:"wait",children:[!n&&!d&&e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.45,delay:.5},className:"mt-10 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:()=>g("yes"),className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"This feels like me"}),["partly","no"].map(u=>e.jsx("button",{type:"button",onClick:()=>g(u),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:u==="partly"?"Partly":"Not really"},u)),e.jsx("button",{type:"button",onClick:()=>i(!0),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Edit what Starchild understood"})]},"actions"),d&&e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"mt-10 text-[16px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:d==="edited"?"Thanks — that's more accurate than what I had.":Po[d]},"ack")]})]})})})]}),e.jsx("style",{children:".fr-screen { background: radial-gradient(circle at 30% 20%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const He="v",De="c";function Ro(){if(typeof window>"u")return De;const t=new URLSearchParams(window.location.search).get(He);return t==="a"||t==="b"||t==="c"?t:De}function Oo(){const[t,a]=c.useState(Ro),[s,o]=c.useState("landing"),[n,i]=c.useState(),[r,l]=c.useState(),[d,h]=c.useState(),[g,x]=c.useState(!1),[u,y]=c.useState(la),[j,w]=c.useState(!1),[v,E]=c.useState(os);function T(N){a(N);const f=new URL(window.location.href);N===De?f.searchParams.delete(He):f.searchParams.set(He,N),window.history.replaceState(null,"",f),window.scrollTo({top:0})}function F(N){E(f=>[N,...f])}function z(N){i(N),l(void 0),h(void 0),x(!0),o("chat")}function A(N){i(void 0),l(N.question),h(N),x(!0),o("chat")}function M(){o("landing")}function $(){o("for-traders"),window.scrollTo({top:0})}function k(){o("signup")}return e.jsxs(e.Fragment,{children:[s==="landing"&&e.jsxs(e.Fragment,{children:[t==="c"?e.jsx(Xs,{onEnterGuest:z,onStartTask:A,onNavigateTraders:$,onNavigateConductorMode:()=>o("conductor-mode"),onOpenMarketplace:()=>w(!0),onLogIn:k,onSignUp:k},"c"):(()=>{const N=t==="b"?Ts:fs;return e.jsx(N,{onEnterGuest:z,onStartTask:A,onNavigateConductorMode:()=>o("conductor-mode"),onOpenMarketplace:()=>w(!0),onLogIn:k,onSignUp:k},t)})(),e.jsx(so,{variant:t,onChange:T})]}),s==="for-traders"&&e.jsx(ao,{onNavigateHome:M,onEnterGuest:z,onLogIn:k,onSignUp:k}),s==="conductor-mode"&&e.jsx(yo,{onNavigateHome:M,onOpenMarketplace:()=>w(!0),onTry:z,onLogIn:k,onSignUp:k}),s==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(Ke,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>g?o("chat"):M(),onContinue:()=>{x(!1),o("onboarding")}})})}),s==="onboarding"&&e.jsx(Fo,{onComplete:N=>{y(N),o("first-read")}}),s==="first-read"&&e.jsx($o,{answers:u,onContinue:(N,f)=>{l(f==="no"?"I didn't get that quite right. Tell me where I was off — what's actually going on for you right now?":Io(u)),i(void 0),h(void 0),o("chat")}}),s==="chat"&&e.jsx(go,{onBack:M,intents:t==="c"?ia:void 0,onOpenMarketplace:()=>w(!0),onRequestSignup:()=>o("signup"),onLogIn:k,initialMessage:n,openingMessage:r,task:d,isGuest:g}),e.jsx(No,{open:j,onClose:()=>w(!1),skills:v,onAddSkill:F})]})}va.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(Oo,{})}));
