const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
	{ nick: '111', email: '111@w.pl' },
	{ nick: '222', email: '222@w.pl' },
	{ nick: '333', email: 'afsd' },
	{ nick: '111', email: '11sdf1@w.pl' },
	{ nick: '222', email: '2sdfff22@w.pl' },
	{ nick: '333', email: 'add' },
	{ nick: '111', email: '11dsf1@w.pl' },
	{ nick: '222', email: '22ff2@w.pl' },
	{ nick: '333', email: 'aff' },
];

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/static/l2/cw2.html'));
});

app.post('/handlePost', (req, res) => {
	const { name, email } = req.body;
	let isInArr = false;
	users.map((el) => {
		if (el.email === email) isInArr = true;
	});
	console.log(isInArr);
	if (isInArr) {
		res.send('<h1>email alrady exists</h1><br>  <a href="/">bact to home</a>');
	} else {
		users.push(req.body);

		res.send('<h1>you have been added</h1><br> <a href="/">bact to home</a>');
	}
});

app.get('/select', async (req, res) => {
	let str = `
    <form action="/delete" method="post">
    <select name="email">`;
	users.map((el) => {
		str += `<option  >${el.email}</option>`;
	});
	str += `</select>
    <button type="submit">delete</button>
    </form>`;
	res.send(str);
});
app.get('/radio', async (req, res) => {
	let str = `
    <form action="/delete" method="post">`;
	users.map((el) => {
		str += `<input type="radio" name="email" value="${el.email}" >${el.email}</input><br>`;
	});
	str += `
    <button type="submit">delete</button>
    </form>`;
	res.send(str);
});
app.get('/checkbox', async (req, res) => {
	let str = `
    <form action="/delete" method="post">`;
	users.map((el) => {
		str += `<input type="checkbox" name="email" value="${el.email}" >${el.email}</input><br>`;
	});
	str += `
    <button type="submit">delete</button>
    </form>`;
	res.send(str);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/delete', (req, res) => {
	const { email } = req.body;
	if (typeof email === 'string') {
		users = users.filter((el) => {
			if (el.email !== email) {
				return el;
			}
		});
	} else {
		for (let i of email) {
			users = users.filter((el) => {
				if (el.email !== i) {
					return el;
				}
			});
		}
	}

	console.log(users);
	res.send('<h1>email deleted</h1><br> <a href="/">bact to home</a>');
});

app.listen(3000, () => {
	console.log('running');
});
