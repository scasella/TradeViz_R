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
        sym = access[i].fields.symbol
        name = access[i].fields.issuer_name
        change = access[i].fields.chg_percent
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
