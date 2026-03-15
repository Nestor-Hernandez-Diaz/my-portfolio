import{j as l}from"./jsx-runtime.ClP7wGfN.js";import{r as a}from"./index.DK-fsZOb.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),c=(...e)=>e.filter((t,o,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:n="",children:r,iconNode:u,...m},i)=>a.createElement("svg",{ref:i,...f,width:t,height:t,stroke:e,strokeWidth:s?Number(o)*24/Number(t):o,className:c("lucide",n),...m},[...u.map(([h,p])=>a.createElement(h,p)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(e,t)=>{const o=a.forwardRef(({className:s,...n},r)=>a.createElement(g,{ref:r,iconNode:t,className:c(`lucide-${k(e)}`,s),...n}));return o.displayName=`${e}`,o};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=d("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=d("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function j(){const[e,t]=a.useState(!1),[o,s]=a.useState(!1);a.useEffect(()=>{s(!0),t(document.documentElement.classList.contains("dark"))},[]);const n=()=>{const r=!e;t(r),r?(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")):(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"))};return o?l.jsx("button",{onClick:n,"aria-label":e?"Activar modo claro":"Activar modo oscuro",className:"p-2 rounded-full glass-panel transition-all duration-200 hover:scale-110",style:{cursor:"pointer",color:"var(--text-muted)"},children:e?l.jsx(y,{size:18,style:{color:"var(--text-muted)"}}):l.jsx(x,{size:18,style:{color:"var(--text-muted)"}})}):l.jsx("div",{className:"w-9 h-9 rounded-full glass-panel","aria-hidden":"true"})}export{j as default};
