google.load("visualization", "1.1", {packages:["corechart"]});
function drawLineChart(chartData,title,vAxisTitle,vAxisMin,vAxisMax,divId) {
    var data = google.visualization.arrayToDataTable(chartData);
    console.log(data);
    var options = {
        title: title,
        curveType: 'function',
        legend: { position: 'bottom' },
        animation:{
            duration: 2000,
            easing: 'out'
        },
        vAxis: {'title': vAxisTitle,
            'minValue': vAxisMin,
            'maxValue': vAxisMax}
    };
    var chart = new google.visualization.LineChart(document.getElementById(divId));
    chart.draw(data, options);
}