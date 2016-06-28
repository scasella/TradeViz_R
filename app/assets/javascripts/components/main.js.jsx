var Main = React.createClass({
getInitialState: function() {
  return {
  }
},
componentDidMount: function() {
  this.fetchQuotes()
  setInterval(this.fetchQuotes, 60000)
  setInterval(this.handleUpdate, 8000)
},
showHome: true,
currentText: "",
renderOk: false,
quotes: [],
render: function() {
  return (
    <div>
      <div id="quoteTable">
        <table>
          <tbody>
            {this.renderQuotes()}
          </tbody>
        </table>
      </div>
      <div id="secondary-bg">
        {this.renderChoice()}
      </div>
    </div>
  )
},
renderChoice: function(){
  if (this.showHome == true) {
    return (
      <div>
        <Home pressed={this.buttonPressed}/>
      </div>
    )
  } else {
    return (
      <div>
        <Quote key={this.currentText} quote={this.currentText}/>
      </div>
  )
  }
},
buttonPressed: function(val) {
  this.currentText = val
  this.showHome = false
  this.forceUpdate()
},
quoteClick: function(event) {
  this.showHome = true
  this.forceUpdate()
  this.buttonPressed(event.target.value)
},
fetchQuotes: function() {
  this.quotes = []
  arr = ['SPY','TLT','AAPL','GOOGL','AMZN','NFLX','BAC','JPM','MCD','TSLA','MCD','NKE','MSFT',
  'XLE','XLF','QQQ','FB','VZ','GE','BA','HD','DIS','JNJ','GS','PCLN','MS','TJX','M','SBUX','XOM','V','MA',
  'XLU','IBM','INTC','XLV','XLI','IYR','XLY','EEM','FXI','GLD','SLV','GDX','FXE','UUP','HYG','SMH']

  for (i = 0; i < arr.length; i++) {
    try {
      var ind = i
      const url = "http://query.yahooapis.com/v1/public/yql";
      const symbol = arr[i]
      const data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

      $.getJSON(url, 'q=' + data + "&format=json&env=http://datatables.org/alltables.env")
      .done(function (data) {
        sym = data.query.results.quote.symbol
        name = data.query.results.quote.Name
        change = data.query.results.quote.PercentChange
        this.quotes.push([sym,name,change])
        if (this.quotes.length == arr.length) {
            this.renderOK = true
            this.forceUpdate()
        }
      }.bind(this))
    }
    catch(err) {
      continue
    }
    }
},
handleUpdate: function() {
  this.forceUpdate()
},
renderQuotes: function() {
  if (this.renderOK == true) {
    qArrCopy = this.quotes

    one = qArrCopy[Math.floor(Math.random()*qArrCopy.length)]
    ind = qArrCopy.indexOf(one)
    qArrCopy.splice(ind,1)

    two = qArrCopy[Math.floor(Math.random()*qArrCopy.length)]
    ind = qArrCopy.indexOf(two)
    qArrCopy.splice(ind,1)

    test = [Math.floor(Math.random()*qArrCopy.length)]
    three = qArrCopy[test]

    return (
      <tr>
        <td id="tdTwo">{this.formatQuote(one[0],one[2],one[1])}</td>
        <td id="tdTwo">{this.formatQuote(two[0],two[2],two[1])}</td>
        <td id="tdTwo">{this.formatQuote(three[0],three[2],three[1])}</td>
      </tr>
    )
  } else {
    return
  }
},
formatQuote: function(sym,change,name) {
  if (change.charAt(0) == '-') {
    return <div id="quoteDiv"><a onClick={this.quoteClick} value={sym} id="quotePar">{sym}</a>{"\u00a0"}{"\u00a0"}<p id="redChange">{change}</p><br /><p id="namePar">{name}</p></div>
  } else {
    return <div id="quoteDiv"><a onClick={this.quoteClick} value={sym} id="quotePar">{sym}</a>{"\u00a0"}{"\u00a0"}<p id="greenChange">{change}</p><br /><p id="namePar">{name}</p></div>
  }
},

})
