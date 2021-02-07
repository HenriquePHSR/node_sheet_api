const {google} = require('googleapis');
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

client.authorize(function(err, tk){
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('connection established');
		gsrun(client);
	}
});

async function gsrun(client){
	const gsapi = google.sheets({version: 'v4', auth: client});
	let opt = {
		spreadsheetId: '16gGrqDAJ7xR30TicmcRvXI8qM5q8E5aEFztFYg4dxKo',
		range: 'A1:Z10'
	};
	let sheet = await gsapi.spreadsheets.values.get(opt);
	// console.log(sheet.data.values);
	let values = sheet.data.values;
	values = values.map(function(THIS) {
		THIS.push(THIS[0] + '-' + THIS[1]);
		return THIS;
	});

	//values = values.map(function(this) {
	//	while (this.lenght < 2) {
	//		this.push('');
	//	}
	//	return this
	//});

	opt = {
		spreadsheetId: '16gGrqDAJ7xR30TicmcRvXI8qM5q8E5aEFztFYg4dxKo',
		range: 'A300',
		valueInputOption: 'USER_ENTERED',
		resource: { values: values}
	};
	let response = await gsapi.spreadsheets.values.update(opt);
	console.log(response);
}