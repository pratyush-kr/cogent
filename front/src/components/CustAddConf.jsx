import React, { useState } from "react";
import axios from "axios";

export const CustAddConf = (props) => {
	const [problems, setProblems] = useState([]);
	const row = [];
	const [disabled, setDisabled] = useState(false);
	const [prob, setProb] = useState("");
	if (props.data.name === "" || props.data.phoneNumber === "") return;
	const handelCancel = (e) => {
		e.preventDefault();
		props.states.setIsAddCust(false);
	};
	const handelDelete = (e) => {
		e.preventDefault();
	};

	const printProblems = () => {
		for (var i = 0; i < problems.length; ) {
			const items = [];
			for (var j = 0; j < 5; j++) {
				items.push(
					<div className="problem">
						{problems[i]}
						<button
							className="btn minus"
							value={i}
							onClick={handelDelete}
						>
							-
						</button>
					</div>
				);
				i++;
			}

			row.push(<div>{items}</div>);
		}
		return row;
	};
	console.log(problems);
	return (
		<div div style={{ display: "flex", flexDirection: "column" }}>
			<div>
				<span className="h1">Add Customer</span>
			</div>
			<div className="txt-body">
				<div>
					<span>Name: {props.data.name}</span>
				</div>
				{/* <div>
					<span>Email: {props.data.email}</span>
				</div> */}
				<div>
					<span>Phone Number: {props.data.phoneNumber}</span>
				</div>
				{/*<div>
					<span>Description: {props.data.problemDesc}</span>
				</div> */}
				<div>
					<span>Serial Number: {props.data.serialNumber}</span>
				</div>
				<div>
					<span className="h1">Additional Information</span>
				</div>
				<div>
					<form>
						<div>
							<input
								type="email"
								className="txt-in"
								placeholder="Email"
							/>
						</div>
						<div>
							<input
								type="text"
								placeholder="problems"
								className="txt-in plus-prob"
								onChange={(e) => setProb(e.target.value)}
							/>
							<button
								className="btn plus"
								disabled={disabled}
								onClick={(e) => {
									e.preventDefault();
									setProblems([...problems, prob]);

									if (problems.length + 1 >= 15) {
										setDisabled(true);
									} else {
										setDisabled(false);
									}
								}}
							>
								+
							</button>
						</div>
					</form>
					<div className="txt-box">{printProblems()}</div>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<button
						className="btn"
						onClick={(e) => {
							e.preventDefault();
							axios
								.post(
									"http://localhost:8080/cogent-server/AddCustomer",
									JSON.stringify(props.data)
								)
								.then((res) => console.log(res));
						}}
					>
						add
					</button>
					<button className="btn" onClick={handelCancel}>
						cancel
					</button>
				</form>
			</div>
		</div>
	);
};

/*


 */
