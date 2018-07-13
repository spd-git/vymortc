google.load("visualization", "1.1", {packages:["bar"]});
function drawBarChart(chartData,title,subtitle,type,divId,selectHandler) {
    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        title: title,
        bars: type // Required for Material Bar Charts.
    };


    var chart = new google.visualization.BarChart(document.getElementById(divId));
    if(selectHandler) {
        google.visualization.events.addListener(chart, 'select', selectHandler);
    }
    chart.draw(data, options);
}