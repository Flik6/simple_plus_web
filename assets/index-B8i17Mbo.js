import{aQ as e,__tla as c}from"./index-IVPz-ih6.js";let t,s,l,r,o,y,m,i=Promise.all([(()=>{try{return c}catch{}})()]).then(async()=>{t=async a=>await e.get({url:"/system/role/page",params:a}),s=async()=>await e.get({url:"/system/role/list-all-simple"}),y=async a=>await e.get({url:"/system/role/get?id="+a}),l=async a=>await e.post({url:"/system/role/create",data:a}),m=async a=>await e.put({url:"/system/role/update",data:a}),r=async a=>await e.delete({url:"/system/role/delete?id="+a}),o=a=>e.download({url:"/system/role/export-excel",params:a})});export{i as __tla,t as a,s as b,l as c,r as d,o as e,y as g,m as u};
