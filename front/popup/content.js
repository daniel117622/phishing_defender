// Mandar mensajes al background
// document.body.style.backgroundColor ='green';

chrome.runtime.sendMessage({ type: 'SCAN' }, function(response){
    console.log(response)
    if(response.type === "DANGER"){
        alert("DANGER");
    }
    if(obj.type === "NO-DANGER"){
        alert("NO-DANGER");
    }
    if(obj.type === "NO-RESPONSE"){
        alert("NO-RESPONSE");
    }
});


// chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
//     console.log(sender.tab.url)
//     if(obj.type === "DANGER"){
//         // Mostrar noficación
//         alert("IN DANGER");
//         sendResponse({ ACK: true });
//     }
//     if(obj.type === "NO-DANGER"){
//         // Mostrar noficación
//         alert("ALL GOOD");
//         sendResponse({ ACK: true });
//     }
//     if(obj.type === "NO-RESPONSE"){
//         alert("NO RESPONSE");
//         console.log("No response from server...")
//         sendResponse({ ACK: true });
//     }
// })