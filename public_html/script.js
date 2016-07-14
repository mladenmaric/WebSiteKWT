
function loadXML() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            var xml = xhttp.responseXML;
            ucitajKategorije(xml);
            ucitajBestselere(xml);
            ucitajNoveKnjige(xml);
        }
    };

    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}

function ucitajKategorije(xml) {

    var kategorijeHTML = "<ul>";
    var kategorije = xml.getElementsByTagName("category");

    for (var i = 0; i < kategorije.length; i++) {
        var ime = kategorije[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        kategorijeHTML += "<li><a href='books.html#" + ime + "'>" + ime + "</a></li>";
    }

    kategorijeHTML += "</ul>";
    document.getElementById("category").innerHTML += kategorijeHTML;
}

function ucitajBestselere(xml) {

    var bestseleriHTML = "<ul>";
    var knjige = xml.getElementsByTagName("book");

    for (var i = 0; i < knjige.length - 1; i++)
        for (var j = i + 1; j < knjige.length; j++) {
            var soldI = knjige[i].getElementsByTagName("sold")[0].childNodes[0].nodeValue;
            var soldJ = knjige[j].getElementsByTagName("sold")[0].childNodes[0].nodeValue;

            if (Number(soldI) < Number(soldJ)) {
                var t = knjige[i];
                knjige[i] = knjige[j];
                knjige[j] = t;
            }
        }

    for (var i = 0; i < 5; i++) {
        var best = knjige[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        bestseleriHTML += "<li><a href='books.html#'>" + best + "</a></li>";
    }

    bestseleriHTML += "</ul>";
    document.getElementById("bestseller").innerHTML += bestseleriHTML;
}

function ucitajNoveKnjige(xml) {

    var noveKnjige = "<ul>";
    var kategorije = xml.getElementsByTagName("category");

    for (var i = 0; i < 3; i++) {
        var knjiga = kategorije[i].getElementsByTagName("book")[0];
        var ime = knjiga.getElementsByTagName("title")[0].childNodes[0].nodeValue;

        noveKnjige += "<li>" + ime + "</li>";
    }

    noveKnjige += "</ul>";
    document.getElementById("new_books").innerHTML = noveKnjige;
}
