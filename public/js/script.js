
// Kaikki img elementit joilla on class image
// Kun kuvaa painetaan näyttää kuvan pop-uppina.
$("img.image").click(function(eventInfo){
    var modal = $("#modalImgDiv")[0];
    var img = eventInfo.target;
    var modalImg = $("#modalImg")[0];

    // Asetetaan kuvan lähde ja näytetään se.
    modal.style.display = "block";
    modalImg.src = img.src;
});

// Span elementti, jolla modal image suljetaan
$("span.close").click(function(eventInfo) {
    var modal = $("#modalImgDiv")[0];
    // Piilotetaan modal image
    modal.style.display = "none";
});