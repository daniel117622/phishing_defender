// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/


// Send tip to content script via messaging
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'scan-html') {
//       chrome.storage.local.get('tip').then(sendResponse);
//       return true;
//     }
// });
(async () => {
    await chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
        if(tab.url){
            // get url
            const url = tab.url.split("?")[0];
            const queryParameters = tab.url.split("?")[1];
            console.log("###URL###", url)
            console.log("###URLqueryParams###", queryParameters)
            
            try {
                const check = await call_to_API(url);
                if(check.id){
                    // Notificar usuario 
                    console.log("Response from server ok...");
                    // Si es maligno
                    await chrome.runtime.sendMessage({ type: 'DANGER' });
                    // Si es benigno
                    await chrome.runtime.sendMessage({ type: 'NO-DANGER' });
                } else {
                    console.log("No response from server...");
                    await chrome.runtime.sendMessage({ type: 'NO-RESPONSE' });
                }
            } catch (error) {
                console.log(error);
            }

        }
    });
})();

async function call_to_API(web_url){
    const api_url = "http://localhost:8000/api/phishDefender/"
    // Request to server
    let data = {};
    try {
        const data_tmp = await fetch(
            api_url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": web_url
            })}
        );
        data = await data_tmp.json();
        console.log(data)

    } catch (error) {
        console.log(error)
    }
    
    return data;

}
