
// const url_page = 'https://es.wikipedia.org/wiki/Wikipedia:Portada';

if (typeof jQuery !== 'undefined') {
    // jQuery está cargado y disponible
    console.log('jQuery está cargado correctamente.');
    // Puedes comenzar a usar jQuery aquí
} else {
    // jQuery no está cargado
    console.log('jQuery no se ha cargado.');
    // Puedes tomar medidas alternativas aquí
}


console.log("EXECUTING...");

// const json = {
//     botones: [],
//     enlaces: [],
//     enlaces: [],
//     palabras: []
// }

$.get("http://localhost:3000", function(data){
    alert("Data: " + data + "\n");
});

