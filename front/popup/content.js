// Mandar mensajes al background
// document.body.style.backgroundColor ='green';

chrome.runtime.sendMessage({ type: 'SCAN' }, function(request){
  if(request.ACK === true){
      console.log("ACK", request.ACK)
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("LLEGUÉ!")
  if(request.type === "DANGER"){
      // Mostrar noficación
      alert("IN DANGER");
      // sendResponse({ ACK: true });
  }
  if(request.type === "NO-DANGER"){
      // Mostrar noficación
      alert("ALL GOOD");
      // sendResponse({ ACK: true });
  }
  if(request.type === "NO-RESPONSE"){
      alert("NO RESPONSE");
      console.log("No response from server...")
      // sendResponse({ ACK: true });
  }
})