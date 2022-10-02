/************************************************
 * IMPORTS
 ************************************************/

const express = require("express");
const { text } = require("express");
const { default: axios } = require("axios");
require('dotenv').config()


/************************************************
 * CONSTANTS
 ************************************************/

const port = 3000;

/************************************************
 * INITIALIZE GLOBAL
 ************************************************/

const app = express();
const https = require('https')
/************************************************
 * METHOD FOR LOG APP
 ************************************************/

app.listen(port, () => {
	console.log(`App start on port ${port}`);
});



app.get('/v1/quote', async function (req, res) {

var options = {
  hostname: 'api.uniswap.org',
  path: '/v1/quote?protocols='+req.query.protocols+'&tokenInAddress='+req.query.tokenInAddress+'&tokenInChainId='+req.query.tokenInChainId+'&tokenOutAddress='+req.query.tokenOutAddress+'&tokenOutChainId='+req.query.tokenOutChainId+
  		'&amount='+req.query.amount+'&type='+req.query.type,
  headers: {
	origin : 'https://app.uniswap.org',
	referer: 'https://app.uniswap.org',
  },
//   path: "/v1/quote",

};

callback = function(response) {
  var str = '';
  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
	  str += chunk;
	});
	
	//the whole response has been received, so we just print it out here
	response.on('end', function () {
		
	res.set({'Content-Type': 'text/event-stream','access-control-allow-origin':'*'})
	
	res.send(JSON.parse(str))
    // console.log(str);
  });
}

https.request(options, callback).end();
})
