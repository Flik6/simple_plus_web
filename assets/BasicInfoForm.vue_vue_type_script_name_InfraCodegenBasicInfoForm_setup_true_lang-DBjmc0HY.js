import{d as c,r as f,D as v,ac as x,a as l,o as w,H as g,w as a,M as q,g as e,f as B,h as I,X as M,J as j,q as A,_ as D,ba as F,v as H,__tla as J}from"./index-06lJR0i3.js";import{r as n,__tla as O}from"./formRules-fOqrAdio.js";let b,P=Promise.all([(()=>{try{return J}catch{}})(),(()=>{try{return O}catch{}})()]).then(async()=>{let p;p=c({name:"InfraCodegenBasicInfoForm"}),b=c({...p,props:{table:{type:Object,default:()=>null}},setup(h,{expose:V}){const i=h,_=f(),t=f({tableName:"",tableComment:"",className:"",author:"",remark:""}),N=v({tableName:[n],tableComment:[n],className:[n],author:[n]});return x(()=>i.table,m=>{m&&(t.value=m)},{deep:!0,immediate:!0}),V({validate:async()=>{var m;return(m=l(_))==null?void 0:m.validate()}}),(m,o)=>{const u=M,r=j,d=A,y=D,C=F,k=H,U=q;return w(),g(U,{ref_key:"formRef",ref:_,model:l(t),rules:l(N),"label-width":"120px"},{default:a(()=>[e(k,null,{default:a(()=>[e(d,{span:12},{default:a(()=>[e(r,{label:"\u8868\u540D\u79F0",prop:"tableName"},{default:a(()=>[e(u,{modelValue:l(t).tableName,"onUpdate:modelValue":o[0]||(o[0]=s=>l(t).tableName=s),placeholder:"\u8BF7\u8F93\u5165\u4ED3\u5E93\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:12},{default:a(()=>[e(r,{label:"\u8868\u63CF\u8FF0",prop:"tableComment"},{default:a(()=>[e(u,{modelValue:l(t).tableComment,"onUpdate:modelValue":o[1]||(o[1]=s=>l(t).tableComment=s),placeholder:"\u8BF7\u8F93\u5165"},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:12},{default:a(()=>[e(r,{prop:"className"},{label:a(()=>[B("span",null,[I(" \u5B9E\u4F53\u7C7B\u540D\u79F0 "),e(C,{content:"\u9ED8\u8BA4\u53BB\u9664\u8868\u540D\u7684\u524D\u7F00\u3002\u5982\u679C\u5B58\u5728\u91CD\u590D\uFF0C\u5219\u9700\u8981\u624B\u52A8\u6DFB\u52A0\u524D\u7F00\uFF0C\u907F\u514D MyBatis \u62A5 Alias \u91CD\u590D\u7684\u95EE\u9898\u3002",placement:"top"},{default:a(()=>[e(y,{class:"",icon:"ep:question-filled"})]),_:1})])]),default:a(()=>[e(u,{modelValue:l(t).className,"onUpdate:modelValue":o[2]||(o[2]=s=>l(t).className=s),placeholder:"\u8BF7\u8F93\u5165"},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:12},{default:a(()=>[e(r,{label:"\u4F5C\u8005",prop:"author"},{default:a(()=>[e(u,{modelValue:l(t).author,"onUpdate:modelValue":o[3]||(o[3]=s=>l(t).author=s),placeholder:"\u8BF7\u8F93\u5165"},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:24},{default:a(()=>[e(r,{label:"\u5907\u6CE8",prop:"remark"},{default:a(()=>[e(u,{modelValue:l(t).remark,"onUpdate:modelValue":o[4]||(o[4]=s=>l(t).remark=s),rows:3,type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])}}})});export{b as _,P as __tla};