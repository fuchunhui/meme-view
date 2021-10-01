var pe=Object.defineProperty,me=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable;var W=(t,e,l)=>e in t?pe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[e]=l,N=(t,e)=>{for(var l in e||(e={}))ge.call(e,l)&&W(t,l,e[l]);if(K)for(var l of K(e))fe.call(e,l)&&W(t,l,e[l]);return t},H=(t,e)=>me(t,ve(e));import{a as _e,d as C,r as h,o as y,c as b,F as X,b as Y,e as w,t as D,n as E,f as M,w as he,g as j,i as G,h as J,j as $,u as i,p as Q,k as ye,l as Z,m as xe,q as be}from"./vendor.b3ec0a9b.js";const $e=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function l(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=l(n);fetch(n.href,o)}};$e();const ee={getCatalog:{url:"/image/catalog",method:"get"},openImage:{url:"/image/open",method:"get"},saveImage:{url:"/image/save",method:"post"},createImage:{url:"/image/create",method:"post"}},we=()=>"https://imeme.vercel.app";var Ce=t=>async(e={},l={})=>{const{url:a,method:n}=t,o=we();return _e.request({withCredentials:!1,url:o+a,method:n,[n==="get"?"params":"data"]:e}).then(r=>{const u=r.data;return(l==null?void 0:l.stream)?r:u.errNo===0?u.data:Promise.reject(u)}).catch(r=>Promise.reject(r))};const S={};for(const t in ee)S[t]=Ce(ee[t]);const ke={class:"side"},Be={class:"side-content-title"},Fe=["onClick"],Ie=C({emits:["change"],setup(t,{emit:e}){const l=h([]),a=h(""),n=()=>{S.getCatalog({}).then(r=>{l.value=r})},o=(r,u)=>{a.value=u.mid,e("change",N({type:r},u))};return n(),(r,u)=>(y(),b("div",ke,[(y(!0),b(X,null,Y(l.value,p=>(y(),b("div",{key:p.id,class:"side-content"},[w("p",Be,D(p.text),1),(y(!0),b(X,null,Y(p.children,v=>(y(),b("div",{key:v.mid,class:E({"side-content-cell":!0,"side-content-cell-active":a.value===v.mid}),onClick:_=>o(p.type,v)},D(v.title),11,Fe))),128))]))),128))]))}});var te=(t,e)=>{for(const[l,a]of e)t[l]=a;return t};const Te=C({name:"Button",props:{label:{type:String,default:"\u63D0\u4EA4"},disabled:{type:Boolean,default:!1}},setup(t){const{label:e}=M(t);return{localLabel:e}}});function Ve(t,e,l,a,n,o){return y(),b("button",{class:E(["meme-button",{disabled:t.disabled}])},D(t.localLabel),3)}var U=te(Te,[["render",Ve]]);const De=C({name:"Input",props:{modelValue:{type:[String,Number],default:""},title:{type:String,default:""},disabled:{type:Boolean,default:!1}},emits:["update:modelValue","blur"],setup(t,{emit:e}){const l=h(null),a=o=>{e("update:modelValue",o.target.value)};return{input:l,blur:o=>{a(o),e("blur")}}}}),Le=["title","value"];function Ne(t,e,l,a,n,o){return y(),b("input",{ref:"input",class:E(["meme-input",{disabled:t.disabled}]),title:t.title,value:t.modelValue,onBlur:e[0]||(e[0]=(...r)=>t.blur&&t.blur(...r)),onKeyup:e[1]||(e[1]=he(r=>{var u;return(u=t.input)==null?void 0:u.blur()},["enter"]))},null,42,Le)}var q=te(De,[["render",Ne]]);const Me=500,Se=300;C({name:"Loading",props:{show:{type:Boolean,default:!0},min:{type:Number,default:Me},interval:{type:Number,default:Se}},created(){this.showChange(this.show)},setup(t){const{show:e,interval:l,min:a}=M(t),n=h(e.value);let o,r=0;const u=()=>{const _=new Date().getTime()-r;_>a.value?n.value=!1:setTimeout(()=>{n.value=!1},Math.max(a.value-_,0))},p=v=>{v?l.value===0?(n.value=!0,r=new Date().getTime()):o=window.setTimeout(()=>{n.value=!0,r=new Date().getTime()},l.value):(clearTimeout(o),u())};return j(e,()=>{p(e.value)}),{localShow:n,showChange:p}}});const qe={class:"meme-radio"},ze=["name","value","checked"],Ae={class:"meme-radio-label"},ae=C({props:{label:{type:String,required:!0},name:{type:String,required:!0},value:{type:String,required:!0},checked:{type:Boolean,required:!0}},emits:["toggle"],setup(t,{emit:e}){const l=a=>{e("toggle",a)};return(a,n)=>(y(),b("label",qe,[w("input",{class:"meme-radio-input",type:"radio",name:t.name,value:t.value,checked:t.checked,onChange:n[0]||(n[0]=o=>l(t.value))},null,40,ze),w("span",Ae,D(t.label),1)]))}});const Re={class:"property"},Ee=C({props:{max:{type:Number,required:!0},size:{type:Number,required:!0},color:{type:String,required:!0},align:{type:String,required:!0}},emits:["change"],setup(t,{emit:e}){const l=t,a=G("text"),n=G("updateText"),{max:o,size:r,color:u,align:p}=M(l),v=J(()=>p.value==="start"),_=(T,f)=>{const g={max:o.value,size:r.value,color:u.value,align:p.value};g[f]=["color","align"].includes(f)?T:parseInt(T),e("change",g)};return(T,f)=>(y(),b("div",Re,[$(i(q),{class:"property-max",value:i(o),"onUpdate:modelValue":f[0]||(f[0]=g=>_(g,"max"))},null,8,["value"]),$(i(q),{class:"property-size",value:i(r),"onUpdate:modelValue":f[1]||(f[1]=g=>_(g,"size"))},null,8,["value"]),$(i(q),{class:"property-color",value:i(u),"onUpdate:modelValue":f[2]||(f[2]=g=>_(g,"color"))},null,8,["value"]),$(i(ae),{label:"start",name:"align",value:"start",checked:i(v),onToggle:f[3]||(f[3]=g=>_(g,"align"))},null,8,["checked"]),$(i(ae),{label:"end",name:"align",value:"end",checked:!i(v),onToggle:f[4]||(f[4]=g=>_(g,"align"))},null,8,["checked"]),$(i(q),{class:"property-text",value:i(a),"onUpdate:modelValue":i(n)},null,8,["value","onUpdate:modelValue"])]))}});const je={class:"container"},Ue={class:"container-header"},Pe={class:"container-title"},Oe={class:"container-wraper"},Ke={class:"container-footer"},We=C({props:{story:{type:null,required:!0}},emits:["change"],setup(t,{emit:e}){const a=M(t).story,n=h(null),o=h(null),r=h(null),u=h("\u91D1\u9986\u957F"),p=s=>{u.value=s,z()};Q("text",u),Q("updateText",p);const v=h(0),_=h(0),T=(s,d)=>{a.value.x=s,a.value.y=d},f=s=>{const{max:d,size:c,color:m,align:x}=s;a.value.max=d,a.value.font=`${c}px sans-serif`,a.value.color=m,a.value.align=x},g=J(()=>{const s=a.value.font.match(/(\d{1,3})px/)||["","32"];return Number(s[1])*1}),I=new Image,P=()=>{I.onload=async()=>{const s=n.value;s.width=I.naturalWidth,s.height=I.naturalHeight,v.value=s.width,_.value=s.height,ne(),z(),O()},I.onerror=s=>{console.error(s)},I.src=a.value.image},ne=()=>{const s=o.value;s.style.width=`${v.value}px`,s.style.height=`${_.value}px`},z=()=>{const s=n.value,d=s.getContext("2d");d.drawImage(I,0,0);const{x:c,y:m,font:x,color:L,align:B,max:F}=a.value;d.font=x,d.fillStyle=L,d.textAlign=B,d.fillText(u.value,c,m,F||s.width)},O=()=>{const{x:s,y:d,max:c,align:m}=a.value,x=r.value;x.style.width=`${c}px`,x.style.height=`${g.value}px`,x.style.top=`${d-g.value+2}px`,x.style.left=m==="start"?`${s}px`:`${s-c}px`};j(a,(s,d)=>{s.mid!==d.mid?P():(z(),O())},{deep:!0});let A=0,R=0;const k=20;let V=!1;const le=s=>{V=!0;const{clientX:d,clientY:c}=s;A=d,R=c},oe=s=>{if(!V)return;const{clientX:d,clientY:c}=s,m=r.value,{width:x,height:L}=m.getBoundingClientRect();let B=m.offsetLeft+d-A,F=m.offsetTop+c-R;B<-k||F<-k||B>v.value-x+k||F>_.value-L+k?V=!1:(A=d,R=c),B=Math.max(Math.min(B,v.value-x+k),-k),F=Math.max(Math.min(F,_.value-L+k),-k);const{align:ce,max:de}=a.value;B+=ce==="end"?de:0,F+=g.value-2,T(B,F)},se=()=>{!V||(V=!1)},re=()=>{console.log("\u4F60\u8BF4\u66F4\u65B0\u5C31\u66F4\u65B0")},ue=()=>{console.log("\u4F60\u60F3\u8981\u4E0B\u8F7D\u5C31\u4E0B\u8F7D");const d=n.value.toDataURL(),c=`imeme_${a.value.title}_${u.value}`,m=document.createElement("a");m.setAttribute("download",c),m.setAttribute("href",d),m.setAttribute("target","_blank"),m.click()},ie=()=>{e("change",a.value)};return ye(()=>{P()}),(s,d)=>(y(),b("div",je,[w("div",Ue,[w("div",Pe,D(i(a).title),1),$(i(U),{label:"\u6DFB\u52A0",u:"primary",onClick:re}),$(i(U),{label:"\u4E0B\u8F7D",u:"primary",onClick:ue})]),w("div",Oe,[w("canvas",{class:"container-canvas",ref:(c,m)=>{m.canvasRef=c,n.value=c}},null,512),w("div",{class:"container-area",ref:(c,m)=>{m.areaRef=c,o.value=c},onMousemove:oe,onMouseup:se},[w("div",{class:"container-drag",ref:(c,m)=>{m.dragRef=c,r.value=c},onMousedown:le},null,544)],544)]),$(Ee,{max:i(a).max,color:i(a).color,size:i(g),align:i(a).align,onChange:f},null,8,["max","color","size","align"]),w("footer",Ke,[$(i(U),{label:"\u66F4\u65B0",u:"primary",onClick:ie})])]))}});const He={class:"image-wrap"},Xe=C({setup(t){const e=h(""),l=h("");let a=h({mid:"",title:"",feature:"",image:"",x:0,y:0,max:100,font:"32px sans-serif",color:"#FFFFFF",align:"start"});const n=({type:u,mid:p})=>{e.value!==p&&(e.value=p,l.value=u)};j([e,l],()=>{o(e.value,l.value)});const o=(u,p)=>{S.openImage({mid:u,type:p}).then(v=>{a.value=v})},r=u=>{console.log("story change value: ",N({},u));const p=H(N({},u),{image:""});S.saveImage(p)};return(u,p)=>(y(),b("div",He,[$(Ie,{onChange:n}),i(a).image&&i(a).mid?(y(),Z(We,{key:0,story:i(a),onChange:r},null,8,["story"])):xe("",!0)]))}});const Ye=C({setup(t){return(e,l)=>(y(),Z(Xe))}});be(Ye).mount("#app");