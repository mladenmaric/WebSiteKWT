
function loadXMLHome() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            var xml = xhttp.responseXML;

            for (var i = 0; i < 4; i++) {
                timer(xml, i);
            }
        }
    };

    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}

function timer(xml, kat) {
    var knjige = xml.getElementsByTagName("category")[kat].getElementsByTagName("book");
    var len = knjige.length;
    var counter = 1;

    setInterval(function () {

        var kateg = xml.getElementsByTagName("category")[kat].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var naziv = knjige[counter].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var cover = knjige[counter].getElementsByTagName("cover")[0].childNodes[0].nodeValue;
        var desc = knjige[counter].getElementsByTagName("description")[0].childNodes[0].nodeValue.substr(0, 50) + "...";
        var cena = knjige[counter].getElementsByTagName("price")[0].childNodes[0].nodeValue;

        var text = "";
        text += "<h1>" + kateg + "  <span>" + naziv + "</span></h1>";
        text += "<img src='images/" + cover + "' alt='' />";
        text += "<div class='product_info'>";
        text += "<p>" + desc + "</p>";
        text += "<h3>$" + cena + "</h3>";
        text += "<div class='buy_now_button'><a href='buyBook.html'>Buy Now</a></div>";
        text += "<div class='detail_button'><a href='books.html#c" + (kat + 1) + "b" + (counter + 1) + "'>Details</a></div>";
        text += "</div>";
        text += "<div class='cleaner'>&nbsp;</div>";

        counter++;
        if (counter === len)
            counter = 0;

        $("#cat" + (kat + 1)).html(text);

    }, 3000, false);
}
