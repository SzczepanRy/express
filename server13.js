const express = require('express');
const app = express();
var cookieSession = require('cookie-session');

app.use(
	cookieSession({
		name: 'session',
		keys: ['key'],

		maxAge: 24 * 60 * 60 * 1000,
	})
);

let superOldData = new Date().toString();
let old3 = superOldData.slice(19, 25);
let mins3 = old3.slice(0, 2);
let sec3 = old3.slice(3, 6);

app.get('/', (req, res) => {
	if (req.session.date) {
		let Data = JSON.stringify(req.session.date);
		let old = Data.slice(20, 25);
		let mins = old.slice(0, 2);
		let sec = old.slice(3, 6);
		req.session.date = new Date().toString();
		let Data2 = JSON.stringify(req.session.date);
		let old2 = Data2.slice(20, 25);
		let mins2 = old2.slice(0, 2);
		let sec2 = old2.slice(3, 6);
		let lastmin = Number(mins2) - Number(mins);
		let lastsec = Number(sec2) - Number(sec);
		if (lastsec < 0) {
			lastsec = Number(sec) - Number(sec2);
		}
		// console.log(old3);
		// console.log(mins3);
		// console.log(sec3);
		let firstmin = Number(mins + sec) - Number(mins3 + sec3);
		let firstsec;
		if (firstmin.length === 3) {
			firstsec = firstmin.slice(-2);
			firstmin = firstmin.slice(0, 1);
			console.log(firstmin);
		} else if (firstmin.length === 4) {
			firstsec = firstmin.slice(-2);
			firstmin = firstmin.slice(0, 2);
		} else {
			firstsec = firstmin;
			firstmin = 0;
		}
		res.send(
			`you first visited us ${firstmin} minutes and ${firstsec} seconds ago
	        <br> you last visited us ${lastmin} minutes and ${lastsec} seconds ago`
		);
		return;
	} else {
		req.session.date = new Date().toString();
		return;
	}
	res.send('site');
});

app.listen(3000, () => console.log('running'));
