import{i as y}from"./color-DXkOL5Tu.js";import{d as v,r as _,g as m,E as f,__tla as d}from"./index-IVPz-ih6.js";import{b as T,__tla as g}from"./dict-Dn71ph6d.js";let n,b=Promise.all([(()=>{try{return d}catch{}})(),(()=>{try{return g}catch{}})()]).then(async()=>{n=v({name:"DictTag",props:{type:{type:String,required:!0},value:{type:[String,Number,Boolean],required:!0}},setup(l){const e=_(),i=()=>{var s,o,u,c,p;return l.type?l.value===void 0||l.value===null?null:(r=l.type,t=l.value.toString(),T(r).forEach(a=>{a.value===t&&(a.colorType+""!="primary"&&a.colorType+""!="default"||(a.colorType=""),e.value=a)}),m(f,{style:(s=e.value)!=null&&s.cssClass?"color: #fff":"",type:(o=e.value)==null?void 0:o.colorType,color:(u=e.value)!=null&&u.cssClass&&y((c=e.value)==null?void 0:c.cssClass)?(p=e.value)==null?void 0:p.cssClass:"",disableTransitions:!0},{default:()=>{var a;return[(a=e.value)==null?void 0:a.label]}})):null;var r,t};return()=>i()}})});export{n as _,b as __tla};
