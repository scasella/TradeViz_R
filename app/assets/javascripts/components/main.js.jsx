var Main = React.createClass({
getInitialState: function() {
  return {
    test: []
  }
},
componentDidMount: function() {
  // Instantiate and draw our chart, passing in some options.

  console.log("mounted")
},
currentText: "",
render: function() {
  return (
  <div>
    <div id="secondary-bg">
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
      <div id="home-text"></div>
      </div>
  </div>
  )
},
keyPressed: function(event) {
  this.currentText = event.target.value.toUpperCase()
  console.log(this.currentText)
},
buttonClick: function() {
  $.ajax({
    //data: formData,
    url: 'https://agile-wave-32875.herokuapp.com/'+this.currentText+'/1',
    type: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
    }.bind(this)
  });
  //GLOBAL_CHART = true
    //chart.draw(chartData, chartOptions)
    console.log("test")
    //document.body.style.backgroundImage = 'url("/assets/secondBG.jpg")';
    //document.getElementById("logo").style.display = 'none';
    //document.body.style.backgroundSize = "90% 118%";
    }
})

GLOBAL_CHART = false
GLOBAL_DATA = [
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]
