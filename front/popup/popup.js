// Agrega un listener para el evento 'click' en el botón
document.getElementById('startScanButton').addEventListener('click', function() {
    // Obtén la URL de la pestaña activa en el navegador
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            const siteUrl = tabs[0].url; // Obtén la URL de la pestaña activa
            console.log('URL de la pestaña activa:', siteUrl); // Agrega un mensaje de depuración

            // Realiza una solicitud HTTP para iniciar el escaneo
            fetch('https://phishdefenderlearn.onrender.com/api/phishDefender/getData/')
            fetch('http://phishdefenderlearn.onrender.com/api/phishDefender/ScanWeb/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ siteUrl: siteUrl }), // Envía la URL de la pestaña activa como 'siteUrl'
            })
            .then(response => response.json())
            .then(data => {
                if (data.vulnerable) {
                    alert('¡Peligroso! Se encontraron vulnerabilidades.');
                } else {
                    alert('No es peligroso. No se encontraron vulnerabilidades.');
                }
                console.log('Respuesta del escáner:', data); // Imprime la respuesta en la consola
            })
            .catch(error => {
                console.error('Error al iniciar el escaneo:', error);
            });
        } else {
            console.error('No se pudo obtener la URL de la pestaña activa.');
        }
    });
});

(async () => {
    // await chrome.runtime.onMessage.addListener((obj, sender, response) => {
    //     console.log(sender.tab)
    //     if(obj.type === "DANGER"){
    //         // Mostrar noficación
    //         alert("IN DANGER");
    //         response({ ACK: "ACK" });
    //     }
    //     if(obj.type === "NO-DANGER"){
    //         // Mostrar noficación
    //         alert("ALL GOOD");
    //     }
    //     if(obj.type === "NO-RESPONSE"){
    //         console.log("No response from server...")
    //     }
    // })
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
