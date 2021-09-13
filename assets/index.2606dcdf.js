import{d as e,r as l,o as A,c as t,F as a,a as o,b as n,t as s,e as r,n as g,w as i,f as u,g as B,v as c,h as d,u as m,i as p,j as y,k as C,l as v,m as Q}from"./vendor.3d8823d3.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver((e=>{for(const A of e)if("childList"===A.type)for(const e of A.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&l(e)})).observe(document,{childList:!0,subtree:!0})}function l(e){if(e.ep)return;e.ep=!0;const l=function(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerpolicy&&(l.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?l.credentials="include":"anonymous"===e.crossorigin?l.credentials="omit":l.credentials="same-origin",l}(e);fetch(e.href,l)}}();const h={class:"side"},I={class:"side-content-title"},Y=["onClick"];var f=e({emits:["change"],setup(e,{emit:r}){const g=l([]);return(()=>{const e=[{id:"meme_common",text:"common",children:[{mid:"meme_1630929517998",title:"happy"},{mid:"meme_1630929517999",title:"fans"},{mid:"meme_1630929518000",title:"weekly1"}]},{id:"meme_mid",text:"autumn",children:[{mid:"meme_1630929518006",title:"new life"},{mid:"meme_1630929518007",title:"happy chicken"},{mid:"meme_1630929518008",title:"moon cake"}]}];setTimeout((()=>{g.value=e}),500)})(),(e,l)=>(A(),t("div",h,[(A(!0),t(a,null,o(g.value,(e=>(A(),t("div",{key:e.id,class:"side-content"},[n("p",I,s(e.text),1),(A(!0),t(a,null,o(e.children,(e=>(A(),t("div",{key:e.mid,class:"side-content-cell",onClick:l=>(e=>{r("change",e.mid)})(e)},s(e.title),9,Y)))),128))])))),128))]))}}),w=e({name:"Button",props:{label:{type:String,default:"提交"},disabled:{type:Boolean,default:!1}},setup(e){const{label:l}=r(e);return{localLabel:l}}});w.render=function(e,l,a,o,n,r){return A(),t("button",{class:g(["meme-button",{disabled:e.disabled}])},s(e.localLabel),3)};var x=e({name:"Input",props:{modelValue:{type:String,default:""},title:{type:String,default:""},disabled:{type:Boolean,default:!1}},emits:["update:modelValue","blur"],setup(e,{emit:A}){const t=l(null);return{input:t,blur:e=>{(e=>{A("update:modelValue",e.target.value)})(e),A("blur")}}}});const M=["title","value"];x.render=function(e,l,a,o,n,s){return A(),t("input",{ref:"input",class:g(["meme-input",{disabled:e.disabled}]),title:e.title,value:e.modelValue,onBlur:l[0]||(l[0]=(...l)=>e.blur&&e.blur(...l)),onKeyup:l[1]||(l[1]=i((l=>{var A;return null==(A=e.input)?void 0:A.blur()}),["enter"]))},null,42,M)};var D=e({name:"Loading",props:{show:{type:Boolean,default:!0},min:{type:Number,default:500},interval:{type:Number,default:300}},created(){this.showChange(this.show)},setup(e){const{show:A,interval:t,min:a}=r(e),o=l(A.value);let n,s=0;const g=e=>{e?0===t.value?(o.value=!0,s=(new Date).getTime()):n=window.setTimeout((()=>{o.value=!0,s=(new Date).getTime()}),t.value):(clearTimeout(n),(()=>{const e=(new Date).getTime()-s;e>a.value?o.value=!1:setTimeout((()=>{o.value=!1}),Math.max(a.value-e,0))})())};return u(A,(()=>{g(A.value)})),{localShow:o,showChange:g}}});const E={class:"meme-loading"},G=[n("div",{class:"meme-loading-wrap"},[n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"41",height:"41",viewBox:"0 0 32 32",class:"meme-loading-spinner"},[n("path",{d:"M32 16a15.832 15.832 0 0 0-4.864-11.137 15.717 15.717 0 0 0-5.156-3.302A15.512 15.512 0 0 0 15.999.5 15.335 15.335 0 0 0 5.216 5.216a15.23 15.23 0 0 0-3.193 4.994A15.027 15.027 0 0 0 1 16a14.92 14.92 0 0 0 1.254 5.694A14.84 14.84 0 0 0 5.57 26.43a14.708 14.708 0 0 0 4.832 3.085A14.534 14.534 0 0 0 16 30.5c1.897-.04 3.78-.455 5.502-1.216a14.346 14.346 0 0 0 4.574-3.208 14.213 14.213 0 0 0 2.977-4.67c.407-1.046.684-2.137.829-3.244a2 2 0 0 0 2.111-2.163H32zm-3.178 5.311c-.733 1.663-1.796 3.169-3.099 4.412s-2.844 2.225-4.508 2.868A13.536 13.536 0 0 1 16 29.5a13.328 13.328 0 0 1-9.369-4.131 13.246 13.246 0 0 1-2.76-4.346 13.048 13.048 0 0 1 .231-9.952c.683-1.541 1.672-2.937 2.883-4.088s2.642-2.058 4.184-2.652a12.539 12.539 0 0 1 9.568.231c1.48.658 2.82 1.609 3.926 2.774s1.975 2.54 2.543 4.021c.57 1.481.837 3.064.794 4.641h.007a2 2 0 0 0 1.777 2.155 13.829 13.829 0 0 1-.962 3.156z"})])],-1)];D.render=function(e,l,a,o,n,s){return B((A(),t("div",E,G,512)),[[c,e.localShow]])};const U={class:"property"};var V=e({props:{max:{type:Number,required:!0},size:{type:Number,required:!0},color:{type:String,required:!0}},emits:["change"],setup(e,{emit:a}){const o=e,{max:n,size:s,color:g}=r(o);console.log("property: ",n.value,s.value,g.value);const i=l(n.value+""),B=l(s.value+""),c=l(g.value);return u([i,B,c],((e,l)=>{console.log(e,l),a("change",{max:i.value,size:B.value,color:c.value})})),(e,l)=>(A(),t("div",U,[d(m(x),{class:"property-max",modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=e=>i.value=e)},null,8,["modelValue"]),d(m(x),{class:"property-size",modelValue:B.value,"onUpdate:modelValue":l[1]||(l[1]=e=>B.value=e)},null,8,["modelValue"]),d(m(x),{class:"property-color",modelValue:c.value,"onUpdate:modelValue":l[2]||(l[2]=e=>c.value=e)},null,8,["modelValue"])]))}});const b={class:"container"},W={class:"container-header"},H={class:"container-title"},K={class:"container-wraper"},q={class:"container-footer"};var k=e({props:{story:{type:null,required:!0}},emits:["change"],setup(e,{emit:a}){const o=r(e).story,g=l(null),i=l(null),B=l(null),c=l("测试文本"),C=l(0),v=l(0),Q=()=>{console.log("你说更新就更新")},h=()=>{a("change",o.value)},I=e=>{console.log("propertyChange",e)},Y=p((()=>{const e=o.value.font.match(/(\d{1,3})px/)||["","32"];return 1*Number(e[1])})),f=new Image,x=()=>{const e=g.value,l=e.getContext("2d");l.drawImage(f,0,0);const{x:A,y:t,font:a,color:n,align:s,max:r}=o.value;console.log("renderImage: ",A,t),l.font=a,l.fillStyle=n,l.textAlign=s,l.textBaseline="top",l.fillText(c.value,A,t,r||e.width)};u(o,((e,l)=>{console.log("update story: ",e,l),x()}),{deep:!0});const M=()=>{const e=i.value;e.style.width=`${C.value}px`,e.style.height=`${v.value}px`;const{x:l,y:A,color:t,max:a}=o.value,n=B.value;n.style.width=`${a||100}px`,n.style.height=`${Y.value}px`,n.style.top=`${A}px`,n.style.left=`${l}px`,n.style.borderColor=t||"#FF0000"};let D=0,E=0;const G=10;let U=!1;const k=e=>{U=!0;const{clientX:l,clientY:A}=e;D=l,E=A},F=e=>{if(!U)return;const{clientX:l,clientY:A}=e,t=B.value;let a=t.offsetLeft+l-D,n=t.offsetTop+A-E;const{width:s,height:r}=t.getBoundingClientRect();a<-10||n<-10||a>C.value-s+G||n>v.value-r+G?U=!1:(D=l,E=A),a=Math.max(Math.min(a,C.value-s+G),-10),n=Math.max(Math.min(n,v.value-r+G),-10),t.style.top=`${n}px`,t.style.left=`${a}px`,((e,l)=>{o.value.x=e,o.value.y=l})(a,n)},J=()=>{U&&(U=!1)};return y((()=>{f.onload=async()=>{const e=g.value;e.width=f.naturalWidth,e.height=f.naturalHeight,console.log("width: ",e.width,e.height),C.value=e.width,v.value=e.height,x(),M()},f.onerror=e=>{console.error(e)},f.src=o.value.image})),(e,l)=>(A(),t("div",b,[n("div",W,[n("div",H,s(m(o).title),1),d(m(w),{label:"添加",u:"primary",onClick:Q})]),n("div",K,[n("canvas",{class:"container-canvas",ref:(e,l)=>{l.canvasRef=e,g.value=e}},null,512),n("div",{class:"container-area",ref:(e,l)=>{l.areaRef=e,i.value=e},onMousemove:F,onMouseup:J},[n("div",{class:"container-drag",ref:(e,l)=>{l.dragRef=e,B.value=e},onMousedown:k},null,544)],544)]),d(V,{max:m(o).max,color:m(o).color,size:m(Y),onChange:I},null,8,["max","color","size"]),n("footer",q,[d(m(w),{label:"更新",u:"primary",onClick:h})])]))}});const F={class:"image-wrap"};var J=e({setup(e){const a=l(""),o=C({mid:"meme_1234567890",title:"测试说明",feature:"测试字段",image:"data:image/png;base64,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",x:20,y:40,max:200,font:"32px sans-serif",color:"#FFFFFF",align:"start"}),n=e=>{a.value!==e&&(a.value=e)};u(a,((e,l)=>{var A;console.log(`new: ${e}, old: ${l}`),A=e,console.log(A)}));const s=e=>{console.log("story change value: ",e)};return(e,l)=>(A(),t("div",F,[d(f,{onChange:n}),d(k,{story:m(o),onChange:s},null,8,["story"])]))}});Q(e({setup:e=>(e,l)=>(A(),v(J))})).mount("#app");
