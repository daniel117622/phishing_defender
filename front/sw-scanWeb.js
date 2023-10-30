// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/

(async () => {
    chrome.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
        if(request.type === "SCAN" && sender.tab){
            sendResponse({ ACK: true });
            // get url
            const url = sender.url;
            try {
                const check = await call_to_API(url);
                if(check.level){
                    // Notificar usuario 
                    // Si es maligno
                    // sendResponse({ 'type': 'DANGER' });
                    // Si es benigno
                    console.log("Sending no danger...");
                    chrome.tabs.sendMessage(sender.tab.id, { type: 'NO-DANGER' })
                    // chrome.runtime.sendMessage({ type: 'NO-DANGER' });
                } else {
                    console.log("No response from server...");
                    chrome.tabs.sendMessage(sender.tab.id, { type: 'NO-RESPONSE' })
                    // sendResponse({ type: 'NO-DANGER' });
                    // chrome.runtime.sendMessage({ type: 'NO-RESPONSE' });
                }
            } catch (error) {
                console.log(error);
                // sendResponse({ type: 'NO-DANGER' });
                // chrome.runtime.sendMessage({ type: 'NO-RESPONSE' });
            }
        }
    })
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
        
    } catch (error) {
        console.log(error)
    }
    
    return data;

}
