const express = require("express");
const cors = require("cors");
var mysql = require("mysql");

const bodyParser = require("body-parser");
const connection = mysql.createConnection({
	host: "localhost",
	database: "cogent",
	user: "pratyush",
	password: "***********",
});

connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("connection success");
	}
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/AddItem", (req, res) => {
	const { count, itemName, itemCode, specs } = req.body;
	var query = `INSERT INTO inventory (count, itemName, itemCode, specs) VALUE ('${count}', '${itemName}', '${itemCode}', '${specs}')`;
	connection.query(query, (err, results) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				var query = `UPDATE inventory set count = count + ${count} where itemCode = '${itemCode}'`;
				connection.query(query, (err, results) => {
					if (err) {
						console.log(err);
					} else {
						console.log(results);
					}
				});
			}
			console.log("query response is ", err);
			res.send(err);
		} else {
			console.log("query response is ", results);
			res.send("Item Added");
		}
	});
});

app.post("/AddCustomer", (req, res) => {
	/* prettier-ignore */
	const { name, phoneNumber, serialNumber, dateOfService, problemDesc } = req.body;
	var query = `INSERT INTO customer (name, phoneNumber, serialNumber, dateOfService, problemDesc) VALUE ('${name}', '${phoneNumber}', '${serialNumber}', NOW(), '${problemDesc}')`;
	connection.query(query, (error, results) => {
		if (error) {
			console.log(error);
			res.send(err);
		} else {
			console.log(results);
			res.send("Customer Added");
		}
	});
});

app.post("/searchItems", (req, res) => {
	console.log(req.body);
	const { itemCode, itemName, specs } = req.body;
	const query = `select * from inventory where itemCode like '${itemCode}%' and itemName like '${itemName}%' and specs like '${specs}%'`;
	connection.query(query, (error, results) => {
		if (error) {
			console.log(error);
			res.send(err);
		} else {
			console.log(results);
			res.send(results);
		}
	});
});

app.post("/searchCustomer", (req, res) => {
	/* prettier-ignore */
	const { serialNumber, dateOfService } = req.body;
	const query = `select * from customer where serialNumber like '${serialNumber}%' and dateOfService like '${dateOfService}%'`;
	connection.query(query, (error, results) => {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			console.log(results);
			res.send(results);
		}
	});
});

app.get("/hi", (req, res) => {
	res.send("<h1>Hi Swagat</h1>");
});

var server = app.listen(8080, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening on %s:%s", host, port);
});
