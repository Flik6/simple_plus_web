import{d as j,k as D,r as i,z as H,o as n,B as _,w as r,g as d,a as l,h as y,A as T,c as U,F as B,j as M,v as R,M as E,C as L,D as P,I as G,H as J,L as K,__tla as W}from"./index-IVPz-ih6.js";import{_ as X,__tla as Y}from"./Dialog.vue_vue_type_style_index_0_lang-DMbm9tVa.js";import{E as Z,__tla as $}from"./el-image-BULbPLoM.js";import{__tla as ee}from"./el-image-viewer-CT2z8sww.js";import{g as ae,a as b,d as le,__tla as te}from"./index-DxBIF9Sx.js";import{d as re}from"./download--D_IyRio.js";import{u as oe,__tla as ie}from"./useMessage-DmGM48R-.js";let g,de=Promise.all([(()=>{try{return W}catch{}})(),(()=>{try{return Y}catch{}})(),(()=>{try{return $}catch{}})(),(()=>{try{return ee}catch{}})(),(()=>{try{return te}catch{}})(),(()=>{try{return ie}catch{}})()]).then(async()=>{g=j({__name:"ShopDeskForm3",setup(se,{expose:w}){const{t:I}=D(),Q=oe(),s=i(!1),c=i(""),u=i(!1),k=i(""),e=i({id:void 0,shopId:void 0,shopName:void 0,number:void 0,miniQrcode:void 0,h5Qrcode:void 0,aliQrcode:void 0,note:void 0,orderCount:void 0,costAmount:void 0,lastOrderNo:void 0,lastOrderTime:void 0,lastOrderStatus:void 0,status:void 0,env:"trial"}),x=H({shopId:[{required:!0,message:"\u95E8\u5E97\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],number:[{required:!0,message:"\u684C\u53F7\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],status:[{required:!0,message:"\u72B6\u6001\uFF1A1=\u542F\u7528\uFF0C2=\u7981\u7528\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}),p=i(),C=i([{id:1,name:"\u6B63\u5F0F\u7248",value:"release"},{id:2,name:"\u4F53\u9A8C\u7248",value:"trial"},{id:3,name:"\u5F00\u53D1\u7248",value:"develop"}]),v=i({});w({open:async(a,t)=>{if(s.value=!0,c.value=I("action."+a),k.value=a,N(),t){u.value=!0;try{e.value=await ae(t),e.value.env="trial",v.value=await b({id:t,number:e.value.number,shopId:e.value.shopId,env:e.value.env})}finally{u.value=!1}}}});const O=async a=>{v.value=await b({id:e.value.id,number:e.value.number,shopId:e.value.shopId,env:a})},V=async()=>{await Q.confirm("\u5C0F\u7A0B\u5E8F\u4E8C\u7EF4\u7801\u53EA\u80FD\u4E0B\u8F7D\u6B63\u5F0F\u7684\u54E6"),u.value=!0;try{const a=await le(e.value.id);re.zip(a,e.value.shopName+e.value.number+".zip"),s.value=!1}finally{u.value=!1}},N=()=>{var a;e.value={id:void 0,shopId:void 0,shopName:void 0,number:void 0,miniQrcode:void 0,h5Qrcode:void 0,aliQrcode:void 0,note:void 0,orderCount:void 0,costAmount:void 0,lastOrderNo:void 0,lastOrderTime:void 0,lastOrderStatus:void 0,status:1,env:"trial"},(a=p.value)==null||a.resetFields()};return(a,t)=>{const q=E,z=L,m=P,f=Z,A=G,h=J,F=X,S=K;return n(),_(F,{title:l(c),modelValue:l(s),"onUpdate:modelValue":t[2]||(t[2]=o=>R(s)?s.value=o:null)},{footer:r(()=>[d(h,{onClick:V,type:"primary",disabled:l(u)},{default:r(()=>[y("\u4E0B \u8F7D")]),_:1},8,["disabled"]),d(h,{onClick:t[1]||(t[1]=o=>s.value=!1)},{default:r(()=>[y("\u53D6 \u6D88")]),_:1})]),default:r(()=>[T((n(),_(A,{ref_key:"formRef",ref:p,model:l(e),rules:l(x),"label-width":"120px"},{default:r(()=>[d(m,{label:"\u5C0F\u7A0B\u5E8F\u7248\u672C",prop:"env"},{default:r(()=>[d(z,{modelValue:l(e).env,"onUpdate:modelValue":t[0]||(t[0]=o=>l(e).env=o),onChange:O},{default:r(()=>[(n(!0),U(B,null,M(l(C),o=>(n(),_(q,{key:o.id,label:o.name,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),d(m,{label:"\u5C0F\u7A0B\u5E8F\u4E8C\u7EF4\u7801"},{default:r(()=>[d(f,{style:{width:"200px",height:"200px"},src:l(v).miniQrcode,fit:a.fit},null,8,["src","fit"])]),_:1}),d(m,{label:"H5\u4E8C\u7EF4\u7801"},{default:r(()=>[d(f,{style:{width:"200px",height:"200px"},src:l(v).normalQrcode,fit:a.fit},null,8,["src","fit"])]),_:1})]),_:1},8,["model","rules"])),[[S,l(u)]])]),_:1},8,["title","modelValue"])}}})});export{g as _,de as __tla};
