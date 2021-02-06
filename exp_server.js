const { request, response } = require('express');
const express = require('express');
const url = require('url');

const server = express();
const { google } = require('googleapis');
const creds = require('./nodeSheetApi-5abbf341a926.json')


// https://github.com/coreybutler/nvm-windows/releases
// nodejs.org
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

client.authorize(function (err, tk) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('connection established');

	}
});

async function queryCPF(cpf) {
	// request sheet values
	const gsapi = google.sheets({ version: 'v4', auth: client });
	let opt = {
		spreadsheetId: '16gGrqDAJ7xR30TicmcRvXI8qM5q8E5aEFztFYg4dxKo',
		range: 'H1:H25'
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
server.use(express.static('static'));
server.use(express.json({ limit: '1mb' }));
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

//server.get('/api', (request, response) => {
//    var q = url.parse(req.url, true).query;
//    var cpf = q.cpf;
//});