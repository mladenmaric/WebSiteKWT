function loadXMLReleases() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            xml = xhttp.responseXML;
            prikaziNovije();
        }
    };

    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}


function prikaziNovije() {

    var godina = Number($("#year").val());
    var katHTML = "";
    var knjige = xml.getElementsByTagName("book");

    for (var j = 0; j < knjige.length; j++) {

        var god = Number(knjige[j].getElementsByTagName("year")[0].childNodes[0].nodeValue);
        
        if (god >= godina) {

            katHTML += "<div class='product_box_extended'>";

            var cover = knjige[j].getElementsByTagName("cover")[0].childNodes[0].nodeValue;
            katHTML += "<img src='images/" + cover + "' alt='' />";

            katHTML += "<div class='product_info'>";
            katHTML += "<p>AUTHOR</p>";

            var autori = knjige[j].getElementsByTagName("author");
            for (var p = 0; p < autori.length; p++) {

                var ime = autori[p].childNodes[0].nodeValue;
                katHTML += "<span>" + ime + "</span><br />";
            }

            var cena = knjige[j].getElementsByTagName("price")[0].childNodes[0].nodeValue;
            katHTML += "<h3>$" + cena + "</h3>";
            katHTML += "<span style='font-weight: bold;'>" + knjige[j].getElementsByTagName("year")[0].childNodes[0].nodeValue + "</span>";
            katHTML += "<br /><br /><div class='buy_now_button'><a href='buyBook.html'>Buy Now</a></div>";

            katHTML += "</div><div class='description'>";

            var desc = knjige[j].getElementsByTagName("description")[0].childNodes[0].nodeValue;
            katHTML += "<p>" + JSON.stringify(desc) + "</p>";

            katHTML += "</div></div>";
        }
    }



    $("#result").html(katHTML);
}
