import{ac as te,aY as x,cc as se,aW as ie,d as T,bu as oe,ad as ne,b6 as re,d6 as ce,r as c,am as u,be as y,ab as ue,e as de,o as n,c as d,ah as z,f as $,t as ve,a,V as g,F as A,ai as fe,i as p,B as ye,w as pe,ax as me,af as ge,ay as we,d7 as he,aZ as _e,d8 as be,cC as M,d9 as Se,da as ke,ak as xe,__tla as ze}from"./index-IVPz-ih6.js";import{E as Ee,__tla as Be}from"./el-image-viewer-CT2z8sww.js";let Y,Ce=Promise.all([(()=>{try{return ze}catch{}})(),(()=>{try{return Be}catch{}})()]).then(async()=>{const P=te({hideOnClickModal:Boolean,src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:Boolean,scrollContainer:{type:x([String,Object])},previewSrcList:{type:x(Array),default:()=>se([])},previewTeleported:Boolean,zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:x(String)}}),R={load:i=>i instanceof Event,error:i=>i instanceof Event,switch:i=>ie(i),close:()=>!0,show:()=>!0},j=["src","loading","crossorigin"],q={key:0},F=T({name:"ElImage",inheritAttrs:!1});Y=xe(ge(T({...F,props:P,emits:R,setup(i,{emit:v}){const l=i;let E="";const{t:D}=oe(),o=ne("image"),H=re(),K=ce(),w=c(),f=c(!1),r=c(!0),h=c(!1),m=c(),s=c(),V=y&&"loading"in HTMLImageElement.prototype;let _,b;const W=u(()=>[o.e("inner"),S.value&&o.e("preview"),r.value&&o.is("loading")]),Z=u(()=>H.style),G=u(()=>{const{fit:e}=l;return y&&e?{objectFit:e}:{}}),S=u(()=>{const{previewSrcList:e}=l;return Array.isArray(e)&&e.length>0}),J=u(()=>{const{previewSrcList:e,initialIndex:t}=l;let O=t;return t>e.length-1&&(O=0),O}),B=u(()=>l.loading!=="eager"&&(!V&&l.loading==="lazy"||l.lazy)),k=()=>{y&&(r.value=!0,f.value=!1,w.value=l.src)};function Q(e){r.value=!1,f.value=!1,v("load",e)}function U(e){r.value=!1,f.value=!0,v("error",e)}function C(){Se(m.value,s.value)&&(k(),N())}const I=ke(C,200,!0);async function L(){var e;if(!y)return;await we();const{scrollContainer:t}=l;he(t)?s.value=t:_e(t)&&t!==""?s.value=(e=document.querySelector(t))!=null?e:void 0:m.value&&(s.value=be(m.value)),s.value&&(_=M(s,"scroll",I),setTimeout(()=>C(),100))}function N(){y&&s.value&&I&&(_==null||_(),s.value=void 0)}function X(e){if(e.ctrlKey)return e.deltaY<0||e.deltaY>0?(e.preventDefault(),!1):void 0}function ee(){S.value&&(b=M("wheel",X,{passive:!1}),E=document.body.style.overflow,document.body.style.overflow="hidden",h.value=!0,v("show"))}function ae(){b==null||b(),document.body.style.overflow=E,h.value=!1,v("close")}function le(e){v("switch",e)}return ue(()=>l.src,()=>{B.value?(r.value=!0,f.value=!1,N(),L()):k()}),de(()=>{B.value?L():k()}),(e,t)=>(n(),d("div",{ref_key:"container",ref:m,class:g([a(o).b(),e.$attrs.class]),style:me(a(Z))},[f.value?z(e.$slots,"error",{key:0},()=>[$("div",{class:g(a(o).e("error"))},ve(a(D)("el.image.error")),3)]):(n(),d(A,{key:1},[w.value!==void 0?(n(),d("img",fe({key:0},a(K),{src:w.value,loading:e.loading,style:a(G),class:a(W),crossorigin:e.crossorigin,onClick:ee,onLoad:Q,onError:U}),null,16,j)):p("v-if",!0),r.value?(n(),d("div",{key:1,class:g(a(o).e("wrapper"))},[z(e.$slots,"placeholder",{},()=>[$("div",{class:g(a(o).e("placeholder"))},null,2)])],2)):p("v-if",!0)],64)),a(S)?(n(),d(A,{key:2},[h.value?(n(),ye(a(Ee),{key:0,"z-index":e.zIndex,"initial-index":a(J),infinite:e.infinite,"zoom-rate":e.zoomRate,"min-scale":e.minScale,"max-scale":e.maxScale,"url-list":e.previewSrcList,"hide-on-click-modal":e.hideOnClickModal,teleported:e.previewTeleported,"close-on-press-escape":e.closeOnPressEscape,onClose:ae,onSwitch:le},{default:pe(()=>[e.$slots.viewer?(n(),d("div",q,[z(e.$slots,"viewer")])):p("v-if",!0)]),_:3},8,["z-index","initial-index","infinite","zoom-rate","min-scale","max-scale","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):p("v-if",!0)],64)):p("v-if",!0)],6))}}),[["__file","image.vue"]]))});export{Y as E,Ce as __tla};
