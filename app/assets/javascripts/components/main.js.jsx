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
reloadPage: function() {
  window.location.reload(true);
},
renderLogic: function() {
  if (this.showResults == false) {
    return (
    <div id="home-outline">
      <div>
        <div id='field-div'>
          <input id="field-home" onClick={this.clickPressed} onChange={this.keyPressed}  onKeyPress={this.ePress} defaultValue="SPY" type='text' autoComplete="off"></input>
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
    <div>
    <img id="preloader" src='/assets/bars.svg'></img>
    <div id="all">
    <table>
      <tbody >
        <tr>
          <td><div id="chart1"></div><div id="chart1F"></div>{this.determineOutcomes(1)}</td>
          <td><div id="chart2"></div><div id="chart2F"></div>{this.determineOutcomes(2)}</td>
          <td><div id="chart3"></div><div id="chart3F"></div>{this.determineOutcomes(3)}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <a href id="refresh" onClick={this.reloadPage}>Back</a>
    </div>
    )
    }
},
result1: [],
result2: [],
result3: [],
counter: 0,
dataDict: {},
createCharts: function() {
  arr = ["chart1","chart1F","chart2","chart2F","chart3","chart3F"]

  for (i=0; i < arr.length; i++) {
    tempArr = this.dataDict[arr[i]]

    if (tempArr[0] != 'error') {
      chartData = tempArr[0]
      chartOptions = tempArr[1]
      chart = new google.visualization.LineChart(document.getElementById(arr[i]));
      chart.draw(chartData, chartOptions)
    }
  }

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

  if (stdVal <= 1.0) {
    return <div id="info-div">{this.determinePL(num)}<br /><p id="sharpe"><img id="star" className="oneStar" src='/assets/oneS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
  } else if (stdVal > 1.0 && stdVal < 1.50) {
    return <div id="info-div">{this.determinePL(num)}<br /><p id="sharpe"><img id="star" className="twoStars" src='/assets/twoS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
  } else if (stdVal >= 1.5) {
    return <div id="info-div">{this.determinePL(num)}<br /><p id="sharpe"><img id="star" className="threeStars" src='/assets/threeS.png'></img>Sharpe Ratio: {(Math.round(stdVal * 100) / 100).toFixed(2)}</p></div>
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
    return <p id="pl-p" className="green">{'+'+((Math.round(val * 10000) / 10000)*100).toFixed(2).toString()+'%'}</p>
  } else if (val < 0.000000) {
    return <p id="pl-p" className="red">{((Math.round(val * 10000) / 10000)*100).toFixed(2).toString()+'%'}</p>
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
},
keyPressed: function(event) {
  this.currentText = event.target.value.toUpperCase()
},
clickPressed: function(event) {
  event.target.value = ""
},
ePress: function(event) {
  if (event.key == "Enter") {
    this.buttonClick()
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
    width: 350,
    height: 250
  };
  return chartOptions
},
buttonClick: function() {
  document.getElementById('home-text').style.visibility = "hidden"
  this.showResults = true
  this.forceUpdate()

  if (this.currentText.length < 6) {
  $.ajax({
    //data: formData,
    url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/1',
    type: "GET",
    dataType: "json",
    error(xhr,status,error) {
      window.location.reload(true)
    },
    success: function(data) {
      if (data['error'] == 'error') {
        this.counter = this.counter + 1
        return
      }
      finalData = this.shapeData(data)

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

      chartOptions = this.shapeOptions(seriesDict, colorArr, 'DAILY / 2 WEEKS')
      chartData = google.visualization.arrayToDataTable(finalData)

      this.dataDict['chart1'] = [chartData,chartOptions]

      this.computeSharpe(data['future'][(data['future'].length - 1)] ,data['stDev'][(data['stDev'].length - 1)],1)

      fData = []
      for (i=0; i < data['future'].length; i++) {
        fData.push([])
        fData[i].push(i, data['future'][i])
      }
      headerArr = ['one','one']
      fData.unshift(headerArr)

      seriesDict = {}
      colorArr = []
      for (i = 0; i < data['future'].length; i++) {
        seriesDict[i] = { lineWidth: 2 }
        colorArr.push('#FFFFFF')
      }

      chartOptionsF = {
        title: 'Future Performance',
        titlePosition: 'out',
        titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', fontSize: 12, bold: false},
        curveType: 'function',
        legend: { position: 'none' },
        animation: {duration: 1000, startup: 'true', easing: 'linear' },
        vAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
        hAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
        backgroundColor: 'transparent',
        series: seriesDict,
        colors: colorArr,
        width: 300,
        height: 100
      };

      chartDataF = google.visualization.arrayToDataTable(fData)

      this.dataDict['chart1F'] = [chartDataF,chartOptionsF]

      this.counter = this.counter + 1
      if (this.counter == 3) {
          document.getElementById('preloader').style.visibility = "hidden"
          this.createCharts()
      }
    }.bind(this)  });
}
    $.ajax({
      //data: formData,
      url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/2',
      type: "GET",
      dataType: "json",
      error(xhr,status,error) {
        window.location.reload(true)
      },
      success: function(data) {
        if (data['error'] == 'error') {
          this.counter = this.counter + 1
          return
        }
        finalData = this.shapeData(data)

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

        chartOptions = this.shapeOptions(seriesDict, colorArr, 'HOURLY / 24 HOURS')
        chartData = google.visualization.arrayToDataTable(finalData)

        this.dataDict['chart2'] = [chartData,chartOptions]

        this.computeSharpe(data['future'][(data['future'].length - 1)],data['stDev'][(data['stDev'].length - 1)],2)

        fData = []
        for (i=0; i < data['future'].length; i++) {
          fData.push([])
          fData[i].push(i, data['future'][i])
        }
        headerArr = ['one','one']
        fData.unshift(headerArr)

        seriesDict = {}
        colorArr = []
        for (i = 0; i < data['future'].length; i++) {
          seriesDict[i] = { lineWidth: 2 }
          colorArr.push('#FFFFFF')
        }

        chartOptionsF = {
          title: 'Future Performance',
          titlePosition: 'out',
          titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', fontSize: 12, bold: false},
          curveType: 'function',
          legend: { position: 'none' },
          animation: {duration: 1000, startup: 'true', easing: 'linear' },
          vAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
          hAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
          backgroundColor: 'transparent',
          series: seriesDict,
          colors: colorArr,
          width: 300,
          height: 100
        };

        chartDataF = google.visualization.arrayToDataTable(fData)

        this.dataDict['chart2F'] = [chartDataF,chartOptionsF]

        this.counter = this.counter + 1
        if (this.counter == 3) {
          document.getElementById('preloader').style.visibility = "hidden"
          this.createCharts()
        }
      }.bind(this)  });



      $.ajax({
        //data: formData,
        url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/3',
        type: "GET",
        dataType: "json",
        error(xhr,status,error) {
          window.location.reload(true)
        },
        success: function(data) {
          if (data['error'] == 'error') {
            this.counter = this.counter + 1
            return
          }
          finalData = this.shapeData(data)

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

          chartOptions = this.shapeOptions(seriesDict, colorArr, '15 MIN / 6 HOURS')
          chartData = google.visualization.arrayToDataTable(finalData)

          this.dataDict['chart3'] = [chartData,chartOptions]

          this.computeSharpe(data['future'][(data['future'].length - 1)],data['stDev'][(data['stDev'].length - 1)],3)

          fData = []
          for (i=0; i < data['future'].length; i++) {
            fData.push([])
            fData[i].push(i, data['future'][i])
          }
          headerArr = ['one','one']
          fData.unshift(headerArr)

          seriesDict = {}
          colorArr = []
          for (i = 0; i < data['future'].length; i++) {
            seriesDict[i] = { lineWidth: 2 }
            colorArr.push('#FFFFFF')
          }

          chartOptionsF = {
            title: 'Future Performance',
            titlePosition: 'out',
            titleTextStyle: {color: '#FFFFFF', fontName: 'Roboto', fontSize: 12, bold: false},
            curveType: 'function',
            legend: { position: 'none' },
            animation: {duration: 1000, startup: 'true', easing: 'linear' },
            vAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
            hAxis: {baselineColor: 'white', textStyle: { color: 'white'}},
            backgroundColor: 'transparent',
            series: seriesDict,
            colors: colorArr,
            width: 300,
            height: 100
          };

          chartDataF = google.visualization.arrayToDataTable(fData)

          this.dataDict['chart3F'] = [chartDataF,chartOptionsF]

          this.counter = this.counter + 1
          if (this.counter == 3) {
            document.getElementById('preloader').style.visibility = "hidden"
            this.createCharts()
          }
        }.bind(this)  });

    //document.body.style.backgroundImage = 'url("/assets/secondBG.jpg")';
    //document.getElementById("logo").style.display = 'none';
    //document.body.style.backgroundSize = "90% 118%";
    }
})
