import{k as i,aS as c,a2 as t,bX as e,__tla as a}from"./index-IVPz-ih6.js";let m,l=Promise.all([(()=>{try{return a}catch{}})()]).then(async()=>{m=()=>{const{t:n}=i();return{info(o){c.info(o)},error(o){c.error(o)},success(o){c.success(o)},warning(o){c.warning(o)},alert(o){t.alert(o,n("common.confirmTitle"))},alertError(o){t.alert(o,n("common.confirmTitle"),{type:"error"})},alertSuccess(o){t.alert(o,n("common.confirmTitle"),{type:"success"})},alertWarning(o){t.alert(o,n("common.confirmTitle"),{type:"warning"})},notify(o){e.info(o)},notifyError(o){e.error(o)},notifySuccess(o){e.success(o)},notifyWarning(o){e.warning(o)},confirm:(o,r)=>t.confirm(o,r||n("common.confirmTitle"),{confirmButtonText:n("common.ok"),cancelButtonText:n("common.cancel"),type:"warning"}),delConfirm:(o,r)=>t.confirm(o||n("common.delMessage"),r||n("common.confirmTitle"),{confirmButtonText:n("common.ok"),cancelButtonText:n("common.cancel"),type:"warning"}),exportConfirm:(o,r)=>t.confirm(o||n("common.exportMessage"),r||n("common.confirmTitle"),{confirmButtonText:n("common.ok"),cancelButtonText:n("common.cancel"),type:"warning"}),prompt:(o,r)=>t.prompt(o,r,{confirmButtonText:n("common.ok"),cancelButtonText:n("common.cancel"),type:"warning"})}}});export{l as __tla,m as u};
