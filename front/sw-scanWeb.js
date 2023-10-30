// Detect and react when something interesting happens.
// https://developer.chrome.com/docs/extensions/mv3/service_workers/basics/

(async () => {
    chrome.runtime.onMessage.addListener(async(obj, sender, sendResponse) => {
        if(obj.type === "SCAN"){
            // get url
            console.log(sender.url);
            const url = sender.url;
            try {
                const check = await call_to_API(url);
                if(check.id){
                    // Notificar usuario 
                    // Si es maligno
                    // sendResponse({ 'type': 'DANGER' });
                    // Si es benigno
                    sendResponse({ type: 'NO-DANGER' });
                } else {
                    console.log("No response from server...");
                    sendResponse({ type: 'NO-RESPONSE' });
                }
            } catch (error) {
                console.log(error);
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
        console.log(data)

    } catch (error) {
        console.log(error)
    }
    
    return data;

}
