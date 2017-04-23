// Kaikki img elementit joilla on class image
$("img.image").click(function(eventInfo){
    eventInfo.preventDefault();
    // Haetaan kuvan polku
    var imgPath = eventInfo.target.src;
    // Avataan kuva uuteen välilehteen
    window.open(imgPath);
});