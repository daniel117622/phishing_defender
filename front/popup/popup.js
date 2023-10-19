if (typeof jQuery !== 'undefined') {
    // jQuery está cargado y disponible
    console.log('jQuery está cargado correctamente.');
} else {
    // jQuery no está cargado
    console.log('jQuery no se ha cargado.');
}

async function scanWeb() {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const api_url = 'http://localhost:3000/setTokens';
            const fishing_url = "https://freebitco.in/signup/?op=s"
            const article = document.querySelector("p");
            
            if (article) {
                const text = article.textContent;
                // Buscar palabras aquí
                const wordMatchRegExp = /[^\s]+/g;
                const words = Array.from(text.matchAll(wordMatchRegExp));
                const wordCount = [...words].length;

                // Send list of words to backend
                let data = {
                    "url": fishing_url,
                    "words": words,
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
}

// Escuchar el mensaje del script de contenido y mostrar el resultado en el popup
// chrome.runtime.onMessage.addListener(function (message) {
//     if (message.action === "setWordsCount") {
//         console.log({"message": message.wordCount})
//         const readingTimeElement = document.getElementById("readingTime");
//         readingTimeElement.textContent = message.wordCount;
//     }
// });

document.getElementById("mybutton").addEventListener("click", scanWeb);
