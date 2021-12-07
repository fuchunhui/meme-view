var at=Object.defineProperty,nt=Object.defineProperties;var ot=Object.getOwnPropertyDescriptors;var Ne=Object.getOwnPropertySymbols;var lt=Object.prototype.hasOwnProperty,st=Object.prototype.propertyIsEnumerable;var Ue=(e,a,l)=>a in e?at(e,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[a]=l,Se=(e,a)=>{for(var l in a||(a={}))lt.call(a,l)&&Ue(e,l,a[l]);if(Ne)for(var l of Ne(a))st.call(a,l)&&Ue(e,l,a[l]);return e},Xe=(e,a)=>nt(e,ot(a));import{r as rt,c as Z,o as F,d as V,t as le,a as M,F as he,b as Re,u as s,e as b,f as Q,n as de,g as ut,h as ct,i as k,w as it,j as fe,k as se,l as U,m as Ye,p as E,q as re,s as ze,v as me,x as _e,y as je,z as dt,A as Ae,B as vt,C as pt,D as gt,E as ht}from"./vendor.8b6f53e9.js";const ft=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function l(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=l(n);fetch(n.href,r)}};ft();var We=(e,a)=>{const l=e.__vccOpts||e;for(const[t,n]of a)l[t]=n;return l};const mt={};function _t(e,a){const l=rt("router-view");return F(),Z(l)}var yt=We(mt,[["render",_t]]);const xt={class:"side"},wt={class:"side-content-title"},$t=["onClick"],Ct=V({props:{catalogList:null,current:null},emits:["change"],setup(e,{emit:a}){const t=le(e).catalogList,n=(r,i)=>{a("change",{type:r,child:i})};return(r,i)=>(F(),M("div",xt,[(F(!0),M(he,null,Re(s(t),v=>(F(),M("div",{key:v.id,class:"side-content"},[b("p",wt,Q(v.text),1),(F(!0),M(he,null,Re(v.children,w=>(F(),M("div",{key:w.mid,class:de({"side-content-cell":!0,"side-content-cell-active":e.current===w.mid}),onClick:D=>n(v.type,w)},Q(w.title),11,$t))),128))]))),128))]))}});const ee=V({props:{label:{type:String,default:"\u63D0\u4EA4"},disabled:{type:Boolean,default:!1}},setup(e){return(a,l)=>(F(),M("button",{class:de(["meme-button",{disabled:e.disabled}])},[ut(a.$slots,"default",{},()=>[ct(Q(e.label),1)])],2))}});const Ft=V({name:"Input",props:{modelValue:{type:[String,Number],default:""},title:{type:String,default:""},disabled:{type:Boolean,default:!1}},emits:["update:modelValue","blur"],setup(e,{emit:a}){const l=k(null),t=r=>{a("update:modelValue",r.target.value)};return{input:l,blur:r=>{t(r),a("blur")}}}}),bt=["title","value"];function kt(e,a,l,t,n,r){return F(),M("input",{ref:"input",class:de(["meme-input",{disabled:e.disabled}]),title:e.title,value:e.modelValue,onBlur:a[0]||(a[0]=(...i)=>e.blur&&e.blur(...i)),onKeyup:a[1]||(a[1]=it(i=>{var v;return(v=e.input)==null?void 0:v.blur()},["enter"]))},null,42,bt)}var te=We(Ft,[["render",kt]]);const Dt=500,Mt=300;V({name:"Loading",props:{show:{type:Boolean,default:!0},min:{type:Number,default:Dt},interval:{type:Number,default:Mt}},created(){this.showChange(this.show)},setup(e){const{show:a,interval:l,min:t}=le(e),n=k(a.value);let r,i=0;const v=()=>{const y=new Date().getTime()-i;y>t.value?n.value=!1:setTimeout(()=>{n.value=!1},Math.max(t.value-y,0))},w=D=>{D?l.value===0?(n.value=!0,i=new Date().getTime()):r=window.setTimeout(()=>{n.value=!0,i=new Date().getTime()},l.value):(clearTimeout(r),v())};return fe(a,()=>{w(a.value)}),{localShow:n,showChange:w}}});const Et={class:"meme-radio"},Tt=["name","value","checked"],It={class:"meme-radio-label"},ve=V({props:{label:null,name:null,value:null,checked:{type:Boolean}},emits:["toggle"],setup(e,{emit:a}){const l=t=>{a("toggle",t)};return(t,n)=>(F(),M("label",Et,[b("input",{class:"meme-radio-input",type:"radio",name:e.name,value:e.value,checked:e.checked,onChange:n[0]||(n[0]=r=>l(e.value))},null,40,Tt),b("span",It,Q(e.label),1)]))}});const Bt={class:"meme-file-upload"},St={class:"file-button"},Rt=b("i",{class:"file-glyphicon"},null,-1),zt=b("span",null,"UPLOAD FILE",-1),At=b("i",{class:"file-tips"},"Drop files here to upload",-1),Lt=[At],Pt=V({emits:["change"],setup(e,{emit:a}){const l=se("commands"),t=g=>{const p=g.target.files;if(!p)return!1;y(p)},n=g=>{g.stopPropagation(),g.preventDefault()},r=g=>{g.stopPropagation(),g.preventDefault()},i=g=>{g.stopPropagation(),g.preventDefault();const p=g.dataTransfer.files;y(p)},v=g=>{g.stopPropagation(),g.preventDefault();const p=g.clipboardData.files;y(p)},w=1*1024*1024,D=/^image\//,y=g=>{if(g.length!==1)return $("\u4E0D\u652F\u6301\u591A\u4E2A\u6587\u4EF6\u540C\u65F6\u64CD\u4F5C\uFF0C\u8BF7\u4EC5\u9009\u62E9\u5355\u4E2A\u6587\u4EF6"),!1;const p=g[0],{name:h,size:x,type:I}=p;if(!D.test(I))return $(`\u5F53\u524D\u6587\u4EF6\u7C7B\u578B\u4E3A${I}\uFF0C\u7C7B\u578B\u4E0D\u7B26\uFF0C\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B\uFF01`),!1;const P=h.replace(/\.\w*$/g,"");if(l.value.includes(P))return $(`\u5F53\u524D\u6587\u4EF6\u540D\u79F0\u3010${h}\u3011\u4E0E\u7CFB\u7EDF\u9ED8\u8BA4\u5173\u952E\u6307\u4EE4\u3010${P}\u3011\u51B2\u7A81\uFF0C\u8BF7\u91CD\u547D\u540D\u4E0A\u4F20\u6587\u4EF6\uFF01`),!1;if(x>w)return $("\u6587\u4EF6\u8D85\u8FC7\u6700\u5927\u9650\u52361M\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9"),!1;const B=new FileReader;B.onload=L=>{const ae=L.target.result;T(h,ae)},B.onerror=()=>{$(B.error.message)},B.readAsDataURL(p)},$=g=>{alert(g)},T=(g,p)=>{a("change",{name:g,base64:p})};return(g,p)=>(F(),M("div",Bt,[b("div",St,[Rt,zt,b("input",{class:"file-input",type:"file",name:"file",accept:"image/*",title:"",onChange:t},null,32)]),b("div",{class:"file-area",draggable:!0,contenteditable:!0,onDragenter:n,onDragover:r,onDrop:i,onPaste:v},Lt,32)]))}});const Vt=["value","selected"],Nt=V({props:{options:null,selected:null},emits:["change","update:model-value"],setup(e,{emit:a}){const l=t=>{const n=t.target.value;a("update:model-value",n),a("change",n)};return(t,n)=>(F(),M("select",{class:"meme-select",onChange:l},[(F(!0),M(he,null,Re(e.options,r=>(F(),M("option",{key:r.value,class:"meme-option",value:r.value,selected:e.selected===r.value},Q(r.label),9,Vt))),128))],32))}});const Ut={version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 32 32"},Xt=b("title",null,"dice",-1),Yt=["fill"],jt=V({props:{color:{type:String,default:"#FF0000"}},emits:["click"],setup(e,{emit:a}){const l=e,t=U(()=>["transparent","#FFFFFF"].includes(l.color)?"gray":l.color),n=()=>{a("click")};return(r,i)=>(F(),Z(s(ee),{class:"dice-button",u:"icon",onClick:n},{default:Ye(()=>[(F(),M("svg",Ut,[Xt,b("path",{fill:s(t),d:"M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"},null,8,Yt)]))]),_:1}))}});const Wt={version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 32 32"},Ot=b("title",null,"picker",-1),Ht=["fill"],Gt=V({props:{color:{type:String,default:"#FF0000"}},emits:["click"],setup(e,{emit:a}){const l=e,t=U(()=>["transparent","#FFFFFF"].includes(l.color)?"gray":l.color),n=()=>{a("click")};return(r,i)=>(F(),Z(s(ee),{class:"picker-button",u:"icon",onClick:n},{default:Ye(()=>[(F(),M("svg",Wt,[Ot,b("path",{fill:s(t),d:"M30.828 1.172c-1.562-1.562-4.095-1.562-5.657 0l-5.379 5.379-3.793-3.793-4.243 4.243 3.326 3.326-14.754 14.754c-0.252 0.252-0.358 0.592-0.322 0.921h-0.008v5c0 0.552 0.448 1 1 1h5c0 0 0.083 0 0.125 0 0.288 0 0.576-0.11 0.795-0.329l14.754-14.754 3.326 3.326 4.243-4.243-3.793-3.793 5.379-5.379c1.562-1.562 1.562-4.095 0-5.657zM5.409 30h-3.409v-3.409l14.674-14.674 3.409 3.409-14.674 14.674z"},null,8,Ht)]))]),_:1}))}});const Kt={class:"property"},Oe=V({props:{max:null,size:null,color:null,align:null,direction:null},emits:["change","pick"],setup(e,{emit:a}){const l=e,t=se("text"),n=se("updateText"),{max:r,size:i,color:v,align:w,direction:D}=le(l),y=(g,p)=>{const h={max:r.value,size:i.value,color:v.value,align:w.value,direction:D.value};h[p]=["color","align","direction"].includes(p)?g:parseInt(g),a("change",h)},$=()=>{const g="#"+Math.floor(Math.random()*16777215).toString(16);y(g,"color")},T=()=>{a("pick")};return(g,p)=>(F(),M("div",Kt,[E(s(te),{class:"property-max",value:s(r),"onUpdate:modelValue":p[0]||(p[0]=h=>y(h,"max"))},null,8,["value"]),E(s(te),{class:"property-size",value:s(i),"onUpdate:modelValue":p[1]||(p[1]=h=>y(h,"size"))},null,8,["value"]),E(s(te),{class:"property-color",value:s(v),"onUpdate:modelValue":p[2]||(p[2]=h=>y(h,"color"))},null,8,["value"]),E(jt,{color:s(v),onClick:$},null,8,["color"]),E(Gt,{color:s(v),onClick:T},null,8,["color"]),E(s(ve),{label:"start",name:"align",value:"start",checked:s(w)==="start",onToggle:p[3]||(p[3]=h=>y(h,"align"))},null,8,["checked"]),E(s(ve),{label:"center",name:"align",value:"center",checked:s(w)==="center",onToggle:p[4]||(p[4]=h=>y(h,"align"))},null,8,["checked"]),E(s(ve),{class:"property-end",label:"end",name:"align",value:"end",checked:s(w)==="end",onToggle:p[5]||(p[5]=h=>y(h,"align"))},null,8,["checked"]),E(s(te),{class:"property-text",value:s(t),"onUpdate:modelValue":s(n)},null,8,["value","onUpdate:modelValue"]),E(s(ve),{label:"up",name:"direction",value:"up",checked:s(D)==="up",onToggle:p[6]||(p[6]=h=>y(h,"direction"))},null,8,["checked"]),E(s(ve),{label:"down",name:"direction",value:"down",checked:s(D)==="down",onToggle:p[7]||(p[7]=h=>y(h,"direction"))},null,8,["checked"])]))}}),Le=1.2,N=11,W=14,He=W*N,Ge=W*N,ue=W*N,Ke=W,qt=(()=>{const e=[];for(let a=1;a<N;a++)e.push([a,0,a,N]),e.push([0,a,N,a]);return e.map(a=>a.map(l=>l*W))})(),Jt=(e,a,l)=>{let t=0,n=e.length-1;for(;t<=n;){const r=Math.floor((t+n)/2),i=l.measureText(e.substring(0,r)).width,v=l.measureText(e.substring(0,r+1)).width;if(i<=a&&v>a)return r;i<a?t=r+1:n=r-1}return-1},Zt=(e,a,l)=>{const t=[];let n=0;for(;(n=Jt(e,a,l))!==-1;)t.push(e.substring(0,n)),e=e.substring(n);return e&&t.push(e),t},Pe=(e,a,l,t)=>{const{x:n,y:r,font:i,color:v,align:w,max:D,direction:y}=t;e.font=i||"32px sans-serif",e.fillStyle=v||"#000000",e.textAlign=w||"center";const $=D||a,T=i.match(/(\d{1,3})px/)||["","32"],g=Number(T[1]),p=Zt(l,$,e);p.forEach((h,x)=>{const I=y==="down"?x:x-(p.length-1);e.fillText(h,n,r+I*g*Le,$)})},Qt=e=>{e.imageSmoothingEnabled=!1,e.lineCap="round",e.beginPath(),e.strokeStyle="#000000",e.arc(N*W/2,N*W/2,N*W/2-1,0,Math.PI*2),e.stroke(),e.clip(),e.strokeStyle="#D6D6D6",qt.forEach(a=>{const{0:l,1:t,2:n,3:r}=a;e.moveTo(l,t),e.lineTo(n,r)}),e.stroke(),e.beginPath(),e.strokeStyle="#FF0000",e.rect((N-1)*W/2,(N-1)*W/2,1*W,1*W),e.stroke()},qe=(e,a,l,t)=>{a.style.left=`${l+Ke}px`,a.style.top=`${t+Ke}px`;const n=a.getContext("2d"),r=Math.min(Math.max(0,l-5),e.width-N),i=Math.min(Math.max(0,t-5),e.height-N);n.clearRect(0,0,He,Ge),n.drawImage(e,r,i,N,N,0,0,He,Ge),Qt(n)},Je=(e,a,l)=>{const n=`image/${["jpeg","jpg"].includes(a)?"jpeg":"png"}`,r=e.toDataURL(n),i=document.createElement("a");i.setAttribute("download",l),i.setAttribute("href",r),i.setAttribute("target","_blank"),i.click()};const ea={class:"container"},ta={class:"container-header"},aa={class:"container-title"},na={key:0,class:"container-wall"},oa={class:"container-wraper"},la=["width","height"],sa={class:"container-footer"},ra=V({props:{story:null},emits:["change","create","replace"],setup(e,{emit:a}){const t=le(e).story,n=k(null),r=k(null),i=k(null),v=k(!0),w=k(!0);let D=null;const y=k(!1),$=k(!1),T=k(null),g=k("\u91D1\u9986\u957F"),p=c=>{g.value=c,K()};re("text",g),re("updateText",p);const h=k(0),x=k(0),I=(c,f)=>{t.value.x=c,t.value.y=f},P=c=>{const{max:f,size:_,color:C,align:j,direction:H}=c;t.value.max=f,t.value.font=`${_}px sans-serif`,t.value.color=C,t.value.align=j,t.value.direction=H},B=U(()=>{const c=t.value.font.match(/(\d{1,3})px/)||["","32"];return Number(c[1])}),L=U(()=>{var C;return((C=t.value.image.split(";base64,")[0].match(/[a-z]+$/g))==null?void 0:C[0])||"png"}),ae=U(()=>`${t.value.title}.${L.value} ${h.value} * ${x.value} (${t.value.x}, ${t.value.y})`),pe=U(()=>{const c=t.value.max||h.value;return{start:0,center:Math.floor(c/2),end:c}[t.value.align]}),X=new Image,ne=()=>{X.onload=async()=>{const c=n.value;c.width=X.naturalWidth,c.height=X.naturalHeight,h.value=c.width,x.value=c.height,ye(),K(),ce()},X.onerror=c=>{console.error(c)},X.src=t.value.image},ye=()=>{const c=r.value;c.style.width=`${h.value}px`,c.style.height=`${x.value}px`},K=()=>{const c=n.value,f=c.getContext("2d");f.drawImage(X,0,0),Pe(f,c.width,g.value,t.value)},ce=()=>{const{x:c,y:f,max:_}=t.value,C=i.value;C.style.width=`${_}px`,C.style.height=`${B.value*Le}px`,C.style.top=`${f-B.value+2}px`,C.style.left=`${c-pe.value}px`};fe(t,(c,f)=>{c.mid!==f.mid?ne():(K(),ce())},{deep:!0});let q=0,J=0;const R=20;let O=!1;const xe=c=>{O=!0;const{clientX:f,clientY:_}=c;q=f,J=_},we=c=>{if(!O)return;const{clientX:f,clientY:_}=c,C=i.value,{width:j,height:H}=C.getBoundingClientRect();let o=C.offsetLeft+f-q,u=C.offsetTop+_-J;o<-R||u<-R||o>h.value-j+R||u>x.value-H+R?O=!1:(q=f,J=_),o=Math.max(Math.min(o,h.value-j+R),-R),u=Math.max(Math.min(u,x.value-H+R),-R),o+=pe.value,u+=B.value-2,I(o,u)},$e=()=>{!O||(O=!1)},Ce=()=>{v.value?v.value=!1:(v.value=!0,w.value=!0,D?(ge(D),D=null):ne())},Fe=()=>{const c=n.value,f=`imeme_${t.value.title}_${g.value}`;Je(c,L.value,f)},be=()=>{v.value?a("change",t.value):w.value||(a("create",t.value),v.value=!0,w.value=!0)},ke=({name:c,base64:f})=>{w.value=!1;const{mid:_,title:C,feature:j,image:H,x:o,y:u,max:d,font:m,color:S,align:z,direction:A,senior:Y}=t.value;D={mid:_,title:C,feature:j,image:H,x:o,y:u,max:d,font:m,color:S,align:z,direction:A,senior:Y};const oe=c.slice(0,c.lastIndexOf("."));ge({mid:`meme_${new Date().getTime()}`,title:oe,feature:oe,image:f,x:60,y:60,max:100,font:"32px sans-serif",color:"#FF0000",align:"start",direction:"down",senior:0})},ge=c=>{a("replace",c)},De=()=>{y.value=!0},Me=(c,f)=>{const _=n.value,C=T.value;qe(_,C,c,f)},Ee=async c=>{if(!y.value)return!1;const{offsetX:f,offsetY:_}=c;f<0||_<0||($.value=!0,Me(f,_))},Te=()=>{if(!y.value)return!1;$.value=!1},Ie=c=>{const f=o=>o.toString(16).padStart(2,"0"),{0:_,1:C,2:j,3:H}=c.data;return`#${f(_)}${f(C)}${f(j)}${f(H)}`.toUpperCase()},Be=(c,f)=>{const j=n.value.getContext("2d").getImageData(c,f,1,1);return Ie(j)},ie=c=>{if(!y.value)return!1;const{offsetX:f,offsetY:_}=c;if(f<0||_<0)return;const C=Be(f,_);t.value.color=C,$.value=!1,y.value=!1};return ze(()=>{ne()}),(c,f)=>(F(),M("div",ea,[b("div",ta,[b("div",aa,Q(s(ae)),1),E(s(ee),{label:v.value?"\u6DFB\u52A0":"\u53D6\u6D88\u6DFB\u52A0",u:"primary",onClick:Ce},null,8,["label"]),E(s(ee),{label:"\u4E0B\u8F7D",u:"primary",onClick:Fe})]),!v.value&&w.value?(F(),M("div",na,[E(s(Pt),{onChange:ke})])):(F(),M(he,{key:1},[b("div",oa,[b("canvas",{ref:(_,C)=>{C.canvasRef=_,n.value=_},class:de({"container-canvas":!0,"container-pointer":y.value}),onMousemove:Ee,onMouseleave:Te,onClick:ie},null,34),me(b("div",{class:"container-area",ref:(_,C)=>{C.areaRef=_,r.value=_},onMousemove:we,onMouseup:$e},[b("div",{class:"container-drag",ref:(_,C)=>{C.dragRef=_,i.value=_},onMousedown:xe},null,544)],544),[[_e,!y.value]]),me(b("canvas",{ref:(_,C)=>{C.layerRef=_,T.value=_},class:"container-layer",style:je({borderRadius:`${s(ue)}px`}),width:s(ue),height:s(ue)},null,12,la),[[_e,y.value&&$.value]])]),E(Oe,{max:s(t).max,color:s(t).color,size:s(B),align:s(t).align,direction:s(t).direction,onChange:P,onPick:De},null,8,["max","color","size","align","direction"])],64)),b("footer",sa,[E(s(ee),{label:v.value?"\u66F4\u65B0":"\u786E\u8BA4",u:"primary",onClick:be},null,8,["label"])])]))}});const ua={class:"feature-property"},ca=V({props:{width:null,height:null,ipath:null},emits:["change"],setup(e,{emit:a}){const l=e,t=se("text"),n=se("updateText"),r=se("paths"),{width:i,height:v,ipath:w}=le(l),D=(y,$)=>{const T={width:i.value,height:v.value,ipath:w.value};T[$]=["ipath"].includes($)?y:parseInt(y),a("change",T)};return(y,$)=>(F(),M("div",ua,[E(s(te),{class:"feature-property-size",value:s(i),"onUpdate:modelValue":$[0]||($[0]=T=>D(T,"width"))},null,8,["value"]),E(s(te),{class:"feature-property-size",value:s(v),"onUpdate:modelValue":$[1]||($[1]=T=>D(T,"height"))},null,8,["value"]),E(s(Nt),{class:"feature-property-path",options:s(r),selected:s(w),"onUpdate:modelValue":$[2]||($[2]=T=>D(T,"ipath"))},null,8,["options","selected"]),E(s(te),{class:"feature-property-text",value:s(t),"onUpdate:modelValue":s(n)},null,8,["value","onUpdate:modelValue"])]))}});const ia={class:"container"},da={class:"container-header"},va={class:"container-title"},pa=["onMousedown"],ga=["width","height"],ha={class:"container-footer"},fa=V({props:{feature:null},emits:["change"],setup(e,{emit:a}){const t=le(e).feature,n=k(null),r=k(null),i=k(null),v=k(!1),w=k(!1),D=k(null),y="\u91D1\u9986\u957F",$=k("\u91D1\u9986\u957F"),T=o=>{$.value=o,K()};re("text",$),re("updateText",T);const g=k(0),p=k(0),h=U(()=>t.value.type==="TEXT"),x=U(()=>{var o;if(h.value){const u=((o=t.value.et)==null?void 0:o.font.match(/(\d{1,3})px/))||["","32"];return Number(u[1])}return 0}),I=U(()=>{var m;return((m=t.value.story.image.split(";base64,")[0].match(/[a-z]+$/g))==null?void 0:m[0])||"png"}),P=U(()=>{const o=h.value?B.value:L.value;return`${t.value.story.title}.${I.value} ${g.value} * ${p.value} (${o.x}, ${o.y})`}),B=U(()=>t.value.et),L=U(()=>t.value.ei),ae=U(()=>{if(h.value){const o=B.value.max||g.value;return{start:0,center:Math.floor(o/2),end:o}[B.value.align]}return 0}),pe=o=>{const{max:u,size:d,color:m,align:S,direction:z}=o;t.value.et.max=u,t.value.et.font=`${d}px sans-serif`,t.value.et.color=m,t.value.et.align=S,t.value.et.direction=z},X=new Image,ne=()=>{X.onload=async()=>{const o=n.value;o.width=X.naturalWidth,o.height=X.naturalHeight,g.value=o.width,p.value=o.height,ye(),K(),ce()},X.onerror=o=>{console.error(o)},X.src=t.value.story.image},ye=()=>{const o=r.value;o.style.width=`${g.value}px`,o.style.height=`${p.value}px`},K=()=>{const o=n.value,u=o.getContext("2d");u.drawImage(X,0,0),u.save(),Pe(u,o.width,y,t.value.story),h.value&&(u.restore(),Pe(u,o.width,$.value,B.value))},ce=()=>{let o=0,u=0,d=0,m=0;if(h.value){const{x:z,y:A,max:Y}=B.value;o=Y,u=x.value*Le,d=A-x.value+2,m=z-ae.value}else{const{x:z,y:A,width:Y,height:oe}=L.value;o=Y,u=oe,d=A,m=z}const S=i.value;S.style.width=`${o}px`,S.style.height=`${u}px`,S.style.top=`${d}px`,S.style.left=`${m}px`};fe(t,(o,u)=>{o.mid!==u.mid?ne():(K(),ce())},{deep:!0});let q=0,J=0;const R=20;let O=!1;const xe=o=>{O=!0;const{clientX:u,clientY:d}=o;q=u,J=d},we=o=>{if(!O)return;const{clientX:u,clientY:d}=o,m=i.value,{width:S,height:z}=m.getBoundingClientRect();let A=m.offsetLeft+u-q,Y=m.offsetTop+d-J;A<-R||Y<-R||A>g.value-S+R||Y>p.value-z+R?O=!1:(q=u,J=d),A=Math.max(Math.min(A,g.value-S+R),-R),Y=Math.max(Math.min(Y,p.value-z+R),-R),$e(A,Y)},$e=(o,u)=>{h.value?(B.value.x=o+ae.value,B.value.y=u+x.value-2):(L.value.x=o,L.value.y=u)},Ce=()=>{!O||(O=!1)},Fe=()=>{const o=n.value,u=`imeme_${t.value.story.title}_${$.value}`;Je(o,I.value,u)},be=()=>{const{mid:o,type:u,et:d,ei:m}=t.value;a("change",{mid:o,type:u,options:h.value?d:m})},ke=()=>{v.value=!0},ge=(o,u)=>{const d=n.value,m=D.value;qe(d,m,o,u)},De=async o=>{if(!v.value)return!1;const{offsetX:u,offsetY:d}=o;u<0||d<0||(w.value=!0,ge(u,d))},Me=()=>{if(!v.value)return!1;w.value=!1},Ee=o=>{const u=A=>A.toString(16).padStart(2,"0"),{0:d,1:m,2:S,3:z}=o.data;return`#${u(d)}${u(m)}${u(S)}${u(z)}`.toUpperCase()},Te=(o,u)=>{const S=n.value.getContext("2d").getImageData(o,u,1,1);return Ee(S)},Ie=o=>{if(!v.value)return!1;const{offsetX:u,offsetY:d}=o;if(u<0||d<0)return;const m=Te(u,d);t.value.et.color=m,w.value=!1,v.value=!1},Be=k(null);let ie=0,c=0,f=!1;const _=o=>{f=!0;const{clientX:u,clientY:d}=o;ie=u,c=d},C=o=>{if(!f)return;const{clientX:u,clientY:d}=o,m=r.value,{x:S,y:z,width:A,height:Y}=m.getBoundingClientRect();if(u<S||d<z||u>S+A||d>z+Y){f=!1;return}const oe=u-ie,Qe=d-c,{width:et,height:tt}=L.value,Ve=i.value;Ve.style.width=`${et+oe}px`,Ve.style.height=`${tt+Qe}px`},j=o=>{if(!f)return;f=!1;const{clientX:u,clientY:d}=o,m=u-ie,S=d-c,{width:z,height:A}=L.value;L.value.width=z+m,L.value.height=A+S},H=o=>{const{width:u,height:d,ipath:m}=o;t.value.ei.width=u,t.value.ei.height=d,t.value.ei.ipath=m};return ze(()=>{ne()}),(o,u)=>(F(),M("div",ia,[b("div",da,[b("div",va,Q(s(P)),1),E(s(ee),{label:"\u4E0B\u8F7D",u:"primary",onClick:Fe})]),b("div",{class:"container-wraper",onMousemove:C,onMouseup:j},[b("canvas",{ref:(d,m)=>{m.canvasRef=d,n.value=d},class:de({"container-canvas":!0,"container-pointer":v.value}),onMousemove:De,onMouseleave:Me,onClick:Ie},null,34),me(b("div",{class:"container-area",ref:(d,m)=>{m.areaRef=d,r.value=d},onMousemove:we,onMouseup:Ce},[b("div",{class:"container-drag",ref:(d,m)=>{m.dragRef=d,i.value=d},onMousedown:xe},[s(h)?Ae("",!0):(F(),M("div",{key:0,ref:(d,m)=>{m.cornerRef=d,Be.value=d},class:"container-drag-corner",onMousedown:dt(_,["stop","prevent"])},null,40,pa))],544)],544),[[_e,!v.value]]),me(b("canvas",{ref:(d,m)=>{m.layerRef=d,D.value=d},class:"container-layer",style:je({borderRadius:`${s(ue)}px`}),width:s(ue),height:s(ue)},null,12,ga),[[_e,v.value&&w.value]])],32),s(h)?(F(),Z(Oe,{key:0,max:s(B).max,color:s(B).color,size:s(x),align:s(B).align,direction:s(B).direction,onChange:pe,onPick:ke},null,8,["max","color","size","align","direction"])):(F(),Z(ca,{key:1,width:s(L).width,height:s(L).height,ipath:s(L).ipath,onChange:H},null,8,["width","height","ipath"])),b("footer",ha,[E(s(ee),{label:"\u66F4\u65B0",u:"primary",onClick:be})])]))}}),Ze={getCatalog:{url:"/image/catalog",method:"get"},openImage:{url:"/image/open",method:"get"},saveImage:{url:"/image/save",method:"post"},createImage:{url:"/image/create",method:"post"},getCommands:{url:"/image/commands",method:"get"},getFeatureImage:{url:"/image/feature/open",method:"get"},saveFeatureImage:{url:"/image/feature/save",method:"post"}},ma=()=>"https://imeme.vercel.app";var _a=e=>async(a={},l={})=>{const{url:t,method:n}=e,r=ma();return vt.request({withCredentials:!1,url:r+t,method:n,[n==="get"?"params":"data"]:a}).then(i=>{const v=i.data;return(l==null?void 0:l.stream)?i:v.errNo===0?v.data:Promise.reject(v)}).catch(i=>Promise.reject(i))};const G={};for(const e in Ze)G[e]=_a(Ze[e]);const ya={class:"image-wrap"},xa=V({setup(e){const a=k([]),l=k(""),t=k("");let n=k({mid:"",title:"",feature:"",image:"",x:0,y:0,max:100,font:"32px sans-serif",color:"#FFFFFF",align:"start",direction:"down",senior:0}),r=k({mid:"",feature:"",type:"",story:n});const i=async()=>{const x=await G.getCatalog({});a.value=x},v=({type:x,child:I})=>{l.value!==I.mid&&(l.value=I.mid,t.value=x)};fe([l,t],()=>{w(l.value,t.value)});const w=(x,I)=>{p.value?G.openImage({mid:x,type:I}).then(P=>{n.value=P}):G.getFeatureImage({mid:x}).then(P=>{r.value=P})},D=x=>{const I=Xe(Se({},x),{image:""});G.saveImage(I)},y=x=>{n.value=x},$=async x=>{const I=await G.createImage(x).catch(P=>{alert(P.message)});await i(),l.value=I.mid},T=k([]);re("commands",T),re("paths",[{label:"ABC",value:"abc"},{label:"SVG",value:"SVG"},{label:"rfc",value:"rfc"}]);const g=async()=>{const x=await G.getCommands({});T.value=x},p=U(()=>["STORY","SERIES","SPECIAL"].includes(t.value)),h=({mid:x,type:I,options:P})=>{I==="TEXT"?G.saveImage(P):G.saveFeatureImage(Se({mid:x,type:I},P))};return ze(()=>{i(),g()}),(x,I)=>(F(),M("div",ya,[E(Ct,{current:l.value,"catalog-list":a.value,onChange:v},null,8,["current","catalog-list"]),s(p)&&s(n).image&&s(n).mid?(F(),Z(ra,{key:0,story:s(n),onChange:D,onReplace:y,onCreate:$},null,8,["story"])):Ae("",!0),t.value==="FEATURE"&&s(r).mid?(F(),Z(fa,{key:1,feature:s(r),onChange:h},null,8,["feature"])):Ae("",!0)]))}});const wa={class:"material-center"},$a=V({setup(e){return(a,l)=>(F(),M("div",wa," \u4EC0\u4E48\u90FD\u6CA1\u6709\u7684\u8352\u539F "))}}),Ca=[{path:"/",component:xa},{path:"/center",component:$a}],Fa=pt({history:gt(),routes:Ca});ht(yt).use(Fa).mount("#app");