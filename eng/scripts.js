var im_act = 0;
var total;

var host = "annetplanet.com"
if (window.location.host === host && window.location.protocol !== "https:") {
    window.location.protocol = "https:"
}

function updateImage() {
    document.getElementById("last").disabled = false;
    document.getElementById("next").disabled = false;
    document.getElementById("first").disabled = false;
    document.getElementById("prev").disabled = false;

    if (im_act === total) {
        document.getElementById("last").disabled = true;
        document.getElementById("next").disabled = true;
    }
    if (im_act === 1) {
        document.getElementById("first").disabled = true;
        document.getElementById("prev").disabled = true;
    }
    var ext = "png";
    var selected = "COMIC" + im_act.toString() + "." + ext + "?ver=" + total.toString();
    document.getElementById("displayComic").src = '/comics_eng/' + selected;
    history.pushState(null, '', "/eng/cmc/comic" + (im_act).toString());
}

function loadRandom() {
    var rand;
    do {
        rand = Math.floor(Math.random() * parseInt(total)) + 1;
    }
    while (rand === im_act);
    im_act = rand;
    updateImage();
}

function loadLast() {
    im_act = total;
    updateImage();
}


function loadInit(update_image = true) {

    // Set total
    readTextFile("/num_last_eng.txt");

    var str = window.location.href;
    if (str.indexOf("comic") > -1) {
        var n = str.substr(str.lastIndexOf("comic") + 5);
        n = n.substring(0, n.length - 1);
        im_act = parseInt(n) || 1;

    } else {
        im_act = total;
    }

    if (update_image) {
        updateImage();
    }
}

function loadFirst() {
    im_act = 1;
    updateImage();
}

function Next() {
    im_act++;
    if (im_act > total) {
        im_act = total;
    }
    updateImage();
}

function Previous() {
    im_act--;
    if (im_act < 1) {
        im_act = 1;
    }
    updateImage();
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                total = rawFile.responseText;
                console.log(total);
            }
        }
    }
    rawFile.send(null);
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status === 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

// Create archive images
function createArchive() {
    var ra = document.getElementById('row-archive');

    var cid, comictext, comictextext;
    for (cid = total; cid > 0; cid--) {
        comictext = 'COMIC' + cid.toString();
        comictextext = comictext + '.png'

        var div = document.createElement("div");
        div.setAttribute("class", "col-lg-3 col-md-12")

        var a = document.createElement("a");
        a.setAttribute("href", "/eng/cmc/comic" + cid.toString())
        a.setAttribute("target", "_blank")

        var img = document.createElement("img");
        img.setAttribute("src", "/comics_eng/" + comictextext);
        img.setAttribute("loading", "lazy");
        img.setAttribute("class", "w-100 mb-2 archive-img")
        img.setAttribute("alt", comictext);

        a.appendChild(img);
        div.appendChild(a);
        ra.appendChild(div);
    }

    console.log(total);
}

function changeURL(){
    var str = window.location.href;
    str = str.replace("eng", "cat");
    str = str.replace("artist", "artista");
    str = str.replace("archive", "arxiu");
    window.location = str+"/";
}

function navbarImage() {
    var im = document.getElementById('coffee_eng');
    var ts = new Date();
    im.src = 'https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=annetplanet&button_colour=FF5F5F&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00&ver=' + ts.getTime();
}