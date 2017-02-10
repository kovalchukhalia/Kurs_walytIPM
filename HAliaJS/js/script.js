(function () {
   'use strict'; //nowy standart ES5
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var filename = "myFile.txt";
    var selectDate, selectYear;
    var currencyName = [], converter = [], currencyCode = [], averageRate = [], sourceData = [];
    var applicationData = Windows.Storage.ApplicationData.current;
    var localFolder = applicationData.localFolder;
    var myFileDate;

    WinJS.UI.Pages.define("index.html", {
        ready: function (element, options) {
            this.fillYearSelect();   },

        fillYearSelect: function () {
            selectYear = document.getElementById("year");
            var date = new Date();
            var year = date.getFullYear();
            for (var i = year; i >= 2001; i--) {
                var dateOption = document.createElement("option");
                dateOption.text = i;
                dateOption.value = i;
                selectYear.appendChild(dateOption);
            }
            getExchangeDates("http://www.nbp.pl/kursy/xml/dir.txt");
            selectYear.onchange = function () {
                console.log(selectYear.options[selectYear.selectedIndex].value);
                if (selectYear.options[selectYear.selectedIndex].value == year) {
                    getExchangeDates("http://www.nbp.pl/kursy/xml/dir.txt");
                } else {
                    //console.log("http://www.nbp.pl/kursy/xml/dir" + selectYear.options[selectYear.selectedIndex].value + ".txt");
                    getExchangeDates("http://www.nbp.pl/kursy/xml/dir" + selectYear.options[selectYear.selectedIndex].value + ".txt");
                }    };   }  }   )

    function getExchangeDates(url) {
        var httpClient = new XMLHttpRequest();
        httpClient.open('GET', url);
        httpClient.onreadystatechange = function () {
            var responseMessage = httpClient.responseText;
            if (httpClient.readyState === 4) {
                var splittedResponseMessage = responseMessage.split('\n');
                var splittedDates = [], splittedFileNames = [];
                var j = 0;
                for (var i = 0; i < splittedResponseMessage.length; i++) {
                    if (splittedResponseMessage[i].substring(0, 1) == 'a') {//wyświetlanie daty w wygodnej formie
                        splittedDates[splittedDates.length] = "20" + splittedResponseMessage[i].substring(5, 7) + "-" + splittedResponseMessage[i].substring(7, 9) + "-" + splittedResponseMessage[i].substring(9, 11);
                        splittedFileNames[splittedFileNames.length] = splittedResponseMessage[i];
                    }
                }
                splittedFileNames.reverse();
                splittedDates.reverse();

                selectDate = document.getElementById("date");
                selectDate.options.length = 0;
                for (var i = 0; i < splittedDates.length; i++) {
                    var dateOption = document.createElement("option");
                    dateOption.text = splittedDates[i];
                    dateOption.value = splittedDates[i];
                    selectDate.appendChild(dateOption);
                }

                loadDate().then(function (data) {
                    myFileDate = data;
                    if (myFileDate == null) {
                        getXMLData("http://www.nbp.pl/kursy/xml/" + splittedFileNames[selectDate.selectedIndex].substring(0, 11) + ".xml");
                        selectDate.options[0].selected = true;
                    }
                    else {
                        getXMLData("http://www.nbp.pl/kursy/xml/" + myFileDate + ".xml");
                         }
                });
                selectDate.onchange = function () {
                    getXMLData("http://www.nbp.pl/kursy/xml/" + splittedFileNames[selectDate.selectedIndex].substring(0, 11) + ".xml")
                   }; } }
        httpClient.send();
    }
    //otrzymujemy dane z dokumentu XML
    function getXMLData(xmlURL) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", xmlURL, false);
        httpRequest.send();
        try {
            var xmlData = httpRequest.responseXML;
            var currencies = xmlData.getElementsByTagName("pozycja");
            for (var i = 0; i < currencies.length; i++) {
                try {
                    currencyName[i] = currencies[i].getElementsByTagName("nazwa_waluty")[0].childNodes[0].nodeValue; 
                } catch (e) {
                    currencyName[i] = currencies[i].getElementsByTagName("nazwa_kraju")[0].childNodes[0].nodeValue;
                }
                finally {
                    converter[i] = currencies[i].getElementsByTagName("przelicznik")[0].childNodes[0].nodeValue;
                    currencyCode[i] = currencies[i].getElementsByTagName("kod_waluty")[0].childNodes[0].nodeValue;
                    averageRate[i] = currencies[i].getElementsByTagName("kurs_sredni")[0].childNodes[0].nodeValue;
                }
            }
        } catch (exception) {  //przetwarzamy błędy
            var msgBox = new Windows.UI.Popups.MessageDialog("Error in adres file");
            msgBox.showAsync();

        }
        return new WinJS.Promise.timeout(900).then(function () {
            fillTable();
        }, function (reason) {
            document.getElementById("tableContent").style.visibility = "hidden";
        });
    };

    function fillTable() { // w cyklu uzupełniamy naszą tabelę  danymi
        sourceData.length = 0;
        var tableBody = document.getElementById("newTable");
        var template = document.getElementById("myTemplate").winControl;
        for (var i = 0; i < currencyCode.length; i++) {
            sourceData.push({ currencyName: currencyName[i], converter: converter[i], currencyCode: currencyCode[i], averageRate: averageRate[i] });
        }
        while (tableBody.rows.length > 0) {
            tableBody.deleteRow(0);
        }
        sourceData.forEach(function (item) {
            template.render(item, tableBody);
        })

    }
   
    function loadDate() { 
        var that = this;
        return Windows.Storage.ApplicationData.current.localFolder.getFileAsync(filename).then(function (file) {
            return Windows.Storage.FileIO.readTextAsync(file).then(function (fileContent) {
                return fileContent;
            },
            function (error) {
                console.log("Error read");
            });
        },
        function (error) {
            console.log("Don`t search file");
        });
    }   }());
