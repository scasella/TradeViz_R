var Main = React.createClass({
getInitialState: function() {
  return {
  }
},
componentDidMount: function() {
  this.fetchQuotes()
  setInterval(this.fetchQuotes, 15000)
  this.interval = setInterval(this.handleUpdate, 8000)
},
interval: "",
showHome: true,
currentText: "",
renderOk: false,
quotes: [],
render: function() {
  return (
    <div>
      <div id="quoteDiv">
        {this.renderQuotes()}
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

  $.ajax({
    //data: formData,
    url: 'https://agile-wave-32875.herokuapp.com/quotes',
    type: "GET",
    dataType: "json",
    error(xhr,status,error) {
      console.log("Quote fetch error")
    },
    success: function(data) {
      access = data.list.resources
      for (i = 0; i < access.length; i++) {
        sym = access[i].resource.fields.symbol
        name = access[i].resource.fields.issuer_name
        change = access[i].resource.fields.chg_percent
        this.quotes.push([sym,name,change])
      }
      this.renderOK = true
      this.forceUpdate()
    }.bind(this)  });
},
handleUpdate: function() {
  this.forceUpdate()
},
renderQuotes: function() {
  if (this.renderOK == true) {
    var qFormatArr = this.quotes.slice()
    qFormatArr.splice(0,3)
    one = qFormatArr[Math.floor(Math.random()*qFormatArr.length)]

    //ind = qArrCopy.indexOf(one)
    //qArrCopy.splice(ind,1)

    //two = qArrCopy[Math.floor(Math.random()*qArrCopy.length)]
    //ind = qArrCopy.indexOf(two)
    //qArrCopy.splice(ind,1)

    //test = [Math.floor(Math.random()*qArrCopy.length)]
    //three = qArrCopy[test]

    return (
      <div>
        {this.formatQuote('S&P 500',this.quotes[0][2],this.quotes[0][1])}
        {this.formatQuote('DOW',this.quotes[1][2],this.quotes[1][1])}
        {this.formatQuote('NASDAQ',this.quotes[2][2],this.quotes[2][1])}
        {this.formatQuote(one[0],one[2],one[1])}
      </div>
    )
  } else {
    return
  }
},
formatQuote: function(sym,change,name) {
  var tempChg = ((Math.round(parseFloat(change) * 100))/100)
  if (change.charAt(0) == '-') {
    if (tempChg.toString().length == 4)
      tempChg = tempChg.toString()+"0"
  } else {
    if (tempChg.toString().length == 3) {
      tempChg = tempChg.toString()+"0"
    }
  }
  if (change.charAt(0) == '-') {
    if (sym == "S&P 500" || sym == "DOW" || sym == "NASDAQ") {
      return <div><p id="redChange">{tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<a onClick={this.quoteClick} value={sym} id="quotePar">{sym}</a></div>
    } else {
      return <div><p id="redChange">{tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<p value={sym} id="quotePar">{sym}</p></div>
    }
  } else {
    if (sym == "S&P 500" || sym == "DOW" || sym == "NASDAQ") {
      return <div><p id="greenChange">{"+"+tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<p value={sym} id="quotePar">{sym}</p></div>
    } else {
        return <div><p id="greenChange">{"+"+tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<a onClick={this.quoteClick} value={sym} id="quotePar">{sym}</a></div>
    }
  }
},
})
