var Main = React.createClass({
getInitialState: function() {
  return {
  }
},
componentDidMount: function() {
  this.fetchQuotes()
  //setInterval(this.fetchQuotes, 10000)
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
        {this.smallBar()}
        {this.renderList()}
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
renderList: function() {
    return (<div className="dropdown">
              <button className="dropbtn">Tickers...</button>
                <div className="dropdown-content">
                  {this.completeList()}
                </div>
              </div>)
},
completeList: function() {
  liArray = []
  arr = ['ABT','ABBV','ACN','ATVI','AYI','ADBE','AAP','AES','AET','AMG','AFL','A','GAS','APD','AKAM','ALK','AA','ALXN',
  'ALLE','AGN','ADS','ALL','GOOGL','GOOG','MO','AMZN','AEE','AAL','AEP','AXP','AIG','AMT','AWK','AMP','ABC','AME','AMGN','APH',
  'APC','ADI','ANTM','AON','APA','AIV','AAPL','AMAT','ADM','AJG','AIZ','T','ADSK','ADP','AN','AZO','AVGO','AVB','AVY','BHI',
  'BLL','BAC','BCR','BAX','BBT','BDX','BBBY','BRK-B','BBY','BIIB','BLK','HRB','BA','BWA','BXP','BSX','BMY','BF-B','CHRW','CA',
  'CVC','COG','CPB','COF','CAH','KMX','CCL','CAT','CBG','CBS','CELG','CNC','CNP','CTL','CERN','CF','SCHW','CHK','CVX','CMG','CB',
  'CHD','CI','XEC','CINF','CTAS','CSCO','C','CFG','CTXS','CME','CMS','COH','CTSH','CL','CPGX','CMCSA','CMA','CAG','CXO','COP','ED',
  'STZ','GLW','COST','CCI','CSRA','CSX','CMI','CVS','DHI','DHR','DRI','DVA','DE','DLPH','DAL','XRAY','DVN','DO','DLR','DFS','DISCA',
  'DISCK','DG','DLTR','D','DOV','DOW','DPS','DTE','DD','DUK','DNB','ETFC','EMN','ETN','EBAY','ECL','EIX','EW','EA','EMC','EMR','ENDP',
  'ETR','EOG','EQT','EFX','EQIX','EQR','ESS','EL','ES','EXC','EXPE','EXPD','ESRX','EXR','XOM','FFIV','FB','FAST','FRT','FDX','FIS',
  'FITB','FSLR','FE','FISV','FLIR','FLS','FLR','FMC','FTI','FL','F','BEN','FCX','FTR','GPS','GRMN','GD','GE','GGP','GIS','GM','GPC',
  'GILD','GPN','GS','GT','GWW','HAL','HBI','HOG','HAR','HRS','HIG','HAS','HCA','HCP','HP','HSIC','HES','HPE','HOLX','HD','HON','HRL',
  'HST','HPQ','HUM','HBAN','ITW','ILMN','IR','INTC','ICE','IBM','IP','IPG','IFF','INTU','ISRG','IVZ','IRM','JBHT','JEC','JNJ','JCI','JPM',
  'JNPR','KSU','K','KEY','KMB','KIM','KMI','KLAC','KSS','KHC','KR','LB','LLL','LH','LRCX','LM','LEG','LEN','LUK','LVLT','LLY','LNC','LLTC',
  'LKQ','LMT','L','LOW','LYB','MTB','MAC','M','MMM','MNK','MRO','MPC','MAR','MMC','MLM','MAS','MA','MAT','MKC','MCD','MCK','MJN','MDT','MRK','MET',
  'KORS','MCHP','MU','MSFT','MHK','TAP','MDLZ','MON','MNST','MCO','MS','MSI','MUR','MYL','NDAQ','NOV','NAVI','NTAP','NFLX','NWL','NFX','NEM',
  'NWSA','NWS','NEE','NLSN','NKE','NI','NBL','JWN','NSC','NTRS','NOC','NRG','NUE','NVDA','ORLY','OXY','OMC','OKE','ORCL','OI','PCAR','PH',
  'PDCO','PAYX','PYPL','PNR','PBCT','PEP','PKI','PRGO','PFE','PCG','PM','PSX','PNW','PXD','PBI','PNC','RL','PPG','PPL','PX','PCLN','PFG',
  'PG','PGR','PLD','PRU','PEG','PSA','PHM','PVH','QRVO','QCOM','PWR','DGX','RRC','RTN','O','RHT','REGN','RF','RSG','RAI','RHI','ROK','COL',
  'ROP','ROST','RCL','R','SPGI','CRM','SCG','SLB','SNI','STX','SEE','SRE','SHW','SIG','SPG','SWKS','SLG','SJM','SNA','SO','LUV','SWN','SE',
  'STJ','SWK','SPLS','SBUX','HOT','STT','SRCL','SYK','STI','SYMC','SYF','SYY','TROW','TGT','TEL','TE','TGNA','TDC','TSO','TXN','TXT','BK',
  'CLX','KO','HSY','MOS','TRV','DIS','TMO','TIF','TWX','TJX','TMK','TSS','TSCO','TDG','RIG','TRIP','FOXA','FOX','TYC','TSN','USB','UDR','ULTA',
  'UA','UNP','UAL','UNH','UPS','URI','UTX','UHS','UNM','URBN','VFC','VLO','VAR','VTR','VRSN','VRSK','VZ','VRTX','VIAB','V','VNO','VMC','WMT',
  'WBA','WM','WAT','WFC','HCN','WDC','WU','WRK','WY','WHR','WFM','WMB','WLTW','WEC','WYN','WYNN','XEL','XRX','XLNX','XL','XYL','YHOO','YUM',
  'ZBH','ZION','ZTS']

  for (ind=0; ind < arr.length; ind++) {
    liArray.push(<a key={arr[ind]} onClick={this.listClick}>{arr[ind]}</a>)
  }

  return liArray

},
smallBar: function() {
  if (this.showHome == false) {
    return <div id="searchQuote"><input id="quoteSearch" type="search" onChange={this.pressed} onKeyPress={this.ePress} autoComplete="off"></input><button type='button' id="quoteB" onClick={this.sButtonPressed}></button></div>
  }
},
ePress: function(event) {
    if (event.key == "Enter") {
    this.sButtonPressed()
    document.getElementById('quoteSearch').value = ""
    }
},
buttonPressed: function(val) {
  this.currentText = val
  this.showHome = false
  this.quotes = []
  this.fetchQuotes()
  this.forceUpdate()
},
quoteClick: function(event) {
  this.showHome = true
  this.forceUpdate()
  this.buttonPressed(event.target.value)
},
listClick: function(event) {
  this.showHome = true
  this.forceUpdate()
  this.buttonPressed(event.target.text)
},
sButtonPressed: function() {
  this.showHome = false
  this.quotes = []
  this.fetchQuotes()
  document.getElementById('quoteSearch').value = ""
  this.forceUpdate()
},
pressed: function(event) {
  this.currentText = event.target.value.toUpperCase()
  console.log(this.currentText)
},
fetchQuotes: function() {
  this.quotes = []
  if (this.showHome == true) {
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
        this.renderOk = true
        this.forceUpdate()
      }.bind(this)  });
  } else {
    this.renderOk = false
    $.ajax({
      //data: formData,
      url: 'https://agile-wave-32875.herokuapp.com/quotes/'+this.currentText,
      type: "GET",
      dataType: "json",
      error(xhr,status,error) {
        console.log("Quote fetch error")
      },
      success: function(data) {
        access = data.list.resources
        sym = access[0].resource.fields.symbol
        name = access[0].resource.fields.issuer_name
        change = access[0].resource.fields.chg_percent
        this.quotes.push([sym,name,change])
        this.renderOk = true
        this.forceUpdate()
      }.bind(this)  });
  }
},
handleUpdate: function() {
  this.forceUpdate()
},
renderQuotes: function() {
  if (this.renderOk == true) {
    if (this.showHome == true) {
    var qFormatArr = this.quotes.slice()
    qFormatArr.splice(0,3)
    one = qFormatArr[Math.floor(Math.random()*qFormatArr.length)]

    return (
      <div>
        {this.formatQuote('S&P 500',this.quotes[0][2],this.quotes[0][1])}
        {this.formatQuote('DOW',this.quotes[1][2],this.quotes[1][1])}
        {this.formatQuote('NASDAQ',this.quotes[2][2],this.quotes[2][1])}
        {this.formatQuote(one[0],one[2],one[1])}
      </div>
    )
  } else {
    return (
      <div>
        {this.formatQuote(this.currentText,this.quotes[0][2],this.quotes[0][1])}
      </div>
    )
  }
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
    } else if (tempChg.toString().length == 1) {
      tempChg = tempChg.toString()+".00"
    }
  }

  finalStyle = {}

  if (this.showHome == true) {
    finalStyle = {
      fontSize: '18px'
    }
  } else {
    finalStyle = {
      fontSize: '42px',
      lineHeight: '50px',
    }
  }

  if (change.charAt(0) == '-') {
    if (sym == "S&P 500" || sym == "DOW" || sym == "NASDAQ") {
      return <div><p id="redChange">{tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<p value={sym} id="quotePar" style={finalStyle}>{sym}</p></div>
    } else {
      return <div><p id="redChange">{tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<a onClick={this.quoteClick} value={sym} id="quotePar" style={finalStyle}>{sym}</a></div>
    }
  } else {
    if (sym == "S&P 500" || sym == "DOW" || sym == "NASDAQ") {
      return <div><p id="greenChange">{"+"+tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<p value={sym} id="quotePar" style={finalStyle}>{sym}</p></div>
    } else {
        return <div><p id="greenChange">{"+"+tempChg+"%"}</p>{"\u00a0"}{"\u00a0"}<a onClick={this.quoteClick} value={sym} id="quotePar" style={finalStyle}>{sym}</a></div>
    }
  }
},
})
