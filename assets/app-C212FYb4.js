import{f as ie,c as $e,r as c,s as At,a as Wt,p as oa,v as ia,i as ra,b as la,d as ca,e as da,n as $t,g as pa,h as ha,u as Pt,j as xa,m as Pe,k as Rt,l as re,M as ua,o as e,q as p,C as W,A as H,t as ma,w as ga}from"./ConductorModeSection-DOAp4Ah7.js";function Ot(t,a){let s;const n=()=>{const{currentTime:o}=a,r=(o===null?0:o.value)/100;s!==r&&t(r),s=r};return ie.preUpdate(n,!0),()=>$e(n)}function fa(t,a,s){c.useInsertionEffect(()=>t.on(a,s),[t,a,s])}function be(t){return typeof window>"u"?!1:t?At():Wt()}const ya=50,tt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),ba=()=>({time:0,x:tt(),y:tt()}),wa={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function at(t,a,s,n){const o=s[a],{length:i,position:r}=wa[a],l=o.current,d=s.time;o.current=Math.abs(t[`scroll${r}`]),o.scrollLength=t[`scroll${i}`]-t[`client${i}`],o.offset.length=0,o.offset[0]=0,o.offset[1]=o.scrollLength,o.progress=oa(0,o.scrollLength,o.current);const h=n-d;o.velocity=h>ya?0:ia(o.current-l,h)}function va(t,a,s){at(t,"x",a,s),at(t,"y",a,s),a.time=s}function ka(t,a){const s={x:0,y:0};let n=t;for(;n&&n!==a;)if(ra(n))s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const o=n.getBoundingClientRect();n=n.parentElement;const i=n.getBoundingClientRect();s.x+=o.left-i.left,s.y+=o.top-i.top}else if(n instanceof SVGGraphicsElement){const{x:o,y:i}=n.getBBox();s.x+=o,s.y+=i;let r=null,l=n.parentNode;for(;!r;)l.tagName==="svg"&&(r=l),l=n.parentNode;n=r}else break;return s}const Re={start:0,center:.5,end:1};function st(t,a,s=0){let n=0;if(t in Re&&(t=Re[t]),typeof t=="string"){const o=parseFloat(t);t.endsWith("px")?n=o:t.endsWith("%")?t=o/100:t.endsWith("vw")?n=o/100*document.documentElement.clientWidth:t.endsWith("vh")?n=o/100*document.documentElement.clientHeight:t=o}return typeof t=="number"&&(n=a*t),s+n}const ja=[0,0];function Na(t,a,s,n){let o=Array.isArray(t)?t:ja,i=0,r=0;return typeof t=="number"?o=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?o=t.split(" "):o=[t,Re[t]?t:"0"]),i=st(o[0],s,n),r=st(o[1],a),i-r}const le={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},Ca={x:0,y:0};function Sa(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function za(t,a,s){const{offset:n=le.All}=s,{target:o=t,axis:i="y"}=s,r=i==="y"?"height":"width",l=o!==t?ka(o,t):Ca,d=o===t?{width:t.scrollWidth,height:t.scrollHeight}:Sa(o),h={width:t.clientWidth,height:t.clientHeight};a[i].offset.length=0;let x=!a[i].interpolate;const u=n.length;for(let m=0;m<u;m++){const f=Na(n[m],h[r],d[r],l[i]);!x&&f!==a[i].interpolatorOffsets[m]&&(x=!0),a[i].offset[m]=f}x&&(a[i].interpolate=la(a[i].offset,ca(n),{clamp:!1}),a[i].interpolatorOffsets=[...a[i].offset]),a[i].progress=da(0,1,a[i].interpolate(a[i].current))}function La(t,a=t,s){if(s.x.targetOffset=0,s.y.targetOffset=0,a!==t){let n=a;for(;n&&n!==t;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=a===t?a.scrollWidth:a.clientWidth,s.y.targetLength=a===t?a.scrollHeight:a.clientHeight,s.x.containerLength=t.clientWidth,s.y.containerLength=t.clientHeight}function Ma(t,a,s,n={}){return{measure:o=>{La(t,n.target,s),va(t,s,o),(n.offset||n.target)&&za(t,s,n)},notify:()=>a(s)}}const V=new WeakMap,nt=new WeakMap,Le=new WeakMap,ot=new WeakMap,pe=new WeakMap,it=t=>t===document.scrollingElement?window:t;function Bt(t,{container:a=document.scrollingElement,trackContentSize:s=!1,...n}={}){if(!a)return $t;let o=Le.get(a);o||(o=new Set,Le.set(a,o));const i=ba(),r=Ma(a,t,i,n);if(o.add(r),!V.has(a)){const d=()=>{for(const m of o)m.measure(ha.timestamp);ie.preUpdate(h)},h=()=>{for(const m of o)m.notify()},x=()=>ie.read(d);V.set(a,x);const u=it(a);window.addEventListener("resize",x),a!==document.documentElement&&nt.set(a,pa(a,x)),u.addEventListener("scroll",x),x()}if(s&&!pe.has(a)){const d=V.get(a),h={width:a.scrollWidth,height:a.scrollHeight};ot.set(a,h);const x=()=>{const m=a.scrollWidth,f=a.scrollHeight;(h.width!==m||h.height!==f)&&(d(),h.width=m,h.height=f)},u=ie.read(x,!0);pe.set(a,u)}const l=V.get(a);return ie.read(l,!1,!0),()=>{var u;$e(l);const d=Le.get(a);if(!d||(d.delete(r),d.size))return;const h=V.get(a);V.delete(a),h&&(it(a).removeEventListener("scroll",h),(u=nt.get(a))==null||u(),window.removeEventListener("resize",h));const x=pe.get(a);x&&($e(x),pe.delete(a)),ot.delete(a)}}const Ta=[[le.Enter,"entry"],[le.Exit,"exit"],[le.Any,"cover"],[le.All,"contain"]],rt={start:0,end:1};function Ea(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const s=rt[a[0]],n=rt[a[1]];if(!(s===void 0||n===void 0))return[s,n]}function Ia(t){if(t.length!==2)return;const a=[];for(const s of t)if(Array.isArray(s))a.push(s);else if(typeof s=="string"){const n=Ea(s);if(!n)return;a.push(n)}else return;return a}function Fa(t,a){const s=Ia(t);if(!s)return!1;for(let n=0;n<2;n++){const o=s[n],i=a[n];if(o[0]!==i[0]||o[1]!==i[1])return!1}return!0}function Oe(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,s]of Ta)if(Fa(t,a))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const lt=new Map;function ct(t){const a={value:0},s=Bt(n=>{a.value=n[t.axis].progress*100},t);return{currentTime:a,cancel:s}}function Dt({source:t,container:a,...s}){const{axis:n}=s;t&&(a=t);let o=lt.get(a);o||(o=new Map,lt.set(a,o));const i=s.target??"self";let r=o.get(i);r||(r={},o.set(i,r));const l=n+(s.offset??[]).join(",");return r[l]||(s.target&&be(s.target)?Oe(s.offset)?r[l]=new ViewTimeline({subject:s.target,axis:n}):r[l]=ct({container:a,...s}):be()?r[l]=new ScrollTimeline({source:a,axis:n}):r[l]=ct({container:a,...s})),r[l]}function Aa(t,a){const s=Dt(a),n=a.target?Oe(a.offset):void 0,o=a.target?be(a.target)&&!!n:be();return t.attachTimeline({timeline:o?s:void 0,...n&&o&&{rangeStart:n.rangeStart,rangeEnd:n.rangeEnd},observe:i=>(i.pause(),Ot(r=>{i.time=i.iterationDuration*r},s))})}function Wa(t){return t&&(t.target||t.offset)}function $a(t){return t.length===2}function Pa(t,a){return $a(t)||Wa(a)?Bt(s=>{t(s[a.axis].progress,s)},a):Ot(t,Dt(a))}function _t(t,{axis:a="y",container:s=document.scrollingElement,...n}={}){if(!s)return $t;const o={axis:a,container:s,...n};return typeof t=="function"?Pa(t,o):Aa(t,o)}const Ra=()=>({scrollX:re(0),scrollY:re(0),scrollXProgress:re(0),scrollYProgress:re(0)}),Q=t=>t?!t.current:!1;function dt(t,a,s,n){return{factory:o=>{let i;const r=()=>{if(Q(s)||Q(n)){Pe.read(r);return}i=_t(o,{...a,axis:t,container:(s==null?void 0:s.current)||void 0,target:(n==null?void 0:n.current)||void 0})};return Pe.read(r),()=>{Rt(r),i==null||i()}},times:[0,1],keyframes:[0,1],ease:o=>o,duration:1}}function Oa(t,a){return typeof window>"u"?!1:t?At()&&!!Oe(a):Wt()}function Ba({container:t,target:a,...s}={}){const n=Pt(Ra);Oa(a,s.offset)&&(n.scrollXProgress.accelerate=dt("x",s,t,a),n.scrollYProgress.accelerate=dt("y",s,t,a));const o=c.useRef(null),i=c.useRef(!1),r=c.useCallback(()=>(o.current=_t((l,{x:d,y:h})=>{n.scrollX.set(d.current),n.scrollXProgress.set(d.progress),n.scrollY.set(h.current),n.scrollYProgress.set(h.progress)},{...s,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var l;(l=o.current)==null||l.call(o)}),[t,a,JSON.stringify(s.offset)]);return xa(()=>{if(i.current=!1,Q(t)||Q(a)){i.current=!0;return}else return r()},[r]),c.useEffect(()=>{if(!i.current)return;let l;const d=()=>{const h=Q(t),x=Q(a);!h&&!x&&(l=r())};return Pe.read(d),()=>{Rt(d),l==null||l()}},[r]),n}function _(t){const a=Pt(()=>re(t)),{isStatic:s}=c.useContext(ua);if(s){const[,n]=c.useState(t);c.useEffect(()=>a.on("change",n),[])}return a}function Y({className:t}){return e.jsxs("div",{className:`relative overflow-hidden rounded-[7px] ${t??"size-6"}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[#1c1c1c]"}),e.jsx("div",{className:"absolute inset-0 bg-[#f84600]",style:{clipPath:"polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)"}})]})}function we({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function pt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function D({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function ht({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Da({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Be({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function _a({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ht({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Ha({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function je({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Gt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function qt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function De({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function Yt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Vt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ga({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function qa({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}const Ya={idle:{scale:[1,1.06,1],opacity:[.75,1,.75],duration:3.4},listening:{scale:[1,1.12,1],opacity:[.85,1,.85],duration:2.2},acknowledging:{scale:[1,.86,1.04,1],opacity:[1,1,1,1],duration:.5},thinking:{scale:[1,1.18,.94,1],opacity:[1,.7,1,1],duration:1.1},settled:{scale:[1,1.03,1],opacity:[.9,1,.9],duration:4.6}};function ce({state:t="idle",depth:a=0,size:s=18}){const n=Ya[t],o=10+a*26,i=.1+a*.22;return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:s*3,height:s*3},children:[e.jsx(p.span,{"aria-hidden":"true",className:"absolute rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)"},animate:{width:s*(2+a*.9),height:s*(2+a*.9),opacity:i},transition:{duration:.8,ease:[.16,1,.3,1]}}),e.jsx(p.span,{"aria-hidden":"true",className:"relative rounded-full bg-[#f84600]",style:{width:s,height:s,boxShadow:`0 0 ${o}px rgba(248,70,0,.7)`},animate:{scale:n.scale,opacity:n.opacity},transition:{duration:n.duration,repeat:t==="acknowledging"?0:1/0,ease:"easeInOut"}})]})}const xt=.34,ut=.15,U=860,he=560,xe=14;function Va({targetRef:t,image:a}){const s=c.useRef(null),n=c.useRef(null),o=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{const r=t.current,l=s.current;if(!r||!l||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const h=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let x=0,u=0,m=0,f=0,w=0,j=0,k=!1,N=0;const z=()=>{var E,y,P,b;(E=i.current)==null||E.style.setProperty("transform",`translate3d(${m-xe/2}px, ${f-xe/2}px, 0)`),(y=o.current)==null||y.style.setProperty("transform",`translate3d(${w-he/2}px, ${j-he/2}px, 0)`),(P=n.current)==null||P.style.setProperty("--mx",`${w-U/2}px`),(b=n.current)==null||b.style.setProperty("--my",`${j-U/2}px`)},I=()=>{m+=(x-m)*xt,f+=(u-f)*xt,w+=(m-w)*ut,j+=(f-j)*ut,z(),N=requestAnimationFrame(I)},L=E=>{const y=r.getBoundingClientRect();if(x=E.clientX-y.left,u=E.clientY-y.top,!k){if(k=!0,m=w=x,f=j=u,z(),h)return;N=requestAnimationFrame(I)}h&&(m=w=x,f=j=u,z())},$=()=>l.classList.add("hs-on"),M=()=>{l.classList.remove("hs-on"),cancelAnimationFrame(N),N=0,k=!1};return r.addEventListener("pointermove",L),r.addEventListener("pointerenter",$),r.addEventListener("pointerleave",M),r.classList.add("hs-host"),()=>{r.removeEventListener("pointermove",L),r.removeEventListener("pointerenter",$),r.removeEventListener("pointerleave",M),r.classList.remove("hs-host"),cancelAnimationFrame(N)}},[t]),e.jsxs("div",{ref:s,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:n,className:"hs-lit"}),e.jsx("div",{ref:o,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:i,className:"hs-dot"})}),e.jsx("style",{children:`
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
          -webkit-mask-size: ${U}px ${U}px;
          mask-size: ${U}px ${U}px;
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
      `})]})}function _e({onNavigateHome:t,onLogIn:a,onSignUp:s}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(W,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsxs("button",{type:"button",onClick:t,className:"flex items-center gap-2.5",children:[e.jsx(Y,{className:"size-7"}),e.jsx("span",{className:"text-[15px] font-semibold tracking-[0.16em] text-white",style:{fontFamily:"var(--font-google-sans)"},children:"STARCHILD"})]})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const mt=[{id:"build",label:"Build",icon:_a,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:Ha,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:De,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:Yt,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:Vt,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],gt={available:["Conversation","Conductor Mode","Research & tasks","Browse Marketplace"],locked:["Save memory & context","Conversation history","Continue on Desktop","Run tasks 24/7","Automations","Publish & monetize","Integrations","Buy from Marketplace"]},ue=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],Ua=[{id:"ideas",label:"Ideas",icon:Ht,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:Ga,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:qa,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:De,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:Yt,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:Vt,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],Ka=["Your priorities","How you like to receive help","Recurring projects","What you're trying to work through"],Ut={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A poster is a visual, creative job — so it's routed to a model actually built to compose images, not just describe them."},{title:"Assembling the right tools",sub:"Plus a quick, cheap research pass first, so the details are real — Odysseus doesn't end up looking generic."},{title:"Getting the advisor opinion",sub:"A fast visual check before it reaches you: is the composition solid, is the text legible?"},{title:"Delivering",sub:"Here's your poster — and what it actually cost, below."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},Kt={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"A brand is really two jobs — naming and voice go to a model sharp with language, the logo direction goes to a visual one."},{title:"Assembling the right tools",sub:"The color palette is genuinely easy, so it's handed to something fast and cheap instead of a heavyweight."},{title:"Getting the advisor opinion",sub:"One more pass checks that the name, palette, and logo direction actually agree with each other."},{title:"Delivering",sub:"Here's your starter brand kit — and what it actually cost, below."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},Xt={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Numbers matter more than eloquence here, so it's routed to a model actually wired to live market data, not one guessing from memory."},{title:"Assembling the right tools",sub:"A live data feed pulls today's real figures — not a plausible-sounding hallucination."},{title:"Getting the advisor opinion",sub:"This is the kind of task where being wrong actually costs you, so the numbers get double-checked before delivery."},{title:"Delivering",sub:"Here's today's snapshot — and what it actually cost, below."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},Zt={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Conductor Mode is choosing the best model",sub:"Debugging needs a model actually tuned for code — not a generalist that's merely fluent in it."},{title:"Assembling the right tools",sub:"It also gets a sandbox: a place to actually run the fix and see if it works, instead of just predicting it."},{title:"Getting the advisor opinion",sub:"The result gets checked before it reaches you, catching the kind of bug that looks fine at a glance."},{title:"Delivering",sub:"Here's your fix — and what it actually cost, below."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},Xa={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Conductor Mode is choosing the best model",sub:'It reads your whole request, then matches it to a model actually built for that kind of work — not just the "smartest" one available.'},{title:"Assembling the right tools",sub:"It grabs only what that specific job needs — nothing you're not using, nothing you're paying for and not touching."},{title:"Getting the advisor opinion",sub:"On anything that actually matters, a second pass quietly checks the work before you ever see it."},{title:"Delivering",sub:"That's the whole trick — and here's what it saves, below."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},Za=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:Ut},{test:/coffee|brand|logo/i,scenario:Kt},{test:/market|trading|trade|stock|crypto/i,scenario:Xt},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:Zt}],Qa=[{prompt:"Make a poster for the Odyssey movie",scenario:Ut},{prompt:"Make me a coffee shop brand",scenario:Kt},{prompt:"How's the market today?",scenario:Xt},{prompt:"Debug this Python traceback",scenario:Zt}];function ft(t){const a=Za.find(({test:s})=>s.test(t));return(a==null?void 0:a.scenario)??Xa}const Me=["All","Writing","Design","Code","Marketing"],Ja=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function He({onStartTask:t,align:a="start"}){const[s,n]=c.useState(null),o=mt.find(r=>r.id===s),i=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${i}`,children:mt.map(({id:r,label:l,icon:d,badge:h})=>{const x=s===r;return e.jsxs("button",{type:"button",onClick:()=>n(x?null:r),"aria-expanded":x,className:`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${x?"bg-white text-neutral-900":"bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(d,{className:`size-4 ${x?"text-neutral-500":"text-white/55"}`}),l,h&&e.jsx("span",{className:"absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white",children:h})]},r)})}),e.jsx(H,{mode:"wait",children:o&&e.jsx(p.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${i} ${a==="center"?"mx-auto":""}`,children:o.tasks.map((r,l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+l*.05,ease:[.16,1,.3,1]},className:"group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]",style:{fontFamily:"var(--font-google-sans)"},children:[r.label,e.jsx(D,{className:"size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]"})]},r.id))})},o.id)})]})}const es="./images/monolito.png";function Qt({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null);return e.jsxs("section",{ref:r,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Va,{targetRef:r,image:es}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(_e,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(W,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(ts,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function ts({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),o=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(ce,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&o()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:o,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(D,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(He,{onStartTask:a})})]})}const as="./images/empresas.svg",ss=6;function Jt(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(W,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:ss},(t,a)=>e.jsx("img",{src:as,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
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
      `})]})}const yt="(min-width: 1024px) and (min-height: 560px)",bt="(prefers-reduced-motion: reduce)";function ea(){const t=()=>typeof window<"u"&&window.matchMedia(yt).matches&&!window.matchMedia(bt).matches,[a,s]=c.useState(t);return c.useEffect(()=>{const n=window.matchMedia(yt),o=window.matchMedia(bt),i=()=>s(n.matches&&!o.matches);return i(),n.addEventListener("change",i),o.addEventListener("change",i),()=>{n.removeEventListener("change",i),o.removeEventListener("change",i)}},[]),a}function ta(t,a,s){const n=c.useRef(s);n.current=s,c.useEffect(()=>{if(!a)return;const o=()=>{const i=t.current;if(!i)return;const r=i.offsetHeight-window.innerHeight;if(r<=0)return;const l=-i.getBoundingClientRect().top/r;n.current(l<0?0:l>1?1:l)};return o(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o),window.removeEventListener("resize",o)}},[a,t])}function Ge(t){const a=c.useRef(null),s=ea(),[n,o]=c.useState(0);return ta(a,s,r=>{o(Math.max(0,Math.min(t-1,Math.floor(r*t))))}),{trackRef:a,pinned:s,index:n,selectStep:r=>{const l=a.current;if(!s||!l){o(r);return}const d=l.getBoundingClientRect().top+window.scrollY,h=l.offsetHeight-window.innerHeight;window.scrollTo({top:d+h*((r+.5)/t),behavior:"smooth"})}}}function Ne({trackRef:t,pinned:a,screens:s,children:n}){const o=c.useRef(null),[i,r]=c.useState(1);return c.useLayoutEffect(()=>{if(!a){r(1);return}const l=o.current;if(!l)return;const d=()=>{const x=l.offsetHeight,u=window.innerHeight-32;r(x>u?Math.max(.62,u/x):1)};d();const h=new ResizeObserver(d);return h.observe(l),window.addEventListener("resize",d),()=>{h.disconnect(),window.removeEventListener("resize",d)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(s)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:o,className:"sp-fit",style:i===1?void 0:{transform:`scale(${i})`},children:n})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function ns({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(Y,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,s)=>e.jsxs(p.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},className:`pw-step${s===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(os,{result:t.result})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function os({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,s)=>e.jsx(p.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+s*.05,ease:[.16,1,.3,1]}},s))})]})}function is({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Ge(ue.length),i=ue[n];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ne,{trackRef:a,pinned:s,screens:ue.length,children:e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ue.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`uc-tab${d?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:r.label}),e.jsx(H,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:r.blurb}),e.jsx("span",{className:"uc-tab-example",children:r.example})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"uc-try",children:[i.task.label,e.jsx(D,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(ns,{useCase:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function rs({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:Ua.map(({id:a,label:s,icon:n,task:o},i)=>e.jsxs(p.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:i%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(n,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:s}),e.jsx(D,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:o.label})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const ls=[{file:"OpenAI.svg",w:148,h:40},{file:"Claude.svg",w:160,h:34},{file:"Frame374.svg",w:151,h:34},{file:"Frame375.svg",w:137,h:40},{file:"Deepseek.svg",w:206,h:33},{file:"Kimi.svg",w:118,h:40}],wt=16,cs=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],vt=.06,ds=.46,kt=.56,ps=.92,jt=t=>t<0?0:t>1?1:t,K=(t,a,s)=>t+(a-t)*s,Nt=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function me(t,a,s){const n=t.getBoundingClientRect();return{left:(n.left-a.left)/s,top:(n.top-a.top)/s,width:n.width/s,height:n.height/s}}function Ct(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function St({label:t,innerRef:a,children:s}){return e.jsxs("div",{className:"ky-panel",ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function qe(){const t=c.useRef(null),a=c.useRef(null),s=c.useRef(null),n=c.useRef(null),o=c.useRef(null),i=c.useRef(null),r=c.useRef(null),l=_(0),d=_(0),h=_(0),x=_(0),u=_(0),m=_(0),f=_(0),w=_(0),j=_(0),[k,N]=c.useState(!1),[z,I]=c.useState(!1),[L,$]=c.useState(!1),M=ea(),{scrollYProgress:E}=Ba({target:a,offset:["start 0.85","end 0.55"]});c.useEffect(()=>{const b=window.matchMedia("(prefers-reduced-motion: reduce)"),C=()=>$(b.matches);C(),b.addEventListener("change",C);const g=()=>{const T=a.current,v=s.current,O=n.current,G=o.current,se=i.current;if(!T||!v||!O||!G||!se)return;const F=T.getBoundingClientRect(),A=T.offsetWidth?F.width/T.offsetWidth:1,S=me(G,F,A),B={x:S.left+S.width/2,y:S.top+S.height/2},R=me(se,F,A);r.current={conductor:B,you:Ct(me(v,F,A),B),models:Ct(me(O,F,A),B),result:{x:R.left+R.width/2,y:R.top}}};return g(),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),b.removeEventListener("change",C)}},[]),c.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[M]);const y=b=>{const C=r.current;if(!C)return;const g=Nt(jt((b-vt)/(ds-vt))),T=Nt(jt((b-kt)/(ps-kt)));l.set(K(C.you.x,C.conductor.x,g)),d.set(K(C.you.y,C.conductor.y,g)),x.set(K(C.models.x,C.conductor.x,g)),u.set(K(C.models.y,C.conductor.y,g));const v=g<=0?0:g>.94?(1-g)/.06:Math.min(1,g/.08);h.set(v),m.set(v),f.set(K(C.conductor.x,C.result.x,T)),w.set(K(C.conductor.y,C.result.y,T)),j.set(T<=0?0:T>.93?(1-T)/.07:Math.min(1,T/.08)),N(g>.9),I(T>.88)};ta(t,M,y),fa(E,"change",b=>{M||y(b)});const P=L||z;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ne,{trackRef:t,pinned:M,screens:2,children:e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:a,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(St,{label:"You",innerRef:s,children:e.jsx("ul",{className:"ky-list",children:Ka.map(b=>e.jsx("li",{children:b},b))})}),e.jsxs("div",{className:`ky-conductor${k?" ky-conductor--hit":""}`,ref:o,children:[e.jsx(ce,{state:k?"thinking":"idle",depth:k?1:.35,size:16}),e.jsx("p",{className:"ky-conductor-label",children:"Conductor"})]}),e.jsx(St,{label:"Available models",innerRef:n,children:e.jsx("div",{className:"ky-logos",children:ls.map(b=>e.jsx("img",{src:`./images/carousel/${b.file}`,alt:"",style:{height:wt,width:wt*(b.w/b.h)}},b.file))})})]}),e.jsxs("div",{className:`ky-result${P?" ky-result--lit":""}`,ref:i,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),!L&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx(p.span,{className:"ky-dot",style:{x:l,y:d,opacity:h}}),e.jsx(p.span,{className:"ky-dot",style:{x,y:u,opacity:m}}),e.jsx(p.span,{className:"ky-dot ky-dot--result",style:{x:f,y:w,opacity:j}})]})]})})})]})}),e.jsx(W,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:cs.map((b,C)=>e.jsx(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:C*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:b.title}),e.jsx("p",{className:"ky-benefit-desc",children:b.desc})]})},b.title))})}),e.jsx("style",{children:`
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
      `})]})}function Ce({onStartFree:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-28 text-center md:py-36",children:e.jsx(W,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"The best AI for the job changes constantly. Starchild keeps up."}),e.jsx(p.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(p.button,{type:"button",onClick:()=>{},initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx(D,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})]})})})})}function hs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(Qt,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx(Jt,{}),e.jsx(is,{onStartTask:a}),e.jsx(rs,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(qe,{})}),e.jsx(Ce,{onStartFree:l})]})}const te="0 0 160 96",q="rgba(255,255,255,.26)",ve="rgba(255,255,255,.12)";function xs({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:ve,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":q,strokeWidth:n===0?1.6:1},s.y))]})}function us({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:q,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function ms({className:t=""}){return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:ve,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:q,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:ve,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function gs({className:t=""}){return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:ve,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:q,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function fs({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:q,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function ys({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:te,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:q,strokeWidth:"1"}),a.map((s,n)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":n},d:`M70 48 C 96 48, 100 ${s}, 126 ${s}`,stroke:q,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":n},cx:"132",cy:s,r:"2.6",fill:n===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},s)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const bs=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:xs,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:us,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:ms,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:gs,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:fs,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:ys,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function ws({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:bs.map(({id:a,tag:s,title:n,copy:o,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(D,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:o})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const ge=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function vs({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(Y,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(ks,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Te({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function ks({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Te,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(je,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Te,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Te,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function js({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Ge(ge.length),i=ge[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ne,{trackRef:a,pinned:s,screens:ge.length,children:e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ge.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(H,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:r.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",r.prompt,"”"]})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(D,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(vs,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Ns({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(Qt,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx(Jt,{}),e.jsx(ws,{onStartTask:a}),e.jsx(js,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(qe,{})}),e.jsx(Ce,{onStartFree:l})]})}const X=22,Cs=3.1,Ee=280,Ss=14,zt=3.4,ke=22,Z=[122,138,154],Ie=[255,140,44],Lt=.34,Mt=.15,zs=.08,Ls=14;function Ms(){return Array.from({length:ke},(t,a)=>{const s=a/(ke-1),n=Math.round(Z[0]+(Ie[0]-Z[0])*s),o=Math.round(Z[1]+(Ie[1]-Z[1])*s),i=Math.round(Z[2]+(Ie[2]-Z[2])*s),r=.09+.78*Math.pow(s,1.25);return{color:`rgba(${n},${o},${i},${r.toFixed(3)})`,size:Cs+2.6*s,points:[]}})}function Ts({targetRef:t}){const a=c.useRef(null);return c.useEffect(()=>{const s=t.current,n=a.current,o=n==null?void 0:n.getContext("2d");if(!s||!n||!o)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=window.matchMedia("(hover: hover) and (pointer: fine)").matches,l=Ms();r&&s.classList.add("hero-c--fine");let d=0,h=0,x=0,u=0,m=-9999,f=-9999,w=-9999,j=-9999,k=-9999,N=-9999,z=0,I=0,L=!1,$=0,M=!1;const E=performance.now(),y=F=>{const A=(F-E)/1e3;if(o.clearRect(0,0,d,h),z>.01){const S=o.createRadialGradient(k,N,0,k,N,Ee*1.5);S.addColorStop(0,`rgba(248,70,0,${(.13*z).toFixed(3)})`),S.addColorStop(.45,`rgba(248,70,0,${(.05*z).toFixed(3)})`),S.addColorStop(1,"rgba(248,70,0,0)"),o.fillStyle=S,o.fillRect(0,0,d,h)}for(const S of l)S.points.length=0;for(let S=0;S<u;S++)for(let B=0;B<x;B++){const R=B*X-X,de=S*X-X;let Se=R+Math.sin(R*.021+de*.013+A*.55)*zt,ze=de+Math.cos(R*.017-de*.019+A*.42)*zt,Ke=.16+.14*(.5+.5*Math.sin(R*.011+de*.009-A*.7));if(z>.01){const Xe=Se-k,Ze=ze-N,ne=Math.hypot(Xe,Ze);if(ne<Ee){const Qe=1-ne/Ee,Je=Qe*Qe*z;if(Ke+=Je*1.15,ne>.001){const et=Je*Ss;Se+=Xe/ne*et,ze+=Ze/ne*et}}}const na=Math.min(ke-1,Math.max(0,Math.round(Ke*(ke-1))));l[na].points.push(Se,ze)}for(const S of l){if(S.points.length===0)continue;o.fillStyle=S.color;const B=S.size/2;for(let R=0;R<S.points.length;R+=2)o.fillRect(S.points[R]-B,S.points[R+1]-B,S.size,S.size)}if(r&&z>.01){const S=i?1:1+.16*(.5-.5*Math.cos(A/3.6*Math.PI*2)),B=Ls/2*S;o.save(),o.globalAlpha=z,o.shadowColor="rgba(248,70,0,.9)",o.shadowBlur=18,o.fillStyle="#f84600",o.beginPath(),o.arc(w,j,B,0,Math.PI*2),o.fill(),o.restore()}},P=()=>{const F=s.getBoundingClientRect(),A=Math.min(window.devicePixelRatio||1,2);d=Math.max(1,Math.round(F.width)),h=Math.max(1,Math.round(F.height)),n.width=Math.round(d*A),n.height=Math.round(h*A),n.style.width=`${d}px`,n.style.height=`${h}px`,o.setTransform(A,0,0,A,0,0),x=Math.ceil(d/X)+2,u=Math.ceil(h/X)+2,y(performance.now())},b=F=>{w+=(m-w)*Lt,j+=(f-j)*Lt,k+=(w-k)*Mt,N+=(j-N)*Mt,z+=(I-z)*zs,y(F),$=requestAnimationFrame(b)},C=()=>{M||i||(M=!0,$=requestAnimationFrame(b))},g=()=>{M=!1,cancelAnimationFrame($)},T=F=>{const A=s.getBoundingClientRect();m=F.clientX-A.left,f=F.clientY-A.top,L||(L=!0,w=k=m,j=N=f),I=1,i&&(w=k=m,j=N=f,z=1,y(performance.now()))},v=()=>{I=0,L=!1,i&&(z=0,y(performance.now()))},O=new IntersectionObserver(([F])=>F.isIntersecting?C():g(),{threshold:0});O.observe(s);const G=()=>document.hidden?g():C(),se=new ResizeObserver(P);return se.observe(s),s.addEventListener("pointermove",T),s.addEventListener("pointerleave",v),document.addEventListener("visibilitychange",G),P(),()=>{O.disconnect(),se.disconnect(),s.removeEventListener("pointermove",T),s.removeEventListener("pointerleave",v),document.removeEventListener("visibilitychange",G),s.classList.remove("hero-c--fine"),g()}},[t]),e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"})}function Es({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null);return e.jsxs("section",{ref:r,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Ts,{targetRef:r}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx(_e,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(W,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(Is,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function Is({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),o=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-10 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&o()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:o,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(D,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(He,{onStartTask:a})})]})}const ae="0 0 160 96",J="rgba(255,255,255,.26)",ee="rgba(255,255,255,.12)";function Fs({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],s=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,o)=>e.jsx("line",{className:"cg-say",style:{"--i":o,transformOrigin:"left center"},x1:"14",y1:n.y,x2:14+n.w,y2:n.y,stroke:J,strokeWidth:"1"},n.y)),s.map((n,o)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":o+2,transformOrigin:"right center"},x1:146-n.w,y1:n.y,x2:"146",y2:n.y,stroke:o===0?"var(--color-primary)":J,strokeWidth:o===0?1.6:1},n.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function As({className:t=""}){const a=[{x:26,ys:[26,48,70]},{x:80,ys:[20,48,76]},{x:134,ys:[32,62]}];return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--think ${t}`,fill:"none","aria-hidden":"true",children:[a[0].ys.map(n=>a[1].ys.map(o=>e.jsx("line",{x1:"26",y1:n,x2:"80",y2:o,stroke:ee,strokeWidth:"1"},`${n}-${o}`))),a[1].ys.map(n=>a[2].ys.map(o=>e.jsx("line",{x1:"80",y1:n,x2:"134",y2:o,stroke:ee,strokeWidth:"1"},`b${n}-${o}`))),e.jsx("path",{className:"cg-route",d:"M26 48 L80 20 L134 32",stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),a.map(({x:n,ys:o})=>o.map(i=>e.jsx("circle",{cx:n,cy:i,r:"2.2",fill:"rgba(255,255,255,.34)"},`${n}-${i}`))),e.jsx("circle",{cx:"134",cy:"32",r:"3",fill:"var(--color-primary)"})]})}function Ws({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:ee,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":J,strokeWidth:n===0?1.6:1},s.y))]})}function $s({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:J,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function Ps({className:t=""}){return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:ee,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:J,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:ee,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Rs({className:t=""}){const a=[{x:18,y:20,w:34,h:12,dx:9,dy:-6},{x:18,y:38,w:34,h:12,dx:-7,dy:5},{x:18,y:56,w:34,h:12,dx:6,dy:8},{x:63,y:20,w:34,h:12,dx:-8,dy:7},{x:63,y:38,w:34,h:12,dx:7,dy:-8},{x:108,y:20,w:34,h:12,dx:8,dy:9}];return e.jsxs("svg",{viewBox:ae,className:`cg-svg cg-svg--organize ${t}`,fill:"none","aria-hidden":"true",children:[[35,80,125].map(s=>e.jsx("line",{x1:s,y1:"14",x2:s,y2:"82",stroke:ee,strokeWidth:"1"},s)),a.map((s,n)=>e.jsx("rect",{className:"cg-block",style:{"--dx":`${s.dx}px`,"--dy":`${s.dy}px`,"--i":n},x:s.x,y:s.y,width:s.w,height:s.h,rx:"3",stroke:n===0?"var(--color-primary)":J,strokeWidth:n===0?1.4:1},`${s.x}-${s.y}`))]})}const Os=[{id:"talk",tag:"Conversation",title:"Talk",copy:"Talk things through with an AI that gets to know you.",art:Fs,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"think",tag:"Decisions",title:"Think",copy:"Work through ideas, questions, and decisions together.",art:As,task:{id:"think-decision",label:"Think through a decision",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}},{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's on your plate.",art:Ws,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"explore",tag:"Curiosity",title:"Explore",copy:"Learn, compare, and make sense of things.",art:$s,task:{id:"explore-topic",label:"Make sense of something",basePrompt:"Help me understand this properly — what matters, what doesn't, and why.",question:"What do you want to get to the bottom of?"}},{id:"create",tag:"Make",title:"Create",copy:"Turn an idea into something real.",art:Ps,task:{id:"create-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"organize",tag:"Structure",title:"Organize",copy:"Bring structure to tasks, projects, and recurring work.",art:Rs,task:{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"}}];function Bs({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Os.map(({id:a,tag:s,title:n,copy:o,art:i,task:r},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(D,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:o})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const fe=[{id:"monitor",label:"Keep an eye on something",blurb:"Starchild can follow what changes and bring you what matters.",prompt:"Let me know when flights to Tokyo drop below $700.",panel:{kind:"monitor",agentName:"Tokyo flights",cadence:"Checking every hour",sources:["Google Flights","Skyscanner","Airlines","Fare alerts"],checks:[{time:"09:00",text:"Checked 6 airlines — cheapest $842"},{time:"13:00",text:"Checked 6 airlines — cheapest $828"},{time:"17:40",text:"Dropped below your $700",hit:!0}],alert:{heading:"Worth your attention",title:"Tokyo in October — $684 return",detail:"Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Take care of a routine",blurb:"Let Starchild handle something you do again and again.",prompt:"Every Sunday, help me plan the week ahead.",panel:{kind:"recurring",agentName:"Week ahead",uses:["Calendar","Gmail","Notes","Reminders"],runs:"Every Sunday at 6:00 PM",outputName:"Plan for the week",output:{heading:"This week",items:[{text:"Thursday is your only clear day",note:"the one to protect"},{text:"Two deadlines both land on Friday",note:"start the smaller one Tuesday"},{text:"Dentist still isn't booked",note:"third week it's slipped"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Give it a job",blurb:"Tell Starchild what you want done, what matters, and when to step in.",prompt:"Plan our trip in October. You know the budget and the dates — check with me before booking anything.",panel:{kind:"config",agentName:"October trip",fields:[{label:"The job",value:"Plan the trip end to end"},{label:"What matters",value:"Budget, the dates, who's coming"},{label:"When to step in",value:"Ask me before booking anything"}],tools:["Web","Gmail","Calendar","Maps"],status:"Active · first plan ready tomorrow"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}];function Ds({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(Y,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(_s,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Fe({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function _s({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Fe,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(je,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Fe,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Fe,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Hs({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:o}=Ge(fe.length),i=fe[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ne,{trackRef:a,pinned:s,screens:fe.length,children:e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Give it something to keep track of, repeat, or take care of over time."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[fe.map((r,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>o(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(H,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:r.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",r.prompt,"”"]})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(D,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Ds,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Gs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}){const r=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(Es,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:o,onSignUp:i}),e.jsx(Bs,{onStartTask:a}),e.jsx(Hs,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(qe,{})}),e.jsx(Ce,{onStartFree:l})]})}const Tt=["a","b","c"];function qs({variant:t,onChange:a}){const s=Math.max(0,Tt.indexOf(t));return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${t.toUpperCase()}`,children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${s*32}px)`},children:t.toUpperCase()}),Tt.map(n=>e.jsx("button",{type:"button",role:"radio","aria-checked":n===t,"aria-label":`Landing version ${n.toUpperCase()}`,onClick:()=>a(n),className:`vt-side${n===t?" vt-side--on":""}`,children:n.toUpperCase()},n))]}),e.jsx("style",{children:`
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
      `})]})}function Ys({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function Vs({name:t,tagline:a,colors:s}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:s.map(n=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:n},title:n},n))})]})}function Us({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function Ks({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function Xs({deliverable:t}){switch(t.kind){case"poster":return e.jsx(Ys,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(Vs,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(Us,{rows:t.rows});case"code":return e.jsx(Ks,{language:t.language,snippet:t.snippet});case"none":return null}}const oe="./icons/",Zs={gemini:`${oe}gemini.svg`,openai:`${oe}openai.svg`,xai:`${oe}xai.svg`,deepseek:`${oe}deepseek.svg`,"ai-generic":`${oe}ai-generic.svg`};function Qs({stat:t}){const{withoutLabel:a,withoutTokens:s,withLabel:n,withTokens:o}=t,i=Math.round((1-o/s)*100);return e.jsxs("div",{className:"rounded-2xl border border-white/10 bg-white/[0.03] p-5",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Estimated savings on this task"}),e.jsxs("span",{className:"flex shrink-0 items-center gap-1.5 rounded-full bg-[#f84600]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]","aria-hidden":"true"}),"Conductor Mode"]})]}),e.jsx("div",{className:"mt-4 flex flex-col gap-3",children:[{label:a,tokens:s,accent:!1},{label:n,tokens:o,accent:!0}].map(r=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"w-[132px] shrink-0 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:r.label}),e.jsx("div",{className:"h-2 flex-1 overflow-hidden rounded-full bg-white/10",children:e.jsx(p.div,{className:`h-full rounded-full ${r.accent?"bg-[#f84600]":"bg-white/25"}`,initial:{width:0},animate:{width:`${r.tokens/s*100}%`},transition:{duration:.7,ease:[.16,1,.3,1],delay:.15}})}),e.jsx("span",{className:"w-[74px] shrink-0 text-right text-[12.5px] tabular-nums text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:r.tokens.toLocaleString("en-US")})]},r.label))}),e.jsxs("p",{className:"mt-4 text-[13.5px] font-medium text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:["~",i,"% fewer tokens burned on this exact task."]}),e.jsx("p",{className:"mt-1 text-[11.5px] text-white/35 italic",style:{fontFamily:"var(--font-google-sans)"},children:"Illustrative estimate for this demo — not a live token count."})]})}function Js({scenario:t,onMonetize:a,onStep:s,onDone:n}){const{steps:o,models:i,deliverable:r,stat:l}=t,[d,h]=c.useState(0),[x,u]=c.useState(!1);c.useEffect(()=>{h(0),u(!1)},[t]),c.useEffect(()=>{if(s==null||s(),d>=o.length){const w=setTimeout(()=>{u(!0),n==null||n()},500);return()=>clearTimeout(w)}const f=setTimeout(()=>h(w=>w+1),700);return()=>clearTimeout(f)},[d,o]);const m=x?100:Math.min(d,o.length)/o.length*100;return e.jsxs("div",{className:"relative flex flex-col gap-6 py-1 pl-1",children:[e.jsx("div",{className:"absolute top-1 bottom-1 left-[7px] w-px bg-white/12","aria-hidden":"true",children:e.jsx(p.div,{className:"w-px bg-[#f84600]",initial:{height:0},animate:{height:`${m}%`},transition:{duration:.4,ease:"easeOut"}})}),o.slice(0,d).map((f,w)=>{const j=w===d-1&&!x,k=w===o.length-1;return e.jsxs(p.div,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsxs("span",{className:`relative z-10 mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${j||k&&x?"border-[#f84600] bg-[#0a0a0a]":"border-white/25 bg-[#0a0a0a]"}`,children:[j&&e.jsx(p.span,{className:"size-1.5 rounded-full bg-[#f84600]",animate:d===o.length?{scale:[1,1.4,1]}:{},transition:{duration:.9,repeat:1/0}}),k&&x&&e.jsx("span",{className:"size-1.5 rounded-full bg-[#f84600]"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-[14.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:f.title}),e.jsx("p",{className:"mt-1 text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:f.sub}),w===0&&e.jsx("div",{className:"mt-2.5 flex flex-wrap gap-1.5",children:i.map(N=>e.jsxs("span",{className:"flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5",children:[e.jsx("img",{src:Zs[N.icon],alt:"",className:"size-3.5 object-contain"}),e.jsx("span",{className:"text-[11.5px] font-medium text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:N.name})]},N.name))}),k&&x&&e.jsxs(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"mt-4 flex flex-col gap-4",children:[r.kind!=="none"&&e.jsx(Xs,{deliverable:r}),e.jsx(Qs,{stat:l}),e.jsx("div",{children:e.jsx("button",{type:"button",onClick:a,className:"rounded-full border border-[#f84600]/30 bg-[#f84600]/[0.07] px-4 py-2 text-[13px] font-medium text-[#f84600] transition-colors hover:bg-[#f84600]/[0.12]",style:{fontFamily:"var(--font-google-sans)"},children:"Make a skill and monetize"})})]})]})]},f.title)})]})}function en({tasksRemaining:t,onLockedFeature:a}){return e.jsxs("div",{className:"hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex",children:[e.jsx(Y,{className:"size-6"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[12px] leading-relaxed text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:"You're trying Starchild with limited access. Create an account to save what Starchild learns about you and continue anywhere."})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Available"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:gt.available.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-[12.5px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(je,{className:"size-3 text-emerald-400"}),s]},s))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Requires account"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:gt.locked.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:a,className:"flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Gt,{className:"size-3 shrink-0"}),s]})},s))})]}),e.jsx("div",{className:"mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center",children:e.jsxs("p",{className:"text-[12px] font-medium text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:[Math.max(t,0)," guest interaction",t===1?"":"s"," remaining"]})})]})}function Ye({heading:t,sub:a,ctaLabel:s="Create account & continue",backLabel:n="Sign up",footerNote:o="Already have an account?",showForm:i=!0,onBack:r,onContinue:l}){const[d,h]=c.useState(""),[x,u]=c.useState(""),m=!i||d.trim()!==""&&x.trim()!=="";return e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[r&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:r,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Be,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:n})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(Gt,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[i&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:d,onChange:f=>h(f.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:x,onChange:f=>u(f.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:l,disabled:!m,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[o," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}function tn({onBack:t,onOpenMarketplace:a,onRequestSignup:s,onLogIn:n,initialMessage:o,openingMessage:i,task:r,isGuest:l=!1}){const[d,h]=c.useState(o??null),[x,u]=c.useState(o?ft(o):null),[m,f]=c.useState(!1),[w,j]=c.useState(""),k=l,[N,z]=c.useState(o?1:2),[I,L]=c.useState(null),$=c.useRef(null),[M,E]=c.useState(r),[y,P]=c.useState(i);function b(v,O){L({heading:v,sub:O})}function C(v){E(v),P(v.question)}function g(v){const O=v.trim();if(O){if(k&&N<=0){b("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}h(O),u(ft(M?`${M.basePrompt} ${O}`:O)),k&&z(G=>G-1)}}function T(){var v;(v=$.current)==null||v.scrollIntoView({behavior:"smooth",block:"end"})}return c.useEffect(()=>{const v=setTimeout(T,50);return()=>clearTimeout(v)},[d,m]),e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[k?e.jsx(en,{tasksRemaining:N,onLockedFeature:()=>b("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience.")}):e.jsx("div",{className:"hidden w-14 shrink-0 flex-col items-center border-r border-white/[0.08] pt-6 md:flex",children:e.jsx(Y,{className:"size-6"})}),I&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:v=>{v.target===v.currentTarget&&L(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(Ye,{heading:I.heading,sub:I.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{L(null),s==null||s()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(Be,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode"}),k&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var v;return(v=n??s)==null?void 0:v()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:d===null?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[y?e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[M&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:M.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(ce,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:y})]})]}):e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(He,{onStartTask:C,align:"center"})}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:w,onChange:v=>j(v.target.value),onKeyDown:v=>{v.key==="Enter"&&g(w)},placeholder:y?"Answer however you like…":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!y}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(we,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{type:"button",className:"flex items-center gap-1 text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(ht,{className:"size-3 text-white/35"})]}),e.jsx("button",{type:"button",onClick:()=>g(w||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:w.trim()?e.jsx(D,{className:"size-4"}):e.jsx(pt,{className:"size-4"})})]})]})]})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("div",{className:"max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:d})}),e.jsx(Js,{scenario:x,onMonetize:a,onStep:T,onDone:()=>f(!0)}),m&&k&&e.jsxs(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.35},className:"flex items-center justify-between gap-4 rounded-2xl border border-[#f84600]/30 bg-[#f84600]/[0.08] px-5 py-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[13.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Keep what you just created."}),e.jsx("p",{className:"mt-0.5 text-[12.5px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Create your free account to save this project and unlock the full Starchild experience."})]}),e.jsx("button",{type:"button",onClick:()=>b("Keep what you just created.","Create your free account to save this project and unlock the full Starchild experience."),className:"shrink-0 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Create free account"})]}),e.jsx("div",{ref:$})]})}),d!==null&&e.jsx("div",{className:"shrink-0 border-t border-white/[0.08] px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5",children:[e.jsx("button",{type:"button",className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(we,{className:"size-4"})}),e.jsx("input",{disabled:!0,placeholder:m?"Monetize, meet the marketplace":"Ask Conductor anything…",className:"flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("span",{className:"flex items-center gap-1 text-[12.5px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(ht,{className:"size-3 text-white/35"})]}),e.jsx("span",{className:"flex size-8 items-center justify-center rounded-full bg-[#f84600] text-white",children:e.jsx(pt,{className:"size-3.5"})})]})})]})]})}const an={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function sn({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(W,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:Qa.map(({prompt:a,scenario:s},n)=>e.jsxs(p.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:n*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:an[s.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx(D,{className:"size-4 rotate-45"})})]},s.id))})]})})}function nn({onNavigateHome:t,onOpenMarketplace:a,onTry:s,onLogIn:n,onSignUp:o}){const i=c.useRef(null);function r(){var l;(l=i.current)==null||l.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(_e,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:n,onSignUp:o}),e.jsxs(W,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>s(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:r,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(ma,{onTryConductorMode:()=>s()}),e.jsx("div",{ref:i,children:e.jsx(sn,{onTryExample:l=>s(l)})}),e.jsx(Ce,{onStartFree:()=>s()})]})}const Ae=[{Icon:Ht,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:De,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:qt,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function on({onDone:t}){const[a,s]=c.useState(0),n=Ae[a],o=a===Ae.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(H,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(n.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:n.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:n.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:Ae.map((i,r)=>e.jsx("button",{type:"button",onClick:()=>s(r),"aria-label":`Go to slide ${r+1}`,className:`h-1.5 rounded-full transition-all ${r===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},r))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>o?t():s(i=>i+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:o?"Ok, let's go":"Next"})]})]})}function rn({intent:t,skillTitle:a,onBack:s,onContinue:n}){const o=t==="create"?"Create a free account to list your skill":"Create a free account to get this skill",i=t==="create"?"So buyers know who built it, and payouts land somewhere real.":`So "${a}" lands in your library and the seller actually gets paid.`;return e.jsx(Ye,{heading:o,sub:i,onBack:s,onContinue:n})}const ln={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function cn(t){return ln[t]??{bg:"#e5e5e5",text:"#404040"}}function dn({skill:t,onSelect:a}){const s=cn(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:n=>{a&&(n.key==="Enter"||n.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:s.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:s.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function pn({open:t,onClose:a,skills:s,onAddSkill:n}){const[o,i]=c.useState("onboarding"),[r,l]=c.useState("All"),[d,h]=c.useState(""),[x,u]=c.useState(""),[m,f]=c.useState(""),[w,j]=c.useState(""),[k,N]=c.useState(Me[2]),[z,I]=c.useState(null),[L,$]=c.useState(null);c.useEffect(()=>{t&&(i("onboarding"),I(null),$(null))},[t]);function M(){I("create"),i("auth")}function E(g){I("buy"),$(g),i("auth")}function y(){i(z==="create"?"create":"purchased")}function P(){x.trim()&&(n({id:`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:x.trim(),price:w.trim()||"$5",category:k,blurb:m.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),u(""),f(""),j(""),i("grid"))}const b=d.trim().toLowerCase(),C=s.filter(g=>{const T=r==="All"||g.category===r,v=!b||g.title.toLowerCase().includes(b)||g.blurb.toLowerCase().includes(b)||g.category.toLowerCase().includes(b);return T&&v});return e.jsx(H,{children:t&&e.jsx(p.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:g=>{g.target===g.currentTarget&&a()},children:e.jsxs(p.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(Da,{className:"size-4"})})]}),e.jsx(H,{mode:"wait",children:o==="onboarding"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(on,{onDone:()=>i("grid")})},"onboarding"):o==="grid"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:M,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl bg-white/10",children:e.jsx(Y,{className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(g=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${g===0?"w-4 bg-[#f84600]":"w-1.5 bg-white/20"}`},g))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(qt,{className:"size-4 text-white/40"}),e.jsx("input",{value:d,onChange:g=>h(g.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:Me.map(g=>e.jsx("button",{type:"button",onClick:()=>l(g),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${r===g?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:g},g))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[C.map(g=>e.jsx(dn,{skill:g,onSelect:g.mine?void 0:()=>E(g)},g.id)),e.jsxs("button",{type:"button",onClick:M,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(we,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]})]})]},"grid"):o==="create"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Be,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:x,onChange:g=>u(g.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:m,onChange:g=>f(g.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:w,onChange:g=>j(g.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:k,onChange:g=>N(g.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:Me.filter(g=>g!=="All").map(g=>e.jsx("option",{value:g,children:g},g))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:P,disabled:!x.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(we,{className:"size-3.5"}),"add"]})})]},"create"):o==="auth"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(rn,{intent:z==="create"?"create":"buy",skillTitle:L==null?void 0:L.title,onBack:()=>i("grid"),onContinue:y})},"auth"):e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(je,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',L==null?void 0:L.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const aa={tone:50,initiative:50},hn=[{id:"building",label:"Building something of my own",context:"Founder or solo builder",behavior:"Bias toward momentum and shipping over analysis"},{id:"team",label:"Working with a team or company",context:"Works inside an organization",behavior:"Account for stakeholders and existing process"},{id:"studying",label:"Studying and exploring",context:"Learning phase, low commitment",behavior:"Explain the reasoning, not just the answer"},{id:"changing",label:"Changing direction",context:"In transition",behavior:"Hold options open before narrowing"},{id:"caring",label:"Taking care of other people",context:"Limited discretionary time",behavior:"Keep suggestions short and low-effort"},{id:"energy",label:"Trying to regain energy",context:"Low capacity right now",behavior:"One step at a time, never a backlog"}],xn=[{id:"work",label:"Work and direction",context:"Career focus",behavior:"Lead with work-shaped examples"},{id:"own",label:"Building something of my own",context:"Personal project focus",behavior:"Prioritize build and launch help"},{id:"money",label:"Money and security",context:"Financial focus",behavior:"Be concrete about tradeoffs and numbers"},{id:"people",label:"Relationships and family",context:"Personal life focus",behavior:"Stay conversational, avoid task framing"},{id:"health",label:"Health and energy",context:"Wellbeing focus",behavior:"Respect capacity, avoid pressure"},{id:"life",label:"The kind of life I want",context:"Direction-level focus",behavior:"Ask before advising"},{id:"unsure",label:"I'm not sure yet",context:"Focus not yet named",behavior:"Help name it before solving it"}],un=[{id:"alone",label:"Think it through on my own",context:"Internal processor",behavior:"Give enough context to decide alone; don't flood with options"},{id:"talk",label:"Talk until I understand what I think",context:"External processor",behavior:"Ask more than assert; reflect back what you hear"},{id:"act",label:"Start doing something and figure it out",context:"Learns by moving",behavior:"Offer a first step, not a full plan"},{id:"research",label:"Research until I feel prepared",context:"Needs groundwork first",behavior:"Bring sources and context up front"},{id:"pause",label:"Put it aside until I have more energy",context:"Avoids under load",behavior:"Keep it small; never present a pile of work"}],mn={building:"in a stretch where you're trying to build something of your own",team:"working inside a team, with other people's plans in the mix",studying:"in an exploring phase, still gathering more than deciding",changing:"somewhere in the middle of changing direction",caring:"carrying a fair amount for other people right now",energy:"trying to get your energy back before taking on more"},gn={work:"work and where it's heading",own:"the thing you're trying to build",money:"money and feeling secure",people:"the people close to you",health:"your health and energy",life:"what kind of life you actually want",unsure:"something you haven't quite put words to yet"},Et={alone:{observation:"You tend to work things out on your own before saying them out loud",consequence:"so I'll try to give you enough to decide with, without burying you in options"},talk:{observation:"You seem to find what you think by talking it through",consequence:"so I'll ask more than I assert, and play back what I'm hearing"},act:{observation:"You'd rather start moving and adjust than plan it all first",consequence:"so I'll aim at a first step instead of a finished plan"},research:{observation:"You like to feel prepared before you commit to something",consequence:"so I'll bring the groundwork up front rather than after"},pause:{observation:"You tend to set things down when they get heavy",consequence:"so I'll keep things small and won't hand you a pile"}},fn={work:"helping you get clearer on the direction before you commit to it",own:"helping you turn the idea into something that actually moves",money:"helping you lay the tradeoffs out plainly",people:"being somewhere you can think out loud without it becoming a task",health:"helping you protect your capacity while things still move",life:"helping you name what matters before we touch what to do",unsure:"helping you name the thing first — the rest gets easier after that"};function yn(t){const a=t.stage?mn[t.stage]:"in the middle of something you're still shaping",s=t.focus?gn[t.focus]:"a few things at once",n=t.style?Et[t.style]:Et.alone,o=t.focus?fn[t.focus]:"helping you find the first thread to pull",i=t.tone>65?"I'll keep it direct":t.tone<35?"I'll keep it gentle":"I'll keep the tone even",r=t.initiative>65?"and give you clear steps":t.initiative<35?"and leave you room to steer":"and follow your lead on how much structure you want";return[`You seem to be ${a}, and lately ${s} has been taking up most of the space.`,`${n.observation}, ${n.consequence}.`,`${i}, ${r}.`,`Right now I might be most useful by ${o}.`].join(" ")}function bn(t){if(t.startingPoint&&t.startingPoint.trim())return`You mentioned "${t.startingPoint.trim()}". What's made that feel more present lately?`;const a=t.focus??"unsure",s={work:"You said work and direction has been taking up space. What's the part of it you keep circling back to?",own:"You said you're trying to build something of your own. Where is it stuck right now?",money:"You said money and security has been on your mind. What decision is it attached to?",people:"You said the people close to you have been taking up space. Want to just talk it through?",health:"You said your energy has been the thing. What's been draining most of it?",life:"You said you've been thinking about what kind of life you want. What made that feel louder recently?",unsure:"You weren't sure what's taking up the space yet. Want to start by just describing your week?"};return s[a]??s.unsure}const ye=5;function wn({onComplete:t}){const[a,s]=c.useState(0),[n,o]=c.useState(aa),[i,r]=c.useState("idle"),l=a/ye;function d(){if(a>=ye-1){r("thinking"),setTimeout(()=>t(n),700);return}s(u=>u+1),r("idle")}function h(u,m){o(f=>({...f,[u]:m})),r("acknowledging"),setTimeout(d,460)}function x(u){const m={...n,startingPoint:u};o(m),r("thinking"),setTimeout(()=>t(m),700)}return e.jsxs("div",{className:"ob-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(W,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsxs("div",{className:"flex items-center justify-between py-8",children:[e.jsx(ce,{state:i,depth:l,size:14}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-[12px] tracking-[0.14em] text-white/35",style:{fontFamily:"var(--font-google-sans)"},children:[a+1," / ",ye]}),e.jsx("button",{type:"button",onClick:a>=ye-1?()=>x(void 0):d,className:"text-[12.5px] text-white/40 transition-colors hover:text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"})]})]}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-9",children:e.jsxs(H,{mode:"wait",children:[a===0&&e.jsx(We,{question:"What stage are you in right now?",choices:hn,selected:n.stage,onHoverChange:u=>r(u?"listening":"idle"),onPick:u=>h("stage",u)},"stage"),a===1&&e.jsx(We,{question:"What's been taking up the most space in your mind lately?",choices:xn,selected:n.focus,onHoverChange:u=>r(u?"listening":"idle"),onPick:u=>h("focus",u)},"focus"),a===2&&e.jsx(We,{question:"When something is difficult, what do you usually do first?",choices:un,selected:n.style,onHoverChange:u=>r(u?"listening":"idle"),onPick:u=>h("style",u)},"style"),a===3&&e.jsx(vn,{answers:n,onChange:u=>{o(m=>({...m,...u})),r("listening")},onContinue:d},"sliders"),a===4&&e.jsx(kn,{onFinish:x,onFocusChange:u=>r(u?"listening":"idle")},"open")]})})})})]}),e.jsx("style",{children:".ob-screen { background: radial-gradient(circle at 22% 12%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const Ve={initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0,y:-12},transition:{duration:.45,ease:[.16,1,.3,1]}};function Ue({children:t}){return e.jsx("h2",{className:"max-w-[20ch] text-[32px] leading-[1.14] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:t})}function We({question:t,choices:a,selected:s,onPick:n,onHoverChange:o}){return e.jsxs(p.div,{...Ve,children:[e.jsx(Ue,{children:t}),e.jsx("div",{className:"mt-10 flex flex-wrap gap-3",children:a.map((i,r)=>{const l=s===i.id;return e.jsx(p.button,{type:"button",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.35,delay:r*.05,ease:[.16,1,.3,1]},onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),onFocus:()=>o(!0),onBlur:()=>o(!1),onClick:()=>n(i.id),className:`rounded-full border px-5 py-3 text-[14.5px] transition-colors ${l?"border-[#f84600] bg-[#f84600] text-white":"border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40 hover:bg-white/[0.07]"}`,style:{fontFamily:"var(--font-google-sans)"},children:i.label},i.id)})})]})}function It({leftLabel:t,rightLabel:a,value:s,onChange:n}){return e.jsxs("div",{children:[e.jsxs("div",{className:"mb-3 flex items-center justify-between text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:s<40?"text-white":"",children:t}),e.jsx("span",{className:s>60?"text-white":"",children:a})]}),e.jsx("input",{type:"range",min:0,max:100,value:s,onChange:o=>n(Number(o.target.value)),className:"ob-slider w-full","aria-label":`${t} to ${a}`})]})}function vn({answers:t,onChange:a,onContinue:s}){const n=(t.tone>65?"I'll say the thing plainly":t.tone<35?"I'll go easy on the delivery":"I'll keep the tone even")+(t.initiative>65?", and hand you clear steps.":t.initiative<35?", and leave you room to steer.":", and follow your lead on structure.");return e.jsxs(p.div,{...Ve,children:[e.jsx(Ue,{children:"How should Starchild work with you?"}),e.jsxs("div",{className:"mt-10 flex max-w-[560px] flex-col gap-9",children:[e.jsx(It,{leftLabel:"Gentle",rightLabel:"Direct",value:t.tone,onChange:o=>a({tone:o})}),e.jsx(It,{leftLabel:"Give me space",rightLabel:"Give me clear steps",value:t.initiative,onChange:o=>a({initiative:o})})]}),e.jsxs(p.p,{initial:{opacity:0},animate:{opacity:1},className:"mt-9 max-w-[46ch] text-[15px] text-white/55 italic",style:{fontFamily:"var(--font-google-sans)"},children:["“",n,"”"]},n),e.jsx("button",{type:"button",onClick:s,className:"mt-10 rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"That's right"}),e.jsx("style",{children:`
        .ob-slider { -webkit-appearance: none; appearance: none; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, rgba(248,70,0,.85), rgba(255,255,255,.18)); outline: none; }
        .ob-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px;
          border-radius: 999px; background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
        .ob-slider::-moz-range-thumb { width: 22px; height: 22px; border: none; border-radius: 999px;
          background: #fff; cursor: grab; box-shadow: 0 2px 12px rgba(0,0,0,.45); }
      `})]})}function kn({onFinish:t,onFocusChange:a}){const[s,n]=c.useState("");return e.jsxs(p.div,{...Ve,children:[e.jsx(Ue,{children:"What's something you'd like help thinking through right now?"}),e.jsx("p",{className:"mt-5 max-w-[52ch] text-[16px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"It can be something small, practical, personal, or something you're still trying to understand."}),e.jsx("div",{className:"mt-8 max-w-[620px] rounded-[20px] border border-white/12 bg-white/[0.04] p-4 focus-within:border-white/30",children:e.jsx("textarea",{value:s,onChange:o=>n(o.target.value),onFocus:()=>a(!0),onBlur:()=>a(!1),onKeyDown:o=>{o.key==="Enter"&&!o.shiftKey&&(o.preventDefault(),t(s))},rows:2,placeholder:"One sentence is enough…",className:"w-full resize-none bg-transparent text-[15.5px] text-white placeholder:text-white/30 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0})}),e.jsxs("div",{className:"mt-7 flex flex-wrap items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>t(s),disabled:!s.trim(),className:"rounded-full bg-[#f84600] px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03] disabled:opacity-35 disabled:hover:scale-100",style:{fontFamily:"var(--font-google-sans)"},children:"Continue"}),e.jsx("button",{type:"button",onClick:()=>t(void 0),className:"rounded-full border border-white/20 px-6 py-3.5 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"I'm not sure yet"})]})]})}const jn={yes:"Good. I'll start from there.",partly:"Noted — I'll hold it loosely and adjust as we talk.",no:"Then I had it wrong. I'll let you lead and build it back up from what you say."};function Nn({answers:t,onContinue:a}){const[s,n]=c.useState(()=>yn(t)),[o,i]=c.useState(!1),[r,l]=c.useState(s),[d,h]=c.useState(null);function x(m){h(m),setTimeout(()=>a(s,m),1400)}function u(){const m=r.trim()||s;n(m),i(!1),h("edited"),setTimeout(()=>a(m,"edited"),1400)}return e.jsxs("div",{className:"fr-screen relative flex min-h-screen flex-col overflow-hidden",children:[e.jsxs(W,{className:"relative z-10 flex flex-1 flex-col",children:[e.jsx("div",{className:"py-8",children:e.jsx(ce,{state:d?"settled":"thinking",depth:1,size:14})}),e.jsx("div",{className:"flex flex-1 items-center pb-24",children:e.jsx("div",{className:"grid w-full grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Here's what I think I understand so far"}),o?e.jsxs("div",{className:"mt-7",children:[e.jsx("textarea",{value:r,onChange:m=>l(m.target.value),rows:5,className:"w-full resize-none rounded-[20px] border border-white/20 bg-white/[0.04] p-5 text-[20px] leading-[1.55] text-white focus:border-white/40 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!0}),e.jsxs("div",{className:"mt-5 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:u,className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Save what I changed"}),e.jsx("button",{type:"button",onClick:()=>{l(s),i(!1)},className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/75 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Cancel"})]})]}):e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,delay:.15,ease:[.16,1,.3,1]},className:"mt-7 max-w-[62ch] text-[21px] leading-[1.55] text-white sm:text-[24px]",style:{fontFamily:"var(--font-google-sans)"},children:s},s),e.jsxs(H,{mode:"wait",children:[!o&&!d&&e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.45,delay:.5},className:"mt-10 flex flex-wrap gap-3",children:[e.jsx("button",{type:"button",onClick:()=>x("yes"),className:"rounded-full bg-[#f84600] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"This feels like me"}),["partly","no"].map(m=>e.jsx("button",{type:"button",onClick:()=>x(m),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:m==="partly"?"Partly":"Not really"},m)),e.jsx("button",{type:"button",onClick:()=>i(!0),className:"rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/80 transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"Edit what Starchild understood"})]},"actions"),d&&e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"mt-10 text-[16px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:d==="edited"?"Thanks — that's more accurate than what I had.":jn[d]},"ack")]})]})})})]}),e.jsx("style",{children:".fr-screen { background: radial-gradient(circle at 30% 20%, #1a2e35 0%, #101d23 45%, #0a0a0a 85%); }"})]})}const Cn={a:hs,b:Ns,c:Gs},sa="starchild.landingVariant",Ft="c";function Sn(){if(typeof window>"u")return Ft;const t=window.localStorage.getItem(sa);return t==="a"||t==="b"||t==="c"?t:Ft}function zn(){const[t,a]=c.useState(Sn),[s,n]=c.useState("landing"),[o,i]=c.useState(),[r,l]=c.useState(),[d,h]=c.useState(),[x,u]=c.useState(!1),[m,f]=c.useState(aa),[w,j]=c.useState(!1),[k,N]=c.useState(Ja);function z(y){a(y),window.localStorage.setItem(sa,y),window.scrollTo({top:0})}function I(y){N(P=>[y,...P])}function L(y){i(y),l(void 0),h(void 0),u(!0),n("chat")}function $(y){i(void 0),l(y.question),h(y),u(!0),n("chat")}function M(){n("landing")}function E(){n("signup")}return e.jsxs(e.Fragment,{children:[s==="landing"&&(()=>{const y=Cn[t];return e.jsxs(e.Fragment,{children:[e.jsx(y,{onEnterGuest:L,onStartTask:$,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>j(!0),onLogIn:E,onSignUp:E},t),e.jsx(qs,{variant:t,onChange:z})]})})(),s==="conductor-mode"&&e.jsx(nn,{onNavigateHome:M,onOpenMarketplace:()=>j(!0),onTry:L,onLogIn:E,onSignUp:E}),s==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(Ye,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>x?n("chat"):M(),onContinue:()=>{u(!1),n("onboarding")}})})}),s==="onboarding"&&e.jsx(wn,{onComplete:y=>{f(y),n("first-read")}}),s==="first-read"&&e.jsx(Nn,{answers:m,onContinue:(y,P)=>{l(P==="no"?"I didn't get that quite right. Tell me where I was off — what's actually going on for you right now?":bn(m)),i(void 0),h(void 0),n("chat")}}),s==="chat"&&e.jsx(tn,{onBack:M,onOpenMarketplace:()=>j(!0),onRequestSignup:()=>n("signup"),onLogIn:E,initialMessage:o,openingMessage:r,task:d,isGuest:x}),e.jsx(pn,{open:w,onClose:()=>j(!1),skills:k,onAddSkill:I})]})}ga.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(zn,{})}));
