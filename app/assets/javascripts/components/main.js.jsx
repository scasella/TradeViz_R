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
render: function() {
  return (
  <div>
    <div id="home-outline">
      <div>
        <div id='field-div'>
          <input id="field-home" defaultValue="SPY" type='text' autoComplete="off"></input>
        </div>
          <button type='button' id="b-home" onClick={this.buttonClick}></button>
        </div>
        <div>
          <p id='home-subtitle'>enter symbol (i.e., AAPL, EURUSD, TLT)</p>
        </div>
      </div>
      <div id="home-text"></div>
  </div>
  )
},
buttonClick: function() {
  GLOBAL_CHART = true
    chart.draw(chartData, chartOptions)
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
