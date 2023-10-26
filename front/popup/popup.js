// Este Script corre dentro del explorador

async function scanWeb() {
    
    let [tab] = await chrome.tabs.query({ active: true });
    received = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async() => {
            // let received = {ok:false}
            const api_url = 'http://localhost:3000/setTokens';
            const fishing_url = window.location
            const header_html = document.querySelector("head").innerHTML;
            const body_html = document.querySelector("body").innerHTML;
            // console.log(body_html)
            
            if (header_html || body_html) {
                // const text = html.textContent;
                // Buscar palabras aquí
                const wordMatchRegExp = /[^\s]+/g;
                // const words = Array.from(text.matchAll(wordMatchRegExp));
                // const wordCount = [...words].length;

                // Send list of words to backend
                let data = {
                    "url": fishing_url,
                    "head": header_html,
                    "body": body_html,
                };
                fetch(api_url, {
                    method: 'POST',
                    body: JSON.stringify(data),  // Convierte los datos a una cadena JSON
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
                .finally(function() {
                    document.body.style.background = "blue";
                })
            }
            
        }
    });
    console.log("Active tab:",{received})
}



(async () => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        console.log(obj)
        if(obj.type === "all-good"){
            console.log("NEW:", obj)
            // Mostrar noficación
            
        }
    })
    // Sends a message to the service worker and receives a tip in response
    // const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

    // const nav = document.querySelector('.navigation-rail__links');
    // const tipWidget = createDomElement(`
    //     <button class="navigation-rail__link" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0; border: none; background: none;>
    //     <div class="navigation-rail__icon">
    //         <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"> 
    //         <path d='M15 16H9M14.5 9C14.5 7.61929 13.3807 6.5 12 6.5M6 9C6 11.2208 7.2066 13.1599 9 14.1973V18.5C9 19.8807 10.1193 21 11.5 21H12.5C13.8807 21 15 19.8807 15 18.5V14.1973C16.7934 13.1599 18 11.2208 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9Z'"></path>
    //         </svg>
    //     </div>
    //     <span>Tip</span> 
    //     </button>
    // `);

    // const popover = createDomElement(
    //     `<div id='tip-popover' popover>${tip}</div>`
    // );

    // document.body.append(popover);
    // nav.append(tipWidget);
})();

function createDomElement(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return dom.body.firstElementChild;
}
// document.getElementById("mybutton").addEventListener("click", scanWeb);
