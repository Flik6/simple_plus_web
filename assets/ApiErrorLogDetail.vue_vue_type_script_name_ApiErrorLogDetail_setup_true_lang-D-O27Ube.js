import{_ as k,__tla as A}from"./Dialog.vue_vue_type_style_index_0_lang-DMbm9tVa.js";import{d as h,r as p,o as c,B as d,w as l,g as t,h as s,t as _,a as e,i as m,v as E,T as P,__tla as V}from"./index-IVPz-ih6.js";import{E as g,a as w,__tla as q}from"./el-descriptions-item-BLzYZdY5.js";import{_ as N,__tla as O}from"./DictTag.vue_vue_type_script_lang-DIYyjTgv.js";import{D as T,__tla as D}from"./dict-Dn71ph6d.js";import{f as v,__tla as L}from"./formatTime-C0hHcWKm.js";let x,z=Promise.all([(()=>{try{return A}catch{}})(),(()=>{try{return V}catch{}})(),(()=>{try{return q}catch{}})(),(()=>{try{return O}catch{}})(),(()=>{try{return D}catch{}})(),(()=>{try{return L}catch{}})()]).then(async()=>{let i;i=h({name:"ApiErrorLogDetail"}),x=h({...i,setup(B,{expose:S}){const u=p(!1),f=p(!1),a=p();return S({open:async y=>{u.value=!0,f.value=!0;try{a.value=y}finally{f.value=!1}}}),(y,o)=>{const r=g,b=N,I=P,U=w,R=k;return c(),d(R,{modelValue:e(u),"onUpdate:modelValue":o[1]||(o[1]=n=>E(u)?u.value=n:null),"max-height":500,scroll:!0,title:"\u8BE6\u60C5",width:"800"},{default:l(()=>[t(U,{column:1,border:""},{default:l(()=>[t(r,{label:"\u65E5\u5FD7\u4E3B\u952E","min-width":"120"},{default:l(()=>[s(_(e(a).id),1)]),_:1}),t(r,{label:"\u94FE\u8DEF\u8FFD\u8E2A"},{default:l(()=>[s(_(e(a).traceId),1)]),_:1}),t(r,{label:"\u5E94\u7528\u540D"},{default:l(()=>[s(_(e(a).applicationName),1)]),_:1}),t(r,{label:"\u7528\u6237\u7F16\u53F7"},{default:l(()=>[s(_(e(a).userId)+" ",1),t(b,{type:e(T).USER_TYPE,value:e(a).userType},null,8,["type","value"])]),_:1}),t(r,{label:"\u7528\u6237 IP"},{default:l(()=>[s(_(e(a).userIp),1)]),_:1}),t(r,{label:"\u7528\u6237 UA"},{default:l(()=>[s(_(e(a).userAgent),1)]),_:1}),t(r,{label:"\u8BF7\u6C42\u4FE1\u606F"},{default:l(()=>[s(_(e(a).requestMethod)+" "+_(e(a).requestUrl),1)]),_:1}),t(r,{label:"\u8BF7\u6C42\u53C2\u6570"},{default:l(()=>[s(_(e(a).requestParams),1)]),_:1}),t(r,{label:"\u5F02\u5E38\u65F6\u95F4"},{default:l(()=>[s(_(e(v)(e(a).exceptionTime)),1)]),_:1}),t(r,{label:"\u5F02\u5E38\u540D"},{default:l(()=>[s(_(e(a).exceptionName),1)]),_:1}),e(a).exceptionStackTrace?(c(),d(r,{key:0,label:"\u5F02\u5E38\u5806\u6808"},{default:l(()=>[t(I,{modelValue:e(a).exceptionStackTrace,"onUpdate:modelValue":o[0]||(o[0]=n=>e(a).exceptionStackTrace=n),autosize:{maxRows:20},readonly:!0,type:"textarea"},null,8,["modelValue"])]),_:1})):m("",!0),t(r,{label:"\u5904\u7406\u72B6\u6001"},{default:l(()=>[t(b,{type:e(T).INFRA_API_ERROR_LOG_PROCESS_STATUS,value:e(a).processStatus},null,8,["type","value"])]),_:1}),e(a).processUserId?(c(),d(r,{key:1,label:"\u5904\u7406\u4EBA"},{default:l(()=>[s(_(e(a).processUserId),1)]),_:1})):m("",!0),e(a).processTime?(c(),d(r,{key:2,label:"\u5904\u7406\u65F6\u95F4"},{default:l(()=>[s(_(e(v)(e(a).processTime)),1)]),_:1})):m("",!0)]),_:1})]),_:1},8,["modelValue"])}}})});export{x as _,z as __tla};
