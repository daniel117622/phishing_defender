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
            const article = document.querySelector("p");
            // console.log(article)
            
            if (article) {
                const text = article.textContent;
                const wordMatchRegExp = /[^\s]+/g;
                const words = text.matchAll(wordMatchRegExp);
                const wordCount = [...words].length;
                
                console.log({ words })
                console.log({ wordCount })
                // chrome.runtime.sendMessage({ action: "setWordsCount", wordCount });
                // $.get("http://localhost:3000/test", function(data){
                //     alert("Data: " + data + "\n");
                // });
                // Send words list to backend
                $.ajax({
                    url: "http://localhost:3000/test", 
                    type: 'GET',
                    data: {"words[]": words},
                    error: function(err){
                        console.log("Error!", err);
                    },
                    success: function( data ) {
                        alert( "Data Loaded: " + data );
                    }
                })
            }
            
            document.body.style.background = "blue";
            alert('¡Done!');
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
