import React from "react";
import axios from "axios";

export const SearchCustomer = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		const data = {
			serialNumber: e.target[0].value,
			dateOfService: e.target[1].value,
		};
		axios.post("http://localhost:8080/searchCustomer", data).then((res) => {
			props.states.setData(res.data);
			props.states.setIsAddItem(false);
			props.states.setIsItemSearch(false);
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
				<input type="submit" className="btn" value="Search" />
			</form>
		</div>
	);
};
