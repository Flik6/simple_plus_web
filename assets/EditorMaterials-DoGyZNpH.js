import{r,a2 as de,e as pe,o as p,c as T,f as y,g as l,w as t,d as me,L as fe,a3 as ve,h as x,G as $,H as S,F as J,j as O,t as q,i as D,a as ge,a4 as V,C as _e,a5 as he,q as ye,a6 as xe,v as we,a7 as be,a8 as ze,a9 as Pe,P as ke,B as Ce,aa as Ee,ab as Te,__tla as Be}from"./index-06lJR0i3.js";import{E as Ne,__tla as Se}from"./el-card-jxTvgqU7.js";import{E as Ve,__tla as je}from"./el-image-TBZORFLL.js";import{__tla as Ie}from"./el-image-viewer-Ba7yM8TQ.js";import{g as Ge,a as Ue,d as Fe,p as Me,b as Ae,c as Le,e as $e,__tla as Je}from"./material-DMw5zn1o.js";import{_ as Oe}from"./_plugin-vue_export-helper-BCo6x5W8.js";let H,qe=Promise.all([(()=>{try{return Be}catch{}})(),(()=>{try{return Se}catch{}})(),(()=>{try{return je}catch{}})(),(()=>{try{return Ie}catch{}})(),(()=>{try{return Je}catch{}})()]).then(async()=>{(function(){if(window.frameElement.id){let B=window.parent,k=B.$EDITORUI[window.frameElement.id.replace(/_iframe$/,"")],m=k.editor,b=B.UE,f=b.dom.domUtils,h=b.utils;b.browser,b.ajax;let o=function(v){return document.getElementById(v)};window.nowEditor={editor:m,dialog:k},h.loadFile(document,{href:m.options.themePath+m.options.theme+"/dialogbase.css?cache="+Math.random(),tag:"link",type:"text/css",rel:"stylesheet"});var w=m.getLang(k.className.split("-")[2]);w&&f.on(window,"load",function(){var v=m.options.langPath+m.options.lang+"/images/";for(var z in w.static){var d=o(z);if(!d)continue;let C=d.tagName,u=w.static[z];switch(u.src&&(u=h.extend({},u,!1),u.src=v+u.src),u.style&&(u=h.extend({},u,!1),u.style=u.style.replace(/url\s*\(/g,"url("+v)),C.toLowerCase()){case"var":d.parentNode.replaceChild(document.createTextNode(u),d);break;case"select":for(var n,P=d.options,g=0;n=P[g];)n.innerHTML=u.options[g++];for(var _ in u)_!="options"&&d.setAttribute(_,u[_]);break;default:f.setAttributes(d,u)}}})}})();let G,U,F,M;G={style:{"margin-bottom":"10px"}},U={key:0},F={class:"dialog-footer",style:{color:"red"}},M=me({name:"EditorMaterials"}),H=Oe(Object.assign(M,{props:{value:{type:Array,default:()=>[]},type:{type:String},num:{type:Number,default:()=>5},width:{type:Number,default:()=>150},height:{type:Number,default:()=>150}},setup(w){const B=w,k=r({Authorization:"Bearer "+de()}),m=r(B.value),b=r(!1),f=r([]),h=r(""),o=r({}),v=r(!1),z=r([]),d=r(0),n=r({total:0,currentPage:1,pageSize:12,ascs:[],descs:"create_time"}),P=r(!1),g=r(null),_=r([]);function C(){v.value=!0,Ge({total:0,page:1,size:100,ascs:[],sort:"create_time,desc"}).then(e=>{v.value=!1,f.value=e,f.value.unshift({id:"-1",name:"\u5168\u90E8\u5206\u7EC4"}),u({index:0})})}function u(e){_.value=[];const a=Number(e.index);o.value=f.value[a],o.value.index=a,h.value=o.value.id,n.value.currentPage=1,n.value.total=0,o.value.id!="-1"?g.value=o.value.id:g.value=null,E(n.value)}function E(e){P.value=!0,Ue(Object.assign({page:e.currentPage-1,size:e.pageSize,descs:e.descs,ascs:e.ascs,sort:"create_time,desc"},{groupId:g.value})).then(a=>{n.value.total=a.total,n.value.currentPage=e.currentPage,n.value.pageSize=e.pageSize,z.value=a.list,P.value=!1}).catch(a=>{P.value=!1})}function K(e){n.value.currentPage=1,n.value.pageSize=e,E(this.page)}function R(e){n.value.currentPage=e,E(n.value)}function Z(e){}function Q(e,a,c){Le({type:"1",groupId:g.value!="-1"?g.value:null,name:a.name,url:e.data}).then(()=>{d.value++,c.length===d.value&&E(n.value)})}function W(e){const a=e.type==="image/jpeg"||e.type==="image/png"||e.type==="image/gif"||e.type==="image/jpg",c=e.size/1024/1024<2;return a?(c||this.$message.error("\u4E0A\u4F20\u5934\u50CF\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 2MB!"),a&&c):(this.$message.error("\u4E0A\u4F20\u56FE\u7247\u53EA\u80FD\u662F JPG\u3001JPEG\u3001PNG\u3001GIF \u683C\u5F0F!"),!1)}function X(){b.value=!1;let e="";_.value.forEach(a=>{e+='<img src="'+a+'">'}),nowEditor.dialog.close(!0),nowEditor.editor.setContent(e,!0)}return pe(()=>{C()}),(e,a)=>{const c=fe,Y=Ce,ee=_e,ae=he,N=ye,te=xe,j=we,le=Ee,ne=Ve,ue=Te,A=Ne,se=be,ie=ze,re=Pe,oe=ve,L=ke;return p(),T("div",null,[y("div",null,[l(oe,null,{default:t(()=>[l(ae,{width:"100px"},{default:t(()=>[y("div",G,[l(c,{class:"el-icon-plus",size:"small",onClick:a[0]||(a[0]=s=>{V.prompt("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88"}).then(({value:i})=>{Ae({name:i}).then(function(){C()})}).catch(()=>{})})},{default:t(()=>[x(" \u6DFB\u52A0\u5206\u7EC4 ")]),_:1})]),$((p(),S(ee,{modelValue:h.value,"onUpdate:modelValue":a[1]||(a[1]=s=>h.value=s),"tab-position":"left",onTabClick:u},{default:t(()=>[(p(!0),T(J,null,O(f.value,s=>(p(),S(Y,{key:s.id,name:s.id},{label:t(()=>[y("span",null,q(s.name),1)]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])),[[L,v.value]])]),_:1}),l(re,null,{default:t(()=>[l(A,null,{header:t(()=>[y("div",null,[l(j,null,{default:t(()=>[l(N,{span:12},{default:t(()=>[y("span",null,q(o.value.name),1),o.value.id!="-1"?(p(),T("span",U,[l(c,{size:"small",type:"text",class:"el-icon-edit",style:{"margin-left":"10px"},onClick:a[2]||(a[2]=s=>{return i=o.value,void V.prompt("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",inputValue:i.name}).then(({value:I})=>{Me({id:i.id,name:I}).then(function(){i.name=I,f.value[i.index]=i})}).catch(()=>{});var i})},{default:t(()=>[x("\u91CD\u547D\u540D")]),_:1}),l(c,{size:"small",type:"text",class:"el-icon-delete",style:{"margin-left":"10px",color:"red"},onClick:a[3]||(a[3]=s=>{return i=o.value,void V.confirm("\u662F\u5426\u786E\u8BA4\u5220\u9664\u8BE5\u5206\u7EC4\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(function(){Fe(i.id).then(function(){C()})});var i})},{default:t(()=>[x("\u5220\u9664")]),_:1})])):D("",!0)]),_:1}),l(N,{span:12,style:{"text-align":"right"}},{default:t(()=>[l(te,{action:ge("https://nq.92coco.cn:8443/admin-api/infra/file/upload"),headers:k.value,"file-list":[],"on-progress":Z,"before-upload":W,"on-success":Q,data:{type:1},multiple:""},{default:t(()=>[l(c,{size:"small",type:"primary"},{default:t(()=>[x("\u6279\u91CF\u4E0A\u4F20")]),_:1})]),_:1},8,["action","headers"])]),_:1})]),_:1})])]),default:t(()=>[$((p(),T("div",null,[z.value.length<=0?(p(),S(le,{key:0,title:"\u6682\u65E0\u6570\u636E",type:"info",closable:!1,center:"","show-icon":""})):D("",!0),l(se,{modelValue:_.value,"onUpdate:modelValue":a[4]||(a[4]=s=>_.value=s),max:w.num-m.value.length},{default:t(()=>[l(j,{gutter:5},{default:t(()=>[(p(!0),T(J,null,O(z.value,(s,i)=>(p(),S(N,{key:i,span:4},{default:t(()=>[l(A,{"body-style":{padding:"5px"}},{default:t(()=>[l(ne,{style:{width:"100%",height:"100px"},src:s.url,fit:"contain","preview-src-list":[s.url],"z-index":9999},null,8,["src","preview-src-list"]),y("div",null,[l(ue,{class:"material-name",label:s.url},{default:t(()=>[x(" \u9009\u62E9 ")]),_:2},1032,["label"]),l(j,null,{default:t(()=>[l(N,{span:24,class:"col-do"},{default:t(()=>[l(c,{type:"text",size:"medium",onClick:I=>function(ce){V.confirm("\u662F\u5426\u786E\u8BA4\u5220\u9664\u8BE5\u7D20\u6750\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(function(){$e(ce.id).finally(function(){E(n.value)})})}(s)},{default:t(()=>[x("\u5220\u9664")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1},8,["modelValue","max"]),l(ie,{"current-page":n.value.currentPage,"onUpdate:currentPage":a[5]||(a[5]=s=>n.value.currentPage=s),"page-sizes":[12,24],"page-size":n.value.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:n.value.total,class:"pagination",onSizeChange:K,onCurrentChange:R},null,8,["current-page","page-size","total"])])),[[L,P.value]])]),_:1})]),_:1})]),_:1}),y("span",F,[l(c,{type:"primary",onClick:X},{default:t(()=>[x("\u786E \u5B9A")]),_:1})])])])}}}),[["__scopeId","data-v-41a7c1ae"]])});export{qe as __tla,H as default};