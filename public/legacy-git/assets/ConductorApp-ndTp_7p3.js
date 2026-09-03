var Us=Object.defineProperty;var Xs=(t,a,n)=>a in t?Us(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n;var ee=(t,a,n)=>Xs(t,typeof a!="symbol"?a+"":a,n);import{f as qe,a as Lt,i as as,s as ns,b as ss,p as Ks,v as Zs,d as Qs,e as Js,g as ei,n as is,h as ti,k as ai,u as ht,r as l,l as os,o as xa,q as rs,t as ct,M as ni,w as Vt,x as si,j as e,y as O,A as X,m,C as ii}from"./ConductorModeSection-CFJHbla7.js";function ls(t,a){let n;const s=()=>{const{currentTime:i}=a,r=(i===null?0:i.value)/100;n!==r&&t(r),n=r};return qe.preUpdate(s,!0),()=>Lt(s)}function oi(...t){const a=!Array.isArray(t[0]),n=a?0:-1,s=t[0+n],i=t[1+n],o=t[2+n],r=t[3+n],c=as(i,o,r);return a?c(s):c}function Rt(t){return typeof window>"u"?!1:t?ns():ss()}const ri=50,Ua=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),li=()=>({time:0,x:Ua(),y:Ua()}),ci={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Xa(t,a,n,s){const i=n[a],{length:o,position:r}=ci[a],c=i.current,p=n.time;i.current=Math.abs(t[`scroll${r}`]),i.scrollLength=t[`scroll${o}`]-t[`client${o}`],i.offset.length=0,i.offset[0]=0,i.offset[1]=i.scrollLength,i.progress=Ks(0,i.scrollLength,i.current);const d=s-p;i.velocity=d>ri?0:Zs(i.current-c,d)}function di(t,a,n){Xa(t,"x",a,n),Xa(t,"y",a,n),a.time=n}function hi(t,a){const n={x:0,y:0};let s=t;for(;s&&s!==a;)if(Qs(s))n.x+=s.offsetLeft,n.y+=s.offsetTop,s=s.offsetParent;else if(s.tagName==="svg"){const i=s.getBoundingClientRect();s=s.parentElement;const o=s.getBoundingClientRect();n.x+=i.left-o.left,n.y+=i.top-o.top}else if(s instanceof SVGGraphicsElement){const{x:i,y:o}=s.getBBox();n.x+=i,n.y+=o;let r=null,c=s.parentNode;for(;!r;)c.tagName==="svg"&&(r=c),c=s.parentNode;s=r}else break;return n}const fa={start:0,center:.5,end:1};function Ka(t,a,n=0){let s=0;if(t in fa&&(t=fa[t]),typeof t=="string"){const i=parseFloat(t);t.endsWith("px")?s=i:t.endsWith("%")?t=i/100:t.endsWith("vw")?s=i/100*document.documentElement.clientWidth:t.endsWith("vh")?s=i/100*document.documentElement.clientHeight:t=i}return typeof t=="number"&&(s=a*t),n+s}const pi=[0,0];function gi(t,a,n,s){let i=Array.isArray(t)?t:pi,o=0,r=0;return typeof t=="number"?i=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?i=t.split(" "):i=[t,fa[t]?t:"0"]),o=Ka(i[0],n,s),r=Ka(i[1],a),o-r}const dt={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},xi={x:0,y:0};function fi(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function mi(t,a,n){const{offset:s=dt.All}=n,{target:i=t,axis:o="y"}=n,r=o==="y"?"height":"width",c=i!==t?hi(i,t):xi,p=i===t?{width:t.scrollWidth,height:t.scrollHeight}:fi(i),d={width:t.clientWidth,height:t.clientHeight};a[o].offset.length=0;let h=!a[o].interpolate;const x=s.length;for(let g=0;g<x;g++){const f=gi(s[g],d[r],p[r],c[o]);!h&&f!==a[o].interpolatorOffsets[g]&&(h=!0),a[o].offset[g]=f}h&&(a[o].interpolate=as(a[o].offset,Js(s),{clamp:!1}),a[o].interpolatorOffsets=[...a[o].offset]),a[o].progress=ei(0,1,a[o].interpolate(a[o].current))}function ui(t,a=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,a!==t){let s=a;for(;s&&s!==t;)n.x.targetOffset+=s.offsetLeft,n.y.targetOffset+=s.offsetTop,s=s.offsetParent}n.x.targetLength=a===t?a.scrollWidth:a.clientWidth,n.y.targetLength=a===t?a.scrollHeight:a.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function bi(t,a,n,s={}){return{measure:i=>{ui(t,s.target,n),di(t,n,i),(s.offset||s.target)&&mi(t,n,s)},notify:()=>a(n)}}const Fe=new WeakMap,Za=new WeakMap,Ut=new WeakMap,Qa=new WeakMap,vt=new WeakMap,Ja=t=>t===document.scrollingElement?window:t;function cs(t,{container:a=document.scrollingElement,trackContentSize:n=!1,...s}={}){if(!a)return is;let i=Ut.get(a);i||(i=new Set,Ut.set(a,i));const o=li(),r=bi(a,t,o,s);if(i.add(r),!Fe.has(a)){const p=()=>{for(const g of i)g.measure(ai.timestamp);qe.preUpdate(d)},d=()=>{for(const g of i)g.notify()},h=()=>qe.read(p);Fe.set(a,h);const x=Ja(a);window.addEventListener("resize",h),a!==document.documentElement&&Za.set(a,ti(a,h)),x.addEventListener("scroll",h),h()}if(n&&!vt.has(a)){const p=Fe.get(a),d={width:a.scrollWidth,height:a.scrollHeight};Qa.set(a,d);const h=()=>{const g=a.scrollWidth,f=a.scrollHeight;(d.width!==g||d.height!==f)&&(p(),d.width=g,d.height=f)},x=qe.read(h,!0);vt.set(a,x)}const c=Fe.get(a);return qe.read(c,!1,!0),()=>{var x;Lt(c);const p=Ut.get(a);if(!p||(p.delete(r),p.size))return;const d=Fe.get(a);Fe.delete(a),d&&(Ja(a).removeEventListener("scroll",d),(x=Za.get(a))==null||x(),window.removeEventListener("resize",d));const h=vt.get(a);h&&(Lt(h),vt.delete(a)),Qa.delete(a)}}const yi=[[dt.Enter,"entry"],[dt.Exit,"exit"],[dt.Any,"cover"],[dt.All,"contain"]],en={start:0,end:1};function wi(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const n=en[a[0]],s=en[a[1]];if(!(n===void 0||s===void 0))return[n,s]}function vi(t){if(t.length!==2)return;const a=[];for(const n of t)if(Array.isArray(n))a.push(n);else if(typeof n=="string"){const s=wi(n);if(!s)return;a.push(s)}else return;return a}function ki(t,a){const n=vi(t);if(!n)return!1;for(let s=0;s<2;s++){const i=n[s],o=a[s];if(i[0]!==o[0]||i[1]!==o[1])return!1}return!0}function ja(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,n]of yi)if(ki(t,a))return{rangeStart:`${n} 0%`,rangeEnd:`${n} 100%`}}const tn=new Map;function an(t){const a={value:0},n=cs(s=>{a.value=s[t.axis].progress*100},t);return{currentTime:a,cancel:n}}function ds({source:t,container:a,...n}){const{axis:s}=n;t&&(a=t);let i=tn.get(a);i||(i=new Map,tn.set(a,i));const o=n.target??"self";let r=i.get(o);r||(r={},i.set(o,r));const c=s+(n.offset??[]).join(",");return r[c]||(n.target&&Rt(n.target)?ja(n.offset)?r[c]=new ViewTimeline({subject:n.target,axis:s}):r[c]=an({container:a,...n}):Rt()?r[c]=new ScrollTimeline({source:a,axis:s}):r[c]=an({container:a,...n})),r[c]}function ji(t,a){const n=ds(a),s=a.target?ja(a.offset):void 0,i=a.target?Rt(a.target)&&!!s:Rt();return t.attachTimeline({timeline:i?n:void 0,...s&&i&&{rangeStart:s.rangeStart,rangeEnd:s.rangeEnd},observe:o=>(o.pause(),ls(r=>{o.time=o.iterationDuration*r},n))})}function Ni(t){return t&&(t.target||t.offset)}function zi(t){return t.length===2}function Ci(t,a){return zi(t)||Ni(a)?cs(n=>{t(n[a.axis].progress,n)},a):ls(t,ds(a))}function hs(t,{axis:a="y",container:n=document.scrollingElement,...s}={}){if(!n)return is;const i={axis:a,container:n,...s};return typeof t=="function"?Ci(t,i):ji(t,i)}const Si=()=>({scrollX:ct(0),scrollY:ct(0),scrollXProgress:ct(0),scrollYProgress:ct(0)}),Ge=t=>t?!t.current:!1;function nn(t,a,n,s){return{factory:i=>{let o;const r=()=>{if(Ge(n)||Ge(s)){xa.read(r);return}o=hs(i,{...a,axis:t,container:(n==null?void 0:n.current)||void 0,target:(s==null?void 0:s.current)||void 0})};return xa.read(r),()=>{rs(r),o==null||o()}},times:[0,1],keyframes:[0,1],ease:i=>i,duration:1}}function Ti(t,a){return typeof window>"u"?!1:t?ns()&&!!ja(a):ss()}function ps({container:t,target:a,...n}={}){const s=ht(Si);Ti(a,n.offset)&&(s.scrollXProgress.accelerate=nn("x",n,t,a),s.scrollYProgress.accelerate=nn("y",n,t,a));const i=l.useRef(null),o=l.useRef(!1),r=l.useCallback(()=>(i.current=hs((c,{x:p,y:d})=>{s.scrollX.set(p.current),s.scrollXProgress.set(p.progress),s.scrollY.set(d.current),s.scrollYProgress.set(d.progress)},{...n,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var c;(c=i.current)==null||c.call(i)}),[t,a,JSON.stringify(n.offset)]);return os(()=>{if(o.current=!1,Ge(t)||Ge(a)){o.current=!0;return}else return r()},[r]),l.useEffect(()=>{if(!o.current)return;let c;const p=()=>{const d=Ge(t),h=Ge(a);!d&&!h&&(c=r())};return xa.read(p),()=>{rs(p),c==null||c()}},[r]),s}function Ai(t){const a=ht(()=>ct(t)),{isStatic:n}=l.useContext(ni);if(n){const[,s]=l.useState(t);l.useEffect(()=>a.on("change",s),[])}return a}function gs(t,a){const n=Ai(a()),s=()=>n.set(a());return s(),os(()=>{const i=()=>qe.preRender(s,!1,!0),o=t.map(r=>r.on("change",i));return()=>{o.forEach(r=>r()),Lt(s)}}),n}function Mi(t){Vt.current=[],t();const a=gs(Vt.current,t);return Vt.current=void 0,a}function Ae(t,a,n,s){if(typeof t=="function")return Mi(t);if(n!==void 0&&!Array.isArray(n)&&typeof a!="function")return Ei(t,a,n,s);const r=typeof a=="function"?a:oi(a,n,s),c=Array.isArray(t)?sn(t,r):sn([t],([d])=>r(d)),p=Array.isArray(t)?void 0:t.accelerate;return p&&!p.isTransformed&&typeof a!="function"&&Array.isArray(n)&&(s==null?void 0:s.clamp)!==!1&&(c.accelerate={...p,times:a,keyframes:n,isTransformed:!0}),c}function sn(t,a){const n=ht(()=>[]);return gs(t,()=>{n.length=0;const s=t.length;for(let i=0;i<s;i++)n[i]=t[i].get();return a(n)})}function Ei(t,a,n,s){const i=ht(()=>Object.keys(n)),o=ht(()=>({}));for(const r of i)o[r]=Ae(t,a,n[r],s);return o}const Ii={some:0,all:1};function Li(t,a,{root:n,margin:s,amount:i="some"}={}){const o=si(t),r=new WeakMap,c=d=>{d.forEach(h=>{const x=r.get(h.target);if(h.isIntersecting!==!!x)if(h.isIntersecting){const g=a(h.target,h);typeof g=="function"?r.set(h.target,g):p.unobserve(h.target)}else typeof x=="function"&&(x(h),r.delete(h.target))})},p=new IntersectionObserver(c,{root:n,rootMargin:s,threshold:typeof i=="number"?i:Ii[i]});return o.forEach(d=>p.observe(d)),()=>p.disconnect()}function xt(t,{root:a,margin:n,amount:s,once:i=!1,initial:o=!1}={}){const[r,c]=l.useState(o);return l.useEffect(()=>{if(!t.current||i&&r)return;const p=()=>(c(!0),i?void 0:()=>c(!1)),d={root:a&&a.current||void 0,margin:n,amount:s};return Li(t.current,p,d)},[a,t,n,i,s]),r}function Na({className:t}){return e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"",width:32,height:32,className:t??"size-6"})}function Ri({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsxs("g",{stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",children:[e.jsx("path",{d:"M3.5 8.5h11M19 8.5h1.5M3.5 15.5h5M13 15.5h7.5"}),e.jsx("circle",{cx:"16.5",cy:"8.5",r:"2.2"}),e.jsx("circle",{cx:"10.75",cy:"15.5",r:"2.2"})]})})}function $i({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("path",{d:"M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M14 3v3.2A1.8 1.8 0 0 0 15.8 8H18",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})]})}function fe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Fi({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function J({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Ve({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function xs({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Dt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function fs({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function za({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function ms({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Ca({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function us({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function Le({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function Sa({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function bs({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Wi({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("defs",{children:e.jsxs("radialGradient",{id:"run-dot-halo",children:[e.jsx("stop",{offset:"35%",stopColor:"#f84600",stopOpacity:"0.5"}),e.jsx("stop",{offset:"100%",stopColor:"#f84600",stopOpacity:"0"})]})}),e.jsxs("g",{className:"run-dot",children:[e.jsx("circle",{className:"run-dot-glow",cx:"12",cy:"12",r:"9",fill:"url(#run-dot-halo)"}),e.jsx("circle",{className:"run-dot-core",cx:"12",cy:"12",r:"3.4",fill:"var(--color-orange-400)"})]})]})}function ys({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function ft({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("rect",{x:"3",y:"7.5",width:"18",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Pi({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function Bi({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function ma({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})})}function Me({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M10 4a2 2 0 0 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 0 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 0 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 0 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function Ta({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("rect",{x:"4",y:"4",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"13.5",y:"4",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"4",y:"13.5",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"13.5",y:"13.5",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"})]})}function Aa({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("path",{d:"M4 9V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M4 9h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M9 19v-5h6v5",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})]})}function Ma({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("path",{d:"M7 4h10v5a5 5 0 0 1-10 0V4Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 6H5a2 2 0 0 0 2 3M17 6h2a2 2 0 0 1-2 3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M12 14v4M9 20h6",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Ea({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:t??"size-5",children:[e.jsx("circle",{cx:"6",cy:"12",r:"1.6"}),e.jsx("circle",{cx:"12",cy:"12",r:"1.6"}),e.jsx("circle",{cx:"18",cy:"12",r:"1.6"})]})}function Di({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"3",y:"6",width:"18",height:"13",rx:"2.2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M3 10h18",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("circle",{cx:"16.5",cy:"14.5",r:"1.1",fill:"currentColor"})]})}function mt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"3.5",y:"5",width:"17",height:"14",rx:"2.2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M14 5v14",stroke:"currentColor",strokeWidth:"1.6"})]})}function Oi({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"m9 7-4 5 4 5M15 7l4 5-4 5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}const on={curious:{stiffness:118,damping:.6,hesitation:115,lean:.13,drag:.055},attentive:{stiffness:205,damping:.84,hesitation:55,lean:.06,drag:.028},unsettled:{stiffness:88,damping:.4,hesitation:165,lean:.19,drag:.075},composed:{stiffness:175,damping:.97,hesitation:35,lean:.03,drag:.018}},Hi=.15,Xt=6,rn=.7,qi=18,Gi=1.08,ln=80,_i=320,Yi=3,st=(t,a,n)=>t<a?a:t>n?n:t;class _e{constructor({temperament:a="curious",seed:n=Math.random(),reduced:s=!1,breath:i=.022,x:o=0,y:r=0}={}){ee(this,"x");ee(this,"y");ee(this,"vx",0);ee(this,"vy",0);ee(this,"aimX");ee(this,"aimY");ee(this,"tuning");ee(this,"reduced");ee(this,"breathDepth");ee(this,"holdUntil",0);ee(this,"stretch",0);ee(this,"angle",0);ee(this,"last",0);ee(this,"accumulator",0);ee(this,"restFor",0);ee(this,"skewX");ee(this,"skewY");ee(this,"phase");ee(this,"jitter");this.tuning=on[a],this.reduced=s,this.breathDepth=s?0:i,this.x=this.aimX=o,this.y=this.aimY=r,this.skewX=1+(n-.5)*.13,this.skewY=1-(n-.5)*.13,this.phase=n*Math.PI*2,this.jitter=.75+n*.5}setTemperament(a){this.tuning=on[a]}setReduced(a){this.reduced=a,a&&(this.x=this.aimX,this.y=this.aimY,this.vx=this.vy=0,this.stretch=0,this.breathDepth=0)}place(a,n){this.x=this.aimX=a,this.y=this.aimY=n,this.vx=this.vy=0,this.stretch=0,this.holdUntil=0}aim(a,n,s=performance.now()){if(this.reduced){this.x=this.aimX=a,this.y=this.aimY=n;return}Math.hypot(a-this.aimX,n-this.aimY)>qi&&this.isResting()&&(this.holdUntil=s+this.tuning.hesitation*this.jitter),this.aimX=a,this.aimY=n}unbalance(a=1){if(this.reduced)return;const n=this.phase+a;this.vx+=Math.cos(n)*90*a,this.vy+=Math.sin(n)*74*a}isResting(){return Math.hypot(this.vx,this.vy)<Xt&&Math.hypot(this.aimX-this.x,this.aimY-this.y)<rn*4}step(a){if(this.reduced)return this.x=this.aimX,this.y=this.aimY,{x:this.x,y:this.y,vx:0,vy:0,speed:0,stretch:0,angle:0,breath:1,settled:!0};this.last||(this.last=a);const n=st((a-this.last)/1e3,0,.1);this.last=a;const{stiffness:s,damping:i,lean:o,drag:r}=this.tuning,c=a<this.holdUntil,p=c?this.x+(this.aimX-this.x)*o:this.aimX,d=c?this.y+(this.aimY-this.y)*o:this.aimY,h=st(this.restFor/.42,0,1),x=i+(Gi-i)*h,g=Math.hypot(p-this.x,d-this.y),f=1+Yi*st((g-ln)/(_i-ln),0,1);this.accumulator+=n;const u=1/240;let b=0;for(;this.accumulator>=u&&b++<60;){this.accumulator-=u;const S=s*this.skewX*f,v=s*this.skewY*f,L=2*x*Math.sqrt(S),W=2*x*Math.sqrt(v);this.vx+=(S*(p-this.x)-L*this.vx)*u,this.vy+=(v*(d-this.y)-W*this.vy)*u,this.x+=this.vx*u,this.y+=this.vy*u}const y=Math.hypot(this.vx,this.vy),w=y<Xt&&Math.hypot(this.aimX-this.x,this.aimY-this.y)<rn;this.restFor=w?this.restFor+n:0;const k=st(y*r*.01,0,Hi),N=k>this.stretch?.22:.1;this.stretch+=(k-this.stretch)*st(N*n*60,0,1),y>Xt&&(this.angle=Math.atan2(this.vy,this.vx));const C=this.breathDepth?1+Math.sin(a/1e3/3.9*Math.PI*2+this.phase)*this.breathDepth*h:1;return{x:this.x,y:this.y,vx:this.vx,vy:this.vy,speed:y,stretch:this.stretch,angle:this.angle,breath:C,settled:w&&this.stretch<.004}}isQuiet(a){return a.settled&&!this.breathDepth}}function Ot(t,a=0,n=0){const s=t.angle*180/Math.PI,i=1+t.stretch,o=1-t.stretch*.62,r=t.breath;return`translate3d(${(t.x+a).toFixed(2)}px, ${(t.y+n).toFixed(2)}px, 0) rotate(${s.toFixed(2)}deg) scale(${(i*r).toFixed(4)}, ${(o*r).toFixed(4)}) rotate(${(-s).toFixed(2)}deg)`}function oe(){const[t,a]=l.useState(()=>typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches);return l.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)"),s=()=>a(n.matches);return s(),n.addEventListener("change",s),()=>n.removeEventListener("change",s)},[]),t}function Ht(t={}){const{temperament:a="composed",seed:n,breath:s=.022,offsetX:i=0,offsetY:o=0,onFrame:r,observe:c=!0}=t,p=l.useRef(null),d=oe(),h=l.useMemo(()=>new _e({temperament:a,seed:n,breath:s,reduced:d}),[]),x=l.useRef(0),g=l.useRef(!1),f=l.useRef(!0),u=l.useRef(r);u.current=r,l.useEffect(()=>{h.setReduced(d),h.setTemperament(a)},[h,d,a]);const b=l.useCallback(()=>{if(g.current||!f.current)return;g.current=!0;const w=k=>{var S;const N=h.step(k),C=p.current;if(C&&(C.style.transform=Ot(N,i,o)),(S=u.current)==null||S.call(u,N),h.isQuiet(N)||!f.current){g.current=!1;return}x.current=requestAnimationFrame(w)};x.current=requestAnimationFrame(w)},[h,i,o]);l.useEffect(()=>{const w=p.current;if(!w)return;let k;c&&typeof IntersectionObserver<"u"&&(k=new IntersectionObserver(([C])=>{f.current=C.isIntersecting,C.isIntersecting&&b()},{threshold:0}),k.observe(w));const N=()=>{f.current=!document.hidden,document.hidden||b()};return document.addEventListener("visibilitychange",N),b(),()=>{k==null||k.disconnect(),document.removeEventListener("visibilitychange",N),cancelAnimationFrame(x.current),g.current=!1}},[b,c]);const y=l.useMemo(()=>({aim:(w,k)=>{h.aim(w,k),b()},place:(w,k)=>{h.place(w,k),b()},setTemperament:w=>h.setTemperament(w),unbalance:w=>{h.unbalance(w),b()},wake:b}),[h,b]);return{ref:p,controller:y}}function Ia(t,a,n=3.4,s=!1){l.useEffect(()=>{if(!a||s)return;let i;const o=()=>{const r=Math.random()*Math.PI*2,c=n*(.35+Math.random()*.65);t.aim(Math.cos(r)*c,Math.sin(r)*c),i=window.setTimeout(o,380+Math.random()*620)};return i=window.setTimeout(o,120),()=>window.clearTimeout(i)},[t,a,n,s])}const Vi={idle:"composed",listening:"attentive",acknowledging:"attentive",thinking:"unsettled",settled:"composed"},Ui={idle:[0,0],listening:[0,2.6],acknowledging:[0,1.2],thinking:[0,0],settled:[0,0]},Xi={idle:null,listening:"sd-attend .42s cubic-bezier(.16,1,.3,1)",acknowledging:"sd-acknowledge .52s cubic-bezier(.34,.8,.3,1)",thinking:"sd-consider .72s cubic-bezier(.4,0,.2,1)",settled:"sd-recompose .62s cubic-bezier(.16,1,.3,1)"};function La({state:t="idle",depth:a=0,size:n=18}){const s=oe(),i=l.useRef(null),{ref:o,controller:r}=Ht({temperament:Vi[t],breath:t==="idle"?.03:.012});l.useEffect(()=>{if(t==="thinking")return;const[h,x]=Ui[t];r.aim(h,x)},[r,t]),Ia(r,t==="thinking",3.2,s),l.useEffect(()=>{const h=i.current,x=Xi[t];!h||!x||s||(h.style.animation="none",h.offsetWidth,h.style.animation=x)},[t,s]);const c=10+a*26,p=.1+a*.22,d=n*(2+a*.9);return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:n*3,height:n*3},children:[e.jsx("span",{"aria-hidden":"true",className:"sd-halo",style:{width:d,height:d,opacity:p}}),e.jsx("span",{ref:i,className:"sd-beat",children:e.jsx("span",{ref:o,"aria-hidden":"true",className:"sd-core",style:{width:n,height:n,boxShadow:`0 0 ${c}px rgba(248,70,0,.7)`}})})]})}const cn=.34,dn=.15,We=860,kt=560,jt=14;function Ki({targetRef:t,image:a}){const n=l.useRef(null),s=l.useRef(null),i=l.useRef(null),o=l.useRef(null);return l.useEffect(()=>{const r=t.current,c=n.current;if(!r||!c||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let h=0,x=0,g=0,f=0,u=0,b=0,y=!1,w=0;const k=()=>{var L,W,D,j;(L=o.current)==null||L.style.setProperty("transform",`translate3d(${g-jt/2}px, ${f-jt/2}px, 0)`),(W=i.current)==null||W.style.setProperty("transform",`translate3d(${u-kt/2}px, ${b-kt/2}px, 0)`),(D=s.current)==null||D.style.setProperty("--mx",`${u-We/2}px`),(j=s.current)==null||j.style.setProperty("--my",`${b-We/2}px`)},N=()=>{g+=(h-g)*cn,f+=(x-f)*cn,u+=(g-u)*dn,b+=(f-b)*dn,k(),w=requestAnimationFrame(N)},C=L=>{const W=r.getBoundingClientRect();if(h=L.clientX-W.left,x=L.clientY-W.top,!y){if(y=!0,g=u=h,f=b=x,k(),d)return;w=requestAnimationFrame(N)}d&&(g=u=h,f=b=x,k())},S=()=>c.classList.add("hs-on"),v=()=>{c.classList.remove("hs-on"),cancelAnimationFrame(w),w=0,y=!1};return r.addEventListener("pointermove",C),r.addEventListener("pointerenter",S),r.addEventListener("pointerleave",v),r.classList.add("hs-host"),()=>{r.removeEventListener("pointermove",C),r.removeEventListener("pointerenter",S),r.removeEventListener("pointerleave",v),r.classList.remove("hs-host"),cancelAnimationFrame(w)}},[t]),e.jsxs("div",{ref:n,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:s,className:"hs-lit"}),e.jsx("div",{ref:i,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:o,className:"hs-dot"})}),e.jsx("style",{children:`
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
          -webkit-mask-size: ${We}px ${We}px;
          mask-size: ${We}px ${We}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${kt}px; height: ${kt}px;
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
          width: ${jt}px; height: ${jt}px;
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
      `})]})}function ws({onNavigateHome:t,onLogIn:a,onSignUp:n}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:n,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const Zi=[{id:"build",label:"Build",icon:fs,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:ms,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:Sa,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:bs,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:ys,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],Nt=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],Qi=[{id:"ideas",label:"Ideas",icon:za,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:Pi,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:Bi,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:Sa,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:bs,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:ys,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],vs={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},ks={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},js={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},Ns={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},Ji={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},eo=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:vs},{test:/coffee|brand|logo/i,scenario:ks},{test:/market|trading|trade|stock|crypto/i,scenario:js},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:Ns}],to=[{prompt:"Make a poster for the Odyssey movie",scenario:vs},{prompt:"Make me a coffee shop brand",scenario:ks},{prompt:"How's the market today?",scenario:js},{prompt:"Debug this Python traceback",scenario:Ns}];function hn(t){const a=eo.find(({test:n})=>n.test(t));return(a==null?void 0:a.scenario)??Ji}const Kt=["All","Writing","Design","Code","Marketing"],ao=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function ut({onStartTask:t,align:a="start",intents:n=Zi}){const[s,i]=l.useState(null),o=n.find(c=>c.id===s),r=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${r}`,children:n.map(({id:c,label:p,icon:d,badge:h,hint:x})=>{const g=s===c;return e.jsxs("div",{className:"group relative",children:[e.jsxs("button",{type:"button",onClick:()=>i(g?null:c),"aria-expanded":g,"aria-describedby":x?`${c}-hint`:void 0,"data-presence":"chip",className:`ip-chip${g?" ip-chip--on":""}`,children:[e.jsx(d,{className:"ip-icon size-4"}),p,h&&e.jsx("span",{className:"ip-badge absolute -top-2 -right-1.5 rounded-full px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide",children:h})]}),x&&e.jsx("span",{id:`${c}-hint`,role:"tooltip",className:"ip-hint pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-full px-3 py-1.5 text-[11.5px] whitespace-nowrap opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",children:x})]},c)})}),e.jsx(X,{mode:"wait",children:o&&e.jsx(m.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${r} ${a==="center"?"mx-auto":""}`,children:o.tasks.map((c,p)=>e.jsxs(m.button,{type:"button",onClick:()=>t(c),"data-presence":"chip",initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+p*.05,ease:[.16,1,.3,1]},className:"ip-task group flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-[13.5px] transition-colors",children:[c.label,e.jsx(J,{className:"ip-arrow size-3.5 rotate-45 transition-colors"})]},c.id))})},o.id)}),e.jsx("style",{children:`
        /* Every alpha here goes through the same lift the rest of the landing
           uses: A + (1 - A) * lift, which is 0 on a dark page and leaves the
           number exactly as it was. On clay the alphas that read on black are two
           to three times too faint, and a chip that fades into its own page is a
           chip nobody presses. */
        .ip-chip {
          position: relative;
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; border: 0; border-radius: 999px; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px;
          background: rgba(var(--lf-ink-rgb), calc(.07 + .93 * var(--lf-lift-f)));
          color: rgba(var(--lf-ink-rgb), calc(.72 + .28 * var(--lf-lift-t)));
          transition: background-color .18s ease, color .18s ease;
        }
        .ip-chip:hover {
          background: rgba(var(--lf-ink-rgb), calc(.13 + .87 * var(--lf-lift-f)));
        }
        .ip-chip:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 2px; }

        /* The open one inverts: solid ink with the page's own colour set on it.
           On black that is the white chip with near-black type it always was; on
           clay it is the same relationship the other way up, which is what makes
           "open" read as a state rather than as a slightly different chip. */
        .ip-chip--on, .ip-chip--on:hover {
          background: var(--lf-ink);
          color: var(--lf-page);
        }

        .ip-icon { color: rgba(var(--lf-ink-rgb), calc(.55 + .45 * var(--lf-lift-t))); }
        /* Dimmed against the inverted chip rather than given its own colour —
           one value that works whichever way round the chip currently is. */
        .ip-chip--on .ip-icon { color: var(--lf-page); opacity: .6; }

        /* White stays white on the accent. It is the brand orange in both modes,
           so what sits on it does not depend on the page behind it. */
        .ip-badge { background: var(--lf-accent); color: #fff; }

        .ip-hint {
          border: 1px solid rgba(var(--lf-ink-rgb), calc(.12 + .88 * var(--lf-lift-e)));
          background: var(--lf-surface);
          color: rgba(var(--lf-ink-rgb), calc(.65 + .35 * var(--lf-lift-t)));
        }

        .ip-task {
          border: 1px solid var(--lf-ctl-edge);
          background: var(--lf-surface);
          color: rgba(var(--lf-ink-rgb), calc(.72 + .28 * var(--lf-lift-t)));
          font-family: var(--font-google-sans);
        }
        .ip-task:hover {
          border-color: rgba(var(--lf-accent-rgb), .6);
          background: var(--lf-surface-2);
        }
        .ip-task:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 2px; }

        .ip-arrow { color: rgba(var(--lf-ink-rgb), calc(.35 + .65 * var(--lf-lift-t))); }
        .ip-task:hover .ip-arrow { color: var(--lf-accent-ink); }
      `})]})}const no="./images/monolito.png";function zs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}){const r=l.useRef(null);return e.jsxs("section",{ref:r,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Ki,{targetRef:r,image:no}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(ws,{onNavigateHome:()=>{},onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(O,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(so,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function so({onEnterGuest:t,onStartTask:a}){const[n,s]=l.useState(""),i=()=>t(n.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(La,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(m.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(m.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(m.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:n,onChange:o=>s(o.target.value),onKeyDown:o=>{o.key==="Enter"&&i()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:i,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(J,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(ut,{onStartTask:a})})]})}const io="./images/empresas.svg",oo=6;function Cs(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(O,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:oo},(t,a)=>e.jsx("img",{src:io,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
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
      `})]})}const pn="(min-width: 1024px) and (min-height: 560px)",gn="(prefers-reduced-motion: reduce)";function ro(){const t=()=>typeof window<"u"&&window.matchMedia(pn).matches&&!window.matchMedia(gn).matches,[a,n]=l.useState(t);return l.useEffect(()=>{const s=window.matchMedia(pn),i=window.matchMedia(gn),o=()=>n(s.matches&&!i.matches);return o(),s.addEventListener("change",o),i.addEventListener("change",o),()=>{s.removeEventListener("change",o),i.removeEventListener("change",o)}},[]),a}function lo(t,a,n){const s=l.useRef(n);s.current=n,l.useEffect(()=>{if(!a)return;const i=()=>{const o=t.current;if(!o)return;const r=o.offsetHeight-window.innerHeight;if(r<=0)return;const c=-o.getBoundingClientRect().top/r;s.current(c<0?0:c>1?1:c)};return i(),window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[a,t])}function Ss(t){const a=l.useRef(null),n=ro(),[s,i]=l.useState(0);return lo(a,n,r=>{i(Math.max(0,Math.min(t-1,Math.floor(r*t))))}),{trackRef:a,pinned:n,index:s,selectStep:r=>{const c=a.current;if(!n||!c){i(r);return}const p=c.getBoundingClientRect().top+window.scrollY,d=c.offsetHeight-window.innerHeight;window.scrollTo({top:p+d*((r+.5)/t),behavior:"smooth"})}}}function Ra({trackRef:t,pinned:a,screens:n,children:s}){const i=l.useRef(null),[o,r]=l.useState(1);return l.useLayoutEffect(()=>{if(!a){r(1);return}const c=i.current;if(!c)return;const p=()=>{const h=c.offsetHeight,x=window.innerHeight-32;r(h>x?Math.max(.62,x/h):1)};p();const d=new ResizeObserver(p);return d.observe(c),window.addEventListener("resize",p),()=>{d.disconnect(),window.removeEventListener("resize",p)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(n)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:i,className:"sp-fit",style:o===1?void 0:{transform:`scale(${o})`},children:s})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function co({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(Na,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,n)=>e.jsxs(m.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+n*.09,ease:[.16,1,.3,1]},className:`pw-step${n===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(ho,{result:t.result})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function ho({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,n)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:n+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,n)=>e.jsx(m.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+n*.05,ease:[.16,1,.3,1]}},n))})]})}function po({onStartTask:t}){const{trackRef:a,pinned:n,index:s,selectStep:i}=Ss(Nt.length),o=Nt[s];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ra,{trackRef:a,pinned:n,screens:Nt.length,children:e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Nt.map((r,c)=>{const p=c===s;return e.jsxs("button",{type:"button",onClick:()=>i(c),"aria-pressed":p,className:`uc-tab${p?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:r.label}),e.jsx(X,{initial:!1,children:p&&e.jsxs(m.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:r.blurb}),e.jsx("span",{className:"uc-tab-example",children:r.example})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(o.task),className:"uc-try",children:[o.task.label,e.jsx(J,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(co,{useCase:o})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function go({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:Qi.map(({id:a,label:n,icon:s,task:i},o)=>e.jsxs(m.button,{type:"button",onClick:()=>t(i),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:o%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(s,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:n}),e.jsx(J,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:i.label})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const xo=[{name:"OpenAI",file:"OpenAI.svg",w:148,h:40,size:24},{name:"SpaceX AI",file:"Spacexai.svg",w:215,h:29,size:19},{name:"Claude",file:"Claude.svg",w:160,h:34,size:24},{name:"Gemini",file:"Frame374.svg",w:151,h:34,size:24},{name:"Kimi",file:"Kimi.svg",w:118,h:40,size:24}],fo=[{name:"DeepSeek",file:"Deepseek.svg",w:206,h:33,size:21},{name:"Qwen",file:"Frame375.svg",w:137,h:40,size:24},{name:"MiniMax",file:"Frame376.svg",w:177,h:42,size:24},{name:"Z",file:"Zai.svg",w:40,h:40,size:22}],mo=4,uo=["what matters to you","how you like to be helped","what you're working through","what you keep coming back to"],bo=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],xn=.04,yo=.2,fn=.24,wo=.58,zt=.66,mn=.96,vo=.56,ko=.62,jo=3520,ve=t=>t<0?0:t>1?1:t,ke=(t,a,n)=>t+(a-t)*n,ua=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function un(t,a){const n=t.length-1;if(n<1)return t[0];const s=ve(a)*n,i=Math.min(n-1,Math.floor(s)),o=ua(s-i);return{x:ke(t[i].x,t[i+1].x,o),y:ke(t[i].y,t[i+1].y,o)}}function it(t,a,n){const s=t.getBoundingClientRect();return{left:(s.left-a.left)/n,top:(s.top-a.top)/n,width:s.width/n,height:s.height/n}}function bn(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function Zt(t,a,n,s){if(!t)return 0;const i=Math.hypot(n.x-a.x,n.y-a.y);return t.setAttribute("x1",`${a.x}`),t.setAttribute("y1",`${a.y}`),t.setAttribute("x2",`${n.x}`),t.setAttribute("y2",`${n.y}`),t.style.strokeDasharray=`${i}`,t.style.strokeDashoffset=s?"0":`${i}`,i}function Qt(t,a,n,s,i){if(!t||a<=0)return;const o=(i.x-n.x)*(s.x-n.x)+(i.y-n.y)*(s.y-n.y);t.style.strokeDashoffset=`${(a*(1-ve(o/(a*a)))).toFixed(2)}`}function yn({marks:t,reverse:a}){return e.jsx("div",{className:"ky-marquee",children:e.jsx("div",{className:`ky-track${a?" ky-track--reverse":""}`,children:Array.from({length:mo}).flatMap((n,s)=>t.map(i=>e.jsx("img",{className:"ky-mark",src:`./images/carousel/${i.file}`,alt:s===0?i.name:"",style:{height:i.size,width:i.size*(i.w/i.h)}},`${s}-${i.file}`)))})})}function wn({label:t,innerRef:a,className:n="",children:s}){return e.jsxs("div",{className:`ky-panel ${n}`,ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function bt({showBenefits:t=!0}={}){const a=l.useRef(null),n=l.useRef(null),s=l.useRef(null),i=l.useRef(null),o=l.useRef(null),r=l.useRef(null),c=l.useRef(null),p=l.useRef(null),d=l.useRef(null),h=l.useRef(null),x=l.useRef(null),g=l.useRef({a:0,b:0,c:0}),f=l.useRef(null),u=l.useRef(null),b=l.useRef({a:[],b:[]}),y=l.useRef(null),w=l.useRef(null),k=l.useRef(null),N=l.useRef(null),C=l.useRef(0),[S,v]=l.useState("waiting"),[L,W]=l.useState(!1),[D,j]=l.useState(!1),$=l.useRef(!1);l.useEffect(()=>{const F=window.matchMedia("(prefers-reduced-motion: reduce)"),B=()=>j(F.matches);B(),F.addEventListener("change",B);const _=()=>{const U=n.current,Z=s.current,H=i.current,z=o.current,Y=r.current;if(!U||!Z||!H||!z||!Y)return;const T=U.getBoundingClientRect(),q=U.offsetWidth?T.width/U.offsetWidth:1,I=it(z,T,q),M={x:I.left+I.width/2,y:I.top+I.height/2},R=it(Y,T,q),V={conductor:M,you:bn(it(Z,T,q),M),models:bn(it(H,T,q),M),result:{x:R.left+R.width/2,y:R.top}};c.current=V;const G=ae=>{if(!ae)return[];const ne=it(ae,T,q);return[{x:ne.left+ne.width/2,y:ne.top+ne.height/2}]};b.current={a:[...G(f.current),V.you],b:[...G(u.current),V.models]};const te=p.current;if(te){te.setAttribute("viewBox",`0 0 ${U.offsetWidth} ${U.offsetHeight}`);const ae=F.matches;g.current={a:Zt(d.current,V.you,V.conductor,ae),b:Zt(h.current,V.models,V.conductor,ae),c:Zt(x.current,V.conductor,V.result,ae)}}};_(),window.addEventListener("resize",_);const Q=new ResizeObserver(_);return n.current&&Q.observe(n.current),()=>{Q.disconnect(),window.removeEventListener("resize",_),F.removeEventListener("change",B)}},[]),l.useEffect(()=>{const F=n.current;if(!F)return;if(D){E(1);return}let B=0,_=0;const Q=Z=>{_||(_=Z);const H=ve((Z-_)/jo);E(H),H<1&&(B=requestAnimationFrame(Q))},U=new IntersectionObserver(([Z])=>{!Z.isIntersecting||$.current||($.current=!0,U.disconnect(),B=requestAnimationFrame(Q))},{threshold:.4});return U.observe(F),()=>{U.disconnect(),cancelAnimationFrame(B)}},[D]),l.useEffect(()=>{if(D)return;const F=n.current;if(!F)return;N.current??(N.current={a:new _e({temperament:"attentive",seed:.21,breath:0}),b:new _e({temperament:"attentive",seed:.21,breath:0}),c:new _e({temperament:"attentive",seed:.44,breath:0})});const{a:B,b:_,c:Q}=N.current;let U=0,Z=!1,H=!1;const z=I=>{const M=c.current;if(!M){U=requestAnimationFrame(z);return}const R=C.current,V=ve((R-xn)/(yo-xn)),G=ua(ve((R-fn)/(wo-fn))),te=ua(ve((R-zt)/(mn-zt))),ae=un(b.current.a,V),ne=un(b.current.b,V),be=ke(ae.x,M.conductor.x,G),Ne=ke(ae.y,M.conductor.y,G),ze=ke(ne.x,M.conductor.x,G),ge=ke(ne.y,M.conductor.y,G),re=ke(M.conductor.x,M.result.x,te),xe=ke(M.conductor.y,M.result.y,te);Z||(Z=!0,B.place(be,Ne),_.place(ze,ge),Q.place(re,xe)),B.aim(be,Ne,I),_.aim(ze,ge,I),Q.aim(re,xe,I);const K=G>.94?(1-G)/.06:1,Ce=G<=0?0:Math.min(1,G/.05)*K,Gt=te<=0?0:te>.93?(1-te)/.07:Math.min(1,te/.08),yt=B.step(I),Qe=_.step(I),Je=Q.step(I),et=(tt,Re,at)=>{tt&&(tt.style.transform=Ot(Re),tt.style.opacity=`${ve(at)}`)};et(y.current,yt,Ce),et(w.current,Qe,Ce),et(k.current,Je,Gt),Qt(d.current,g.current.a,M.you,M.conductor,yt),Qt(h.current,g.current.b,M.models,M.conductor,Qe),Qt(x.current,g.current.c,M.conductor,M.result,Je),U=requestAnimationFrame(z)},Y=()=>{H||(H=!0,U=requestAnimationFrame(z))},T=()=>{H=!1,cancelAnimationFrame(U)},q=new IntersectionObserver(([I])=>I.isIntersecting?Y():T(),{threshold:0});return q.observe(F),()=>{q.disconnect(),T()}},[D]);const E=F=>{C.current=F;const B=ve((F-zt)/(mn-zt));v(B>.88?"resolved":B>0?"resolving":F>=ko?"deciding":F>=vo?"absorbing":"waiting"),W(B>.88)},A=D||L;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-[var(--section-pad)]",children:[e.jsx(Ra,{trackRef:a,pinned:!1,screens:2.1,children:e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(m.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:n,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(wn,{label:"You",innerRef:s,className:"ky-panel--you",children:e.jsx("div",{className:"ky-lines",ref:f,children:uo.map(F=>e.jsx("p",{className:"ky-line",children:F},F))})}),e.jsxs("div",{className:"ky-conductor","data-phase":D?"resolved":S,ref:o,children:[e.jsx("p",{className:"ky-conductor-label",children:"Conductor"}),e.jsx("span",{className:"ky-aura","aria-hidden":"true"}),e.jsx("span",{className:"ky-core","aria-hidden":"true"})]}),e.jsx(wn,{label:"Available models",innerRef:i,className:"ky-panel--models",children:e.jsxs("div",{className:"ky-marquees",ref:u,children:[e.jsx(yn,{marks:xo}),e.jsx(yn,{marks:fo,reverse:!0})]})})]}),e.jsxs("div",{className:`ky-result${A?" ky-result--lit":""}`,ref:r,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),e.jsxs("svg",{className:"ky-trails",ref:p,"aria-hidden":"true",children:[e.jsx("line",{ref:d,className:"ky-trail"}),e.jsx("line",{ref:h,className:"ky-trail"}),e.jsx("line",{ref:x,className:"ky-trail"})]}),!D&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx("span",{ref:y,className:"ky-dot"}),e.jsx("span",{ref:w,className:"ky-dot"}),e.jsx("span",{ref:k,className:"ky-dot ky-dot--result"})]})]})})})]})}),t&&e.jsx(O,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:bo.map((F,B)=>e.jsx(m.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:B*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:F.title}),e.jsx("p",{className:"ky-benefit-desc",children:F.desc})]})},F.title))})}),e.jsx("style",{children:`
        .ky-section { --ky-border: rgba(255,255,255,.08); --ky-accent: var(--color-primary); }

        .ky-stage { position: relative; }

        /* Wide enough that the dot stands in open space rather than being pinched
           between two rounded corners. The gap is the path — nothing is drawn in
           it until a dot has been through. */
        .ky-flow {
          display: flex; align-items: stretch; justify-content: center;
          gap: clamp(48px, 5.5vw, 104px);
        }

        /* Outlines, not plates. A fill here is lighter than the page, which turns
           the gap between the two panels into a dark rounded shape framing the
           centre — the one thing the centre must not have. */
        .ky-panel--you, .ky-panel--models { flex: 1 1 0; }

        .ky-panel {
          min-width: 0; display: flex; flex-direction: column; gap: 26px;
          border: 1px solid var(--ky-border); border-radius: 18px; padding: 30px 30px 32px;
          background: transparent;
        }
        .ky-panel-label {
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,.42); margin: 0;
        }


        /* Flush left and hugging their own text, so the column reads as four
           separate things rather than as a block of copy. */
        /* Without the pill the lines can sit closer — the gap was spacing borders
           apart, not text. Colour and tracking come from the page's body tokens
           so this reads as the same voice as the rest of the site. */
        .ky-lines { display: flex; flex-direction: column; align-items: flex-start; gap: 13px; }
        .ky-line {
          margin: 0;
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.4;
          letter-spacing: var(--tracking-body);
          color: var(--color-text-body);
        }

        .ky-marquees {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          gap: 34px;
        }

        /* The mask is what turns a strip into a window: the marks do not stop at an
           edge, they thin out and are gone, so what is off screen reads as more of
           the same rather than as the end of a list. */
        .ky-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%);
        }

        .ky-track { display: flex; width: max-content; will-change: transform; }

        /* Two rows, opposite ways, and deliberately not the same duration: matched
           speeds make the pair read as one mechanism running backwards against
           itself. Different ones read as a field with things moving in it. */
        .ky-track { animation: ky-slide 46s linear infinite; }
        .ky-track--reverse { animation-duration: 36s; animation-direction: reverse; }

        /* Half the track is exactly one set, so this lands on an identical copy. */
        @keyframes ky-slide {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        /* The spacing lives on the item, not as a flex gap on the track. With a gap
           the two halves of the loop are not the same width — there is one extra
           gap where they join — and translating by exactly -50% would slip a few
           pixels every lap until the seam showed. */
        .ky-mark {
          flex: none; display: block; object-fit: contain;
          margin-right: 68px;
          /* The wordmarks ship at #AEB4BC with white details, so brightening them
             only ever gets to a pale grey. Crushing to black first and inverting
             takes every opaque pixel to pure white and leaves the alpha alone —
             then opacity, not colour, is what sets how present they are. */
          filter: brightness(0) invert(1);
          opacity: .8; transition: opacity .35s ease;
        }
        @media (hover: hover) { .ky-mark:hover { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .ky-track { animation: none; }
        }

        /* No plate, no ring, no label. Anything drawn around it turns it back
           into an icon, and this is meant to be the one live thing on the page. */
        /* The one mass on the stage. Big enough that the arriving dots read as
           being taken into something, rather than as three dots meeting. */
        .ky-conductor {
          /* above the travelling dots, so they slide under it instead of crossing it:
             at this size the small dot would otherwise track orange-on-orange right
             across the face of the big one. Occluded, it reads as taken in. */
          position: relative; z-index: 3;
          flex: 0 0 clamp(128px, 12vw, 176px);
          display: flex; align-items: center; justify-content: center;
        }

        /* Above the dot, and out of the flow. In the flow it would push the dot
           off the row's centre line, and the two horizontal paths are drawn to
           wherever the dot is — the whole diagram would sit crooked. */
        .ky-conductor-label {
          position: absolute; left: 50%; bottom: calc(50% + 58px); z-index: 1;
          transform: translateX(-50%); white-space: nowrap;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ky-accent); margin: 0;
        }

        /* What the Conductor gives off once it has an answer — not the dot's
           shadow. Its own element, so it can open on a slower curve than the core
           scales on, and so the falloff is a real gradient rather than a blur. */
        .ky-aura {
          position: absolute; left: 50%; top: 50%;
          width: 52px; height: 52px; margin: -26px 0 0 -26px;
          border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle,
            rgba(248,70,0,.65) 0%,
            rgba(248,70,0,.34) 26%,
            rgba(248,70,0,.13) 46%,
            rgba(248,70,0,.03) 62%,
            rgba(248,70,0,0) 75%);
          opacity: 0; transform: scale(1);
          transition: opacity .9s ease, transform 1.1s cubic-bezier(.16,1,.3,1);
        }

        .ky-core {
          width: 52px; height: 52px; border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 30px rgba(248,70,0,.34);
          transition: transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s ease;
        }
        /* present, but not yet doing anything */
        .ky-conductor[data-phase="waiting"] .ky-core {
          transform: scale(.84); box-shadow: 0 0 20px rgba(248,70,0,.22);
        }
        /* both inputs land: a little bigger, a little brighter. At this size the
           percentages have to come down — the same 1.24 that read as a breath on
           a 20px dot reads as a button being pressed on this one. */
        .ky-conductor[data-phase="absorbing"] .ky-core {
          transform: scale(1.14); box-shadow: 0 0 34px rgba(248,70,0,.42);
        }
        .ky-conductor[data-phase="deciding"] .ky-core {
          transform: scale(1.07); box-shadow: 0 0 30px rgba(248,70,0,.4);
        }
        .ky-conductor[data-phase="resolving"] .ky-core {
          transform: scale(1.06); box-shadow: 0 0 30px rgba(248,70,0,.4);
        }
        /* Where it stays. The answer is out, and the Conductor does not go back to
           being a small quiet dot — it holds bigger, and the spread moves off the
           core's box-shadow onto the aura, which is the thing doing the emitting. */
        .ky-conductor[data-phase="resolved"] .ky-core {
          transform: scale(1.18); box-shadow: 0 0 20px rgba(248,70,0,.5);
        }

        /* opening as the decision forms, wide open once it has landed */
        .ky-conductor[data-phase="absorbing"] .ky-aura { opacity: .45; transform: scale(1.9); }
        .ky-conductor[data-phase="deciding"] .ky-aura { opacity: .55; transform: scale(2.1); }
        .ky-conductor[data-phase="resolving"] .ky-aura { opacity: .8; transform: scale(2.5); }
        .ky-conductor[data-phase="resolved"] .ky-aura { opacity: 1; transform: scale(2.8); }

        /* The absorption, on the Conductor itself rather than on its dot: it is
           knocked very slightly off centre as the two land, and recovers. One
           shot, a few pixels — any more and it stops reading as composure. */
        .ky-conductor[data-phase="absorbing"] { animation: ky-absorb .78s cubic-bezier(.34,.7,.28,1); }
        @keyframes ky-absorb {
          0% { transform: translate3d(0,0,0); }
          26% { transform: translate3d(-2.5px, 1.5px, 0); }
          58% { transform: translate3d(1.5px, -1px, 0); }
          100% { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ky-conductor[data-phase="absorbing"] { animation: none; }
        }
        /* The path, only ever behind the dot that made it: one hairline, no dashes
           and no arrowheads. layTrail() hides it, trace() gives it back. */
        .ky-trails {
          position: absolute; inset: 0; width: 100%; height: 100%;
          overflow: visible; pointer-events: none;
        }
        .ky-trail { fill: none; stroke: rgba(248,70,0,.4); stroke-width: 1; stroke-linecap: round; }

        .ky-dots { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .ky-dot {
          position: absolute; top: 0; left: 0; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
          border-radius: 999px; background: var(--ky-accent);
          box-shadow: 0 0 10px rgba(248,70,0,.85), 0 0 26px rgba(248,70,0,.35);
          /* the loop owns both of these from its first frame on */
          opacity: 0; will-change: transform, opacity;
        }
        .ky-dot--result { width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; }

        /* before the dot lands this is a quiet placeholder, not an empty orange box */
        .ky-result {
          position: relative; z-index: 1;
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
          color: var(--color-text-body); margin: 0;
          opacity: 0; transform: translateY(6px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .ky-result--lit .ky-result-text { opacity: 1; transform: none; }

        .ky-benefit {
          display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid var(--ky-border); padding-top: 20px; height: 100%;
        }
        .ky-benefit-title {
          font-family: var(--font-google-sans); font-size: 17px; font-weight: 600; color: var(--color-text-body); margin: 0;
        }
        .ky-benefit-desc {
          font-family: var(--font-google-sans); font-size: 14.5px; line-height: 1.6;
          color: var(--color-text-body); margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .ky-result-text { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .ky-flow { flex-direction: column; align-items: stretch; gap: 56px; }
          /* stacked, the label has no row height to hang in — the slot has to
             carry both it and the dot itself */
          .ky-conductor { flex-basis: auto; min-height: 152px; }
          .ky-result { margin-top: 56px; }
        }
      `})]})}const No="The best AI for the job changes constantly. Starchild keeps up.";function je({onStartFree:t,onNavigatePricing:a,headline:n=No}){return e.jsx("section",{className:"bg-transparent py-[var(--section-pad)] text-center",children:e.jsx(O,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(m.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[28ch] text-[38px] leading-[48px] font-medium tracking-normal text-balance text-[var(--lf-ink,#fff)] sm:text-[42px] sm:leading-[50px]",style:{fontFamily:"var(--font-google-sans)"},children:n}),e.jsx(m.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[var(--lf-accent,#f84600)] px-8 py-4 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(m.button,{type:"button",onClick:a,disabled:!a,initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-[rgba(var(--lf-ink-rgb,255,255,255),0.6)] transition-colors hover:text-[var(--lf-ink,#fff)] disabled:cursor-default disabled:opacity-70",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx(J,{className:"size-3.5 rotate-45 text-[rgba(var(--lf-ink-rgb,255,255,255),0.3)] transition-colors group-hover:text-[var(--lf-accent,#f84600)]"})]})]})})})})}function zo({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}){const r=l.useRef(null),c=()=>t();return e.jsxs("div",{children:[e.jsx(zs,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}),e.jsx(Cs,{}),e.jsx(po,{onStartTask:a}),e.jsx(go,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(bt,{})}),e.jsx(je,{onStartFree:c})]})}const Ue="0 0 160 96",Ee="rgba(255,255,255,.26)",$t="rgba(255,255,255,.12)";function Co({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:$t,strokeWidth:"1"}),a.map((n,s)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${n.x-12}px`,"--i":s},x1:"12",y1:n.y,x2:12+n.w,y2:n.y,stroke:s===0?"var(--color-primary)":Ee,strokeWidth:s===0?1.6:1},n.y))]})}function So({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,s)=>e.jsx("path",{className:"cg-feed",style:{"--i":s},d:`M8 ${n} C 52 ${n}, 62 48, 96 48`,stroke:Ee,strokeWidth:"1"},n)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function To({className:t=""}){return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:$t,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:Ee,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:$t,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Ao({className:t=""}){return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:$t,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:Ee,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function Mo({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:Ee,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function Eo({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:Ue,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:Ee,strokeWidth:"1"}),a.map((n,s)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":s},d:`M70 48 C 96 48, 100 ${n}, 126 ${n}`,stroke:Ee,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":s},cx:"132",cy:n,r:"2.6",fill:s===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},n)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const Io=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:Co,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:So,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:To,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:Ao,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:Mo,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:Eo,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function Lo({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Io.map(({id:a,tag:n,title:s,copy:i,art:o,task:r},c)=>e.jsxs(m.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:c%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(o,{})}),e.jsx("span",{className:"cg-tag",children:n}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:s}),e.jsx(J,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:i})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const Ct=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function Ro({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(Na,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx($o,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Jt({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function $o({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Jt,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,n)=>e.jsxs(m.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+n*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(Ca,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(m.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Jt,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(m.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,n)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:n+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,n)=>e.jsxs(m.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+n*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(m.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Jt,{items:t.tools})]})]}),e.jsxs(m.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function Fo({onStartTask:t}){const{trackRef:a,pinned:n,index:s,selectStep:i}=Ss(Ct.length),o=Ct[s];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ra,{trackRef:a,pinned:n,screens:Ct.length,children:e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-balance text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Ct.map((r,c)=>{const p=c===s;return e.jsxs("button",{type:"button",onClick:()=>i(c),"aria-pressed":p,className:`ag-tab${p?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:r.label}),e.jsx(X,{initial:!1,children:p&&e.jsxs(m.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:r.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",r.prompt,"”"]})]})})]},r.id)}),e.jsxs("button",{type:"button",onClick:()=>t(o.task),className:"ag-try",children:[o.task.label,e.jsx(J,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(Ro,{example:o})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Wo({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}){const r=l.useRef(null),c=()=>t();return e.jsxs("div",{children:[e.jsx(zs,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:n,onOpenMarketplace:s,onLogIn:i,onSignUp:o}),e.jsx(Cs,{}),e.jsx(Lo,{onStartTask:a}),e.jsx(Fo,{onStartTask:a}),e.jsx("div",{ref:r,children:e.jsx(bt,{})}),e.jsx(je,{onStartFree:c})]})}const Po=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function $a({onNavigateHome:t,onNavigateTraders:a,onNavigatePricing:n,onLogIn:s,onSignUp:i}){const[o,r]=l.useState(!1),c=l.useRef(null);return l.useEffect(()=>{if(!o)return;const p=h=>{var x;(x=c.current)!=null&&x.contains(h.target)||r(!1)},d=h=>{h.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",d)}},[o]),e.jsxs("header",{className:"relative z-20 py-6",children:[e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("nav",{className:"sh-nav","aria-label":"Main",children:[e.jsxs("div",{className:"sh-menu",ref:c,children:[e.jsxs("button",{type:"button",onClick:()=>r(p=>!p),"aria-expanded":o,"aria-haspopup":"true",className:`sh-trigger${o?" sh-trigger--open":""}`,children:["Starchild for",e.jsx(Ve,{className:"sh-chevron size-3.5"})]}),o&&e.jsx("div",{className:"sh-panel",role:"menu",children:Po.map(({id:p,label:d,route:h})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{r(!1),h==="traders"&&a()},className:"sh-item",children:d},p))})]}),e.jsx("button",{type:"button",onClick:n,className:"sh-trigger",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"sh-trigger sh-trigger--badged",children:["Marketplace",e.jsx("span",{className:"sh-badge",children:"New"})]})]}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-1 text-[13.5px] font-medium text-[var(--color-text-body)] transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:i,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-[var(--color-text-body)] backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})}),e.jsx("style",{children:`
        .sh-nav { display: flex; align-items: center; gap: 26px; }
        .sh-menu { position: relative; }

        .sh-trigger {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 6px 2px; border: 0; background: none;
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 500;
          color: var(--color-text-body); transition: color .2s ease;
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
          background: none; color: var(--color-text-body);
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
      `})]})}let Fa=[];function Bo(t){Fa=t}function vn(){Fa=[]}function Do(t,a,n,s){let i=0,o=0,r=n,c=!1;for(const h of Fa){const x=Math.hypot(h.x-t,h.y-a);x<r&&(r=x,i=h.x,o=h.y,c=!0)}if(!c)return{x:t,y:a,hold:0};const p=1-r/n,d=s*p*p;return{x:t+(i-t)*d,y:a+(o-a)*d,hold:d}}const ye=11,kn=.55,Oo=1.15,ea=30,ta=300,Ho=26,Ft=26,Pe=[150,168,196],Be=[255,255,255],aa=[255,146,62],jn=.15,qo=.08,St=14,Go=92,_o=.75,Yo={input:"attentive",cta:"composed",chip:"curious"};function Vo(){return Array.from({length:Ft},(t,a)=>{const n=a/(Ft-1),s=Math.max(0,n-.72)/.28,i=Math.round(Pe[0]+(Be[0]-Pe[0])*n+(aa[0]-Be[0])*s*.55),o=Math.round(Pe[1]+(Be[1]-Pe[1])*n+(aa[1]-Be[1])*s*.55),r=Math.round(Pe[2]+(Be[2]-Pe[2])*n+(aa[2]-Be[2])*s*.55),c=.05+.85*Math.pow(n,1.6);return{color:`rgba(${i},${o},${r},${c.toFixed(3)})`,size:Oo+1.5*Math.pow(n,2),points:[]}})}function Uo({targetRef:t}){const a=l.useRef(null),n=l.useRef(null);return l.useEffect(()=>{const s=t.current,i=a.current,o=i==null?void 0:i.getContext("2d");if(!s||!i||!o)return;const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=window.matchMedia("(hover: hover) and (pointer: fine)").matches,p=Vo();c&&s.classList.add("hero-c--fine");let d=0,h=0,x=0,g=0,f=[];const u=new _e({temperament:"curious",reduced:r,breath:.05});let b=-9999,y=-9999,w=-9999,k=-9999,N=-9999,C=-9999,S=0,v=0,L=!1,W=null,D=0,j=!1;const $=performance.now(),E=(I,M,R)=>Math.sin(I*.0062+M*.0038+R*.19)+Math.sin(I*.0029-M*.0071-R*.14)*.85+Math.sin((I+M)*.0042+R*.09)*.6,A=I=>{const M=(I-$)/1e3;if(o.clearRect(0,0,d,h),S>.01){const R=o.createRadialGradient(N,C,0,N,C,ta*1.6);R.addColorStop(0,`rgba(248,70,0,${(.11*S).toFixed(3)})`),R.addColorStop(.45,`rgba(248,70,0,${(.04*S).toFixed(3)})`),R.addColorStop(1,"rgba(248,70,0,0)"),o.fillStyle=R,o.fillRect(0,0,d,h)}for(const R of p)R.points.length=0;for(const R of f){const V=E(R.x,R.y,M);let G=R.x+V*5*R.depth,te=R.y+V*ea*R.depth,ne=.06+.62*Math.pow(Math.max(0,Math.cos(V*1.9+R.seed*.35)),7)*R.depth+.05*R.seed;if(S>.01){const Ne=G-N,ze=te-C,ge=Math.hypot(Ne,ze);if(ge<ta){const re=1-ge/ta,xe=re*re*S;if(ne+=xe*1.1,ge>.001){const K=xe*Ho;G+=Ne/ge*K,te+=ze/ge*K}}}const be=Math.min(Ft-1,Math.max(0,Math.round(ne*(Ft-1))));p[be].points.push(G,te)}for(const R of p){if(R.points.length===0)continue;o.fillStyle=R.color;const V=R.size/2;for(let G=0;G<R.points.length;G+=2)o.fillRect(R.points[G]-V,R.points[G+1]-V,R.size,R.size)}},F=I=>{const M=n.current;!M||!c||(M.style.transform=Ot(I,-St/2,-St/2),M.style.opacity=`${S}`)},B=()=>{const I=Math.ceil(d/ye)+2,M=Math.ceil((h+ea*2)/ye)+2,R=[];for(let V=0;V<M;V++)for(let G=0;G<I;G++){const te=Math.random(),ae=G*ye-ye+(Math.random()-.5)*ye*2*kn,ne=V*ye-ye-ea+(Math.random()-.5)*ye*2*kn,be=.35+.65*Math.min(1,Math.max(0,ne/Math.max(1,h)));R.push({x:ae,y:ne,depth:be,seed:te})}f=R},_=()=>{const I=s.getBoundingClientRect();x=I.left,g=I.top;const M=Math.min(window.devicePixelRatio||1,1.75);d=Math.max(1,Math.round(I.width)),h=Math.max(1,Math.round(I.height)),i.width=Math.round(d*M),i.height=Math.round(h*M),i.style.width=`${d}px`,i.style.height=`${h}px`,o.setTransform(M,0,0,M,0,0),B(),A(performance.now())},Q=I=>{const M=Do(b+x,y+g,Go,_o);u.aim(M.x-x,M.y-g,I);const R=u.step(I);w=R.x,k=R.y,N+=(w-N)*jn,C+=(k-C)*jn,S+=(v-S)*qo,A(I),F(R),D=requestAnimationFrame(Q)},U=()=>{j||r||(j=!0,D=requestAnimationFrame(Q))},Z=()=>{j=!1,cancelAnimationFrame(D)},H=I=>{const M=s.getBoundingClientRect();x=M.left,g=M.top,b=I.clientX-M.left,y=I.clientY-M.top,L||(L=!0,u.place(b,y),w=N=b,k=C=y),v=1;const R=I.target instanceof Element?I.target.closest("[data-presence]"):null,V=(R==null?void 0:R.getAttribute("data-presence"))??null;V!==W&&(W=V,u.setTemperament(V?Yo[V]??"curious":"curious")),r&&(w=N=b,k=C=y,S=1,A(performance.now()),F(u.step(performance.now())))},z=()=>{v=0,L=!1,W=null,u.setTemperament("curious"),r&&(S=0,A(performance.now()),F(u.step(performance.now())))},Y=new IntersectionObserver(([I])=>I.isIntersecting?U():Z(),{threshold:0});Y.observe(s);const T=()=>document.hidden?Z():U(),q=new ResizeObserver(_);return q.observe(s),s.addEventListener("pointermove",H),s.addEventListener("pointerleave",z),document.addEventListener("visibilitychange",T),_(),()=>{Y.disconnect(),q.disconnect(),s.removeEventListener("pointermove",H),s.removeEventListener("pointerleave",z),document.removeEventListener("visibilitychange",T),s.classList.remove("hero-c--fine"),Z()}},[t]),e.jsxs(e.Fragment,{children:[e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"}),e.jsx("div",{className:"pm-cursor-layer","aria-hidden":"true",children:e.jsx("span",{ref:n,className:"pm-dot"})}),e.jsx("style",{children:`
        .pm-cursor-layer { position: absolute; inset: 0; z-index: 40; pointer-events: none; }
        /* Position, breath and the drag it picks up while travelling all arrive
           in one transform from the presence body — there is no CSS animation
           here on purpose. A keyframed loop would run whether or not anything
           had happened, and the whole point is that the dot only moves when it
           has noticed something. */
        .pm-dot {
          position: absolute; top: 0; left: 0;
          width: ${St}px; height: ${St}px; border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0; will-change: transform;
        }
      `})]})}const Xo="./icons/",Nn=[{radius:.4,period:96},{radius:.63,period:148},{radius:.86,period:205}],zn=[{id:"openai",name:"OpenAI",file:"openai.svg",ring:0,angle:18},{id:"gemini",name:"Gemini",file:"gemini.svg",ring:0,angle:205},{id:"grok",name:"Grok",file:"xai.svg",ring:1,angle:96},{id:"deepseek",name:"DeepSeek",file:"deepseek.svg",ring:1,angle:262},{id:"kimi",name:"Kimi",file:"kimi.svg",ring:2,angle:148},{id:"zai",name:"Z.ai",file:"zai.svg",ring:2,angle:322}],Cn=6,Ko=30,Zo=-10;function Ts(){const t=l.useRef(null),a=l.useRef(null),n=l.useRef([]),s=l.useRef(null),[i,o]=l.useState(null),r=l.useRef(null);r.current=i;const c=l.useRef(null);return l.useEffect(()=>{var p;(p=c.current)==null||p.call(c,performance.now())},[i]),l.useEffect(()=>{const p=t.current,d=a.current;if(!p||!d)return;const h=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let x=0,g=0,f=!1,u=0,b=0;const y=()=>{x=p.clientWidth/2},w=j=>{const $=b?Math.min((j-b)/1e3,.1):0;b=j,!r.current&&!h&&(u+=$);const E=[];zn.forEach((A,F)=>{const B=n.current[F];if(!B)return;const _=Nn[A.ring],Q=h?0:u/_.period,U=(A.angle/360+Q)%1*Math.PI*2,Z=_.radius*x,H=Math.cos(U)*Z,z=Math.sin(U)*Z;B.style.transform=`translate3d(${H.toFixed(2)}px, ${z.toFixed(2)}px, 0)`,E.push(B);const Y=H<0?"left":"right";B.dataset.side!==Y&&(B.dataset.side=Y),r.current===A.id&&s.current&&x>0&&(s.current.setAttribute("x2",`${(H/x*100).toFixed(2)}`),s.current.setAttribute("y2",`${(z/x*100).toFixed(2)}`))}),Bo(E.map(A=>{const F=A.getBoundingClientRect();return{x:F.left+F.width/2,y:F.top+F.height/2}}))};c.current=w;const k=j=>{w(j),g=requestAnimationFrame(k)},N=()=>{f||h||(f=!0,b=0,g=requestAnimationFrame(k))},C=()=>{f=!1,cancelAnimationFrame(g),vn()},S=j=>{const $=p.getBoundingClientRect(),E=(j.clientX-$.left)/$.width-.5,A=(j.clientY-$.top)/$.height-.5;d.style.setProperty("--ry",`${(E*2*Cn).toFixed(2)}deg`),d.style.setProperty("--rx",`${(-A*2*Cn).toFixed(2)}deg`)},v=()=>{d.style.setProperty("--ry","0deg"),d.style.setProperty("--rx","0deg")},L=new ResizeObserver(()=>{y(),w(performance.now())});L.observe(p);const W=new IntersectionObserver(([j])=>j.isIntersecting?N():C(),{threshold:0});W.observe(p);const D=()=>document.hidden?C():N();return document.addEventListener("visibilitychange",D),h||(p.addEventListener("pointermove",S),p.addEventListener("pointerleave",v)),y(),w(performance.now()),()=>{c.current=null,vn(),L.disconnect(),W.disconnect(),document.removeEventListener("visibilitychange",D),p.removeEventListener("pointermove",S),p.removeEventListener("pointerleave",v),C()}},[]),e.jsxs("div",{className:"os-stage",ref:t,"data-active":i?"true":void 0,"aria-hidden":"true",children:[e.jsxs("div",{className:"os-plane",ref:a,children:[Nn.map((p,d)=>e.jsx("span",{className:"os-ring",style:{width:`${p.radius*100}%`,height:`${p.radius*100}%`}},d)),e.jsx("svg",{className:"os-link",viewBox:"-100 -100 200 200",preserveAspectRatio:"none",children:e.jsx("line",{ref:s,x1:"0",y1:"0",x2:"0",y2:"0"})}),zn.map((p,d)=>e.jsxs("div",{className:"os-node","data-on":i===p.id?"true":void 0,ref:h=>{n.current[d]=h},children:[e.jsx("span",{className:"os-mark",onPointerEnter:()=>o(p.id),onPointerLeave:()=>o(h=>h===p.id?null:h),children:e.jsx("img",{src:`${Xo}${p.file}`,alt:""})}),e.jsx("span",{className:"os-name",children:p.name})]},p.id))]}),e.jsx("span",{className:"os-core"}),e.jsx("style",{children:`
        /* Scaled rather than re-dimensioned. The stage is width:100% inside a
           five-column slot, so on most viewports the column is what caps it and
           raising max-width would do nothing — 20% has to come from a transform
           to actually be 20%. It also keeps every proportion exact: rings, marks,
           labels and the core all grow together, with no numbers to keep in sync.
           The hero clips its own overflow, so growing past the column is safe. */
        .os-stage {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 1;
          margin-inline: auto;
          perspective: 900px;
          transform: scale(1.2);
        }

        /* The plane rests leaning back rather than face-on. It was a flat set of
           concentric circles before, which read as a diagram; at 20° the
           perspective does the work and it reads as a plane you are looking
           across. The cursor tilt is a deviation from this pose, not from zero,
           so the system always has somewhere to return to. */
        /* Flat, not preserve-3d — and that is the fix for labels being covered.
           Under preserve-3d the symbols are sorted by their position in space,
           and at a 30° lean a symbol at the bottom of an orbit sits ~99px nearer
           the viewer than one at the top, so it painted straight over the other
           one's name and no amount of z-index or lift could outrank it.
           Flattening composites the children into the plane first and then tilts
           the whole surface: the lean looks identical, every symbol is coplanar
           again, and ordinary z-index decides what is on top. */
        /* Two resting angles, not one. The Y lean is negative on purpose: it
           turns the plane's face back toward the middle of the page, where the
           headline and the field are, instead of angling it off the right edge.
           It is also kept well under the X lean — matching them would read as a
           cube corner rather than as a plane seen at an angle. Both are dialled
           here; the cursor tilt is a deviation from this pose. */
        .os-plane {
          position: absolute;
          inset: 0;
          --tilt-rest-x: ${Ko}deg;
          --tilt-rest-y: ${Zo}deg;
          transform:
            rotateX(calc(var(--tilt-rest-x) + var(--rx, 0deg)))
            rotateY(calc(var(--tilt-rest-y) + var(--ry, 0deg)));
          transition: transform .5s cubic-bezier(.16, 1, .3, 1);
        }

        /* hairlines. Bright enough to trace the whole path against the near-black
           field, but still thin enough to read as structure, not as an element */
        .os-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, .2);
          border-radius: 50%;
          transition: border-color .45s ease;
        }
        /* still a step down while a provider is being read, so the paths recede
           behind the one thing being looked at — just from a brighter start */
        .os-stage[data-active] .os-ring { border-color: rgba(255, 255, 255, .12); }

        .os-link {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .os-link line {
          stroke: rgba(248, 70, 0, .5);
          stroke-width: 1;
          vector-effect: non-scaling-stroke;
        }
        .os-stage[data-active] .os-link { opacity: 1; }

        /* Mark size is the one number here that fights the outer ring. At 46px
           the outermost symbol sits 198px out with a 23px radius, against a
           230px half-stage — about 9px of air. Going much past this either
           crowds the edge or means pulling the outer orbit in. */
        .os-node {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -23px 0 0 -23px;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          will-change: transform;
        }
        /* the one being read comes to the front, name and all */
        .os-node[data-on] { z-index: 4; }

        .os-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, .07);
          border-radius: 50%;
          background: rgba(10, 12, 14, .72);
          transition: border-color .3s ease, background-color .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1);
        }
        /* The source files are a single flat #76808F — their only white is inside
           a clipPath and never paints — so knocking them to black and inverting
           gives clean white with the shapes untouched. Doing it in CSS keeps the
           SVGs as they were shipped. */
        .os-mark img {
          width: 26px;
          height: 26px;
          display: block;
          filter: brightness(0) invert(1);
          transition: opacity .3s ease;
        }

        /* Hierarchy is opacity alone now. With the marks already at full white
           there is no brightness left to add on hover — so the emphasis comes
           from everything else stepping back instead. */
        .os-stage[data-active] .os-mark img { opacity: .3; }
        .os-stage[data-active] .os-node[data-on] .os-mark img { opacity: 1; }
        .os-node[data-on] .os-mark {
          border-color: rgba(248, 70, 0, .55);
          background: rgba(18, 12, 9, .92);
          transform: scale(1.09);
        }

        /* the name sits beside the mark, on whichever side faces away from the
           centre — never a card, never a pointer, just the word */
        .os-name {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          font-family: var(--font-google-sans);
          font-size: 12.5px;
          letter-spacing: .01em;
          color: rgba(255, 255, 255, .92);
          opacity: 0;
          transition: opacity .28s ease;
          pointer-events: none;
        }
        .os-node[data-side="right"] .os-name { left: calc(100% + 12px); }
        .os-node[data-side="left"] .os-name { right: calc(100% + 12px); }
        .os-node[data-on] .os-name { opacity: 1; }

        .os-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 22px;
          height: 22px;
          margin: -11px 0 0 -11px;
          border-radius: 50%;
          background: var(--color-orange-400);
          box-shadow: 0 0 18px rgba(248, 70, 0, .55), 0 0 60px rgba(248, 70, 0, .18);
          transition: box-shadow .45s ease;
        }
        /* the one place the centre reacts: something is talking to it */
        .os-stage[data-active] .os-core {
          box-shadow: 0 0 26px rgba(248, 70, 0, .75), 0 0 84px rgba(248, 70, 0, .26);
        }

        @media (prefers-reduced-motion: reduce) {
          .os-plane { transition: none; }
          .os-mark { transition: border-color .3s ease, background-color .3s ease; }
          .os-node[data-on] .os-mark { transform: none; }
        }
      `})]})}const qt=[{id:"talk",label:"Talk",icon:za,tasks:[{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"},{id:"talk-decision",label:"Help me decide",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}]},{id:"research",label:"Research",icon:ms,tasks:[{id:"research-topic",label:"Look into something",basePrompt:"Look into this properly and come back with a real answer, not a pile of links.",question:"What should I dig into?"},{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I put side by side?"}]},{id:"build",label:"Build",icon:fs,tasks:[{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."},{id:"build-dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}]},{id:"work",label:"Work",icon:ft,tasks:[{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"},{id:"work-draft",label:"Draft something I owe someone",basePrompt:"Help me write the thing I've been putting off sending.",question:"Who's it for, and what does it need to say?"}]},{id:"run",label:"Run for me",icon:Wi,hint:"Keeps working after you leave",tasks:[{id:"run-task",label:"Take something off my plate",basePrompt:"Take this off my plate and run it end to end — come back to me when it's done.",question:"What should I take on?"},{id:"run-recurring",label:"Keep something running",basePrompt:"Set this up to run on its own and keep it current without me having to ask.",question:"What should keep running?"}]}];function Qo({onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}){const r=l.useRef(null);return e.jsxs("section",{ref:r,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Uo,{targetRef:r}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx("div",{className:"hero-c-orbit-scrim","aria-hidden":"true"}),e.jsx($a,{onNavigateHome:()=>{},onNavigateTraders:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(O,{className:"w-full",children:e.jsxs("div",{className:"grid grid-cols-12 items-center gap-6",children:[e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(Jo,{onEnterGuest:t,onStartTask:a})}),e.jsx("div",{className:"hidden lg:col-span-5 lg:block",children:e.jsx(Ts,{})})]})})}),e.jsx("style",{children:`
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

      /* Only where the orbit is. It reaches almost opaque at the centre so the
         core, the hairline rings and the provider names sit on near-black, and
         falls off to nothing well before the edge so the field still reads as
         one continuous thing rather than as a hole cut in it. Below lg the
         orbit is not rendered, so neither is this. */
      .hero-c-orbit-scrim { display: none; }
      @media (min-width: 1024px) {
        .hero-c-orbit-scrim {
          display: block;
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          /* Wide enough to actually clear the orbit. The first attempt was a
             44%×50% pool that fell off before the top-right corner and the right
             edge, which is exactly where the field was still competing with the
             outer symbols and their labels. This reaches the full height of the
             hero and runs off the right side, and it holds near-opaque most of
             the way out instead of fading immediately. It stops short of the
             copy column, so the left half of the field is untouched. */
          background: radial-gradient(58% 72% at 76% 50%,
            rgba(7,9,10,.97) 0%,
            rgba(7,9,10,.94) 46%,
            rgba(7,9,10,.72) 72%,
            rgba(7,9,10,.3) 88%,
            rgba(7,9,10,0) 100%);
        }
      }
    `})]})}function Jo({onEnterGuest:t,onStartTask:a}){const[n,s]=l.useState(""),i=()=>t(n.trim()||void 0);return e.jsxs("div",{children:[e.jsx(m.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"The world’s leading AI models, working as one for you."}),e.jsx(m.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08,ease:[.16,1,.3,1]},className:"mt-5 max-w-[520px] text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-[var(--color-text-body)]",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode chooses the model that fits each task best."}),e.jsxs(m.div,{"data-presence":"input",initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:n,onChange:o=>s(o.target.value),onKeyDown:o=>{o.key==="Enter"&&i()},placeholder:"Ask anything. Start for free.",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button","data-presence":"cta",onClick:i,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(J,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(ut,{onStartTask:a,intents:qt})})]})}const Tt=14,er=.14;function Wa({yieldTo:t=".hero-c"}){const a=l.useRef(null);return l.useEffect(()=>{const n=window.matchMedia("(hover: hover) and (pointer: fine)").matches,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!n||s)return;const i=document.documentElement;i.classList.add("pd-on");const o=new _e({temperament:"attentive",seed:.37,breath:0});let r=!1,c=0,p=0,d=0;const h=f=>{const u=f.target instanceof Element?f.target:null;p=u!=null&&u.closest(t)?0:1,r||(o.place(f.clientX,f.clientY),r=!0),o.aim(f.clientX,f.clientY)},x=f=>{f.relatedTarget||(p=0)},g=f=>{const u=a.current;u&&r&&(c+=(p-c)*er,u.style.transform=Ot(o.step(f),-Tt/2,-Tt/2),u.style.opacity=`${c}`),d=requestAnimationFrame(g)};return d=requestAnimationFrame(g),window.addEventListener("pointermove",h,{passive:!0}),document.addEventListener("pointerout",x),()=>{cancelAnimationFrame(d),window.removeEventListener("pointermove",h),document.removeEventListener("pointerout",x),i.classList.remove("pd-on")}},[t]),e.jsxs(e.Fragment,{children:[e.jsx("span",{ref:a,className:"pd-dot","aria-hidden":"true"}),e.jsx("style",{children:`
        /* Every cursor declaration on the page has to go, including the ones
           Tailwind writes onto buttons, so this is one of the few places where
           !important is the honest tool rather than a workaround. Text fields keep
           their caret — losing it makes a field feel broken to type in. */
        .pd-on,
        .pd-on *:not(input):not(textarea):not([contenteditable]) { cursor: none !important; }

        /* Fixed, not absolute: it follows the viewport coordinates the pointer is
           reported in, so it stays put under the cursor while the page scrolls. */
        .pd-dot {
          position: fixed; top: 0; left: 0; z-index: 90; pointer-events: none;
          width: ${Tt}px; height: ${Tt}px; border-radius: 999px;
          background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.9), 0 0 34px rgba(248,70,0,.45);
          opacity: 0; will-change: transform;
        }
      `})]})}const Xe="0 0 160 96",pt="rgba(255,255,255,.26)",Ie="rgba(255,255,255,.12)";function tr({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],n=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,i)=>e.jsx("line",{className:"cg-say",style:{"--i":i,transformOrigin:"left center"},x1:"14",y1:s.y,x2:14+s.w,y2:s.y,stroke:pt,strokeWidth:"1"},s.y)),n.map((s,i)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":i+2,transformOrigin:"right center"},x1:146-s.w,y1:s.y,x2:"146",y2:s.y,stroke:i===0?"var(--color-primary)":pt,strokeWidth:i===0?1.6:1},s.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function ar({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:Ie,strokeWidth:"1"}),a.map((n,s)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${n.x-12}px`,"--i":s},x1:"12",y1:n.y,x2:12+n.w,y2:n.y,stroke:s===0?"var(--color-primary)":pt,strokeWidth:s===0?1.6:1},n.y))]})}function nr({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,s)=>e.jsx("path",{className:"cg-feed",style:{"--i":s},d:`M8 ${n} C 52 ${n}, 62 48, 96 48`,stroke:pt,strokeWidth:"1"},n)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function sr({className:t=""}){return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:Ie,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:pt,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:Ie,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function ir({className:t=""}){return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--run ${t}`,fill:"none","aria-hidden":"true",children:[e.jsxs("g",{className:"cg-run",children:[e.jsx("circle",{cx:"80",cy:"48",r:"28",stroke:Ie,strokeWidth:"1"}),e.jsx("circle",{className:"cg-run-arc",cx:"80",cy:"48",r:"28",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("g",{className:"cg-run-dot",children:e.jsx("circle",{cx:"108",cy:"48",r:"3.2",fill:"var(--color-primary)"})})]}),e.jsx("line",{x1:"80",y1:"48",x2:"80",y2:"20",stroke:Ie,strokeWidth:"1"})]})}function or({className:t=""}){return e.jsxs("svg",{viewBox:Xe,className:`cg-svg cg-svg--market ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"72",x2:"146",y2:"72",stroke:Ie,strokeWidth:"1"}),[22,62,102].map(a=>e.jsx("rect",{x:a,y:"46",width:"36",height:"26",rx:"4",stroke:Ie,strokeWidth:"1"},a)),e.jsxs("g",{className:"cg-lift",children:[e.jsx("rect",{x:"62",y:"46",width:"36",height:"26",rx:"4",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"80",cy:"59",r:"2.2",fill:"var(--color-primary)"})]})]})}const rr=[{id:"conversation",tag:"Conversation",title:"Talk to an AI that remembers you.",copy:"Keep the context and continue without starting over.",art:tr,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"conductor",tag:"Conductor Mode",title:"Get the right AI without choosing it yourself.",copy:"Starchild handles the model choice for each task.",art:nr,task:{id:"conductor-task",label:"Give it something to route",basePrompt:"Take this on and use whichever model handles it best — I don't want to pick.",question:"What do you need done?"}},{id:"create",tag:"Create",title:"Turn ideas into something real.",copy:"Move from a thought to something you can actually use.",art:sr,task:{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"day-to-day",tag:"Day to day",title:"Get everyday tasks off your plate.",copy:"Plan, write, organize, summarize, and handle routine work faster.",art:ar,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"agents",tag:"Agents",title:"Hand it over and keep moving.",copy:"Let agents keep checking, following up, and working over time.",art:ir,task:{id:"run-task",label:"Take something off my plate",basePrompt:"Take this off my plate and run it end to end — come back to me when it's done.",question:"What should I take on?"}},{id:"marketplace",tag:"Marketplace",title:"Use what already works — or earn from yours.",copy:"Start with something ready-made, customize it, or publish your own.",art:or,task:{id:"market-start",label:"Start from something ready-made",basePrompt:"Show me what is already built that I could start from instead of building it myself.",question:"What are you trying to get done?"}}];function As({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] pt-[var(--section-gap)] pb-[var(--section-pad)]",children:[e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"cg-grid",children:rr.map(({id:a,tag:n,title:s,copy:i,art:o,task:r},c)=>e.jsxs(m.button,{type:"button",onClick:()=>t(r),initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:c%3*.06,ease:[.16,1,.3,1]},className:"cg-card",children:[e.jsx("span",{className:"cg-tag",children:n}),e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(o,{})}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:s}),e.jsx(J,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:i})]},a))})]}),e.jsx("style",{children:`
        .cg-section { --cg-rule: rgba(255,255,255,.08); }

        /* Columns divided by hairlines instead of six boxes. The rules run the full
           height, through the drawing and the text alike, which is what holds the
           six together as one plate rather than as a row of tiles. */
        .cg-grid {
          margin-top: 56px;
          display: grid; grid-template-columns: 1fr;
          border-top: 1px solid var(--cg-rule);
        }
        @media (min-width: 640px) { .cg-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .cg-grid { grid-template-columns: repeat(3, 1fr); } }

        .cg-card {
          display: flex; flex-direction: column; text-align: left; cursor: pointer;
          min-width: 0; padding: 24px 30px 34px;
          border: 0; border-bottom: 1px solid var(--cg-rule);
          background: none;
          transition: background-color .3s ease;
        }
        /* the wash is the only thing standing in for the old border — enough to
           say "this is a target", not enough to put the box back */
        .cg-card:hover { background: rgba(255,255,255,.022); }
        .cg-card:focus-visible { outline: 2px solid rgba(248,70,0,.6); outline-offset: -2px; }

        /* No rule at the outer left edge: the block starts flush with the page. Set
           per breakpoint because which cards begin a row changes with the columns. */
        @media (min-width: 640px) {
          .cg-card { border-left: 1px solid var(--cg-rule); }
          .cg-card:nth-child(2n + 1) { border-left: 0; }
        }
        @media (min-width: 1024px) {
          .cg-card:nth-child(2n + 1) { border-left: 1px solid var(--cg-rule); }
          .cg-card:nth-child(3n + 1) { border-left: 0; }
        }

        .cg-tag {
          display: block;
          font-family: var(--font-google-sans); font-size: 10.5px; font-weight: 600;
          letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.26);
        }

        /* The drawing gets the room it never had inside a card, and no panel behind
           it: on the page's own black it reads as a diagram, which is what it is. */
        .cg-art {
          display: flex; align-items: center; justify-content: center;
          padding: 34px 0 40px; min-height: 200px;
        }
        .cg-svg { display: block; width: 100%; max-width: 264px; height: auto; overflow: visible; }

        /* The titles are full sentences and wrap, so the row aligns to the top and
           the arrow is nudged down to sit on the first line rather than floating
           at the middle of a two-line block. */
        .cg-title-row { display: flex; align-items: flex-start; gap: 8px; }
        .cg-title {
          font-family: var(--font-google-sans); font-size: 19px; font-weight: 600; color: #fff;
          line-height: 1.32; text-wrap: balance;
        }
        .cg-arrow {
          color: rgba(255,255,255,.22); flex: none; margin-top: 5px;
          transition: color .2s ease, transform .2s ease;
        }
        .cg-card:hover .cg-arrow { color: var(--color-primary); transform: rotate(45deg) translateY(-2px); }

        .cg-copy {
          display: block; margin-top: 10px; max-width: 32ch;
          font-family: var(--font-google-sans); font-size: 15.5px; line-height: 1.6;
          letter-spacing: var(--tracking-body);
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

        /* Run for me: the dot carries on round the track and the covered arc
           follows it. Both are driven off the same angle — 90deg at rest, 315deg
           on hover — so the arc always ends exactly under the dot. The track is
           2*pi*28 = 175.9 long, hence the dasharray. */
        .cg-run { transform-origin: 80px 48px; transform: rotate(-90deg); }
        .cg-run-arc {
          stroke-dasharray: 175.9; stroke-dashoffset: 131.9;
          transition: stroke-dashoffset .9s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-run-arc { stroke-dashoffset: 22; }
        .cg-run-dot {
          transform-origin: 80px 48px; transform: rotate(90deg);
          transition: transform .9s cubic-bezier(.16,1,.3,1);
        }
        .cg-card:hover .cg-run-dot { transform: rotate(315deg); }

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

        /* Marketplace: one module lifts off the shelf, leaving its slot open */
        .cg-lift { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .cg-card:hover .cg-lift { transform: translateY(-15px); }

        @media (prefers-reduced-motion: reduce) {
          .cg-row { transform: none; }
          .cg-say { transform: none; opacity: 1; }
          .cg-run-arc, .cg-run-dot { transition: none; }
          .cg-rise, .cg-node, .cg-arrow, .cg-say, .cg-lift { transition: none; }
        }
      `})]})}const na={name:"Google Flights",kind:"flights"},sa={name:"Skyscanner",kind:"search"},Sn={name:"Telegram",kind:"telegram"},Tn={name:"Gmail",kind:"mail"},ia={name:"Google Calendar",kind:"calendar"},oa={name:"Slack",kind:"slack"},An={name:"Google Drive",kind:"drive"},ra={name:"Web",kind:"web"},la={name:"Email",kind:"mail"},Mn=[{id:"watch",label:"Watch something",request:"Let me know when flights to Tokyo drop below $700.",ack:"Got it. I'll check every hour and tell you the moment one drops under $700.",agent:{name:"Tokyo flight watcher",cadence:"Checks every hour",tools:[na,sa,Sn]},activity:[{time:"9:00",tool:na,action:"Checked Google Flights",result:"Cheapest fare: $842"},{time:"10:00",tool:sa,action:"Checked Skyscanner",result:"Cheapest fare: $828"},{time:"11:00",tool:na,action:"Compared 6 airlines",result:"No match yet"},{time:"12:00",tool:sa,action:"Found a fare below your target",result:"Tokyo — $684 return",hit:!0}],delivery:{app:Sn,lead:"Found a flight below $700.",title:"Tokyo in October",figure:"$684 return",detail:"Direct both ways · matches your dates",cta:"View flight"},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"routine",label:"Run a routine",request:"Every Sunday, help me plan the week ahead.",ack:"Got it. I'll put your week together on Sunday evening and send it over.",agent:{name:"Week ahead",cadence:"Runs every Sunday",tools:[ia,Tn,oa]},activity:[{time:"18:00",tool:ia,action:"Read your calendar",result:"12 events, 3 of them clash"},{time:"18:01",tool:Tn,action:"Scanned your inbox",result:"4 threads still need you"},{time:"18:02",tool:ia,action:"Checked your deadlines",result:"Two both land on Friday"},{time:"18:03",tool:oa,action:"Put the week together",result:"One clear day: Thursday",hit:!0}],delivery:{app:oa,lead:"Your week is ready.",title:"Thursday is your only clear day",figure:"3 things to move",detail:"Both deadlines land on Friday · start the smaller one Tuesday",cta:"Open the plan"},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"job",label:"Give it a job",request:"Plan our trip in October. Check with me before booking anything.",ack:"Got it. I'll work on it in the background and check with you before booking anything.",agent:{name:"October trip",cadence:"Works in the background",tools:[ra,An,la]},activity:[{time:"Mon",tool:An,action:"Read your trip notes",result:"Dates and budget confirmed"},{time:"Tue",tool:ra,action:"Compared routes",result:"40 options, 6 inside budget"},{time:"Wed",tool:ra,action:"Checked hotels for those dates",result:"3 that fit"},{time:"Thu",tool:la,action:"Put three options together",result:"Nothing booked yet",hit:!0}],delivery:{app:la,lead:"Three options, all inside budget.",title:"Best one leaves on the 14th",figure:"$210 saved",detail:"Nothing is booked — say the word and I'll confirm",cta:"See the options"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}],lr={working:"unsettled",waiting:"attentive",scheduled:"composed",settled:"composed",paused:"composed"},cr={working:.055,waiting:.03,scheduled:.022,settled:.014,paused:0},dr={working:"ao-stir .6s cubic-bezier(.4,0,.2,1)",waiting:"ao-signal .7s cubic-bezier(.34,.8,.3,1)",scheduled:null,settled:"ao-settle .66s cubic-bezier(.16,1,.3,1)",paused:"ao-dim .5s ease"};function de({status:t,size:a=8,accent:n,halo:s=!1}){const i=oe(),o=l.useRef(null),{ref:r,controller:c}=Ht({temperament:lr[t],breath:cr[t]});return Ia(c,t==="working",1.5,i),l.useEffect(()=>{t!=="working"&&c.aim(0,0)},[c,t]),l.useEffect(()=>{const p=o.current,d=dr[t];!p||!d||i||(p.style.animation="none",p.offsetWidth,p.style.animation=d)},[t,i]),e.jsxs("span",{className:`ao-root ao-root--${t}`,style:{width:a,height:a,"--accent":n??"var(--color-primary)"},"aria-hidden":"true",children:[s&&e.jsx("span",{className:"ao-halo",style:{width:a*3.6,height:a*3.6}}),e.jsx("span",{ref:o,className:"ao-beat",children:e.jsx("span",{ref:r,className:"ao-core",style:{width:a,height:a}})}),e.jsx("style",{children:`
        .ao-root {
          position: relative; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .ao-beat { position: relative; display: inline-flex; transform-origin: center; }
        .ao-core {
          display: block; border-radius: 999px; background: var(--accent);
          will-change: transform;
        }

        /* the atmosphere the selected agent sits in */
        .ao-halo {
          position: absolute; border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 68%);
        }

        .ao-root--working .ao-core { box-shadow: 0 0 9px rgba(248,70,0,.65); }

        /* asking, not doing: a ring reads as unfinished in a way a brighter dot
           never would, and it needs no extra colour to say so */
        .ao-root--waiting .ao-core {
          background: transparent;
          border: 2px solid var(--accent);
          box-shadow: 0 0 9px rgba(248,70,0,.5);
        }

        .ao-root--scheduled .ao-core { background: color-mix(in srgb, var(--accent) 55%, transparent); }
        .ao-root--settled .ao-core { background: color-mix(in srgb, var(--accent) 78%, transparent); }
        /* no colour and no breath — it is not doing anything and should not pretend */
        .ao-root--paused .ao-core { background: rgba(255,255,255,.26); }
        .ao-root--paused .ao-halo { display: none; }

        /* one-shot beats, none of them looping */
        @keyframes ao-stir {
          0% { transform: scale(1); }
          40% { transform: scale(.93); }
          100% { transform: scale(1); }
        }
        @keyframes ao-signal {
          0% { transform: scale(1); }
          30% { transform: scale(1.22); }
          62% { transform: scale(.97); }
          100% { transform: scale(1); }
        }
        @keyframes ao-settle {
          0% { transform: scale(1.1); }
          58% { transform: scale(.98); }
          100% { transform: scale(1); }
        }
        @keyframes ao-dim {
          0% { opacity: .9; }
          100% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ao-beat { animation: none !important; }
        }
      `})]})}const le={request:250,agent:1150,tools:1900,activity:2600},En=760,hr=950,ca={initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,ease:[.16,1,.3,1]}},pr={flights:e.jsx("path",{d:"M2.2 9.4 14 5.2l-.9 2.5-7 4.6-1.3-.5 2-2.6-2.4.6z"}),search:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"7.2",cy:"7.2",r:"4.4"}),e.jsx("path",{d:"M10.5 10.5 14 14"})]}),telegram:e.jsx("path",{d:"M14.2 2.6 1.9 7.4l3.4 1.2 1.2 3.6 1.9-2.3 3.2 2.4z"}),mail:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"1.8",y:"3.4",width:"12.4",height:"9.2",rx:"1.6"}),e.jsx("path",{d:"m2.4 4.6 5.6 4 5.6-4"})]}),calendar:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2.2",y:"3.2",width:"11.6",height:"10.6",rx:"1.6"}),e.jsx("path",{d:"M2.2 6.5h11.6M5.4 1.8v2.6M10.6 1.8v2.6"})]}),slack:e.jsx("path",{d:"M6.2 2.4v7.4M9.8 6.2v7.4M2.4 9.8h7.4M6.2 6.2h7.4"}),drive:e.jsx("path",{d:"M6.2 2.2h3.6L14 9.2l-1.8 3.1H3.8L2 9.2z"}),web:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"5.9"}),e.jsx("path",{d:"M2.1 8h11.8M8 2.1c1.6 1.7 2.4 3.7 2.4 5.9S9.6 12.2 8 13.9C6.4 12.2 5.6 10.2 5.6 8s.8-4.2 2.4-5.9"})]})},gr={telegram:"#2aabee",slack:"#611f69",mail:"#d93025"};function In({kind:t,className:a=""}){return e.jsx("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round",className:a,"aria-hidden":"true",children:pr[t]})}function xr({story:t}){const a=oe(),n=t.activity.length,s=le.activity+n*En+hr,[i,o]=l.useState(a?s+1:0),[r,c]=l.useState(a?n:0);l.useEffect(()=>{if(a){o(s+1),c(n);return}o(0),c(0);const g=[...[le.request,le.agent,le.tools,le.activity,s].map(f=>window.setTimeout(()=>o(f),f)),...t.activity.map((f,u)=>window.setTimeout(()=>c(u+1),le.activity+200+u*En))];return()=>g.forEach(window.clearTimeout)},[t,a,n,s]);const p=g=>i>=g,d=t.activity.filter(g=>!g.hit),h=t.activity.find(g=>g.hit),x=r>=n;return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(Na,{className:"size-[15px]"}),e.jsx("span",{className:"aw-crumb",children:"Agents"}),e.jsx("span",{className:"aw-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"aw-crumb-here",children:t.agent.name})]}),e.jsxs("div",{className:"aw-main",children:[e.jsxs("div",{className:"aw-thread",children:[e.jsx(X,{children:p(le.agent)&&e.jsx(m.header,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},className:"aw-head",children:e.jsxs("span",{className:`aw-id${p(le.tools)?" aw-id--open":""}`,children:[e.jsx(de,{status:"working",size:11,halo:!0}),e.jsx("span",{className:"aw-name",children:t.agent.name}),e.jsx(Ve,{className:"aw-chev size-3.5"})]})},"head")}),e.jsxs("div",{className:"aw-turns",children:[e.jsx(X,{children:p(le.request)&&e.jsx(m.div,{...ca,className:"aw-turn aw-turn--mine",children:e.jsx("div",{className:"aw-bubble aw-bubble--mine",children:t.request})},"request")}),e.jsx(X,{children:p(le.agent)&&e.jsx(m.div,{...ca,className:"aw-turn",children:e.jsx("div",{className:"aw-bubble",children:t.ack})},"ack")}),e.jsx(X,{children:p(le.activity)&&e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},className:"aw-turn",children:e.jsxs("div",{className:"aw-bubble aw-log",children:[e.jsxs("p",{className:"aw-log-when",children:["Since ",t.activity[0].time]}),d.slice(0,r).map(g=>e.jsxs(m.p,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-log-row",children:[e.jsx("span",{className:"aw-log-time",children:g.time}),e.jsxs("span",{children:[g.action,e.jsxs("span",{className:"aw-log-result",children:[" — ",g.result]})]})]},g.time+g.action))]})},"log")}),e.jsx(X,{children:h&&x&&e.jsx(m.div,{...ca,className:"aw-turn",children:e.jsxs("div",{className:"aw-bubble aw-hit",children:[e.jsx("span",{className:"aw-hit-time",children:h.time}),e.jsx("strong",{children:h.action}),e.jsx("span",{className:"aw-hit-result",children:h.result})]})},"hit")})]})]}),e.jsx(X,{children:p(le.tools)&&e.jsx(m.aside,{initial:{width:0,opacity:0},animate:{width:210,opacity:1},transition:{duration:.42,ease:[.16,1,.3,1]},className:"aw-drawer",children:e.jsxs("div",{className:"aw-drawer-in",children:[e.jsx("p",{className:"aw-kicker",children:"Agent"}),e.jsxs("p",{className:"aw-field",children:[e.jsx("span",{className:"aw-label",children:"Right now"}),e.jsxs("span",{className:"aw-state",children:[e.jsx("i",{"aria-hidden":"true"}),t.agent.cadence]})]}),e.jsxs("div",{className:"aw-field",children:[e.jsx("span",{className:"aw-label",children:"Connected tools"}),e.jsx("div",{className:"aw-chips",children:t.agent.tools.map(g=>e.jsxs("span",{className:"aw-chip",children:[e.jsx(In,{kind:g.kind,className:"size-3.5"}),g.name]},g.name))})]})]})},"drawer")})]}),e.jsx(X,{children:p(s)&&e.jsxs(m.div,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"aw-notif",children:[e.jsxs("div",{className:"aw-notif-head",children:[e.jsx("span",{className:"aw-notif-icon",style:{background:gr[t.delivery.app.kind]??"rgba(255,255,255,.16)"},children:e.jsx(In,{kind:t.delivery.app.kind,className:"size-3.5"})}),e.jsx("span",{className:"aw-notif-app",children:t.delivery.app.name}),e.jsx("span",{className:"aw-notif-time",children:"now"})]}),e.jsx("p",{className:"aw-notif-from",children:t.agent.name}),e.jsxs("p",{className:"aw-notif-body",children:[t.delivery.lead," ",t.delivery.title," — ",e.jsx("strong",{children:t.delivery.figure}),"."," ",t.delivery.detail]}),e.jsx("span",{className:"aw-notif-action",children:t.delivery.cta})]},"delivery")}),e.jsx("style",{children:`
        /* the window the whole story happens inside */
        .aw-frame {
          position: relative; overflow: hidden;
          border-radius: 16px; border: 1px solid rgba(255,255,255,.1);
          background: #0e0e10;
          box-shadow: 0 24px 60px -20px rgba(0,0,0,.7);
          font-family: var(--font-google-sans);
        }

        .aw-chrome {
          display: flex; align-items: center; gap: 9px;
          padding: 11px 16px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.025);
          font-size: 12.5px;
        }
        .aw-crumb { color: rgba(255,255,255,.5); }
        .aw-crumb-sep { color: rgba(255,255,255,.22); }
        .aw-crumb-here { color: rgba(255,255,255,.8); }

        /* thread and panel, the way the product lays them out */
        .aw-main { display: flex; align-items: stretch; min-height: 470px; }
        .aw-thread { display: flex; flex-direction: column; flex: 1; min-width: 0; }

        /* the header keeps the one thing that answers "who am I talking to" */
        .aw-head {
          display: flex; align-items: center; padding: 11px 18px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .aw-id {
          display: flex; align-items: center; gap: 10px;
          padding: 5px 11px 5px 8px; margin-left: -8px; border-radius: 999px;
          transition: background-color .3s ease;
        }
        .aw-id--open { background: rgba(255,255,255,.06); }
        .aw-name { font-size: 15.5px; font-weight: 600; color: #fff; }
        .aw-chev { color: rgba(255,255,255,.3); transition: transform .35s ease; }
        .aw-id--open .aw-chev { transform: rotate(180deg); color: rgba(255,255,255,.55); }

        .aw-turns {
          flex: 1; display: flex; flex-direction: column; gap: 14px;
          padding: 20px 18px 24px;
        }
        .aw-turn { display: flex; justify-content: flex-start; }
        .aw-turn--mine { justify-content: flex-end; }

        /* one shell for everything in the thread: the agent is the only thing on
           this screen with a voice, so what it did arrives the same way as what it
           said, and the difference is carried by what is inside the bubble */
        .aw-bubble {
          max-width: 84%; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
          font-size: 14px; line-height: 1.55; color: rgba(255,255,255,.85);
        }
        .aw-bubble--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
          color: #fff;
        }

        .aw-log { display: flex; flex-direction: column; gap: 6px; padding-top: 12px; padding-bottom: 13px; }
        .aw-log-when {
          margin: 0 0 3px; font-size: 11.5px; letter-spacing: .06em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .aw-log-row {
          display: flex; gap: 10px; margin: 0;
          font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.72);
        }
        .aw-log-time {
          flex: none; width: 38px; color: rgba(255,255,255,.3);
          font-variant-numeric: tabular-nums;
        }
        .aw-log-result { color: rgba(255,255,255,.38); }

        /* the payoff: a bubble like any other, and the only accent in the thread */
        .aw-hit { display: flex; flex-direction: column; gap: 2px; padding-top: 12px; padding-bottom: 13px; }
        .aw-hit-time { font-size: 11.5px; color: rgba(255,255,255,.3); font-variant-numeric: tabular-nums; }
        .aw-hit strong { font-size: 14.5px; font-weight: 600; color: #fff; }
        .aw-hit-result { font-size: 13.5px; color: var(--color-primary); }

        /* ---------- the panel behind the name ---------- */

        .aw-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.015);
        }
        .aw-drawer-in {
          width: 210px; display: flex; flex-direction: column; gap: 18px;
          padding: 14px 16px 20px;
        }
        .aw-kicker, .aw-label {
          font-size: 10.5px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .aw-kicker { margin: 0; }
        .aw-field { display: flex; flex-direction: column; gap: 8px; margin: 0; }

        /* text and a dot — a status is the one thing here that is only ever read,
           so it is not shaped like the things you press */
        .aw-state {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,.6);
        }
        .aw-state i {
          width: 6px; height: 6px; border-radius: 999px; flex: none;
          background: var(--color-primary);
          animation: aw-breathe 2.8s ease-in-out infinite;
        }
        @keyframes aw-breathe { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }

        .aw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .aw-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 999px;
          border: 1px solid rgba(248,70,0,.3); background: rgba(248,70,0,.08);
          font-size: 11.5px; color: rgba(255,255,255,.85);
        }
        .aw-chip svg { color: var(--color-primary); }

        /* A notification, at the size and shape a system draws one, sitting over the
           window rather than in it. Absolute so it never adds height — one that
           pushed the interface down would be a panel again. */
        .aw-notif {
          position: absolute; right: 16px; bottom: 16px;
          z-index: 5; width: min(340px, calc(100% - 32px));
          padding: 13px 15px 12px; border-radius: 20px;
          background: rgba(38,38,42,.86);
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 40px -12px rgba(0,0,0,.8);
        }

        .aw-notif-head { display: flex; align-items: center; gap: 8px; }
        .aw-notif-icon {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 6px; color: #fff; flex: none;
        }
        .aw-notif-app { font-size: 12px; letter-spacing: .01em; color: rgba(255,255,255,.6); }
        /* every phone puts the age of the notification here, and its absence is the
           kind of small wrongness that stops the whole thing reading as one */
        .aw-notif-time { margin-left: auto; font-size: 11.5px; color: rgba(255,255,255,.35); }

        .aw-notif-from { margin: 9px 0 0; font-size: 14px; font-weight: 600; color: #fff; }
        .aw-notif-body {
          margin: 2px 0 0; font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.72);
        }
        /* the number is bold rather than orange: notifications do not carry a brand's
           accent, and one that did would stop looking like a notification */
        .aw-notif-body strong { font-weight: 600; color: #fff; }

        .aw-notif-action {
          display: block; margin-top: 11px; padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,.12);
          font-size: 13px; font-weight: 500; color: #6ab3f3;
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-state i { animation: none; opacity: 1; }
        }

        /* Narrow, the panel goes under the thread rather than squeezing it — the
           same call the product makes, and for the same reason: a 210px column
           beside a 260px thread is two things that both stopped working. */
        @media (max-width: 1023px) {
          .aw-main { flex-direction: column; min-height: 0; }
          .aw-drawer {
            width: 100% !important; opacity: 1 !important;
            border-left: 0; border-top: 1px solid rgba(255,255,255,.07);
          }
          .aw-drawer-in { width: auto; }
          .aw-turns { padding-bottom: 18px; }
        }
      `})]})}function Ms({onStartTask:t}){const[a,n]=l.useState(0),s=Mn[a];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] py-[var(--section-pad)]",children:[e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Agents"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]",style:{fontFamily:"var(--font-google-sans)"},children:"Ask once. An agent keeps checking, using the tools you connect, and brings you back what matters."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 items-start gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Mn.map((i,o)=>{const r=o===a;return e.jsx("button",{type:"button",onClick:()=>n(o),"aria-pressed":r,className:`ag-tab${r?" ag-tab--active":""}`,children:e.jsx("span",{className:"ag-tab-title",children:i.label})},i.id)}),e.jsxs("button",{type:"button",onClick:()=>t(s.task),className:"ag-try",children:[s.task.label,e.jsx(J,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(xr,{story:s})})]})]}),e.jsx("style",{children:`
        .ag-tab {
          display: block; width: 100%; text-align: left; cursor: pointer;
          border: 1px solid transparent; border-left: 2px solid rgba(255,255,255,.12);
          padding: 14px 18px; border-radius: 0 10px 10px 0;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-tab:hover { background: rgba(255,255,255,.03); }
        /* The rail is the selection. A dot travelling between the tabs said the
           same thing with a moving part, and a moving part next to three words is
           one more thing to track than the choice deserves. */
        .ag-tab--active {
          border-left-color: var(--color-primary);
          background: rgba(255,255,255,.04);
        }

        .ag-tab-title {
          display: block; font-family: var(--font-google-sans); font-size: 19px; font-weight: 600;
          color: rgba(255,255,255,.55); transition: color .2s ease;
        }
        .ag-tab--active .ag-tab-title { color: #fff; }

        .ag-try {
          display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
          margin-top: 14px; margin-left: 18px; padding: 9px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.2); background: transparent; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; color: var(--color-text-body);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .ag-try:hover { border-color: rgba(248,70,0,.6); background: rgba(248,70,0,.08); }

        @media (max-width: 1023px) {
          .ag-try { margin-left: 0; }
        }
      `})]})}function fr({onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}){const p=l.useRef(null),d=()=>t();return e.jsxs("div",{children:[e.jsx(Wa,{}),e.jsx(Qo,{onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}),e.jsx(As,{onStartTask:a}),e.jsx(Ms,{onStartTask:a}),e.jsx("div",{ref:p,children:e.jsx(bt,{showBenefits:!1})}),e.jsx(je,{onStartFree:d,headline:"Whatever comes next, Starchild is already with you."})]})}const mr={resting:"composed",listening:"attentive",working:"unsettled",resolved:"composed"},ur={resting:[0,0],listening:[0,9],working:[0,0],resolved:[0,0]},br={resting:null,listening:"orb-attend .52s cubic-bezier(.16,1,.3,1)",working:"orb-consider .8s cubic-bezier(.4,0,.2,1)",resolved:"orb-recompose .74s cubic-bezier(.16,1,.3,1)"};function pe({state:t="resting",size:a=124,className:n}){const s=oe(),i=l.useRef(null),{ref:o,controller:r}=Ht({temperament:mr[t],breath:t==="resting"?.026:.01});return l.useEffect(()=>{if(t==="working")return;const[c,p]=ur[t];r.aim(c,p)},[r,t]),Ia(r,t==="working",a*.045,s),l.useEffect(()=>{const c=i.current,p=br[t];!c||!p||s||(c.style.animation="none",c.offsetWidth,c.style.animation=p)},[t,s]),e.jsxs("span",{className:`orb-root${n?` ${n}`:""}`,style:{width:a,height:a},children:[e.jsx("span",{"aria-hidden":"true",className:"orb-halo",style:{width:a*2.25,height:a*2.25}}),e.jsx("span",{ref:i,className:"orb-beat",children:e.jsx("span",{ref:o,"aria-hidden":"true",className:"orb-core",style:{width:a,height:a,boxShadow:`0 0 ${a*.56}px rgba(248,70,0,.45)`}})})]})}function yr({onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}){const[r,c]=l.useState(""),p=()=>t(r.trim()||void 0);return e.jsxs("section",{className:"hero-d relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx($a,{onNavigateHome:()=>{},onNavigateTraders:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(O,{className:"w-full",children:e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:"mx-auto flex max-w-[600px] flex-col items-center text-center",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx(pe,{state:r.trim()?"listening":"resting",size:150})}),e.jsx(m.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,delay:.25,ease:[.16,1,.3,1]},className:"mt-14 text-[26px] leading-[1.2] font-semibold text-balance text-white sm:text-[30px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you"}),e.jsxs(m.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.35},className:"mt-7 w-full rounded-[22px] border border-white/12 bg-white/[0.06] p-4 text-left backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("textarea",{value:r,onChange:d=>c(d.target.value),onKeyDown:d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),p())},rows:2,placeholder:"What's on your mind?",className:"w-full resize-none bg-transparent text-[16px] leading-[1.5] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-3 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:p,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(J,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.48},className:"mt-6 flex justify-center",children:e.jsx(ut,{onStartTask:a,intents:qt})})]})})}),e.jsx("style",{children:`
        /* Darker than the rest of the page on purpose: the orb is the only source
           of light in the frame, and it needs somewhere to fall off to. */
        .hero-d { background-color: #050506; }

        /* the glow the orb throws into the room, sitting behind everything */
        .hero-d::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(58% 45% at 50% 42%, rgba(248,70,0,.09) 0%, rgba(248,70,0,0) 72%);
        }
      `})]})}function wr(){return e.jsx("section",{className:"md-section bg-[#07090a] py-[var(--section-pad)]",children:e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-12 items-center gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-7",children:[e.jsx(m.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[560px] text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"The world’s leading AI models, working as one for you."}),e.jsx(m.p,{initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.08,ease:[.16,1,.3,1]},className:"mt-5 max-w-[520px] text-[18px] leading-[1.6] tracking-[var(--tracking-body)] text-balance text-[var(--color-text-body)]",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode chooses the model that fits each task best."})]}),e.jsx("div",{className:"hidden lg:col-span-5 lg:block",children:e.jsx(Ts,{})})]})})})}function vr({onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}){const p=l.useRef(null),d=()=>t();return e.jsxs("div",{children:[e.jsx(Wa,{}),e.jsx(yr,{onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}),e.jsx(wr,{}),e.jsx(As,{onStartTask:a}),e.jsx(Ms,{onStartTask:a}),e.jsx("div",{ref:p,children:e.jsx(bt,{showBenefits:!1})}),e.jsx(je,{onStartFree:d,headline:"Whatever comes next, Starchild is already with you."})]})}const kr=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function jr({onNavigateHome:t,onNavigateTraders:a,onNavigatePricing:n,onLogIn:s,onSignUp:i}){const[o,r]=l.useState(!1),c=l.useRef(null);return l.useEffect(()=>{if(!o)return;const p=h=>{var x;(x=c.current)!=null&&x.contains(h.target)||r(!1)},d=h=>{h.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",p),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",p),document.removeEventListener("keydown",d)}},[o]),e.jsxs("header",{className:"relative z-20 py-5",children:[e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-7 w-auto"})})}),e.jsxs("nav",{className:"he-pill","aria-label":"Main",children:[e.jsxs("div",{className:"he-menu",ref:c,children:[e.jsxs("button",{type:"button",onClick:()=>r(p=>!p),"aria-expanded":o,"aria-haspopup":"true",className:`he-link${o?" he-link--open":""}`,children:["Starchild for",e.jsx(Ve,{className:"he-chevron size-3.5"})]}),o&&e.jsx("div",{className:"he-panel",role:"menu",children:kr.map(({id:p,label:d,route:h})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{r(!1),h==="traders"&&a()},className:"he-item",children:d},p))})]}),e.jsx("button",{type:"button",onClick:n,className:"he-link",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"he-link he-link--badged",children:["Marketplace",e.jsx("span",{className:"he-badge",children:"New"})]})]}),e.jsx("div",{className:"flex items-center justify-end",children:e.jsxs("div",{className:"he-pill he-pill--tight",children:[e.jsx("button",{type:"button",onClick:s,className:"he-link",children:"Log in"}),e.jsx("button",{type:"button",onClick:i,className:"he-signup",children:"Sign up"})]})})]})}),e.jsx("style",{children:`
        /* the capsule both groups share */
        .he-pill {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 8px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(14px);
        }
        .he-pill--tight { padding: 4px 4px 4px 6px; gap: 2px; }

        .he-menu { position: relative; }

        .he-link {
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          padding: 7px 13px; border: 0; border-radius: 999px; background: none;
          font-family: var(--font-google-sans); font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,.62); white-space: nowrap;
          transition: color .2s ease, background-color .2s ease;
        }
        .he-link:hover, .he-link--open { color: #fff; background: rgba(255,255,255,.07); }
        .he-link:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .he-chevron { transition: transform .2s ease; opacity: .7; }
        .he-link--open .he-chevron { transform: rotate(180deg); }

        /* Inside the capsule the badge cannot ride outside the label without
           poking through the border, so it sits in the flow. */
        .he-link--badged { padding-right: 9px; }
        .he-badge {
          padding: 2px 5px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
          font-size: 8.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
          line-height: 1.2;
        }

        .he-signup {
          cursor: pointer; padding: 7px 15px; border: 0; border-radius: 999px;
          background: rgba(255,255,255,.1); color: #fff;
          font-family: var(--font-google-sans); font-size: 13px; font-weight: 500;
          white-space: nowrap; transition: background-color .2s ease;
        }
        .he-signup:hover { background: rgba(255,255,255,.18); }
        .he-signup:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }

        .he-panel {
          position: absolute; top: calc(100% + 12px); left: -4px; z-index: 30;
          display: flex; flex-direction: column; min-width: 190px; padding: 6px;
          border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
          background: rgba(12,12,12,.92); backdrop-filter: blur(14px);
          box-shadow: 0 18px 40px rgba(0,0,0,.55);
          animation: he-in .18s cubic-bezier(.16,1,.3,1);
        }
        .he-item {
          text-align: left; cursor: pointer; padding: 9px 12px; border: 0; border-radius: 9px;
          background: none; color: rgba(255,255,255,.7);
          font-family: var(--font-google-sans); font-size: 13.5px;
          transition: background-color .18s ease, color .18s ease;
        }
        .he-item:hover { background: rgba(255,255,255,.08); color: #fff; }
        .he-item:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        @keyframes he-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .he-panel { animation: none; }
          .he-chevron { transition: none; }
        }

        /* below this the three tracks stop fitting and the nav starts colliding
           with the wordmark, so it drops out until there's a mobile menu for it */
        @media (max-width: 899px) { .he-pill:not(.he-pill--tight) { display: none; } }
      `})]})}function ba({size:t=180,state:a="resting"}){oe();const[n,s]=l.useState(!1);return e.jsx(pe,{state:a,size:t})}function Es(t){return typeof window>"u"?null:new URLSearchParams(window.location.search).get(t)}const ie=Es("still")==="1",Ln=Es("tab");function Ke(t){return ie?{}:t}const Nr=[{match:/\b(make|build|design|write|draft|poster|logo|name|copy|brand|deck|site|app)\b/i,reply:{thinking:"Getting a feel for it…",text:"I'd settle the shape before the words. Tell me the one thing someone should leave with and I'll work up three directions — you'll know which is right the moment you see them beside each other."}},{match:/\b(find|research|compare|look|read|study|analy[sz]e|why|which|best|options?)\b/i,reply:{thinking:"Working out where to look…",text:"I'll read properly rather than skim, and come back with the three things that actually differ between the options — plus the one everyone gets wrong. Point me at what you've already ruled out so I don't spend the time twice."}},{match:/\b(plan|organi[sz]e|schedule|week|launch|priorit|todo|task|deadline|calendar)\b/i,reply:{thinking:"Laying it out…",text:"Let's get it out of your head first. Anything with a date on it goes in one pile and everything else in the other, and I'll come back with the order that unblocks the most for the least effort. Usually one thing is holding up three."}},{match:/\b(watch|monitor|track|remind|every|daily|weekly|keep an eye|alert|notify)\b/i,reply:{thinking:"Working out what to watch…",text:"That's the kind of thing I'd rather take on than be asked for. Give me what counts as worth interrupting you over and I'll go quiet until it happens — no digest, no summary of nothing."}}],zr={thinking:"Reading it properly…",text:"Give me the messy version rather than the tidy one — I get further with what's actually bothering you than with a clean brief. What's the part you keep going back to?"};function Cr(t){var a;return((a=Nr.find(({match:n})=>n.test(t)))==null?void 0:a.reply)??zr}const Rn=2.2,Sr=900;function Tr(){const t=oe(),{ref:a,controller:n}=Ht({temperament:"unsettled",breath:.05}),s=l.useRef(0);return l.useEffect(()=>{if(t)return;const i=()=>{const o=Math.random()*Math.PI*2;n.aim(Math.cos(o)*Rn,Math.sin(o)*Rn),s.current=window.setTimeout(i,Sr*(.7+Math.random()*.6))};return i(),()=>window.clearTimeout(s.current)},[n,t]),e.jsxs("span",{className:"tl-orb","aria-hidden":"true",children:[e.jsx("span",{className:"tl-halo"}),e.jsx("span",{ref:a,className:"tl-core"})]})}function Pa({label:t}){return e.jsxs("div",{className:"tl-row",role:"status","aria-live":"polite",children:[e.jsx(Tr,{}),e.jsx("span",{className:"tl-label",children:t},t),e.jsx("style",{children:`
        .tl-row {
          display: flex; align-items: center; gap: 11px;
          font-family: var(--font-google-sans);
        }

        /* Sized to the line it sits on, not to the orb it descends from: any bigger
           and the wait starts announcing itself. */
        .tl-orb {
          position: relative; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px;
        }
        .tl-halo {
          position: absolute; width: 34px; height: 34px; border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle, rgba(248,70,0,.34) 0%, rgba(248,70,0,0) 68%);
          animation: tl-breathe 2.4s ease-in-out infinite;
        }
        .tl-core {
          display: block; width: 9px; height: 9px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.6);
          will-change: transform;
        }
        @keyframes tl-breathe {
          0%, 100% { opacity: .5; transform: scale(.9); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        /* Grey, and the same size as body copy. It is a status, and a status that
           competes with the answer underneath it has misunderstood its job. */
        .tl-label {
          font-size: 14.5px; line-height: 1.5; color: rgba(255,255,255,.42);
          animation: tl-in .45s cubic-bezier(.16,1,.3,1);
        }
        @keyframes tl-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tl-halo, .tl-label { animation: none; }
          .tl-halo { opacity: .8; transform: none; }
        }
      `})]})}function Ar({orbAnchor:t,orbClip:a,onOrbState:n,onEnterGuest:s,onNavigateTraders:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}){const[p,d]=l.useState(""),h=p.trim().length>0,[x,g]=l.useState([]),[f,u]=l.useState(null),b=l.useRef(0);l.useEffect(()=>()=>window.clearTimeout(b.current),[]);const y=l.useRef(null),w=a??y,k=l.useRef(null),{scrollYProgress:N}=ps({target:k,offset:["start start","end start"]}),C=Ae(N,[0,.18,1],[1,0,0]),S=Ae(N,[0,.18,1],[0,-60,-60]),v=Ae(N,[.2,.85,1],[180,250,250]),L=Ae(N,[0,1],["0vh","100vh"]),W=x.filter(A=>A.who==="you").length,D=x.map(A=>A.who).lastIndexOf("ai"),j=W>=2&&!f,$=x.length>0,E=()=>{const A=p.trim();if(!A||f)return;if(W>=2){s(A);return}const F=Cr(A);g(B=>[...B,{who:"you",text:A}]),d(""),u(F.thinking),n==null||n("working"),b.current=window.setTimeout(()=>{g(B=>[...B,{who:"ai",text:F.text}]),u(null),n==null||n("resolved")},1700)};return l.useEffect(()=>{const A=w.current;A&&(A.scrollTop=A.scrollHeight)},[x,f]),l.useEffect(()=>{f||n==null||n(h?"listening":$?"resolved":"resting")},[h,f,$,n]),e.jsxs("section",{ref:k,className:"hero-e relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(jr,{onNavigateHome:()=>{},onNavigateTraders:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-24",children:e.jsx(O,{className:"w-full",children:e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:"mx-auto flex max-w-[560px] flex-col items-center text-center",children:[!$&&e.jsx(m.div,{ref:t,className:"he-orb-slot","aria-hidden":"true",style:ie?void 0:{width:v,height:v,y:L},children:ie&&e.jsx(ba,{size:180})}),e.jsxs(m.div,{style:ie?void 0:{opacity:C,y:S},className:"flex w-full flex-col items-center",children:[e.jsx(X,{mode:"wait",children:$?e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},ref:w,className:"he-scroll",children:e.jsxs("div",{className:"he-thread",children:[x.map((A,F)=>{const B=A.who==="you",_=!B&&F===D;return e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45,ease:[.16,1,.3,1]},className:B?"he-row he-row--mine":"he-row",children:[!B&&(_?e.jsx("span",{ref:t,className:"he-face","aria-hidden":"true",children:ie&&e.jsx(ba,{size:30})}):e.jsx("span",{className:"he-face he-face--past","aria-hidden":"true"})),e.jsx("p",{className:B?"he-said he-said--mine":"he-said",children:A.text})]},F)}),f&&e.jsxs("div",{className:"he-row",children:[e.jsx("span",{className:"he-face he-face--empty","aria-hidden":"true"}),e.jsx("div",{className:"he-thinking",children:e.jsx(Pa,{label:f})})]}),j&&e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5,ease:[.16,1,.3,1]},className:"he-gate",children:[e.jsx("p",{className:"he-gate-line",children:"Keep this conversation going."}),e.jsx("p",{className:"he-gate-sub",children:"Create an account to save this chat and let Starchild remember the context."}),e.jsx("button",{type:"button",onClick:c,className:"he-gate-go",children:"Create a free account"})]})]})},"thread"):e.jsx(m.h1,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-8,transition:{duration:.2}},transition:{duration:.6,delay:.25,ease:[.16,1,.3,1]},className:"mt-16 text-[22px] leading-[1.3] font-medium text-balance text-white",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."},"line")}),e.jsxs(m.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.55,delay:.35},className:"he-box mt-6 w-full",children:[e.jsx("textarea",{value:p,onChange:A=>d(A.target.value),onKeyDown:A=>{A.key==="Enter"&&!A.shiftKey&&(A.preventDefault(),E())},rows:$?2:3,placeholder:j?"Keep going in Starchild…":$?"Say more…":"What's on your mind?",className:"he-input"}),e.jsx(m.button,{type:"button",onClick:E,"aria-label":"Send",initial:!1,animate:{opacity:h?1:0,scale:h?1:.8},transition:{duration:.22,ease:[.16,1,.3,1]},style:{pointerEvents:h?"auto":"none"},className:"he-send",children:e.jsx(J,{className:"size-4"})})]})]})]})})}),e.jsx("style",{children:`
        /* Darker than the rest of the page on purpose: the orb is the only source
           of light in the frame, and it needs somewhere to fall off to. */
        .hero-e { background-color: #050506; }

        /* the orb is 180px and fixed to the viewport; this is the hole it sits in */
        .he-orb-slot { width: 180px; height: 180px; }

        /* The glow the orb throws into the room, sitting behind everything.

           Masked at the foot because the section below is opaque and cuts this
           rectangle off dead straight. Invisible while the orb sat in the middle
           of the hero; the moment the orb holds still and the next section climbs
           over it, that straight edge is the first thing you see. */
        .hero-e::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(56% 44% at 50% 40%, rgba(248,70,0,.09) 0%, rgba(248,70,0,0) 72%);
          -webkit-mask-image: linear-gradient(180deg, #000 62%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 62%, transparent 100%);
        }

        /* Taller than it needs to be for one line, deliberately. An empty box that
           looks like it expects a sentence gets a sentence; one that looks like a
           search field gets three words. */
        .he-box {
          position: relative;
          padding: 18px 20px 20px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .he-box:focus-within { border-color: rgba(255,255,255,.26); background: rgba(255,255,255,.06); }

        .he-input {
          width: 100%; resize: none; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: #fff; text-align: left;
        }
        .he-input::placeholder { color: rgba(255,255,255,.32); }

        /* ---------- the exchange ---------- */

        /*
          Fixed height from the first message, contents pinned to the bottom. The
          composer under it therefore never moves, and new turns arrive by pushing
          the older ones up and out — which is the direction a conversation goes.

          The mask is what happens at the top instead of a hard edge running into
          the header. It is a fade, not a scrollbar: the page above is dark and a
          line across it would read as a panel nobody drew.
        */
        .he-scroll {
          width: 100%; margin-top: 24px;
          height: min(46vh, 430px);
          overflow-y: auto; overscroll-behavior: contain;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 64px);
          mask-image: linear-gradient(to bottom, transparent 0, #000 64px);
        }
        .he-scroll::-webkit-scrollbar { width: 0; }
        .he-scroll { scrollbar-width: none; }

        .he-thread {
          display: flex; flex-direction: column; justify-content: flex-end; gap: 16px;
          min-height: 100%; padding-top: 64px; text-align: left;
        }

        .he-row { display: flex; align-items: flex-start; gap: 12px; }
        .he-row--mine { justify-content: flex-end; }

        /* The orb's seat beside a reply. It is empty for the live one — the page's
           orb flies in and fills it — and drawn for the ones above. */
        .he-face { flex: none; width: 30px; height: 30px; margin-top: 6px; }
        .he-face--past {
          border-radius: 999px;
          background: rgba(248,70,0,.42);
          transform: scale(.34); transform-origin: center;
        }
        .he-face--empty { background: none; }

        /* Left for Starchild, right for you, and the widths differ — a reply that
           filled the column would read as a document rather than as a turn. */
        .he-said {
          max-width: 92%; margin: 0;
          padding: 13px 18px; border-radius: 18px 18px 18px 5px;
          background: rgba(255,255,255,.05);
          font-family: var(--font-google-sans);
          font-size: 15.5px; line-height: 1.55; color: rgba(255,255,255,.88);
        }
        .he-said--mine {
          max-width: 78%;
          border-radius: 18px 18px 5px 18px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
          color: #fff;
        }

        .he-thinking { padding: 8px 0; }

        /* Not a wall. It says what it cannot do and why, which is the only version
           of this someone reads instead of scrolling past. */
        .he-gate {
          /* pushed in to the replies' edge, so it reads as part of the exchange
             rather than as a banner the page dropped underneath it */
          margin: 6px 0 0 42px; padding: 18px 20px 20px;
          border-radius: 18px; border: 1px solid rgba(248,70,0,.3);
          background: rgba(248,70,0,.05); text-align: left;
        }
        .he-gate-line {
          margin: 0; font-family: var(--font-google-sans);
          font-size: 15px; font-weight: 600; color: #fff;
        }
        .he-gate-sub {
          margin: 5px 0 0; font-family: var(--font-google-sans);
          font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,.55);
        }
        .he-gate-go {
          margin-top: 15px; padding: 10px 18px; border: 0; border-radius: 999px;
          cursor: pointer; background: var(--color-primary); color: #fff;
          font-family: var(--font-google-sans); font-size: 13.5px; font-weight: 500;
        }
        .he-gate-go:hover { background: #ff5a1f; }
        .he-gate-go:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        .he-send {
          position: absolute; right: 14px; bottom: 14px;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
        }
        .he-send:hover { background: #ff5a1f; }
        .he-send:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 3px; }
      `})]})}const da=[{who:"you",text:"Turn this into a launch plan"},{who:"ai",thinks:"Reading the idea…",text:"Let's make it happen."},{who:"made",label:"Launch plan"},{who:"you",text:"What should I do first?"},{who:"ai",thinks:"Working out the order…",text:"Start with a small beta.",reaction:"😎"}],Mr=900,Er=520,Ir=Ke({initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.46,ease:[.16,1,.3,1]}});function Lr({orbExit:t,orbZone:a}){const n=l.useRef(null),s=l.useRef(null),{scrollYProgress:i}=ps({target:s,offset:["start end","start start"]}),o=Ae(i,[.9,1,2],[0,1,1]),r=Ae(i,[0,.72,2],[190,0,0]),c=xt(n,{once:!0,amount:.35}),[p,d]=l.useState(ie?da.length:0),[h,x]=l.useState(null);return l.useEffect(()=>{if(ie||!c)return;const g=[];let f=0;return da.forEach((u,b)=>{if(u.who==="ai"){const y=u.thinks;g.push(window.setTimeout(()=>x(y),f)),f+=Mr}g.push(window.setTimeout(()=>{x(null),d(b+1)},f)),f+=Er}),()=>g.forEach(window.clearTimeout)},[c]),e.jsxs("section",{className:"cv-section",ref:g=>{s.current=g,a&&(a.current=g)},children:[e.jsxs(O,{children:[e.jsx(m.h2,{style:ie?void 0:{opacity:o},className:"cv-title",children:"Just talk. Starchild figures out the rest"}),e.jsx(m.div,{className:"cv-scene",ref:n,style:ie?void 0:{y:r},children:e.jsxs("div",{className:"cv-beats",children:[da.slice(0,p).map((g,f)=>{const u=g.who==="you";return e.jsx(m.div,{...Ir,className:u?"cv-turn cv-turn--mine":"cv-turn",children:g.who==="made"?e.jsxs("button",{type:"button",className:"cv-made",children:[e.jsx($i,{className:"size-4"}),e.jsx("span",{children:g.label}),e.jsx(J,{className:"cv-made-go size-4 rotate-90"})]}):e.jsxs("p",{className:u?"cv-bubble cv-bubble--mine":"cv-bubble",children:[g.text,g.who==="ai"&&g.reaction&&e.jsx(m.span,{...Ke({initial:{opacity:0,scale:.4},animate:{opacity:1,scale:1},transition:{duration:.42,delay:.5,ease:[.34,1.56,.64,1]}}),className:"cv-reaction",children:g.reaction})]})},f)}),h&&e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},className:"cv-turn",children:e.jsx("div",{className:"cv-waiting",children:e.jsx(Pa,{label:h})})})]})}),e.jsx("div",{ref:t,className:"cv-exit","aria-hidden":"true"})]}),e.jsx("style",{children:`
        /*
          No z-index here, deliberately, and the top padding is short for a reason.

          This background is opaque, so with a layer of its own the section covered
          the orb across the full width of the window: a straight horizontal edge
          cutting a circle in half, which is a frame sliding up, not a box
          arriving. Left at auto it paints underneath the orb, and the only thing
          on the page that can cover the orb is .cv-scene — the box.

          That makes the padding structural rather than taste. The title sits
          between the top of the section and the top of the box, so this number
          decides where the title is at the moment the box finishes covering the
          orb. At 130 it was already off the top of the window by then.
        */
        .cv-section { position: relative; overflow: hidden; padding: 96px 0 40px; background: #050506; }

        /* The orb's size out here, and the air between the two sections. Both at
           once, because the space exists so the orb has somewhere to be. */
        .cv-exit { width: 380px; height: 380px; margin: 96px auto 0; }

        /* One line, no full stop, and no sentence under it. The scene below is the
           supporting copy. */
        .cv-title {
          max-width: 44ch; margin: 0 auto 44px;
          font-family: var(--font-google-sans);
          font-size: clamp(30px, 3.7vw, 50px); line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; color: #fff; text-align: center; text-wrap: balance;
        }

        /* ---------- the scene ---------- */

        /* In front of the orb, which is fixed and sits behind the page. This panel
           climbing over the orb IS the transition, which makes it the one surface
           here that has to be genuinely opaque. The two stops are the colours the
           old translucent white already resolved to over this background, so it
           looks no different anywhere except on top of the orb. */
        .cv-scene {
          position: relative; z-index: 6;
          max-width: 760px; margin: 0 auto;
          padding: 40px 46px 48px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(180deg, #0c0c0d 0%, #070708 100%);
        }
        /* The light comes from the side Starchild speaks from, so the frame is
           warmest where the marks are — the atmosphere and the presence are the
           same fact said twice. */
        .cv-scene::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(48% 62% at 6% 52%, rgba(248,70,0,.13) 0%, rgba(248,70,0,0) 72%);
        }

        /* A floor, so five beats arriving do not shove the page down five times
           while someone is reading it. Measured against the finished scene. */
        .cv-beats {
          position: relative;
          display: flex; flex-direction: column; gap: 18px;
          min-height: 322px;
        }

        .cv-turn { display: flex; align-items: center; }
        .cv-turn--mine .cv-bubble { margin-left: auto; }

        /* ---------- what is said ---------- */

        .cv-bubble {
          position: relative; max-width: 32ch; margin: 0;
          padding: 12px 19px; border-radius: 20px;
          background: rgba(255,255,255,.05);
          font-family: var(--font-google-sans);
          font-size: 17px; line-height: 1.5; color: rgba(255,255,255,.92);
        }
        /* Yours are quieter. You are prompting; it is answering. */
        .cv-bubble--mine {
          background: rgba(255,255,255,.035);
          color: rgba(255,255,255,.68);
        }

        /* Hung off the corner, half outside — the way a reaction sits on a message
           everywhere people actually send them. */
        .cv-reaction {
          position: absolute; right: 14px; bottom: -13px;
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px;
          background: #17171a; border: 1px solid rgba(255,255,255,.09);
          font-size: 13px; line-height: 1;
        }

        .cv-waiting { padding: 4px 0; }

        /* ---------- what it produced ---------- */

        .cv-made {
          display: flex; align-items: center; gap: 14px; cursor: pointer;
          min-width: 280px; max-width: 32ch;
          padding: 13px 18px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.028);
          font-family: var(--font-google-sans); font-size: 16px; color: #fff;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .cv-made:hover { border-color: rgba(255,255,255,.26); background: rgba(255,255,255,.05); }
        .cv-made > svg:first-child { color: rgba(255,255,255,.5); flex: none; }
        .cv-made span { flex: 1; text-align: left; }
        /* points along the row, not up out of it — this opens, it does not send */
        .cv-made-go { color: rgba(255,255,255,.4); flex: none; }

        @media (max-width: 820px) {
          .cv-section { padding: 90px 0 24px; }
          .cv-exit { width: 240px; height: 240px; margin-top: 64px; }
          .cv-title { margin-bottom: 40px; }
          .cv-scene { padding: 28px 20px 34px; border-radius: 22px; }
          .cv-mark--wait { left: -14px; }
          .cv-beats { gap: 14px; min-height: 280px; }
          .cv-turn { gap: 10px; }
          .cv-bubble { max-width: 80%; font-size: 15.5px; padding: 11px 16px; }
          .cv-made { min-width: 0; max-width: 80%; font-size: 15px; }
        }
      `})]})}const Rr=9,$n=1e3,Wt=.045;function Is(t,a){const n=Math.hypot(t,a);if(n<=1||n>=$n)return{x:0,y:0};const s=Math.sqrt(1-n/$n)*Rr;return{x:t/n*s,y:a/n*s}}function Ls(){const t=l.useRef(null),a=oe();return l.useEffect(()=>{const n=t.current;if(!n||a)return;const s={at:null},i={x:0,y:0};let o=!1,r=0;const c=()=>{const x=n.getBoundingClientRect(),g=s.at,f=g?Is(g.x-(x.left+x.width/2),g.y-(x.top+x.height/2)):{x:0,y:0};if(i.x+=(f.x-i.x)*Wt,i.y+=(f.y-i.y)*Wt,n.style.transform=`translate3d(${i.x.toFixed(2)}px, ${i.y.toFixed(2)}px, 0)`,Math.abs(f.x-i.x)<.01&&Math.abs(f.y-i.y)<.01){o=!1;return}r=requestAnimationFrame(c)},p=()=>{o||(o=!0,r=requestAnimationFrame(c))},d=x=>{s.at={x:x.clientX,y:x.clientY},p()},h=()=>{s.at=null,p()};return window.addEventListener("pointermove",d,{passive:!0}),window.addEventListener("pointerleave",h),window.addEventListener("scroll",p,{passive:!0}),()=>{window.removeEventListener("pointermove",d),window.removeEventListener("pointerleave",h),window.removeEventListener("scroll",p),cancelAnimationFrame(r)}},[a]),t}const $r=.11,Fr=.72,Wr=26,Pr=.07,Fn=.05,Wn=180;function Br({stops:t,state:a="resting"}){const n=oe(),s=l.useRef(null),[i,o]=l.useState(!1),r=l.useRef({x:0,y:0,size:0}),c=l.useRef({x:0,y:0,size:0}),p=l.useRef(!1),d=l.useRef(!0),h=l.useRef("1"),x=l.useRef(null),g=l.useRef({x:0,y:0});return l.useEffect(()=>{if(n)return;const f=b=>{x.current={x:b.clientX,y:b.clientY}},u=()=>{x.current=null};return window.addEventListener("pointermove",f,{passive:!0}),window.addEventListener("pointerleave",u),()=>{window.removeEventListener("pointermove",f),window.removeEventListener("pointerleave",u)}},[n]),l.useEffect(()=>{const f=s.current;if(!f)return;const u=()=>{let C=t[0];for(const S of t){const v=(S.zone??S.ref).current;if(!v)continue;const L=window.innerHeight*(S.at??.5);v.getBoundingClientRect().top<=L&&(C=S)}return C},b=C=>{const S=C.ref.current;if(!S)return null;const v=S.getBoundingClientRect();return{x:v.left+v.width/2,y:v.top+v.height/2,size:v.width}};let y=0;const w=C=>{var j;const S=(j=C.clip)==null?void 0:j.current,v=C.ref.current;if(!S||!v)return!0;const L=S.getBoundingClientRect(),W=v.getBoundingClientRect(),D=W.top+W.height/2;return D>L.top&&D<L.bottom},k=()=>{const{x:C,y:S}=g.current,v=c.current.x,L=c.current.y,W=Math.hypot(v,L),D=n?0:Math.min(W/Wr,1)*Pr,j=W>.01?Math.abs(L)/W:0,$=1+D*(1-j)-D*j*.5,E=1+D*j-D*(1-j)*.5;f.style.transform=`translate3d(${r.current.x+C}px, ${r.current.y+S}px, 0) translate(-50%, -50%) scale(${$.toFixed(4)}, ${E.toFixed(4)})`,f.style.setProperty("--flight-scale",String(r.current.size/Wn)),f.style.opacity=d.current?"1":"0",f.style.zIndex=h.current},N=()=>{const C=u();d.current=w(C),h.current=C.above?"6":"1";const S=b(C);if(!S){y=requestAnimationFrame(N);return}if(!n){const v=x.current,L=v?Is(v.x-r.current.x,v.y-r.current.y):{x:0,y:0};g.current.x+=(L.x-g.current.x)*Wt,g.current.y+=(L.y-g.current.y)*Wt}if(!p.current)r.current={...S},c.current={x:0,y:0,size:0},p.current=!0,o(!0);else if(n)r.current={...S};else for(const v of["x","y","size"]){const L=S[v]-r.current[v];c.current[v]=(c.current[v]+L*$r)*Fr,Math.abs(c.current[v])<Fn&&Math.abs(L)<Fn?(r.current[v]=S[v],c.current[v]=0):r.current[v]+=c.current[v]}k(),y=requestAnimationFrame(N)};return y=requestAnimationFrame(N),()=>cancelAnimationFrame(y)},[t,n]),e.jsxs("div",{ref:s,"aria-hidden":"true",className:"fo-host",style:{opacity:i?1:0},children:[e.jsx(ba,{size:Wn,state:a}),e.jsx("style",{children:`
        .fo-host {
          position: fixed; top: 0; left: 0;
          pointer-events: none; will-change: transform;
          transition: opacity .4s ease;
        }
        .fo-host > * {
          transform: scale(var(--flight-scale, 1));
          transform-origin: center;
        }
      `})]})}const Dr={working:"Working now",waiting:"Needs you",scheduled:"Scheduled",settled:"Done for now",paused:"Paused"},At={from:"research",to:"project",says:"Research Agent passed the pricing write-up to Project Assistant."},Ba=[{id:"inbox",name:"Inbox Manager",role:"Keeps your inbox down to what actually needs you",status:"waiting",mood:"Four replies, ready when you are.",resting:"Inbox Manager has done what it can without you.",preview:"4 replies drafted — waiting for you",lastActive:"12m ago",cadence:"Every morning at 8:00",tools:["gmail","slack","gcal"],thread:[{kind:"you",text:"Keep on top of my inbox. Draft replies for anything routine, but don't send anything without me."},{kind:"agent",text:"Got it. I'll go through it every morning and leave the drafts for you to look over."},{kind:"activity",when:"This morning, 8:00",lines:["Checked Gmail","Reviewed 12 emails","Drafted 4 replies","Left 2 for you — they looked personal"]},{kind:"approval",text:"4 replies ready to send",detail:"Two scheduling confirmations, an invoice acknowledgement and a polite no. Nothing that commits you to anything.",confirm:"Review and send"}]},{id:"travel",name:"Travel Watcher",role:"Watches fares on the trips you're thinking about",status:"working",mood:"Waiting for the price to move.",resting:"Travel Watcher is keeping an eye on prices.",preview:"Tokyo — $684, down from $828",lastActive:"just now",cadence:"Checks every hour",tools:["telegram"],thread:[{kind:"you",text:"Let me know when flights to Tokyo drop below $700."},{kind:"agent",text:"I'll keep an eye on it and message you the moment it does."},{kind:"activity",when:"Today",lines:["Checked 6 airlines, hourly","Cheapest went $842 → $828 → $684","Dropped below your $700","Alert sent to Telegram"]},{kind:"agent",text:"Tokyo in October is $684 return — direct both ways, and it lands inside the dates you gave me. Want me to keep watching in case it falls further?"}]},{id:"research",name:"Research Agent",role:"Digs into things properly and comes back with the shape of it",status:"working",mood:"Still reading.",resting:"Research Agent is still reading.",preview:"Reading 9 sources on the pricing question",lastActive:"3m ago",tools:["notion","gdrive"],thread:[{kind:"you",text:"Look into how the AI tools people actually pay for are priced. I want the pattern, not a list."},{kind:"agent",text:"I'll work through it and come back with what the pattern is rather than a table of everyone."},{kind:"activity",when:"In progress",lines:["Read 9 sources","Pulled pricing from 14 products","Writing it up in Notion"]}]},{id:"project",name:"Project Assistant",role:"Keeps the week honest and tells you what slipped",status:"scheduled",mood:"Keeps an eye on what slips.",resting:"Project Assistant is waiting for Monday.",preview:"Next run Monday, 9:00",lastActive:"Friday",cadence:"Every Monday at 9:00",tools:["gmail","gcal","notion"],thread:[{kind:"you",text:"Every Monday, tell me where the project actually is — not where the board says it is."},{kind:"agent",text:"I'll go through the calendar and the docs each Monday and give you the honest version."},{kind:"activity",when:"Last Monday",lines:["Read the calendar and Notion","3 tasks moved for the second week running","Posted the summary to Slack"]},{kind:"agent",text:"One thing worth saying out loud: the design review has moved twice. It's the only thing blocking two other tasks."}]},{id:"trading",name:"Trading Agent",role:"Watches your positions and steps in only where you allowed it",status:"paused",mood:"Watching, not acting.",resting:"Trading Agent is paused. Nothing will be placed.",preview:"Paused — you turned execution off",lastActive:"2 days ago",tools:["telegram"],thread:[{kind:"you",text:"Pause anything that touches execution. Keep watching, just don't act."},{kind:"agent",text:"Paused. I'll keep monitoring and tell you what I see, but I won't place anything."},{kind:"activity",when:"Since then",lines:["Monitoring 4 positions","No orders placed","2 alerts sent"]}]}];function Or(){return e.jsxs("div",{className:"sc-doc",children:[e.jsx("h3",{className:"sc-title",children:"Climate adaptation strategies"}),e.jsxs("div",{className:"sc-split",children:[e.jsxs("div",{className:"sc-prose",children:[e.jsx("p",{children:"Coastal cities are converging on three approaches, and most of what separates them is who pays, and when."}),e.jsx("p",{children:"Managed retreat is the cheapest over thirty years and the hardest to begin. Hard defences are the reverse. Everything else is a blend of the two."}),e.jsx("p",{children:"Worth reading first: the Rotterdam programme, the only one with results yet."})]}),e.jsxs("div",{className:"sc-card",children:[e.jsx("p",{className:"sc-card-label",children:"Key findings"}),e.jsx("svg",{viewBox:"0 0 200 70",className:"sc-art",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M4 56 C 28 54, 38 30, 58 30 C 76 30, 80 47, 98 47 C 122 47, 126 11, 152 9 C 172 8, 182 11, 196 11",stroke:"var(--color-primary)",strokeWidth:"2",strokeLinecap:"round"})}),e.jsx("p",{className:"sc-card-foot",children:"Cost over 30 years, by approach"})]})]})]})}function Hr(){return e.jsxs("div",{className:"sc-doc",children:[e.jsx("h3",{className:"sc-title",children:"Launch poster, three directions"}),e.jsxs("div",{className:"sc-split",children:[e.jsxs("div",{className:"sc-prose",children:[e.jsx("p",{children:"Three of them, using the same type at three weights and none of the same idea. The middle one is the safe answer."}),e.jsx("p",{children:"The third is the one I would run."})]}),e.jsx("div",{className:"sc-posters","aria-hidden":"true",children:[{bg:"linear-gradient(160deg,#f84600,#7a1d00)",bar:"72%"},{bg:"linear-gradient(160deg,#26262b,#0e0e10)",bar:"54%"},{bg:"linear-gradient(160deg,#f8f4ee,#c9c2b6)",bar:"63%",dark:!0}].map((t,a)=>e.jsxs("span",{className:"sc-poster",style:{background:t.bg},children:[e.jsx("i",{style:{width:t.bar,background:t.dark?"rgba(0,0,0,.55)":"rgba(255,255,255,.78)"}}),e.jsx("i",{style:{width:"38%",background:t.dark?"rgba(0,0,0,.28)":"rgba(255,255,255,.34)"}})]},a))})]})]})}function qr(){const t=Ba.slice(0,4),a=t[0];return e.jsxs("div",{className:"sc-agents",children:[e.jsxs("aside",{className:"sc-roster",children:[e.jsx("p",{className:"sc-roster-head",children:"Agents"}),t.map((n,s)=>e.jsxs("span",{className:`sc-agent${s===0?" sc-agent--on":""}`,children:[e.jsx("span",{className:"sc-agent-orb",children:e.jsx(de,{status:n.status,size:8,accent:n.accent})}),e.jsxs("span",{className:"sc-agent-body",children:[e.jsx("em",{children:n.name}),e.jsx("i",{children:n.mood})]})]},n.id))]}),e.jsxs("div",{className:"sc-thread",children:[e.jsxs("p",{className:"sc-thread-name",children:[e.jsx(de,{status:a.status,size:9,halo:!0,accent:a.accent}),a.name]}),e.jsx("span",{className:"sc-bubble sc-bubble--mine",children:"Keep on top of my inbox. Draft replies for anything routine."}),e.jsx("span",{className:"sc-bubble",children:"Got it. I’ll go through it every morning and leave the drafts for you."}),e.jsxs("span",{className:"sc-bubble sc-bubble--log",children:[e.jsx("em",{children:"This morning, 8:00"}),"Checked Gmail",e.jsx("br",{}),"Reviewed 12 emails",e.jsx("br",{}),"Drafted 4 replies"]})]})]})}const ot=[{id:"research",label:"Research",area:"chat",render:Or},{id:"create",label:"Create",area:"chat",render:Hr},{id:"organize",label:"Organize",area:"agents",render:qr}],Gr=[{label:"Skills",Icon:Me},{label:"Projects",Icon:Ta},{label:"Marketplace",Icon:Aa},{label:"Missions",Icon:Ma},{label:"More",Icon:Ea},{label:"Search conversations",Icon:Le}],_r=["Climate adaptation strategies","Launch poster","Q3 planning"];function Pn({tab:t}){const a=t.render;return e.jsxs("div",{className:"sc-window",children:[e.jsxs("aside",{className:"sc-rail","aria-hidden":"true",children:[e.jsxs("span",{className:"sc-new",children:[e.jsx(fe,{className:"size-[13px]"}),"New chat"]}),e.jsxs("div",{className:"sc-navs",children:[e.jsxs("span",{className:`sc-nav${t.area==="chat"?" sc-nav--on":""}`,children:[e.jsx(mt,{className:"size-[14px]"}),"Chat"]}),e.jsxs("span",{className:`sc-nav${t.area==="agents"?" sc-nav--on":""}`,children:[e.jsx(ft,{className:"size-[14px]"}),"Agents"]}),e.jsxs("span",{className:"sc-nav",children:[e.jsx(Me,{className:"size-[14px]"}),"Connectors"]})]}),e.jsx("span",{className:"sc-divider"}),e.jsx("div",{className:"sc-navs",children:Gr.map(({label:n,Icon:s})=>e.jsxs("span",{className:"sc-nav",children:[e.jsx(s,{className:"size-[14px]"}),n]},n))}),e.jsx("p",{className:"sc-recent-head",children:"Recent"}),_r.map(n=>e.jsx("span",{className:"sc-recent",children:n},n))]}),e.jsx("div",{className:"sc-main",children:e.jsx(a,{})})]})}function Yr(){const t=Ln==="all",[a,n]=l.useState(()=>{const i=ot.findIndex(o=>o.id===Ln);return i===-1?0:i});if(t)return e.jsxs("section",{className:"sc-section sc-section--all",children:[e.jsx(O,{children:ot.map(i=>e.jsxs("div",{className:"sc-stack",children:[e.jsx("div",{className:"sc-tabs",children:ot.map(o=>e.jsxs("span",{className:`sc-tab${o.id===i.id?" sc-tab--on":""}`,children:[o.label,o.id===i.id&&e.jsx("span",{className:"sc-rule"})]},o.id))}),e.jsx(Pn,{tab:i})]},i.id))}),e.jsx(Bn,{})]});const s=ot[a];return e.jsxs("section",{className:"sc-section",children:[e.jsxs(O,{children:[e.jsx("div",{className:"sc-tabs",role:"tablist","aria-label":"What Starchild is for",children:ot.map((i,o)=>e.jsxs("button",{type:"button",role:"tab","aria-selected":o===a,onClick:()=>n(o),className:`sc-tab${o===a?" sc-tab--on":""}`,children:[i.label,o===a&&e.jsx(m.span,{layoutId:"sc-underline",className:"sc-rule"})]},i.id))}),e.jsx(X,{mode:"wait",children:e.jsx(m.div,{...Ke({initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-6,transition:{duration:.16}},transition:{duration:.42,ease:[.16,1,.3,1]}}),className:"sc-main-in",children:e.jsx(Pn,{tab:s})},s.id)})]}),e.jsx(Bn,{})]})}function Bn(){return e.jsx("style",{children:`
        .sc-section {
          position: relative; overflow: hidden;
          padding: 96px 0 0; background: #050506;
        }

        .sc-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 40px; }
        .sc-tab {
          position: relative; cursor: pointer;
          padding: 8px 14px 14px; border: 0; background: none;
          font-family: var(--font-google-sans); font-size: 15px; font-weight: 500;
          color: rgba(255,255,255,.42); transition: color .2s ease;
        }
        .sc-tab:hover { color: rgba(255,255,255,.75); }
        .sc-tab--on { color: var(--color-primary); }
        .sc-tab:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; border-radius: 8px; }
        .sc-rule {
          position: absolute; left: 14px; right: 14px; bottom: 6px; height: 2px;
          border-radius: 2px; background: var(--color-primary);
        }

        .sc-window {
          position: relative; display: flex;
          max-width: 1000px; margin: 0 auto;
          height: 460px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          border-bottom: 0; border-radius: 20px 20px 0 0;
          background: #0a0a0b;
          font-family: var(--font-google-sans);
          -webkit-mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
        }

        /* A horizon, not a blob. The light comes up from under the cut edge, so it
           is wide and low and its bright half is clipped away by the section —
           explicit radii, because closest-side from a point on the bottom edge is
           zero away and the gradient collapses to nothing. */
        .sc-section::after {
          content: ""; position: absolute; left: 50%; bottom: -70px; z-index: 1;
          width: 1180px; height: 260px; transform: translateX(-50%);
          pointer-events: none;
          background: radial-gradient(62% 100% at 50% 100%, rgba(248,70,0,.5) 0%, rgba(248,70,0,.16) 46%, rgba(248,70,0,0) 78%);
        }

        /* ---------- the rail ---------- */

        .sc-rail {
          flex: none; width: 198px; padding: 16px 12px;
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,.07);
          background: #0c0c0d;
        }
        .sc-new {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 13px; border-radius: 999px; margin-bottom: 14px;
          background: var(--color-primary); color: #fff;
          font-size: 12.5px; font-weight: 500;
        }
        .sc-navs { display: flex; flex-direction: column; gap: 1px; }
        .sc-nav {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 9px; border-radius: 8px;
          font-size: 12.5px; color: rgba(255,255,255,.55);
        }
        .sc-nav svg { color: rgba(255,255,255,.38); }
        .sc-nav--on { background: rgba(255,255,255,.09); color: #fff; }
        .sc-nav--on svg { color: var(--color-primary); }

        .sc-divider { height: 1px; margin: 12px 9px 10px; background: rgba(255,255,255,.08); }

        .sc-recent-head {
          margin: 16px 0 6px 9px; font-size: 9.5px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .sc-recent {
          padding: 5px 9px; font-size: 12px; color: rgba(255,255,255,.5);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        /* ---------- the mains ---------- */

        .sc-main { flex: 1; min-width: 0; }
        .sc-main-in { height: 100%; }

        .sc-doc { padding: 30px 32px; }
        .sc-title { margin: 0 0 22px; font-size: 24px; font-weight: 500; color: #fff; }

        .sc-split { display: flex; gap: 30px; align-items: flex-start; }
        .sc-prose { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
        .sc-prose p { margin: 0; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.62); }

        .sc-card {
          flex: none; width: 224px; padding: 14px 14px 15px;
          border-radius: 14px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.03);
        }
        .sc-card-label { margin: 0 0 12px; font-size: 13px; color: rgba(255,255,255,.85); }
        .sc-art { display: block; width: 100%; height: 70px; }
        .sc-card-foot { margin: 10px 0 0; font-size: 11px; color: rgba(255,255,255,.3); }

        .sc-posters { flex: none; display: flex; gap: 10px; }
        .sc-poster {
          display: flex; flex-direction: column; justify-content: flex-end; gap: 5px;
          width: 68px; height: 96px; padding: 9px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.1);
        }
        .sc-poster i { height: 4px; border-radius: 999px; }

        /* ---------- the agents workspace ---------- */

        .sc-agents { display: flex; height: 100%; }
        .sc-roster {
          flex: none; width: 190px; padding: 16px 8px;
          border-right: 1px solid rgba(255,255,255,.06);
        }
        .sc-roster-head {
          margin: 0 0 8px 8px; font-size: 9.5px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .sc-agent { display: flex; align-items: flex-start; gap: 8px; padding: 8px; border-radius: 9px; }
        .sc-agent--on { background: rgba(255,255,255,.06); }
        .sc-agent-orb { flex: none; margin-top: 4px; }
        .sc-agent-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .sc-agent em { font-style: normal; font-size: 12.5px; font-weight: 500; color: #fff; }
        .sc-agent i {
          font-style: normal; font-size: 11px; color: rgba(255,255,255,.35);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .sc-thread {
          flex: 1; min-width: 0; padding: 14px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .sc-thread-name {
          display: flex; align-items: center; gap: 8px; margin: 0 0 8px;
          padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,.07);
          font-size: 14px; font-weight: 600; color: #fff;
        }
        .sc-bubble {
          max-width: 78%; width: fit-content; align-self: flex-start;
          padding: 9px 13px; border-radius: 14px 14px 14px 4px;
          background: rgba(255,255,255,.05);
          font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.85);
        }
        .sc-bubble--mine {
          align-self: flex-end; border-radius: 14px 14px 4px 14px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
        }
        .sc-bubble--log { color: rgba(255,255,255,.6); }
        .sc-bubble--log em {
          display: block; margin-bottom: 5px; font-style: normal;
          font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        /* Stacked for capture: every window whole, nothing masked away, and space
           between them so three frames come through as three frames. */
        .sc-section--all { padding-bottom: 96px; }
        .sc-section--all::after { display: none; }
        .sc-stack { margin-bottom: 72px; }
        .sc-stack .sc-window {
          height: auto; min-height: 420px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          border-radius: 20px;
          -webkit-mask-image: none; mask-image: none;
        }
        .sc-stack .sc-tab { cursor: default; }

        @media (max-width: 860px) {
          .sc-section { padding-top: 64px; }
          .sc-window { height: 360px; border-radius: 16px 16px 0 0; }
          .sc-rail, .sc-roster { display: none; }
          .sc-doc { padding: 22px 20px; }
          .sc-title { font-size: 20px; margin-bottom: 16px; }
          .sc-split { flex-direction: column; gap: 20px; }
          .sc-card, .sc-posters { width: 100%; }
        }
      `})}const Vr={mail:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"1.8",y:"3.4",width:"12.4",height:"9.2",rx:"1.6"}),e.jsx("path",{d:"m2.4 4.6 5.6 4 5.6-4"})]}),slack:e.jsx("path",{d:"M6.2 2.4v7.4M9.8 6.2v7.4M2.4 9.8h7.4M6.2 6.2h7.4"}),calendar:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2.2",y:"3.2",width:"11.6",height:"10.6",rx:"1.6"}),e.jsx("path",{d:"M2.2 6.5h11.6M5.4 1.8v2.6M10.6 1.8v2.6"})]}),notion:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2.6",y:"2.2",width:"10.8",height:"11.6",rx:"1.6"}),e.jsx("path",{d:"M5.4 5.2v5.6l5.2-5.6v5.6"})]}),telegram:e.jsx("path",{d:"M14.2 2.6 1.9 7.4l3.4 1.2 1.2 3.6 1.9-2.3 3.2 2.4z"}),drive:e.jsx("path",{d:"M6.2 2.2h3.6L14 9.2l-1.8 3.1H3.8L2 9.2z"}),web:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"5.9"}),e.jsx("path",{d:"M2.1 8h11.8M8 2.1c1.6 1.7 2.4 3.7 2.4 5.9S9.6 12.2 8 13.9C6.4 12.2 5.6 10.2 5.6 8s.8-4.2 2.4-5.9"})]}),flights:e.jsx("path",{d:"M2.2 9.4 14 5.2l-.9 2.5-7 4.6-1.3-.5 2-2.6-2.4.6z"})};function me({kind:t,className:a=""}){return e.jsx("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round",className:a,"aria-hidden":"true",children:Vr[t]})}const gt=[{id:"gmail",name:"Gmail",kind:"mail",what:"Mail",grants:["Read your mail","Draft replies","Send only with your approval"]},{id:"gcal",name:"Google Calendar",kind:"calendar",what:"Calendar",grants:["See your events","Suggest times","Create events with your approval"]},{id:"gdrive",name:"Google Drive",kind:"drive",what:"Files",grants:["Read files you share with it","Create new documents"]},{id:"notion",name:"Notion",kind:"notion",what:"Docs and databases",grants:["Read pages you share","Write to pages you choose"]},{id:"slack",name:"Slack",kind:"slack",what:"Team messages",grants:["Read channels you choose","Post as itself, never as you"]},{id:"telegram",name:"Telegram",kind:"telegram",what:"Messages to you",grants:["Send you messages","Never read your other chats"]},{id:"github",name:"GitHub",kind:"drive",what:"Code and issues",grants:["Read repositories you choose","Comment on issues"]},{id:"jira",name:"Jira",kind:"drive",what:"Tickets",grants:["Read issues","Move and comment with your approval"]},{id:"figma",name:"Figma",kind:"drive",what:"Design files",grants:["Read files you share","Leave comments"]},{id:"salesforce",name:"Salesforce",kind:"web",what:"Customers",grants:["Read records you choose","Update only with your approval"]},{id:"hubspot",name:"HubSpot",kind:"web",what:"Contacts and deals",grants:["Read contacts and deals","Log activity"]},{id:"linkedin",name:"LinkedIn",kind:"web",what:"Your network",grants:["Read your feed and messages","Never post as you"]},{id:"zoom",name:"Zoom",kind:"calendar",what:"Meetings",grants:["See your meetings","Read recordings you share"]},{id:"ms365",name:"Microsoft 365",kind:"mail",what:"Mail and files",grants:["Read your mail and files","Draft, never send"]}],ce=Object.fromEntries(gt.map(t=>[t.id,t])),ya=[{id:"gmail",account:"barbara@starchild.ai",since:"connected in March"},{id:"gcal",account:"barbara@starchild.ai",since:"connected in March"},{id:"notion",account:"Starchild workspace",since:"connected in April"},{id:"slack",account:"Starchild · #general",since:"connected in April"},{id:"telegram",account:"@barbara",since:"connected last week"}],rt=["gmail","gcal","gdrive","notion","slack","telegram"],Dn="52s";function Ur({orbAnchor:t,orbZone:a}={}){const n=oe(),[s,i]=l.useState(null),o=l.useRef(null),r=xt(o,{once:!0,amount:.5}),[c,p]=l.useState(ie||n?rt.length+1:0);l.useEffect(()=>{if(ie||n||!r)return;const h=[window.setTimeout(()=>p(1),120)];return rt.forEach((x,g)=>{h.push(window.setTimeout(()=>p(g+2),520+g*190))}),()=>h.forEach(window.clearTimeout)},[r,n]);const d=c>rt.length;return e.jsxs("section",{className:"co-section",ref:a,children:[e.jsx(O,{children:e.jsxs("div",{className:"co-grid",children:[e.jsxs(m.h2,{...Ke({initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.6},transition:{duration:.6,ease:[.16,1,.3,1]}}),className:"co-title",children:["Works with",e.jsx("br",{}),"what you use."]}),e.jsxs("div",{ref:o,className:`co-stage${s||!d?" co-stage--held":""}${ie?" co-stage--still":""}`,onMouseLeave:()=>i(null),children:[e.jsx("svg",{className:"co-wires",viewBox:"0 0 400 400",fill:"none","aria-hidden":"true",children:rt.map((h,x)=>e.jsx("line",{className:`co-wire${c>=x+2?" co-wire--in":""}`,x1:"200",y1:"200",x2:"200",y2:"32",transform:`rotate(${x*60} 200 200)`},h))}),e.jsx("svg",{className:"co-rings",viewBox:"0 0 400 400",fill:"none","aria-hidden":"true",children:[{rx:168,ry:168,rot:0,o:.5},{rx:168,ry:68,rot:-18,o:.34},{rx:168,ry:68,rot:62,o:.34},{rx:168,ry:68,rot:118,o:.28}].map((h,x)=>e.jsx("ellipse",{className:`co-ring${c>=1?" co-ring--in":""}`,style:{transitionDelay:`${x*90}ms`},cx:"200",cy:"200",rx:h.rx,ry:h.ry,transform:`rotate(${h.rot} 200 200)`,stroke:"var(--color-primary)",strokeOpacity:h.o,strokeWidth:"1",strokeDasharray:"2 7"},x))}),e.jsx("div",{ref:t,className:"co-core","aria-hidden":"true",children:(ie||!t)&&e.jsx(pe,{state:s?"listening":"resting",size:112})}),e.jsx("div",{className:"co-spin",children:rt.map((h,x)=>{const g=ce[h],f=s===h;return e.jsx("div",{className:`co-arm${c>=x+2?" co-arm--in":""}`,style:{"--a":`${x*60}deg`},children:e.jsxs("div",{className:"co-hold",children:[e.jsx("button",{type:"button",className:`co-chip${f?" co-chip--on":""}`,onMouseEnter:()=>i(h),onFocus:()=>i(h),onBlur:()=>i(null),"aria-label":g.name,children:e.jsx(me,{kind:g.kind,className:"size-[22px]"})}),e.jsx(X,{children:f&&e.jsxs(m.span,{initial:{opacity:0,y:4},animate:{opacity:1,y:0},exit:{opacity:0,transition:{duration:.12}},transition:{duration:.2,ease:[.16,1,.3,1]},className:"co-tip",children:[e.jsx("strong",{children:g.name}),g.what]})})]})},h)})})]})]})}),e.jsx("style",{children:`
        .co-section { position: relative; overflow: hidden; padding: 130px 0; background: #050506; }

        .co-grid {
          display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px;
          max-width: 1080px; margin: 0 auto;
        }
        .co-title {
          margin: 0; font-family: var(--font-google-sans);
          font-size: 44px; line-height: 1.12; font-weight: 600; color: #fff;
        }

        /* ---------- the system ---------- */

        .co-stage {
          position: relative; justify-self: center;
          width: 400px; height: 400px;
        }
        .co-rings, .co-wires {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }

        /* Each ring wipes itself on as the section arrives. Drawn rather than
           faded, so it reads as being laid down. */
        .co-ring {
          stroke-dasharray: 2 7; stroke-dashoffset: 0;
          opacity: 0; transition: opacity .7s ease;
        }
        .co-ring--in { opacity: 1; }

        /* The wires rotate with the system, so they are inside the spinning group
           in spirit — but they are drawn on the static layer and share its angle,
           which is cheaper than six more animated elements. */
        .co-wires { animation: co-spin  linear infinite; }
        .co-stage--held .co-wires { animation-play-state: paused; }
        .co-stage--still .co-wires { animation: none; }
        .co-wire {
          /* faint enough to read as signal rather than as structure — six solid
             spokes is a network diagram, which is the one thing this must not be */
          stroke: rgba(248,70,0,.26); stroke-width: 1;
          stroke-dasharray: 168; stroke-dashoffset: 168;
          transition: stroke-dashoffset .6s cubic-bezier(.16,1,.3,1);
        }
        .co-wire--in { stroke-dashoffset: 0; }

        /* Each connector drops into its place on the ring rather than fading in
           where it already was — the arrival is the point. */
        .co-arm {
          opacity: 0;
          transition: opacity .5s ease;
        }
        .co-arm--in { opacity: 1; }
        .co-arm--in .co-chip { transform: scale(1); }
        .co-arm:not(.co-arm--in) .co-chip { transform: scale(.4); }

        /* The anchor is the footprint: FlightOrb sizes the orb from the box it is
           flying to, so a seat with no width scales it to nothing. It landed dead
           centre and was invisible. */
        .co-core {
          position: absolute; top: 50%; left: 50%;
          width: 112px; height: 112px;
          transform: translate(-50%, -50%);
        }

        /* One element carries the rotation and every arm hangs off it, so the six
           can never drift out of formation with each other. */
        /* Both of these are stage-sized, and six of the arms are stacked on top of
           each other — left hit-testable, the topmost one swallows every pointer
           event on the section and no chip is ever reachable. */
        .co-spin {
          position: absolute; inset: 0; pointer-events: none;
          animation: co-spin ${Dn} linear infinite;
        }
        .co-arm {
          position: absolute; inset: 0; pointer-events: none;
          transform: rotate(var(--a));
        }
        /* Undoes both the arm's angle and the system's rotation, so the chip and
           its label stay upright the whole way round. */
        .co-hold {
          position: absolute; left: 50%; margin-left: -26px;
          /* 42% is the rings' rx as a share of the 400-unit viewBox, so the chips
             sit on the outer ring at any stage size rather than at its edge */
          top: calc(50% - 42% - 26px);
          width: 52px; height: 52px;
          transform: rotate(calc(var(--a) * -1));
          animation: co-unspin ${Dn} linear infinite;
        }

        @keyframes co-spin { to { transform: rotate(360deg); } }
        @keyframes co-unspin { to { transform: rotate(calc(var(--a) * -1 - 360deg)); } }

        /* Held still while a label is up. A tooltip pinned to something that keeps
           moving is a thing you have to chase. */
        .co-stage--held .co-spin,
        .co-stage--held .co-hold { animation-play-state: paused; }

        .co-chip {
          pointer-events: auto;
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.1);
          background: #141416; color: rgba(255,255,255,.82);
          transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .co-chip:hover, .co-chip--on {
          border-color: rgba(248,70,0,.75);
          transform: scale(1.08);
          box-shadow: 0 0 26px rgba(248,70,0,.35);
        }
        .co-chip:focus-visible { outline: 2px solid rgba(248,70,0,.8); outline-offset: 3px; }

        .co-tip {
          position: absolute; left: calc(100% + 12px); top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 1px;
          width: max-content; max-width: 200px;
          padding: 8px 12px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(26,26,28,.96);
          backdrop-filter: blur(10px);
          box-shadow: 0 12px 30px rgba(0,0,0,.6);
          font-family: var(--font-google-sans); font-size: 11.5px;
          color: rgba(255,255,255,.5); text-align: left; pointer-events: none;
        }
        .co-tip strong { font-size: 13px; font-weight: 500; color: #fff; }

        /* Stopped at zero, so the six chips import at the angles they were laid
           out at rather than wherever the clock had reached. The arm still turns
           and .co-hold still counters it, so each chip lands upright on the ring. */
        .co-stage--still .co-spin,
        .co-stage--still .co-hold { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .co-spin, .co-hold { animation: none; }
        }

        @media (max-width: 940px) {
          .co-section { padding: 90px 0; }
          .co-grid { grid-template-columns: 1fr; gap: 56px; justify-items: center; text-align: center; }
          .co-title { font-size: 34px; }
          .co-stage { width: 320px; height: 320px; }
          /* the label would run off the edge on the right-hand chips */
          .co-tip { left: 50%; top: calc(100% + 10px); transform: translateX(-50%); }
        }
      `})]})}const Se=[{id:"research",verb:"Research",you:"Compare these three tools and tell me which one fits my workflow best.",ai:"I'll pull the relevant differences together and focus on what actually matters for your decision."},{id:"create",verb:"Create",you:"Turn this idea into a launch plan.",ai:"I'll structure it into clear steps and help you build the first version."},{id:"work",verb:"Work",you:"Summarize this, draft the reply, and organize the next steps.",ai:"Got it. I'll handle each part and keep the context together."},{id:"automate",verb:"Automate",you:"Check this every Monday and let me know if anything changes.",ai:"I'll keep an eye on it and come back when something needs your attention.",schedule:"Every Monday · quiet until something changes"},{id:"connect",verb:"Connect",you:"Pull the latest project updates from Slack and Calendar.",ai:"I'll bring the relevant context together in one place.",tools:[{kind:"slack",label:"Slack"},{kind:"calendar",label:"Calendar"},{kind:"notion",label:"Notion"}]}];function Xr({onTry:t}){const[a,n]=l.useState(0),s=Se[a],i=oe(),o=l.useRef([]);function r(d){var x;const h=d.key==="ArrowRight"?(a+1)%Se.length:d.key==="ArrowLeft"?(a-1+Se.length)%Se.length:d.key==="Home"?0:d.key==="End"?Se.length-1:null;h!==null&&(d.preventDefault(),n(h),(x=o.current[h])==null||x.focus())}const c=i||ie,p=c?{initial:!1,animate:{},exit:{},transition:{duration:0}}:{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.26,ease:[.16,1,.3,1]}};return e.jsxs("section",{className:"ex-section",children:[e.jsxs(m.div,{...Ke({initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.25},transition:{duration:.6,ease:[.16,1,.3,1]}}),className:"ex-grid",children:[e.jsxs("div",{className:"ex-say",children:[e.jsx("p",{className:"ex-eyebrow",children:"Explore Starchild"}),e.jsx("div",{role:"tablist","aria-label":"Ways to use Starchild",className:"ex-tabs",onKeyDown:r,children:Se.map((d,h)=>{const x=h===a;return e.jsxs("button",{ref:g=>{o.current[h]=g},type:"button",role:"tab",id:`ex-tab-${d.id}`,"aria-selected":x,"aria-controls":"ex-panel",tabIndex:x?0:-1,onClick:()=>n(h),className:x?"ex-tab ex-tab--on":"ex-tab",children:[d.verb,x&&(c?e.jsx("span",{className:"ex-rule"}):e.jsx(m.span,{layoutId:"ex-rule",className:"ex-rule"}))]},d.id)})}),e.jsxs("h2",{className:"ex-title",children:[e.jsx("span",{className:"ex-slot",children:Se.map((d,h)=>e.jsx("span",{"aria-hidden":h!==a,className:h===a?"ex-word ex-word--on":"ex-word",children:d.verb},d.id))}),e.jsx("span",{className:"ex-rest",children:"with Starchild"})]}),e.jsx("button",{type:"button",onClick:()=>t(s.you),className:"ex-try",children:"Try this"})]}),e.jsx("div",{className:"ex-stage",children:e.jsx("div",{id:"ex-panel",role:"tabpanel","aria-labelledby":`ex-tab-${s.id}`,className:"ex-panel",children:e.jsx(X,{mode:"wait",initial:!1,children:e.jsxs(m.div,{...p,className:"ex-demo",children:[e.jsx("p",{className:"ex-said ex-said--mine",children:s.you}),e.jsxs("div",{className:"ex-row",children:[e.jsx("span",{className:"ex-face","aria-hidden":"true",children:e.jsx(pe,{state:"resting",size:30})}),e.jsx("p",{className:"ex-said ex-said--ai",children:s.ai})]}),s.tools&&e.jsx("div",{className:"ex-trail",children:s.tools.map(d=>e.jsxs("span",{className:"ex-chip",children:[e.jsx(me,{kind:d.kind,className:"size-[13px] opacity-70"}),d.label]},d.label))}),s.schedule&&e.jsx("div",{className:"ex-trail",children:e.jsxs("span",{className:"ex-chip ex-chip--live",children:[e.jsx("span",{className:"ex-pulse","aria-hidden":"true"}),s.schedule]})})]},s.id)})})})]}),e.jsx("style",{children:`
        .ex-section {
          position: relative; overflow: hidden;
          padding: 130px 0 140px; background: #050506;
        }

        .ex-grid {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center; gap: 64px;
          max-width: 1080px; margin: 0 auto; padding: 0 24px;
          font-family: var(--font-google-sans);
        }

        /* ---------- the left half: what you are choosing ---------- */

        .ex-eyebrow {
          margin: 0 0 22px;
          font-size: 11px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.38);
        }

        /* Pulled left by the first tab's own padding so the row starts on the same
           line as the title under it. Without it the tabs sit sixteen pixels in
           and the whole column looks like two columns. */
        .ex-tabs { display: flex; flex-wrap: wrap; gap: 2px; margin-left: -16px; }

        /* 44 tall including the padding: this is the only control in the section
           that gets pressed repeatedly, so it is sized to be pressed. */
        .ex-tab {
          position: relative;
          padding: 11px 16px 13px; border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 15px; font-weight: 500; line-height: 1.25;
          color: rgba(255,255,255,.42);
          transition: color .18s ease;
        }
        .ex-tab:hover { color: rgba(255,255,255,.74); }
        .ex-tab--on { color: #fff; }
        .ex-tab:focus-visible {
          outline: 2px solid rgba(248,70,0,.75); outline-offset: 2px; border-radius: 10px;
        }

        .ex-rule {
          position: absolute; left: 16px; right: 16px; bottom: 2px; height: 2px;
          border-radius: 2px; background: #f84600;
          box-shadow: 0 0 12px rgba(248,70,0,.5);
        }

        .ex-title {
          margin: 26px 0 0;
          font-size: clamp(38px, 4.4vw, 60px); line-height: 1.06; font-weight: 600;
          letter-spacing: -.025em; color: #fff;
        }

        /* The hole the changing word sits in. Its own line, so nothing after it
           can be moved by it; its height is the line box, and the width is
           irrelevant because everything inside is left-aligned. */
        .ex-slot { position: relative; display: block; height: 1.06em; }

        /* Orange, because it is the only word here that answers the tabs — the
           accent is doing the pointing, not decorating the headline. */
        .ex-word {
          position: absolute; left: 0; top: 0; white-space: nowrap;
          color: #f84600;
          opacity: 0; transition: opacity .22s ease;
        }
        .ex-word--on { opacity: 1; }

        .ex-rest { display: block; }

        .ex-try {
          margin-top: 34px;
          padding: 13px 26px; border: 0; border-radius: 999px; cursor: pointer;
          background: #f84600; color: #fff;
          font-family: inherit; font-size: 15px; font-weight: 500; line-height: 1;
          transition: filter .18s ease, transform .18s ease;
        }
        .ex-try:hover { filter: brightness(1.08); }
        .ex-try:active { transform: translateY(1px); }
        .ex-try:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        /* ---------- the right half: what it looks like ---------- */

        .ex-stage { position: relative; }

        .ex-panel {
          position: relative; z-index: 1;
          padding: 26px 26px 28px;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.035);
          backdrop-filter: blur(16px);
          /* Measured against the tallest of the five. Below it the panel grew and
             shrank on every press and the column jumped on the way — a row of tabs
             that moves the thing beside it. */
          min-height: 266px;
          display: flex; flex-direction: column; justify-content: center;
        }

        .ex-demo { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }

        /* Bottom, not centre: the orb belongs to the corner the bubble points
           with. Centred against a two-line reply it floats in the middle of the
           text and stops being attached to anything. */
        .ex-row { display: flex; align-items: flex-end; gap: 10px; max-width: 100%; }
        .ex-face { flex: none; display: block; margin-bottom: 1px; }

        /* One square corner each, on the side the line is coming from — the
           bottom-left of a reply, the bottom-right of a question. It is the
           oldest speech-bubble device there is and it does the whole job of a
           tail without drawing one: the corner points at the speaker, so
           Starchild's points at its orb and yours points off the edge at you. */
        .ex-said {
          max-width: 34ch; margin: 0;
          padding: 13px 18px; border-radius: 19px;
          font-size: 15.5px; line-height: 1.5;
        }

        /* Yours is quieter: you are asking, it is answering. */
        .ex-said--mine {
          align-self: flex-end;
          border-bottom-right-radius: 0;
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.68);
        }

        /* Starchild's is the only warm surface in the panel — the same orange as
           the orb behind it and the word in the title, at the weight of a tint
           rather than a fill. It is who is speaking, said in colour instead of
           with an avatar. */
        .ex-said--ai {
          border-bottom-left-radius: 0;
          border: 1px solid rgba(248,70,0,.22);
          background: linear-gradient(135deg, rgba(248,70,0,.26) 0%, rgba(248,70,0,.07) 100%);
          color: rgba(255,255,255,.94);
          /* the only light in the panel now, and it comes from the side
             Starchild speaks from — the atmosphere and the presence saying the
             same thing twice */
          box-shadow: 0 0 46px rgba(248,70,0,.13);
        }

        /* lined up with the bubble above it, not with the orb */
        .ex-trail { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 2px; margin-left: 40px; }

        .ex-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          font-size: 12.5px; line-height: 1; color: rgba(255,255,255,.6);
        }
        .ex-chip--live { border-color: rgba(248,70,0,.32); color: rgba(255,255,255,.74); }

        .ex-pulse {
          width: 6px; height: 6px; border-radius: 999px; background: #f84600;
          animation: ex-breathe 2.6s ease-in-out infinite;
        }
        @keyframes ex-breathe {
          0%, 100% { opacity: .45; transform: scale(.82); }
          50%      { opacity: 1;   transform: scale(1); }
        }

        @media (max-width: 900px) {
          .ex-section { padding: 90px 0 96px; }
          .ex-grid { grid-template-columns: 1fr; gap: 44px; padding: 0 20px; }
          .ex-title { font-size: clamp(34px, 8vw, 46px); }
          .ex-orb { left: 50%; }
          /* the floor is re-measured here: the lines wrap differently at this
             width, so the tallest state is not the same one it is on a desktop */
          .ex-panel { padding: 20px 18px 22px; border-radius: 22px; min-height: 286px; }
          .ex-said { max-width: 100%; font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ex-pulse { animation: none; opacity: .85; }
          .ex-word { transition: none; }
        }
      `})]})}function Kr(){return e.jsxs("div",{className:"ar-chat",children:[e.jsxs("div",{className:"ar-thread",children:[e.jsx("p",{className:"ar-said ar-said--mine",children:"Can you help me decide what to cook tonight? I'd rather not go to the shop, so only what's already in the fridge."}),e.jsx("p",{className:"ar-said",children:"Tell me what you have and I'll work with it. A random-looking pile of ingredients is usually the more interesting problem."}),e.jsx("p",{className:"ar-said ar-said--mine",children:"Chicken thighs, broccoli, carrots, garlic and a lemon, plus the usual cupboard things."}),e.jsx("p",{className:"ar-said",children:"That's a lemon and garlic traybake with the broccoli thrown in for the last ten minutes. Want the timings?"})]}),e.jsxs("div",{className:"ar-composer",children:[e.jsx("span",{className:"ar-composer-ph",children:"Ask anything"}),e.jsx("span",{className:"ar-composer-go",children:e.jsx(J,{className:"size-[13px]"})})]})]})}function Zr(){return e.jsxs("div",{className:"ar-pane",children:[e.jsxs("div",{className:"ar-pane-head",children:[e.jsx("h3",{className:"ar-pane-title",children:"Agents"}),e.jsx("span",{className:"ar-pane-note",children:"5 running"})]}),e.jsx("div",{className:"ar-roster",children:Ba.slice(0,5).map(t=>e.jsxs("div",{className:"ar-row",children:[e.jsx("span",{className:"ar-row-orb",children:e.jsx(de,{status:t.status,size:9,accent:t.accent})}),e.jsxs("span",{className:"ar-row-body",children:[e.jsx("span",{className:"ar-row-name",children:t.name}),e.jsx("span",{className:"ar-row-mood",children:t.mood})]}),e.jsx("span",{className:"ar-row-when",children:t.lastActive})]},t.id))})]})}function Qr(){return e.jsxs("div",{className:"ar-pane",children:[e.jsxs("div",{className:"ar-pane-head",children:[e.jsx("h3",{className:"ar-pane-title",children:"Connectors"}),e.jsxs("span",{className:"ar-pane-note",children:[ya.length," connected"]})]}),e.jsx("div",{className:"ar-tools",children:ya.map(t=>{const a=ce[t.id];return e.jsxs("div",{className:"ar-tool",children:[e.jsx("span",{className:"ar-tool-icon",children:e.jsx(me,{kind:a.kind,className:"size-[15px]"})}),e.jsxs("span",{className:"ar-row-body",children:[e.jsx("span",{className:"ar-row-name",children:a.name}),e.jsx("span",{className:"ar-row-mood",children:t.account})]}),e.jsx("span",{className:"ar-tool-on",children:"Connected"})]},t.id)})})]})}const On=[{id:"chat",name:"Chat",lead:"For questions, learning and everyday help.",copy:"Ask about anything, think a decision through, draft the message you have been putting off, compare options, or work out what to do next. One conversation, and it keeps the context.",render:Kr},{id:"agents",name:"Agents",lead:"For the work you would rather not ask for twice.",copy:"Hand over the things that repeat — a check every Monday, a watch on a price, an inbox kept down to what needs you. They run on their own and come back when there is something worth interrupting you for.",render:Zr},{id:"connectors",name:"Connectors",lead:"For the tools your work already lives in.",copy:"Connect Gmail, Calendar, Slack or Notion once, to your account. After that, letting an agent use one is a permission rather than another login — and you can see exactly what each of them is allowed to do.",render:Qr}];function Jr(){const[t,a]=l.useState(0),n=On[t],s=n.render;return e.jsxs("section",{className:"ar-section",children:[e.jsx(O,{children:e.jsxs(m.div,{...Ke({initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.25},transition:{duration:.6,ease:[.16,1,.3,1]}}),className:"ar-grid",children:[e.jsx("div",{className:"ar-list",children:On.map((i,o)=>{const r=o===t;return e.jsxs("div",{className:r?"ar-item ar-item--on":"ar-item",children:[e.jsx("h2",{className:"ar-name",children:e.jsx("button",{type:"button","aria-expanded":r,"aria-controls":`ar-panel-${i.id}`,onClick:()=>a(o),className:"ar-head",children:i.name})}),e.jsx(X,{initial:!1,children:r&&e.jsxs(m.div,{id:`ar-panel-${i.id}`,initial:ie?!1:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"ar-copybox",children:[e.jsx("p",{className:"ar-lead",children:i.lead}),e.jsx("p",{className:"ar-copy",children:i.copy})]})})]},i.id)})}),e.jsx("div",{className:"ar-stage",children:e.jsxs("div",{className:"ar-browser",children:[e.jsxs("div",{className:"ar-chrome","aria-hidden":"true",children:[e.jsxs("span",{className:"ar-lights",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]}),e.jsxs("span",{className:"ar-url",children:[e.jsx(Le,{className:"size-[11px]"}),"starchild.ai"]})]}),e.jsxs("div",{className:"ar-app",children:[e.jsxs("aside",{className:"ar-rail","aria-hidden":"true",children:[e.jsxs("span",{className:"ar-new",children:[e.jsx(fe,{className:"size-[12px]"}),"New chat"]}),e.jsxs("div",{className:"ar-navs",children:[e.jsxs("span",{className:`ar-nav${n.id==="chat"?" ar-nav--on":""}`,children:[e.jsx(mt,{className:"size-[13px]"}),"Chat"]}),e.jsxs("span",{className:`ar-nav${n.id==="agents"?" ar-nav--on":""}`,children:[e.jsx(ft,{className:"size-[13px]"}),"Agents"]}),e.jsxs("span",{className:`ar-nav${n.id==="connectors"?" ar-nav--on":""}`,children:[e.jsx(Me,{className:"size-[13px]"}),"Connectors"]})]}),e.jsx("p",{className:"ar-recent-head",children:"Recent"}),["Dinner from what's in the fridge","Plan next week","Compare the three tools"].map(i=>e.jsx("span",{className:"ar-recent",children:i},i))]}),e.jsx("div",{className:"ar-main",children:e.jsx(X,{mode:"wait",initial:!1,children:e.jsx(m.div,{initial:ie?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.24,ease:[.16,1,.3,1]},className:"ar-main-in",children:e.jsx(s,{})},n.id)})})]})]})})]})}),e.jsx("style",{children:`
        .ar-section { position: relative; overflow: hidden; padding: 130px 0; background: #050506; }

        .ar-grid {
          display: grid; grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
          gap: 72px; align-items: center;
          max-width: 1160px; margin: 0 auto;
          font-family: var(--font-google-sans);
        }

        /* ---------- the left column: heading and navigation at once ---------- */

        .ar-item { border-bottom: 1px solid rgba(255,255,255,.09); }
        .ar-item:first-child .ar-head { padding-top: 0; }

        .ar-name { margin: 0; }
        .ar-head {
          width: 100%; padding: 26px 0; border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 30px; line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; text-align: left;
          color: rgba(255,255,255,.42);
          transition: color .2s ease;
        }
        .ar-head:hover { color: rgba(255,255,255,.72); }
        .ar-item--on .ar-head { color: #fff; padding-bottom: 18px; }
        .ar-head:focus-visible { outline: 2px solid rgba(248,70,0,.75); outline-offset: 3px; border-radius: 8px; }

        /* overflow hidden so the height animation has something to clip */
        .ar-copybox { overflow: hidden; }

        .ar-lead {
          margin: 0 0 18px; max-width: 30ch;
          font-size: 17px; line-height: 1.45; font-weight: 600; color: #fff;
        }
        .ar-copy {
          margin: 0 0 28px; max-width: 38ch;
          font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.55);
        }

        /* ---------- the right column: the product, in a browser ---------- */

        .ar-stage { position: relative; }

        /* the light the window throws onto the page it is sitting on */
        .ar-stage::before {
          content: ""; position: absolute; inset: -12% -6%; z-index: 0; pointer-events: none;
          background: radial-gradient(52% 52% at 50% 46%, rgba(248,70,0,.13) 0%, rgba(248,70,0,0) 72%);
        }

        .ar-browser {
          position: relative; z-index: 1;
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          background: #0a0a0b;
          box-shadow: 0 30px 80px rgba(0,0,0,.6);
        }

        .ar-chrome {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          background: #131315;
        }
        .ar-lights { display: flex; gap: 6px; }
        .ar-lights i { width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.16); }
        .ar-lights i:first-child { background: #ff5f57; }
        .ar-lights i:nth-child(2) { background: #febc2e; }
        .ar-lights i:last-child { background: #28c840; }

        .ar-url {
          display: inline-flex; align-items: center; gap: 7px;
          flex: 1; padding: 5px 12px; border-radius: 999px;
          background: rgba(255,255,255,.06);
          font-size: 11.5px; color: rgba(255,255,255,.5);
        }
        .ar-url svg { color: rgba(255,255,255,.32); }

        .ar-app { display: flex; height: 424px; }

        .ar-rail {
          flex: none; width: 168px; padding: 14px 10px;
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(255,255,255,.07);
          background: #0c0c0d;
        }
        .ar-new {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 12px; border-radius: 999px; margin-bottom: 12px;
          background: var(--color-primary); color: #fff;
          font-size: 12px; font-weight: 500;
        }
        .ar-navs { display: flex; flex-direction: column; gap: 1px; }
        .ar-nav {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 8px; border-radius: 8px;
          font-size: 12px; color: rgba(255,255,255,.55);
          transition: background-color .2s ease, color .2s ease;
        }
        .ar-nav svg { color: rgba(255,255,255,.38); }
        .ar-nav--on { background: rgba(255,255,255,.09); color: #fff; }
        .ar-nav--on svg { color: var(--color-primary); }

        .ar-recent-head {
          margin: 18px 0 6px 8px; font-size: 9px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25);
        }
        .ar-recent {
          padding: 5px 8px; font-size: 11.5px; color: rgba(255,255,255,.48);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ar-main { flex: 1; min-width: 0; }
        .ar-main-in { height: 100%; }

        /* ---------- chat ---------- */

        .ar-chat { display: flex; flex-direction: column; height: 100%; padding: 20px 22px 18px; }
        .ar-thread { flex: 1; display: flex; flex-direction: column; gap: 14px; }

        .ar-said {
          max-width: 76%; margin: 0;
          font-size: 12.5px; line-height: 1.55; color: rgba(255,255,255,.86);
        }
        /* Yours is in a bubble and Starchild's is not — the same asymmetry the
           product uses, and the reason a long answer never looks like a wall. */
        .ar-said--mine {
          align-self: flex-end;
          padding: 10px 14px; border-radius: 16px;
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.78);
        }

        .ar-composer {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          margin-top: 16px; padding: 10px 10px 10px 15px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.04);
        }
        .ar-composer-ph { font-size: 12.5px; color: rgba(255,255,255,.34); }
        .ar-composer-go {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px;
          background: var(--color-primary); color: #fff;
        }

        /* ---------- agents and connectors share a shell ---------- */

        .ar-pane { padding: 20px 22px; }
        .ar-pane-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 16px;
        }
        .ar-pane-title { margin: 0; font-size: 17px; font-weight: 500; color: #fff; }
        .ar-pane-note { font-size: 11.5px; color: rgba(255,255,255,.4); }

        .ar-roster, .ar-tools { display: flex; flex-direction: column; }

        .ar-row, .ar-tool {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 10px; border-radius: 10px;
        }
        .ar-row + .ar-row, .ar-tool + .ar-tool { border-top: 1px solid rgba(255,255,255,.05); }

        .ar-row-orb { flex: none; display: flex; width: 14px; justify-content: center; }
        .ar-tool-icon {
          flex: none; display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.7);
        }

        .ar-row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .ar-row-name { font-size: 12.5px; color: #fff; }
        .ar-row-mood {
          font-size: 11.5px; color: rgba(255,255,255,.45);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ar-row-when { flex: none; font-size: 11px; color: rgba(255,255,255,.3); }
        .ar-tool-on { flex: none; font-size: 11px; color: rgba(255,255,255,.4); }

        @media (max-width: 1000px) {
          .ar-section { padding: 90px 0; }
          .ar-grid { grid-template-columns: 1fr; gap: 44px; }
          .ar-head { font-size: 26px; padding: 20px 0; }
          .ar-app { height: 380px; }
          .ar-rail { display: none; }
        }
      `})]})}function el({onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}){const p=l.useRef(null),[d,h]=l.useState("resting"),x=l.useRef(null),g=l.useRef(null),f=l.useRef(null),u=l.useRef(null),b=l.useRef(null),y=l.useRef(null),w=l.useMemo(()=>[{ref:x,clip:g},{ref:u,at:.72},{ref:b,zone:y,above:!0}],[]),k=()=>t();return e.jsxs("div",{children:[!ie&&e.jsx(Wa,{}),!ie&&e.jsx(Br,{stops:w,state:d}),e.jsx(Ar,{orbAnchor:x,orbClip:g,onOrbState:h,onEnterGuest:t,onStartTask:a,onNavigateTraders:n,onNavigateConductorMode:s,onOpenMarketplace:i,onNavigatePricing:o,onLogIn:r,onSignUp:c}),e.jsx(Lr,{orbExit:u,orbZone:f}),e.jsx(Ur,{orbAnchor:b,orbZone:y}),e.jsx(Xr,{onTry:N=>t(N)}),e.jsx(Jr,{}),e.jsx("div",{ref:p,children:e.jsx(bt,{showBenefits:!1})}),e.jsx(Yr,{}),e.jsx(je,{onStartFree:k,headline:"Whatever comes next, Starchild is already with you."})]})}const tl={rx:15.5,t:14,b:14,rot:20,dx:0,dy:0},se=(t={})=>({...tl,...t}),Pt={neutral:{left:se({rot:20}),right:se({rot:-20})},down:{left:se({rx:15,t:10,b:10,rot:0,dy:9}),right:se({rx:15,t:10,b:10,rot:0,dy:9})},curious:{left:se({rx:12,t:11,b:11,rot:0,dy:2}),right:se({rx:17,t:16,b:16,rot:-22})},happy:{left:se({rx:17,t:18,b:-12,rot:-11,dx:-1,dy:3}),right:se({rx:17,t:18,b:-12,rot:11,dx:1,dy:3})},focused:{left:se({rx:17,t:7,b:7,rot:17}),right:se({rx:17,t:7,b:7,rot:-17})},skeptical:{left:se({rx:15,t:4,b:13,rot:14,dy:3}),right:se({rx:16,t:14,b:14,rot:-20})},surprised:{left:se({rx:17,t:21,b:21,rot:0}),right:se({rx:17,t:21,b:21,rot:0})},sleepy:{left:se({rx:16,t:-6,b:16,rot:-10,dy:8}),right:se({rx:16,t:-6,b:16,rot:-10,dy:8})},concerned:{left:se({rx:15,t:19,b:-11,rot:18,dx:-1,dy:4}),right:se({rx:15,t:19,b:-11,rot:-18,dx:1,dy:4})}},al={t:2,b:2},nl=["neutral","down","curious","surprised","skeptical","focused"],wa={y:50,gap:22},Hn=t=>Math.round(t*100)/100;function qn(t,a){const n=t.rot*Math.PI/180,s=Math.cos(n),i=Math.sin(n),o=(r,c)=>`${Hn(a+t.dx+r*s-c*i)} ${Hn(wa.y+t.dy+r*i+c*s)}`;return`M ${o(-t.rx,0)} C ${o(-t.rx,-t.t)} ${o(t.rx,-t.t)} ${o(t.rx,0)} C ${o(t.rx,t.b)} ${o(-t.rx,t.b)} ${o(-t.rx,0)} Z`}const sl={type:"spring",stiffness:200,damping:20,mass:.7};function Rs({mood:t="neutral",size:a=180,gaze:n={x:0,y:0},className:s}){const i=oe(),[o,r]=l.useState(!1),c=l.useRef([]);l.useEffect(()=>{if(i||!nl.includes(t)){r(!1);return}let u=!0;const b=()=>{const y=window.setTimeout(()=>{u&&(r(!0),c.current.push(window.setTimeout(()=>{u&&(r(!1),b())},110)))},2600+Math.random()*4200);c.current.push(y)};return b(),()=>{u=!1,c.current.forEach(window.clearTimeout),c.current=[]}},[t,i]);const p=Pt[t]??Pt.neutral,d=u=>o?{...u,...al}:u,h=qn(d(p.left),50-wa.gap),x=qn(d(p.right),50+wa.gap),g=i?0:a*.026,f=i?{duration:0}:sl;return e.jsxs("span",{className:`of-root${s?` ${s}`:""}`,style:{width:a,height:a},children:[e.jsx(pe,{state:"resting",size:a}),e.jsxs(m.svg,{className:"of-eyes",viewBox:"0 0 100 100","aria-hidden":"true",animate:{x:n.x*g,y:n.y*g},transition:{type:"spring",stiffness:90,damping:18},children:[e.jsx("defs",{children:e.jsxs("radialGradient",{id:"of-eye",cx:"50%",cy:"34%",r:"72%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFF7EC"}),e.jsx("stop",{offset:"100%",stopColor:"#FFD7A2"})]})}),e.jsx(m.path,{initial:!1,animate:{d:h},transition:f,d:h,fill:"url(#of-eye)"}),e.jsx(m.path,{initial:!1,animate:{d:x},transition:f,d:x,fill:"url(#of-eye)"})]}),e.jsx("style",{children:`
        .of-root { position: relative; display: inline-flex; }

        /* Over the orb, and taking no pointer events: the hero listens on the orb
           itself, and a transparent square on top would eat the hover the face is
           supposed to be reacting to. */
        .of-eyes {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none;
          filter: drop-shadow(0 0 5px rgba(255, 226, 190, .8));
        }
      `})]})}function Da({onNavigateHome:t,onNavigatePricing:a,onLogIn:n,onSignUp:s}){return e.jsxs("header",{className:"hf-header",children:[e.jsx(O,{className:"w-full",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-7 w-auto"})}),e.jsxs("div",{className:"flex items-center gap-2",children:[a&&e.jsx("button",{type:"button",onClick:a,className:"hf-pricing",children:"Pricing"}),e.jsx("button",{type:"button",onClick:n,className:"hf-login",children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"hf-signup",children:"Sign up"})]})]})}),e.jsx("style",{children:`
        .hf-header { position: relative; z-index: 20; padding: 18px 0; }

        .hf-login {
          padding: 8px 12px; border: 0; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 14px; line-height: 1;
          color: rgba(var(--lf-ink-rgb), calc(.62 + 0.38 * var(--lf-lift-t)));
          transition: color .18s ease;
        }
        .hf-pricing {
          padding: 8px 10px; border: 0; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 14px; line-height: 1;
          color: rgba(var(--lf-ink-rgb), calc(.62 + 0.38 * var(--lf-lift-t))); transition: color .18s ease;
        }
        .hf-pricing:hover { color: var(--lf-ink); }
        .hf-pricing:focus-visible { outline: 2px solid rgba(var(--lf-ink-rgb), calc(.55 + 0.45 * var(--lf-lift-e))); outline-offset: 2px; border-radius: 999px; }
        .hf-login:hover { color: var(--lf-ink); }
        .hf-login:focus-visible { outline: 2px solid rgba(var(--lf-ink-rgb), calc(.55 + 0.45 * var(--lf-lift-e))); outline-offset: 2px; border-radius: 999px; }

        .hf-signup {
          padding: 9px 16px; border: 1px solid var(--lf-ctl-edge); border-radius: 999px; cursor: pointer;
          background: rgba(var(--lf-ink-rgb), calc(.08 + 0.92 * var(--lf-lift-f)));
          font-family: var(--font-google-sans); font-size: 14px; font-weight: 500; line-height: 1;
          color: var(--lf-ink);
          transition: background-color .18s ease, border-color .18s ease;
        }
        .hf-signup:hover { background: rgba(var(--lf-ink-rgb), calc(.13 + 0.87 * var(--lf-lift-f))); border-color: var(--lf-ctl-edge-on); }
        .hf-signup:focus-visible { outline: 2px solid var(--lf-ink); outline-offset: 2px; }
      `})]})}const il="data:image/svg+xml,%3csvg%20width='1472'%20height='1435'%20viewBox='0%200%201472%201435'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1472%200C1472%20188.447%201433.82%20375.049%201359.65%20549.151C1285.47%20723.253%201176.75%20881.446%201039.69%201014.7C902.63%201147.95%20739.917%201253.65%20560.841%201325.77C381.764%201397.88%20189.831%201435%20-4.00006%201435L-4%200H1472Z'%20fill='url(%23paint0_radial_95_333)'%20fill-opacity='0.31'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_95_333'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(-4)%20rotate(90)%20scale(1435%201476)'%3e%3cstop%20stop-color='%23F84600'/%3e%3cstop%20offset='1'%20stop-color='%23F84600'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e",Gn=["What do you want to get done?","Help me figure this out.","Turn this idea into a plan.","Research this for me.","Organize what’s on my plate.","Write a first draft.","Keep this moving for me."],_n=()=>2500+Math.random()*1500;function $s({onEnterGuest:t,onStartTask:a,onNavigateHome:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}){const[r,c]=l.useState(""),[p,d]=l.useState(0);r.trim().length>0,l.useEffect(()=>{let $=0;const E=()=>{d(A=>(A+1)%Gn.length),$=window.setTimeout(E,_n())};return $=window.setTimeout(E,_n()),()=>window.clearTimeout($)},[]);const[h,x]=l.useState(null),[g,f]=l.useState(!1),[u,b]=l.useState(!1),[y,w]=l.useState(!1),[k,N]=l.useState({x:0,y:0}),C=l.useRef(null),S=l.useRef(null),v=Ls(),L=l.useCallback(($,E)=>{C.current&&window.clearTimeout(C.current),x($),C.current=window.setTimeout(()=>x(null),E)},[]);l.useEffect(()=>()=>{C.current&&window.clearTimeout(C.current)},[]),l.useEffect(()=>{let $=0;const E=()=>{f(!1),window.clearTimeout($),$=window.setTimeout(()=>f(!0),18e3)};E();const A=["pointermove","pointerdown","keydown","scroll"];return A.forEach(F=>window.addEventListener(F,E,{passive:!0})),()=>{window.clearTimeout($),A.forEach(F=>window.removeEventListener(F,E))}},[]),l.useEffect(()=>{const $=E=>{var Q;const A=(Q=S.current)==null?void 0:Q.getBoundingClientRect();if(!A)return;const F=A.left+A.width/2,B=A.top+A.height/2,_=U=>Math.max(-1,Math.min(1,U));N({x:_((E.clientX-F)/(window.innerWidth/2)),y:_((E.clientY-B)/(window.innerHeight/2))})};return window.addEventListener("pointermove",$,{passive:!0}),()=>window.removeEventListener("pointermove",$)},[]);const W=l.useRef(!1);l.useEffect(()=>{if(r.length>0){W.current=!0;return}W.current&&(W.current=!1,L("skeptical",1400))},[r,L]);const D=l.useRef(null);l.useEffect(()=>()=>{D.current&&window.clearTimeout(D.current)},[]);const j=()=>{const $=r.trim();if(!$){L("concerned",1500);return}L("happy",1600),D.current=window.setTimeout(()=>t($),420)};return e.jsxs("section",{className:"hero-f relative flex min-h-screen flex-col overflow-visible",children:[e.jsx("img",{className:"hf-hero-gradient",src:il,alt:"","aria-hidden":"true"}),e.jsx(Da,{onNavigateHome:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-24",children:e.jsx(O,{className:"w-full",children:e.jsxs(m.div,{initial:{opacity:0,y:48},animate:{opacity:1,y:48},transition:{duration:.8,ease:[.16,1,.3,1]},className:"mx-auto flex max-w-[640px] flex-col items-center text-center",children:[e.jsx(m.div,{ref:S,initial:{opacity:0,scale:.94},animate:{opacity:1,scale:1},transition:{duration:.9,ease:[.16,1,.3,1]},className:"hf-orb",onPointerEnter:()=>b(!0),onPointerLeave:()=>b(!1),onPointerDown:()=>L("surprised",1100),children:e.jsx("span",{ref:v,className:"hf-lean",children:e.jsx(pe,{state:"resting",size:128})})}),e.jsx(m.h1,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.6,delay:.25,ease:[.16,1,.3,1]},className:"hf-line",children:"One AI for everything that matters to you."}),e.jsxs(m.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.55,delay:.35},className:"hf-box",children:[e.jsx("textarea",{value:r,onChange:$=>c($.target.value),onFocus:()=>w(!0),onBlur:()=>w(!1),onKeyDown:$=>{$.key==="Enter"&&!$.shiftKey&&($.preventDefault(),j())},rows:2,placeholder:Gn[p],className:"hf-input","aria-label":"What do you want to get done?"}),e.jsxs("div",{className:"hf-foot",children:[e.jsxs("button",{type:"button",className:"hf-mode",children:["Conductor Mode",e.jsx(Ve,{className:"hf-chevron size-3"})]}),e.jsx("button",{type:"button",onClick:j,className:"hf-send","aria-label":"Send",children:e.jsx(J,{className:"size-4"})})]})]}),e.jsx(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,delay:.5,ease:[.16,1,.3,1]},className:"hf-intents",children:e.jsx(ut,{onStartTask:a,intents:qt,align:"center"})})]})})}),e.jsx("style",{children:`
        .hero-f { background: transparent; }
        .hf-hero-gradient {
          position: absolute; z-index: 0; top: 0; left: 0;
          width: min(72vw, 1059.84px); height: auto; max-width: none;
          pointer-events: none; user-select: none;
        }

        /* The orb is a control here — it answers to hover and to being pressed —
           so it says so. */
        .hf-orb { align-self: center; cursor: pointer; }
        .hf-lean { display: block; will-change: transform; }

        .hf-line {
          margin: 60px 0 0;
          font-family: var(--font-google-sans);
          font-size: 24px; line-height: 1.3; font-weight: 500;
          color: var(--lf-ink); text-wrap: balance;
        }

        /* Taller than one line needs, deliberately — see the note above. */
        .hf-box {
          position: relative; width: 100%; margin-top: 38px;
          padding: 18px 18px 14px;
          border-radius: 24px;
          border: 1px solid var(--lf-ctl-edge);
          background: var(--lf-field);
          backdrop-filter: blur(10px);
          transition: border-color .2s ease, background-color .2s ease;
        }
        .hf-box:focus-within { border-color: var(--lf-ctl-edge-on); background: var(--lf-field-on); }

        .hf-input {
          width: 100%; resize: none; border: 0; background: none; outline: none;
          font-family: var(--font-google-sans); font-size: 16px; line-height: 1.55;
          color: var(--lf-ink); text-align: left;
        }
        /* .44 rather than .34. On the new field it is the difference between
           4.0:1 and 4.6:1, and on the dark page — where this had been sitting at
           2.96:1 against #050506 the whole time — between failing and 4.3:1. It
           is the one line in the composer somebody reads before they have typed
           anything. */
        .hf-input::placeholder { color: rgba(var(--lf-ink-rgb), calc(.44 + 0.56 * var(--lf-lift-t))); }

        /* Both controls to the right, and nothing on the left. The row is what
           you do with what you have written, so it belongs beside the send. */
        .hf-foot {
          display: flex; align-items: center; justify-content: flex-end; gap: 12px;
          margin-top: 10px;
        }

        .hf-mode {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 8px; border: 0; border-radius: 999px; background: none; cursor: pointer;
          font-family: var(--font-google-sans); font-size: 13px; line-height: 1;
          color: rgba(var(--lf-ink-rgb), calc(.55 + 0.45 * var(--lf-lift-t)));
          transition: color .18s ease, background-color .18s ease;
        }
        .hf-mode:hover { color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); background: rgba(var(--lf-ink-rgb), calc(.05 + 0.95 * var(--lf-lift-f))); }
        .hf-mode:focus-visible { outline: 2px solid rgba(var(--lf-ink-rgb), calc(.5 + 0.5 * var(--lf-lift-e))); outline-offset: 2px; }
        .hf-chevron { color: rgba(var(--lf-ink-rgb), calc(.35 + 0.65 * var(--lf-lift-t))); }

        .hf-send {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--lf-accent); color: var(--lf-ink);
          transition: transform .18s ease, filter .18s ease;
        }
        .hf-send:hover { transform: scale(1.06); filter: brightness(1.06); }
        .hf-send:active { transform: scale(1); }
        .hf-send:focus-visible { outline: 2px solid var(--lf-ink); outline-offset: 3px; }

        /* Full width so the row centres in the column rather than in whatever
           the five chips happen to measure, and so the task cards that open under
           a chip have that width to lay out in. */
        .hf-intents { width: 100%; margin-top: 28px; }

        @media (max-width: 640px) {
          .hf-line { margin-top: 44px; font-size: 21px; }
          .hf-box { margin-top: 30px; padding: 16px 14px 12px; border-radius: 20px; }
        }
      `})]})}const Te=[.16,1,.3,1];function ol(){const t=l.useRef(null),a=xt(t,{once:!0,amount:.55}),[n,s]=l.useState(0);return l.useEffect(()=>{if(!a)return;const o=[140,900,1250,1780,2490].map((r,c)=>window.setTimeout(()=>s(c+1),r));return()=>o.forEach(window.clearTimeout)},[a]),e.jsxs("section",{className:"ctf-section","aria-labelledby":"ctf-title",children:[e.jsxs(O,{children:[e.jsx(m.h2,{id:"ctf-title",className:"ctf-title",initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.55},transition:{duration:.55,ease:Te},children:"Just talk. Starchild figures out the rest"}),e.jsxs(m.div,{className:"ctf-window",ref:t,initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.6,delay:.08,ease:Te},"aria-label":"An example chat where Starchild turns a request into a launch plan.",children:[n>=1&&e.jsx(m.p,{className:"ctf-bubble ctf-bubble--user ctf-bubble--first",initial:{opacity:0,x:26,y:12,scale:.94},animate:{opacity:1,x:0,y:0,scale:1},transition:{duration:.38,ease:Te},children:"Turn this into a launch plan"}),n>=2&&e.jsxs(m.div,{className:"ctf-answer ctf-answer--first",initial:{opacity:0,x:-18,y:10,scale:.96},animate:{opacity:1,x:0,y:0,scale:1},transition:{duration:.42,ease:Te},children:[e.jsx("i",{"aria-hidden":"true"}),e.jsx("p",{className:"ctf-bubble",children:"Let's make it happen."})]}),n>=3&&e.jsxs(m.div,{className:"ctf-plan",initial:{opacity:0,x:-10,y:10,scale:.96},animate:{opacity:1,x:0,y:0,scale:1},transition:{duration:.4,ease:Te},children:[e.jsx("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M4.1 1.8h5l2.8 2.8v9.6H4.1zM9.1 1.8v2.9H12"})}),e.jsx("span",{children:"Launch plan"}),e.jsx("b",{"aria-hidden":"true",children:"→"})]}),n>=4&&e.jsx(m.p,{className:"ctf-bubble ctf-bubble--user ctf-bubble--second",initial:{opacity:0,x:26,y:12,scale:.94},animate:{opacity:1,x:0,y:0,scale:1},transition:{duration:.38,ease:Te},children:"What should I do first?"}),n>=5&&e.jsxs(m.div,{className:"ctf-answer ctf-answer--second",initial:{opacity:0,x:-18,y:10,scale:.96},animate:{opacity:1,x:0,y:0,scale:1},transition:{duration:.42,ease:Te},children:[e.jsx("i",{"aria-hidden":"true"}),e.jsx("p",{className:"ctf-bubble",children:"Start with a small beta."}),e.jsx("span",{className:"ctf-reaction","aria-label":"cool",children:"😎"})]})]})]}),e.jsx("style",{children:`
        .ctf-section {
          padding: 122px 0 136px; overflow: hidden;
          background: transparent; font-family: var(--font-google-sans);
        }
        .ctf-title {
          max-width: 28ch; margin: 0 auto 42px; text-align: center;
          color: var(--lf-ink); font-size: 42px; line-height: 50px;
          font-weight: 500; letter-spacing: 0; text-wrap: balance;
        }
        .ctf-window {
          position: relative; box-sizing: border-box; width: min(610px, calc(100% - 32px));
          height: 312px; margin: 0 auto; overflow: hidden; border-radius: 20px;
          border: 1px solid rgba(var(--lf-ink-rgb), calc(.09 + 0.91 * var(--lf-lift-e))); background: var(--lf-window);
          box-shadow: var(--lf-shadow);
        }
        .ctf-window::before {
          content: ""; position: absolute; inset: -46% -26% -42% -42%; pointer-events: none;
          background: radial-gradient(circle at 46% 58%,
            rgba(var(--lf-accent-rgb), calc(.18 * var(--lf-glow))),
            rgba(var(--lf-accent-rgb), calc(.07 * var(--lf-glow))) 34%, transparent 66%);
        }
        .ctf-bubble { position: relative; box-sizing: border-box; width: max-content; max-width: none; margin: 0; padding: 10px 14px; border-radius: 15px; background: rgba(var(--lf-accent-rgb), .105); color: rgba(var(--lf-ink-rgb), calc(.9 + 0.1 * var(--lf-lift-t))); font-size: 14px; line-height: 1.3; white-space: nowrap; }
        .ctf-bubble--user { position: absolute; background: rgba(var(--lf-ink-rgb), calc(.055 + 0.945 * var(--lf-lift-f))); color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); }
        .ctf-bubble--first { top: 38px; right: 32px; }
        .ctf-bubble--second { top: 183px; right: 32px; }
        .ctf-answer { position: absolute; display: flex; align-items: center; gap: 18px; }
        .ctf-answer > i { width: 10px; height: 10px; border-radius: 999px; background: var(--lf-accent); box-shadow: 0 0 12px rgba(var(--lf-accent-rgb), .85); }
        .ctf-answer--first { top: 85px; left: 31px; }
        .ctf-answer--second { top: 233px; left: 31px; }
        .ctf-plan { position: absolute; top: 133px; left: 57px; display: flex; align-items: center; gap: 10px; width: 222px; box-sizing: border-box; padding: 10px 13px; border: 1px solid rgba(var(--lf-accent-rgb), .18); border-radius: 12px; background: rgba(var(--lf-accent-rgb), .12); color: rgba(var(--lf-ink-rgb), calc(.88 + 0.12 * var(--lf-lift-t))); font-size: 14px; }
        .ctf-plan svg { width: 15px; height: 15px; fill: none; stroke: rgba(var(--lf-ink-rgb), calc(.7 + 0.3 * var(--lf-lift-t))); stroke-width: 1.2; }
        .ctf-plan b { margin-left: auto; color: rgba(var(--lf-ink-rgb), calc(.38 + 0.62 * var(--lf-lift-t))); font-size: 17px; font-weight: 400; line-height: .7; }
        .ctf-reaction { position: absolute; right: 8px; bottom: -15px; display: grid; place-items: center; width: 19px; height: 19px; border-radius: 999px; background: var(--lf-window); font-size: 12px; }
        @media (max-width: 640px) {
          .ctf-section { padding: 92px 0 100px; }
          .ctf-title { margin-bottom: 34px; font-size: 38px; line-height: 48px; }
          .ctf-window { height: 330px; border-radius: 18px; }
          .ctf-bubble { max-width: 78%; font-size: 13px; white-space: normal; }
          .ctf-bubble--first { top: 30px; right: 18px; }
          .ctf-bubble--second { top: 196px; right: 18px; }
          .ctf-answer--first { top: 83px; left: 18px; }
          .ctf-answer--second { top: 247px; left: 18px; }
          .ctf-answer { gap: 11px; }
          .ctf-plan { top: 136px; left: 43px; width: 194px; }
        }
      `})]})}const rl=""+new URL("background connectors-CSBdy0pQ.png",import.meta.url).href,ll=["gmail","gcal","gdrive","notion","slack","telegram"];function cl({id:t,active:a,onEnter:n,onLeave:s}){const[i,o]=l.useState(!0),r=ce[t];return e.jsx("button",{type:"button",className:`orbf-chip${i?" orbf-chip--brand":""}${a?" orbf-chip--active":""}`,"aria-label":r.name,onMouseEnter:n,onMouseLeave:s,onFocus:n,onBlur:s,children:i?e.jsx("img",{src:`./connectors/${t}.svg`,alt:"",onError:()=>o(!1)}):e.jsx(me,{kind:r.kind,className:"size-[22px]"})})}function Fs({onSeeAll:t}){const[a,n]=l.useState(null);return e.jsxs("section",{className:"orbf-section","aria-labelledby":"orbf-title",children:[e.jsx("div",{className:"orbf-panel",children:e.jsx(O,{children:e.jsxs("div",{className:"orbf-grid",children:[e.jsxs("div",{className:`orbf-stage${a?" orbf-stage--held":""}`,onMouseLeave:()=>n(null),children:[e.jsxs("svg",{className:"orbf-rings",viewBox:"0 0 400 400",fill:"none","aria-hidden":"true",children:[e.jsx("ellipse",{cx:"200",cy:"200",rx:"168",ry:"168",stroke:"var(--lf-accent)",strokeWidth:"1",strokeDasharray:"2 7"}),e.jsx("ellipse",{cx:"200",cy:"200",rx:"168",ry:"68",transform:"rotate(-18 200 200)",stroke:"var(--lf-accent)",strokeWidth:"1",strokeDasharray:"2 7"}),e.jsx("ellipse",{cx:"200",cy:"200",rx:"168",ry:"68",transform:"rotate(62 200 200)",stroke:"var(--lf-accent)",strokeWidth:"1",strokeDasharray:"2 7"}),e.jsx("ellipse",{cx:"200",cy:"200",rx:"168",ry:"68",transform:"rotate(118 200 200)",stroke:"var(--lf-accent)",strokeWidth:"1",strokeDasharray:"2 7"})]}),e.jsx("div",{className:"orbf-core","aria-hidden":"true",children:e.jsx(pe,{state:a?"listening":"resting",size:112})}),e.jsx("div",{className:"orbf-spin",children:ll.map((s,i)=>{const o=ce[s];return e.jsx("div",{className:"orbf-arm",style:{"--orbit-angle":`${i*60}deg`},children:e.jsxs("div",{className:"orbf-hold",children:[e.jsx(cl,{id:s,active:a===s,onEnter:()=>n(s),onLeave:()=>n(null)}),a===s&&e.jsxs("span",{className:"orbf-tip",children:[e.jsx("strong",{children:o.name}),o.what]})]})},s)})})]}),e.jsxs("div",{className:"orbf-copy",children:[e.jsxs("h2",{id:"orbf-title",children:["Works with what",e.jsx("br",{}),"you already use."]}),e.jsxs("button",{type:"button",className:"orbf-more",onClick:t,children:["Explore all 30+ connectors ",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]})})}),e.jsx("style",{children:`
        .orbf-section { position: relative; background: transparent; font-family: var(--font-google-sans); }
        /* No ground of its own. #0c0f10 against the page's #050506 is a band
           with a visible top and bottom edge — a second sheet under one section,
           which is the thing the rest of this page does not do. The section keeps
           its height and its padding and sits on the page like everything else. */
        .orbf-panel { position: relative; display: grid; align-items: center; min-height: 640px; padding-block: 90px; overflow: hidden; }

        /* The wash, on a layer of its own rather than painted on the panel.

           A transparent orange PNG — RGBA, mostly empty, Starchild orange at
           about a fifth of an alpha where it is not — so it is the same kind of
           object as the hero's wash and the conductor's beams, and it takes the
           same treatment on each ground. It is a pseudo-element because the light
           mode needs to blend it, and a blend mode on the panel would take the
           orbit, the heading and the link with it. */
        .orbf-panel::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; background: url(${rl}) center / 100% 100% no-repeat; }
        .orbf-grid { position: relative; z-index: 1; }
        .orbf-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px; max-width: 1080px; margin: 0 auto; }
        .orbf-stage { position: relative; justify-self: center; width: 400px; height: 400px; }
        .orbf-rings { position: absolute; inset: 0; width: 100%; height: 100%; animation: orbf-rotate 52s linear infinite; }
        .orbf-rings ellipse:nth-child(1) { stroke-opacity: .5; } .orbf-rings ellipse:nth-child(2), .orbf-rings ellipse:nth-child(3) { stroke-opacity: .34; } .orbf-rings ellipse:nth-child(4) { stroke-opacity: .28; }
        .orbf-core { position: absolute; top: 50%; left: 50%; width: 112px; height: 112px; transform: translate(-50%, -50%); }
        .orbf-spin { position: absolute; inset: 0; pointer-events: none; animation: orbf-rotate 52s linear infinite; }
        .orbf-arm { position: absolute; inset: 0; pointer-events: none; transform: rotate(var(--orbit-angle)); }
        .orbf-hold { position: absolute; top: calc(50% - 42% - 26px); left: 50%; width: 52px; height: 52px; margin-left: -26px; pointer-events: auto; transform: rotate(calc(var(--orbit-angle) * -1)); animation: orbf-unrotate 52s linear infinite; }
        .orbf-stage--held .orbf-rings, .orbf-stage--held .orbf-spin, .orbf-stage--held .orbf-hold { animation-play-state: paused; }
        @keyframes orbf-rotate { to { transform: rotate(360deg); } } @keyframes orbf-unrotate { to { transform: rotate(calc(var(--orbit-angle) * -1 - 360deg)); } }
        .orbf-chip { display: grid; place-items: center; width: 52px; height: 52px; padding: 0; border: 1px solid var(--lf-ctl-edge); border-radius: 999px; background: #141416; color: var(--lf-ink); cursor: pointer; transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
        .orbf-chip--brand { background: #fff; border-color: rgba(var(--lf-ink-rgb), calc(.16 + .84 * var(--lf-lift-e))); }.orbf-chip img { display: block; width: 30px; height: 30px; }.orbf-chip:hover, .orbf-chip--active { transform: scale(1.08); border-color: var(--lf-accent); box-shadow: 0 0 0 2px var(--lf-accent), 0 0 24px rgba(var(--lf-accent-rgb), .32); }.orbf-chip:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }
        .orbf-tip { position: absolute; top: 50%; left: calc(100% + 12px); z-index: 2; width: max-content; max-width: 190px; padding: 8px 11px; border: 1px solid rgba(var(--lf-ink-rgb), .12); border-radius: 9px; background: var(--lf-surface); box-shadow: var(--lf-shadow); color: rgba(var(--lf-ink-rgb), calc(.68 + .32 * var(--lf-lift-t))); font-size: 10px; line-height: 1.35; transform: translateY(-50%); }.orbf-tip strong { display: block; margin-bottom: 2px; color: var(--lf-ink); font-size: 11px; }
        .orbf-copy h2 { margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }.orbf-more { display: inline-flex; align-items: center; gap: 9px; margin-top: 25px; padding: 0; border: 0; background: none; color: rgba(var(--lf-ink-rgb), calc(.6 + .4 * var(--lf-lift-t))); cursor: pointer; font: 500 15px/1 var(--font-google-sans); transition: color .18s ease; }.orbf-more:hover { color: var(--lf-ink); }.orbf-more span { color: var(--lf-accent-ink); font-size: 19px; line-height: .7; }.orbf-more:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 4px; border-radius: 3px; }
        /* Multiplied rather than added: on clay the orange behaves as pigment
           and warms the ground, where adding it only pushes toward white. The
           solid #f5c9b5 panel that used to be here was the light half of the same
           band — lighter than the page, with a curved edge running across the
           scroll. */
        .lf[data-lf="light"] .orbf-panel::before { opacity: .55; mix-blend-mode: multiply; }
        .lf[data-lf="light"] .orbf-rings ellipse:nth-child(1) { stroke-opacity: .82; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(2), .lf[data-lf="light"] .orbf-rings ellipse:nth-child(3) { stroke-opacity: .68; }.lf[data-lf="light"] .orbf-rings ellipse:nth-child(4) { stroke-opacity: .58; }
        @media (max-width: 940px) { .orbf-panel { min-height: 0; padding-block: 82px; }.orbf-grid { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 44px; }.orbf-copy { display: flex; flex-direction: column; align-items: center; }.orbf-stage { width: 340px; height: 340px; }.orbf-tip { top: calc(100% + 10px); left: 50%; transform: translateX(-50%); } }
        @media (max-width: 420px) { .orbf-stage { width: min(320px, calc(100vw - 32px)); height: min(320px, calc(100vw - 32px)); }.orbf-copy h2 { font-size: 35px; line-height: 43px; } }
        @media (prefers-reduced-motion: reduce) { .orbf-rings, .orbf-spin, .orbf-hold { animation: none; } }
      `})]})}const dl=""+new URL("conductor-Dex00285.svg",import.meta.url).href,hl=""+new URL("conductor-light-CClAPtUv.svg",import.meta.url).href,pl="data:image/svg+xml,%3csvg%20width='1165'%20height='1018'%20viewBox='0%200%201165%201018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1131.96%20226.38C1159.48%20231.883%201173.46%20262.781%201159.43%20287.083L749.472%20997.146C735.441%201021.45%20701.692%201024.79%20683.168%201003.71L0%20226.332V0L1131.96%20226.38Z'%20fill='url(%23paint0_radial_136_1884)'%20fill-opacity='0.75'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_136_1884'%20cx='0'%20cy='0'%20r='1'%20gradientTransform='matrix(776.72%20461.634%20-267.36%20456.932%2064.9359%20128.554)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23F84600'/%3e%3cstop%20offset='0.879513'%20stop-color='%23F84600'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e",gl="data:image/svg+xml,%3csvg%20width='1165'%20height='1018'%20viewBox='0%200%201165%201018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M32.9893%20226.38C5.47235%20231.883%20-8.50821%20262.781%205.52246%20287.083L415.478%20997.146C429.509%201021.45%20463.257%201024.79%20481.781%201003.71L1164.95%20226.332V0L32.9893%20226.38Z'%20fill='url(%23paint0_radial_136_1885)'%20fill-opacity='0.75'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_136_1885'%20cx='0'%20cy='0'%20r='1'%20gradientTransform='matrix(-776.72%20461.635%20267.361%20456.932%201100.01%20128.554)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23F84600'/%3e%3cstop%20offset='0.879513'%20stop-color='%23F84600'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e",xl="data:image/svg+xml,%3csvg%20width='1119'%20height='590'%20viewBox='0%200%201119%20590'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M530.314%2011.7186C546.256%20-3.90522%20571.767%20-3.9052%20587.709%2011.7186L1105.64%20519.312C1131.87%20545.018%201113.67%20589.594%201076.94%20589.594H41.0809C4.35418%20589.594%20-13.8471%20545.018%2012.3831%20519.312L530.314%2011.7186Z'%20fill='url(%23paint0_radial_136_1867)'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_136_1867'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(559.012%20138.798)%20rotate(90)%20scale(449.236%20793.946)'%3e%3cstop%20stop-color='%23FEEAB8'/%3e%3cstop%20offset='0.879513'%20stop-color='%23FEBD57'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e",Mt=[.16,1,.3,1],fl=[{label:"Context",x:21,y:6},{label:"Goals",x:71,y:21},{label:"Tools",x:5,y:46},{label:"Preferences",x:43,y:56},{label:"Current task",x:19,y:88}],Yn=[{name:"OpenAI",logo:"openai"},{name:"SpaceX",logo:"spacex"},{name:"DeepSeek",logo:"deepseek"},{name:"Qwen",logo:""}];function ml(){const t=l.useRef(null),a=xt(t,{once:!0,amount:.3});return e.jsxs("section",{ref:t,className:"cda-section","aria-labelledby":"cda-title",children:[e.jsx("img",{className:"cda-rake cda-rake--left",src:pl,alt:"","aria-hidden":"true"}),e.jsx("img",{className:"cda-rake cda-rake--right",src:gl,alt:"","aria-hidden":"true"}),e.jsx(O,{children:e.jsxs("div",{className:"cda-shell",children:[e.jsxs(m.div,{className:"cda-heading",initial:{opacity:0,y:14},animate:a?{opacity:1,y:0}:void 0,transition:{duration:.55,ease:Mt},children:[e.jsx("p",{children:"Conductor mode"}),e.jsx("h2",{id:"cda-title",children:"It knows you. It knows AI."})]}),e.jsx("ul",{className:"cda-context",children:fl.map((n,s)=>e.jsxs(m.li,{className:"cda-known",style:{left:`${n.x}%`,top:`${n.y}%`},initial:{opacity:0,scale:.86},animate:a?{opacity:1,scale:1}:void 0,transition:{duration:.45,delay:.24+s*.09,ease:Mt},children:[e.jsx("span",{className:"cda-dot","aria-hidden":"true"}),n.label]},n.label))}),e.jsx(m.div,{className:"cda-models",initial:{opacity:0,x:22},animate:a?{opacity:1,x:0}:void 0,transition:{duration:.6,delay:.16,ease:Mt},"aria-label":"OpenAI, SpaceX, DeepSeek and Qwen models",children:[!1,!0].map(n=>e.jsx("div",{className:n?"cda-model-mask cda-model-mask--reverse":"cda-model-mask","aria-hidden":"true",children:e.jsx("div",{className:"cda-model-track",children:[...Yn,...Yn].map((s,i)=>e.jsx("span",{className:"cda-model",children:s.logo?e.jsx("img",{src:`./models/${s.logo}.svg`,alt:""}):e.jsxs(e.Fragment,{children:[e.jsx("b",{children:"✧"}),s.name]})},`${s.name}-${i}`))})},String(n)))}),e.jsxs(m.div,{className:"cda-core",initial:{opacity:0,scale:.82,y:14},animate:a?{opacity:1,scale:1,y:0}:void 0,transition:{duration:.7,delay:.28,ease:Mt},children:[e.jsx("div",{className:"cda-orb","aria-hidden":"true",children:e.jsx("span",{className:"cda-art"})}),e.jsx("img",{className:"cda-answer-beam",src:xl,alt:"","aria-hidden":"true"}),e.jsxs("p",{children:["The right model.",e.jsx("br",{}),"The right answer."]})]})]})}),e.jsx("style",{children:`
        .cda-section { position: relative; overflow: hidden; padding: 56px 0 96px; background: transparent; font-family: var(--font-google-sans); }
        .cda-shell { position: relative; z-index: 1; min-height: 680px; background: transparent; isolation: isolate; }
        .cda-heading { position: relative; z-index: 3; padding-top: 72px; text-align: center; }
        .cda-heading p { margin: 0 0 10px; color: var(--lf-accent-ink); font-size: 15px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
        .cda-heading h2 { margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }
        .cda-rake { position: absolute; z-index: 0; top: 128px; width: min(65vw, 1165px); height: auto; opacity: .8; filter: blur(4px); pointer-events: none; }
        .cda-rake--left { left: 0; }
        .cda-rake--right { right: 0; }
        .cda-context, .cda-models { position: absolute; z-index: 2; top: 260px; display: flex; align-items: center; gap: 10px; max-width: 240px; }
        /* A field the points are placed in, not a stack they sit in — so it
           overrides the flex the two columns otherwise share. */
        .cda-context {
          left: 13%; display: block; width: 300px; height: 250px; max-width: 32vw;
          margin: 0; padding: 0; list-style: none;
        }
        /* The dot sits over the first letter, not over the middle of the word.
           Centred, it read as a bullet the label hangs from; on the left edge the
           pair reads as one mark with its name written under it, and the five of
           them line up as points rather than as five centred captions. */
        .cda-known {
          position: absolute;
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          color: #fff;
          font-family: var(--font-family-Font-1, "Google Sans");
          font-size: 18px;
          font-style: normal;
          font-weight: var(--font-weight-400, 400);
          line-height: 1.28;
          letter-spacing: 0;
          white-space: nowrap;
        }
        /* Small and lit. The glow is what keeps a 7px dot from disappearing into
           a beam that is already orange — on the light ground the beam is paler
           and the dot carries itself, so the halo is only there for the dark. */
        .cda-dot {
          width: 7px; height: 7px; margin-left: 1px; border-radius: 999px;
          background: var(--lf-accent);
          box-shadow: 0 0 12px rgba(var(--lf-accent-rgb), calc(.85 * var(--lf-glow)));
        }
        /* The left edge is where it was — the distance from the centre is the
           thing that was already right. What changes is that the width now stops
           at the page's own margin instead of being a number that happened to fit
           at one viewport: the block starts at 50% + 250 of the shell, so the room
           left to the container's edge is exactly 50% - 250, and taking the
           smaller of that and 520 means the row narrows rather than crossing the
           gutter. The mask is 100% of this, so it narrows with it. */
        .cda-models {
          top: 339px; left: calc(50% + 250px); right: auto;
          display: grid; width: min(520px, calc(50% - 250px)); max-width: none; gap: 18px;
        }
        .cda-model-mask {
          width: 100%; overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%);
        }
        .cda-model-track { display: flex; align-items: center; gap: 46px; width: max-content; padding-right: 46px; animation: cda-model-marquee 26s linear infinite; }
        .cda-model-mask--reverse .cda-model-track { animation-direction: reverse; }
        .cda-models:hover .cda-model-track { animation-play-state: paused; }
        @keyframes cda-model-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cda-model { display: inline-flex; align-items: center; gap: 7px; color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); font-size: 17px; font-weight: 600; white-space: nowrap; }
        .cda-model img { display: block; width: auto; height: 21px; max-width: 100px; filter: grayscale(1) brightness(2); opacity: .82; }
        .cda-model b { display: grid; place-items: center; width: 18px; height: 18px; color: rgba(var(--lf-ink-rgb), calc(.82 + 0.18 * var(--lf-lift-t))); font-size: 21px; font-weight: 400; }
        .cda-core { position: absolute; z-index: 3; top: 274px; left: calc(50% - 155px); width: 310px; height: 350px; text-align: center; }
        .cda-orb { position: relative; z-index: 2; width: 190px; height: 190px; margin: 0 auto; transform-origin: 50% 50%; animation: cda-breathe 5.6s ease-in-out infinite; will-change: transform; }
        /* The drawing itself. A background rather than an <img> so the light
           ground can swap the file from CSS — see the rule under .lf[data-lf] in
           LandingPageF. */
        .cda-art {
          display: block; width: 100%; height: 100%;
          background: url(${dl}) center / contain no-repeat;
        }
        .lf[data-lf="light"] .cda-art {
          background-image: url(${hl});
        }
        .cda-answer-beam { position: absolute; z-index: 1; top: 0; left: 50%; width: 560px; max-width: none; height: 420px; object-fit: fill; opacity: .9; transform: translateX(-50%); pointer-events: none; }
        .cda-core p { position: relative; z-index: 2; margin: 84px 0 0; color: var(--lf-ink); font-size: 18px; line-height: 1.28; font-weight: 500; }
        @keyframes cda-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @media (max-width: 900px) {
          .cda-shell { min-height: 720px; }
          .cda-rake { top: 150px; width: 76vw; }
          .cda-context { left: 8%; width: 260px; height: 220px; }
          .cda-models { left: calc(50% + 180px); right: auto; width: min(380px, calc(50% - 180px)); }
        }
        @media (max-width: 680px) {
          .cda-section { padding: 32px 0 70px; }
          .cda-shell { min-height: 710px; }
          .cda-heading { padding-top: 54px; }
          .cda-heading p { font-size: 12px; }
          .cda-heading h2 { font-size: 38px; line-height: 48px; }
          .cda-rake { top: 164px; width: 116vw; }
          .cda-rake--left { left: -42%; }
          .cda-rake--right { right: -42%; }
          .cda-context, .cda-models { top: 174px; transform: none; }
          .cda-context { left: 50%; width: 250px; height: 200px; max-width: calc(100% - 32px); transform: translateX(-50%); }
          .cda-known { gap: 8px; }
          .cda-models { top: 488px; left: 50%; right: auto; width: min(310px, calc(100% - 36px)); max-width: none; transform: translateX(-50%); gap: 16px; }
          .cda-model { font-size: 14px; }
          .cda-model img { height: 17px; }
          .cda-core { top: 282px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cda-model-track, .cda-orb { animation: none; }
        }
      `})]})}const ul=""+new URL("Imagem do Codex 30 de ago. de 2026_ 23_47_28-DVJfdn4q.png",import.meta.url).href,ha=["Talk to an AI that remembers you.","Get the right AI without choosing it yourself.","Turn ideas into something real.","Get everyday tasks off your plate.","Hand it over and keep moving.","Use what already works — or earn from yours."];function bl(){const[t,a]=l.useState(0),n=s=>a(i=>(i+s+ha.length)%ha.length);return e.jsxs("section",{className:"mss-section","aria-labelledby":"mss-title",children:[e.jsx(O,{children:e.jsxs("div",{className:"mss-layout",children:[e.jsx("div",{className:"mss-art",children:e.jsx("img",{className:"mss-shot",src:ul,alt:"Starchild creating a flyer for an artisan bakery"})}),e.jsxs("div",{className:"mss-copy",children:[e.jsx("h2",{id:"mss-title","aria-live":"polite",children:ha[t]}),e.jsxs("div",{className:"mss-arrows",children:[e.jsx("button",{type:"button",onClick:()=>n(-1),"aria-label":"Previous use case",children:e.jsx("svg",{viewBox:"0 0 22 14",width:"22",height:"14",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M7 1.5 1.5 7 7 12.5M1.5 7H21",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("button",{type:"button",onClick:()=>n(1),"aria-label":"Next use case",children:e.jsx("svg",{viewBox:"0 0 22 14",width:"22",height:"14",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"m15 1.5 5.5 5.5-5.5 5.5M20.5 7H1",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]})]})}),e.jsx("style",{children:`
        .mss-section { padding: 106px 0 118px; background: transparent; font-family: var(--font-google-sans); }
        /* width: max-content, e não justify-content: center.

           As duas centralizam igual na tela, mas a caixa do grid é outra: com
           justify-content as colunas centralizam DENTRO de um grid de largura
           total, então a borda esquerda do elemento fica na margem da página e
           não no card. O ::before abaixo se posiciona contra essa caixa — era por
           isso que o círculo nascia deslocado para a esquerda. Encolhido até o
           conteúdo, a borda esquerda do layout é a borda esquerda do card. */
        .mss-layout { position: relative; display: grid; grid-template-columns: 77vh minmax(0, 340px); width: max-content; margin-inline: auto; align-items: center; gap: 62px; }

        /* The glow, centred on the bottom-left corner of the picture.

           On the layout rather than inside the card, because the card clips: it
           carries overflow: hidden for its own rounded corners, and a glow drawn
           inside it would lose the three quarters of itself that fall outside.

           The layout's bottom-left is the card's bottom-left — horizontally
           because the grid is now only as wide as its columns, vertically because
           the card is the taller of the two cells and the row takes its height.
           left: 0 / top: 100% is that corner, and the translate puts the circle's
           centre on it rather than its own corner.

           --lf-glow scales it the way it scales every wash on this page, and on
           the light ground it multiplies — orange as pigment warming the clay
           rather than as a lamp pushing it toward white. */
        .mss-layout::before {
          content: ""; position: absolute; left: 0; top: 100%; z-index: 0;
          /* Sized against the card beside it — the card is 70vh tall, so at
             170vh the circle reaches roughly two and a half cards in every
             direction from the corner it sits on. It is a diameter, and the
             centre is on that corner, so half of it is what falls into the
             section. */
          width: 170vh; height: 170vh; min-width: 1080px; min-height: 1080px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: radial-gradient(circle,
            rgba(var(--lf-accent-rgb), calc(.22 * var(--lf-glow))) 0%,
            rgba(var(--lf-accent-rgb), calc(.09 * var(--lf-glow))) 34%,
            rgba(var(--lf-accent-rgb), 0) 70%);
        }
        .lf[data-lf="light"] .mss-layout::before { mix-blend-mode: multiply; }

        /* Above the glow — without this the positioned pseudo-element paints over
           the two things it is supposed to sit behind. */
        .mss-art, .mss-copy { position: relative; z-index: 1; }

        /* The card is kept and the picture goes inside it.

           That would normally be a card inside a card — the file has its own
           rounded panel painted in — and it is not, because the two grounds are
           the same colour: the PNG's own ground samples #1a1b1b to #1c1d1d at
           every edge, against the card's #1a1b1c. The picture is portrait and the
           card is landscape, so what shows either side of it is card, and there is
           no seam to see between them.

           If the artwork is ever re-exported on a different ground, this is the
           number to match — or the frame comes off, which was the other way to
           solve it. */
        .mss-art {
          display: grid; place-items: center;
          width: 77vh; height: 70vh; overflow: hidden;
          border-radius: 21px; background: #1a1b1c;
          box-shadow: 0 22px 60px rgba(0,0,0,.22);
        }
        .mss-shot { display: block; width: auto; height: 100%; max-width: 100%; object-fit: contain; }
        .mss-copy { position: relative; min-height: 260px; }.mss-copy h2 { position: absolute; bottom: 52px; left: 0; margin: 0; color: var(--lf-ink); font-size: 42px; line-height: 1.17; font-weight: 500; letter-spacing: -.02em; }.mss-arrows { position: absolute; bottom: 0; left: 0; display: flex; gap: 12px; }.mss-arrows button { display: grid; place-items: center; width: 24px; height: 20px; padding: 0; border: 0; background: none; color: var(--lf-accent); cursor: pointer; transition: opacity .18s ease, transform .18s ease; }.mss-arrows button:hover { opacity: .72; transform: translateX(1px); }.mss-arrows button:first-child:hover { transform: translateX(-1px); }.mss-arrows button:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; border-radius: 3px; }
        @media (max-width: 760px) { .mss-section { padding: 78px 0 88px; }.mss-layout { grid-template-columns: minmax(0, 1fr); gap: 36px; width: auto; max-width: 405px; margin: 0 auto; }.mss-art { width: 100%; height: 70vh; }.mss-copy { min-height: 210px; text-align: center; }.mss-copy h2 { right: 0; font-size: 30px; }.mss-arrows { right: 0; justify-content: center; } }
        @media (max-width: 440px) { .mss-art { height: 320px; } }
      `})]})}function yl({theme:t,onToggle:a}){const n=t==="dark";return e.jsxs("button",{type:"button",onClick:a,className:"lf-toggle","aria-label":n?"Switch to light mode":"Switch to dark mode",title:n?"Light mode":"Dark mode",children:[n?e.jsxs("svg",{viewBox:"0 0 20 20",width:"16",height:"16",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"10",cy:"10",r:"3.9",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.9 4.1l-1.5 1.5M5.6 14.4l-1.5 1.5M15.9 15.9l-1.5-1.5M5.6 5.6L4.1 4.1",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}):e.jsx("svg",{viewBox:"0 0 20 20",width:"16",height:"16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M17 12.2A7.6 7.6 0 017.8 3a7.6 7.6 0 109.2 9.2z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})}),e.jsx("span",{children:n?"Light":"Dark"})]})}const Ws="starchild.landing.theme";function wl(){try{return localStorage.getItem(Ws)==="light"?"light":"dark"}catch{return"dark"}}function vl(){const[t,a]=l.useState(wl);return l.useEffect(()=>{try{localStorage.setItem(Ws,t)}catch{}},[t]),{theme:t,toggle:()=>a(n=>n==="dark"?"light":"dark")}}const kl=Object.keys(Pt);function jl(){return e.jsxs("div",{className:"fs-sheet",children:[kl.map(t=>e.jsxs("div",{className:"fs-cell",children:[e.jsx(Rs,{mood:t,size:150}),e.jsx("span",{className:"fs-name",children:t})]},t)),e.jsx("style",{children:`
        .fs-sheet {
          min-height: 100vh; background: #050506;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 64px 40px; align-content: center;
          padding: 80px 60px;
        }
        .fs-cell { display: flex; flex-direction: column; align-items: center; gap: 26px; }
        .fs-name {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.5);
        }
        @media (max-width: 900px) { .fs-sheet { grid-template-columns: repeat(2, 1fr); } }
      `})]})}function Nl(){return typeof window>"u"?!1:new URLSearchParams(window.location.search).get("faces")==="1"}function zl({onEnterGuest:t,onStartTask:a,onNavigateConnectors:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}){const{theme:r,toggle:c}=vl();return Nl()?e.jsx(jl,{}):e.jsxs("div",{className:"lf","data-lf":r,children:[e.jsx($s,{onEnterGuest:t,onStartTask:a,onNavigateHome:()=>window.scrollTo({top:0}),onNavigatePricing:s,onLogIn:i,onSignUp:o}),e.jsx(ol,{}),e.jsx(Fs,{onSeeAll:n}),e.jsx(ml,{}),e.jsx(bl,{}),e.jsx(yl,{theme:r,onToggle:c}),e.jsx(je,{headline:"Whatever comes next, Starchild is already with you.",onStartFree:()=>t(),onNavigatePricing:s}),e.jsx("style",{children:`
        /* ---------- the two grounds ----------

           One set of names, two sets of values. Everything below this file reads
           colour from here and nothing hard-codes a grey, which is the only way
           a page of six sections with six style blocks can be turned over
           without one of them being missed.

           --lf-ink-rgb is a triple rather than a colour because most of the text
           and nearly every border on this page is the ink at some fraction —
           rgba(var(--lf-ink-rgb), .55) and so on. One token then carries all
           forty of them.

           The accent does not flip. #f84600 holds on both grounds, it is the
           brand, and a page that changed its orange between modes would be two
           brands with a switch between them. */
        .lf {
          --lf-page: #050506;
          --lf-ink: #ffffff;
          --lf-ink-rgb: 255,255,255;
          /* cards and panels: a step off the page, in whichever direction the
             page is not */
          --lf-surface: #0a0a0b;
          --lf-surface-2: #0d0d0f;
          --lf-accent: #f84600;
          --lf-accent-rgb: 248,70,0;
          /* The accent when it is a word rather than a shape.
             On black, #f84600 as text is 6.4:1 and the two are the same token.
             On clay it is 2.2:1, which is not a colour you can set 15px type in —
             so the light mode has a darker one, and only the three places where
             the accent is read rather than seen point at it. Shapes, borders,
             glows and the button all keep the brand orange. */
          --lf-accent-ink: #f84600;
          /* Zero, and it has to be exactly zero: every alpha on this page is
             written as A + (1 - A) * lift, so at 0 the dark mode is the numbers
             that were there before any of this existed. */
          --lf-lift-t: 0;
          --lf-lift-e: 0;
          --lf-lift-f: 0;
          /* The edge of a control, and the same edge once it is focused or
             hovered. Within a hundredth of what these four carried before, so the
             dark page is where it was. */
          --lf-ctl-edge: rgba(var(--lf-ink-rgb), .10);
          --lf-ctl-edge-on: rgba(var(--lf-ink-rgb), .24);
          /* The composer's own fill. Translucent in both modes, because it sits
             over the hero's wash and the blur behind it is doing real work — but
             the direction reverses, and that is the whole point of it having a
             token. On black the field is the page lifted; on clay it is paper
             laid on it. Ink at an alpha would have given the light mode a darker
             patch, which reads as a hole cut in the page rather than as
             somewhere to type. */
          --lf-field: rgba(var(--lf-ink-rgb), .045);
          --lf-field-on: rgba(var(--lf-ink-rgb), .06);
          /* the drawn window in section 2, and the well a use-case drawing sits
             in — both are a step away from the page, in whichever direction the
             page is not */
          --lf-window: #1a1a1b;
          --lf-well: #08080a;
          /* how hard the drawn glows are allowed to burn. On black they are the
             light in the room; on cream they are haze over a lit room, and at
             full strength they turn the page orange. */
          --lf-glow: 1;
          --lf-shadow: 0 24px 70px rgba(0,0,0,.24);
          --lf-shadow-deep: 0 40px 90px rgba(0,0,0,.6);
          --lf-veil: rgba(3,3,4,.72);

          background: var(--lf-page);
          color-scheme: dark;
        }

        /* Clay, not paper. A near-white light mode would have been the safe
           version and the wrong one: the accent is a hot orange and every drawn
           glow on this page is orange, and on white those read as stains. On a
           ground that already has the red in it they read as the same light
           falling on something.

           It also changes what the surfaces have to do. Against white, a card is
           a border; against this, a card is a lighter thing sitting on a darker
           one, which is the same relationship the dark mode has — just with the
           page and the card the other way up. */
        .lf[data-lf="light"] {
          --lf-page: #ddc6b7;
          --lf-ink: #2d2520;
          --lf-ink-rgb: 45,37,32;
          /* Warm off-white rather than #fff. Pure white on clay is paper on
             cardboard — two materials — where this is the same material lit
             harder. Hover goes further from the page, as it does in the dark. */
          --lf-surface: #f7efe9;
          --lf-surface-2: #fdf8f4;
          --lf-window: #fbf5f1;
          /* The art well goes the other way: a step back toward the page, so the
             drawing sits in the card rather than on a second card. */
          --lf-well: #ecdcd0;
          /* Half. The glows are drawn as orange at full strength against black,
             where they read as light; at that strength over cream they read as
             the page having been printed wrong. */
          /* Lower than a paper-white mode would need. The page is already carrying
             most of the warmth these glows were there to add, so at half strength
             they stop being light and start being another coat of the same
             colour. */
          --lf-glow: .4;
          /* Warm and a little deeper than they would be on white: a grey shadow
             on clay reads as dirt, and a shallow one disappears into a ground
             this dark. */
          --lf-shadow: 0 18px 46px rgba(74,44,26,.16);
          --lf-shadow-deep: 0 30px 70px rgba(74,44,26,.26);
          --lf-veil: rgba(38,26,18,.5);
          /* 4.7:1 on the page, 6.7:1 on a card — the same orange with the value
             pulled down until it is legible, not a different hue. */
          --lf-accent-ink: #9c2b00;
          /* How far each kind of ink moves toward solid on clay.

             Text moves furthest: at the old alphas, .34 lands at 2.1:1 on this
             ground and .55 at 3.5:1, neither of which is a colour to set copy in.
             .46 is where the lowest of them — a placeholder at .34 — clears 4.5
             against this ink, and the distance between the steps survives.

             Edges are next: a hairline at .09 is 1.2:1 here — not a faint line, an
             absent one — and the composer, the sign-up button and the close button
             are all identified by nothing else. At .22 they clear 3:1.

             Fills move least. A fill only has to be noticed, and on a ground this
             dark it is doing more work at .16 than it was at .045 on black. */
          --lf-lift-t: .46;
          --lf-lift-e: .22;
          --lf-lift-f: .12;
          /* Where this ink crosses 3:1 against the grounds on this page: clay
             wants .55, the window .50, a card .51 and the orbit panel .52. One
             number covers them with a little left over — sitting exactly on the
             line means the next change to any ground breaks it. */
          --lf-ctl-edge: rgba(var(--lf-ink-rgb), .58);
          --lf-ctl-edge-on: rgba(var(--lf-ink-rgb), .76);
          /* Half-strength, and tinted rather than white. It leaves the field
             only a hair off the clay — 1.12:1 — so the box is identified by its
             border rather than by its fill, which is the quieter version of the
             same object. The wash behind it still comes through and warms it,
             which is what keeps it part of the hero rather than a card dropped
             on it. Focus raises the fill as well as the border, so the box
             answers with more than a line getting darker. */
          --lf-field: rgba(241,221,208,.5);
          --lf-field-on: rgba(241,221,208,.72);

          color-scheme: light;
        }

        /* The light page is one continuous ground, with no exceptions left.
           Components still draw windows, cards, plates and controls — those are
           objects on the floor — but no section gets a floor of its own.

           The orbit was the last one to have one and it gave it up: see the note
           on .orbf-panel for why a panel that works on black cannot work here.
           The rule stays as a catch, so a section that grows a ground later has
           to say so somewhere this file can see. */
        .lf[data-lf="light"] > section {
          background: transparent !important;
        }

        /* ---------- the drawn art ----------

           Three of the sections lean on SVG and PNG files rather than on CSS, and
           a file cannot read a token. Each one is handled by what it actually is:

           · The glows — the hero's wash and the conductor's two beams — are
             transparent orange over whatever is behind them, so they survive the
             swap and only need turning down.
           · The conductor drawing is line art at #FFFAE0, which is invisible on
             cream. It has a second file with the ink inverted, swapped by the
             section.
           · The orbit's wash is a PNG rather than an SVG, but it is the same
             kind of object as the others — transparent, orange, mostly empty — so
             it takes the same multiply. What the orbit does not keep on the light
             ground is a panel behind it; see the note on .orbf-panel. */
        /* ---------- the glows, on a ground that is already lit ----------

           Turning them down was not enough, and it was the wrong correction. All
           four are orange drawn to sit on black, where they work by adding light:
           the more of them there is, the brighter and more orange the pixel gets.
           Over clay that same addition has nowhere to go but toward white — the
           hero's wash was bleaching the ground out from under the page, which is
           why the top of it read as salmon rather than as clay with light on it.

           Multiply is the physical model for a light ground. It makes the orange
           behave as pigment rather than as a lamp: the core deepens toward
           terracotta, the falloff leaves the ground exactly as it found it, and
           the clay survives all the way up into the corner. It is also what the
           hero actually wants to say — the orb is the brightest thing in the
           frame, and on paper a bright thing darkens what is around it. */
        .lf[data-lf="light"] .hf-hero-gradient {
          opacity: .46; mix-blend-mode: multiply;
        }
        .lf[data-lf="light"] .cda-rake {
          opacity: .5; mix-blend-mode: multiply;
        }
        .lf[data-lf="light"] .cda-answer-beam {
          opacity: .85; mix-blend-mode: multiply;
        }

        /* The orb's own halo, and the same argument. On black it is the light
           spilling off it; on clay it was a pale ring with no falloff, which read
           as a smudge around the disc rather than as anything coming off it.
           Multiplied it becomes the warmth the orb throws onto the page, and the
           edge of the disc is the only hard edge again.

           Scoped to the landing: the same orb is on the product's screens, and
           those are dark and stay dark. */
        .lf[data-lf="light"] .orb-halo {
          opacity: .6; mix-blend-mode: multiply;
        }

        /* The conductor drawing swaps its file in ConductorSectionA's own block,
           where the two imported urls are in scope. */

        /* ---------- the switch ----------

           Bottom left: the variant switch owns the bottom right, and two
           floating controls in one corner is a toolbar. */
        .lf-toggle {
          position: fixed; z-index: 50; left: 20px; bottom: 20px;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px 9px 12px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(var(--lf-ink-rgb), .12);
          background: var(--lf-surface);
          box-shadow: var(--lf-shadow);
          font-family: var(--font-google-sans);
          font-size: 12.5px; font-weight: 500;
          color: rgba(var(--lf-ink-rgb), .68);
          transition: color .18s ease, border-color .18s ease, transform .18s ease;
        }
        .lf-toggle:hover {
          color: var(--lf-ink);
          border-color: rgba(var(--lf-ink-rgb), .26);
          transform: translateY(-1px);
        }
        .lf-toggle:focus-visible { outline: 2px solid var(--lf-accent); outline-offset: 3px; }

        @media (max-width: 620px) {
          /* the variant switch sits above it on a phone, so this one gets out of
             the way rather than stacking under it */
          .lf-toggle { padding: 9px; }
          .lf-toggle span { display: none; }
        }
      `})]})}function Cl(){return e.jsxs("div",{className:"sf-bar",children:[e.jsxs("span",{className:"sf-lights",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]}),e.jsxs("span",{className:"sf-url",children:[e.jsxs("svg",{viewBox:"0 0 12 12",width:"10",height:"10",focusable:"false",children:[e.jsx("circle",{cx:"5",cy:"5",r:"3.4",fill:"none",stroke:"currentColor",strokeWidth:"1.1"}),e.jsx("path",{d:"M7.6 7.6L10 10",stroke:"currentColor",strokeWidth:"1.1",strokeLinecap:"round"})]}),"starchild.ai"]})]})}function Sl({on:t}){return e.jsxs("div",{className:"sf-side",children:[e.jsx("span",{className:"sf-new",children:"+ New chat"}),e.jsx("span",{className:t==="chat"?"sf-nav sf-nav--on":"sf-nav",children:"Chat"}),e.jsx("span",{className:t==="agents"?"sf-nav sf-nav--on":"sf-nav",children:"Agents"}),t==="chat"&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"sf-label",children:"Recent"}),["Dinner from what's in th…","Plan next week","Compare the three tools"].map(a=>e.jsx("span",{className:"sf-recent",children:a},a))]})]})}const Tl=[{mine:!0,text:"Can you help me decide what to cook tonight? I'd rather not go to the shop, so only what's already in the fridge."},{mine:!1,text:"Tell me what you have and I'll work with it. A random-looking pile of ingredients is usually the more interesting problem."},{mine:!0,text:"Chicken thighs, broccoli, carrots, garlic and a lemon, plus the usual cupboard things."},{mine:!1,text:"That's a lemon and garlic traybake with the broccoli thrown in for the last ten minutes. Want the timings?"}];function Al(){return e.jsxs("div",{className:"sf-pane",children:[e.jsx("div",{className:"sf-thread",children:Tl.map((t,a)=>e.jsx("p",{className:t.mine?"sf-msg sf-msg--you":"sf-msg",children:t.text},a))}),e.jsxs("div",{className:"sf-composer",children:["Ask anything",e.jsx("span",{className:"sf-send",children:e.jsx("svg",{viewBox:"0 0 12 12",width:"11",height:"11",focusable:"false",children:e.jsx("path",{d:"M6 9.5V2.5M3 5.5L6 2.5L9 5.5",fill:"none",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]})}function Ml(){return e.jsxs("div",{className:"sf-pane",children:[e.jsxs("div",{className:"sf-head",children:[e.jsxs("span",{className:"sf-pane-title",children:[e.jsx("span",{className:"sf-ring"}),"Inbox Manager"]}),e.jsx("span",{className:"sf-count",children:"12m ago"})]}),e.jsxs("div",{className:"sf-thread sf-thread--agent",children:[e.jsx("p",{className:"sf-msg sf-msg--you",children:"Keep on top of my inbox. Draft replies for anything routine, but don't send anything without me."}),e.jsxs("div",{className:"sf-card",children:[e.jsx("span",{className:"sf-when",children:"This morning, 8:00"}),["Reviewed 12 emails","Drafted 4 replies","Left 2 for you"].map(t=>e.jsx("span",{children:t},t))]}),e.jsxs("div",{className:"sf-card sf-card--ask",children:[e.jsx("b",{children:"4 replies ready to send"}),e.jsxs("span",{className:"sf-acts",children:[e.jsx("span",{className:"sf-btn sf-btn--go",children:"Review and send"}),e.jsx("span",{className:"sf-btn",children:"Not yet"})]})]})]}),e.jsxs("div",{className:"sf-composer",children:["Message Inbox Manager…",e.jsx("span",{className:"sf-send",children:e.jsx("svg",{viewBox:"0 0 12 12",width:"11",height:"11",focusable:"false",children:e.jsx("path",{d:"M6 9.5V2.5M3 5.5L6 2.5L9 5.5",fill:"none",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]})}const Vn=[{id:"chat",name:"Chat",lede:"For questions, learning and everyday help.",copy:"Ask it anything and keep going. It holds on to what you have already said, so the fourth question does not need the first three explained again.",described:"The Starchild app on the Chat screen: a conversation about what to cook from what is already in the fridge, with recent chats listed beside it.",render:Al},{id:"agents",name:"Agents",lede:"For the work you would rather not ask for twice.",copy:"Hand over the things that repeat — a check every Monday, a watch on a price, an inbox kept down to what needs you. They run on their own and come back when there is something worth interrupting you for.",described:"The Starchild app on the Agents screen, with an agent called Inbox Manager open: the instruction it was given, what it did this morning, and four drafted replies it is holding until you approve them.",render:Ml}];function El(){const[t,a]=l.useState(0),n=Vn[t],s=n.render;return e.jsxs("section",{className:"sf-section",id:"surfaces",children:[e.jsxs(O,{children:[e.jsx(m.h2,{initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.6},transition:{duration:.6,ease:[.16,1,.3,1]},className:"sf-title",children:"Just talk. Starchild figures out the rest"}),e.jsxs(m.div,{initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.6,ease:[.16,1,.3,1]},className:"sf-grid",children:[e.jsx("div",{className:"sf-list",children:Vn.map((i,o)=>{const r=o===t;return e.jsxs("div",{className:r?"sf-item sf-item--on":"sf-item",children:[e.jsx("h3",{className:"sf-name",children:e.jsx("button",{type:"button",onClick:()=>!r&&a(o),"aria-expanded":r,"aria-controls":`sf-body-${i.id}`,className:"sf-trigger",children:i.name})}),e.jsx(X,{initial:!1,children:r&&e.jsx(m.div,{id:`sf-body-${i.id}`,initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"sf-body",children:e.jsxs("div",{className:"sf-body-in",children:[e.jsx("p",{className:"sf-lede",children:i.lede}),e.jsx("p",{className:"sf-copy",children:i.copy})]})})})]},i.id)})}),e.jsxs("div",{className:"sf-stage",children:[e.jsx("p",{className:"sr-only",children:n.described}),e.jsxs("div",{className:"sf-app","aria-hidden":"true",children:[e.jsx(Cl,{}),e.jsxs("div",{className:"sf-app-body",children:[e.jsx(Sl,{on:n.id}),e.jsx(X,{mode:"wait",initial:!1,children:e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},transition:{duration:.24,ease:[.16,1,.3,1]},className:"sf-window",children:e.jsx(s,{})},n.id)})]})]})]})]})]}),e.jsx("style",{children:`
        .sf-section {
          padding: 100px 0;
          background: transparent;
          font-family: var(--font-google-sans);
        }

        .sf-title {
          max-width: 24ch;
          margin: 0 auto 120px;
          text-align: center;
          font-size: 44px; line-height: 1.1; font-weight: 600;
          letter-spacing: -.02em; color: #fff; text-wrap: balance;
        }

        /* The list is given a real column rather than the narrowest one that
           fits: 360 is what holds the widest lede on two lines instead of
           three. The gap comes down to match — a 120px trench between two
           columns reads as two unrelated things, and these two are the same
           sentence. */
        .sf-grid {
          display: grid;
          grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
          gap: 80px; align-items: center;
          max-width: 1160px; margin-inline: auto;
        }

        /* ---------- the list ---------- */

        .sf-item { border-bottom: 1px solid rgba(255,255,255,.09); }
        .sf-name { margin: 0; }

        .sf-trigger {
          display: block; width: 100%; padding: 16px 0;
          border: 0; background: none; cursor: pointer;
          font-family: inherit; text-align: left;
          font-size: 24px; line-height: 1.2; font-weight: 600; letter-spacing: -.02em;
          color: rgba(255,255,255,.45);
          transition: color .32s cubic-bezier(.16,1,.3,1);
        }
        .sf-trigger:hover { color: rgba(255,255,255,.72); }
        .sf-item--on .sf-trigger { cursor: default; }
        .sf-trigger:focus-visible {
          outline: 2px solid #f84600; outline-offset: 3px; border-radius: 6px;
        }

        /* Colour carries the open state on its own. Bold on top of white is the
           same thing said twice, and it makes the open item look like a
           different typeface from the two under it. */
        .sf-item--on .sf-trigger { color: #fff; padding-bottom: 8px; }

        /* overflow hidden so the height animation has something to clip */
        .sf-body { overflow: hidden; }
        .sf-body-in { padding-bottom: 24px; }

        .sf-lede {
          margin: 0;
          font-size: 14px; line-height: 1.5; font-weight: 600; color: #fff;
        }
        .sf-copy {
          margin: 12px 0 0;
          font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.55);
        }

        /* ---------- the window ---------- */

        .sf-stage { position: relative; min-width: 0; }

        /* The wash is what stops a dark panel on a dark page reading as a hole,
           and the shadow is what puts it in front. The bleed is vertical only:
           given horizontal bleed as well, the gradient is wider than the column
           it lights and those few per cent are pixels hanging off the right of
           the document that you can scroll to. */
        .sf-stage::before {
          content: ""; position: absolute; inset: -12% 0; pointer-events: none;
          background: radial-gradient(62% 52% at 50% 46%, rgba(248,70,0,.16) 0%, transparent 72%);
        }

        .sf-app {
          position: relative;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 12px;
          background: #0a0a0b;
          box-shadow: 0 24px 64px rgba(0,0,0,.55);
          overflow: hidden;
          font-size: 12px; line-height: 1.5; letter-spacing: 0;
        }

        .sf-bar {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px;
          background: #131315;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }
        .sf-lights { display: flex; gap: 5px; flex: none; }
        .sf-lights i { width: 8px; height: 8px; border-radius: 999px; }
        .sf-lights i:nth-child(1) { background: #f87171; }
        .sf-lights i:nth-child(2) { background: #ffa940; }
        .sf-lights i:nth-child(3) { background: #34d399; }

        .sf-url {
          display: flex; align-items: center; gap: 8px; flex: 1;
          padding: 5px 12px; border-radius: 999px;
          background: rgba(255,255,255,.045);
          color: rgba(255,255,255,.45); font-size: 11px;
        }

        /* One size for all three states, and a fixed one rather than a floor.
           min-height only stops a state being shorter than the others — the
           Agents screen was taller than it and simply took the height, so the
           window changed size as you moved down the list. That is the page
           redrawing itself around the copy, and the whole point of the window is
           that it is one thing being shown three ways. Each pane is now built to
           sit inside 440, and .sf-app clips anything that ever does not. */
        .sf-app-body { display: grid; grid-template-columns: 30% minmax(0, 1fr); height: 440px; }

        /* ---------- rail ---------- */

        .sf-side {
          display: flex; flex-direction: column; gap: 3px;
          padding: 12px;
          border-right: 1px solid rgba(255,255,255,.09);
        }
        .sf-new {
          padding: 7px 12px; margin-bottom: 12px; border-radius: 6px;
          background: #f84600; color: #fff; font-weight: 500;
        }
        .sf-nav { padding: 6px 12px; border-radius: 6px; color: rgba(255,255,255,.45); }
        .sf-nav--on { background: rgba(255,255,255,.07); color: #fff; }

        .sf-label {
          margin: 16px 12px 4px;
          font-size: 11px; text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.32);
        }
        .sf-recent {
          padding: 4px 12px; font-size: 11px; color: rgba(255,255,255,.45);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ---------- panes ---------- */

        /* Both of these clip rather than scroll: the window is a fixed size and
           nothing inside it is meant to be reachable, so anything that overruns
           should be cut off the way a real window cuts off a long thread. */
        .sf-window { min-width: 0; overflow: hidden; }
        .sf-pane {
          display: flex; flex-direction: column;
          height: 100%; padding: 16px; overflow: hidden;
        }

        .sf-thread { display: flex; flex-direction: column; gap: 16px; flex: 1; }

        /* Only one side of the conversation gets a bubble. The assistant is the
           page talking, so it sits on the ground the way body copy does —
           bubbling both sides makes the reply look like a quote rather than an
           answer. */
        .sf-msg { margin: 0; color: rgba(255,255,255,.72); }
        .sf-msg--you {
          align-self: flex-end; max-width: 78%;
          padding: 12px 16px; border-radius: 12px;
          background: rgba(255,255,255,.07); color: #fff;
        }

        .sf-composer {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          margin-top: 24px; padding: 12px 12px 12px 16px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.045); color: rgba(255,255,255,.32);
        }
        .sf-send {
          display: grid; place-items: center; flex: none;
          width: 22px; height: 22px; border-radius: 999px;
          background: #f84600; color: #fff;
        }

        /* ---------- the agents screen ---------- */

        /* A ring rather than a dot, and the one thing in the heading that is not
           type: it names the agent rather than reporting on it. */
        .sf-ring {
          width: 9px; height: 9px; flex: none;
          border: 2px solid #f84600; border-radius: 999px;
        }

        /* Tighter than Chat's. Two of the three blocks here have a border or a
           ground of their own, so they need less air between them than four
           paragraphs do. */
        .sf-thread--agent { gap: 12px; }

        .sf-card {
          display: flex; flex-direction: column; gap: 4px;
          align-self: flex-start; max-width: 92%;
          padding: 12px; border-radius: 10px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.72);
        }
        .sf-when {
          margin-bottom: 2px;
          font-size: 10px; text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.38);
        }

        /* The ask is the only warm block in the thread, because it is the only one
           addressed to you. */
        .sf-card--ask {
          gap: 6px;
          border: 1px solid rgba(248,70,0,.38);
          background: rgba(248,70,0,.07);
        }
        .sf-card--ask b { font-weight: 600; color: #fff; }

        .sf-acts { display: flex; gap: 8px; margin-top: 6px; }
        .sf-btn {
          padding: 6px 12px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.16);
          color: rgba(255,255,255,.72);
        }
        .sf-btn--go {
          border-color: #f84600; background: #f84600;
          color: #fff; font-weight: 600;
        }

        /* ---------- connectors ---------- */

        .sf-head {
          display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }
        /* Both panes use this heading, so the Agents one puts a ring in it. */
        .sf-pane-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 600; color: #fff;
        }
        .sf-count { font-size: 11px; color: rgba(255,255,255,.45); }

        .sf-tools {
          display: flex; flex-direction: column; gap: 2px;
          flex: 1; padding-top: 12px;
        }
        .sf-tool {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 8px; border-radius: 6px;
          color: rgba(255,255,255,.82);
        }

        /* A white disc, not a dark chip — the same ground the orbit down in
           section 3 stands its marks on. These are full-colour company marks
           drawn to sit on white, and the disc is also what makes the six read as
           one set: the logos differ, the ground does not. The two sections show
           overlapping marks, so they cannot disagree about this. */
        .sf-tool-mark {
          display: grid; place-items: center; flex: none;
          width: 26px; height: 26px; border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(255,255,255,.16);
          overflow: hidden;
        }
        .sf-tool-mark img { width: 100%; height: 100%; object-fit: contain; }

        /* Pushed to the far edge rather than sitting after the name, so the six
           of them line up and the column reads as one repeated state instead of
           six separate labels. */
        .sf-tool-on {
          margin-left: auto; flex: none;
          font-size: 11px; color: rgba(255,255,255,.38);
        }

        @media (max-width: 900px) {
          .sf-section { padding: 60px 0; }
          .sf-title { font-size: 34px; margin-bottom: 56px; }

          /* The list goes above the window rather than beside it. The window
             keeps its own type sizes and simply gets narrower — shrinking a
             drawing of a UI is what a real browser does to a real one. */
          .sf-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; }
          .sf-trigger { font-size: 20px; }
          .sf-app-body { grid-template-columns: 34% minmax(0, 1fr); height: 400px; }
          .sf-msg--you { max-width: 88%; }
        }
      `})]})}const Il=[{label:"Context",icon:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2.5",y:"2.5",width:"11",height:"4",rx:"1.2",fill:"none",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("rect",{x:"2.5",y:"9.5",width:"11",height:"4",rx:"1.2",fill:"none",stroke:"currentColor",strokeWidth:"1.2"})]})},{label:"Goals",icon:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"5.5",fill:"none",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("circle",{cx:"8",cy:"8",r:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.2"})]})},{label:"Tools",icon:e.jsx("path",{d:"M10.4 2.6a3.6 3.6 0 00-4.6 4.6l-3.2 3.2a1.3 1.3 0 001.8 1.8l3.2-3.2a3.6 3.6 0 004.6-4.6L10.2 6.2 8.4 4.4z",fill:"none",stroke:"currentColor",strokeWidth:"1.2",strokeLinejoin:"round"})},{label:"Current task",icon:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2.5",y:"2.5",width:"11",height:"11",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("path",{d:"M5.4 8.2l1.9 1.9 3.4-3.6",fill:"none",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round"})]})},{label:"Preferences",icon:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M2.5 5h11M2.5 11h11",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round"}),e.jsx("circle",{cx:"6",cy:"5",r:"1.7",fill:"none",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("circle",{cx:"10.5",cy:"11",r:"1.7",fill:"none",stroke:"currentColor",strokeWidth:"1.2"})]})}],Et=[{name:"OpenAI",logo:"openai"},{name:"xAI",logo:"spacex"},{name:"DeepSeek",logo:"deepseek"},{name:"Qwen",logo:"qwen"},{name:"Claude",logo:"claude"},{name:"Kimi",logo:"kimi"}];function Un({name:t,logo:a}){const[n,s]=l.useState(!0);return n?e.jsx("li",{className:"cd-model",children:e.jsx("img",{src:`./models/${a}.svg`,alt:"",onError:()=>s(!1)})}):e.jsx("li",{className:"cd-model",children:t})}function Ll(){const t=l.useRef(null),a=xt(t,{once:!0,amount:.2}),n=Ls();return e.jsxs("section",{className:"cd-section",children:[e.jsxs(O,{children:[e.jsxs(m.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.6},transition:{duration:.6,ease:[.16,1,.3,1]},className:"cd-heading",children:[e.jsx("h2",{className:"cd-title",children:"It knows you. It knows AI."}),e.jsxs("p",{className:"cd-subtitle",children:["Starchild learns how you work and",e.jsx("br",{}),"chooses the right AI for each task."]})]}),e.jsxs(m.div,{ref:t,initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.2},transition:{duration:.7,ease:[.16,1,.3,1]},className:`cd-stage${a?" cd-stage--active":""}`,children:[e.jsxs("div",{className:"cd-side",children:[e.jsx("ul",{className:"cd-knows",children:Il.map(s=>e.jsxs("li",{className:"cd-known",children:[e.jsx("svg",{viewBox:"0 0 16 16",width:"14",height:"14","aria-hidden":"true",focusable:"false",children:s.icon}),s.label]},s.label))}),e.jsx("svg",{className:"cd-trace cd-elbows",viewBox:"0 0 82 240",width:"82",height:"240","aria-hidden":"true",focusable:"false",children:e.jsxs("g",{fill:"none",stroke:"currentColor",strokeWidth:"1",children:[e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 48H50A16 16 0 0166 64V128A16 16 0 0082 144"}),e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 96H50A16 16 0 0166 112V128A16 16 0 0082 144"}),e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 144H82"}),e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 192H50A16 16 0 0066 176V160A16 16 0 0182 144"}),e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 240H50A16 16 0 0066 224V160A16 16 0 0182 144"})]})})]}),e.jsxs("svg",{className:"cd-trace cd-trace--in",viewBox:"0 0 120 20",width:"120",height:"20","aria-hidden":"true",focusable:"false",children:[e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M0 10H118",fill:"none",stroke:"currentColor",strokeWidth:"1"}),e.jsx("circle",{cx:"118",cy:"10",r:"2.5",fill:"currentColor"})]}),e.jsxs("div",{className:"cd-core",children:[e.jsx("span",{className:"cd-label",children:"Conductor"}),e.jsx("span",{className:"cd-orb-entry","aria-hidden":"true",children:e.jsx("span",{ref:n,className:"cd-mark",children:e.jsx(pe,{state:"resting",size:138})})})]}),e.jsxs("svg",{className:"cd-trace cd-trace--out",viewBox:"0 0 120 20",width:"120",height:"20","aria-hidden":"true",focusable:"false",children:[e.jsx("path",{className:"cd-draw",pathLength:"1",d:"M2 10H120",fill:"none",stroke:"currentColor",strokeWidth:"1"}),e.jsx("circle",{cx:"2",cy:"10",r:"2.5",fill:"currentColor"})]}),e.jsxs("div",{className:"cd-models",children:[e.jsx("p",{className:"sr-only",children:"Starchild reaches OpenAI, xAI, DeepSeek, Qwen, Claude and Kimi, and picks between them for each task."}),e.jsx("div",{className:"cd-marquee","aria-hidden":"true",children:e.jsx("ul",{className:"cd-track",children:[...Et,...Et].map((s,i)=>e.jsx(Un,{name:s.name,logo:s.logo},`${s.logo}-${i}`))})}),e.jsx("div",{className:"cd-marquee cd-marquee--reverse","aria-hidden":"true",children:e.jsx("ul",{className:"cd-track",children:[...Et,...Et].map((s,i)=>e.jsx(Un,{name:s.name,logo:s.logo},`${s.logo}-${i}`))})})]}),e.jsxs("div",{className:"cd-result",children:[e.jsx("span",{children:"Result"}),e.jsx("p",{children:"One answer, routed to the right model."})]})]})]}),e.jsx("style",{children:`
        .cd-section {
          position: relative; overflow: hidden;
          /* so the rakes can sit under the drawing without falling behind the
             section's own ground — a negative layer needs a context to be
             negative inside of */
          isolation: isolate;
          padding: 100px 0;
          background: transparent;
          font-family: var(--font-google-sans);
        }

        /* ---------- the two rakes ----------

           The drawn shape at its own proportion — 1016 × 966, scaled by width and
           given the height that goes with it, so nothing in it stretches. All
           that is decided here is where each one enters and how much of it the
           section keeps.

           They hang a little above the top edge and a little outside the side
           edge, which puts the corner the gradient is hot at just off the page.
           What is left on the page is the shape falling away from that corner,
           and the section's own overflow does the cropping — the same job the
           artboard was doing around the original.

           Behind the drawing on a layer of their own, so nothing in the wiring is
           measured against them. */
        .cd-rake {
          position: absolute; top: -70px; z-index: -1;
          width: 760px; height: 723px;
          pointer-events: none;
        }
        /* One shape, entered from either side. The right is the left mirrored, so
           on both of them the corner it is lit from is the corner it comes in
           through. */
        .cd-rake--l { left: -150px; }
        .cd-rake--r { right: -150px; transform: scaleX(-1); }

        .cd-heading { margin: 0 0 80px; text-align: center; }
        .cd-title {
          margin: 0;
          text-align: center;
          font-size: 42px; line-height: 50px; font-weight: 500;
          letter-spacing: 0; color: #fff; text-wrap: balance;
        }
        .cd-subtitle {
          margin: 16px auto 0;
          color: rgba(255,255,255,.72);
          font-size: 16px; line-height: 1.55; font-weight: 400;
        }

        /* Five tracks in one row — see the note above for why the outer two are
           the same 1fr. */
        .cd-stage {
          --row: 48px;
          position: relative;
          display: grid;
          grid-template-columns: minmax(min-content, 1fr) 120px auto 120px minmax(0, 1fr);
          align-items: center;
          max-width: 1030px; margin-inline: auto;
          padding-bottom: 0;
        }

        /* ---------- what it knows ---------- */

        /* The list and its elbows, lifted half a row together — see the note
           above for what the lift is for. One transform on the pair rather than
           one each: they are drawn against each other, so they must never be able
           to drift apart. */
        .cd-side {
          display: flex; align-items: center; justify-content: flex-end;
          transform: translateY(calc(var(--row) / -2));
        }

        .cd-knows {
          position: relative; flex: 1; margin: 0; padding: 0; list-style: none;
        }

        .cd-known {
          display: flex; align-items: center; gap: 8px;
          height: var(--row); padding-right: 32px;
          border-bottom: 1px solid rgba(248,70,0,.32);
          font-size: 18px; letter-spacing: 0; color: #fff;
          white-space: nowrap;
        }
        .cd-known svg { color: #f84600; flex: none; }

        /* ---------- traces ---------- */

        .cd-trace {
          position: relative; flex: none;
          color: rgba(248,70,0,.32);
          /* the last path runs along the bottom edge of the box, and half a
             stroke of it falls outside */
          overflow: visible;
        }
        /* the stretch into the mark, and the one out of it, are the live ends —
           so both terminals are full accent rather than line colour */
        .cd-trace circle { color: #f84600; }
        .cd-draw { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
        .cd-trace circle { opacity: 0; }
        .cd-stage--active .cd-draw { animation: cd-trace-draw .74s cubic-bezier(.16, 1, .3, 1) forwards; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(1) { animation-delay: .06s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(2) { animation-delay: .13s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(3) { animation-delay: .20s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(4) { animation-delay: .27s; }
        .cd-stage--active .cd-elbows .cd-draw:nth-child(5) { animation-delay: .34s; }
        .cd-stage--active .cd-trace--in .cd-draw { animation-delay: .68s; }
        .cd-stage--active .cd-trace--out .cd-draw { animation-delay: 1.15s; }
        .cd-stage--active .cd-trace circle { animation: cd-node-in .25s ease-out forwards; }
        .cd-stage--active .cd-trace--in circle { animation-delay: 1.36s; }
        .cd-stage--active .cd-trace--out circle { animation-delay: 1.83s; }
        @keyframes cd-trace-draw { to { stroke-dashoffset: 0; opacity: 1; } }
        @keyframes cd-node-in { to { opacity: 1; } }

        /* ---------- the mark ---------- */

        .cd-core {
          position: relative; display: grid; place-items: center;
          width: 190px; height: 190px;
        }

        .cd-label {
          position: absolute; top: -56px;
          font-size: 12px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          /* Orange, not the amber every other eyebrow takes: this one names the
             mark directly under it rather than labelling a section. */
          color: #f84600; white-space: nowrap;
        }

        .cd-orb-entry {
          display: grid; place-items: center;
          width: 138px; height: 138px;
          opacity: 1; transform: scale(1);
        }
        .cd-mark { position: relative; display: inline-flex; z-index: 1; }

        /* ---------- the answer ----------
           The beam leaves the bottom of the mark and widens as it falls. Blurred
           rather than gradient-edged: a cone with a hard clipped edge reads as a
           shape lying on the page, not as light coming off something. */

        .cd-result {
          position: relative; grid-column: 1 / -1;
          display: grid; place-items: center;
          width: 100%; min-height: 106px; margin-top: 48px; padding: 22px;
          border: 1px solid rgba(248,70,0,.42); border-radius: 12px;
          background: rgba(248,70,0,.085); text-align: center;
          opacity: 0; transform: translateY(8px);
        }
        .cd-result::before {
          content: ""; position: absolute; left: 50%; bottom: 100%;
          width: 1px; height: 100px;
          background: rgba(248,70,0,.52);
          transform: scaleY(0); transform-origin: 50% 0;
        }
        .cd-result span {
          color: #f84600; font-size: 11px; line-height: 1;
          font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
        }
        .cd-result p {
          margin: 12px 0 0; color: rgba(255,255,255,.58);
          font-size: 16px; line-height: 1.4; font-weight: 500;
        }
        .cd-stage--active .cd-result { animation: cd-result-in .5s ease-out 1.52s forwards; }
        .cd-stage--active .cd-result::before { animation: cd-result-line .72s cubic-bezier(.16, 1, .3, 1) 1.12s forwards; }
        @keyframes cd-result-in { to { opacity: 1; transform: translateY(0); } }
        @keyframes cd-result-line { to { transform: scaleY(1); } }

        /* ---------- what it can reach ---------- */

        .cd-models {
          position: relative;
          display: grid; gap: 16px;
          padding-block: 18px;
          border: 1px solid rgba(248,70,0,.32);
          border-radius: 12px;
          overflow: hidden;
        }

        .cd-marquee {
          position: relative; overflow: hidden;
          /* Soft at both ends, so a logo enters and leaves rather than appearing
             and vanishing against the border it is passing. */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%);
        }

        .cd-track {
          display: flex; align-items: center; gap: 56px;
          width: max-content; margin: 0; padding: 0; list-style: none;
          animation: cd-marquee 34s linear infinite;
        }

        .cd-marquee--reverse .cd-track { animation-name: cd-marquee-reverse; }

        /* Travels exactly one half of the doubled list, so the restart lands
           where the first slide already was and the seam is not visible. */
        @keyframes cd-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes cd-marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .cd-models:hover .cd-track { animation-play-state: paused; }

        .cd-model {
          flex: none; white-space: nowrap;
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,.55);
        }
        .cd-model img { height: 22px; width: auto; display: block; }

        @media (prefers-reduced-motion: reduce) {
          .cd-track { animation: none; }
          .cd-draw { stroke-dashoffset: 0; opacity: 1; }
          .cd-trace circle, .cd-orb-entry, .cd-result { opacity: 1; animation: none; }
          .cd-orb-entry { transform: scale(1); }
          .cd-result { transform: none; }
          .cd-result::before { transform: scaleY(1); }
        }

        /* Below this the five-track row cannot hold: the traces are drawn at a
           fixed 120 wide and the mark is 190, so the two text columns are what
           gets squeezed, and "Current task" is the first thing to wrap. The
           drawing stacks instead — the wiring is what goes, because a trace that
           has to bend around a column break is no longer describing a path. */
        @media (max-width: 1000px) {
          .cd-section { padding: 60px 0; }
          /* Scaled with the section rather than left at desktop size, where two
             760-wide shapes on a 700-wide page overlap down the middle and stop
             being two lights. */
          .cd-rake { width: 460px; height: 437px; top: -40px; }
          .cd-rake--l { left: -110px; }
          .cd-rake--r { right: -110px; }
          .cd-heading { margin-bottom: 56px; }
          .cd-title { font-size: 38px; line-height: 48px; }
          .cd-stage {
            grid-template-columns: minmax(0, 1fr);
            justify-items: center; gap: 40px;
            padding-bottom: 0;
          }
          .cd-side { display: block; transform: none; }
          .cd-trace { display: none; }
          .cd-known { padding-right: 0; min-width: 200px; }
          .cd-models { width: 100%; }
          .cd-result { margin-top: 0; }
          .cd-result::before { display: none; }
        }
      `})]})}const Rl=Object.keys(Pt);function $l(){return e.jsxs("div",{className:"fs-sheet",children:[Rl.map(t=>e.jsxs("div",{className:"fs-cell",children:[e.jsx(Rs,{mood:t,size:150}),e.jsx("span",{className:"fs-name",children:t})]},t)),e.jsx("style",{children:`
        .fs-sheet {
          min-height: 100vh; background: #050506;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 64px 40px; align-content: center;
          padding: 80px 60px;
        }
        .fs-cell { display: flex; flex-direction: column; align-items: center; gap: 26px; }
        .fs-name {
          font-family: var(--font-google-sans); font-size: 12px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.5);
        }
        @media (max-width: 900px) { .fs-sheet { grid-template-columns: repeat(2, 1fr); } }
      `})]})}function Fl(){return typeof window>"u"?!1:new URLSearchParams(window.location.search).get("faces")==="1"}function Wl({onEnterGuest:t,onStartTask:a,onNavigateConnectors:n,onNavigatePricing:s,onLogIn:i,onSignUp:o}){return Fl()?e.jsx($l,{}):e.jsxs("div",{className:"bg-[#050506]",children:[e.jsx($s,{onEnterGuest:t,onStartTask:a,onNavigateHome:()=>window.scrollTo({top:0}),onNavigatePricing:s,onLogIn:i,onSignUp:o}),e.jsx(El,{}),e.jsx(Fs,{onSeeAll:n}),e.jsx(Ll,{}),e.jsx(je,{headline:"Whatever comes next, Starchild is already with you.",onStartFree:()=>t(),onNavigatePricing:s})]})}const Pl=[{title:"Market research",copy:"Funding, liquidations, volatility and context."},{title:"Structured strategy",copy:"Entry, exit, sizing and invalidation rules."},{title:"Controlled execution",copy:"Orders on Hyperliquid, inside the permissions you approved."},{title:"24/7 monitoring",copy:"Jobs, alerts and automatic reports."},{title:"Visibility",copy:"Dashboards for PnL, margin, risk and positions."}],Bl=[{n:"01",title:"Connect Starchild to Hyperliquid",copy:"Choose how Starchild is allowed to operate on Hyperliquid."},{n:"02",title:"Design the strategy with the agent",copy:"Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules."},{n:"03",title:"Fund the strategy",copy:"Deposit USDC and make available the balance the strategy will use."},{n:"04",title:"Monitor performance and risk",copy:"Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you."}],Dl=[{method:"Native Agent Wallet",custody:"Non-custodial (Privy); exportable key.",edge:"The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”."},{method:"Hyperliquid API wallet",custody:"Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",edge:"More separation between custody and execution; the credential goes through a secure flow, never through the chat."},{method:"Third-party builders",custody:"A trading account you authorize separately.",edge:"Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard)."}],Ol=["Trend","Volatility","Book liquidity","Funding","Open interest","Liquidations","Market context"],Hl="./images/empresas.svg",ql=6,Gl=["Coinglass","DeFiLlama","CoinGecko","TAAPI","Onchain data","Market APIs"],_l=[{title:"Independent strategies",copy:"Each asset or strategy carries its own rules, capital, positions, orders, performance and logs."},{title:"Shared execution layer",copy:"Checks balances and permissions before any order is submitted."},{title:"Independent risk layer",copy:"Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",hard:!0}];function Yl(){const t={r:4,fill:"var(--color-primary)"},a={duration:1.1,ease:[.16,1,.3,1],delay:.25},n={duration:1,ease:[.16,1,.3,1],delay:1.5};return e.jsx("div",{className:"tr-flowbox",children:e.jsxs("svg",{viewBox:"0 0 560 200",className:"tr-flowsvg",role:"img","aria-label":"Your strategy and market data both feed Conductor, which picks the models and tools for each part of the task and returns one analysis.",children:[e.jsx("path",{d:"M150 52 H210 Q230 52 230 72 V88",className:"tr-fl"}),e.jsx("path",{d:"M150 148 H210 Q230 148 230 128 V112",className:"tr-fl"}),e.jsx("path",{d:"M330 100 H392",className:"tr-fl"}),e.jsx("path",{d:"M470 128 V148 Q470 168 450 168 H150",className:"tr-fl"}),e.jsx("rect",{x:"20",y:"32",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"57",className:"tr-ftext",children:"Your strategy"}),e.jsx("rect",{x:"20",y:"128",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"153",className:"tr-ftext",children:"Market data"}),e.jsx("rect",{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fnode tr-fnode--hi"}),e.jsx("text",{x:"280",y:"105",className:"tr-ftext tr-ftext--hi",children:"Conductor"}),e.jsx("rect",{x:"392",y:"76",width:"156",height:"48",rx:"12",className:"tr-fnode"}),e.jsx("text",{x:"470",y:"99",className:"tr-ftext",children:"AI models"}),e.jsx("text",{x:"470",y:"115",className:"tr-ftext tr-ftext--sub",children:"+ the tools for the job"}),e.jsx("text",{x:"150",y:"172",className:"tr-ftext tr-ftext--end",textAnchor:"start",children:"Analysis"}),e.jsx(m.circle,{...t,initial:{cx:150,cy:52,opacity:0},whileInView:{cx:[150,230,230],cy:[52,52,90],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(m.circle,{...t,initial:{cx:150,cy:148,opacity:0},whileInView:{cx:[150,230,230],cy:[148,148,110],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(m.rect,{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fpulse",initial:{opacity:0},whileInView:{opacity:[0,.9,0]},viewport:{once:!0,amount:.6},transition:{duration:.9,delay:1.2}}),e.jsx(m.circle,{...t,initial:{cx:330,cy:100,opacity:0},whileInView:{cx:[330,470,470,190],cy:[100,100,168,168],opacity:[0,1,1,0]},viewport:{once:!0,amount:.6},transition:n})]})})}function Vl({onNavigateHome:t,onNavigatePricing:a,onEnterGuest:n,onLogIn:s,onSignUp:i}){const o=()=>n("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");return e.jsxs("div",{className:"tr-page",children:[e.jsx($a,{onNavigateHome:t,onNavigateTraders:()=>window.scrollTo({top:0,behavior:"smooth"}),onNavigatePricing:a,onLogIn:s,onSignUp:i}),e.jsx("section",{className:"pt-8 pb-24 md:pt-10 md:pb-32",children:e.jsxs(O,{children:[e.jsxs("nav",{className:"tr-crumbs","aria-label":"Breadcrumb",children:[e.jsxs("button",{type:"button",onClick:t,className:"tr-crumb-link",children:[e.jsx(Dt,{className:"size-3.5"}),"Home"]}),e.jsx("span",{className:"tr-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"tr-crumb-here","aria-current":"page",children:"For Traders"})]}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6 md:mt-20",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(m.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"tr-eyebrow",children:"Starchild for traders · Hyperliquid"}),e.jsx(m.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you know about the market into a strategy that runs."}),e.jsx(m.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Turn your trading logic into rules, research the market, execute on Hyperliquid and keep the strategy monitored around the clock."}),e.jsxs(m.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:o,className:"tr-cta",children:["Build a strategy",e.jsx(J,{className:"size-3.5 rotate-45"})]}),e.jsx("span",{className:"tr-cta-note",children:"No account needed to start"})]})]})})]})}),e.jsxs("section",{className:"tr-band py-16 md:py-20",children:[e.jsx(O,{children:e.jsx("p",{className:"tr-strip-label",children:"Built around the ecosystem traders already use."})}),e.jsx("div",{className:"tr-strip-viewport mt-9","aria-hidden":"true",children:e.jsx("div",{className:"tr-strip-track",children:Array.from({length:ql},(r,c)=>e.jsx("img",{src:Hl,alt:"",className:"tr-strip-img"},c))})})]}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("h2",{className:"tr-h2",children:"From knowledge to execution."}),e.jsx("p",{className:"tr-lead",children:"Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the decision layer: you explain your logic, set the conditions and the limits, and the agent turns that into an executable flow — research, execution, risk control and continuous monitoring."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-label",children:"What Starchild turns into a system"}),e.jsx("ul",{className:"tr-system",children:Pl.map(({title:r,copy:c})=>e.jsxs("li",{children:[e.jsx("span",{className:"tr-system-title",children:r}),e.jsx("span",{className:"tr-system-copy",children:c})]},r))})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(O,{children:[e.jsx("h2",{className:"tr-h2 max-w-[24ch]",children:"Trade perps with an agent, in four steps."}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Bl.map(({n:r,title:c,copy:p},d)=>e.jsxs(m.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:d%4*.06,ease:[.16,1,.3,1]},className:"tr-step col-span-12 sm:col-span-6 lg:col-span-3",children:[e.jsx("span",{className:"tr-step-n",children:r}),e.jsx("span",{className:"tr-step-title",children:c}),e.jsx("span",{className:"tr-step-copy",children:p})]},r))})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsxs(O,{children:[e.jsx("p",{className:"tr-step-tag",children:"Step 1"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[26ch]",children:"Connect Starchild to Hyperliquid."}),e.jsx("p",{className:"tr-lead mt-5 max-w-[70ch]",children:"The first decision is how Starchild is allowed to operate. There are three routes: the native Agent Wallet, a Hyperliquid API wallet, or a third-party builder."}),e.jsxs("div",{className:"tr-table mt-12",children:[e.jsxs("div",{className:"tr-tr tr-tr--head",children:[e.jsx("span",{children:"Method"}),e.jsx("span",{children:"Custody"}),e.jsx("span",{children:"What it gives you"})]}),Dl.map(({method:r,custody:c,edge:p})=>e.jsxs("div",{className:"tr-tr",children:[e.jsx("span",{className:"tr-td-method",children:r}),e.jsx("span",{children:c}),e.jsx("span",{children:p})]},r))]})]})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(O,{children:[e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-6",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 2"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Design the strategy with the agent."}),e.jsx("p",{className:"tr-lead mt-5",children:"Instead of trading order by order, tell Starchild how you read the market, what you're trying to reach and which risks you accept. The agent researches, then helps turn that into a structured strategy — entry, position size, exit, invalidation and risk limits, all before anything executes."}),e.jsx("p",{className:"tr-label mt-10",children:"What the agent can weigh"}),e.jsx("div",{className:"tr-chips",children:Ol.map(r=>e.jsx("span",{className:"tr-chip",children:r},r))}),e.jsxs("p",{className:"tr-flow",children:["your logic ",e.jsx("span",{"aria-hidden":"true",children:"→"})," analysis ",e.jsx("span",{"aria-hidden":"true",children:"→"})," rules"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})," strategy"]})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-5 lg:col-start-8",children:[e.jsxs("div",{className:"tr-prompt",children:[e.jsx("p",{className:"tr-label",children:"Example prompt"}),e.jsx("p",{className:"tr-prompt-body",children:"“I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity and funding, and help me define entry, position size, invalidation, max loss and two exit scenarios. Don't execute anything yet.”"}),e.jsxs("button",{type:"button",onClick:o,className:"tr-prompt-cta",children:["Try this",e.jsx(J,{className:"size-3.5 rotate-45"})]})]}),e.jsx("p",{className:"tr-label mt-12",children:"Risk architecture, in layers"}),e.jsx("div",{className:"tr-layers",children:_l.map(({title:r,copy:c,hard:p})=>e.jsxs("div",{className:`tr-layer${p?" tr-layer--hard":""}`,children:[e.jsx("span",{className:"tr-layer-title",children:r}),e.jsx("span",{className:"tr-layer-copy",children:c})]},r))})]})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Market intelligence"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Data from the tools traders already rely on."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild can bring market data, technical signals and external sources into the same analysis — so the strategy isn't built from a model's memory alone."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsxs("div",{className:"tr-sources",children:[e.jsx("p",{className:"tr-label",children:"Sources"}),e.jsx("div",{className:"tr-chips",children:Gl.map(r=>e.jsx("span",{className:"tr-chip",children:r},r))}),e.jsxs("div",{className:"tr-converge","aria-hidden":"true",children:[e.jsx("span",{className:"tr-converge-line"}),e.jsx("span",{className:"tr-converge-dot"}),e.jsx("span",{className:"tr-converge-line"})]}),e.jsxs("div",{className:"tr-analysis",children:[e.jsx("span",{className:"tr-analysis-title",children:"One analysis"}),e.jsx("span",{className:"tr-analysis-copy",children:"Funding, positioning and price read together, against your rules."})]})]})})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Conductor Mode"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Different market questions need different intelligence."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild combines your strategy context with the right models and tools for each part of the task."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsx(Yl,{})})]})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 3"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[18ch]",children:"Fund the strategy."}),e.jsx("p",{className:"tr-lead mt-5",children:"Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid. No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets you already hold."}),e.jsxs("div",{className:"tr-approvals",children:[e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 1"}),e.jsx("span",{className:"tr-approval-copy",children:"Enables trading through the Agent Wallet."})]}),e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 2"}),e.jsx("span",{className:"tr-approval-copy",children:"Authorizes Starchild's builder code, within the fee limit you approved."})]})]}),e.jsx("p",{className:"tr-note",children:"After those two, the strategy can execute — inside the permissions and limits you set."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 4"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Monitor performance and risk."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and the health of the strategy. Those checks are what feed the alerts and the reports."}),e.jsxs("div",{className:"tr-cards",children:[e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Daily report"}),e.jsx("span",{className:"tr-card-copy",children:"Positions, realized and unrealized PnL, funding, fees, margin, exceptions and recommended actions."})]}),e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Alerts by exception"}),e.jsx("span",{className:"tr-card-copy",children:"Silent while everything is healthy. When something needs attention, the alert arrives with the context and a recommended action."})]})]}),e.jsx("p",{className:"tr-note",children:"It can also build custom dashboards — positions, margin, leverage, distance to liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's HyperTracker, HypurrScan and the Hyperliquid Explorer."})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsx(O,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Trading is part of the foundation."}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[16ch]",children:"Built with trading in its DNA."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-lead",children:"Starchild comes from an ecosystem with deep roots in trading, market infrastructure and crypto. That experience shapes how the product approaches data, execution and risk."}),e.jsx("div",{className:"tr-heritage",children:["WOO","WOOFi Pro","Orderly"].map(r=>e.jsx("span",{className:"tr-heritage-mark",children:r},r))})]})]})})}),e.jsx("section",{className:"py-28 text-center md:py-36",children:e.jsx(O,{children:e.jsxs("div",{className:"mx-auto flex max-w-[46ch] flex-col items-center gap-8",children:[e.jsx("h2",{className:"text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"You define the logic and the limits. Starchild keeps it running."}),e.jsx("p",{className:"tr-lead text-center",children:"Research, rules, execution inside approved permissions, risk control and continuous monitoring — one cycle instead of five tools."}),e.jsxs("button",{type:"button",onClick:o,className:"tr-cta",children:["Build a strategy",e.jsx(J,{className:"size-3.5 rotate-45"})]}),e.jsxs("div",{className:"tr-tags",children:[e.jsx("span",{children:"Repeatable"}),e.jsx("span",{children:"Monitorable"}),e.jsx("span",{children:"Verifiable"})]})]})})}),e.jsx("style",{children:`
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
      `})]})}const Xn=[{name:"Pague conforme o uso",price:"$~",allowance:"Preços baseados em uso",cta:"+ Recarregar",monthly:["Recarregue qualquer valor, a qualquer momento","Pague apenas pelo que você usa","Sem compromisso mensal"],machine:"Máquina Gratuita com Pagamento por Uso",specs:"2 vCPU Compartilhado · 1GB Memory · 1GB Storage",fit:"Melhor para: uso ocasional / exploração",foot:"Fundos nunca expiram — cobrado pelo uso real"},{name:"Lite",previous:"$60",price:"$19",allowance:"Limite diário de $2",cta:"Obter Lite",monthly:["30 painéis de monitoramento de mercado ou","40 apresentações (PPTs) ou","300 tarefas de análise de código"],machine:"Máquina Lite Gratuita",specs:"2 vCPU Compartilhado · 1GB Memory · 1GB Storage",fit:"Ideal para: tarefas diárias / automação leve",foot:"Limite diário de $2"},{name:"Plus",previous:"$300",price:"$79",allowance:"Limite diário de $10",cta:"Obter Plus",monthly:["150 painéis de monitoramento de mercado, ou","200 apresentações (PPTs), ou","1.500 tarefas de análise de código"],machine:"Máquina Plus Gratuita",specs:"4 vCPU Compartilhado · 2GB Memory · 2GB Storage",fit:"Ideal para: desenvolvedores individuais / traders",foot:"Limite diário de $10/dia",popular:!0},{name:"Pro",previous:"$900",price:"$199",allowance:"Limite diário de $30",cta:"Obter Pro",monthly:["450 dashboards de monitoramento de mercado, ou","600 apresentações (PPTs), ou","4.500 tarefas de análise de código"],machine:"Máquina Pro Gratuita",specs:"8 vCPU Compartilhado · 4GB Memory · 10GB Storage",fit:"Melhor para: desenvolvedores profissionais / fluxos de trabalho automatizados de equipe",foot:"Limite diário de $30/dia"}];function Ul(){return e.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("rect",{x:"1.6",y:"2.4",width:"12.8",height:"8.6",rx:"1.4"}),e.jsx("path",{d:"M5.4 14h5.2M8 11v3"})]})}function Xl({onChoosePlan:t,standalone:a=!1}){const[n,s]=l.useState("general"),i=n==="general"?Xn.slice(0,2):Xn.slice(2);return e.jsxs("section",{className:`lp-pricing${a?" lp-pricing--page":""}`,"aria-label":"Planos e preços",children:[e.jsxs(O,{children:[e.jsxs(m.div,{className:"lp-pricing-intro",initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,ease:[.16,1,.3,1]},children:[e.jsx("h1",{children:"Don’t subscribe to every AI."}),e.jsx("p",{children:"Use the right one."}),e.jsxs("div",{className:"lp-value-banner",children:[e.jsxs("div",{className:"lp-value-side",children:[e.jsx("span",{className:"lp-value-label",children:"Without Starchild"}),e.jsx("p",{children:"Separate AI tools. Separate chats. Separate costs."})]}),e.jsx("span",{className:"lp-value-divider","aria-hidden":"true",children:"vs"}),e.jsxs("div",{className:"lp-value-side lp-value-side--active",children:[e.jsx("span",{className:"lp-value-label",children:"With Starchild"}),e.jsx("p",{children:"One place to chat, create, research, and run agents."})]})]}),e.jsxs("div",{className:"lp-pricing-tabs",role:"tablist","aria-label":"Choose how you use Starchild",children:[e.jsx("button",{type:"button",role:"tab","aria-selected":n==="general",className:n==="general"?"lp-pricing-tab lp-pricing-tab--active":"lp-pricing-tab",onClick:()=>s("general"),children:"Everyday use"}),e.jsx("button",{type:"button",role:"tab","aria-selected":n==="traders",className:n==="traders"?"lp-pricing-tab lp-pricing-tab--active":"lp-pricing-tab",onClick:()=>s("traders"),children:"Advanced workflows"})]})]}),e.jsx("div",{className:"lp-pricing-grid",role:"tabpanel","aria-label":n==="general"?"Everyday use plans":"Advanced workflow plans",children:i.map((o,r)=>e.jsxs(m.article,{className:"lp-price-card",initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.15},transition:{duration:.45,delay:r*.05,ease:[.16,1,.3,1]},children:[e.jsxs("div",{className:"lp-price-top",children:[e.jsxs("h2",{className:"lp-price-name",children:[o.name,o.popular&&e.jsx("span",{className:"lp-price-badge",children:"Mais popular"})]}),e.jsxs("p",{className:"lp-price",children:[o.previous&&e.jsx("span",{className:"lp-price-previous",children:o.previous}),e.jsx("span",{className:"lp-price-amount",children:o.price}),e.jsx("span",{className:"lp-price-period",children:"/Mês"})]}),e.jsx("p",{className:"lp-price-allowance",children:o.allowance}),e.jsx("p",{className:"lp-price-models",children:"Acesso a mais de 40 modelos"})]}),e.jsxs("button",{type:"button",className:"lp-price-cta",onClick:t,children:[o.cta," ",e.jsx("span",{"aria-hidden":"true",children:"↗"})]}),e.jsx("p",{className:"lp-price-fit",children:o.fit}),e.jsxs("div",{className:"lp-price-list-block",children:[e.jsx("p",{className:"lp-price-list-title",children:o.name==="Pague conforme o uso"?"Como funciona:":"A cada mês, você pode construir:"}),e.jsx("ul",{className:"lp-price-list",children:o.monthly.map(c=>e.jsx("li",{children:c},c))})]}),e.jsxs("div",{className:"lp-price-machine",children:[e.jsxs("p",{className:"lp-price-machine-title",children:[e.jsx(Ul,{}),o.machine]}),e.jsx("p",{children:o.specs}),e.jsx("small",{children:o.foot})]})]},o.name))})]}),e.jsx("style",{children:`
        .lp-pricing { padding: 76px 0 116px; background: transparent; font-family: var(--font-google-sans); }
        .lp-pricing-intro { max-width: 920px; margin: 0 auto 42px; text-align: center; color: #fff; }
        .lp-pricing-intro h1 { margin: 0; font-size: 42px; line-height: 50px; font-weight: 500; letter-spacing: 0; }
        .lp-pricing-intro > p { max-width: 620px; margin: 14px auto 0; color: #f84600; font-size: clamp(22px, 2.3vw, 28px); font-weight: 600; line-height: 1.2; letter-spacing: -.025em; text-wrap: balance; }
        .lp-value-banner { display: grid; grid-template-columns: minmax(0, 1fr) 42px minmax(0, 1fr); align-items: stretch; gap: 16px; margin-top: 28px; padding: 8px; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; background: rgba(255,255,255,.018); text-align: left; }
        .lp-value-side { display: flex; flex-direction: column; justify-content: center; min-height: 76px; padding: 14px 18px; border-radius: 10px; }
        .lp-value-side--active { background: linear-gradient(110deg, rgba(248,70,0,.16), rgba(248,70,0,.055)); box-shadow: inset 0 0 0 1px rgba(248,70,0,.2); }
        .lp-value-label { color: rgba(255,255,255,.52); font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
        .lp-value-side--active .lp-value-label { color: #ff8a5c; }
        .lp-value-side p { margin: 6px 0 0; color: rgba(255,255,255,.72); font-size: 14px; line-height: 1.4; }
        .lp-value-side--active p { color: rgba(255,255,255,.9); }
        .lp-value-divider { display: grid; place-items: center; color: rgba(255,255,255,.34); font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
        .lp-pricing-tabs { display: inline-flex; gap: 4px; margin-top: 26px; padding: 4px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; background: rgba(255,255,255,.025); }
        .lp-pricing-tab { min-width: 118px; padding: 10px 16px; border: 0; border-radius: 999px; background: transparent; color: rgba(255,255,255,.52); cursor: pointer; font: 600 13px/1 var(--font-google-sans); transition: background .2s ease, color .2s ease; }
        .lp-pricing-tab:hover { color: #fff; }
        .lp-pricing-tab--active { background: #f84600; color: #fff; }
        .lp-pricing-tab:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .lp-pricing-grid { display: grid; width: 100%; max-width: 900px; margin: 0 auto; gap: 16px; }
        .lp-price-card { display: flex; flex-direction: column; min-height: 580px; padding: 36px; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: rgba(255,255,255,.015); color: #fff; }
        .lp-price-top { display: flex; flex-direction: column; gap: 9px; }
        .lp-price-name { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 28px; line-height: 1.08; font-weight: 600; letter-spacing: -.035em; }
        .lp-price-badge { padding: 5px 10px; border-radius: 999px; background: #f84600; font-size: 10px; font-weight: 700; letter-spacing: .01em; }
        .lp-price { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin: 4px 0 0; }
        .lp-price-previous { color: rgba(255,255,255,.35); font-size: 18px; text-decoration: line-through; }
        .lp-price-amount { color: #f84600; font-size: 52px; line-height: 1; font-weight: 700; letter-spacing: -.05em; }
        .lp-price-period { color: rgba(255,255,255,.5); font-size: 16px; }
        .lp-price-allowance { margin: 0; font-size: 19px; font-weight: 600; letter-spacing: -.02em; }
        .lp-price-models { margin: 0; color: rgba(255,255,255,.42); font-size: 14px; }
        .lp-price-cta { width: 100%; margin-top: 28px; padding: 15px 18px; border: 0; border-radius: 999px; background: #fff; color: #0a0a0a; cursor: pointer; font: 600 15px/1 var(--font-google-sans); transition: background .2s ease, transform .2s ease; }
        .lp-price-cta:hover { background: rgba(255,255,255,.86); }
        .lp-price-cta:active { transform: translateY(1px); }
        .lp-price-cta:focus-visible { outline: 2px solid #f84600; outline-offset: 3px; }
        .lp-price-list-block { margin-top: 38px; }
        .lp-price-list-title { margin: 0 0 16px; color: rgba(255,255,255,.5); font-size: 14px; font-weight: 600; }
        .lp-price-list { display: flex; flex-direction: column; gap: 14px; margin: 0; padding-left: 17px; color: rgba(255,255,255,.66); font-size: 15px; line-height: 1.5; }
        .lp-price-list li::marker { color: rgba(255,255,255,.42); }
        .lp-price-machine { margin-top: auto; padding-top: 28px; border-top: 1px solid rgba(255,255,255,.09); color: rgba(255,255,255,.48); font-size: 14px; line-height: 1.5; }
        .lp-price-machine p { margin: 0 0 18px; }
        .lp-price-machine-title { display: flex; align-items: center; gap: 9px; color: rgba(255,255,255,.65); font-size: 15px; font-weight: 600; }
        .lp-price-machine-title svg { flex: none; width: 16px; height: 16px; }
        .lp-price-fit { margin: 22px 0 0; padding: 10px 12px; border-left: 2px solid rgba(248,70,0,.8); border-radius: 0 8px 8px 0; background: rgba(248,70,0,.07); color: rgba(255,255,255,.82); font-size: 14px; font-weight: 500; line-height: 1.45; }
        .lp-price-machine small { color: rgba(255,255,255,.28); font-size: 13px; }
        @media (min-width: 720px) { .lp-pricing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1180px) { .lp-pricing-grid { gap: 26px; } .lp-price-card { min-height: 720px; padding: 38px 36px; } .lp-price-name { font-size: 30px; } }
        @media (max-width: 640px) { .lp-pricing { padding-top: 60px; } .lp-pricing-intro { margin-bottom: 32px; } .lp-pricing-intro h1 { font-size: 38px; line-height: 48px; } .lp-value-banner { grid-template-columns: 1fr; gap: 3px; } .lp-value-divider { height: 22px; } .lp-value-side { min-height: 0; padding: 14px 15px; } }
        @media (max-width: 480px) { .lp-pricing { padding-bottom: 72px; } .lp-price-card { min-height: 0; padding: 28px 24px; } .lp-price-amount { font-size: 46px; } }
        @media (prefers-reduced-motion: reduce) { .lp-price-cta { transition: none; } }
      `})]})}function Kl({onNavigateHome:t,onLogIn:a,onSignUp:n,onChoosePlan:s}){return e.jsxs("div",{className:"min-h-screen bg-[#050506]",children:[e.jsx(Da,{onNavigateHome:t,onLogIn:a,onSignUp:n}),e.jsx(Xl,{onChoosePlan:s,standalone:!0})]})}const Zl="abcdefghijklmnopqrstuvwxyz",Kn=32;function Ql({at:t,count:a,onChange:n}){const s=i=>Zl[i].toUpperCase();return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${s(t)}`,style:{width:a*Kn,gridTemplateColumns:`repeat(${a}, 1fr)`},children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${t*Kn}px)`},children:s(t)}),Array.from({length:a},(i,o)=>e.jsx("button",{type:"button",role:"radio","aria-checked":o===t,"aria-label":`Landing version ${s(o)}`,onClick:()=>n(o),className:`vt-side${o===t?" vt-side--on":""}`,children:s(o)},o))]}),e.jsx("style",{children:`
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

        /* width and columns come from the line's length — see the style above */
        .vt-track {
          position: relative; display: grid; align-items: center;
          height: 30px; border-radius: 999px;
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
      `})]})}function Jl({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function ec({name:t,tagline:a,colors:n}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:n.map(s=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:s},title:s},s))})]})}function tc({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function ac({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function nc({deliverable:t}){switch(t.kind){case"poster":return e.jsx(Jl,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(ec,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(tc,{rows:t.rows});case"code":return e.jsx(ac,{language:t.language,snippet:t.snippet});case"none":return null}}const sc={image:{ack:"Got it — I'll work up a poster and show you where I land.",stages:["Reading what you're after…","Working up the artwork…","Putting it together…"]},design:{ack:"Sure — I'll pull a name, a look and a palette together for it.",stages:["Getting a feel for it…","Trying a few directions…","Putting it together…"]},trading:{ack:"Okay — let me see what the market's doing and pull out what matters.",stages:["Checking the numbers…","Comparing against last week…","Putting the answer together…"]},code:{ack:"I'll read through this and work out what's going wrong.",stages:["Reading through it…","Tracing where it breaks…","Putting the answer together…"]}},ic={ack:"I'll take a look and work through this for you.",stages:["Looking through it…","Pulling out what matters…","Putting the answer together…"]},oc=180,Zn=820,Qn=1150,rc=600;function lc({scenario:t,restored:a=!1,onStep:n,onDone:s,children:i}){const{deliverable:o}=t,r=sc[t.id]??ic,[c,p]=l.useState(a),[d,h]=l.useState(-1),[x,g]=l.useState(a);return l.useEffect(()=>{if(a){p(!0),g(!0),s==null||s();return}p(!1),h(-1),g(!1);const f=[window.setTimeout(()=>p(!0),oc),...r.stages.map((u,b)=>window.setTimeout(()=>h(b),Zn+b*Qn)),window.setTimeout(()=>{g(!0),s==null||s()},Zn+r.stages.length*Qn+rc)];return()=>f.forEach(window.clearTimeout)},[t,a]),l.useEffect(()=>{n==null||n()},[c,d,x]),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(X,{children:c&&e.jsx(m.p,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"text-[15px] leading-[1.6] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:r.ack})}),e.jsx(X,{mode:"wait",children:d>=0&&!x&&e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.25}},transition:{duration:.35},children:e.jsx(Pa,{label:r.stages[Math.min(d,r.stages.length-1)]})},"thinking")}),x&&o.kind!=="none"&&e.jsx(m.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"mt-1",children:e.jsx(nc,{deliverable:o})}),i]})}const cc=[{label:"Agents",Icon:ft},{label:"Connectors",Icon:Me}],dc=[{label:"Skills",Icon:Me},{label:"Projects",Icon:Ta},{label:"Marketplace",Icon:Aa},{label:"Missions",Icon:Ma},{label:"More",Icon:Ea},{label:"Search conversations",Icon:Le}];function hc({onLockedFeature:t}){const a=({label:n,Icon:s})=>e.jsxs("button",{type:"button",onClick:t,className:"group flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] text-white/35 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"shrink-0 text-white/25 transition-colors group-hover:text-white/45",children:e.jsx(s,{className:"size-[18px]"})}),n,e.jsx(us,{className:"ml-auto size-3 shrink-0 text-white/25"})]},n);return e.jsxs("div",{className:"hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex",children:[e.jsx("button",{type:"button",className:"flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Collapse sidebar",children:e.jsx(ma,{className:"size-[18px]"})}),e.jsxs("div",{className:"mt-5 flex items-center gap-2.5 rounded-full bg-[#f84600] px-4 py-3 text-[14px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(fe,{className:"size-4.5"}),"New chat"]}),e.jsxs("div",{className:"mt-4 flex flex-col gap-0.5",children:[e.jsxs("div",{"aria-current":"page",className:"flex w-full items-center gap-3 rounded-lg bg-white/[0.09] px-2.5 py-2.5 text-[14px] text-white",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:"shrink-0 text-[#f84600]",children:e.jsx(mt,{className:"size-[18px]"})}),"Chat"]}),cc.map(a)]}),e.jsx("div",{className:"mx-2.5 mt-4 mb-1 h-px bg-white/[0.08]","aria-hidden":"true"}),e.jsx("nav",{className:"flex flex-col",children:dc.map(a)}),e.jsxs("div",{className:"mt-auto rounded-xl border border-white/[0.08] bg-white/[0.03] p-3",children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.12em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[13px] leading-relaxed text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:"Try Starchild without signing up."}),e.jsx("p",{className:"mt-1.5 text-[12.5px] leading-relaxed text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:"Create an account to save your chats, build memory, and create agents."}),e.jsx("button",{type:"button",onClick:t,className:"mt-3 w-full rounded-full bg-white/[0.08] px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.14]",style:{fontFamily:"var(--font-google-sans)"},children:"Create a free account"})]})]})}function Ps({onNewChat:t,onOpenMarketplace:a,area:n="chat",onSwitchArea:s,intro:i,accountName:o="Agent7035",conversations:r=[],onOpenConversation:c,openConversation:p,collapsed:d=!1,onToggleCollapsed:h}){const x=[{label:"Skills",Icon:Me},{label:"Projects",Icon:Ta},{label:"Marketplace",Icon:Aa,onClick:a},{label:"Missions",Icon:Ma,badge:!0},{label:"More",Icon:Ea},{label:"Search conversations",Icon:Le}],g=["chat","agents","connectors"].map(f=>({id:f,label:f==="chat"?"Chat":f==="agents"?"Agents":"Connectors",Icon:f==="chat"?mt:f==="agents"?ft:Me}));return d?e.jsxs("div",{className:"hidden w-[64px] shrink-0 flex-col items-center border-r border-white/[0.08] bg-[#0c0c0d] px-2 pt-5 pb-4 lg:flex",children:[e.jsx("button",{type:"button",onClick:h,className:"flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Expand sidebar",title:"Expand sidebar",children:e.jsx(ma,{className:"size-[18px]"})}),e.jsx("button",{type:"button",onClick:t,className:"mt-5 flex size-11 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-[1.03]","aria-label":"New chat",title:"New chat",children:e.jsx(fe,{className:"size-5"})}),e.jsx("div",{className:"mt-4 flex flex-col gap-0.5",children:g.map(({id:f,label:u,Icon:b})=>{const y=n===f;return e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(f),"aria-current":y?"page":void 0,"aria-label":u,title:u,className:`flex size-10 items-center justify-center rounded-lg transition-colors ${y?"bg-white/[0.09] text-[#f84600]":"text-white/45 hover:bg-white/[0.05] hover:text-white"}`,children:e.jsx(b,{className:"size-[18px]"})},f)})}),e.jsx("div",{className:"my-3 h-px w-7 bg-white/[0.08]","aria-hidden":"true"}),e.jsx("nav",{className:"flex flex-col gap-0.5",children:x.map(({label:f,Icon:u,badge:b,onClick:y})=>e.jsx("button",{type:"button",onClick:y,"aria-label":f,title:f,className:"flex size-10 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white",children:e.jsxs("span",{className:"relative",children:[e.jsx(u,{className:"size-[18px]"}),b&&e.jsx("span",{className:"absolute -top-0.5 -right-0.5 size-[5px] rounded-full bg-[#f84600]","aria-hidden":"true"})]})},f))}),e.jsx("span",{className:"mt-auto size-7 shrink-0 rounded-full",style:{background:"linear-gradient(140deg,#f84600,#7a4bd6 70%)"},title:o,"aria-label":o})]}):e.jsxs("div",{className:"hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex",children:[e.jsx("button",{type:"button",onClick:h,className:"flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Collapse sidebar",title:"Collapse sidebar",children:e.jsx(ma,{className:"size-[18px]"})}),e.jsxs("button",{type:"button",onClick:t,className:"mt-5 flex items-center gap-2.5 rounded-full bg-[#f84600] px-4 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.01]",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(fe,{className:"size-4.5"}),"New chat"]}),e.jsx("div",{className:"mt-4 flex flex-col gap-0.5",children:g.map(({id:f,label:u,Icon:b})=>{const y=n===f,w=(i==null?void 0:i.label)===u;return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:()=>s==null?void 0:s(f),"aria-current":y?"page":void 0,className:`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] transition-colors duration-200 ${w?"bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40":y?"bg-white/[0.09] text-white":"text-white/60 hover:bg-white/[0.05] hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:`shrink-0 ${w||y?"text-[#f84600]":"text-white/45"}`,children:e.jsx(b,{className:"size-[18px]"})}),u]}),w&&i.node]},f)})}),e.jsx("div",{className:"mx-2.5 mt-4 mb-1 h-px bg-white/[0.08]","aria-hidden":"true"}),e.jsx("nav",{className:"flex flex-col",children:x.map(({label:f,Icon:u,badge:b,onClick:y})=>{const w=(i==null?void 0:i.label)===f;return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:y,className:`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] transition-colors duration-300 ${w?"bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40":"text-white/70 hover:bg-white/[0.06] hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsxs("span",{className:`relative shrink-0 ${w?"text-[#f84600]":"text-white/55"}`,children:[e.jsx(u,{className:"size-[18px]"}),b&&e.jsx("span",{className:"absolute -top-0.5 -right-0.5 size-[5px] rounded-full bg-[#f84600]","aria-hidden":"true"})]}),f]}),(i==null?void 0:i.label)===f&&i.node]},f)})}),r.length>0&&e.jsxs("div",{className:"mt-4 flex min-h-0 flex-col",children:[e.jsx("p",{className:"px-2.5 pb-1 text-[11px] font-semibold tracking-[0.14em] text-white/25 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Recent"}),e.jsx("div",{className:"flex flex-col overflow-y-auto",children:r.map(f=>{const u=p===f.id;return e.jsxs("button",{type:"button",onClick:()=>c==null?void 0:c(f),"aria-current":u?"page":void 0,className:`flex w-full flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left transition-colors ${u?"bg-white/[0.08]":"hover:bg-white/[0.05]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{className:`truncate text-[13.5px] ${u?"text-white":"text-white/70"}`,children:f.title}),e.jsx("span",{className:"text-[11.5px] text-white/28",children:f.when})]},f.id)})})]}),e.jsxs("div",{className:"mt-auto flex items-center gap-2.5 rounded-lg px-2 py-2",children:[e.jsx("span",{className:"size-7 shrink-0 rounded-full",style:{background:"linear-gradient(140deg,#f84600,#7a4bd6 70%)"},"aria-hidden":"true"}),e.jsx("span",{className:"text-[13.5px] text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:o})]})]})}function Oa({heading:t,sub:a,ctaLabel:n="Create account & continue",backLabel:s="Sign up",footerNote:i="Already have an account?",showForm:o=!0,onBack:r,onContinue:c}){const[p,d]=l.useState("you@example.com"),[h,x]=l.useState("starchild"),g=!o||p.trim()!==""&&h.trim()!=="";return e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[r&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:r,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Dt,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:s})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(us,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[o&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:p,onChange:f=>d(f.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:h,onChange:f=>x(f.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:c,disabled:!g,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:n}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[i," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}const pc=2,Bs=[{label:"Work",echo:"work"},{label:"Something I'm building",echo:"something you're building"},{label:"A decision",echo:"a decision you're weighing"},{label:"Too much on my plate",echo:"how much is on your plate"},{label:"Something personal",echo:"something personal"}],va="I'm not sure yet",gc="What's taking up most of your attention lately?",xc="One thing that helps me work better with you: do you want me to be more direct, or give you more room to think things through?";function fc(t){return t==="direct"?"be direct":"give you room to think"}function mc(t){return t!=null&&t.echo?`You're mainly thinking about ${t.echo}`:t!=null&&t.said?`You're mainly thinking about “${t.said}”`:"We haven't landed on a topic yet"}function uc(t,a){const n=mc(t);return a?`Here's what I understand so far. ${n}, and it sounds like you'd rather I ${fc(a)}. I'll start there and learn the rest as we go.`:`Here's what I understand so far. ${n}. I'll start there, and I'll pick up how you like me to say things as we go.`}function Jn(t){return t?`Got it. Let's start there. What would have to happen this week for ${t.echo??"that"} to feel handled?`:"So — what's the first thing you'd like to put in front of me?"}let bc=0;const es=()=>`t${bc++}`;function yc({onDone:t}){const[a,n]=l.useState("guided"),[s,i]=l.useState([{id:es(),from:"starchild",text:gc,stage:0}]),[o,r]=l.useState(),[c,p]=l.useState(),d=(w,k,N)=>i(C=>[...C,{id:es(),from:w,text:k,stage:N}]),h=l.useRef([]),g=oe()?160:760;l.useEffect(()=>()=>h.current.forEach(w=>window.clearTimeout(w)),[]);const f=w=>{h.current.push(window.setTimeout(w,g))},u=()=>{d("starchild",xc,1),n("preference")};return{step:a,turns:s,acceptsText:a==="guided",submit:w=>{const k=w.trim();if(!k)return;d("you",k);const N={said:k.replace(/.$/,"")};r(N),f(u)},choose:w=>{var k;if(d("you",w),a==="guided"){if(w===va){f(()=>{d("starchild","That's fine — we can find it as we go."),t({tone:c,opening:Jn(void 0)})});return}r({echo:(k=Bs.find(N=>N.label===w))==null?void 0:k.echo}),f(u);return}if(a==="preference"){const N=w==="More direct"?"direct":w==="More space"?"space":void 0;p(N),f(()=>{d("starchild",uc(o,N)),n("read"),f(()=>t({topic:(o==null?void 0:o.echo)??(o==null?void 0:o.said),tone:N,opening:Jn(o)}))})}}}}function wc({meeting:t}){const{step:a,turns:n,choose:s}=t,i=n[n.length-1],r=(i==null?void 0:i.from)==="you"?"working":a==="read"?"resolved":"listening";return e.jsxs("div",{className:"flex w-full max-w-[560px] flex-col items-center",children:[e.jsx(pe,{state:r,size:124}),e.jsx("div",{className:"mt-9 flex w-full flex-col gap-6",children:n.map(c=>c.from==="starchild"?e.jsxs(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.5,ease:[.16,1,.3,1]},className:"text-center",children:[c.stage!==void 0&&e.jsx("p",{className:"mb-1.5 text-[10px] font-medium tracking-[0.16em] text-white/25 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:`${c.stage+1} of ${pc}`}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:c.text})]},c.id):e.jsx(m.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"self-end rounded-[16px_16px_4px_16px] bg-white/[0.07] px-4 py-2.5 text-[15px] text-white",style:{fontFamily:"var(--font-google-sans)"},children:c.text},c.id))}),e.jsx(X,{mode:"wait",children:e.jsxs(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4,delay:.35,ease:[.16,1,.3,1]},className:"mt-7 flex w-full flex-wrap justify-center gap-2.5",children:[a==="guided"&&e.jsxs(e.Fragment,{children:[Bs.map(({label:c})=>e.jsx(lt,{onClick:()=>s(c),children:c},c)),e.jsx(lt,{onClick:()=>s(va),children:va})]}),a==="preference"&&e.jsxs(e.Fragment,{children:[e.jsx(lt,{onClick:()=>s("More direct"),children:"More direct"}),e.jsx(lt,{onClick:()=>s("More space"),children:"More space"}),e.jsx(lt,{onClick:()=>s("Let's see as we go"),children:"Let's see as we go"})]})]},a)})]})}function lt({children:t,onClick:a,primary:n=!1}){return e.jsx("button",{type:"button",onClick:a,className:`rounded-full px-5 py-2.5 text-[13.5px] transition-colors ${n?"bg-[#f84600] text-white hover:scale-[1.02]":"border border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35 hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:t})}const vc=["👍","❤️","😄","🎉","👀"],kc="❤️";function Bt({align:t="left",onReply:a,children:n}){const[s,i]=l.useState([]),[o,r]=l.useState(!1),c=l.useRef(null);l.useEffect(()=>{if(!o)return;const d=g=>{var f;(f=c.current)!=null&&f.contains(g.target)||r(!1)},h=g=>{g.key==="Escape"&&r(!1)},x=setTimeout(()=>document.addEventListener("mousedown",d),0);return document.addEventListener("keydown",h),()=>{clearTimeout(x),document.removeEventListener("mousedown",d),document.removeEventListener("keydown",h)}},[o]);const p=d=>{i(h=>h.includes(d)?h.filter(x=>x!==d):[...h,d]),r(!1)};return e.jsxs("div",{className:`rx-wrap rx-wrap--${t}`,children:[e.jsxs("div",{className:"rx-row",children:[e.jsx("div",{className:"rx-body",onDoubleClick:()=>p(kc),children:n}),e.jsxs("div",{className:"rx-actions",children:[e.jsx("button",{type:"button",onClick:()=>r(d=>!d),className:"rx-action","aria-label":"Add a reaction","aria-expanded":o,children:e.jsx(jc,{})}),a&&e.jsx("button",{type:"button",onClick:a,className:"rx-action","aria-label":"Reply to this",children:e.jsx(Nc,{})}),e.jsx(X,{children:o&&e.jsx(m.div,{ref:c,initial:{opacity:0,y:6,scale:.94},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,scale:.96,transition:{duration:.12}},transition:{duration:.18,ease:[.16,1,.3,1]},className:"rx-picker",role:"menu",children:vc.map(d=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>p(d),className:`rx-pick${s.includes(d)?" rx-pick--on":""}`,"aria-label":`React ${d}`,children:d},d))})})]})]}),e.jsx("div",{className:"rx-reactions",children:e.jsx(X,{initial:!1,children:s.map(d=>e.jsx(m.button,{type:"button",onClick:()=>p(d),initial:{opacity:0,scale:.4},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.5,transition:{duration:.14}},transition:{duration:.32,ease:[.34,1.56,.64,1]},className:"rx-chip","aria-label":`Remove ${d} reaction`,children:d},d))})}),e.jsx("style",{children:`
        .rx-wrap { display: flex; flex-direction: column; gap: 6px; }
        .rx-wrap--right { align-items: flex-end; }
        .rx-wrap--left { align-items: flex-start; }

        .rx-row { display: flex; align-items: center; gap: 6px; max-width: 100%; }
        .rx-wrap--right .rx-row { flex-direction: row-reverse; }
        .rx-body { min-width: 0; }

        .rx-actions {
          position: relative; flex: none;
          display: flex; align-items: center; gap: 2px;
          opacity: 0; transition: opacity .18s ease;
        }
        .rx-row:hover .rx-actions,
        .rx-actions:focus-within { opacity: 1; }

        .rx-action {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; color: rgba(255,255,255,.35);
          transition: color .15s ease, background-color .15s ease;
        }
        .rx-action:hover { color: rgba(255,255,255,.85); background: rgba(255,255,255,.07); }
        .rx-action:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }

        .rx-picker {
          position: absolute; bottom: calc(100% + 8px); left: 50%; z-index: 30;
          transform-origin: bottom center;
          display: flex; gap: 2px; padding: 5px;
          border-radius: 999px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(24,24,26,.94); backdrop-filter: blur(12px);
          box-shadow: 0 12px 30px rgba(0,0,0,.55);
        }
        .rx-pick {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 999px; border: 0; cursor: pointer;
          background: none; font-size: 16px; line-height: 1;
          transition: background-color .15s ease, transform .15s ease;
        }
        .rx-pick:hover { background: rgba(255,255,255,.1); transform: scale(1.12); }
        .rx-pick--on { background: rgba(248,70,0,.2); }
        .rx-pick:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: -2px; }

        .rx-reactions { display: flex; flex-wrap: wrap; gap: 4px; }
        .rx-reactions:empty { display: none; }
        .rx-chip {
          display: inline-flex; align-items: center; justify-content: center;
          height: 24px; min-width: 30px; padding: 0 8px;
          border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06);
          font-size: 13px; line-height: 1;
          transition: background-color .15s ease, border-color .15s ease;
        }
        .rx-chip:hover { background: rgba(255,255,255,.11); border-color: rgba(255,255,255,.22); }
        .rx-chip:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }

        @media (prefers-reduced-motion: reduce) {
          .rx-pick:hover { transform: none; }
        }

        /* No hover to reveal them on, so the controls stay put rather than never
           appearing. The double-tap shortcut works either way. */
        @media (hover: none) {
          .rx-actions { opacity: 1; }
        }
      `})]})}function jc(){return e.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round",className:"size-4","aria-hidden":"true",children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.1"}),e.jsx("path",{d:"M5.6 9.4a3 3 0 0 0 4.8 0"}),e.jsx("path",{d:"M6 6.2h.01M10 6.2h.01",strokeWidth:1.8})]})}function Nc(){return e.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.4,strokeLinecap:"round",strokeLinejoin:"round",className:"size-4","aria-hidden":"true",children:[e.jsx("path",{d:"M6.4 3.2 2.2 7.4l4.2 4.2"}),e.jsx("path",{d:"M2.2 7.4h6.2a5.4 5.4 0 0 1 5.4 5.4v.2"})]})}const zc={"below-right":{outer:"absolute top-[calc(100%+14px)] right-0 z-40",caret:"-top-[7px] right-5 border-t border-l"},"above-right":{outer:"absolute bottom-[calc(100%+14px)] right-0 z-40",caret:"-bottom-[7px] right-5 border-r border-b"},right:{outer:"absolute top-1/2 left-[calc(100%+14px)] z-40 -translate-y-1/2",caret:"top-1/2 -left-[7px] -mt-1.5 border-b border-l"}};function Ha({placement:t,visual:a,title:n,body:s,ctaLabel:i,onCta:o,onClose:r}){const c=l.useRef(null),p=zc[t];return l.useEffect(()=>{const d=g=>{g.key==="Escape"&&r()},h=g=>{var f;(f=c.current)!=null&&f.contains(g.target)||r()};window.addEventListener("keydown",d);const x=setTimeout(()=>document.addEventListener("mousedown",h),0);return()=>{window.removeEventListener("keydown",d),clearTimeout(x),document.removeEventListener("mousedown",h)}},[r]),e.jsx("div",{className:p.outer,children:e.jsxs(m.div,{ref:c,initial:{opacity:0,scale:.97},animate:{opacity:1,scale:1},transition:{duration:.45,delay:.4,ease:[.16,1,.3,1]},role:"dialog","aria-label":n,className:"relative w-[292px] rounded-2xl border border-white/10 bg-[#1a1a1c] shadow-[0_20px_50px_rgba(0,0,0,.55)]",children:[e.jsx("span",{"aria-hidden":"true",className:`absolute size-3 rotate-45 rounded-[3px] border-white/10 bg-[#1a1a1c] ${p.caret}`}),e.jsx("div",{className:"relative flex h-[96px] items-center justify-center overflow-hidden rounded-t-2xl bg-white/[0.03]","aria-hidden":"true",children:a}),e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-[14.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:n}),e.jsx("p",{className:"mt-1.5 text-[12.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("div",{className:"mt-4 flex items-center justify-between gap-3",children:[e.jsx("button",{type:"button",onClick:r,className:"shrink-0 text-[12.5px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Dismiss"}),e.jsx("button",{type:"button",onClick:o??r,className:"rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:i})]})]})]})})}const Cc=[{x:-52,y:-18,size:6,delay:0},{x:50,y:-24,size:4,delay:.7},{x:-36,y:25,size:4,delay:1.4},{x:45,y:21,size:5,delay:2.1}];function Sc(){const t=oe(),[a,n]=l.useState("waiting");return l.useEffect(()=>{if(t){n("resolved");return}const s=window.setTimeout(()=>n("noticing"),1450),i=window.setTimeout(()=>n("resolved"),2250);return()=>{window.clearTimeout(s),window.clearTimeout(i)}},[t]),e.jsxs(e.Fragment,{children:[!t&&Cc.map(s=>e.jsx(m.span,{className:"absolute rounded-full bg-white/70",style:{width:s.size,height:s.size,left:`calc(50% - ${s.size/2}px)`,top:`calc(50% - ${s.size/2}px)`},initial:{x:s.x,y:s.y,opacity:0},animate:{x:s.x*.22,y:s.y*.22,opacity:[0,.5,0]},transition:{duration:1.05,delay:s.delay*.2,ease:[.32,.72,.3,1]}},`${s.x},${s.y}`)),e.jsx(La,{state:a==="waiting"?"idle":a==="noticing"?"acknowledging":"settled",depth:a==="waiting"?.4:1,size:13})]})}function Tc({onClose:t}){return e.jsx(Ha,{placement:"above-right",visual:e.jsx(Sc,{}),title:"Meet Conductor Mode",body:"Starchild chooses the right AI for each task, so you don't have to.",ctaLabel:"Got it",onClose:t})}const Ds=l.createContext(null);function Ac({empty:t=!1,children:a}){const[n,s]=l.useState(t?[]:Ba),[i,o]=l.useState(t?[]:ya),r=l.useCallback(b=>i.some(y=>y.id===b),[i]),c=l.useCallback(b=>i.find(y=>y.id===b),[i]),p=l.useCallback(b=>n.filter(y=>y.tools.includes(b)),[n]),d=l.useCallback(b=>{o(y=>y.some(w=>w.id===b)?y:[...y,{id:b,account:"barbara@starchild.ai",since:"connected just now"}])},[]),h=l.useCallback(b=>{o(y=>y.filter(w=>w.id!==b)),s(y=>y.map(w=>({...w,tools:w.tools.filter(k=>k!==b)})))},[]),x=l.useCallback((b,y)=>{s(w=>w.map(k=>k.id===b?{...k,tools:y}:k))},[]),g=l.useCallback(b=>s(y=>[b,...y]),[]),f=l.useCallback((b,y)=>s(w=>w.map(k=>k.id===b?y(k):k)),[]),u=l.useMemo(()=>({roster:n,connections:i,isConnected:r,connectionFor:c,usedBy:p,connect:d,disconnect:h,setAgentTools:x,addAgent:g,updateAgent:f}),[n,i,r,c,p,d,h,x,g,f]);return e.jsx(Ds.Provider,{value:u,children:a})}function Ze(){const t=l.useContext(Ds);if(!t)throw new Error("useAgents must be used inside <AgentsProvider>");return t}function Mc({needs:t,onReady:a}){const{isConnected:n,connect:s}=Ze(),i=t.filter(c=>!n(c)),o=i.map(c=>ce[c].name),r=c=>{s(c),i.length===1&&window.setTimeout(a,420)};return e.jsxs(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"hoff hoff--ask",children:[e.jsxs("p",{className:"hoff-say",children:["I’ll need ",o.length===1?o[0]:o.join(" and ")," for that. Connect",o.length===1?" it":" them"," and I’ll pick up where we left off."]}),e.jsx("div",{className:"hoff-conns",children:i.map(c=>e.jsxs("div",{className:"hoff-conn",children:[e.jsx("span",{className:"hoff-conn-glyph",children:e.jsx(me,{kind:ce[c].kind,className:"size-4"})}),e.jsxs("span",{className:"hoff-conn-body",children:[e.jsx("span",{className:"hoff-conn-name",children:ce[c].name}),e.jsx("span",{className:"hoff-conn-grant",children:ce[c].grants[0]})]}),e.jsx("button",{type:"button",className:"hoff-btn hoff-btn--go",onClick:()=>r(c),children:"Connect"})]},c))}),e.jsx(qa,{})]})}function Ec({request:t,because:a,onCreate:n,onDismiss:s}){const i=a??(t&&t.repeats>=2?`That's the ${Ic(t.repeats)} time you've asked me for this. An Agent would do it without being asked, and report back in its own thread.`:`It would keep doing this for you${t!=null&&t.cadence?` ${t.cadence}`:""} and report back in its own thread.`);return e.jsxs(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45,delay:.5,ease:[.16,1,.3,1]},className:"hoff hoff--offer",children:[e.jsx("p",{className:"hoff-title",children:"Create an Agent for this?"}),e.jsxs("p",{className:"hoff-sub",children:[i," This conversation stays as it is either way."]}),e.jsxs("div",{className:"hoff-actions",children:[e.jsx("button",{type:"button",className:"hoff-btn",onClick:n,children:"Create Agent"}),e.jsx("button",{type:"button",className:"hoff-btn hoff-btn--quiet",onClick:s,children:"Not now"})]}),e.jsx(qa,{})]})}function Ic(t){return["","first","second","third","fourth","fifth","sixth"][t]??`${t}th`}function Lc({agent:t,onOpen:a}){const{roster:n}=Ze(),s=n.find(i=>i.id===t.id)??t;return e.jsxs(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.42,ease:[.16,1,.3,1]},className:"hoff hoff--made",children:[e.jsx("p",{className:"hoff-kicker",children:"Agent created"}),e.jsxs("div",{className:"hoff-id",children:[e.jsx(de,{status:"scheduled",size:13,halo:!0,accent:s.accent}),e.jsxs("div",{children:[e.jsx("p",{className:"hoff-name",children:s.name}),e.jsx("p",{className:"hoff-role",children:s.role})]})]}),e.jsxs("div",{className:"hoff-actions",children:[e.jsx("button",{type:"button",className:"hoff-btn hoff-btn--go",onClick:a,children:"Open Agent"}),e.jsx("span",{className:"hoff-stay",children:"This conversation stays here."})]}),e.jsx(qa,{})]})}function qa(){return e.jsx("style",{children:`
      .hoff {
        display: flex; flex-direction: column; gap: 14px;
        padding: 18px 20px; border-radius: 18px;
        border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
        font-family: var(--font-google-sans); color: #fff;
      }
      /* The three are deliberately not equally loud. Being asked something is
         quieter than being told a standing thing now exists — but "louder" here is
         a warmer edge and nothing more. A success state that celebrates is a
         success state someone has to dismiss. */
      .hoff--offer { border-style: dashed; border-color: rgba(255,255,255,.16); background: none; }
      .hoff--made {
        gap: 12px; padding: 15px 18px 16px;
        border-color: rgba(248,70,0,.3); background: rgba(248,70,0,.05);
      }

      .hoff-say { margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.8); }
      .hoff-title { margin: 0; font-size: 15px; font-weight: 600; }
      .hoff-sub { margin: -4px 0 0; font-size: 13.5px; line-height: 1.6; color: rgba(255,255,255,.5); }

      .hoff-kicker {
        margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .16em;
        text-transform: uppercase; color: var(--color-primary);
      }
      .hoff-id { display: flex; align-items: flex-start; gap: 11px; }
      /* the orb is 13px against a 15.5px line — centred on the name, not on the box */
      .hoff-id > :first-child { margin-top: 5px; }
      .hoff-name { margin: 0; font-size: 15.5px; font-weight: 600; }
      .hoff-role { margin: 3px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.55); }

      .hoff-conns { display: flex; flex-direction: column; gap: 8px; }
      .hoff-conn {
        display: flex; align-items: center; gap: 12px;
        padding: 11px 14px; border-radius: 13px;
        border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
      }
      .hoff-conn-glyph { flex: none; display: flex; color: rgba(255,255,255,.45); }
      .hoff-conn-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .hoff-conn-name { font-size: 14px; }
      .hoff-conn-grant { font-size: 12px; color: rgba(255,255,255,.38); }
      .hoff-conn .hoff-btn { margin-left: auto; }


      .hoff-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .hoff-btn {
        padding: 8px 16px; border-radius: 999px; cursor: pointer;
        border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.04);
        font-family: inherit; font-size: 13.5px; color: #fff;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .hoff-btn:hover { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.08); }
      .hoff-btn--quiet { border-color: transparent; background: none; color: rgba(255,255,255,.45); }
      .hoff-btn--quiet:hover { background: rgba(255,255,255,.05); color: #fff; }
      .hoff-btn--go {
        border-color: transparent; background: var(--color-primary); color: #fff; font-weight: 500;
      }
      .hoff-btn--go:hover { background: #ff5a1f; border-color: transparent; }

      .hoff-stay { font-size: 12.5px; color: rgba(255,255,255,.35); }
    `})}const Rc=[/\bevery\s+(morning|afternoon|evening|night|day|week|month|hour|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,/\beach\s+(morning|day|week|month|monday|tuesday|wednesday|thursday|friday)\b/i,/\b(daily|weekly|monthly|nightly|hourly)\b/i,/\bkeep\s+(an eye|track|tabs|me posted|watching|following|checking|doing|going)/i,/\b(watch|monitor|track)\b/i,/\blet me know\s+(if|when|as soon as|whenever)\b/i,/\b(alert|notify|ping|warn)\s+me\b/i,/\bfrom now on\b/i,/\bgoing forward\b/i,/\bevery time\b/i,/\bwhenever\b/i,/\buntil (they|he|she|it|someone|we)\b/i,/\bon an ongoing basis\b/i,/\bremind me\b/i],$c=[/\bjust (this )?once\b/i,/\bone[- ]off\b/i,/\bfor now\b/i],Fc=[/\bevery\s+(?:other\s+)?(?:morning|afternoon|evening|night|day|week|month|hour|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,/\beach\s+(?:morning|day|week|month|monday|tuesday|wednesday|thursday|friday)\b/i,/\b(?:daily|weekly|monthly|nightly|hourly)\b/i],Wc={email:"gmail",emails:"gmail",inbox:"gmail",mail:"gmail",gmail:"gmail",reply:"gmail",replies:"gmail",calendar:"gcal",schedule:"gcal",meeting:"gcal",meetings:"gcal",agenda:"gcal",drive:"gdrive",document:"gdrive",doc:"gdrive",docs:"gdrive",file:"gdrive",files:"gdrive",notion:"notion",slack:"slack",channel:"slack",telegram:"telegram",github:"github",repo:"github","pull request":"github",jira:"jira",ticket:"jira",tickets:"jira",figma:"figma",salesforce:"salesforce",hubspot:"hubspot",linkedin:"linkedin",zoom:"zoom"},Pc=new Map(gt.map(t=>[t.name.toLowerCase(),t.id]));function Bc(t){const a=` ${t.toLowerCase()} `,n=new Set;for(const[s,i]of Object.entries(Wc))new RegExp(`[^a-z]${s}[^a-z]`).test(a)&&n.add(i);for(const[s,i]of Pc)a.includes(s)&&n.add(i);return[...n]}function Dc(t,a){let n=t.trim().replace(/^(please|could you|can you|hey,?)\s+/i,"");return a&&(n=n.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),"")),n=n.replace(/\s{2,}/g," ").replace(/^[,\s]+|[,\s.]+$/g,""),n.charAt(0).toUpperCase()+n.slice(1)}function Oc(t,a){const n=t.toLowerCase();return/\bfollow(ing)?[- ]up\b|\buntil (they|he|she|it)\b/.test(n)?"Follow-up Agent":/\bprice|fare|flight|market|stock|ticker\b/.test(n)?"Price Watcher":/\breport\b/.test(n)?"Report Agent":a.includes("gmail")?"Inbox Watcher":a.includes("gcal")?"Calendar Watcher":a.includes("slack")?"Slack Watcher":a.includes("github")?"Repo Watcher":"Watcher"}const Hc=new Set(["the","a","an","my","our","your","me","you","i","we","it","this","that","these","those","to","for","of","on","in","at","with","from","and","or","but","so","can","could","would","will","please","just","again","do","does","did","is","are","was","be","been","have","has","had","get","got","make","all","any","some","what","when","how","now","then","today","again","which","ones","one","also","over","into","about","them","there","here"]);function qc(t){return t.endsWith("ies")&&t.length>4?`${t.slice(0,-3)}y`:t.endsWith("ing")&&t.length>5?t.slice(0,-3):t.endsWith("ed")&&t.length>4||t.endsWith("es")&&t.length>4?t.slice(0,-2):t.endsWith("s")&&!t.endsWith("ss")&&t.length>3?t.slice(0,-1):t}function ts(t){return new Set(t.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(a=>a.length>2&&!Hc.has(a)).map(qc))}function Os(t,a){const n=ts(t),s=ts(a);if(Math.min(n.size,s.size)<2)return!1;let i=0;for(const o of n)s.has(o)&&(i+=1);return i>=2&&i/Math.min(n.size,s.size)>=.6}function Gc(t,a=[]){const n=t.trim(),s=!$c.some(p=>p.test(n))&&Rc.some(p=>p.test(n)),i=Fc.map(p=>{var d;return(d=n.match(p))==null?void 0:d[0]}).find(Boolean),o=i?i.charAt(0).toLowerCase()+i.slice(1):void 0,r=Bc(n),c=Dc(n,o);return{recurring:s,repeats:a.filter(p=>Os(p,n)).length+1,cadence:o,summary:o?`${c}, ${o}`:c,name:Oc(n,r),needs:r}}const Ye={ember:{name:"Ember",hex:"#f84600"},amber:{name:"Amber",hex:"#d08a1c"},moss:{name:"Moss",hex:"#5b8c62"},tide:{name:"Tide",hex:"#4a7fa5"},plum:{name:"Plum",hex:"#8a5f95"},ash:{name:"Ash",hex:"#8d8a86"}},_c=[{id:"project",name:"Project Assistant",gets:"Tells you what actually moved."},{id:"inbox",name:"Inbox Manager",gets:"Drafts the routine replies."},{id:"travel",name:"Travel Watcher",gets:"Watches a fare and tells you."},{id:"research",name:"Research Agent",gets:"Reads properly, comes back with the shape."}],pa=["How often should I check?","And should I ask you before I act on anything?"],Yc=t=>[`Hey ${t}. Good to meet you.`,"What do you want me on first?"],Vc=[{id:"joao",title:"Emails to João",when:"Today",turns:[{who:"you",text:"Send an email to João asking if he can review the deck before Friday."},{who:"ai",text:"Happy to. I'll need your mail for that — connect Gmail and I'll write it and show you before it goes."},{who:"connected",app:"gmail",note:"Connected as barbara@starchild.ai"},{who:"ai",text:"Sent. I asked him to look at the deck before Friday and to flag anything he'd change."},{who:"gap",text:"Two days later"},{who:"you",text:"Send João another email — ask whether he's had a chance to look at the deck yet."},{who:"ai",text:"Sent. I kept it short and asked if he's had a look."}],offer:{because:"That's twice now you've asked me to chase João about the deck. I can keep following up on my own until he answers, and stop bothering you about it.",name:"João follow-up",role:"Keeps checking in until he replies.",tools:["gmail"],cadence:"every couple of days"}},{id:"poster",title:"Poster for the launch",when:"Yesterday",turns:[{who:"you",text:"Make me a poster for the launch night — something bold and simple."},{who:"ai",text:"Here's where I landed. Big type, one image, nothing else competing for it."}]},{id:"build",title:"Why the build keeps failing",when:"Monday",turns:[{who:"you",text:"Read through this build log and work out why it keeps failing."},{who:"ai",text:"It's the same step every time — the install runs before the cache is restored, so it never finds the lockfile it expects."}]}];function Uc({chat:t,onReply:a}){return e.jsxs("div",{className:"sv-thread",children:[t.turns.map((n,s)=>{if(n.who==="gap")return e.jsx("p",{className:"sv-gap",children:e.jsx("span",{children:n.text})},s);if(n.who==="connected")return e.jsxs("p",{className:"sv-connected",children:[e.jsx(me,{kind:ce[n.app].kind,className:"size-3.5"}),e.jsxs("strong",{children:[ce[n.app].name," connected"]}),e.jsx("span",{children:n.note})]},s);const i=n.who==="you";return e.jsx(m.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.3,delay:Math.min(s*.05,.3),ease:[.16,1,.3,1]},className:i?"sv-right":"sv-left",children:e.jsx(Bt,{align:i?"right":"left",onReply:()=>a(n.text),children:e.jsx("div",{className:`sv-msg${i?" sv-msg--mine":""}`,children:n.text})})},s)}),e.jsx("style",{children:`
        .sv-thread {
          display: flex; flex-direction: column; gap: 14px;
          font-family: var(--font-google-sans);
        }
        .sv-left { display: flex; justify-content: flex-start; }
        .sv-right { display: flex; justify-content: flex-end; }

        .sv-msg {
          max-width: 520px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
          font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.85);
        }
        .sv-msg--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(255,255,255,.08); color: rgba(255,255,255,.92);
        }

        /* Neither side said this, so it is neither bubble: it is the record of
           something that happened between two things that were said. */
        .sv-connected {
          display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
          margin: 0; padding: 9px 14px; border-radius: 999px; align-self: flex-start;
          border: 1px solid rgba(248,70,0,.25); background: rgba(248,70,0,.06);
          font-size: 12.5px; color: rgba(255,255,255,.45);
        }
        .sv-connected svg { color: var(--color-primary); }
        .sv-connected strong { font-weight: 500; color: rgba(255,255,255,.85); }

        .sv-gap {
          display: flex; align-items: center; gap: 14px; margin: 8px 0 4px;
          font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.25);
        }
        .sv-gap::before, .sv-gap::after {
          content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.08);
        }
      `})]})}const Xc=[{x:-58,y:-20,size:5,delay:0},{x:-30,y:16,size:4,delay:.9},{x:4,y:-24,size:4,delay:1.8},{x:36,y:20,size:5,delay:.5},{x:60,y:-14,size:4,delay:1.3}],De={x:0,y:6,size:11};function Kc(){return e.jsxs(e.Fragment,{children:[Xc.map(t=>e.jsx(m.span,{className:"absolute rounded-[2px] bg-white/70",style:{width:t.size,height:t.size,left:`calc(50% - ${t.size/2}px + ${t.x}px)`,top:`calc(50% - ${t.size/2}px + ${t.y}px)`},animate:{opacity:[.18,.42,.18]},transition:{duration:4.6,delay:t.delay,repeat:1/0,ease:"easeInOut"}},`${t.x},${t.y}`)),e.jsx(m.span,{className:"absolute rounded-[3px] bg-[#f84600]",style:{width:De.size,height:De.size,left:`calc(50% - ${De.size/2}px + ${De.x}px)`,top:`calc(50% - ${De.size/2}px + ${De.y}px)`,boxShadow:"0 0 22px rgba(248,70,0,.55)"},animate:{scale:[1,1.09,1],opacity:[.9,1,.9]},transition:{duration:4.2,repeat:1/0,ease:"easeInOut"}})]})}function Zc({onExplore:t,onClose:a}){return e.jsx(Ha,{placement:"right",visual:e.jsx(Kc,{}),title:"Meet the Marketplace",body:"Discover what others have built. Use it, customize it, or publish your own.",ctaLabel:"Explore Marketplace",onCta:t,onClose:a})}const Qc=[.16,.36,.56,.76];function Jc(){return e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"absolute h-px bg-white/12",style:{left:28,right:28,top:"calc(50% + 12px)"}}),Qc.map((t,a)=>e.jsx(m.span,{className:"absolute rounded-[1px] bg-[#f84600]",style:{width:3,height:14,left:`calc(28px + (100% - 56px) * ${t})`,top:"calc(50% - 2px)",transformOrigin:"bottom"},animate:{scaleY:[0,0,1,1,1],opacity:[0,0,.85,.85,0]},transition:{duration:4.4,times:[0,.1+a*.16,.16+a*.16,.92,1],repeat:1/0,ease:"easeOut"}},t)),e.jsx(m.span,{className:"absolute rounded-full border-[1.5px] border-[#f84600]",style:{width:13,height:13,left:"calc(28px + (100% - 56px) * 0.93)",top:"calc(50% - 14px)"},animate:{scale:[.4,.4,1.12,1,1,.4],opacity:[0,0,1,1,1,0]},transition:{duration:4.4,times:[0,.74,.82,.86,.94,1],repeat:1/0,ease:"easeOut"}}),e.jsx(m.span,{className:"absolute rounded-full bg-[#f84600]",style:{width:7,height:7,top:"calc(50% + 9px)",boxShadow:"0 0 16px rgba(248,70,0,.6)"},animate:{left:["24px","calc(100% - 31px)"]},transition:{duration:4.4,repeat:1/0,ease:"linear"}})]})}function ed({onOpen:t,onClose:a}){return e.jsx(Ha,{placement:"right",visual:e.jsx(Jc,{}),title:"Meet your Agents",body:"Hand something over and it keeps going on its own — checking, running, and coming back when it matters.",ctaLabel:"Open Agents",onCta:t,onClose:a})}function td(){return e.jsxs("div",{className:"ca-answer",children:[e.jsx("p",{children:"Here's where I'd start."}),e.jsx("p",{children:"Three things are actually holding this up, and the rest is noise until they're settled. I've put them in the order that unblocks the most with the least effort — the first one changes what the other two even look like."}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"The thing you keep putting off."})," It's small, it's overdue, and it's quietly making two other decisions harder than they need to be."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"The one with a real deadline."})," Worth an hour this week rather than a scramble next week; the shape of it is already clear enough to start."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Everything else."})," None of it needs you today, and deciding that on purpose is what stops it sitting in the back of your head."]})]}),e.jsx("p",{children:"Want me to turn this into something you can work through, or go deeper on any one of them?"}),e.jsx("style",{children:`
        .ca-answer {
          display: flex; flex-direction: column; gap: 16px;
          font-family: var(--font-google-sans);
          font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.78);
        }
        .ca-answer p { margin: 0; }
        .ca-answer strong { font-weight: 600; color: #fff; }

        /* the marker sits in the gutter rather than indenting the text, so the list
           keeps the same left edge as the paragraphs around it */
        .ca-answer ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .ca-answer li { position: relative; padding-left: 18px; }
        .ca-answer li::before {
          content: ""; position: absolute; left: 0; top: 10px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(248,70,0,.75);
        }
      `})]})}function ad({onBack:t,onOpenMarketplace:a,intents:n,onRequestSignup:s,onLogIn:i,onLearned:o,initialMessage:r,openingMessage:c,task:p,isGuest:d=!1,area:h="chat",onSwitchArea:x,onOpenAgent:g,railed:f=!1,onToggleRail:u,skipMeeting:b=!1,onGuestWork:y,extraConversations:w=[]}){var Va;const[k,N]=l.useState(r??null),[C,S]=l.useState(r?hn(r):null),[v,L]=l.useState(!1),[W,D]=l.useState(""),[j,$]=l.useState(null),E=d,[A,F]=l.useState(r?1:2),[B,_]=l.useState(null),[Q,U]=l.useState(b),[Z,H]=l.useState(null),z=l.useRef(null),Y=l.useRef(null),[T,q]=l.useState(p),[I,M]=l.useState(c),{isConnected:R,addAgent:V}=Ze(),[G,te]=l.useState(null),[ae,ne]=l.useState([]),[be,Ne]=l.useState([]),[ze,ge]=l.useState([]),[re,xe]=l.useState(null),[K,Ce]=l.useState(null);function Gt(P){Ce(P),N(null),S(null),L(!1),M(void 0),q(void 0),xe(null),ne([]),D(""),U(!0)}function yt(P){const he=P.tools.filter($e=>R($e)),ue={id:`a${Date.now()}`,name:P.name,role:P.role,status:"scheduled",mood:P.cadence?`Set up. Runs ${P.cadence}.`:"Set up. Watching from here.",resting:`${P.name} has nothing to report yet.`,preview:"Just created",lastActive:"just now",accent:Ye.ember.hex,cadence:P.cadence,tools:he,thread:[{kind:"you",text:P.role},{kind:"agent",text:P.cadence?`Got it. I'll do this ${P.cadence} and tell you what I find.`:"Got it. I'll keep at this and tell you when something changes."},{kind:"agent",text:"I'll check with you first before anything I can't undo."}]};V(ue),xe(ue)}function Qe(P){y==null||y({id:`guest-${Date.now()}`,title:P.length>38?`${P.slice(0,38).trimEnd()}…`:P,when:"Just now",turns:[{who:"you",text:P},{who:"ai",text:"Here's where I'd start. Three things are holding this up, and the rest is noise until they're settled."}]})}const Je=l.useRef(!1);l.useEffect(()=>{Je.current||!E||!r||(Je.current=!0,Qe(r.trim()))},[]);function et(P,he){_({heading:P,sub:he})}function tt(P){q(P),M(P.question)}const Re=yc({onDone:({topic:P,tone:he,opening:ue})=>{o==null||o({topic:P,tone:he}),U(!0),H("conductor"),ue&&M(ue)}}),at=!E&&!Q&&k===null&&!c,_s=!E&&k===null&&!I&&!at&&!K,wt=k!==null||!!K||!E&&(!!I||!Q&&Re.turns.length>1),Ga=at&&Re.acceptsText;function _a(P){const he=P.trim();if(!he)return;if(E&&A<=0){et("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}N(he),Ce(null),D("");const ue=T?`${T.basePrompt} ${he}`:he;if(S(hn(ue)),E&&Qe(he),!E){const $e=Gc(ue,be);Ne(Yt=>[...Yt,ue]),te($e),ne($e.needs.filter(Yt=>!R(Yt))),xe(null)}E&&F($e=>$e-1)}function Ys(){N(null),S(null),L(!1),D(""),M(void 0),q(void 0),te(null),ne([]),xe(null),Ce(null)}function nt(){var P;(P=z.current)==null||P.scrollIntoView({behavior:"smooth",block:"end"})}l.useEffect(()=>{const P=setTimeout(nt,50);return()=>clearTimeout(P)},[k,v]);const Vs=!!(G&&(G.recurring||G.repeats>=2)),_t=!E&&!re&&(K?!!K.offer:v&&Vs&&!ze.some(P=>Os(P,(G==null?void 0:G.summary)??"")));l.useEffect(()=>{if(!_t&&!re&&ae.length===0)return;const P=setTimeout(nt,620);return()=>clearTimeout(P)},[_t,re,ae.length]);const Ya=e.jsxs(m.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx(X,{initial:!1,children:j&&e.jsx(m.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.22,ease:[.16,1,.3,1]},className:"overflow-hidden",children:e.jsxs("div",{className:"mb-3 flex items-start gap-2.5 border-l-2 border-[#f84600] pl-3",children:[e.jsx("p",{className:"min-w-0 flex-1 truncate text-[13px] text-white/45",style:{fontFamily:"var(--font-google-sans)"},children:j}),e.jsx("button",{type:"button",onClick:()=>$(null),className:"shrink-0 rounded-full p-0.5 text-white/35 transition-colors hover:text-white","aria-label":"Cancel reply",children:e.jsx(xs,{className:"size-3.5"})})]})})}),e.jsx("input",{ref:Y,value:W,onChange:P=>D(P.target.value),onKeyDown:P=>{if(P.key==="Enter"){if(Ga){Re.submit(W),D("");return}_a(W)}},placeholder:Ga?"Tell me anything…":I?"Answer however you like…":_s?"Ask me anything…":E&&k===null?"Ask, explore, or hand something over.":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!I}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(fe,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",className:`-mx-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[13px] transition-colors duration-300 ${Z==="conductor"?"bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40":"text-white/55"}`,style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Ve,{className:`size-3 ${Z==="conductor"?"text-[#f84600]/70":"text-white/35"}`})]}),Z==="conductor"&&!E&&e.jsx(Tc,{onClose:()=>H("marketplace")})]}),e.jsx("button",{type:"button",onClick:()=>_a(W||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:W.trim()?e.jsx(J,{className:"size-4"}):e.jsx(Fi,{className:"size-4"})})]})]})]});return e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[E?e.jsx(hc,{onLockedFeature:()=>s==null?void 0:s()}):e.jsx(Ps,{area:h,onSwitchArea:x,collapsed:f,onToggleCollapsed:u,onNewChat:Ys,onOpenMarketplace:a,conversations:[...w,...Vc],openConversation:K==null?void 0:K.id,onOpenConversation:Gt,intro:Z==="marketplace"&&!E?{label:"Marketplace",node:e.jsx(Zc,{onExplore:()=>{H(null),a()},onClose:()=>H("agents")})}:Z==="agents"&&!E?{label:"Agents",node:e.jsx(ed,{onOpen:()=>{H(null),x==null||x("agents")},onClose:()=>H(null)})}:void 0}),B&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:P=>{P.target===P.currentTarget&&_(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(Oa,{heading:B.heading,sub:B.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{_(null),s==null||s()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[E?e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(Dt,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),E&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var P;return(P=i??s)==null?void 0:P()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}):e.jsxs("header",{className:"relative flex shrink-0 items-center justify-end gap-3 px-6 py-4",children:[e.jsx("button",{type:"button",onClick:t,className:"absolute left-1/2 -translate-x-1/2 text-[19px] font-semibold tracking-[0.17em] text-white transition-opacity hover:opacity-75",style:{fontFamily:"var(--font-google-sans)"},children:"STARCHILD"}),e.jsxs("span",{className:"flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/85",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Di,{className:"size-4 text-white/45"}),"$190"]}),e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Toggle panel",children:e.jsx(mt,{className:"size-[18px]"})}),e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Developer view",children:e.jsx(Oi,{className:"size-[18px]"})}),e.jsx("span",{className:"size-2.5 rounded-full bg-emerald-400",title:"Connected"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:k===null&&!K?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[I&&!E?e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[T&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:T.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(La,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:I})]})]}):E?e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"flex flex-col items-center",children:[e.jsx(pe,{state:W.trim()?"listening":"resting",size:124}),e.jsx("h1",{className:"mt-9 max-w-[18ch] text-center text-[34px] leading-[1.15] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:I??e.jsx(e.Fragment,{children:"Start with whatever’s on your mind."})})]},I?"asked":"open"):at?e.jsx(wc,{meeting:Re}):e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"flex flex-col items-center",children:[e.jsx(pe,{state:W.trim()?"listening":"resting",size:124}),e.jsx("h1",{className:"mt-9 text-[34px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Let's get to work"})]}),!wt&&Ya,!wt&&E&&!T&&e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45,delay:.12,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(ut,{onStartTask:tt,align:"center",intents:n})}),!wt&&!E&&e.jsx("p",{className:"-mt-2 text-center text-[12px] text-white/30",style:{fontFamily:"var(--font-google-sans)"},children:"AI can make mistakes. Please verify important information."})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[K&&e.jsx(Uc,{chat:K,onReply:$}),!K&&e.jsx(Bt,{align:"right",onReply:()=>$(k),children:e.jsx("div",{className:"max-w-full rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:k})}),!K&&ae.length>0&&e.jsx(Mc,{needs:ae,onReady:()=>{ne([]),nt()}}),!K&&ae.length===0&&e.jsx(lc,{scenario:C,onStep:nt,onDone:()=>L(!0),children:v&&e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45,delay:.3,ease:[.16,1,.3,1]},className:"mt-7",children:e.jsx(Bt,{onReply:()=>$("Starchild's answer"),children:e.jsx(td,{})})})}),_t&&((K==null?void 0:K.offer)||G)&&e.jsx(Ec,{request:K?void 0:G??void 0,because:(Va=K==null?void 0:K.offer)==null?void 0:Va.because,onCreate:()=>{const P=(K==null?void 0:K.offer)??{name:G.name,role:G.summary,tools:G.needs,cadence:G.cadence};yt(P),setTimeout(nt,60)},onDismiss:()=>K?Ce({...K,offer:void 0}):ge(P=>[...P,G.summary])}),re&&e.jsx(Lc,{agent:re,onOpen:()=>g==null?void 0:g(re.id)}),v&&E&&e.jsx(m.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45,delay:.9,ease:[.16,1,.3,1]},className:"mt-6 border-t border-white/[0.08] pt-6",children:e.jsxs("button",{type:"button",onClick:()=>s==null?void 0:s(),className:"group inline-flex items-center gap-2.5 rounded-full bg-[#f84600] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#ff5a1f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f84600] active:translate-y-px",style:{fontFamily:"var(--font-google-sans)"},children:["Create a free account to keep this",e.jsx(J,{className:"size-3.5 rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"})]})}),e.jsx("div",{ref:z})]})}),wt&&e.jsx("div",{className:"shrink-0 px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto w-full max-w-[560px]",children:[Ya,!E&&e.jsx("p",{className:"mt-2.5 text-center text-[12px] text-white/30",style:{fontFamily:"var(--font-google-sans)"},children:"AI can make mistakes. Please verify important information."})]})})]})]})}const nd={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function sd({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(O,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:to.map(({prompt:a,scenario:n},s)=>e.jsxs(m.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:s*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:nd[n.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx(J,{className:"size-4 rotate-45"})})]},n.id))})]})})}function id({onNavigateHome:t,onOpenMarketplace:a,onTry:n,onLogIn:s,onSignUp:i}){const o=l.useRef(null);function r(){var c;(c=o.current)==null||c.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(ws,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:s,onSignUp:i}),e.jsxs(O,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(m.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(m.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(m.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>n(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:r,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(ii,{onTryConductorMode:()=>n()}),e.jsx("div",{ref:o,children:e.jsx(sd,{onTryExample:c=>n(c)})}),e.jsx(je,{onStartFree:()=>n()})]})}function Hs({enabled:t,onToggle:a}){const{isConnected:n,connect:s}=Ze(),[i,o]=l.useState(""),[r,c]=l.useState(null),p=gt.filter(x=>x.name.toLowerCase().includes(i.trim().toLowerCase())),d=x=>a(t.includes(x)?t.filter(g=>g!==x):[...t,x]),h=x=>{s(x),t.includes(x)||a([...t,x]),c(x),window.setTimeout(()=>c(g=>g===x?null:g),1600)};return e.jsxs("div",{className:"cp-root",children:[e.jsxs("label",{className:"cp-search",children:[e.jsx(Le,{className:"size-4"}),e.jsx("input",{value:i,onChange:x=>o(x.target.value),placeholder:"Search connectors","aria-label":"Search connectors"})]}),e.jsxs("div",{className:"cp-grid",children:[p.map(x=>{const g=n(x.id),f=t.includes(x.id);return e.jsxs("button",{type:"button",onClick:()=>g?d(x.id):h(x.id),"aria-pressed":g?f:void 0,className:`cp-cell${f?" cp-cell--on":""}${g?"":" cp-cell--new"}`,children:[e.jsxs("span",{className:"cp-top",children:[e.jsx("span",{className:"cp-glyph",children:e.jsx(me,{kind:x.kind,className:"size-4"})}),f&&e.jsx(Ca,{className:"cp-tick size-3.5"})]}),e.jsx("span",{className:"cp-name",children:x.name}),e.jsx("span",{className:"cp-state",children:g?r===x.id?"Just connected":f?"Enabled":"Enable":"Connect"})]},x.id)}),p.length===0&&e.jsxs("p",{className:"cp-none",children:["Nothing matches “",i,"”."]})]}),e.jsx("style",{children:`
        .cp-root { display: flex; flex-direction: column; gap: 12px; width: 100%; }

        .cp-search {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 15px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.4);
        }
        .cp-search input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14px; color: #fff;
        }
        .cp-search input::placeholder { color: rgba(255,255,255,.3); }

        /* Three across, dropping to two and then one rather than squeezing — a
           connector whose name wraps to three lines has stopped being scannable,
           which is the only reason to put them in a grid. */
        .cp-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px;
          max-height: 330px; overflow-y: auto; padding-right: 2px;
        }
        @media (max-width: 720px) { .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 460px) { .cp-grid { grid-template-columns: 1fr; } }

        /* The cell is the control. Connected, it toggles a permission; not
           connected, it opens a login — and the word at the bottom is the only
           thing that has to differ, because that is the only thing that does. */
        .cp-cell {
          display: flex; flex-direction: column; gap: 3px; min-width: 0;
          padding: 12px 13px; border-radius: 12px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
          font-family: inherit;
          transition: border-color .16s ease, background-color .16s ease;
        }
        .cp-cell:hover { border-color: rgba(255,255,255,.26); }
        .cp-cell:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .cp-cell--on { border-color: rgba(248,70,0,.4); background: rgba(248,70,0,.08); }

        .cp-top { display: flex; align-items: center; justify-content: space-between; height: 18px; }
        .cp-glyph { display: flex; color: rgba(255,255,255,.4); }
        .cp-cell--on .cp-glyph { color: var(--color-primary); }
        .cp-tick { color: var(--color-primary); }

        .cp-name {
          font-size: 13.5px; color: #fff; margin-top: 4px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cp-state { font-size: 11.5px; color: rgba(255,255,255,.35); }
        .cp-cell--on .cp-state { color: var(--color-primary); }
        /* the louder of the two words: connecting is the bigger act */
        .cp-cell--new .cp-state { color: rgba(255,255,255,.6); }

        .cp-none { margin: 10px 4px; font-size: 13.5px; color: rgba(255,255,255,.35); }
      `})]})}function od({i:t}){return e.jsxs("div",{className:"hg","aria-hidden":"true",children:[t===0&&e.jsx(rd,{}),t===1&&e.jsx(ld,{}),t===2&&e.jsx(cd,{}),t===3&&e.jsx(dd,{}),e.jsx(hd,{})]})}function rd(){return e.jsxs("svg",{viewBox:"0 0 208 96",className:"hg-svg",children:[e.jsxs("g",{className:"hg-lines",children:[e.jsx("rect",{className:"hg-bar hg-bar--1",x:"14",y:"34",width:"62",height:"7",rx:"3.5"}),e.jsx("rect",{className:"hg-bar hg-bar--2",x:"14",y:"46",width:"46",height:"7",rx:"3.5"}),e.jsx("rect",{className:"hg-bar hg-bar--3",x:"14",y:"58",width:"34",height:"7",rx:"3.5"})]}),e.jsx("path",{className:"hg-feed",d:"M86 48 H150"}),e.jsx("circle",{className:"hg-dot hg-dot--takes",cx:"166",cy:"48",r:"9"})]})}function ld(){const t=[{x:166,y:24,on:!0},{x:176,y:62,on:!0},{x:42,y:26,on:!0},{x:34,y:60,on:!1},{x:104,y:84,on:!1}];return e.jsxs("svg",{viewBox:"0 0 208 96",className:"hg-svg",children:[t.map((a,n)=>a.on?e.jsx("path",{className:"hg-wire",style:{animationDelay:`${.25+n*.28}s`},d:`M104 44 L${a.x} ${a.y}`},n):null),t.map((a,n)=>e.jsx("circle",{className:`hg-node${a.on?" hg-node--on":""}`,style:a.on?{animationDelay:`${.55+n*.28}s`}:void 0,cx:a.x,cy:a.y,r:"6.5"},n)),e.jsx("circle",{className:"hg-dot",cx:"104",cy:"44",r:"9"})]})}function cd(){return e.jsxs("svg",{viewBox:"0 0 208 96",className:"hg-svg",children:[e.jsx("path",{className:"hg-rail",d:"M10 62 H198"}),[38,72,106,140,174].map((t,a)=>e.jsxs("g",{children:[e.jsx("rect",{className:"hg-tick",x:t-1,y:"56",width:"2",height:"12",rx:"1"}),e.jsx("rect",{className:`hg-run hg-run--${a+1}`,x:t-3,y:"30",width:"6",height:"26",rx:"3"})]},t)),e.jsx("circle",{className:"hg-dot hg-dot--runs",cy:"62",r:"7"})]})}function dd(){return e.jsxs("svg",{viewBox:"0 0 208 96",className:"hg-svg",children:[e.jsx("path",{className:"hg-rail",d:"M10 56 H198"}),[40,74,108].map((t,a)=>e.jsx("rect",{className:"hg-tick hg-tick--quiet",style:{animationDelay:`${a*.6}s`},x:t-1,y:"50",width:"2",height:"12",rx:"1"},t)),e.jsx("path",{className:"hg-riser",d:"M160 56 V30"}),e.jsx("circle",{className:"hg-ring",cx:"160",cy:"24",r:"8"}),e.jsx("circle",{className:"hg-dot hg-dot--stops",cx:"160",cy:"24",r:"3"})]})}function hd(){return e.jsx("style",{children:`
      .hg { display: flex; justify-content: center; margin-bottom: 4px; }
      .hg-svg { width: 208px; height: 96px; overflow: visible; }

      /* the agent, everywhere it appears */
      .hg-dot { fill: var(--color-primary); }
      .hg-rail, .hg-feed, .hg-wire, .hg-riser {
        fill: none; stroke: rgba(255,255,255,.16); stroke-width: 1.5; stroke-linecap: round;
      }

      /* ── 1 · the brief ── */
      .hg-bar { fill: rgba(255,255,255,.16); opacity: 0; animation: hg-bar 4.4s ease-out infinite; }
      .hg-bar--2 { animation-delay: .18s; }
      .hg-bar--3 { animation-delay: .36s; }
      @keyframes hg-bar {
        0% { opacity: 0; transform: translateX(-6px); }
        14%, 74% { opacity: 1; transform: translateX(0); }
        92%, 100% { opacity: 0; transform: translateX(0); }
      }
      .hg-feed {
        stroke-dasharray: 64; stroke-dashoffset: 64;
        animation: hg-feed 4.4s ease-in-out infinite;
      }
      @keyframes hg-feed {
        0%, 12% { stroke-dashoffset: 64; }
        40%, 78% { stroke-dashoffset: 0; }
        94%, 100% { stroke-dashoffset: 64; }
      }
      /* it takes the job on — one swell, not a throb */
      .hg-dot--takes { animation: hg-takes 4.4s ease-in-out infinite; transform-origin: 166px 48px; }
      @keyframes hg-takes {
        0%, 38% { transform: scale(.72); opacity: .45; }
        52%, 80% { transform: scale(1); opacity: 1; }
        96%, 100% { transform: scale(.72); opacity: .45; }
      }

      /* ── 2 · the tools ── */
      .hg-node { fill: none; stroke: rgba(255,255,255,.18); stroke-width: 1.5; }
      /* the ones nobody connected stay exactly as they were — that is the point */
      .hg-node--on { animation: hg-node 4.6s ease-out infinite; }
      @keyframes hg-node {
        0%, 8% { fill: rgba(248,70,0,0); stroke: rgba(255,255,255,.18); }
        22%, 80% { fill: rgba(248,70,0,.9); stroke: rgba(248,70,0,.9); }
        94%, 100% { fill: rgba(248,70,0,0); stroke: rgba(255,255,255,.18); }
      }
      .hg-wire {
        stroke: rgba(248,70,0,.45);
        stroke-dasharray: 90; stroke-dashoffset: 90;
        animation: hg-wire 4.6s ease-in-out infinite;
      }
      @keyframes hg-wire {
        0%, 4% { stroke-dashoffset: 90; }
        20%, 80% { stroke-dashoffset: 0; }
        94%, 100% { stroke-dashoffset: 90; }
      }

      /* ── 3 · it keeps going ── */
      .hg-tick { fill: rgba(255,255,255,.18); }
      .hg-run {
        fill: rgba(248,70,0,.75); transform-origin: center bottom;
        animation-duration: 3.6s; animation-timing-function: cubic-bezier(.16,1,.3,1);
        animation-iteration-count: infinite;
      }
      .hg-run--1 { animation-name: hg-run1; }
      @keyframes hg-run1 {
        0%, 15% { transform: scaleY(0); opacity: 0; }
        19%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--2 { animation-name: hg-run2; }
      @keyframes hg-run2 {
        0%, 33% { transform: scaleY(0); opacity: 0; }
        37%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--3 { animation-name: hg-run3; }
      @keyframes hg-run3 {
        0%, 51% { transform: scaleY(0); opacity: 0; }
        55%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--4 { animation-name: hg-run4; }
      @keyframes hg-run4 {
        0%, 69% { transform: scaleY(0); opacity: 0; }
        73%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      .hg-run--5 { animation-name: hg-run5; }
      @keyframes hg-run5 {
        0%, 87% { transform: scaleY(0); opacity: 0; }
        91%, 96% { transform: scaleY(1); opacity: 1; }
        100% { transform: scaleY(1); opacity: 0; }
      }
      /* in one edge and out the other: the loop is the message */
      .hg-dot--runs { animation: hg-runs 3.6s linear infinite; }
      @keyframes hg-runs {
        0% { cx: 10px; }
        100% { cx: 198px; }
      }

      /* ── 4 · and asks ── */
      .hg-tick--quiet { fill: rgba(255,255,255,.2); animation: hg-quiet 4.2s ease-out infinite; }
      @keyframes hg-quiet {
        0%, 4% { fill: rgba(255,255,255,.5); }
        20%, 100% { fill: rgba(255,255,255,.2); }
      }
      .hg-riser {
        stroke: rgba(248,70,0,.7);
        stroke-dasharray: 26; stroke-dashoffset: 26;
        animation: hg-riser 4.2s ease-out infinite;
      }
      @keyframes hg-riser {
        0%, 24% { stroke-dashoffset: 26; }
        36%, 94% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 26; }
      }
      /* a ring, because that is what waiting looks like everywhere else in here */
      .hg-ring {
        fill: none; stroke: var(--color-primary); stroke-width: 1.6;
        transform-origin: 160px 24px;
        animation: hg-ring 4.2s ease-out infinite;
      }
      @keyframes hg-ring {
        0%, 30% { opacity: 0; transform: scale(.4); }
        42% { opacity: 1; transform: scale(1.14); }
        50%, 94% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(.4); }
      }
      .hg-dot--stops { animation: hg-stops 4.2s ease-out infinite; }
      @keyframes hg-stops {
        0%, 28% { opacity: 0; }
        40%, 94% { opacity: 1; }
        100% { opacity: 0; }
      }

      /* Still, but not blank: every loop above ends where it began, so holding the
         last frame would show an empty diagram. These hold the finished state. */
      @media (prefers-reduced-motion: reduce) {
        .hg-svg * { animation: none !important; }
        .hg-bar { opacity: 1; }
        .hg-feed, .hg-wire, .hg-riser { stroke-dashoffset: 0; }
        .hg-dot--takes { opacity: 1; }
        .hg-node--on { fill: rgba(248,70,0,.9); stroke: rgba(248,70,0,.9); }
        .hg-ring, .hg-dot--stops { opacity: 1; }
        .hg-dot--runs { cx: 190px; }
        .hg-run { opacity: 1; }
      }
    `})}const Oe=[{title:"Give it a job",body:"Tell the agent what you want it to take care of. One standing job, in your own words."},{title:"Connect your tools",body:"It works across the apps you already use — and only the ones you connect."},{title:"Let it keep going",body:"It checks things, runs routines, and carries on after you close the tab."},{title:"Come back when it matters",body:"It reports what it found, and asks first before anything it can't undo."}];function pd({firstTime:t,onCancel:a,onDone:n}){const[s,i]=l.useState(t?"intro":"identity"),[o,r]=l.useState(0),[c,p]=l.useState([]),[d,h]=l.useState(""),[x,g]=l.useState("ember"),[f,u]=l.useState(),b=y=>{u(y.id),d.trim()||h(y.name)};return e.jsxs("div",{className:"ob-stage",children:[e.jsx(X,{mode:"wait",children:e.jsxs(m.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,transition:{duration:.16}},transition:{duration:.38,ease:[.16,1,.3,1]},className:`ob-panel${s==="tools"?" ob-panel--wide":""}`,children:[s==="intro"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ob-orb",children:e.jsx(de,{status:"working",size:26,halo:!0})}),e.jsx("h1",{className:"ob-h1",children:"Agents work for you over time."}),e.jsx("p",{className:"ob-lede",children:"Give them a job, connect the tools they need, and let them keep things moving even when you're away."}),e.jsx(It,{primary:"Continue",onPrimary:()=>i("how"),onSecondary:a,secondary:"Not now"})]}),s==="how"&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"ob-count",children:[o+1," of ",Oe.length]}),e.jsxs("div",{className:"ob-card",children:[e.jsx(od,{i:o}),e.jsx("h2",{className:"ob-h2",children:Oe[o].title}),e.jsx("p",{className:"ob-lede",children:Oe[o].body})]}),e.jsx(It,{primary:o===Oe.length-1?"Continue":"Next",onPrimary:()=>o===Oe.length-1?i("tools"):r(o+1),secondary:"Back",onSecondary:()=>o===0?i("intro"):r(o-1)}),e.jsx(gd,{n:Oe.length,at:o})]}),s==="tools"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"ob-h2",children:"Tools this agent can use"}),e.jsx("p",{className:"ob-lede",children:"Connect a tool to Starchild once, then choose which agents may use it. You can change this any time."}),e.jsx(Hs,{enabled:c,onToggle:p}),e.jsx(It,{primary:"Continue",onPrimary:()=>i("identity"),secondary:"Back",onSecondary:()=>i("how")})]}),s==="identity"&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"ob-h2",children:t?"Create your first agent":"Create an agent"}),e.jsx("p",{className:"ob-lede",children:"You can change any of this later."}),e.jsx("div",{className:"ob-preview",style:{"--pick":Ye[x].hex},children:e.jsx("span",{className:"ob-body"})}),e.jsx("div",{className:"ob-picks",children:e.jsx("div",{className:"ob-pick-row",children:Object.entries(Ye).map(([y,w])=>e.jsx("button",{type:"button",onClick:()=>g(y),"aria-label":w.name,"aria-pressed":x===y,className:`ob-swatch${x===y?" ob-swatch--on":""}`,style:{"--pick":w.hex}},y))})}),e.jsx("input",{value:d,onChange:y=>h(y.target.value),className:"ob-input",placeholder:"Name it","aria-label":"Agent name"}),e.jsx("p",{className:"ob-group",children:"Or start from one of these"}),e.jsx("div",{className:"ob-templates",children:_c.map(y=>e.jsxs("button",{type:"button",onClick:()=>b(y),className:`ob-template${f===y.id?" ob-template--on":""}`,children:[e.jsx("span",{className:"ob-template-name",children:y.name}),e.jsx("span",{className:"ob-template-gets",children:y.gets})]},y.id))}),e.jsx(It,{primary:"Create agent",disabled:!d.trim(),onPrimary:()=>n({name:d.trim(),accent:x,tools:c,template:f}),secondary:t?"Back":"Cancel",onSecondary:()=>t?i("tools"):a()})]})]},s+(s==="how"?o:""))}),e.jsx("style",{children:`
        .ob-stage {
          display: flex; flex: 1; min-width: 0; align-items: center; justify-content: center;
          padding: 40px 28px 56px; overflow-y: auto;
          font-family: var(--font-google-sans); color: #fff;
        }
        .ob-panel {
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          width: 100%; max-width: 520px; text-align: center;
        }
        /* the connector grid needs room for three names; every other step reads
           better narrow, so only this one gets it */
        .ob-panel--wide { max-width: 720px; }

        .ob-orb { padding: 10px 0 4px; }
        .ob-h1 { margin: 0; font-size: 29px; line-height: 1.2; font-weight: 600; text-wrap: balance; }
        .ob-h2 { margin: 0; font-size: 25px; line-height: 1.2; font-weight: 600; text-wrap: balance; }
        .ob-lede {
          margin: 0; max-width: 44ch; font-size: 15.5px; line-height: 1.6;
          color: rgba(255,255,255,.55); text-wrap: pretty;
        }
        .ob-count {
          font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }

        /* one idea, in a container, so the sequence reads as cards not as pages */
        .ob-card {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          width: 100%; padding: 30px 32px 40px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          /* the diagram is the tallest thing here and it changes size between cards;
             a floor stops the panel jumping as the sequence advances */
          min-height: 296px; justify-content: center;
        }

        /* ---------- tools ---------- */

        .ob-search {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.4);
        }
        .ob-search input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14.5px; color: #fff;
        }
        .ob-search input::placeholder { color: rgba(255,255,255,.3); }

        .ob-tools {
          display: grid; gap: 8px; width: 100%; max-height: 320px; overflow-y: auto;
          padding: 2px;
        }
        @media (min-width: 560px) { .ob-tools { grid-template-columns: 1fr 1fr; } }

        .ob-tool {
          display: flex; align-items: center; gap: 10px; padding: 12px 14px;
          border-radius: 12px; cursor: pointer; text-align: left;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          font-family: inherit; font-size: 13.5px; color: rgba(255,255,255,.72);
          transition: border-color .18s ease, background-color .18s ease, color .18s ease;
        }
        .ob-tool svg { flex: none; color: rgba(255,255,255,.4); }
        .ob-tool:hover { border-color: rgba(255,255,255,.28); color: #fff; }
        .ob-tool--on { border-color: rgba(248,70,0,.45); background: rgba(248,70,0,.09); color: #fff; }
        .ob-tool--on svg { color: var(--color-primary); }
        .ob-tool-name { flex: 1; min-width: 0; }
        .ob-tool-check { flex: none; color: var(--color-primary); }
        .ob-none { margin: 8px 0; font-size: 13.5px; color: rgba(255,255,255,.35); }

        /* ---------- identity ---------- */

        .ob-preview {
          display: flex; align-items: center; justify-content: center;
          width: 92px; height: 92px; border-radius: 999px;
          background: radial-gradient(circle, color-mix(in srgb, var(--pick) 26%, transparent) 0%, transparent 68%);
        }

        /* One body. It was four, with a picker — but the silhouette was never
           carried through to the workspace orb, so the choice changed nothing
           after this screen, and status is already said by form. Colour is the
           only part of the look that is actually the agent's. */
        .ob-body { display: block; width: 44px; height: 44px; border-radius: 999px; background: var(--pick); }

        .ob-picks { display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .ob-pick-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

        .ob-swatch {
          width: 24px; height: 24px; border-radius: 999px; cursor: pointer;
          border: 2px solid transparent; background: var(--pick);
          box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset;
          transition: transform .15s ease;
        }
        .ob-swatch:hover { transform: scale(1.1); }
        .ob-swatch--on { border-color: #fff; }


        .ob-input {
          width: 100%; max-width: 320px; padding: 12px 18px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          font-family: inherit; font-size: 16px; color: #fff; text-align: center;
        }
        .ob-input:focus { outline: none; border-color: rgba(255,255,255,.32); }

        .ob-group {
          margin: 6px 0 0; font-size: 11px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ob-templates { display: grid; gap: 8px; width: 100%; }
        @media (min-width: 560px) { .ob-templates { grid-template-columns: 1fr 1fr; } }
        .ob-template {
          display: grid; gap: 3px; padding: 12px 14px; text-align: left; cursor: pointer;
          border: 1px solid rgba(255,255,255,.1); border-radius: 12px;
          background: rgba(255,255,255,.03);
          transition: border-color .18s ease;
        }
        .ob-template:hover { border-color: rgba(255,255,255,.28); }
        .ob-template--on { border-color: rgba(248,70,0,.5); background: rgba(248,70,0,.08); }
        .ob-template-name { font-size: 14px; font-weight: 600; color: #fff; }
        .ob-template-gets { font-size: 12.5px; line-height: 1.45; color: rgba(255,255,255,.45); }

        /* ---------- shared ---------- */

        .ob-actions { display: flex; flex-direction: column; align-items: center; gap: 9px; margin-top: 8px; width: 100%; }
        .ob-go {
          min-width: 200px; padding: 13px 30px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
          font-family: inherit; font-size: 14.5px; font-weight: 600;
          transition: background-color .2s ease;
        }
        .ob-go:hover { background: #ff5a1f; }
        .ob-go:disabled { background: rgba(255,255,255,.1); color: rgba(255,255,255,.35); cursor: default; }
        .ob-alt {
          border: 0; background: none; cursor: pointer;
          font-family: inherit; font-size: 13.5px; color: rgba(255,255,255,.4);
        }
        .ob-alt:hover { color: #fff; }

        .ob-dots { display: flex; gap: 6px; margin-top: 2px; }
        .ob-dot { width: 18px; height: 2px; border-radius: 999px; background: rgba(255,255,255,.14); }
        .ob-dot--on { background: var(--color-primary); }
      `})]})}function It({primary:t,secondary:a,disabled:n=!1,onPrimary:s,onSecondary:i}){return e.jsxs("div",{className:"ob-actions",children:[e.jsx("button",{type:"button",className:"ob-go",onClick:s,disabled:n,children:t}),e.jsx("button",{type:"button",className:"ob-alt",onClick:i,children:a})]})}function gd({n:t,at:a}){return e.jsx("div",{className:"ob-dots","aria-hidden":"true",children:Array.from({length:t},(n,s)=>e.jsx("span",{className:`ob-dot${s<=a?" ob-dot--on":""}`},s))})}function xd({roster:t,onPick:a,onCreate:n,onClose:s}){const[i,o]=l.useState(""),[r,c]=l.useState(0),p=l.useRef(null),d=l.useMemo(()=>{const u=i.trim().toLowerCase();return u?t.filter(b=>b.name.toLowerCase().includes(u)||b.role.toLowerCase().includes(u)):t},[t,i]),h=d.length;l.useEffect(()=>{c(u=>Math.min(u,h))},[h]),l.useEffect(()=>{var u;(u=p.current)==null||u.focus()},[]);const x=u=>{u===0?n(i.trim()||void 0):a(d[u-1].id)},g=u=>{if(u.key==="Escape"){u.preventDefault(),s();return}if(u.key==="ArrowDown"){u.preventDefault(),c(b=>(b+1)%(h+1));return}if(u.key==="ArrowUp"){u.preventDefault(),c(b=>(b+h)%(h+1));return}u.key==="Enter"&&(u.preventDefault(),x(r))},f=r===0;return e.jsxs("section",{className:"ap-root",children:[e.jsxs("div",{className:"ap-bar",children:[e.jsx("span",{className:"ap-to",children:"To"}),e.jsx("input",{ref:p,value:i,onChange:u=>{o(u.target.value),c(0)},onKeyDown:g,placeholder:"Search or create Agents","aria-label":"Search or create Agents",className:"ap-input"}),e.jsx("button",{type:"button",className:"ap-x",onClick:s,"aria-label":"Close",children:"✕"})]}),e.jsxs(m.div,{initial:{opacity:0,y:-6},animate:{opacity:1,y:0},transition:{duration:.22,ease:[.16,1,.3,1]},className:"ap-panel",children:[e.jsxs("div",{className:"ap-rows",children:[e.jsxs("button",{type:"button",onMouseEnter:()=>c(0),onClick:()=>x(0),className:`ap-row${f?" ap-row--on":""}`,children:[e.jsx("span",{className:"ap-glyph ap-glyph--new",children:e.jsx(fe,{className:"size-4"})}),e.jsx("span",{className:"ap-name",children:i.trim()?e.jsxs(e.Fragment,{children:["Create ",e.jsx("em",{children:i.trim()})]}):"Create new Agent"})]}),d.map((u,b)=>e.jsxs("button",{type:"button",onMouseEnter:()=>c(b+1),onClick:()=>x(b+1),className:`ap-row${r===b+1?" ap-row--on":""}`,children:[e.jsx("span",{className:"ap-glyph",children:e.jsx(de,{status:u.status,size:11,accent:u.accent})}),e.jsx("span",{className:"ap-name",children:u.name}),e.jsx("span",{className:"ap-mood",children:u.mood})]},u.id)),i.trim()&&d.length===0&&e.jsx("p",{className:"ap-none",children:"No agent called that yet."})]}),e.jsxs("div",{className:"ap-keys",children:[e.jsxs("span",{children:[e.jsx("kbd",{children:"↑"}),e.jsx("kbd",{children:"↓"})," move"]}),e.jsxs("span",{children:[e.jsx("kbd",{children:"⏎"})," ",f?"create":"open"]}),e.jsxs("span",{children:[e.jsx("kbd",{children:"esc"})," close"]})]})]}),e.jsx("style",{children:`
        .ap-root {
          display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0;
          font-family: var(--font-google-sans); color: #fff;
        }

        .ap-bar {
          display: flex; align-items: center; gap: 10px; padding: 15px 24px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .ap-to { flex: none; font-size: 14.5px; color: rgba(255,255,255,.4); }
        .ap-input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 15px; color: #fff;
        }
        .ap-input::placeholder { color: rgba(255,255,255,.32); }
        .ap-x {
          flex: none; border: 0; background: none; cursor: pointer; padding: 2px 4px;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.3);
        }
        .ap-x:hover { color: #fff; }

        /* Hung under the field rather than filling the column: it is a list of
           answers to what was typed, and it should end where the answers do. */
        .ap-panel {
          margin: 10px 24px 0; align-self: flex-start; width: calc(100% - 48px); max-width: 700px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 16px;
          background: #1c1c1e; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,.5);
        }
        .ap-rows { display: flex; flex-direction: column; padding: 8px; gap: 2px; max-height: 46vh; overflow-y: auto; }

        .ap-row {
          display: flex; align-items: center; gap: 12px; width: 100%;
          padding: 10px 12px; border: 0; border-radius: 10px; cursor: pointer;
          background: none; font-family: inherit; text-align: left;
        }
        /* one highlight, driven by the cursor — hover and arrow keys move the same
           thing, so there is never a second row that also looks chosen */
        .ap-row--on { background: rgba(255,255,255,.09); }

        .ap-glyph { flex: none; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; }
        .ap-glyph--new {
          border-radius: 999px; background: rgba(255,255,255,.09); color: rgba(255,255,255,.75);
        }
        .ap-name { font-size: 14.5px; color: #fff; }
        .ap-name em { font-style: normal; color: var(--color-primary); }
        .ap-mood {
          margin-left: auto; padding-left: 16px; font-size: 12px; color: rgba(255,255,255,.3);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ap-none { margin: 8px 12px 10px; font-size: 13.5px; color: rgba(255,255,255,.35); }

        .ap-keys {
          display: flex; justify-content: flex-end; gap: 16px;
          padding: 9px 14px; border-top: 1px solid rgba(255,255,255,.07);
          font-size: 11.5px; color: rgba(255,255,255,.3);
        }
        .ap-keys kbd {
          display: inline-block; min-width: 18px; margin-right: 4px; padding: 2px 5px;
          border-radius: 5px; background: rgba(255,255,255,.1);
          font-family: inherit; font-size: 11px; color: rgba(255,255,255,.6); text-align: center;
        }
      `})]})}const fd=({agent:t,active:a,nudged:n,onSelect:s,innerRef:i})=>e.jsxs("button",{ref:i,type:"button",onClick:s,className:`ag-row${a?" ag-row--on":""}${n?" ag-row--nudged":""}`,children:[e.jsx("span",{className:"ag-row-orb",style:t.accent?{"--agent-accent":t.accent}:void 0,children:e.jsx(de,{status:t.status,size:8,accent:t.accent})}),e.jsxs("span",{className:"ag-row-body",children:[e.jsxs("span",{className:"ag-row-top",children:[e.jsx("span",{className:"ag-row-name",children:t.name}),e.jsx("span",{className:"ag-row-time",children:t.lastActive})]}),e.jsx("span",{className:"ag-row-mood",children:t.mood})]})]});function md({when:t,lines:a}){return e.jsxs("div",{className:"ag-bubble ag-activity",children:[e.jsx("p",{className:"ag-activity-when",children:t}),e.jsx("ul",{children:a.map(n=>e.jsx("li",{children:n},n))})]})}function ud({text:t,detail:a,confirm:n}){const[s,i]=l.useState(null);return e.jsxs("div",{className:`ag-bubble ag-approval${s?" ag-approval--done":""}`,children:[e.jsx("p",{className:"ag-approval-title",children:t}),e.jsx("p",{className:"ag-approval-detail",children:a}),s?e.jsx("p",{className:"ag-approval-state",children:s==="approved"?"Approved — sending now.":"Held. Nothing was sent."}):e.jsxs("div",{className:"ag-approval-actions",children:[e.jsx("button",{type:"button",onClick:()=>i("approved"),className:"ag-btn ag-btn--go",children:n}),e.jsx("button",{type:"button",onClick:()=>i("held"),className:"ag-btn",children:"Not yet"})]})]})}function bd({name:t,cadence:a,apps:n}){return e.jsxs("div",{className:"ag-bubble ag-summary",children:[e.jsx("p",{className:"ag-summary-lead",children:"You're all set."}),e.jsx("p",{className:"ag-summary-name",children:t}),e.jsx("p",{className:"ag-summary-line",children:a}),e.jsxs("p",{className:"ag-summary-line",children:["Connected to ",n]})]})}function yd({turn:t,onReply:a}){if(t.kind==="activity")return e.jsx(md,{when:t.when,lines:t.lines});if(t.kind==="approval")return e.jsx(ud,{...t});if(t.kind==="summary")return e.jsx(bd,{...t});const n=t.kind==="you";return e.jsx(Bt,{align:n?"right":"left",onReply:()=>a(t.text),children:e.jsx("div",{className:`ag-bubble ag-msg${n?" ag-msg--mine":""}`,children:t.text})})}function wd({focusId:t}={}){const{roster:a,addAgent:n,updateAgent:s,setAgentTools:i}=Ze(),[o,r]=l.useState(()=>{if(typeof window>"u")return!0;if(new URLSearchParams(window.location.search).get("agents")==="empty")return!1;try{return window.localStorage.getItem("starchild.agents.onboarded")==="1"}catch{return!1}}),[c,p]=l.useState(!1),[d,h]=l.useState(!1),x=()=>h(!0),[g,f]=l.useState(t??""),[u,b]=l.useState(!1),[y,w]=l.useState(!1),[k,N]=l.useState(""),[C,S]=l.useState(null),v=a.find(z=>z.id===g)??a[0];l.useEffect(()=>{t&&f(t)},[t]);const L=c||!o&&a.length===0,[W,D]=l.useState(0),j=(z,Y=[],T=Ye.ember.hex)=>{const q={id:`a${Date.now()}`,name:z,role:"Working out its job with you",status:"working",mood:"Just started. Getting its bearings.",resting:`${z} is waiting on you.`,preview:"Say what you want it on",lastActive:"just now",accent:T,onboarding:!0,tools:Y,thread:Yc("Bárbara").map(I=>({kind:"agent",text:I}))};n(q),f(q.id),D(0),w(!1),r(!0);try{window.localStorage.setItem("starchild.agents.onboarded","1")}catch{}},$=z=>{j(z.name,z.tools,Ye[z.accent].hex),p(!1)},E=()=>{const z=k.trim();if(!z||!v)return;N("");const Y={kind:"you",text:z};if(s(v.id,q=>({...q,thread:[...q.thread,Y]})),!v.onboarding)return;const T=W;D(T+1),window.setTimeout(()=>{s(v.id,q=>{const I=T<pa.length?{kind:"agent",text:pa[T]}:{kind:"summary",name:q.name,cadence:"Checks every Monday",apps:"Notion, Google Calendar and Slack"},M=T>=pa.length;return{...q,onboarding:!M,role:M?"Keeps an eye on what you asked for":q.role,mood:M?"Ready. Waiting for Monday.":q.mood,status:M?"scheduled":q.status,cadence:M?"Every Monday at 9:00":q.cadence,thread:[...q.thread,I]}})},900)},A=l.useRef(null),F=l.useRef({}),[B,_]=l.useState(null),[Q,U]=l.useState(null),[Z,H]=l.useState(!1);return l.useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||L||a.length<2)return;const Y=window.setTimeout(()=>{const T=A.current,q=F.current[At.from],I=F.current[At.to];if(!T||!q||!I)return;const M=T.getBoundingClientRect().top,R=V=>V.getBoundingClientRect().top-M+17;_({from:R(q),to:R(I)}),H(!0)},4200);return()=>window.clearTimeout(Y)},[L,a.length]),e.jsxs("div",{className:"ag-workspace",children:[e.jsxs("aside",{className:"ag-list",children:[e.jsxs("div",{className:"ag-list-head",children:[e.jsx("p",{className:"ag-list-title",children:"Agents"}),e.jsx("button",{type:"button",className:"ag-new","aria-label":"Find or create an agent",onClick:x,children:e.jsx(fe,{className:"size-4"})})]}),e.jsxs("div",{className:"ag-rows",ref:A,children:[e.jsx(X,{children:B&&e.jsx(m.span,{className:"ag-signal","aria-hidden":"true",initial:{top:B.from,opacity:0,scale:.5},animate:{top:B.to,opacity:[0,1,1,0],scale:1},transition:{duration:1.15,ease:[.4,0,.2,1],times:[0,.15,.75,1]},onAnimationComplete:()=>{_(null),U(At.to),window.setTimeout(()=>U(null),900)}},"signal")}),a.length===0&&e.jsxs("div",{className:"ag-empty",children:[e.jsx("p",{className:"ag-empty-title",children:"No agents yet."}),e.jsx("p",{className:"ag-empty-body",children:"This is where they'll live, each with its own thread."})]}),a.map(z=>e.jsx(fd,{agent:z,active:z.id===v.id,nudged:Q===z.id,innerRef:Y=>{F.current[z.id]=Y},onSelect:()=>f(z.id)},z.id))]}),e.jsx(X,{children:Z&&e.jsx(m.p,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:1.2},className:"ag-handoff-note",children:At.says})})]}),d&&!L&&e.jsx(xd,{roster:a,onPick:z=>{f(z),h(!1)},onCreate:z=>{h(!1),j((z==null?void 0:z.trim())||"New agent")},onClose:()=>h(!1)}),L&&e.jsx(pd,{firstTime:!o&&a.length===0,onCancel:()=>{p(!1),r(!0)},onDone:$}),!L&&!d&&v&&e.jsxs("section",{className:"ag-thread",children:[e.jsx("header",{className:"ag-head",children:e.jsxs("button",{type:"button",className:`ag-id${y?" ag-id--open":""}`,onClick:()=>w(z=>!z),"aria-expanded":y,children:[e.jsx(de,{status:v.status,size:11,halo:!0,accent:v.accent}),e.jsx("span",{className:"ag-head-name",children:v.name}),e.jsx(Ve,{className:"ag-id-chev size-3.5"})]})}),e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},className:"ag-turns",children:[v.thread.map((z,Y)=>e.jsx(yd,{turn:z,onReply:S},Y)),e.jsxs(m.p,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.5},className:"ag-resting",children:[e.jsx(de,{status:v.status,size:6}),v.resting]})]},v.id),u&&e.jsxs("div",{className:"ag-sheet",children:[e.jsxs("div",{className:"ag-sheet-head",children:[e.jsxs("p",{className:"ag-sheet-title",children:["Tools ",v.name," can use"]}),e.jsx("button",{type:"button",className:"ag-sheet-close",onClick:()=>b(!1),children:"Done"})]}),e.jsx(Hs,{enabled:v.tools,onToggle:z=>i(v.id,z)})]}),e.jsxs("div",{className:"ag-composer",children:[C&&e.jsxs("div",{className:"ag-quote",children:[e.jsx("p",{children:C}),e.jsx("button",{type:"button",onClick:()=>S(null),"aria-label":"Cancel reply",children:"✕"})]}),e.jsxs("div",{className:"ag-composer-row",children:[e.jsx("input",{value:k,onChange:z=>N(z.target.value),onKeyDown:z=>{z.key==="Enter"&&E()},placeholder:`Message ${v.name}…`,className:"ag-input"}),e.jsx("button",{type:"button",className:"ag-send","aria-label":"Send",onClick:E,children:e.jsx(J,{className:"size-4"})})]})]})]}),e.jsx(X,{children:!L&&!d&&v&&y&&e.jsx(m.aside,{initial:{width:0,opacity:0},animate:{width:316,opacity:1},exit:{width:0,opacity:0},transition:{duration:.34,ease:[.16,1,.3,1]},className:"ag-drawer",children:e.jsxs("div",{className:"ag-drawer-in",children:[e.jsxs("div",{className:"ag-drawer-top",children:[e.jsx("p",{className:"ag-drawer-kicker",children:"Agent"}),e.jsx("button",{type:"button",className:"ag-drawer-x",onClick:()=>w(!1),"aria-label":"Close",children:"✕"})]}),e.jsx("div",{className:"ag-drawer-orb",children:e.jsx(de,{status:v.status,size:34,halo:!0,accent:v.accent})}),e.jsxs("label",{className:"ag-field",children:[e.jsx("span",{className:"ag-field-label",children:"Name"}),e.jsx("input",{className:"ag-field-in",value:v.name,onChange:z=>s(v.id,Y=>({...Y,name:z.target.value}))})]}),e.jsxs("label",{className:"ag-field",children:[e.jsx("span",{className:"ag-field-label",children:"What it does"}),e.jsx("textarea",{className:"ag-field-in",rows:3,value:v.role,onChange:z=>s(v.id,Y=>({...Y,role:z.target.value}))})]}),e.jsxs("div",{className:"ag-field",children:[e.jsx("span",{className:"ag-field-label",children:"Colour"}),e.jsx("div",{className:"ag-swatches",children:Object.entries(Ye).map(([z,Y])=>e.jsx("button",{type:"button","aria-label":Y.name,"aria-pressed":v.accent===Y.hex,onClick:()=>s(v.id,T=>({...T,accent:Y.hex})),className:`ag-swatch${v.accent===Y.hex?" ag-swatch--on":""}`,style:{"--pick":Y.hex}},z))})]}),e.jsxs("div",{className:"ag-field",children:[e.jsx("span",{className:"ag-field-label",children:"Right now"}),e.jsxs("p",{className:`ag-state ag-state--${v.status}`,children:[e.jsx("i",{"aria-hidden":"true"}),Dr[v.status]]}),v.cadence&&e.jsxs("p",{className:"ag-cadence",children:[e.jsx("span",{className:"ag-tick","aria-hidden":"true",children:e.jsx("i",{})}),v.cadence]})]}),e.jsxs("div",{className:"ag-field",children:[e.jsxs("span",{className:"ag-field-head",children:["Connected tools",e.jsx("button",{type:"button",className:"ag-gear","aria-label":"Manage connectors",title:"Manage connectors",onClick:()=>b(!0),children:e.jsx(Ri,{className:"size-[18px]"})})]}),e.jsxs("div",{className:"ag-chips",children:[v.tools.map(z=>e.jsxs("span",{className:"ag-chip",children:[e.jsx(me,{kind:ce[z].kind,className:"size-3.5"}),ce[z].name]},z)),v.tools.length===0&&e.jsx("span",{className:"ag-chip ag-chip--none",children:"Nothing yet"})]})]})]})},"drawer")}),e.jsx("style",{children:`
        .ag-workspace {
          display: flex; flex: 1; min-width: 0; min-height: 0;
          font-family: var(--font-google-sans); color: #fff;
        }

        /* ---------- roster ---------- */

        .ag-list {
          display: flex; flex-direction: column; flex: none; width: 272px;
          border-right: 1px solid rgba(255,255,255,.08);
        }
        .ag-list-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 16px 12px;
        }
        .ag-list-title {
          margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(255,255,255,.4);
        }
        .ag-new {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border: 0; border-radius: 999px; cursor: pointer;
          background: none; color: rgba(255,255,255,.45);
          transition: background-color .15s ease, color .15s ease;
        }
        .ag-new:hover { background: rgba(255,255,255,.07); color: #fff; }

        .ag-rows { flex: 1; overflow-y: auto; padding: 0 8px; display: flex; flex-direction: column; gap: 2px; }

        .ag-row {
          display: flex; align-items: flex-start; gap: 10px; width: 100%;
          padding: 11px 10px; border: 0; border-radius: 10px; cursor: pointer;
          background: none; text-align: left;
          transition: background-color .15s ease;
        }
        .ag-row:hover { background: rgba(255,255,255,.04); }
        .ag-row--on { background: rgba(255,255,255,.07); }
        .ag-row-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
        .ag-row-top { display: flex; align-items: baseline; gap: 8px; }
        .ag-row-name { flex: 1; font-size: 14px; font-weight: 500; color: #fff; }
        .ag-row-time { flex: none; font-size: 11px; color: rgba(255,255,255,.3); }
        .ag-row-mood {
          font-size: 12.5px; line-height: 1.4; color: rgba(255,255,255,.42);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ag-row--on .ag-row-mood { color: rgba(255,255,255,.55); }

        .ag-empty { padding: 18px 10px 8px; display: flex; flex-direction: column; gap: 7px; }
        .ag-empty-title { margin: 0; font-size: 14px; font-weight: 500; color: rgba(255,255,255,.6); }
        .ag-empty-body { margin: 0; font-size: 12.5px; line-height: 1.5; color: rgba(255,255,255,.32); }

        /* ---------- roster motion ---------- */

        .ag-rows { position: relative; }
        .ag-row-orb { flex: none; margin-top: 5px; }

        /* the signal travelling between two agents, in the gutter the orbs sit in */
        .ag-signal {
          position: absolute; left: 18px; z-index: 2; pointer-events: none;
          width: 6px; height: 6px; margin-top: -3px; border-radius: 999px;
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(248,70,0,.9), 0 0 22px rgba(248,70,0,.35);
        }

        /* the receiving agent takes a beat. One shot, a few percent — any more and
           it reads as an error rather than as being handed something. */
        .ag-row--nudged { animation: ag-nudge .9s cubic-bezier(.16,1,.3,1); }
        @keyframes ag-nudge {
          0% { background: rgba(248,70,0,.14); }
          100% { background: rgba(255,255,255,0); }
        }

        .ag-handoff-note {
          margin: 4px 16px 0; font-size: 11.5px; line-height: 1.5;
          color: rgba(255,255,255,.3);
        }

        /* ---------- thread ---------- */

        .ag-thread { display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0; }

        /* The selected agent is awake, and this is the whole of how that is said:
           a soft warmth behind the name, going nowhere. No animation — presence is
           not the same as activity, and only one of the two should move. */
        .ag-head {
          position: relative; isolation: isolate;
          display: flex; align-items: center; gap: 12px; padding: 12px 24px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        /* the name is the door to everything else, so it has to read as pressable
           without becoming a button-shaped thing sat in a header */
        .ag-id {
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          margin-left: -9px; padding: 6px 12px 6px 9px; border: 0; border-radius: 999px;
          background: none; font-family: inherit;
          transition: background-color .16s ease;
        }
        .ag-id:hover, .ag-id--open { background: rgba(255,255,255,.06); }
        .ag-id:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 2px; }
        .ag-id-chev { color: rgba(255,255,255,.28); transition: transform .24s ease, color .16s ease; }
        .ag-id:hover .ag-id-chev { color: rgba(255,255,255,.55); }
        .ag-id--open .ag-id-chev { transform: rotate(180deg); color: rgba(255,255,255,.55); }
        .ag-head::before {
          content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: radial-gradient(46% 120% at 8% 50%, rgba(248,70,0,.07) 0%, rgba(248,70,0,0) 70%);
        }
        .ag-head-name { font-size: 16px; font-weight: 600; color: #fff; }

        /* ---------- drawer ---------- */

        .ag-drawer {
          flex: none; overflow: hidden;
          border-left: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.015);
        }
        .ag-drawer-in {
          width: 316px; height: 100%; overflow-y: auto;
          padding: 14px 20px 30px; display: flex; flex-direction: column; gap: 18px;
        }
        .ag-drawer-top { display: flex; align-items: center; justify-content: space-between; }
        .ag-drawer-kicker {
          margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ag-drawer-x {
          border: 0; background: none; cursor: pointer; padding: 2px 4px;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.35);
        }
        .ag-drawer-x:hover { color: #fff; }
        .ag-drawer-orb { display: flex; justify-content: center; padding: 10px 0 4px; }

        .ag-field { display: flex; flex-direction: column; gap: 8px; }
        .ag-field-label, .ag-field-head {
          font-size: 11px; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        .ag-field-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        /* A 32px target with an 18px glyph. It was 14px in a 20px box, which is
           under every hit-target floor there is and read as a smudge next to an
           11px label. The negative margin keeps the row the height of the label,
           so the target grew without the layout moving. */
        .ag-gear {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; margin: -9px -7px -9px 0;
          border: 0; border-radius: 8px; background: none; cursor: pointer;
          color: rgba(255,255,255,.5);
          transition: color .15s ease, background-color .15s ease;
        }
        .ag-gear:hover { color: #fff; background: rgba(255,255,255,.09); }
        .ag-gear:focus-visible { outline: 2px solid rgba(248,70,0,.7); outline-offset: 1px; }
        /* editable, because the two things someone opens this for are what it is
           called and what it is for */
        .ag-field-in {
          width: 100%; padding: 10px 13px; border-radius: 11px; resize: none;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04);
          font-family: inherit; font-size: 13.5px; line-height: 1.5; color: #fff;
          transition: border-color .16s ease;
        }
        .ag-field-in:focus { outline: none; border-color: rgba(255,255,255,.32); }

        .ag-swatches { display: flex; flex-wrap: wrap; gap: 8px; }
        .ag-swatch {
          width: 22px; height: 22px; border-radius: 999px; cursor: pointer; padding: 0;
          background: var(--pick); border: 2px solid transparent;
          box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset;
          transition: box-shadow .15s ease;
        }
        .ag-swatch:hover { box-shadow: 0 0 0 2px rgba(255,255,255,.3); }
        .ag-swatch--on { border-color: #fff; }

        .ag-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .ag-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 11px; border-radius: 999px;
          border: 1px solid rgba(248,70,0,.32); background: rgba(248,70,0,.09);
          font-size: 12px; color: rgba(255,255,255,.88);
        }
        .ag-chip svg { color: var(--color-primary); }
        .ag-chip--none {
          border-color: rgba(255,255,255,.12); border-style: dashed; background: none;
          color: rgba(255,255,255,.3);
        }

        .ag-state {
          margin: 0; display: flex; align-items: center; gap: 8px;
          font-size: 13.5px; color: rgba(255,255,255,.6);
        }
        .ag-state i {
          width: 6px; height: 6px; border-radius: 999px; flex: none;
          background: rgba(255,255,255,.3);
        }
        .ag-state--working i, .ag-state--scheduled i { background: var(--color-primary); }
        /* waiting is a ring here too — the one state that means it is on you */
        .ag-state--waiting { color: var(--color-primary); }
        .ag-state--waiting i { background: none; box-shadow: 0 0 0 1.5px var(--color-primary) inset; }
        .ag-cadence {
          margin: 0; display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: rgba(255,255,255,.45);
        }
        /* One dot going slowly round, at the size where you notice it only if you
           look. It is the difference between a schedule that exists and one that
           is running. */
        .ag-tick { position: relative; width: 10px; height: 10px; flex: none; }
        .ag-tick i {
          position: absolute; top: 50%; left: 50%; width: 3px; height: 3px;
          margin: -1.5px 0 0 -1.5px; border-radius: 999px;
          background: rgba(248,70,0,.75);
          transform-origin: 1.5px 1.5px;
          animation: ag-orbit 5.5s linear infinite;
        }
        @keyframes ag-orbit {
          from { transform: rotate(0deg) translateX(3.5px); }
          to { transform: rotate(360deg) translateX(3.5px); }
        }

        /* what is going on when there is nothing to answer */
        .ag-resting {
          display: flex; align-items: center; gap: 9px; margin: 6px 0 0;
          font-size: 13px; color: rgba(255,255,255,.3);
        }


        .ag-turns {
          flex: 1; overflow-y: auto; padding: 24px;
          display: flex; flex-direction: column; gap: 18px;
        }

        /*
          One shell for everything in the thread.

          The blocks used to be told apart by their container — a rule for work, a
          rule for the receipt, a card for the ask — which quietly said that only
          some of it was the agent talking. All of it is. The agent is the one
          thing on this screen with a voice, so what it did and what it decided
          arrive the same way as what it said, and the difference between them is
          carried by what is inside the bubble.
        */
        .ag-bubble {
          /* hugs its text: the blocks are direct children of a flex column, so without
             this they stretch to the cap and a three-line receipt reads as wide as
             the longest sentence in the thread */
          width: fit-content; align-self: flex-start;
          max-width: 560px; padding: 11px 16px; border-radius: 16px 16px 16px 4px;
          background: rgba(255,255,255,.05);
        }

        .ag-msg { font-size: 14.5px; line-height: 1.55; color: rgba(255,255,255,.9); }
        .ag-msg--mine {
          border-radius: 16px 16px 4px 16px;
          background: rgba(248,70,0,.14); border: 1px solid rgba(248,70,0,.22);
        }

        /* Work, not talk — said by the kicker and the list, not by the container. */
        .ag-activity { padding-top: 12px; padding-bottom: 13px; }
        .ag-activity-when {
          margin: 0 0 7px; font-size: 11.5px; letter-spacing: .06em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .ag-activity ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .ag-activity li { font-size: 13.5px; line-height: 1.45; color: rgba(255,255,255,.62); }

        /* A receipt, so no button — the job is already set, and a confirmation
           asking for one more click would undo the feeling of having simply told
           someone what you wanted. */
        .ag-summary {
          display: flex; flex-direction: column; gap: 2px;
          padding-top: 13px; padding-bottom: 15px;
        }
        .ag-summary-lead { margin: 0 0 6px; font-size: 13px; color: var(--color-primary); }
        .ag-summary-name { margin: 0; font-size: 16px; font-weight: 600; }
        .ag-summary-line { margin: 0; font-size: 13.5px; color: rgba(255,255,255,.5); }

        /* The one that keeps a colour of its own: it is the only turn that cannot
           proceed without you, and that is worth being findable in a scrollback. */
        .ag-approval {
          max-width: 520px; padding: 16px 18px 18px;
          border: 1px solid rgba(248,70,0,.35); background: rgba(248,70,0,.07);
        }
        .ag-approval--done { border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.03); }
        .ag-approval-title { margin: 0; font-size: 15px; font-weight: 600; }
        .ag-approval-detail { margin: 6px 0 0; font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,.55); }
        .ag-approval-state { margin: 14px 0 0; font-size: 13px; color: rgba(255,255,255,.5); }
        .ag-approval-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

        .ag-btn {
          padding: 8px 16px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.18); background: none;
          font-family: inherit; font-size: 13px; color: rgba(255,255,255,.8);
          transition: background-color .15s ease;
        }
        .ag-btn:hover { background: rgba(255,255,255,.07); }
        .ag-btn--go {
          border-color: transparent; background: var(--color-primary); color: #fff; font-weight: 500;
        }
        .ag-btn--go:hover { background: #ff5a1f; }

        /* ---------- composer ---------- */

        .ag-sheet {
          flex: none; margin: 0 24px 4px; padding: 16px 18px 18px;
          border-radius: 16px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(20,20,22,.96);
          display: flex; flex-direction: column; gap: 12px;
        }
        .ag-sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .ag-sheet-title { margin: 0; font-size: 14px; font-weight: 600; }
        .ag-sheet-close {
          padding: 5px 14px; border-radius: 999px; cursor: pointer;
          border: 0; background: var(--color-primary); color: #fff;
          font-family: inherit; font-size: 12.5px; font-weight: 500;
        }

        .ag-composer { flex: none; padding: 14px 24px 20px; }
        .ag-quote {
          display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
          padding-left: 11px; border-left: 2px solid var(--color-primary);
        }
        .ag-quote p {
          margin: 0; flex: 1; min-width: 0; font-size: 12.5px; color: rgba(255,255,255,.45);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .ag-quote button {
          flex: none; border: 0; background: none; cursor: pointer;
          font-size: 12px; color: rgba(255,255,255,.35);
        }
        .ag-quote button:hover { color: #fff; }

        .ag-composer-row {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 8px 8px 18px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04);
          transition: border-color .2s ease;
        }
        .ag-composer-row:focus-within { border-color: rgba(255,255,255,.3); }
        .ag-input {
          flex: 1; min-width: 0; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 14.5px; color: #fff;
        }
        .ag-input::placeholder { color: rgba(255,255,255,.32); }
        .ag-send {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border: 0; border-radius: 999px; cursor: pointer;
          background: var(--color-primary); color: #fff;
          transition: transform .15s ease;
        }
        .ag-send:hover { transform: scale(1.05); }

        @media (prefers-reduced-motion: reduce) {
          .ag-tick i { animation: none; }
          .ag-row--nudged { animation: none; }
          .ag-send:hover { transform: none; }
        }

        /* Below this the roster and the thread stop fitting side by side. The
           roster wins the top of the screen — knowing who needs you matters more
           than reading one thread. */
        @media (max-width: 900px) {
          .ag-workspace { flex-direction: column; }
          .ag-list { width: auto; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.08); }
          .ag-rows { flex-direction: row; overflow-x: auto; padding-bottom: 8px; }
          .ag-row { width: 240px; flex: none; }
        }
      `})]})}function vd(){const{isConnected:t,connectionFor:a,usedBy:n,connect:s,disconnect:i}=Ze(),[o,r]=l.useState(null),c=gt.filter(d=>t(d.id)),p=gt.filter(d=>!t(d.id));return e.jsxs("div",{className:"cn-page",children:[e.jsxs("header",{className:"cn-head",children:[e.jsx("h1",{className:"cn-title",children:"Connectors"}),e.jsx("p",{className:"cn-sub",children:"Connect a tool to Starchild once. After that you decide, agent by agent, which ones are allowed to use it."})]}),e.jsxs("section",{className:"cn-section",children:[e.jsxs("p",{className:"cn-label",children:["Connected · ",c.length]}),c.length===0&&e.jsx("p",{className:"cn-empty",children:"Nothing connected yet."}),c.map(d=>{const h=a(d.id),x=n(d.id),g=o===d.id;return e.jsxs("div",{className:`cn-card${g?" cn-card--open":""}`,children:[e.jsxs("button",{type:"button",className:"cn-card-head",onClick:()=>r(g?null:d.id),"aria-expanded":g,children:[e.jsx("span",{className:"cn-glyph",children:e.jsx(me,{kind:d.kind,className:"size-[18px]"})}),e.jsxs("span",{className:"cn-card-body",children:[e.jsx("span",{className:"cn-name",children:d.name}),e.jsxs("span",{className:"cn-account",children:["Connected as ",h==null?void 0:h.account]})]}),e.jsx("span",{className:"cn-users",children:x.length===0?e.jsx("span",{className:"cn-unused",children:"No agents yet"}):x.map(f=>e.jsxs("span",{className:"cn-user",children:[e.jsx(de,{status:f.status,size:6,accent:f.accent}),f.name]},f.id))})]}),g&&e.jsxs("div",{className:"cn-detail",children:[e.jsxs("div",{children:[e.jsx("p",{className:"cn-detail-label",children:"What agents can do with it"}),e.jsx("ul",{className:"cn-grants",children:d.grants.map(f=>e.jsx("li",{children:f},f))})]}),e.jsxs("div",{className:"cn-detail-side",children:[e.jsx("p",{className:"cn-detail-label",children:"Account"}),e.jsx("p",{className:"cn-detail-value",children:h==null?void 0:h.account}),e.jsx("p",{className:"cn-detail-since",children:h==null?void 0:h.since}),e.jsxs("div",{className:"cn-actions",children:[e.jsx("button",{type:"button",className:"cn-btn",onClick:()=>s(d.id),children:"Reconnect"}),e.jsx("button",{type:"button",className:"cn-btn cn-btn--off",onClick:()=>i(d.id),children:"Disconnect"})]}),x.length>0&&e.jsxs("p",{className:"cn-warn",children:["Disconnecting removes it from ",x.length===1?"1 agent":`${x.length} agents`,"."]})]})]})]},d.id)})]}),e.jsxs("section",{className:"cn-section",children:[e.jsxs("p",{className:"cn-label",children:["Available · ",p.length]}),e.jsx("div",{className:"cn-grid",children:p.map(d=>e.jsxs("div",{className:"cn-avail",children:[e.jsx("span",{className:"cn-glyph",children:e.jsx(me,{kind:d.kind,className:"size-4"})}),e.jsxs("span",{className:"cn-card-body",children:[e.jsx("span",{className:"cn-name",children:d.name}),e.jsx("span",{className:"cn-what",children:d.what})]}),e.jsx("button",{type:"button",className:"cn-connect",onClick:()=>s(d.id),children:"Connect"})]},d.id))})]}),e.jsx("style",{children:`
        .cn-page {
          flex: 1; min-width: 0; overflow-y: auto; padding: 34px 34px 60px;
          font-family: var(--font-google-sans); color: #fff;
        }
        .cn-head { max-width: 60ch; margin-bottom: 34px; }
        .cn-title { margin: 0; font-size: 26px; font-weight: 600; }
        .cn-sub { margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.5); }

        .cn-section { display: flex; flex-direction: column; gap: 8px; margin-bottom: 38px; }
        .cn-label {
          margin: 0 0 4px; font-size: 11px; font-weight: 600; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,255,255,.3);
        }
        .cn-empty { margin: 0; font-size: 14px; color: rgba(255,255,255,.35); }

        .cn-card {
          border: 1px solid rgba(255,255,255,.09); border-radius: 14px;
          background: rgba(255,255,255,.02); overflow: hidden;
        }
        .cn-card--open { border-color: rgba(255,255,255,.16); }

        .cn-card-head {
          display: flex; align-items: center; gap: 14px; width: 100%;
          padding: 15px 18px; border: 0; background: none; cursor: pointer; text-align: left;
          transition: background-color .15s ease;
        }
        .cn-card-head:hover { background: rgba(255,255,255,.03); }

        .cn-glyph { flex: none; display: flex; color: rgba(255,255,255,.45); }
        .cn-card-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cn-name { font-size: 15px; font-weight: 500; }
        .cn-account, .cn-what { font-size: 12.5px; color: rgba(255,255,255,.4); }

        .cn-users { margin-left: auto; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }
        .cn-user {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          font-size: 11.5px; color: rgba(255,255,255,.6);
        }
        .cn-unused { font-size: 11.5px; color: rgba(255,255,255,.25); }

        .cn-detail {
          display: grid; gap: 22px; padding: 4px 18px 20px;
          border-top: 1px solid rgba(255,255,255,.07);
        }
        @media (min-width: 720px) { .cn-detail { grid-template-columns: 1fr 240px; padding-top: 18px; } }

        .cn-detail-label {
          margin: 0 0 8px; font-size: 11px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.28);
        }
        /* Permissions in plain sentences: someone can agree or disagree with "read
           your mail". Nobody can agree with a scope string. */
        .cn-grants { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .cn-grants li {
          position: relative; padding-left: 15px; font-size: 13.5px; color: rgba(255,255,255,.6);
        }
        .cn-grants li::before {
          content: ""; position: absolute; left: 0; top: 8px;
          width: 4px; height: 4px; border-radius: 999px; background: rgba(248,70,0,.7);
        }

        .cn-detail-value { margin: 0; font-size: 13.5px; }
        .cn-detail-since { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,.3); }

        .cn-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .cn-btn {
          padding: 7px 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.16); background: none;
          font-family: inherit; font-size: 12.5px; color: rgba(255,255,255,.7);
        }
        .cn-btn:hover { border-color: rgba(255,255,255,.34); color: #fff; }
        .cn-btn--off:hover { border-color: rgba(248,70,0,.6); color: var(--color-primary); }

        /* Said before the click, not after — the only screen that knows the blast
           radius is the one that has to warn about it. */
        .cn-warn { margin: 10px 0 0; font-size: 11.5px; line-height: 1.5; color: rgba(255,255,255,.32); }

        .cn-grid { display: grid; gap: 8px; }
        @media (min-width: 700px) { .cn-grid { grid-template-columns: 1fr 1fr; } }
        .cn-avail {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02);
        }
        .cn-connect {
          margin-left: auto; flex: none; padding: 6px 15px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.05);
          font-family: inherit; font-size: 12.5px; font-weight: 500; color: #fff;
        }
        .cn-connect:hover { background: rgba(255,255,255,.12); }
      `})]})}const qs=[{id:"comms",name:"Email & Communication",tools:[{name:"Gmail",what:"Send and read email, with attachments",slug:"gmail"},{name:"Outlook",what:"Email through Microsoft Graph",slug:"outlook"},{name:"Slack",what:"Messages and channels",slug:"slack"},{name:"Slackbot",what:"Automated replies in Slack",slug:"slackbot"},{name:"Microsoft Teams",what:"Messages and teams",slug:"teams"},{name:"Discord",what:"Servers, channels and messages",slug:"discord"}]},{id:"google",name:"Google Workspace",tools:[{name:"Google Calendar",what:"Events and your schedule",slug:"gcal"},{name:"Google Drive",what:"Files and folders",slug:"gdrive"},{name:"Google Docs",what:"Write and edit documents",slug:"gdocs"},{name:"Google Sheets",what:"Build and edit spreadsheets",slug:"gsheets"},{name:"Google Slides",what:"Build and edit presentations",slug:"gslides"},{name:"Google Meet",what:"Meetings",slug:"gmeet"}]},{id:"social",name:"Social & Content",tools:[{name:"Twitter / X",what:"Posts, search and media",slug:"x"},{name:"LinkedIn",what:"Profile, posts and network",slug:"linkedin"},{name:"Instagram",what:"Posts and messages",slug:"instagram"},{name:"Facebook",what:"Pages and posts",slug:"facebook"},{name:"Reddit",what:"Threads and subreddits",slug:"reddit"},{name:"YouTube",what:"Videos and channels",slug:"youtube"}]},{id:"design",name:"Design & Creation",tools:[{name:"Figma",what:"Files, projects and comments",slug:"figma"},{name:"Canva",what:"Designs",slug:"canva"},{name:"ElevenLabs",what:"Voice and audio",slug:"elevenlabs"}]},{id:"dev",name:"Dev & Infra",tools:[{name:"GitHub",what:"Repositories, issues and pull requests",slug:"github"},{name:"Supabase",what:"Database, auth and storage",slug:"supabase"},{name:"Vercel",what:"Deployments",slug:"vercel"},{name:"Cloudflare",what:"DNS and workers",slug:"cloudflare"},{name:"SharePoint",what:"Microsoft documents",slug:"sharepoint"}]},{id:"work",name:"Productivity & CRM",tools:[{name:"Notion",what:"Pages and databases",slug:"notion"},{name:"Airtable",what:"Bases and records",slug:"airtable"},{name:"Linear",what:"Issues and tasks",slug:"linear"},{name:"HubSpot",what:"Contacts and deals",slug:"hubspot"},{name:"Calendly",what:"Scheduling",slug:"calendly"}]},{id:"data",name:"Data & AI",tools:[{name:"Perplexity",what:"Search with sources",slug:"perplexity"},{name:"Firecrawl",what:"Read a website's pages",slug:"firecrawl"},{name:"Browserbase",what:"Drive a browser for you",slug:"browserbase"},{name:"Google Analytics",what:"Site traffic and behaviour",slug:"ganalytics"},{name:"Search Console",what:"How you show up in search",slug:"gsearchconsole"}]}],He=qs.flatMap(t=>t.tools.map(a=>({...a,groupId:t.id}))),we=[{id:"all",name:"All",n:He.length},...qs.map(t=>({id:t.id,name:t.name,n:t.tools.length}))];function kd({name:t,slug:a}){const[n,s]=l.useState(!0);return n?e.jsx("span",{className:"cn-mark",children:e.jsx("img",{src:`./connectors/${a}.svg`,alt:"",onError:()=>s(!1)})}):e.jsx("span",{className:"cn-mark cn-mark--letter",children:t.charAt(0)})}function jd({onNavigateHome:t,onLogIn:a,onSignUp:n}){const[s,i]=l.useState(""),[o,r]=l.useState("all"),c=l.useRef(null),p=l.useMemo(()=>{const g=s.trim().toLowerCase(),f=o==="all"?He:He.filter(u=>u.groupId===o);return g?f.filter(u=>`${u.name} ${u.what}`.toLowerCase().includes(g)):f},[s,o]),d=l.useMemo(()=>{const g=s.trim().toLowerCase();return!g||o==="all"?0:He.filter(f=>`${f.name} ${f.what}`.toLowerCase().includes(g)).length},[s,o]),h=we.find(g=>g.id===o)??we[0];function x(g){var b,y;const f=g.key==="ArrowRight"?1:g.key==="ArrowLeft"?-1:0;let u=-1;f?u=(we.findIndex(w=>w.id===o)+f+we.length)%we.length:g.key==="Home"?u=0:g.key==="End"&&(u=we.length-1),!(u<0)&&(g.preventDefault(),r(we[u].id),(y=(b=c.current)==null?void 0:b.querySelectorAll("[role='tab']")[u])==null||y.focus())}return e.jsxs("div",{className:"cn-page",children:[e.jsx(Da,{onNavigateHome:t,onLogIn:a,onSignUp:n}),e.jsxs(O,{children:[e.jsx("nav",{className:"cn-crumbs","aria-label":"Breadcrumb",children:e.jsxs("ol",{children:[e.jsx("li",{children:e.jsx("button",{type:"button",onClick:t,children:"Home"})}),e.jsx("li",{"aria-hidden":"true",className:"cn-slash",children:"/"}),e.jsx("li",{"aria-current":"page",children:"Connectors"})]})}),e.jsxs("header",{className:"cn-head",children:[e.jsx("h1",{className:"cn-title",children:"Connect Starchild to the tools you already use."}),e.jsxs("p",{className:"cn-sub",children:["Browse ",He.length," connectors across communication, productivity, design,",e.jsx("br",{}),"development, data and AI."]})]}),e.jsxs("div",{className:"cn-bar",children:[e.jsx("div",{ref:c,className:"cn-tabs",role:"tablist","aria-label":"Connector categories",onKeyDown:x,children:we.map(g=>{const f=g.id===o;return e.jsxs("button",{type:"button",role:"tab",id:`cn-tab-${g.id}`,"aria-selected":f,"aria-controls":"cn-panel",tabIndex:f?0:-1,onClick:()=>r(g.id),className:f?"cn-tab cn-tab--on":"cn-tab",children:[g.name,e.jsx("span",{className:"cn-tab-n",children:g.n})]},g.id)})}),e.jsxs("div",{className:"cn-search",children:[e.jsxs("svg",{viewBox:"0 0 16 16",width:"15",height:"15",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"7",cy:"7",r:"4.6",stroke:"currentColor",strokeWidth:"1.3"}),e.jsx("path",{d:"M10.4 10.4L14 14",stroke:"currentColor",strokeWidth:"1.3",strokeLinecap:"round"})]}),e.jsx("input",{type:"search",value:s,onChange:g=>i(g.target.value),placeholder:o==="all"?"Search connectors":`Search ${h.name}`,"aria-label":"Search connectors"})]})]}),e.jsxs("p",{className:"sr-only",role:"status",children:[p.length," of ",h.n," connectors shown in ",h.name,"."]}),e.jsx("div",{id:"cn-panel",role:"tabpanel","aria-labelledby":`cn-tab-${o}`,tabIndex:-1,children:p.length>0?e.jsx("ul",{className:"cn-grid",children:p.map(g=>e.jsxs("li",{className:"cn-card",children:[e.jsx(kd,{name:g.name,slug:g.slug}),e.jsx("span",{className:"cn-name",children:g.name})]},g.name))}):e.jsxs("div",{className:"cn-none",children:[e.jsxs("p",{children:["Nothing in ",h.name," matches “",s.trim(),"”."]}),d>0?e.jsxs("button",{type:"button",onClick:()=>r("all"),className:"cn-clear",children:["Search all ",He.length," connectors (",d," match)"]}):e.jsx("button",{type:"button",onClick:()=>{i(""),r("all")},className:"cn-clear",children:"Show everything"})]})}),e.jsx("p",{className:"cn-foot",children:"Connect an account once, to you. After that, letting an agent use it is a permission rather than another login."})]}),e.jsx("style",{children:`
        .cn-page {
          min-height: 100vh;
          padding-bottom: 56px;
          background: #050506;
          font-family: var(--font-google-sans);
        }

        /* ---------- crumbs and heading ---------- */

        .cn-crumbs { margin-top: 10px; }
        .cn-crumbs ol {
          display: flex; align-items: center; gap: 8px;
          margin: 0; padding: 0; list-style: none;
          font-size: 13px; color: rgba(255,255,255,.42);
        }
        .cn-crumbs button {
          padding: 0; border: 0; background: none; cursor: pointer;
          font: inherit; color: rgba(255,255,255,.6);
          transition: color .18s ease;
        }
        .cn-crumbs button:hover { color: #fff; }
        .cn-crumbs button:focus-visible { outline: 2px solid #f84600; outline-offset: 3px; border-radius: 4px; }
        .cn-crumbs [aria-current] { color: #fff; }
        .cn-slash { color: rgba(255,255,255,.22); }

        .cn-head { max-width: 620px; margin: 24px 0 0; }
        .cn-title {
          margin: 0;
          font-size: 34px; line-height: 1.16; font-weight: 600;
          letter-spacing: -.015em; color: #fff; text-wrap: balance;
        }
        .cn-sub {
          margin: 12px 0 0;
          font-size: 15.5px; line-height: 1.55; color: rgba(255,255,255,.55);
        }

        /* ---------- tabs and search ----------

           One rule under both, and the open tab sits on it. Underlined rather
           than pills: a row of eight pills is eight buttons of equal weight, and
           these are one control with eight positions. The line is what says
           that. */
        .cn-bar {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
          margin-top: 30px;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }

        .cn-tabs {
          display: flex; gap: 2px; min-width: 0;
          overflow-x: auto;
          /* the tabs scroll on a narrow window, and the scrollbar under them
             would sit on the rule they share */
          scrollbar-width: none;
        }
        .cn-tabs::-webkit-scrollbar { display: none; }

        .cn-tab {
          display: inline-flex; align-items: center; gap: 7px; flex: none;
          padding: 11px 14px; margin-bottom: -1px;
          border: 0; border-bottom: 2px solid transparent;
          background: none; cursor: pointer; white-space: nowrap;
          font-family: inherit; font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,.48);
          transition: color .18s ease, border-color .18s ease;
        }
        .cn-tab:hover { color: rgba(255,255,255,.82); }
        .cn-tab--on { color: #fff; border-bottom-color: #f84600; }
        .cn-tab:focus-visible { outline: 2px solid #f84600; outline-offset: -2px; border-radius: 4px; }

        .cn-tab-n {
          padding: 1px 6px; border-radius: 999px;
          background: rgba(255,255,255,.07);
          font-size: 10.5px; font-weight: 600; color: rgba(255,255,255,.42);
          transition: background-color .18s ease, color .18s ease;
        }
        .cn-tab--on .cn-tab-n { background: rgba(248,70,0,.14); color: #f84600; }

        .cn-search {
          display: flex; align-items: center; gap: 9px; flex: none;
          width: 230px; margin-bottom: 8px; padding: 8px 13px;
          border: 1px solid rgba(255,255,255,.1); border-radius: 999px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.38);
          transition: border-color .18s ease, background-color .18s ease;
        }
        .cn-search:focus-within {
          border-color: rgba(248,70,0,.55); background: rgba(255,255,255,.06);
        }
        .cn-search input {
          width: 100%; border: 0; background: none; outline: none;
          font-family: inherit; font-size: 13.5px; color: #fff;
        }
        .cn-search input::placeholder { color: rgba(255,255,255,.35); }
        /* the browser's own clear button is a grey blob on a dark field */
        .cn-search input::-webkit-search-cancel-button { -webkit-appearance: none; }

        #cn-panel:focus { outline: none; }

        /* ---------- the grid ----------

           auto-fill rather than a fixed count, so the same page holds five across
           on a wide window and two on a laptop without a breakpoint for each. The
           cells stretch to the tallest card in their row, which is what lets a
           description finish instead of being clipped. */
        .cn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
          gap: 12px;
          margin: 24px 0 0; padding: 0; list-style: none;
        }

        /* Upright, and the mark is the card. With the description gone the name
           is a label under a picture rather than a heading with body under it,
           so it is centred and the two are stacked — laid out on a row, a 48px
           mark beside two words leaves most of the card empty to its right. */
        .cn-card {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 20px 12px 18px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          background: #0a0a0b;
          text-align: center;
          transition: border-color .18s ease, background-color .18s ease;
        }
        .cn-card:hover { border-color: rgba(248,70,0,.35); background: #0d0d0f; }

        /* Square, with the corners rounded to the same family as the card around
           it — 8 inside 12, so the two curves look related rather than the mark
           looking like a sticker dropped on the card. Square is also what these
           marks are: an app icon is a rounded square everywhere else a person
           meets it, and a circle crops the ones drawn to fill their box. */
        /* Square, with the corners rounded to the same family as the card around
           it — 12 inside 12 at this size. Square is also what these marks are: an
           app icon is a rounded square everywhere else a person meets it, and a
           circle crops the ones drawn to fill their box.

           48 rather than 30, because with the description gone the mark is what
           the card is for. Anything smaller and a card of mostly empty ground
           would be carrying two words. */
        .cn-mark {
          display: grid; place-items: center; flex: none;
          width: 48px; height: 48px; border-radius: 12px;
          background: #fff; overflow: hidden;
        }
        .cn-mark img { width: 100%; height: 100%; object-fit: contain; }
        /* The monogram sits on the dark ground instead, because a single letter
           on a white tile reads as a broken image where a logo should be. */
        .cn-mark--letter {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          font-size: 19px; font-weight: 600; color: rgba(255,255,255,.66);
        }

        /* Balanced so a two-word name wraps to two lines without the card
           growing much — "Google Search Console" is the one that decides this. */
        .cn-name {
          font-size: 13px; line-height: 1.35; font-weight: 500; color: #fff;
          text-wrap: balance;
        }

        /* ---------- nothing found, and the footer ---------- */

        .cn-none {
          display: flex; flex-direction: column; align-items: flex-start; gap: 14px;
          margin-top: 44px; padding-bottom: 36px;
          color: rgba(255,255,255,.55); font-size: 15px;
        }
        .cn-none p { margin: 0; }
        .cn-clear {
          padding: 8px 16px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(248,70,0,.55); background: rgba(248,70,0,.08);
          font-family: inherit; font-size: 13px; font-weight: 500; color: #f84600;
        }
        .cn-clear:focus-visible { outline: 2px solid #f84600; outline-offset: 2px; }

        .cn-foot {
          margin: 32px 0 0; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.08);
          font-size: 13px; color: rgba(255,255,255,.4);
        }

        @media (max-width: 860px) {
          .cn-title { font-size: 27px; }
          /* The search drops under the tabs rather than squeezing them: at this
             width the two of them share a line only by making the tab strip too
             short to show more than three. */
          .cn-bar { flex-direction: column; align-items: stretch; gap: 0; }
          .cn-search {
            order: -1; width: 100%; margin: 0 0 16px;
          }
          .cn-tabs { margin-bottom: 0; }
          .cn-grid { grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: 10px; }
        }
      `})]})}const ga=[{Icon:za,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:Sa,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:Le,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function Nd({onDone:t}){const[a,n]=l.useState(0),s=ga[a],i=a===ga.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(X,{mode:"wait",children:e.jsxs(m.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(s.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:s.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:s.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:ga.map((o,r)=>e.jsx("button",{type:"button",onClick:()=>n(r),"aria-label":`Go to slide ${r+1}`,className:`h-1.5 rounded-full transition-all ${r===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},r))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>i?t():n(o=>o+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:i?"Ok, let's go":"Next"})]})]})}function zd({skillTitle:t,onBack:a,onContinue:n}){return e.jsx(Oa,{heading:"Create a free account to get this skill",sub:`So "${t}" lands in your library and the seller actually gets paid.`,onBack:a,onContinue:n})}const Cd={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function Sd(t){return Cd[t]??{bg:"#e5e5e5",text:"#404040"}}function Td({skill:t,onSelect:a}){const n=Sd(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:s=>{a&&(s.key==="Enter"||s.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:n.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:n.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function Ad({open:t,onClose:a,skills:n,onAddSkill:s}){const[i,o]=l.useState("onboarding"),[r,c]=l.useState("All"),[p,d]=l.useState(""),[h,x]=l.useState(""),[g,f]=l.useState(""),[u,b]=l.useState(""),[y,w]=l.useState(Kt[2]),[k,N]=l.useState(null);l.useEffect(()=>{t&&(o("onboarding"),N(null))},[t]);function C(){o("create")}function S(j){N(j),o("auth")}function v(){o("purchased")}function L(){h.trim()&&(s({id:`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:h.trim(),price:u.trim()||"$5",category:y,blurb:g.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),x(""),f(""),b(""),o("grid"))}const W=p.trim().toLowerCase(),D=n.filter(j=>{const $=r==="All"||j.category===r,E=!W||j.title.toLowerCase().includes(W)||j.blurb.toLowerCase().includes(W)||j.category.toLowerCase().includes(W);return $&&E});return e.jsx(X,{children:t&&e.jsx(m.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:j=>{j.target===j.currentTarget&&a()},children:e.jsxs(m.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(xs,{className:"size-4"})})]}),e.jsx(X,{mode:"wait",children:i==="onboarding"?e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(Nd,{onDone:()=>o("grid")})},"onboarding"):i==="grid"?e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-[#1a1206]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-[#1a1206]/65",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:C,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm",children:e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"Starchild",width:36,height:36,className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(j=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${j===0?"w-4 bg-[#f84600]":"w-1.5 bg-black/15"}`},j))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(Le,{className:"size-4 text-white/40"}),e.jsx("input",{value:p,onChange:j=>d(j.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:Kt.map(j=>e.jsx("button",{type:"button",onClick:()=>c(j),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${r===j?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:j},j))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[e.jsxs("button",{type:"button",onClick:C,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(fe,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]}),D.map(j=>e.jsx(Td,{skill:j,onSelect:j.mine?void 0:()=>S(j)},j.id))]})]},"grid"):i==="create"?e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>o("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Dt,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:h,onChange:j=>x(j.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:g,onChange:j=>f(j.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:u,onChange:j=>b(j.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:y,onChange:j=>w(j.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:Kt.filter(j=>j!=="All").map(j=>e.jsx("option",{value:j,children:j},j))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:L,disabled:!h.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(fe,{className:"size-3.5"}),"add"]})})]},"create"):i==="auth"?e.jsx(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(zd,{skillTitle:k==null?void 0:k.title,onBack:()=>o("grid"),onContinue:v})},"auth"):e.jsxs(m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(Ca,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',k==null?void 0:k.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>o("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const ka="v",Md={slots:["a","b","c","d","e","f"],opensAt:2},$d={slots:["f","g"],opensAt:0},Gs="abcdefghijklmnopqrstuvwxyz";function Ed(t){if(typeof window>"u")return t.opensAt;const a=new URLSearchParams(window.location.search).get(ka),n=a?Gs.indexOf(a):-1;return n>=0&&n<t.slots.length?n:t.opensAt}function Id(){return typeof window>"u"?!1:new URLSearchParams(window.location.search).get("signedin")==="1"}function Fd({line:t=Md}={}){const[a,n]=l.useState(()=>Ed(t)),s=t.slots[a],[i]=l.useState(Id),[o,r]=l.useState(i?"chat":"landing"),[c,p]=l.useState(),[d,h]=l.useState(),[x,g]=l.useState(),[f,u]=l.useState(!1),[b,y]=l.useState([]),[w,k]=l.useState(!1),[N,C]=l.useState("chat"),[S,v]=l.useState(),[L,W]=l.useState(!1);l.useEffect(()=>{W(N==="agents")},[N]);const[D,j]=l.useState(ao);function $(T){n(T);const q=new URL(window.location.href);T===t.opensAt?q.searchParams.delete(ka):q.searchParams.set(ka,Gs[T]),window.history.replaceState(null,"",q),window.scrollTo({top:0})}function E(T){j(q=>[T,...q])}function A(T){p(T),h(void 0),g(void 0),u(!0),r("chat")}const F=T=>T.startsWith("agent-")||T.startsWith("run-");function B(T){C(F(T.id)?"agents":"chat"),p(void 0),h(T.question),g(T),u(!0),r("chat")}function _(){r("landing")}function Q(){r("connectors"),window.scrollTo({top:0})}function U(){r("for-traders"),window.scrollTo({top:0})}function Z(){r("pricing"),window.scrollTo({top:0})}function H(){r("signup")}function z(){r("signup")}const Y=typeof window<"u"&&new URLSearchParams(window.location.search).get("agents")==="empty";return e.jsxs(Ac,{empty:Y,children:[o==="landing"&&e.jsxs(e.Fragment,{children:[s==="f"||s==="g"?(()=>{const T=s==="g"?Wl:zl;return e.jsx(T,{onEnterGuest:A,onStartTask:B,onNavigateConnectors:Q,onNavigatePricing:Z,onLogIn:H,onSignUp:H},s)})():s==="c"||s==="d"||s==="e"?(()=>{const T=s==="e"?el:s==="d"?vr:fr;return e.jsx(T,{onEnterGuest:A,onStartTask:B,onNavigateTraders:U,onNavigateConductorMode:()=>r("conductor-mode"),onOpenMarketplace:()=>k(!0),onNavigatePricing:Z,onLogIn:H,onSignUp:H},s)})():(()=>{const T=s==="b"?Wo:zo;return e.jsx(T,{onEnterGuest:A,onStartTask:B,onNavigateConductorMode:()=>r("conductor-mode"),onOpenMarketplace:()=>k(!0),onLogIn:H,onSignUp:H},s)})(),t.slots.length>1&&e.jsx(Ql,{at:a,count:t.slots.length,onChange:$})]}),o==="for-traders"&&e.jsx(Vl,{onNavigateHome:_,onNavigatePricing:Z,onEnterGuest:A,onLogIn:H,onSignUp:H}),o==="connectors"&&e.jsx(jd,{onNavigateHome:_,onLogIn:H,onSignUp:H}),o==="pricing"&&e.jsx(Kl,{onNavigateHome:_,onLogIn:H,onSignUp:H,onChoosePlan:H}),o==="conductor-mode"&&e.jsx(id,{onNavigateHome:_,onOpenMarketplace:()=>k(!0),onTry:A,onLogIn:H,onSignUp:H}),o==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(Oa,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>f?r("chat"):_(),onContinue:()=>{u(!1),p(void 0),h(void 0),r("chat")}})})}),o==="chat"&&!f&&N!=="chat"&&e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[e.jsx(Ps,{area:N,onSwitchArea:C,collapsed:L,onToggleCollapsed:()=>W(T=>!T),onNewChat:()=>C("chat"),onOpenMarketplace:()=>k(!0)}),N==="agents"?e.jsx(wd,{focusId:S}):e.jsx(vd,{})]}),o==="chat"&&e.jsx("div",{className:!f&&N!=="chat"?"hidden":"contents",children:e.jsx(ad,{area:N,onSwitchArea:C,onBack:_,intents:s==="c"||s==="d"||s==="e"?qt:void 0,onOpenMarketplace:()=>k(!0),onRequestSignup:z,onLogIn:z,initialMessage:c,openingMessage:d,task:x,isGuest:f,skipMeeting:i,onOpenAgent:T=>{v(T),C("agents")},onGuestWork:T=>y(q=>[T,...q]),extraConversations:b,railed:L,onToggleRail:()=>W(T=>!T)})}),e.jsx(Ad,{open:w,onClose:()=>k(!1),skills:D,onAddSkill:E})]})}export{Fd as C,$d as N};
