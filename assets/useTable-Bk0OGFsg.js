import{d as X,$ as c,r as P,e as ue,a as t,am as $,ab as R,A as ge,L as me,g,K as fe,ai as K,a6 as he,aa as ye,J as U,k as oe,aO as we,c9 as xe,o as S,c as Y,bP as be,j as ve,w as z,ah as Z,B,h as M,t as I,i as L,ax as Pe,F as Se,_ as _e,H as Ae,z as ke,aS as le,a2 as ie,ay as ze,__tla as Le}from"./index-IVPz-ih6.js";import{g as N,_ as Oe,__tla as Te}from"./Form-C7lm0X4d.js";import{_ as Ce}from"./_plugin-vue_export-helper-BCo6x5W8.js";import{u as je,__tla as Fe}from"./useForm-DZAsW5si.js";import{d as $e}from"./download--D_IyRio.js";let re,se,ce,Re=Promise.all([(()=>{try{return Le}catch{}})(),(()=>{try{return Te}catch{}})(),(()=>{try{return Fe}catch{}})()]).then(async()=>{let ee,te,y;se=Ce(X({name:"Table",props:{pageSize:c.number.def(10),currentPage:c.number.def(1),selection:c.bool.def(!1),showOverflowTooltip:c.bool.def(!0),columns:{type:Array,default:()=>[]},expand:c.bool.def(!1),pagination:{type:Object,default:()=>{}},reserveSelection:c.bool.def(!1),loading:c.bool.def(!1),reserveIndex:c.bool.def(!1),align:c.string.validate(e=>["left","center","right"].includes(e)).def("center"),headerAlign:c.string.validate(e=>["left","center","right"].includes(e)).def("center"),data:{type:Array,default:()=>[]}},emits:["update:pageSize","update:currentPage","register"],setup(e,{attrs:o,slots:d,emit:f,expose:h}){const w=P();ue(()=>{const a=t(w);f("register",a==null?void 0:a.$parent,w)});const b=P(e.pageSize),u=P(e.currentPage),n=P({}),l=P({}),i=$(()=>{const a={...e};return Object.assign(a,t(l)),a}),_=(a,O)=>{var A;const{columns:T}=t(i);for(const C of O||T)for(const j of a)C.field===j.field?ye(C,j.path,j.value):(A=C.children)!=null&&A.length&&_(a,C.children)},W=P([]),r=a=>{W.value=a};h({setProps:(a={})=>{l.value=Object.assign(t(l),a),n.value=a},setColumn:_,selections:W});const v=$(()=>Object.assign({small:!1,background:!0,pagerCount:document.body.clientWidth<992?5:7,layout:"total, sizes, prev, pager, next, jumper",pageSizes:[10,20,30,50,100],disabled:!1,hideOnSinglePage:!1,total:10},t(i).pagination));R(()=>t(i).pageSize,a=>{b.value=a}),R(()=>t(i).currentPage,a=>{u.value=a}),R(()=>b.value,a=>{f("update:pageSize",a)}),R(()=>u.value,a=>{f("update:currentPage",a)});const p=$(()=>{const a={...o,...e};return delete a.columns,delete a.data,a}),x=()=>{const{selection:a,reserveSelection:O,align:T,headerAlign:A}=t(i);return a?g(U,{type:"selection",reserveSelection:O,align:T,headerAlign:A,width:"50"},null):void 0},E=()=>{const{align:a,headerAlign:O,expand:T}=t(i);return T?g(U,{type:"expand",align:a,headerAlign:O},{default:A=>N(d,"expand",A)}):void 0},q=a=>{const{columns:O,reserveIndex:T,pageSize:A,currentPage:C,align:j,headerAlign:ae,showOverflowTooltip:de}=t(i);return[E(),x()].concat((a||O).map(s=>{if(s.type==="index")return g(U,{type:"index",index:s.index?s.index:D=>((k,H,G,Q)=>{const J=H+1;return k?G*(Q-1)+J:J})(T,D,A,C),align:s.align||j,headerAlign:s.headerAlign||ae,label:s.label,width:"65px"},null);{const D={...s};return D.children&&delete D.children,g(U,K({showOverflowTooltip:de,align:j,headerAlign:ae},D,{prop:s.field}),{default:k=>{var H;return s.children&&s.children.length?(G=>{const{align:Q,headerAlign:J,showOverflowTooltip:pe}=t(i);return G.map(m=>{const V={...m};return V.children&&delete V.children,g(U,K({showOverflowTooltip:pe,align:Q,headerAlign:J},V,{prop:m.field}),{default:F=>{var ne;return m.children&&m.children.length?q(m.children):N(d,m.field,F)||((ne=m==null?void 0:m.formatter)==null?void 0:ne.call(m,F.row,F.column,F.row[m.field],F.$index))||F.row[m.field]},header:N(d,`${m.field}-header`)})})})(s.children):N(d,s.field,k)||((H=s==null?void 0:s.formatter)==null?void 0:H.call(s,k.row,k.column,k.row[s.field],k.$index))||k.row[s.field]},header:()=>N(d,`${s.field}-header`)||s.label})}}))};return()=>ge(g("div",null,[g(fe,K({ref:w,data:t(i).data,"onSelection-change":r},t(p)),{default:()=>q(),append:()=>N(d,"append")}),t(i).pagination?g(he,K({pageSize:b.value,"onUpdate:pageSize":a=>b.value=a,currentPage:u.value,"onUpdate:currentPage":a=>u.value=a,class:"float-right mt-15px mb-15px"},t(v)),null):void 0]),[[me,t(i).loading]])}}),[["__scopeId","data-v-a2ff9e5d"]]),ee={key:0},te=X({name:"Search"}),re=X({...te,props:{schema:{type:Array,default:()=>[]},isCol:c.bool.def(!1),labelWidth:c.oneOfType([String,Number]).def("auto"),layout:c.string.validate(e=>["inline","bottom"].includes(e)).def("inline"),buttomPosition:c.string.validate(e=>["left","center","right"].includes(e)).def("center"),showSearch:c.bool.def(!0),showReset:c.bool.def(!0),expand:c.bool.def(!1),expandField:c.string.def(""),inline:c.bool.def(!0),model:{type:Object,default:()=>({})}},emits:["search","reset"],setup(e,{emit:o}){const d=e,{t:f}=oe(),h=P(!0),w=$(()=>{let r=we(d.schema);if(d.expand&&d.expandField&&!t(h)){const v=xe(r,p=>p.field===d.expandField);if(v>-1){const p=r.length;r.splice(v+1,p)}}return d.layout==="inline"&&(r=r.concat([{field:"action",formItemProps:{labelWidth:"0px"}}])),r}),{register:b,elFormRef:u,methods:n}=je({model:d.model||{}}),l=async()=>{var r;await((r=t(u))==null?void 0:r.validate(async v=>{if(v){const{getFormData:p}=n,x=await p();o("search",x)}}))},i=async()=>{var p;(p=t(u))==null||p.resetFields();const{getFormData:r}=n,v=await r();o("reset",v)},_=$(()=>({textAlign:d.buttomPosition})),W=()=>{var r;(r=t(u))==null||r.resetFields(),h.value=!t(h)};return(r,v)=>{const p=_e,x=Ae,E=Oe;return S(),Y(Se,null,[g(E,{inline:e.inline,"is-col":e.isCol,"is-custom":!1,"label-width":e.labelWidth,schema:t(w),class:"-mb-15px","hide-required-asterisk":"",onRegister:t(b)},be({action:z(()=>[e.layout==="inline"?(S(),Y("div",ee,[e.showSearch?(S(),B(x,{key:0,onClick:l},{default:z(()=>[g(p,{class:"mr-5px",icon:"ep:search"}),M(" "+I(t(f)("common.query")),1)]),_:1})):L("",!0),e.showReset?(S(),B(x,{key:1,onClick:i},{default:z(()=>[g(p,{class:"mr-5px",icon:"ep:refresh"}),M(" "+I(t(f)("common.reset")),1)]),_:1})):L("",!0),e.expand?(S(),B(x,{key:2,text:"",onClick:W},{default:z(()=>[M(I(t(f)(t(h)?"common.shrink":"common.expand"))+" ",1),g(p,{icon:t(h)?"ep:arrow-up":"ep:arrow-down"},null,8,["icon"])]),_:1})):L("",!0),Z(r.$slots,"actionMore")])):L("",!0)]),_:2},[ve(Object.keys(r.$slots),q=>({name:q,fn:z(()=>[Z(r.$slots,q)])}))]),1032,["inline","is-col","label-width","schema","onRegister"]),e.layout==="bottom"?(S(),Y("div",{key:0,style:Pe(t(_))},[e.showSearch?(S(),B(x,{key:0,type:"primary",onClick:l},{default:z(()=>[g(p,{class:"mr-5px",icon:"ep:search"}),M(" "+I(t(f)("common.query")),1)]),_:1})):L("",!0),e.showReset?(S(),B(x,{key:1,onClick:i},{default:z(()=>[g(p,{class:"mr-5px",icon:"ep:refresh-right"}),M(" "+I(t(f)("common.reset")),1)]),_:1})):L("",!0),e.expand?(S(),B(x,{key:2,text:"",onClick:W},{default:z(()=>[M(I(t(f)(t(h)?"common.shrink":"common.expand"))+" ",1),g(p,{icon:t(h)?"ep:arrow-up":"ep:arrow-down"},null,8,["icon"])]),_:1})):L("",!0),Z(r.$slots,"actionMore")],4)):L("",!0)],64)}}}),{t:y}=oe(),ce=e=>{const o=ke({pageSize:10,currentPage:1,total:10,tableList:[],params:{...(e==null?void 0:e.defaultParams)||{}},loading:!0,exportLoading:!1,currentRow:null}),d=$(()=>({...o.params,pageSize:o.pageSize,pageNo:o.currentPage}));R(()=>o.currentPage,()=>{u.getList()}),R(()=>o.pageSize,()=>{o.currentPage===1||(o.currentPage=1),u.getList()});const f=P(),h=P(),w=async()=>(await ze(),t(f)),b=async n=>{let l=1;n instanceof Array?(l=n.length,await Promise.all(n.map(async i=>{await((e==null?void 0:e.delListApi)&&(e==null?void 0:e.delListApi(i)))}))):await((e==null?void 0:e.delListApi)&&(e==null?void 0:e.delListApi(n))),le.success(y("common.delSuccess")),o.currentPage=(o.total%o.pageSize===l||o.pageSize===1)&&o.currentPage>1?o.currentPage-1:o.currentPage,await u.getList()},u={getList:async()=>{o.loading=!0;const n=await(e==null?void 0:e.getListApi(t(d)).finally(()=>{o.loading=!1}));n&&(o.tableList=n.list,n.total&&(o.total=n.total))},setProps:async(n={})=>{const l=await w();l==null||l.setProps(n)},setColumn:async n=>{const l=await w();l==null||l.setColumn(n)},getSelections:async()=>{const n=await w();return(n==null?void 0:n.selections)||[]},setSearchParams:n=>{o.params=Object.assign(o.params,{pageSize:o.pageSize,pageNo:1,...n}),o.currentPage!==1?o.currentPage=1:u.getList()},delList:async(n,l,i=!0)=>{const _=await w();!l||_!=null&&_.selections.length?i?ie.confirm(y("common.delMessage"),y("common.confirmTitle"),{confirmButtonText:y("common.ok"),cancelButtonText:y("common.cancel"),type:"warning"}).then(async()=>{await b(n)}):await b(n):le.warning(y("common.delNoData"))},exportList:async n=>{o.exportLoading=!0,ie.confirm(y("common.exportMessage"),y("common.confirmTitle"),{confirmButtonText:y("common.ok"),cancelButtonText:y("common.cancel"),type:"warning"}).then(async()=>{var i;const l=await((i=e==null?void 0:e.exportListApi)==null?void 0:i.call(e,t(d)));l&&$e.excel(l,n)}).finally(()=>{o.exportLoading=!1})}};return e!=null&&e.props&&u.setProps(e.props),{register:(n,l)=>{f.value=n,h.value=l},elTableRef:h,tableObject:o,methods:u,tableMethods:u}}});export{re as _,Re as __tla,se as a,ce as u};
