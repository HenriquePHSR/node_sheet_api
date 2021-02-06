var http = require('http');
var url = require('url');

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


http.createServer(async function (req, res) {

    var q = url.parse(req.url, true).query;
	var cpf = q.cpf;

	const gsapi = google.sheets({ version: 'v4', auth: client });
	let opt = {
		spreadsheetId: '16gGrqDAJ7xR30TicmcRvXI8qM5q8E5aEFztFYg4dxKo',
		range: 'H1:H25'
	};
	let sheet = await gsapi.spreadsheets.values.get(opt);


	res.setHeader('Content-Type', 'application/json');
	



	console.log(sheet.data.values);
	let data = sheet.data.values;
	let query = data.find(x => x == cpf);
	if (query !== undefined) {
		console.log('####');
		console.log(query);
		res.write('True');
		res.end(JSON.stringify({ response: 'True' }));
	} else {
		res.end(JSON.stringify({ response: 'False' }));
    }

	

	

	// ESCRITA
/*opt = {
	spreadsheetId: '16gGrqDAJ7xR30TicmcRvXI8qM5q8E5aEFztFYg4dxKo',
	range: 'A300',
	valueInputOption: 'USER_ENTERED',
	resource: { values: values }
};
let response = await gsapi.spreadsheets.values.update(opt);
console.log(response);*/
	
    
}).listen(8080);