const apiURL="https://rest.coinapi.io";function getBTCCurrentPrice(){return fetch("https://blockchain.info/tobtc?currency=EUR&value=1",{method:"GET"}).then((e=>e.text())).then((e=>1/e))}function getPrice(e){e.setDate(e.getDate()-1);const t=e.getFullYear();let r=e.getMonth()+1,n=e.getDate();r<=9&&(r="0"+r),n<=9&&(n="0"+n);return fetch(apiURL+`/v1/exchangerate/BTC/EUR?time=${t}${r}${n}`,{method:"GET",headers:{"X-CoinAPI-Key":"33FB9E6F-E14B-49DE-8B2C-17CDCA3E5DAA",Accept:"application/json"}}).then((e=>e.json())).then((e=>{if(e.error)throw e.error;return e.rate}))}!async function(){const e=document.querySelector("#year-picker");for(let t=2011;t<=(new Date).getFullYear();t++){const r=document.createElement("option");r.text=t,r.value=t,e.add(r)}e.options[e.options.length-1].selected=!0;const t=document.querySelector("#pl-result"),r=document.querySelector("#wanna-cry"),n=document.getElementsByName("euros-invested")[0];e.addEventListener("change",(()=>{i()})),n.addEventListener("change",(()=>{i()}));const c=document.querySelector("#error-display"),i=()=>{c.style.visibility="hidden",t.textContent="🤔"},o=document.querySelector("#btceur-twitter");try{const i=await getBTCCurrentPrice();r.addEventListener("click",(async r=>{try{const r=new Date;r.setFullYear(+e.value);const c=await getPrice(r),s=(+n.value/c*i).toFixed(2);var a=new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",currencyDisplay:"code"});const u=a.format(s);t.textContent=u;const l=a.format(n.value),d=o.getAttribute("href"),h=new URL(d);h.searchParams.set("text",`Si j'avais investi ${l} sur Bitcoin, aujourd'hui j'aurais ${u}... Et toi ? https://blocs.fr/bitcoin-nostalgia`),o.setAttribute("href",h.href)}catch(e){console.error(e,"Si c'est marqué 429, la limite de requête a été atteinte :("),c.style.visibility="visible"}}))}catch(e){c.style.visibility="visible"}}();