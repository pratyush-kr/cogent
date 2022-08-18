const express = require("express");
const cors = require("cors");
var mysql = require("mysql");

const bodyParser = require("body-parser");
const connection = mysql.createConnection({
	host: "localhost",
	database: "cogent",
	user: "pratyush",
	password: "Impraty8533!",
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

app.post("/searchCustomer", (req, res) => {
	/* prettier-ignore */
	console.log(req.body);
	res.send("hi");
});

var server = app.listen(8080, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening on %s:%s", host, port);
});
