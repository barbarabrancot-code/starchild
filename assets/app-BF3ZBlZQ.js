import{f as ye,c as qe,r as c,s as Bt,a as Ot,p as fa,v as ya,i as ba,b as wa,d as va,e as ja,n as Dt,g as ka,h as Na,u as Ht,j as za,m as Ve,k as _t,l as be,M as Ca,o as e,q as p,C as T,A as Q,t as Sa,w as Ma}from"./ConductorModeSection-k3ZlSWSj.js";function Gt(t,a){let s;const n=()=>{const{currentTime:r}=a,o=(r===null?0:r.value)/100;s!==o&&t(o),s=o};return ye.preUpdate(n,!0),()=>qe(n)}function La(t,a,s){c.useInsertionEffect(()=>t.on(a,s),[t,a,s])}function Te(t){return typeof window>"u"?!1:t?Bt():Ot()}const Ta=50,lt=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Ia=()=>({time:0,x:lt(),y:lt()}),Ea={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function ct(t,a,s,n){const r=s[a],{length:i,position:o}=Ea[a],l=r.current,d=s.time;r.current=Math.abs(t[`scroll${o}`]),r.scrollLength=t[`scroll${i}`]-t[`client${i}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=fa(0,r.scrollLength,r.current);const h=n-d;r.velocity=h>Ta?0:ya(r.current-l,h)}function Wa(t,a,s){ct(t,"x",a,s),ct(t,"y",a,s),a.time=s}function Fa(t,a){const s={x:0,y:0};let n=t;for(;n&&n!==a;)if(ba(n))s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const r=n.getBoundingClientRect();n=n.parentElement;const i=n.getBoundingClientRect();s.x+=r.left-i.left,s.y+=r.top-i.top}else if(n instanceof SVGGraphicsElement){const{x:r,y:i}=n.getBBox();s.x+=r,s.y+=i;let o=null,l=n.parentNode;for(;!o;)l.tagName==="svg"&&(o=l),l=n.parentNode;n=o}else break;return s}const Ue={start:0,center:.5,end:1};function dt(t,a,s=0){let n=0;if(t in Ue&&(t=Ue[t]),typeof t=="string"){const r=parseFloat(t);t.endsWith("px")?n=r:t.endsWith("%")?t=r/100:t.endsWith("vw")?n=r/100*document.documentElement.clientWidth:t.endsWith("vh")?n=r/100*document.documentElement.clientHeight:t=r}return typeof t=="number"&&(n=a*t),s+n}const Aa=[0,0];function Pa(t,a,s,n){let r=Array.isArray(t)?t:Aa,i=0,o=0;return typeof t=="number"?r=[t,t]:typeof t=="string"&&(t=t.trim(),t.includes(" ")?r=t.split(" "):r=[t,Ue[t]?t:"0"]),i=dt(r[0],s,n),o=dt(r[1],a),i-o}const we={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},$a={x:0,y:0};function Ra(t){return"getBBox"in t&&t.tagName!=="svg"?t.getBBox():{width:t.clientWidth,height:t.clientHeight}}function Ba(t,a,s){const{offset:n=we.All}=s,{target:r=t,axis:i="y"}=s,o=i==="y"?"height":"width",l=r!==t?Fa(r,t):$a,d=r===t?{width:t.scrollWidth,height:t.scrollHeight}:Ra(r),h={width:t.clientWidth,height:t.clientHeight};a[i].offset.length=0;let x=!a[i].interpolate;const g=n.length;for(let u=0;u<g;u++){const f=Pa(n[u],h[o],d[o],l[i]);!x&&f!==a[i].interpolatorOffsets[u]&&(x=!0),a[i].offset[u]=f}x&&(a[i].interpolate=wa(a[i].offset,va(n),{clamp:!1}),a[i].interpolatorOffsets=[...a[i].offset]),a[i].progress=ja(0,1,a[i].interpolate(a[i].current))}function Oa(t,a=t,s){if(s.x.targetOffset=0,s.y.targetOffset=0,a!==t){let n=a;for(;n&&n!==t;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=a===t?a.scrollWidth:a.clientWidth,s.y.targetLength=a===t?a.scrollHeight:a.clientHeight,s.x.containerLength=t.clientWidth,s.y.containerLength=t.clientHeight}function Da(t,a,s,n={}){return{measure:r=>{Oa(t,n.target,s),Wa(t,s,r),(n.offset||n.target)&&Ba(t,s,n)},notify:()=>a(s)}}const se=new WeakMap,pt=new WeakMap,$e=new WeakMap,ht=new WeakMap,je=new WeakMap,xt=t=>t===document.scrollingElement?window:t;function qt(t,{container:a=document.scrollingElement,trackContentSize:s=!1,...n}={}){if(!a)return Dt;let r=$e.get(a);r||(r=new Set,$e.set(a,r));const i=Ia(),o=Da(a,t,i,n);if(r.add(o),!se.has(a)){const d=()=>{for(const u of r)u.measure(Na.timestamp);ye.preUpdate(h)},h=()=>{for(const u of r)u.notify()},x=()=>ye.read(d);se.set(a,x);const g=xt(a);window.addEventListener("resize",x),a!==document.documentElement&&pt.set(a,ka(a,x)),g.addEventListener("scroll",x),x()}if(s&&!je.has(a)){const d=se.get(a),h={width:a.scrollWidth,height:a.scrollHeight};ht.set(a,h);const x=()=>{const u=a.scrollWidth,f=a.scrollHeight;(h.width!==u||h.height!==f)&&(d(),h.width=u,h.height=f)},g=ye.read(x,!0);je.set(a,g)}const l=se.get(a);return ye.read(l,!1,!0),()=>{var g;qe(l);const d=$e.get(a);if(!d||(d.delete(o),d.size))return;const h=se.get(a);se.delete(a),h&&(xt(a).removeEventListener("scroll",h),(g=pt.get(a))==null||g(),window.removeEventListener("resize",h));const x=je.get(a);x&&(qe(x),je.delete(a)),ht.delete(a)}}const Ha=[[we.Enter,"entry"],[we.Exit,"exit"],[we.Any,"cover"],[we.All,"contain"]],mt={start:0,end:1};function _a(t){const a=t.trim().split(/\s+/);if(a.length!==2)return;const s=mt[a[0]],n=mt[a[1]];if(!(s===void 0||n===void 0))return[s,n]}function Ga(t){if(t.length!==2)return;const a=[];for(const s of t)if(Array.isArray(s))a.push(s);else if(typeof s=="string"){const n=_a(s);if(!n)return;a.push(n)}else return;return a}function qa(t,a){const s=Ga(t);if(!s)return!1;for(let n=0;n<2;n++){const r=s[n],i=a[n];if(r[0]!==i[0]||r[1]!==i[1])return!1}return!0}function Ze(t){if(!t)return{rangeStart:"contain 0%",rangeEnd:"contain 100%"};for(const[a,s]of Ha)if(qa(t,a))return{rangeStart:`${s} 0%`,rangeEnd:`${s} 100%`}}const gt=new Map;function ut(t){const a={value:0},s=qt(n=>{a.value=n[t.axis].progress*100},t);return{currentTime:a,cancel:s}}function Vt({source:t,container:a,...s}){const{axis:n}=s;t&&(a=t);let r=gt.get(a);r||(r=new Map,gt.set(a,r));const i=s.target??"self";let o=r.get(i);o||(o={},r.set(i,o));const l=n+(s.offset??[]).join(",");return o[l]||(s.target&&Te(s.target)?Ze(s.offset)?o[l]=new ViewTimeline({subject:s.target,axis:n}):o[l]=ut({container:a,...s}):Te()?o[l]=new ScrollTimeline({source:a,axis:n}):o[l]=ut({container:a,...s})),o[l]}function Va(t,a){const s=Vt(a),n=a.target?Ze(a.offset):void 0,r=a.target?Te(a.target)&&!!n:Te();return t.attachTimeline({timeline:r?s:void 0,...n&&r&&{rangeStart:n.rangeStart,rangeEnd:n.rangeEnd},observe:i=>(i.pause(),Gt(o=>{i.time=i.iterationDuration*o},s))})}function Ua(t){return t&&(t.target||t.offset)}function Ya(t){return t.length===2}function Xa(t,a){return Ya(t)||Ua(a)?qt(s=>{t(s[a.axis].progress,s)},a):Gt(t,Vt(a))}function Ut(t,{axis:a="y",container:s=document.scrollingElement,...n}={}){if(!s)return Dt;const r={axis:a,container:s,...n};return typeof t=="function"?Xa(t,r):Va(t,r)}const Ka=()=>({scrollX:be(0),scrollY:be(0),scrollXProgress:be(0),scrollYProgress:be(0)}),ce=t=>t?!t.current:!1;function ft(t,a,s,n){return{factory:r=>{let i;const o=()=>{if(ce(s)||ce(n)){Ve.read(o);return}i=Ut(r,{...a,axis:t,container:(s==null?void 0:s.current)||void 0,target:(n==null?void 0:n.current)||void 0})};return Ve.read(o),()=>{_t(o),i==null||i()}},times:[0,1],keyframes:[0,1],ease:r=>r,duration:1}}function Za(t,a){return typeof window>"u"?!1:t?Bt()&&!!Ze(a):Ot()}function Qa({container:t,target:a,...s}={}){const n=Ht(Ka);Za(a,s.offset)&&(n.scrollXProgress.accelerate=ft("x",s,t,a),n.scrollYProgress.accelerate=ft("y",s,t,a));const r=c.useRef(null),i=c.useRef(!1),o=c.useCallback(()=>(r.current=Ut((l,{x:d,y:h})=>{n.scrollX.set(d.current),n.scrollXProgress.set(d.progress),n.scrollY.set(h.current),n.scrollYProgress.set(h.progress)},{...s,container:(t==null?void 0:t.current)||void 0,target:(a==null?void 0:a.current)||void 0}),()=>{var l;(l=r.current)==null||l.call(r)}),[t,a,JSON.stringify(s.offset)]);return za(()=>{if(i.current=!1,ce(t)||ce(a)){i.current=!0;return}else return o()},[o]),c.useEffect(()=>{if(!i.current)return;let l;const d=()=>{const h=ce(t),x=ce(a);!h&&!x&&(l=o())};return Ve.read(d),()=>{_t(d),l==null||l()}},[o]),n}function Y(t){const a=Ht(()=>be(t)),{isStatic:s}=c.useContext(Ca);if(s){const[,n]=c.useState(t);c.useEffect(()=>a.on("change",n),[])}return a}function Yt({className:t}){return e.jsxs("div",{className:`relative overflow-hidden rounded-[7px] ${t??"size-6"}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[#1c1c1c]"}),e.jsx("div",{className:"absolute inset-0 bg-[#f84600]",style:{clipPath:"polygon(45% 0%, 100% 0%, 100% 100%, 55% 100%)"}})]})}function Ie({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Ja({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"9",y:"3",width:"6",height:"11",rx:"3",fill:"currentColor"}),e.jsx("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function B({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M12 19V6M6 11l6-6 6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Xt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M6 9l6 6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function es({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}function Fe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M19 12H5M11 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Kt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M9 18l-6-6 6-6M15 6l6 6-6 6",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})}function Qe({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function Zt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 5l9 4.5-9 4.5-9-4.5 9-4.5zM6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function de({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"M5 12.5l4.5 4.5L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}function Qt({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"5",y:"10.5",width:"14",height:"9.5",rx:"2",stroke:"currentColor",strokeWidth:"1.7"}),e.jsx("path",{d:"M8 10.5V8a4 4 0 0 1 8 0v2.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})]})}function Je({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"11",cy:"11",r:"7",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M21 21l-4.3-4.3",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})]})}function et({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M4 16l5.5-5.5 3.5 3.5L20 7M20 7h-4.5M20 7v4.5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}function Jt({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M13 3L5 13.5h5.5L11 21l8-10.5h-5.5L13 3z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})})}function ea({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M16.5 7.5c0-1.66-2.01-3-4.5-3s-4.5 1.34-4.5 3 2.01 2.5 4.5 3 4.5 1.34 4.5 3-2.01 3-4.5 3-4.5-1.34-4.5-3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})})}function ta({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:[e.jsx("rect",{x:"3",y:"7.5",width:"18",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function ts({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M12 3v18M7 21h10M4 7h5M15 7h5M4 7l-2.5 5a2.5 2.5 0 0 0 5 0L4 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}function aa({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-3.5",children:e.jsx("path",{d:"M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h9a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function as({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M12 11v5",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"8",r:"1",fill:"currentColor"})]})}function ss({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h16",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round"})})}function ns({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:e.jsx("path",{d:"M10 4a2 2 0 0 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 0 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 0 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 0 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})})}function rs({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("rect",{x:"4",y:"4",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"13.5",y:"4",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"4",y:"13.5",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("rect",{x:"13.5",y:"13.5",width:"6.5",height:"6.5",rx:"1.6",stroke:"currentColor",strokeWidth:"1.6"})]})}function is({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("path",{d:"M4 9V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M4 9h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M9 19v-5h6v5",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"})]})}function os({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-5",children:[e.jsx("path",{d:"M7 4h10v5a5 5 0 0 1-10 0V4Z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M7 6H5a2 2 0 0 0 2 3M17 6h2a2 2 0 0 1-2 3",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M12 14v4M9 20h6",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]})}function ls({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:t??"size-5",children:[e.jsx("circle",{cx:"6",cy:"12",r:"1.6"}),e.jsx("circle",{cx:"12",cy:"12",r:"1.6"}),e.jsx("circle",{cx:"18",cy:"12",r:"1.6"})]})}function cs({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"3",y:"6",width:"18",height:"13",rx:"2.2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M3 10h18",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("circle",{cx:"16.5",cy:"14.5",r:"1.1",fill:"currentColor"})]})}function ds({className:t}){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:[e.jsx("rect",{x:"3.5",y:"5",width:"17",height:"14",rx:"2.2",stroke:"currentColor",strokeWidth:"1.6"}),e.jsx("path",{d:"M14 5v14",stroke:"currentColor",strokeWidth:"1.6"})]})}function ps({className:t}){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",className:t??"size-4",children:e.jsx("path",{d:"m9 7-4 5 4 5M15 7l4 5-4 5",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"})})}const hs={idle:{scale:[1,1.06,1],opacity:[.75,1,.75],duration:3.4},listening:{scale:[1,1.12,1],opacity:[.85,1,.85],duration:2.2},acknowledging:{scale:[1,.86,1.04,1],opacity:[1,1,1,1],duration:.5},thinking:{scale:[1,1.18,.94,1],opacity:[1,.7,1,1],duration:1.1},settled:{scale:[1,1.03,1],opacity:[.9,1,.9],duration:4.6}};function ve({state:t="idle",depth:a=0,size:s=18}){const n=hs[t],r=10+a*26,i=.1+a*.22;return e.jsxs("span",{className:"relative inline-flex items-center justify-center",style:{width:s*3,height:s*3},children:[e.jsx(p.span,{"aria-hidden":"true",className:"absolute rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,1) 0%, rgba(248,70,0,0) 70%)"},animate:{width:s*(2+a*.9),height:s*(2+a*.9),opacity:i},transition:{duration:.8,ease:[.16,1,.3,1]}}),e.jsx(p.span,{"aria-hidden":"true",className:"relative rounded-full bg-[#f84600]",style:{width:s,height:s,boxShadow:`0 0 ${r}px rgba(248,70,0,.7)`},animate:{scale:n.scale,opacity:n.opacity},transition:{duration:n.duration,repeat:t==="acknowledging"?0:1/0,ease:"easeInOut"}})]})}const yt=.34,bt=.15,ne=860,ke=560,Ne=14;function xs({targetRef:t,image:a}){const s=c.useRef(null),n=c.useRef(null),r=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{const o=t.current,l=s.current;if(!o||!l||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const h=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let x=0,g=0,u=0,f=0,N=0,k=0,C=!1,y=0;const v=()=>{var W,L,$,m;(W=i.current)==null||W.style.setProperty("transform",`translate3d(${u-Ne/2}px, ${f-Ne/2}px, 0)`),(L=r.current)==null||L.style.setProperty("transform",`translate3d(${N-ke/2}px, ${k-ke/2}px, 0)`),($=n.current)==null||$.style.setProperty("--mx",`${N-ne/2}px`),(m=n.current)==null||m.style.setProperty("--my",`${k-ne/2}px`)},b=()=>{u+=(x-u)*yt,f+=(g-f)*yt,N+=(u-N)*bt,k+=(f-k)*bt,v(),y=requestAnimationFrame(b)},I=W=>{const L=o.getBoundingClientRect();if(x=W.clientX-L.left,g=W.clientY-L.top,!C){if(C=!0,u=N=x,f=k=g,v(),h)return;y=requestAnimationFrame(b)}h&&(u=N=x,f=k=g,v())},R=()=>l.classList.add("hs-on"),A=()=>{l.classList.remove("hs-on"),cancelAnimationFrame(y),y=0,C=!1};return o.addEventListener("pointermove",I),o.addEventListener("pointerenter",R),o.addEventListener("pointerleave",A),o.classList.add("hs-host"),()=>{o.removeEventListener("pointermove",I),o.removeEventListener("pointerenter",R),o.removeEventListener("pointerleave",A),o.classList.remove("hs-host"),cancelAnimationFrame(y)}},[t]),e.jsxs("div",{ref:s,className:"hs-root","aria-hidden":"true",children:[e.jsxs("div",{className:"hs-light-layer",children:[e.jsx("div",{ref:n,className:"hs-lit"}),e.jsx("div",{ref:r,className:"hs-glow"})]}),e.jsx("div",{className:"hs-cursor-layer",children:e.jsx("div",{ref:i,className:"hs-dot"})}),e.jsx("style",{children:`
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
          -webkit-mask-size: ${ne}px ${ne}px;
          mask-size: ${ne}px ${ne}px;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mx) var(--my);
          mask-position: var(--mx) var(--my);
        }

        /* ambient warmth around the light, additive so it reads as spill, not paint */
        .hs-glow {
          position: absolute; top: 0; left: 0;
          width: ${ke}px; height: ${ke}px;
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
          width: ${Ne}px; height: ${Ne}px;
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
      `})]})}function sa({onNavigateHome:t,onLogIn:a,onSignUp:s}){return e.jsx("header",{className:"relative z-10 py-6",children:e.jsx(T,{children:e.jsxs("div",{className:"grid grid-cols-[auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center gap-8",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:a,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:s,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})})})}const ms=[{id:"build",label:"Build",icon:Kt,tasks:[{id:"dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"Happy to. What should the dashboard track?"},{id:"idea-to-tool",label:"Turn an idea into a tool",basePrompt:"Turn this idea into a working tool I can actually use.",question:"Tell me the idea — a sentence is enough."}]},{id:"research",label:"Research",icon:Zt,tasks:[{id:"company",label:"Research a company",basePrompt:"Research this company and tell me what actually matters about it.",question:"Which company should I look into?"},{id:"competitors",label:"Compare competitors",basePrompt:"Compare these competitors and show me where they genuinely differ.",question:"Who should I put side by side?"},{id:"topic",label:"Investigate a topic",basePrompt:"Investigate this topic and come back with a real answer, not a pile of links.",question:"What topic do you want me to dig into?"}]},{id:"trade",label:"Trade",icon:et,tasks:[{id:"market",label:"Analyze the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"Sure. What market or asset do you want me to analyze?"},{id:"trading-flow",label:"Automate a trading workflow",basePrompt:"Set up a trading workflow that runs and reports back without me watching it.",question:"What should the workflow watch for?"}]},{id:"automate",label:"Automate",icon:Jt,tasks:[{id:"recurring",label:"Automate a recurring task",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"},{id:"monitor",label:"Monitor something for me",basePrompt:"Keep watch on this and tell me when something worth knowing changes.",question:"What should I keep an eye on?"}]},{id:"monetize",label:"Monetize",icon:ea,badge:"NEW",tasks:[{id:"sell-skill",label:"Sell a skill",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What kind of skill or workflow do you want to turn into something sellable?"},{id:"productize",label:"Turn a workflow into a product",basePrompt:"Turn this workflow into something I can publish and charge for.",question:"Which workflow do you want to productize?"}]}],wt={available:["Conversation","Conductor Mode","Research & tasks","Browse Marketplace"],locked:["Save memory & context","Conversation history","Continue on Desktop","Run tasks 24/7","Automations","Publish & monetize","Integrations","Buy from Marketplace"]},ze=[{id:"work",label:"Work",blurb:"Get through what's actually on your plate — sorted, drafted, or moved forward.",example:"“I'm behind on a launch. What matters today?”",prompt:"I've got a launch Thursday and I'm behind. Help me work out what actually matters today.",steps:["Reading what's already committed this week","Weighing what moves the launch against what can wait","Drafting the two messages you still owe people"],result:{kind:"list",heading:"Today, in order",items:[{text:"Send the delay note to the client",note:"blocks two other people"},{text:"Lock the launch copy",note:"everything downstream waits on this"},{text:"Move the pricing review to Friday",note:"not load-bearing for Thursday"}]},task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",label:"Research",blurb:"A real answer — compared, sourced, and put together rather than handed to you as links.",example:"“Compare these three tools for my team.”",prompt:"Compare the three main project tools for a 12-person team. We care about cost and onboarding.",steps:["Routing to a model with live search","Pulling current pricing and limits from each vendor","Double-checking the numbers before handing them over"],result:{kind:"compare",columns:["Linear","Asana"],rows:[{label:"Cost / 12 seats",a:"$96/mo",b:"$131/mo"},{label:"Time to onboard",a:"~2 days",b:"~1 week"},{label:"Best for",a:"Shipping software",b:"Cross-team ops"}]},task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",label:"Build",blurb:"Turn an idea into something that actually runs, without assembling the parts yourself.",example:"“Make my sales sheet into a dashboard.”",prompt:"Turn our sales sheet into a dashboard I can check every morning.",steps:["Routing to a model tuned for code","Wiring the spreadsheet up as a live source","Running it once to make sure the numbers hold"],result:{kind:"dashboard",tiles:[{label:"Revenue",value:"$48.2k",delta:"+12%"},{label:"Deals won",value:"31",delta:"+4"},{label:"Avg. cycle",value:"18d",delta:"−3d"}],bars:[28,35,31,44,39,52,47,58,54,68,63,84]},task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}}],gs=[{id:"ideas",label:"Ideas",icon:Qe,task:{id:"idea-shape",label:"Shape a rough idea",basePrompt:"Take this half-formed idea and help me shape it into something real.",question:"What's the idea? Rough is fine."}},{id:"decisions",label:"Decisions",icon:ts,task:{id:"decision-weigh",label:"Think through a decision",basePrompt:"Help me think through this decision and get clearer on what matters in it.",question:"What are you weighing up?"}},{id:"projects",label:"Projects",icon:aa,task:{id:"project-resume",label:"Pick a project back up",basePrompt:"Help me pick this project back up and work out the next move.",question:"Which project do you want to get back into?"}},{id:"trade",label:"Trade",icon:et,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",label:"Automate",icon:Jt,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",label:"Monetize",icon:ea,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}],us=["Your priorities","How you like to receive help","Recurring projects","What you're trying to work through"],na={id:"image",models:[{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"poster",title:"THE ODYSSEY",subtitle:"a journey home, twenty years in the making"},stat:{withoutLabel:"One model for everything",withoutTokens:12800,withLabel:"Conductor Mode",withTokens:4600}},ra={id:"design",models:[{name:"ChatGPT",icon:"openai"},{name:"Gemini",icon:"gemini"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"brand",name:"Wanderlight Coffee",tagline:"Slow mornings, strong coffee.",colors:["#6b4a34","#e7bd8f","#2f2a25","#f4511e"]},stat:{withoutLabel:"One model for everything",withoutTokens:15400,withLabel:"Conductor Mode",withTokens:5800}},ia={id:"trading",models:[{name:"Grok",icon:"xai"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"market",rows:[{label:"S&P 500",value:"+0.4%",up:!0},{label:"BTC",value:"-1.2%",up:!1},{label:"10Y Yield",value:"4.28%",up:!0}]},stat:{withoutLabel:"One model for everything",withoutTokens:9600,withLabel:"Conductor Mode",withTokens:3900}},oa={id:"code",models:[{name:"DeepSeek",icon:"deepseek"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"code",language:"python",snippet:`def parse_config(path):
    with open(path) as f:
        return json.loads(f.read())

# fixed: was crashing on a missing file
def parse_config(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.loads(f.read())`},stat:{withoutLabel:"One model for everything",withoutTokens:13200,withLabel:"Conductor Mode",withTokens:4900}},fs={id:"generic",models:[{name:"the right model",icon:"ai-generic"}],steps:[{title:"Choosing the right model",sub:"Matching the task to the best fit."},{title:"Gathering what it needs",sub:"Bringing in the right context and tools."},{title:"Checking the work",sub:"Running a second pass before delivering."},{title:"Delivering",sub:"Putting it all together."}],deliverable:{kind:"none"},stat:{withoutLabel:"Always the top model",withoutTokens:14200,withLabel:"Conductor Mode",withTokens:5100}},ys=[{test:/poster|image|odyssey|artwork|illustration/i,scenario:na},{test:/coffee|brand|logo/i,scenario:ra},{test:/market|trading|trade|stock|crypto/i,scenario:ia},{test:/code|python|debug|sql|traceback|landing page|bug|dashboard/i,scenario:oa}],bs=[{prompt:"Make a poster for the Odyssey movie",scenario:na},{prompt:"Make me a coffee shop brand",scenario:ra},{prompt:"How's the market today?",scenario:ia},{prompt:"Debug this Python traceback",scenario:oa}];function vt(t){const a=ys.find(({test:s})=>s.test(t));return(a==null?void 0:a.scenario)??fs}const Re=["All","Writing","Design","Code","Marketing"],ws=[{id:"resume-rewrite",title:"Resume Rewrite",price:"$4",category:"Writing",blurb:"Turns any resume into something a recruiter actually reads.",provider:"Ana R."},{id:"logo-concepts",title:"Logo Concept Pack",price:"$9",category:"Design",blurb:"Five logo directions from one product description.",provider:"Studio Nine"},{id:"sql-fixer",title:"SQL Query Fixer",price:"$3",category:"Code",blurb:"Feed it a broken query, get back one that runs.",provider:"Kevin M."},{id:"market-brief",title:"Daily Market Brief",price:"$6",category:"Marketing",blurb:"A verified snapshot of the numbers that matter, every morning.",provider:"Data Master"}];function tt({onStartTask:t,align:a="start",intents:s=ms}){const[n,r]=c.useState(null),i=s.find(l=>l.id===n),o=a==="center"?"justify-center":"";return e.jsxs("div",{className:a==="center"?"flex w-full flex-col items-center":void 0,children:[e.jsx("div",{className:`flex flex-wrap gap-2.5 ${o}`,children:s.map(({id:l,label:d,icon:h,badge:x})=>{const g=n===l;return e.jsxs("button",{type:"button",onClick:()=>r(g?null:l),"aria-expanded":g,className:`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] transition-colors ${g?"bg-white text-neutral-900":"bg-white/[0.07] text-white/80 hover:bg-white/[0.13]"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(h,{className:`size-4 ${g?"text-neutral-500":"text-white/55"}`}),d,x&&e.jsx("span",{className:"absolute -top-2 -right-1.5 rounded-full bg-[#f84600] px-1.5 py-[1.5px] text-[8.5px] font-semibold tracking-wide text-white",children:x})]},l)})}),e.jsx(Q,{mode:"wait",children:i&&e.jsx(p.div,{initial:{opacity:0,y:-6,height:0},animate:{opacity:1,y:0,height:"auto"},exit:{opacity:0,y:-6,height:0},transition:{duration:.32,ease:[.16,1,.3,1]},className:"w-full overflow-hidden",children:e.jsx("div",{className:`mt-4 flex max-w-[620px] flex-wrap gap-2.5 ${o} ${a==="center"?"mx-auto":""}`,children:i.tasks.map((l,d)=>e.jsxs(p.button,{type:"button",onClick:()=>t(l),initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.05+d*.05,ease:[.16,1,.3,1]},className:"group flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left text-[13.5px] text-white/90 transition-colors hover:border-[#f84600]/60 hover:bg-white/[0.06]",style:{fontFamily:"var(--font-google-sans)"},children:[l.label,e.jsx(B,{className:"size-3.5 rotate-45 text-white/35 transition-colors group-hover:text-[#f84600]"})]},l.id))})},i.id)})]})}const vs="./images/monolito.png";function la({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}){const o=c.useRef(null);return e.jsxs("section",{ref:o,className:"hero-section relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(xs,{targetRef:o,image:vs}),e.jsx("div",{className:"hero-vignette","aria-hidden":"true"}),e.jsx(sa,{onNavigateHome:()=>{},onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(T,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(js,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function js({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),r=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.45},className:"mb-5 flex items-center gap-2",children:[e.jsx(ve,{state:"idle",size:10}),e.jsx("span",{className:"text-[12px] font-medium tracking-[0.16em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"An AI that gets to know you"})]}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild understands your context — and helps you get things done."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/72",style:{fontFamily:"var(--font-google-sans)"},children:"You don't need the perfect question. Start anywhere — no account needed."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-8 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:r,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(B,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(tt,{onStartTask:a})})]})}const ks="./images/empresas.svg",Ns=6;function ca(){return e.jsxs("section",{className:"uw-section bg-[#0a0a0a] py-20 md:py-24",children:[e.jsx(T,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-center text-[13px] tracking-[0.16em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Trusted by people at"})})}),e.jsx("div",{className:"uw-viewport mt-10","aria-hidden":"true",children:e.jsx("div",{className:"uw-track",children:Array.from({length:Ns},(t,a)=>e.jsx("img",{src:ks,alt:"",className:"uw-strip"},a))})}),e.jsx("style",{children:`
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
      `})]})}const jt="(min-width: 1024px) and (min-height: 560px)",kt="(prefers-reduced-motion: reduce)";function da(){const t=()=>typeof window<"u"&&window.matchMedia(jt).matches&&!window.matchMedia(kt).matches,[a,s]=c.useState(t);return c.useEffect(()=>{const n=window.matchMedia(jt),r=window.matchMedia(kt),i=()=>s(n.matches&&!r.matches);return i(),n.addEventListener("change",i),r.addEventListener("change",i),()=>{n.removeEventListener("change",i),r.removeEventListener("change",i)}},[]),a}function pa(t,a,s){const n=c.useRef(s);n.current=s,c.useEffect(()=>{if(!a)return;const r=()=>{const i=t.current;if(!i)return;const o=i.offsetHeight-window.innerHeight;if(o<=0)return;const l=-i.getBoundingClientRect().top/o;n.current(l<0?0:l>1?1:l)};return r(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),()=>{window.removeEventListener("scroll",r),window.removeEventListener("resize",r)}},[a,t])}function at(t){const a=c.useRef(null),s=da(),[n,r]=c.useState(0);return pa(a,s,o=>{r(Math.max(0,Math.min(t-1,Math.floor(o*t))))}),{trackRef:a,pinned:s,index:n,selectStep:o=>{const l=a.current;if(!s||!l){r(o);return}const d=l.getBoundingClientRect().top+window.scrollY,h=l.offsetHeight-window.innerHeight;window.scrollTo({top:d+h*((o+.5)/t),behavior:"smooth"})}}}function Ae({trackRef:t,pinned:a,screens:s,children:n}){const r=c.useRef(null),[i,o]=c.useState(1);return c.useLayoutEffect(()=>{if(!a){o(1);return}const l=r.current;if(!l)return;const d=()=>{const x=l.offsetHeight,g=window.innerHeight-32;o(x>g?Math.max(.62,g/x):1)};d();const h=new ResizeObserver(d);return h.observe(l),window.addEventListener("resize",d),()=>{h.disconnect(),window.removeEventListener("resize",d)}},[a]),e.jsxs("div",{ref:t,className:`sp-track${a?" sp-track--pinned":""}`,style:{"--sp-screens":String(s)},children:[e.jsx("div",{className:"sp-pane",children:e.jsx("div",{ref:r,className:"sp-fit",style:i===1?void 0:{transform:`scale(${i})`},children:n})}),e.jsx("style",{children:`
        .sp-track { position: relative; }
        /* one screen to read it in, plus a stretch of scroll per example */
        .sp-track--pinned { height: calc(100vh + var(--sp-screens) * 85vh); }
        .sp-track--pinned .sp-pane {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
        }
        .sp-fit { transform-origin: center center; }
      `})]})}function zs({useCase:t}){return e.jsxs("div",{className:"pw-frame",children:[e.jsxs("div",{className:"pw-chrome",children:[e.jsx(Yt,{className:"size-[15px]"}),e.jsx("span",{className:"pw-chrome-title",children:"Conductor Mode"})]}),e.jsxs("div",{className:"pw-body",children:[e.jsx("div",{className:"pw-prompt-row",children:e.jsx("p",{className:"pw-prompt",children:t.prompt})}),e.jsx("ol",{className:"pw-steps",children:t.steps.map((a,s)=>e.jsxs(p.li,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},className:`pw-step${s===t.steps.length-1?" pw-step--done":""}`,children:[e.jsx("span",{className:"pw-dot","aria-hidden":"true"}),a]},a))}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,delay:.38,ease:[.16,1,.3,1]},children:e.jsx(Cs,{result:t.result})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Cs({result:t}){return t.kind==="list"?e.jsxs("div",{className:"pw-result",children:[e.jsx("p",{className:"pw-result-heading",children:t.heading}),e.jsx("ul",{className:"pw-list",children:t.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"pw-list-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"pw-list-text",children:a.text})," ",e.jsxs("span",{className:"pw-list-note",children:["— ",a.note]})]})]},a.text))})]}):t.kind==="compare"?e.jsx("div",{className:"pw-result",children:e.jsxs("table",{className:"pw-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col"}),e.jsx("th",{scope:"col",children:t.columns[0]}),e.jsx("th",{scope:"col",children:t.columns[1]})]})}),e.jsx("tbody",{children:t.rows.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.label}),e.jsx("td",{children:a.a}),e.jsx("td",{children:a.b})]},a.label))})]})}):e.jsxs("div",{className:"pw-result",children:[e.jsx("div",{className:"pw-tiles",children:t.tiles.map(a=>e.jsxs("div",{className:"pw-tile",children:[e.jsx("p",{className:"pw-tile-label",children:a.label}),e.jsxs("p",{className:"pw-tile-value",children:[a.value," ",a.delta&&e.jsx("span",{className:"pw-tile-delta",children:a.delta})]})]},a.label))}),e.jsx("div",{className:"pw-bars","aria-hidden":"true",children:t.bars.map((a,s)=>e.jsx(p.span,{className:"pw-bar",initial:{height:0},animate:{height:`${a}%`},transition:{duration:.5,delay:.45+s*.05,ease:[.16,1,.3,1]}},s))})]})}function Ss({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:r}=at(ze.length),i=ze[n];return e.jsxs("section",{className:"uc-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ae,{trackRef:a,pinned:s,screens:ze.length,children:e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[ze.map((o,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>r(l),"aria-pressed":d,className:`uc-tab${d?" uc-tab--active":""}`,children:[e.jsx("span",{className:"uc-tab-title",children:o.label}),e.jsx(Q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"uc-tab-blurb",children:o.blurb}),e.jsx("span",{className:"uc-tab-example",children:o.example})]})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"uc-try",children:[i.task.label,e.jsx(B,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(zs,{useCase:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Ms({onStartTask:t}){return e.jsxs("section",{className:"mw-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("p",{className:"col-span-12 text-[12px] tracking-[0.16em] text-white/30 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"And plenty else"})}),e.jsx("div",{className:"mt-6 grid grid-cols-12 gap-6",children:gs.map(({id:a,label:s,icon:n,task:r},i)=>e.jsxs(p.button,{type:"button",onClick:()=>t(r),initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.35},transition:{duration:.45,delay:i%3*.05,ease:[.16,1,.3,1]},className:"mw-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsxs("span",{className:"mw-head",children:[e.jsx(n,{className:"mw-icon size-4"}),e.jsx("span",{className:"mw-label",children:s}),e.jsx(B,{className:"mw-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"mw-task",children:r.label})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const Ls=[{file:"OpenAI.svg",w:148,h:40},{file:"Claude.svg",w:160,h:34},{file:"Frame374.svg",w:151,h:34},{file:"Frame375.svg",w:137,h:40},{file:"Deepseek.svg",w:206,h:33},{file:"Kimi.svg",w:118,h:40}],Nt=16,Ts=[{title:"No model-hopping",desc:"Stop guessing which AI to use."},{title:"Better context",desc:"The model gets the information it actually needs."},{title:"Less waste",desc:"Starchild can avoid sending unnecessary context to expensive models."},{title:"Always adapting",desc:"As models change, you don't have to rebuild your workflow around them."}],zt=.06,Is=.46,Ct=.56,Es=.92,St=t=>t<0?0:t>1?1:t,re=(t,a,s)=>t+(a-t)*s,Mt=t=>t<.5?2*t*t:1-(-2*t+2)**2/2;function Ce(t,a,s){const n=t.getBoundingClientRect();return{left:(n.left-a.left)/s,top:(n.top-a.top)/s,width:n.width/s,height:n.height/s}}function Lt(t,a){return{x:Math.max(t.left,Math.min(a.x,t.left+t.width)),y:Math.max(t.top,Math.min(a.y,t.top+t.height))}}function Tt({label:t,innerRef:a,children:s}){return e.jsxs("div",{className:"ky-panel",ref:a,children:[e.jsx("p",{className:"ky-panel-label",children:t}),s]})}function st({showBenefits:t=!0}={}){const a=c.useRef(null),s=c.useRef(null),n=c.useRef(null),r=c.useRef(null),i=c.useRef(null),o=c.useRef(null),l=c.useRef(null),d=Y(0),h=Y(0),x=Y(0),g=Y(0),u=Y(0),f=Y(0),N=Y(0),k=Y(0),C=Y(0),[y,v]=c.useState(!1),[b,I]=c.useState(!1),[R,A]=c.useState(!1),W=da(),{scrollYProgress:L}=Qa({target:s,offset:["start 0.85","end 0.55"]});c.useEffect(()=>{const j=window.matchMedia("(prefers-reduced-motion: reduce)"),S=()=>A(j.matches);S(),j.addEventListener("change",S);const P=()=>{const F=s.current,H=n.current,_=r.current,U=i.current,J=o.current;if(!F||!H||!_||!U||!J)return;const V=F.getBoundingClientRect(),G=F.offsetWidth?V.width/F.offsetWidth:1,z=Ce(U,V,G),E={x:z.left+z.width/2,y:z.top+z.height/2},w=Ce(J,V,G);l.current={conductor:E,you:Lt(Ce(H,V,G),E),models:Lt(Ce(_,V,G),E),result:{x:w.left+w.width/2,y:w.top}}};return P(),window.addEventListener("resize",P),()=>{window.removeEventListener("resize",P),j.removeEventListener("change",S)}},[]),c.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[W]);const $=j=>{const S=l.current;if(!S)return;const P=Mt(St((j-zt)/(Is-zt))),F=Mt(St((j-Ct)/(Es-Ct)));d.set(re(S.you.x,S.conductor.x,P)),h.set(re(S.you.y,S.conductor.y,P)),g.set(re(S.models.x,S.conductor.x,P)),u.set(re(S.models.y,S.conductor.y,P));const H=P<=0?0:P>.94?(1-P)/.06:Math.min(1,P/.08);x.set(H),f.set(H),N.set(re(S.conductor.x,S.result.x,F)),k.set(re(S.conductor.y,S.result.y,F)),C.set(F<=0?0:F>.93?(1-F)/.07:Math.min(1,F/.08)),v(P>.9),I(F>.88)};pa(a,W,$),La(L,"change",j=>{W||$(j)});const m=R||b;return e.jsxs("section",{className:"ky-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsx(Ae,{trackRef:a,pinned:W,screens:2,children:e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[52ch] text-center",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:"It knows you. It knows AI."}),e.jsx("p",{className:"mt-5 text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Starchild learns how you work and chooses the right AI for each task."})]})}),e.jsx("div",{className:"mt-16 grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12",children:e.jsxs("div",{className:"ky-stage",ref:s,children:[e.jsxs("div",{className:"ky-flow",children:[e.jsx(Tt,{label:"You",innerRef:n,children:e.jsx("ul",{className:"ky-list",children:us.map(j=>e.jsx("li",{children:j},j))})}),e.jsxs("div",{className:`ky-conductor${y?" ky-conductor--hit":""}`,ref:i,children:[e.jsx(ve,{state:y?"thinking":"idle",depth:y?1:.35,size:16}),e.jsx("p",{className:"ky-conductor-label",children:"Conductor"})]}),e.jsx(Tt,{label:"Available models",innerRef:r,children:e.jsx("div",{className:"ky-logos",children:Ls.map(j=>e.jsx("img",{src:`./images/carousel/${j.file}`,alt:"",style:{height:Nt,width:Nt*(j.w/j.h)}},j.file))})})]}),e.jsxs("div",{className:`ky-result${m?" ky-result--lit":""}`,ref:o,children:[e.jsx("p",{className:"ky-result-label",children:"Result"}),e.jsx("p",{className:"ky-result-text",children:"One answer, routed to the right model."})]}),!R&&e.jsxs("div",{className:"ky-dots","aria-hidden":"true",children:[e.jsx(p.span,{className:"ky-dot",style:{x:d,y:h,opacity:x}}),e.jsx(p.span,{className:"ky-dot",style:{x:g,y:u,opacity:f}}),e.jsx(p.span,{className:"ky-dot ky-dot--result",style:{x:N,y:k,opacity:C}})]})]})})})]})}),t&&e.jsx(T,{children:e.jsx("div",{className:"mt-20 grid grid-cols-12 gap-6",children:Ts.map((j,S)=>e.jsx(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:S*.06,ease:[.16,1,.3,1]},className:"col-span-12 sm:col-span-6 lg:col-span-3",children:e.jsxs("div",{className:"ky-benefit",children:[e.jsx("h3",{className:"ky-benefit-title",children:j.title}),e.jsx("p",{className:"ky-benefit-desc",children:j.desc})]})},j.title))})}),e.jsx("style",{children:`
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
      `})]})}const Ws="The best AI for the job changes constantly. Starchild keeps up.";function Pe({onStartFree:t,headline:a=Ws}){return e.jsx("section",{className:"bg-[#0a0a0a] py-28 text-center md:py-36",children:e.jsx(T,{children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 flex flex-col items-center gap-8",children:[e.jsx(p.h2,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,ease:[.16,1,.3,1]},className:"max-w-[26ch] text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[44px]",style:{fontFamily:"var(--font-google-sans)"},children:a}),e.jsx(p.button,{type:"button",onClick:t,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.55,delay:.1,ease:[.16,1,.3,1]},className:"rounded-full bg-[#f84600] px-8 py-4 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Meet Starchild"}),e.jsxs(p.button,{type:"button",onClick:()=>{},initial:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.5,delay:.18,ease:[.16,1,.3,1]},className:"group -mt-3 flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["See pricing",e.jsx(B,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})]})})})})}function Fs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}){const o=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(la,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}),e.jsx(ca,{}),e.jsx(Ss,{onStartTask:a}),e.jsx(Ms,{onStartTask:a}),e.jsx("div",{ref:o,children:e.jsx(st,{})}),e.jsx(Pe,{onStartFree:l})]})}const xe="0 0 160 96",ae="rgba(255,255,255,.26)",Ee="rgba(255,255,255,.12)";function As({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:Ee,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":ae,strokeWidth:n===0?1.6:1},s.y))]})}function Ps({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--research ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:ae,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function $s({className:t=""}){return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--build ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:Ee,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:ae,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:Ee,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function Rs({className:t=""}){return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--trade ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"80",cy:"48",r:"34",stroke:Ee,strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"16",stroke:ae,strokeWidth:"1"}),e.jsx("g",{className:"cg-orbit",children:e.jsx("circle",{cx:"114",cy:"48",r:"3.2",fill:"var(--color-primary)"})}),e.jsx("g",{className:"cg-orbit cg-orbit--slow",children:e.jsx("circle",{cx:"64",cy:"48",r:"2.2",fill:"rgba(255,255,255,.5)"})}),e.jsx("path",{d:"M80 48 L114 48",stroke:"rgba(248,70,0,.35)",strokeWidth:"1"}),e.jsx("circle",{cx:"80",cy:"48",r:"1.8",fill:"#fff"})]})}function Bs({className:t=""}){const a="M10 48 C 28 16, 46 16, 64 48 S 100 80, 118 48 S 140 20, 150 34";return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--automate ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:a,stroke:ae,strokeWidth:"1"}),e.jsx("path",{className:"cg-travel",d:a,stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("circle",{cx:"10",cy:"48",r:"2",fill:"rgba(255,255,255,.45)"}),e.jsx("circle",{cx:"150",cy:"34",r:"2",fill:"rgba(255,255,255,.45)"})]})}function Os({className:t=""}){const a=[18,36,60,78];return e.jsxs("svg",{viewBox:xe,className:`cg-svg cg-svg--monetize ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"18",y:"38",width:"20",height:"20",rx:"3",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("line",{x1:"38",y1:"48",x2:"70",y2:"48",stroke:ae,strokeWidth:"1"}),a.map((s,n)=>e.jsxs("g",{children:[e.jsx("path",{className:"cg-branch",style:{"--i":n},d:`M70 48 C 96 48, 100 ${s}, 126 ${s}`,stroke:ae,strokeWidth:"1"}),e.jsx("circle",{className:"cg-dest",style:{"--i":n},cx:"132",cy:s,r:"2.6",fill:n===1?"var(--color-primary)":"rgba(255,255,255,.4)"})]},s)),e.jsx("circle",{cx:"70",cy:"48",r:"2.4",fill:"rgba(255,255,255,.55)"})]})}const Ds=[{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's actually on your plate — sorted, drafted, or moved forward.",art:As,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"research",tag:"Answers",title:"Research",copy:"Find, compare, and make sense of information without stitching everything together yourself.",art:Ps,task:{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I compare?"}},{id:"build",tag:"Make",title:"Build",copy:"Turn an idea into something functional — a tool, dashboard, workflow, or project.",art:$s,task:{id:"build-dashboard",label:"Build me a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}},{id:"trade",tag:"Markets",title:"Trade",copy:"Understand what the market is doing and act on what matters.",art:Rs,task:{id:"trade-market",label:"Read the market",basePrompt:"Analyze the current market and help me understand the most important movements and what may be driving them.",question:"What market or asset should I look at?"}},{id:"automate",tag:"Runs itself",title:"Automate",copy:"Take repetitive work off your plate and let Starchild keep it moving.",art:Bs,task:{id:"automate-recurring",label:"Take a task off my plate",basePrompt:"Take this recurring task off my plate and run it on a schedule.",question:"What's the task that keeps coming back?"}},{id:"monetize",tag:"Distribute",title:"Monetize",copy:"Turn what you build into something other people can use — and pay for.",art:Os,task:{id:"monetize-skill",label:"Turn this into a product",basePrompt:"Package this into a skill other people can buy and put to work.",question:"What do you want to turn into something sellable?"}}];function Hs({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:Ds.map(({id:a,tag:s,title:n,copy:r,art:i,task:o},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(B,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:r})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const Se=[{id:"monitor",label:"Monitor something",blurb:"Keep an eye on a market, competitor, topic, or anything else that changes.",prompt:"Watch these competitors and tell me when one launches a new feature.",panel:{kind:"monitor",agentName:"Competitor watch",cadence:"Checking every hour",sources:["Linear","Notion","Figma","Changelogs & blogs"],checks:[{time:"09:00",text:"Checked 4 sources — nothing new"},{time:"11:00",text:"Checked 4 sources — nothing new"},{time:"13:20",text:"Change detected on Linear",hit:!0}],alert:{heading:"Worth your attention",title:"Linear shipped a new planning view",detail:"Announced 20 minutes ago. Closest thing yet to the roadmap feature you shipped in March."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Handle a recurring task",blurb:"Let Starchild run the same workflow for you whenever it needs to happen.",prompt:"Every Monday, review my updates and tell me what needs my attention.",panel:{kind:"recurring",agentName:"Monday review",uses:["Gmail","Slack","Calendar","Notion"],runs:"Every Monday at 9:00 AM",outputName:"Weekly priorities summary",output:{heading:"This Monday",items:[{text:"Client contract is unsigned",note:"renewal date is Friday"},{text:"Two invoices past due",note:"one is 21 days out"},{text:"Hiring loop is stalled",note:"waiting on your feedback"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Build a specialized agent",blurb:"Give it a job, context, and the tools it needs.",prompt:"Create an agent that tracks our competitors, remembers what we care about, and sends meaningful updates.",panel:{kind:"config",agentName:"Market analyst",fields:[{label:"Goal",value:"Track meaningful competitor changes"},{label:"Context",value:"What our team cares about"},{label:"When it runs",value:"Continuously"}],tools:["Web","GitHub","Telegram","API"],status:"Active · first summary tomorrow at 08:00"},task:{id:"agent-specialist",label:"Build me an agent",basePrompt:"Help me create an agent with a clear job, the context it needs, and the right tools.",question:"What job should this agent have?"}}];function _s({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx(Yt,{className:"size-[15px]"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(Gs,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function Be({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function Gs({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(Be,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(de,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(Be,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(Be,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function qs({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:r}=at(Se.length),i=Se[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ae,{trackRef:a,pinned:s,screens:Se.length,children:e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once. Let it keep moving."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn recurring work into something Starchild can handle for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Works across the tools and sources you already use."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Se.map((o,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>r(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:o.label}),e.jsx(Q,{initial:!1,children:d&&e.jsxs(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:[e.jsx("span",{className:"ag-tab-blurb",children:o.blurb}),e.jsxs("span",{className:"ag-tab-example",children:["“",o.prompt,"”"]})]})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(B,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(_s,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function Vs({onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}){const o=c.useRef(null),l=()=>t();return e.jsxs("div",{children:[e.jsx(la,{onEnterGuest:t,onStartTask:a,onNavigateConductorMode:s,onOpenMarketplace:n,onLogIn:r,onSignUp:i}),e.jsx(ca,{}),e.jsx(Hs,{onStartTask:a}),e.jsx(qs,{onStartTask:a}),e.jsx("div",{ref:o,children:e.jsx(st,{})}),e.jsx(Pe,{onStartFree:l})]})}const Us=[{id:"traders",label:"For Traders",route:"traders"},{id:"developers",label:"For Developers"},{id:"creators",label:"For Creators"},{id:"researchers",label:"For Researchers"}];function ha({onNavigateHome:t,onNavigateTraders:a,onLogIn:s,onSignUp:n}){const[r,i]=c.useState(!1),o=c.useRef(null);return c.useEffect(()=>{if(!r)return;const l=h=>{var x;(x=o.current)!=null&&x.contains(h.target)||i(!1)},d=h=>{h.key==="Escape"&&i(!1)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",d)}},[r]),e.jsxs("header",{className:"relative z-20 py-6",children:[e.jsx(T,{children:e.jsxs("div",{className:"grid grid-cols-[1fr_auto_1fr] items-center gap-4",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("button",{type:"button",onClick:t,className:"flex items-center",children:e.jsx("img",{src:"./images/starchild-logo.svg",alt:"Starchild",width:172,height:32,className:"h-8 w-auto"})})}),e.jsxs("nav",{className:"sh-nav","aria-label":"Main",children:[e.jsxs("div",{className:"sh-menu",ref:o,children:[e.jsxs("button",{type:"button",onClick:()=>i(l=>!l),"aria-expanded":r,"aria-haspopup":"true",className:`sh-trigger${r?" sh-trigger--open":""}`,children:["Starchild for",e.jsx(Xt,{className:"sh-chevron size-3.5"})]}),r&&e.jsx("div",{className:"sh-panel",role:"menu",children:Us.map(({id:l,label:d,route:h})=>e.jsx("button",{type:"button",role:"menuitem",onClick:()=>{i(!1),h==="traders"&&a()},className:"sh-item",children:d},l))})]}),e.jsx("button",{type:"button",onClick:()=>{},className:"sh-trigger",children:"Pricing"}),e.jsxs("button",{type:"button",onClick:()=>{},className:"sh-trigger sh-trigger--badged",children:["Marketplace",e.jsx("span",{className:"sh-badge",children:"New"})]})]}),e.jsxs("div",{className:"flex items-center justify-end gap-2 sm:gap-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-1 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:n,className:"rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]})}),e.jsx("style",{children:`
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
      `})]})}const Z=11,It=.55,Ys=1.15,Oe=30,De=300,Xs=26,We=26,ie=[150,168,196],oe=[255,255,255],He=[255,146,62],Et=.34,Wt=.15,Ks=.08,Me=14;function Zs(){return Array.from({length:We},(t,a)=>{const s=a/(We-1),n=Math.max(0,s-.72)/.28,r=Math.round(ie[0]+(oe[0]-ie[0])*s+(He[0]-oe[0])*n*.55),i=Math.round(ie[1]+(oe[1]-ie[1])*s+(He[1]-oe[1])*n*.55),o=Math.round(ie[2]+(oe[2]-ie[2])*s+(He[2]-oe[2])*n*.55),l=.05+.85*Math.pow(s,1.6);return{color:`rgba(${r},${i},${o},${l.toFixed(3)})`,size:Ys+1.5*Math.pow(s,2),points:[]}})}function Qs({targetRef:t}){const a=c.useRef(null),s=c.useRef(null);return c.useEffect(()=>{const n=t.current,r=a.current,i=r==null?void 0:r.getContext("2d");if(!n||!r||!i)return;const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=window.matchMedia("(hover: hover) and (pointer: fine)").matches,d=Zs();l&&n.classList.add("hero-c--fine");let h=0,x=0,g=[],u=-9999,f=-9999,N=-9999,k=-9999,C=-9999,y=-9999,v=0,b=0,I=!1,R=0,A=!1;const W=performance.now(),L=(z,E,w)=>Math.sin(z*.0062+E*.0038+w*.19)+Math.sin(z*.0029-E*.0071-w*.14)*.85+Math.sin((z+E)*.0042+w*.09)*.6,$=z=>{const E=(z-W)/1e3;if(i.clearRect(0,0,h,x),v>.01){const w=i.createRadialGradient(C,y,0,C,y,De*1.6);w.addColorStop(0,`rgba(248,70,0,${(.11*v).toFixed(3)})`),w.addColorStop(.45,`rgba(248,70,0,${(.04*v).toFixed(3)})`),w.addColorStop(1,"rgba(248,70,0,0)"),i.fillStyle=w,i.fillRect(0,0,h,x)}for(const w of d)w.points.length=0;for(const w of g){const D=L(w.x,w.y,E);let O=w.x+D*5*w.depth,ee=w.y+D*Oe*w.depth,K=.06+.62*Math.pow(Math.max(0,Math.cos(D*1.9+w.seed*.35)),7)*w.depth+.05*w.seed;if(v>.01){const q=O-C,te=ee-y,ue=Math.hypot(q,te);if(ue<De){const rt=1-ue/De,it=rt*rt*v;if(K+=it*1.1,ue>.001){const ot=it*Xs;O+=q/ue*ot,ee+=te/ue*ot}}}const M=Math.min(We-1,Math.max(0,Math.round(K*(We-1))));d[M].points.push(O,ee)}for(const w of d){if(w.points.length===0)continue;i.fillStyle=w.color;const D=w.size/2;for(let O=0;O<w.points.length;O+=2)i.fillRect(w.points[O]-D,w.points[O+1]-D,w.size,w.size)}},m=()=>{const z=s.current;!z||!l||(z.style.transform=`translate3d(${N-Me/2}px, ${k-Me/2}px, 0)`,z.style.opacity=`${v}`)},j=()=>{const z=Math.ceil(h/Z)+2,E=Math.ceil((x+Oe*2)/Z)+2,w=[];for(let D=0;D<E;D++)for(let O=0;O<z;O++){const ee=Math.random(),ge=O*Z-Z+(Math.random()-.5)*Z*2*It,K=D*Z-Z-Oe+(Math.random()-.5)*Z*2*It,M=.35+.65*Math.min(1,Math.max(0,K/Math.max(1,x)));w.push({x:ge,y:K,depth:M,seed:ee})}g=w},S=()=>{const z=n.getBoundingClientRect(),E=Math.min(window.devicePixelRatio||1,1.75);h=Math.max(1,Math.round(z.width)),x=Math.max(1,Math.round(z.height)),r.width=Math.round(h*E),r.height=Math.round(x*E),r.style.width=`${h}px`,r.style.height=`${x}px`,i.setTransform(E,0,0,E,0,0),j(),$(performance.now())},P=z=>{N+=(u-N)*Et,k+=(f-k)*Et,C+=(N-C)*Wt,y+=(k-y)*Wt,v+=(b-v)*Ks,$(z),m(),R=requestAnimationFrame(P)},F=()=>{A||o||(A=!0,R=requestAnimationFrame(P))},H=()=>{A=!1,cancelAnimationFrame(R)},_=z=>{const E=n.getBoundingClientRect();u=z.clientX-E.left,f=z.clientY-E.top,I||(I=!0,N=C=u,k=y=f),b=1,o&&(N=C=u,k=y=f,v=1,$(performance.now()),m())},U=()=>{b=0,I=!1,o&&(v=0,$(performance.now()),m())},J=new IntersectionObserver(([z])=>z.isIntersecting?F():H(),{threshold:0});J.observe(n);const V=()=>document.hidden?H():F(),G=new ResizeObserver(S);return G.observe(n),n.addEventListener("pointermove",_),n.addEventListener("pointerleave",U),document.addEventListener("visibilitychange",V),S(),()=>{J.disconnect(),G.disconnect(),n.removeEventListener("pointermove",_),n.removeEventListener("pointerleave",U),document.removeEventListener("visibilitychange",V),n.classList.remove("hero-c--fine"),H()}},[t]),e.jsxs(e.Fragment,{children:[e.jsx("canvas",{ref:a,className:"absolute inset-0 z-0 h-full w-full","aria-hidden":"true"}),e.jsx("div",{className:"pm-cursor-layer","aria-hidden":"true",children:e.jsx("span",{ref:s,className:"pm-dot"})}),e.jsx("style",{children:`
        .pm-cursor-layer { position: absolute; inset: 0; z-index: 40; pointer-events: none; }
        .pm-dot {
          position: absolute; top: 0; left: 0;
          width: ${Me}px; height: ${Me}px; border-radius: 999px;
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
      `})]})}const xa=[{id:"talk",label:"Talk",icon:Qe,tasks:[{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"},{id:"talk-decision",label:"Help me decide",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}]},{id:"research",label:"Research",icon:Zt,tasks:[{id:"research-topic",label:"Look into something",basePrompt:"Look into this properly and come back with a real answer, not a pile of links.",question:"What should I dig into?"},{id:"research-compare",label:"Compare my options",basePrompt:"Compare these options properly and show me where they genuinely differ.",question:"What should I put side by side?"}]},{id:"build",label:"Build",icon:Kt,tasks:[{id:"build-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."},{id:"build-dashboard",label:"Create a dashboard",basePrompt:"Build a dashboard that tracks what matters and keeps itself up to date.",question:"What should the dashboard track?"}]},{id:"work",label:"Work",icon:ta,tasks:[{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"},{id:"work-draft",label:"Draft something I owe someone",basePrompt:"Help me write the thing I've been putting off sending.",question:"Who's it for, and what does it need to say?"}]},{id:"organize",label:"Organize",icon:aa,tasks:[{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"},{id:"organize-project",label:"Bring order to a project",basePrompt:"Take this project and give it a structure I can actually follow.",question:"What's the project?"}]}];function Js({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onLogIn:n,onSignUp:r}){const i=c.useRef(null);return e.jsxs("section",{ref:i,className:"hero-c relative flex min-h-screen flex-col overflow-hidden",children:[e.jsx(Qs,{targetRef:i}),e.jsx("div",{className:"hero-c-vignette","aria-hidden":"true"}),e.jsx(ha,{onNavigateHome:()=>{},onNavigateTraders:s,onLogIn:n,onSignUp:r}),e.jsx("main",{className:"relative z-10 flex flex-1 items-center pb-20",children:e.jsx(T,{className:"w-full",children:e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 lg:col-span-7",children:e.jsx(en,{onEnterGuest:t,onStartTask:a})})})})}),e.jsx("style",{children:`
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
    `})]})}function en({onEnterGuest:t,onStartTask:a}){const[s,n]=c.useState(""),r=()=>t(s.trim()||void 0);return e.jsxs("div",{children:[e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"max-w-[640px] text-[42px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]",style:{fontFamily:"var(--font-google-sans)"},children:"One AI for everything that matters to you."}),e.jsxs(p.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},transition:{duration:.55,delay:.15},className:"mt-10 max-w-[600px] rounded-[22px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors focus-within:border-white/30",children:[e.jsx("input",{value:s,onChange:i=>n(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r()},placeholder:"What's on your mind?",className:"w-full bg-transparent text-[16px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("div",{className:"mt-4 flex items-center justify-end",children:e.jsxs("button",{type:"button",onClick:r,className:"flex items-center gap-2 rounded-full bg-[#f84600] px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:["Meet Starchild",e.jsx(B,{className:"size-3.5 rotate-90"})]})})]}),e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.55,delay:.28},className:"mt-6",children:e.jsx(tt,{onStartTask:a,intents:xa})})]})}const me="0 0 160 96",pe="rgba(255,255,255,.26)",he="rgba(255,255,255,.12)";function tn({className:t=""}){const a=[{y:22,w:62},{y:32,w:44}],s=[{y:56,w:66},{y:66,w:50},{y:76,w:34}];return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--talk ${t}`,fill:"none","aria-hidden":"true",children:[a.map((n,r)=>e.jsx("line",{className:"cg-say",style:{"--i":r,transformOrigin:"left center"},x1:"14",y1:n.y,x2:14+n.w,y2:n.y,stroke:pe,strokeWidth:"1"},n.y)),s.map((n,r)=>e.jsx("line",{className:"cg-say cg-say--reply",style:{"--i":r+2,transformOrigin:"right center"},x1:146-n.w,y1:n.y,x2:"146",y2:n.y,stroke:r===0?"var(--color-primary)":pe,strokeWidth:r===0?1.6:1},n.y)),e.jsx("circle",{cx:"8",cy:"22",r:"2",fill:"rgba(255,255,255,.4)"}),e.jsx("circle",{cx:"152",cy:"56",r:"2.4",fill:"var(--color-primary)"})]})}function an({className:t=""}){const a=[{x:26,ys:[26,48,70]},{x:80,ys:[20,48,76]},{x:134,ys:[32,62]}];return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--think ${t}`,fill:"none","aria-hidden":"true",children:[a[0].ys.map(n=>a[1].ys.map(r=>e.jsx("line",{x1:"26",y1:n,x2:"80",y2:r,stroke:he,strokeWidth:"1"},`${n}-${r}`))),a[1].ys.map(n=>a[2].ys.map(r=>e.jsx("line",{x1:"80",y1:n,x2:"134",y2:r,stroke:he,strokeWidth:"1"},`b${n}-${r}`))),e.jsx("path",{className:"cg-route",d:"M26 48 L80 20 L134 32",stroke:"var(--color-primary)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),a.map(({x:n,ys:r})=>r.map(i=>e.jsx("circle",{cx:n,cy:i,r:"2.2",fill:"rgba(255,255,255,.34)"},`${n}-${i}`))),e.jsx("circle",{cx:"134",cy:"32",r:"3",fill:"var(--color-primary)"})]})}function sn({className:t=""}){const a=[{y:22,x:26,w:58},{y:34,x:12,w:84},{y:46,x:34,w:46},{y:58,x:20,w:72},{y:70,x:44,w:38}];return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--work ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"8",y1:"14",x2:"8",y2:"82",stroke:he,strokeWidth:"1"}),a.map((s,n)=>e.jsx("line",{className:"cg-row",style:{"--dx":`${s.x-12}px`,"--i":n},x1:"12",y1:s.y,x2:12+s.w,y2:s.y,stroke:n===0?"var(--color-primary)":pe,strokeWidth:n===0?1.6:1},s.y))]})}function nn({className:t=""}){const a=[16,30,44,58,72];return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--explore ${t}`,fill:"none","aria-hidden":"true",children:[a.map((s,n)=>e.jsx("path",{className:"cg-feed",style:{"--i":n},d:`M8 ${s} C 52 ${s}, 62 48, 96 48`,stroke:pe,strokeWidth:"1"},s)),e.jsx("line",{x1:"96",y1:"48",x2:"150",y2:"48",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{className:"cg-node",cx:"96",cy:"48",r:"4",fill:"none",stroke:"var(--color-primary)",strokeWidth:"1.4"}),e.jsx("circle",{cx:"96",cy:"48",r:"1.6",fill:"var(--color-primary)"})]})}function rn({className:t=""}){return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--create ${t}`,fill:"none","aria-hidden":"true",children:[e.jsx("line",{x1:"14",y1:"80",x2:"146",y2:"80",stroke:he,strokeWidth:"1"}),e.jsx("path",{d:"M52 62 L80 74 L108 62 L80 50 Z",stroke:pe,strokeWidth:"1"}),e.jsxs("g",{className:"cg-rise",children:[e.jsx("path",{d:"M52 62 L52 38 M108 62 L108 38 M80 74 L80 50",stroke:he,strokeWidth:"1"}),e.jsx("path",{d:"M52 38 L80 50 L108 38 L80 26 Z",stroke:"var(--color-primary)",strokeWidth:"1.3"})]}),e.jsx("circle",{cx:"80",cy:"26",r:"2.2",fill:"var(--color-primary)"})]})}function on({className:t=""}){const a=[{x:18,y:20,w:34,h:12,dx:9,dy:-6},{x:18,y:38,w:34,h:12,dx:-7,dy:5},{x:18,y:56,w:34,h:12,dx:6,dy:8},{x:63,y:20,w:34,h:12,dx:-8,dy:7},{x:63,y:38,w:34,h:12,dx:7,dy:-8},{x:108,y:20,w:34,h:12,dx:8,dy:9}];return e.jsxs("svg",{viewBox:me,className:`cg-svg cg-svg--organize ${t}`,fill:"none","aria-hidden":"true",children:[[35,80,125].map(s=>e.jsx("line",{x1:s,y1:"14",x2:s,y2:"82",stroke:he,strokeWidth:"1"},s)),a.map((s,n)=>e.jsx("rect",{className:"cg-block",style:{"--dx":`${s.dx}px`,"--dy":`${s.dy}px`,"--i":n},x:s.x,y:s.y,width:s.w,height:s.h,rx:"3",stroke:n===0?"var(--color-primary)":pe,strokeWidth:n===0?1.4:1},`${s.x}-${s.y}`))]})}const ln=[{id:"talk",tag:"Conversation",title:"Talk",copy:"Talk things through with an AI that gets to know you.",art:tn,task:{id:"talk-through",label:"Talk something through",basePrompt:"I want to talk something through — help me think out loud about it.",question:"What's on your mind?"}},{id:"think",tag:"Decisions",title:"Think",copy:"Work through ideas, questions, and decisions together.",art:an,task:{id:"think-decision",label:"Think through a decision",basePrompt:"Help me think through this decision and show me what I might be missing.",question:"What are you weighing up?"}},{id:"work",tag:"Day to day",title:"Work",copy:"Get through what's on your plate.",art:sn,task:{id:"work-priorities",label:"Sort out my week",basePrompt:"Help me work out what actually matters right now and what can wait.",question:"What's on your plate at the moment?"}},{id:"explore",tag:"Curiosity",title:"Explore",copy:"Learn, compare, and make sense of things.",art:nn,task:{id:"explore-topic",label:"Make sense of something",basePrompt:"Help me understand this properly — what matters, what doesn't, and why.",question:"What do you want to get to the bottom of?"}},{id:"create",tag:"Make",title:"Create",copy:"Turn an idea into something real.",art:rn,task:{id:"create-idea",label:"Turn an idea into something real",basePrompt:"Turn this idea into something real I can actually use.",question:"Tell me the idea — a sentence is enough."}},{id:"organize",tag:"Structure",title:"Organize",copy:"Bring structure to tasks, projects, and recurring work.",art:on,task:{id:"organize-work",label:"Get on top of things",basePrompt:"Help me bring some structure to everything I've got going on.",question:"What do you need to get on top of?"}}];function cn({onStartTask:t}){return e.jsxs("section",{className:"cg-section bg-[#0a0a0a] py-24 md:py-32",children:[e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsx("div",{className:"col-span-12 max-w-[46ch]",children:e.jsx("h2",{className:"text-[34px] leading-[1.1] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"What Starchild can help with."})})}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:ln.map(({id:a,tag:s,title:n,copy:r,art:i,task:o},l)=>e.jsxs(p.button,{type:"button",onClick:()=>t(o),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.5,delay:l%3*.06,ease:[.16,1,.3,1]},className:"cg-card col-span-12 sm:col-span-6 lg:col-span-4",children:[e.jsx("span",{className:"cg-art","aria-hidden":"true",children:e.jsx(i,{})}),e.jsx("span",{className:"cg-tag",children:s}),e.jsxs("span",{className:"cg-title-row",children:[e.jsx("span",{className:"cg-title",children:n}),e.jsx(B,{className:"cg-arrow size-3.5 rotate-45"})]}),e.jsx("span",{className:"cg-copy",children:r})]},a))})]}),e.jsx("style",{children:`
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
      `})]})}const Le=[{id:"monitor",label:"Keep an eye on something",blurb:"Starchild can follow what changes and bring you what matters.",prompt:"Let me know when flights to Tokyo drop below $700.",panel:{kind:"monitor",agentName:"Tokyo flights",cadence:"Checking every hour",sources:["Google Flights","Skyscanner","Airlines","Fare alerts"],checks:[{time:"09:00",text:"Checked 6 airlines — cheapest $842"},{time:"13:00",text:"Checked 6 airlines — cheapest $828"},{time:"17:40",text:"Dropped below your $700",hit:!0}],alert:{heading:"Worth your attention",title:"Tokyo in October — $684 return",detail:"Down from $828 this morning. Direct both ways, and it lands inside the dates you wanted."}},task:{id:"agent-monitor",label:"Set up a watch for me",basePrompt:"Keep an eye on this for me and tell me when something meaningful changes.",question:"What should I be watching?"}},{id:"recurring",label:"Take care of a routine",blurb:"Let Starchild handle something you do again and again.",prompt:"Every Sunday, help me plan the week ahead.",panel:{kind:"recurring",agentName:"Week ahead",uses:["Calendar","Gmail","Notes","Reminders"],runs:"Every Sunday at 6:00 PM",outputName:"Plan for the week",output:{heading:"This week",items:[{text:"Thursday is your only clear day",note:"the one to protect"},{text:"Two deadlines both land on Friday",note:"start the smaller one Tuesday"},{text:"Dentist still isn't booked",note:"third week it's slipped"}]}},task:{id:"agent-recurring",label:"Take this off my plate",basePrompt:"Run this for me on a schedule and report back when it's done.",question:"What's the task that keeps coming back?"}},{id:"specialist",label:"Give it a job",blurb:"Tell Starchild what you want done, what matters, and when to step in.",prompt:"Plan our trip in October. You know the budget and the dates — check with me before booking anything.",panel:{kind:"config",agentName:"October trip",fields:[{label:"The job",value:"Plan the trip end to end"},{label:"What matters",value:"Budget, the dates, who's coming"},{label:"When to step in",value:"Ask me before booking anything"}],tools:["Web","Gmail","Calendar","Maps"],status:"Active · first plan ready tomorrow"},task:{id:"agent-specialist",label:"Give Starchild a job",basePrompt:"I want to hand you a job — here's what I want done and what matters to me.",question:"What should I take care of for you?"}}];function dn({example:t}){return e.jsxs("div",{className:"aw-frame",children:[e.jsxs("div",{className:"aw-chrome",children:[e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"",width:16,height:16,className:"size-4 shrink-0"}),e.jsx("span",{className:"aw-chrome-title",children:"Agents"}),e.jsx("span",{className:"aw-chrome-name",children:t.panel.agentName})]}),e.jsxs("div",{className:"aw-body",children:[e.jsx("div",{className:"aw-prompt-row",children:e.jsx("p",{className:"aw-prompt",children:t.prompt})}),e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"aw-panel-wrap",children:e.jsx(pn,{panel:t.panel})},t.id)]}),e.jsx("style",{children:`
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
      `})]})}function _e({items:t}){return e.jsx("span",{className:"aw-chips",children:t.map(a=>e.jsxs("span",{className:"aw-chip",children:[e.jsx("span",{className:"aw-chip-mark","aria-hidden":"true",children:a[0]}),a]},a))})}function pn({panel:t}){return t.kind==="monitor"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.cadence]})]}),e.jsxs("div",{className:"aw-section",children:[e.jsx("p",{className:"aw-label",children:"Connected sources"}),e.jsx(_e,{items:t.sources})]}),e.jsx("div",{className:"aw-section",children:e.jsx("ul",{className:"aw-log",children:t.checks.map((a,s)=>e.jsxs(p.li,{className:a.hit?"aw-hit":void 0,initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,delay:.1+s*.09,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-log-time",children:a.time}),e.jsx(de,{className:"aw-tick size-3.5"}),a.text]},a.time))})}),e.jsxs(p.div,{className:"aw-alert",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.44,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.alert.heading}),e.jsx("p",{className:"aw-alert-title",children:t.alert.title}),e.jsx("p",{className:"aw-alert-detail",children:t.alert.detail})]})]}):t.kind==="recurring"?e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsxs("span",{className:"aw-status",children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),"On"]})]}),e.jsxs("div",{className:"aw-rows",children:[e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Uses"}),e.jsx(_e,{items:t.uses})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Runs"}),e.jsx("span",{className:"aw-row-value",children:t.runs})]}),e.jsxs("div",{className:"aw-row",children:[e.jsx("span",{className:"aw-row-label",children:"Output"}),e.jsx("span",{className:"aw-row-value",children:t.outputName})]})]}),e.jsxs(p.div,{className:"aw-section",initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,delay:.32,ease:[.16,1,.3,1]},children:[e.jsx("p",{className:"aw-label",children:t.output.heading}),e.jsx("ul",{className:"aw-list",children:t.output.items.map((a,s)=>e.jsxs("li",{children:[e.jsx("span",{className:"aw-idx",children:s+1}),e.jsxs("span",{children:[e.jsx("span",{className:"aw-item-text",children:a.text})," ",e.jsxs("span",{className:"aw-item-note",children:["— ",a.note]})]})]},a.text))})]})]}):e.jsxs("div",{className:"aw-card",children:[e.jsxs("div",{className:"aw-card-head",children:[e.jsx("p",{className:"aw-card-title",children:t.agentName}),e.jsx("span",{className:"aw-status",children:"New agent"})]}),e.jsxs("div",{className:"aw-fields",children:[t.fields.map((a,s)=>e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+s*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:a.label}),e.jsx("span",{className:"aw-field-value",children:a.value})]},a.label)),e.jsxs(p.div,{className:"aw-field",initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.32,delay:.08+t.fields.length*.08,ease:[.16,1,.3,1]},children:[e.jsx("span",{className:"aw-field-label",children:"Tools"}),e.jsx(_e,{items:t.tools})]})]}),e.jsxs(p.div,{className:"aw-footer",initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.46},children:[e.jsx("span",{className:"aw-live","aria-hidden":"true"}),t.status]})]})}function hn({onStartTask:t}){const{trackRef:a,pinned:s,index:n,selectStep:r}=at(Le.length),i=Le[n];return e.jsxs("section",{className:"ag-section bg-[#0a0a0a] pb-24 md:pb-32",children:[e.jsx(Ae,{trackRef:a,pinned:s,screens:Le.length,children:e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 max-w-[52ch]",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Do it once."}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.12] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Let Starchild keep things moving for you."}),e.jsx("p",{className:"mt-5 text-[15px] leading-[1.6] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:"Give it something to keep track of, repeat, or take care of over time."})]})}),e.jsxs("div",{className:"mt-14 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 flex flex-col gap-2 lg:col-span-4",children:[Le.map((o,l)=>{const d=l===n;return e.jsxs("button",{type:"button",onClick:()=>r(l),"aria-pressed":d,className:`ag-tab${d?" ag-tab--active":""}`,children:[e.jsx("span",{className:"ag-tab-title",children:o.label}),e.jsx(Q,{initial:!1,children:d&&e.jsx(p.span,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.28,ease:[.16,1,.3,1]},className:"block overflow-hidden",children:e.jsx("span",{className:"ag-tab-blurb",children:o.blurb})})})]},o.id)}),e.jsxs("button",{type:"button",onClick:()=>t(i.task),className:"ag-try",children:[i.task.label,e.jsx(B,{className:"size-3.5 rotate-45"})]})]}),e.jsx("div",{className:"col-span-12 lg:col-span-8",children:e.jsx(dn,{example:i})})]})]})}),e.jsx("style",{children:`
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
      `})]})}function xn({onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:r,onLogIn:i,onSignUp:o}){const l=c.useRef(null),d=()=>t();return e.jsxs("div",{children:[e.jsx(Js,{onEnterGuest:t,onStartTask:a,onNavigateTraders:s,onNavigateConductorMode:n,onOpenMarketplace:r,onLogIn:i,onSignUp:o}),e.jsx(cn,{onStartTask:a}),e.jsx(hn,{onStartTask:a}),e.jsx("div",{ref:l,children:e.jsx(st,{showBenefits:!1})}),e.jsx(Pe,{onStartFree:d,headline:"Whatever comes next, Starchild is already with you."})]})}const mn=[{title:"Market research",copy:"Funding, liquidations, volatility and context."},{title:"Structured strategy",copy:"Entry, exit, sizing and invalidation rules."},{title:"Controlled execution",copy:"Orders on Hyperliquid, inside the permissions you approved."},{title:"24/7 monitoring",copy:"Jobs, alerts and automatic reports."},{title:"Visibility",copy:"Dashboards for PnL, margin, risk and positions."}],gn=[{n:"01",title:"Connect Starchild to Hyperliquid",copy:"Choose how Starchild is allowed to operate on Hyperliquid."},{n:"02",title:"Design the strategy with the agent",copy:"Explain how you trade, ask for the analysis, and turn your logic into entry, exit and risk rules."},{n:"03",title:"Fund the strategy",copy:"Deposit USDC and make available the balance the strategy will use."},{n:"04",title:"Monitor performance and risk",copy:"Jobs follow positions, risk and execution, and report back — or raise an alert when something needs you."}],un=[{method:"Native Agent Wallet",custody:"Non-custodial (Privy); exportable key.",edge:"The simplest route — included in every account, switched on under “Account Balance → Agent Wallet”."},{method:"Hyperliquid API wallet",custody:"Main account stays protected on your hardware wallet; the dedicated wallet can trade but not withdraw.",edge:"More separation between custody and execution; the credential goes through a secure flow, never through the chat."},{method:"Third-party builders",custody:"A trading account you authorize separately.",edge:"Pear Protocol (market-neutral pairs and baskets) · Degen Claw (Virtuals ACP agents with a leaderboard)."}],fn=["Trend","Volatility","Book liquidity","Funding","Open interest","Liquidations","Market context"],yn="./images/empresas.svg",bn=6,wn=["Coinglass","DeFiLlama","CoinGecko","TAAPI","Onchain data","Market APIs"],vn=[{title:"Independent strategies",copy:"Each asset or strategy carries its own rules, capital, positions, orders, performance and logs."},{title:"Shared execution layer",copy:"Checks balances and permissions before any order is submitted."},{title:"Independent risk layer",copy:"Blocks execution when exposure, leverage, drawdown or margin cross the limits you approved.",hard:!0}];function jn(){const t={r:4,fill:"var(--color-primary)"},a={duration:1.1,ease:[.16,1,.3,1],delay:.25},s={duration:1,ease:[.16,1,.3,1],delay:1.5};return e.jsx("div",{className:"tr-flowbox",children:e.jsxs("svg",{viewBox:"0 0 560 200",className:"tr-flowsvg",role:"img","aria-label":"Your strategy and market data both feed Conductor, which picks the models and tools for each part of the task and returns one analysis.",children:[e.jsx("path",{d:"M150 52 H210 Q230 52 230 72 V88",className:"tr-fl"}),e.jsx("path",{d:"M150 148 H210 Q230 148 230 128 V112",className:"tr-fl"}),e.jsx("path",{d:"M330 100 H392",className:"tr-fl"}),e.jsx("path",{d:"M470 128 V148 Q470 168 450 168 H150",className:"tr-fl"}),e.jsx("rect",{x:"20",y:"32",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"57",className:"tr-ftext",children:"Your strategy"}),e.jsx("rect",{x:"20",y:"128",width:"130",height:"40",rx:"10",className:"tr-fnode"}),e.jsx("text",{x:"85",y:"153",className:"tr-ftext",children:"Market data"}),e.jsx("rect",{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fnode tr-fnode--hi"}),e.jsx("text",{x:"280",y:"105",className:"tr-ftext tr-ftext--hi",children:"Conductor"}),e.jsx("rect",{x:"392",y:"76",width:"156",height:"48",rx:"12",className:"tr-fnode"}),e.jsx("text",{x:"470",y:"99",className:"tr-ftext",children:"AI models"}),e.jsx("text",{x:"470",y:"115",className:"tr-ftext tr-ftext--sub",children:"+ the tools for the job"}),e.jsx("text",{x:"150",y:"172",className:"tr-ftext tr-ftext--end",textAnchor:"start",children:"Analysis"}),e.jsx(p.circle,{...t,initial:{cx:150,cy:52,opacity:0},whileInView:{cx:[150,230,230],cy:[52,52,90],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(p.circle,{...t,initial:{cx:150,cy:148,opacity:0},whileInView:{cx:[150,230,230],cy:[148,148,110],opacity:[0,1,0]},viewport:{once:!0,amount:.6},transition:a}),e.jsx(p.rect,{x:"230",y:"76",width:"100",height:"48",rx:"12",className:"tr-fpulse",initial:{opacity:0},whileInView:{opacity:[0,.9,0]},viewport:{once:!0,amount:.6},transition:{duration:.9,delay:1.2}}),e.jsx(p.circle,{...t,initial:{cx:330,cy:100,opacity:0},whileInView:{cx:[330,470,470,190],cy:[100,100,168,168],opacity:[0,1,1,0]},viewport:{once:!0,amount:.6},transition:s})]})})}function kn({onNavigateHome:t,onEnterGuest:a,onLogIn:s,onSignUp:n}){const r=()=>a("I want to build a trading strategy on Hyperliquid. Start by asking me how I trade.");return e.jsxs("div",{className:"tr-page",children:[e.jsx(ha,{onNavigateHome:t,onNavigateTraders:()=>window.scrollTo({top:0,behavior:"smooth"}),onLogIn:s,onSignUp:n}),e.jsx("section",{className:"pt-8 pb-24 md:pt-10 md:pb-32",children:e.jsxs(T,{children:[e.jsxs("nav",{className:"tr-crumbs","aria-label":"Breadcrumb",children:[e.jsxs("button",{type:"button",onClick:t,className:"tr-crumb-link",children:[e.jsx(Fe,{className:"size-3.5"}),"Home"]}),e.jsx("span",{className:"tr-crumb-sep","aria-hidden":"true",children:"/"}),e.jsx("span",{className:"tr-crumb-here","aria-current":"page",children:"For Traders"})]}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6 md:mt-20",children:e.jsxs("div",{className:"col-span-12 lg:col-span-8",children:[e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.45},className:"tr-eyebrow",children:"Starchild for traders · Hyperliquid"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.06] font-semibold text-balance text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you know about the market into a strategy that runs."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mt-6 max-w-[62ch] text-[17px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Turn your trading logic into rules, research the market, execute on Hyperliquid and keep the strategy monitored around the clock."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center gap-4",children:[e.jsxs("button",{type:"button",onClick:r,className:"tr-cta",children:["Build a strategy",e.jsx(B,{className:"size-3.5 rotate-45"})]}),e.jsx("span",{className:"tr-cta-note",children:"No account needed to start"})]})]})})]})}),e.jsxs("section",{className:"tr-band py-16 md:py-20",children:[e.jsx(T,{children:e.jsx("p",{className:"tr-strip-label",children:"Built around the ecosystem traders already use."})}),e.jsx("div",{className:"tr-strip-viewport mt-9","aria-hidden":"true",children:e.jsx("div",{className:"tr-strip-track",children:Array.from({length:bn},(i,o)=>e.jsx("img",{src:yn,alt:"",className:"tr-strip-img"},o))})})]}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(T,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("h2",{className:"tr-h2",children:"From knowledge to execution."}),e.jsx("p",{className:"tr-lead",children:"Hyperliquid provides the infrastructure to trade perps onchain. Starchild sits in the decision layer: you explain your logic, set the conditions and the limits, and the agent turns that into an executable flow — research, execution, risk control and continuous monitoring."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-label",children:"What Starchild turns into a system"}),e.jsx("ul",{className:"tr-system",children:mn.map(({title:i,copy:o})=>e.jsxs("li",{children:[e.jsx("span",{className:"tr-system-title",children:i}),e.jsx("span",{className:"tr-system-copy",children:o})]},i))})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(T,{children:[e.jsx("h2",{className:"tr-h2 max-w-[24ch]",children:"Trade perps with an agent, in four steps."}),e.jsx("div",{className:"mt-14 grid grid-cols-12 gap-6",children:gn.map(({n:i,title:o,copy:l},d)=>e.jsxs(p.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:d%4*.06,ease:[.16,1,.3,1]},className:"tr-step col-span-12 sm:col-span-6 lg:col-span-3",children:[e.jsx("span",{className:"tr-step-n",children:i}),e.jsx("span",{className:"tr-step-title",children:o}),e.jsx("span",{className:"tr-step-copy",children:l})]},i))})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsxs(T,{children:[e.jsx("p",{className:"tr-step-tag",children:"Step 1"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[26ch]",children:"Connect Starchild to Hyperliquid."}),e.jsx("p",{className:"tr-lead mt-5 max-w-[70ch]",children:"The first decision is how Starchild is allowed to operate. There are three routes: the native Agent Wallet, a Hyperliquid API wallet, or a third-party builder."}),e.jsxs("div",{className:"tr-table mt-12",children:[e.jsxs("div",{className:"tr-tr tr-tr--head",children:[e.jsx("span",{children:"Method"}),e.jsx("span",{children:"Custody"}),e.jsx("span",{children:"What it gives you"})]}),un.map(({method:i,custody:o,edge:l})=>e.jsxs("div",{className:"tr-tr",children:[e.jsx("span",{className:"tr-td-method",children:i}),e.jsx("span",{children:o}),e.jsx("span",{children:l})]},i))]})]})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsxs(T,{children:[e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-6",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 2"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Design the strategy with the agent."}),e.jsx("p",{className:"tr-lead mt-5",children:"Instead of trading order by order, tell Starchild how you read the market, what you're trying to reach and which risks you accept. The agent researches, then helps turn that into a structured strategy — entry, position size, exit, invalidation and risk limits, all before anything executes."}),e.jsx("p",{className:"tr-label mt-10",children:"What the agent can weigh"}),e.jsx("div",{className:"tr-chips",children:fn.map(i=>e.jsx("span",{className:"tr-chip",children:i},i))}),e.jsxs("p",{className:"tr-flow",children:["your logic ",e.jsx("span",{"aria-hidden":"true",children:"→"})," analysis ",e.jsx("span",{"aria-hidden":"true",children:"→"})," rules"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})," strategy"]})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-5 lg:col-start-8",children:[e.jsxs("div",{className:"tr-prompt",children:[e.jsx("p",{className:"tr-label",children:"Example prompt"}),e.jsx("p",{className:"tr-prompt-body",children:"“I want to build a strategy for ETH on Hyperliquid. Look at trend, volatility, liquidity and funding, and help me define entry, position size, invalidation, max loss and two exit scenarios. Don't execute anything yet.”"}),e.jsxs("button",{type:"button",onClick:r,className:"tr-prompt-cta",children:["Try this",e.jsx(B,{className:"size-3.5 rotate-45"})]})]}),e.jsx("p",{className:"tr-label mt-12",children:"Risk architecture, in layers"}),e.jsx("div",{className:"tr-layers",children:vn.map(({title:i,copy:o,hard:l})=>e.jsxs("div",{className:`tr-layer${l?" tr-layer--hard":""}`,children:[e.jsx("span",{className:"tr-layer-title",children:i}),e.jsx("span",{className:"tr-layer-copy",children:o})]},i))})]})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Market intelligence"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Data from the tools traders already rely on."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild can bring market data, technical signals and external sources into the same analysis — so the strategy isn't built from a model's memory alone."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsxs("div",{className:"tr-sources",children:[e.jsx("p",{className:"tr-label",children:"Sources"}),e.jsx("div",{className:"tr-chips",children:wn.map(i=>e.jsx("span",{className:"tr-chip",children:i},i))}),e.jsxs("div",{className:"tr-converge","aria-hidden":"true",children:[e.jsx("span",{className:"tr-converge-line"}),e.jsx("span",{className:"tr-converge-dot"}),e.jsx("span",{className:"tr-converge-line"})]}),e.jsxs("div",{className:"tr-analysis",children:[e.jsx("span",{className:"tr-analysis-title",children:"One analysis"}),e.jsx("span",{className:"tr-analysis-copy",children:"Funding, positioning and price read together, against your rules."})]})]})})]}),e.jsxs("div",{className:"mt-24 grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Conductor Mode"}),e.jsx("h3",{className:"tr-h3 mt-4",children:"Different market questions need different intelligence."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild combines your strategy context with the right models and tools for each part of the task."})]}),e.jsx("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:e.jsx(jn,{})})]})]})}),e.jsx("section",{className:"tr-band py-24 md:py-28",children:e.jsx(T,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 3"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[18ch]",children:"Fund the strategy."}),e.jsx("p",{className:"tr-lead mt-5",children:"Deposit USDC into the Agent Wallet and ask Starchild to move the balance to Hyperliquid. No USDC on Arbitrum? The agent can use Swap and Bridge to find a route from the assets you already hold."}),e.jsxs("div",{className:"tr-approvals",children:[e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 1"}),e.jsx("span",{className:"tr-approval-copy",children:"Enables trading through the Agent Wallet."})]}),e.jsxs("div",{className:"tr-approval",children:[e.jsx("span",{className:"tr-approval-n",children:"Approval 2"}),e.jsx("span",{className:"tr-approval-copy",children:"Authorizes Starchild's builder code, within the fee limit you approved."})]})]}),e.jsx("p",{className:"tr-note",children:"After those two, the strategy can execute — inside the permissions and limits you set."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-step-tag",children:"Step 4"}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[22ch]",children:"Monitor performance and risk."}),e.jsx("p",{className:"tr-lead mt-5",children:"Starchild schedules Jobs that follow positions, margin, leverage, funding, PnL, orders and the health of the strategy. Those checks are what feed the alerts and the reports."}),e.jsxs("div",{className:"tr-cards",children:[e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Daily report"}),e.jsx("span",{className:"tr-card-copy",children:"Positions, realized and unrealized PnL, funding, fees, margin, exceptions and recommended actions."})]}),e.jsxs("div",{className:"tr-card",children:[e.jsx("span",{className:"tr-card-title",children:"Alerts by exception"}),e.jsx("span",{className:"tr-card-copy",children:"Silent while everything is healthy. When something needs attention, the alert arrives with the context and a recommended action."})]})]}),e.jsx("p",{className:"tr-note",children:"It can also build custom dashboards — positions, margin, leverage, distance to liquidation, orders, PnL and risk alerts in real time. For a quick read-only look, there's HyperTracker, HypurrScan and the Hyperliquid Explorer."})]})]})})}),e.jsx("section",{className:"py-24 md:py-28",children:e.jsx(T,{children:e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12 lg:col-span-5",children:[e.jsx("p",{className:"tr-eyebrow",children:"Trading is part of the foundation."}),e.jsx("h2",{className:"tr-h2 mt-4 max-w-[16ch]",children:"Built with trading in its DNA."})]}),e.jsxs("div",{className:"col-span-12 lg:col-span-6 lg:col-start-7",children:[e.jsx("p",{className:"tr-lead",children:"Starchild comes from an ecosystem with deep roots in trading, market infrastructure and crypto. That experience shapes how the product approaches data, execution and risk."}),e.jsx("div",{className:"tr-heritage",children:["WOO","WOOFi Pro","Orderly"].map(i=>e.jsx("span",{className:"tr-heritage-mark",children:i},i))})]})]})})}),e.jsx("section",{className:"py-28 text-center md:py-36",children:e.jsx(T,{children:e.jsxs("div",{className:"mx-auto flex max-w-[46ch] flex-col items-center gap-8",children:[e.jsx("h2",{className:"text-[32px] leading-[1.14] font-semibold text-balance text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"You define the logic and the limits. Starchild keeps it running."}),e.jsx("p",{className:"tr-lead text-center",children:"Research, rules, execution inside approved permissions, risk control and continuous monitoring — one cycle instead of five tools."}),e.jsxs("button",{type:"button",onClick:r,className:"tr-cta",children:["Build a strategy",e.jsx(B,{className:"size-3.5 rotate-45"})]}),e.jsxs("div",{className:"tr-tags",children:[e.jsx("span",{children:"Repeatable"}),e.jsx("span",{children:"Monitorable"}),e.jsx("span",{children:"Verifiable"})]})]})})}),e.jsx("style",{children:`
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
      `})]})}const Ft=["a","b","c"];function Nn({variant:t,onChange:a}){const s=Math.max(0,Ft.indexOf(t));return e.jsxs("div",{className:"vt-wrap",children:[e.jsx("span",{className:"vt-caption",children:"Landing"}),e.jsxs("div",{className:"vt-track",role:"radiogroup","aria-label":`Landing version ${t.toUpperCase()}`,children:[e.jsx("span",{className:"vt-knob","aria-hidden":"true",style:{transform:`translateX(${s*32}px)`},children:t.toUpperCase()}),Ft.map(n=>e.jsx("button",{type:"button",role:"radio","aria-checked":n===t,"aria-label":`Landing version ${n.toUpperCase()}`,onClick:()=>a(n),className:`vt-side${n===t?" vt-side--on":""}`,children:n.toUpperCase()},n))]}),e.jsx("style",{children:`
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
      `})]})}function zn({title:t,subtitle:a}){return e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"poster-card flex h-[168px] w-[124px] shrink-0 flex-col items-center justify-end rounded-lg p-3 text-center",children:[e.jsx("p",{className:"text-[15px] leading-tight font-bold tracking-wide text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1 text-[8.5px] tracking-[0.08em] text-white/70 uppercase",children:"In theaters"})]}),e.jsxs("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']}),e.jsx("style",{children:`
        .poster-card {
          background:
            linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.85) 100%),
            linear-gradient(160deg, #3c5a63 0%, #8a6142 55%, #e9c093 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
      `})]})}function Cn({name:t,tagline:a,colors:s}){return e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[17px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"text-[13px] text-white/50 italic",style:{fontFamily:"var(--font-google-sans)"},children:a})]}),e.jsx("div",{className:"flex gap-2",children:s.map(n=>e.jsx("div",{className:"size-9 rounded-lg border border-white/15",style:{background:n},title:n},n))})]})}function Sn({rows:t}){return e.jsx("div",{className:"flex flex-col divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/12",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5",children:[e.jsx("span",{className:"text-[13px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:a.label}),e.jsxs("span",{className:`text-[13px] font-medium tabular-nums ${a.up?"text-emerald-400":"text-red-400"}`,style:{fontFamily:"var(--font-google-sans)"},children:[a.up?"▲":"▼"," ",a.value]})]},a.label))})}function Mn({language:t,snippet:a}){return e.jsxs("div",{className:"overflow-hidden rounded-xl border border-white/10 bg-black/40",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/10 px-3.5 py-2",children:[e.jsx("span",{className:"text-[10.5px] tracking-wide text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("span",{className:"text-[10.5px] font-medium text-emerald-400",style:{fontFamily:"var(--font-google-sans)"},children:"✓ ran without errors"})]}),e.jsx("pre",{className:"overflow-x-auto p-3.5 text-[12px] leading-relaxed text-neutral-200",style:{fontFamily:"var(--font-google-sans)"},children:a})]})}function Ln({deliverable:t}){switch(t.kind){case"poster":return e.jsx(zn,{title:t.title,subtitle:t.subtitle});case"brand":return e.jsx(Cn,{name:t.name,tagline:t.tagline,colors:t.colors});case"market":return e.jsx(Sn,{rows:t.rows});case"code":return e.jsx(Mn,{language:t.language,snippet:t.snippet});case"none":return null}}const fe="./icons/",Tn={gemini:`${fe}gemini.svg`,openai:`${fe}openai.svg`,xai:`${fe}xai.svg`,deepseek:`${fe}deepseek.svg`,"ai-generic":`${fe}ai-generic.svg`};function In({stat:t}){const{withoutTokens:a,withTokens:s}=t,[n,r]=c.useState(!1),[i,o]=c.useState(!1),l=c.useRef(void 0),d=a-s;c.useEffect(()=>(o(window.matchMedia("(hover: hover) and (pointer: fine)").matches),()=>window.clearTimeout(l.current)),[]),c.useEffect(()=>{if(!n)return;const g=u=>{u.key==="Escape"&&r(!1)};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[n]);const h=()=>{window.clearTimeout(l.current),r(!0)},x=()=>{window.clearTimeout(l.current),l.current=window.setTimeout(()=>r(!1),140)};return e.jsxs("div",{className:"relative self-start",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("span",{className:"size-1.5 shrink-0 rounded-full bg-[#f84600]","aria-hidden":"true"}),e.jsxs("p",{className:"text-[13px] text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:["Saved"," ",e.jsx("span",{className:"font-medium text-white/90 tabular-nums",children:d.toLocaleString("en-US")})," ","tokens with Conductor Mode"]}),e.jsx("button",{type:"button",onClick:()=>r(g=>!g),onPointerEnter:i?h:void 0,onPointerLeave:i?x:void 0,onFocus:i?h:void 0,onBlur:i?x:void 0,"aria-expanded":n,"aria-label":"How this saving was estimated",className:"rounded-full p-0.5 text-[#f84600]/60 transition-colors hover:text-[#f84600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f84600]/70",children:e.jsx(as,{className:"size-4"})})]}),n&&(i?e.jsx(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.22,ease:[.16,1,.3,1]},onPointerEnter:h,onPointerLeave:x,role:"tooltip",className:"absolute bottom-[calc(100%+10px)] left-0 z-40 w-[min(300px,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#111112] p-4 shadow-2xl",children:e.jsx(ma,{})}):e.jsx(En,{onClose:()=>r(!1)}))]})}function ma(){return e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-[13.5px] font-medium text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode routes each step to the AI that fits it best."}),e.jsx("p",{className:"mt-1 text-[11.5px] text-white/35",style:{fontFamily:"var(--font-google-sans)"},children:"That means less unnecessary token usage and less wasted context."})]})}function En({onClose:t}){return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm",role:"dialog","aria-modal":"true","aria-label":"Estimated savings on this task",onClick:t,children:e.jsxs(p.div,{initial:{opacity:0,y:10,scale:.98},animate:{opacity:1,y:0,scale:1},transition:{duration:.28,ease:[.16,1,.3,1]},onClick:a=>a.stopPropagation(),className:"w-full max-w-[320px] rounded-2xl border border-white/10 bg-[#111112] p-5 shadow-2xl",children:[e.jsx(ma,{}),e.jsx("button",{type:"button",onClick:t,className:"mt-5 w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.12]",style:{fontFamily:"var(--font-google-sans)"},children:"Close"})]})})}function Wn({scenario:t,onStep:a,onDone:s,showSavings:n=!1}){const{steps:r,models:i,deliverable:o,stat:l}=t,[d,h]=c.useState(0),[x,g]=c.useState(!1);c.useEffect(()=>{h(0),g(!1)},[t]),c.useEffect(()=>{if(a==null||a(),d>=r.length){const N=setTimeout(()=>{g(!0),s==null||s()},500);return()=>clearTimeout(N)}const f=setTimeout(()=>h(N=>N+1),700);return()=>clearTimeout(f)},[d,r]);const u=x?100:Math.min(d,r.length)/r.length*100;return e.jsxs("div",{className:"relative flex flex-col gap-3.5 py-1 pl-1",children:[e.jsx("div",{className:"absolute top-1 bottom-1 left-[7px] w-px bg-white/12","aria-hidden":"true",children:e.jsx(p.div,{className:"w-px bg-[#f84600]",initial:{height:0},animate:{height:`${u}%`},transition:{duration:.4,ease:"easeOut"}})}),r.slice(0,d).map((f,N)=>{const k=N===d-1&&!x;return e.jsxs(p.div,{initial:{opacity:0,x:-6},animate:{opacity:1,x:0},transition:{duration:.35,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsx("span",{className:`relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full ${k?"border-2 border-[#f84600] bg-[#0a0a0a]":"bg-[#0a0a0a]"}`,children:k?e.jsx(p.span,{className:"size-1.5 rounded-full bg-[#f84600]",animate:{scale:[1,1.4,1]},transition:{duration:1.4,repeat:1/0}}):e.jsx(de,{className:"size-3.5 text-[#f84600]"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:`text-[14.5px] font-medium ${k?"text-white":"text-white/55"}`,style:{fontFamily:"var(--font-google-sans)"},children:f.title}),N===0&&k&&e.jsx("div",{className:"mt-2.5 flex flex-wrap gap-1.5",children:i.map(C=>e.jsxs("span",{className:"flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-2.5 pl-1.5",children:[e.jsx("img",{src:Tn[C.icon],alt:"",className:"size-3.5 object-contain"}),e.jsx("span",{className:"text-[11.5px] font-medium text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:C.name})]},C.name))})]})]},f.title)}),x&&e.jsxs(p.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"relative flex items-start gap-4",children:[e.jsx("span",{className:"relative z-10 mt-[3px] flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]",children:e.jsx(de,{className:"size-3.5 text-[#f84600]"})}),e.jsxs("div",{className:"flex flex-1 flex-col gap-4",children:[e.jsx("p",{className:"text-[14.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Done."}),o.kind!=="none"&&e.jsx(Ln,{deliverable:o}),n&&e.jsx(In,{stat:l})]})]})]})}function Fn({tasksRemaining:t,onLockedFeature:a}){return e.jsxs("div",{className:"hidden w-56 shrink-0 flex-col gap-6 border-r border-white/[0.08] px-4 pt-6 pb-5 md:flex",children:[e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"Starchild",width:24,height:24,className:"size-6"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Guest mode"}),e.jsx("p",{className:"mt-1.5 text-[12px] leading-relaxed text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:"You're trying Starchild with limited access. Create an account to save what Starchild learns about you and continue anywhere."})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Available"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:wt.available.map(s=>e.jsxs("li",{className:"flex items-center gap-2 text-[12.5px] text-white/80",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(de,{className:"size-3 text-emerald-400"}),s]},s))})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-[10.5px] font-semibold tracking-[0.08em] text-white/35 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Requires account"}),e.jsx("ul",{className:"flex flex-col gap-1.5",children:wt.locked.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:a,className:"flex w-full items-center gap-2 text-left text-[12.5px] text-white/35 transition-colors hover:text-white/65",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Qt,{className:"size-3 shrink-0"}),s]})},s))})]}),e.jsx("div",{className:"mt-auto rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center",children:e.jsxs("p",{className:"text-[12px] font-medium text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:[Math.max(t,0)," guest interaction",t===1?"":"s"," remaining"]})})]})}function An({onNewChat:t,onOpenMarketplace:a,marketplaceIntro:s,accountName:n="Agent7035"}){const r=[{label:"Skills",Icon:ns},{label:"Projects",Icon:rs},{label:"Marketplace",Icon:is,onClick:a},{label:"Missions",Icon:os,badge:!0},{label:"Work",Icon:ta},{label:"More",Icon:ls},{label:"Search conversations",Icon:Je}];return e.jsxs("div",{className:"hidden w-[268px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0d] px-4 pt-5 pb-4 lg:flex",children:[e.jsx("button",{type:"button",className:"flex size-9 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Collapse sidebar",children:e.jsx(ss,{className:"size-[18px]"})}),e.jsxs("button",{type:"button",onClick:t,className:"mt-5 flex items-center gap-2.5 rounded-full bg-[#f84600] px-4 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.01]",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Ie,{className:"size-4.5"}),"New chat"]}),e.jsx("nav",{className:"mt-4 flex flex-col",children:r.map(({label:i,Icon:o,badge:l,onClick:d})=>{const h=i==="Marketplace"&&!!s;return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",onClick:d,className:`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-[14px] transition-colors duration-300 ${h?"bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40":"text-white/70 hover:bg-white/[0.06] hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:[e.jsxs("span",{className:`relative shrink-0 ${h?"text-[#f84600]":"text-white/55"}`,children:[e.jsx(o,{className:"size-[18px]"}),l&&e.jsx("span",{className:"absolute -top-0.5 -right-0.5 size-[5px] rounded-full bg-[#f84600]","aria-hidden":"true"})]}),i]}),i==="Marketplace"&&s]},i)})}),e.jsxs("div",{className:"mt-auto flex items-center gap-2.5 rounded-lg px-2 py-2",children:[e.jsx("span",{className:"size-7 shrink-0 rounded-full",style:{background:"linear-gradient(140deg,#f84600,#7a4bd6 70%)"},"aria-hidden":"true"}),e.jsx("span",{className:"text-[13.5px] text-white/75",style:{fontFamily:"var(--font-google-sans)"},children:n})]})]})}function nt({heading:t,sub:a,ctaLabel:s="Create account & continue",backLabel:n="Sign up",footerNote:r="Already have an account?",showForm:i=!0,onBack:o,onContinue:l}){const[d,h]=c.useState("you@example.com"),[x,g]=c.useState("starchild"),u=!i||d.trim()!==""&&x.trim()!=="";return e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2},children:[o&&e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:o,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Fe,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:n})]}),e.jsxs("div",{className:"mt-5 flex flex-col items-center gap-3 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(Qt,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:t}),e.jsx("p",{className:"mt-1.5 max-w-[340px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:a})]})]}),e.jsxs("div",{className:"mx-auto mt-6 flex max-w-[340px] flex-col gap-3",children:[i&&e.jsxs(e.Fragment,{children:[e.jsx("input",{value:d,onChange:f=>h(f.target.value),type:"email",placeholder:"Email",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("input",{value:x,onChange:f=>g(f.target.value),type:"password",placeholder:"Password",className:"w-full rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("button",{type:"button",onClick:l,disabled:!u,className:"mt-1 rounded-full bg-[#f84600] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsxs("p",{className:"text-center text-[12px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:[r," ",e.jsx("span",{className:"font-medium text-[#f84600]",children:"Log in"})]})]})]})}const Pn=3,ga=[{label:"Work",echo:"work"},{label:"Something I'm building",echo:"something you're building"},{label:"A decision",echo:"a decision you're weighing"},{label:"Too much on my plate",echo:"how much is on your plate"},{label:"Something personal",echo:"something personal"}],Ye="I'm not sure yet",At="What's taking up most of your attention lately?",$n="One thing that helps me work better with you: do you want me to be more direct, or give you more room to think things through?";function Rn(t){return t==="direct"?"be direct":"give you room to think"}function Bn(t){return t!=null&&t.echo?`You're mainly thinking about ${t.echo}`:t!=null&&t.said?`You're mainly thinking about “${t.said}”`:"We haven't landed on a topic yet"}function Pt(t,a){const s=Bn(t);return a?`Here's what I understand so far. ${s}, and it sounds like you'd rather I ${Rn(a)}. I'll start there and learn the rest as we go.`:`Here's what I understand so far. ${s}. I'll start there, and I'll pick up how you like me to say things as we go.`}function $t(t){return t?`Got it. Let's start there. What would have to happen this week for ${t.echo??"that"} to feel handled?`:"So — what's the first thing you'd like to put in front of me?"}function On(t){return`You were working on ${t?t.label.toLowerCase():"something"}. Want to keep going, or should I get to know how you like to work first?`}const Dn="Picking up where we left off — what's the next thing you need?";let Hn=0;const Rt=()=>`t${Hn++}`;function _n({task:t,fromGuest:a=!1,onDone:s}){const n=a||!!t,[r,i]=c.useState(n?"continuity":"guided"),[o,l]=c.useState([{id:Rt(),from:"starchild",text:n?On(t):At,stage:n?void 0:0}]),[d,h]=c.useState(),[x,g]=c.useState(),u=(y,v,b)=>l(I=>[...I,{id:Rt(),from:y,text:v,stage:b}]),f=()=>{u("starchild",$n,1),i("preference")};return{step:r,turns:o,acceptsText:r==="guided"||r==="adjust",submit:y=>{const v=y.trim();if(!v)return;u("you",v);const b={said:v.replace(/.$/,"")};if(r==="adjust"){h(b),u("starchild",Pt(b,x),2),i("read");return}h(b),f()},choose:y=>{var v;if(u("you",y),r==="guided"){if(y===Ye){u("starchild","That's fine — we can find it as we go."),s({tone:x,opening:$t(void 0)});return}h({echo:(v=ga.find(b=>b.label===y))==null?void 0:v.echo}),f();return}if(r==="preference"){const b=y==="More direct"?"direct":y==="More space"?"space":void 0;g(b),u("starchild",Pt(d,b),2),i("read")}},act:y=>{if(y==="keep-going"){s({opening:t?t.question:Dn});return}if(y==="get-to-know"){u("starchild",At,0),i("guided");return}if(y==="adjust"){u("starchild","Tell me what I got wrong."),i("adjust");return}y==="accept"&&s({topic:(d==null?void 0:d.echo)??(d==null?void 0:d.said),tone:x,opening:$t(d)})}}}function Gn({meeting:t,fromGuest:a=!1}){const{step:s,turns:n,choose:r,act:i}=t,o=n[n.length-1],l=(o==null?void 0:o.from)==="you",d=a&&n.length===1;return e.jsxs("div",{className:"w-full max-w-[560px]",children:[e.jsx("div",{className:"flex flex-col gap-6",children:n.map(h=>h.from==="starchild"?e.jsxs(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.5,ease:[.16,1,.3,1]},className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1.5 shrink-0",children:e.jsx(ve,{state:l?"thinking":"settled",depth:1,size:9})}),e.jsxs("div",{children:[h.stage!==void 0&&e.jsx("p",{className:"mb-1.5 text-[10px] font-medium tracking-[0.16em] text-white/25 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:`${h.stage+1} of ${Pn}`}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:h.text})]})]},h.id):e.jsx(p.p,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"self-end rounded-[16px_16px_4px_16px] bg-white/[0.07] px-4 py-2.5 text-[15px] text-white",style:{fontFamily:"var(--font-google-sans)"},children:h.text},h.id))}),d&&e.jsx(p.p,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.35},className:"mt-5 text-[12.5px] text-white/35",style:{fontFamily:"var(--font-google-sans)"},children:"Your guest conversation is saved either way."}),e.jsx(Q,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4,delay:.35,ease:[.16,1,.3,1]},className:`flex flex-wrap gap-2.5 ${d?"mt-3":"mt-7"}`,children:[s==="continuity"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{primary:!0,onClick:()=>i("keep-going"),children:"Keep going"}),e.jsx(X,{onClick:()=>i("get-to-know"),children:"Get to know me"})]}),s==="guided"&&e.jsxs(e.Fragment,{children:[ga.map(({label:h})=>e.jsx(X,{onClick:()=>r(h),children:h},h)),e.jsx(X,{onClick:()=>r(Ye),children:Ye})]}),s==="preference"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{onClick:()=>r("More direct"),children:"More direct"}),e.jsx(X,{onClick:()=>r("More space"),children:"More space"}),e.jsx(X,{onClick:()=>r("Let's see as we go"),children:"Let's see as we go"})]}),s==="read"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{primary:!0,onClick:()=>i("accept"),children:"Looks right"}),e.jsx(X,{onClick:()=>i("adjust"),children:"Adjust"})]})]},s)})]})}function X({children:t,onClick:a,primary:s=!1}){return e.jsx("button",{type:"button",onClick:a,className:`rounded-full px-5 py-2.5 text-[13.5px] transition-colors ${s?"bg-[#f84600] text-white hover:scale-[1.02]":"border border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35 hover:text-white"}`,style:{fontFamily:"var(--font-google-sans)"},children:t})}const qn={"below-right":{outer:"absolute top-[calc(100%+14px)] right-0 z-40",caret:"-top-[7px] right-5 border-t border-l"},"above-right":{outer:"absolute bottom-[calc(100%+14px)] right-0 z-40",caret:"-bottom-[7px] right-5 border-r border-b"},right:{outer:"absolute top-1/2 left-[calc(100%+14px)] z-40 -translate-y-1/2",caret:"top-1/2 -left-[7px] -mt-1.5 border-b border-l"}};function ua({placement:t,visual:a,title:s,body:n,ctaLabel:r,onCta:i,onClose:o}){const l=c.useRef(null),d=qn[t];return c.useEffect(()=>{const h=u=>{u.key==="Escape"&&o()},x=u=>{var f;(f=l.current)!=null&&f.contains(u.target)||o()};window.addEventListener("keydown",h);const g=setTimeout(()=>document.addEventListener("mousedown",x),0);return()=>{window.removeEventListener("keydown",h),clearTimeout(g),document.removeEventListener("mousedown",x)}},[o]),e.jsx("div",{className:d.outer,children:e.jsxs(p.div,{ref:l,initial:{opacity:0,scale:.97},animate:{opacity:1,scale:1},transition:{duration:.45,delay:.4,ease:[.16,1,.3,1]},role:"dialog","aria-label":s,className:"relative w-[292px] rounded-2xl border border-white/10 bg-[#1a1a1c] shadow-[0_20px_50px_rgba(0,0,0,.55)]",children:[e.jsx("span",{"aria-hidden":"true",className:`absolute size-3 rotate-45 rounded-[3px] border-white/10 bg-[#1a1a1c] ${d.caret}`}),e.jsx("div",{className:"relative flex h-[96px] items-center justify-center overflow-hidden rounded-t-2xl bg-white/[0.03]","aria-hidden":"true",children:a}),e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-[14.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:s}),e.jsx("p",{className:"mt-1.5 text-[12.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:n}),e.jsxs("div",{className:"mt-4 flex items-center justify-between gap-3",children:[e.jsx("button",{type:"button",onClick:o,className:"shrink-0 text-[12.5px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Dismiss"}),e.jsx("button",{type:"button",onClick:i??o,className:"rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:r})]})]})]})})}const Vn=[{x:-52,y:-18,size:6,delay:0},{x:50,y:-24,size:4,delay:.7},{x:-36,y:25,size:4,delay:1.4},{x:45,y:21,size:5,delay:2.1}];function Un(){return e.jsxs(e.Fragment,{children:[Vn.map(t=>e.jsx(p.span,{className:"absolute rounded-full bg-white/70",style:{width:t.size,height:t.size,left:`calc(50% - ${t.size/2}px)`,top:`calc(50% - ${t.size/2}px)`},animate:{x:[t.x,t.x*.58,t.x],y:[t.y,t.y*.58,t.y],opacity:[.2,.5,.2]},transition:{duration:5.2,delay:t.delay,repeat:1/0,ease:"easeInOut"}},`${t.x},${t.y}`)),e.jsx(ve,{state:"settled",depth:1,size:13})]})}function Yn({onClose:t}){return e.jsx(ua,{placement:"above-right",visual:e.jsx(Un,{}),title:"Meet Conductor Mode",body:"Starchild chooses the right AI for each task, so you don't have to.",ctaLabel:"Got it",onClose:t})}const Xn=[{x:-58,y:-20,size:5,delay:0},{x:-30,y:16,size:4,delay:.9},{x:4,y:-24,size:4,delay:1.8},{x:36,y:20,size:5,delay:.5},{x:60,y:-14,size:4,delay:1.3}],le={x:0,y:6,size:11};function Kn(){return e.jsxs(e.Fragment,{children:[Xn.map(t=>e.jsx(p.span,{className:"absolute rounded-[2px] bg-white/70",style:{width:t.size,height:t.size,left:`calc(50% - ${t.size/2}px + ${t.x}px)`,top:`calc(50% - ${t.size/2}px + ${t.y}px)`},animate:{opacity:[.18,.42,.18]},transition:{duration:4.6,delay:t.delay,repeat:1/0,ease:"easeInOut"}},`${t.x},${t.y}`)),e.jsx(p.span,{className:"absolute rounded-[3px] bg-[#f84600]",style:{width:le.size,height:le.size,left:`calc(50% - ${le.size/2}px + ${le.x}px)`,top:`calc(50% - ${le.size/2}px + ${le.y}px)`,boxShadow:"0 0 22px rgba(248,70,0,.55)"},animate:{scale:[1,1.09,1],opacity:[.9,1,.9]},transition:{duration:4.2,repeat:1/0,ease:"easeInOut"}})]})}function Zn({onExplore:t,onClose:a}){return e.jsx(ua,{placement:"right",visual:e.jsx(Kn,{}),title:"Meet the Marketplace",body:"Discover what others have built. Use it, customize it, or publish your own.",ctaLabel:"Explore Marketplace",onCta:t,onClose:a})}function Qn({onBack:t,onOpenMarketplace:a,intents:s,onRequestSignup:n,onLogIn:r,onLearned:i,initialMessage:o,openingMessage:l,task:d,isGuest:h=!1,cameFromGuest:x=!1}){const[g,u]=c.useState(o??null),[f,N]=c.useState(o?vt(o):null),[k,C]=c.useState(!1),[y,v]=c.useState(""),b=h,[I,R]=c.useState(o?1:2),[A,W]=c.useState(null),[L,$]=c.useState(!1),[m,j]=c.useState(null),S=c.useRef(null),P=c.useRef(null),[F,H]=c.useState(d),[_,U]=c.useState(l);function J(M,q){W({heading:M,sub:q})}function V(M){H(M),U(M.question)}const G=_n({task:b?void 0:d,fromGuest:x,onDone:({topic:M,tone:q,opening:te})=>{i==null||i({topic:M,tone:q}),$(!0),j("conductor"),te&&U(te)}}),z=!b&&!L&&g===null&&!l,E=!b&&g===null&&!_&&!z,w=g!==null||!b&&(!!_||!L&&G.turns.length>1),D=z&&G.acceptsText;function O(M){const q=M.trim();if(q){if(b&&I<=0){J("Keep going with Starchild.","You've used your guest interactions. Create a free account to save what Starchild learns about you and continue anywhere.");return}u(q),v(""),N(vt(F?`${F.basePrompt} ${q}`:q)),b&&R(te=>te-1)}}function ee(){u(null),N(null),C(!1),v(""),U(void 0),H(void 0)}function ge(){var M;(M=S.current)==null||M.scrollIntoView({behavior:"smooth",block:"end"})}c.useEffect(()=>{const M=setTimeout(ge,50);return()=>clearTimeout(M)},[g,k]);const K=e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:.05,ease:[.16,1,.3,1]},className:"w-full max-w-[560px] rounded-[22px] border border-white/12 bg-white/[0.04] p-4 transition-colors focus-within:border-white/30",children:[e.jsx("input",{ref:P,value:y,onChange:M=>v(M.target.value),onKeyDown:M=>{if(M.key==="Enter"){if(D){G.submit(y),v("");return}O(y)}},placeholder:D?"Tell me anything…":_?"Answer however you like…":E?"Ask me anything…":"Ask anything, or pick one above",className:"w-full bg-transparent text-[14.5px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},autoFocus:!!_}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/[0.07]","aria-label":"Add attachment",children:e.jsx(Ie,{className:"size-5"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("button",{type:"button",className:`-mx-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[13px] transition-colors duration-300 ${m==="conductor"?"bg-[#f84600]/10 text-[#f84600] ring-1 ring-[#f84600]/40":"text-white/55"}`,style:{fontFamily:"var(--font-google-sans)"},children:["Conductor Mode",e.jsx(Xt,{className:`size-3 ${m==="conductor"?"text-[#f84600]/70":"text-white/35"}`})]}),m==="conductor"&&!b&&e.jsx(Yn,{onClose:()=>j("marketplace")})]}),e.jsx("button",{type:"button",onClick:()=>O(y||"Explain Conductor Mode to me"),className:"flex size-9 items-center justify-center rounded-full bg-[#f84600] text-white transition-transform hover:scale-105","aria-label":"Send",children:y.trim()?e.jsx(B,{className:"size-4"}):e.jsx(Ja,{className:"size-4"})})]})]})]});return e.jsxs("div",{className:"relative flex h-screen overflow-hidden bg-[#0a0a0a]",children:[b?e.jsx(Fn,{tasksRemaining:I,onLockedFeature:()=>n==null?void 0:n()}):e.jsx(An,{onNewChat:ee,onOpenMarketplace:a,marketplaceIntro:m==="marketplace"&&!b?e.jsx(Zn,{onExplore:()=>{j(null),a()},onClose:()=>j(null)}):void 0}),A&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]",onClick:M=>{M.target===M.currentTarget&&W(null)},children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:e.jsx(nt,{heading:A.heading,sub:A.sub,ctaLabel:"Create free account",showForm:!1,onContinue:()=>{W(null),n==null||n()}})})}),e.jsxs("div",{className:"flex h-screen flex-1 flex-col overflow-hidden",children:[b?e.jsxs("header",{className:"flex shrink-0 items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-8",children:[e.jsx("button",{type:"button",onClick:t,className:"flex size-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.07]","aria-label":"Back",children:e.jsx(Fe,{className:"size-4"})}),e.jsx("span",{className:"text-[13.5px] font-medium text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode"}),b&&e.jsxs("div",{className:"ml-auto flex items-center gap-2 sm:gap-3",children:[e.jsx("button",{type:"button",onClick:()=>{var M;return(M=r??n)==null?void 0:M()},className:"px-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Log in"}),e.jsx("button",{type:"button",onClick:()=>n==null?void 0:n(),className:"rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/20",style:{fontFamily:"var(--font-google-sans)"},children:"Sign up"})]})]}):e.jsxs("header",{className:"relative flex shrink-0 items-center justify-end gap-3 px-6 py-4",children:[e.jsx("button",{type:"button",onClick:t,className:"absolute left-1/2 -translate-x-1/2 text-[19px] font-semibold tracking-[0.17em] text-white transition-opacity hover:opacity-75",style:{fontFamily:"var(--font-google-sans)"},children:"STARCHILD"}),e.jsxs("span",{className:"flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/85",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(cs,{className:"size-4 text-white/45"}),"$190"]}),e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Toggle panel",children:e.jsx(ds,{className:"size-[18px]"})}),e.jsx("button",{type:"button",className:"flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.07] hover:text-white","aria-label":"Developer view",children:e.jsx(ps,{className:"size-[18px]"})}),e.jsx("span",{className:"size-2.5 rounded-full bg-emerald-400",title:"Connected"})]}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:g===null?e.jsxs("div",{className:"flex min-h-full flex-col items-center justify-center gap-6 px-5 py-10",children:[_?e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.55,ease:[.16,1,.3,1]},className:"w-full max-w-[560px]",children:[F&&e.jsx("p",{className:"mb-4 text-[11px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:F.label}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"mt-1 shrink-0",children:e.jsx(ve,{state:"settled",depth:1,size:9})}),e.jsx("p",{className:"text-[17px] leading-relaxed text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:_})]})]}):b?e.jsx(p.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.16,1,.3,1]},className:"w-full max-w-[620px]",children:e.jsx(tt,{onStartTask:V,align:"center",intents:s})}):z?e.jsx(Gn,{meeting:G,fromGuest:x}):e.jsxs(p.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"flex flex-col items-center",children:[e.jsxs("div",{className:"relative flex items-center justify-center",children:[e.jsx("span",{"aria-hidden":"true",className:"absolute size-[280px] rounded-full",style:{background:"radial-gradient(circle, rgba(248,70,0,.30) 0%, rgba(248,70,0,.07) 45%, rgba(248,70,0,0) 70%)"}}),e.jsx(p.span,{"aria-hidden":"true",className:"relative size-[124px] rounded-full bg-[#f84600]",style:{boxShadow:"0 0 70px rgba(248,70,0,.45)"},animate:{scale:[1,1.035,1]},transition:{duration:5.5,repeat:1/0,ease:"easeInOut"}})]}),e.jsx("h1",{className:"mt-9 text-[34px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Let's get to work"})]}),!w&&K,!w&&!b&&e.jsx("p",{className:"-mt-2 text-center text-[12px] text-white/30",style:{fontFamily:"var(--font-google-sans)"},children:"AI can make mistakes. Please verify important information."})]}):e.jsxs("div",{className:"mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 py-8 sm:px-0",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("div",{className:"max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[14.5px] text-white/90",style:{fontFamily:"var(--font-google-sans)"},children:g})}),e.jsx(Wn,{scenario:f,onStep:ge,onDone:()=>C(!0),showSavings:b}),k&&b&&e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.9},className:"mt-6 border-t border-white/[0.08] pt-6",children:e.jsxs("button",{type:"button",onClick:()=>n==null?void 0:n(),className:"group flex items-center gap-2.5 text-[13.5px] text-white/60 transition-colors hover:text-white",style:{fontFamily:"var(--font-google-sans)"},children:["Create a free account to keep this",e.jsx(B,{className:"size-3.5 rotate-45 text-white/30 transition-colors group-hover:text-[#f84600]"})]})}),e.jsx("div",{ref:S})]})}),w&&e.jsx("div",{className:"shrink-0 px-5 py-4 sm:px-8",children:e.jsxs("div",{className:"mx-auto w-full max-w-[560px]",children:[K,!b&&e.jsx("p",{className:"mt-2.5 text-center text-[12px] text-white/30",style:{fontFamily:"var(--font-google-sans)"},children:"AI can make mistakes. Please verify important information."})]})})]})]})}const Jn={poster:"Poster",brand:"Brand kit",market:"Market snapshot",code:"Code fix",none:"Answer"};function er({onTryExample:t}){return e.jsx("section",{className:"bg-[#0a0a0a] py-24 md:py-32",children:e.jsxs(T,{children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 mx-auto max-w-[46ch] text-center",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-white/40 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"See it in action"}),e.jsx("h2",{className:"mt-4 text-[34px] leading-[1.1] font-semibold text-white sm:text-[42px]",style:{fontFamily:"var(--font-google-sans)"},children:"Real prompts, run for real."}),e.jsx("p",{className:"mt-4 text-[15px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"Click one and watch Conductor Mode pick a model, use tools, and deliver."})]})}),e.jsx("div",{className:"mt-12 grid grid-cols-12 gap-6",children:bs.map(({prompt:a,scenario:s},n)=>e.jsxs(p.button,{type:"button",onClick:()=>t(a),initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.4},transition:{duration:.5,delay:n*.06,ease:[.16,1,.3,1]},className:"col-span-12 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:col-span-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[11px] font-semibold tracking-[0.1em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:Jn[s.deliverable.kind]}),e.jsxs("p",{className:"mt-2 text-[15.5px] font-medium text-white",style:{fontFamily:"var(--font-google-sans)"},children:['"',a,'"']})]}),e.jsx("span",{className:"flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-105",children:e.jsx(B,{className:"size-4 rotate-45"})})]},s.id))})]})})}function tr({onNavigateHome:t,onOpenMarketplace:a,onTry:s,onLogIn:n,onSignUp:r}){const i=c.useRef(null);function o(){var l;(l=i.current)==null||l.scrollIntoView({behavior:"smooth",block:"start"})}return e.jsxs("div",{className:"bg-[#0a0a0a]",children:[e.jsxs("div",{className:"cmp-hero relative overflow-hidden pb-20",children:[e.jsx(sa,{onNavigateHome:t,onNavigateConductorMode:()=>{},onOpenMarketplace:a,onLogIn:n,onSignUp:r}),e.jsxs(T,{className:"relative z-10 mt-16",children:[e.jsx("div",{className:"grid grid-cols-12 gap-6",children:e.jsxs("div",{className:"col-span-12 text-center lg:col-span-8 lg:col-start-3",children:[e.jsx("p",{className:"text-[12px] font-medium tracking-[0.24em] text-[#ffa940] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Product · Conductor Mode"}),e.jsx(p.h1,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.16,1,.3,1]},className:"mt-5 text-[38px] leading-[1.1] font-semibold text-white sm:text-[52px]",style:{fontFamily:"var(--font-google-sans)"},children:"One conductor. Every model, tool, and task."}),e.jsx(p.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.08},className:"mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-white/60",style:{fontFamily:"var(--font-google-sans)"},children:"Conductor Mode reads the whole task, picks the model and tools actually built for it, checks the result when it matters, and hands you one response — no juggling apps, no picking models yourself."}),e.jsxs(p.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.55,delay:.16},className:"mt-9 flex flex-wrap items-center justify-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>s(),className:"rounded-full bg-[#f84600] px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_8px_24px_rgba(248,70,0,.32)] transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Try Conductor Mode"}),e.jsx("button",{type:"button",onClick:o,className:"rounded-full border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10",style:{fontFamily:"var(--font-google-sans)"},children:"See examples"})]})]})}),e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.3},className:"mx-auto mt-14 flex max-w-[520px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12.5px] tracking-[0.08em] text-white/45 uppercase",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx("span",{children:"Skills"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Tools"}),e.jsx("span",{className:"text-white/20",children:"·"}),e.jsx("span",{children:"Runs 24/7"})]})]}),e.jsx("style",{children:".cmp-hero { background: radial-gradient(circle at 50% 0%, #1a2e35 0%, #101d23 45%, #0a0a0a 80%); }"})]}),e.jsx(Sa,{onTryConductorMode:()=>s()}),e.jsx("div",{ref:i,children:e.jsx(er,{onTryExample:l=>s(l)})}),e.jsx(Pe,{onStartFree:()=>s()})]})}const Ge=[{Icon:Qe,title:"Create your own",body:"Anything Conductor just built for you — a poster, a brand kit, a fix — can be packaged into a skill of its own."},{Icon:et,title:"Sell it in the Marketplace",body:"List your skill and get paid every time someone puts it to work."},{Icon:Je,title:"Or just buy one",body:"Skip the work — browse skills other people already built and vetted."}];function ar({onDone:t}){const[a,s]=c.useState(0),n=Ge[a],r=a===Ge.length-1;return e.jsxs("div",{className:"flex flex-col items-center px-2 py-8 text-center",children:[e.jsx(Q,{mode:"wait",children:e.jsxs(p.div,{initial:{opacity:0,x:16},animate:{opacity:1,x:0},exit:{opacity:0,x:-16},transition:{duration:.25,ease:[.16,1,.3,1]},className:"flex min-h-[176px] flex-col items-center gap-4",children:[e.jsx("div",{className:"flex size-14 items-center justify-center rounded-full bg-[#f84600]/10 text-[#f84600]",children:e.jsx(n.Icon,{className:"size-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:n.title}),e.jsx("p",{className:"mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:n.body})]})]},a)}),e.jsx("div",{className:"mt-6 flex items-center gap-1.5",children:Ge.map((i,o)=>e.jsx("button",{type:"button",onClick:()=>s(o),"aria-label":`Go to slide ${o+1}`,className:`h-1.5 rounded-full transition-all ${o===a?"w-5 bg-[#f84600]":"w-1.5 bg-white/20"}`},o))}),e.jsxs("div",{className:"mt-7 flex w-full max-w-[360px] items-center justify-between",children:[e.jsx("button",{type:"button",onClick:t,className:"text-[13px] text-white/40 transition-colors hover:text-white/70",style:{fontFamily:"var(--font-google-sans)"},children:"Skip"}),e.jsx("button",{type:"button",onClick:()=>r?t():s(i=>i+1),className:"rounded-full bg-[#f84600] px-5 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:r?"Ok, let's go":"Next"})]})]})}function sr({skillTitle:t,onBack:a,onContinue:s}){return e.jsx(nt,{heading:"Create a free account to get this skill",sub:`So "${t}" lands in your library and the seller actually gets paid.`,onBack:a,onContinue:s})}const nr={Writing:{bg:"#262626",text:"#ffffff"},Design:{bg:"#f84600",text:"#ffffff"},Code:{bg:"#312e81",text:"#ffffff"},Marketing:{bg:"#0f766e",text:"#ffffff"}};function rr(t){return nr[t]??{bg:"#e5e5e5",text:"#404040"}}function ir({skill:t,onSelect:a}){const s=rr(t.category);return e.jsxs("div",{role:a?"button":void 0,tabIndex:a?0:void 0,onClick:a,onKeyDown:n=>{a&&(n.key==="Enter"||n.key===" ")&&a()},className:`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left ${t.mine?"border-[#f84600]/40":"border-white/10"} ${a?"cursor-pointer transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]":""}`,children:[e.jsxs("div",{className:"relative flex h-[74px] items-center justify-center px-3 text-center",style:{background:s.bg},children:[t.mine&&e.jsx("span",{className:"absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-[#f84600] uppercase",children:"New"}),e.jsx("span",{className:"text-[13.5px] leading-tight font-bold tracking-wide uppercase",style:{color:s.text,fontFamily:"var(--font-google-sans)"},children:t.title})]}),e.jsxs("div",{className:"flex flex-1 flex-col p-3.5",children:[e.jsx("p",{className:"flex-1 text-[12px] leading-snug text-white/50",style:{fontFamily:"var(--font-google-sans)"},children:t.blurb}),e.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[e.jsx("span",{className:"text-[11px] text-white/40",style:{fontFamily:"var(--font-google-sans)"},children:t.provider}),e.jsx("span",{className:"text-[12.5px] font-semibold text-[#f84600]",style:{fontFamily:"var(--font-google-sans)"},children:t.price})]})]})]})}function or({open:t,onClose:a,skills:s,onAddSkill:n}){const[r,i]=c.useState("onboarding"),[o,l]=c.useState("All"),[d,h]=c.useState(""),[x,g]=c.useState(""),[u,f]=c.useState(""),[N,k]=c.useState(""),[C,y]=c.useState(Re[2]),[v,b]=c.useState(null);c.useEffect(()=>{t&&(i("onboarding"),b(null))},[t]);function I(){i("create")}function R(m){b(m),i("auth")}function A(){i("purchased")}function W(){x.trim()&&(n({id:`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`,title:x.trim(),price:N.trim()||"$5",category:C,blurb:u.trim()||"A new skill, ready to be discovered.",provider:"You",mine:!0}),g(""),f(""),k(""),i("grid"))}const L=d.trim().toLowerCase(),$=s.filter(m=>{const j=o==="All"||m.category===o,S=!L||m.title.toLowerCase().includes(L)||m.blurb.toLowerCase().includes(L)||m.category.toLowerCase().includes(L);return j&&S});return e.jsx(Q,{children:t&&e.jsx(p.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:m=>{m.target===m.currentTarget&&a()},children:e.jsxs(p.div,{initial:{opacity:0,y:16,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:10,scale:.98},transition:{duration:.28,ease:[.16,1,.3,1]},className:"max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-white/10 bg-[#111112] p-6 shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-[18px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"Marketplace"}),e.jsx("button",{type:"button",onClick:a,className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Close",children:e.jsx(es,{className:"size-4"})})]}),e.jsx(Q,{mode:"wait",children:r==="onboarding"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(ar,{onDone:()=>i("grid")})},"onboarding"):r==="grid"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"mt-4 overflow-hidden rounded-2xl p-5",style:{background:"linear-gradient(135deg, #ffffff 0%, #fff0db 100%)"},children:[e.jsxs("div",{className:"flex items-center justify-between gap-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[10.5px] font-semibold tracking-[0.14em] text-[#f84600] uppercase",style:{fontFamily:"var(--font-google-sans)"},children:"Featured"}),e.jsx("h4",{className:"mt-1.5 text-[15.5px] font-semibold text-[#1a1206]",style:{fontFamily:"var(--font-google-sans)"},children:"Turn what you just did into real earnings"}),e.jsx("p",{className:"mt-1 text-[12.5px] text-[#1a1206]/65",style:{fontFamily:"var(--font-google-sans)"},children:"Anything Conductor helps you build can become something other people pay to use."}),e.jsx("button",{type:"button",onClick:I,className:"mt-3 rounded-full bg-[#f84600] px-4 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.03]",style:{fontFamily:"var(--font-google-sans)"},children:"Add your skill"})]}),e.jsx("div",{className:"flex size-[76px] shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm",children:e.jsx("img",{src:"./images/starchild-symbol.svg",alt:"Starchild",width:36,height:36,className:"size-9"})})]}),e.jsx("div",{className:"mt-4 flex justify-center gap-1.5",children:[0,1,2].map(m=>e.jsx("span",{className:`h-1.5 rounded-full transition-all ${m===0?"w-4 bg-[#f84600]":"w-1.5 bg-black/15"}`},m))})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2.5",children:[e.jsx(Je,{className:"size-4 text-white/40"}),e.jsx("input",{value:d,onChange:m=>h(m.target.value),placeholder:"Search skills, tags…",className:"flex-1 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}})]}),e.jsx("div",{className:"scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1",children:Re.map(m=>e.jsx("button",{type:"button",onClick:()=>l(m),className:`shrink-0 rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap transition-colors ${o===m?"border-white bg-white text-neutral-900":"border-white/12 text-white/55 hover:border-white/30"}`,style:{fontFamily:"var(--font-google-sans)"},children:m},m))}),e.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-3",children:[e.jsxs("button",{type:"button",onClick:I,className:"flex min-h-[150px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-white/40 transition-colors hover:border-[#f84600]/50 hover:text-[#f84600]",children:[e.jsx(Ie,{className:"size-5"}),e.jsx("span",{className:"text-[12px]",style:{fontFamily:"var(--font-google-sans)"},children:"Add skill"})]}),$.map(m=>e.jsx(ir,{skill:m,onSelect:m.mine?void 0:()=>R(m)},m.id))]})]},"grid"):r==="create"?e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"flex size-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10","aria-label":"Back",children:e.jsx(Fe,{className:"size-4"})}),e.jsx("p",{className:"text-[13px] text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:"New skill"})]}),e.jsx("input",{value:x,onChange:m=>g(m.target.value),placeholder:"Name your skill",className:"mt-4 w-full border-b border-white/12 bg-transparent pb-2 text-[17px] font-semibold text-white placeholder:text-white/25 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("textarea",{value:u,onChange:m=>f(m.target.value),placeholder:"What does this skill do? (one or two sentences)",rows:3,className:"mt-4 w-full resize-none rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsxs("div",{className:"mt-3 flex gap-3",children:[e.jsx("input",{value:N,onChange:m=>k(m.target.value),placeholder:"$5",className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"}}),e.jsx("select",{value:C,onChange:m=>y(m.target.value),className:"w-1/2 rounded-lg border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-white focus:border-[#f84600] focus:outline-none",style:{fontFamily:"var(--font-google-sans)"},children:Re.filter(m=>m!=="All").map(m=>e.jsx("option",{value:m,children:m},m))})]}),e.jsx("div",{className:"mt-5 flex justify-end",children:e.jsxs("button",{type:"button",onClick:W,disabled:!x.trim(),className:"flex items-center gap-1.5 rounded-full bg-[#f84600] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40",style:{fontFamily:"var(--font-google-sans)"},children:[e.jsx(Ie,{className:"size-3.5"}),"add"]})})]},"create"):r==="auth"?e.jsx(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:e.jsx(sr,{skillTitle:v==null?void 0:v.title,onBack:()=>i("grid"),onContinue:A})},"auth"):e.jsxs(p.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"flex flex-col items-center gap-3 py-10 text-center",children:[e.jsx("div",{className:"flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",children:e.jsx(de,{className:"size-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-[16.5px] font-semibold text-white",style:{fontFamily:"var(--font-google-sans)"},children:"You're in"}),e.jsxs("p",{className:"mt-1.5 max-w-[320px] text-[13px] leading-relaxed text-white/55",style:{fontFamily:"var(--font-google-sans)"},children:['"',v==null?void 0:v.title,'" is ready — check your library to start using it.']})]}),e.jsx("button",{type:"button",onClick:()=>i("grid"),className:"mt-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/[0.07]",style:{fontFamily:"var(--font-google-sans)"},children:"Back to Marketplace"})]},"purchased")})]})})})}const Xe="v",Ke="c";function lr(){if(typeof window>"u")return Ke;const t=new URLSearchParams(window.location.search).get(Xe);return t==="a"||t==="b"||t==="c"?t:Ke}function cr(){const[t,a]=c.useState(lr),[s,n]=c.useState("landing"),[r,i]=c.useState(),[o,l]=c.useState(),[d,h]=c.useState(),[x,g]=c.useState(!1),[u,f]=c.useState(!1),[N,k]=c.useState(!1),[C,y]=c.useState(ws);function v(m){a(m);const j=new URL(window.location.href);m===Ke?j.searchParams.delete(Xe):j.searchParams.set(Xe,m),window.history.replaceState(null,"",j),window.scrollTo({top:0})}function b(m){y(j=>[m,...j])}function I(m){i(m),l(void 0),h(void 0),g(!0),n("chat")}function R(m){i(void 0),l(m.question),h(m),g(!0),n("chat")}function A(){n("landing")}function W(){n("for-traders"),window.scrollTo({top:0})}function L(){f(!1),n("signup")}function $(){f(x),n("signup")}return e.jsxs(e.Fragment,{children:[s==="landing"&&e.jsxs(e.Fragment,{children:[t==="c"?e.jsx(xn,{onEnterGuest:I,onStartTask:R,onNavigateTraders:W,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>k(!0),onLogIn:L,onSignUp:L},"c"):(()=>{const m=t==="b"?Vs:Fs;return e.jsx(m,{onEnterGuest:I,onStartTask:R,onNavigateConductorMode:()=>n("conductor-mode"),onOpenMarketplace:()=>k(!0),onLogIn:L,onSignUp:L},t)})(),e.jsx(Nn,{variant:t,onChange:v})]}),s==="for-traders"&&e.jsx(kn,{onNavigateHome:A,onEnterGuest:I,onLogIn:L,onSignUp:L}),s==="conductor-mode"&&e.jsx(tr,{onNavigateHome:A,onOpenMarketplace:()=>k(!0),onTry:I,onLogIn:L,onSignUp:L}),s==="signup"&&e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5 py-16",children:e.jsx("div",{className:"w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111112] p-7 shadow-2xl",children:e.jsx(nt,{heading:"Save what Starchild is learning about you",sub:"Create an account to keep this conversation and continue on Web or Desktop.",ctaLabel:"Continue",backLabel:"Sign up",onBack:()=>x?n("chat"):A(),onContinue:()=>{g(!1),i(void 0),l(void 0),n("chat")}})})}),s==="chat"&&e.jsx(Qn,{onBack:A,intents:t==="c"?xa:void 0,onOpenMarketplace:()=>k(!0),onRequestSignup:$,onLogIn:$,initialMessage:r,openingMessage:o,task:d,isGuest:x,cameFromGuest:u}),e.jsx(or,{open:N,onClose:()=>k(!1),skills:C,onAddSkill:b})]})}Ma.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(cr,{})}));
