// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/

// const virusTotal_api = 'https://www.virustotal.com/api/v3/domains/domain';
// const virusTotal_api_key = '066ff12ebbd1af7242cc106bbbbab5a18e6522624f7a3c50a785f2a9fc2611dc';
// console.log(phishtank_api)

// Send tip to content script via messaging
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'scan-html') {
//       chrome.storage.local.get('tip').then(sendResponse);
//       return true;
//     }
// });
(() => {
    chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
        if(tab.url){
            // get url
            const url = tab.url.split("?")[0];
            const queryParameters = tab.url.split("?")[1];
            // Phishtank ckeck
            const check = await checkURL_with_phishtank(url);
            console.log(check)
            if(check){
                // Notificar usuario 
                console.log("IN DANGER");
                // const { tip } = await chrome.runtime.sendMessage({ type: 'DANGER' });
            } else {
                // Call ChatGPT to check URL
                console.log("Connecting to the server...");
                // await requestToServer(url);
            }
            // const urlParameters = new URLSearchParams(queryParameters);
        }
    });
})();

// Request to server
async function requestToServer(web_url){
    const api_url = 'http://localhost:3000/setTokens';
    fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(web_url),  // Convierte los datos a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(function(resp) {
        console.log(resp.json())
        if(resp.ok){
            alert('¡Done! Scanning completed');
            // received.ok = true
            return {ok: true}
        } else {
            console.log("No hay conexión con el servidor");
        }
    })
    .catch(function(err){
        console.log(err)
    })
    // .finally(function() {
    //     // document.body.style.background = "blue";
    // })
}

// Search url in phishtank JSON
async function checkURL_with_phishtank(web_url){
    const phishtank_api = "http://data.phishtank.com/data/online-valid.json"
    let registered = false;

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
        let coincidence = data.filter(element => element.url === web_url);
        if(coincidence) {
            registered = true;
        }
        else {
            registered = false;
        }
    })
    .catch(function(err){
        console.log(err)
    })

    return registered;
}
