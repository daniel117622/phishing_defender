// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/

const api_url = 'http://localhost:3000/setTokens';
// const virusTotal_api = 'https://www.virustotal.com/api/v3/domains/domain';
// const virusTotal_api_key = '066ff12ebbd1af7242cc106bbbbab5a18e6522624f7a3c50a785f2a9fc2611dc';
const phishtank_api = "http://data.phishtank.com/data/online-valid.json"
console.log(api_url)

// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'scan-html') {
      chrome.storage.local.get('tip').then(sendResponse);
      return true;
    }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    // console.log(tabId, tab)
    if(tab.url){
        // get url
        const url = tab.url.split("?")[0];
        const queryParameters = tab.url.split("?")[1];
        scanWeb(url)
        // get html
        // const fishing_url = window.location
        // const header_html = document.querySelector("head").innerHTML;
        // const body_html = document.querySelector("body").innerHTML;
        console.log({url})
        
        console.log("sending message...")
        // const urlParameters = new URLSearchParams(queryParameters);
        
        // chrome.tabs.sendMessage(tabId, {
        //     type: "Get-HTML",
        //     hostUrl: url,
        // });
        
    }
});

async function scanWeb(url){
    // Search url in Maliciuos webs JSON
    // maliciousURLs.forEach(element => {
    //     console.log(element)
    // });

    console.log("scanning...")
    fetch(phishtank_api, {
        method: 'GET',
        headers: {
            'User-Agent': 'phishtank/no-name',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
    
        // const { tip } = await chrome.runtime.sendMessage({ type: 'all-good' });

    })

    // si no esta
    // Llamar API google


    .catch(function(err){
        console.log(err)
    })
}

// let [tab] = await chrome.tabs.query({ active: true });


// chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: () => {
//         const api_url = 'http://localhost:3000/setTokens';
//         const fishing_url = window.location
//         const header_html = document.querySelector("head").innerHTML;
//         const body_html = document.querySelector("body").innerHTML;
//         // console.log(body_html)
        
//         if (header_html || body_html) {
//             // const text = html.textContent;
//             // Buscar palabras aquí
//             const wordMatchRegExp = /[^\s]+/g;
//             // const words = Array.from(text.matchAll(wordMatchRegExp));
//             // const wordCount = [...words].length;

//             // Send list of words to backend
//             let data = {
//                 "url": fishing_url,
//                 "head": header_html,
//                 "body": body_html,
//             };
//             fetch(api_url, {
//                 method: 'POST',
//                 body: JSON.stringify(data),  // Convierte los datos a una cadena JSON
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             })
//             .then(function(resp) {
//                 console.log(resp.json())
//                 if(resp.ok){
//                     alert('¡Done! Scanning completed');
//                 } else {
//                     console.log("No hay conexión con el servidor");
//                 }
//             })
//             .catch(function(err){
//                 console.log(err)
//             })
//             .finally(function() {
//                 document.body.style.background = "blue";
//             })
//         }
        
//     }
// });
