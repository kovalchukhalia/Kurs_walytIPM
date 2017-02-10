WinJS.Namespace.define("Charts", {
    Draw_RadarChart: function () {
        var radarChartData = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Partying", "Running"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]

        }

        var myRadar = new Chart(document.getElementById("RadarCanvas").getContext("2d")).Radar(radarChartData, { scaleShowLabels: false, pointLabelFontSize: 10 });
    }
   , Draw_BarChart: function () {

       var barChartData = {
           labels: ["January", "February", "March", "April", "May", "June", "July"],
           datasets: [
               {
                   fillColor: "rgba(220,220,220,0.5)",
                   strokeColor: "rgba(220,220,220,1)",
                   data: [65, 59, 90, 81, 56, 55, 40]
               },
               {
                   fillColor: "rgba(151,187,205,0.5)",
                   strokeColor: "rgba(151,187,205,1)",
                   data: [28, 48, 40, 19, 96, 27, 100]
               }
           ]

       }

       var myLine = new Chart(document.getElementById("BarCanvas").getContext("2d")).Bar(barChartData);
   }
   , Draw_DoughnutChart: function () {
       var doughnutData = [
                {
                    value: 30,
                    color: "#F7464A"
                },
                {
                    value: 50,
                    color: "#46BFBD"
                },
                {
                    value: 100,
                    color: "#FDB45C"
                },
                {
                    value: 40,
                    color: "#949FB1"
                },
                {
                    value: 120,
                    color: "#4D5360"
                }

       ];

       var myDoughnut = new Chart(document.getElementById("doughnutCanvas").getContext("2d")).Doughnut(doughnutData);
   }
   , Draw_LineChart: function () {
       var lineChartData = {
           labels: ["January", "February", "March", "April", "May", "June", "July"],
           datasets: [
               {
                   fillColor: "rgba(220,220,220,0.5)",
                   strokeColor: "rgba(220,220,220,1)",
                   pointColor: "rgba(220,220,220,1)",
                   pointStrokeColor: "#fff",
                   data: [65, 59, 90, 81, 56, 55, 40]
               },
               {
                   fillColor: "rgba(151,187,205,0.5)",
                   strokeColor: "rgba(151,187,205,1)",
                   pointColor: "rgba(151,187,205,1)",
                   pointStrokeColor: "#fff",
                   data: [28, 48, 40, 19, 96, 27, 100]
               }
           ]

       }

       var myLine = new Chart(document.getElementById("lineCanvas").getContext("2d")).Line(lineChartData);
   }
   , Draw_PieCanvas: function () {
       var pieData = [
                {
                    value: 30,
                    color: "#F38630"
                },
                {
                    value: 50,
                    color: "#E0E4CC"
                },
                {
                    value: 100,
                    color: "#69D2E7"
                }

       ];

       var myPie = new Chart(document.getElementById("pieCanvas").getContext("2d")).Pie(pieData);

   }
   , Draw_PolarAreaCanvas: function () {
       var chartData = [
            {
                value: Math.random(),
                color: "#D97041"
            },
            {
                value: Math.random(),
                color: "#C7604C"
            },
            {
                value: Math.random(),
                color: "#21323D"
            },
            {
                value: Math.random(),
                color: "#9D9B7F"
            },
            {
                value: Math.random(),
                color: "#7D4F6D"
            },
            {
                value: Math.random(),
                color: "#584A5E"
            }
       ];
       var myPolarArea = new Chart(document.getElementById("polarAreaCanvas").getContext("2d")).PolarArea(chartData);
   }
});