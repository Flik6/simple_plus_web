import{aQ as t,__tla as u}from"./index-IVPz-ih6.js";let e,a,m,l,r,p,d,o=Promise.all([(()=>{try{return u}catch{}})()]).then(async()=>{e=s=>t.get({url:"/system/sms-template/page",params:s}),r=s=>t.get({url:"/system/sms-template/get?id="+s}),a=s=>t.post({url:"/system/sms-template/create",data:s}),d=s=>t.put({url:"/system/sms-template/update",data:s}),m=s=>t.delete({url:"/system/sms-template/delete?id="+s}),l=s=>t.download({url:"/system/sms-template/export-excel",params:s}),p=s=>t.post({url:"/system/sms-template/send-sms",data:s})});export{o as __tla,e as a,a as c,m as d,l as e,r as g,p as s,d as u};
