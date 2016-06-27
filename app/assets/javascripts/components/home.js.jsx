var Home = React.createClass({
getInitialState: function() {
  return {
  }
},
componentDidMount: function() {
  setTimeout(this.loadCharts, 2500)
},
//interval: setInterval(this.fetchQuotes, 10000),
result1: [],
result2: [],
result3: [],
currentText: "SPY",
dataDict: [],
resultSymbols: [],
render: function() {
  return (
  <div>
      {this.renderLogic()}
      <div id="home-text">Match your stock's chart pattern to over 5,305,608 historical patterns, visualize the outcomes, and trade with the odds on your side.</div>
        <table>
          <tbody >
            <tr>
              <td id="hOne"><div id="chart1H">{this.determineOutcomes(1)}</div></td>
              <td id="hTw"><div id="chart2H">{this.determineOutcomes(2)}</div></td>
              <td id="hTh"><div id="chart3H">{this.determineOutcomes(3)}</div></td>
            </tr>
          </tbody>
        </table>
  </div>
  )
},
renderLogic: function() {
    return (
    <div id="home-outline">
      <div>
        <div id='field-div'>
          <input id="field-home" onClick={this.clickPressed} onChange={this.keyPressed} onKeyPress={this.ePress} defaultValue="SPY" type='text' autoComplete="off"></input>
        </div>
          <button type='button' id="b-home" onClick={this.clicked}></button>
      </div>
      <div>
        <p id='home-subtitle'>enter symbol (i.e., AAPL, EURUSD, TLT)</p>
      </div>
    </div>
      )
},
clicked: function() {
  this.props.pressed(this.currentText)
},
reloadPage: function() {
  location.reload(true)
},
createCharts: function() {
  arr = ["chart3H","chart2H","chart1H"]
    for (i=0; i < 3; i++) {
      tempArr = this.dataDict[i]

      chartData = tempArr[0]
      chartOptions = tempArr[1]
      chart = new google.visualization.LineChart(document.getElementById(arr[i]));
      chart.draw(chartData, chartOptions)
    }
  document.getElementById('hOne').style.visibility = "visible"
  document.getElementById('hTw').style.visibility = "visible"
  document.getElementById('hTh').style.visibility = "visible"
  this.forceUpdate()
},
determineOutcomes: function(num) {
  stdVal = null
  if (num == 1) {
    stdVal = this.result1[2]
  } else if (num == 2) {
    stdVal = this.result2[2]
  } else if (num == 3) {
    stdVal = this.result3[2]
  }

  if (stdVal < 0.75) {
    return <div id="home-div"><p id="captionH">Avg. Future Performance</p>{this.determinePL(num)}<br /><p id="sharpeH"><img id="star" className="oneStar" src='/assets/oneS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
  } else if (stdVal >= 0.75 && stdVal < 1.00) {
    return <div id="home-div"><p id="captionH">Avg. Future Performance</p>{this.determinePL(num)}<br /><p id="sharpeH"><img id="star" className="twoStars" src='/assets/twoS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
  } else if (stdVal >= 1.00) {
    return <div id="home-div"><p id="captionH">Avg. Future Performance</p>{this.determinePL(num)}<br /><p id="sharpeH"><img id="star" className="threeStars" src='/assets/threeS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
  }

},
determinePL: function(num) {
  val = 0.0
  if (num == 1) {
    val = parseFloat(this.result1[0])
  } else if (num == 2) {
    val = parseFloat(this.result2[0])
  } else if (num == 3) {
    val = parseFloat(this.result3[0])
  }

  if (val >= 0.000000) {
    return <p id="pl-pH" value={(num-1)} onClick={this.plClicked} className="green">{'+'+((Math.round(val * 10000) / 10000)*100).toFixed(2).toString()+'%'}</p>
  } else if (val < 0.000000) {
    return <p id="pl-pH" value={(num-1)} onClick={this.plClicked} className="red">{((Math.round(val * 10000) / 10000)*100).toFixed(2).toString()+'%'}</p>
  }

},
plClicked: function(event) {
  this.props.pressed(this.resultSymbols[event.target.value])
},
computeSharpe: function(futureE,std,selection) {
  if (selection == 1) {
    this.result1.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  } else if (selection == 2) {
    this.result2.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  } else if (selection == 3) {
    this.result3.push(futureE,std,(Math.abs(futureE)/Math.abs(std)))
  }
},
keyPressed: function(event) {
  this.currentText = event.target.value.toUpperCase()
},
clickPressed: function(event) {
  event.target.value = ""
},
ePress: function(event) {
  if (event.key == "Enter") {
    this.props.pressed(this.currentText)
  }
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
    titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', fontSize: 12},
    curveType: 'function',
    legend: { position: 'none' },
    animation: {duration: 2000, startup: 'true', easing: 'linear' },
    vAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
    hAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
    backgroundColor: 'transparent',
    tooltip : {trigger: 'none'},
    enableInteractivity: false,
    series: seriesDict,
    colors: colorArr,
    //chartArea: {backgroundColor: 'E7ECEA'},
    width: 175,
    height: 125
  };
  return chartOptions
},
loadCharts: function() {
    $.ajax({
      //data: formData,
      url: 'https://agile-wave-32875.herokuapp.com/best',
      type: "GET",
      dataType: "json",
      error(xhr,status,error) {
        //window.location.reload()
      },
      success: function(data) {
        this.dataHandler(data)
      }.bind(this)  });
},
shuffleArray: function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
},
dataHandler: function(data) {

  newData = this.shuffleArray(data)
  for (count=0; count < 3; count++) {

    dataR = newData[count]
    this.resultSymbols.push(newData[count]['symbol'])
    finalData = this.shapeData(dataR)
    //Set line colors
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
    chartOptions = this.shapeOptions(seriesDict, colorArr, dataR['symbol'])

    chartData = google.visualization.arrayToDataTable(finalData)

    this.dataDict.push([chartData,chartOptions])

    this.computeSharpe(dataR['future'][(dataR['future'].length - 1)] ,dataR['stDev'][(dataR['stDev'].length - 1)],count+1)

    if (count==2) {
      this.createCharts()
    }

  }
}
})
