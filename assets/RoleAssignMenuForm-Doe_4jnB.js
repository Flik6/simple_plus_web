import{d as C,k as D,r as o,z as L,o as V,B as g,w as l,g as t,a as u,h as i,A as $,t as I,v as y,E as q,D as P,b$ as G,de as J,I as O,H as Q,L as T,__tla as W}from"./index-IVPz-ih6.js";import{_ as X,__tla as Y}from"./Dialog.vue_vue_type_style_index_0_lang-DMbm9tVa.js";import{E as Z,__tla as ee}from"./el-card-Cr59IUNy.js";import{d as ae,h as le}from"./tree-CxUbcu7T.js";import{g as te,__tla as se}from"./index-Dup_PxNI.js";import{g as ue,a as de,__tla as oe}from"./index-BGUT0iQU.js";import{u as re,__tla as ne}from"./useMessage-DmGM48R-.js";import{_ as ce}from"./_plugin-vue_export-helper-BCo6x5W8.js";let w,me=Promise.all([(()=>{try{return W}catch{}})(),(()=>{try{return Y}catch{}})(),(()=>{try{return ee}catch{}})(),(()=>{try{return se}catch{}})(),(()=>{try{return oe}catch{}})(),(()=>{try{return ne}catch{}})()]).then(async()=>{let k;k=C({name:"SystemRoleAssignMenuForm"}),w=ce(C({...k,emits:["success"],setup(ie,{expose:E,emit:R}){const{t:U}=D(),H=re(),r=o(!1),n=o(!1),s=L({id:0,name:"",code:"",menuIds:[]}),f=o(),p=o([]),c=o(!1),d=o(),_=o(!1);E({open:async a=>{r.value=!0,F(),p.value=le(await te()),s.id=a.id,s.name=a.name,s.code=a.code,n.value=!0;try{s.value.menuIds=await ue(a.id),s.value.menuIds.forEach(e=>{d.value.setChecked(e,!0,!1)})}finally{n.value=!1}}});const A=async()=>{if(f&&await f.value.validate()){n.value=!0;try{const a={roleId:s.id,menuIds:[...d.value.getCheckedKeys(!1),...d.value.getHalfCheckedKeys()]};await de(a),H.success(U("common.updateSuccess")),r.value=!1,R("success")}finally{n.value=!1}}},F=()=>{var a,e;_.value=!1,c.value=!1,s.value={id:0,name:"",code:"",menuIds:[]},(a=d.value)==null||a.setCheckedNodes([]),(e=f.value)==null||e.resetFields()},K=()=>{d.value.setCheckedNodes(_.value?p.value:[])},M=()=>{var e;const a=(e=d.value)==null?void 0:e.store.nodesMap;for(let v in a)a[v].expanded!==c.value&&(a[v].expanded=c.value)};return(a,e)=>{const v=q,h=P,x=G,N=J,S=Z,j=O,b=Q,z=X,B=T;return V(),g(z,{modelValue:u(r),"onUpdate:modelValue":e[3]||(e[3]=m=>y(r)?r.value=m:null),title:"\u83DC\u5355\u6743\u9650"},{footer:l(()=>[t(b,{disabled:u(n),type:"primary",onClick:A},{default:l(()=>[i("\u786E \u5B9A")]),_:1},8,["disabled"]),t(b,{onClick:e[2]||(e[2]=m=>r.value=!1)},{default:l(()=>[i("\u53D6 \u6D88")]),_:1})]),default:l(()=>[$((V(),g(j,{ref_key:"formRef",ref:f,model:u(s),"label-width":"80px"},{default:l(()=>[t(h,{label:"\u89D2\u8272\u540D\u79F0"},{default:l(()=>[t(v,null,{default:l(()=>[i(I(u(s).name),1)]),_:1})]),_:1}),t(h,{label:"\u89D2\u8272\u6807\u8BC6"},{default:l(()=>[t(v,null,{default:l(()=>[i(I(u(s).code),1)]),_:1})]),_:1}),t(h,{label:"\u83DC\u5355\u6743\u9650"},{default:l(()=>[t(S,{class:"cardHeight"},{header:l(()=>[i(" \u5168\u9009/\u5168\u4E0D\u9009: "),t(x,{modelValue:u(_),"onUpdate:modelValue":e[0]||(e[0]=m=>y(_)?_.value=m:null),"active-text":"\u662F","inactive-text":"\u5426","inline-prompt":"",onChange:K},null,8,["modelValue"]),i(" \u5168\u90E8\u5C55\u5F00/\u6298\u53E0: "),t(x,{modelValue:u(c),"onUpdate:modelValue":e[1]||(e[1]=m=>y(c)?c.value=m:null),"active-text":"\u5C55\u5F00","inactive-text":"\u6298\u53E0","inline-prompt":"",onChange:M},null,8,["modelValue"])]),default:l(()=>[t(N,{ref_key:"treeRef",ref:d,data:u(p),props:u(ae),"empty-text":"\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u5019","node-key":"id","show-checkbox":""},null,8,["data","props"])]),_:1})]),_:1})]),_:1},8,["model"])),[[B,u(n)]])]),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-a445cbb4"]])});export{me as __tla,w as default};
