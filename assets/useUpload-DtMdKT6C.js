import{u as s,__tla as c}from"./useMessage-DmGM48R-.js";let r,g,d=Promise.all([(()=>{try{return c}catch{}})()]).then(async()=>{const m=s();r=(e=>(e.Image="image",e.Voice="voice",e.Video="video",e))(r||{}),g=(e,a)=>t=>{let o=[],i="";switch(e){case"image":o=["image/jpeg","image/png","image/gif","image/bmp","image/jpg"],a=2,i="\u56FE\u7247";break;case"voice":o=["audio/mp3","audio/mpeg","audio/wma","audio/wav","audio/amr"],a=2,i="\u8BED\u97F3";break;case"video":o=["video/mp4"],a=10,i="\u89C6\u9891"}return o.includes(t.type)?!(t.size/1024/1024>a)||(m.error(`\u4E0A\u4F20${i}\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${a}M!`),!1):(m.error(`\u4E0A\u4F20${i}\u683C\u5F0F\u4E0D\u5BF9!`),!1)}});export{r as U,d as __tla,g as u};
