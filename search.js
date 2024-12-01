function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function search_item() {
    let input = document.getElementById("searchbar").value
    input = input.toLowerCase();
    let x = document.getElementsByClassName("guitar");

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "block";
        }
    }
}