function loadXMLSearch() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4 && xhttp.status === 200) {

            xml = xhttp.responseXML;
            pretraziKnjige();
        }
    };

    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}

function pretraziKnjige() {
    
    var unetTekst = $("#input").val().toLowerCase(); console.log(unetTekst);
    var prikazanoKnjiga = 0;
    var searchHTML = "";
    
    var kategorije = xml.getElementsByTagName("category");
    for (var i = 0; i < kategorije.length; i++) {
        var knjige = kategorije[i].getElementsByTagName("book");
        
        for (var j = 0; j < knjige.length; j++) {
            var naslov = knjige[j].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var low = naslov.toLowerCase();
            
            if (unetTekst === "" || low.indexOf(unetTekst) !== -1) {
                
                prikazanoKnjiga++;
                var imeKat = kategorije[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                var cover = knjige[j].getElementsByTagName("cover")[0].childNodes[0].nodeValue;
                var desc = knjige[j].getElementsByTagName("description")[0].childNodes[0].nodeValue.substr(0, 50) + "...";
                var cena = knjige[j].getElementsByTagName("price")[0].childNodes[0].nodeValue;
                
                searchHTML += "<div class='product_box'>";
                searchHTML += "<h1>" + imeKat + "  <span>" + naslov + "</span></h1>";
                searchHTML += "<img src='images/" + cover + "' alt='' />";
                searchHTML += "<div class='product_info'>";
                searchHTML += "<p>" + desc + "</p>";
                searchHTML += "<h3>$" + cena + "</h3>";
                searchHTML += "<div class='buy_now_button'><a href='buyBook.html'>Buy Now</a></div>";
                searchHTML += "<div class='detail_button'><a href='books.html#c" + (i + 1) + "b" + (j + 1) + "'>Details</a></div>";
                searchHTML += "</div>";
                searchHTML += "<div class='cleaner'>&nbsp;</div>";
                searchHTML += "</div>";
                
                if (prikazanoKnjiga % 2 === 1)
                    searchHTML += "<div class='cleaner_with_width'>&nbsp;</div>";
                else
                    searchHTML += "<div class='cleaner_with_height'>&nbsp;</div>"; 
            }
        }
    }
    
    $("#search_result").html(searchHTML);
}

//                    <div id="cat1" class="product_box">
//                        <h1>COOKING  <span>Everyday Italian</span></h1>
//                        <img src="images/cat1book1.jpg" alt="image" />
//                        <div class="product_info">
//                            <p>Everyday Italian is a Food Networ...</p>
//                            <h3>$30.00</h3>
//                            <div class="buy_now_button"><a href="subpage.html">Buy Now</a></div>
//                            <div class="detail_button"><a href="subpage.html">Details</a></div>
//                        </div>
//                        <div class="cleaner">&nbsp;</div>
//                    </div>

