var im_act = 0;
var total;

var host = "annetplanet.com"
if (window.location.host == host && window.location.protocol != "https:") {
  window.location.protocol = "https:"
}

function updateImage(){

    deactivateButtons();

    var selected = "COMIC"+ im_act.toString()+".jpg";
    document.getElementById("displayComic").src = '/comics/'+selected;
    history.pushState(null, '', "/cmc/comic"+ (im_act).toString());

    activateButtons();
    if(im_act==total){
        document.getElementById("last").disabled = true;
        document.getElementById("next").disabled = true;
        document.getElementById("lastBig").disabled = true;
        document.getElementById("nextBig").disabled = true;
    }
    if(im_act==1){
        document.getElementById("first").disabled = true;
        document.getElementById("prev").disabled = true;
        document.getElementById("firstBig").disabled = true;
        document.getElementById("prevBig").disabled = true;
    }
}

function activateButtons() {
    document.getElementById("last").disabled = false;
    document.getElementById("next").disabled = false;
    document.getElementById("lastBig").disabled = false;
    document.getElementById("nextBig").disabled = false;
    document.getElementById("first").disabled = false;
    document.getElementById("prev").disabled = false;
    document.getElementById("firstBig").disabled = false;
    document.getElementById("prevBig").disabled = false;
    document.getElementById("rand").disabled = false;
    document.getElementById("randBig").disabled = false;
}

function deactivateButtons() {
    document.getElementById("last").disabled = true;
    document.getElementById("next").disabled = true;
    document.getElementById("lastBig").disabled = true;
    document.getElementById("nextBig").disabled = true;
    document.getElementById("first").disabled = true;
    document.getElementById("prev").disabled = true;
    document.getElementById("firstBig").disabled = true;
    document.getElementById("prevBig").disabled = true;
    document.getElementById("rand").disabled = true;
    document.getElementById("randBig").disabled = true;
}

function loadRandom() {
    var rand;
    do{
        rand = Math.floor(Math.random() * parseInt(total))+1;
    }
    while (rand===im_act);
    im_act = rand;
    updateImage();
}

function loadLast() {
    im_act = total;
    updateImage();
}

function loadInit() {
    readTextFile("/num_last.txt");
    var str=window.location.href;
    if(str.indexOf("comic") > -1) {
        var n = str.substr(str.lastIndexOf("comic")+5);
        n = n.substring(0, n.length - 1);
        im_act = parseInt(n) || 1;;

    }else{
       im_act = total;
    }

    updateImage();
}

function loadFirst() {
    im_act = 1;
    updateImage();
}

function Next() {
    im_act++;
    if(im_act>total){
        im_act=total;
    }
    updateImage();
}

function Previous() {
    im_act--;
    if(im_act<1){
        im_act=1;
    }
    updateImage();
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                total = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}
