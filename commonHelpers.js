import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as p,i as d}from"./assets/vendor-77e16229.js";const i=document.querySelector("[data-start]"),D=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),T=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]"),c=document.querySelector("#datetime-picker");let t,r,n=!1;const v={defaultDate:null,enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const o=new Date(e[0]).getTime(),a=Date.now();o>=a?(i.disabled=!1,t=o-a,l(m(t)),n&&b()):d.error({fontSize:"large",close:!1,position:"topRight",messageColor:"white",timeout:2e3,backgroundColor:"red",message:"Please choose a date in the future"})}};p("#datetime-picker",v);i.addEventListener("click",()=>{if(n)location.reload();else{const e=Date.now();t=new Date(c.value).getTime()-e,t>0?(i.disabled=!0,c.disabled=!0,k()):d.error({fontSize:"large",close:!1,position:"topRight",messageColor:"white",timeout:2e3,backgroundColor:"red",message:"Please choose a date in the future"})}});function b(){clearInterval(r),l({days:"00",hours:"00",minutes:"00",seconds:"00"}),n=!1}function k(){n||(clearInterval(r),r=setInterval(w,1e3),n=!0)}function w(){t>1e3?(t-=1e3,l(m(t))):(clearInterval(r),c.disabled=!1,n=!1)}function l({days:e,hours:o,minutes:a,seconds:u}){D.textContent=`${e}`,S.textContent=`${o}`,T.textContent=`${a}`,C.textContent=`${u}`}function s(e){return String(e).padStart(2,"0")}function m(e){const f=s(Math.floor(e/864e5)),h=s(Math.floor(e%864e5/36e5)),y=s(Math.floor(e%864e5%36e5/6e4)),g=s(Math.floor(e%864e5%36e5%6e4/1e3));return{days:f,hours:h,minutes:y,seconds:g}}
//# sourceMappingURL=commonHelpers.js.map
