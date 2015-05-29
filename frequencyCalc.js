// By Abhinash Kumar Jha
//  26th May 2015
function inputFileToRead_Changed(inputFileToRead)
{
	var pathOfFileToRead = inputFileToRead.files[0].name;

	new FileHelper().readStringFromFileAtPath
	(
		pathOfFileToRead,
		mainFunction
	);
	
}
// class function
function GetText(){
	 var contentsOfFileAsString = document.getElementById('myTextBox').value;
	 mainFunction(contentsOfFileAsString);
}
function FileHelper()
{
	FileHelper.prototype.readStringFromFileAtPath = function(pathOfFileToReadFrom, callback)
	{
		var request = new XMLHttpRequest();
		request.onload = this.readStringFromFileAtPath_OnLoad.bind(this, callback);
		request.open("GET", pathOfFileToReadFrom, true);
		request.send();
	}

	FileHelper.prototype.readStringFromFileAtPath_OnLoad = function(callback, event)
	{
		var request = event.target;
		var returnValue = request.responseText;
		callback(returnValue);
	}
}
// d3 and frequenct calculator
function mainFunction(contentsOfFileAsString){
//var contentsOfFileAsString = document.getElementById('myTextBox').value;
//contentsOfFileAsString="Abhinash Kumar Jha, Y11uc004, aswwwsi qqqchutki nabbe taal ragar k peda muh mai daal abhinashakaskjdjdjkdkdjknno;invdvon;ifvofinifbnfvnieorvnoifvndfovindfvnfvvjo'adnvlmxvklvig'fnxb'xihdgjgg'ss'dvnsdviSn";
var count=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for (i = 0; i <contentsOfFileAsString.length; i++) {
		if(contentsOfFileAsString.charCodeAt(i)>64 &&contentsOfFileAsString.charCodeAt(i)<95) //to read letters with caps
		count[contentsOfFileAsString.charCodeAt(i) - 65]++;
		if(contentsOfFileAsString.charCodeAt(i)>96 &&contentsOfFileAsString.charCodeAt(i)<123) //to read letter without caps.
		count[contentsOfFileAsString.charCodeAt(i) - 97]++;
	}
	// calculating normalized frequency
	var sum=0;
	for(i=0;i<count.length;i++)
	sum=sum+count[i];
	for(i=0;i<count.length;i++){
	count[i]=count[i]/sum;
	}
	//document.getElementById("D3place").innerHTML ="Frequecy of Alphabets:" + count.toString();
	dataset=count;
	for(i=0;i<dataset.length;i++){
	dataset[i]=dataset[i];}
	var names=['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var data = [
		{letter:names[0],frequency:dataset[0]},
		{letter:names[1],frequency:dataset[1]},
		{letter:names[2],frequency:dataset[2]},      	
		{letter:names[3],frequency:dataset[3]},
		{letter:names[4],frequency:dataset[4]},
		{letter:names[5],frequency:dataset[5]},
		{letter:names[6],frequency:dataset[6]},      	
		{letter:names[7],frequency:dataset[7]},
		{letter:names[8],frequency:dataset[8]},
		{letter:names[9],frequency:dataset[9]},	
		{letter:names[10],frequency:dataset[10]},	
		{letter:names[11],frequency:dataset[11]},
		{letter:names[12],frequency:dataset[12]},      	
		{letter:names[13],frequency:dataset[13]},
		{letter:names[14],frequency:dataset[14]},
		{letter:names[15],frequency:dataset[15]},
		{letter:names[16],frequency:dataset[16]},      	
		{letter:names[17],frequency:dataset[17]},
		{letter:names[18],frequency:dataset[18]},
		{letter:names[19],frequency:dataset[19]},
		{letter:names[20],frequency:dataset[20]},      	
		{letter:names[21],frequency:dataset[21]},
		{letter:names[22],frequency:dataset[22]},
		{letter:names[23],frequency:dataset[23]},
		{letter:names[24],frequency:dataset[24]},      	
		{letter:names[25],frequency:dataset[25]}
    ];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////          D3 below ///////////////////////////////////////////////////////////////////////////
var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Number of Occurence:</strong> <span style='color:red'>" + d.frequency*sum + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
   updatetable(count);

}

function type(data) {
  d.frequency = +d.frequency;
  return d;
}

function updatetable(count){
	document.getElementById('A').innerHTML = count[0];
	document.getElementById('B').innerHTML = count[1];
	document.getElementById('C').innerHTML = count[2];
	document.getElementById('D').innerHTML = count[3];
	document.getElementById('E').innerHTML = count[4];
	document.getElementById('F').innerHTML = count[5];
	document.getElementById('G').innerHTML = count[6];
	document.getElementById('H').innerHTML = count[7];
	document.getElementById('I').innerHTML = count[8];
	document.getElementById('J').innerHTML = count[9];
	document.getElementById('K').innerHTML = count[10];
	document.getElementById('L').innerHTML = count[11];
	document.getElementById('M').innerHTML = count[12];
	document.getElementById('N').innerHTML = count[13];
	document.getElementById('O').innerHTML = count[14];
	document.getElementById('P').innerHTML = count[15];
	document.getElementById('Q').innerHTML = count[16];
	document.getElementById('R').innerHTML = count[17];
	document.getElementById('S').innerHTML = count[18];
	document.getElementById('T').innerHTML = count[19];
	document.getElementById('U').innerHTML = count[20];
	document.getElementById('V').innerHTML = count[21];
	document.getElementById('W').innerHTML = count[22];
	document.getElementById('X').innerHTML = count[23];
	document.getElementById('Y').innerHTML = count[24];
	document.getElementById('Z').innerHTML = count[25];
}