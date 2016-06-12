var Main = React.createClass({
getInitialState: function() {
  return {
  }
},
componentDidMount: function() {
},
currentText: "SPY",
showResults: false,
render: function() {
  return (
  <div>
    <div id="secondary-bg">
      {this.renderLogic()}
      <div id="home-text"></div>
    </div>
  </div>
  )
},
renderLogic: function() {
  if (this.showResults == false) {
    return (
    <div id="home-outline">
      <div>
        <div id='field-div'>
          <input id="field-home" onChange={this.keyPressed} defaultValue="SPY" type='text' autoComplete="off"></input>
        </div>
          <button type='button' id="b-home" onClick={this.buttonClick}></button>
      </div>
      <div>
        <p id='home-subtitle'>enter symbol (i.e., AAPL, EURUSD, TLT)</p>
      </div>
    </div>
      )
    } else {
      return (
    <table>
      <tbody >
        <tr id="table">
          <td><div id="chart1"></div>{this.determineOutcomes(1)}</td>
          <td><div id="chart2"></div>{this.determineOutcomes(2)}</td>
          <td><div id="chart3"></div>{this.determineOutcomes(3)}</td>
        </tr>
      </tbody>
    </table>
    )
    }
},
result1: [],
result2: [],
result3: [],
determineOutcomes: function(num) {
  val = null
  if (num == 1) {
    val = this.result1[2]
  } else if (num == 2) {
    val = this.result2[2]
  } else if (num == 3) {
    val = this.result3[2]
  }

  if (val <= 1.0) {
    return <div><img id="star" src="/assets/oneS.png"></img><br /><p id="sharpe">Sharpe Ratio {(Math.round(val * 100) / 100).toFixed(2)}</p></div>
  } else if (val > 1.0 && val < 1.50) {
    return <div><img id="star" src="/assets/twoS.png"></img><br /><p id="sharpe">Sharpe Ratio {(Math.round(val * 100) / 100).toFixed(2)}</p></div>
  } else if (val >= 1.5) {
    return <div><img id="star" src="/assets/threeS.png"></img><br /><p id="sharpe">Sharpe Ratio {(Math.round(val * 100) / 100).toFixed(2)}</p></div>
  }

},
computeSharpe: function(futureE,std,selection) {
  if (selection == 1) {
    this.result1.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  } else if (selection == 2) {
    this.result2.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  } else if (selection == 3) {
    this.result3.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  }
  console.log(Math.abs(futureE)/Math.abs(std))
},
keyPressed: function(event) {
  this.currentText = event.target.value.toUpperCase()
},
shapeData: function(data) {
  GLOBAL_DATA = []
  for (i = 0; i < data['matches'][0].length; i++){
    GLOBAL_DATA.push([i])
  }
  for (ind = 0; ind < data['matches'].length; ind++) {
    for (indT = 0; indT < data['matches'][ind].length; indT++) {
      GLOBAL_DATA[indT].push(data['matches'][ind][indT])
    }
  }
  for (ind = 0; ind < data['current'].length; ind++) {
    GLOBAL_DATA[ind].push(data['current'][ind])
  }
  headerArr = []
  for (i = 0; i < GLOBAL_DATA[0].length; i++) {
    headerArr.push("one")
  }
  GLOBAL_DATA.unshift(headerArr)
  return GLOBAL_DATA
},
shapeOptions: function(seriesDict, colorArr, title) {
  chartOptions = {
    title: title,
    titlePosition: 'out',
    titleTextStyle: {color: '#E7ECEA', fontName: 'Roboto', fontSize: 14},
    curveType: 'function',
    legend: { position: 'none' },
    animation: {duration: 1000, startup: 'true', easing: 'linear' },
    vAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
    hAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
    backgroundColor: 'transparent',
    series: seriesDict,
    colors: colorArr,
    //chartArea: {backgroundColor: 'E7ECEA'},
    width: 350,
    height: 250
  };
  return chartOptions
},
buttonClick: function() {
  this.showResults = true
  this.forceUpdate()

  $.ajax({
    //data: formData,
    url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/1',
    type: "GET",
    dataType: "json",
    success: function(data) {

      finalData = this.shapeData(data)
      this.computeSharpe(data['future'][(data['future'].length - 1)] ,data['stDev'][(data['stDev'].length - 1)],1)

      seriesDict = {}
      colorArr = []
      for (i = 0; i < finalData[0].length; i++) {
        seriesDict[i] = { lineWidth: 1 }
        colorArr.push('#47B0C4')
      }
      colorArr.pop()
      colorArr.pop()
      colorArr.push('#FFFFFF')
      colorArr.push('#FFFFFF')
      seriesDict[(finalData[0].length-2)] = { lineWidth: 2 }

      chartOptions = this.shapeOptions(seriesDict, colorArr, 'DAY / WEEK')
      chartData = google.visualization.arrayToDataTable(finalData)

      chart = new google.visualization.LineChart(document.getElementById('chart1'));
      document.getElementById('home-text').style.visibility = 'hidden'
      chart.draw(chartData, chartOptions)
      this.forceUpdate()
    }.bind(this)  });



    $.ajax({
      //data: formData,
      url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/2',
      type: "GET",
      dataType: "json",
      success: function(data) {

        finalData = this.shapeData(data)
        this.computeSharpe(data['future'][(data['future'].length - 1)],data['stDev'][(data['stDev'].length - 1)],2)

        seriesDict = {}
        colorArr = []
        for (i = 0; i < finalData[0].length; i++) {
          seriesDict[i] = { lineWidth: 1 }
          colorArr.push('#47B0C4')
        }
        colorArr.pop()
        colorArr.pop()
        colorArr.push('#FFFFFF')
        colorArr.push('#FFFFFF')
        seriesDict[(finalData[0].length-2)] = { lineWidth: 2 }

        chartOptions = this.shapeOptions(seriesDict, colorArr, 'HOURLY / 2 DAYS')
        chartData = google.visualization.arrayToDataTable(finalData)

        chart2 = new google.visualization.LineChart(document.getElementById('chart2'));
        document.getElementById('home-text').style.visibility = 'hidden'
        chart2.draw(chartData, chartOptions)
        this.forceUpdate()
      }.bind(this)  });



      $.ajax({
        //data: formData,
        url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/3',
        type: "GET",
        dataType: "json",
        success: function(data) {

          finalData = this.shapeData(data)
          this.computeSharpe(data['future'][(data['future'].length - 1)],data['stDev'][(data['stDev'].length - 1)],3)

          seriesDict = {}
          colorArr = []
          for (i = 0; i < finalData[0].length; i++) {
            seriesDict[i] = { lineWidth: 1 }
            colorArr.push('#47B0C4')
          }
          colorArr.pop()
          colorArr.pop()
          colorArr.push('#FFFFFF')
          colorArr.push('#FFFFFF')
          seriesDict[(finalData[0].length-2)] = { lineWidth: 2 }

          chartOptions = this.shapeOptions(seriesDict, colorArr, '15 MIN / 3 HOURS')
          chartData = google.visualization.arrayToDataTable(finalData)

          chart3 = new google.visualization.LineChart(document.getElementById('chart3'));
          document.getElementById('home-text').style.visibility = 'hidden'
          chart3.draw(chartData, chartOptions)
          this.forceUpdate()
        }.bind(this)  });




    //document.body.style.backgroundImage = 'url("/assets/secondBG.jpg")';
    //document.getElementById("logo").style.display = 'none';
    //document.body.style.backgroundSize = "90% 118%";
    }
})
