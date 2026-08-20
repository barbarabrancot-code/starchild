import{f as xe,c as He,r as c,s as Bt,a as Ot,p as xa,v as ma,i as ga,b as ua,d as fa,e as ya,n as Dt,g as ba,h as wa,u as Ht,j as va,m as qe,k as qt,l as me,M as ja,o as e,q as d,C as M,A as K,t as ka,w as Na}from"./ConductorModeSection-P1YcSu9Q.js";function _t(t,a){let s;const n=()=>{const{currentTime:i}=a,o=(i===null?0:i.value)/100;s!==o&&t(o),s=o};return xe.preUpdate(n,!0),()=>He(n)}function za(t,a,s){c.useInsertionEffect(()=>t.on(a,s),[t,a,s])}function ze(t){return typeof window>"u"?!1:t?Bt():Ot()}const Ca=50,ot=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Sa=()=>({time:0,x:ot(),y:ot()}),Ma={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function lt(t,a,s,n){const i=s[a],{length:r,position:o}=Ma[a],l=i.current,p=s.time;i.current=Math.abs(t[`scroll${o}`]),i.scrollLength=t[`scroll${r}`]-t[`client${r}`],i.offset.length=0,i.offset[0]=0,i.offset[1]=i.scrollLength,i.progress=xa(0,i.scrollLength,i.current);const x=n-p;i.velocity=x>Ca?0:ma(i.current-l,x)}function Ta(t,a,s){lt(t,"x",a,s),lt(t,"y",a,s),a.time=s}function La(t,a){const s={x:0,y:0};let n=t;for(;n&&n!==a;)if(ga(n))s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const i=n.getBoundingClientRect();n=n.parentElement;const r=n.getBoundingClientRect();s.x+=i.left-r.left,s.y+=i.top-r.top}else if(n instanceof SVGGraphicsElement){const{x:i,y:r}=n.getBBox();s.x+=i,s.y+=r;let o=null,l=n.parentNode;for(;!o;)l.tagName==="svg"&&(o=l),l=n.parentNode;n=o}else break;return s}const _e={start:0,center:.5,end:1};function ct(t,a,s=0){let n=0;if(t in _e&&(t=_e[t]),typeof t=="string"){const i=parseFloat(t);t.endsWith("px")?n=i:t.endsWith("%")?t=i/100:t.endsWith("vw")?n=i/100*document.documentElement.clientWidth:t.endsWith("vh")?n=i/100*document.documentElement.clientHeight:t=i}return typeof t=="number"&&(n=a*t),s+n}const Ea=[0,0];function Ia(t,a,s,n){let i=Array.isArray(t)?t:Ea,r=0,o=0;return typeof t=="number"?i=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?i=t.split(" "):i=[t,_e[t]?t:"0"]),r=ct(i[0],s,n),o=ct(i[1],a),r-o}const ge={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Aa={x:0,y:0};function Fa(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function Wa(t,a,s){const{offset:n=ge.All}=s,{target:i=t,axis:r="y"}=s,o=r==="y"?"height":"width",l=i!==t?La(i,t):Aa,p=i===t?{width:t.scrollWidth,height:t.scrollHeight}:Fa(i),x={width:t.clientWidth,height:t.clientHeight};a[r].offset.length=0;let h=!a[r].interpolate;const u=n.length;for(let b=0;b<u;b++){const y=Ia(n[b],x[o],p[o],l[r]);!h&&y!==a[r].interpolatorOffsets[b]&&(h=!0),a[r].offset[b]=y}h&&(a[r].interpolate=ua(a[r].offset,fa(n),{clamp:!1}),a[r].interpolatorOffsets=[...a[r].offset]),a[r].progress=ya(0,1,a[r].interpolate(a[r].current))}function Pa(t,a=t,s){if(s.x.targetOffset=0,s.y.targetOffset=0,a!==t){let n=a;for(;n&&n!==t;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=a===t?a.scrollWidth:a.clientWidth,s.y.targetLength=a===t?a.scrollHeight:a.clientHeight,s.x.containerLength=t.clientWidth,s.y.containerLength=t.clientHeight}function $a(t,a,s,n={}){return{measure:i=>{Pa(t,n.target,s),Ta(t,s,i),(n.offset||n.target)&&Wa(t,s,n)},notify:()=>a(s)}}const Q=new WeakMap,dt=new WeakMap,Fe=new WeakMap,pt=new WeakMap,fe=new WeakMap,ht=t=>t===document.scrollingElement?window:t;function Gt(t,{container:a=document.scrollingElement,trackContentSize:s=!1,...n}={}){if(!a)return Dt;let i=Fe.get(a);i||(i=new Set,Fe.set(a,i));const r=Sa(),o=$a(a,t,r,n);if(i.add(o),!Q.has(a)){const p=()=>{for(const b of i)b.measure(wa.timestamp);xe.preUpdate(x)},x=()=>{for(const b of i)b.notify()},h=()=>xe.read(p);Q.set(a,h);const u=ht(a);window.addEventListener("resize",h),a!==document.documentElement&&dt.set(a,ba(a,h)),u.addEventListener("scroll",h),h()}if(s&&!fe.has(a)){const p=Q.get(a),x={width:a.scrollWidth,height:a.scrollHeight};pt.set(a,x);const h=()=>{const b=a.scrollWidth,y=a.scrollHeight;(x.width!==b||x.height!==y)&&(p(),x.width=b,x.height=y)},u=xe.read(h,!0);fe.set(a,u)}const l=Q.get(a);return xe.read(l,!1,!0),()=>{var u;He(l);const p=Fe.get(a);if(!p||(p.delete(o),p.size))return;const x=Q.get(a);Q.delete(a),x&&(ht(a).removeEventListener("scroll",x),(u=dt.get(a))==null||u(),window.removeEventListener("resize",x));const h=fe.get(a);h&&(He(h),fe.delete(a)),pt.delete(a)}}const Ra=[[ge.Enter,"entry"],[ge.Exit,"exit"],[ge.Any,"cover"],[ge.All,"contain"]],xt={start:0,end:1};function Ba(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const s=xt[a[0]],n=xt[a[1]];if(!(s===void 0||n===void 0))return[s,n]}function Oa(t){if(t.length!==2)return;const a=[];for(const s of t)if(Array.isArray(s))a.push(s);else if(typeof s=="string"){const n=Ba(s);if(!n)return;a.push(n)}else return;return a}function Da(t,a){const s=Oa(t);if(!s)return!1;for(let n=0;n<2;n++){const i=s[n],r=a[n];if(i[0]!==r[0]||i[1]!==r[1])return!1}return!0}function Ye(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,s]of Ra)if(Da(t,a))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const mt=new Map;function gt(t){const a={value:0},s=Gt(n=>{a.value=n[t.axis].progress*100},t);return{currentTime:a,cancel:s}}function Vt({source:t,container:a,...s}){const{axis:n}=s;t&&(a=t);let i=mt.get(a);i||(i=new Map,mt.set(a,i));const r=s.target??"self";let o=i.get(r);o||(o={},i.set(r,o));const l=n+(s.offset??[]).join(",");return o[l]||(s.target&&ze(s.target)?Ye(s.offset)?o[l]=new ViewTimeline({subject:s.target,axis:n}):o[l]=gt({container:a,...s}):ze()?o[l]=new ScrollTimeline({source:a,axis:n}):o[l]=gt({container:a,...s})),o[l]}function Ha(t,a){const s=Vt(a),n=a.target?Ye(a.offset):void 0,i=a.target?ze(a.target)&&!!n:ze();return t.attachTimeline({timeline:i?s:void 0,...n&&i&&{rangeStart:n.rangeStart,rangeEnd:n.rangeEnd},observe:r=>(r.pause(),_t(o=>{r.time=r.iterationDuration*o},s))})}function qa(t){return t&&(t.target||t.offset)}function _a(t){return t.length===2}function Ga(t,a){return _a(t)||qa(a)?Gt(s=>{t(s[a.axis].progress,s)},a):_t(t,Vt(a))}function Ut(t,{axis:a="y",container:s=document.scrollingElement,...n}={}){if(!s)return Dt;const i={axis:a,container:s,...n};return typeof t=="function"?Ga(t,i):Ha(t,i)}const Va=()=>({scrollX:me(0),scrollY:me(0),scrollXProgress:me(0),scrollYProgress:me(0)}),se=t=>t?!t.current:!1;function ut(t,a,s,n){return{factory:i=>{let r;const o=()=>{if(se(s)||se(n)){qe.read(o);return}r=Ut(i,{...a,axis:t,container:(s==null?void 0:s.current)||void 0,target:(n==null?void 0:n.current)||void 0})};return qe.read(o),()=>{qt(o),r==null||r()}},times:[0,1],keyframes:[0,1],ease:i=>i,duration:1}}function Ua(t,a){return typeof window>"u"?!1:t?Bt()&&!!Ye(a):Ot()}function Ya({container:t,target:a,...s}={}){const n=Ht(Va);Ua(a,s.offset)&&(n.scrollXProgress.accelerate=ut("x",s,t,a),n.scrollYProgress.accelerate=ut("y",s,t,a));const i=c.useRef(null),r=c.useRef(!1),o=c.useCallback(()=>(i.current=Ut((l,{x:p,y:x})=>{n.scrollX.set(p.current),n.scrollXProgress.set(p.progress),n.scrollY.set(x.current),n.scrollYProgress.set(x.progress)},{...s,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var l;(l=i.current)==null||l.call(i)}),[t,a,JSON.stringify(s.offset)]);return va(()=>{if(r.current=!1,se(t)||se(a)){r.current=!0;return}else return o()},[o]),c.useEffect(()=>{if(!r.current)return;let l;const p=()=>{const x=se(t),h=se(a);!x&&!h&&(l=o())};return qe.read(p),()=>{qt(p),l==null||l()}},[o]),n}function G(t){const a=Ht(()=>me(t)),{isStatic:s}=c.useContext(ja);if(s){const[,n]=c.useState(t);c.useEffect(()=>a.on("change",n),[])}return a}function ue({className:t}){return e.jsxs("div",{className:`relative overflow-hidden rounded-[7px] ${t??"size-6"}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[#1c1c1c]"}),e.jsx("div",{className:"absolute inset-0 bg-[#f84600]",style:{clipPath:"polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)"}})]})}function Ce({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function ft({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function $({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ge({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Xa({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Te({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Yt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Xe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Xt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function ne({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Kt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function Zt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function Ke({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function Qt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Jt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ka({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("rect",{x:"3",y:"7.5",width:"18",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Za({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function ea({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function Qa({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M12 11v5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"8",r:"1",fill:"currentColor"})]})}const Ja={idle:{scale:[1,1.06,1],opacity:[.75,1,.75],duration:3.4},listening:{scale:[1,1.12,1],opacity:[.85,1,.85],duration:2.2},acknowledging:{scale:[1,.86,1.04,1],opacity:[1,1,1,1],duration:.5},thinking:{scale:[1,1.18,.94,1],opacity:[1,.7,1,1],duration:1.1},settled:{scale:[1,1.03,1],opacity:[.9,1,.9],duration:4.6}};function Le({state:t="idle",depth:a=0,size:s=18}){const n=Ja[t],i=10+a*26,r=.1+a*.22;return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:s*3,height:s*3},children:[e.jsx(d.span,{"aria-hidden":"true",className:"absolute rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)"},animate:{width:s*(2+a*.9),height:s*(2+a*.9),opacity:r},transition:{duration:.8,ease:[.16,1,.3,1]}}),e.jsx(d.span,{"aria-hidden":"true",className:"relative rounded-full bg-[#f84600]",style:{width:s,height:s,boxShadow:`0 0 ${i}px rgba(248,70,0,.7)`},animate:{scale:n.scale,opacity:n.opacity},transition:{duration:n.duration,repeat:t==="acknowledging"?0:1/0,ease:"easeInOut"}})]})}const yt=.34,bt=.15,J=860,ye=560,be=14;function es({targetRef:t,image:a}){const s=c.useRef(null),n=c.useRef(null),i=c.useRef(null),r=c.useRef(null);return c.useEffect(()=>{const o=t.current,l=s.current;if(!o||!l||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const x=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let h=0,u=0,b=0,y=0,k=0,f=0,v=!1,j=0;const C=()=>{var N,A,R,W;(N=r.current)==null||N.style.setProperty("transform",`translate3d(${b-be/2}px, ${y-be/2}px, 0)`),(A=i.current)==null||A.style.setProperty("transform",`translate3d(${k-ye/2}px, ${f-ye/2}px, 0)`),(R=n.current)==null||R.style.setProperty("--mx",`${k-J/2}px`),(W=n.current)==null||W.style.setProperty("--my",`${f-J/2}px`)},P=()=>{b+=(h-b)*yt,y+=(u-y)*yt,k+=(b-k)*bt,f+=(y-f)*bt,C(),j=requestAnimationFrame(P)},T=N=>{const A=o.getBoundingClientRect();if(h=N.clientX-A.left,u=N.clientY-A.top,!v){if(v=!0,b=k=h,y=f=u,C(),x)return;j=requestAnimationFrame(P)}x&&(b=k=h,y=f=u,C())},F=()=>l.classList.add("hs-on"),L=()=>{l.classList.remove("hs-on"),cancelAnimationFrame(j),j=0,v=!1};return o.addEventListener("pointermove",T),o.addEventListener("pointerenter",F),o.addEventListener("pointerleave",L),o.classList.add("hs-host"),()=>{o.removeEventListener("pointermove",T),o.removeEventListener("pointerenter",F),o.removeEventListener("pointerleave",L),o.classList.remove("hs-host"),cancelAnimationFrame(j)}},[t]),e.jsxs("div",{ref:s,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:n,className:"hs-lit"}),e.jsx("div",{ref:i,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:r,className:"hs-dot"})}),e.jsx("style",{children:`
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
          -webkit-mask-size: ${J}px ${J}px;
          mask-size: ${J}px ${J}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${ye}px; height: ${ye}px;
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
          width: ${be}px; height: ${be}px;
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
      `})]})}function ta({onNavigateHome:t,onLogIn:a,onSignUp:s}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(M,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const ts=[{id:"build",label:"Build",icon:Yt,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:Xt,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:Ke,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:Qt,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:Jt,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],wt={available:["Conversation","Conductor Mode","Research & tasks","Browse Marketplace"],locked:["Save memory & context","Conversation history","Continue on Desktop","Run tasks 24/7","Automations","Publish & monetize","Integrations","Buy from Marketplace"]},we=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],as=[{id:"ideas",label:"Ideas",icon:Xe,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:Za,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:ea,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:Ke,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:Qt,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:Jt,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],ss=["Your priorities","How you like to receive help","Recurring projects","What you're trying to work through"],aa={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},sa={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},na={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},ia={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},ns={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},is=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:aa},{test:/coffee|brand|logo/i,scenario:sa},{test:/market|trading|trade|stock|crypto/i,scenario:na},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:ia}],rs=[{prompt:"Make a poster for the Odyssey movie",scenario:aa},{prompt:"Make me a coffee shop brand",scenario:sa},{prompt:"How's the market today?",scenario:na},{prompt:"Debug this Python traceback",scenario:ia}];function vt(t){const a=is.find(({test:s})=>s.test(t));return(a==null?void 0:a.scenario)??ns}const We=["All","Writing","Design","Code","Marketing"],os=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function Ze({onStartTask:t,align:a="start",intents:s=ts}){const[n,i]=c.useState(null),r=s.find(l=>l.id===n),o=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${o}`,children:s.map(({id:l,label:p,icon:x,badge:h})=>{const u=n===l;return e.jsxs("button",{type:"button",onClick:()=>i(u?null:l),"aria-expanded":u,className:`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${u?"bg-white text-neutral-900":"bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(x,{className:`size-4 ${u?"text-neutral-500":"text-white/55"}`}),p,h&&e.jsx("span",{className:"absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white",children:h})]},l)})}),e.jsx(K,{mode:"wait",children:r&&e.jsx(d.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${o} ${a==="center"?"mx-auto":""}`,children:r.tasks.map((l,p)=>e.jsxs(d.button,{type:"button",onClick:()=>t(l),initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+p*.05,ease:[.16,1,.3,1]},className:"group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]",style:{fontFamily:"var(--font-google-sans)"},children:[l.label,e.jsx($,{className:"size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]"})]},l.id))})},r.id)})]})}const ls="./images/monolito.png";function ra({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}){const o=c.useRef(null);return e.jsxs("section",{ref:o,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(es,{targetRef:o,image:ls}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(ta,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(M,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(cs,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function cs({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),i=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(d.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(Le,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(d.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(d.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(d.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:r=>n(r.target.value),onKeyDown:r=>{r.key==="Enter"&&i()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:i,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx($,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ze,{onStartTask:a})})]})}const ds="./images/empresas.svg",ps=6;function oa(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(M,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:ps},(t,a)=>e.jsx("img",{src:ds,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
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
      `})]})}const jt="(min-width: 1024px) and (min-height: 560px)",kt="(prefers-reduced-motion: reduce)";function la(){const t=()=>typeof window<"u"&&window.matchMedia(jt).matches&&!window.matchMedia(kt).matches,[a,s]=c.useState(t);return c.useEffect(()=>{const n=window.matchMedia(jt),i=window.matchMedia(kt),r=()=>s(n.matches&&!i.matches);return r(),n.addEventListener("change",r),i.addEventListener("change",r),()=>{n.removeEventListener("change",r),i.removeEventListener("change",r)}},[]),a}function ca(t,a,s){const n=c.useRef(s);n.current=s,c.useEffect(()=>{if(!a)return;const i=()=>{const r=t.current;if(!r)return;const o=r.offsetHeight-window.innerHeight;if(o<=0)return;const l=-r.getBoundingClientRect().top/o;n.current(l<0?0:l>1?1:l)};return i(),window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[a,t])}function Qe(t){const a=c.useRef(null),s=la(),[n,i]=c.useState(0);return ca(a,s,o=>{i(Math.max(0,Math.min(t-1,Math.floor(o*t))))}),{trackRef:a,pinned:s,index:n,selectStep:o=>{const l=a.current;if(!s||!l){i(o);return}const p=l.getBoundingClientRect().top+window.scrollY,x=l.offsetHeight-window.innerHeight;window.scrollTo({top:p+x*((o+.5)/t),behavior:"smooth"})}}}function Ee({trackRef:t,pinned:a,screens:s,children:n}){const i=c.useRef(null),[r,o]=c.useState(1);return c.useLayoutEffect(()=>{if(!a){o(1);return}const l=i.current;if(!l)return;const p=()=>{const h=l.offsetHeight,u=window.innerHeight-32;o(h>u?Math.max(.62,u/h):1)};p();const x=new ResizeObserver(p);return x.observe(l),window.addEventListener("resize",p),()=>{x.disconnect(),window.removeEventListener("resize",p)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(s)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:i,className:"sp-fit",style:r===1?void 0:{transform:`scale(${r})`},children:n})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function hs({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(ue,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,s)=>e.jsxs(d.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},className:`pw-step${s===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(xs,{result:t.result})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function xs({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,s)=>e.jsx(d.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+s*.05,ease:[.16,1,.3,1]}},s))})]})}function ms({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:i}=Qe(we.length),r=we[n];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:we.length,children:e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[we.map((o,l)=>{const p=l===n;return e.jsxs("button",{type:"button",onClick:()=>i(l),"aria-pressed":p,className:`uc-tab${p?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:o.label}),e.jsx(K,{initial:!1,children:p&&e.jsxs(d.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:o.blurb}),e.jsx("span",{className:"uc-tab-example",children:o.example})]})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(r.task),className:"uc-try",children:[r.task.label,e.jsx($,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(hs,{useCase:r})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function gs({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:as.map(({id:a,label:s,icon:n,task:i},r)=>e.jsxs(d.button,{type:"button",onClick:()=>t(i),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:r%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(n,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:s}),e.jsx($,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:i.label})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const us=[{file:"OpenAI.svg",w:148,h:40},{file:"Claude.svg",w:160,h:34},{file:"Frame374.svg",w:151,h:34},{file:"Frame375.svg",w:137,h:40},{file:"Deepseek.svg",w:206,h:33},{file:"Kimi.svg",w:118,h:40}],Nt=16,fs=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],zt=.06,ys=.46,Ct=.56,bs=.92,St=t=>t<0?0:t>1?1:t,ee=(t,a,s)=>t+(a-t)*s,Mt=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function ve(t,a,s){const n=t.getBoundingClientRect();return{left:(n.left-a.left)/s,top:(n.top-a.top)/s,width:n.width/s,height:n.height/s}}function Tt(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function Lt({label:t,innerRef:a,children:s}){return e.jsxs("div",{className:"ky-panel",ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function Je({showBenefits:t=!0}={}){const a=c.useRef(null),s=c.useRef(null),n=c.useRef(null),i=c.useRef(null),r=c.useRef(null),o=c.useRef(null),l=c.useRef(null),p=G(0),x=G(0),h=G(0),u=G(0),b=G(0),y=G(0),k=G(0),f=G(0),v=G(0),[j,C]=c.useState(!1),[P,T]=c.useState(!1),[F,L]=c.useState(!1),N=la(),{scrollYProgress:A}=Ya({target:s,offset:["start 0.85","end 0.55"]});c.useEffect(()=>{const S=window.matchMedia("(prefers-reduced-motion: reduce)"),m=()=>L(S.matches);m(),S.addEventListener("change",m);const E=()=>{const I=s.current,O=n.current,_=i.current,V=r.current,U=o.current;if(!I||!O||!_||!V||!U)return;const D=I.getBoundingClientRect(),H=I.offsetWidth?D.width/I.offsetWidth:1,g=ve(V,D,H),z={x:g.left+g.width/2,y:g.top+g.height/2},w=ve(U,D,H);l.current={conductor:z,you:Tt(ve(O,D,H),z),models:Tt(ve(_,D,H),z),result:{x:w.left+w.width/2,y:w.top}}};return E(),window.addEventListener("resize",E),()=>{window.removeEventListener("resize",E),S.removeEventListener("change",m)}},[]),c.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[N]);const R=S=>{const m=l.current;if(!m)return;const E=Mt(St((S-zt)/(ys-zt))),I=Mt(St((S-Ct)/(bs-Ct)));p.set(ee(m.you.x,m.conductor.x,E)),x.set(ee(m.you.y,m.conductor.y,E)),u.set(ee(m.models.x,m.conductor.x,E)),b.set(ee(m.models.y,m.conductor.y,E));const O=E<=0?0:E>.94?(1-E)/.06:Math.min(1,E/.08);h.set(O),y.set(O),k.set(ee(m.conductor.x,m.result.x,I)),f.set(ee(m.conductor.y,m.result.y,I)),v.set(I<=0?0:I>.93?(1-I)/.07:Math.min(1,I/.08)),C(E>.9),T(I>.88)};ca(a,N,R),za(A,"change",S=>{N||R(S)});const W=F||P;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ee,{trackRef:a,pinned:N,screens:2,children:e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(d.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:s,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(Lt,{label:"You",innerRef:n,children:e.jsx("ul",{className:"ky-list",children:ss.map(S=>e.jsx("li",{children:S},S))})}),e.jsxs("div",{className:`ky-conductor${j?" ky-conductor--hit":""}`,ref:r,children:[e.jsx(Le,{state:j?"thinking":"idle",depth:j?1:.35,size:16}),e.jsx("p",{className:"ky-conductor-label",children:"Conductor"})]}),e.jsx(Lt,{label:"Available models",innerRef:i,children:e.jsx("div",{className:"ky-logos",children:us.map(S=>e.jsx("img",{src:`./images/carousel/${S.file}`,alt:"",style:{height:Nt,width:Nt*(S.w/S.h)}},S.file))})})]}),e.jsxs("div",{className:`ky-result${W?" ky-result--lit":""}`,ref:o,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),!F&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx(d.span,{className:"ky-dot",style:{x:p,y:x,opacity:h}}),e.jsx(d.span,{className:"ky-dot",style:{x:u,y:b,opacity:y}}),e.jsx(d.span,{className:"ky-dot ky-dot--result",style:{x:k,y:f,opacity:v}})]})]})})})]})}),t&&e.jsx(M,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:fs.map((S,m)=>e.jsx(d.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:m*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:S.title}),e.jsx("p",{className:"ky-benefit-desc",children:S.desc})]})},S.title))})}),e.jsx("style",{children:`
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
      `})]})}function Ie({onStartFree:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-28 text-center md:py-36",children:e.jsx(M,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(d.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"The best AI for the job changes constantly. Starchild keeps up."}),e.jsx(d.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(d.button,{type:"button",onClick:()=>{},initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx($,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})]})})})})}function ws({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}){const o=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ra,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}),e.jsx(oa,{}),e.jsx(ms,{onStartTask:a}),e.jsx(gs,{onStartTask:a}),e.jsx("div",{ref:o,children:e.jsx(Je,{})}),e.jsx(Ie,{onStartFree:l})]})}const oe="0 0 160 96",Z="rgba(255,255,255,.26)",Se="rgba(255,255,255,.12)";function vs({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:Se,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":Z,strokeWidth:n===0?1.6:1},s.y))]})}function js({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:Z,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function ks({className:t=""}){return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:Se,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:Z,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:Se,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Ns({className:t=""}){return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:Se,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:Z,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function zs({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:Z,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function Cs({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:oe,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:Z,strokeWidth:"1"}),a.map((s,n)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":n},d:`M70 48 C 96 48, 100 ${s}, 126 ${s}`,stroke:Z,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":n},cx:"132",cy:s,r:"2.6",fill:n===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},s)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const Ss=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:vs,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:js,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:ks,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:Ns,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:zs,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:Cs,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function Ms({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Ss.map(({id:a,tag:s,title:n,copy:i,art:r,task:o},l)=>e.jsxs(d.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(r,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx($,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:i})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const je=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function Ts({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(ue,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Ls,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Pe({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Ls({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Pe,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(d.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(ne,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(d.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Pe,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(d.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(d.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(d.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Pe,{items:t.tools})]})]}),e.jsxs(d.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Es({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:i}=Qe(je.length),r=je[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:je.length,children:e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[je.map((o,l)=>{const p=l===n;return e.jsxs("button",{type:"button",onClick:()=>i(l),"aria-pressed":p,className:`ag-tab${p?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:o.label}),e.jsx(K,{initial:!1,children:p&&e.jsxs(d.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:o.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",o.prompt,"”"]})]})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(r.task),className:"ag-try",children:[r.task.label,e.jsx($,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Ts,{example:r})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Is({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}){const o=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(ra,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:i,onSignUp:r}),e.jsx(oa,{}),e.jsx(Ms,{onStartTask:a}),e.jsx(Es,{onStartTask:a}),e.jsx("div",{ref:o,children:e.jsx(Je,{})}),e.jsx(Ie,{onStartFree:l})]})}const As=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function da({onNavigateHome:t,onNavigateTraders:a,onLogIn:s,onSignUp:n}){const[i,r]=c.useState(!1),o=c.useRef(null);return c.useEffect(()=>{if(!i)return;const l=x=>{var h;(h=o.current)!=null&&h.contains(x.target)||r(!1)},p=x=>{x.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",p),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",p)}},[i]),e.jsxs("header",{className:"relative z-20 py-6",children:[e.jsx(M,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("nav",{className:"sh-nav","aria-label":"Main",children:[e.jsxs("div",{className:"sh-menu",ref:o,children:[e.jsxs("button",{type:"button",onClick:()=>r(l=>!l),"aria-expanded":i,"aria-haspopup":"true",className:`sh-trigger${i?" sh-trigger--open":""}`,children:["Starchild for",e.jsx(Ge,{className:"sh-chevron size-3.5"})]}),i&&e.jsx("div",{className:"sh-panel",role:"menu",children:As.map(({id:l,label:p,route:x})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{r(!1),x==="traders"&&a()},className:"sh-item",children:p},l))})]}),e.jsx("button",{type:"button",onClick:()=>{},className:"sh-trigger",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"sh-trigger sh-trigger--badged",children:["Marketplace",e.jsx("span",{className:"sh-badge",children:"New"})]})]}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:n,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})}),e.jsx("style",{children:`
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
      `})]})}const Y=11,Et=.55,Fs=1.15,$e=30,Re=300,Ws=26,Me=26,te=[150,168,196],ae=[255,255,255],Be=[255,146,62],It=.34,At=.15,Ps=.08,ke=14;function $s(){return Array.from({length:Me},(t,a)=>{const s=a/(Me-1),n=Math.max(0,s-.72)/.28,i=Math.round(te[0]+(ae[0]-te[0])*s+(Be[0]-ae[0])*n*.55),r=Math.round(te[1]+(ae[1]-te[1])*s+(Be[1]-ae[1])*n*.55),o=Math.round(te[2]+(ae[2]-te[2])*s+(Be[2]-ae[2])*n*.55),l=.05+.85*Math.pow(s,1.6);return{color:`rgba(${i},${r},${o},${l.toFixed(3)})`,size:Fs+1.5*Math.pow(s,2),points:[]}})}function Rs({targetRef:t}){const a=c.useRef(null),s=c.useRef(null);return c.useEffect(()=>{const n=t.current,i=a.current,r=i==null?void 0:i.getContext("2d");if(!n||!i||!r)return;const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=window.matchMedia("(hover: hover) and (pointer: fine)").matches,p=$s();l&&n.classList.add("hero-c--fine");let x=0,h=0,u=[],b=-9999,y=-9999,k=-9999,f=-9999,v=-9999,j=-9999,C=0,P=0,T=!1,F=0,L=!1;const N=performance.now(),A=(g,z,w)=>Math.sin(g*.0062+z*.0038+w*.19)+Math.sin(g*.0029-z*.0071-w*.14)*.85+Math.sin((g+z)*.0042+w*.09)*.6,R=g=>{const z=(g-N)/1e3;if(r.clearRect(0,0,x,h),C>.01){const w=r.createRadialGradient(v,j,0,v,j,Re*1.6);w.addColorStop(0,`rgba(248,70,0,${(.11*C).toFixed(3)})`),w.addColorStop(.45,`rgba(248,70,0,${(.04*C).toFixed(3)})`),w.addColorStop(1,"rgba(248,70,0,0)"),r.fillStyle=w,r.fillRect(0,0,x,h)}for(const w of p)w.points.length=0;for(const w of u){const q=A(w.x,w.y,z);let B=w.x+q*5*w.depth,ce=w.y+q*$e*w.depth,de=.06+.62*Math.pow(Math.max(0,Math.cos(q*1.9+w.seed*.35)),7)*w.depth+.05*w.seed;if(C>.01){const at=B-v,st=ce-j,pe=Math.hypot(at,st);if(pe<Re){const nt=1-pe/Re,it=nt*nt*C;if(de+=it*1.1,pe>.001){const rt=it*Ws;B+=at/pe*rt,ce+=st/pe*rt}}}const Ae=Math.min(Me-1,Math.max(0,Math.round(de*(Me-1))));p[Ae].points.push(B,ce)}for(const w of p){if(w.points.length===0)continue;r.fillStyle=w.color;const q=w.size/2;for(let B=0;B<w.points.length;B+=2)r.fillRect(w.points[B]-q,w.points[B+1]-q,w.size,w.size)}},W=()=>{const g=s.current;!g||!l||(g.style.transform=`translate3d(${k-ke/2}px, ${f-ke/2}px, 0)`,g.style.opacity=`${C}`)},S=()=>{const g=Math.ceil(x/Y)+2,z=Math.ceil((h+$e*2)/Y)+2,w=[];for(let q=0;q<z;q++)for(let B=0;B<g;B++){const ce=Math.random(),tt=B*Y-Y+(Math.random()-.5)*Y*2*Et,de=q*Y-Y-$e+(Math.random()-.5)*Y*2*Et,Ae=.35+.65*Math.min(1,Math.max(0,de/Math.max(1,h)));w.push({x:tt,y:de,depth:Ae,seed:ce})}u=w},m=()=>{const g=n.getBoundingClientRect(),z=Math.min(window.devicePixelRatio||1,1.75);x=Math.max(1,Math.round(g.width)),h=Math.max(1,Math.round(g.height)),i.width=Math.round(x*z),i.height=Math.round(h*z),i.style.width=`${x}px`,i.style.height=`${h}px`,r.setTransform(z,0,0,z,0,0),S(),R(performance.now())},E=g=>{k+=(b-k)*It,f+=(y-f)*It,v+=(k-v)*At,j+=(f-j)*At,C+=(P-C)*Ps,R(g),W(),F=requestAnimationFrame(E)},I=()=>{L||o||(L=!0,F=requestAnimationFrame(E))},O=()=>{L=!1,cancelAnimationFrame(F)},_=g=>{const z=n.getBoundingClientRect();b=g.clientX-z.left,y=g.clientY-z.top,T||(T=!0,k=v=b,f=j=y),P=1,o&&(k=v=b,f=j=y,C=1,R(performance.now()),W())},V=()=>{P=0,T=!1,o&&(C=0,R(performance.now()),W())},U=new IntersectionObserver(([g])=>g.isIntersecting?I():O(),{threshold:0});U.observe(n);const D=()=>document.hidden?O():I(),H=new ResizeObserver(m);return H.observe(n),n.addEventListener("pointermove",_),n.addEventListener("pointerleave",V),document.addEventListener("visibilitychange",D),m(),()=>{U.disconnect(),H.disconnect(),n.removeEventListener("pointermove",_),n.removeEventListener("pointerleave",V),document.removeEventListener("visibilitychange",D),n.classList.remove("hero-c--fine"),O()}},[t]),e.jsxs(e.Fragment,{children:[e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"}),e.jsx("div",{className:"pm-cursor-layer","aria-hidden":"true",children:e.jsx("span",{ref:s,className:"pm-dot"})}),e.jsx("style",{children:`
        .pm-cursor-layer { position: absolute; inset: 0; z-index: 40; pointer-events: none; }
        .pm-dot {
          position: absolute; top: 0; left: 0;
          width: ${ke}px; height: ${ke}px; border-radius: 999px;
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
      `})]})}const pa=[{id:"talk",label:"Talk",icon:Xe,tasks:[{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"},{id:"talk-decision",label:"Help me decide",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}]},{id:"research",label:"Research",icon:Xt,tasks:[{id:"research-topic",label:"Look into something",basePrompt:"Look into this properly and come back with a real answer, not a pile of links.",question:"What should I dig into?"},{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I put side by side?"}]},{id:"build",label:"Build",icon:Yt,tasks:[{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."},{id:"build-dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}]},{id:"work",label:"Work",icon:Ka,tasks:[{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"},{id:"work-draft",label:"Draft something I owe someone",basePrompt:"Help me write the thing I've been putting off sending.",question:"Who's it for, and what does it need to say?"}]},{id:"organize",label:"Organize",icon:ea,tasks:[{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"},{id:"organize-project",label:"Bring order to a project",basePrompt:"Take this project and give it a structure I can actually follow.",question:"What's the project?"}]}];function Bs({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onLogIn:n,onSignUp:i}){const r=c.useRef(null);return e.jsxs("section",{ref:r,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Rs,{targetRef:r}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx(da,{onNavigateHome:()=>{},onNavigateTraders:s,onLogIn:n,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(M,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(Os,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function Os({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),i=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsx(d.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."}),e.jsxs(d.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-10 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:r=>n(r.target.value),onKeyDown:r=>{r.key==="Enter"&&i()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:i,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx($,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(Ze,{onStartTask:a,intents:pa})})]})}const le="0 0 160 96",ie="rgba(255,255,255,.26)",re="rgba(255,255,255,.12)";function Ds({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],s=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,i)=>e.jsx("line",{className:"cg-say",style:{"--i":i,transformOrigin:"left center"},x1:"14",y1:n.y,x2:14+n.w,y2:n.y,stroke:ie,strokeWidth:"1"},n.y)),s.map((n,i)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":i+2,transformOrigin:"right center"},x1:146-n.w,y1:n.y,x2:"146",y2:n.y,stroke:i===0?"var(--color-primary)":ie,strokeWidth:i===0?1.6:1},n.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function Hs({className:t=""}){const a=[{x:26,ys:[26,48,70]},{x:80,ys:[20,48,76]},{x:134,ys:[32,62]}];return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--think ${t}`,fill:"none","aria-hidden":"true",children:[a[0].ys.map(n=>a[1].ys.map(i=>e.jsx("line",{x1:"26",y1:n,x2:"80",y2:i,stroke:re,strokeWidth:"1"},`${n}-${i}`))),a[1].ys.map(n=>a[2].ys.map(i=>e.jsx("line",{x1:"80",y1:n,x2:"134",y2:i,stroke:re,strokeWidth:"1"},`b${n}-${i}`))),e.jsx("path",{className:"cg-route",d:"M26 48 L80 20 L134 32",stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),a.map(({x:n,ys:i})=>i.map(r=>e.jsx("circle",{cx:n,cy:r,r:"2.2",fill:"rgba(255,255,255,.34)"},`${n}-${r}`))),e.jsx("circle",{cx:"134",cy:"32",r:"3",fill:"var(--color-primary)"})]})}function qs({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:re,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":ie,strokeWidth:n===0?1.6:1},s.y))]})}function _s({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:ie,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function Gs({className:t=""}){return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:re,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:ie,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:re,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Vs({className:t=""}){const a=[{x:18,y:20,w:34,h:12,dx:9,dy:-6},{x:18,y:38,w:34,h:12,dx:-7,dy:5},{x:18,y:56,w:34,h:12,dx:6,dy:8},{x:63,y:20,w:34,h:12,dx:-8,dy:7},{x:63,y:38,w:34,h:12,dx:7,dy:-8},{x:108,y:20,w:34,h:12,dx:8,dy:9}];return e.jsxs("svg",{viewBox:le,className:`cg-svg cg-svg--organize ${t}`,fill:"none","aria-hidden":"true",children:[[35,80,125].map(s=>e.jsx("line",{x1:s,y1:"14",x2:s,y2:"82",stroke:re,strokeWidth:"1"},s)),a.map((s,n)=>e.jsx("rect",{className:"cg-block",style:{"--dx":`${s.dx}px`,"--dy":`${s.dy}px`,"--i":n},x:s.x,y:s.y,width:s.w,height:s.h,rx:"3",stroke:n===0?"var(--color-primary)":ie,strokeWidth:n===0?1.4:1},`${s.x}-${s.y}`))]})}const Us=[{id:"talk",tag:"Conversation",title:"Talk",copy:"Talk things through with an AI that gets to know you.",art:Ds,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"think",tag:"Decisions",title:"Think",copy:"Work through ideas, questions, and decisions together.",art:Hs,task:{id:"think-decision",label:"Think through a decision",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}},{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's on your plate.",art:qs,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"explore",tag:"Curiosity",title:"Explore",copy:"Learn, compare, and make sense of things.",art:_s,task:{id:"explore-topic",label:"Make sense of something",basePrompt:"Help me understand this properly — what matters, what doesn't, and why.",question:"What do you want to get to the bottom of?"}},{id:"create",tag:"Make",title:"Create",copy:"Turn an idea into something real.",art:Gs,task:{id:"create-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"organize",tag:"Structure",title:"Organize",copy:"Bring structure to tasks, projects, and recurring work.",art:Vs,task:{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"}}];function Ys({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Us.map(({id:a,tag:s,title:n,copy:i,art:r,task:o},l)=>e.jsxs(d.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(r,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx($,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:i})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const Ne=[{id:"monitor",label:"Keep an eye on something",blurb:"Starchild can follow what changes and bring you what matters.",prompt:"Let me know when flights to Tokyo drop below $700.",panel:{kind:"monitor",agentName:"Tokyo flights",cadence:"Checking every hour",sources:["Google Flights","Skyscanner","Airlines","Fare alerts"],checks:[{time:"09:00",text:"Checked 6 airlines — cheapest $842"},{time:"13:00",text:"Checked 6 airlines — cheapest $828"},{time:"17:40",text:"Dropped below your $700",hit:!0}],alert:{heading:"Worth your attention",title:"Tokyo in October — $684 return",detail:"Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Take care of a routine",blurb:"Let Starchild handle something you do again and again.",prompt:"Every Sunday, help me plan the week ahead.",panel:{kind:"recurring",agentName:"Week ahead",uses:["Calendar","Gmail","Notes","Reminders"],runs:"Every Sunday at 6:00 PM",outputName:"Plan for the week",output:{heading:"This week",items:[{text:"Thursday is your only clear day",note:"the one to protect"},{text:"Two deadlines both land on Friday",note:"start the smaller one Tuesday"},{text:"Dentist still isn't booked",note:"third week it's slipped"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Give it a job",blurb:"Tell Starchild what you want done, what matters, and when to step in.",prompt:"Plan our trip in October. You know the budget and the dates — check with me before booking anything.",panel:{kind:"config",agentName:"October trip",fields:[{label:"The job",value:"Plan the trip end to end"},{label:"What matters",value:"Budget, the dates, who's coming"},{label:"When to step in",value:"Ask me before booking anything"}],tools:["Web","Gmail","Calendar","Maps"],status:"Active · first plan ready tomorrow"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}];function Xs({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"",width:16,height:16,className:"size-4 shrink-0"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Ks,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Oe({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Ks({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Oe,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(d.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(ne,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(d.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Oe,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(d.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(d.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(d.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Oe,{items:t.tools})]})]}),e.jsxs(d.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Zs({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:i}=Qe(Ne.length),r=Ne[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ee,{trackRef:a,pinned:s,screens:Ne.length,children:e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Give it something to keep track of, repeat, or take care of over time."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Ne.map((o,l)=>{const p=l===n;return e.jsxs("button",{type:"button",onClick:()=>i(l),"aria-pressed":p,className:`ag-tab${p?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:o.label}),e.jsx(K,{initial:!1,children:p&&e.jsx(d.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:e.jsx("span",{className:"ag-tab-blurb",children:o.blurb})})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(r.task),className:"ag-try",children:[r.task.label,e.jsx($,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Xs,{example:r})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Qs({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:i,onLogIn:r,onSignUp:o}){const l=c.useRef(null),p=()=>t();return e.jsxs("div",{children:[e.jsx(Bs,{onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:i,onLogIn:r,onSignUp:o}),e.jsx(Ys,{onStartTask:a}),e.jsx(Zs,{onStartTask:a}),e.jsx("div",{ref:l,children:e.jsx(Je,{showBenefits:!1})}),e.jsx(Ie,{onStartFree:p})]})}const Js=[{title:"Market research",copy:"Funding, liquidations, volatility and context."},{title:"Structured strategy",copy:"Entry, exit, sizing and invalidation rules."},{title:"Controlled execution",copy:"Orders on Hyperliquid, inside the permissions you approved."},{title:"24/7 monitoring",copy:"Jobs, alerts and automatic reports."},{title:"Visibility",copy:"Dashboards for PnL, margin, risk and positions."}],en=[{n:"01",title:"Connect Starchild to Hyperliquid",copy:"Choose how Starchild is allowed to operate on Hyperliquid."},{n:"02",title:"Design the strategy with the agent",copy:"Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules."},{n:"03",title:"Fund the strategy",copy:"Deposit USDC and make available the balance the strategy will use."},{n:"04",title:"Monitor performance and risk",copy:"Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you."}],tn=[{method:"Native Agent Wallet",custody:"Non-custodial (Privy); exportable key.",edge:"The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”."},{method:"Hyperliquid API wallet",custody:"Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",edge:"More separation between custody and execution; the credential goes through a secure flow, never through the chat."},{method:"Third-party builders",custody:"A trading account you authorize separately.",edge:"Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard)."}],an=["Trend","Volatility","Book liquidity","Funding","Open interest","Liquidations","Market context"],sn="./images/empresas.svg",nn=6,rn=["Coinglass","DeFiLlama","CoinGecko","TAAPI","Onchain data","Market APIs"],on=[{title:"Independent strategies",copy:"Each asset or strategy carries its own rules, capital, positions, orders, performance and logs."},{title:"Shared execution layer",copy:"Checks balances and permissions before any order is submitted."},{title:"Independent risk layer",copy:"Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",hard:!0}];function ln(){const t={r:4,fill:"var(--color-primary)"},a={duration:1.1,ease:[.16,1,.3,1],delay:.25},s={duration:1,ease:[.16,1,.3,1],delay:1.5};return e.jsx("div",{className:"tr-flowbox",children:e.jsxs("svg",{viewBox:"0 0 560 200",className:"tr-flowsvg",role:"img","aria-label":"Your strategy and market data both feed Conductor, which picks the models and tools for each part of the task and returns one analysis.",children:[e.jsx("path",{d:"M150 52 H210 Q230 52 230 72 V88",className:"tr-fl"}),e.jsx("path",{d:"M150 148 H210 Q230 148 230 128 V112",className:"tr-fl"}),e.jsx("path",{d:"M330 100 H392",className:"tr-fl"}),e.jsx("path",{d:"M470 128 V148 Q470 168 450 168 H150",className:"tr-fl"}),e.jsx("rect",{x:"20",y:"32",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"57",className:"tr-ftext",children:"Your strategy"}),e.jsx("rect",{x:"20",y:"128",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"153",className:"tr-ftext",children:"Market data"}),e.jsx("rect",{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fnode tr-fnode--hi"}),e.jsx("text",{x:"280",y:"105",className:"tr-ftext tr-ftext--hi",children:"Conductor"}),e.jsx("rect",{x:"392",y:"76",width:"156",height:"48",rx:"12",className:"tr-fnode"}),e.jsx("text",{x:"470",y:"99",className:"tr-ftext",children:"AI models"}),e.jsx("text",{x:"470",y:"115",className:"tr-ftext tr-ftext--sub",children:"+ the tools for the job"}),e.jsx("text",{x:"150",y:"172",className:"tr-ftext tr-ftext--end",textAnchor:"start",children:"Analysis"}),e.jsx(d.circle,{...t,initial:{cx:150,cy:52,opacity:0},whileInView:{cx:[150,230,230],cy:[52,52,90],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(d.circle,{...t,initial:{cx:150,cy:148,opacity:0},whileInView:{cx:[150,230,230],cy:[148,148,110],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(d.rect,{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fpulse",initial:{opacity:0},whileInView:{opacity:[0,.9,0]},viewport:{once:!0,amount:.6},transition:{duration:.9,delay:1.2}}),e.jsx(d.circle,{...t,initial:{cx:330,cy:100,opacity:0},whileInView:{cx:[330,470,470,190],cy:[100,100,168,168],opacity:[0,1,1,0]},viewport:{once:!0,amount:.6},transition:s})]})})}function cn({onNavigateHome:t,onEnterGuest:a,onLogIn:s,onSignUp:n}){const i=()=>a("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");return e.jsxs("div",{className:"tr-page",children:[e.jsx(da,{onNavigateHome:t,onNavigateTraders:()=>window.scrollTo({top:0,behavior:"smooth"}),onLogIn:s,onSignUp:n}),e.jsx("section",{className:"pt-8 pb-24 md:pt-10 md:pb-32",children:e.jsxs(M,{children:[e.jsxs("nav",{className:"tr-crumbs","aria-label":"Breadcrumb",children:[e.jsxs("button",{type:"button",onClick:t,className:"tr-crumb-link",children:[e.jsx(Te,{className:"size-3.5"}),"Home"]}),e.jsx("span",{className:"tr-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"tr-crumb-here","aria-current":"page",children:"For Traders"})]}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6 md:mt-20",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(d.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"tr-eyebrow",children:"Starchild for traders · Hyperliquid"}),e.jsx(d.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you know about the market into a strategy that runs."}),e.jsx(d.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Turn your trading logic into rules, research the market, execute on Hyperliquid and keep the strategy monitored around the clock."}),e.jsxs(d.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:i,className:"tr-cta",children:["Build a strategy",e.jsx($,{className:"size-3.5 rotate-45"})]}),e.jsx("span",{className:"tr-cta-note",children:"No account needed to start"})]})]})})]})}),e.jsxs("section",{className:"tr-band py-16 md:py-20",children:[e.jsx(M,{children:e.jsx("p",{className:"tr-strip-label",children:"Built around the ecosystem traders already use."})}),e.jsx("div",{className:"tr-strip-viewport mt-9","aria-hidden":"true",children:e.jsx("div",{className:"tr-strip-track",children:Array.from({length:nn},(r,o)=>e.jsx("img",{src:sn,alt:"",className:"tr-strip-img"},o))})})]}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(M,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("h2",{className:"tr-h2",children:"From knowledge to execution."}),e.jsx("p",{className:"tr-lead",children:"Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the decision layer: you explain your logic, set the conditions and the limits, and the agent turns that into an executable flow — research, execution, risk control and continuous monitoring."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-label",children:"What Starchild turns into a system"}),e.jsx("ul",{className:"tr-system",children:Js.map(({title:r,copy:o})=>e.jsxs("li",{children:[e.jsx("span",{className:"tr-system-title",children:r}),e.jsx("span",{className:"tr-system-copy",children:o})]},r))})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(M,{children:[e.jsx("h2",{className:"tr-h2 max-w-[24ch]",children:"Trade perps with an agent, in four steps."}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:en.map(({n:r,title:o,copy:l},p)=>e.jsxs(d.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:p%4*.06,ease:[.16,1,.3,1]},className:"tr-step col-span-12 sm:col-span-6 lg:col-span-3",children:[e.jsx("span",{className:"tr-step-n",children:r}),e.jsx("span",{className:"tr-step-title",children:o}),e.jsx("span",{className:"tr-step-copy",children:l})]},r))})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsxs(M,{children:[e.jsx("p",{className:"tr-step-tag",children:"Step 1"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[26ch]",children:"Connect Starchild to Hyperliquid."}),e.jsx("p",{className:"tr-lead mt-5 max-w-[70ch]",children:"The first decision is how Starchild is allowed to operate. There are three routes: the native Agent Wallet, a Hyperliquid API wallet, or a third-party builder."}),e.jsxs("div",{className:"tr-table mt-12",children:[e.jsxs("div",{className:"tr-tr tr-tr--head",children:[e.jsx("span",{children:"Method"}),e.jsx("span",{children:"Custody"}),e.jsx("span",{children:"What it gives you"})]}),tn.map(({method:r,custody:o,edge:l})=>e.jsxs("div",{className:"tr-tr",children:[e.jsx("span",{className:"tr-td-method",children:r}),e.jsx("span",{children:o}),e.jsx("span",{children:l})]},r))]})]})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(M,{children:[e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-6",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 2"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Design the strategy with the agent."}),e.jsx("p",{className:"tr-lead mt-5",children:"Instead of trading order by order, tell Starchild how you read the market, what you're trying to reach and which risks you accept. The agent researches, then helps turn that into a structured strategy — entry, position size, exit, invalidation and risk limits, all before anything executes."}),e.jsx("p",{className:"tr-label mt-10",children:"What the agent can weigh"}),e.jsx("div",{className:"tr-chips",children:an.map(r=>e.jsx("span",{className:"tr-chip",children:r},r))}),e.jsxs("p",{className:"tr-flow",children:["your logic ",e.jsx("span",{"aria-hidden":"true",children:"→"})," analysis ",e.jsx("span",{"aria-hidden":"true",children:"→"})," rules"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})," strategy"]})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-5 lg:col-start-8",children:[e.jsxs("div",{className:"tr-prompt",children:[e.jsx("p",{className:"tr-label",children:"Example prompt"}),e.jsx("p",{className:"tr-prompt-body",children:"“I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity and funding, and help me define entry, position size, invalidation, max loss and two exit scenarios. Don't execute anything yet.”"}),e.jsxs("button",{type:"button",onClick:i,className:"tr-prompt-cta",children:["Try this",e.jsx($,{className:"size-3.5 rotate-45"})]})]}),e.jsx("p",{className:"tr-label mt-12",children:"Risk architecture, in layers"}),e.jsx("div",{className:"tr-layers",children:on.map(({title:r,copy:o,hard:l})=>e.jsxs("div",{className:`tr-layer${l?" tr-layer--hard":""}`,children:[e.jsx("span",{className:"tr-layer-title",children:r}),e.jsx("span",{className:"tr-layer-copy",children:o})]},r))})]})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Market intelligence"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Data from the tools traders already rely on."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild can bring market data, technical signals and external sources into the same analysis — so the strategy isn't built from a model's memory alone."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsxs("div",{className:"tr-sources",children:[e.jsx("p",{className:"tr-label",children:"Sources"}),e.jsx("div",{className:"tr-chips",children:rn.map(r=>e.jsx("span",{className:"tr-chip",children:r},r))}),e.jsxs("div",{className:"tr-converge","aria-hidden":"true",children:[e.jsx("span",{className:"tr-converge-line"}),e.jsx("span",{className:"tr-converge-dot"}),e.jsx("span",{className:"tr-converge-line"})]}),e.jsxs("div",{className:"tr-analysis",children:[e.jsx("span",{className:"tr-analysis-title",children:"One analysis"}),e.jsx("span",{className:"tr-analysis-copy",children:"Funding, positioning and price read together, against your rules."})]})]})})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Conductor Mode"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Different market questions need different intelligence."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild combines your strategy context with the right models and tools for each part of the task."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsx(ln,{})})]})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(M,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 3"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[18ch]",children:"Fund the strategy."}),e.jsx("p",{className:"tr-lead mt-5",children:"Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid. No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets you already hold."}),e.jsxs("div",{className:"tr-approvals",children:[e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 1"}),e.jsx("span",{className:"tr-approval-copy",children:"Enables trading through the Agent Wallet."})]}),e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 2"}),e.jsx("span",{className:"tr-approval-copy",children:"Authorizes Starchild's builder code, within the fee limit you approved."})]})]}),e.jsx("p",{className:"tr-note",children:"After those two, the strategy can execute — inside the permissions and limits you set."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 4"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Monitor performance and risk."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and the health of the strategy. Those checks are what feed the alerts and the reports."}),e.jsxs("div",{className:"tr-cards",children:[e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Daily report"}),e.jsx("span",{className:"tr-card-copy",children:"Positions, realized and unrealized PnL, funding, fees, margin, exceptions and recommended actions."})]}),e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Alerts by exception"}),e.jsx("span",{className:"tr-card-copy",children:"Silent while everything is healthy. When something needs attention, the alert arrives with the context and a recommended action."})]})]}),e.jsx("p",{className:"tr-note",children:"It can also build custom dashboards — positions, margin, leverage, distance to liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's HyperTracker, HypurrScan and the Hyperliquid Explorer."})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsx(M,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Trading is part of the foundation."}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[16ch]",children:"Built with trading in its DNA."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-lead",children:"Starchild comes from an ecosystem with deep roots in trading, market infrastructure and crypto. That experience shapes how the product approaches data, execution and risk."}),e.jsx("div",{className:"tr-heritage",children:["WOO","WOOFi Pro","Orderly"].map(r=>e.jsx("span",{className:"tr-heritage-mark",children:r},r))})]})]})})}),e.jsx("section",{className:"py-28 text-center md:py-36",children:e.jsx(M,{children:e.jsxs("div",{className:"mx-auto flex max-w-[46ch] flex-col items-center gap-8",children:[e.jsx("h2",{className:"text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"You define the logic and the limits. Starchild keeps it running."}),e.jsx("p",{className:"tr-lead text-center",children:"Research, rules, execution inside approved permissions, risk control and continuous monitoring — one cycle instead of five tools."}),e.jsxs("button",{type:"button",onClick:i,className:"tr-cta",children:["Build a strategy",e.jsx($,{className:"size-3.5 rotate-45"})]}),e.jsxs("div",{className:"tr-tags",children:[e.jsx("span",{children:"Repeatable"}),e.jsx("span",{children:"Monitorable"}),e.jsx("span",{children:"Verifiable"})]})]})})}),e.jsx("style",{children:`
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
      `})]})}const Ft=["a","b","c"];function dn({variant:t,onChange:a}){const s=Math.max(0,Ft.indexOf(t));return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${t.toUpperCase()}`,children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${s*32}px)`},children:t.toUpperCase()}),Ft.map(n=>e.jsx("button",{type:"button",role:"radio","aria-checked":n===t,"aria-label":`Landing version ${n.toUpperCase()}`,onClick:()=>a(n),className:`vt-side${n===t?" vt-side--on":""}`,children:n.toUpperCase()},n))]}),e.jsx("style",{children:`
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
      `})]})}function pn({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function hn({name:t,tagline:a,colors:s}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:s.map(n=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:n},title:n},n))})]})}function xn({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function mn({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function gn({deliverable:t}){switch(t.kind){case"poster":return e.jsx(pn,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(hn,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(xn,{rows:t.rows});case"code":return e.jsx(mn,{language:t.language,snippet:t.snippet});case"none":return null}}const he="./icons/",un={gemini:`${he}gemini.svg`,openai:`${he}openai.svg`,xai:`${he}xai.svg`,deepseek:`${he}deepseek.svg`,"ai-generic":`${he}ai-generic.svg`};function fn({stat:t}){const{withoutTokens:a,withTokens:s}=t,[n,i]=c.useState(!1),[r,o]=c.useState(!1),l=c.useRef(void 0),p=a-s;c.useEffect(()=>(o(window.matchMedia("(hover: hover) and (pointer: fine)").matches),()=>window.clearTimeout(l.current)),[]),c.useEffect(()=>{if(!n)return;const u=b=>{b.key==="Escape"&&i(!1)};return document.addEventListener("keydown",u),()=>document.removeEventListener("keydown",u)},[n]);const x=()=>{window.clearTimeout(l.current),i(!0)},h=()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>i(!1),140)};return e.jsxs("div",{className:"relative self-start",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("span",{className:"size-1.5 shrink-0 rounded-full bg-[#f84600]","aria-hidden":"true"}),e.jsxs("p",{className:"text-[13px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:["Saved"," ",e.jsx("span",{className:"font-medium text-white/90 tabular-nums",children:p.toLocaleString("en-US")})," ","tokens with Conductor Mode"]}),e.jsx("button",{type:"button",onClick:()=>i(u=>!u),onPointerEnter:r?x:void 0,onPointerLeave:r?h:void 0,onFocus:r?x:void 0,onBlur:r?h:void 0,"aria-expanded":n,"aria-label":"How this saving was estimated",className:"rounded-full p-0.5 text-[#f84600]/60 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70",children:e.jsx(Qa,{className:"size-4"})})]}),n&&(r?e.jsx(d.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.22,ease:[.16,1,.3,1]},onPointerEnter:x,onPointerLeave:h,role:"tooltip",className:"absolute bottom-[calc(100%+10px)] left-0 z-40 w-[min(440px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:e.jsx(ha,{stat:t})}):e.jsx(yn,{stat:t,onClose:()=>i(!1)}))]})}function ha({stat:t}){const{withoutLabel:a,withoutTokens:s,withLabel:n,withTokens:i}=t,r=Math.round((1-i/s)*100);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Estimated savings on this task"}),e.jsxs("span",{className:"flex shrink-0 items-center gap-1.5 rounded-full bg-[#f84600]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]","aria-hidden":"true"}),"Conductor Mode"]})]}),e.jsx("div",{className:"mt-4 flex flex-col gap-3",children:[{label:a,tokens:s,accent:!1},{label:n,tokens:i,accent:!0}].map(o=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"w-[132px] shrink-0 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:o.label}),e.jsx("div",{className:"h-2 flex-1 overflow-hidden rounded-full bg-white/10",children:e.jsx(d.div,{className:`h-full rounded-full ${o.accent?"bg-[#f84600]":"bg-white/25"}`,initial:{width:0},animate:{width:`${o.tokens/s*100}%`},transition:{duration:.7,ease:[.16,1,.3,1],delay:.15}})}),e.jsx("span",{className:"w-[74px] shrink-0 text-right text-[12.5px] tabular-nums text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:o.tokens.toLocaleString("en-US")})]},o.label))}),e.jsxs("p",{className:"mt-4 text-[13.5px] font-medium text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:["~",r,"% fewer tokens burned on this exact task."]}),e.jsx("p",{className:"mt-1 text-[11.5px] text-white/35 italic",style:{fontFamily:"var(--font-google-sans)"},children:"Illustrative estimate for this demo — not a live token count."})]})}function yn({stat:t,onClose:a}){return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm",role:"dialog","aria-modal":"true","aria-label":"Estimated savings on this task",onClick:a,children:e.jsxs(d.div,{initial:{opacity:0,y:10,scale:.98},animate:{opacity:1,y:0,scale:1},transition:{duration:.28,ease:[.16,1,.3,1]},onClick:s=>s.stopPropagation(),className:"w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:[e.jsx(ha,{stat:t}),e.jsx("button",{type:"button",onClick:a,className:"mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]",style:{fontFamily:"var(--font-google-sans)"},children:"Close"})]})})}function bn({scenario:t,onStep:a,onDone:s}){const{steps:n,models:i,deliverable:r,stat:o}=t,[l,p]=c.useState(0),[x,h]=c.useState(!1);c.useEffect(()=>{p(0),h(!1)},[t]),c.useEffect(()=>{if(a==null||a(),l>=n.length){const y=setTimeout(()=>{h(!0),s==null||s()},500);return()=>clearTimeout(y)}const b=setTimeout(()=>p(y=>y+1),700);return()=>clearTimeout(b)},[l,n]);const u=x?100:Math.min(l,n.length)/n.length*100;return e.jsxs("div",{className:"relative flex flex-col gap-3.5 py-1 pl-1",children:[e.jsx("div",{className:"absolute top-1 bottom-1 left-[7px] w-px bg-white/12","aria-hidden":"true",children:e.jsx(d.div,{className:"w-px bg-[#f84600]",initial:{height:0},animate:{height:`${u}%`},transition:{duration:.4,ease:"easeOut"}})}),n.slice(0,l).map((b,y)=>{const k=y===l-1&&!x;return e.jsxs(d.div,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsx("span",{className:`relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full ${k?"border-2 border-[#f84600] bg-[#0a0a0a]":"bg-[#0a0a0a]"}`,children:k?e.jsx(d.span,{className:"size-1.5 rounded-full bg-[#f84600]",animate:{scale:[1,1.4,1]},transition:{duration:1.4,repeat:1/0}}):e.jsx(ne,{className:"size-3.5 text-[#f84600]"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:`text-[14.5px] font-medium ${k?"text-white":"text-white/55"}`,style:{fontFamily:"var(--font-google-sans)"},children:b.title}),y===0&&k&&e.jsx("div",{className:"mt-2.5 flex flex-wrap gap-1.5",children:i.map(f=>e.jsxs("span",{className:"flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5",children:[e.jsx("img",{src:un[f.icon],alt:"",className:"size-3.5 object-contain"}),e.jsx("span",{className:"text-[11.5px] font-medium text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:f.name})]},f.name))})]})]},b.title)}),x&&e.jsxs(d.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsx("span",{className:"relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]",children:e.jsx(ne,{className:"size-3.5 text-[#f84600]"})}),e.jsxs("div",{className:"flex flex-1 flex-col gap-4",children:[e.jsx("p",{className:"text-[14.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Done."}),r.kind!=="none"&&e.jsx(gn,{deliverable:r}),e.jsx(fn,{stat:o})]})]})]})}function wn({tasksRemaining:t,onLockedFeature:a}){return e.jsxs("div",{className:"hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex",children:[e.jsx(ue,{className:"size-6"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[12px] leading-relaxed text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:"You're trying Starchild with limited access. Create an account to save what Starchild learns about you and continue anywhere."})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Available"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:wt.available.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-[12.5px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(ne,{className:"size-3 text-emerald-400"}),s]},s))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Requires account"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:wt.locked.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:a,className:"flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Kt,{className:"size-3 shrink-0"}),s]})},s))})]}),e.jsx("div",{className:"mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center",children:e.jsxs("p",{className:"text-[12px] font-medium text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:[Math.max(t,0)," guest interaction",t===1?"":"s"," remaining"]})})]})}function et({heading:t,sub:a,ctaLabel:s="Create account & continue",backLabel:n="Sign up",footerNote:i="Already have an account?",showForm:r=!0,onBack:o,onContinue:l}){const[p,x]=c.useState("you@example.com"),[h,u]=c.useState("starchild"),b=!r||p.trim()!==""&&h.trim()!=="";return e.jsxs(d.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[o&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:o,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Te,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:n})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(Kt,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[r&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:p,onChange:y=>x(y.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:h,onChange:y=>u(y.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:l,disabled:!b,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[i," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}const vn=["Work","Something I'm building","A decision","Too much on my plate","Something personal","I'm not sure yet"],Wt="What's taking up most of your attention lately?",jn="One thing that helps me work better with you: do you want me to be more direct, or give you more room to think things through?";function kn(t){return t==="direct"?"be direct":"give you room to think"}function Pt(t,a){const s=t?`You're mainly thinking about ${t.replace(/\.$/,"").toLowerCase()}`:"We haven't landed on a topic yet";return a?`Here's what I understand so far. ${s}, and it sounds like you'd rather I ${kn(a)}. I'll start there and learn the rest as we go.`:`Here's what I understand so far. ${s}. I'll start there, and I'll pick up how you like me to say things as we go.`}function $t(t){return t?`Got it. Let's start there. What would have to happen this week for ${t.replace(/\.$/,"").toLowerCase()} to feel handled?`:"So — what's the first thing you'd like to put in front of me?"}let Nn=0;const Rt=()=>`t${Nn++}`;function zn({task:t,onDone:a}){const[s,n]=c.useState(t?"continuity":"guided"),[i,r]=c.useState([{id:Rt(),from:"starchild",text:t?`You were working on ${t.label.toLowerCase()}. Want to keep going, or should I get to know how you like to work first?`:Wt}]),[o,l]=c.useState(),[p,x]=c.useState(),h=(f,v)=>r(j=>[...j,{id:Rt(),from:f,text:v}]),u=()=>{h("starchild",jn),n("preference")};return{step:s,turns:i,acceptsText:s==="guided"||s==="adjust",submit:f=>{const v=f.trim();if(v){if(h("you",v),s==="adjust"){l(v),h("starchild",Pt(v,p)),n("read");return}l(v),u()}},choose:f=>{if(h("you",f),s==="guided"){if(f==="I'm not sure yet"){h("starchild","That's fine — we can find it as we go."),a({tone:p,opening:$t(void 0)});return}l(f),u();return}if(s==="preference"){const v=f==="More direct"?"direct":f==="More space"?"space":void 0;x(v),h("starchild",Pt(o,v)),n("read")}},act:f=>{if(f==="keep-going"&&t){a({opening:t.question});return}if(f==="get-to-know"){h("starchild",Wt),n("guided");return}if(f==="adjust"){h("starchild","Tell me what I got wrong."),n("adjust");return}f==="accept"&&a({topic:o,tone:p,opening:$t(o)})}}}function Cn({meeting:t}){const{step:a,turns:s,choose:n,act:i}=t,r=s[s.length-1],o=(r==null?void 0:r.from)==="you";return e.jsxs("div",{className:"w-full max-w-[560px]",children:[e.jsx("div",{className:"flex flex-col gap-6",children:s.map(l=>l.from==="starchild"?e.jsxs(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.5,ease:[.16,1,.3,1]},className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1.5 shrink-0",children:e.jsx(Le,{state:o?"thinking":"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:l.text})]},l.id):e.jsx(d.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"self-end rounded-[16px_16px_4px_16px] bg-white/[0.07] px-4 py-2.5 text-[15px] text-white",style:{fontFamily:"var(--font-google-sans)"},children:l.text},l.id))}),e.jsx(K,{mode:"wait",children:e.jsxs(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4,delay:.35,ease:[.16,1,.3,1]},className:"mt-7 flex flex-wrap gap-2.5",children:[a==="continuity"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{primary:!0,onClick:()=>i("keep-going"),children:"Keep going"}),e.jsx(X,{onClick:()=>i("get-to-know"),children:"Get to know me"})]}),a==="guided"&&vn.map(l=>e.jsx(X,{onClick:()=>n(l),children:l},l)),a==="preference"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{onClick:()=>n("More direct"),children:"More direct"}),e.jsx(X,{onClick:()=>n("More space"),children:"More space"}),e.jsx(X,{onClick:()=>n("Let's see as we go"),children:"Let's see as we go"})]}),a==="read"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{primary:!0,onClick:()=>i("accept"),children:"Looks right"}),e.jsx(X,{onClick:()=>i("adjust"),children:"Adjust"})]})]},a)})]})}function X({children:t,onClick:a,primary:s=!1}){return e.jsx("button",{type:"button",onClick:a,className:`rounded-full px-5 py-2.5 text-[13.5px] transition-colors ${s?"bg-[#f84600] text-white hover:scale-[1.02]":"border border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35 hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:t})}function Sn({onBack:t,intents:a,onRequestSignup:s,onLogIn:n,onLearned:i,initialMessage:r,openingMessage:o,task:l,isGuest:p=!1}){const[x,h]=c.useState(r??null),[u,b]=c.useState(r?vt(r):null),[y,k]=c.useState(!1),[f,v]=c.useState(""),j=p,[C,P]=c.useState(r?1:2),[T,F]=c.useState(null),[L,N]=c.useState(!1),A=c.useRef(null),R=c.useRef(null),[W,S]=c.useState(l),[m,E]=c.useState(o);function I(g,z){F({heading:g,sub:z})}function O(g){S(g),E(g.question)}const _=zn({task:j?void 0:l,onDone:({topic:g,tone:z,opening:w})=>{i==null||i({topic:g,tone:z}),N(!0),w&&E(w)}}),V=!j&&!L&&x===null&&!o,U=V&&_.acceptsText;function D(g){const z=g.trim();if(z){if(j&&C<=0){I("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}h(z),b(vt(W?`${W.basePrompt} ${z}`:z)),j&&P(w=>w-1)}}function H(){var g;(g=A.current)==null||g.scrollIntoView({behavior:"smooth",block:"end"})}return c.useEffect(()=>{const g=setTimeout(H,50);return()=>clearTimeout(g)},[x,y]),e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[j?e.jsx(wn,{tasksRemaining:C,onLockedFeature:()=>I("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience.")}):e.jsx("div",{className:"hidden w-14 shrink-0 flex-col items-center border-r border-white/[0.08] pt-6 md:flex",children:e.jsx(ue,{className:"size-6"})}),T&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:g=>{g.target===g.currentTarget&&F(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(et,{heading:T.heading,sub:T.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{F(null),s==null||s()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(Te,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode"}),j&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var g;return(g=n??s)==null?void 0:g()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:x===null?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[m?e.jsxs(d.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[W&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:W.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(Le,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:m})]})]}):j?e.jsx(d.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(Ze,{onStartTask:O,align:"center",intents:a})}):V?e.jsx(Cn,{meeting:_}):null,e.jsxs(d.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx("input",{ref:R,value:f,onChange:g=>v(g.target.value),onKeyDown:g=>{if(g.key==="Enter"){if(U){_.submit(f),v("");return}D(f)}},placeholder:U?"Tell me anything…":m?"Answer however you like…":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!m}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(Ce,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{type:"button",className:"flex items-center gap-1 text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Ge,{className:"size-3 text-white/35"})]}),e.jsx("button",{type:"button",onClick:()=>D(f||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:f.trim()?e.jsx($,{className:"size-4"}):e.jsx(ft,{className:"size-4"})})]})]})]})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("div",{className:"max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:x})}),e.jsx(bn,{scenario:u,onStep:H,onDone:()=>k(!0)}),y&&j&&e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.9},className:"mt-6 border-t border-white/[0.08] pt-6",children:e.jsxs("button",{type:"button",onClick:()=>I("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience."),className:"group flex items-center gap-2.5 text-[13.5px] text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["Create a free account to keep this",e.jsx($,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})}),e.jsx("div",{ref:A})]})}),x!==null&&e.jsx("div",{className:"shrink-0 border-t border-white/[0.08] px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5",children:[e.jsx("button",{type:"button",className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(Ce,{className:"size-4"})}),e.jsx("input",{disabled:!0,placeholder:y?"Monetize, meet the marketplace":"Ask Conductor anything…",className:"flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("span",{className:"flex items-center gap-1 text-[12.5px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Ge,{className:"size-3 text-white/35"})]}),e.jsx("span",{className:"flex size-8 items-center justify-center rounded-full bg-[#f84600] text-white",children:e.jsx(ft,{className:"size-3.5"})})]})})]})]})}const Mn={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function Tn({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(M,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:rs.map(({prompt:a,scenario:s},n)=>e.jsxs(d.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:n*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:Mn[s.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx($,{className:"size-4 rotate-45"})})]},s.id))})]})})}function Ln({onNavigateHome:t,onOpenMarketplace:a,onTry:s,onLogIn:n,onSignUp:i}){const r=c.useRef(null);function o(){var l;(l=r.current)==null||l.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(ta,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:n,onSignUp:i}),e.jsxs(M,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(d.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(d.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(d.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>s(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:o,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(d.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(ka,{onTryConductorMode:()=>s()}),e.jsx("div",{ref:r,children:e.jsx(Tn,{onTryExample:l=>s(l)})}),e.jsx(Ie,{onStartFree:()=>s()})]})}const De=[{Icon:Xe,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:Ke,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:Zt,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function En({onDone:t}){const[a,s]=c.useState(0),n=De[a],i=a===De.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(K,{mode:"wait",children:e.jsxs(d.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(n.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:n.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:n.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:De.map((r,o)=>e.jsx("button",{type:"button",onClick:()=>s(o),"aria-label":`Go to slide ${o+1}`,className:`h-1.5 rounded-full transition-all ${o===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},o))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>i?t():s(r=>r+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:i?"Ok, let's go":"Next"})]})]})}function In({intent:t,skillTitle:a,onBack:s,onContinue:n}){const i=t==="create"?"Create a free account to list your skill":"Create a free account to get this skill",r=t==="create"?"So buyers know who built it, and payouts land somewhere real.":`So "${a}" lands in your library and the seller actually gets paid.`;return e.jsx(et,{heading:i,sub:r,onBack:s,onContinue:n})}const An={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function Fn(t){return An[t]??{bg:"#e5e5e5",text:"#404040"}}function Wn({skill:t,onSelect:a}){const s=Fn(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:n=>{a&&(n.key==="Enter"||n.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:s.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:s.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function Pn({open:t,onClose:a,skills:s,onAddSkill:n}){const[i,r]=c.useState("onboarding"),[o,l]=c.useState("All"),[p,x]=c.useState(""),[h,u]=c.useState(""),[b,y]=c.useState(""),[k,f]=c.useState(""),[v,j]=c.useState(We[2]),[C,P]=c.useState(null),[T,F]=c.useState(null);c.useEffect(()=>{t&&(r("onboarding"),P(null),F(null))},[t]);function L(){P("create"),r("auth")}function N(m){P("buy"),F(m),r("auth")}function A(){r(C==="create"?"create":"purchased")}function R(){h.trim()&&(n({id:`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:h.trim(),price:k.trim()||"$5",category:v,blurb:b.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),u(""),y(""),f(""),r("grid"))}const W=p.trim().toLowerCase(),S=s.filter(m=>{const E=o==="All"||m.category===o,I=!W||m.title.toLowerCase().includes(W)||m.blurb.toLowerCase().includes(W)||m.category.toLowerCase().includes(W);return E&&I});return e.jsx(K,{children:t&&e.jsx(d.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:m=>{m.target===m.currentTarget&&a()},children:e.jsxs(d.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(Xa,{className:"size-4"})})]}),e.jsx(K,{mode:"wait",children:i==="onboarding"?e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(En,{onDone:()=>r("grid")})},"onboarding"):i==="grid"?e.jsxs(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:L,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl bg-white/10",children:e.jsx(ue,{className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(m=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${m===0?"w-4 bg-[#f84600]":"w-1.5 bg-white/20"}`},m))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(Zt,{className:"size-4 text-white/40"}),e.jsx("input",{value:p,onChange:m=>x(m.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:We.map(m=>e.jsx("button",{type:"button",onClick:()=>l(m),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${o===m?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:m},m))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[S.map(m=>e.jsx(Wn,{skill:m,onSelect:m.mine?void 0:()=>N(m)},m.id)),e.jsxs("button",{type:"button",onClick:L,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(Ce,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]})]})]},"grid"):i==="create"?e.jsxs(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>r("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Te,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:h,onChange:m=>u(m.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:b,onChange:m=>y(m.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:k,onChange:m=>f(m.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:v,onChange:m=>j(m.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:We.filter(m=>m!=="All").map(m=>e.jsx("option",{value:m,children:m},m))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:R,disabled:!h.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Ce,{className:"size-3.5"}),"add"]})})]},"create"):i==="auth"?e.jsx(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(In,{intent:C==="create"?"create":"buy",skillTitle:T==null?void 0:T.title,onBack:()=>r("grid"),onContinue:A})},"auth"):e.jsxs(d.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(ne,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',T==null?void 0:T.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>r("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const Ve="v",Ue="c";function $n(){if(typeof window>"u")return Ue;const t=new URLSearchParams(window.location.search).get(Ve);return t==="a"||t==="b"||t==="c"?t:Ue}function Rn(){const[t,a]=c.useState($n),[s,n]=c.useState("landing"),[i,r]=c.useState(),[o,l]=c.useState(),[p,x]=c.useState(),[h,u]=c.useState(!1),[b,y]=c.useState(!1),[k,f]=c.useState(os);function v(N){a(N);const A=new URL(window.location.href);N===Ue?A.searchParams.delete(Ve):A.searchParams.set(Ve,N),window.history.replaceState(null,"",A),window.scrollTo({top:0})}function j(N){f(A=>[N,...A])}function C(N){r(N),l(void 0),x(void 0),u(!0),n("chat")}function P(N){r(void 0),l(N.question),x(N),u(!0),n("chat")}function T(){n("landing")}function F(){n("for-traders"),window.scrollTo({top:0})}function L(){n("signup")}return e.jsxs(e.Fragment,{children:[s==="landing"&&e.jsxs(e.Fragment,{children:[t==="c"?e.jsx(Qs,{onEnterGuest:C,onStartTask:P,onNavigateTraders:F,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>y(!0),onLogIn:L,onSignUp:L},"c"):(()=>{const N=t==="b"?Is:ws;return e.jsx(N,{onEnterGuest:C,onStartTask:P,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>y(!0),onLogIn:L,onSignUp:L},t)})(),e.jsx(dn,{variant:t,onChange:v})]}),s==="for-traders"&&e.jsx(cn,{onNavigateHome:T,onEnterGuest:C,onLogIn:L,onSignUp:L}),s==="conductor-mode"&&e.jsx(Ln,{onNavigateHome:T,onOpenMarketplace:()=>y(!0),onTry:C,onLogIn:L,onSignUp:L}),s==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(et,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>h?n("chat"):T(),onContinue:()=>{u(!1),r(void 0),l(void 0),n("chat")}})})}),s==="chat"&&e.jsx(Sn,{onBack:T,intents:t==="c"?pa:void 0,onOpenMarketplace:()=>y(!0),onRequestSignup:()=>n("signup"),onLogIn:L,initialMessage:i,openingMessage:o,task:p,isGuest:h}),e.jsx(Pn,{open:b,onClose:()=>y(!1),skills:k,onAddSkill:j})]})}Na.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(Rn,{})}));
