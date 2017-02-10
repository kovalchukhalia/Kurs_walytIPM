var read = new XMLHttpRequest();
read.open("GET", "http://www.nbp.pl/kursy/xml/LastA.xml", false);
read.send();
xmlDoc = read.responseXML;
var items = [];
var pozycja = xmlDoc.getElementsByTagName("pozycja");
for (i = 0; i < pozycja.length; i++) {
    var names = pozycja[i].getElementsByTagName("nazwa_waluty")[0].textContent;
    var przelicznik = pozycja[i].getElementsByTagName("przelicznik")[0].textContent;
    var kod = pozycja[i].getElementsByTagName("kod_waluty")[0].textContent;
    var kurs = pozycja[i].getElementsByTagName("kurs_sredni")[0].textContent;


    var itemArray = [
        { names: names, przelicznik: przelicznik, kod: kod, kurs: kurs }
    ];
    itemArray.forEach(function (item) {
        items.push(item);
    });
    WinJS.Namespace.define("Sample.ListView", {
        data: new WinJS.Binding.List(items)
    });
    WinJS.UI.processAll();
}

//WinJS.UI.processAll().done(function () {
//    //var splitView = document.querySelector(".splitView").winControl;
//    new WinJS.UI._WinKeyboard(splitView.paneElement);
//});




