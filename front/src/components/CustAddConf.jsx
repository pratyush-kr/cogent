import React, { useState } from "react";
import axios from "axios";

export const CustAddConf = (props) => {
	const [problemsHtml, setProblemsHtml] = useState([]);
	const [problems, setProblems] = useState([]);
	const [prob, setProb] = useState("");
	if (props.data.name === "" || props.data.phoneNumber === "") return;
	const handelCancel = (e) => {
		e.preventDefault();
		props.states.setIsAddCust(false);
	};
	const handelDelete = (e) => {
		e.preventDefault();
		var idx = e.target.value;
		const data = [
			...problems.slice(0, idx),
			...problems.slice(idx + 1, problems.length),
		];
		setProblems(data);
	};

	return (
		<div div style={{ display: "flex", flexDirection: "column" }}>
			<div>
				<span className="h1">Add Customer</span>
			</div>
			<div className="txt-body">
				<div>
					<span>Name: {props.data.name}</span>
				</div>
				<div>
					<span>Phone Number: {props.data.phoneNumber}</span>
				</div>
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
								onClick={(e) => {
									e.preventDefault();
									setProblemsHtml([
										...problemsHtml,
										<div className="problem">
											<div className="msg">
												<span>{prob}</span>
											</div>
											<div className="btn-minus">
												<button>-</button>
											</div>
										</div>,
									]);
									setProblems([...problems, prob]);
								}}
							>
								+
							</button>
						</div>
					</form>
					<div className="txt-box">{problemsHtml}</div>
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
							var str = "x";
							const data = props.data;
							for (var i in problems) {
								str += ", " + problems[i];
							}
							console.log(str.substring(2));
							data["problemDesc"] = str.substring(2);
							axios
								.post("http://localhost:8080/AddCustomer", data)
								.then((res) => {
									if (res.data === "Customer Added") {
										alert("Customer Added");
										props.states.setIsAddCust(false);
									}
								});
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
