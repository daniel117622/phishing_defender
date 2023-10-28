// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/


// Send tip to content script via messaging
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'scan-html') {
//       chrome.storage.local.get('tip').then(sendResponse);
//       return true;
//     }
// });
(async() => {
    chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
        if(tab.url){
            // get url
            const url = tab.url.split("?")[0];
            const queryParameters = tab.url.split("?")[1];
            // Phishtank ckeck
            const check = await call_to_API(url);
            console.log(check)
            if(check.length > 0){
                // Notificar usuario 
                console.log("IN DANGER");
                await chrome.runtime.sendMessage({ type: 'DANGER' });
            } else {
                // Call ChatGPT to check URL
                console.log("No response from server...");
                await chrome.runtime.sendMessage({ type: 'NO-RESPONSE' });
            }
        }
    });
})();

async function call_to_API(web_url){
    // Request to server
    const api_url = "http://localhost:8000/phish_defender/api"
    let data = {};

    console.log("scanning...")
    fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "data": web_url
        })
    })
    .then((resp) => {
        if(resp.ok){
            console.log(resp.json())
            data = resp.json()
        }
    })
    .catch(function(err){
        console.log(err)
    })

    return data;
}
