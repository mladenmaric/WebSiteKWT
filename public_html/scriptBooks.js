function loadXMLBooks() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            var xml = xhttp.responseXML;
            prikaziSveKnjige(xml);
        }
    };

    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}


function prikaziSveKnjige(xml) {

    var kategorije = xml.getElementsByTagName("category");
    
    for (var i = 0; i < kategorije.length; i++) {
        
        var katHTML = "";
        var imeKat = kategorije[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        
        katHTML += "<h1>" + imeKat + "</h1>";
        var knjige = kategorije[i].getElementsByTagName("book");
        
        for (var j = 0; j < knjige.length; j++) {
            
            katHTML += "<div id='c" + (i + 1) + "b" + (j + 1) + "' class='product_box_extended'>";
            
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
            katHTML += "<br /><br /><div class='buy_now_button'><a href='buyBook.html'>Buy Now</a></div>";
                            
            katHTML += "</div><div class='description'>";
            
            var desc = knjige[j].getElementsByTagName("description")[0].childNodes[0].nodeValue;
            katHTML += "<p>" + JSON.stringify(desc) + "</p>";
            
            katHTML += "</div></div>";
        }
        
        
        
        $("#" + imeKat).html(katHTML);
    }
    
}