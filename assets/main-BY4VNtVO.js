import{d as V,am as x,r as T,ab as I,a as r,o as M,B as N,w as l,g as e,h as s,v as c,_ as P,n as R,x as j,y as B,__tla as S}from"./index-IVPz-ih6.js";import{N as W,R as n,c as h,T as k,__tla as q}from"./TabNews-7lFhmGhl.js";import{_ as z,__tla as A}from"./TabText.vue_vue_type_script_setup_true_lang-FZOwhrck.js";import C,{__tla as D}from"./TabImage-CjsaGmsb.js";import E,{__tla as F}from"./TabVoice-E-8fax0d.js";import G,{__tla as H}from"./TabVideo-lAzWvoSj.js";import{_ as J,__tla as K}from"./TabMusic.vue_vue_type_script_setup_true_lang-D9XWXdQT.js";import{_ as L}from"./_plugin-vue_export-helper-BCo6x5W8.js";import{__tla as O}from"./main-Ba5sMQyK.js";import{__tla as Q}from"./el-image-BULbPLoM.js";import{__tla as X}from"./el-image-viewer-CT2z8sww.js";import{__tla as Y}from"./main-28XtDDVt.js";import{__tla as Z}from"./index-COlqYmNt.js";import{__tla as $}from"./main-D879jax-.js";import{__tla as ee}from"./main.vue_vue_type_script_setup_true_name_WxVideoPlayer_lang-Ki_2MbjD.js";import{__tla as ae}from"./index-Swwcq6JT.js";import{__tla as le}from"./index-DjoqVO4Z.js";import{__tla as te}from"./formatTime-C0hHcWKm.js";import{__tla as re}from"./useUpload-DtMdKT6C.js";import{__tla as _e}from"./useMessage-DmGM48R-.js";let v,oe=Promise.all([(()=>{try{return S}catch{}})(),(()=>{try{return q}catch{}})(),(()=>{try{return A}catch{}})(),(()=>{try{return D}catch{}})(),(()=>{try{return F}catch{}})(),(()=>{try{return H}catch{}})(),(()=>{try{return K}catch{}})(),(()=>{try{return O}catch{}})(),(()=>{try{return Q}catch{}})(),(()=>{try{return X}catch{}})(),(()=>{try{return Y}catch{}})(),(()=>{try{return Z}catch{}})(),(()=>{try{return $}catch{}})(),(()=>{try{return ee}catch{}})(),(()=>{try{return ae}catch{}})(),(()=>{try{return le}catch{}})(),(()=>{try{return te}catch{}})(),(()=>{try{return re}catch{}})(),(()=>{try{return _e}catch{}})()]).then(async()=>{let p;p=V({name:"WxReplySelect"}),v=L(V({...p,props:{modelValue:{},newsType:{default:()=>W.Published}},emits:["update:modelValue"],setup(g,{expose:b,emit:U}){const f=g,a=x({get:()=>f.modelValue,set:u=>U("update:modelValue",u)}),y=new Map,i=T(f.modelValue.type||n.Text);return I(i,(u,t)=>{if(t===void 0||u===void 0)return;y.set(t,r(a));const o=y.get(u);if(o)a.value=o;else{let m=h(a);m.type=u,a.value=m}},{immediate:!0}),b({clear:()=>{a.value=h(a)}}),(u,t)=>{const o=P,m=R,d=j,w=B;return M(),N(w,{type:"border-card",modelValue:r(i),"onUpdate:modelValue":t[6]||(t[6]=_=>c(i)?i.value=_:null)},{default:l(()=>[e(d,{name:r(n).Text},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:document"}),s(" \u6587\u672C")]),_:1})]),default:l(()=>[e(z,{modelValue:r(a).content,"onUpdate:modelValue":t[0]||(t[0]=_=>r(a).content=_)},null,8,["modelValue"])]),_:1},8,["name"]),e(d,{name:r(n).Image},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:picture",class:"mr-5px"}),s(" \u56FE\u7247")]),_:1})]),default:l(()=>[e(C,{modelValue:r(a),"onUpdate:modelValue":t[1]||(t[1]=_=>c(a)?a.value=_:null)},null,8,["modelValue"])]),_:1},8,["name"]),e(d,{name:r(n).Voice},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:phone"}),s(" \u8BED\u97F3")]),_:1})]),default:l(()=>[e(E,{modelValue:r(a),"onUpdate:modelValue":t[2]||(t[2]=_=>c(a)?a.value=_:null)},null,8,["modelValue"])]),_:1},8,["name"]),e(d,{name:r(n).Video},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:share"}),s(" \u89C6\u9891")]),_:1})]),default:l(()=>[e(G,{modelValue:r(a),"onUpdate:modelValue":t[3]||(t[3]=_=>c(a)?a.value=_:null)},null,8,["modelValue"])]),_:1},8,["name"]),e(d,{name:r(n).News},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:reading"}),s(" \u56FE\u6587")]),_:1})]),default:l(()=>[e(k,{modelValue:r(a),"onUpdate:modelValue":t[4]||(t[4]=_=>c(a)?a.value=_:null),"news-type":u.newsType},null,8,["modelValue","news-type"])]),_:1},8,["name"]),e(d,{name:r(n).Music},{label:l(()=>[e(m,{align:"middle"},{default:l(()=>[e(o,{icon:"ep:service"}),s("\u97F3\u4E50")]),_:1})]),default:l(()=>[e(J,{modelValue:r(a),"onUpdate:modelValue":t[5]||(t[5]=_=>c(a)?a.value=_:null)},null,8,["modelValue"])]),_:1},8,["name"])]),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-73e7c794"]])});export{oe as __tla,v as default};
