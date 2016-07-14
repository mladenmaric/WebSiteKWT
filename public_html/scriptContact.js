
function validacija() {
    var ime = $("#first_name").val();
    var prezime = $("#last_name").val();
    var email = $("#email").val();
    
    var samoSlova = new RegExp(/^[a-zA-Z]+$/);
    var mail = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);
    
    $("#first_name").val("");
    $("#last_name").val("");
    $("#email").val("");
    document.getElementsByTagName("textarea")[0].value = "";
    
    if (samoSlova.test(ime) && samoSlova.test(prezime) && mail.test(email))
        alert("Message sent!");
    else if (!samoSlova.test(ime))
        alert("First name must only contains letters!");
    else if (!samoSlova.test(prezime))
        alert("Last name must only contains letters!");
    else 
        alert("Email address is not right!");
    
    
}
