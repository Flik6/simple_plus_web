import{aQ as t,__tla as c}from"./index-IVPz-ih6.js";let r,u,l,d,m,p,o,y,i,n,g=Promise.all([(()=>{try{return c}catch{}})()]).then(async()=>{u=s=>t.get({url:"/system/user/page",params:s}),r=s=>t.get({url:"/system/user/get?id="+s}),l=s=>t.post({url:"/system/user/create",data:s}),n=s=>t.put({url:"/system/user/update",data:s}),p=s=>t.delete({url:"/system/user/delete?id="+s}),m=s=>t.download({url:"/system/user/export",params:s}),y=()=>t.download({url:"/system/user/get-import-template"}),i=(s,e)=>{const a={id:s,password:e};return t.put({url:"/system/user/update-password",data:a})},d=(s,e)=>{const a={id:s,status:e};return t.put({url:"/system/user/update-status",data:a})},o=()=>t.get({url:"/system/user/list-all-simple"})});export{g as __tla,r as a,u as b,l as c,d,m as e,p as f,o as g,y as i,i as r,n as u};
