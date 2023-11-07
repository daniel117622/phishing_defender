// Mandar mensajes al background
// document.body.style.backgroundColor ='green';

let isScanning = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TOGGLE_SCAN') {
    isScanning = !isScanning;
    if (isScanning) {
      // Iniciar el escaneo
      chrome.runtime.sendMessage({ type: 'START_SCAN' }, function(response) {
        if (response.ACK === true) {
          console.log('ACK', response.ACK);
        }
      });
    } else {
      // Detener el escaneo
      chrome.runtime.sendMessage({ type: 'STOP_SCAN' }, function(response) {
        if (response.ACK === true) {
          console.log('ACK', response.ACK);
        }
      });
    }
  }
});

// En tu extensión, puedes tener un botón en tu interfaz de usuario (popup, por ejemplo) que active o desactive el escaneo cuando se hace clic:
document.getElementById('toggleScanButton').addEventListener('click', function() {
  chrome.runtime.sendMessage({ type: 'TOGGLE_SCAN' });
});

// Tu código existente para manejar respuestas de Django
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('LLEGUÉ!');
  if (request.type === 'DANGER') {
    // Mostrar notificación
    alert('IN DANGER');
  }
  if (request.type === 'NO-DANGER') {
    // Mostrar notificación
    alert('ALL GOOD');
  }
  if (request.type === 'NO-RESPONSE') {
    alert('NO RESPONSE');
    console.log('No response from server...');
  }
});
