/**
 * Created by salonasinha on 13/07/18.
 */
google.load("visualization", "1.1", {packages:["corechart"]});
function drawBubbleChart(chartData,title,hAxisTitle,divId) {
    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        title: title,
        hAxis: {title: hAxisTitle},
        bubble: {textStyle: {fontSize: 11}}
    };
    var chart = new google.visualization.BubbleChart(document.getElementById(divId));
    chart.draw(data, options);
}