import React from "react";
import axios from "axios";

export const SearchCustomer = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		const data = {
			serialNumber: e.target[0].value,
			dateOfService: e.target[1].value,
		};
		axios
			.post(
				"http://localhost:8080/cogent-server/SearchCustomer",
				JSON.stringify(data)
			)
			.then((res) => {
				props.states.setData(res.data);
			})
			.then(() => {
				props.states.setIsAddItem(false);
				props.states.setIsInventorySearch(false);
				props.states.setIsAddCust(false);
				props.states.setIsCustSearch(true);
			});
	};
	return (
		<div className="box">
			<span>Search Customer</span>
			<form onSubmit={handelSubmit}>
				<div>
					<input
						type="tel"
						placeholder="Serial Number"
						className="txt-in"
					/>
					<input type="date" placeholder="Date" className="txt-in" />
				</div>
				<button className="btn">Search</button>
			</form>
		</div>
	);
};
