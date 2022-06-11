import React from "react";
import axios from "axios";

export const CustAddConf = (props) => {
	if (props.data.name === "" || props.data.phoneNumber === "") return;
	const handelCancel = (e) => {
		e.preventDefault();
		props.states.setIsCust(false);
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
					<span>Email: {props.data.email}</span>
				</div>
				<div>
					<span>Phone Number: {props.data.phoneNumber}</span>
				</div>
				<div>
					<span>Description: {props.data.problemDesc}</span>
				</div>
				<div>
					<span>Serial Number: {props.data.serialNumber}</span>
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
									"http://localhost:8080/cogent/AddCustomer",
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
