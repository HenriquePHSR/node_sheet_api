// IMPORTS
const { request, response } = require('express');
const express = require('express');
const url = require('url');
const { google } = require('googleapis');
const server = express();
const creds = require('./node-303718-5b8958132dcc.json');
const path = require('path');
const router = express.Router();
const config = {
	spreadsheetId: '1m4Kcczk3JABIb2A_0HCnW4j1A5NUn2eRSszQrkympTg',
	range: 'B1:B100'
};

/*
 * DATA LIMITS:
 * This version of the Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user. Limits for reads and writes 
 * are tracked separately. There is no daily usage limit.
*/

// https://github.com/coreybutler/nvm-windows/releases
// https://nodejs.org
// https://developers.google.com/sheets/api/quickstart/nodejs
// https://console.developers.google.com/
// https://developers.google.com/identity/protocols/googlescopes
// https://developers.google.com/sheets/api/reference/rest

const client = new google.auth.JWT(
	creds.client_email,
	null,
	creds.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize( (err, tk) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('connection established');
	}
});

// request sheet values
async function queryCPF(cpf) {
	const gsapi = google.sheets({ version: 'v4', auth: client });
	let opt = {
		spreadsheetId: config.spreadsheetId,
		range: config.range
	};
	let sheet = await gsapi.spreadsheets.values.get(opt);
	let sheet_values = await sheet.data.values;
	return await sheet_values;
	// return await sheet_values.find(x => x == cpf);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let port = 8080;
server.listen(port, () => {
    console.log('listening in port ' + String(port));
});

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
	//__dirname : It will resolve to your project folder.
});

router.get('/pass', function (req, res) {
	res.sendFile(path.join(__dirname + '/pass.html'));
});

//server.use(express.static('static'));
server.use(express.json({ limit: '1mb' }));
server.use('/', router);
/*
server.post('/api',async (request, response) => {

	let cpf = request.body.cpf;
	let query = queryCPF(cpf);
	//console.log(query);
	//console.log(request.body);
	query.then(resolve => {
		//console.log(resolve.find(x => x == cpf));
		response.json({
			status: 'success',
			cpf: resolve
		});
	})
	
});
*/
server.get('/api', (request, response) => {
	var q = url.parse(request.url, true).query;
	var cpf = q.cpf;
	let query = queryCPF(cpf);
	query.then(resolve => {
		response.json({
			status: 'success',
			cpf: resolve
		});
	})
});


